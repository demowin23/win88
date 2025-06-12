// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navMenu.classList.add('active');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navMenu.classList.remove('active');
        menuOpen = false;
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Close mobile menu if open
        if(menuOpen) {
            menuBtn.classList.remove('open');
            navMenu.classList.remove('active');
            menuOpen = false;
        }

        // Smooth scroll to target
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.match-card, .promo-card, .section-title, .register-container');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if(elementTop < windowHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial state for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.match-card, .promo-card, .section-title, .register-container');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
    });
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Match Odds Interaction
const oddButtons = document.querySelectorAll('.odd-btn');

oddButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons in the same match
        const matchOdds = this.closest('.match-odds');
        matchOdds.querySelectorAll('.odd-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Add visual feedback
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Form Submission
const registerForm = document.querySelector('.register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add animation to button
    const submitButton = registerForm.querySelector('button[type="submit"]');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Đăng ký thành công!';
        submitButton.style.backgroundColor = '#4CAF50';
        
        // Reset form
        setTimeout(() => {
            registerForm.reset();
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Đăng Ký Ngay';
            submitButton.style.backgroundColor = '';
        }, 2000);
    }, 1500);
}); 