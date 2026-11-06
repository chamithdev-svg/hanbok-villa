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
        src="./images/logo.jpg"
        alt="HANBOK Villa Logo"
        class="logo-image"
      >

      <div class="logo-text">
        <span>HANBOK VILLA</span>
        <small>SRI LANKA</small>
      </div>

    </a>


    
<!-- Navigation Links -->
<div class="nav-links" id="navLinks">

  <a href="./index.html#home">HOME</a>

  <a href="./index.html#about">ABOUT</a>

  <a href="./index.html#rooms">ROOMS</a>

  <a href="./gallery.html" class="active">GALLERY</a>

  <a href="./explore.html">EXPLORE SRI LANKA</a>

  <a href="./index.html#contact">CONTACT</a>

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
        EXPLORE OUR HIKKADUWA VILLA
      </p>

      <h1>HANBOK VILLA Gallery</h1>

      <div class="gold-line center-line"></div>

      <p>
        Explore photos of our two-bedroom villa in Hikkaduwa, Sri Lanka.
        See guest rooms, living spaces and the peaceful surroundings
        before planning your stay near Hikkaduwa Beach.
      </p>

    </div>
    <!-- Scroll Down Arrow -->
    <a href="#guest-reviews"
       class="gallery-scroll-down"
       aria-label="Scroll to guest reviews">
      <span>SCROLL TO EXPLORE</span>
      <span class="scroll-arrow">↓</span>
    </a>
  </section>


  <!-- ========================================
     CUSTOMER REVIEWS SLIDER
======================================== -->

<section class="reviews-section" id="guest-reviews">

  <div class="reviews-heading">

    <p class="section-subtitle">
      GUEST EXPERIENCES
    </p>

    <h2>What Our Guests Say</h2>

    <div class="gold-line center-line"></div>

    <p>
      Discover what our guests loved about their stay
      at HANBOK Villa.
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
        Browse the rooms, shared spaces and outdoor areas at
        HANBOK VILLA, Hikkaduwa, Sri Lanka.
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
    href="mailto:hanbokhikka@gmail.com"
    class="floating-btn floating-email"
    aria-label="Send Email"
  >
    ✉
  </a>

  <!-- WhatsApp button -->
  <a
    href="https://wa.me/94725183824"
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

        <h3>HANBOK VILLA</h3>

        <p class="footer-location">
          HIKKADUWA, SRI LANKA
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
        <a href="./explore.html">
          Explore Sri Lanka
        </a>
        <a href="/#contact">Contact</a>
        

      </div>


      <div class="footer-column">

        <h4>CONTACT</h4>

        <p>📞 +94 72 518 3824</p>
        <p>✉ hanbokhikka@gmail.com</p>
        <p>📍 Panvila Road, 80240 Hikkaduwa, Sri Lanka</p>
      </div>

    </div>


    
  <!-- HANBOK VILLA legal policies: PayHere merchant review -->
  <nav aria-label="Legal policies" class="hanbok-legal-footer" style="display:flex;flex-wrap:wrap;gap:12px 22px;justify-content:center;align-items:center;padding:18px 14px;background:#153a31;color:#fff;font-size:13px">
    <a href="/terms.html" style="color:#f5eee1;text-decoration:underline">Terms &amp; Conditions</a>
    <a href="/refund-policy.html" style="color:#f5eee1;text-decoration:underline">Cancellation &amp; Refund Policy</a>
    <a href="/privacy-policy.html" style="color:#f5eee1;text-decoration:underline">Privacy Policy</a>
  </nav>
  <div class="footer-bottom">

      <p>
        © 2026 HANBOK VILLA. ALL RIGHTS RESERVED.
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
        ? `<video src="${escapeHtml(media.image_url)}" controls playsinline preload="metadata" aria-label="${escapeHtml(media.caption || 'Video of HANBOK VILLA in Hikkaduwa, Sri Lanka')}"></video>`
        : `<img src="${escapeHtml(media.image_url)}" alt="${escapeHtml(media.caption || 'Photo of HANBOK VILLA in Hikkaduwa, Sri Lanka')}" loading="lazy">`}
      ${media.caption ? `<p class="gallery-photo-caption">${escapeHtml(media.caption)}</p>` : ''}
    </div>
  `).join('')

  managedGalleryGrid.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
    image.addEventListener('click', () => {
      if (lightbox && lightboxImage) {
        lightboxImage.src = image.src
        lightboxImage.alt = image.alt
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

/* ==============================================================
   HANBOK VILLA — 20 gentle flying butterflies across the page
   Decorative only; no change to bookings, gallery, or navigation.
   To change the count, update HANBOK_BUTTERFLY_COUNT below.
   ============================================================== */
const HANBOK_BUTTERFLY_COUNT = 20
const hanbokButterflyStyles = document.createElement('style')
hanbokButterflyStyles.id = 'hanbok-global-butterflies-style'
hanbokButterflyStyles.textContent = `
  .hanbok-butterfly-layer{position:fixed;inset:0;z-index:35;pointer-events:none;overflow:hidden;isolation:isolate;contain:layout style;}
  .hanbok-butterfly{position:absolute;left:0;top:0;width:var(--bf-size);height:var(--bf-size);opacity:var(--bf-opacity);transform:translate3d(-15vw,var(--bf-y),0);animation:hanbok-butterfly-cross var(--bf-duration) linear var(--bf-delay) infinite;will-change:transform;}
  .hanbok-butterfly .bf-sway{display:block;width:100%;height:100%;animation:hanbok-butterfly-sway var(--bf-sway-duration) ease-in-out infinite alternate;}
  .hanbok-butterfly svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 2px 3px rgba(45,37,27,.21));}
  .hanbok-butterfly .bf-left-wing{transform-origin:49% 53%;animation:hanbok-butterfly-left-wing .34s ease-in-out infinite alternate;}
  .hanbok-butterfly .bf-right-wing{transform-origin:51% 53%;animation:hanbok-butterfly-right-wing .34s ease-in-out infinite alternate;}
  @keyframes hanbok-butterfly-cross{from{transform:translate3d(-14vw,var(--bf-y),0) rotate(-7deg)}to{transform:translate3d(114vw,calc(var(--bf-y) - var(--bf-rise)),0) rotate(9deg)}}
  @keyframes hanbok-butterfly-sway{from{transform:translate3d(0,-24px,0) rotate(-12deg)}to{transform:translate3d(0,28px,0) rotate(12deg)}}
  @keyframes hanbok-butterfly-left-wing{from{transform:scaleX(.54) rotate(-13deg)}to{transform:scaleX(1.04) rotate(9deg)}}
  @keyframes hanbok-butterfly-right-wing{from{transform:scaleX(.54) rotate(13deg)}to{transform:scaleX(1.04) rotate(-9deg)}}
  @media(max-width:700px){.hanbok-butterfly{opacity:calc(var(--bf-opacity) * .78)}.hanbok-butterfly svg{filter:drop-shadow(0 1px 2px rgba(45,37,27,.16))}}
  @media(prefers-reduced-motion:reduce){.hanbok-butterfly-layer{display:none!important}}
