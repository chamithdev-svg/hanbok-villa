import './style.css'
import { supabase } from './supabase'

document.querySelector<HTMLDivElement>('#gallery-app')!.innerHTML = `

  <!-- ========================================
       NAVIGATION
  ======================================== -->

  <nav class="navbar">

    <!-- Logo -->
    <a href="/" class="logo">

      <img
        src="/images/logo.jpg"
        alt="HANEUL Villa Logo"
        class="logo-image"
      >

      <div class="logo-text">
        <span>HANEUL VILLA</span>
        <small>SRI LANKA</small>
      </div>

    </a>


    <!-- Navigation Links -->
    <div class="nav-links" id="navLinks">

      <a href="/">HOME</a>

      <a href="/#about">ABOUT</a>

      <a href="/#rooms">ROOMS</a>

      <a href="/gallery.html" class="active">GALLERY</a>
      <a href="/explore.html">EXPLORE SRI LANKA</a>

      <a href="/#contact">CONTACT</a>

    </div>


    <!-- Navigation Actions -->
    <div class="nav-actions">

      <a href="/#rooms" class="book-btn">
        BOOK NOW
      </a>


      <!-- Mobile Menu Button -->
      <button
        class="menu-btn"
        id="menuBtn"
        aria-label="Open Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>

  </nav>


  <!-- ========================================
       GALLERY HERO SECTION
  ======================================== -->

  <section class="gallery-hero">

    <div class="gallery-hero-overlay"></div>

    <div class="gallery-hero-content">

      <p class="section-subtitle">
        DISCOVER HANEUL VILLA
      </p>

      <h1>Our Gallery</h1>

      <div class="gold-line center-line"></div>

      <p>
        Explore the beautiful moments, peaceful surroundings,
        and unforgettable experiences waiting for you.
      </p>

    </div>

  </section>


  <!-- ========================================
     CUSTOMER REVIEWS SLIDER
======================================== -->

<section class="reviews-section">

  <div class="reviews-heading">

    <p class="section-subtitle">
      GUEST EXPERIENCES
    </p>

    <h2>What Our Guests Say</h2>

    <div class="gold-line center-line"></div>

    <p>
      Discover what our guests loved about their stay
      at HANEUL Villa.
    </p>

  </div>


  <!-- Review Slider -->

  <div class="reviews-slider">


    <!-- Previous Button -->

    <button
      class="review-arrow review-prev"
      id="reviewPrev"
      aria-label="Previous Review"
    >
      ❮
    </button>


    <!-- Reviews Container -->

    <div class="reviews-window">

      <div class="reviews-track" id="reviewsTrack"></div>


    </div>


    <!-- Next Button -->

    <button
      class="review-arrow review-next"
      id="reviewNext"
      aria-label="Next Review"
    >
      ❯
    </button>


  </div>

</section>


  <!-- ========================================
       PHOTO GALLERY SECTION
  ======================================== -->

  <section class="gallery-page-section">

    <div class="gallery-heading">

      <p class="section-subtitle">
        OUR MEMORIES
      </p>

      <h2>Beautiful Moments</h2>

      <div class="gold-line center-line"></div>

      <p>
        Take a look at the beautiful spaces and
        unforgettable moments at Galle Villa.
      </p>

    </div>


    <div class="gallery-page-grid" id="managedGalleryGrid"></div>

  </section>

<!-- ========================================
     PHOTO LIGHTBOX
======================================== -->

<div class="lightbox" id="lightbox">

  <!-- Close button -->
  <button class="lightbox-close" id="lightboxClose">
    ×
  </button>

  <!-- Large image -->
  <img
    id="lightboxImage"
    src=""
    alt="Gallery Image"
  >

</div>

<!-- ========================================
     FLOATING CONTACT BUTTONS
======================================== -->

<div class="floating-buttons">

  <!-- Back to Top button -->
  <button class="floating-btn top-btn" id="backToTop">
    ↑
  </button>

  <!-- Email button -->
  <a
    href="mailto:info@gallevilla.com"
    class="floating-btn floating-email"
    aria-label="Send Email"
  >
    ✉
  </a>

  <!-- WhatsApp button -->
  <a
    href="https://wa.me/94770000000"
    target="_blank"
    class="floating-btn floating-whatsapp"
    aria-label="Chat on WhatsApp"
  >
    ☎
  </a>

</div>
  <!-- ========================================
       FOOTER
  ======================================== -->

  <footer class="footer">

    <div class="footer-content">

      <div class="footer-column footer-brand">

        <h3>HANEUL VILLA</h3>

        <p class="footer-location">
          GALLE, SRI LANKA
        </p>

        <p>
          Experience comfort, privacy, and the beauty
          of Sri Lanka during your stay with us.
        </p>

      </div>


      <div class="footer-column">

        <h4>QUICK LINKS</h4>

        <a href="/">Home</a>
        <a href="/#about">About Villa</a>
        <a href="/#rooms">Rooms</a>
        <a href="/explore.html">
          Explore Sri Lanka
        </a>
        <a href="/#contact">Contact</a>
        

      </div>


      <div class="footer-column">

        <h4>CONTACT</h4>

        <p>📞 +94 XX XXX XXXX</p>
        <p>✉ info@yourvilla.com</p>
        <p>📍 Galle, Sri Lanka</p>

      </div>

    </div>


    <div class="footer-bottom">

      <p>
        © 2026 HANEUL VILLA. ALL RIGHTS RESERVED.
      </p>

    </div>

  </footer>

`

