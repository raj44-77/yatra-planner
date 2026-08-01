(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var ROUTE_DESTINATION = 'Badrinath';
  var urlParams = new URLSearchParams(window.location.search);
  var ROUTE_ORIGIN = urlParams.get('origin') || 'Bhagalpur';
  
  if (!BADRINATH_ROUTES || !BADRINATH_ROUTES[ROUTE_ORIGIN]) {
    ROUTE_ORIGIN = 'Bhagalpur';
  }

  var travelerCount = document.getElementById('travelerCount');
  var travelerMinus = document.getElementById('travelerMinus');
  var travelerPlus = document.getElementById('travelerPlus');
  var travelerLabel = document.getElementById('travelerLabel');
  var extraDaysEl = document.getElementById('extraDays');
  var daysMinus = document.getElementById('daysMinus');
  var daysPlus = document.getElementById('daysPlus');
  var addonCab = document.getElementById('addonCab');
  var addonHelicopter = document.getElementById('addonHelicopter');

  var travelers = 1;
  var extraDays = 0;

  var preselectedTier = urlParams.get('tier') || 'basic';
  var preselectedPeople = parseInt(urlParams.get('people')) || 1;
  var preselectedDays = parseInt(urlParams.get('days')) || 0;
  
  if (preselectedPeople >= 1 && preselectedPeople <= 12) travelers = preselectedPeople;
  if (preselectedDays > 0 && preselectedDays <= 10) extraDays = preselectedDays;

  function updateTravelerDisplay() {
    if (travelerCount) travelerCount.value = travelers;
    if (travelerLabel) travelerLabel.textContent = travelers === 1 ? '1 Person' : travelers + ' People';
  }

  if (travelerMinus) travelerMinus.addEventListener('click', function () { if (travelers > 1) { travelers--; updateTravelerDisplay(); updateAllCosts(); } });
  if (travelerPlus) travelerPlus.addEventListener('click', function () { if (travelers < 12) { travelers++; updateTravelerDisplay(); updateAllCosts(); } });
  if (daysMinus) daysMinus.addEventListener('click', function () { if (extraDays > 0) { extraDays--; if (extraDaysEl) extraDaysEl.textContent = extraDays; updateAllCosts(); } });
  if (daysPlus) daysPlus.addEventListener('click', function () { if (extraDays < 10) { extraDays++; if (extraDaysEl) extraDaysEl.textContent = extraDays; updateAllCosts(); } });
  if (addonCab) addonCab.addEventListener('change', updateAllCosts);
  if (addonHelicopter) addonHelicopter.addEventListener('change', updateAllCosts);

  updateTravelerDisplay();
  if (extraDaysEl) extraDaysEl.textContent = extraDays;

  function updateDay1Content(tier) {
    var route = BADRINATH_ROUTES[ROUTE_ORIGIN];
    if (!route) return;

    var planOriginEl = document.getElementById('planOrigin');
    if (planOriginEl) planOriginEl.textContent = route.label || ROUTE_ORIGIN;

    ['basic', 'comfort', 'premium'].forEach(function(t) {
      var planTierData = route[t];
      if (!planTierData) return;
      var planDiv = document.getElementById('plan-' + t);
      if (!planDiv) return;
      var firstDayCard = planDiv.querySelector('.day-card');
      if (!firstDayCard) return;
      var dayTitle = firstDayCard.querySelector('.day-title');
      if (dayTitle && planTierData.day1Title) dayTitle.textContent = planTierData.day1Title;
      var dayNote = firstDayCard.querySelector('.day-note');
      if (dayNote && planTierData.day1Note) dayNote.innerHTML = planTierData.day1Note;
      var daySteps = firstDayCard.querySelector('.day-steps');
      if (daySteps && planTierData.steps) {
        var stepsHTML = '';
        planTierData.steps.forEach(function(step) {
          stepsHTML += '<div class="step"><div class="step-dot"></div><div class="step-content"><div class="step-title">' + step.title + '</div><div class="step-desc">' + step.desc + '</div><div class="step-cost">' + step.cost + '</div></div></div>';
        });
        if (planTierData.day1Food) {
          stepsHTML += '<div class="step"><div class="step-dot"></div><div class="step-content"><div class="step-title">🍱 Food — Day 1</div><div class="step-desc">' + planTierData.day1Food + '</div>' + (planTierData.day1FoodCost ? '<div class="step-cost">' + planTierData.day1FoodCost + '</div>' : '') + '</div></div>';
        }
        daySteps.innerHTML = stepsHTML;
      }
    });
  }

  function getLeg1Cost(tier) {
    var costs = {
      'Bhagalpur': { basic: 400, comfort: 1600, premium: 15500 },
      'Patna': { basic: 300, comfort: 1200, premium: 7000 },
      'Delhi': { basic: 200, comfort: 750, premium: 4000 },
      'Varanasi': { basic: 300, comfort: 1100, premium: 6500 },
      'Kolkata': { basic: 400, comfort: 2200, premium: 8500 },
      'Mumbai': { basic: 500, comfort: 3200, premium: 6500 },
      'Lucknow': { basic: 250, comfort: 1100, premium: 5000 },
      'Jaipur': { basic: 250, comfort: 1000, premium: 5500 }
    };
    return costs[ROUTE_ORIGIN] ? costs[ROUTE_ORIGIN][tier] : costs['Bhagalpur'][tier];
  }

  function getAddonCosts() {
    var total = 0;
    if (addonCab && addonCab.checked) total += 3000 * travelers;
    if (addonHelicopter && addonHelicopter.checked) total += 12000 * travelers;
    return total;
  }

  function calcBasic() {
    var leg1 = getLeg1Cost('basic');
    var roadTransport = 1740;
    var foodPerDay = 350;
    var stayPerNight = 650;
    var misc = 1500;
    var baseDays = 3;

    var leg1Total = leg1 * travelers;
    var roadTotal = roadTransport * travelers;
    var foodTotal = foodPerDay * baseDays * travelers;
    var stayTotal = stayPerNight * travelers;
    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay + stayPerNight) * extraDays * travelers;
    var grandTotal = leg1Total + roadTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return { perPerson: Math.round(grandTotal / travelers), total: Math.round(grandTotal), breakdown: { transport: leg1Total + roadTotal, food: foodTotal + extraDayCost, stay: stayTotal, misc: miscTotal, totalDays: baseDays + extraDays } };
  }

  function calcComfort() {
    var leg1 = getLeg1Cost('comfort');
    var roadTaxi = 2720;
    var foodPerDay = 550;
    var stayBase = 2250;
    var misc = 2500;
    var baseDays = 3;

    var leg1Total = leg1 * travelers;
    var roadTotal = roadTaxi * travelers;
    var foodTotal = foodPerDay * baseDays * travelers;
    var stayTotal = stayBase;
    if (travelers > 1) stayTotal = stayBase + (travelers - 1) * 800;
    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay * travelers + stayTotal) * extraDays;
    var grandTotal = leg1Total + roadTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return { perPerson: Math.round(grandTotal / travelers), total: Math.round(grandTotal), breakdown: { transport: leg1Total + roadTotal, food: foodTotal + extraDayCost, stay: stayTotal, misc: miscTotal, totalDays: baseDays + extraDays } };
  }

  function calcPremium() {
    var leg1 = getLeg1Cost('premium');
    var flightRoundTrip = 14000;
    var dehradunCab = travelers <= 3 ? 15000 : (travelers <= 6 ? 20000 : 20000 + (travelers - 6) * 2000);
    var foodPerDay = 700;
    var stayBase = 6500;
    var misc = 8000;
    var baseDays = 2;

    var flightCost = (ROUTE_ORIGIN === 'Delhi') ? 0 : flightRoundTrip * travelers;
    var leg1Total = leg1 * travelers;
    var cabTotal = dehradunCab;
    var foodTotal = foodPerDay * baseDays * travelers;
    var stayTotal = stayBase;
    if (travelers > 1) stayTotal = stayBase + (travelers - 1) * 2000;
    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay * travelers + stayTotal) * extraDays;
    var grandTotal = leg1Total + flightCost + cabTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return { perPerson: Math.round(grandTotal / travelers), total: Math.round(grandTotal), breakdown: { transport: leg1Total + flightCost + cabTotal, food: foodTotal + extraDayCost, stay: stayTotal, misc: miscTotal, totalDays: baseDays + extraDays } };
  }

  function updateSummaryDisplay(tier, result) {
    var summaryCard = document.querySelector('#plan-' + tier + ' .summary-card');
    if (!summaryCard) return;
    var b = result.breakdown;
    var addons = getAddonCosts();
    var grandTotal = result.total + addons;
    var perPerson = Math.round(grandTotal / travelers);
    var rows = summaryCard.querySelectorAll('.summary-table tr');

    if (tier === 'basic') {
      if (rows[0]) rows[0].querySelector('td:last-child').textContent = '₹' + b.transport.toLocaleString('en-IN');
      if (rows[1]) rows[1].querySelector('td:last-child').textContent = '₹' + b.food.toLocaleString('en-IN') + ' (' + b.totalDays + ' days)';
      if (rows[2]) rows[2].querySelector('td:last-child').textContent = '₹' + b.stay.toLocaleString('en-IN');
      if (rows[3]) rows[3].querySelector('td:last-child').textContent = '₹' + b.misc.toLocaleString('en-IN');
    } else if (tier === 'comfort') {
      if (rows[0]) rows[0].querySelector('td:last-child').textContent = '₹' + b.transport.toLocaleString('en-IN');
      if (rows[1]) rows[1].querySelector('td:last-child').textContent = '₹' + b.food.toLocaleString('en-IN') + ' (' + b.totalDays + ' days)';
      if (rows[2]) rows[2].querySelector('td:last-child').textContent = '₹' + b.stay.toLocaleString('en-IN');
      if (rows[3]) rows[3].querySelector('td:last-child').textContent = '₹' + b.misc.toLocaleString('en-IN');
    } else if (tier === 'premium') {
      if (rows[0]) rows[0].querySelector('td:last-child').textContent = '₹' + b.transport.toLocaleString('en-IN');
      if (rows[1]) rows[1].querySelector('td:last-child').textContent = '₹' + b.food.toLocaleString('en-IN') + ' (' + b.totalDays + ' days)';
      if (rows[2]) rows[2].querySelector('td:last-child').textContent = '₹' + b.stay.toLocaleString('en-IN');
      if (rows[3]) rows[3].querySelector('td:last-child').textContent = '₹' + b.misc.toLocaleString('en-IN');
    }

    var existingAddonRow = summaryCard.querySelector('.addon-row');
    if (existingAddonRow) existingAddonRow.remove();
    if (addons > 0) {
      var addonRow = document.createElement('tr');
      addonRow.className = 'addon-row';
      addonRow.innerHTML = '<td style="color:var(--gold);">➕ Add-ons</td><td style="color:var(--gold);font-weight:600;">₹' + addons.toLocaleString('en-IN') + '</td>';
      var totalRow = summaryCard.querySelector('.total-row');
      if (totalRow) totalRow.parentNode.insertBefore(addonRow, totalRow);
    }

    var totalStrong = summaryCard.querySelector('.total-row strong');
    if (totalStrong) totalStrong.textContent = '₹' + grandTotal.toLocaleString('en-IN') + ' total';

    var groupCosts = summaryCard.querySelectorAll('.group-cost');
    if (groupCosts.length >= 2) {
      var saved = travelers;
      travelers = 2; var r2 = tier === 'basic' ? calcBasic() : (tier === 'comfort' ? calcComfort() : calcPremium()); var a2 = getAddonCosts();
      travelers = 4; var r4 = tier === 'basic' ? calcBasic() : (tier === 'comfort' ? calcComfort() : calcPremium()); var a4 = getAddonCosts();
      travelers = saved;
      groupCosts[0].innerHTML = '<span>2 People (Total)</span> ₹' + (r2.total + a2).toLocaleString('en-IN');
      groupCosts[1].innerHTML = '<span>4 People (Total)</span> ₹' + (r4.total + a4).toLocaleString('en-IN');
    }

    var summaryNote = summaryCard.querySelector('.summary-note');
    if (summaryNote) {
      var parts = [];
      parts.push('<span style="font-size:18px;color:var(--snow);font-weight:700;">💰 Total for ' + travelers + ' Traveler(s): ₹' + grandTotal.toLocaleString('en-IN') + '</span>');
      parts.push('<span style="font-size:14px;color:var(--gold);">👤 Per Person: ₹' + perPerson.toLocaleString('en-IN') + '</span>');
      if (extraDays > 0) parts.push('<span style="color:var(--ice);opacity:0.7;">📅 ' + extraDays + ' extra day(s) · ' + b.totalDays + ' days total</span>');
      if (addons > 0) {
        var names = [];
        if (addonCab && addonCab.checked) names.push('Private Cab (₹' + (3000 * travelers).toLocaleString('en-IN') + ')');
        if (addonHelicopter && addonHelicopter.checked) names.push('Helicopter (₹' + (12000 * travelers).toLocaleString('en-IN') + ')');
        parts.push('<span style="color:var(--gold);">➕ Add-ons: ' + names.join(', ') + '</span>');
      }
      summaryNote.innerHTML = parts.join('<br>') + '<br><br><span style="font-size:11px;opacity:0.5;">⚠️ Prices are approximate. All costs are round trip from ' + ROUTE_ORIGIN + '. No trekking needed — road goes to temple!</span>';
    }
  }

  function getActiveTier() {
    var tabs = document.querySelectorAll('.tier-tab');
    for (var i = 0; i < tabs.length; i++) { if (tabs[i].classList.contains('active')) return tabs[i].getAttribute('data-tier'); }
    return 'basic';
  }

  function updateAllCosts() {
    var tier = getActiveTier();
    var result = tier === 'basic' ? calcBasic() : (tier === 'comfort' ? calcComfort() : calcPremium());
    var addons = getAddonCosts();
    updateSummaryDisplay(tier, { perPerson: Math.round((result.total + addons) / travelers), total: result.total + addons, breakdown: result.breakdown });
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname + '?tier=' + tier + '&people=' + travelers + '&origin=' + encodeURIComponent(ROUTE_ORIGIN) + '&days=' + extraDays);
    }
  }

  var tabs = document.querySelectorAll('.tier-tab');
  var planContents = document.querySelectorAll('.plan-content');
  var tierLabel = document.getElementById('planTierLabel');
  var planDuration = document.getElementById('planDuration');
  var tierInfo = { basic: { label: 'BASIC', duration: '3-4 days' }, comfort: { label: 'COMFORT', duration: '3-4 days' }, premium: { label: 'PREMIUM', duration: '2 days' } };

  function switchTier(tier) {
    tabs.forEach(function(t) { t.classList.remove('active'); if (t.getAttribute('data-tier') === tier) t.classList.add('active'); });
    planContents.forEach(function(c) { c.classList.remove('active'); });
    var target = document.getElementById('plan-' + tier);
    if (target) target.classList.add('active');
    if (tierLabel && tierInfo[tier]) tierLabel.textContent = tierInfo[tier].label;
    if (planDuration && tierInfo[tier]) planDuration.textContent = tierInfo[tier].duration;
    updateDay1Content(tier);
    if (window.history && window.history.replaceState) window.history.replaceState({}, '', window.location.pathname + '?tier=' + tier + '&people=' + travelers + '&origin=' + encodeURIComponent(ROUTE_ORIGIN) + '&days=' + extraDays);
    updateAllCosts();
    setTimeout(initReveal, 200);
  }

  tabs.forEach(function(tab) { tab.addEventListener('click', function() { switchTier(this.getAttribute('data-tier')); }); });
  updateDay1Content(preselectedTier);
  switchTier(preselectedTier);

  function initReveal() {
    var reveals = document.querySelectorAll('.plan-content.active .reveal');
    var io = new IntersectionObserver(function(entries) { entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.1 });
    reveals.forEach(function(el) { el.classList.remove('in'); io.observe(el); });
  }
  initReveal();

  var tierSelector = document.querySelector('.tier-selector');
  if (tierSelector) {
    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:100%;';
    tierSelector.parentElement.style.position = 'relative';
    tierSelector.parentElement.insertBefore(sentinel, tierSelector);
    new IntersectionObserver(function(entries) { entries.forEach(function(e) { tierSelector.style.boxShadow = e.isIntersecting ? 'none' : '0 4px 20px rgba(0,0,0,0.3)'; }); }, { threshold: 1.0 }).observe(sentinel);
  }

  updateAllCosts();

    // ── PDF DOWNLOAD ──
  var downloadBtn = document.getElementById('downloadPdfBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      var tier = getActiveTier();
      var tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
      var result = tier === 'basic' ? calcBasic() : (tier === 'comfort' ? calcComfort() : calcPremium());
      var addons = getAddonCosts();
      var grandTotal = result.total + addons;
      var perPerson = Math.round(grandTotal / travelers);

      var tierColors = {
        basic: { primary: '#0B2345', accent: '#D4A017', badge: '#B8D8F8' },
        comfort: { primary: '#0B2345', accent: '#D4A017', badge: '#E8BE4A' },
        premium: { primary: '#081B33', accent: '#D4A017', badge: '#D4A017' }
      };
      var colors = tierColors[tier];

      var addonDetails = [];
      if (addonCab && addonCab.checked) addonDetails.push('🚗 Private Cab (Round Trip): ₹' + (3000 * travelers).toLocaleString('en-IN'));
      if (addonHelicopter && addonHelicopter.checked) addonDetails.push('🚁 Helicopter (Round Trip): ₹' + (12000 * travelers).toLocaleString('en-IN'));
      if (extraDays > 0) addonDetails.push('📅 Extra ' + extraDays + ' day(s) included');

      var printWindow = window.open('', '_blank', 'width=900,height=700');
      printWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Yatra — ' + tierName + ' Badrinath Plan</title>');
      printWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">');
      printWindow.document.write('<style>');
      printWindow.document.write('*{margin:0;padding:0;box-sizing:border-box}');
      printWindow.document.write('body{font-family:"Inter",sans-serif;color:#1a1a2e;background:#fff;line-height:1.5;font-size:12px}');
      printWindow.document.write('.page{max-width:760px;margin:0 auto}');
      printWindow.document.write('.pdf-header{background:linear-gradient(135deg,' + colors.primary + ',#0a1a35);color:#F8FAFC;padding:24px 36px;display:flex;align-items:center;justify-content:space-between;gap:20px}');
      printWindow.document.write('.header-left{display:flex;align-items:center;gap:12px}');
      printWindow.document.write('.logo-circle{width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#E8BE4A,#D4A017);flex-shrink:0}');
      printWindow.document.write('.logo-text{font-family:"Cormorant Garamond",serif;font-size:26px}');
      printWindow.document.write('.header-right{text-align:right}');
      printWindow.document.write('.pdf-header h1{font-family:"Cormorant Garamond",serif;font-size:22px;margin-bottom:2px}');
      printWindow.document.write('.route{font-size:13px;opacity:0.85} .route em{color:#D4A017;font-style:italic}');
      printWindow.document.write('.tier-badge{display:inline-block;padding:4px 14px;border-radius:999px;border:1px solid ' + colors.badge + ';font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:' + colors.badge + ';margin-top:4px}');
      printWindow.document.write('.trip-strip{display:flex;border-bottom:2px solid ' + colors.accent + ';background:#fafbfc}');
      printWindow.document.write('.trip-strip-item{flex:1;text-align:center;padding:12px 8px;border-right:1px solid #eef0f5}');
      printWindow.document.write('.trip-strip-item:last-child{border-right:none}');
      printWindow.document.write('.strip-label{font-size:8px;text-transform:uppercase;letter-spacing:0.12em;color:#999}');
      printWindow.document.write('.strip-value{font-size:13px;font-weight:600}');
      printWindow.document.write('.pdf-content{padding:20px 36px 10px}');
      printWindow.document.write('.day-block{margin-bottom:14px;padding:14px 18px;border-left:3px solid ' + colors.accent + ';background:#fafbfc;border-radius:0 6px 6px 0;page-break-inside:avoid}');
      printWindow.document.write('.day-block-header{display:flex;align-items:center;gap:10px;margin-bottom:10px}');
      printWindow.document.write('.day-num{width:30px;height:30px;border-radius:8px;background:' + colors.primary + ';color:#fff;display:grid;place-items:center;font-family:"Cormorant Garamond",serif;font-size:15px;font-weight:600}');
      printWindow.document.write('.day-title-text{font-size:14px;font-weight:600}');
      printWindow.document.write('.pdf-step{padding:6px 0 6px 16px;border-left:1px solid #e0e4ea;margin-left:6px;position:relative}');
      printWindow.document.write('.pdf-step::before{content:"";position:absolute;left:-4px;top:10px;width:7px;height:7px;border-radius:50%;background:' + colors.accent + '}');
      printWindow.document.write('.pdf-step-title{font-size:11px;font-weight:600;margin-bottom:1px}');
      printWindow.document.write('.pdf-step-desc{font-size:10px;color:#666;line-height:1.5}');
      printWindow.document.write('.pdf-step-cost{display:inline-block;font-size:10px;font-weight:600;color:' + colors.accent + ';background:rgba(212,160,23,0.08);padding:1px 8px;border-radius:3px;margin-top:3px}');
      printWindow.document.write('.day-note-pdf{margin-top:8px;padding:8px 12px;background:#fff;border-radius:4px;border:1px dashed #e0e4ea;font-size:10px;color:#666}');
      printWindow.document.write('.total-section{background:linear-gradient(135deg,' + colors.primary + ',#0a1a35);color:#F8FAFC;padding:20px 28px;border-radius:12px;margin:20px 36px}');
      printWindow.document.write('.total-inner{display:flex;align-items:center;justify-content:space-between;gap:20px}');
      printWindow.document.write('.total-left h3{font-family:"Cormorant Garamond",serif;font-size:18px;color:#D4A017}');
      printWindow.document.write('.total-amount{font-size:36px;font-weight:700}');
      printWindow.document.write('.total-sub{font-size:10px;color:#B8D8F8}');
      printWindow.document.write('.total-right{font-size:11px;color:#B8D8F8;line-height:1.7;text-align:right}');
      printWindow.document.write('.total-right span{color:#fff;font-weight:500}');
      printWindow.document.write('.pdf-footer{padding:14px 36px 20px;text-align:center;font-size:9px;color:#aaa;border-top:1px solid #eee;margin-top:10px}');
      printWindow.document.write('@media print{body{padding:0}.page{max-width:100%}.pdf-header{padding:18px 28px}.pdf-content{padding:14px 28px 8px}.total-section{margin:16px 28px}@page{margin:0.4cm}}');
      printWindow.document.write('</style></head><body><div class="page">');

      var routeLabel = BADRINATH_ROUTES[ROUTE_ORIGIN] ? BADRINATH_ROUTES[ROUTE_ORIGIN].label : ROUTE_ORIGIN;
      printWindow.document.write('<div class="pdf-header"><div class="header-left"><div class="logo-circle"></div><div class="logo-text">Yatra</div></div><div class="header-right"><h1>Badrinath Yatra</h1><p class="route">' + routeLabel + ' <em>→</em> Badrinath</p><div class="tier-badge">' + tierName + ' Plan</div></div></div>');
      
      var tierDuration = tier === 'premium' ? '2 Days' : (3 + extraDays) + ' Days';
      printWindow.document.write('<div class="trip-strip"><div class="trip-strip-item"><div class="strip-label">Travelers</div><div class="strip-value">' + travelers + '</div></div><div class="trip-strip-item"><div class="strip-label">Duration</div><div class="strip-value">' + tierDuration + '</div></div><div class="trip-strip-item"><div class="strip-label">From</div><div class="strip-value">' + routeLabel + '</div></div><div class="trip-strip-item"><div class="strip-label">To</div><div class="strip-value">Badrinath</div></div><div class="trip-strip-item"><div class="strip-label">Tier</div><div class="strip-value">' + tierName + '</div></div></div>');
      
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
          printWindow.document.write('<div class="day-block"><div class="day-block-header"><div class="day-num">' + dayNumber.replace('Day ', '') + '</div><div class="day-title-text">' + dayTitleText + '</div></div>');
          steps.forEach(function(step) {
            var title = step.querySelector('.step-title');
            var desc = step.querySelector('.step-desc');
            var cost = step.querySelector('.step-cost');
            if (title) {
              printWindow.document.write('<div class="pdf-step"><div class="pdf-step-title">' + title.textContent.trim() + '</div>');
              if (desc) printWindow.document.write('<div class="pdf-step-desc">' + desc.innerHTML.replace(/<br\s*\/?>/gi, '<br>') + '</div>');
              if (cost) printWindow.document.write('<div class="pdf-step-cost">' + cost.textContent.trim() + '</div>');
              printWindow.document.write('</div>');
            }
          });
          if (dayNote) printWindow.document.write('<div class="day-note-pdf">' + dayNote.innerHTML + '</div>');
          printWindow.document.write('</div>');
        });
      }
      printWindow.document.write('</div>');

      if (addonDetails.length > 0) {
        printWindow.document.write('<div style="margin:0 36px 16px;padding:10px 18px;background:rgba(212,160,23,0.04);border:1px solid rgba(212,160,23,0.15);border-radius:8px;"><h4 style="font-size:10px;color:#D4A017;">📦 Add-ons:</h4>' + addonDetails.map(function(d){return '<span style="font-size:10px;color:#555">'+d+'</span>';}).join(' · ') + '</div>');
      }

      printWindow.document.write('<div class="total-section"><div class="total-inner"><div class="total-left"><h3>Total Estimate</h3><div class="total-amount">₹' + grandTotal.toLocaleString('en-IN') + '</div><div class="total-sub">FOR ' + travelers + ' TRAVELER(S) · ' + tierName.toUpperCase() + ' PLAN</div></div><div class="total-right"><div>Per Person: <span>₹' + perPerson.toLocaleString('en-IN') + '</span></div><div>Duration: <span>' + tierDuration + '</span></div><div>Route: <span>' + routeLabel + ' → Badrinath</span></div></div></div></div>');
      printWindow.document.write('<div class="pdf-footer"><div>Yatra Planner · yatra-planner.onrender.com</div><div>Generated: ' + new Date().toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'}) + '</div></div>');
      printWindow.document.write('</div></body></html>');
      printWindow.document.close();
      setTimeout(function(){printWindow.print();},600);
    });
  }
})();