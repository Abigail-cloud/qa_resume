document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initNavigation();
    initScrollToTop();
    initMobileMenu();
    initScrollAnimations();
    initNavbarScrollEffect();
    initSmoothScroll();
    initSkillCardsAnimation();
    initExperienceCardsAnimation();
    initProjectCardsAnimation();
    initContactForm();
});

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

// Navigation bar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize navigation
function initNavigation() {
    // Add active class to current section in nav
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.skill-card, .experience-card, .project-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Skill cards animation
function initSkillCardsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger effect
            }
        });
    }, { threshold: 0.2 });
    
    skillCards.forEach(card => observer.observe(card));
}

// Experience cards animation
function initExperienceCardsAnimation() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Stagger effect
            }
        });
    }, { threshold: 0.2 });
    
    experienceCards.forEach(card => observer.observe(card));
}

// Project cards animation
function initProjectCardsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Stagger effect
            }
        });
    }, { threshold: 0.2 });
    
    projectCards.forEach(card => observer.observe(card));
}

// Contact form handling
function initContactForm() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Show success message (in a real app, you would send this to a server)
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            button.classList.add('bg-green-500');
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-green-500');
            }, 3000);
        });
    }
}

// Add parallax effect to background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgElements = document.querySelectorAll('.bg-shape');
    
    bgElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing effect for hero section
function initTypingEffect() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;
    
    const texts = ['Quality Assurance Engineer', 'Software Tester', 'QA Specialist'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Add magnetic effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Add ripple effect to buttons
document.querySelectorAll('button, a.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add keyframe for ripple effect if not exists
if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add count up animation for stats
function initCountUp() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                
                let numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
                let suffix = '';
                if (hasPlus) suffix = '+';
                if (hasPercent) suffix = '%';
                
                let current = 0;
                const increment = numericValue / 50;
                const duration = 2000;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    target.textContent = Math.round(current * 10) / 10 + suffix;
                }, stepTime);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Initialize count up
initCountUp();

// Add floating animation to profile image
function initFloatingAnimation() {
    const profileImg = document.querySelector('.animate-float');
    if (profileImg) {
        let angle = 0;
        let radius = 10;
        let centerX = 0;
        let centerY = 0;
        
        function animate() {
            angle += 0.02;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Preloader (optional - remove if not needed)
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// Initialize preloader
initPreloader();

// Console message for developer
console.log('%c🎯 QA Engineer Portfolio', 'font-size: 20px; color: #06b6d4; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, Tailwind & JavaScript', 'color: #94a3b8;');
console.log('%cReady to impress top companies!', 'color: #10b981;');