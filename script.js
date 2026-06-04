// =============================================================
// Data utama undangan. Edit tanggal di bawah ini jika tanggal pasti sudah siap.
// Format aman untuk GitHub Pages/browser: YYYY-MM-DDTHH:mm:ss+07:00
// Placeholder sesuai permintaan: 2027-06-01.
// =============================================================
const weddingDate = '2027-06-01T08:00:00+07:00';
const defaultGuestName = 'Bapak/Ibu/Saudara/i';
const storageKey = 'ibnu-revalina-wishes';

const cover = document.getElementById('openingCover');
const openButton = document.getElementById('openInvitation');
const guestNameElement = document.getElementById('guestName');
const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const giftToggle = document.getElementById('giftToggle');
const giftContent = document.getElementById('giftContent');
const wishForm = document.getElementById('wishForm');
const wishesList = document.getElementById('wishesList');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

let musicAvailable = true;
let lightboxRequestId = 0;

function setGuestNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('to');
  guestNameElement.textContent = guestName?.trim() || defaultGuestName;
}

function updateCountdown() {
  const target = new Date(weddingDate).getTime();
  const now = Date.now();
  const distance = Math.max(target - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

async function playMusic() {
  if (!musicAvailable) return;

  try {
    await music.play();
    musicToggle.classList.add('is-playing');
    musicToggle.setAttribute('aria-pressed', 'true');
    musicIcon.textContent = '♫';
  } catch (error) {
    musicAvailable = false;
    musicToggle.classList.remove('is-playing');
    musicToggle.setAttribute('aria-pressed', 'false');
    musicIcon.textContent = '♪';
    musicToggle.title = 'Musik belum tersedia atau tidak dapat diputar.';
    console.info('Background music could not be played:', error.message);
  }
}

function pauseMusic() {
  music.pause();
  musicToggle.classList.remove('is-playing');
  musicToggle.setAttribute('aria-pressed', 'false');
  musicIcon.textContent = '♪';
}

function openInvitation() {
  cover.classList.add('is-hidden');
  document.body.classList.remove('cover-open');
  playMusic();
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach((element) => observer.observe(element));
}

function setupActiveNavigation() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.bottom-nav a');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach((section) => observer.observe(section));
}

function loadWishes() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch (error) {
    console.info('Stored wishes could not be read:', error.message);
    return [];
  }
}

function saveWishes(wishes) {
  localStorage.setItem(storageKey, JSON.stringify(wishes));
}

function renderWishes() {
  const wishes = loadWishes();
  wishesList.innerHTML = '';

  if (wishes.length === 0) {
    wishesList.innerHTML = '<p>Belum ada ucapan. Jadilah yang pertama mengirim doa baik.</p>';
    return;
  }

  wishes.forEach((wish) => {
    const item = document.createElement('article');
    item.className = 'wish-item';
    item.innerHTML = `
      <strong></strong>
      <small></small>
      <p></p>
    `;
    item.querySelector('strong').textContent = wish.name;
    item.querySelector('small').textContent = wish.attendance;
    item.querySelector('p').textContent = wish.message;
    wishesList.appendChild(item);
  });
}

function setupWishForm() {
  wishForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(wishForm);
    const wish = {
      name: formData.get('wishName').toString().trim(),
      attendance: formData.get('attendance').toString(),
      message: formData.get('message').toString().trim(),
      createdAt: new Date().toISOString(),
    };

    if (!wish.name || !wish.message) return;

    const wishes = loadWishes();
    wishes.unshift(wish);
    saveWishes(wishes.slice(0, 25));
    wishForm.reset();
    renderWishes();
  });
}

function setupGiftToggle() {
  giftToggle.addEventListener('click', () => {
    const isHidden = giftContent.hidden;
    giftContent.hidden = !isHidden;
    giftToggle.setAttribute('aria-expanded', String(isHidden));
    giftToggle.textContent = isHidden ? 'Sembunyikan Detail Amplop' : 'Lihat Detail Amplop';
  });
}

function setupCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy');
      const originalText = button.textContent;

      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'Tersalin';
      } catch (error) {
        console.info('Clipboard API unavailable, using fallback:', error.message);
        const temporaryInput = document.createElement('input');
        temporaryInput.value = value;
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        document.execCommand('copy');
        temporaryInput.remove();
        button.textContent = 'Tersalin';
      }

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1600);
    });
  });
}

function closeGalleryLightbox() {
  lightboxRequestId += 1;
  lightbox.classList.remove('is-active');
  lightbox.hidden = true;
  lightboxImage.removeAttribute('src');
}

function openGalleryLightbox(imageSrc, imageAlt) {
  if (!imageSrc) return;

  const requestId = lightboxRequestId + 1;
  lightboxRequestId = requestId;
  const previewImage = new Image();

  previewImage.addEventListener('load', () => {
    if (requestId !== lightboxRequestId) return;

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt || 'Foto galeri diperbesar';
    lightbox.hidden = false;
    lightbox.classList.add('is-active');
  });

  previewImage.addEventListener('error', () => {
    if (requestId === lightboxRequestId) {
      closeGalleryLightbox();
    }
  });

  previewImage.src = imageSrc;
}

function setupGalleryLightbox() {
  closeGalleryLightbox();

  document.querySelectorAll('#galleryGrid button').forEach((button) => {
    button.addEventListener('click', () => {
      const thumbnail = button.querySelector('img');
      const thumbnailSrc = thumbnail?.currentSrc || thumbnail?.getAttribute('src');
      const imageSrc = button.dataset.image || thumbnailSrc;

      if (!thumbnailSrc || !imageSrc || (thumbnail?.complete && thumbnail.naturalWidth === 0)) {
        closeGalleryLightbox();
        return;
      }

      openGalleryLightbox(imageSrc, thumbnail?.alt);
    });
  });

  closeLightbox.addEventListener('click', closeGalleryLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeGalleryLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      closeGalleryLightbox();
    }
  });
}

function setupMusicControls() {
  music.addEventListener('error', () => {
    musicAvailable = false;
    musicToggle.title = 'Tambahkan file assets/music/background.mp3 untuk mengaktifkan musik.';
  });

  musicToggle.addEventListener('click', () => {
    if (music.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });
}

function init() {
  document.body.classList.add('cover-open');
  setGuestNameFromUrl();
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
  setupRevealAnimation();
  setupActiveNavigation();
  setupWishForm();
  setupGiftToggle();
  setupCopyButtons();
  setupGalleryLightbox();
  setupMusicControls();
  renderWishes();
  openButton.addEventListener('click', openInvitation);
}

init();
