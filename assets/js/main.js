/* ========================================
   XUE LIAO - Personal Website
   Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    initSmoothScroll();

    // Header scroll effect
    initHeaderScroll();

    // Portfolio filters
    initPortfolioFilters();

    // Reveal animations on scroll
    initScrollReveal();
});

/* ========================================
   Smooth Scroll
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ========================================
   Header Scroll Effect
   ======================================== */
function initHeaderScroll() {
    const header = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.padding = '1rem 3rem';
            header.style.background = 'rgba(13, 13, 13, 0.95)';
        } else {
            header.style.padding = '1.5rem 3rem';
            header.style.background = 'rgba(13, 13, 13, 0.8)';
        }

        lastScroll = currentScroll;
    });
}

/* ========================================
   Portfolio Filters
   ======================================== */
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!filterBtns.length || !portfolioItems.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ========================================
   Scroll Reveal Animation
   ======================================== */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with .reveal class
    document.querySelectorAll('.card, .pub-item, .edu-item, .project-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/* ========================================
   Smooth Page Transition (for multi-page)
   ======================================== */
function initPageTransition() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', e => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http')) {
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        }
    });
}

// Add page transition styles
document.body.style.transition = 'opacity 0.3s ease';
