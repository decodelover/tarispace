/**
 * =====================================================
 * TARISPACE - VISITOR TRACKING & CONTACT FORM
 * Tracks visitors and saves contact form messages
 * for the admin dashboard
 * =====================================================
 */

(function() {
    'use strict';

    // =====================================================
    // VISITOR TRACKING
    // =====================================================
    function trackVisitor() {
        const visitors = JSON.parse(localStorage.getItem('tarispace_visitors') || '[]');
        
        // Get device type
        const device = getDeviceType();
        
        // Get current page
        const page = getCurrentPage();
        
        // Create visitor record
        const visitor = {
            id: generateId(),
            timestamp: new Date().toISOString(),
            device: device,
            page: page,
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent
        };
        
        // Get IP and location using free API
        fetchVisitorLocation()
            .then(data => {
                visitor.ip = data.ip || 'Unknown';
                visitor.location = data.location || 'Unknown';
                visitor.country = data.country || 'Unknown';
                visitor.city = data.city || 'Unknown';
                
                saveVisitor(visitor, visitors);
                addNotification('visitor', 'New Visitor', `Visitor from ${visitor.location}`);
            })
            .catch(() => {
                // Save without location data if API fails
                visitor.ip = 'Unknown';
                visitor.location = 'Unknown';
                saveVisitor(visitor, visitors);
            });
    }

    function saveVisitor(visitor, visitors) {
        visitors.push(visitor);
        
        // Keep only last 500 visitors
        if (visitors.length > 500) {
            visitors = visitors.slice(-500);
        }
        
        localStorage.setItem('tarispace_visitors', JSON.stringify(visitors));
    }

    function getDeviceType() {
        const ua = navigator.userAgent.toLowerCase();
        
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        
        if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
            return 'mobile';
        }
        
        return 'desktop';
    }

    function getCurrentPage() {
        const hash = window.location.hash;
        
        const pages = {
            '#page1': 'Home',
            '#page2': 'About',
            '#page3': 'Services',
            '#page4': 'Portfolio',
            '#page5': 'Blog',
            '#page6': 'Contact'
        };
        
        return pages[hash] || 'Home';
    }

    async function fetchVisitorLocation() {
        try {
            // Try ipapi.co first (free, no key required)
            const response = await fetch('https://ipapi.co/json/', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                return {
                    ip: data.ip,
                    location: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`,
                    city: data.city || 'Unknown',
                    country: data.country_name || 'Unknown'
                };
            }
        } catch (e) {
            // Fallback to ipinfo.io
            try {
                const fallback = await fetch('https://ipinfo.io/json');
                if (fallback.ok) {
                    const data = await fallback.json();
                    return {
                        ip: data.ip,
                        location: `${data.city || 'Unknown'}, ${data.country || 'Unknown'}`,
                        city: data.city || 'Unknown',
                        country: data.country || 'Unknown'
                    };
                }
            } catch (e2) {
                // Return unknown if all APIs fail
            }
        }
        
        return {
            ip: 'Unknown',
            location: 'Unknown',
            city: 'Unknown',
            country: 'Unknown'
        };
    }

    function generateId() {
        return 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // =====================================================
    // CONTACT FORM INTEGRATION
    // =====================================================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('.form-control');
            const submitBtn = form.querySelector('.btn-submit');
            
            // Get form values
            const name = inputs[0]?.value?.trim() || '';
            const email = inputs[1]?.value?.trim() || '';
            const subject = inputs[2]?.value?.trim() || 'No Subject';
            const message = inputs[3]?.value?.trim() || '';
            
            // Validate
            if (!name || !email || !message) {
                showFormNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Save message
            const messages = JSON.parse(localStorage.getItem('tarispace_messages') || '[]');
            
            const newMessage = {
                id: generateId(),
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString(),
                read: false
            };
            
            messages.push(newMessage);
            localStorage.setItem('tarispace_messages', JSON.stringify(messages));
            
            // Add notification
            addNotification('message', 'New Message', `Message from ${name}`);
            
            // Simulate sending delay for better UX
            setTimeout(() => {
                // Reset form
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showFormNotification('Your message has been sent successfully! I will get back to you soon.', 'success');
            }, 1000);
        });
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showFormNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <i class="fa fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
            color: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add animation keyframes if not exists
        if (!document.getElementById('form-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'form-notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(100px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100px)';
                notification.style.transition = 'all 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // =====================================================
    // NOTIFICATIONS
    // =====================================================
    function addNotification(type, title, message) {
        const notifications = JSON.parse(localStorage.getItem('tarispace_notifications') || '[]');
        
        notifications.push({
            type: type,
            title: title,
            message: message,
            timestamp: new Date().toISOString(),
            read: false
        });
        
        // Keep only last 50 notifications
        if (notifications.length > 50) {
            notifications.shift();
        }
        
        localStorage.setItem('tarispace_notifications', JSON.stringify(notifications));
    }

    // =====================================================
    // PAGE NAVIGATION TRACKING
    // =====================================================
    function trackPageNavigation() {
        // Track when user navigates to different sections
        window.addEventListener('hashchange', function() {
            const page = getCurrentPage();
            
            // Update last visitor's page if within session
            const visitors = JSON.parse(localStorage.getItem('tarispace_visitors') || '[]');
            if (visitors.length > 0) {
                const lastVisitor = visitors[visitors.length - 1];
                const visitTime = new Date(lastVisitor.timestamp);
                const now = new Date();
                
                // If within 30 minutes, update the page
                if ((now - visitTime) < 30 * 60 * 1000) {
                    lastVisitor.page = page;
                    localStorage.setItem('tarispace_visitors', JSON.stringify(visitors));
                }
            }
        });
    }

    // =====================================================
    // INITIALIZE
    // =====================================================
    function init() {
        // Only track if not in admin panel
        if (window.location.pathname.includes('admin')) {
            return;
        }
        
        // Track visitor on page load
        trackVisitor();
        
        // Initialize contact form
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initContactForm);
        } else {
            initContactForm();
        }
        
        // Track page navigation
        trackPageNavigation();
    }

    // Start tracking
    init();

})();
