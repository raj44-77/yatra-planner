/**
 * Yatra Route Data
 * All city-to-Kedarnath and city-to-Badrinath route information.
 */

var YATRA_ROUTES = {

  // ============================================================
  // BHAGALPUR
  // ============================================================
  'Bhagalpur': {
    label: 'Bhagalpur (Bihar)',
    distance: '~1,500 km',

    basic: {
      day1Title: 'Bhagalpur → Patna → Haridwar (Train Journey)',
      steps: [
        {
          title: '🚂 Bhagalpur Junction (BGP) to Patna Junction (PNBE) — General Class',
          desc: '<strong>No direct train from Bhagalpur to Haridwar.</strong> You must first reach Patna.<br><br><strong>Best trains:</strong> Vikramshila Express (12367, 11:10 AM), Bhagalpur-Patna Intercity (13235, 6:45 AM), Farakka Express (13483, 4:25 AM).<br><br><strong>Ticket:</strong> General counter at Bhagalpur Junction (Platform 1). ₹100/person.',
          cost: '₹100 / person'
        },
        {
          title: '🚂 Patna Junction (PNBE) to Haridwar (HW) — General Class',
          desc: '<strong>Direct trains:</strong> Kumbha Express (12369, 5:45 PM), Doon Express (13009, 11:25 PM), Gangasutlej Express (13307, 11:30 PM).<br><br><strong>Journey:</strong> 17-18 hours. General class can be crowded — board early.<br><br><strong>Ticket:</strong> General counter at Patna Junction. ₹280-300/person.',
          cost: '₹280 – 300 / person'
        }
      ],
      day1Note: '🌙 <strong>Night on train.</strong> Carry packed dinner and water. Set alarm for Haridwar station.',
      day1Food: 'Breakfast at Bhagalpur station (₹50-80), lunch at Patna Junction IRCTC food court (₹100-150), dinner on train (₹80-120). <strong>Budget:</strong> ₹300/person for the day.',
      day1FoodCost: '₹300 / person'
    },

    comfort: {
      day1Title: 'Bhagalpur → Patna → Haridwar (Sleeper/3AC Train)',
      steps: [
        {
          title: '🚂 Bhagalpur (BGP) to Patna (PNBE) — Sleeper/3AC',
          desc: '<strong>Recommended:</strong> Vikramshila Express (12367, Sleeper ₹250, 3AC ₹600) or Intercity (13235, CC ₹350).<br><br><strong>Book:</strong> IRCTC 3-4 weeks ahead.',
          cost: 'Included in combined ticket'
        },
        {
          title: '🚂 Patna (PNBE) to Haridwar (HW) — Sleeper/3AC',
          desc: '<strong>Best trains:</strong> Kumbha Express (12369, Sleeper ₹500, 3AC ₹1,200), HWH-HW SF Express (12327, 3AC ₹1,400).<br><br><strong>Benefits:</strong> Reserved berth, clean linen, charging points, less crowded.<br><br><strong>Combined ticket:</strong> ₹750-1,600/person.',
          cost: '₹750 – 1,600 / person'
        }
      ],
      day1Note: '🌙 <strong>Comfortable night in Sleeper/3AC.</strong> Reserved berth — no fighting for seats.',
      day1Food: 'Breakfast at Bhagalpur (₹100-150), lunch at Patna IRCTC Food Plaza (₹200-300), IRCTC e-catering dinner on train (₹200-300). <strong>Budget:</strong> ₹500-600/person.',
      day1FoodCost: '₹500 – 600 / person'
    },

    premium: {
      day1Title: 'Bhagalpur → Patna → Dehradun → Kedarnath (Flight + Private Cab)',
      steps: [
        {
          title: '🚂 Bhagalpur to Patna — AC Chair Car',
          desc: '<strong>Intercity Express (13235):</strong> AC Chair Car, departs 6:45 AM, reaches 12:30 PM. ₹500/person.',
          cost: '₹500 / person'
        },
        {
          title: '🚕 Patna Jn to Patna Airport — Cab',
          desc: '7 km, 25-35 min. Ola/Uber or pre-booked. ₹250-300 (1-3 people), ₹550-700 (4-6 people).',
          cost: '₹250 – 300 (1-3 people)'
        },
        {
          title: '✈️ Patna (PAT) to Dehradun (DED) — Flight',
          desc: '<strong>IndiGo/SpiceJet:</strong> ~2 hours. ₹6,000-8,000/person one way. Book 3-4 weeks ahead on makemytrip.com.',
          cost: '₹6,000 – 8,000 / person'
        },
        {
          title: '🚙 Dehradun Airport → Gaurikund — Private SUV',
          desc: '250 km, 7-8 hours. Dedicated vehicle for round trip. ₹25,000 (1-3 people), ₹40,000 (4-6 people).',
          cost: '₹25,000 (1-3 people, round trip)'
        }
      ],
      day1Note: '🌙 <strong>Premium Private Room at Kedarnath:</strong> ₹8,000-10,000/night. Book 1-2 months ahead.',
      day1Food: 'Breakfast on train (₹150-200), lunch at Patna Airport (₹300-400), dinner at premium restaurant en route (₹400-600). <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  },

  // ============================================================
  // PATNA
  // ============================================================
  'Patna': {
    label: 'Patna (Bihar)',
    distance: '~1,200 km',

    basic: {
      day1Title: 'Patna → Haridwar (Direct Train Journey)',
      steps: [
        {
          title: '🚂 Patna Junction (PNBE) to Haridwar (HW) — General Class',
          desc: '<strong>Direct train — no need to change!</strong><br><br><strong>Best trains:</strong> Kumbha Express (12369, departs 5:45 PM, reaches 10:30 AM next day), Doon Express (13009, departs 11:25 PM), Gangasutlej Express (13307, departs 11:30 PM).<br><br><strong>Journey:</strong> 17-18 hours. <strong>Ticket:</strong> General counter at Patna Junction. ₹280-300/person.<br><br><strong>Pro tip:</strong> Reach Patna Junction by 4 PM. Get a general class ticket and board Kumbha Express — it\'s the fastest option.',
          cost: '₹280 – 300 / person'
        }
      ],
      day1Note: '🌙 <strong>Night on train (Patna → Haridwar).</strong> Direct train — simpler than the Bhagalpur route!',
      day1Food: 'Lunch at Patna before boarding (IRCTC food court: ₹100-150). Carry packed dinner. Vendors board at Mughalsarai, Varanasi, Lucknow. <strong>Budget:</strong> ₹300/person for the day.',
      day1FoodCost: '₹300 / person'
    },

    comfort: {
      day1Title: 'Patna → Haridwar (Sleeper/3AC — Direct Train)',
      steps: [
        {
          title: '🚂 Patna (PNBE) to Haridwar (HW) — Sleeper/3AC',
          desc: '<strong>Direct reserved train — book in advance!</strong><br><br><strong>Best options:</strong> Kumbha Express (12369, Sleeper ₹500, 3AC ₹1,200), Doon Express (13009, Sleeper ₹480, 3AC ₹1,150), HWH-HW SF Express (12327, 3AC ₹1,400).<br><br><strong>Book:</strong> IRCTC 3-4 weeks ahead. Reserved berth, clean linen, charging points.',
          cost: '₹480 – 1,400 / person'
        }
      ],
      day1Note: '🌙 <strong>Comfortable night in reserved class.</strong> Direct train from Patna — no connections needed.',
      day1Food: 'Lunch at Patna IRCTC Food Plaza (₹200-300), dinner via IRCTC e-catering (₹200-300). <strong>Budget:</strong> ₹500-600/person.',
      day1FoodCost: '₹500 – 600 / person'
    },

    premium: {
      day1Title: 'Patna → Dehradun → Kedarnath (Flight + Private Cab)',
      steps: [
        {
          title: '🚕 Patna Home/Hotel to Patna Airport — Cab',
          desc: 'Ola/Uber or pre-booked cab. ₹250-500 depending on location.',
          cost: '₹250 – 500 (total)'
        },
        {
          title: '✈️ Patna (PAT) to Dehradun (DED) — Flight',
          desc: '<strong>IndiGo/SpiceJet:</strong> ~2 hours. ₹6,000-8,000/person. Book 3-4 weeks ahead.',
          cost: '₹6,000 – 8,000 / person'
        },
        {
          title: '🚙 Dehradun Airport → Gaurikund — Private SUV',
          desc: '250 km, 7-8 hours. Dedicated round trip vehicle. ₹25,000 (1-3 people), ₹40,000 (4-6 people).',
          cost: '₹25,000 (1-3 people, round trip)'
        }
      ],
      day1Note: '🌙 <strong>Premium Private Room at Kedarnath:</strong> ₹8,000-10,000/night.',
      day1Food: 'Lunch at Patna Airport (₹300-400), dinner at premium restaurant en route (₹400-600). <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  },

  // ============================================================
  // DELHI
  // ============================================================
  'Delhi': {
    label: 'Delhi',
    distance: '~500 km',

    basic: {
      day1Title: 'Delhi → Haridwar (Short Train Journey)',
      steps: [
        {
          title: '🚂 Delhi (NDLS/DLI/HNZ) to Haridwar (HW) — General Class',
          desc: '<strong>Multiple daily trains — only 4-6 hours!</strong><br><br><strong>Best trains:</strong> Jan Shatabdi (12055, departs 3:20 PM from NDLS, reaches 7:40 PM), Mussoorie Express (14041, departs 10:15 PM from DLI, reaches 6:00 AM), Yoga Express (19031, departs 7:25 AM from DLI, reaches 2:00 PM).<br><br><strong>Ticket:</strong> ₹150-200/person (general class). Buy at Delhi station. Much shorter journey than from Bihar!',
          cost: '₹150 – 200 / person'
        }
      ],
      day1Note: '🌙 <strong>Short overnight journey or evening arrival.</strong> From Delhi, Haridwar is just 200 km away. You can reach by evening and start fresh next morning, or take an overnight train.',
      day1Food: 'Pack snacks from Delhi or buy at station. Vendors available. <strong>Budget:</strong> ₹200-300/person for the day.',
      day1FoodCost: '₹200 – 300 / person'
    },

    comfort: {
      day1Title: 'Delhi → Haridwar (AC Train — 4-6 Hours)',
      steps: [
        {
          title: '🚂 Delhi to Haridwar — AC Chair Car / 3AC',
          desc: '<strong>Fast and comfortable!</strong><br><br><strong>Best trains:</strong> Jan Shatabdi (12055, CC ₹450-550, 4 hrs), Shatabdi Express (12017, CC ₹650-750, 3.5 hrs — fastest!).<br><br><strong>Book:</strong> IRCTC 1-2 weeks ahead. AC comfort, short journey.',
          cost: '₹450 – 750 / person'
        }
      ],
      day1Note: '🌙 <strong>Reach Haridwar by evening.</strong> Stay at a hotel in Haridwar (₹1,500-2,500/night) and start the mountain journey fresh next morning.',
      day1Food: 'Breakfast/snacks on train (₹150-200), dinner at Haridwar (₹200-300). <strong>Budget:</strong> ₹500-600/person.',
      day1FoodCost: '₹500 – 600 / person'
    },

    premium: {
      day1Title: 'Delhi → Dehradun → Kedarnath (Flight + Private Cab)',
      steps: [
        {
          title: '✈️ Delhi (DEL) to Dehradun (DED) — Flight',
          desc: '<strong>Just 45 minutes!</strong> Multiple airlines: IndiGo, SpiceJet, Alliance Air, Vistara. ₹3,000-5,000/person one way. 5-6 flights daily.<br><br><strong>Book:</strong> 1-2 weeks ahead on any booking site.',
          cost: '₹3,000 – 5,000 / person'
        },
        {
          title: '🚙 Dehradun Airport → Gaurikund — Private SUV',
          desc: '250 km, 7-8 hours. Dedicated round trip vehicle. ₹25,000 (1-3 people), ₹40,000 (4-6 people).',
          cost: '₹25,000 (1-3 people, round trip)'
        }
      ],
      day1Note: '🌙 <strong>Fastest from Delhi!</strong> Fly in the morning, reach Kedarnath by evening. Total travel: ~10 hours door-to-temple.',
      day1Food: 'Breakfast at Delhi Airport (₹300-400), lunch/dinner en route (₹400-600). <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  },

  // ============================================================
  // VARANASI
  // ============================================================
  'Varanasi': {
    label: 'Varanasi (UP)',
    distance: '~1,000 km',

    basic: {
      day1Title: 'Varanasi → Haridwar (Direct Train Journey)',
      steps: [
        {
          title: '🚂 Varanasi Junction (BSB) to Haridwar (HW) — General Class',
          desc: '<strong>Direct trains from Varanasi:</strong> Doon Express (13009, departs 8:30 AM via Varanasi), Gangasutlej Express (13307, departs 4:30 AM).<br><br><strong>Journey:</strong> 18-20 hours. <strong>Ticket:</strong> General counter at Varanasi Junction. ₹250-300/person.',
          cost: '₹250 – 300 / person'
        }
      ],
      day1Note: '🌙 <strong>Night on train.</strong> Direct connection — no need to change trains.',
      day1Food: 'Pack food from Varanasi or buy at stations en route. <strong>Budget:</strong> ₹300/person.',
      day1FoodCost: '₹300 / person'
    },

    comfort: {
      day1Title: 'Varanasi → Haridwar (Sleeper/3AC — Direct)',
      steps: [
        {
          title: '🚂 Varanasi (BSB) to Haridwar (HW) — Sleeper/3AC',
          desc: '<strong>Book reserved class:</strong> Doon Express (13009, Sleeper ₹450, 3AC ₹1,100).<br><br><strong>Book:</strong> IRCTC 3-4 weeks ahead.',
          cost: '₹450 – 1,100 / person'
        }
      ],
      day1Note: '🌙 <strong>Comfortable overnight journey.</strong>',
      day1Food: 'IRCTC catering available. <strong>Budget:</strong> ₹500-600/person.',
      day1FoodCost: '₹500 – 600 / person'
    },

    premium: {
      day1Title: 'Varanasi → Dehradun (Flight) → Kedarnath',
      steps: [
        {
          title: '✈️ Varanasi (VNS) to Dehradun (DED) — Flight',
          desc: '<strong>Via Delhi or direct:</strong> Check IndiGo/SpiceJet for connecting flights. ~3-5 hours total. ₹5,000-8,000/person.',
          cost: '₹5,000 – 8,000 / person'
        },
        {
          title: '🚙 Dehradun → Gaurikund — Private SUV',
          desc: '₹25,000 (1-3 people) or ₹40,000 (4-6 people) round trip.',
          cost: '₹25,000 (1-3 people, round trip)'
        }
      ],
      day1Note: '🌙 <strong>Premium stay at Kedarnath.</strong>',
      day1Food: 'Airport meals + restaurant en route. <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  },

  // ============================================================
  // KOLKATA
  // ============================================================
  'Kolkata': {
    label: 'Kolkata (West Bengal)',
    distance: '~1,600 km',

    basic: {
      day1Title: 'Kolkata → Haridwar (Long Train Journey)',
      steps: [
        {
          title: '🚂 Kolkata (HWH/SDAH) to Haridwar (HW) — General Class',
          desc: '<strong>Direct trains from Kolkata:</strong> Doon Express (13009, departs Howrah 8:25 PM, reaches Haridwar after 30+ hrs), Kumbha Express (12369, departs Howrah 1:00 PM).<br><br><strong>Journey:</strong> 28-32 hours. <strong>Ticket:</strong> ₹350-400/person (general class).',
          cost: '₹350 – 400 / person'
        }
      ],
      day1Note: '🌙 <strong>Long journey — 2 nights on train.</strong> Plan for 5-6 days total trip from Kolkata.',
      day1Food: 'Carry food for 2 days or buy at stations. <strong>Budget:</strong> ₹400-500/person for Day 1.',
      day1FoodCost: '₹400 – 500 / person'
    },

    comfort: {
      day1Title: 'Kolkata → Haridwar (3AC — Book in Advance)',
      steps: [
        {
          title: '🚂 Kolkata (HWH) to Haridwar — 3AC',
          desc: '<strong>Book 3AC for 30+ hour journey.</strong> Doon Express (13009, 3AC ₹1,600-2,000), Kumbha Express (12369, 3AC ₹1,800-2,200).<br><br><strong>Book:</strong> IRCTC 1-2 months ahead — these trains fill fast.',
          cost: '₹1,600 – 2,200 / person'
        }
      ],
      day1Note: '🌙 <strong>2 nights in 3AC.</strong> Comfortable for the long journey from Kolkata.',
      day1Food: 'IRCTC e-catering. <strong>Budget:</strong> ₹600-800/person for Day 1.',
      day1FoodCost: '₹600 – 800 / person'
    },

    premium: {
      day1Title: 'Kolkata → Dehradun (Flight) → Kedarnath',
      steps: [
        {
          title: '✈️ Kolkata (CCU) to Dehradun (DED) — Flight',
          desc: '<strong>Direct or via Delhi.</strong> ~2.5-4 hours. ₹7,000-10,000/person. Multiple airlines.',
          cost: '₹7,000 – 10,000 / person'
        },
        {
          title: '🚙 Dehradun → Gaurikund — Private SUV',
          desc: '₹25,000 (1-3 people) or ₹40,000 (4-6 people) round trip.',
          cost: '₹25,000 (1-3 people, round trip)'
        }
      ],
      day1Note: '🌙 <strong>Fly from Kolkata in 2.5 hours!</strong> Skip the 30-hour train.',
      day1Food: 'Airport + restaurant. <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  },

  // ============================================================
  // MUMBAI
  // ============================================================
  'Mumbai': {
    label: 'Mumbai (Maharashtra)',
    distance: '~1,800 km',

    basic: {
      day1Title: 'Mumbai → Haridwar (Long Train Journey)',
      steps: [
        {
          title: '🚂 Mumbai (BCT/BDTS/LTT) to Haridwar (HW) — General Class',
          desc: '<strong>Direct trains:</strong> Dehradun Express (19019, departs Bandra 12:25 AM, 30+ hrs), Haridwar Express (22917, departs Bandra 12:45 PM, 24 hrs).<br><br><strong>Ticket:</strong> ₹400-500/person (general class). Long journey — carry supplies.',
          cost: '₹400 – 500 / person'
        }
      ],
      day1Note: '🌙 <strong>Very long journey.</strong> 5-6 days total trip. Better to choose Comfort/Premium from Mumbai.',
      day1Food: 'Carry or buy. <strong>Budget:</strong> ₹400-500/person for Day 1.',
      day1FoodCost: '₹400 – 500 / person'
    },

    comfort: {
      day1Title: 'Mumbai → Haridwar (3AC — Comfortable Long Journey)',
      steps: [
        {
          title: '🚂 Mumbai to Haridwar — 3AC/2AC',
          desc: '<strong>Book 3AC or 2AC.</strong> Haridwar Express (22917, 3AC ₹2,000-2,500, 2AC ₹2,800-3,200).<br><br><strong>Book:</strong> IRCTC 1-2 months ahead.',
          cost: '₹2,000 – 3,200 / person'
        }
      ],
      day1Note: '🌙 <strong>24 hours in AC comfort.</strong> Worth the upgrade from Mumbai.',
      day1Food: 'IRCTC catering + pantry. <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    },

    premium: {
      day1Title: 'Mumbai → Dehradun (Flight) → Kedarnath',
      steps: [
        {
          title: '✈️ Mumbai (BOM) to Dehradun (DED) — Flight',
          desc: '<strong>Direct flights!</strong> ~2 hours. ₹5,000-8,000/person. IndiGo, SpiceJet, Vistara. Multiple daily flights.',
          cost: '₹5,000 – 8,000 / person'
        },
        {
          title: '🚙 Dehradun → Gaurikund — Private SUV',
          desc: '₹25,000 (1-3 people) or ₹40,000 (4-6 people) round trip.',
          cost: '₹25,000 (1-3 people, round trip)'
        }
      ],
      day1Note: '🌙 <strong>Fly from Mumbai!</strong> 2-hour flight beats 30-hour train. Same-day arrival at Kedarnath possible.',
      day1Food: 'Airport meals + restaurant. <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  },

  // ============================================================
  // LUCKNOW
  // ============================================================
  'Lucknow': {
    label: 'Lucknow (UP)',
    distance: '~750 km',

    basic: {
      day1Title: 'Lucknow → Haridwar (Direct Train)',
      steps: [
        {
          title: '🚂 Lucknow (LKO) to Haridwar (HW) — General Class',
          desc: '<strong>Direct trains:</strong> Doon Express (13009, via Lucknow), Gangasutlej Express (13307). Many trains pass through Lucknow.<br><br><strong>Journey:</strong> 10-12 hours. <strong>Ticket:</strong> ₹200-250/person.',
          cost: '₹200 – 250 / person'
        }
      ],
      day1Note: '🌙 <strong>Overnight journey.</strong> Reach Haridwar next morning.',
      day1Food: 'Pack from Lucknow or buy at stations. <strong>Budget:</strong> ₹300/person.',
      day1FoodCost: '₹300 / person'
    },

    comfort: {
      day1Title: 'Lucknow → Haridwar (Sleeper/3AC)',
      steps: [
        {
          title: '🚂 Lucknow to Haridwar — Sleeper/3AC',
          desc: '<strong>Book reserved class:</strong> Sleeper ₹350-500, 3AC ₹800-1,100. IRCTC 2-3 weeks ahead.',
          cost: '₹350 – 1,100 / person'
        }
      ],
      day1Note: '🌙 <strong>Comfortable overnight.</strong>',
      day1Food: 'IRCTC catering. <strong>Budget:</strong> ₹500-600/person.',
      day1FoodCost: '₹500 – 600 / person'
    },

    premium: {
      day1Title: 'Lucknow → Dehradun (Flight) → Kedarnath',
      steps: [
        {
          title: '✈️ Lucknow (LKO) to Dehradun (DED) — Flight',
          desc: '<strong>Direct or via Delhi.</strong> ~1.5-3 hours. ₹4,000-6,000/person.',
          cost: '₹4,000 – 6,000 / person'
        },
        {
          title: '🚙 Dehradun → Gaurikund — Private SUV',
          desc: '₹25,000 (1-3 people) or ₹40,000 (4-6 people) round trip.',
          cost: '₹25,000 (1-3 people, round trip)'
        }
      ],
      day1Note: '🌙 <strong>Premium stay at Kedarnath.</strong>',
      day1Food: 'Airport + restaurant. <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  },

  // ============================================================
  // JAIPUR
  // ============================================================
  'Jaipur': {
    label: 'Jaipur (Rajasthan)',
    distance: '~650 km',

    basic: {
      day1Title: 'Jaipur → Haridwar (Direct Train)',
      steps: [
        {
          title: '🚂 Jaipur (JP) to Haridwar (HW) — General Class',
          desc: '<strong>Direct trains:</strong> Yoga Express (19031, via Jaipur), Haridwar Express (from Jaipur).<br><br><strong>Journey:</strong> 10-12 hours. <strong>Ticket:</strong> ₹200-250/person.',
          cost: '₹200 – 250 / person'
        }
      ],
      day1Note: '🌙 <strong>Overnight journey from Jaipur.</strong>',
      day1Food: 'Pack or buy. <strong>Budget:</strong> ₹300/person.',
      day1FoodCost: '₹300 / person'
    },

    comfort: {
      day1Title: 'Jaipur → Haridwar (Sleeper/3AC)',
      steps: [
        {
          title: '🚂 Jaipur to Haridwar — Sleeper/3AC',
          desc: '<strong>Reserved class:</strong> Sleeper ₹300-450, 3AC ₹700-1,000. Book IRCTC 2-3 weeks ahead.',
          cost: '₹300 – 1,000 / person'
        }
      ],
      day1Note: '🌙 <strong>Comfortable overnight.</strong>',
      day1Food: 'IRCTC catering. <strong>Budget:</strong> ₹500-600/person.',
      day1FoodCost: '₹500 – 600 / person'
    },

    premium: {
      day1Title: 'Jaipur → Dehradun (Flight via Delhi) → Kedarnath',
      steps: [
        {
          title: '✈️ Jaipur (JAI) to Dehradun (DED) — Flight (via Delhi)',
          desc: '<strong>Connecting via Delhi.</strong> ~3-5 hours total. ₹4,000-7,000/person.',
          cost: '₹4,000 – 7,000 / person'
        },
        {
          title: '🚙 Dehradun → Gaurikund — Private SUV',
          desc: '₹25,000 (1-3 people) or ₹40,000 (4-6 people) round trip.',
          cost: '₹25,000 (1-3 people, round trip)'
        }
      ],
      day1Note: '🌙 <strong>Premium stay at Kedarnath.</strong>',
      day1Food: 'Airport + restaurant. <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  }

};

// ============================================================
// BADRINATH ROUTES — Separate object
// ============================================================
var BADRINATH_ROUTES = {};

function badrinathRoute(cityLabel, basicSteps, comfortSteps, premiumSteps, basicDay1Title, comfortDay1Title, premiumDay1Title, basicNote, comfortNote, premiumNote, basicFood, comfortFood, premiumFood, basicFoodCost, comfortFoodCost, premiumFoodCost) {
  var key = cityLabel.split(' (')[0];
  BADRINATH_ROUTES[key] = {
    label: cityLabel,
    distance: '~1,200-1,800 km',
    basic: {
      day1Title: basicDay1Title,
      steps: basicSteps,
      day1Note: basicNote,
      day1Food: basicFood,
      day1FoodCost: basicFoodCost
    },
    comfort: {
      day1Title: comfortDay1Title,
      steps: comfortSteps,
      day1Note: comfortNote,
      day1Food: comfortFood,
      day1FoodCost: comfortFoodCost
    },
    premium: {
      day1Title: premiumDay1Title,
      steps: premiumSteps,
      day1Note: premiumNote,
      day1Food: premiumFood,
      day1FoodCost: premiumFoodCost
    }
  };
}

// Bhagalpur → Badrinath
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
    { title: '🚙 Dehradun → Joshimath → Badrinath (Private SUV)', desc: '~340 km, 10-11 hrs. Round trip: ₹30,000 (1-3 people), ₹48,000 (4-6 people).', cost: '₹30,000 (1-3 people, round trip)' }
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

// Patna → Badrinath
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
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '~340 km. Round trip: ₹30,000 (1-3), ₹48,000 (4-6).', cost: '₹30,000 (1-3 people)' }
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

// Delhi → Badrinath
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
    { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '~340 km. Round trip: ₹30,000 (1-3), ₹48,000 (4-6).', cost: '₹30,000 (1-3 people)' }
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

// Quick routes for remaining cities
function quickBadrinath(city, basicCost, comfortCost, premiumCost) {
  var key = city.split(' (')[0];
  BADRINATH_ROUTES[key] = {
    label: city,
    basic: {
      day1Title: key + ' → Haridwar (Train Journey)',
      steps: [{ title: '🚂 ' + key + ' to Haridwar — General Class', desc: '<strong>Direct/connecting trains available.</strong> <strong>Ticket:</strong> ₹' + basicCost + '/person.', cost: '₹' + basicCost + ' / person' }],
      day1Note: '🌙 <strong>Night on train.</strong>',
      day1Food: 'Carry food or buy at stations. <strong>Budget:</strong> ₹300-400/person.',
      day1FoodCost: '₹300 – 400 / person'
    },
    comfort: {
      day1Title: key + ' → Haridwar (Sleeper/3AC)',
      steps: [{ title: '🚂 ' + key + ' to Haridwar — Sleeper/3AC', desc: '<strong>Book IRCTC 3-4 weeks ahead.</strong> ₹' + comfortCost + '/person.', cost: '₹' + comfortCost + ' / person' }],
      day1Note: '🌙 <strong>Comfortable overnight.</strong>',
      day1Food: 'IRCTC catering. <strong>Budget:</strong> ₹500-600/person.',
      day1FoodCost: '₹500 – 600 / person'
    },
    premium: {
      day1Title: key + ' → Dehradun (Flight) → Badrinath',
      steps: [
        { title: '✈️ ' + key + ' to Dehradun — Flight', desc: '<strong>Direct or via Delhi.</strong> ₹' + premiumCost + '/person.', cost: '₹' + premiumCost + ' / person' },
        { title: '🚙 Dehradun → Badrinath (Private SUV)', desc: '~340 km. Round trip: ₹30,000 (1-3), ₹48,000 (4-6).', cost: '₹30,000 (1-3 people)' }
      ],
      day1Note: '🌙 <strong>Premium stay at Badrinath.</strong>',
      day1Food: 'Airport + restaurant. <strong>Budget:</strong> ₹600-800/person.',
      day1FoodCost: '₹600 – 800 / person'
    }
  };
}

quickBadrinath('Varanasi (UP)', '250-300', '450-1,100', '5,000-8,000');
quickBadrinath('Kolkata (WB)', '350-400', '1,600-2,200', '7,000-10,000');
quickBadrinath('Mumbai (Maharashtra)', '400-500', '2,000-3,200', '5,000-8,000');
quickBadrinath('Lucknow (UP)', '200-250', '350-1,100', '4,000-6,000');
quickBadrinath('Jaipur (Rajasthan)', '200-250', '300-1,000', '4,000-7,000');