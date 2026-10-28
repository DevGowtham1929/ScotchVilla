/**
 * SCOTCHVILLA - Your Tiny Paw Buddy
 * Core Interaction and Carousel Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. CUSTOM PAW CURSOR (MOUSE POINTERS)
  // ==========================================
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const pawCursor = document.createElement('div');
    pawCursor.className = 'paw-cursor is-pointer';
    pawCursor.setAttribute('aria-hidden', 'true');
    pawCursor.innerHTML = `
      <svg class="paw-cursor-icon cursor-icon-pointer" viewBox="0 0 64 64" focusable="false">
        <path d="M8 4 55 38l-20 2 11 17-9 5-11-18-13 15Z" fill="#FFF8EC" stroke="#452215" stroke-width="3.2" stroke-linejoin="round"/>
        <g fill="#C67B39" stroke="#7C3D22" stroke-width="1.2">
          <ellipse cx="22" cy="30" rx="4.1" ry="5.4" transform="rotate(-26 22 30)"/>
          <ellipse cx="31" cy="27" rx="3.7" ry="5" transform="rotate(-9 31 27)"/>
          <ellipse cx="39" cy="30" rx="3.5" ry="4.7" transform="rotate(15 39 30)"/>
          <path d="M25 36c1-4 4-6 7-5 4 1 6 5 5 9-1 3-5 4-9 2-3-1-4-3-3-6Z"/>
        </g>
      </svg>
      <svg class="paw-cursor-icon cursor-icon-paw" viewBox="0 0 64 64" focusable="false">
        <path d="M24 42c-5 4-9 10-7 15 2 5 8 5 14 2l9-4c6 2 12 0 13-5 1-4-2-8-7-11" fill="#C98243" stroke="#472418" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <ellipse cx="17" cy="25" rx="6" ry="9" transform="rotate(-25 17 25)" fill="#FFF8EC" stroke="#472418" stroke-width="2.5"/>
        <ellipse cx="29" cy="18" rx="6" ry="9" transform="rotate(-8 29 18)" fill="#FFF8EC" stroke="#472418" stroke-width="2.5"/>
        <ellipse cx="42" cy="20" rx="6" ry="9" transform="rotate(13 42 20)" fill="#FFF8EC" stroke="#472418" stroke-width="2.5"/>
        <ellipse cx="51" cy="30" rx="6" ry="8" transform="rotate(28 51 30)" fill="#FFF8EC" stroke="#472418" stroke-width="2.5"/>
        <path d="M20 39c1-7 7-11 14-10 8 1 13 7 12 14-1 5-7 8-15 7-7-1-12-5-11-11Z" fill="#C98243" stroke="#472418" stroke-width="3"/>
      </svg>
      <svg class="paw-cursor-icon cursor-icon-point" viewBox="0 0 64 64" focusable="false">
        <path d="M20 57c-4-1-7-5-9-10L4 34c-2-4 3-8 7-5l7 7-1-22c0-5 8-5 8 0l1 15 1-3c2-4 7-3 8 1l1 2c3-3 7-1 8 3 4-2 8 1 8 5l-1 9c-1 8-6 13-14 13H20Z" fill="#FFF8EC" stroke="#472418" stroke-width="3" stroke-linejoin="round"/>
        <path d="m17 36-6-6m13-1 1 11m8-9 1 10m8-6 1 9" fill="none" stroke="#C98243" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <svg class="paw-cursor-icon cursor-icon-grab" viewBox="0 0 64 64" focusable="false">
        <path d="M14 36c0-5 7-7 10-3l2 3-2-14c-1-5 7-7 9-2l3 11 1-8c1-5 9-4 9 1v10l2-5c2-4 8-2 8 3v13c0 11-7 16-18 16-9 0-14-4-18-11l-6-10c-2-4 2-7 6-4Z" transform="translate(0 -5)" fill="#C98243" stroke="#472418" stroke-width="3" stroke-linejoin="round"/>
      </svg>
      <svg class="paw-cursor-icon cursor-icon-drop" viewBox="0 0 64 64" focusable="false">
        <path d="M11 27h42v30H11z" fill="#EABF83" stroke="#472418" stroke-width="3" stroke-linejoin="round"/>
        <path d="M27 27h10v30H27zM11 37h42" fill="#B83443" stroke="#472418" stroke-width="2.5"/>
        <path d="M25 27c-9-1-8-11-2-11 4 0 6 4 9 8 2-5 6-10 11-8 6 3 2 11-6 11" fill="#B83443" stroke="#472418" stroke-width="2.5" stroke-linejoin="round"/>
      </svg>
      <svg class="paw-cursor-icon cursor-icon-loading" viewBox="0 0 64 64" focusable="false">
        <ellipse cx="16" cy="25" rx="6" ry="9" transform="rotate(-25 16 25)" fill="#FFF8EC" stroke="#472418" stroke-width="2.5"/>
        <ellipse cx="29" cy="17" rx="6" ry="9" transform="rotate(-8 29 17)" fill="#FFF8EC" stroke="#472418" stroke-width="2.5"/>
        <ellipse cx="43" cy="19" rx="6" ry="9" transform="rotate(13 43 19)" fill="#FFF8EC" stroke="#472418" stroke-width="2.5"/>
        <ellipse cx="52" cy="29" rx="6" ry="8" transform="rotate(28 52 29)" fill="#FFF8EC" stroke="#472418" stroke-width="2.5"/>
        <path d="M20 39c1-7 7-11 14-10 8 1 13 7 12 14-1 5-7 8-15 7-7-1-12-5-11-11Z" fill="#C98243" stroke="#472418" stroke-width="3"/>
      </svg>
      <span class="paw-cursor-click-ring"></span>`;
    document.body.appendChild(pawCursor);
    document.body.classList.add('has-paw-cursor');

    let cursorFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastTrailX = 0;
    let lastTrailY = 0;
    let lastTrailAt = 0;
    let droppingTimer;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interactiveSelector = 'a, button, input, select, textarea, label, [role="button"], [tabindex]:not([tabindex="-1"]), .gallery-photo-card';

    const setCursorState = (state) => {
      const stateChanged = pawCursor.dataset.state !== state;
      pawCursor.dataset.state = state;
      pawCursor.classList.toggle('is-pointer', state === 'pointer');
      pawCursor.classList.toggle('is-paw', state === 'hover');
      pawCursor.classList.toggle('is-pointing', state === 'point');
      pawCursor.classList.toggle('is-grabbing', state === 'grab');
      pawCursor.classList.toggle('is-dropping', state === 'drop');
      pawCursor.classList.toggle('is-loading', state === 'loading');
      if (stateChanged && pawCursor.classList.contains('is-visible')) {
        const offset = state === 'pointer' ? 3 : 22;
        pawCursor.style.transform = `translate3d(${pointerX - offset}px, ${pointerY - offset}px, 0)`;
      }
    };

    const addPawTrail = (x, y, extraClass = '') => {
      if (reducedMotion) return;
      const print = document.createElement('span');
      print.className = `paw-cursor-trail ${extraClass}`.trim();
      print.setAttribute('aria-hidden', 'true');
      print.innerHTML = '<svg viewBox="0 0 32 32"><ellipse cx="8" cy="9" rx="3.2" ry="4.2"/><ellipse cx="15" cy="6" rx="3" ry="4"/><ellipse cx="22" cy="8" rx="3" ry="4"/><ellipse cx="26" cy="14" rx="2.8" ry="3.7"/><path d="M8 20c.7-4 4-6.5 8-6 4.4.5 7.4 4 6.8 7.7-.5 3.1-4.3 4.7-8.7 3.8C10 24.8 7.4 23 8 20Z"/></svg>';
      print.style.left = `${x - 12}px`;
      print.style.top = `${y - 12}px`;
      document.body.appendChild(print);
      print.addEventListener('animationend', () => print.remove(), { once: true });
    };

    document.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;

      pointerX = event.clientX;
      pointerY = event.clientY;
      pawCursor.classList.add('is-visible');

      if (!pawCursor.classList.contains('is-grabbing') && !pawCursor.classList.contains('is-dropping') && !pawCursor.classList.contains('is-loading')) {
        const target = event.target instanceof Element ? event.target : null;
        const interactive = target && target.closest(interactiveSelector);
        setCursorState(interactive ? (interactive.matches('button, [role="button"]') ? 'point' : 'hover') : 'pointer');
      }

      if (!reducedMotion) {
        const now = performance.now();
        const distance = Math.hypot(pointerX - lastTrailX, pointerY - lastTrailY);
        if (distance > 54 && now - lastTrailAt > 90) {
          addPawTrail(pointerX, pointerY);
          lastTrailX = pointerX;
          lastTrailY = pointerY;
          lastTrailAt = now;
        }
      }

      if (!cursorFrame) {
        cursorFrame = window.requestAnimationFrame(() => {
          const state = pawCursor.dataset.state;
          const offset = state === 'pointer' ? 3 : 22;
          pawCursor.style.transform = `translate3d(${pointerX - offset}px, ${pointerY - offset}px, 0)`;
          cursorFrame = 0;
        });
      }
    }, { passive: true });

    document.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      const interactive = target && target.closest(interactiveSelector);
      const grabTarget = target && target.closest('[draggable="true"], img, [data-cursor-grab]');
      setCursorState(grabTarget ? 'grab' : (interactive ? 'point' : 'hover'));
      pawCursor.classList.add('is-clicking');
      addPawTrail(event.clientX, event.clientY, 'is-click-burst');
      window.setTimeout(() => pawCursor.classList.remove('is-clicking'), 280);
    });

    document.addEventListener('pointerup', (event) => {
      if (event.pointerType !== 'mouse' || !pawCursor.classList.contains('is-grabbing')) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      setCursorState('drop');
      window.clearTimeout(droppingTimer);
      droppingTimer = window.setTimeout(() => {
        const target = document.elementFromPoint(pointerX, pointerY);
        const interactive = target && target.closest(interactiveSelector);
        setCursorState(interactive ? (interactive.matches('button, [role="button"]') ? 'point' : 'hover') : 'pointer');
      }, 360);
    });

    document.addEventListener('dragstart', () => setCursorState('grab'));
    document.addEventListener('dragend', () => {
      setCursorState('drop');
      window.setTimeout(() => setCursorState('pointer'), 360);
    });
    document.addEventListener('drop', (event) => {
      if (event.pointerType === 'mouse') {
        pointerX = event.clientX;
        pointerY = event.clientY;
        setCursorState('drop');
      }
    });
    document.addEventListener('pointerleave', () => pawCursor.classList.remove('is-visible'));

    if (document.readyState !== 'complete') {
      setCursorState('loading');
      window.addEventListener('load', () => {
        setCursorState('pointer');
        pawCursor.classList.remove('is-loading');
      }, { once: true });
    }
  }

  // ==========================================
  // 1. STICKY HEADER ON SCROLL
  // ==========================================
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });


  // ==========================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Mobile Dropdown Accordion
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-btn');
    mobileDropdowns.forEach(btn => {
      btn.addEventListener('click', () => {
        const submenu = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        if (submenu) {
          const isVisible = submenu.classList.toggle('is-visible');
          if (icon) {
            icon.style.transform = isVisible ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        }
      });
    });

    // Close drawer when clicking a link
    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }


  // ==========================================
  // 3. VIDEO MODAL POPUP
  // ==========================================
  const playVideoBtn = document.getElementById('play-video-btn');
  const videoModal = document.getElementById('video-modal');
  const videoCloseBtn = document.getElementById('video-modal-close-btn');
  const videoBackdrop = document.getElementById('video-modal-close-backdrop');
  const videoIframe = document.getElementById('video-iframe');

  function openVideoModal() {
    if (!videoModal || !videoIframe) return;
    const videoId = playVideoBtn.getAttribute('data-video-id') || '2Ag-u43RJvM';
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoModal.classList.add('is-active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal || !videoIframe) return;
    videoModal.classList.remove('is-active');
    videoModal.setAttribute('aria-hidden', 'true');
    videoIframe.src = '';
    document.body.style.overflow = '';
  }

  if (playVideoBtn) playVideoBtn.addEventListener('click', openVideoModal);
  if (videoCloseBtn) videoCloseBtn.addEventListener('click', closeVideoModal);
  if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideoModal);


  // ==========================================
  // 4. PUPPIES CAROUSEL
  // ==========================================
  const puppiesTrack = document.getElementById('puppies-carousel-track');
  const puppiesPrevBtn = document.getElementById('puppies-prev');
  const puppiesNextBtn = document.getElementById('puppies-next');
  const puppiesContainer = document.getElementById('puppies-carousel-container');

  if (puppiesTrack && puppiesContainer) {
    const items = puppiesTrack.querySelectorAll('.puppy-carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    let autoPlayTimer = null;

    function getVisibleCount() {
      const width = window.innerWidth;
      if (width <= 768) return 1;
      if (width <= 1024) return 2;
      return 3;
    }

    function updatePuppiesCarousel() {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, totalItems - visibleCount);
      if (currentIndex > maxIndex) currentIndex = 0;
      if (currentIndex < 0) currentIndex = maxIndex;

      const itemWidth = items[0].getBoundingClientRect().width;
      const gap = 30;
      const offset = currentIndex * (itemWidth + gap);
      puppiesTrack.style.transform = `translateX(-${offset}px)`;
    }

    function nextPuppy() {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, totalItems - visibleCount);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updatePuppiesCarousel();
    }

    function prevPuppy() {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, totalItems - visibleCount);
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updatePuppiesCarousel();
    }

    if (puppiesNextBtn) puppiesNextBtn.addEventListener('click', () => {
      nextPuppy();
      resetPuppyTimer();
    });

    if (puppiesPrevBtn) puppiesPrevBtn.addEventListener('click', () => {
      prevPuppy();
      resetPuppyTimer();
    });

    function startPuppyTimer() {
      autoPlayTimer = setInterval(nextPuppy, 3500);
    }

    function resetPuppyTimer() {
      clearInterval(autoPlayTimer);
      startPuppyTimer();
    }

    startPuppyTimer();

    puppiesContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    puppiesContainer.addEventListener('mouseleave', () => startPuppyTimer());

    window.addEventListener('resize', () => {
      updatePuppiesCarousel();
    });

    // Touch Swipe for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    puppiesTrack.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    puppiesTrack.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextPuppy();
        resetPuppyTimer();
      } else if (touchEndX - touchStartX > 50) {
        prevPuppy();
        resetPuppyTimer();
      }
    }, { passive: true });
  }


  // ==========================================
  // 5. TESTIMONIALS CAROUSEL
  // ==========================================
  const testimonialsTrack = document.getElementById('testimonials-track');
  const testimonialDots = document.querySelectorAll('.t-dot');
  const testimonialsContainer = document.getElementById('testimonials-container');

  if (testimonialsTrack && testimonialDots.length) {
    const cards = testimonialsTrack.querySelectorAll('.testimonial-card');
    let tIndex = 0;
    let tTimer = null;

    function getTVisibleCount() {
      const width = window.innerWidth;
      if (width <= 768) return 1;
      if (width <= 1024) return 2;
      return 3;
    }

    function updateTestimonials(index) {
      tIndex = index;
      if (!cards.length) return;
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 30;
      const visible = getTVisibleCount();
      const maxOffset = Math.max(0, (cards.length - visible) * (cardWidth + gap));
      const targetOffset = tIndex * (cardWidth + gap);
      const offset = Math.min(targetOffset, maxOffset);
      testimonialsTrack.style.transform = `translateX(-${offset}px)`;

      testimonialDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === tIndex);
      });
    }

    testimonialDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10) || 0;
        updateTestimonials(idx);
        resetTTimer();
      });
    });

    function nextTestimonial() {
      const maxDots = testimonialDots.length;
      tIndex = (tIndex + 1) % maxDots;
      updateTestimonials(tIndex);
    }

    function startTTimer() {
      tTimer = setInterval(nextTestimonial, 4500);
    }

    function resetTTimer() {
      clearInterval(tTimer);
      startTTimer();
    }

    startTTimer();

    if (testimonialsContainer) {
      testimonialsContainer.addEventListener('mouseenter', () => clearInterval(tTimer));
      testimonialsContainer.addEventListener('mouseleave', () => startTTimer());
    }

    window.addEventListener('resize', () => {
      updateTestimonials(tIndex);
    });
  }


  // ==========================================
  // 6. ANIMATED COUNTER (300+ DOGS)
  // ==========================================
  const counterElem = document.getElementById('stats-counter');
  let counterAnimated = false;

  if (counterElem) {
    const target = parseInt(counterElem.getAttribute('data-target'), 10) || 300;

    const countUp = () => {
      let current = 1;
      const duration = 2000;
      const stepTime = 16;
      const totalSteps = duration / stepTime;
      const increment = (target - current) / totalSteps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counterElem.textContent = target;
          clearInterval(timer);
        } else {
          counterElem.textContent = Math.floor(current);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
          counterAnimated = true;
          countUp();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterElem);
  }


  // ==========================================
  // 7. CONTACT MODAL & FORM HANDLER
  // ==========================================
  const contactModal = document.getElementById('contact-modal');
  const contactCloseBtn = document.getElementById('contact-modal-close-btn');
  const contactBackdrop = document.getElementById('contact-modal-close-backdrop');
  const contactTriggers = document.querySelectorAll('.open-contact-trigger');
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success-message');

  function openContactModal(e) {
    if (e) e.preventDefault();
    if (!contactModal) return;
    contactModal.classList.add('is-active');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.remove('is-active');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  contactTriggers.forEach(btn => {
    btn.addEventListener('click', openContactModal);
  });

  if (contactCloseBtn) contactCloseBtn.addEventListener('click', closeContactModal);
  if (contactBackdrop) contactBackdrop.addEventListener('click', closeContactModal);

  // Close modals on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeContactModal();
    }
  });

  // Handle Form Submit
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      if (successMessage) {
        successMessage.style.display = 'block';
      }
      setTimeout(() => {
        closeContactModal();
        // reset after close
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'block';
          if (successMessage) successMessage.style.display = 'none';
        }, 400);
      }, 3000);
    });
  }

  // ==========================================
  // 10. STORY CARDS TAP TOGGLE (MOBILE/TOUCH & KEYBOARD)
  // ==========================================
  const storyCards = document.querySelectorAll('.story-card');
  storyCards.forEach(card => {
    const toggleCard = () => {
      const wasActive = card.classList.contains('is-active');
      storyCards.forEach(c => c.classList.remove('is-active'));
      if (!wasActive) {
        card.classList.add('is-active');
      }
    };
    card.addEventListener('click', toggleCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard();
      }
    });
  });

  // ==========================================
  // 11. HERO 3-IMAGE SLIDER (EVERY 2 SECONDS)
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    let slideTimer = null;

    function goToSlide(index) {
      heroSlides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('is-active');
        } else {
          slide.classList.remove('is-active');
        }
      });
      heroDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('is-active');
        } else {
          dot.classList.remove('is-active');
        }
      });
      currentSlide = index;
    }

    function nextHeroSlide() {
      const nextIndex = (currentSlide + 1) % heroSlides.length;
      goToSlide(nextIndex);
    }

    function startHeroTimer() {
      if (!slideTimer) {
        slideTimer = setInterval(nextHeroSlide, 2000);
      }
    }

    function stopHeroTimer() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    // Start auto slide
    startHeroTimer();

    // Click dot navigation
    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        stopHeroTimer();
        startHeroTimer();
      });
    });

    // Pause on hover
    const sliderWrap = document.getElementById('hero-slider-wrap');
    if (sliderWrap) {
      sliderWrap.addEventListener('mouseenter', stopHeroTimer);
      sliderWrap.addEventListener('mouseleave', startHeroTimer);
    }
  }

});
