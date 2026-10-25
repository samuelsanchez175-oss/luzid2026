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

        // --- RENDER BLOG LOGIC ---
        const blogGrid = document.getElementById('blog-grid');

        async function renderBlog() {
            if (!blogGrid) return;
            try {
                const res = await fetch('content/blog.json');
                const data = await res.json();
                const posts = (data.posts || []).filter(p => !p.draft);
                posts.sort((a, b) => new Date(b.date) - new Date(a.date));

                if (posts.length === 0) {
                    blogGrid.innerHTML = '<p class="blog-empty">No blog posts yet. Check back soon.</p>';
                    return;
                }

                blogGrid.innerHTML = posts.map(post => {
                    const imgSrc = post.image || '';
                    const href = post.link || '#';
                    const isExternal = href.startsWith('http');
                    const target = isExternal ? '_blank' : '_self';
                    const rel = isExternal ? 'noopener noreferrer' : '';
                    const dateStr = post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
                    const cardContent = `
                        ${imgSrc ? `<img src="${imgSrc}" alt="${post.title || ''}" class="blog-card-image" loading="lazy">` : '<div class="blog-card-image" style="background:#111;display:flex;align-items:center;justify-content:center;color:var(--muted);">No image</div>'}
                        <div class="blog-card-body">
                            <h3 class="blog-card-title">${post.title || 'Untitled'}</h3>
                            ${post.excerpt ? `<p class="blog-card-excerpt">${post.excerpt}</p>` : ''}
                            ${dateStr ? `<p class="blog-card-date">${dateStr}</p>` : ''}
                            ${post.link ? `<span class="blog-card-cta">View link →</span>` : ''}
                        </div>
                    `;
                    return post.link
                        ? `<a href="${href}" class="blog-card blog-card-link" target="${target}" rel="${rel}">${cardContent}</a>`
                        : `<article class="blog-card">${cardContent}</article>`;
                }).join('');
            } catch (err) {
                blogGrid.innerHTML = '<p class="blog-empty">No blog posts yet. Check back soon.</p>';
            }
        }

        // --- RENDER BRANDS LOGIC ---
        const brandsMarqueeTrack = document.getElementById('brands-marquee-track');
        const brandItems = [
            { name: 'Buffalo London', logo: 'assets/images/brands/buffalo-london-.webp' }, 
            { name: 'Carters', logo: 'assets/images/brands/carters-logo.png?v=3', logoScale: 2.4 }, 
            { name: 'Amazon Music', logo: 'assets/images/brands/amazon-music.png?v=3' },
            { name: 'CÎROC', logo: 'assets/images/brands/ciroc-logo.png?v=3', invert: true, logoScale: 3 },
            { name: 'Icon Swim', logo: 'assets/images/brands/icon-swim-.webp', invert: true }, 
            { name: 'JBW Watches', logo: 'assets/images/brands/jbw-watches.png', invert: true }, 
            { name: 'Kiss Colors', logo: 'assets/images/brands/kiss-colors-cosmetics-.jpg' },
            { name: 'Pretty Little Thing', logo: 'assets/images/brands/pretty-little-thing-.png' }, 
            { name: 'Puma', logo: 'assets/images/brands/puma.svg', invert: true }, 
            { name: 'Therabody', logo: 'assets/images/brands/therabody-logo.svg?v=2', invert: false, logoScale: 2, noBackdrop: true },
            { name: 'YG 4hunnid', logo: 'assets/images/brands/4hunnid_records_logo.png', invert: true }
        ];

        function fillLogoMarquee(track, cells) {
            if (!track) return;
            const group = `<div class="logo-marquee-group">${cells}</div>`;
            track.innerHTML = group + `<div class="logo-marquee-group" aria-hidden="true">${cells}</div>`;
            bindLogoMarquee(track.parentElement);
        }

        function bindLogoMarquee(root) {
            if (!root || root.dataset.marqueeBound === '1') return;
            root.dataset.marqueeBound = '1';
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const track = root.querySelector('.logo-marquee-track');
            if (!track) return;

            const LOOP_MS = 32000;
            const RESUME_MS = 4000;
            const SLOP = 8;
            let offset = 0;
            let pausedUntil = 0;
            let hovered = false;
            let pointerId = null;
            let tracking = false;
            let dragging = false;
            let axis = null;
            let startX = 0;
            let startY = 0;
            let startOffset = 0;
            let last = performance.now();

            function loopWidth() {
                const group = track.querySelector('.logo-marquee-group');
                return group ? group.offsetWidth : 0;
            }

            function apply() {
                const width = loopWidth();
                if (width <= 1) return;
                offset = ((offset % width) + width) % width;
                track.style.transform = 'translate3d(' + (-offset) + 'px, 0, 0)';
            }

            function pause() {
                pausedUntil = performance.now() + RESUME_MS;
            }

            function frame(now) {
                const dt = Math.min(64, now - last);
                last = now;
                if (!dragging && !hovered && now >= pausedUntil) {
                    const width = loopWidth();
                    if (width > 1) offset += (width / LOOP_MS) * dt;
                }
                apply();
                requestAnimationFrame(frame);
            }

            root.addEventListener('pointerdown', (event) => {
                if (event.button !== 0) return;
                tracking = true;
                dragging = false;
                pointerId = event.pointerId;
                startX = event.clientX;
                startY = event.clientY;
                startOffset = offset;
                axis = (event.pointerType === 'mouse' || event.pointerType === 'pen') ? 'x' : null;
                pause();
                if (axis === 'x') {
                    dragging = true;
                    root.classList.add('is-dragging');
                    root.setPointerCapture(event.pointerId);
                    event.preventDefault();
                }
            });

            root.addEventListener('pointermove', (event) => {
                if (!tracking || event.pointerId !== pointerId) return;
                const dx = event.clientX - startX;
                const dy = event.clientY - startY;
                if (!axis) {
                    if (Math.abs(dx) < SLOP && Math.abs(dy) < SLOP) return;
                    axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
                    if (axis === 'y') return;
                    dragging = true;
                    root.classList.add('is-dragging');
                    root.setPointerCapture(event.pointerId);
                }
                if (axis !== 'x') return;
                offset = startOffset - dx;
                apply();
                pause();
                event.preventDefault();
            });

            function endDrag(event) {
                if (!tracking || (event && event.pointerId !== pointerId)) return;
                tracking = false;
                dragging = false;
                pointerId = null;
                axis = null;
                root.classList.remove('is-dragging');
                pause();
            }

            root.addEventListener('pointerup', endDrag);
            root.addEventListener('pointercancel', endDrag);

            root.addEventListener('pointerenter', (event) => {
                if (event.pointerType === 'mouse') hovered = true;
            });
            root.addEventListener('pointerleave', (event) => {
                if (event.pointerType === 'mouse') hovered = false;
            });

            root.addEventListener('wheel', (event) => {
                if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
                event.preventDefault();
                offset += event.deltaX;
                apply();
                pause();
            }, { passive: false });

            requestAnimationFrame(frame);
        }

        function renderBrands() {
            const cells = brandItems.map(item => {
                const classes = ['brand-logo'];
                if (item.invert) classes.push('invert-logo');
                if (item.logoScale) classes.push('brand-logo-scale-' + String(item.logoScale).replace('.', '-'));
                if (item.noBackdrop) classes.push('brand-logo-no-backdrop');
                return `<img src="${item.logo}" alt="${item.name}" class="${classes.join(' ')}" draggable="false">`;
            }).join('');
            fillLogoMarquee(brandsMarqueeTrack, cells);
        }

        // --- RENDER WORK LOGIC ---
        const workGrid = document.getElementById('work-grid');
        const publicationMarquee = document.getElementById('publication-marquee');
        const publicationMarqueeTrack = document.getElementById('publication-marquee-track');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const workItems = [
            { id: 1, title: 'Back and Forth', director: 'Halle', category: 'music-videos', categoryLabel: 'Music Video', image: 'assets/images/music-videos-halle-back-and-forth.jpg', video: 'assets/videos/welcome-hero-video.mov', link: 'https://www.youtube.com/watch?v=XGEs3GE3-VY', releaseDate: '2025-02-14', date: 'Feb 2025' },
            { id: 2, title: 'Hello Bitch', director: 'Tyga', category: 'music-videos', categoryLabel: 'Music Video', image: 'assets/images/tyga-hello-bitch-preview.gif', video: null, link: 'https://www.youtube.com/watch?v=SFPHHni7rWs', releaseDate: '2024-06-07', date: 'Jun 2024' },
            { id: 3, title: 'Icon Swim featuring Latto', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/icon-swim-latto-thumb.jpg', video: null, link: 'https://www.youtube.com/watch?v=-1oQ4kxVzBU', releaseDate: '2023-01-01', date: '2023' },
            { id: 4, title: 'Kiss Colors', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/kiss-color-campaign.gif', video: null, link: 'kiss-color-1.html', releaseDate: '2023-01-01', date: '2023' },
            { id: 5, title: 'Kiss Color Edge Fixer', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/kiss-color-edge-fixer.gif', video: null, link: 'kiss-color-2.html', releaseDate: '2023-01-01', date: '2023' },
            { id: 32, title: 'GEN MEX Amazon Video Prime', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: null, video: 'assets/videos/gen-mex-amazon-prime.m4v', link: '#', releaseDate: '2022-01-01', date: '2022' },
            { id: 33, title: 'James Harden × Therabody', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/james-harden-therabody-thumb.jpg', video: null, link: 'https://www.youtube.com/watch?v=UEBNyJ44dys', releaseDate: '2022-01-01', date: '2022' },
            { id: 34, title: 'Puma × Winnie Harlow', director: 'Brandon Almengo', category: 'commercials', categoryLabel: 'Commercial Campaign', image: 'assets/images/puma-winnie-harlow-thumb.jpg', video: null, link: 'https://www.youtube.com/watch?v=AO3_yRqdU1g', releaseDate: '2022-01-01', date: '2022' },
            { id: 44, title: 'Watch Dis', artist: 'Yung Miami', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-13.jpg', video: null, link: '#', square: true, releaseDate: '2026-10-23', date: 'Oct 2026' },
            { id: 45, title: 'love? ...or something like it (Deluxe)', artist: 'Halle', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-14.jpg', video: null, link: '#', square: true, releaseDate: '2026-10-23', date: 'Oct 2026' },
            { id: 42, title: 'Starface', artist: 'Tyga', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-11.jpg?v=1', video: null, link: '#', square: true, releaseDate: '2026-07-31', date: 'Jul 2026' },
            { id: 43, title: 'Locked In', artist: 'Gavin Magnus', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-12.jpg', video: null, link: '#', square: true, releaseDate: '2026-04-10', date: 'Apr 2026' },
            { id: 41, title: "Gentlemen's Club", artist: 'YG', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-10.png', video: null, link: '#', square: true, releaseDate: '2026-01-01', date: '2026' },
            { id: 7, title: "love? ...or something like it", artist: 'Halle', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-01.png', video: null, link: '#', square: true, releaseDate: '2025-10-24', date: 'Oct 2025' },
            { id: 11, title: "First Lady of the Mob", artist: 'Kamaiyah & DJ Idea', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-05.png', video: null, link: '#', square: true, releaseDate: '2025-06-27', date: 'Jun 2025' },
            { id: 13, title: 'Before We Party', artist: 'Kamaiyah', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-07.png', video: null, link: '#', square: true, releaseDate: '2024-09-27', date: 'Sep 2024' },
            { id: 12, title: 'Trouble in Paradise', artist: 'Chlöe Bailey', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-06.png', video: null, link: '#', square: true, releaseDate: '2024-08-09', date: 'Aug 2024' },
            { id: 10, title: 'Fine Ho, Stay', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-04.png', video: null, link: '#', square: true, releaseDate: '2024-03-15', date: 'Mar 2024' },
            { id: 9, title: 'On God', artist: 'Koryn Hawthorne', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-03.png', video: null, link: '#', square: true, releaseDate: '2024-02-09', date: 'Feb 2024' },
            { id: 8, title: 'Keep It Lit', artist: 'Kamaiyah', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-02.png', video: null, link: '#', square: true, releaseDate: '2022-12-09', date: 'Dec 2022' },
            { id: 14, title: 'Drunken Words Sober Thoughts', artist: 'Sevyn Streeter', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-08.png', video: null, link: '#', square: true, releaseDate: '2021-09-17', date: 'Sep 2021' },
            { id: 15, title: 'No Explanations', artist: 'Kamaiyah', director: 'Brandon Almengo', category: 'album-covers', categoryLabel: 'Album Cover', image: 'assets/images/album-covers/album-09.png', video: null, link: '#', square: true, releaseDate: '2020-12-11', date: 'Dec 2020' },
            { id: 40, title: 'Tea Time', artist: 'Yung Miami', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/tea-time-yung-miami.png', video: null, link: '#', square: true, comingSoon: true, date: 'Jan 2026', releaseDate: '2026-01-01' },
            { id: 30, title: 'Back and Forth', artist: 'Halle', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-15.jpg', video: null, link: '#', square: true, releaseDate: '2025-02-14', date: 'Feb 2025' },
            { id: 22, title: 'No Face', artist: 'Ghostface Killah & Kanye West', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-07.jpg', video: null, link: '#', square: true, releaseDate: '2024-05-31', date: 'May 2024' },
            { id: 29, title: 'B.T.W', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-14.jpg', video: null, link: '#', square: true, releaseDate: '2024-03-15', date: 'Mar 2024' },
            { id: 19, title: 'Never Lose Me', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-04.jpg', video: null, link: '#', square: true, releaseDate: '2023-11-30', date: 'Nov 2023' },
            { id: 31, title: 'Look at God', artist: 'Koryn Hawthorne', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-16.jpg', video: null, link: '#', square: true, releaseDate: '2023-09-15', date: 'Sep 2023' },
            { id: 28, title: 'The One', artist: 'Stefflon Don', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-13.jpg', video: null, link: '#', square: true, releaseDate: '2022-11-11', date: 'Nov 2022' },
            { id: 27, title: 'Conceited', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-12.jpg', video: null, link: '#', square: true, releaseDate: '2022-06-16', date: 'Jun 2022' },
            { id: 25, title: 'Too Fine', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-10.jpg', video: null, link: '#', square: true, releaseDate: '2022-06-16', date: 'Jun 2022' },
            { id: 18, title: 'Best Friend', artist: 'Saweetie ft. Doja Cat', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-03.jpg', video: null, link: '#', square: true, releaseDate: '2021-01-07', date: 'Jan 2021' },
            { id: 21, title: 'Guilty', artist: 'Sevyn Streeter, Chris Brown, A$AP Ferg', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-06.jpg', video: null, link: '#', square: true, releaseDate: '2021-02-12', date: 'Feb 2021' },
            { id: 20, title: 'Splash', artist: 'Tyga feat. Moneybagg Yo', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-05.jpg', video: null, link: '#', square: true, releaseDate: '2021-06-11', date: 'Jun 2021' },
            { id: 16, title: "It's On", artist: 'Rubi Rose', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-01.jpg', video: null, link: '#', square: true, releaseDate: '2021-07-01', date: 'Jul 2021' },
            { id: 23, title: 'Tap In', artist: 'Saweetie', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-08.jpg', video: null, link: '#', square: true, releaseDate: '2020-06-17', date: 'Jun 2020' },
            { id: 26, title: 'Ibiza', artist: 'Tyga', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-11.jpg', video: null, link: '#', square: true, releaseDate: '2020-06-25', date: 'Jun 2020' },
            { id: 24, title: 'Do It', artist: 'Chloe x Halle', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-09.jpg', video: null, link: '#', square: true, releaseDate: '2020-05-14', date: 'May 2020' },
            { id: 17, title: 'Go Loko', artist: 'YG, Tyga, Jon Z', director: 'Brandon Almengo', category: 'single-covers', categoryLabel: 'Single Cover', image: 'assets/images/single-covers/single-02.jpg', video: null, link: '#', square: true, releaseDate: '2019-05-03', date: 'May 2019' },
            { id: 39, title: 'Sheen', artist: 'Kayla Nicole', director: 'Brandon Almengo', category: 'magazine-covers', categoryLabel: 'Magazine Cover', image: 'assets/images/magazine-covers/magazine-05.jpeg', video: null, link: 'https://www.instagram.com/p/DTD65jxksYg/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==', rectangular: true, releaseDate: '2025-12-01', date: 'Dec 2025' },
            { id: 38, title: 'DIY', artist: 'Flo Milli', director: 'Brandon Almengo', category: 'magazine-covers', categoryLabel: 'Magazine Cover', image: 'assets/images/magazine-covers/magazine-04.jpg', video: null, link: 'https://www.instagram.com/p/CgAivCsO_Et/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', rectangular: true, releaseDate: '2022-07-01', date: 'Jul 2022' },
            { id: 36, title: 'Glamour', artist: 'Ruby Rose', director: 'Brandon Almengo', category: 'magazine-covers', categoryLabel: 'Magazine Cover', image: 'assets/images/magazine-covers/magazine-02.jpg', video: null, link: 'https://www.instagram.com/p/CP8yKgTh_3s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', rectangular: true, releaseDate: '2021-06-01', date: 'Jun 2021' },
            { id: 37, title: 'Tilted', artist: 'Melvin Gregg', director: 'Brandon Almengo', category: 'magazine-covers', categoryLabel: 'Magazine Cover', image: 'assets/images/magazine-covers/magazine-03.jpg', video: null, link: '#', rectangular: true, releaseDate: '2021-02-01', date: 'Feb 2021' },
            { id: 35, title: 'Maxim', artist: 'Saweetie', director: 'Brandon Almengo', category: 'magazine-covers', categoryLabel: 'Magazine Cover', image: 'assets/images/magazine-covers/magazine-01.jpg', video: null, link: 'https://www.instagram.com/p/CBv_JGIp2do/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', rectangular: true, releaseDate: '2020-07-01', date: 'Jul 2020' },
            { id: 46, title: 'Nylon', artist: 'Skai Jackson', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/nylon.jpg', video: null, link: 'https://www.nylon.com/beauty/cacharel-skai-jackson' },
            { id: 47, title: 'Forbes', category: 'publications', categoryLabel: 'Publication', image: null, video: null, link: '#work' },
            { id: 48, title: 'Paper', artist: 'Offset', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/paper-offset.jpg', video: null, link: 'https://www.papermag.com/offsets-birthday-party-photos' },
            { id: 49, title: 'Paper', artist: 'Saweetie', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/paper-nyfw.jpg', video: null, link: 'https://www.papermag.com/saweetie-nyfw' },
            { id: 50, title: 'Paper', artist: 'Saweetie', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/paper-tour.jpg', video: null, link: 'https://www.papermag.com/saweetie-tour-style' },
            { id: 51, title: 'Billboard', artist: 'Saweetie', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/billboard-saweetie.jpg', video: null, link: 'https://www.billboard.com/music/rb-hip-hop/saweetie-my-type-hot-100-interview-icy-grl-8520255/' },
            { id: 52, title: 'Billboard', artist: 'Chloe Bailey', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/billboard-chloe.jpg', video: null, link: 'https://www.billboard.com/culture/product-recommendations/chloe-bailey-carters-holiday-picks-1235829091/' },
            { id: 53, title: 'Vogue', artist: 'Halloween', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/vogue-halloween.jpg', video: null, link: 'https://www.vogue.com/slideshow/the-best-halloween-parties-of-2022' },
            { id: 54, title: 'Rolling Stone', artist: 'Stefflon Don', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/rollingstone.jpg', video: null, link: 'https://www.rollingstone.co.uk/music/news/stefflon-don-previews-debut-album-new-single-move-it-30420/' },
            { id: 55, title: 'Maxim', artist: 'Brandon Almengo', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/maxim-profile.jpg', video: null, link: 'https://www.maxim.com/entertainment/afro-latino-photographer-brandon-almengo-profile/' },
            { id: 56, title: 'Maxim', artist: 'The Mick Show', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/maxim-mick.jpg?v=2', video: null, link: 'https://www.maxim.com/entertainment/the-mick-show-episode-10-brandon-almengo/' },
            { id: 57, title: 'Elle', artist: 'Shenseea', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/elle.jpg', video: null, link: 'https://www.ellecanada.com/culture/music/shenseea-interview' },
            { id: 58, title: 'Complex', category: 'publications', categoryLabel: 'Publication', image: null, video: null, link: '#work' },
            { id: 59, title: 'British Vogue', artist: 'Saweetie', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/bvogue-saweetie.jpg', video: null, link: 'https://www.vogue.co.uk/fashion/article/saweetie-shares-major-mfw-wardrobe' },
            { id: 60, title: 'Variety', artist: 'Flo Milli', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/variety.jpg', video: null, link: 'https://variety.com/lists/variety-power-of-young-hollywood-2021-impact-list/' },
            { id: 61, title: 'Vibe', artist: 'Halle Bailey', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/vibe.jpg', video: null, link: 'https://www.vibe.com/news/entertainment/halle-balle-claims-lying-about-private-pregnancy-1234845764/' },
            { id: 62, title: 'WWD', artist: 'Chloe Bailey', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/wwd.jpg', video: null, link: 'https://wwd.com/pop-culture/celebrity-news/chloe-bailey-sauntie-claus-carters-holiday-giveaway-1236722357/' },
            { id: 63, title: 'Flaunt', category: 'publications', categoryLabel: 'Publication', image: null, video: null, link: '#work' },
            { id: 64, title: 'Marie Claire', artist: 'Chloe Bailey', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/marie.jpg', video: null, link: 'https://www.marieclaire.com/beauty/chloe-bailey-dionne-warwick-hair-tribute/' },
            { id: 65, title: 'New York Post', artist: 'Flo Milli', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/nypost.jpg', video: null, link: 'https://nypost.com/2021/03/19/flo-milli-roaring-20s-video-styling-costume-design-jenna-tyson/' },
            { id: 66, title: 'Page Six', artist: 'Saweetie', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/pagesix.jpg', video: null, link: 'https://pagesix.com/2020/06/01/saweetie-pretty-little-thing-black-lives-matter/' },
            { id: 67, title: 'Seventeen', artist: 'Saweetie', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/seventeen.jpg', video: null, link: 'https://www.seventeen.com/fashion/celeb-fashion/g32733515/saweetie-prettylittlething-clothing-line-black-lives-matter/' },
            { id: 68, title: 'Fault', artist: 'Flo Milli', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/fault.jpg', video: null, link: 'https://fault-magazine.com/2023/08/flo-milli-to-dominate-the-summer-with-faultless-fine-ho-stay/' },
            { id: 69, title: 'Wonderland', artist: 'AP Studios', category: 'publications', categoryLabel: 'Publication', image: null, video: null, link: 'https://www.wonderlandmagazine.com/2020/06/10/ap-studios-alexandra-preusche/' },
            { id: 70, title: 'Voyage LA', artist: 'Brandon Almengo', category: 'publications', categoryLabel: 'Publication', image: 'assets/images/publications/voyage.jpg', video: null, link: 'https://voyagela.com/interview/check-brandon-almengos-story/' },
        ];

        const publicationLogoList = [
            { name: 'Nylon', src: 'assets/images/publications/logos/nylon.png' },
            { name: 'Forbes', src: 'assets/images/publications/logos/forbes.png' },
            { name: 'Paper', src: 'assets/images/publications/logos/paper.png' },
            { name: 'Billboard', src: 'assets/images/publications/logos/billboard.png' },
            { name: 'Vogue', src: 'assets/images/publications/logos/vogue.png' },
            { name: 'Rolling Stone', src: 'assets/images/publications/logos/rollingstone-mark.png', color: true },
            { name: 'Maxim', src: 'assets/images/publications/logos/maxim.png' },
            { name: 'Elle', src: 'assets/images/publications/logos/elle.png' },
            { name: 'Complex', src: 'assets/images/publications/logos/complex.png' },
            { name: 'British Vogue', src: 'assets/images/publications/logos/bvogue.png' },
            { name: 'Variety', src: 'assets/images/publications/logos/variety.png' },
            { name: 'Vibe', src: 'assets/images/publications/logos/vibe.png' },
            { name: 'WWD', src: 'assets/images/publications/logos/wwd.png' },
            { name: 'Flaunt', src: 'assets/images/publications/logos/flaunt.png' },
            { name: 'Marie Claire', src: 'assets/images/publications/logos/marie.png' },
            { name: 'New York Post', src: 'assets/images/publications/logos/nypost.png', color: true, square: true },
            { name: 'Page Six', src: 'assets/images/publications/logos/pagesix.png' },
            { name: 'Seventeen', src: 'assets/images/publications/logos/seventeen.png' },
            { name: 'Fault', src: 'assets/images/publications/logos/fault.png' },
            { name: 'Wonderland', src: 'assets/images/publications/logos/wonderland.png' },
            { name: 'Voyage LA', src: 'assets/images/publications/logos/voyage.png' }
        ];

        function publicationLogoMarkup(item) {
            const classes = ['publication-logo'];
            if (item.color) classes.push('is-color');
            if (item.square) classes.push('is-square');
            return `<img class="${classes.join(' ')}" src="${item.src}" alt="${item.name}" draggable="false">`;
        }

        function renderPublicationMarquee() {
            fillLogoMarquee(publicationMarqueeTrack, publicationLogoList.map(publicationLogoMarkup).join(''));
        }

        const publicationLogos = {
            'Nylon': 'assets/images/publications/logos/nylon.png',
            'Forbes': 'assets/images/publications/logos/forbes.png',
            'Paper': 'assets/images/publications/logos/paper.png',
            'Billboard': 'assets/images/publications/logos/billboard.png',
            'Vogue': 'assets/images/publications/logos/vogue.png',
            'Rolling Stone': 'assets/images/publications/logos/rollingstone.png',
            'Maxim': 'assets/images/publications/logos/maxim.png',
            'Elle': 'assets/images/publications/logos/elle.png',
            'Complex': 'assets/images/publications/logos/complex.png',
            'British Vogue': 'assets/images/publications/logos/bvogue.png',
            'Variety': 'assets/images/publications/logos/variety.png',
            'Vibe': 'assets/images/publications/logos/vibe.png',
            'WWD': 'assets/images/publications/logos/wwd.png',
            'Flaunt': 'assets/images/publications/logos/flaunt.png',
            'Marie Claire': 'assets/images/publications/logos/marie.png',
            'New York Post': 'assets/images/publications/logos/nypost.png',
            'Page Six': 'assets/images/publications/logos/pagesix.png',
            'Seventeen': 'assets/images/publications/logos/seventeen.png',
            'Fault': 'assets/images/publications/logos/fault.png',
            'Wonderland': 'assets/images/publications/logos/wonderland.png',
            'Voyage LA': 'assets/images/publications/logos/voyage.png'
        };

        function renderWork(filter = 'all') {
            if (!workGrid) return;
            let filteredItems = filter === 'all'
                ? workItems.filter(item => item.category !== 'publications')
                : workItems.filter(item => item.category === filter);
            filteredItems = [...filteredItems].sort((a, b) => {
                const dateA = a.releaseDate || '0000-01-01';
                const dateB = b.releaseDate || '0000-01-01';
                return dateB.localeCompare(dateA);
            });

            workGrid.classList.toggle('work-grid-album-covers', filter === 'album-covers');
            workGrid.classList.toggle('work-grid-magazine-covers', filter === 'magazine-covers');
            workGrid.classList.toggle('work-grid-single-covers', filter === 'single-covers');
            workGrid.classList.toggle('work-grid-publications', filter === 'publications');

            workGrid.innerHTML = filteredItems.map(item => {
                const href = item.link || '#';
                const isYouTube = item.link && (item.link.includes('youtube.com') || item.link.includes('youtu.be'));
                const isExternal = item.link && item.link.startsWith('http');
                const target = (isYouTube || isExternal) ? '_blank' : '_self';
                const rel = (isYouTube || isExternal) ? 'noopener noreferrer' : '';
                const squareClass = item.square ? ' work-item-square' : '';
                const rectangularClass = item.rectangular ? ' work-item-rectangular' : '';
                const publicationClass = item.category === 'publications' ? ' work-item-publication' : '';
                const publicationEmptyClass = item.category === 'publications' && !item.image ? ' work-item-publication-empty' : '';
                const pubLogo = item.category === 'publications' ? (publicationLogos[item.title] || '') : '';
                const hasExternalLink = item.link && item.link.startsWith('http');
                const expandable = (item.category === 'album-covers' || item.category === 'single-covers' || item.category === 'magazine-covers') && item.image && !hasExternalLink;
                const dataExpand = expandable ? ` data-expand-image="${item.image}"` : '';
                return `
                <a href="${href}" class="work-item${squareClass}${rectangularClass}${publicationClass}${publicationEmptyClass}" data-category="${item.category}"${dataExpand} target="${target}" rel="${rel}">
                    ${item.video 
                        ? `<video src="${item.video}" ${item.image ? `poster="${item.image}"` : ''} autoplay muted loop playsinline webkit-playsinline></video>`
                        : (item.image 
                            ? `<img src="${item.image}" alt="${pubLogo ? '' : item.title}" loading="lazy">` 
                            : (item.category === 'publications' ? '' : `<div class="work-placeholder">[ Image Placeholder ]</div>`)
                        )
                    }
                    <div class="work-item-overlay">
                        ${item.categoryLabel ? `<span class="work-item-category">${item.categoryLabel}</span>` : ''}
                        ${item.comingSoon ? `<span class="work-item-coming-soon">Coming soon</span>` : ''}
                        ${pubLogo ? '' : `<h3 class="work-item-title">${item.title}</h3>`}
                        ${item.artist ? `<p class="work-item-artist">${item.artist}</p>` : ''}
                        ${item.director ? `<p class="work-item-director">${item.director}</p>` : ''}
                        ${item.date ? `<p class="work-item-date">${item.date}</p>` : ''}
                    </div>
                    ${pubLogo ? `<span class="work-item-logo-bar"><img class="work-item-logo" src="${pubLogo}" alt="${item.title}"></span>` : ''}
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
                    currentAlbumImageIndex = currentAlbumImageIndex >= 14 ? 1 : currentAlbumImageIndex + 1;
                    const albumExt = currentAlbumImageIndex >= 11 ? 'jpg' : 'png';
                    albumImg.src = `assets/images/album-covers/album-${currentAlbumImageIndex.toString().padStart(2, '0')}.${albumExt}`;
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

            const lifestyleImg = document.getElementById('lifestyle-img');
            let currentLifestyleImageIndex = 1;
            if (lifestyleImg) {
                setInterval(() => {
                    currentLifestyleImageIndex = currentLifestyleImageIndex >= 16 ? 1 : currentLifestyleImageIndex + 1;
                    lifestyleImg.src = `assets/images/lifestyle-commercials/lifestyle-${currentLifestyleImageIndex.toString().padStart(2, '0')}.jpg`;
                }, 400);
            }

            // Render Grids
            renderBrands();
            renderPublicationMarquee();
            renderWork('all');
            renderBlog();

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
            function applyWorkFilter(filter) {
                filterBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
                });
                renderWork(filter);
            }

            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    applyWorkFilter(e.currentTarget.getAttribute('data-filter'));
                });
            });

            document.querySelectorAll('.capability-card[data-work-filter]').forEach(card => {
                card.addEventListener('click', () => {
                    applyWorkFilter(card.getAttribute('data-work-filter'));
                });
            });

            const initialWork = new URLSearchParams(window.location.search).get('work');
            if (initialWork === 'publications') {
                document.getElementById('publications')?.scrollIntoView();
            } else if (initialWork && document.querySelector('.filter-btn[data-filter="' + initialWork + '"]')) {
                applyWorkFilter(initialWork);
            }

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