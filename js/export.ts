import type { ExportManager as IExportManager } from './types';

export class ExportManager implements IExportManager {
    constructor() {
        this.init();
    }

    private init(): void {
        const exportBtn: HTMLElement | null = document.querySelector('.export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', (): void => this.exportToExcel());
        }
    }

    public exportToExcel(): void {
        console.log('Début de l\'export Excel...');
        
        try {
            const versionElement: HTMLElement | null = document.getElementById('version-number');
            const version: string = versionElement ? versionElement.textContent || '' : '';
            
            const projectNameManager = window.app?.projectNameManager;
            const projectName: string = projectNameManager ? projectNameManager.getProjectName() : '';
            const formattedProjectName: string = projectNameManager ? projectNameManager.getFormattedProjectName() : '';
            
            const data: any[][] = this.prepareExcelData(projectName);
            
            if (!window.XLSX) {
                throw new Error('La librairie XLSX n\'est pas chargée');
            }
            
            const wb = window.XLSX.utils.book_new();
            
            const ws = window.XLSX.utils.aoa_to_sheet(data);
            
            ws['!cols'] = [
                { width: 5 },   
                { width: 60 },  
                { width: 15 }, 
                { width: 20 }, 
                { width: 25 }  
            ];
            
            window.XLSX.utils.book_append_sheet(wb, ws, 'Checklist DWWM');
            
            const date: string = new Date().toISOString().split('T')[0];
            let fileName: string = `checklist-DWWM-${date}.xlsx`;
            
            if (formattedProjectName) {
                fileName = `checklist-${formattedProjectName}-${date}.xlsx`;
            }
            
            window.XLSX.writeFile(wb, fileName);
            
            console.log('Export Excel terminé avec succès');
        } catch (error) {
            console.error('Erreur lors de l\'export Excel:', error);
            alert('Une erreur est survenue lors de l\'export Excel. Veuillez réessayer.');
        }
    }

    public prepareExcelData(projectName: string = ''): any[][] {
        const data: any[][] = [];
        
        data.push([
            'Statut',
            'Description',
            'Bloc',
            'Section',
            'Notes'
        ]);
        
        const versionElement: HTMLElement | null = document.getElementById('version-number');
        const version: string = versionElement ? versionElement.textContent || '' : '';
        
        const headerTitle: string = projectName 
            ? `Checklist DWWM - ${projectName} - ${version}`
            : `Checklist DWWM - ${version}`;
            
        data.push([
            '',
            headerTitle,
            '',
            '',
            '',
            ''
        ]);
        data.push([
            '',
            `Date d'export : ${new Date().toLocaleDateString('fr-FR')}`,
            '',
            '',
            '',
            ''
        ]);
        data.push([]);
        
        const checklistItems: NodeListOf<Element> = document.querySelectorAll('.checklist li');
        
        checklistItems.forEach((item: Element): void => {
            const checkbox: HTMLInputElement | null = item.querySelector('input[type="checkbox"]');
            const description: Element | null = item.querySelector('p:not(.demo-badge)');
            const notes: HTMLTextAreaElement | null = item.querySelector('label textarea');
            
            if (checkbox && description) {
                const isChecked: boolean = checkbox.checked;
                const descriptionText: string = description.textContent?.trim() || '';
                const notesText: string = notes ? notes.value.trim() : '';
                
                const block: Element | null = item.closest('.block');
                const section: Element | null = item.closest('.section');
                
                const blockTitle: string = block ? block.querySelector('.block-title')?.textContent?.trim() || '' : '';
                const sectionTitle: string = section ? section.querySelector('h3')?.textContent?.trim() || '' : '';
                
                data.push([
                    isChecked ? '✓' : '☐',
                    descriptionText,
                    blockTitle,
                    sectionTitle,
                    notesText
                ]);
            }
        });
        
        return data;
    }
} 