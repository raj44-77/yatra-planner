(function () {
  'use strict';

  // ── Set current year ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── ROUTE ──
  var ROUTE_DESTINATION = 'Kedarnath';
  var urlParams = new URLSearchParams(window.location.search);
  var ROUTE_ORIGIN = urlParams.get('origin') || 'Bhagalpur';
  
  if (!YATRA_ROUTES || !YATRA_ROUTES[ROUTE_ORIGIN]) {
    ROUTE_ORIGIN = 'Bhagalpur';
  }

  // ── Traveler count ──
  const travelerCount = document.getElementById('travelerCount');
  const travelerMinus = document.getElementById('travelerMinus');
  const travelerPlus = document.getElementById('travelerPlus');
  const travelerLabel = document.getElementById('travelerLabel');

  let travelers = 1;
  let extraDays = 0;

  const preselectedTier = urlParams.get('tier') || 'basic';
  const preselectedPeople = parseInt(urlParams.get('people')) || 1;
  const preselectedDays = parseInt(urlParams.get('days')) || 0;
  
  if (preselectedPeople >= 1 && preselectedPeople <= 12) {
    travelers = preselectedPeople;
  }
  
  if (preselectedDays > 0 && preselectedDays <= 10) {
    extraDays = preselectedDays;
  }

  function updateTravelerDisplay() {
    if (travelerCount) travelerCount.value = travelers;
    if (travelerLabel) {
      travelerLabel.textContent = travelers === 1 ? '1 Person' : travelers + ' People';
    }
  }

  if (travelerMinus) {
    travelerMinus.addEventListener('click', function () {
      if (travelers > 1) {
        travelers--;
        updateTravelerDisplay();
        updateAllCosts();
      }
    });
  }

  if (travelerPlus) {
    travelerPlus.addEventListener('click', function () {
      if (travelers < 12) {
        travelers++;
        updateTravelerDisplay();
        updateAllCosts();
      }
    });
  }

  updateTravelerDisplay();

  const extraDaysEl = document.getElementById('extraDays');
  if (extraDaysEl) extraDaysEl.textContent = extraDays;

  // ── DYNAMIC DAY 1 CONTENT ──
  function updateDay1Content(tier) {
    var route = YATRA_ROUTES[ROUTE_ORIGIN];
    if (!route) return;

    var planOriginEl = document.getElementById('planOrigin');
    var routeLabel = route.label || ROUTE_ORIGIN;
    if (planOriginEl) {
      planOriginEl.textContent = routeLabel;
    }

    ['basic', 'comfort', 'premium'].forEach(function(t) {
      var planTierData = route[t];
      if (!planTierData) return;

      var planDiv = document.getElementById('plan-' + t);
      if (!planDiv) return;

      var firstDayCard = planDiv.querySelector('.day-card');
      if (!firstDayCard) return;

      var dayTitle = firstDayCard.querySelector('.day-title');
      if (dayTitle && planTierData.day1Title) {
        dayTitle.textContent = planTierData.day1Title;
      }

      var dayNote = firstDayCard.querySelector('.day-note');
      if (dayNote && planTierData.day1Note) {
        dayNote.innerHTML = planTierData.day1Note;
      }

      var daySteps = firstDayCard.querySelector('.day-steps');
      if (daySteps && planTierData.steps) {
        var stepsHTML = '';
        planTierData.steps.forEach(function(step) {
          stepsHTML += '<div class="step">';
          stepsHTML += '<div class="step-dot"></div>';
          stepsHTML += '<div class="step-content">';
          stepsHTML += '<div class="step-title">' + step.title + '</div>';
          stepsHTML += '<div class="step-desc">' + step.desc + '</div>';
          stepsHTML += '<div class="step-cost">' + step.cost + '</div>';
          stepsHTML += '</div>';
          stepsHTML += '</div>';
        });

        if (planTierData.day1Food) {
          stepsHTML += '<div class="step">';
          stepsHTML += '<div class="step-dot"></div>';
          stepsHTML += '<div class="step-content">';
          stepsHTML += '<div class="step-title">🍱 Food — Day 1</div>';
          stepsHTML += '<div class="step-desc">' + planTierData.day1Food + '</div>';
          if (planTierData.day1FoodCost) {
            stepsHTML += '<div class="step-cost">' + planTierData.day1FoodCost + '</div>';
          }
          stepsHTML += '</div>';
          stepsHTML += '</div>';
        }

        daySteps.innerHTML = stepsHTML;
      }
    });
  }

  // ── COST CALCULATION ──

  function getLeg1Cost(tier) {
    var costs = {
      'Bhagalpur': { basic: 400, comfort: 2350, premium: 15500 },
      'Patna': { basic: 300, comfort: 1200, premium: 7000 },
      'Delhi': { basic: 200, comfort: 600, premium: 4000 },
      'Varanasi': { basic: 300, comfort: 1100, premium: 6500 },
      'Kolkata': { basic: 400, comfort: 2000, premium: 8500 },
      'Mumbai': { basic: 500, comfort: 2800, premium: 6500 },
      'Lucknow': { basic: 250, comfort: 800, premium: 5000 },
      'Jaipur': { basic: 250, comfort: 700, premium: 5500 }
    };

    return costs[ROUTE_ORIGIN] ? costs[ROUTE_ORIGIN][tier] : costs['Bhagalpur'][tier];
  }

  function calcBasic() {
    var leg1 = getLeg1Cost('basic');
    var mountainTransport = 2690;
    var foodPerDay = 320;
    var stayPerNight = 800;
    var misc = 2000;
    var baseDays = 4;

    var leg1Total = leg1 * travelers;
    var mountainTotal = mountainTransport * travelers;
    var foodTotal = foodPerDay * baseDays * travelers;
    var stayTotal = stayPerNight * travelers;
    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay + stayPerNight) * extraDays * travelers;

    var grandTotal = leg1Total + mountainTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return {
      perPerson: Math.round(grandTotal / travelers),
      total: Math.round(grandTotal),
      breakdown: {
        transport: leg1Total + mountainTotal,
        food: foodTotal + extraDayCost,
        stay: stayTotal,
        misc: miscTotal,
        totalDays: baseDays + extraDays
      }
    };
  }

  function calcComfort() {
    var leg1 = getLeg1Cost('comfort');
    var mountainTaxi = 3070;
    var trekSnacks = 1000;
    var foodPerDay = 550;
    var stayBase = 2750;
    var misc = 3000;
    var baseDays = 4;

    var leg1Total = leg1 * travelers;
    var mountainTotal = mountainTaxi * travelers;
    var trekTotal = trekSnacks * travelers;
    var foodTotal = foodPerDay * baseDays * travelers;

    var stayTotal = stayBase;
    if (travelers > 1) {
      stayTotal = stayBase + (travelers - 1) * 1000;
    }

    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay * travelers + stayTotal) * extraDays;

    var grandTotal = leg1Total + mountainTotal + trekTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return {
      perPerson: Math.round(grandTotal / travelers),
      total: Math.round(grandTotal),
      breakdown: {
        transport: leg1Total + mountainTotal,
        trek: trekTotal,
        food: foodTotal + extraDayCost,
        stay: stayTotal,
        misc: miscTotal,
        totalDays: baseDays + extraDays
      }
    };
  }

  function calcPremium() {
    var leg1 = getLeg1Cost('premium');
    var flightRoundTrip = 14000;
    var dehradunCab = travelers <= 3 ? 25000 : (travelers <= 6 ? 40000 : 40000 + (travelers - 6) * 2000);
    var trekSnacks = 1000;
    var foodPerDay = 700;
    var stayBase = 9000;
    var misc = 10000;
    var baseDays = 2;

    var flightCost = (ROUTE_ORIGIN === 'Delhi') ? 0 : flightRoundTrip * travelers;
    var leg1Total = leg1 * travelers;

    var cabTotal = dehradunCab;
    var trekTotal = trekSnacks * travelers;
    var foodTotal = foodPerDay * baseDays * travelers;

    var stayTotal = stayBase;
    if (travelers > 1) {
      stayTotal = stayBase + (travelers - 1) * 2000;
    }

    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay * travelers + stayTotal) * extraDays;

    var grandTotal = leg1Total + flightCost + cabTotal + trekTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return {
      perPerson: Math.round(grandTotal / travelers),
      total: Math.round(grandTotal),
      breakdown: {
        transport: leg1Total + flightCost + cabTotal,
        trek: trekTotal,
        food: foodTotal + extraDayCost,
        stay: stayTotal,
        misc: miscTotal,
        totalDays: baseDays + extraDays
      }
    };
  }

  // ── ADD-ONS LOGIC ──
  var addonPony = document.getElementById('addonPony');
  var addonPalki = document.getElementById('addonPalki');
  var addonHelicopter = document.getElementById('addonHelicopter');
  var daysMinus = document.getElementById('daysMinus');
  var daysPlus = document.getElementById('daysPlus');

  function getAddonCosts() {
    var total = 0;
    if (addonPony && addonPony.checked) total += 10000 * travelers;
    if (addonPalki && addonPalki.checked) total += 16000 * travelers;
    if (addonHelicopter && addonHelicopter.checked) total += 15000 * travelers;
    return total;
  }

  function updateAddonDisplay() {
    if (extraDaysEl) extraDaysEl.textContent = extraDays;
    updateAllCosts();
  }

  if (daysMinus) {
    daysMinus.addEventListener('click', function () {
      if (extraDays > 0) { extraDays--; updateAddonDisplay(); }
    });
  }
  if (daysPlus) {
    daysPlus.addEventListener('click', function () {
      if (extraDays < 10) { extraDays++; updateAddonDisplay(); }
    });
  }

  if (addonPony) addonPony.addEventListener('change', updateAllCosts);
  if (addonPalki) addonPalki.addEventListener('change', updateAllCosts);
  if (addonHelicopter) addonHelicopter.addEventListener('change', updateAllCosts);

  // ── UPDATE SUMMARY DISPLAY ──
  function updateSummaryDisplay(tier, result) {
    var summaryCard = document.querySelector('#plan-' + tier + ' .summary-card');
    if (!summaryCard) return;

    var b = result.breakdown;
    var addons = getAddonCosts();
    var grandTotal = result.total;
    var perPerson = Math.round(grandTotal / travelers);
    var totalDays = b.totalDays;

    var rows = summaryCard.querySelectorAll('.summary-table tr');
    
    if (tier === 'basic') {
      if (rows[0]) rows[0].querySelector('td:last-child').textContent = '₹' + b.transport.toLocaleString('en-IN');
      if (rows[1]) rows[1].querySelector('td:last-child').textContent = '₹' + b.food.toLocaleString('en-IN') + ' (' + totalDays + ' days)';
      if (rows[2]) rows[2].querySelector('td:last-child').textContent = '₹' + b.stay.toLocaleString('en-IN');
      if (rows[3]) rows[3].querySelector('td:last-child').textContent = '₹' + b.misc.toLocaleString('en-IN');
    } else if (tier === 'comfort') {
      if (rows[0]) rows[0].querySelector('td:last-child').textContent = '₹' + b.transport.toLocaleString('en-IN');
      if (rows[1]) rows[1].querySelector('td:last-child').textContent = '₹' + b.trek.toLocaleString('en-IN');
      if (rows[2]) rows[2].querySelector('td:last-child').textContent = '₹' + b.food.toLocaleString('en-IN') + ' (' + totalDays + ' days)';
      if (rows[3]) rows[3].querySelector('td:last-child').textContent = '₹' + b.stay.toLocaleString('en-IN');
      if (rows[4]) rows[4].querySelector('td:last-child').textContent = '₹' + b.misc.toLocaleString('en-IN');
    } else if (tier === 'premium') {
      if (rows[0]) rows[0].querySelector('td:last-child').textContent = '₹' + b.transport.toLocaleString('en-IN');
      if (rows[1]) rows[1].querySelector('td:last-child').textContent = '₹' + b.trek.toLocaleString('en-IN');
      if (rows[2]) rows[2].querySelector('td:last-child').textContent = '₹' + b.food.toLocaleString('en-IN') + ' (' + totalDays + ' days)';
      if (rows[3]) rows[3].querySelector('td:last-child').textContent = '₹' + b.stay.toLocaleString('en-IN');
      if (rows[4]) rows[4].querySelector('td:last-child').textContent = '₹' + b.misc.toLocaleString('en-IN');
    }

    var existingAddonRow = summaryCard.querySelector('.addon-row');
    if (existingAddonRow) existingAddonRow.remove();

    if (addons > 0) {
      var addonRow = document.createElement('tr');
      addonRow.className = 'addon-row';
      addonRow.innerHTML = '<td style="color: var(--gold);">➕ Add-ons (Pony/Palki/Helicopter)</td><td style="color: var(--gold); font-weight: 600;">₹' + addons.toLocaleString('en-IN') + '</td>';
      var totalRow = summaryCard.querySelector('.total-row');
      if (totalRow) {
        totalRow.parentNode.insertBefore(addonRow, totalRow);
      }
    }

    var totalStrong = summaryCard.querySelector('.total-row strong');
    if (totalStrong) {
      totalStrong.textContent = '₹' + grandTotal.toLocaleString('en-IN') + ' total';
    }

    var groupCosts = summaryCard.querySelectorAll('.group-cost');
    if (groupCosts.length >= 2) {
      var savedTravelers = travelers;
      
      travelers = 2;
      var result2 = tier === 'basic' ? calcBasic() : (tier === 'comfort' ? calcComfort() : calcPremium());
      var addons2 = getAddonCosts();
      
      travelers = 4;
      var result4 = tier === 'basic' ? calcBasic() : (tier === 'comfort' ? calcComfort() : calcPremium());
      var addons4 = getAddonCosts();
      
      travelers = savedTravelers;

      groupCosts[0].innerHTML = '<span>2 People (Total)</span> ₹' + (result2.total + addons2).toLocaleString('en-IN');
      groupCosts[1].innerHTML = '<span>4 People (Total)</span> ₹' + (result4.total + addons4).toLocaleString('en-IN');
    }

    var summaryNote = summaryCard.querySelector('.summary-note');
    if (summaryNote) {
      var parts = [];
      
      parts.push('<span style="font-size: 18px; color: var(--snow); font-weight: 700;">💰 Total for ' + travelers + ' Traveler(s): ₹' + grandTotal.toLocaleString('en-IN') + '</span>');
      parts.push('<span style="font-size: 14px; color: var(--gold);">👤 Per Person: ₹' + perPerson.toLocaleString('en-IN') + '</span>');
      
      if (extraDays > 0) {
        parts.push('<span style="color: var(--ice); opacity:0.7;">📅 ' + extraDays + ' extra day(s) · ' + totalDays + ' days total</span>');
      }
      
      if (addons > 0) {
        var addonNames = [];
        if (addonPony && addonPony.checked) addonNames.push('Pony (₹' + (10000 * travelers).toLocaleString('en-IN') + ')');
        if (addonPalki && addonPalki.checked) addonNames.push('Palki (₹' + (16000 * travelers).toLocaleString('en-IN') + ')');
        if (addonHelicopter && addonHelicopter.checked) addonNames.push('Helicopter (₹' + (15000 * travelers).toLocaleString('en-IN') + ')');
        parts.push('<span style="color: var(--gold);">➕ Add-ons: ' + addonNames.join(', ') + '</span>');
      }

      summaryNote.innerHTML = parts.join('<br>') + '<br><br><span style="font-size:11px; opacity:0.5;">⚠️ Prices are approximate. All costs are round trip from ' + ROUTE_ORIGIN + '.</span>';
    }
  }

  function getActiveTier() {
    var tabs = document.querySelectorAll('.tier-tab');
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].classList.contains('active')) {
        return tabs[i].getAttribute('data-tier');
      }
    }
    return 'basic';
  }

  function updateAllCosts() {
    var tier = getActiveTier();
    var result;

    if (tier === 'basic') result = calcBasic();
    else if (tier === 'comfort') result = calcComfort();
    else result = calcPremium();

    var addons = getAddonCosts();
    var displayResult = {
      perPerson: Math.round((result.total + addons) / travelers),
      total: result.total + addons,
      breakdown: result.breakdown
    };

    updateSummaryDisplay(tier, displayResult);

    if (window.history && window.history.replaceState) {
      var newUrl = window.location.pathname + '?tier=' + tier + '&people=' + travelers + '&origin=' + encodeURIComponent(ROUTE_ORIGIN) + '&days=' + extraDays;
      window.history.replaceState({}, '', newUrl);
    }
  }

  // ── TIER TABS ──
  var tabs = document.querySelectorAll('.tier-tab');
  var planContents = document.querySelectorAll('.plan-content');
  var tierLabel = document.getElementById('planTierLabel');
  var planDuration = document.getElementById('planDuration');

  var tierInfo = {
    basic: { label: 'BASIC', duration: '4 days' },
    comfort: { label: 'COMFORT', duration: '4 days' },
    premium: { label: 'PREMIUM', duration: '2 days' }
  };

  function switchTier(tier) {
    tabs.forEach(function (tab) {
      tab.classList.remove('active');
      if (tab.getAttribute('data-tier') === tier) {
        tab.classList.add('active');
      }
    });

    planContents.forEach(function (content) {
      content.classList.remove('active');
    });
    var targetContent = document.getElementById('plan-' + tier);
    if (targetContent) {
      targetContent.classList.add('active');
    }

    if (tierLabel && tierInfo[tier]) {
      tierLabel.textContent = tierInfo[tier].label;
    }
    if (planDuration && tierInfo[tier]) {
      planDuration.textContent = tierInfo[tier].duration;
    }

    updateDay1Content(tier);

    if (window.history && window.history.replaceState) {
      var newUrl = window.location.pathname + '?tier=' + tier + '&people=' + travelers + '&origin=' + encodeURIComponent(ROUTE_ORIGIN) + '&days=' + extraDays;
      window.history.replaceState({}, '', newUrl);
    }

    updateAllCosts();
    setTimeout(initReveal, 200);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var tier = this.getAttribute('data-tier');
      switchTier(tier);
    });
  });

  updateDay1Content(preselectedTier);
  switchTier(preselectedTier);

  // ── REVEAL ON SCROLL ──
  function initReveal() {
    var reveals = document.querySelectorAll('.plan-content.active .reveal');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach(function (el) {
      el.classList.remove('in');
      io.observe(el);
    });
  }

  initReveal();

  // ── STICKY TIER SHADOW ──
  var tierSelector = document.querySelector('.tier-selector');
  if (tierSelector) {
    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;';
    tierSelector.parentElement.style.position = 'relative';
    tierSelector.parentElement.insertBefore(sentinel, tierSelector);

    var tierObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          tierSelector.style.boxShadow = entry.isIntersecting ? 'none' : '0 4px 20px rgba(0,0,0,0.3)';
        });
      },
      { threshold: 1.0 }
    );
    tierObserver.observe(sentinel);
  }

  // ── PDF DOWNLOAD ──
  var downloadBtn = document.getElementById('downloadPdfBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      var tier = getActiveTier();
      var tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
      var result = tier === 'basic' ? calcBasic() : (tier === 'comfort' ? calcComfort() : calcPremium());
      var addons = getAddonCosts();
      var grandTotal = result.total;
      var perPerson = Math.round(grandTotal / travelers);

      var tierColors = {
        basic: { primary: '#0B2345', accent: '#D4A017', badge: '#B8D8F8' },
        comfort: { primary: '#0B2345', accent: '#D4A017', badge: '#E8BE4A' },
        premium: { primary: '#081B33', accent: '#D4A017', badge: '#D4A017' }
      };
      var colors = tierColors[tier];

      var addonDetails = [];
      if (addonPony && addonPony.checked) addonDetails.push('🐴 Pony Ride (Round Trip): ₹' + (10000 * travelers).toLocaleString('en-IN'));
      if (addonPalki && addonPalki.checked) addonDetails.push('🪑 Palki/Doli (Round Trip): ₹' + (16000 * travelers).toLocaleString('en-IN'));
      if (addonHelicopter && addonHelicopter.checked) addonDetails.push('🚁 Helicopter (Round Trip): ₹' + (15000 * travelers).toLocaleString('en-IN'));
      if (extraDays > 0) addonDetails.push('📅 Extra ' + extraDays + ' day(s) included');

      var printWindow = window.open('', '_blank', 'width=900,height=700');
      
      printWindow.document.write('<!DOCTYPE html>');
      printWindow.document.write('<html lang="en">');
      printWindow.document.write('<head>');
      printWindow.document.write('<meta charset="UTF-8">');
      printWindow.document.write('<title>Yatra — ' + tierName + ' Kedarnath Plan</title>');
      printWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">');
      printWindow.document.write('<style>');
      
      printWindow.document.write('*{margin:0;padding:0;box-sizing:border-box}');
      printWindow.document.write('body{font-family:"Inter",sans-serif;color:#1a1a2e;background:#fff;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact;font-size:12px}');
      printWindow.document.write('.page{max-width:760px;margin:0 auto}');
      
      printWindow.document.write('.pdf-header{background:linear-gradient(135deg,' + colors.primary + ',#0a1a35);color:#F8FAFC;padding:24px 36px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}');
      printWindow.document.write('.header-left{display:flex;align-items:center;gap:12px}');
      printWindow.document.write('.logo-circle{width:40px;height:40px;border-radius:50%;background-image:url(assets/images/yatra-logo.png);background-size:cover;box-shadow:0 0 20px rgba(212,160,23,0.4);flex-shrink:0}');
      printWindow.document.write('.logo-text{font-family:"Cormorant Garamond",serif;font-size:26px;font-weight:500;letter-spacing:0.02em}');
      printWindow.document.write('.header-right{text-align:right}');
      printWindow.document.write('.pdf-header h1{font-family:"Cormorant Garamond",serif;font-size:22px;font-weight:500;margin-bottom:2px}');
      printWindow.document.write('.pdf-header .route{font-size:13px;opacity:0.85}');
      printWindow.document.write('.pdf-header .route em{color:#D4A017;font-style:italic}');
      printWindow.document.write('.tier-badge{display:inline-block;padding:4px 14px;border-radius:999px;border:1px solid ' + colors.badge + ';font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:' + colors.badge + ';margin-top:4px}');
      
      printWindow.document.write('.trip-strip{display:flex;gap:0;border-bottom:2px solid ' + colors.accent + ';background:#fafbfc}');
      printWindow.document.write('.trip-strip-item{flex:1;text-align:center;padding:12px 8px;border-right:1px solid #eef0f5}');
      printWindow.document.write('.trip-strip-item:last-child{border-right:none}');
      printWindow.document.write('.strip-label{font-size:8px;text-transform:uppercase;letter-spacing:0.12em;color:#999;margin-bottom:2px}');
      printWindow.document.write('.strip-value{font-size:13px;font-weight:600;color:#1a1a2e}');
      
      printWindow.document.write('.pdf-content{padding:20px 36px 10px}');
      
      printWindow.document.write('.day-block{margin-bottom:14px;padding:14px 18px;border-left:3px solid ' + colors.accent + ';background:#fafbfc;border-radius:0 6px 6px 0;page-break-inside:avoid}');
      printWindow.document.write('.day-block-header{display:flex;align-items:center;gap:10px;margin-bottom:10px}');
      printWindow.document.write('.day-num{width:30px;height:30px;border-radius:8px;background:' + colors.primary + ';color:#fff;display:grid;place-items:center;font-family:"Cormorant Garamond",serif;font-size:15px;font-weight:600;flex-shrink:0}');
      printWindow.document.write('.day-title-text{font-size:14px;font-weight:600;color:#1a1a2e}');
      
      printWindow.document.write('.pdf-step{padding:6px 0 6px 16px;border-left:1px solid #e0e4ea;margin-left:6px;position:relative}');
      printWindow.document.write('.pdf-step::before{content:"";position:absolute;left:-4px;top:10px;width:7px;height:7px;border-radius:50%;background:' + colors.accent + '}');
      printWindow.document.write('.pdf-step-title{font-size:11px;font-weight:600;color:#1a1a2e;margin-bottom:1px}');
      printWindow.document.write('.pdf-step-desc{font-size:10px;color:#666;line-height:1.5}');
      printWindow.document.write('.pdf-step-desc strong{color:#333}');
      printWindow.document.write('.pdf-step-cost{display:inline-block;font-size:10px;font-weight:600;color:' + colors.accent + ';background:rgba(212,160,23,0.08);padding:1px 8px;border-radius:3px;margin-top:3px}');
      
      printWindow.document.write('.day-note-pdf{margin-top:8px;padding:8px 12px;background:#fff;border-radius:4px;border:1px dashed #e0e4ea;font-size:10px;color:#666}');
      printWindow.document.write('.day-note-pdf strong{color:#333}');
      
      printWindow.document.write('.total-section{background:linear-gradient(135deg,' + colors.primary + ',#0a1a35);color:#F8FAFC;padding:20px 28px;border-radius:12px;margin:20px 36px;page-break-inside:avoid}');
      printWindow.document.write('.total-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}');
      printWindow.document.write('.total-left h3{font-family:"Cormorant Garamond",serif;font-size:18px;color:#D4A017;margin-bottom:4px}');
      printWindow.document.write('.total-amount{font-size:36px;font-weight:700;color:#fff}');
      printWindow.document.write('.total-sub{font-size:10px;color:#B8D8F8;letter-spacing:0.04em}');
      printWindow.document.write('.total-right{font-size:11px;color:#B8D8F8;line-height:1.7;text-align:right}');
      printWindow.document.write('.total-right span{color:#fff;font-weight:500}');
      
      if (addonDetails.length > 0) {
        printWindow.document.write('.addon-strip{margin:0 36px 16px;padding:10px 18px;background:rgba(212,160,23,0.04);border:1px solid rgba(212,160,23,0.15);border-radius:8px;display:flex;flex-wrap:wrap;gap:12px;align-items:center}');
        printWindow.document.write('.addon-strip h4{font-size:10px;color:#D4A017;letter-spacing:0.08em;text-transform:uppercase;margin-right:4px}');
        printWindow.document.write('.addon-strip span{font-size:10px;color:#555}');
      }
      
      printWindow.document.write('.pdf-footer{padding:14px 36px 20px;text-align:center;font-size:9px;color:#aaa;line-height:1.6;border-top:1px solid #eee;margin-top:10px}');
      printWindow.document.write('.pdf-footer .brand{font-family:"Cormorant Garamond",serif;font-size:15px;color:#1a1a2e;margin-bottom:2px}');
      printWindow.document.write('.pdf-footer .brand span{display:inline-block;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#E8BE4A,#D4A017 60%,#8a6a0f);margin-right:5px;vertical-align:middle}');
      
      printWindow.document.write('@media print{');
      printWindow.document.write('body{padding:0;margin:0}');
      printWindow.document.write('.page{max-width:100%}');
      printWindow.document.write('.pdf-header{padding:18px 28px}');
      printWindow.document.write('.pdf-content{padding:14px 28px 8px}');
      printWindow.document.write('.total-section{margin:16px 28px}');
      printWindow.document.write('.addon-strip{margin:0 28px 12px}');
      printWindow.document.write('.pdf-footer{padding:10px 28px 16px}');
      printWindow.document.write('@page{margin:0.4cm}');
      printWindow.document.write('}');
      
      printWindow.document.write('</style>');
      printWindow.document.write('</head>');
      printWindow.document.write('<body>');
      printWindow.document.write('<div class="page">');
      
      var routeLabel = YATRA_ROUTES[ROUTE_ORIGIN] ? YATRA_ROUTES[ROUTE_ORIGIN].label : ROUTE_ORIGIN;
      printWindow.document.write('<div class="pdf-header">');
      printWindow.document.write('<div class="header-left">');
      printWindow.document.write('<div class="logo-circle"></div>');
      printWindow.document.write('<div class="logo-text">Yatra</div>');
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="header-right">');
      printWindow.document.write('<h1>Kedarnath Yatra</h1>');
      printWindow.document.write('<p class="route">' + routeLabel + ' <em>→</em> ' + ROUTE_DESTINATION + '</p>');
      printWindow.document.write('<div class="tier-badge">' + tierName + ' Plan</div>');
      printWindow.document.write('</div>');
      printWindow.document.write('</div>');
      
      var tierDuration = tier === 'premium' ? '2 Days' : (4 + extraDays) + ' Days';
      printWindow.document.write('<div class="trip-strip">');
      printWindow.document.write('<div class="trip-strip-item"><div class="strip-label">Travelers</div><div class="strip-value">' + travelers + '</div></div>');
      printWindow.document.write('<div class="trip-strip-item"><div class="strip-label">Duration</div><div class="strip-value">' + tierDuration + '</div></div>');
      printWindow.document.write('<div class="trip-strip-item"><div class="strip-label">From</div><div class="strip-value">' + routeLabel + '</div></div>');
      printWindow.document.write('<div class="trip-strip-item"><div class="strip-label">To</div><div class="strip-value">' + ROUTE_DESTINATION + '</div></div>');
      printWindow.document.write('<div class="trip-strip-item"><div class="strip-label">Tier</div><div class="strip-value">' + tierName + '</div></div>');
      printWindow.document.write('</div>');
      
      printWindow.document.write('<div class="pdf-content">');
      
      var activePlan = document.getElementById('plan-' + tier);
      if (activePlan) {
        var dayCards = activePlan.querySelectorAll('.day-card');
        
        dayCards.forEach(function(card, index) {
          var dayNum = card.querySelector('.day-number');
          var dayTitle = card.querySelector('.day-title');
          var dayNote = card.querySelector('.day-note');
          var steps = card.querySelectorAll('.step');
          
          var dayNumber = dayNum ? dayNum.textContent.trim() : 'Day ' + (index + 1);
          var dayTitleText = dayTitle ? dayTitle.textContent.trim() : '';
          
          printWindow.document.write('<div class="day-block">');
          printWindow.document.write('<div class="day-block-header">');
          printWindow.document.write('<div class="day-num">' + dayNumber.replace('Day ', '') + '</div>');
          printWindow.document.write('<div class="day-title-text">' + dayTitleText + '</div>');
          printWindow.document.write('</div>');
          
          steps.forEach(function(step) {
            var title = step.querySelector('.step-title');
            var desc = step.querySelector('.step-desc');
            var cost = step.querySelector('.step-cost');
            
            if (title) {
              printWindow.document.write('<div class="pdf-step">');
              printWindow.document.write('<div class="pdf-step-title">' + title.textContent.trim() + '</div>');
              if (desc) {
                var descText = desc.innerHTML.replace(/<br\s*\/?>/gi, '<br>');
                printWindow.document.write('<div class="pdf-step-desc">' + descText + '</div>');
              }
              if (cost) {
                printWindow.document.write('<div class="pdf-step-cost">' + cost.textContent.trim() + '</div>');
              }
              printWindow.document.write('</div>');
            }
          });
          
          if (dayNote) {
            printWindow.document.write('<div class="day-note-pdf">' + dayNote.innerHTML + '</div>');
          }
          
          printWindow.document.write('</div>');
        });
      }
      
      printWindow.document.write('</div>');
      
      if (addonDetails.length > 0) {
        printWindow.document.write('<div class="addon-strip">');
        printWindow.document.write('<h4>📦 Add-ons:</h4>');
        addonDetails.forEach(function(detail) {
          printWindow.document.write('<span>' + detail + '</span>');
        });
        printWindow.document.write('</div>');
      }
      
      printWindow.document.write('<div class="total-section">');
      printWindow.document.write('<div class="total-inner">');
      printWindow.document.write('<div class="total-left">');
      printWindow.document.write('<h3>Total Estimate</h3>');
      printWindow.document.write('<div class="total-amount">₹' + grandTotal.toLocaleString('en-IN') + '</div>');
      printWindow.document.write('<div class="total-sub">FOR ' + travelers + ' TRAVELER(S) · ' + tierName.toUpperCase() + ' PLAN</div>');
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="total-right">');
      printWindow.document.write('<div>Per Person: <span>₹' + perPerson.toLocaleString('en-IN') + '</span></div>');
      printWindow.document.write('<div>Duration: <span>' + tierDuration + '</span></div>');
      printWindow.document.write('<div>Route: <span>' + routeLabel + ' → ' + ROUTE_DESTINATION + '</span></div>');
      if (extraDays > 0) {
        printWindow.document.write('<div>Extra Days: <span>' + extraDays + '</span></div>');
      }
      printWindow.document.write('</div>');
      printWindow.document.write('</div>');
      printWindow.document.write('</div>');
      
      printWindow.document.write('<div class="pdf-footer">');
      printWindow.document.write('<div class="brand"><span></span>Yatra Planner</div>');
      printWindow.document.write('<div>India\'s Trusted Travel Budget Planner · yatra-planner.onrender.com</div>');
      printWindow.document.write('<div>Generated: ' + new Date().toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'}) + ' · Prices are approximate and may vary by season</div>');
      printWindow.document.write('</div>');
      
      printWindow.document.write('</div>');
      printWindow.document.write('</body>');
      printWindow.document.write('</html>');
      
      printWindow.document.close();
      
      setTimeout(function () { 
        printWindow.print(); 
      }, 600);
    });
  }

  updateAllCosts();

})();
