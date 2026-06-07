# Infinite Scroll Gallery

Uses `https://picsum.photos/v2/list` to load photos in pages of 20 and implements:
- Initial load of 20 photos
- Infinite scroll: loads next page when user scrolls near bottom
- Loading indicator while fetching
- Lazy loading images with `IntersectionObserver` (data-src -> src)
- Lightbox modal when clicking an image
- Responsive grid: 4 / 2 / 1 columns

Open `index.html` in a browser to try. No build required.
