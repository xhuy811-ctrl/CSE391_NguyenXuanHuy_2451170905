const gallery = document.getElementById('gallery');
const loadTrigger = document.getElementById('load-trigger');
const loadingIndicator = document.getElementById('loadingIndicator');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

let page = 1;
const limit = 20;
let loading = false;
let allLoaded = false;

async function fetchPhotos(p){
  const url = `https://picsum.photos/v2/list?page=${p}&limit=${limit}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function createCard(photo){
  const div = document.createElement('div');
  div.className = 'card';
  const img = document.createElement('img');
  // use data-src for lazy loading; set small size for grid
  img.dataset.src = `https://picsum.photos/id/${photo.id}/600/400`;
  img.alt = photo.author || 'photo';
  img.dataset.large = photo.download_url || `https://picsum.photos/id/${photo.id}/1200/800`;
  div.appendChild(img);
  // click to open lightbox
  div.addEventListener('click', ()=> openLightbox(img.dataset.large, img.alt));
  return {div, img};
}

// Lazy loader observer
const lazyObserver = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const img = entry.target;
      const src = img.dataset.src;
      if(src){ img.src = src; img.removeAttribute('data-src'); }
      obs.unobserve(img);
    }
  });
},{rootMargin: '200px'});

async function loadMorePhotos(){
  if(loading || allLoaded) return;
  loading = true;
  loadingIndicator.classList.remove('hidden');
  try{
    const photos = await fetchPhotos(page);
    if(!photos || photos.length === 0){ allLoaded = true; observer.disconnect(); }
    for(const p of photos){
      const {div,img} = createCard(p);
      gallery.appendChild(div);
      lazyObserver.observe(img);
    }
    if(photos.length < limit) allLoaded = true;
    page += 1;
  } catch(err){
    console.error('Error loading photos', err);
  } finally{
    loading = false;
    loadingIndicator.classList.add('hidden');
  }
}

// Infinite scroll observer
const observer = new IntersectionObserver((entries)=>{
  if(entries[0].isIntersecting){ loadMorePhotos(); }
},{rootMargin: '400px'});
observer.observe(loadTrigger);

// Lightbox
function openLightbox(src, alt){
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.remove('hidden');
}
function closeLightbox(){
  lightbox.classList.add('hidden');
  lightboxImg.src = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{ if(e.target.classList.contains('overlay')) closeLightbox(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

// initial load
loadMorePhotos();
