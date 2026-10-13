/* =========================================
   JAVASCRIPT INTERAKTIF - CLEAN MODERN PROFIL
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ANIMASI LOADING SCREEN HILANG SETELAH HALAMAN DIMUAT */
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
            }, 400); // Jeda mulus sesaat
        });
        
        // Fallback pengaman jika event load agak lambat
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
        }, 1000);
    }


    // FITUR TOGGLE MODE (DARK / LIGHT MODE)
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Cek preferensi tersimpan di localStorage sebelumnya
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = '🌙';
            }
        });
    }

    // PENYESUAIAN TAMPILAN MENU
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('primary-navigation');

    if (menuToggleBtn && navMenu) {
        const setMenuOpen = (isOpen) => {
            navMenu.classList.toggle('is-open', isOpen);
            menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
            menuToggleBtn.setAttribute(
                'aria-label',
                isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
            );
            menuToggleBtn.title = isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi';
            menuToggleBtn.querySelector('span').textContent = isOpen ? '×' : '☰';
        };

        menuToggleBtn.addEventListener('click', () => {
            setMenuOpen(menuToggleBtn.getAttribute('aria-expanded') !== 'true');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggleBtn.getAttribute('aria-expanded') === 'true') {
                setMenuOpen(false);
                menuToggleBtn.focus();
            }
        });

        window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
            if (event.matches) setMenuOpen(false);
        });
    }


    // ANIMASI MUNCUL SAAT SCROLL (SCROLL REVEAL)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .gallery-item, .hero-text, .hero-img-wrapper');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(25px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });


    // SMOOTH SCROLLING UNTUK NAVIGASI TAUTAN 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});