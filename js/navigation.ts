document.addEventListener('DOMContentLoaded', function(): void {
    const currentPage: string = window.location.pathname.split('/').pop() || 'index.html';
    
    const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach((link: HTMLAnchorElement): void => {
        link.classList.remove('active');
        
        const linkHref: string | null = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html') ||
            (currentPage === 'questions.html' && linkHref === 'questions.html')) {
            link.classList.add('active');
        }
    });
    
    navLinks.forEach((link: HTMLAnchorElement): void => {
        link.addEventListener('mouseenter', function(this: HTMLAnchorElement): void {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        link.addEventListener('mouseleave', function(this: HTMLAnchorElement): void {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}); 