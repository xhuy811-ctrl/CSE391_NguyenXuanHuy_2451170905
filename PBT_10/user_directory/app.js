const searchInput = document.getElementById('searchInput');
const newBtn = document.getElementById('newBtn');
const formSection = document.getElementById('formSection');
const userForm = document.getElementById('userForm');
const formTitle = document.getElementById('formTitle');
const cancelBtn = document.getElementById('cancelBtn');
const usersContainer = document.getElementById('usersContainer');
const loader = document.getElementById('loader');
const toast = document.getElementById('toast');

let USERS = [];

const ui = {
  renderUsers(users){
    usersContainer.innerHTML = '';
    if(!users || users.length === 0){
      usersContainer.innerHTML = '<div class="card">Không có user</div>';
      return;
    }
    for(const u of users){
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <div>
          <div><strong>${escapeHtml(u.name)}</strong></div>
          <div class="meta">${escapeHtml(u.email)} — ${escapeHtml(u.username||'')}</div>
        </div>
        <div class="actions">
          <button class="btn edit">Edit</button>
          <button class="btn danger delete">Delete</button>
        </div>
      `;
      el.querySelector('.edit').addEventListener('click',()=> openEdit(u));
      el.querySelector('.delete').addEventListener('click',()=> confirmDelete(u));
      usersContainer.appendChild(el);
    }
  },
  showLoading(){
    loader.innerHTML = '';
    for(let i=0;i<6;i++){const s=document.createElement('div');s.className='skeleton';loader.appendChild(s)}
    loader.classList.remove('hidden');
    usersContainer.classList.add('hidden');
  },
  hideLoading(){
    loader.classList.add('hidden');
    usersContainer.classList.remove('hidden');
  },
  showError(message){
    showToast(message, true);
  },
  showSuccess(message){
    showToast(message, false);
  }
};

function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }

function showToast(msg, isError=false){
  toast.textContent = msg;
  toast.style.background = isError ? '#b00020' : '#111';
  toast.classList.remove('hidden');
  setTimeout(()=>toast.classList.add('hidden'),3000);
}

async function loadUsers(){
  ui.showLoading();
  try{
    const users = await api.getUsers();
    USERS = users;
    ui.renderUsers(USERS);
  } catch(err){
    ui.showError('Lỗi khi tải users: '+err.message);
  } finally{
    ui.hideLoading();
  }
}

function openNew(){
  userForm.reset();
  userForm.id.value = '';
  formTitle.textContent = 'Thêm user';
  formSection.classList.remove('hidden');
}

function openEdit(user){
  userForm.id.value = user.id;
  userForm.name.value = user.name || '';
  userForm.username.value = user.username || '';
  userForm.email.value = user.email || '';
  userForm.phone.value = user.phone || '';
  formTitle.textContent = 'Chỉnh sửa user';
  formSection.classList.remove('hidden');
}

function closeForm(){ formSection.classList.add('hidden'); }

async function confirmDelete(user){
  if(!confirm(`Xóa user "${user.name}"?`)) return;
  try{
    await api.deleteUser(user.id);
    // Update local state
    USERS = USERS.filter(u=>u.id!=user.id);
    ui.renderUsers(USERS);
    ui.showSuccess('Đã xóa');
  } catch(err){ ui.showError('Xóa thất bại: '+err.message) }
}

userForm.addEventListener('submit',async (e)=>{
  e.preventDefault();
  const id = userForm.id.value;
  const payload = {name:userForm.name.value,username:userForm.username.value,email:userForm.email.value,phone:userForm.phone.value};
  try{
    if(id){
      const updated = await api.updateUser(id,payload);
      // update local
      USERS = USERS.map(u=>u.id==id? {...u, ...updated}: u);
      ui.renderUsers(USERS);
      ui.showSuccess('Cập nhật thành công');
    } else {
      const created = await api.createUser(payload);
      // JSONPlaceholder returns id=101 etc.; append to local list
      USERS.unshift(created);
      ui.renderUsers(USERS);
      ui.showSuccess('Tạo user thành công');
    }
    closeForm();
  } catch(err){ ui.showError('Lưu thất bại: '+err.message) }
});

cancelBtn.addEventListener('click', closeForm);
newBtn.addEventListener('click', openNew);

searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  if(!q) return ui.renderUsers(USERS);
  const filtered = USERS.filter(u=> (u.name||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q));
  ui.renderUsers(filtered);
});

// init
loadUsers();
