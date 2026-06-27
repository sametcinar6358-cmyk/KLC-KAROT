// ====== Menu mobile ======
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // ====== Logo : essaie plusieurs extensions, puis repli stylé ======
  const logoExts = ['jpeg', 'jpg', 'png', 'webp'];
  document.querySelectorAll('.brand-logo').forEach(function (img) {
    let tryIndex = logoExts.indexOf((img.getAttribute('src').split('.').pop() || '').toLowerCase());
    if (tryIndex === -1) tryIndex = 0;
    img.addEventListener('error', function () {
      tryIndex++;
      if (tryIndex < logoExts.length) {
        img.src = 'images/logo_uca.' + logoExts[tryIndex];
      } else {
        const fallback = document.createElement('div');
        fallback.className = 'brand-logo-fallback';
        fallback.textContent = 'KLC';
        img.replaceWith(fallback);
      }
    });
  });

  // ====== Formulaire de contact -> WhatsApp ======
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      let msg = 'Merhaba, web sitesinden ulaşıyorum.\n\n';
      msg += 'Ad Soyad: ' + name + '\n';
      msg += 'Telefon: ' + phone + '\n';
      msg += 'İlgilendiğim Hizmet: ' + service + '\n';
      if (message) msg += '\nMesaj: ' + message;

      const url = 'https://wa.me/905313547912?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
      this.reset();
    });
  }
});

// ====== Modal galerie ======
let galleryImages = [];
let currentImageIndex = 0;

function setGalleryImages(arr) {
  galleryImages = arr;
}

function openModal(index) {
  currentImageIndex = index;
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.classList.add('show');
  modalImg.src = galleryImages[currentImageIndex];
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('imageModal').classList.remove('show');
  document.body.style.overflow = 'auto';
}

function changeImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
  if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
  document.getElementById('modalImage').src = galleryImages[currentImageIndex];
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') changeImage(-1);
  if (e.key === 'ArrowRight') changeImage(1);
});
