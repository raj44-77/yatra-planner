/**
 * Badrinath Route Data
 * Detailed routes from 8 Indian cities to Badrinath.
 * No trekking — road goes all the way to the temple.
 */

var BADRINATH_ROUTES = {};

function badrinathRoute(cityLabel, basicSteps, comfortSteps, premiumSteps, basicDay1Title, comfortDay1Title, premiumDay1Title, basicNote, comfortNote, premiumNote, basicFood, comfortFood, premiumFood, basicFoodCost, comfortFoodCost, premiumFoodCost) {
  var key = cityLabel.split(' (')[0];
  BADRINATH_ROUTES[key] = {
    label: cityLabel,
    distance: '~1,200-1,800 km',
    basic: { day1Title: basicDay1Title, steps: basicSteps, day1Note: basicNote, day1Food: basicFood, day1FoodCost: basicFoodCost },
    comfort: { day1Title: comfortDay1Title, steps: comfortSteps, day1Note: comfortNote, day1Food: comfortFood, day1FoodCost: comfortFoodCost },
    premium: { day1Title: premiumDay1Title, steps: premiumSteps, day1Note: premiumNote, day1Food: premiumFood, day1FoodCost: premiumFoodCost }
  };
}

// ============================================================
// BHAGALPUR → BADRINATH
// ============================================================
badrinathRoute(
  'Bhagalpur (Bihar)',
  [
    { title: '🚂 Bhagalpur (BGP) to Patna (PNBE) — General Class', desc: '<strong>No direct train to Haridwar from Bhagalpur.</strong> First reach Patna.<br><br><strong>Best trains:</strong> Vikramshila Express (12367, 11:10 AM), Intercity (13235, 6:45 AM), Farakka Express (13483, 4:25 AM).<br><br><strong>Ticket:</strong> ₹100/person at Bhagalpur Junction.', cost: '₹100 / person' },
    { title: '🚂 Patna (PNBE) to Haridwar (HW) — General Class', desc: '<strong>Direct trains:</strong> Kumbha Express (12369, 5:45 PM), Doon Express (13009, 11:25 PM).<br><br><strong>Journey:</strong> 17-18 hours. <strong>Ticket:</strong> ₹280-300/person.', cost: '₹280 – 300 / person' }
  ],
  [
    { title: '🚂 Bhagalpur → Patna (Sleeper/3AC) → Patna → Haridwar (Sleeper/3AC)', desc: '<strong>Book IRCTC 3-4 weeks ahead.</strong> Vikramshila Express (Sleeper ₹250, 3AC ₹600) + Kumbha Express (Sleeper ₹500, 3AC ₹1,200).<br><br><strong>Combined:</strong> ₹750-1,600/person.', cost: '₹750 – 1,600 / person' }
  ],
  [
    { title: '🚂 Bhagalpur → Patna (AC Chair Car)', desc: 'Intercity Express (13235), AC Chair Car. ₹500/person.', cost: '₹500 / person' },
    { title: '🚕 Patna Jn → Patna Airport', desc: '25-35 min. ₹250-300 (1-3 people).', cost: '₹250 – 300' },
    { title: '✈️ Patna → Dehradun', desc: 'IndiGo/SpiceJet. 2 hrs. ₹6,000-8,000/person.', cost: '₹6,000 – 8,000 / person' },
    { title: '🚙 Dehradun → Joshimath → Badrinath (Private SUV)', desc: '~340 km, 10-11 hrs. Round trip: ₹15,000 (1-3 people), ₹20,000 (4-6 people), +₹2,000 per extra person above 6.', cost: '₹15,000 (1-3 people, round trip)' }
  ],
  'Bhagalpur → Patna → Haridwar (Train Journey)',
  'Bhagalpur → Patna → Haridwar (Sleeper/3AC)',
  'Bhagalpur → Patna → Dehradun → Badrinath (Flight + Private Cab)',
  '🌙 <strong>Night on train.</strong> Carry food and water. Set alarm for Haridwar.',
  '🌙 <strong>Comfortable night in Sleeper/3AC.</strong>',
  '🌙 <strong>Premium stay at Badrinath.</strong> ₹5,000-8,000/night.',
  'Breakfast at Bhagalpur (₹50-80), lunch at Patna (₹100-150), dinner on train (₹80-120). <strong>Budget:</strong> ₹300/person.',
  'Breakfast at Bhagalpur (₹100-150), lunch at Patna IRCTC (₹200-300), IRCTC dinner (₹200-300). <strong>Budget:</strong> ₹500-600/person.',
  'Breakfast on train (₹150-200), lunch at airport (₹300-400), dinner en route (₹400-600). <strong>Budget:</strong> ₹600-800/person.',
  '₹300 / person', '₹500 – 600 / person', '₹600 – 800 / person'
);

