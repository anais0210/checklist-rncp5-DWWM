// Types globaux pour le projet Checklist RNCP5 DWWM

export interface ChecklistProgress {
    [checkboxId: string]: boolean;
}

export interface ChecklistNotes {
    [checkboxId: string]: string;
}

export interface Config {
    version: string;
}

export interface ExcelRow {
    statut: string;
    description: string;
    badge: string;
    bloc: string;
    section: string;
    notes: string;
}

// Extension de l'interface Window pour inclure les propriétés globales
declare global {
    interface Window {
        app?: App;
        XLSX?: any; // Pour la librairie XLSX
    }
    
    // Pour les événements personnalisés
    interface DocumentEventMap {
        'checklist-updated': CustomEvent;
    }
}

// Interface pour l'application principale
export interface App {
    progressManager: ProgressManager;
    exportManager: ExportManager;
    notesManager: NotesManager;
    searchManager: SearchManager;
    resetManager: ResetManager;
    projectNameManager: ProjectNameManager;
    loadVersion(): Promise<void>;
}

// Forward declarations pour les classes
export interface ProgressManager {
    updateProgress(): void;
    calculateProgressByBadge(badgeText: string): number;
    saveProgress(): void;
    loadProgress(): void;
}

export interface ExportManager {
    exportToExcel(): void;
    prepareExcelData(projectName?: string): any[][];
}

export interface NotesManager {
    toggleNotes(button: HTMLElement): void;
    saveNotes(): void;
    loadNotes(): void;
}

export interface SearchManager {
    performSearch(query: string): void;
    clearSearch(): void;
    updateSearchResults(query: string): void;
}

export interface ResetManager {
    confirmReset(): void;
    performReset(): void;
    updateProgress(): void;
    showResetConfirmation(): void;
}

export interface ProjectNameManager {
    saveProjectName(): void;
    loadProjectName(): void;
    getProjectName(): string;
    getFormattedProjectName(): string;
} 