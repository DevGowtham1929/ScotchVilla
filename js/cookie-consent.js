/* Scotchvilla cookie and analytics preferences.
   Add the site's GA4 measurement ID below to enable analytics after consent. */
(() => {
  const CONSENT_KEY = 'scotchvilla-analytics-consent-v1';
  const GA_MEASUREMENT_ID = '';
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
      banner.remove();
      banner = null;
    }
    document.dispatchEvent(new CustomEvent('scotchvilla:cookie-consent-changed', { detail: { choice } }));
  }

  function showCookiePreferences() {
    if (banner) {
      const acceptButton = banner.querySelector('[data-cookie-choice="accepted"]');
      if (acceptButton) acceptButton.focus();
      return;
    }

    banner = document.createElement('section');
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.setAttribute('aria-describedby', 'cookie-consent-description');
    banner.innerHTML = `
      <div class="cookie-consent-heading">
        <h2 class="cookie-consent-title" id="cookie-consent-title">I Promise Not to Eat These Cookies! 🍪</h2>
      </div>
      <div class="cookie-consent-copy" id="cookie-consent-description">
        <p>Hi, I'm Scotch! I've recently discovered that not all cookies are edible. Quite disappointing, if you ask me.</p>
        <p>These little cookies help me understand how you explore Scotchvilla through Google Analytics, so I can make your visits even better.</p>
        <p>Only if you say yes. Pinky paw promise!<br>Saying no won't stop you using the site.</p>
      </div>
      <div class="cookie-consent-actions">
        <button type="button" data-cookie-choice="accepted">Accept Analytics</button>
        <button type="button" data-cookie-choice="rejected">Reject Analytics</button>
      </div>
      <div class="cookie-consent-links">
        <a href="cookie-policy.html">Cookie Policy</a>
        <span aria-hidden="true">·</span>
        <button type="button" data-cookie-preferences>Change your choice anytime</button>
      </div>`;

    document.body.appendChild(banner);
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
