// Product Catalog - all rendering via JS
const products = [
  { id:1, name:'iPhone 16', price:25990000, category:'phone', image:'https://placehold.co/400x300?text=iPhone+16', rating:4.5, inStock:true },
  { id:2, name:'Galaxy S24', price:19990000, category:'phone', image:'https://placehold.co/400x300?text=Galaxy+S24', rating:4.2, inStock:true },
  { id:3, name:'Pixel 8', price:17990000, category:'phone', image:'https://placehold.co/400x300?text=Pixel+8', rating:4.3, inStock:false },
  { id:4, name:'MacBook Air', price:29990000, category:'laptop', image:'https://placehold.co/400x300?text=MacBook+Air', rating:4.7, inStock:true },
  { id:5, name:'Dell XPS', price:24990000, category:'laptop', image:'https://placehold.co/400x300?text=Dell+XPS', rating:4.4, inStock:true },
  { id:6, name:'HP Envy', price:16990000, category:'laptop', image:'https://placehold.co/400x300?text=HP+Envy', rating:4.0, inStock:true },
  { id:7, name:'Sony Headphones', price:2990000, category:'audio', image:'https://placehold.co/400x300?text=Sony+Headphones', rating:4.6, inStock:true },
  { id:8, name:'Bose Speakers', price:4990000, category:'audio', image:'https://placehold.co/400x300?text=Bose+Speakers', rating:4.5, inStock:false },
  { id:9, name:'JBL Mini', price:990000, category:'audio', image:'https://placehold.co/400x300?text=JBL+Mini', rating:4.1, inStock:true },
  { id:10, name:'iPad Pro', price:18990000, category:'tablet', image:'https://placehold.co/400x300?text=iPad+Pro', rating:4.6, inStock:true },
  { id:11, name:'Galaxy Tab', price:12990000, category:'tablet', image:'https://placehold.co/400x300?text=Galaxy+Tab', rating:4.2, inStock:true },
  { id:12, name:'Amazon Fire', price:3990000, category:'tablet', image:'https://placehold.co/400x300?text=Amazon+Fire', rating:3.9, inStock:true }
];

let state = { query:'', category:'all', sort:'default', cart:0 };

// build layout
const app = document.createElement('div'); app.className='app';
const header = document.createElement('div'); header.className='header';
const title = document.createElement('h1'); title.textContent='Product Catalog';
const controls = document.createElement('div'); controls.className='controls';

const search = document.createElement('input'); search.className='search'; search.placeholder='Search products...';
const sort = document.createElement('select'); sort.className='select';
['default','price-asc','price-desc','name-asc','rating-desc'].forEach(v=>{
  const o=document.createElement('option'); o.value=v; o.textContent = ({'default':'Sort','price-asc':'Giá tăng','price-desc':'Giá giảm','name-asc':'Tên A-Z','rating-desc':'Đánh giá cao'})[v] || v; sort.appendChild(o);
});
const cartBtn = document.createElement('button'); cartBtn.className='btn cart'; cartBtn.textContent='🛒';
const badge = document.createElement('span'); badge.className='badge'; badge.style.display='none'; cartBtn.appendChild(badge);
const darkToggle = document.createElement('button'); darkToggle.className='select'; darkToggle.textContent='Dark';

controls.append(search, sort, cartBtn, darkToggle);
header.append(title, controls);
app.appendChild(header);

// categories
const cats = document.createElement('div'); cats.className='categories';
const categories = ['all','phone','laptop','audio','tablet'];
categories.forEach(c=>{
  const b=document.createElement('button'); b.className='cat-btn'; b.textContent = c==='all'?'All':c[0].toUpperCase()+c.slice(1); b.dataset.cat=c; if(c==='all') b.classList.add('active');
  cats.appendChild(b);
});
app.appendChild(cats);

// grid
const grid = document.createElement('div'); grid.className='grid'; app.appendChild(grid);

// modal container
let modalOverlay = null;

