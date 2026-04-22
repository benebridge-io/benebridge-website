// ====================================
// Smooth Scrolling for Navigation
// ====================================
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

// ====================================
// Contact Form Handling
// ====================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            institution: contactForm.institution.value,
            title: contactForm.title.value,
            message: contactForm.message.value,
            timestamp: new Date().toISOString()
        };

        // Log to console (for now - you'll replace this with actual API call)
        console.log('Form submission:', formData);

        // For now, just show success message
        // In production, you'd send this to your backend or email service
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Send email notification (you can use a service like Formspree, EmailJS, or your own backend)
        // Example with EmailJS (you'd need to set this up):
        /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please email dan@benebridge.io directly.');
            });
        */

        // Alternative: Use Formspree (free service)
        /*
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            }
        });
        */

        // Simple email mailto fallback
        const subject = encodeURIComponent(`Demo Request from ${formData.name}`);
        const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Institution: ${formData.institution}
Title: ${formData.title}

Message:
${formData.message}
        `);

        // Optional: also trigger mailto link
        // window.location.href = `mailto:dan@benebridge.io?subject=${subject}&body=${body}`;
    });
}

// ====================================
// Navbar Scroll Effect
// ====================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ====================================
// Animate Elements on Scroll
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.problem-card, .feature-card, .workflow-step, .pricing-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ====================================
// Statistics Counter Animation
// ====================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ====================================
// Mobile Menu Toggle (if you add hamburger menu later)
// ====================================
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// ====================================
// Add Active State to Navigation
// ====================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
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

// ====================================
// Pricing Card Hover Effect
// ====================================
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ====================================
// Console Welcome Message
// ====================================
console.log('%c🌉 BeneBridge', 'font-size: 24px; font-weight: bold; color: #1a4d7a;');
console.log('%cVerified Beneficiary Transfers', 'font-size: 14px; color: #14b8a6;');
console.log('%cInterested in joining our team or partnership? Email dan@benebridge.io', 'font-size: 12px; color: #6c757d;');
