/**
 * =====================================================
 * TARISPACE ADMIN DASHBOARD - JAVASCRIPT
 * Comprehensive admin functionality with visitor tracking,
 * content management, and real-time notifications
 * =====================================================
 */

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initDefaultData();
    initNavigation();
    initModals();
    initCharts();
    loadAllData();
    initNotifications();
    updateStats();
    initFormHandlers();
    initSettingsHandlers();
    startRealTimeUpdates();
});

// =====================================================
// DEFAULT DATA INITIALIZATION
// =====================================================
function initDefaultData() {
    // Initialize default services if none exist
    if (!localStorage.getItem('tarispace_services') || JSON.parse(localStorage.getItem('tarispace_services')).length === 0) {
        const defaultServices = [
            {
                title: 'Frontend Development',
                icon: 'las la-code',
                description: 'Creating stunning, responsive user interfaces with React, Vue, and modern CSS. Focused on performance, accessibility, and beautiful design.',
                tags: 'React/Vue, Responsive Design, Performance'
            },
            {
                title: 'Backend Development',
                icon: 'las la-server',
                description: 'Building robust, scalable server-side solutions with Node.js, Express, and modern databases. APIs, authentication, and cloud integration.',
                tags: 'Node.js, APIs, Databases'
            },
            {
                title: 'Full Stack Solutions',
                icon: 'las la-cube',
                description: 'End-to-end development of complete web applications from database design to UI implementation. Comprehensive solutions for your business needs.',
                tags: 'Full Stack, End-to-End, Scalable'
            },
            {
                title: 'Web3 & Blockchain',
                icon: 'las la-cube',
                description: 'Smart contract development, DApp creation, and blockchain integration. Specializing in Ethereum, Starknet, and Web3 architecture design.',
                tags: 'Smart Contracts, DApps, Web3'
            },
            {
                title: 'Performance Optimization',
                icon: 'las la-rocket',
                description: 'Enhancing speed, SEO rankings, and user experience. Code optimization, image compression, caching strategies, and Core Web Vitals improvement.',
                tags: 'Optimization, SEO, Speed'
            },
            {
                title: 'Technical Consultation',
                icon: 'las la-comments',
                description: 'Expert guidance on technology selection, architecture design, and implementation strategies. Helping you choose the right tools for your vision.',
                tags: 'Architecture, Strategy, Planning'
            }
        ];
        localStorage.setItem('tarispace_services', JSON.stringify(defaultServices));
    }
    
    // Initialize default portfolio if none exist
    if (!localStorage.getItem('tarispace_portfolio') || JSON.parse(localStorage.getItem('tarispace_portfolio')).length === 0) {
        const defaultPortfolio = [
            {
                title: 'Starknet RD Project',
                category: 'blockchain',
                image: 'img/starknet.png',
                link: 'https://starknetrd.com',
                description: 'Blockchain Development | Smart Contracts',
                fullDescription: 'A comprehensive blockchain infrastructure platform built on Starknet L2. Features smart contract deployment and developer tools for the Cairo ecosystem.',
                tags: 'Blockchain, Cairo, Web3'
            },
            {
                title: 'Taricents E-Commerce',
                category: 'web',
                image: 'img/tariscent.png',
                link: 'https://jasmineandrew441-netizen.github.io/taricents.com',
                description: 'Full Stack Web Application | E-Commerce',
                fullDescription: 'A modern e-commerce platform with seamless user experience. Includes product catalog, shopping cart, and secure checkout functionality.',
                tags: 'React, Node.js, Responsive'
            },
            {
                title: 'Fusion Design',
                category: 'design',
                image: 'img/portfolio/03.jpg',
                link: '',
                description: 'UI/UX Design | Component Library',
                fullDescription: 'A comprehensive design system with reusable UI components. Built for scalability and consistency across web applications.',
                tags: 'Design, Figma, Components'
            },
            {
                title: 'Analytics Dashboard',
                category: 'web',
                image: 'img/portfolio/04.jpg',
                link: '',
                description: 'Data Visualization | Real-time Analytics',
                fullDescription: 'Real-time analytics dashboard with interactive charts and data visualization. Features live updates and performance metrics tracking.',
                tags: 'Charts, Real-time, API'
            },
            {
                title: 'Web3 Wallet Interface',
                category: 'blockchain',
                image: 'img/portfolio/05.jpg',
                link: '',
                description: 'Web3 Integration | Blockchain UI',
                fullDescription: 'A decentralized wallet interface for Ethereum and EVM-compatible chains. Supports token transfers, NFT management, and DeFi integrations.',
                tags: 'Web3.js, Ethereum, DApp'
            },
            {
                title: 'Mobile Application',
                category: 'design',
                image: 'img/portfolio/06.jpg',
                link: '',
                description: 'Responsive Web App | Mobile Optimized',
                fullDescription: 'A mobile-first progressive web application with offline capabilities. Optimized for touch interactions and seamless cross-device experience.',
                tags: 'Mobile, PWA, Responsive'
            }
        ];
        localStorage.setItem('tarispace_portfolio', JSON.stringify(defaultPortfolio));
    }
    
    // Initialize default skills if none exist
    if (!localStorage.getItem('tarispace_skills') || JSON.parse(localStorage.getItem('tarispace_skills')).length === 0) {
        const defaultSkills = [
            { name: 'JavaScript / TypeScript', percentage: 95 },
            { name: 'React & Modern Frameworks', percentage: 92 },
            { name: 'Node.js & Backend', percentage: 95 },
            { name: 'Blockchain & Smart Contracts', percentage: 88 },
            { name: 'Databases (SQL & NoSQL)', percentage: 90 },
            { name: 'HTML5, CSS3 & UI/UX', percentage: 95 },
            { name: 'DevOps & Cloud Services', percentage: 85 },
            { name: 'Web3 & Ethereum', percentage: 87 }
        ];
        localStorage.setItem('tarispace_skills', JSON.stringify(defaultSkills));
    }
    
    // Initialize default blogs if none exist
    if (!localStorage.getItem('tarispace_blogs') || JSON.parse(localStorage.getItem('tarispace_blogs')).length === 0) {
        const defaultBlogs = [
            {
                title: 'How to Type React Children Correctly in TypeScript',
                category: 'React',
                author: 'Ohans Emmanuel',
                excerpt: 'Learn modern best practices for typing React children in TypeScript, including ReactNode, PropsWithChildren, and ComponentProps patterns.',
                image: 'img/blog/1.jpg',
                link: 'https://blog.logrocket.com/react-children-prop-typescript/',
                tags: 'React, TypeScript, Best Practices',
                date: '2024-01-15T00:00:00.000Z'
            },
            {
                title: 'The Complete Guide to Internationalization in Next.js',
                category: 'Next.js',
                author: 'Ivan Vlatkovic',
                excerpt: 'Learn how to internationalize Next.js apps with Lingui and next-intl, covering App Router, RSC, and dynamic language switching.',
                image: 'img/blog/3.jpg',
                link: 'https://blog.logrocket.com/complete-guide-internationalization-nextjs/',
                tags: 'Next.js, Backend, i18n',
                date: '2023-12-10T00:00:00.000Z'
            },
            {
                title: 'Preloading Responsive Images for Faster Load Times',
                category: 'Performance',
                author: 'Barry Pollard',
                excerpt: 'Learn how preloading responsive images can significantly improve load times, with practical use cases and real performance metrics.',
                image: 'img/blog/6.jpg',
                link: 'https://web.dev/articles/preload-responsive-images',
                tags: 'Performance, Optimization, Images',
                date: '2023-11-20T00:00:00.000Z'
            }
        ];
        localStorage.setItem('tarispace_blogs', JSON.stringify(defaultBlogs));
    }
}