// ============================================================
// PATNA → BADRINATH
// ============================================================
badrinathRoute(
  'Patna (Bihar)',
  [
    { title: '🚂 Patna (PNBE) to Haridwar (HW) — General Class', desc: '<strong>Direct train!</strong> Kumbha Express (12369, 5:45 PM), Doon Express (13009, 11:25 PM).<br><br><strong>Ticket:</strong> ₹280-300/person. Journey: 17-18 hrs.', cost: '₹280 – 300 / person' }
  ],
  [
    { title: '🚂 Patna → Haridwar (Sleeper/3AC)', desc: '<strong>Book IRCTC:</strong> Kumbha Express (Sleeper ₹500, 3AC ₹1,200). Direct reserved train.', cost: '₹500 – 1,200 / person' }
  ],
  [
    { title: '🚕 Patna Home → Airport', desc: '₹250-500 depending on location.', cost: '₹250 – 500' },
    { title: '✈️ Patna → Dehradun', desc: 'IndiGo/SpiceJet. 2 hrs. ₹6,000-8,000/person.', cost: '₹6,000 – 8,000 / person' },
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '~340 km. Round trip: ₹15,000 (1-3), ₹20,000 (4-6), +₹2,000 per extra person above 6.', cost: '₹15,000 (1-3 people)' }
  ],
  'Patna → Haridwar (Direct Train)',
  'Patna → Haridwar (Sleeper/3AC — Direct)',
  'Patna → Dehradun → Badrinath (Flight + Private Cab)',
  '🌙 <strong>Night on train.</strong> Direct from Patna!',
  '🌙 <strong>Comfortable night in reserved class.</strong>',
  '🌙 <strong>Premium stay at Badrinath.</strong>',
  'Lunch at Patna (₹100-150), dinner on train (₹80-120). <strong>Budget:</strong> ₹300/person.',
  'Lunch at Patna IRCTC (₹200-300), IRCTC dinner (₹200-300). <strong>Budget:</strong> ₹500-600/person.',
  'Airport meals + restaurant. <strong>Budget:</strong> ₹600-800/person.',
  '₹300 / person', '₹500 – 600 / person', '₹600 – 800 / person'
);

// ============================================================
// DELHI → BADRINATH
// ============================================================
badrinathRoute(
  'Delhi',
  [
    { title: '🚂 Delhi (NDLS/DLI) to Haridwar (HW) — General Class', desc: '<strong>Multiple trains — only 4-6 hrs!</strong> Jan Shatabdi (12055, 3:20 PM), Mussoorie Express (14041, 10:15 PM).<br><br><strong>Ticket:</strong> ₹150-200/person.', cost: '₹150 – 200 / person' }
  ],
  [
    { title: '🚂 Delhi → Haridwar (AC Chair Car/3AC)', desc: '<strong>Fast & comfortable:</strong> Jan Shatabdi (CC ₹450-550), Shatabdi Express (CC ₹650-750, 3.5 hrs — fastest!).', cost: '₹450 – 750 / person' }
  ],
  [
    { title: '✈️ Delhi (DEL) → Dehradun (DED)', desc: '<strong>45 minutes!</strong> ₹3,000-5,000/person. Multiple flights daily.', cost: '₹3,000 – 5,000 / person' },
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '~340 km. Round trip: ₹15,000 (1-3), ₹20,000 (4-6), +₹2,000 per extra person above 6.', cost: '₹15,000 (1-3 people)' }
  ],
  'Delhi → Haridwar (Short Train Journey)',
  'Delhi → Haridwar (AC Train — 4-6 Hours)',
  'Delhi → Dehradun → Badrinath (Flight + Private Cab)',
  '🌙 <strong>Short overnight or evening arrival.</strong> Stay at Haridwar hotel (₹1,500-2,500).',
  '🌙 <strong>Reach Haridwar by evening.</strong> Stay overnight and start fresh.',
  '🌙 <strong>Premium stay at Badrinath.</strong> Fastest from Delhi!',
  'Pack snacks. <strong>Budget:</strong> ₹200-300/person.',
  'Breakfast on train (₹150-200), dinner at Haridwar (₹200-300). <strong>Budget:</strong> ₹500-600/person.',
  'Airport + restaurant. <strong>Budget:</strong> ₹600-800/person.',
  '₹200 – 300 / person', '₹500 – 600 / person', '₹600 – 800 / person'
);

