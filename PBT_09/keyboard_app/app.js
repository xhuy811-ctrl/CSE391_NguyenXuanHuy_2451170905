// Keyboard Gallery with command palette & accessibility
const images = [
  {id:1, title:'Sunset', src:'https://placehold.co/800x600?text=Sunset'},
  {id:2, title:'Mountain', src:'https://placehold.co/800x600?text=Mountain'},
  {id:3, title:'Sea', src:'https://placehold.co/800x600?text=Sea'},
  {id:4, title:'Forest', src:'https://placehold.co/800x600?text=Forest'},
  {id:5, title:'City', src:'https://placehold.co/800x600?text=City'},
  {id:6, title:'Desert', src:'https://placehold.co/800x600?text=Desert'},
  {id:7, title:'Aurora', src:'https://placehold.co/800x600?text=Aurora'},
  {id:8, title:'River', src:'https://placehold.co/800x600?text=River'},
  {id:9, title:'Valley', src:'https://placehold.co/800x600?text=Valley'}
];

let current = 0; let slideshow = null;

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const closeModalBtn = document.getElementById('closeModal');
const toggleSlideshowBtn = document.getElementById('toggleSlideshow');
const openPaletteBtn = document.getElementById('openPalette');

const palette = document.getElementById('palette');
const paletteInput = document.getElementById('paletteInput');
const paletteList = document.getElementById('paletteList');

const commands = [
  {id:'next', label:'Next image', run: ()=>showNext()},
  {id:'prev', label:'Previous image', run: ()=>showPrev()},
  {id:'play', label:'Start slideshow', run: ()=>startSlideshow()},
  {id:'pause', label:'Pause slideshow', run: ()=>stopSlideshow()},
  {id:'first', label:'Go to first image', run: ()=>openAt(0)},
  {id:'random', label:'Open random image', run: ()=>openAt(Math.floor(Math.random()*images.length))}
];

function renderGallery(){
  gallery.innerHTML='';
  images.forEach((img,i)=>{
    const card = document.createElement('div'); card.className='card focus-ring'; card.tabIndex=0; card.role='listitem';
    card.setAttribute('aria-label', `${i+1}. ${img.title}`);
    const im = document.createElement('img'); im.src=img.src; im.alt=img.title;
    card.appendChild(im);
    card.dataset.index = i;
    card.addEventListener('click', ()=>openAt(i));
    card.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openAt(i); });
    gallery.appendChild(card);
  });
}

function openAt(i){ current = i; showModal(); highlightThumb(); }
function showModal(){ modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); modalImg.src = images[current].src; modalImg.alt = images[current].title; modalImg.focus?.(); }
function closeModal(){ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); }
function showNext(){ current = (current+1)%images.length; modalImg.src = images[current].src; highlightThumb(); }
function showPrev(){ current = (current-1+images.length)%images.length; modalImg.src = images[current].src; highlightThumb(); }

function highlightThumb(){ document.querySelectorAll('.card').forEach((c,idx)=>{ c.setAttribute('aria-selected', idx===current? 'true':'false'); }); }

function startSlideshow(){ if(slideshow) return; slideshow = setInterval(()=>showNext(),2000); toggleSlideshowBtn.textContent='Pause'; }
function stopSlideshow(){ if(!slideshow) return; clearInterval(slideshow); slideshow=null; toggleSlideshowBtn.textContent='Play'; }
function toggleSlideshow(){ slideshow?stopSlideshow():startSlideshow(); }

// keyboard handlers
document.addEventListener('keydown', (e)=>{
  // Ctrl+K open palette
  if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){
    e.preventDefault(); openPalette(); return;
  }
  // numbers 1-9 jump
  if(/^[1-9]$/.test(e.key)){
    const idx = parseInt(e.key,10)-1; if(idx<images.length) openAt(idx); return;
  }
  if(palette.classList.contains('show')){
    if(e.key==='Escape'){ closePalette(); }
    if(e.key==='ArrowDown'){ movePaletteSelection(1); e.preventDefault(); }
    if(e.key==='ArrowUp'){ movePaletteSelection(-1); e.preventDefault(); }
    if(e.key==='Enter'){ activateSelectedCommand(); }
    return;
  }
  // when modal open
  if(modal.classList.contains('show')){
    if(e.key==='ArrowRight') showNext();
    if(e.key==='ArrowLeft') showPrev();
    if(e.key===' ') { e.preventDefault(); slideshow?stopSlideshow():startSlideshow(); }
    if(e.key==='Escape') closeModal();
  }
});

// buttons
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
closeModalBtn.addEventListener('click', closeModal);
toggleSlideshowBtn.addEventListener('click', toggleSlideshow);
openPaletteBtn.addEventListener('click', openPalette);

// palette
function openPalette(){ palette.classList.add('show'); palette.setAttribute('aria-hidden','false'); paletteInput.value=''; paletteInput.focus(); renderPalette(''); }
function closePalette(){ palette.classList.remove('show'); palette.setAttribute('aria-hidden','true'); openPaletteBtn.focus(); }

function renderPalette(q){ paletteList.innerHTML=''; const filtered = commands.filter(c=>c.label.toLowerCase().includes(q.toLowerCase())); filtered.forEach((c,idx)=>{
  const li = document.createElement('li'); li.tabIndex=0; li.textContent = c.label; li.dataset.cmd = c.id; li.setAttribute('role','option'); if(idx===0) li.setAttribute('aria-selected','true');
  li.addEventListener('click', ()=>{ c.run(); closePalette(); });
  paletteList.appendChild(li);
}); }

paletteInput.addEventListener('input', (e)=>renderPalette(e.target.value));

function movePaletteSelection(delta){ const items = Array.from(paletteList.children); if(!items.length) return; let idx = items.findIndex(it=>it.getAttribute('aria-selected')==='true'); if(idx===-1) idx=0; items[idx].setAttribute('aria-selected','false'); idx=(idx+delta+items.length)%items.length; items[idx].setAttribute('aria-selected','true'); items[idx].focus(); }

function activateSelectedCommand(){ const sel = paletteList.querySelector('[aria-selected="true"]'); if(!sel) return; const id = sel.dataset.cmd; const cmd = commands.find(c=>c.id===id); cmd?.run(); closePalette(); }

// click outside palette to close
document.addEventListener('click', (e)=>{ if(palette.classList.contains('show') && !palette.contains(e.target) && e.target!==openPaletteBtn) closePalette(); });

// initial render
renderGallery(); highlightThumb();

// focus management: make sure tab cycles
gallery.addEventListener('keydown', (e)=>{
  if(e.key==='ArrowRight'){ const next = e.target.nextElementSibling; if(next) next.focus(); }
  if(e.key==='ArrowLeft'){ const prev = e.target.previousElementSibling; if(prev) prev.focus(); }
});

// ensure accessible focus ring on click
document.addEventListener('mousedown', ()=> document.body.classList.add('using-mouse'));
document.addEventListener('keydown', ()=> document.body.classList.remove('using-mouse'));

// ensure Escape closes palette/modal
palette.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closePalette(); });

// click thumbnails highlight
gallery.addEventListener('focusin', (e)=>{ const card = e.target.closest('.card'); if(card) document.querySelectorAll('.card').forEach(c=>c.classList.remove('focused')), card.classList.add('focused'); });

// aria labels already added