`
document.head.appendChild(hanbokButterflyStyles)

// The same lightweight decoration is generated on each public page.
// The fixed, pointer-events:none layer follows the viewport while scrolling,
// but never blocks clicks on photos, the navigation or booking buttons.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const hanbokButterflyLayer = document.createElement('div')
  hanbokButterflyLayer.className = 'hanbok-butterfly-layer'
  hanbokButterflyLayer.setAttribute('aria-hidden', 'true')
  const butterflyPalettes = [
    ['#f9bd44','#a96a14'], ['#a78add','#7152ab'],
    ['#f69fb9','#be577a'], ['#73c8b5','#2e947b'],
    ['#91c6fa','#438ac6'], ['#fdaf76','#ce713a']
  ]
  for (let i = 0; i < HANBOK_BUTTERFLY_COUNT; i++) {
    const butterfly = document.createElement('span')
    butterfly.className = 'hanbok-butterfly'
    const y = (i * 37 + 13) % 94
    const size = 20 + (i * 13) % 19
    const duration = 16 + (i * 7) % 17
    const delay = -(i * 2.63) % duration
    const [wing, edge] = butterflyPalettes[i % butterflyPalettes.length]
    butterfly.style.cssText = `--bf-size:${size}px;--bf-y:${y}vh;--bf-rise:${(i%5-2)*18}vh;--bf-duration:${duration}s;--bf-delay:${delay}s;--bf-sway-duration:${2+(i%5)*.5}s;--bf-opacity:${(.65+(i%4)*.075).toFixed(2)};`
    butterfly.innerHTML = `<span class="bf-sway"><svg viewBox="0 0 64 62" focusable="false" aria-hidden="true"><g class="bf-left-wing"><path d="M31 30C14 -1 -4 3 5 26C-7 42 17 54 31 34Z" fill="${wing}" stroke="${edge}" stroke-width="1.8"/><path d="M24 30C17 18 12 15 9 13M22 36C17 40 13 42 11 42" fill="none" stroke="${edge}" stroke-width="1.5" opacity=".6"/></g><g class="bf-right-wing"><path d="M33 30C50 -1 68 3 59 26C71 42 47 54 33 34Z" fill="${wing}" stroke="${edge}" stroke-width="1.8"/><path d="M40 30C47 18 52 15 55 13M42 36C47 40 51 42 53 42" fill="none" stroke="${edge}" stroke-width="1.5" opacity=".6"/></g><path d="M32 23V45" stroke="#473b34" stroke-width="3" stroke-linecap="round"/><path d="M32 24Q26 14 23 14M32 24Q38 14 41 14" stroke="#473b34" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></span>`
    hanbokButterflyLayer.appendChild(butterfly)
  }
  document.body.appendChild(hanbokButterflyLayer)
}
