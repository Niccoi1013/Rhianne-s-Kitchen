// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card[role="button"], .card[data-action]');
  cards.forEach(card => {
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    if (!card.hasAttribute('aria-pressed')) card.setAttribute('aria-pressed', 'false');

    card.addEventListener('click', () => {
      const action = (card.dataset.action || '').trim();
      if (!action) {
        card.setAttribute('aria-pressed', card.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        return;
      }

      // handle protocol URLs (mailto:, tel:, https://, http://) and relative paths
      const protoMatch = action.match(/^([a-z][a-z0-9+.-]*):/i);
      try {
        if (protoMatch) {
          const proto = protoMatch[1].toLowerCase();
          if (proto === 'http' || proto === 'https') {
            window.open(action, '_blank', 'noopener');
            return;
          }
          // mailto:, tel:, etc. — navigate to the URL to invoke system handler
          window.location.href = action;
          return;
        }
        // fallback: treat as relative link
        window.location.href = action;
      } catch (e) {
        card.setAttribute('aria-pressed', card.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
});
`// filepath: /Users/niccoi/Desktop/2nd Year/ICS2608/FINAL/Contacts.js
// Attach button-like behavior to .card elements (no <script> tags in this file)
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card[role="button"]');
  cards.forEach(card => {
    // ensure keyboard focusable and aria state
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    if (!card.hasAttribute('aria-pressed')) card.setAttribute('aria-pressed', 'false');

    // click behavior: follow data-action URL if present, otherwise toggle pressed
    card.addEventListener('click', () => {
      const action = card.dataset.action?.trim();
      if (action) {
        // navigate for simple URL targets (relative or absolute)
        if (/^(https?:\/\/|\/|.+\.html$)/i.test(action)) {
          window.location.href = action;
          return;
        }
        // dispatch custom event for other action hooks
        card.dispatchEvent(new CustomEvent('card:activate', { detail: { action, card } }));
        return;
      }
      card.setAttribute('aria-pressed', card.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });

    // keyboard activation (Enter / Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
});`