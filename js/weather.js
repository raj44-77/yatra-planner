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
    var temp = current.temperature_2m;
    var rain = current.rain || 0;
    var wind = current.wind_speed_10m;
    var code = current.weather_code;

    var statusDot = document.querySelector('.status-dot');
    var statusText = document.querySelector('.status-text');
    var tipsEl = document.getElementById('advisoryTips');

    var tips = [];
    var status = 'good';

    // Rain check
    if (rain > 5 || code === 65 || code === 82 || code >= 95) {
      status = 'bad';
      tips.push('🚫 <strong>Trek NOT recommended.</strong> Heavy rain/thunderstorm expected. Wait for better conditions.');
    } else if (rain > 1 || code === 61 || code === 63 || code === 80 || code === 81) {
      status = 'caution';
      tips.push('⚠️ Light rain expected. Trek possible but carry a good raincoat. Path may be slippery.');
    }

    // Temperature check
    if (temp < 0) {
      status = 'bad';
      tips.push('🥶 Temperature below freezing! Risk of frostbite. Wear multiple layers, gloves, and warm cap.');
    } else if (temp < 5) {
      if (status !== 'bad') status = 'caution';
      tips.push('🧥 Very cold (below 5°C). Heavy jacket, thermal innerwear, gloves, and woolen cap required.');
    } else if (temp < 10) {
      tips.push('🧥 Cool weather. Carry a warm jacket — especially for early morning/evening.');
    }

    // Wind check
    if (wind > 30) {
      status = 'bad';
      tips.push('💨 Strong winds (>30 km/h). Dangerous on exposed ridges. Postpone trek if possible.');
    } else if (wind > 20) {
      if (status !== 'bad') status = 'caution';
      tips.push('💨 Windy conditions. Secure your belongings. Windproof jacket recommended.');
    }

    // Good conditions
    if (tips.length === 0) {
      tips.push('✅ <strong>Great trekking weather!</strong> Clear skies and comfortable temperature.');
      tips.push('🎒 Still carry: water bottle, light jacket, sunscreen, sunglasses.');
    }

    // Update DOM
    statusDot.className = 'status-dot ' + status;
    
    var statusMessages = { good: 'Good for Trekking ✅', caution: 'Proceed with Caution ⚠️', bad: 'Not Recommended 🚫' };
    statusText.textContent = statusMessages[status];
    tipsEl.innerHTML = tips.join('<br><br>');
  }

  function updatePacking(data) {
    var current = data.current;
    var temp = current.temperature_2m;
    var daily = data.daily;
    
    // Check next 5 days for rain
    var maxRainProb = 0;
    for (var i = 0; i < Math.min(daily.time.length, 5); i++) {
      if (daily.precipitation_probability_max[i] > maxRainProb) {
        maxRainProb = daily.precipitation_probability_max[i];
      }
    }

    // Check for snow
    var hasSnow = false;
    for (var j = 0; j < Math.min(daily.time.length, 5); j++) {
      if (daily.weather_code[j] >= 71 && daily.weather_code[j] <= 86) {
        hasSnow = true;
      }
    }

    var items = [];

    // Always needed
    items.push({ icon: '🎒', title: 'Trekking Backpack (20-30L)', desc: 'Lightweight with rain cover. Enough for water, snacks, jacket, and camera.' });
    items.push({ icon: '👟', title: 'Trekking Shoes', desc: 'Waterproof, good grip. Break them in before the trip — new shoes cause blisters.' });
    items.push({ icon: '💧', title: 'Water Bottle (2L minimum)', desc: 'Stay hydrated. Refill at every stop. ORS packets recommended.' });

    // Temperature-based
    if (temp < 5) {
      items.push({ icon: '🧥', title: 'Heavy Down Jacket', desc: 'Temperatures near freezing. Multiple layers: thermal → fleece → jacket.' });
      items.push({ icon: '🧤', title: 'Gloves & Woolen Cap', desc: 'Essential. Ears and fingers are most vulnerable to cold.' });
    } else if (temp < 12) {
      items.push({ icon: '🧥', title: 'Warm Jacket or Fleece', desc: 'Cool temperatures. Layer with a sweater or hoodie underneath.' });
    }

    // Rain-based
    if (maxRainProb > 50) {
      items.push({ icon: '🌂', title: 'Raincoat / Poncho', desc: maxRainProb + '% chance of rain. Get a reusable poncho (₹100-200) — not disposable plastic.' });
      items.push({ icon: '📱', title: 'Waterproof Phone Pouch', desc: 'Protect your phone from rain. Available at Gaurikund for ₹50-100.' });
    }

    // Snow-based
    if (hasSnow) {
      items.push({ icon: '❄️', title: 'Snow Gear', desc: 'Snow expected! Waterproof pants, snow gaiters, and extra socks.' });
    }

    // General
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