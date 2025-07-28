export class BadgeManager {
    constructor() {
        this.init();
    }

    private init(): void {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.applyBadgeStyles());
        } else {
            this.applyBadgeStyles();
        }
    }

    private applyBadgeStyles(): void {
        const badges = document.querySelectorAll('.demo-badge');
        
        badges.forEach((badge: Element) => {
            const badgeText = badge.textContent?.trim() || '';
            const badgeClasses = this.getBadgeClasses(badgeText);
            
            badgeClasses.forEach(className => {
                badge.classList.add(className);
            });
        });
    }

    private getBadgeClasses(text: string): string[] {
        const classes: string[] = [];
        
        const badgeMapping: { [key: string]: string } = {
            'Front-end': 'badge-frontend',
            'Back-end': 'badge-backend',
            'Dossier projet': 'badge-dossier',
            'Présentation': 'badge-presentation',
            'Entretien technique': 'badge-entretien',
            'Questionnaire pro': 'badge-questionnaire',
            'Obligatoire': 'badge-obligatoire',
            'Optionnel': 'badge-optionnel'
        };

        if (badgeMapping[text]) {
            classes.push(badgeMapping[text]);
        }

        else {
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes('front')) {
                classes.push('badge-frontend');
            } else if (lowerText.includes('back')) {
                classes.push('badge-backend');
            } else if (lowerText.includes('dossier')) {
                classes.push('badge-dossier');
            } else if (lowerText.includes('présentation')) {
                classes.push('badge-presentation');
            } else if (lowerText.includes('entretien')) {
                classes.push('badge-entretien');
            } else if (lowerText.includes('questionnaire')) {
                classes.push('badge-questionnaire');
            } else if (lowerText.includes('obligatoire')) {
                classes.push('badge-obligatoire');
            } else if (lowerText.includes('optionnel')) {
                classes.push('badge-optionnel');
            }
        }

        return classes;
    }

    public refresh(): void {
        this.applyBadgeStyles();
    }
} 