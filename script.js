// Check if preloader has already been shown in this session
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const hasShownPreloader = sessionStorage.getItem('preloaderShown');
    
    if (!hasShownPreloader) {
        // Show preloader only on first visit in this session
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Mark preloader as shown for this session
                sessionStorage.setItem('preloaderShown', 'true');
            }, 500);
        }, 2000);
    } else {
        // Hide preloader immediately if already shown before
        preloader.style.display = 'none';
    }
});

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 20 + 'px';
        cursorFollower.style.top = e.clientY - 20 + 'px';
    }, 100);
});

document.querySelectorAll('.magnetic-btn, .magnetic-element').forEach(element => {
    element.addEventListener('mouseenter', function(e) {
        this.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
    });
    
    element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.15;
        const moveY = y * 0.15;
        
        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
       
        if (this.classList.contains('magnetic-btn')) {
            this.style.transform += ' scale(1.05)';
        }
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0px, 0px) scale(1)';
    });
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);
document.querySelectorAll('.service-card, .work-item, .stat-card, .feature').forEach(el => {
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.2 + (index * 0.05);
        const yPos = scrolled * speed;
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.work-overlay');
        const image = this.querySelector('.work-image img');
        
        overlay.style.transform = 'translateY(0)';
        image.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.work-overlay');
        const image = this.querySelector('.work-image img');
        
        overlay.style.transform = 'translateY(100%)';
        image.style.transform = 'scale(1)';
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            workItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
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

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Change button to show loading state
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Add newsletter status (checkboxes not included in FormData by default if unchecked)
        formObject.newsletter = document.getElementById('newsletter').checked;

        // Send the data to your backend server
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => {
            if (!response.ok) {
                // If server responds with an error
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // On success
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset(); // Clear the form
        })
        .catch(error => {
            // On failure
            console.error('Error:', error);
            showNotification('Sorry, something went wrong. Please try again.', 'error');
        })
        .finally(() => {
            // Restore button to original state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-times' : type === 'warning' ? 'fa-exclamation' : 'fa-info'}"></i>
            </div>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${colors[type]};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-icon').style.cssText = `
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 400);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.8';
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 5000);
}

document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(field => {
    if (field) {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        field.addEventListener('input', function() {
            if (this.hasAttribute('required') && this.value.trim()) {
                this.style.borderColor = '#10b981';
            } else if (this.hasAttribute('required')) {
                this.style.borderColor = '#475569';
            }
        });
    }
});
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-question i');
                
                otherAnswer.style.maxHeight = '0';
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        if (isActive) {
            item.classList.remove('active');
            answer.style.maxHeight = '0';
            icon.style.transform = 'rotate(0deg)';
        } else {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(45deg)';
        }
    });
});

const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top magnetic-btn';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1000;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
    font-size: 1.2rem;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const scrollElements = document.querySelectorAll('.service-card, .work-item, .stat-card, .feature, .contact-item');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('fade-in-up');
};

const hideScrollElement = (element) => {
    element.classList.remove('fade-in-up');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceCard = this.closest('.service-card');
        const serviceName = serviceCard.dataset.service;
        
        serviceCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            serviceCard.style.transform = 'scale(1)';
        }, 150);
        
        showNotification(`Learn more about our ${serviceName} services. Contact us for detailed information!`, 'info');
    });
});

document.querySelectorAll('.floating-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'translateY(-20px) scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.animation = `float 6s ease-in-out infinite`;
        this.style.animationDelay = `${index * 1.5}s`;
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

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

const debouncedScrollHandler = debounce(() => {
    handleScrollAnimation();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
    
    document.body.classList.add('loaded');
});

document.querySelectorAll('a, button, .service-card, .work-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.opacity = '0.3';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.opacity = '0.5';
    });
});

if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}