// =====================================================
// AUTHENTICATION
// =====================================================
function checkAuth() {
    // Check both localStorage and sessionStorage
    const session = localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession');
    
    if (!session) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    try {
        const sessionData = JSON.parse(session);
        const loginTime = new Date(sessionData.loginTime).getTime();
        const now = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
        
        if (now - loginTime > sessionDuration) {
            localStorage.removeItem('adminSession');
            sessionStorage.removeItem('adminSession');
            window.location.href = 'admin-login.html';
        }
    } catch (e) {
        localStorage.removeItem('adminSession');
        sessionStorage.removeItem('adminSession');
        window.location.href = 'admin-login.html';
    }
}

function logout() {
    localStorage.removeItem('adminSession');
    sessionStorage.removeItem('adminSession');
    showToast('Logged Out', 'You have been successfully logged out', 'success');
    setTimeout(() => {
        window.location.href = 'admin-login.html';
    }, 1000);
}

// =====================================================
// NAVIGATION
// =====================================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-section');
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section - add '-section' suffix to match HTML IDs
            sections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(targetId + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Update page title
            updatePageTitle(targetId);
            
            // Close mobile sidebar
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
                mobileOverlay.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            mobileOverlay.classList.add('active');
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
        });
    }
}

function updatePageTitle(sectionId) {
    const pageInfo = document.querySelector('.page-info');
    const titles = {
        'dashboard': { title: 'Dashboard', breadcrumb: 'Home / Dashboard' },
        'visitors': { title: 'Visitors', breadcrumb: 'Home / Visitors' },
        'messages': { title: 'Messages', breadcrumb: 'Home / Messages' },
        'hero': { title: 'Hero Section', breadcrumb: 'Content / Hero' },
        'about': { title: 'About Me', breadcrumb: 'Content / About' },
        'services': { title: 'Services', breadcrumb: 'Content / Services' },
        'portfolio': { title: 'Portfolio', breadcrumb: 'Content / Portfolio' },
        'blog': { title: 'Blog', breadcrumb: 'Content / Blog' },
        'skills': { title: 'Skills', breadcrumb: 'Content / Skills' },
        'contact-info': { title: 'Contact Info', breadcrumb: 'Content / Contact Info' },
        'social-links': { title: 'Social Links', breadcrumb: 'Content / Social Links' },
        'settings': { title: 'Settings', breadcrumb: 'Home / Settings' }
    };
    
    const info = titles[sectionId] || { title: 'Dashboard', breadcrumb: 'Home / Dashboard' };
    pageInfo.innerHTML = `
        <h1>${info.title}</h1>
        <div class="breadcrumb">Home / <span>${info.title}</span></div>
    `;
}

// =====================================================
// MODALS
// =====================================================
function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
        
        // Close button
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal.id);
            });
        }
    });

    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal.id);
                }
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form if exists
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

// =====================================================
// CHARTS
// =====================================================
let visitorChart, trafficChart;

function initCharts() {
    initVisitorChart();
    initTrafficChart();
}

function initVisitorChart() {
    const ctx = document.getElementById('visitorChart');
    if (!ctx) return;
    
    const visitors = getVisitors();
    const last7Days = getLast7DaysData(visitors);
    
    visitorChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days.labels,
            datasets: [{
                label: 'Visitors',
                data: last7Days.data,
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#D4AF37',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#888',
                        stepSize: 1
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#888'
                    }
                }
            }
        }
    });
}

