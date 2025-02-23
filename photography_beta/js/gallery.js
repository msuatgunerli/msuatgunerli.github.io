document.addEventListener('DOMContentLoaded', function() {
  // Initialize Masonry
  var grid = document.querySelector('.photo-grid');
  if (!grid) return;

  // Create grid sizer element
  var gridSizer = document.createElement('div');
  gridSizer.className = 'grid-sizer';
  grid.insertBefore(gridSizer, grid.firstChild);

  // Wrap each image in a grid item div
  grid.querySelectorAll('img').forEach(function(img) {
    var wrapper = document.createElement('div');
    wrapper.className = 'grid-item';
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    
    // Add click handler for lightbox
    img.addEventListener('click', function() {
      showLightbox(this.src);
    });
  });

  // Initialize Masonry
  var msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 20
  });

  // Update layout when images load
  imagesLoaded(grid).on('progress', function() {
    msnry.layout();
  });
});

// Lightbox functionality
function showLightbox(src) {
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="close-btn">&times;</button>
      <button class="prev-btn">&lt;</button>
      <button class="next-btn">&gt;</button>
      <img src="${src}" />
    </div>
  `;

  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';

  // Close button
  lightbox.querySelector('.close-btn').addEventListener('click', function() {
    document.body.removeChild(lightbox);
    document.body.style.overflow = '';
  });

  // Navigation
  var images = Array.from(document.querySelectorAll('.photo-grid img'));
  var currentIndex = images.findIndex(img => img.src === src);

  lightbox.querySelector('.prev-btn').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightbox.querySelector('img').src = images[currentIndex].src;
  });

  lightbox.querySelector('.next-btn').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % images.length;
    lightbox.querySelector('img').src = images[currentIndex].src;
  });
}