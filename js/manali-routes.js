/**
 * Manali Route Data
 * Detailed routes from 8 Indian cities to Manali.
 * Road access — no trekking. Hill station + adventure destination.
 */

var MANALI_ROUTES = {};

function manaliRoute(cityLabel, basicSteps, comfortSteps, premiumSteps, basicDay1Title, comfortDay1Title, premiumDay1Title, basicNote, comfortNote, premiumNote, basicFood, comfortFood, premiumFood, basicFoodCost, comfortFoodCost, premiumFoodCost) {
  var key = cityLabel.split(' (')[0];
  MANALI_ROUTES[key] = {
    label: cityLabel,
    distance: '~500-1,800 km',
    basic: { day1Title: basicDay1Title, steps: basicSteps, day1Note: basicNote, day1Food: basicFood, day1FoodCost: basicFoodCost },
    comfort: { day1Title: comfortDay1Title, steps: comfortSteps, day1Note: comfortNote, day1Food: comfortFood, day1FoodCost: comfortFoodCost },
    premium: { day1Title: premiumDay1Title, steps: premiumSteps, day1Note: premiumNote, day1Food: premiumFood, day1FoodCost: premiumFoodCost }
  };
}

// ============================================================
// DELHI → MANALI
// ============================================================
manaliRoute(
  'Delhi',
  [
    { title: '🚌 Delhi (ISBT Kashmere Gate) to Manali — HRTC Ordinary Bus', desc: '<strong>Direct bus — 12-14 hours, ~550 km.</strong><br><br><strong>HRTC Ordinary Bus:</strong> Government-run. Departs ISBT Kashmere Gate between 5 PM – 10 PM. Multiple buses daily. Non-AC, pushback seats, stops at Karnal, Chandigarh, Mandi, Kullu. Reaches Manali next morning (6-8 AM).<br><br><strong>Ticket:</strong> ₹700-1,000/person. Buy at ISBT counter or online at hrtc.gov.in. Book 1-2 days ahead during peak season (May-June, Dec-Jan).<br><br><strong>Boarding point:</strong> ISBT Kashmere Gate, Platform 35-38. Metro: Kashmere Gate (Red/Yellow/Violet lines).', cost: '₹700 – 1,000 / person' }
  ],
  [
    { title: '🚌 Delhi to Manali — Volvo AC Semi-Sleeper', desc: '<strong>Comfortable overnight journey — 12-14 hours.</strong><br><br><strong>HRTC Volvo / Private Volvo:</strong> AC, semi-sleeper seats, charging points, blanket provided. Fewer stops than ordinary bus. Departures: 6 PM – 10 PM from ISBT Kashmere Gate and Majnu Ka Tila.<br><br><strong>Ticket:</strong> ₹1,200-1,800/person. Book on hrtc.gov.in, redbus.in, or paytm. <strong>Book 1-2 weeks ahead for peak season.</strong><br><br><strong>Private operators:</strong> Laxmi Holidays, City Land Travels, Ram Dalal — slightly more expensive but more comfortable.', cost: '₹1,200 – 1,800 / person' }
  ],
  [
    { title: '🚗 Delhi to Manali — Private SUV (Innova / Fortuner)', desc: '<strong>Door-to-door luxury — 11-12 hours.</strong><br><br>Private cab from your Delhi residence to Manali hotel. Stop wherever you want — Murthal for breakfast, Chandigarh for lunch, Mandi for tea. Most comfortable option, especially for families.<br><br><strong>Cost:</strong> ₹10,000-14,000 (one way, 1-3 people). Round trip: ₹20,000-25,000.<br><br><strong>Book:</strong> Savaari, MakeMyTrip, or local Delhi cab operators.', cost: '₹10,000 – 14,000 (one way)' }
  ],
  'Delhi → Manali (HRTC Bus Journey)',
  'Delhi → Manali (Volvo AC Bus)',
  'Delhi → Manali (Private SUV — Door to Door)',
  '🌙 <strong>Overnight bus journey.</strong> Bus crosses Chandigarh, Mandi, Kullu. First view of the Himalayas at sunrise near Kullu. Carry a light blanket — even ordinary buses can get cold at night.',
  '🌙 <strong>Comfortable overnight in Volvo.</strong> Semi-sleeper seats, AC, blanket provided. Reach Manali fresh by morning.',
  '🌙 <strong>Premium Resort at Manali.</strong> ₹5,000-10,000/night. Reach by evening — same day travel possible with private cab.',
  'Dinner before boarding at ISBT (₹100-150). Carry packed snacks and water for the night. Tea/breakfast at Mandi stop (₹50-80). <strong>Budget:</strong> ₹250-350/person.',
  'Dinner at a good restaurant near ISBT/Majnu Ka Tila (₹250-350). Bus stops at decent food courts. Breakfast at Kullu (₹150-200). <strong>Budget:</strong> ₹500-700/person.',
  'Lunch at Chandigarh/Mandi premium restaurant (₹400-600). Your driver knows the best stops. <strong>Budget:</strong> ₹700-1,000/person.',
  '₹250 – 350 / person', '₹500 – 700 / person', '₹700 – 1,000 / person'
);