function initTrafficChart() {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) return;
    
    const visitors = getVisitors();
    const deviceData = getDeviceData(visitors);
    
    trafficChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [{
                data: [deviceData.desktop, deviceData.mobile, deviceData.tablet],
                backgroundColor: ['#D4AF37', '#3498db', '#27ae60'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#888',
                        padding: 20,
                        usePointStyle: true
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function getLast7DaysData(visitors) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const labels = [];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayName = days[date.getDay()];
        labels.push(dayName);
        
        // Count visitors for this day
        const count = visitors.filter(v => {
            const visitorDate = new Date(v.timestamp);
            return visitorDate.toDateString() === date.toDateString();
        }).length;
        data.push(count);
    }
    
    return { labels, data };
}

function getDeviceData(visitors) {
    let desktop = 0, mobile = 0, tablet = 0;
    
    visitors.forEach(v => {
        if (v.device === 'mobile') mobile++;
        else if (v.device === 'tablet') tablet++;
        else desktop++;
    });
    
    // Ensure at least some data for chart
    if (desktop === 0 && mobile === 0 && tablet === 0) {
        desktop = 1;
    }
    
    return { desktop, mobile, tablet };
}

function updateCharts() {
    const visitors = getVisitors();
    
    if (visitorChart) {
        const last7Days = getLast7DaysData(visitors);
        visitorChart.data.labels = last7Days.labels;
        visitorChart.data.datasets[0].data = last7Days.data;
        visitorChart.update();
    }
    
    if (trafficChart) {
        const deviceData = getDeviceData(visitors);
        trafficChart.data.datasets[0].data = [deviceData.desktop, deviceData.mobile, deviceData.tablet];
        trafficChart.update();
    }
}

// =====================================================
// DATA MANAGEMENT
// =====================================================
function loadAllData() {
    loadVisitors();
    loadMessages();
    loadServices();
    loadPortfolio();
    loadBlogs();
    loadSkills();
    loadHeroData();
    loadAboutData();
    loadContactInfo();
    loadSocialLinks();
    updateDashboardActivity();
    updateDashboardMessages();
}

// Get data from localStorage
function getVisitors() {
    return JSON.parse(localStorage.getItem('tarispace_visitors') || '[]');
}

function getMessages() {
    return JSON.parse(localStorage.getItem('tarispace_messages') || '[]');
}

function getServices() {
    return JSON.parse(localStorage.getItem('tarispace_services') || '[]');
}

function getPortfolio() {
    return JSON.parse(localStorage.getItem('tarispace_portfolio') || '[]');
}

function getBlogs() {
    return JSON.parse(localStorage.getItem('tarispace_blogs') || '[]');
}

function getSkills() {
    return JSON.parse(localStorage.getItem('tarispace_skills') || '[]');
}

// Save data to localStorage
function saveVisitors(data) {
    localStorage.setItem('tarispace_visitors', JSON.stringify(data));
}

function saveMessages(data) {
    localStorage.setItem('tarispace_messages', JSON.stringify(data));
}

function saveServices(data) {
    localStorage.setItem('tarispace_services', JSON.stringify(data));
}

function savePortfolio(data) {
    localStorage.setItem('tarispace_portfolio', JSON.stringify(data));
}

function saveBlogs(data) {
    localStorage.setItem('tarispace_blogs', JSON.stringify(data));
}

function saveSkills(data) {
    localStorage.setItem('tarispace_skills', JSON.stringify(data));
}

// =====================================================
// STATISTICS
// =====================================================
function updateStats() {
    const visitors = getVisitors();
    const messages = getMessages();
    const portfolio = getPortfolio();
    const services = getServices();
    
    // Today's visitors
    const today = new Date().toDateString();
    const todayVisitors = visitors.filter(v => new Date(v.timestamp).toDateString() === today).length;
    
    // Unread messages
    const unreadMessages = messages.filter(m => !m.read).length;
    
    // Update dashboard stats
    const totalVisitorsEl = document.getElementById('totalVisitors');
    const totalMessagesEl = document.getElementById('totalMessages');
    const totalProjectsEl = document.getElementById('totalProjects');
    const totalServicesEl = document.getElementById('totalServices');
    const unreadMessagesEl = document.getElementById('unreadMessages');
    
    if (totalVisitorsEl) animateNumber(totalVisitorsEl, visitors.length);
    if (totalMessagesEl) animateNumber(totalMessagesEl, messages.length);
    if (totalProjectsEl) animateNumber(totalProjectsEl, portfolio.length || 6);
    if (totalServicesEl) animateNumber(totalServicesEl, services.length || 6);
    if (unreadMessagesEl) unreadMessagesEl.textContent = `${unreadMessages} unread`;
    
    // Update visitor section stats
    const uniqueVisitorsEl = document.getElementById('uniqueVisitors');
    const todayVisitorsEl = document.getElementById('todayVisitors');
    const countriesCountEl = document.getElementById('countriesCount');
    
    if (uniqueVisitorsEl) {
        const uniqueIPs = [...new Set(visitors.map(v => v.ip))].length;
        animateNumber(uniqueVisitorsEl, uniqueIPs);
    }
    if (todayVisitorsEl) animateNumber(todayVisitorsEl, todayVisitors);
    if (countriesCountEl) {
        const countries = [...new Set(visitors.map(v => v.country).filter(Boolean))].length;
        animateNumber(countriesCountEl, countries || 1);
    }
    
    // Update badges
    updateBadges(unreadMessages, visitors.length);
}

function animateNumber(element, target) {
    const duration = 1000;
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

function updateBadges(unreadMessages, totalVisitors) {
    const messageBadge = document.querySelector('[data-section="messages"] .nav-badge');
    const visitorBadge = document.querySelector('[data-section="visitors"] .nav-badge');
    
    if (messageBadge) messageBadge.textContent = unreadMessages;
    if (visitorBadge) visitorBadge.textContent = totalVisitors;
}

// =====================================================
// VISITORS
// =====================================================
function loadVisitors() {
    const visitors = getVisitors();
    const tableBody = document.getElementById('visitorsTableBody');
    
    if (!tableBody) return;
    
    if (visitors.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px;">
                    <i class="las la-users" style="font-size: 40px; color: var(--text-muted);"></i>
                    <p style="margin-top: 10px; color: var(--text-muted);">No visitors recorded yet</p>
                </td>
            </tr>
        `;
        return;
    }
    
    // Sort by most recent
    const sortedVisitors = [...visitors].reverse().slice(0, 50);
    
    tableBody.innerHTML = sortedVisitors.map((visitor, index) => `
        <tr>
            <td>${visitors.length - index}</td>
            <td>${visitor.ip || 'Unknown'}</td>
            <td><i class="las la-map-marker"></i> ${visitor.location || 'Unknown'}</td>
            <td>${visitor.device || 'Desktop'}</td>
            <td>${visitor.page || 'Home'}</td>
            <td>${formatDate(visitor.timestamp)}</td>
        </tr>
    `).join('');
    
    // Update mini stats
    updateVisitorStats(visitors);
}

function updateVisitorStats(visitors) {
    const today = new Date().toDateString();
    const todayVisitors = visitors.filter(v => new Date(v.timestamp).toDateString() === today).length;
    
    const todayStat = document.querySelector('.mini-stat:nth-child(1) h4');
    const totalStat = document.querySelector('.mini-stat:nth-child(2) h4');
    const uniqueStat = document.querySelector('.mini-stat:nth-child(3) h4');
    
    if (todayStat) todayStat.textContent = todayVisitors;
    if (totalStat) totalStat.textContent = visitors.length;
    
    // Unique IPs
    const uniqueIPs = [...new Set(visitors.map(v => v.ip))].length;
    if (uniqueStat) uniqueStat.textContent = uniqueIPs;
}

// =====================================================
// MESSAGES
// =====================================================
function loadMessages() {
    const messages = getMessages();
    const messagesList = document.getElementById('messagesList');
    
    if (!messagesList) return;
    
    if (messages.length === 0) {
        messagesList.innerHTML = `
            <div class="empty-state">
                <i class="las la-envelope-open"></i>
                <h4>No Messages</h4>
                <p>Messages from the contact form will appear here</p>
            </div>
        `;
        return;
    }
    
    // Sort by most recent
    const sortedMessages = [...messages].reverse();
    
    messagesList.innerHTML = sortedMessages.map((msg, index) => `
        <div class="message-item ${msg.read ? '' : 'unread'}" data-index="${messages.length - 1 - index}" onclick="viewMessage(${messages.length - 1 - index})">
            <div class="message-item-header">
                <h4>${escapeHtml(msg.name)}</h4>
                <span>${formatDate(msg.timestamp)}</span>
            </div>
            <div class="message-item-email">${escapeHtml(msg.email)}</div>
            <div class="message-item-preview">${escapeHtml(msg.message)}</div>
        </div>
    `).join('');
}

function viewMessage(index) {
    const messages = getMessages();
    const message = messages[index];
    
    if (!message) return;
    
    // Mark as read
    if (!message.read) {
        messages[index].read = true;
        saveMessages(messages);
        loadMessages();
        updateStats();
    }
    
    const messageDetail = document.getElementById('messageDetail');
    if (messageDetail) {
        messageDetail.innerHTML = `
            <div class="message-detail-header">
                <h3>${escapeHtml(message.subject || 'No Subject')}</h3>
                <div class="message-detail-meta">
                    <span><i class="las la-user"></i> ${escapeHtml(message.name)}</span>
                    <span><i class="las la-envelope"></i> ${escapeHtml(message.email)}</span>
                    <span><i class="las la-clock"></i> ${formatDate(message.timestamp)}</span>
                </div>
            </div>
            <div class="message-detail-body">
                ${escapeHtml(message.message).replace(/\n/g, '<br>')}
            </div>
            <div class="message-actions">
                <a href="mailto:${escapeHtml(message.email)}" class="btn btn-primary">
                    <i class="las la-reply"></i> Reply
                </a>
                <button class="btn btn-danger" onclick="deleteMessage(${index})">
                    <i class="las la-trash"></i> Delete
                </button>
            </div>
        `;
        messageDetail.classList.add('active');
    }
    
    // Highlight active message
    document.querySelectorAll('.message-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.index) === index) {
            item.classList.add('active');
        }
    });
}

function deleteMessage(index) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    const messages = getMessages();
    messages.splice(index, 1);
    saveMessages(messages);
    
    loadMessages();
    updateStats();
    
    const messageDetail = document.getElementById('messageDetail');
    if (messageDetail) {
        messageDetail.innerHTML = `
            <div class="no-message-selected">
                <i class="las la-envelope-open-text"></i>
                <p>Select a message to view</p>
            </div>
        `;
        messageDetail.classList.remove('active');
    }
    
    showToast('Message Deleted', 'The message has been removed', 'success');
}

// =====================================================
// SERVICES
// =====================================================
function loadServices() {
    const services = getServices();
    const grid = document.getElementById('servicesGrid');
    
    if (!grid) return;
    
    if (services.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="las la-cogs"></i>
                <h4>No Services</h4>
                <p>Add your first service to display here</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = services.map((service, index) => `
        <div class="item-card">
            <div class="item-card-image">
                <i class="${service.icon || 'las la-laptop-code'}"></i>
            </div>
            <div class="item-card-content">
                <h4>${escapeHtml(service.title)}</h4>
                <p>${escapeHtml(service.description)}</p>
                ${service.tags ? `<div class="item-tags">${service.tags.split(',').map(tag => `<span class="item-tag">${escapeHtml(tag.trim())}</span>`).join('')}</div>` : ''}
                <div class="item-actions">
                    <button class="item-btn edit" onclick="editService(${index})">
                        <i class="las la-edit"></i> Edit
                    </button>
                    <button class="item-btn delete" onclick="deleteService(${index})">
                        <i class="las la-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addService() {
    document.getElementById('serviceModalTitle').textContent = 'Add New Service';
    document.getElementById('serviceId').value = '';
    document.getElementById('serviceForm').reset();
    openModal('serviceModal');
}

function editService(index) {
    const services = getServices();
    const service = services[index];
    
    if (!service) return;
    
    document.getElementById('serviceModalTitle').textContent = 'Edit Service';
    document.getElementById('serviceId').value = index;
    document.getElementById('serviceTitle').value = service.title;
    document.getElementById('serviceIcon').value = service.icon || '';
    document.getElementById('serviceDesc').value = service.description;
    if (document.getElementById('serviceTags')) {
        document.getElementById('serviceTags').value = service.tags || '';
    }
    
    openModal('serviceModal');
}

function saveService(e) {
    e.preventDefault();
    
    const index = document.getElementById('serviceId').value;
    const services = getServices();
    
    const service = {
        title: document.getElementById('serviceTitle').value,
        icon: document.getElementById('serviceIcon').value,
        description: document.getElementById('serviceDesc').value,
        tags: document.getElementById('serviceTags')?.value || ''
    };
    
    if (index === '') {
        services.push(service);
        showToast('Service Added', 'New service has been added successfully', 'success');
    } else {
        services[parseInt(index)] = service;
        showToast('Service Updated', 'Service has been updated successfully', 'success');
    }
    
    saveServices(services);
    loadServices();
    updateStats();
    closeModal('serviceModal');
}

function deleteService(index) {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    const services = getServices();
    services.splice(index, 1);
    saveServices(services);
    
    loadServices();
    updateStats();
    showToast('Service Deleted', 'Service has been removed', 'success');
}

// =====================================================
// PORTFOLIO
// =====================================================
function loadPortfolio() {
    const portfolio = getPortfolio();
    const grid = document.getElementById('portfolioGrid');
    
    if (!grid) return;
    
    if (portfolio.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="las la-images"></i>
                <h4>No Projects</h4>
                <p>Add your first project to display here</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = portfolio.map((project, index) => `
        <div class="item-card">
            <div class="item-card-image">
                ${project.image 
                    ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">`
                    : '<i class="las la-image"></i>'
                }
            </div>
            <div class="item-card-content">
                <h4>${escapeHtml(project.title)}</h4>
                <p>${escapeHtml(project.description)}</p>
                <div class="item-tags">
                    <span class="item-tag category">${escapeHtml(project.category || 'Web')}</span>
                    ${project.link ? `<a href="${escapeHtml(project.link)}" target="_blank" class="item-link"><i class="las la-external-link-alt"></i></a>` : ''}
                </div>
                ${project.tags ? `<div class="item-tags">${project.tags.split(',').map(tag => `<span class="item-tag">${escapeHtml(tag.trim())}</span>`).join('')}</div>` : ''}
                <div class="item-actions">
                    <button class="item-btn edit" onclick="editProject(${index})">
                        <i class="las la-edit"></i> Edit
                    </button>
                    <button class="item-btn delete" onclick="deleteProject(${index})">
                        <i class="las la-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addProject() {
    document.getElementById('projectModalTitle').textContent = 'Add New Project';
    document.getElementById('projectId').value = '';
    document.getElementById('projectForm').reset();
    openModal('projectModal');
}

function editProject(index) {
    const portfolio = getPortfolio();
    const project = portfolio[index];
    
    if (!project) return;
    
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('projectId').value = index;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectCategory').value = project.category || 'web';
    document.getElementById('projectImage').value = project.image || '';
    document.getElementById('projectLink').value = project.link || '';
    document.getElementById('projectDesc').value = project.description;
    if (document.getElementById('projectFullDesc')) {
        document.getElementById('projectFullDesc').value = project.fullDescription || '';
    }
    if (document.getElementById('projectTags')) {
        document.getElementById('projectTags').value = project.tags || '';
    }
    
    openModal('projectModal');
}

function saveProject(e) {
    e.preventDefault();
    
    const index = document.getElementById('projectId').value;
    const portfolio = getPortfolio();
    
    const project = {
        title: document.getElementById('projectTitle').value,
        category: document.getElementById('projectCategory').value,
        image: document.getElementById('projectImage').value,
        link: document.getElementById('projectLink').value,
        description: document.getElementById('projectDesc').value,
        fullDescription: document.getElementById('projectFullDesc')?.value || '',
        tags: document.getElementById('projectTags')?.value || ''
    };
    
    if (index === '') {
        portfolio.push(project);
        showToast('Project Added', 'New project has been added successfully', 'success');
    } else {
        portfolio[parseInt(index)] = project;
        showToast('Project Updated', 'Project has been updated successfully', 'success');
    }
    
    savePortfolio(portfolio);
    loadPortfolio();
    updateStats();
    closeModal('projectModal');
}

function deleteProject(index) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const portfolio = getPortfolio();
    portfolio.splice(index, 1);
    savePortfolio(portfolio);
    
    loadPortfolio();
    updateStats();
    showToast('Project Deleted', 'Project has been removed', 'success');
}

// =====================================================
// BLOGS
// =====================================================
function loadBlogs() {
    const blogs = getBlogs();
    const grid = document.getElementById('blogGrid');
    
    if (!grid) return;
    
    if (blogs.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="las la-newspaper"></i>
                <h4>No Blog Posts</h4>
                <p>Add your first blog post to display here</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = blogs.map((blog, index) => `
        <div class="item-card">
            <div class="item-card-image">
                ${blog.image 
                    ? `<img src="${escapeHtml(blog.image)}" alt="${escapeHtml(blog.title)}">`
                    : '<i class="las la-newspaper"></i>'
                }
            </div>
            <div class="item-card-content">
                <h4>${escapeHtml(blog.title)}</h4>
                <p>${escapeHtml(blog.excerpt || '')}</p>
                <div class="item-tags">
                    <span class="item-tag category">${escapeHtml(blog.category || 'General')}</span>
                    <span class="item-tag date">${formatDate(blog.date)}</span>
                    ${blog.link ? `<a href="${escapeHtml(blog.link)}" target="_blank" class="item-link"><i class="las la-external-link-alt"></i></a>` : ''}
                </div>
                ${blog.tags ? `<div class="item-tags">${blog.tags.split(',').map(tag => `<span class="item-tag">${escapeHtml(tag.trim())}</span>`).join('')}</div>` : ''}
                <div class="item-actions">
                    <button class="item-btn edit" onclick="editBlog(${index})">
                        <i class="las la-edit"></i> Edit
                    </button>
                    <button class="item-btn delete" onclick="deleteBlog(${index})">
                        <i class="las la-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addBlog() {
    document.getElementById('blogModalTitle').textContent = 'Add New Blog Post';
    document.getElementById('blogId').value = '';
    document.getElementById('blogForm').reset();
    openModal('blogModal');
}

function editBlog(index) {
    const blogs = getBlogs();
    const blog = blogs[index];
    
    if (!blog) return;
    
    document.getElementById('blogModalTitle').textContent = 'Edit Blog Post';
    document.getElementById('blogId').value = index;
    document.getElementById('blogTitle').value = blog.title;
    document.getElementById('blogCategory').value = blog.category || '';
    document.getElementById('blogImage').value = blog.image || '';
    document.getElementById('blogExcerpt').value = blog.excerpt || '';
    if (document.getElementById('blogAuthor')) {
        document.getElementById('blogAuthor').value = blog.author || 'Tari Pereowei';
    }
    if (document.getElementById('blogLink')) {
        document.getElementById('blogLink').value = blog.link || '';
    }
    if (document.getElementById('blogTags')) {
        document.getElementById('blogTags').value = blog.tags || '';
    }
    
    openModal('blogModal');
}

function saveBlog(e) {
    e.preventDefault();
    
    const index = document.getElementById('blogId').value;
    const blogs = getBlogs();
    
    const blog = {
        title: document.getElementById('blogTitle').value,
        category: document.getElementById('blogCategory').value,
        image: document.getElementById('blogImage').value,
        excerpt: document.getElementById('blogExcerpt').value,
        author: document.getElementById('blogAuthor')?.value || 'Tari Pereowei',
        link: document.getElementById('blogLink')?.value || '',
        tags: document.getElementById('blogTags')?.value || '',
        date: index === '' ? new Date().toISOString() : blogs[parseInt(index)]?.date || new Date().toISOString()
    };
    
    if (index === '') {
        blogs.push(blog);
        showToast('Blog Added', 'New blog post has been added successfully', 'success');
    } else {
        blogs[parseInt(index)] = blog;
        showToast('Blog Updated', 'Blog post has been updated successfully', 'success');
    }
    
    saveBlogs(blogs);
    loadBlogs();
    closeModal('blogModal');
}

function deleteBlog(index) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    const blogs = getBlogs();
    blogs.splice(index, 1);
    saveBlogs(blogs);
    
    loadBlogs();
    showToast('Blog Deleted', 'Blog post has been removed', 'success');
}

// =====================================================
// SKILLS
// =====================================================
function loadSkills() {
    const skills = getSkills();
    const container = document.getElementById('skillsManager');
    
    if (!container) return;
    
    if (skills.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="las la-chart-bar"></i>
                <h4>No Skills</h4>
                <p>Add your first skill to display here</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = skills.map((skill, index) => `
        <div class="skill-row">
            <div class="skill-name">${escapeHtml(skill.name)}</div>
            <div class="skill-bar-wrapper">
                <div class="skill-bar-fill" style="width: ${skill.percentage}%"></div>
            </div>
            <div class="skill-percentage">${skill.percentage}%</div>
            <div class="skill-actions">
                <button class="skill-btn" onclick="editSkill(${index})">
                    <i class="las la-edit"></i>
                </button>
                <button class="skill-btn delete" onclick="deleteSkill(${index})">
                    <i class="las la-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function addSkill() {
    document.getElementById('skillModalTitle').textContent = 'Add New Skill';
    document.getElementById('skillId').value = '';
    document.getElementById('skillLevel').value = 50;
    document.getElementById('skillLevelDisplay').textContent = '50%';
    document.getElementById('skillForm').reset();
    openModal('skillModal');
}

function editSkill(index) {
    const skills = getSkills();
    const skill = skills[index];
    
    if (!skill) return;
    
    document.getElementById('skillModalTitle').textContent = 'Edit Skill';
    document.getElementById('skillId').value = index;
    document.getElementById('skillName').value = skill.name;
    document.getElementById('skillLevel').value = skill.percentage;
    document.getElementById('skillLevelDisplay').textContent = skill.percentage + '%';
    
    openModal('skillModal');
}

function saveSkill(e) {
    e.preventDefault();
    
    const index = document.getElementById('skillId').value;
    const skills = getSkills();
    
    const skill = {
        name: document.getElementById('skillName').value,
        percentage: parseInt(document.getElementById('skillLevel').value)
    };
    
    if (index === '') {
        skills.push(skill);
        showToast('Skill Added', 'New skill has been added successfully', 'success');
    } else {
        skills[parseInt(index)] = skill;
        showToast('Skill Updated', 'Skill has been updated successfully', 'success');
    }
    
    saveSkills(skills);
    loadSkills();
    closeModal('skillModal');
}

function deleteSkill(index) {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    const skills = getSkills();
    skills.splice(index, 1);
    saveSkills(skills);
    
    loadSkills();
    showToast('Skill Deleted', 'Skill has been removed', 'success');
}

// =====================================================
// HERO, ABOUT, CONTACT, SOCIAL
// =====================================================
function loadHeroData() {
    const hero = JSON.parse(localStorage.getItem('tarispace_hero') || '{}');
    
    if (document.getElementById('heroName')) {
        document.getElementById('heroName').value = hero.name || 'Tari Pereowei';
    }
    if (document.getElementById('heroTitle')) {
        document.getElementById('heroTitle').value = hero.title || "Hello, I'm";
    }
    if (document.getElementById('heroDescription')) {
        document.getElementById('heroDescription').value = hero.description || 'A Full Stack Developer from Bayelsa State, Nigeria. Building beautiful and functional web solutions.';
    }
    if (document.getElementById('heroTypewriter')) {
        document.getElementById('heroTypewriter').value = hero.typewriterTexts || 'Web Developer\nBlockchain Developer\nFull Stack Developer\nFrontend Engineer';
    }
    if (document.getElementById('heroAvailability')) {
        document.getElementById('heroAvailability').value = hero.availability || 'available';
    }
    // Profile image
    if (document.getElementById('heroImageUrl')) {
        document.getElementById('heroImageUrl').value = hero.profileImage || 'img/tari about image.png';
    }
    if (document.getElementById('heroImagePreview') && hero.profileImage) {
        document.getElementById('heroImagePreview').src = hero.profileImage;
    }
    
    // Live preview for hero image
    const heroImageInput = document.getElementById('heroImageUrl');
    if (heroImageInput) {
        heroImageInput.addEventListener('input', function() {
            const preview = document.getElementById('heroImagePreview');
            if (preview && this.value) {
                preview.src = this.value;
            }
        });
    }
}

function saveHeroData() {
    const hero = {
        name: document.getElementById('heroName')?.value || 'Tari Pereowei',
        title: document.getElementById('heroTitle')?.value || "Hello, I'm",
        description: document.getElementById('heroDescription')?.value || '',
        typewriterTexts: document.getElementById('heroTypewriter')?.value || '',
        availability: document.getElementById('heroAvailability')?.value || 'available',
        profileImage: document.getElementById('heroImageUrl')?.value || 'img/tari about image.png'
    };
    
    localStorage.setItem('tarispace_hero', JSON.stringify(hero));
    showToast('Hero Updated', 'Hero section has been updated successfully', 'success');
}

function loadAboutData() {
    const about = JSON.parse(localStorage.getItem('tarispace_about') || '{}');
    
    // Default paragraph content from the main site
    const defaultPara1 = "I'm Tari—a creative problem-solver and tech enthusiast who transforms ideas into elegant digital experiences. I blend analytical thinking with artistic vision to build web solutions that truly make an impact.";
    const defaultPara2 = "I'm passionate about clean code, modern design, and the exciting possibilities of blockchain technology. Every project I take on reflects my commitment to excellence and attention to detail.";
    
    // About image
    if (document.getElementById('aboutImageUrl')) {
        document.getElementById('aboutImageUrl').value = about.aboutImage || 'img/tari about image.png';
    }
    if (document.getElementById('aboutImagePreview') && about.aboutImage) {
        document.getElementById('aboutImagePreview').src = about.aboutImage;
    }
    
    // Live preview for about image
    const aboutImageInput = document.getElementById('aboutImageUrl');
    if (aboutImageInput) {
        aboutImageInput.addEventListener('input', function() {
            const preview = document.getElementById('aboutImagePreview');
            if (preview && this.value) {
                preview.src = this.value;
            }
        });
    }
    
    if (document.getElementById('aboutFullName')) {
        document.getElementById('aboutFullName').value = about.fullName || 'Tari Godsproperty Pereowei';
    }
    if (document.getElementById('aboutSpecialty')) {
        document.getElementById('aboutSpecialty').value = about.specialty || 'Full Stack & Blockchain Dev';
    }
    if (document.getElementById('aboutLocation')) {
        document.getElementById('aboutLocation').value = about.location || 'Bayelsa State, Nigeria';
    }
    if (document.getElementById('aboutFocus')) {
        document.getElementById('aboutFocus').value = about.focus || 'Web3 & Smart Contracts';
    }
    if (document.getElementById('aboutPara1')) {
        document.getElementById('aboutPara1').value = about.paragraph1 || defaultPara1;
    }
    if (document.getElementById('aboutPara2')) {
        document.getElementById('aboutPara2').value = about.paragraph2 || defaultPara2;
    }
    if (document.getElementById('statClients')) {
        document.getElementById('statClients').value = about.statClients || 19;
    }
    if (document.getElementById('statProjects')) {
        document.getElementById('statProjects').value = about.statProjects || 30;
    }
    if (document.getElementById('statAwards')) {
        document.getElementById('statAwards').value = about.statAwards || 2;
    }
    if (document.getElementById('statJobs')) {
        document.getElementById('statJobs').value = about.statJobs || 28;
    }
}

function saveAboutData() {
    const about = {
        aboutImage: document.getElementById('aboutImageUrl')?.value || 'img/tari about image.png',
        fullName: document.getElementById('aboutFullName')?.value || '',
        specialty: document.getElementById('aboutSpecialty')?.value || '',
        location: document.getElementById('aboutLocation')?.value || '',
        focus: document.getElementById('aboutFocus')?.value || '',
        paragraph1: document.getElementById('aboutPara1')?.value || '',
        paragraph2: document.getElementById('aboutPara2')?.value || '',
        statClients: document.getElementById('statClients')?.value || 19,
        statProjects: document.getElementById('statProjects')?.value || 30,
        statAwards: document.getElementById('statAwards')?.value || 2,
        statJobs: document.getElementById('statJobs')?.value || 28
    };
    
    localStorage.setItem('tarispace_about', JSON.stringify(about));
    showToast('About Updated', 'About section has been updated successfully', 'success');
}

function loadContactInfo() {
    const contact = JSON.parse(localStorage.getItem('tarispace_contact') || '{}');
    
    if (document.getElementById('contactPhone')) {
        document.getElementById('contactPhone').value = contact.phone || '+234 704 645 7549';
    }
    if (document.getElementById('contactEmail')) {
        document.getElementById('contactEmail').value = contact.email || 'taripereowei@gmail.com';
    }
    if (document.getElementById('contactLocation')) {
        document.getElementById('contactLocation').value = contact.location || 'Yenagoa, Bayelsa State';
    }
    if (document.getElementById('contactCountry')) {
        document.getElementById('contactCountry').value = contact.country || 'Nigeria';
    }
    if (document.getElementById('contactWebsite')) {
        document.getElementById('contactWebsite').value = contact.website || 'https://tarispace.com';
    }
}

function saveContactData() {
    const contact = {
        phone: document.getElementById('contactPhone')?.value || '',
        email: document.getElementById('contactEmail')?.value || '',
        location: document.getElementById('contactLocation')?.value || '',
        country: document.getElementById('contactCountry')?.value || '',
        website: document.getElementById('contactWebsite')?.value || ''
    };
    
    localStorage.setItem('tarispace_contact', JSON.stringify(contact));
    showToast('Contact Updated', 'Contact information has been updated successfully', 'success');
}

function loadSocialLinks() {
    const social = JSON.parse(localStorage.getItem('tarispace_social') || '{}');
    
    if (document.getElementById('socialFacebook')) {
        document.getElementById('socialFacebook').value = social.facebook || 'https://facebook.com/tarilove';
    }
    if (document.getElementById('socialTwitter')) {
        document.getElementById('socialTwitter').value = social.twitter || 'https://twitter.com/tarilove19';
    }
    if (document.getElementById('socialWhatsapp')) {
        document.getElementById('socialWhatsapp').value = social.whatsapp || '+2347046457549';
    }
    if (document.getElementById('socialGithub')) {
        document.getElementById('socialGithub').value = social.github || 'https://github.com/tarispace';
    }
    if (document.getElementById('socialLinkedin')) {
        document.getElementById('socialLinkedin').value = social.linkedin || '';
    }
}

function saveSocialData() {
    const social = {
        facebook: document.getElementById('socialFacebook')?.value || '',
        twitter: document.getElementById('socialTwitter')?.value || '',
        whatsapp: document.getElementById('socialWhatsapp')?.value || '',
        github: document.getElementById('socialGithub')?.value || '',
        linkedin: document.getElementById('socialLinkedin')?.value || ''
    };
    
    localStorage.setItem('tarispace_social', JSON.stringify(social));
    showToast('Social Links Updated', 'Social media links have been updated successfully', 'success');
}

// =====================================================
// DASHBOARD ACTIVITY & MESSAGES
// =====================================================
function updateDashboardActivity() {
    const visitors = getVisitors();
    const activityList = document.getElementById('recentActivity');
    
    if (!activityList) return;
    
    if (visitors.length === 0) {
        activityList.innerHTML = `
            <div class="activity-item">
                <div class="activity-content">
                    <p style="color: var(--text-muted);">No recent activity</p>
                </div>
            </div>
        `;
        return;
    }
    
    const recent = [...visitors].reverse().slice(0, 5);
    
    activityList.innerHTML = recent.map(v => `
        <div class="activity-item">
            <div class="activity-icon visitor">
                <i class="las la-user"></i>
            </div>
            <div class="activity-content">
                <p>New visitor from <strong>${v.location || 'Unknown'}</strong></p>
                <span>${formatDate(v.timestamp)}</span>
            </div>
        </div>
    `).join('');
}

function updateDashboardMessages() {
    const messages = getMessages();
    const messagesPreview = document.getElementById('recentMessages');
    
    if (!messagesPreview) return;
    
    if (messages.length === 0) {
        messagesPreview.innerHTML = `
            <div class="message-preview-item">
                <div class="message-preview-content">
                    <p style="color: var(--text-muted);">No messages yet</p>
                </div>
            </div>
        `;
        return;
    }
    
    const recent = [...messages].reverse().slice(0, 3);
    
    messagesPreview.innerHTML = recent.map(msg => `
        <div class="message-preview-item ${msg.read ? '' : 'unread'}">
            <div class="message-avatar">${msg.name.charAt(0).toUpperCase()}</div>
            <div class="message-preview-content">
                <div class="message-preview-header">
                    <h4>${escapeHtml(msg.name)}</h4>
                    <span>${formatDate(msg.timestamp)}</span>
                </div>
                <div class="message-preview-text">${escapeHtml(msg.message)}</div>
            </div>
        </div>
    `).join('');
}

// =====================================================
// NOTIFICATIONS
// =====================================================
function initNotifications() {
    const notificationBtn = document.querySelector('.header-btn:has(.notification-count), .header-btn[onclick*="notification"]');
    const panel = document.querySelector('.notification-panel');
    
    if (notificationBtn && panel) {
        notificationBtn.addEventListener('click', () => {
            panel.classList.toggle('active');
            loadNotifications();
        });
    }
    
    // Clear notifications button
    const clearNotifBtn = document.getElementById('clearNotifications');
    if (clearNotifBtn) {
        clearNotifBtn.addEventListener('click', clearNotifications);
    }
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (panel && panel.classList.contains('active')) {
            if (!panel.contains(e.target) && !e.target.closest('.header-btn')) {
                panel.classList.remove('active');
            }
        }
    });
    
    loadNotifications();
}

function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('tarispace_notifications') || '[]');
    const list = document.getElementById('notificationList');
    const countEl = document.querySelector('.notification-count');
    
    const unread = notifications.filter(n => !n.read).length;
    if (countEl) countEl.textContent = unread;
    
    if (!list) return;
    
    if (notifications.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="las la-bell" style="font-size: 40px;"></i>
                <p style="margin-top: 10px;">No notifications</p>
            </div>
        `;
        return;
    }
    
    const recent = [...notifications].reverse().slice(0, 20);
    
    list.innerHTML = recent.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}">
            <div class="notification-icon ${n.type}">
                <i class="las la-${n.type === 'message' ? 'envelope' : 'user'}"></i>
            </div>
            <div class="notification-content">
                <h5>${escapeHtml(n.title)}</h5>
                <p>${escapeHtml(n.message)}</p>
                <span>${formatDate(n.timestamp)}</span>
            </div>
        </div>
    `).join('');
}

function addNotification(type, title, message) {
    const notifications = JSON.parse(localStorage.getItem('tarispace_notifications') || '[]');
    
    notifications.push({
        type,
        title,
        message,
        timestamp: new Date().toISOString(),
        read: false
    });
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
        notifications.shift();
    }
    
    localStorage.setItem('tarispace_notifications', JSON.stringify(notifications));
    loadNotifications();
}