// ============================================================
// VARANASI → BADRINATH
// ============================================================
badrinathRoute(
  'Varanasi (UP)',
  [
    { title: '🚂 Varanasi (BSB) to Haridwar (HW) — General Class', desc: '<strong>Direct trains from Varanasi:</strong> Doon Express (13009, 8:30 AM), Gangasutlej Express (13307, 4:30 AM).<br><br><strong>Journey:</strong> 18-20 hrs. <strong>Ticket:</strong> ₹250-300/person.', cost: '₹250 – 300 / person' }
  ],
  [
    { title: '🚂 Varanasi (BSB) to Haridwar (HW) — Sleeper/3AC', desc: '<strong>Book reserved class:</strong> Doon Express (Sleeper ₹450, 3AC ₹1,100). IRCTC 3-4 weeks ahead.', cost: '₹450 – 1,100 / person' }
  ],
  [
    { title: '✈️ Varanasi (VNS) to Dehradun (DED) — Flight', desc: '<strong>Via Delhi or direct.</strong> ~3-5 hrs. ₹5,000-8,000/person.', cost: '₹5,000 – 8,000 / person' },
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '₹15,000 (1-3), ₹20,000 (4-6), +₹2,000 per extra person above 6.', cost: '₹15,000 (1-3 people, round trip)' }
  ],
  'Varanasi → Haridwar (Direct Train)',
  'Varanasi → Haridwar (Sleeper/3AC)',
  'Varanasi → Dehradun (Flight) → Badrinath',
  '🌙 Night on train. Direct connection.', '🌙 Comfortable overnight.', '🌙 Premium stay at Badrinath.',
  'Budget: ₹300/person.', 'Budget: ₹500-600/person.', 'Budget: ₹600-800/person.',
  '₹300 / person', '₹500 – 600 / person', '₹600 – 800 / person'
);

// ============================================================
// KOLKATA → BADRINATH
// ============================================================
badrinathRoute(
  'Kolkata (WB)',
  [
    { title: '🚂 Kolkata (HWH) to Haridwar (HW) — General Class', desc: '<strong>Direct trains:</strong> Doon Express (13009, 8:25 PM), Kumbha Express (12369, 1:00 PM).<br><br><strong>Journey:</strong> 28-32 hrs. <strong>Ticket:</strong> ₹350-400/person.', cost: '₹350 – 400 / person' }
  ],
  [
    { title: '🚂 Kolkata (HWH) to Haridwar — 3AC', desc: '<strong>Book 3AC for 30+ hr journey.</strong> Doon Express (3AC ₹1,600-2,000), Kumbha Express (3AC ₹1,800-2,200). Book 1-2 months ahead.', cost: '₹1,600 – 2,200 / person' }
  ],
  [
    { title: '✈️ Kolkata (CCU) to Dehradun (DED) — Flight', desc: '<strong>Direct or via Delhi.</strong> ~2.5-4 hrs. ₹7,000-10,000/person.', cost: '₹7,000 – 10,000 / person' },
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '₹15,000 (1-3), ₹20,000 (4-6), +₹2,000 per extra person above 6.', cost: '₹15,000 (1-3 people, round trip)' }
  ],
  'Kolkata → Haridwar (Long Train Journey)',
  'Kolkata → Haridwar (3AC)',
  'Kolkata → Dehradun (Flight) → Badrinath',
  '🌙 Long journey — 2 nights on train.', '🌙 2 nights in 3AC comfort.', '🌙 Fly from Kolkata! Skip the 30-hr train.',
  'Budget: ₹400-500/person.', 'Budget: ₹600-800/person.', 'Budget: ₹600-800/person.',
  '₹400 – 500 / person', '₹600 – 800 / person', '₹600 – 800 / person'
);

