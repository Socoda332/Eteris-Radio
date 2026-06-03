document.addEventListener('DOMContentLoaded', () => {
    // Player status
    const playerStatus = document.getElementById('player-status');
    if (playerStatus) {
        playerStatus.textContent = 'Usando el reproductor embed oficial de MyRadioStream.';
    }

    // Mobile menu toggle with accessibility and scroll lock
    const menuToggle = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('primary-navigation') || document.querySelector('.nav-links');

    const closeMenu = () => {
        if (navLinks) navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
        if (navLinks) navLinks.classList.add('active');
        if (menuToggle) {
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
        document.body.classList.add('menu-open');
    };

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (ev) => {
            ev.stopPropagation();
            if (navLinks.classList.contains('active')) closeMenu(); else openMenu();
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});