import type { SearchManager as ISearchManager } from './types';

export class SearchManager implements ISearchManager {
    constructor() {
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const searchInput: HTMLInputElement | null = document.getElementById('search-input') as HTMLInputElement;
        const clearBtn: HTMLElement | null = document.getElementById('clear-search');

        if (searchInput) {
            searchInput.addEventListener('input', (e: Event): void => {
                const target = e.target as HTMLInputElement;
                this.performSearch(target.value);
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', (): void => this.clearSearch());
        }
    }

    public performSearch(query: string): void {
        const items: NodeListOf<Element> = document.querySelectorAll('.checklist li');
        const normalizedQuery: string = query.toLowerCase().trim();

        items.forEach((item: Element): void => {
            const description: Element | null = item.querySelector('span:not(.demo-badge)');
            const notes: HTMLTextAreaElement | null = item.querySelector('label textarea');
            
            if (description) {
                const descriptionText: string = description.textContent?.toLowerCase() || '';
                const notesText: string = notes ? notes.value.toLowerCase() : '';
                const hasMatch: boolean = descriptionText.includes(normalizedQuery) || 
                                notesText.includes(normalizedQuery);

                const itemElement = item as HTMLElement;
                if (normalizedQuery === '' || hasMatch) {
                    itemElement.classList.remove('search-hidden');
                    if (hasMatch && normalizedQuery !== '') {
                        itemElement.classList.add('search-highlight');
                    } else {
                        itemElement.classList.remove('search-highlight');
                    }
                } else {
                    itemElement.classList.add('search-hidden');
                    itemElement.classList.remove('search-highlight');
                }
            }
        });

        this.updateSearchResults(query);
    }

    public clearSearch(): void {
        const searchInput: HTMLInputElement | null = document.getElementById('search-input') as HTMLInputElement;
        if (searchInput) {
            searchInput.value = '';
            this.performSearch('');
        }
    }

    public updateSearchResults(query: string): void {
        const visibleItems: NodeListOf<Element> = document.querySelectorAll('.checklist li:not(.search-hidden)');
        const totalItems: NodeListOf<Element> = document.querySelectorAll('.checklist li');
        
        console.log(`Recherche "${query}" : ${visibleItems.length}/${totalItems.length} résultats`);
    }
} 