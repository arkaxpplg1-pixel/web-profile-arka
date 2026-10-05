/* =========================================
   JAVASCRIPT INTERAKTIF - CLEAN MODERN PROFIL
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* 0. ANIMASI LOADING SCREEN HILANG SETELAH HALAMAN DIMUAT */
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


    /* 1. FITUR TOGGLE MODE (DARK / LIGHT MODE) */
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


    /* 2. ANIMASI MUNCUL SAAT SCROLL (SCROLL REVEAL) */
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


    /* 3. SMOOTH SCROLLING UNTUK NAVIGASI TAUTAN */
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