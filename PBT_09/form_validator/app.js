// Form Validator - real-time
const form = document.getElementById('regForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

const nameStatus = document.getElementById('nameStatus');
const emailStatus = document.getElementById('emailStatus');
const passwordStatus = document.getElementById('passwordStatus');
const confirmStatus = document.getElementById('confirmStatus');
const phoneStatus = document.getElementById('phoneStatus');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const confirmError = document.getElementById('confirmError');
const phoneError = document.getElementById('phoneError');

const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const modal = document.getElementById('modal');

let valid = { name:false, email:false, password:false, confirm:false, phone:false };

function setStatus(el, ok){ el.classList.remove('ok','bad'); if(ok===true) el.classList.add('ok'); if(ok===false) el.classList.add('bad'); }

// Name validation
nameInput.addEventListener('input', ()=>{
  const v = nameInput.value.trim();
  if(v.length>=2 && v.length<=50){ setStatus(nameStatus,true); nameError.textContent=''; valid.name=true; }
  else { setStatus(nameStatus,false); nameError.textContent='Tên phải từ 2 đến 50 ký tự'; valid.name=false; }
  updateSubmit();
});

// Email validation
function validateEmail(email){
  return /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
}
emailInput.addEventListener('input', ()=>{
  const v = emailInput.value.trim();
  if(!v){ setStatus(emailStatus,false); emailError.textContent='Email bắt buộc'; valid.email=false; }
  else if(!validateEmail(v)){ setStatus(emailStatus,false); emailError.textContent='Email không hợp lệ'; valid.email=false; }
  else { setStatus(emailStatus,true); emailError.textContent=''; valid.email=true; }
  updateSubmit();
});

// Password strength
function scorePassword(p){
  let score = 0;
  if(p.length>=8) score++;
  if(/[A-Z]/.test(p)) score++;
  if(/[0-9]/.test(p)) score++;
  if(/[^A-Za-z0-9]/.test(p)) score++;
  return score;
}
passwordInput.addEventListener('input', ()=>{
  const p = passwordInput.value;
  const s = scorePassword(p);
  strengthBar.classList.remove('weak','medium','strong');
  if(s<=1){ strengthBar.classList.add('weak'); strengthText.textContent='Yếu'; valid.password=false; setStatus(passwordStatus,false); }
  else if(s===2 || s===3){ strengthBar.classList.add('medium'); strengthText.textContent='Trung bình'; valid.password=true; setStatus(passwordStatus,true); }
  else { strengthBar.classList.add('strong'); strengthText.textContent='Mạnh'; valid.password=true; setStatus(passwordStatus,true); }
  // update confirm check live
  checkConfirm();
  updateSubmit();
});

function checkConfirm(){
  const a = passwordInput.value;
  const b = confirmInput.value;
  if(!b){ setStatus(confirmStatus,false); confirmError.textContent=''; valid.confirm=false; return; }
  if(a===b){ setStatus(confirmStatus,true); confirmError.textContent=''; valid.confirm=true; }
  else { setStatus(confirmStatus,false); confirmError.textContent='Mật khẩu không khớp'; valid.confirm=false; }
}
confirmInput.addEventListener('input', ()=>{ checkConfirm(); updateSubmit(); });

// Phone formatting xxxx-xxx-xxx (digits only)
phoneInput.addEventListener('input', (e)=>{
  const raw = phoneInput.value.replace(/\D/g,'').slice(0,10);
  let formatted = raw;
  if(raw.length>4 && raw.length<=7) formatted = raw.slice(0,4)+'-'+raw.slice(4);
  else if(raw.length>7) formatted = raw.slice(0,4)+'-'+raw.slice(4,7)+'-'+raw.slice(7);
  phoneInput.value = formatted;

  // validate
  if(raw.length===10){ setStatus(phoneStatus,true); phoneError.textContent=''; valid.phone=true; }
  else { setStatus(phoneStatus,false); phoneError.textContent='Số điện thoại phải có 10 chữ số'; valid.phone=false; }
  updateSubmit();
});

function updateSubmit(){
  const ok = Object.values(valid).every(v=>v===true);
  submitBtn.disabled = !ok;
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  // show modal
  const data = { name: nameInput.value.trim(), email: emailInput.value.trim(), phone: phoneInput.value.trim() };
  showModal(data);
});

function showModal(data){
  modal.innerHTML = '';
  modal.classList.add('show');
  const panel = document.createElement('div'); panel.className='panel';
  const h = document.createElement('h2'); h.textContent = 'Đăng ký thành công!';
  const p1 = document.createElement('p'); p1.textContent = 'Tên: '+data.name;
  const p2 = document.createElement('p'); p2.textContent = 'Email: '+data.email;
  const p3 = document.createElement('p'); p3.textContent = 'Phone: '+data.phone;
  const ok = document.createElement('button'); ok.textContent='Đóng'; ok.className='btn';
  ok.addEventListener('click', closeModal);
  panel.append(h,p1,p2,p3,ok);
  modal.appendChild(panel);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
}
function closeModal(){ modal.classList.remove('show'); }

// initial
updateSubmit();