function clearNotifications() {
    localStorage.setItem('tarispace_notifications', '[]');
    loadNotifications();
    showToast('Notifications Cleared', 'All notifications have been cleared', 'success');
}

// =====================================================
// FORM HANDLERS
// =====================================================
function initFormHandlers() {
    // Add button handlers
    const addServiceBtn = document.getElementById('addService');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', addService);
    }
    
    const addProjectBtn = document.getElementById('addProject');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', addProject);
    }
    
    const addBlogBtn = document.getElementById('addBlog');
    if (addBlogBtn) {
        addBlogBtn.addEventListener('click', addBlog);
    }
    
    const addSkillBtn = document.getElementById('addSkill');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', addSkill);
    }
    
    // Service form
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', saveService);
    }
    
    // Project form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', saveProject);
    }
    
    // Blog form
    const blogForm = document.getElementById('blogForm');
    if (blogForm) {
        blogForm.addEventListener('submit', saveBlog);
    }
    
    // Skill form
    const skillForm = document.getElementById('skillForm');
    if (skillForm) {
        skillForm.addEventListener('submit', saveSkill);
    }
    
    // Hero save button
    const saveHeroBtn = document.getElementById('saveHero');
    if (saveHeroBtn) {
        saveHeroBtn.addEventListener('click', saveHeroData);
    }
    
    // About save button
    const saveAboutBtn = document.getElementById('saveAbout');
    if (saveAboutBtn) {
        saveAboutBtn.addEventListener('click', saveAboutData);
    }
    
    // Contact form - save button
    const saveContactBtn = document.getElementById('saveContact');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', saveContactData);
    }
    
    // Social form - save button
    const saveSocialBtn = document.getElementById('saveSocial');
    if (saveSocialBtn) {
        saveSocialBtn.addEventListener('click', saveSocialData);
    }
    
    // Skill percentage slider
    const skillRange = document.getElementById('skillLevel');
    if (skillRange) {
        skillRange.addEventListener('input', function() {
            document.getElementById('skillLevelDisplay').textContent = this.value + '%';
        });
    }
    
    // Export/Import/Clear data buttons
    const exportBtn = document.getElementById('exportData');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
    
    const importBtn = document.getElementById('importData');
    if (importBtn) {
        importBtn.addEventListener('click', importData);
    }
    
    const clearBtn = document.getElementById('clearAllData');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllData);
    }
    
    // Visitor section buttons
    const exportVisitorsBtn = document.getElementById('exportVisitors');
    if (exportVisitorsBtn) {
        exportVisitorsBtn.addEventListener('click', exportVisitors);
    }
    
    const clearVisitorsBtn = document.getElementById('clearVisitors');
    if (clearVisitorsBtn) {
        clearVisitorsBtn.addEventListener('click', clearVisitors);
    }
    
    // Message section buttons
    const markAllReadBtn = document.getElementById('markAllRead');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllMessagesRead);
    }
    
    const clearMessagesBtn = document.getElementById('clearMessages');
    if (clearMessagesBtn) {
        clearMessagesBtn.addEventListener('click', clearAllMessages);
    }
    
    // Logout buttons
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    const headerLogoutBtn = document.getElementById('headerLogout');
    if (headerLogoutBtn) {
        headerLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', toggleNotificationPanel);
    }
    
    // Clear notifications
    const clearNotificationsBtn = document.getElementById('clearNotifications');
    if (clearNotificationsBtn) {
        clearNotificationsBtn.addEventListener('click', clearNotifications);
    }
    
    // Change password
    const changePasswordBtn = document.getElementById('changePassword');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', changePassword);
    }
    
    // Modal close buttons
    document.querySelectorAll('.modal-close, [data-modal]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal') || this.closest('.modal')?.id;
            if (modalId) closeModal(modalId);
        });
    });
    
    // View all links
    document.querySelectorAll('.view-all[data-section]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });
}