// ============================================================
// PATNA → MANALI
// ============================================================
manaliRoute(
  'Patna (Bihar)',
  [
    { title: '🚂 Patna (PNBE) to Delhi (NDLS) — General Class + 🚌 Delhi to Manali (HRTC Bus)', desc: '<strong>First reach Delhi, then bus to Manali.</strong><br><br><strong>Best trains:</strong> Rajdhani Express (12309, 7:15 PM, reaches 7:40 AM), Shramjeevi Express (12391, 11:10 AM), Magadh Express (20801, 3:15 PM).<br><br><strong>Journey:</strong> 12-16 hours. <strong>Ticket:</strong> General class ₹350-450/person.<br><br><strong>Then:</strong> Reach Delhi, take auto/metro to ISBT Kashmere Gate (₹50-100). Board HRTC bus to Manali (₹700-1,000). Total travel: 2 days. <strong>Combined:</strong> ₹1,050-1,450/person.', cost: '₹1,050 – 1,450 / person' }
  ],
  [
    { title: '🚂 Patna → Delhi (3AC) + Volvo to Manali', desc: '<strong>Rajdhani Express 3AC:</strong> ₹1,800-2,200. Reaches Delhi 7:40 AM. Fresh and comfortable.<br><br>From Delhi, Volvo AC bus to Manali: ₹1,200-1,800.<br><br><strong>Total combined:</strong> ₹3,000-4,000/person.', cost: '₹3,000 – 4,000 / person' }
  ],
  [
    { title: '✈️ Patna → Delhi (Flight) → Private SUV to Manali', desc: '<strong>Flight:</strong> Patna to Delhi. 1.5 hours. ₹4,000-7,000/person. Multiple airlines: IndiGo, SpiceJet, Air India.<br><br>From Delhi Airport, private SUV directly to Manali: ₹12,000-16,000 (1-3 people).<br><br><strong>Fastest option from Patna.</strong> Leave Patna at 6 AM, reach Manali by 10 PM same day.', cost: '₹4,000 – 7,000 / person (flight)' }
  ],
  'Patna → Delhi (Train) → Manali (Bus)',
  'Patna → Delhi (3AC Train) → Manali (Volvo)',
  'Patna → Delhi (Flight) → Manali (Private SUV)',
  '🌙 <strong>Overnight train to Delhi.</strong> Next day: bus to Manali. Total: 2 days.',
  '🌙 <strong>Comfortable Rajdhani experience.</strong> Reach Delhi fresh, Volvo to Manali.',
  '🌙 <strong>Premium Resort at Manali.</strong> Same-day arrival possible with flight + SUV.',
  'Pack food from Patna for train journey (₹100-150). Delhi ISBT food (₹100-150). <strong>Budget:</strong> ₹300-400/person.',
  'IRCTC Rajdhani meals included. Delhi ISBT restaurants (₹250-350). <strong>Budget:</strong> ₹500-700/person.',
  'Airport lunch (₹300-500), dinner at premium stop en route (₹400-600). <strong>Budget:</strong> ₹700-1,000/person.',
  '₹300 – 400 / person', '₹500 – 700 / person', '₹700 – 1,000 / person'
);

// ============================================================
// BHAGALPUR → MANALI
// ============================================================
manaliRoute(
  'Bhagalpur (Bihar)',
  [
    { title: '🚂 Bhagalpur (BGP) → Patna → Delhi → Manali', desc: '<strong>No direct train to Delhi from Bhagalpur.</strong> First reach Patna (₹100, 4-6 hrs), then train to Delhi (₹350-450, 12-16 hrs), then bus to Manali (₹700-1,000, 12-14 hrs).<br><br><strong>Total journey:</strong> 2-3 days. <strong>Total cost:</strong> ₹1,150-1,550/person (trains + bus).', cost: '₹1,150 – 1,550 / person' }
  ],
  [
    { title: '🚂 Bhagalpur → Patna (CC) → Delhi (3AC) → Manali (Volvo)', desc: '<strong>Combined comfortable route.</strong> Intercity to Patna (₹350 CC), Rajdhani 3AC to Delhi (₹1,800-2,200), Volvo to Manali (₹1,200-1,800).<br><br><strong>Total:</strong> ₹3,350-4,350/person.', cost: '₹3,350 – 4,350 / person' }
  ],
  [
    { title: '🚂 Bhagalpur → Patna → ✈️ Delhi → 🚗 Manali', desc: '<strong>AC train to Patna (₹500) + Flight to Delhi (₹4,000-7,000) + Private SUV (₹12,000-16,000).</strong><br><br>Total: ₹16,500-23,500 (1-3 people).', cost: '₹16,500 – 23,500 (1-3 people)' }
  ],
  'Bhagalpur → Patna → Delhi → Manali (Train + Bus)',
  'Bhagalpur → Patna → Delhi (3AC) → Manali (Volvo)',
  'Bhagalpur → Patna → Delhi (Flight) → Manali (SUV)',
  '🌙 <strong>Long journey from Bhagalpur.</strong> Plan for 5-6 days total trip.',
  '🌙 <strong>Comfortable multi-leg journey.</strong> Worth the upgrade from Bhagalpur.',
  '🌙 <strong>Premium Resort at Manali.</strong> Fastest route from small-town Bihar.',
  'Carry food from home for long journey. <strong>Budget:</strong> ₹350-450/person.',
  'IRCTC meals + Delhi restaurants. <strong>Budget:</strong> ₹600-800/person.',
  'Airport + premium stops. <strong>Budget:</strong> ₹800-1,200/person.',
  '₹350 – 450 / person', '₹600 – 800 / person', '₹800 – 1,200 / person'
);