/* ========================================
   BACK TO TOP BUTTON
======================================== */

const backToTopButton = document.querySelector<HTMLButtonElement>('#backToTop')

/* Scroll කරලා පහළට ගියාම button එක පෙන්වීම */
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopButton?.classList.add('show')
  } else {
    backToTopButton?.classList.remove('show')
  }
})

/* Button click කළාම page එක උඩට යාම */
backToTopButton?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})


/* ========================================
   MOBILE MENU
======================================== */

const menuBtn = document.querySelector<HTMLButtonElement>('#menuBtn')
const navLinks = document.querySelector<HTMLDivElement>('#navLinks')

menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('active')
})

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active')
  })
})

/* ========================================
   PHOTO LIGHTBOX
======================================== */

const lightbox = document.querySelector<HTMLDivElement>('#lightbox')
const lightboxImage = document.querySelector<HTMLImageElement>('#lightboxImage')
const lightboxClose = document.querySelector<HTMLButtonElement>('#lightboxClose')
const managedGalleryGrid = document.querySelector<HTMLDivElement>('#managedGalleryGrid')
const reviewsTrack = document.querySelector<HTMLDivElement>('#reviewsTrack')
const reviewPrev = document.querySelector<HTMLButtonElement>('#reviewPrev')
const reviewNext = document.querySelector<HTMLButtonElement>('#reviewNext')
let currentReview = 0

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char))
}

async function loadManagedGallery(): Promise<void> {
  if (!managedGalleryGrid) return
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('id,image_url,caption,display_order,created_at,media_type,show_in_gallery')
    .eq('show_in_gallery', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Could not load managed gallery photos:', error.message)
    managedGalleryGrid.innerHTML = '<p>Gallery photos are temporarily unavailable.</p>'
    return
  }

  if (!data?.length) {
    managedGalleryGrid.innerHTML = '<p>Our gallery is being updated. Please visit again soon.</p>'
    return
  }

  managedGalleryGrid.innerHTML = data.map((media) => `
    <div class="gallery-page-item">
      ${media.media_type === 'video'
        ? `<video src="${escapeHtml(media.image_url)}" controls playsinline preload="metadata" aria-label="${escapeHtml(media.caption || 'HANEUL Villa video')}"></video>`
        : `<img src="${escapeHtml(media.image_url)}" alt="${escapeHtml(media.caption || 'HANEUL Villa')}" loading="lazy">`}
      ${media.caption ? `<p class="gallery-photo-caption">${escapeHtml(media.caption)}</p>` : ''}
    </div>
  `).join('')

  managedGalleryGrid.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
    image.addEventListener('click', () => {
      if (lightbox && lightboxImage) {
        lightboxImage.src = image.src
        lightbox.classList.add('active')
      }
    })
  })
}

async function loadManagedReviews(): Promise<void> {
  if (!reviewsTrack) return
  const { data, error } = await supabase
    .from('guest_reviews')
    .select('id,guest_name,review_text,rating,photo_url,display_order,created_at')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Could not load guest reviews:', error.message)
    reviewsTrack.innerHTML = '<div class="review-slide"><div class="review-card"><p class="review-text">Guest reviews are temporarily unavailable.</p></div></div>'
    return
  }
  if (!data?.length) {
    reviewsTrack.innerHTML = '<div class="review-slide"><div class="review-card"><p class="review-text">Guest reviews will appear here soon.</p></div></div>'
    return
  }

  reviewsTrack.innerHTML = data.map((review) => {
    const rating = Math.max(1, Math.min(5, Number(review.rating) || 5))
    return `<div class="review-slide"><div class="review-card">
      ${review.photo_url ? `<img src="${escapeHtml(review.photo_url)}" alt="${escapeHtml(review.guest_name)}" class="guest-photo" loading="lazy">` : ''}
      <div class="stars" aria-label="${rating} out of 5 stars">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</div>
      <p class="review-text">“${escapeHtml(review.review_text)}”</p>
      <h3>${escapeHtml(review.guest_name)}</h3><span>Guest</span>
    </div></div>`
  }).join('')
  currentReview = 0
  updateReviewSlider()
}

function updateReviewSlider(): void {
  if (!reviewsTrack) return
  const slides = reviewsTrack.querySelectorAll('.review-slide')
  if (!slides.length) return
  if (currentReview < 0) currentReview = slides.length - 1
  if (currentReview >= slides.length) currentReview = 0
  reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`
}

reviewNext?.addEventListener('click', () => { currentReview++; updateReviewSlider() })
reviewPrev?.addEventListener('click', () => { currentReview--; updateReviewSlider() })
lightboxClose?.addEventListener('click', () => lightbox?.classList.remove('active'))
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.classList.remove('active')
})

const managedMediaStyles = document.createElement('style')
managedMediaStyles.textContent = `#homeManagedGalleryGrid video,#managedGalleryGrid video{width:100%;height:100%;max-height:420px;object-fit:cover;border-radius:4px;background:#111}#managedGalleryGrid .gallery-page-item video{display:block;width:100%;max-height:520px;object-fit:cover;border-radius:4px;background:#111}#homeManagedGalleryGrid .gallery-item video{display:block;width:100%;height:100%;min-height:180px;object-fit:cover}`
document.head.appendChild(managedMediaStyles)

void loadManagedGallery()
void loadManagedReviews()

/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});