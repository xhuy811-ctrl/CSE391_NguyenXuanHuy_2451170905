const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const statusEl = document.getElementById('status');
const statusText = document.getElementById('statusText');
const resultEl = document.getElementById('result');
const iconEl = document.getElementById('icon');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const descEl = document.getElementById('desc');
const errorEl = document.getElementById('error');
const historyList = document.getElementById('historyList');

const STORAGE_KEY = 'weather_history_v1';

function setLoading(loading, message = 'Đang tải...'){
  if(loading){
    statusText.textContent = message;
    statusEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    searchBtn.disabled = true;
    cityInput.disabled = true;
  } else {
    statusEl.classList.add('hidden');
    searchBtn.disabled = false;
    cityInput.disabled = false;
  }
}

function showError(msg){
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
  resultEl.classList.add('hidden');
}

function showResult({temp_C, humidity, desc, icon}){
  tempEl.textContent = temp_C;
  humidityEl.textContent = humidity;
  descEl.textContent = desc;
  if(icon){
    iconEl.src = icon;
    iconEl.classList.remove('hidden');
  } else {
    iconEl.classList.add('hidden');
  }
  resultEl.classList.remove('hidden');
}

async function fetchWeather(city){
  const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
  const res = await fetch(url);
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // Validate structure
  const current = data.current_condition && data.current_condition[0];
  if(!current) throw new Error('Không nhận được dữ liệu thời tiết');
  const temp_C = current.temp_C;
  const humidity = current.humidity;
  const desc = (current.weatherDesc && current.weatherDesc[0] && current.weatherDesc[0].value) || '';
  const icon = (current.weatherIconUrl && current.weatherIconUrl[0] && current.weatherIconUrl[0].value) || '';
  return {temp_C, humidity, desc, icon};
}

function loadHistory(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e){ return [] }
}

function saveHistory(city){
  const list = loadHistory();
  const normalized = city.trim();
  if(!normalized) return;
  // remove duplicates
  const filtered = list.filter(c => c.toLowerCase() !== normalized.toLowerCase());
  filtered.unshift(normalized);
  const limited = filtered.slice(0,5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  renderHistory();
}

function renderHistory(){
  const list = loadHistory();
  historyList.innerHTML = '';
  if(list.length === 0){
    historyList.innerHTML = '<li style="cursor:default;color:var(--muted)">Chưa có</li>';
    return;
  }
  for(const city of list){
    const li = document.createElement('li');
    li.textContent = city;
    li.addEventListener('click',()=>{
      cityInput.value = city;
      doSearch(city);
    });
    historyList.appendChild(li);
  }
}

async function doSearch(city){
  const q = (city || cityInput.value || '').trim();
  if(!q) return showError('Nhập tên thành phố');
  setLoading(true);
  try{
    const data = await fetchWeather(q);
    showResult(data);
    saveHistory(q);
  } catch(err){
    showError(err.message || 'Lỗi khi lấy dữ liệu');
  } finally{
    setLoading(false);
  }
}

searchBtn.addEventListener('click', ()=> doSearch());
cityInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') doSearch(); });

// init
renderHistory();
