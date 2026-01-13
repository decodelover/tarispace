/**
 * =====================================================
 * TARISPACE SITE CONTENT - Dynamic Content Manager
 * This script loads content from localStorage that was
 * saved by the admin dashboard and applies it to the main site
 * =====================================================
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        loadHeroContent();
        loadAboutContent();
        loadServicesContent();
        loadPortfolioContent();
        loadBlogContent();
        loadSkillsContent();
        loadContactInfo();
        loadSocialLinks();
        // Contact form is handled by site-tracking.js
    });

    // =====================================================
    // HERO SECTION
    // =====================================================
    function loadHeroContent() {
        const hero = JSON.parse(localStorage.getItem('tarispace_hero') || '{}');
        
        // Update profile image
        if (hero.profileImage) {
            const profileImg = document.querySelector('.profile-img');
            if (profileImg) {
                profileImg.src = hero.profileImage;
            }
        }
        
        // Update hero name
        if (hero.name) {
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.innerHTML = `Hello, I'm <span class="gradient-text">${escapeHtml(hero.name)}</span>`;
            }
        }
        
        // Update hero description
        if (hero.description) {
            const heroDesc = document.querySelector('.hero-description');
            if (heroDesc) {
                heroDesc.textContent = hero.description;
            }
        }
        
        // Update availability badge
        if (hero.availability) {
            const badge = document.querySelector('.badge-text');
            if (badge) {
                const availabilityTexts = {
                    'available': 'Available for Work',
                    'busy': 'Currently Busy',
                    'unavailable': 'Not Available'
                };
                badge.textContent = availabilityTexts[hero.availability] || 'Available for Work';
            }
        }
        
        // Update typewriter texts if stored
        if (hero.typewriterTexts) {
            // Store for typewriter script to use
            window.tarispaceTypewriterTexts = hero.typewriterTexts.split('\n').filter(t => t.trim());
        }
    }

    // =====================================================
    // ABOUT SECTION
    // =====================================================
    function loadAboutContent() {
        const about = JSON.parse(localStorage.getItem('tarispace_about') || '{}');
        
        // Update about image
        if (about.aboutImage) {
            const aboutImg = document.querySelector('.about-img');
            if (aboutImg) {
                aboutImg.src = about.aboutImage;
            }
        }
        
        // Update full name
        if (about.fullName) {
            const nameEl = document.querySelector('.about-info .info-item:nth-child(1) .info-value');
            if (nameEl) nameEl.textContent = about.fullName;
        }
        
        // Update specialty
        if (about.specialty) {
            const specialtyEl = document.querySelector('.about-info .info-item:nth-child(2) .info-value');
            if (specialtyEl) specialtyEl.textContent = about.specialty;
        }
        
        // Update location
        if (about.location) {
            const locationEl = document.querySelector('.about-info .info-item:nth-child(3) .info-value');
            if (locationEl) locationEl.textContent = about.location;
        }
        
        // Update focus
        if (about.focus) {
            const focusEl = document.querySelector('.about-info .info-item:nth-child(4) .info-value');
            if (focusEl) focusEl.textContent = about.focus;
        }
        
        // Update paragraphs
        const paragraphs = document.querySelectorAll('.about-paragraph');
        if (about.paragraph1 && paragraphs[0]) {
            paragraphs[0].textContent = about.paragraph1;
        }
        if (about.paragraph2 && paragraphs[1]) {
            paragraphs[1].textContent = about.paragraph2;
        }
        
        // Update statistics
        const stats = {
            'clients': about.statClients,
            'projects': about.statProjects,
            'awards': about.statAwards,
            'jobs': about.statJobs
        };
        
        const counterElements = document.querySelectorAll('.counter');
        counterElements.forEach(el => {
            const target = el.getAttribute('data-target');
            if (stats.clients && el.closest('.award-card')?.querySelector('p')?.textContent.includes('Client')) {
                el.setAttribute('data-target', stats.clients);
            }
            if (stats.projects && el.closest('.award-card')?.querySelector('p')?.textContent.includes('Project')) {
                el.setAttribute('data-target', stats.projects);
            }
            if (stats.awards && el.closest('.award-card')?.querySelector('p')?.textContent.includes('Award')) {
                el.setAttribute('data-target', stats.awards);
            }
            if (stats.jobs && el.closest('.award-card')?.querySelector('p')?.textContent.includes('Job')) {
                el.setAttribute('data-target', stats.jobs);
            }
        });
    }

    // =====================================================
    // SERVICES SECTION
    // =====================================================
    function loadServicesContent() {
        const services = JSON.parse(localStorage.getItem('tarispace_services') || '[]');
        
        // If no custom services, use defaults from HTML
        if (services.length === 0) return;
        
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;
        
        servicesGrid.innerHTML = services.map((service, index) => `
            <div class="service-card service-card-${(index % 6) + 1}">
                <div class="service-card-inner">
                    <div class="service-icon-wrapper">
                        <div class="icon-bg"></div>
                        <i class="${service.icon || 'las la-code'}"></i>
                    </div>
                    <h3>${escapeHtml(service.title)}</h3>
                    <p>${escapeHtml(service.description)}</p>
                    ${service.tags ? `
                    <div class="service-features">
                        ${service.tags.split(',').map(tag => `<span class="feature-tag">${escapeHtml(tag.trim())}</span>`).join('')}
                    </div>` : ''}
                    <a href="#page6" class="service-link">Learn More <i class="las la-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    }

    // =====================================================
    // PORTFOLIO SECTION
    // =====================================================
    function loadPortfolioContent() {
        const portfolio = JSON.parse(localStorage.getItem('tarispace_portfolio') || '[]');
        
        // If no custom projects, use defaults from HTML
        if (portfolio.length === 0) return;
        
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = portfolio.map(project => `
            <div class="portfolio-item" data-filter="${project.category || 'web'}">
                <div class="portfolio-card">
                    <div class="portfolio-image">
                        <img src="${escapeHtml(project.image || 'img/portfolio/default.jpg')}" alt="${escapeHtml(project.title)}">
                        <div class="portfolio-overlay">
                            <div class="overlay-content">
                                <h3>${escapeHtml(project.title)}</h3>
                                <p>${escapeHtml(project.description)}</p>
                            </div>
                            ${project.link ? `
                            <a href="${escapeHtml(project.link)}" target="_blank" class="portfolio-btn">
                                <i class="las la-external-link-alt"></i>
                            </a>` : ''}
                        </div>
                    </div>
                    <div class="portfolio-meta">
                        <h4>${escapeHtml(project.title)}</h4>
                        <p class="portfolio-description">${escapeHtml(project.fullDescription || project.description)}</p>
                        ${project.tags ? `
                        <div class="portfolio-tags">
                            ${project.tags.split(',').map(tag => `<span class="tag">${escapeHtml(tag.trim())}</span>`).join('')}
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Reinitialize filters
        initPortfolioFilters();
    }

    function initPortfolioFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-filter') === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // =====================================================
    // BLOG SECTION
    // =====================================================
    function loadBlogContent() {
        const blogs = JSON.parse(localStorage.getItem('tarispace_blogs') || '[]');
        
        // If no custom blogs, use defaults from HTML
        if (blogs.length === 0) return;
        
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;
        
        blogGrid.innerHTML = blogs.map(blog => `
            <article class="blog-post">
                <div class="blog-image">
                    <img src="${escapeHtml(blog.image || 'img/blog/default.jpg')}" alt="${escapeHtml(blog.title)}">
                    <div class="blog-category">${escapeHtml(blog.category || 'General')}</div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="author">
                            <i class="las la-user"></i>
                            <a href="#">${escapeHtml(blog.author || 'Tari Pereowei')}</a>
                        </span>
                        <span class="date">
                            <i class="las la-calendar"></i>
                            <a href="#">${formatDate(blog.date)}</a>
                        </span>
                    </div>
                    <h3 class="blog-title">
                        <a href="${blog.link || '#'}" ${blog.link ? 'target="_blank"' : ''}>
                            ${escapeHtml(blog.title)}
                        </a>
                    </h3>
                    <p class="blog-excerpt">${escapeHtml(blog.excerpt)}</p>
                    ${blog.tags ? `
                    <div class="blog-tags">
                        ${blog.tags.split(',').map(tag => `<span class="tag">${escapeHtml(tag.trim())}</span>`).join('')}
                    </div>` : ''}
                    <a href="${blog.link || '#'}" ${blog.link ? 'target="_blank"' : ''} class="read-more">
                        Read Article <i class="las la-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
    }

    // =====================================================
    // SKILLS SECTION
    // =====================================================
    function loadSkillsContent() {
        const skills = JSON.parse(localStorage.getItem('tarispace_skills') || '[]');
        
        // If no custom skills, use defaults from HTML
        if (skills.length === 0) return;
        
        const skillsContainer = document.querySelector('.skills-container');
        if (!skillsContainer) return;
        
        skillsContainer.innerHTML = skills.map(skill => `
            <div class="skill-item">
                <div class="skill-info">
                    <span class="skill-title">${escapeHtml(skill.name)}</span>
                    <span class="skill-percentage">${skill.percentage}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.percentage}%"></div>
                </div>
            </div>
        `).join('');
    }

    // =====================================================
    // CONTACT INFO
    // =====================================================
    function loadContactInfo() {
        const contact = JSON.parse(localStorage.getItem('tarispace_contact') || '{}');
        
        // Update phone
        if (contact.phone) {
            const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(link => {
                link.href = `tel:${contact.phone.replace(/\s/g, '')}`;
                const phoneText = link.querySelector('p') || link;
                if (phoneText.tagName === 'P' || phoneText.tagName === 'A') {
                    phoneText.textContent = contact.phone;
                }
            });
            
            // Update info items
            const phoneInfo = document.querySelector('.info-item .info-value a[href^="tel:"]');
            if (phoneInfo) {
                phoneInfo.href = `tel:${contact.phone.replace(/\s/g, '')}`;
                phoneInfo.textContent = contact.phone;
            }
        }
        
        // Update email
        if (contact.email) {
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
            emailLinks.forEach(link => {
                link.href = `mailto:${contact.email}`;
                const emailText = link.querySelector('p') || link;
                if (emailText.tagName === 'P' || emailText.tagName === 'A') {
                    emailText.textContent = contact.email;
                }
            });
            
            // Update info items
            const emailInfo = document.querySelector('.info-item .info-value a[href^="mailto:"]');
            if (emailInfo) {
                emailInfo.href = `mailto:${contact.email}`;
                emailInfo.textContent = contact.email;
            }
        }
        
        // Update location
        if (contact.location) {
            const locationCards = document.querySelectorAll('.contact-card-content p');
            locationCards.forEach(p => {
                if (p.previousElementSibling?.textContent.includes('Office')) {
                    p.textContent = contact.location;
                }
            });
        }
    }

    // =====================================================
    // SOCIAL LINKS
    // =====================================================
    function loadSocialLinks() {
        const social = JSON.parse(localStorage.getItem('tarispace_social') || '{}');
        
        // Update Facebook
        if (social.facebook) {
            document.querySelectorAll('a[href*="facebook.com"]').forEach(link => {
                link.href = social.facebook;
            });
        }
        
        // Update Twitter
        if (social.twitter) {
            document.querySelectorAll('a[href*="twitter.com"]').forEach(link => {
                link.href = social.twitter;
            });
        }
        
        // Update WhatsApp
        if (social.whatsapp) {
            const whatsappNumber = social.whatsapp.replace(/[^0-9]/g, '');
            document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
                link.href = `https://wa.me/${whatsappNumber}`;
            });
        }
        
        // Update GitHub
        if (social.github) {
            document.querySelectorAll('a[href*="github.com"]').forEach(link => {
                link.href = social.github;
            });
        }
        
        // Update LinkedIn
        if (social.linkedin) {
            document.querySelectorAll('a[href*="linkedin.com"]').forEach(link => {
                link.href = social.linkedin;
            });
        }
    }

    // =====================================================
    // UTILITY FUNCTIONS
    // =====================================================
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatDate(dateString) {
        if (!dateString) return 'Recent';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

})();
