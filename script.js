// ==========================================================================
// NexusAI — Interactive Engine & Event Handlers
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Drawer Navigation ---
    const navToggle = document.getElementById('navToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

    if (navToggle && mobileDrawer) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            mobileDrawer.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 2. Dynamic Metric Counters ---
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            const duration = 1600;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Apple ease-out cubic curve
                const easeOut = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(target * easeOut);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(update);
        });
    }

    // Trigger counters when hero comes into view
    const heroMetrics = document.querySelector('.hero-metrics');
    if (heroMetrics && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    runCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(heroMetrics);
    } else {
        runCounters();
    }

    // --- 3. Interactive Quick Chips in Showcase Demo ---
    const quickChips = document.querySelectorAll('.quick-chip');
    const chatStream = document.querySelector('.chat-stream');

    quickChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const chosenTime = this.textContent.replace('Select ', '');
            
            // Append user response bubble
            const userBubble = document.createElement('div');
            userBubble.className = 'chat-bubble user-bubble';
            userBubble.innerHTML = `<div class="bubble-content">Let's book ${chosenTime}, please.</div>`;
            chatStream.appendChild(userBubble);

            // Hide previous chip options
            const optionsContainer = this.closest('.quick-options');
            if (optionsContainer) optionsContainer.style.display = 'none';

            // Simulate instant bot confirmation
            setTimeout(() => {
                const confirmBubble = document.createElement('div');
                confirmBubble.className = 'chat-bubble bot-bubble';
                confirmBubble.innerHTML = `
                    <div class="bubble-avatar">N</div>
                    <div class="bubble-content">
                        ✓ Confirmed! We've scheduled your appointment for Thursday at <strong>${chosenTime}</strong>. A calendar invite has been sent to your email.
                    </div>
                `;
                chatStream.appendChild(confirmBubble);
            }, 600);
        });
    });

    // --- 4. Consultation Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.btn-submit');
            const originalHTML = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.75';
            submitBtn.innerHTML = `<span>Securing your slot...</span>`;

            setTimeout(() => {
                submitBtn.innerHTML = `<span>✓ Consultation Requested!</span>`;
                submitBtn.style.background = '#30D158';
                submitBtn.style.color = '#FFFFFF';
                submitBtn.style.opacity = '1';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.innerHTML = originalHTML;
                }, 4000);
            }, 1200);
        });
    }

    // --- 5. Nav Glass Effect on Scroll ---
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                nav.style.background = 'rgba(0, 0, 0, 0.88)';
                nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.75)';
                nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
            }
        }, { passive: true });
    }

});
