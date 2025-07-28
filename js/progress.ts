import type { ProgressManager as IProgressManager, ChecklistProgress } from './types.ts';

export class ProgressManager implements IProgressManager {
    constructor() {
        this.loadProgress();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox: Element) => {
            const checkboxElement = checkbox as HTMLInputElement;
            checkboxElement.addEventListener('change', (): void => {
                this.updateProgress();
                this.saveProgress();
            });
        });
    }

    public calculateProgressByBadge(badgeText: string): number {
        const items: NodeListOf<Element> = document.querySelectorAll(`.checklist li`);
        let total: number = 0;
        let checked: number = 0;

        items.forEach((item: Element): void => {
            const badge: Element | null = item.querySelector('.demo-badge');
            if (badge && badge.textContent?.trim() === badgeText) {
                total++;
                const checkbox: HTMLInputElement | null = item.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.checked) {
                    checked++;
                }
            }
        });

        return total > 0 ? Math.round((checked / total) * 100) : 0;
    }

    public updateProgress(): void {
        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
        const total: number = checkboxes.length;
        const checked: number = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage: number = Math.round((checked / total) * 100);

        const progressFill: HTMLElement | null = document.getElementById('progress-fill');
        const progressText: HTMLElement | null = document.getElementById('progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        if (progressText) {
            progressText.textContent = `${percentage}%`;
        }

        for (let i = 1; i <= 4; i++) {
            const demoPercentage: number = this.calculateProgressByBadge(`Démo ${i}`);
            const demoText: HTMLElement | null = document.getElementById(`demo${i}-text`);
            if (demoText) {
                demoText.textContent = `${demoPercentage}%`;
            }
        }

        const dossierPercentage: number = this.calculateProgressByBadge('Dossier projet');
        const optionnelPercentage: number = this.calculateProgressByBadge('Optionnel');

        const dossierText: HTMLElement | null = document.getElementById('dossier-text');
        const optionnelText: HTMLElement | null = document.getElementById('optionnel-text');
        
        if (dossierText) {
            dossierText.textContent = `${dossierPercentage}%`;
        }
        if (optionnelText) {
            optionnelText.textContent = `${optionnelPercentage}%`;
        }

        document.dispatchEvent(new CustomEvent('checklist-updated'));
    }

    public saveProgress(): void {
        const progress: ChecklistProgress = {};
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox: Element): void => {
            const checkboxElement = checkbox as HTMLInputElement;
            if (checkboxElement.id) {
                progress[checkboxElement.id] = checkboxElement.checked;
            }
        });
        localStorage.setItem('checklist-progress', JSON.stringify(progress));
    }

    public loadProgress(): void {
        const savedProgress: string | null = localStorage.getItem('checklist-progress');
        if (savedProgress) {
            const progress: ChecklistProgress = JSON.parse(savedProgress);
            Object.entries(progress).forEach(([id, checked]: [string, boolean]): void => {
                const checkbox: HTMLInputElement | null = document.getElementById(id) as HTMLInputElement;
                if (checkbox) {
                    checkbox.checked = checked;
                }
            });
            this.updateProgress();
        }
    }
} 