// ============================================================
// MUMBAI → BADRINATH
// ============================================================
badrinathRoute(
  'Mumbai (Maharashtra)',
  [
    { title: '🚂 Mumbai (BDTS/LTT) to Haridwar (HW) — General Class', desc: '<strong>Direct trains:</strong> Dehradun Express (19019, 12:25 AM), Haridwar Express (22917, 12:45 PM).<br><br><strong>Ticket:</strong> ₹400-500/person.', cost: '₹400 – 500 / person' }
  ],
  [
    { title: '🚂 Mumbai to Haridwar — 3AC/2AC', desc: '<strong>Book 3AC or 2AC.</strong> Haridwar Express (3AC ₹2,000-2,500, 2AC ₹2,800-3,200). Book 1-2 months ahead.', cost: '₹2,000 – 3,200 / person' }
  ],
  [
    { title: '✈️ Mumbai (BOM) to Dehradun (DED) — Flight', desc: '<strong>Direct flights!</strong> ~2 hrs. ₹5,000-8,000/person.', cost: '₹5,000 – 8,000 / person' },
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '₹15,000 (1-3), ₹20,000 (4-6), +₹2,000 per extra person above 6.', cost: '₹15,000 (1-3 people, round trip)' }
  ],
  'Mumbai → Haridwar (Long Train Journey)',
  'Mumbai → Haridwar (3AC/2AC)',
  'Mumbai → Dehradun (Flight) → Badrinath',
  '🌙 Very long journey. 5-6 days total.', '🌙 24 hrs in AC comfort.', '🌙 Fly from Mumbai! Same-day arrival possible.',
  'Budget: ₹400-500/person.', 'Budget: ₹600-800/person.', 'Budget: ₹600-800/person.',
  '₹400 – 500 / person', '₹600 – 800 / person', '₹600 – 800 / person'
);

// ============================================================
// LUCKNOW → BADRINATH
// ============================================================
badrinathRoute(
  'Lucknow (UP)',
  [
    { title: '🚂 Lucknow (LKO) to Haridwar (HW) — General Class', desc: '<strong>Direct trains:</strong> Doon Express, Gangasutlej Express.<br><br><strong>Journey:</strong> 10-12 hrs. <strong>Ticket:</strong> ₹200-250/person.', cost: '₹200 – 250 / person' }
  ],
  [
    { title: '🚂 Lucknow to Haridwar — Sleeper/3AC', desc: '<strong>Book reserved:</strong> Sleeper ₹350-500, 3AC ₹800-1,100. IRCTC 2-3 weeks ahead.', cost: '₹350 – 1,100 / person' }
  ],
  [
    { title: '✈️ Lucknow (LKO) to Dehradun (DED) — Flight', desc: '<strong>Direct or via Delhi.</strong> ₹4,000-6,000/person.', cost: '₹4,000 – 6,000 / person' },
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '₹15,000 (1-3), ₹20,000 (4-6), +₹2,000 per extra person above 6.', cost: '₹15,000 (1-3 people, round trip)' }
  ],
  'Lucknow → Haridwar (Direct Train)',
  'Lucknow → Haridwar (Sleeper/3AC)',
  'Lucknow → Dehradun (Flight) → Badrinath',
  '🌙 Overnight journey.', '🌙 Comfortable overnight.', '🌙 Premium stay at Badrinath.',
  'Budget: ₹300/person.', 'Budget: ₹500-600/person.', 'Budget: ₹600-800/person.',
  '₹300 / person', '₹500 – 600 / person', '₹600 – 800 / person'
);

// ============================================================
// JAIPUR → BADRINATH
// ============================================================
badrinathRoute(
  'Jaipur (Rajasthan)',
  [
    { title: '🚂 Jaipur (JP) to Haridwar (HW) — General Class', desc: '<strong>Direct trains:</strong> Yoga Express, Haridwar Express.<br><br><strong>Journey:</strong> 10-12 hrs. <strong>Ticket:</strong> ₹200-250/person.', cost: '₹200 – 250 / person' }
  ],
  [
    { title: '🚂 Jaipur to Haridwar — Sleeper/3AC', desc: '<strong>Reserved class:</strong> Sleeper ₹300-450, 3AC ₹700-1,000. IRCTC 2-3 weeks ahead.', cost: '₹300 – 1,000 / person' }
  ],
  [
    { title: '✈️ Jaipur (JAI) to Dehradun (DED) — Flight (via Delhi)', desc: '<strong>Connecting via Delhi.</strong> ~3-5 hrs. ₹4,000-7,000/person.', cost: '₹4,000 – 7,000 / person' },
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '₹15,000 (1-3), ₹20,000 (4-6), +₹2,000 per extra person above 6.', cost: '₹15,000 (1-3 people, round trip)' }
  ],
  'Jaipur → Haridwar (Direct Train)',
  'Jaipur → Haridwar (Sleeper/3AC)',
  'Jaipur → Dehradun (Flight) → Badrinath',
  '🌙 Overnight from Jaipur.', '🌙 Comfortable overnight.', '🌙 Premium stay at Badrinath.',
  'Budget: ₹300/person.', 'Budget: ₹500-600/person.', 'Budget: ₹600-800/person.',
  '₹300 / person', '₹500 – 600 / person', '₹600 – 800 / person'
);