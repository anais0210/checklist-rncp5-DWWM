import type { ResetManager as IResetManager } from './types';

export class ResetManager implements IResetManager {
    constructor() {
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const resetBtn: HTMLElement | null = document.getElementById('reset-all-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', (): void => this.confirmReset());
        }
    }

    public confirmReset(): void {
        const confirmed: boolean = confirm(
            ' ATTENTION !\n\n' +
            'Êtes-vous sûr de vouloir tout réinitialiser ?\n\n' +
            'Cette action va :\n' +
            '• Décocher toutes les cases\n' +
            '• Vider toutes les notes\n' +
            '• Supprimer toutes les données sauvegardées\n\n' +
            'Cette action est irréversible !'
        );

        if (confirmed) {
            this.performReset();
        }
    }

    public performReset(): void {
        console.log('Réinitialisation complète de la checklist...');

        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.checklist input[type="checkbox"]');
        checkboxes.forEach((checkbox: HTMLInputElement): void => {
            checkbox.checked = false;
        });

        const textareas: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll('.checklist textarea');
        textareas.forEach((textarea: HTMLTextAreaElement): void => {
            textarea.value = '';
        });

        const projectNameInput: HTMLInputElement | null = document.getElementById('project-name') as HTMLInputElement;
        if (projectNameInput) {
            projectNameInput.value = '';
        }

        localStorage.removeItem('checklist-progress');
        localStorage.removeItem('checklist-notes');
        localStorage.removeItem('checklist-project-name');

        this.updateProgress();

        this.showResetConfirmation();

        console.log('Réinitialisation terminée');
    }

    public updateProgress(): void {
        document.dispatchEvent(new CustomEvent('checklist-updated'));
        
        const progressManager = window.app?.progressManager;
        if (progressManager) {
            progressManager.updateProgress();
        }
    }

    public showResetConfirmation(): void {
        const notification: HTMLDivElement = document.createElement('div');
        notification.className = 'reset-notification';
        notification.innerHTML = `
            <div class="reset-notification-content">
                <p>Checklist réinitialisée avec succès !</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;

        const style: HTMLStyleElement = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        setTimeout((): void => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout((): void => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
} 