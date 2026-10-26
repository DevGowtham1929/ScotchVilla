/**
 * SCOTCHVILLA - Your Tiny Paw Buddy
 * Core Interaction and Carousel Script
 */

document.addEventListener('DOMContentLoaded', () => {

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
