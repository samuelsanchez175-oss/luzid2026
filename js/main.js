// --- HERO SEQUENCE LOGIC ---
        const siteHeader = document.getElementById('site-header');
        const layerVideo = document.getElementById('layer-video');
        const heroVideo = document.getElementById('hero-video');
        const heroCenterTitle = document.getElementById('hero-center-title');
        const heroStatement = document.getElementById('hero-statement');
        const typedText = document.getElementById('typed-text');

        const typedPhrase = 'is a full service creative agency and production company that makes high end visual storytelling';

        function runHeroSequence() {
            const T_STATEMENT_SHOW = 1200;
            const T_TYPING_START = 1800;
            const T_NAV_REVEAL = 7000;

            if (heroVideo) {
                heroVideo.muted = true;
                heroVideo.defaultMuted = true;
                const attempt = heroVideo.play();
                if (attempt && typeof attempt.catch === 'function') {
                    attempt.catch(() => {});
                }
            }

            setTimeout(() => {
                if (heroCenterTitle) heroCenterTitle.classList.add('is-visible');
                heroStatement.classList.add('is-visible');
            }, T_STATEMENT_SHOW);

            setTimeout(() => {
                let index = 0;
                const typeSpeed = 35;
                const tick = () => {
                    typedText.textContent = typedPhrase.slice(0, index);
                    index++;
                    if (index <= typedPhrase.length) {
                        setTimeout(tick, typeSpeed);
                    }
                };
                tick();
            }, T_TYPING_START);

            setTimeout(() => {
                siteHeader.classList.add('is-visible');
                const navArrows = document.getElementById('hero-nav-arrows');
                if (navArrows) navArrows.classList.add('is-visible');
            }, T_NAV_REVEAL);
        }

        // --- SMOOTH SCROLL LOGIC ---
        function bindSmoothScroll() {
            document.addEventListener('click', event => {
                const link = event.target.closest('a[href^="#"]');
                if (!link) return;
                const target = document.querySelector(link.getAttribute('href'));
                if (!target) return;
                event.preventDefault();
                const headerOffset = siteHeader ? siteHeader.offsetHeight : 0;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top: targetTop, behavior: 'smooth' });
            });

            const arrowUp = document.querySelector('.hero-nav-arrows .up');
            const arrowDown = document.querySelector('.hero-nav-arrows .down');
            const allSections = Array.from(document.querySelectorAll('section[id]'));

            function getCurrentSectionIndex() {
                const headerOffset = siteHeader ? siteHeader.offsetHeight : 0;
                let currentIndex = 0;
                
                allSections.forEach((section, index) => {
                    const rectTop = section.getBoundingClientRect().top;
                    // If the top of the section is at or above the header + buffer
                    if (rectTop <= headerOffset + 50) {
                        currentIndex = index;
                    }
                });
                return currentIndex;
            }

            if (arrowUp) {
                arrowUp.addEventListener('click', () => {
                    const currentIndex = getCurrentSectionIndex();
                    const targetIndex = currentIndex > 0 ? currentIndex - 1 : allSections.length - 1;
                    const headerOffset = siteHeader ? siteHeader.offsetHeight : 0;
                    const targetTop = allSections[targetIndex].getBoundingClientRect().top + window.scrollY - headerOffset;
                    window.scrollTo({ top: targetTop, behavior: 'smooth' });
                });
            }

            if (arrowDown) {
                arrowDown.addEventListener('click', () => {
                    const currentIndex = getCurrentSectionIndex();
                    const targetIndex = currentIndex < allSections.length - 1 ? currentIndex + 1 : 0;
                    const headerOffset = siteHeader ? siteHeader.offsetHeight : 0;
                    const targetTop = allSections[targetIndex].getBoundingClientRect().top + window.scrollY - headerOffset;
                    window.scrollTo({ top: targetTop, behavior: 'smooth' });
                });
            }
        }

        // --- RENDER BRANDS LOGIC ---
        const brandsGrid = document.getElementById('brands-grid');
        const brandItems = [
            { name: 'Buffalo London', logo: 'assets/images/brands/buffalo-london-.webp' }, 
            { name: 'Carters', logo: 'assets/images/brands/carters-logo.png?v=2', logoScale: 2.4 }, 
            { name: 'Amazon Prime Video', logo: 'assets/images/brands/amazon-prime-video.png' },
            { name: 'CÎROC', logo: 'assets/images/brands/ciroc-logo.png', invert: true, logoScale: 3 },
            { name: 'Icon Swim', logo: 'assets/images/brands/icon-swim-.webp', invert: true }, 
            { name: 'JBW Watches', logo: 'assets/images/brands/jbw-watches.png', invert: true }, 
            { name: 'Kiss Colors', logo: 'assets/images/brands/kiss-colors-cosmetics-.jpg' },
            { name: 'Pretty Little Thing', logo: 'assets/images/brands/pretty-little-thing-.png' }, 
            { name: 'Puma', logo: 'assets/images/brands/puma.svg', invert: true }, 
            { name: 'Therabody', logo: 'assets/images/brands/therabody-logo.png?v=5', invert: true },
            { name: 'YG 4hunnid', logo: 'assets/images/brands/4hunnid_records_logo.png', invert: true }
        ];

        function renderBrands() {
            if (!brandsGrid) return;
            brandsGrid.innerHTML = brandItems
                .map(item => `
                    <article class="brand-card">
                        ${item.logo 
                            ? `<img src="${item.logo}" alt="${item.name} logo" class="brand-logo ${item.invert ? 'invert-logo' : ''} ${item.logoScale ? 'brand-logo-scale-' + String(item.logoScale).replace('.', '-') : ''}" loading="lazy">` 
                            : ''
                        }
                        ${(!item.logo || item.showText)
                            ? `<p class="brand-text">${item.name}</p>`
                            : ''
                        }
                    </article>
                `)
                .join('');
        }

        // --- RENDER WORK LOGIC ---
        const workGrid = document.getElementById('work-grid');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const workItems = [
            { id: 1, title: 'Back and Forth', director: 'Halle', category: 'music-videos', categoryLabel: 'Music Video', image: 'assets/images/music-videos-halle-back-and-forth.jpg', video: 'assets/videos/welcome-hero-video.mov', link: 'https://www.youtube.com/watch?v=XGEs3GE3-VY' },
            { id: 2, title: 'Hello Bitch', director: 'Tyga', category: 'music-videos', categoryLabel: 'Music Video', image: 'assets/images/tyga-hello-bitch-preview.gif', video: null, link: 'https://www.youtube.com/watch?v=SFPHHni7rWs' },
            { id: 3, title: 'Icon Swim featuring Latto', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/icon-swim-latto-thumb.jpg', video: null, link: 'https://www.youtube.com/watch?v=-1oQ4kxVzBU' },
            { id: 4, title: 'Kiss Colors', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/kiss-color-campaign.gif', video: null, link: 'kiss-color-1.html' },
            { id: 5, title: 'Kiss Color Edge Fixer', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/kiss-color-edge-fixer.gif', video: null, link: 'kiss-color-2.html' },
            { id: 32, title: 'GEN MEX Amazon Video Prime', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: null, video: 'assets/videos/gen-mex-amazon-prime.m4v', link: '#', },
            { id: 33, title: 'James Harden × Therabody', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/james-harden-therabody-thumb.jpg', video: null, link: 'https://www.youtube.com/watch?v=UEBNyJ44dys' },
            { id: 34, title: 'Puma × Winnie Harlow', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/puma-winnie-harlow-thumb.jpg', video: null, link: 'https://www.youtube.com/watch?v=AO3_yRqdU1g' },
            { id: 7, title: "love? ...or something like it", artist: 'Halle', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-01.png', video: null, link: '#', square: true },
            { id: 8, title: 'Keep It Lit', artist: 'Kamaiyah', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-02.png', video: null, link: '#', square: true },
            { id: 9, title: 'On God', artist: 'Koryn Hawthorne', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-03.png', video: null, link: '#', square: true },
            { id: 10, title: 'Fine Ho, Stay', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-04.png', video: null, link: '#', square: true },
            { id: 11, title: "First Lady of the Mob", artist: 'Kamaiyah & DJ Idea', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-05.png', video: null, link: '#', square: true },
            { id: 12, title: 'Trouble in Paradise', artist: 'Chlöe Bailey', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-06.png', video: null, link: '#', square: true },
            { id: 13, title: 'Before We Party', artist: 'Kamaiyah', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-07.png', video: null, link: '#', square: true },
            { id: 14, title: 'Drunken Words Sober Thoughts', artist: 'Seven', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-08.png', video: null, link: '#', square: true },
            { id: 15, title: 'No Explanations', artist: 'Kamaiyah', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-09.png', video: null, link: '#', square: true },
            { id: 16, title: "It's On", artist: 'Rubi Rose', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-01.jpg', video: null, link: '#', square: true },
            { id: 17, title: 'Go Loko', artist: 'YG, Tyga, Jon Z', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-02.jpg', video: null, link: '#', square: true },
            { id: 18, title: 'Best Friend', artist: 'Saweetie ft. Doja Cat', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-03.jpg', video: null, link: '#', square: true },
            { id: 19, title: 'Never Lose Me', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-04.jpg', video: null, link: '#', square: true },
            { id: 20, title: 'Splash', artist: 'Tyga feat. Moneybagg Yo', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-05.jpg', video: null, link: '#', square: true },
            { id: 21, title: 'Guilty', artist: 'Sevyn Streeter, Chris Brown, A$AP Ferg', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-06.jpg', video: null, link: '#', square: true },
            { id: 22, title: 'No Face', artist: 'Ghostface Killah & Kanye West', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-07.jpg', video: null, link: '#', square: true },
            { id: 23, title: 'Tap In', artist: 'Saweetie', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-08.jpg', video: null, link: '#', square: true },
            { id: 24, title: 'Do It', artist: 'Chloe x Halle', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-09.jpg', video: null, link: '#', square: true },
            { id: 25, title: 'Too Fine', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-10.jpg', video: null, link: '#', square: true },
            { id: 26, title: 'Ibiza', artist: 'Tyga', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-11.jpg', video: null, link: '#', square: true },
            { id: 27, title: 'Conceited', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-12.jpg', video: null, link: '#', square: true },
            { id: 28, title: 'The One', artist: 'Stefflon Don', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-13.jpg', video: null, link: '#', square: true },
            { id: 29, title: 'B.T.W', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-14.jpg', video: null, link: '#', square: true },
            { id: 30, title: 'Back and Forth', artist: 'Halle', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-15.jpg', video: null, link: '#', square: true },
            { id: 31, title: 'Look at God', artist: 'Koryn Hawthorne', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-16.jpg', video: null, link: '#', square: true },
        ];

        function renderWork(filter = 'all') {
            if (!workGrid) return;
            const filteredItems = filter === 'all' 
                ? workItems 
                : workItems.filter(item => item.category === filter);

            workGrid.classList.toggle('work-grid-album-covers', filter === 'album-covers');
            workGrid.classList.toggle('work-grid-single-covers', filter === 'single-covers');

            workGrid.innerHTML = filteredItems.map(item => {
                const href = item.link || '#';
                const isYouTube = item.link && (item.link.includes('youtube.com') || item.link.includes('youtu.be'));
                const isExternal = item.link && item.link.startsWith('http');
                const target = (isYouTube || isExternal) ? '_blank' : '_self';
                const rel = (isYouTube || isExternal) ? 'noopener noreferrer' : '';
                const squareClass = item.square ? ' work-item-square' : '';
                const expandable = (item.category === 'album-covers' || item.category === 'single-covers') && item.image;
                const dataExpand = expandable ? ` data-expand-image="${item.image}"` : '';
                return `
                <a href="${href}" class="work-item${squareClass}" data-category="${item.category}"${dataExpand} target="${target}" rel="${rel}">
                    ${item.video 
                        ? `<video src="${item.video}" ${item.image ? `poster="${item.image}"` : ''} autoplay muted loop playsinline webkit-playsinline></video>`
                        : (item.image 
                            ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` 
                            : `<div class="work-placeholder">[ Image Placeholder ]</div>`
                        )
                    }
                    <div class="work-item-overlay">
                        ${item.categoryLabel ? `<span class="work-item-category">${item.categoryLabel}</span>` : ''}
                        <h3 class="work-item-title">${item.title}</h3>
                        ${item.artist ? `<p class="work-item-artist">${item.artist}</p><p class="work-item-director">${item.director}</p>` : `<p class="work-item-director">${item.director}</p>`}
                    </div>
                </a>
            `}).join('');
        }

        // --- DOM CONTENT LOADED (Setup everything) ---
        document.addEventListener('DOMContentLoaded', () => {
            // Setup Mobile Menu
            const menuToggle = document.getElementById('menu-toggle');
            const navList = document.getElementById('nav-list');
            if (menuToggle && navList) {
                menuToggle.addEventListener('click', () => {
                    menuToggle.classList.toggle('is-active');
                    navList.classList.toggle('is-open');
                });
                navList.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        menuToggle.classList.remove('is-active');
                        navList.classList.remove('is-open');
                    });
                });
            }

            // Start Hero Sequence & Scroll Handlers
            runHeroSequence();
            bindSmoothScroll();

            // Setup image cycling for capabilities
            const evfxImg = document.getElementById('evfx-img');
            let currentEvfxImageIndex = 1;
            if (evfxImg) {
                setInterval(() => {
                    currentEvfxImageIndex = currentEvfxImageIndex > 5 ? 1 : currentEvfxImageIndex + 1; // It has 6 images
                    evfxImg.src = `assets/images/about-color-finishing/cf-${currentEvfxImageIndex.toString().padStart(2, '0')}.jpg`;
                }, 400);
            }

            const psImg = document.getElementById('ps-img');
            let currentPsImageIndex = 1;
            if (psImg) {
                setInterval(() => {
                    currentPsImageIndex = currentPsImageIndex > 18 ? 1 : currentPsImageIndex + 1; // It has 19 images
                    psImg.src = `assets/images/about-photo-social/ps-${currentPsImageIndex.toString().padStart(2, '0')}.jpg`;
                }, 400);
            }

            const albumImg = document.getElementById('album-img');
            let currentAlbumImageIndex = 1;
            if (albumImg) {
                setInterval(() => {
                    currentAlbumImageIndex = currentAlbumImageIndex >= 9 ? 1 : currentAlbumImageIndex + 1;
                    albumImg.src = `assets/images/album-covers/album-${currentAlbumImageIndex.toString().padStart(2, '0')}.png`;
                }, 400);
            }

            const eventTourImg = document.getElementById('event-tour-img');
            let currentEventTourImageIndex = 1;
            if (eventTourImg) {
                setInterval(() => {
                    currentEventTourImageIndex = currentEventTourImageIndex >= 8 ? 1 : currentEventTourImageIndex + 1;
                    eventTourImg.src = `assets/images/event-tour-coverage/event-tour-${currentEventTourImageIndex.toString().padStart(2, '0')}.png`;
                }, 400);
            }

            // Brand section typing animation
            const brandTypedText = document.getElementById('brand-typed-text');
            const brandSection = document.getElementById('brand');
            const brandPhrase = 'We collaborate with brands to develop and execute high-level storytelling campaigns, commercial productions, editorial films, music videos, and photography across culture and commerce.';
            let brandTypingStarted = false;

            if (brandTypedText && brandSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !brandTypingStarted) {
                            brandTypingStarted = true;
                            let index = 0;
                            const typeSpeed = 25;
                            const tick = () => {
                                brandTypedText.textContent = brandPhrase.slice(0, index);
                                index++;
                                if (index <= brandPhrase.length) {
                                    setTimeout(tick, typeSpeed);
                                }
                            };
                            tick();
                        }
                    });
                }, { threshold: 0.3 });
                observer.observe(brandSection);
            }

            // Render Grids
            renderBrands();
            renderWork('all');

            // Image lightbox for album/single covers
            const lightbox = document.getElementById('image-lightbox');
            const lightboxImg = lightbox?.querySelector('.lightbox-image');
            const lightboxClose = lightbox?.querySelector('.lightbox-close');
            const lightboxBackdrop = lightbox?.querySelector('.lightbox-backdrop');

            function openLightbox(src) {
                if (lightbox && lightboxImg) {
                    lightboxImg.src = src;
                    lightbox.classList.add('is-open');
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                }
            }

            function closeLightbox() {
                if (lightbox) {
                    lightbox.classList.remove('is-open');
                    lightbox.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            }

            if (workGrid) {
                workGrid.addEventListener('click', (e) => {
                    const item = e.target.closest('.work-item[data-expand-image]');
                    if (item) {
                        e.preventDefault();
                        openLightbox(item.getAttribute('data-expand-image'));
                    }
                });
            }

            if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
            if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox?.classList.contains('is-open')) closeLightbox();
            });

            // Setup Filter Buttons for Work
            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    renderWork(e.target.getAttribute('data-filter'));
                });
            });

            // Active section highlighting based on scroll position
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

            window.addEventListener('scroll', () => {
                let current = '';
                const headerOffset = siteHeader ? siteHeader.offsetHeight : 0;
                
                sections.forEach(section => {
                    const rectTop = section.getBoundingClientRect().top;
                    if (rectTop <= headerOffset + 50) {
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
        });