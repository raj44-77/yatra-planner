(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var ROUTE_DESTINATION = 'Manali';
  var urlParams = new URLSearchParams(window.location.search);
  var ROUTE_ORIGIN = urlParams.get('origin') || 'Delhi';
  
  if (!MANALI_ROUTES || !MANALI_ROUTES[ROUTE_ORIGIN]) {
    ROUTE_ORIGIN = 'Delhi';
  }

  var travelerCount = document.getElementById('travelerCount');
  var travelerMinus = document.getElementById('travelerMinus');
  var travelerPlus = document.getElementById('travelerPlus');
  var travelerLabel = document.getElementById('travelerLabel');
  var extraDaysEl = document.getElementById('extraDays');
  var daysMinus = document.getElementById('daysMinus');
  var daysPlus = document.getElementById('daysPlus');
  var addonParagliding = document.getElementById('addonParagliding');
  var addonBike = document.getElementById('addonBike');
  var addonCab = document.getElementById('addonCab');

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
  if (addonParagliding) addonParagliding.addEventListener('change', updateAllCosts);
  if (addonBike) addonBike.addEventListener('change', updateAllCosts);
  if (addonCab) addonCab.addEventListener('change', updateAllCosts);

  updateTravelerDisplay();
  if (extraDaysEl) extraDaysEl.textContent = extraDays;

  function updateDay1Content(tier) {
    var route = MANALI_ROUTES[ROUTE_ORIGIN];
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
      'Delhi': { basic: 850, comfort: 1500, premium: 12000 },
      'Patna': { basic: 1200, comfort: 3500, premium: 10000 },
      'Bhagalpur': { basic: 1350, comfort: 3850, premium: 19500 },
      'Varanasi': { basic: 1200, comfort: 3300, premium: 10000 },
      'Kolkata': { basic: 1500, comfort: 4500, premium: 12000 },
      'Mumbai': { basic: 1500, comfort: 4500, premium: 10000 },
      'Lucknow': { basic: 1100, comfort: 2700, premium: 9000 },
      'Jaipur': { basic: 1100, comfort: 2500, premium: 10000 }
    };
    return costs[ROUTE_ORIGIN] ? costs[ROUTE_ORIGIN][tier] : costs['Delhi'][tier];
  }

  function getAddonCosts() {
    var total = 0;
    if (addonParagliding && addonParagliding.checked) total += 3000 * travelers;
    if (addonBike && addonBike.checked) total += 1200 * travelers;
    if (addonCab && addonCab.checked) total += 3000 * travelers;
    return total;
  }

  function calcBasic() {
    var leg1 = getLeg1Cost('basic');
    var localTransport = 300;
    var foodPerDay = 350;
    var stayPerNight = 600;
    var misc = 1000;
    var baseDays = 3;

    var leg1Total = leg1 * travelers;
    var localTotal = localTransport * travelers;
    var foodTotal = foodPerDay * baseDays * travelers;
    var stayTotal = stayPerNight * travelers;
    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay + stayPerNight) * extraDays * travelers;
    var grandTotal = leg1Total + localTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return { perPerson: Math.round(grandTotal / travelers), total: Math.round(grandTotal), breakdown: { transport: leg1Total + localTotal, food: foodTotal + extraDayCost, stay: stayTotal, misc: miscTotal, totalDays: baseDays + extraDays } };
  }

  function calcComfort() {
    var leg1 = getLeg1Cost('comfort');
    var localTransport = 1000;
    var foodPerDay = 700;
    var stayBase = 2250;
    var misc = 2000;
    var baseDays = 3;

    var leg1Total = leg1 * travelers;
    var localTotal = localTransport * travelers;
    var foodTotal = foodPerDay * baseDays * travelers;
    var stayTotal = stayBase;
    if (travelers > 1) stayTotal = stayBase + (travelers - 1) * 800;
    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay * travelers + stayTotal) * extraDays;
    var grandTotal = leg1Total + localTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return { perPerson: Math.round(grandTotal / travelers), total: Math.round(grandTotal), breakdown: { transport: leg1Total + localTotal, food: foodTotal + extraDayCost, stay: stayTotal, misc: miscTotal, totalDays: baseDays + extraDays } };
  }

  function calcPremium() {
    var leg1 = getLeg1Cost('premium');
    var localTransport = 4000;
    var foodPerDay = 1200;
    var stayBase = 7500;
    var misc = 5000;
    var baseDays = 2;

    var leg1Total = leg1 * travelers;
    var localTotal = localTransport;
    var foodTotal = foodPerDay * baseDays * travelers;
    var stayTotal = stayBase;
    if (travelers > 1) stayTotal = stayBase + (travelers - 1) * 2000;
    var miscTotal = misc * travelers;
    var extraDayCost = (foodPerDay * travelers + stayTotal) * extraDays;
    var grandTotal = leg1Total + localTotal + foodTotal + stayTotal + miscTotal + extraDayCost;

    return { perPerson: Math.round(grandTotal / travelers), total: Math.round(grandTotal), breakdown: { transport: leg1Total + localTotal, food: foodTotal + extraDayCost, stay: stayTotal, misc: miscTotal, totalDays: baseDays + extraDays } };
  }

  function updateSummaryDisplay(tier, result) {
    var summaryCard = document.querySelector('#plan-' + tier + ' .summary-card');
    if (!summaryCard) return;
    var b = result.breakdown;
    var addons = getAddonCosts();
    var grandTotal = result.total + addons;
    var perPerson = Math.round(grandTotal / travelers);
    var rows = summaryCard.querySelectorAll('.summary-table tr');

    if (rows[0]) rows[0].querySelector('td:last-child').textContent = '₹' + b.transport.toLocaleString('en-IN');
    if (rows[1]) rows[1].querySelector('td:last-child').textContent = '₹' + b.food.toLocaleString('en-IN') + ' (' + b.totalDays + ' days)';
    if (rows[2]) rows[2].querySelector('td:last-child').textContent = '₹' + b.stay.toLocaleString('en-IN');
    if (rows[3]) rows[3].querySelector('td:last-child').textContent = '₹' + b.misc.toLocaleString('en-IN');

    var existingAddonRow = summaryCard.querySelector('.addon-row');
    if (existingAddonRow) existingAddonRow.remove();
    if (addons > 0) {
      var addonRow = document.createElement('tr');
      addonRow.className = 'addon-row';
      addonRow.innerHTML = '<td style="color:var(--gold);">➕ Adventure Add-ons</td><td style="color:var(--gold);font-weight:600;">₹' + addons.toLocaleString('en-IN') + '</td>';
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
        if (addonParagliding && addonParagliding.checked) names.push('Paragliding (₹' + (3000 * travelers).toLocaleString('en-IN') + ')');
        if (addonBike && addonBike.checked) names.push('Bike Rental (₹' + (1200 * travelers).toLocaleString('en-IN') + ')');
        if (addonCab && addonCab.checked) names.push('Sightseeing Cab (₹' + (3000 * travelers).toLocaleString('en-IN') + ')');
        parts.push('<span style="color:var(--gold);">➕ Add-ons: ' + names.join(', ') + '</span>');
      }
      summaryNote.innerHTML = parts.join('<br>') + '<br><br><span style="font-size:11px;opacity:0.5;">⚠️ Prices are approximate. Road access — no trekking needed! All costs round trip from ' + ROUTE_ORIGIN + '.</span>';
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
  var tierInfo = { basic: { label: 'BASIC', duration: '3-4 days' }, comfort: { label: 'COMFORT', duration: '3-4 days' }, premium: { label: 'PREMIUM', duration: '2-3 days' } };

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
})();