import type { ProjectNameManager as IProjectNameManager } from './types.ts';

export class ProjectNameManager implements IProjectNameManager {
    constructor() {
        this.setupEventListeners();
        this.loadProjectName();
    }

    private setupEventListeners(): void {
        const projectNameInput: HTMLInputElement | null = document.getElementById('project-name') as HTMLInputElement;
        if (projectNameInput) {
            projectNameInput.addEventListener('input', (): void => {
                this.saveProjectName();
            });
        }
    }

    public saveProjectName(): void {
        const projectNameInput: HTMLInputElement | null = document.getElementById('project-name') as HTMLInputElement;
        if (projectNameInput) {
            const projectName: string = projectNameInput.value.trim();
            localStorage.setItem('checklist-project-name', projectName);
        }
    }

    public loadProjectName(): void {
        const savedProjectName: string | null = localStorage.getItem('checklist-project-name');
        const projectNameInput: HTMLInputElement | null = document.getElementById('project-name') as HTMLInputElement;
        if (projectNameInput && savedProjectName) {
            projectNameInput.value = savedProjectName;
        }
    }

    public getProjectName(): string {
        const projectNameInput: HTMLInputElement | null = document.getElementById('project-name') as HTMLInputElement;
        return projectNameInput ? projectNameInput.value.trim() : '';
    }

    public getFormattedProjectName(): string {
        const projectName: string = this.getProjectName();
        if (!projectName) return '';
        
        return projectName
            .replace(/[<>:"/\\|?*]/g, '') 
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
} 