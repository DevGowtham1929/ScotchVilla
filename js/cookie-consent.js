/* Scotchvilla cookie and analytics preferences.
   Analytics stays off until a visitor accepts it. */
(() => {
  const CONSENT_KEY = 'scotchvilla-analytics-consent-v1';
  const GA_MEASUREMENT_ID = 'G-Y8FZ31WBJH';
  let banner = null;

  function readConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function loadGoogleAnalytics() {
    if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) return;

    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    if (window.__scotchvillaGoogleAnalyticsLoaded) return;
    window.__scotchvillaGoogleAnalyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  }

  function clearGoogleAnalyticsCookies() {
    if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) return;
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      if (/^_(ga|gid|gat)/i.test(name)) {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      }
    });
  }

  function saveChoice(choice) {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch (error) {
      // Keep the current-page choice functional when storage is unavailable.
    }

    if (choice === 'accepted') loadGoogleAnalytics();
    else clearGoogleAnalyticsCookies();

    if (banner) {
      banner.classList.add('is-closing');
      setTimeout(() => {
        if (banner) {
          banner.remove();
          banner = null;
        }
        document.body.classList.remove('cookie-modal-open');
      }, 260);
    }
    document.dispatchEvent(new CustomEvent('scotchvilla:cookie-consent-changed', { detail: { choice } }));
  }

  function showCookiePreferences() {
    if (banner) {
      const acceptButton = banner.querySelector('[data-cookie-choice="accepted"]');
      if (acceptButton) acceptButton.focus();
      return;
    }

    banner = document.createElement('div');
    banner.className = 'cookie-modal-overlay';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.setAttribute('aria-describedby', 'cookie-consent-description');
    banner.innerHTML = `
      <div class="cookie-modal-backdrop"></div>
      <div class="cookie-modal-stage">
        <div class="cookie-modal-card">
          <div class="cookie-card-header">
            <h2 class="cookie-card-title" id="cookie-consent-title">I Promise Not to Eat These Cookies! 🍪</h2>
          </div>
          <div class="cookie-card-body" id="cookie-consent-description">
            <p>Hi, I'm Scotch! I've recently discovered that not all cookies are edible. Quite disappointing, if you ask me.</p>
            <p>These little cookies help me understand how you explore Scotchvilla through Google Analytics, so I can make your visits even better. Only if you say yes. Pinky paw promise! 🐾</p>
            <p class="cookie-subtext">Saying no won't stop you using the site.</p>
          </div>
          <div class="cookie-card-actions">
            <button type="button" class="cookie-btn cookie-btn-accept" data-cookie-choice="accepted">
              Accept Analytics
            </button>
            <button type="button" class="cookie-btn cookie-btn-reject" data-cookie-choice="rejected">
              Reject Analytics
            </button>
          </div>
          <div class="cookie-card-footer-links">
            <a href="cookie-policy.html" class="cookie-footer-link">Cookie Policy</a>
            <span class="cookie-footer-sep" aria-hidden="true">·</span>
            <span class="cookie-footer-text">Change your choice anytime</span>
          </div>
        </div>
        <div class="cookie-mascot-wrapper" aria-hidden="true">
          <img src="images/cookie-mascot-scotch.png" alt="Scotch holding a heart cookie" class="cookie-mascot-img" width="693" height="735">
        </div>
      </div>`;

    document.body.appendChild(banner);
    document.body.classList.add('cookie-modal-open');

    const acceptBtn = banner.querySelector('[data-cookie-choice="accepted"]');
    if (acceptBtn) setTimeout(() => acceptBtn.focus(), 150);
  }

  document.addEventListener('click', (event) => {
    const choiceButton = event.target.closest('[data-cookie-choice]');
    if (choiceButton) {
      saveChoice(choiceButton.dataset.cookieChoice);
      return;
    }

    if (event.target.closest('[data-cookie-preferences]')) {
      event.preventDefault();
      showCookiePreferences();
    }
  });

  window.showCookiePreferences = showCookiePreferences;

  const savedConsent = readConsent();
  if (savedConsent === 'accepted') loadGoogleAnalytics();
  else if (savedConsent !== 'rejected') showCookiePreferences();
})();
