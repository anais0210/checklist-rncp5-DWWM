export class NotesManager {
    constructor() {
        this.setupEventListeners();
        this.loadNotes();
    }
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.classList.contains('notes-toggle')) {
                this.toggleNotes(target);
            }
        });
        document.addEventListener('input', (e) => {
            const target = e.target;
            if (target && target.tagName === 'TEXTAREA' && target.closest('label')) {
                this.saveNotes();
            }
        });
    }
    toggleNotes(button) {
        const targetId = button.dataset.target;
        if (!targetId)
            return;
        const notesContent = document.getElementById(targetId);
        if (notesContent) {
            notesContent.classList.toggle('active');
            button.textContent = notesContent.classList.contains('active') ? '📝 Masquer' : '📝 Notes';
        }
    }
    saveNotes() {
        const notes = {};
        document.querySelectorAll('.checklist li label textarea').forEach((textarea) => {
            const textareaElement = textarea;
            const label = textareaElement.closest('label');
            if (label) {
                const checkbox = label.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.id) {
                    notes[checkbox.id] = textareaElement.value;
                }
            }
        });
        localStorage.setItem('checklist-notes', JSON.stringify(notes));
    }
    loadNotes() {
        const savedNotes = localStorage.getItem('checklist-notes');
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            Object.entries(notes).forEach(([id, content]) => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    const label = checkbox.closest('label');
                    if (label) {
                        const textarea = label.querySelector('textarea');
                        if (textarea) {
                            textarea.value = content;
                        }
                    }
                }
            });
        }
    }
}
//# sourceMappingURL=notes-manager.js.map