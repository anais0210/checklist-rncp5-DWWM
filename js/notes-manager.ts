import type { NotesManager as INotesManager, ChecklistNotes } from './types.ts';

export class NotesManager implements INotesManager {
    constructor() {
        this.setupEventListeners();
        this.loadNotes();
    }

    private setupEventListeners(): void {
        document.addEventListener('click', (e: Event): void => {
            const target = e.target as HTMLElement;
            if (target && target.classList.contains('notes-toggle')) {
                this.toggleNotes(target);
            }
        });

        document.addEventListener('input', (e: Event): void => {
            const target = e.target as HTMLElement;
            if (target && target.tagName === 'TEXTAREA' && target.closest('label')) {
                this.saveNotes();
            }
        });
    }

    public toggleNotes(button: HTMLElement): void {
        const targetId: string | undefined = button.dataset.target;
        if (!targetId) return;
        
        const notesContent: HTMLElement | null = document.getElementById(targetId);
        
        if (notesContent) {
            notesContent.classList.toggle('active');
            button.textContent = notesContent.classList.contains('active') ? '📝 Masquer' : '📝 Notes';
        }
    }

    public saveNotes(): void {
        const notes: ChecklistNotes = {};
        document.querySelectorAll('.checklist li label textarea').forEach((textarea: Element): void => {
            const textareaElement = textarea as HTMLTextAreaElement;
            const label = textareaElement.closest('label');
            if (label) {
                const checkbox: HTMLInputElement | null = label.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.id) {
                    notes[checkbox.id] = textareaElement.value;
                }
            }
        });
        localStorage.setItem('checklist-notes', JSON.stringify(notes));
    }

    public loadNotes(): void {
        const savedNotes: string | null = localStorage.getItem('checklist-notes');
        if (savedNotes) {
            const notes: ChecklistNotes = JSON.parse(savedNotes);
            Object.entries(notes).forEach(([id, content]: [string, string]): void => {
                const checkbox: HTMLInputElement | null = document.getElementById(id) as HTMLInputElement;
                if (checkbox) {
                    const label = checkbox.closest('label');
                    if (label) {
                        const textarea: HTMLTextAreaElement | null = label.querySelector('textarea');
                        if (textarea) {
                            textarea.value = content;
                        }
                    }
                }
            });
        }
    }
} 