// =====================================================
// SETTINGS HANDLERS
// =====================================================
function initSettingsHandlers() {
    // Toggle handlers
    document.querySelectorAll('.toggle-label input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.dataset.setting;
            if (setting) {
                saveSetting(setting, this.checked);
            }
        });
    });
}

function saveSetting(key, value) {
    const settings = JSON.parse(localStorage.getItem('tarispace_settings') || '{}');
    settings[key] = value;
    localStorage.setItem('tarispace_settings', JSON.stringify(settings));
}

function exportData() {
    const data = {
        visitors: getVisitors(),
        messages: getMessages(),
        services: getServices(),
        portfolio: getPortfolio(),
        blogs: getBlogs(),
        skills: getSkills(),
        hero: JSON.parse(localStorage.getItem('tarispace_hero') || '{}'),
        about: JSON.parse(localStorage.getItem('tarispace_about') || '{}'),
        contact: JSON.parse(localStorage.getItem('tarispace_contact') || '{}'),
        social: JSON.parse(localStorage.getItem('tarispace_social') || '{}'),
        settings: JSON.parse(localStorage.getItem('tarispace_settings') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarispace-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Data Exported', 'Your data has been downloaded', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.visitors) saveVisitors(data.visitors);
                if (data.messages) saveMessages(data.messages);
                if (data.services) saveServices(data.services);
                if (data.portfolio) savePortfolio(data.portfolio);
                if (data.blogs) saveBlogs(data.blogs);
                if (data.skills) saveSkills(data.skills);
                if (data.hero) localStorage.setItem('tarispace_hero', JSON.stringify(data.hero));
                if (data.about) localStorage.setItem('tarispace_about', JSON.stringify(data.about));
                if (data.contact) localStorage.setItem('tarispace_contact', JSON.stringify(data.contact));
                if (data.social) localStorage.setItem('tarispace_social', JSON.stringify(data.social));
                if (data.settings) localStorage.setItem('tarispace_settings', JSON.stringify(data.settings));
                
                loadAllData();
                updateStats();
                updateCharts();
                
                showToast('Data Imported', 'Your data has been restored successfully', 'success');
            } catch (err) {
                showToast('Import Failed', 'Invalid backup file', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAllData() {
    if (!confirm('Are you sure you want to clear ALL data? This action cannot be undone!')) return;
    if (!confirm('This will delete all visitors, messages, content, and settings. Continue?')) return;
    
    const keysToRemove = [
        'tarispace_visitors',
        'tarispace_messages',
        'tarispace_services',
        'tarispace_portfolio',
        'tarispace_blogs',
        'tarispace_skills',
        'tarispace_hero',
        'tarispace_about',
        'tarispace_contact',
        'tarispace_social',
        'tarispace_notifications',
        'tarispace_settings'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    loadAllData();
    updateStats();
    updateCharts();
    
    showToast('Data Cleared', 'All data has been removed', 'success');
}

// =====================================================
// REAL-TIME UPDATES
// =====================================================
let lastVisitorCount = 0;
let lastMessageCount = 0;
let lastNotificationCount = 0;

function startRealTimeUpdates() {
    // Initialize counts
    lastVisitorCount = getVisitors().length;
    lastMessageCount = getMessages().length;
    lastNotificationCount = JSON.parse(localStorage.getItem('tarispace_notifications') || '[]').length;
    
    // Check for new visitors/messages/notifications every 5 seconds
    setInterval(() => {
        checkForUpdates();
    }, 5000);
}

function checkForUpdates() {
    const currentVisitors = getVisitors().length;
    const currentMessages = getMessages().length;
    const notifications = JSON.parse(localStorage.getItem('tarispace_notifications') || '[]');
    const currentNotifications = notifications.length;
    
    // Check for new visitors
    if (currentVisitors > lastVisitorCount) {
        const newCount = currentVisitors - lastVisitorCount;
        updateStats();
        loadVisitors();
        updateDashboardActivity();
        updateCharts();
        loadNotifications();
        
        // Show toast for new visitor
        const latestVisitor = getVisitors().slice(-1)[0];
        if (latestVisitor) {
            showToast('New Visitor!', `Someone from ${latestVisitor.location || 'Unknown'} visited your site`, 'info');
        }
        
        lastVisitorCount = currentVisitors;
    }
    
    // Check for new messages
    if (currentMessages > lastMessageCount) {
        const newCount = currentMessages - lastMessageCount;
        updateStats();
        loadMessages();
        updateDashboardMessages();
        loadNotifications();
        
        // Show toast for new message
        const latestMessage = getMessages().slice(-1)[0];
        if (latestMessage) {
            showToast('New Message!', `Message from ${latestMessage.name}`, 'info');
        }
        
        lastMessageCount = currentMessages;
    }
    
    // Check for new notifications (updates badge)
    if (currentNotifications !== lastNotificationCount) {
        loadNotifications();
        lastNotificationCount = currentNotifications;
    }
}

// =====================================================
// TOAST NOTIFICATIONS
// =====================================================
function showToast(title, message, type = 'success') {
    const container = document.querySelector('.toast-container') || createToastContainer();
    
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'info': 'bell',
        'warning': 'exclamation-triangle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="las la-${icons[type] || 'info-circle'}"></i>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="las la-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================
function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    // Less than 1 minute
    if (diff < 60000) {
        return 'Just now';
    }
    
    // Less than 1 hour
    if (diff < 3600000) {
        const mins = Math.floor(diff / 60000);
        return `${mins}m ago`;
    }
    
    // Less than 24 hours
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}h ago`;
    }
    
    // Less than 7 days
    if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days}d ago`;
    }
    
    // Format as date
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// =====================================================
// GLOBAL FUNCTIONS (for onclick handlers)
// =====================================================
// =====================================================
// ADDITIONAL HELPER FUNCTIONS
// =====================================================
function exportVisitors() {
    const visitors = getVisitors();
    const csv = [
        ['IP', 'Location', 'Device', 'Browser', 'Page', 'Timestamp'],
        ...visitors.map(v => [v.ip, v.location, v.device, v.browser, v.page, v.timestamp])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visitors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Visitors Exported', 'Visitor data has been downloaded', 'success');
}

function clearVisitors() {
    if (!confirm('Are you sure you want to clear all visitor data?')) return;
    
    localStorage.setItem('tarispace_visitors', '[]');
    loadVisitors();
    updateStats();
    updateCharts();
    showToast('Visitors Cleared', 'All visitor data has been removed', 'success');
}

function markAllMessagesRead() {
    const messages = getMessages();
    messages.forEach(m => m.read = true);
    saveMessages(messages);
    loadMessages();
    updateStats();
    showToast('Messages Updated', 'All messages marked as read', 'success');
}

function clearAllMessages() {
    if (!confirm('Are you sure you want to delete all messages?')) return;
    
    localStorage.setItem('tarispace_messages', '[]');
    loadMessages();
    updateStats();
    
    const messageDetail = document.getElementById('messageDetail');
    if (messageDetail) {
        messageDetail.innerHTML = `
            <div class="no-message-selected">
                <i class="las la-envelope-open-text"></i>
                <p>Select a message to view</p>
            </div>
        `;
    }
    
    showToast('Messages Cleared', 'All messages have been removed', 'success');
}

function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            loadNotifications();
        }
    }
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('Error', 'Please fill in all password fields', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showToast('Error', 'New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('Error', 'Password must be at least 6 characters', 'error');
        return;
    }
    
    // Get stored credentials
    const credentials = JSON.parse(localStorage.getItem('tarispace_admin') || '{}');
    
    // Verify current password
    if (credentials.password && credentials.password !== currentPassword) {
        showToast('Error', 'Current password is incorrect', 'error');
        return;
    }
    
    // Save new password
    credentials.password = newPassword;
    localStorage.setItem('tarispace_admin', JSON.stringify(credentials));
    
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    showToast('Password Changed', 'Your password has been updated successfully', 'success');
}

function navigateToSection(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(l => l.classList.remove('active'));
    const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (targetLink) targetLink.classList.add('active');
    
    sections.forEach(s => s.classList.remove('active'));
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) targetSection.classList.add('active');
    
    updatePageTitle(sectionId);
    
    // Close mobile sidebar
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    if (window.innerWidth < 992) {
        sidebar?.classList.remove('active');
        mobileOverlay?.classList.remove('active');
    }
}

// Close notification panel when clicking outside
document.addEventListener('click', function(e) {
    const panel = document.getElementById('notificationPanel');
    const btn = document.getElementById('notificationBtn');
    
    if (panel && panel.classList.contains('active')) {
        if (!panel.contains(e.target) && !btn?.contains(e.target)) {
            panel.classList.remove('active');
        }
    }
});

// =====================================================
// GLOBAL FUNCTIONS (for onclick handlers)
// =====================================================
window.logout = logout;
window.openModal = openModal;
window.closeModal = closeModal;
window.addService = addService;
window.editService = editService;
window.deleteService = deleteService;
window.addProject = addProject;
window.editProject = editProject;
window.deleteProject = deleteProject;
window.addBlog = addBlog;
window.editBlog = editBlog;
window.deleteBlog = deleteBlog;
window.addSkill = addSkill;
window.editSkill = editSkill;
window.deleteSkill = deleteSkill;
window.viewMessage = viewMessage;
window.deleteMessage = deleteMessage;
window.clearNotifications = clearNotifications;
window.exportData = exportData;
window.importData = importData;
window.clearAllData = clearAllData;
window.exportVisitors = exportVisitors;
window.clearVisitors = clearVisitors;
window.markAllMessagesRead = markAllMessagesRead;
window.clearAllMessages = clearAllMessages;
window.toggleNotificationPanel = toggleNotificationPanel;
window.changePassword = changePassword;
window.navigateToSection = navigateToSection;
window.saveHeroData = saveHeroData;
window.saveAboutData = saveAboutData;
window.saveContactData = saveContactData;
window.saveSocialData = saveSocialData;
