// ── Scroll fade-in ──────────────────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.step, .feature, .mock-badge, .status-card, .annotation-demo').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ── Live discount animation in main mockup ───────────────────────────────────
const mockOffer = document.querySelector('.mock-offer');
const mockSave  = document.querySelector('.mock-save');
const mockPill  = document.querySelector('.mock-pill');

if (mockOffer) {
  const BASE = 1_100_000;
  let pct = 20;
  let dir = 1;

  function fmt(n) {
    return '$' + n.toLocaleString('en-AU');
  }

  setInterval(() => {
    pct += dir * 5;
    if (pct >= 35) dir = -1;
    if (pct <= 10) dir = 1;
    const offer = Math.round(BASE * (1 - pct / 100));
    const save  = BASE - offer;
    mockOffer.textContent = fmt(offer);
    mockSave.textContent  = 'Save ' + fmt(save);
    mockPill.textContent  = pct + '% off';
  }, 1800);
}

// ── Rotating quote ticker ────────────────────────────────────────────────────
const TICKER_QUOTES = [
  "Three weeks on the market. They're softening. You can feel it.",
  "The photos were taken with a wide-angle lens and a prayer.",
  "It's not lowballing. It's 'price discovery'.",
  "'Original character' is real estate for 'the wiring will absolutely kill you'.",
  "The market has turned. The agent just hasn't told the vendor yet.",
  "That price is the vendor's retirement plan. Don't fund it.",
  "Someone has to keep the agents humble. Today it's you.",
  "The vendor's price and the market are not currently on speaking terms.",
  "Darryl Kerrigan paid $70,000 for his house and felt he overpaid.",
  "Send it. Confidence is free.",
  "Described as 'cosy'. Your offer should be too.",
  "'North-facing' is doing a lot of heavy lifting in that listing.",
  "This suburb's been 'up and coming' so long it's eligible for a pension.",
  "The building inspector used the word 'concerning' fourteen times. Lead with that.",
];

const tickerEl = document.getElementById('tickerQuote');
if (tickerEl) {
  let idx = 0;
  setInterval(() => {
    tickerEl.classList.add('fading');
    setTimeout(() => {
      idx = (idx + 1) % TICKER_QUOTES.length;
      tickerEl.textContent = '“' + TICKER_QUOTES[idx] + '”';
      tickerEl.classList.remove('fading');
    }, 350);
  }, 4500);
}
