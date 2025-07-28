import { ProgressManager } from './progress.ts';
import { ExportManager } from './export.ts';
import { NotesManager } from './notes-manager.ts';
import { SearchManager } from './search-manager.ts';
import { ResetManager } from './reset-manager.ts';
import { ProjectNameManager } from './project-name-manager.ts';
import type { App as IApp, Config } from './types.ts';

class App implements IApp {
    public readonly progressManager: ProgressManager;
    public readonly exportManager: ExportManager;
    public readonly notesManager: NotesManager;
    public readonly searchManager: SearchManager;
    public readonly resetManager: ResetManager;
    public readonly projectNameManager: ProjectNameManager;

    constructor() {
        console.log('App initialisée');
        this.progressManager = new ProgressManager();
        this.exportManager = new ExportManager();
        this.notesManager = new NotesManager();
        this.searchManager = new SearchManager();
        this.resetManager = new ResetManager();
        this.projectNameManager = new ProjectNameManager();
        this.loadVersion();
        
        window.app = this;
        
        document.addEventListener('checklist-updated', () => {
            this.progressManager.updateProgress();
        });
    }

    public async loadVersion(): Promise<void> {
        try {
            const response: Response = await fetch('config.json');
            const config: Config = await response.json();
            const versionElement: HTMLElement | null = document.getElementById('version-number');
            if (versionElement) {
                versionElement.textContent = `v${config.version}`;
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la version:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', (): void => {
    console.log('DOM chargé, initialisation de l\'app');
    new App();
}); 