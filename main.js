/*
    ========================================
    ChinaExplained - Enhanced JavaScript
    Parallax effects and smooth scroll animations
    ========================================
*/

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll-reveal]');
        this.init();
    }

    init() {
        // Reveal elements on page load if they're in viewport
        this.checkElements();
        
        // Set up intersection observer for scroll animations
        this.setupObserver();
        
        // Listen for scroll events
        window.addEventListener('scroll', () => this.checkElements(), { passive: true });
    }

    checkElements() {
        this.elements.forEach(element => {
            if (this.isInViewport(element)) {
                element.classList.add('revealed');
            } else {
                // Optional: remove class to re-animate when scrolling back up
                element.classList.remove('revealed');
            }
        });
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const threshold = windowHeight * 0.15; // Trigger when element is 15% into viewport
        
        return (
            rect.top <= windowHeight - threshold &&
            rect.bottom >= threshold
        );
    }

    setupObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-15% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    // Remove class to allow re-animation when scrolling back
                    entry.target.classList.remove('revealed');
                }
            });
        }, observerOptions);

        this.elements.forEach(element => observer.observe(element));
    }
}

// ========================================
// PARALLAX BACKGROUND EFFECT
// ========================================

class ParallaxEffect {
    constructor() {
        this.parallaxBg = document.querySelector('.parallax-bg');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.lastScrollY = window.scrollY;
            this.requestTick();
        }, { passive: true });
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.update());
            this.ticking = true;
        }
    }

    update() {
        const scrolled = this.lastScrollY;
        const parallaxSpeed = 0.5;
        
        if (this.parallaxBg) {
            this.parallaxBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        this.ticking = false;
    }
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore empty or just "#" links
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================

function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// ========================================
// FLOATING CARDS MOUSE INTERACTION
// ========================================

function initFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========================================
// NEWSLETTER FORM HANDLING
// ========================================

function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            // Here you would normally send this to your email service
            console.log('Newsletter signup:', email);
            
            // Show success message
            const button = form.querySelector('button');
            const originalText = button.innerHTML;
            button.innerHTML = '<span>✓ Thanks! We\'ll be in touch.</span>';
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                form.reset();
            }, 3000);
        });
    }
}

// ========================================
// DYNAMIC FOOTER YEAR
// ========================================

function updateFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ========================================
// CURSOR GLOW EFFECT (OPTIONAL)
// ========================================

function initCursorGlow() {
    // Only enable on desktop
    if (window.innerWidth > 1024) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(255, 71, 87, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
        document.body.appendChild(glow);
        
        document.addEventListener('mousemove', (e) => {
            glow.style.display = 'block';
            glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
        });
    }
}

// ========================================
// INITIALIZE EVERYTHING
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    new ScrollReveal();
    new ParallaxEffect();
    initSmoothScroll();
    initHeaderScroll();
    initMobileMenu();
    initFloatingCards();
    initNewsletterForm();
    updateFooterYear();
    initCursorGlow();
    
    // Add loaded class to body for any CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// READING PROGRESS BAR
// ========================================

function initReadingProgressBar() {
    const progressBar = document.querySelector('.reading-progress-bar');
    
    if (!progressBar) return;
    
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    }
    
    // Update on scroll
    window.addEventListener('scroll', throttle(updateProgressBar, 50), { passive: true });
    
    // Initial update
    updateProgressBar();
}

// Add to initialization
document.addEventListener('DOMContentLoaded', () => {
    // ... existing initializations ...
    initReadingProgressBar();
});
