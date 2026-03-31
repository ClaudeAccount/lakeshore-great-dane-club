/* =====================================================
   LAKE SHORE GREAT DANE CLUB — Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navigation scroll effect --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Scroll reveal animations --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
  }

  /* --- Trait bar animation --- */
  const traitFills = document.querySelectorAll('.trait-fill');
  if (traitFills.length) {
    const traitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            traitObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    traitFills.forEach(el => {
      el.dataset.width = el.style.width;
      el.style.width = '0';
      traitObserver.observe(el);
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Set active nav link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Counter animation for stats --- */
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(current).toLocaleString();
              }
            }, 16);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(el => counterObserver.observe(el));
  }

  /* --- Gallery lightbox (simple) --- */
  const galleryItems = document.querySelectorAll('.gallery-item[data-full]');
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<div class="lightbox-backdrop"></div><img class="lightbox-img" src="" alt="">';
    lightbox.style.cssText = 'display:none;position:fixed;inset:0;z-index:2000;align-items:center;justify-content:center;';
    lightbox.querySelector('.lightbox-backdrop').style.cssText = 'position:absolute;inset:0;background:rgba(11,11,11,0.95);cursor:pointer;';
    lightbox.querySelector('.lightbox-img').style.cssText = 'position:relative;max-width:90%;max-height:90vh;object-fit:contain;z-index:1;';
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        lightbox.querySelector('.lightbox-img').src = item.dataset.full;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

});