// ============================================================
// VARANASI → MANALI
// ============================================================
manaliRoute(
  'Varanasi (UP)',
  [
    { title: '🚂 Varanasi (BSB) to Delhi (NDLS) + 🚌 Delhi to Manali', desc: '<strong>Train to Delhi (₹350-450, 12-14 hrs), then HRTC bus to Manali (₹700-1,000, 12-14 hrs).</strong> Total: 2 days, ₹1,050-1,450/person.', cost: '₹1,050 – 1,450 / person' }
  ],
  [
    { title: '🚂 Varanasi → Delhi (3AC) + Volvo to Manali', desc: '<strong>3AC train (₹1,500-2,000) + Volvo (₹1,200-1,800).</strong> Total: ₹2,700-3,800/person.', cost: '₹2,700 – 3,800 / person' }
  ],
  [
    { title: '✈️ Varanasi → Delhi (Flight) + 🚗 Delhi → Manali (SUV)', desc: '<strong>Flight (₹5,000-8,000) + Private SUV (₹12,000-16,000).</strong> Same-day arrival possible.', cost: '₹17,000 – 24,000 (1-3 people)' }
  ],
  'Varanasi → Delhi → Manali', 'Varanasi → Delhi (3AC) → Manali (Volvo)', 'Varanasi → Delhi (Flight) → Manali (SUV)',
  '🌙 2-day journey.', '🌙 Comfortable multi-leg.', '🌙 Premium resort at Manali.',
  'Budget: ₹300-400/person.', 'Budget: ₹500-700/person.', 'Budget: ₹700-1,000/person.',
  '₹300 – 400 / person', '₹500 – 700 / person', '₹700 – 1,000 / person'
);

// ============================================================
// KOLKATA → MANALI
// ============================================================
manaliRoute(
  'Kolkata (WB)',
  [
    { title: '🚂 Kolkata (HWH) to Delhi + 🚌 Delhi to Manali', desc: '<strong>Train to Delhi (₹500-600, 18-22 hrs), then HRTC bus (₹700-1,000).</strong> Total: 2-3 days, ₹1,200-1,600/person.', cost: '₹1,200 – 1,600 / person' }
  ],
  [
    { title: '🚂 Kolkata → Delhi (3AC) + Volvo to Manali', desc: '<strong>3AC train (₹2,200-2,800) + Volvo (₹1,200-1,800).</strong> Total: ₹3,400-4,600/person.', cost: '₹3,400 – 4,600 / person' }
  ],
  [
    { title: '✈️ Kolkata → Delhi (Flight) + 🚗 Delhi → Manali (SUV)', desc: '<strong>Flight (₹7,000-10,000) + Private SUV (₹12,000-16,000).</strong> Fastest from Kolkata.', cost: '₹19,000 – 26,000 (1-3 people)' }
  ],
  'Kolkata → Delhi → Manali', 'Kolkata → Delhi (3AC) → Manali (Volvo)', 'Kolkata → Delhi (Flight) → Manali (SUV)',
  '🌙 Long journey. 5-6 days total.', '🌙 Comfortable multi-leg.', '🌙 Premium resort at Manali.',
  'Budget: ₹400-500/person.', 'Budget: ₹600-800/person.', 'Budget: ₹700-1,000/person.',
  '₹400 – 500 / person', '₹600 – 800 / person', '₹700 – 1,000 / person'
);