function renderProducts(){
  grid.innerHTML='';
  let list = products.slice();
  // search
  if(state.query) list = list.filter(p=>p.name.toLowerCase().includes(state.query.toLowerCase()));
  // category
  if(state.category !== 'all') list = list.filter(p=>p.category===state.category);
  // sort
  if(state.sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
  if(state.sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
  if(state.sort === 'name-asc') list.sort((a,b)=>a.name.localeCompare(b.name));
  if(state.sort === 'rating-desc') list.sort((a,b)=>b.rating-a.rating);

  list.forEach(p=>{
    const card = document.createElement('div'); card.className='card'; card.dataset.id=p.id;
    const img = document.createElement('img'); img.src=p.image; img.alt=p.name;
    const name = document.createElement('div'); name.className='name'; name.textContent=p.name;
    const meta = document.createElement('div'); meta.className='meta';
    const price = document.createElement('div'); price.className='price'; price.textContent = (p.price/1000).toLocaleString()+"k VND";
    const rating = document.createElement('div'); rating.className='rating'; rating.textContent = '⭐'+p.rating;
    meta.append(price, rating);
    const actions = document.createElement('div'); actions.className='actions';
    const addBtn = document.createElement('button'); addBtn.className='btn add-to-cart'; addBtn.textContent='Thêm giỏ';
    const stock = document.createElement('div'); stock.className='stock'; stock.textContent = p.inStock? 'In stock':'';
    actions.append(addBtn, stock);
    card.append(img, name, meta, actions);
    grid.appendChild(card);

    // card click -> modal
    card.addEventListener('click', (e)=>{
      if(e.target.classList.contains('add-to-cart')) return; // handled separately
      openModal(p);
    });

    addBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      state.cart +=1; updateBadge();
    });
  });
}

function updateBadge(){
  if(state.cart>0){ badge.style.display='flex'; badge.textContent = state.cart; } else badge.style.display='none';
}

function openModal(p){
  closeModal();
  modalOverlay = document.createElement('div'); modalOverlay.className='modal-overlay';
  const modal = document.createElement('div'); modal.className='modal';
  const h = document.createElement('h2'); h.textContent = p.name;
  const r = document.createElement('p'); r.textContent = 'Rating: '+p.rating+' | Category: '+p.category;
  const im = document.createElement('img'); im.src=p.image; im.style.width='100%'; im.style.borderRadius='8px';
  const desc = document.createElement('p'); desc.textContent = 'Price: '+(p.price/1000).toLocaleString()+'k VND. ' + (p.inStock? 'Available':'Out of stock');
  const close = document.createElement('button'); close.textContent='Close'; close.className='btn';
  close.addEventListener('click', closeModal);
  modal.append(h, im, r, desc, close);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
  modalOverlay.addEventListener('click', (e)=>{ if(e.target===modalOverlay) closeModal(); });
}
function closeModal(){ if(modalOverlay){ modalOverlay.remove(); modalOverlay=null; }}

function filterByCategory(cat){ state.category = cat; document.querySelectorAll('.cat-btn').forEach(b=>b.classList.toggle('active', b.dataset.cat===cat)); renderProducts(); }
function searchProducts(q){ state.query = q; renderProducts(); }
function sortProducts(s){ state.sort = s; renderProducts(); }

// wire controls
search.addEventListener('input', (e)=>searchProducts(e.target.value));
sort.addEventListener('change', (e)=>sortProducts(e.target.value));

document.addEventListener('click', (e)=>{
  const cb = e.target.closest('.cat-btn'); if(cb){ filterByCategory(cb.dataset.cat); }
});

darkToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode'); darkToggle.textContent = document.body.classList.contains('dark-mode')? 'Light' : 'Dark';
});

// mount
document.body.appendChild(app);
app.appendChild(grid);
renderProducts();
updateBadge();

// footer
const footer = document.createElement('div'); footer.className='footer'; footer.textContent='All products rendered from JS data. Click a card for details.'; app.appendChild(footer);
