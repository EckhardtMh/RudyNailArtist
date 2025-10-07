// ===== VARIÁVEIS GLOBAIS =====
let isMenuOpen = false;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePortfolioFilters();
    initializeAccordions();
    initializeContactForm();
    initializeFAQ();
    initializeScrollAnimations();
    initializeScrollToTop();
    initializeSmoothScroll();
});

// ===== NAVEGAÇÃO MOBILE =====
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                toggleMobileMenu();
            }
        });
    }

    // Destacar link ativo na navegação
    highlightActiveNavLink();
}

function toggleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    isMenuOpen = !isMenuOpen;

    // Prevenir scroll do body quando menu estiver aberto
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === '#home')) {
            link.classList.add('active');
        }
    });
}

// ===== FILTROS DO PORTFÓLIO =====
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar itens
            filterGalleryItems(galleryItems, filter);
        });
    });
}

function filterGalleryItems(items, filter) {
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== ACORDEÕES =====
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Fechar todos os acordeões
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir o acordeão clicado se não estava ativo
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// ===== FAQ =====
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fechar todas as perguntas
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir a pergunta clicada se não estava ativa
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ===== FORMULÁRIO DE CONTATO =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            submitContactForm();
        }
    });

    // Validação em tempo real
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');
    
    let isValid = true;

    // Validar nome
    if (!name.value.trim()) {
        showFieldError(name, 'Nome é obrigatório');
        isValid = false;
    } else {
        clearFieldError(name);
    }

    // Validar telefone
    if (!phone.value.trim()) {
        showFieldError(phone, 'Telefone é obrigatório');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showFieldError(phone, 'Telefone inválido');
        isValid = false;
    } else {
        clearFieldError(phone);
    }

    // Validar email (se preenchido)
    if (email.value.trim() && !isValidEmail(email.value)) {
        showFieldError(email, 'E-mail inválido');
        isValid = false;
    } else {
        clearFieldError(email);
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch(field.id) {
        case 'name':
            if (!value) {
                showFieldError(field, 'Nome é obrigatório');
                return false;
            }
            break;
        case 'phone':
            if (!value) {
                showFieldError(field, 'Telefone é obrigatório');
                return false;
            } else if (!isValidPhone(value)) {
                showFieldError(field, 'Telefone inválido');
                return false;
            }
            break;
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'E-mail inválido');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#e74c3c';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Simular envio do formulário
    showFormLoading();
    
    setTimeout(() => {
        hideFormLoading();
        showFormSuccess();
        form.reset();
    }, 2000);
}

function showFormLoading() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
}

function hideFormLoading() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Enviar Mensagem';
}

function showFormSuccess() {
    const form = document.getElementById('contactForm');
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        text-align: center;
        animation: fadeInUp 0.5s ease-out;
    `;
    successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entrarei em contato em breve.';
    
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ===== ANIMAÇÕES DE SCROLL =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll(`
        .service-card,
        .portfolio-item,
        .testimonial-card,
        .stat-item,
        .care-card,
        .mission-item,
        .cert-item,
        .timeline-item,
        .package-card,
        .gallery-item
    `);

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ===== SCROLL TO TOP =====
function initializeScrollToTop() {
    // Criar botão de scroll to top
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-brown);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-medium);
    `;

    document.body.appendChild(scrollTopBtn);

    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top ao clicar
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = 'var(--shadow-heavy)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-medium)';
    });
}

// ===== SCROLL SUAVE =====
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== LAZY LOADING PARA IMAGENS =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== CONTADOR ANIMADO =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    const suffix = counter.textContent.replace(/\d/g, '');
                    counter.textContent = Math.floor(current) + suffix;
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== PARALLAX EFFECT =====
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== TYPEWRITER EFFECT =====
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== MODAL PARA GALERIA =====
function initializeGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-item');
    
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        position: relative;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    `;
    
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Event listeners
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Aqui você adicionaria a lógica para mostrar a imagem no modal
            modal.style.display = 'flex';
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--white);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid var(--cream); border-top: 3px solid var(--light-brown); border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem;"></div>
            <p style="color: var(--dark-brown); font-family: var(--font-primary);">Carregando...</p>
        </div>
    `;
    
    // Adicionar animação de spin
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    // Remover loader quando página carregar
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// ===== TOOLTIP =====
function initializeTooltips() {
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--dark-brown);
                color: white;
                padding: 8px 12px;
                border-radius: 5px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// ===== INICIALIZAR FUNCIONALIDADES EXTRAS =====
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializeCounters();
    initializeParallax();
    initializeGalleryModal();
    initializeTooltips();
    
    // Inicializar loading screen apenas na primeira visita
    if (!sessionStorage.getItem('visited')) {
        initializeLoadingScreen();
        sessionStorage.setItem('visited', 'true');
    }
});

// ===== UTILITÁRIOS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
const debouncedScroll = debounce(function() {
    // Scroll events que precisam de debounce
}, 10);

const throttledResize = throttle(function() {
    // Resize events que precisam de throttle
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);
