(function () {
  'use strict';

  // Set year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Kedarnath coordinates
  var KEDARNATH_LAT = 30.7352;
  var KEDARNATH_LON = 79.0669;

  // Weather codes to icons and conditions
  var weatherCodes = {
    0: { icon: '☀️', condition: 'Clear Sky' },
    1: { icon: '🌤️', condition: 'Mostly Clear' },
    2: { icon: '⛅', condition: 'Partly Cloudy' },
    3: { icon: '☁️', condition: 'Overcast' },
    45: { icon: '🌫️', condition: 'Foggy' },
    48: { icon: '🌫️', condition: 'Depositing Rime Fog' },
    51: { icon: '🌦️', condition: 'Light Drizzle' },
    53: { icon: '🌦️', condition: 'Moderate Drizzle' },
    55: { icon: '🌧️', condition: 'Heavy Drizzle' },
    61: { icon: '🌧️', condition: 'Light Rain' },
    63: { icon: '🌧️', condition: 'Moderate Rain' },
    65: { icon: '🌧️', condition: 'Heavy Rain' },
    71: { icon: '🌨️', condition: 'Light Snow' },
    73: { icon: '🌨️', condition: 'Moderate Snow' },
    75: { icon: '❄️', condition: 'Heavy Snow' },
    77: { icon: '❄️', condition: 'Snow Grains' },
    80: { icon: '🌧️', condition: 'Light Rain Showers' },
    81: { icon: '🌧️', condition: 'Moderate Rain Showers' },
    82: { icon: '⛈️', condition: 'Violent Rain Showers' },
    85: { icon: '🌨️', condition: 'Light Snow Showers' },
    86: { icon: '❄️', condition: 'Heavy Snow Showers' },
    95: { icon: '⛈️', condition: 'Thunderstorm' },
    96: { icon: '⛈️', condition: 'Thunderstorm with Hail' },
    99: { icon: '⛈️', condition: 'Heavy Thunderstorm with Hail' }
  };

  // Fetch weather data from Open-Meteo
  async function fetchWeather() {
    var url = 'https://api.open-meteo.com/v1/forecast?' +
      'latitude=' + KEDARNATH_LAT + '&longitude=' + KEDARNATH_LON +
      '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,rain,visibility' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,rain_sum' +
      '&timezone=Asia/Kolkata&forecast_days=10';

    try {
      var response = await fetch(url);
      var data = await response.json();
      updateUI(data);
    } catch (error) {
      console.error('Weather fetch failed:', error);
      showError();
    }
  }

  function getWeatherInfo(code) {
    return weatherCodes[code] || { icon: '🌤️', condition: 'Partly Cloudy' };
  }

  function updateUI(data) {
    updateCurrentWeather(data);
    updateForecast(data);
    updateAdvisory(data);
    updateTomorrowCard(data);
    updateTravelScore(data);
    updatePacking(data);
    updateAlerts(data);
    updateTimestamp();
  }

  function updateCurrentWeather(data) {
    var current = data.current;
    var weather = getWeatherInfo(current.weather_code);

    document.getElementById('currentIcon').textContent = weather.icon;
    document.getElementById('currentTemp').textContent = Math.round(current.temperature_2m) + '°C';
    document.getElementById('currentCondition').textContent = weather.condition;
    document.getElementById('currentHumidity').textContent = current.relative_humidity_2m + '%';
    document.getElementById('currentWind').textContent = Math.round(current.wind_speed_10m) + ' km/h';
    document.getElementById('currentRain').textContent = (current.rain || 0).toFixed(1) + ' mm';
    document.getElementById('currentVis').textContent = (current.visibility / 1000).toFixed(1) + ' km';
  }

  function updateForecast(data) {
    var daily = data.daily;
    var grid = document.getElementById('forecastGrid');
    var today = new Date().getDay();
    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var html = '';

    for (var i = 0; i < Math.min(daily.time.length, 10); i++) {
      var date = new Date(daily.time[i]);
      var dayName = i === 0 ? 'Today' : dayNames[date.getDay()];
      var weather = getWeatherInfo(daily.weather_code[i]);
      var isToday = i === 0 ? ' today' : '';

      html += '<div class="forecast-card' + isToday + '">';
      html += '<div class="fc-day">' + dayName + '</div>';
      html += '<div class="fc-icon">' + weather.icon + '</div>';
      html += '<div class="fc-temp">' + Math.round(daily.temperature_2m_max[i]) + '°</div>';
      html += '<div class="fc-low">↓ ' + Math.round(daily.temperature_2m_min[i]) + '°</div>';
      html += '<div class="fc-rain">💧 ' + daily.precipitation_probability_max[i] + '%</div>';
      html += '</div>';
    }

    grid.innerHTML = html;
  }

  function updateAdvisory(data) {
    var current = data.current;
    var daily = data.daily;
    var temp = current.temperature_2m;
    var rain = current.rain || 0;
    var wind = current.wind_speed_10m;
    var code = current.weather_code;
    var visibility = current.visibility / 1000;

    var statusDot = document.querySelector('.status-dot');
    var statusText = document.querySelector('.status-text');
    var tipsEl = document.getElementById('advisoryTips');

    var tips = [];
    var status = 'excellent';
    var statusLabel = 'Excellent for Trekking 🟢';

    var isRaining = (rain > 0.5 || code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82 || code >= 95);
    var isDrizzle = (code === 51 || code === 53 || code === 55 || (rain > 0 && rain <= 0.5));
    var isStorm = (code >= 95);
    var isSnow = (code >= 71 && code <= 86);
    var isFog = (code === 45 || code === 48 || visibility < 1);

    if (isStorm || rain > 10 || wind > 35 || temp < -5) {
      status = 'avoid';
      statusLabel = 'Avoid Trekking 🔴';
      tips.push('🚫 <strong>Trekking is NOT recommended today.</strong>');
    } else if (isRaining || rain > 5 || wind > 25 || temp < 0 || isSnow || isFog) {
      status = 'caution';
      statusLabel = 'Proceed with Caution 🟠';
    } else if (isDrizzle || rain > 1 || wind > 15 || temp < 5 || visibility < 5) {
      status = 'good';
      statusLabel = 'Good for Trekking 🟡';
    } else {
      status = 'excellent';
      statusLabel = 'Excellent for Trekking 🟢';
    }

    if (isStorm) {
      tips.push('⛈️ <strong>Thunderstorm expected.</strong> Do NOT trek. Stay indoors and wait for weather to clear.');
    }
    if (rain > 5) {
      tips.push('🌧️ <strong>Heavy rain (' + rain.toFixed(1) + 'mm).</strong> Path may be slippery and dangerous. Carry full rain gear if you must go.');
    }
    if (isRaining && !isStorm) {
      tips.push('🌧️ Rain expected. Carry a waterproof jacket and wear trekking shoes with good grip. Path will be slippery — use a trekking stick.');
    }
    if (isDrizzle) {
      tips.push('🌦️ Light drizzle expected. Carry a raincoat or poncho. The trek is still possible but be cautious on wet sections.');
    }
    if (isSnow) {
      tips.push('❄️ Snow expected! Wear waterproof boots with good traction. Multiple layers essential. Visibility may be reduced.');
    }
    if (isFog) {
      tips.push('🌫️ Low visibility due to fog. Stay on the main path. Do not take shortcuts. Use a torch even during daytime.');
    }
    if (wind > 20) {
      tips.push('💨 Windy conditions (' + Math.round(wind) + ' km/h). Secure loose items. Windproof jacket recommended. Be careful on exposed ridges.');
    }
    if (temp < 0) {
      tips.push('🥶 Temperature below freezing! Wear thermal innerwear, heavy jacket, gloves, woolen cap, and multiple layers. Risk of frostbite.');
    } else if (temp < 5) {
      tips.push('🧥 Very cold (below 5°C). Heavy jacket, thermal innerwear, gloves, and woolen cap required.');
    } else if (temp < 10) {
      tips.push('🧥 Cool weather. Carry a warm jacket — especially for early morning and evening.');
    }

    tips.push('🏔️ <strong>Altitude Alert:</strong> At 3,583m, some visitors may experience mild altitude sickness — headache, nausea, dizziness. Drink plenty of water, avoid rushing the trek, take breaks every 2-3 km, and seek medical attention if symptoms become severe. The medical aid post is near the temple entrance.');

    if (status === 'excellent') {
      tips.push('✅ <strong>Great trekking weather!</strong> Clear skies and comfortable temperatures. Still carry: water bottle, light jacket, sunscreen, and sunglasses.');
    }

    statusDot.className = 'status-dot ' + status;
    statusText.textContent = statusLabel;
    tipsEl.innerHTML = tips.join('<br><br>');
  }

  function updateTomorrowCard(data) {
    var daily = data.daily;
    var tomorrowRainProb = daily.precipitation_probability_max[1] || 0;
    var tomorrowCode = daily.weather_code[1];
    var tomorrowTempMin = Math.round(daily.temperature_2m_min[1]);
    var tomorrowTempMax = Math.round(daily.temperature_2m_max[1]);
    var weather = getWeatherInfo(tomorrowCode);
    
    var content = document.getElementById('tomorrowContent');
    if (!content) return;

    var html = '';
    html += '<p><strong>' + weather.icon + ' ' + weather.condition + '</strong> · ' + tomorrowTempMin + '°C to ' + tomorrowTempMax + '°C</p>';
    
    if (tomorrowRainProb < 30 && tomorrowCode < 51) {
      html += '<p class="good-news">✅ <strong>Best time to start:</strong> 5:30 AM – 8:00 AM</p>';
      html += '<p>Clear skies and cooler temperatures. Great day for trekking!</p>';
    } else if (tomorrowRainProb < 60) {
      html += '<p class="caution-news">⚠️ <strong>Best time to start:</strong> 5:30 AM – 7:00 AM</p>';
      html += '<p>' + tomorrowRainProb + '% chance of rain later. Start early, carry rain gear.</p>';
    } else {
      html += '<p class="bad-news">🌧️ <strong>High rain probability:</strong> ' + tomorrowRainProb + '%</p>';
      html += '<p>Start by 5:00 AM if trekking. Full rain protection required. Consider postponing.</p>';
    }
    
    content.innerHTML = html;
  }

  function updateTravelScore(data) {
    var current = data.current;
    var daily = data.daily;
    var temp = current.temperature_2m;
    var rain = current.rain || 0;
    var wind = current.wind_speed_10m;
    var code = current.weather_code;
    var visibility = current.visibility / 1000;
    var humidity = current.relative_humidity_2m;

    var weatherScore = 10;
    if (code >= 95) weatherScore = 0;
    else if (code === 65 || code === 82) weatherScore = 2;
    else if (code === 61 || code === 63 || code === 80 || code === 81) weatherScore = 4;
    else if (code === 51 || code === 53 || code === 55) weatherScore = 6;
    else if (code === 45 || code === 48) weatherScore = 7;
    else if (code === 3) weatherScore = 8;
    else if (code === 2) weatherScore = 9;
    if (wind > 25) weatherScore -= 2;
    if (visibility < 2) weatherScore -= 1;

    var month = new Date().getMonth() + 1;
    var crowdScore = 5;
    if (month === 5 || month === 6) crowdScore = 3;
    else if (month === 4 || month === 10) crowdScore = 6;
    else if (month === 7 || month === 8) crowdScore = 8;
    else if (month === 9) crowdScore = 9;
    else crowdScore = 10;

    var trekScore = 10;
    if (rain > 5) trekScore = 3;
    else if (rain > 1) trekScore = 5;
    else if (rain > 0) trekScore = 7;
    if (wind > 30) trekScore -= 2;
    if (code >= 71 && code <= 86) trekScore -= 3;
    if (visibility < 1) trekScore -= 2;

    var roadStatus = 'Open';
    var roadScore = 10;
    if (code >= 95 || rain > 20) { roadStatus = 'Closed'; roadScore = 0; }
    else if (rain > 10 || code >= 71) { roadStatus = 'Partially Open'; roadScore = 5; }

    var heliStatus = 'Operating';
    var heliScore = 10;
    if (code >= 95 || wind > 30 || visibility < 1) { heliStatus = 'Grounded'; heliScore = 0; }
    else if (wind > 20 || visibility < 3) { heliStatus = 'Limited'; heliScore = 5; }

    var landslideRisk = 'Low';
    var landslideScore = 9;
    if (rain > 15) { landslideRisk = 'High'; landslideScore = 2; }
    else if (rain > 5) { landslideRisk = 'Moderate'; landslideScore = 5; }

    var overall = Math.round((weatherScore + crowdScore + trekScore + roadScore + heliScore + landslideScore) / 6 * 10) / 10;
    if (overall < 0) overall = 0;
    if (overall > 10) overall = 10;

    document.getElementById('scoreBig').textContent = overall.toFixed(1);
    document.getElementById('scoreWeather').textContent = weatherScore + '/10';
    document.getElementById('scoreCrowd').textContent = crowdScore + '/10';
    document.getElementById('scoreTrek').textContent = trekScore + '/10';
    document.getElementById('scoreRoad').textContent = roadStatus;
    document.getElementById('scoreHeli').textContent = heliStatus;
    document.getElementById('scoreLandslide').textContent = landslideRisk;

    var recEl = document.getElementById('scoreRecommendation');
    if (overall >= 8) {
      recEl.className = 'score-recommendation great';
      recEl.textContent = '🟢 Great day for the yatra! All conditions are favorable.';
    } else if (overall >= 6) {
      recEl.className = 'score-recommendation good';
      recEl.textContent = '🟡 Good day overall. Some conditions need attention — check details above.';
    } else if (overall >= 4) {
      recEl.className = 'score-recommendation caution';
      recEl.textContent = '🟠 Proceed with caution. Several factors are unfavorable. Consider waiting.';
    } else {
      recEl.className = 'score-recommendation avoid';
      recEl.textContent = '🔴 Not recommended today. Please postpone your trek for safety.';
    }
  }

  function updatePacking(data) {
    var current = data.current;
    var temp = current.temperature_2m;
    var daily = data.daily;
    
    var maxRainProb = 0;
    for (var i = 0; i < Math.min(daily.time.length, 5); i++) {
      if (daily.precipitation_probability_max[i] > maxRainProb) {
        maxRainProb = daily.precipitation_probability_max[i];
      }
    }

    var hasSnow = false;
    for (var j = 0; j < Math.min(daily.time.length, 5); j++) {
      if (daily.weather_code[j] >= 71 && daily.weather_code[j] <= 86) {
        hasSnow = true;
      }
    }

    var items = [];

    items.push({ icon: '🎒', title: 'Trekking Backpack (20-30L)', desc: 'Lightweight with rain cover. Enough for water, snacks, jacket, and camera.' });
    items.push({ icon: '👟', title: 'Trekking Shoes', desc: 'Waterproof, good grip. Break them in before the trip — new shoes cause blisters.' });
    items.push({ icon: '💧', title: 'Water Bottle (2L minimum)', desc: 'Stay hydrated. Refill at every stop. ORS packets recommended.' });

    if (temp < 5) {
      items.push({ icon: '🧥', title: 'Heavy Down Jacket', desc: 'Temperatures near freezing. Multiple layers: thermal → fleece → jacket.' });
      items.push({ icon: '🧤', title: 'Gloves & Woolen Cap', desc: 'Essential. Ears and fingers are most vulnerable to cold.' });
    } else if (temp < 12) {
      items.push({ icon: '🧥', title: 'Warm Jacket or Fleece', desc: 'Cool temperatures. Layer with a sweater or hoodie underneath.' });
    }

    if (maxRainProb > 50) {
      items.push({ icon: '🌂', title: 'Raincoat / Poncho', desc: maxRainProb + '% chance of rain. Get a reusable poncho (₹100-200) — not disposable plastic.' });
      items.push({ icon: '📱', title: 'Waterproof Phone Pouch', desc: 'Protect your phone from rain. Available at Gaurikund for ₹50-100.' });
    }

    if (hasSnow) {
      items.push({ icon: '❄️', title: 'Snow Gear', desc: 'Snow expected! Waterproof pants, snow gaiters, and extra socks.' });
    }

    items.push({ icon: '🔦', title: 'Headlamp / Torch', desc: 'Essential for early morning trek. Phone flashlight works but drains battery.' });
    items.push({ icon: '🔋', title: 'Power Bank (10,000+ mAh)', desc: 'No charging points on the trek. Fully charge before starting.' });
    items.push({ icon: '💊', title: 'Basic Medical Kit', desc: 'Band-aids, pain reliever, altitude sickness medicine (Diamox — consult doctor), antiseptic cream.' });
    items.push({ icon: '🍫', title: 'Energy Snacks', desc: 'Dry fruits, chocolates, energy bars. Available at Gaurikund but cheaper to bring from home.' });

    var grid = document.getElementById('packingGrid');
    var html = '';
    items.forEach(function(item) {
      html += '<div class="packing-item">';
      html += '<span class="packing-icon">' + item.icon + '</span>';
      html += '<div>';
      html += '<div class="packing-item-title">' + item.title + '</div>';
      html += '<div class="packing-item-desc">' + item.desc + '</div>';
      html += '</div>';
      html += '</div>';
    });
    grid.innerHTML = html;
  }

  function updateAlerts(data) {
    var daily = data.daily;
    var alerts = [];

    for (var i = 0; i < Math.min(daily.time.length, 7); i++) {
      var date = new Date(daily.time[i]);
      var dayName = i === 0 ? 'Today' : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
      var code = daily.weather_code[i];
      var rainProb = daily.precipitation_probability_max[i];
      var rainSum = daily.rain_sum[i] || 0;

      if (code >= 95) {
        alerts.push({ icon: '⛈️', text: '<strong>' + dayName + ':</strong> Thunderstorm expected. Do NOT trek. Stay indoors.' });
      } else if (rainSum > 10) {
        alerts.push({ icon: '🌧️', text: '<strong>' + dayName + ':</strong> Heavy rain (' + rainSum.toFixed(1) + 'mm). Trek dangerous — path may wash out.' });
      } else if (rainProb > 70) {
        alerts.push({ icon: '🌧️', text: '<strong>' + dayName + ':</strong> ' + rainProb + '% chance of rain. Carry full rain gear if trekking.' });
      }

      if (daily.temperature_2m_max[i] < 0) {
        alerts.push({ icon: '🥶', text: '<strong>' + dayName + ':</strong> Maximum temperature below freezing! Extreme cold. Full winter gear required.' });
      }
    }

    var alertsSection = document.getElementById('alertsSection');
    var alertsList = document.getElementById('alertsList');

    if (alerts.length > 0) {
      alertsSection.style.display = 'block';
      var html = '';
      alerts.forEach(function(alert) {
        html += '<div class="alert-item">';
        html += '<span class="alert-icon">' + alert.icon + '</span>';
        html += '<span class="alert-text">' + alert.text + '</span>';
        html += '</div>';
      });
      alertsList.innerHTML = html;
    } else {
      alertsSection.style.display = 'none';
    }
  }

  function updateTimestamp() {
    var now = new Date();
    var timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    var dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    document.getElementById('lastUpdated').textContent = 'Updated: ' + dateStr + ' at ' + timeStr + ' IST';
  }

  function showError() {
    document.getElementById('currentTemp').textContent = '--°C';
    document.getElementById('currentCondition').textContent = 'Unable to load weather';
    document.getElementById('lastUpdated').textContent = 'Please check your internet connection';
    document.getElementById('advisoryTips').textContent = 'Weather data temporarily unavailable. Please refresh the page.';
  }

  // Initial fetch
  fetchWeather();

  // Auto-refresh every 30 minutes
  setInterval(fetchWeather, 30 * 60 * 1000);

})();