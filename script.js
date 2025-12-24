/* ============================================
   PORTFOLIO JAVASCRIPT
   
   Features:
   1. Loading Screen
   2. Custom Cursor (Desktop)
   3. Navigation & Mobile Menu
   4. Theme Toggle (Dark/Light)
   5. Scroll Progress Bar
   6. Typing Animation
   7. Number Counter Animation
   8. Scroll Reveal Animations
   9. Expand/Collapse Sections
   10. Contact Form Handler
   11. Back to Top Button
   12. Particle Background
   13. Active Navigation Link
   
   TO CUSTOMIZE:
   - Typing texts: Edit the 'typingTexts' array
   - Animation timings: Adjust the delay values
   - Theme default: Change 'prefersDark' logic
============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initLoader();
    initCustomCursor();
    initNavigation();
    initThemeToggle();
    initScrollProgress();
    initTypingAnimation();
    initCounterAnimation();
    initScrollReveal();
    initExpandButtons();
    initContactForm();
    initBackToTop();
    initParticles();
    initActiveNavLink();
});

/* ============================================
   1. LOADING SCREEN
   Hides the loader after page loads
============================================ */
function initLoader() {
    const loader = document.getElementById('loader');

    // Hide loader after animations complete
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger hero animations
            document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate');
                }, index * 100);
            });
        }, 1500);
    });
}

/* ============================================
   2. CUSTOM CURSOR (Desktop only)
   Creates a custom cursor effect that follows mouse
============================================ */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    // Only enable on desktop devices
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update main cursor immediately
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Animate follower with smooth easing
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateFollower);
        }

        animateFollower();

        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-card, .timeline-content');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('hover');
            });
        });
    }
}

/* ============================================
   3. NAVIGATION & MOBILE MENU
   Handles sticky header and mobile menu toggle
============================================ */
function initNavigation() {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================
   4. THEME TOGGLE
   Switches between dark and light mode
   Remembers preference in localStorage
============================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply initial theme
    if (savedTheme === 'light') {
        body.classList.remove('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else if (savedTheme === 'dark' || prefersDark) {
        body.classList.add('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');

        if (body.classList.contains('dark')) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });
}

/* ============================================
   5. SCROLL PROGRESS BAR
   Shows reading progress at top of page
============================================ */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* ============================================
   6. TYPING ANIMATION
   Creates typewriter effect in hero section
   
   TO CUSTOMIZE: Edit the 'texts' array below
============================================ */
function initTypingAnimation() {
    const typedText = document.getElementById('typed-text');

    // Add or remove titles here
    const texts = ['Senior Python Backend Developer', 'Cloud Infrastructure Engineer', 'API Development Expert', 'DevOps & Automation Specialist', 'Full Stack Developer', 'AWS | GCP | Azure Expert'];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after loader
    setTimeout(type, 2000);
}

/* ============================================
   7. NUMBER COUNTER ANIMATION
   Animates numbers counting up in hero stats
============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Trigger when hero is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.disconnect();
            }
        });
    }, {threshold: 0.5});

    const hero = document.querySelector('.hero');
    if (hero) {
        observer.observe(hero);
    }
}

/* ============================================
   8. SCROLL REVEAL ANIMATIONS
   Reveals elements as they scroll into view
============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // Optional: unobserve after revealing
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* ============================================
   9. EXPAND/COLLAPSE SECTIONS
   Handles "Read More" buttons for jobs and projects
============================================ */
function initExpandButtons() {
    // Job/Timeline expand buttons
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-expand');
            const target = document.getElementById(targetId);

            btn.classList.toggle('active');
            target.classList.toggle('show');

            // Update button text
            const span = btn.querySelector('span');
            if (target.classList.contains('show')) {
                span.textContent = 'Hide Details';
            } else {
                span.textContent = 'View Details';
            }
        });
    });

    // Project expand buttons
    document.querySelectorAll('.project-expand').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-expand');
            const target = document.getElementById(targetId);

            target.classList.toggle('show');

            // Update button text
            const span = btn.querySelector('span');
            if (target.classList.contains('show')) {
                span.textContent = 'Show Less';
            } else {
                span.textContent = 'Learn More';
            }
        });
    });
}

/* ============================================
   10. CONTACT FORM HANDLER
   Handles form submission
   
   TO CUSTOMIZE: Connect to your backend/email service
   Options: Formspree, EmailJS, Netlify Forms, custom API
============================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);

            const delay = new Promise(resolve => setTimeout(resolve, 1500));
            const responsePromise = fetch('https://formspree.io/f/xdanjrzv', {
                method: 'POST',
                body: formData,
                headers: {'Accept': 'application/json'}
            });

            const [response] = await Promise.all([responsePromise, delay]);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Submission failed');
            }
            console.log(result);
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            form.reset();

        } catch (err) {
            console.error(err);
            submitBtn.innerHTML = '❌ Failed to send';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        }

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}


/* ============================================
   11. BACK TO TOP BUTTON
   Shows button when scrolled down, scrolls to top on click
============================================ */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0, behavior: 'smooth'
        });
    });
}

/* ============================================
   12. PARTICLE BACKGROUND
   Creates floating particles in hero section
============================================ */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.1;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${opacity};
            animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;

        particlesContainer.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(20px, -30px) rotate(90deg);
            }
            50% {
                transform: translate(-10px, -50px) rotate(180deg);
            }
            75% {
                transform: translate(15px, -20px) rotate(270deg);
            }
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   13. ACTIVE NAVIGATION LINK
   Highlights current section in navigation
============================================ */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   UTILITY FUNCTIONS
============================================ */

// Debounce function for performance
function debounce(func, wait = 20) {
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

// Throttle function for performance
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   ADDITIONAL ENHANCEMENTS
   Uncomment to enable extra features
============================================ */

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading="lazy" to images for performance
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

// Console easter egg
console.log(`
%c👨‍💻 Jeetendra Gupta's Portfolio
%c
Thanks for checking out my portfolio!
Looking for the source code? It's all right here in the browser.
Feel free to reach out: jeetendra29gupta@gmail.com

`, 'color: #00d4aa; font-size: 20px; font-weight: bold;', 'color: #718096; font-size: 12px;');