// ============================================================
// MUMBAI → MANALI
// ============================================================
manaliRoute(
  'Mumbai (Maharashtra)',
  [
    { title: '🚂 Mumbai to Delhi + 🚌 Delhi to Manali', desc: '<strong>Train to Delhi (₹500-600, 16-24 hrs), then HRTC bus (₹700-1,000).</strong> Total: 2-3 days, ₹1,200-1,600/person.', cost: '₹1,200 – 1,600 / person' }
  ],
  [
    { title: '🚂 Mumbai → Delhi (3AC) + Volvo to Manali', desc: '<strong>3AC train (₹2,500-3,200) + Volvo (₹1,200-1,800).</strong> Total: ₹3,700-5,000/person.', cost: '₹3,700 – 5,000 / person' }
  ],
  [
    { title: '✈️ Mumbai → Delhi (Flight) + 🚗 Delhi → Manali (SUV)', desc: '<strong>Flight (₹5,000-8,000) + Private SUV (₹12,000-16,000).</strong> Fastest from Mumbai.', cost: '₹17,000 – 24,000 (1-3 people)' }
  ],
  'Mumbai → Delhi → Manali', 'Mumbai → Delhi (3AC) → Manali (Volvo)', 'Mumbai → Delhi (Flight) → Manali (SUV)',
  '🌙 Long journey. 5-6 days total.', '🌙 Comfortable multi-leg.', '🌙 Premium resort at Manali.',
  'Budget: ₹400-500/person.', 'Budget: ₹600-800/person.', 'Budget: ₹700-1,000/person.',
  '₹400 – 500 / person', '₹600 – 800 / person', '₹700 – 1,000 / person'
);

// ============================================================
// LUCKNOW → MANALI
// ============================================================
manaliRoute(
  'Lucknow (UP)',
  [
    { title: '🚂 Lucknow (LKO) to Delhi + 🚌 Delhi to Manali', desc: '<strong>Train to Delhi (₹300-400, 8-10 hrs), then HRTC bus (₹700-1,000).</strong> Total: 1-2 days, ₹1,000-1,400/person.', cost: '₹1,000 – 1,400 / person' }
  ],
  [
    { title: '🚂 Lucknow → Delhi (3AC) + Volvo to Manali', desc: '<strong>3AC train (₹1,200-1,800) + Volvo (₹1,200-1,800).</strong> Total: ₹2,400-3,600/person.', cost: '₹2,400 – 3,600 / person' }
  ],
  [
    { title: '✈️ Lucknow → Delhi (Flight) + 🚗 Delhi → Manali (SUV)', desc: '<strong>Flight (₹4,000-6,000) + Private SUV (₹12,000-16,000).</strong> Fastest from Lucknow.', cost: '₹16,000 – 22,000 (1-3 people)' }
  ],
  'Lucknow → Delhi → Manali', 'Lucknow → Delhi (3AC) → Manali (Volvo)', 'Lucknow → Delhi (Flight) → Manali (SUV)',
  '🌙 Overnight journey.', '🌙 Comfortable multi-leg.', '🌙 Premium resort at Manali.',
  'Budget: ₹300-400/person.', 'Budget: ₹500-700/person.', 'Budget: ₹700-1,000/person.',
  '₹300 – 400 / person', '₹500 – 700 / person', '₹700 – 1,000 / person'
);

// ============================================================
// JAIPUR → MANALI
// ============================================================
manaliRoute(
  'Jaipur (Rajasthan)',
  [
    { title: '🚂 Jaipur (JP) to Delhi + 🚌 Delhi to Manali', desc: '<strong>Train to Delhi (₹300-400, 5-6 hrs), then HRTC bus (₹700-1,000).</strong> Total: 1-2 days, ₹1,000-1,400/person.', cost: '₹1,000 – 1,400 / person' }
  ],
  [
    { title: '🚂 Jaipur → Delhi (3AC) + Volvo to Manali', desc: '<strong>3AC train (₹1,000-1,500) + Volvo (₹1,200-1,800).</strong> Total: ₹2,200-3,300/person.', cost: '₹2,200 – 3,300 / person' }
  ],
  [
    { title: '✈️ Jaipur → Delhi (Flight) + 🚗 Delhi → Manali (SUV)', desc: '<strong>Flight (₹4,000-7,000) + Private SUV (₹12,000-16,000).</strong> Fastest from Jaipur.', cost: '₹16,000 – 23,000 (1-3 people)' }
  ],
  'Jaipur → Delhi → Manali', 'Jaipur → Delhi (3AC) → Manali (Volvo)', 'Jaipur → Delhi (Flight) → Manali (SUV)',
  '🌙 Short journey from Jaipur.', '🌙 Comfortable multi-leg.', '🌙 Premium resort at Manali.',
  'Budget: ₹300-400/person.', 'Budget: ₹500-700/person.', 'Budget: ₹700-1,000/person.',
  '₹300 – 400 / person', '₹500 – 700 / person', '₹700 – 1,000 / person'
);