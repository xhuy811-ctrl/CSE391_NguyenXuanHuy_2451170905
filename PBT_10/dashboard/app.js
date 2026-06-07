const refreshAllBtn = document.getElementById('refreshAll');
const overallStatus = document.getElementById('overallStatus');
const loadTimeEl = document.getElementById('loadTime');

const widgets = [
  {id:0, name:'users', el: document.getElementById('widget-0')},
  {id:1, name:'randomUsers', el: document.getElementById('widget-1')},
  {id:2, name:'dogs', el: document.getElementById('widget-2')},
  {id:3, name:'country', el: document.getElementById('widget-3')}
];

function setWidgetLoading(idx, isLoading){
  const body = widgets[idx].el.querySelector('.widget-body');
  body.innerHTML = isLoading ? '<div class="spinner small"></div>' : '';
}

function renderWidget(idx, data){
  const body = widgets[idx].el.querySelector('.widget-body');
  if(idx === 0){ // users
    const list = document.createElement('div'); list.className='item-list';
    data.slice(0,8).forEach(u=>{ const d=document.createElement('div'); d.className='user-item'; d.textContent = `${u.name} — ${u.email}`; list.appendChild(d)});
    body.innerHTML = ''; body.appendChild(list);
  } else if(idx ===1){ // random users
    const list = document.createElement('div'); list.className='item-list';
    data.results.forEach(u=>{ const d=document.createElement('div'); d.className='user-item'; d.textContent = `${u.name.first} ${u.name.last} — ${u.email}`; list.appendChild(d)});
    body.innerHTML = ''; body.appendChild(list);
  } else if(idx===2){ // dogs
    const thumbs = document.createElement('div'); thumbs.className='thumbs';
    data.message.forEach(src=>{ const img = document.createElement('img'); img.src = src; thumbs.appendChild(img)});
    body.innerHTML = ''; body.appendChild(thumbs);
  } else if(idx===3){ // country
    body.innerHTML = `<div><strong>${data[0].name.common}</strong> — ${data[0].region}<br/>Population: ${data[0].population.toLocaleString()}</div>`;
  }
}

function renderWidgetError(idx, message){
  const body = widgets[idx].el.querySelector('.widget-body');
  body.innerHTML = `<div style="color:#b00020">Error: ${escapeHtml(message||'Unknown')}</div>`;
}

function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

async function loadDashboard(){
  // show overall loading
  overallStatus.classList.remove('hidden');
  loadTimeEl.textContent = '';
  widgets.forEach((w,i)=> setWidgetLoading(i,true));

  const start = Date.now();
  const promises = [
    fetch('https://jsonplaceholder.typicode.com/users').then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); }),
    fetch('https://randomuser.me/api/?results=5').then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); }),
    fetch('https://dog.ceo/api/breeds/image/random/6').then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); }),
    fetch('https://restcountries.com/v3.1/name/vietnam').then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); })
  ];

  const results = await Promise.allSettled(promises);

  results.forEach((res, idx)=>{
    if(res.status === 'fulfilled') renderWidget(idx, res.value);
    else renderWidgetError(idx, res.reason && res.reason.message ? res.reason.message : String(res.reason));
  });

  const ms = Date.now() - start;
  loadTimeEl.textContent = `Data loaded in ${ms} ms`;
  overallStatus.classList.add('hidden');
}

refreshAllBtn.addEventListener('click', loadDashboard);

// initial
loadDashboard();
