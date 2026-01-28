/*
    ========================================
    ChinaExplained - Main JavaScript File
    ========================================
    This file handles all the subtle animations on the page.

    It does three main things:
    1. Fades in the hero content when the page loads
    2. Fades in elements as you scroll down the page
    3. Keeps the footer year up to date
*/

// ========================================
// PART 1: HERO FADE-IN ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const heroElements = document.querySelectorAll('.hero .fade-in');

    heroElements.forEach(function (element, index) {
        setTimeout(function () {
            element.classList.add('visible');
        }, index * 200); // 0, 200, 400, ...
    });
});

// ========================================
// PART 2: SCROLL-TRIGGERED ANIMATIONS
// ========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

function handleIntersection(entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.getAttribute('data-delay');

            if (delay !== null) {
                const delayTime = parseInt(delay, 10) * 300;
                setTimeout(function () {
                    element.classList.add('visible');
                }, delayTime);
            } else {
                element.classList.add('visible');
            }

            observer.unobserve(element);
        }
    });
}

const scrollObserver = new IntersectionObserver(handleIntersection, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    const scrollElements = document.querySelectorAll('.scroll-fade, .explainer-card');

    scrollElements.forEach(function (element) {
        scrollObserver.observe(element);
    });
});

// ========================================
// PART 3: SMOOTH SCROLLING FOR NAV LINKS
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');

            // Ignore empty or "#" only links
            if (!targetId || targetId === '#') return;

            event.preventDefault();

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========================================
// PART 4: DYNAMIC FOOTER YEAR
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});