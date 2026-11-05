import './style.css'
import { supabase } from './supabase'

// Rooms layout: villa details on the left, room cards on the right.

// A small coastal turtle walk on the PUBLIC homepage only.
// Decorative, keyboard-inert, responsive and disabled for reduced-motion users.
document.head.insertAdjacentHTML('beforeend', `
<style id="hanbok-sea-turtle-walk-styles">
  .hv-turtle-walk{position:relative;isolation:isolate;overflow:hidden;min-height:126px;margin:32px auto 0;width:min(100%,1180px);border-radius:18px;background:linear-gradient(180deg,rgba(227,244,236,.30),rgba(249,231,188,.50) 74%,rgba(233,207,155,.45));pointer-events:none}
  .hv-turtle-walk::before{content:"";position:absolute;inset:auto 0 15px;height:2px;background:repeating-linear-gradient(90deg,rgba(165,133,86,.24) 0 18px,transparent 18px 32px)}
  .hv-turtle-walk-label{position:absolute;top:13px;left:0;right:0;text-align:center;font:600 10px/1.4 Arial,sans-serif;letter-spacing:.22em;color:#638375;text-transform:uppercase}
  .hv-turtle{--shell:#477e68;--flipper:#4c9275;position:absolute;bottom:18px;left:-104px;width:92px;height:55px;animation:hv-turtle-cross 33s linear infinite;will-change:left}
  .hv-turtle svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 3px 2px rgba(45,85,66,.14));animation:hv-turtle-step 1.8s ease-in-out infinite}
  .hv-turtle .shell{fill:var(--shell)}.hv-turtle .skin{fill:var(--flipper)}.hv-turtle .shell-mark{fill:none;stroke:rgba(243,238,190,.52);stroke-width:2.4;stroke-linejoin:round}
  .hv-turtle:nth-child(3){--shell:#779369;--flipper:#6a9c7a;bottom:42px;width:72px;height:43px;animation-duration:41s;animation-delay:-17s;opacity:.92}
  .hv-turtle:nth-child(4){--shell:#527d82;--flipper:#6da99a;bottom:8px;width:61px;height:38px;animation-duration:29s;animation-delay:-10s;opacity:.87}
  .hv-turtle:nth-child(3) svg{animation-delay:-.65s}.hv-turtle:nth-child(4) svg{animation-delay:-1.1s}
  @keyframes hv-turtle-cross{from{left:-104px}to{left:calc(100% + 8px)}}
  @keyframes hv-turtle-step{0%,100%{transform:rotate(-2deg) translateY(0)}50%{transform:rotate(2deg) translateY(-3px)}}
  @media(max-width:650px){.hv-turtle-walk{min-height:100px;border-radius:12px;margin-top:22px}.hv-turtle-walk-label{font-size:9px}.hv-turtle{width:73px;height:44px}.hv-turtle:nth-child(3){width:60px;height:36px;bottom:35px}.hv-turtle:nth-child(4){width:51px;height:32px}}
  @media(prefers-reduced-motion:reduce){.hv-turtle,.hv-turtle svg{animation:none!important}.hv-turtle{left:8%!important}.hv-turtle:nth-child(3){left:42%!important}.hv-turtle:nth-child(4){left:76%!important}}
</style>`)

document.head.insertAdjacentHTML('beforeend', `
<style id="hanbok-rooms-layout-overrides">
.rooms-layout{width:min(96%,1600px);margin:0 auto;display:grid;grid-template-columns:minmax(250px,0.78fr) minmax(0,2.22fr);gap:22px;align-items:stretch;box-sizing:border-box}
.rooms-villa-panel{background:#f7f4ee;padding:28px 24px;border-radius:4px;min-width:0;box-sizing:border-box}
.rooms-villa-panel h2{font-family:Georgia,serif;font-size:clamp(27px,2.1vw,38px);line-height:1.12;margin:10px 0 16px;color:#182923}
.rooms-villa-description{font-size:14px;line-height:1.7;color:#46504c}
.rooms-amenities{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:22px 0}
.rooms-amenity{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:4px;padding:12px 5px;background:#fffdf8;border-radius:8px;font-size:12px;color:#20352f}
.rooms-amenity span{font-size:23px}.rooms-amenity small{font-size:11px}
.rooms-location-card,.rooms-contact-card{display:flex;gap:11px;align-items:flex-start;border-top:1px solid #e2ddd4;padding:15px 0;font-size:13px;line-height:1.5}
.rooms-contact-icon{font-size:20px}.rooms-location-card p{margin:4px 0}.rooms-location-card small{color:#737873}
.rooms-contact-card a{display:block;color:#273c35;overflow-wrap:anywhere;text-decoration:underline}
.rooms-scooter-note{font-size:11px;line-height:1.5;color:#6d716d;margin-top:8px}
.rooms-layout .room-grid{grid-column:2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:stretch;width:100%;max-width:none;min-width:0;margin:0;box-sizing:border-box}
.rooms-layout .room-card{display:flex;flex-direction:column;min-width:0;height:100%;width:100%;max-width:none;box-sizing:border-box}
.rooms-layout .room-image img{width:100%;height:220px;object-fit:cover}
.rooms-layout .room-info{display:flex;flex-direction:column;flex:1;min-width:0;padding:24px}
.rooms-layout .room-btn{margin-top:auto;align-self:stretch;text-align:center}
.rooms-layout .room-description{line-height:1.6}.rooms-layout .room-details{margin-bottom:10px}
.rooms-layout .room-card h3{overflow-wrap:anywhere}
@media(max-width:1200px){.rooms-layout{grid-template-columns:minmax(220px,0.75fr) minmax(0,1.8fr);gap:16px}.rooms-layout .room-grid{grid-template-columns:1fr}.rooms-layout .room-image img{height:190px}}
@media(max-width:760px){.rooms-layout{width:92%;grid-template-columns:minmax(0,1fr);gap:18px}.rooms-villa-panel{grid-column:1;padding:22px}.rooms-layout .room-grid{grid-column:1;grid-template-columns:1fr}.rooms-layout .room-image img{height:240px}}
</style>`)

// HANBOK VILLA — gentle butterflies and scroll-reveal enhancement.
// CSS-only butterfly motion; respects OS reduced-motion preference.
document.head.insertAdjacentHTML('beforeend', `
<style id="hv-butterfly-scroll-styles">
  .about{position:relative;isolation:isolate}
  .hv-butterfly-garden{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:2;contain:layout paint}
  .hv-butterfly{position:absolute;display:block;width:clamp(44px,4.2vw,62px);height:clamp(44px,4.2vw,62px);left:var(--left);top:var(--top);opacity:.94;animation:hv-butterfly-float var(--speed) ease-in-out infinite alternate;animation-delay:var(--delay)}
  .hv-butterfly svg{display:block;width:100%;height:100%;filter:drop-shadow(0 4px 5px rgba(22,58,38,.23));animation:hv-butterfly-flap .48s ease-in-out infinite alternate}
  .hv-butterfly:nth-child(even) svg{animation-duration:.62s}.hv-butterfly:nth-child(3n) svg{animation-duration:.54s}
  @keyframes hv-butterfly-float{0%{transform:translate3d(-12px,10px,0) rotate(-11deg)}50%{transform:translate3d(32px,-18px,0) rotate(12deg)}100%{transform:translate3d(72px,12px,0) rotate(-6deg)}}
  @keyframes hv-butterfly-flap{from{transform:scaleX(.58) rotate(-5deg)}to{transform:scaleX(1) rotate(5deg)}}
  .hv-reveal-ready{opacity:0;transform:translate3d(0,24px,0);transition:opacity .72s ease,transform .72s cubic-bezier(.18,.65,.25,1);transition-delay:var(--hv-reveal-delay,0ms)}
  .hv-reveal-ready.hv-reveal-visible{opacity:1;transform:none}
  @media(max-width:760px){.hv-butterfly{width:35px;height:35px;opacity:.92}.hv-reveal-ready{transform:translate3d(0,14px,0)}}
  @media(prefers-reduced-motion:reduce){.hv-butterfly,.hv-butterfly svg{animation:none!important}.hv-reveal-ready{opacity:1!important;transform:none!important;transition:none!important}}
</style>`)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 
  <!-- Welcome Intro -->
<div class="intro-screen" id="introScreen">

    <video
  class="intro-video"
  id="introVideo"
  autoplay
  muted
  playsinline
>
  <source src="./images/welcome-video.mp4" type="video/mp4">
</video>

    <div class="intro-overlay"></div>

    <div class="intro-enter-wrapper">
  <button class="intro-enter-btn" id="introEnter">
    <span>ENTER THE VILLA</span>
    <i></i>
  </button>
</div>

  </div>

  
  <main>
    <section class="hero">
      <video class="hero-video" autoplay muted loop playsinline>
        <source src="./videos/galle-hero-video.mp4" type="video/mp4">
      </video>

      <div class="hero-overlay"></div>

      <!-- ========================================
     NAVIGATION BAR
======================================== -->

<nav class="navbar">

  <!-- Villa Logo -->
  <div class="logo">

  <img src="./images/logo.jpg" alt="HANBOK VILLA Logo" class="logo-image">

  <div class="logo-text">
    HANBOK VILLA
    <span>SRI LANKA</span>
  </div>

</div>

 
<!-- Navigation links -->
<div class="nav-links" id="navLinks">
  <a href="./index.html#home" class="active">HOME</a>
  <a href="./index.html#about">ABOUT</a>
  <a href="./index.html#rooms">ROOMS</a>
  <a href="./gallery.html">GALLERY</a>
  <a href="./explore.html">EXPLORE SRI LANKA</a>
  <a href="./booking.html">CONTACT</a>
</div>


  <!-- Right side buttons -->
  <div class="nav-actions">

    <!-- Book Now button -->
    <a href="./booking.html" class="book-btn">BOOK NOW</a>

    <!-- Mobile menu button -->
    <button class="menu-btn" id="menuBtn" aria-label="Open Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

  </div>

</nav>
      <div class="hero-content" id="home">
        <p class="welcome">Welcome to</p>
        <h1>HANBOK VILLA</h1>
        <p class="location">HIKKADUWA, SRI LANKA</p>

        <p class="hero-description">
          Your peaceful escape surrounded by the beauty of Sri Lanka.
        </p>

        <a href="#about" class="explore-btn">
          EXPLORE OUR VILLA
        </a>
      </div>

      <div class="home-begin-journey">
  <a href="#about">
    <span>BEGIN THE JOURNEY</span>
    <i></i>
  </a>
</div>

    </section>

        <!-- ========================================
         ABOUT VILLA SECTION
    ======================================== -->

    <section class="about" id="about">
    <!-- Decorative butterflies, hidden from screen readers; no interaction. -->
    <div class="hv-butterfly-garden" aria-hidden="true">
      <span class="hv-butterfly" style="--left:6%;--top:14%;--speed:8s;--delay:-2s;--wing:#e5a537;--accent:#ffe5a0"><svg viewBox="0 0 56 56" aria-hidden="true" focusable="false"><path fill="var(--wing)" d="M27 26C20 3 4 5 5 19c1 10 12 16 22 13C9 35 10 50 20 47c5-1 8-7 8-13 0 6 4 12 9 13 10 3 11-12-7-15 10 3 21-3 22-13C53 5 36 3 29 26Z"/><path fill="var(--accent)" opacity=".58" d="M27 28C15 15 8 16 10 24c2 5 9 8 17 7m2-3c12-13 19-12 17-4-2 5-9 8-17 7"/><path d="M28 24v15" stroke="#374c37" stroke-width="2.4" stroke-linecap="round"/><path d="m28 25-4-7m4 7 4-7" stroke="#374c37" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></span>
      <span class="hv-butterfly" style="--left:78%;--top:12%;--speed:11s;--delay:-7s;--wing:#a783dc;--accent:#f1d8ff"><svg viewBox="0 0 56 56" aria-hidden="true" focusable="false"><path fill="var(--wing)" d="M27 26C20 3 4 5 5 19c1 10 12 16 22 13C9 35 10 50 20 47c5-1 8-7 8-13 0 6 4 12 9 13 10 3 11-12-7-15 10 3 21-3 22-13C53 5 36 3 29 26Z"/><path fill="var(--accent)" opacity=".58" d="M27 28C15 15 8 16 10 24c2 5 9 8 17 7m2-3c12-13 19-12 17-4-2 5-9 8-17 7"/><path d="M28 24v15" stroke="#374c37" stroke-width="2.4" stroke-linecap="round"/><path d="m28 25-4-7m4 7 4-7" stroke="#374c37" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></span>
      <span class="hv-butterfly" style="--left:48%;--top:72%;--speed:13s;--delay:-2s;--wing:#43a992;--accent:#c7f6df"><svg viewBox="0 0 56 56" aria-hidden="true" focusable="false"><path fill="var(--wing)" d="M27 26C20 3 4 5 5 19c1 10 12 16 22 13C9 35 10 50 20 47c5-1 8-7 8-13 0 6 4 12 9 13 10 3 11-12-7-15 10 3 21-3 22-13C53 5 36 3 29 26Z"/><path fill="var(--accent)" opacity=".58" d="M27 28C15 15 8 16 10 24c2 5 9 8 17 7m2-3c12-13 19-12 17-4-2 5-9 8-17 7"/><path d="M28 24v15" stroke="#374c37" stroke-width="2.4" stroke-linecap="round"/><path d="m28 25-4-7m4 7 4-7" stroke="#374c37" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></span>
      <span class="hv-butterfly" style="--left:22%;--top:61%;--speed:10s;--delay:-5s;--wing:#ec7595;--accent:#ffd4dd"><svg viewBox="0 0 56 56" aria-hidden="true" focusable="false"><path fill="var(--wing)" d="M27 26C20 3 4 5 5 19c1 10 12 16 22 13C9 35 10 50 20 47c5-1 8-7 8-13 0 6 4 12 9 13 10 3 11-12-7-15 10 3 21-3 22-13C53 5 36 3 29 26Z"/><path fill="var(--accent)" opacity=".58" d="M27 28C15 15 8 16 10 24c2 5 9 8 17 7m2-3c12-13 19-12 17-4-2 5-9 8-17 7"/><path d="M28 24v15" stroke="#374c37" stroke-width="2.4" stroke-linecap="round"/><path d="m28 25-4-7m4 7 4-7" stroke="#374c37" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></span>
      <span class="hv-butterfly" style="--left:87%;--top:70%;--speed:12s;--delay:-8s;--wing:#4b9bdb;--accent:#c2e7ff"><svg viewBox="0 0 56 56" aria-hidden="true" focusable="false"><path fill="var(--wing)" d="M27 26C20 3 4 5 5 19c1 10 12 16 22 13C9 35 10 50 20 47c5-1 8-7 8-13 0 6 4 12 9 13 10 3 11-12-7-15 10 3 21-3 22-13C53 5 36 3 29 26Z"/><path fill="var(--accent)" opacity=".58" d="M27 28C15 15 8 16 10 24c2 5 9 8 17 7m2-3c12-13 19-12 17-4-2 5-9 8-17 7"/><path d="M28 24v15" stroke="#374c37" stroke-width="2.4" stroke-linecap="round"/><path d="m28 25-4-7m4 7 4-7" stroke="#374c37" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></span>
      <span class="hv-butterfly" style="--left:58%;--top:30%;--speed:9s;--delay:-4s;--wing:#ef8b43;--accent:#ffda9b"><svg viewBox="0 0 56 56" aria-hidden="true" focusable="false"><path fill="var(--wing)" d="M27 26C20 3 4 5 5 19c1 10 12 16 22 13C9 35 10 50 20 47c5-1 8-7 8-13 0 6 4 12 9 13 10 3 11-12-7-15 10 3 21-3 22-13C53 5 36 3 29 26Z"/><path fill="var(--accent)" opacity=".58" d="M27 28C15 15 8 16 10 24c2 5 9 8 17 7m2-3c12-13 19-12 17-4-2 5-9 8-17 7"/><path d="M28 24v15" stroke="#374c37" stroke-width="2.4" stroke-linecap="round"/><path d="m28 25-4-7m4 7 4-7" stroke="#374c37" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></span>
    
    </div>


      <!-- Left side - Villa image -->
      <div class="about-image">
        <img
          src="./images/villa-placeholder.jpg"
          alt="HANBOK Villa"
        >
      </div>

      <!-- Right side - Villa information -->
      <div class="about-content">

        <p class="section-subtitle">WELCOME TO OUR PARADISE</p>

        <h2>Your Peaceful Escape<br>in Hikkaduwa</h2>

        <div class="gold-line"></div>

        <p class="about-text">
          Experience the beauty and peaceful atmosphere of Sri Lanka
          in our beautiful villa located near the beautiful coastal area of Hikkaduwa.
        </p>

        <p class="about-text">
          Our villa offers two comfortable bedrooms and can accommodate
          up to six guests, making it perfect for families, couples,
          and friends.
        </p>

        <!-- Villa information -->
        <div class="villa-features">

          <div class="feature">
            <span class="feature-number">2</span>
            <span class="feature-text">BEDROOMS</span>
          </div>

          <div class="feature">
            <span class="feature-number">6</span>
            <span class="feature-text">MAX GUESTS</span>
          </div>

          <div class="feature">
            <span class="feature-number">2</span>
            <span class="feature-text">DOUBLE BEDS</span>
          </div>

        </div>

      </div>

    </section>

    <!-- ========================================
     ACCOMMODATION / ROOMS SECTION
======================================== -->

<section class="rooms" id="rooms">

  <div class="rooms-layout">
    <aside class="rooms-villa-panel">
      <p class="section-subtitle">ACCOMMODATION</p>
      <h2>Stay at<br>Hanbok Villa</h2>
      <div class="gold-line"></div>
      <p class="rooms-villa-description">Enjoy a comfortable and peaceful stay near Hikkaduwa Beach. Choose one room or book the entire villa for your Sri Lankan getaway.</p>
      <div class="rooms-amenities">
        <div class="rooms-amenity"><span>☕</span><strong>Breakfast</strong><small>Included</small></div>
        <div class="rooms-amenity"><span>🅿️</span><strong>Free Parking</strong></div>
        <div class="rooms-amenity"><span>📶</span><strong>Free Wi-Fi</strong><small>Included</small></div>
        <div class="rooms-amenity"><span>🛵</span><strong>Scooter Rental</strong><small>Extra charge</small></div>
      </div>
      <div class="rooms-location-card">
        <span class="rooms-contact-icon">📍</span>
        <div><strong>Our Location</strong><p>Panvila Road, 80240 Hikkaduwa, Sri Lanka</p><small>Near Hikkaduwa Beach</small></div>
      </div>
      <div class="rooms-contact-card">
        <span class="rooms-contact-icon">✉️</span>
        <div><strong>Email</strong><a href="mailto:hanbokhikka@gmail.com">hanbokhikka@gmail.com</a></div>
      </div>
      <div class="rooms-contact-card">
        <span class="rooms-contact-icon">📞</span>
        <div><strong>Phone / WhatsApp</strong><a href="https://wa.me/94725183824" target="_blank" rel="noopener noreferrer">+94 72-518-3824</a></div>
      </div>
      <p class="rooms-scooter-note">*Scooter availability, licence requirements and any refundable deposit should be confirmed with the villa.</p>
    </aside>

  <!-- Room cards -->
<div class="room-grid">

  <!-- ========================================
       ROOM ONE
  ======================================== -->

  <div class="room-card">

    <div class="room-image">
      <img src="./images/room1.jpg" alt="Room One">
    </div>

    <div class="room-info">

      <h3>Room One</h3>

      <p class="room-description">
        Comfortable room with one double bed and one single bed.
      </p>

      <div class="room-details">
        <span>🛏 1 Double Bed + 1 Single Bed</span>
        <span>👥 Maximum 3 Guests</span>
      </div>

      <p class="room-description"><strong>🍳 Complimentary breakfast included.</strong></p>
      <p class="room-description"><strong>✈️ One free airport transfer per booking — choose pickup OR drop-off.</strong></p>
      <p class="room-description"><strong>🛵 Scooter rental available at an additional charge.</strong></p>
      <p class="room-description scooter-terms">A valid driving licence and document verification may be required. Additional charges apply. A refundable security deposit is required before the scooty is handed over.</p>

      <!-- Pricing -->
      <div class="room-pricing">

        <div class="price-row">
          <span>👥 2 Guests</span>
          <strong id="homeRoomOnePrice">Loading price…</strong>
        </div>


      </div>

      <a href="./booking.html" class="room-btn">
        VIEW & BOOK
      </a>

    </div>

  </div>

  


  <!-- ========================================
       ENTIRE VILLA
  ======================================== -->

  <div class="room-card villa-card">

    <div class="room-image">
      <img src="./images/entire-villa.jpg" alt="Entire Villa">
    </div>

    <div class="room-info">

      <h3>Entire Villa</h3>

      <p class="room-description">
        Enjoy complete privacy with both bedrooms and the entire villa.
      </p>

      <div class="room-details">
        <span>🛏 2 Bedrooms</span>
        <span>👥 Up to 6 Guests</span>
      </div>

      <p class="room-description"><strong>🍳 Complimentary breakfast included.</strong></p>
      <p class="room-description"><strong>✈️ One free airport transfer per booking — choose pickup OR drop-off.</strong></p>
      <p class="room-description"><strong>🛵 Scooter rental available at an additional charge.</strong></p>
      <p class="room-description scooter-terms">A valid driving licence and document verification may be required. Additional charges apply. A refundable security deposit is required before the scooty is handed over.</p>

      <!-- Pricing -->
      <div class="room-pricing">

        <div class="price-row">
          <span>🏡 Entire Villa</span>
          <strong id="homeEntireVillaPrice">Loading price…</strong>
        </div>

      </div>

      <a href="./booking.html" class="room-btn">
        VIEW & BOOK
      </a>

    </div>

  </div>


  <!-- ========================================
       LARGE GROUPS
  ======================================== -->

  <div class="room-card large-group-card">

    <div class="room-image">
      <img src="./images/large-group.png" alt="Large Group Stay">
    </div>

    <div class="room-info">

      <h3>Large Groups</h3>

      <p class="room-description">
        Traveling with more than 6 guests? Send us a request and we will
        check availability and accommodation options for your group.
      </p>

      <div class="room-details">
        <span>👥 More than 6 Guests</span>
        <span>📩 Availability on Request</span>
      </div>

      <div class="room-pricing contact-pricing">
        Contact us for availability
      </div>

      <a href="./booking.html" class="room-btn">
        SEND REQUEST
      </a>

    </div>

  </div>

</div>
  </div>

</section>

<!-- ========================================
     VILLA FACILITIES SECTION
======================================== -->

<section class="facilities" id="facilities">

  <!-- Section Heading -->

  <div class="facilities-heading">

    <p class="section-subtitle">
      EVERYTHING YOU NEED
    </p>

    <h2>Villa Facilities</h2>

    <div class="gold-line center-line"></div>

    <p>
      Everything you need for a comfortable,
      relaxing and memorable stay.
    </p>

  </div>


  <!-- Facilities Grid -->

  <div class="facilities-grid">


    <!-- Bedrooms -->

    <div class="facility-card">

      <div class="facility-icon">🛏️</div>

      <h3>Comfortable Bedrooms</h3>

      <p>
        Relax in comfortable and peaceful bedrooms
        designed for a restful stay.
      </p>

    </div>


    <!-- Air Conditioning -->

    <div class="facility-card">

      <div class="facility-icon">❄️</div>

      <h3>Air Conditioning</h3>

      <p>
        Enjoy a comfortable stay with air conditioning
        available for your convenience.
      </p>

    </div>


    <!-- Kitchen -->

    <div class="facility-card">

      <div class="facility-icon">🍳</div>

      <h3>Fully Equipped Kitchen</h3>

      <p>
        Prepare your favorite meals in our convenient
        and comfortable kitchen.
      </p>

    </div>


    <!-- Bathroom -->

    <div class="facility-card">

      <div class="facility-icon">🚿</div>

      <h3>Private Bathroom</h3>

      <p>
        Enjoy the comfort and privacy of a clean
        and convenient bathroom.
      </p>

    </div>


    <!-- Parking -->

    <div class="facility-card">

      <div class="facility-icon">🚗</div>

      <h3>Parking</h3>

      <p>
        Convenient parking space is available
        for our guests.
      </p>

    </div>


    <!-- Garden -->

    <div class="facility-card">

      <div class="facility-icon">🌿</div>

      <h3>Garden & Outdoor Area</h3>

      <p>
        Relax and enjoy the peaceful outdoor
        surroundings of our villa.
      </p>

    </div>


    <!-- Cleaning -->

    <div class="facility-card">

      <div class="facility-icon">🧹</div>

      <h3>Cleaning Service</h3>

      <p>
        Cleaning services are available to help
        make your stay comfortable.
      </p>

    </div>


    <!-- BBQ -->

    <div class="facility-card">

      <div class="facility-icon">🔥</div>

      <h3>BBQ Space</h3>

      <p>
        Enjoy memorable moments with family and
        friends in our BBQ area.
      </p>

    </div>

    <div class="facility-card">

  <div class="facility-icon">🛋️</div>

  <h3>Spacious Living Area</h3>

  <p>
    A comfortable and spacious area to relax and spend time together.
  </p>

</div>

<div class="facility-card">

  <div class="facility-icon">🌳</div>

  <h3>Peaceful Natural Surroundings</h3>

  <p>
    Enjoy a relaxing atmosphere surrounded by beautiful trees and greenery.
  </p>

</div>


  </div>

</section>


<!-- ========================================
     EXTRA SERVICES SECTION
======================================== -->

<section class="extra-services" id="services">

  <div class="services-heading">

    <p class="section-subtitle">
      MAKE YOUR STAY EVEN BETTER
    </p>

    <h2>Extra Services & Experiences</h2>

    <div class="gold-line center-line"></div>

    <p>
      We can help you arrange additional services
      to make your journey through Sri Lanka easier
      and more enjoyable.
    </p>

  </div>


  <div class="services-grid">


    <!-- Airport Pickup -->

    <div class="service-card">

      <div class="service-icon">✈️</div>

      <h3>Airport Pickup</h3>

      <p>
        Choose complimentary airport pickup for your booking. Only one airport transfer (pickup or drop-off) is free per booking.
      </p>

      <span class="extra-charge">
        Free if selected as your one complimentary airport transfer
      </span>

    </div>


    <!-- Airport Drop -->

    <div class="service-card">

      <div class="service-icon">🛫</div>

      <h3>Airport Drop-off</h3>

      <p>
        Choose complimentary airport drop-off for your booking. Only one airport transfer (pickup or drop-off) is free per booking.
      </p>

      <span class="extra-charge">
        Free if selected as your one complimentary airport transfer
      </span>

    </div>


    <!-- Sri Lanka Tour -->

    <div class="service-card">

      <div class="service-icon">🚐</div>

      <h3>Sri Lanka Tours with Driver</h3>

      <p>
        Explore the beauty of Sri Lanka with a driver.
        Tours can be arranged according to your plans.
      </p>

      <span class="extra-charge">
        Additional charges apply
      </span>

    </div>
    
    <!-- Scooter Rental -->
<div class="service-card">

  <div class="service-icon">🛵</div>

  <h3>Scooter Rental</h3>

  <p>
    Explore the area with a scooter rental, available on request for an additional charge.
    Availability and any refundable security deposit should be confirmed in advance.
  </p>

  <span class="service-note">
    A valid driving licence and document verification may be required. Additional charges apply.
  </span>

</div>

<!-- Car Rental -->

<div class="service-card">

  <div class="service-icon">
    🚗
  </div>

  <h3>Car Rental</h3>

  <p>
    Enjoy convenient and comfortable transportation during
    your stay with our car rental service.
  </p>

  <span class="service-note">
    Available on request · Additional charges apply
  </span>

</div>

    <!-- Beach -->

    <div class="service-card">

      <div class="service-icon">🏖️</div>

      <h3>Near the Beach</h3>

      <p>
        Enjoy easy access to beautiful beaches
        and the relaxing coastal atmosphere of Hikkaduwa.
      </p>

      <span class="service-note">
        Explore nearby attractions
      </span>

    </div>


  </div>


  <!-- Information Note -->

  <div class="services-note">

    <p>
      ✨ Additional services can be arranged upon request.
      Please contact us for availability and pricing.
    </p>

  </div>

</section>

<!-- ========================================
     LOCATION / HOW TO GET HERE
======================================== -->

<section class="location-section" id="location">

  <!-- Section Heading -->

  <div class="location-heading">

    <p class="section-subtitle">
      FIND YOUR WAY TO US
    </p>

    <h2>How to Get to HANBOK Villa</h2>

    <div class="gold-line center-line"></div>

    <p>
      Getting to HANBOK Villa is easy. We are happy to
      help you arrange transportation for your journey.
    </p>

  </div>


  <!-- Location Information -->

  <div class="location-grid">


    <!-- Location -->

    <div class="location-card">

      <div class="location-icon">📍</div>

      <h3>Beautiful Location</h3>

      <p>
        Find us at Panvila Road, 80240 Hikkaduwa, Sri Lanka, near local attractions.
      </p>

    </div>


    <!-- Airport -->

    <div class="location-card">

      <div class="location-icon">✈️</div>

      <h3>Airport Transfer</h3>

      <p>
        One airport transfer is included per booking. Choose either pickup or drop-off; both are not complimentary.
      </p>

      <span>
        One-way transfer included (pickup OR drop-off)
      </span>

    </div>


    <!-- Beach -->

    <div class="location-card">

      <div class="location-icon">🏖️</div>

      <h3>Near the Beach</h3>

      <p>
        Enjoy easy access to beautiful beaches and
        experience the relaxing Sri Lankan coastline.
      </p>

    </div>


  </div>


  <!-- ========================================
     GOOGLE MAP
======================================== -->

<div class="villa-map">

  <iframe
    src="https://www.google.com/maps?q=Nagaha+Kade%2C+Panvila+Road%2C+80240+Hikkaduwa%2C+Sri+Lanka&output=embed"
    width="100%"
    height="450"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
  ></iframe>

</div>

  <!-- Transportation Information -->

  <div class="transport-info">

    <div class="transport-content">

      <div class="transport-icon">
        🚐
      </div>

      <div>

        <h3>Need Help with Transportation?</h3>

        <p>
          We can help arrange transportation and private
          tours with a driver to explore beautiful places
          around Sri Lanka.
        </p>

      </div>

    </div>


    <a href="./index.html#contact" class="transport-btn">
      CONTACT US
    </a>

  </div>

</section>

<!-- ========================================
     EXPLORE NEARBY SECTION
======================================== -->

<section class="nearby-section" id="nearby">

  <!-- ========================================
       SECTION HEADING
  ======================================== -->

  <div class="nearby-heading">

    <p class="section-subtitle">
      DISCOVER THE AREA
    </p>

    <h2>Explore Nearby</h2>

    <div class="gold-line center-line"></div>

    <p>
      Discover beautiful beaches, local attractions,
      and unforgettable experiences during your stay.
    </p>

  </div>


  <!-- ========================================
       NEARBY PLACES
  ======================================== -->

  <div class="nearby-grid">


    <!-- Beautiful Beaches -->

    <!-- Hikkaduwa Beach -->

<div class="nearby-card">

  <div class="nearby-icon">
    🏖️
  </div>

  <h3>Hikkaduwa Beach</h3>

  <p>
    The famous Hikkaduwa Beach is approximately 2 km away,
    where you can enjoy beautiful beaches and a relaxing
    coastal atmosphere.
  </p>

</div>

    <!-- Sea Turtles -->

    <div class="nearby-card">

      <div class="nearby-icon">
        🐢
      </div>

      <h3>Sea Turtles</h3>

      <p>
        Discover nearby places where you can enjoy
        unforgettable sea turtle experiences.
      </p>

    </div>


    <!-- Galle Fort -->

    <div class="nearby-card">

      <div class="nearby-icon">
        🏰
      </div>

      <h3>Galle Fort</h3>

      <p>
        Explore the historic Galle Fort and enjoy
        beautiful views, charming streets, and local culture.
      </p>

    </div>


    <!-- Hotels & Restaurants -->

    <div class="nearby-card">

      <div class="nearby-icon">
        🍽️
      </div>

      <h3>Hotels & Restaurants</h3>

      <p>
        Explore nearby hotels, restaurants, and places
        to enjoy during your stay.
      </p>

    </div>


    <!-- Beautiful Surroundings -->

    <div class="nearby-card">

      <div class="nearby-icon">
        🌴
      </div>

      <h3>Beautiful Surroundings</h3>

      <p>
        Enjoy peaceful tropical surroundings, beautiful
        nature, and the relaxing atmosphere of Sri Lanka.
      </p>

    </div>


  </div>

  <!-- Gentle sea turtle walk — purely decorative, no effect on bookings or navigation. -->
  <div class="hv-turtle-walk" aria-hidden="true">
    <div class="hv-turtle-walk-label">A Little Hikkaduwa Magic · Sea Turtle Walk</div>
    <div class="hv-turtle"><svg viewBox="0 0 120 70" aria-hidden="true" focusable="false"><path class="skin" d="M38 36 19 25 14 33 32 43 19 52 25 61 44 49M77 34 87 20 97 27 86 43 96 50 91 61 74 48"/><path class="skin" d="M88 35c10-14 27-10 27 4s-18 16-26 8"/><circle cx="105" cy="37" r="2" fill="#173c31"/><path class="skin" d="m39 48-7 15 11-6m24-8 7 15 7-14"/><ellipse class="shell" cx="61" cy="40" rx="35" ry="24"/><path class="shell-mark" d="m43 25 15-5 15 6 8 15-13 15H50L37 42Zm15-5-5 19 15 17m-31-14 16-3 28 2"/></svg></div>
    <div class="hv-turtle"><svg viewBox="0 0 120 70" aria-hidden="true" focusable="false"><path class="skin" d="M38 36 19 25 14 33 32 43 19 52 25 61 44 49M77 34 87 20 97 27 86 43 96 50 91 61 74 48"/><path class="skin" d="M88 35c10-14 27-10 27 4s-18 16-26 8"/><circle cx="105" cy="37" r="2" fill="#173c31"/><path class="skin" d="m39 48-7 15 11-6m24-8 7 15 7-14"/><ellipse class="shell" cx="61" cy="40" rx="35" ry="24"/><path class="shell-mark" d="m43 25 15-5 15 6 8 15-13 15H50L37 42Zm15-5-5 19 15 17m-31-14 16-3 28 2"/></svg></div>
    <div class="hv-turtle"><svg viewBox="0 0 120 70" aria-hidden="true" focusable="false"><path class="skin" d="M38 36 19 25 14 33 32 43 19 52 25 61 44 49M77 34 87 20 97 27 86 43 96 50 91 61 74 48"/><path class="skin" d="M88 35c10-14 27-10 27 4s-18 16-26 8"/><circle cx="105" cy="37" r="2" fill="#173c31"/><path class="skin" d="m39 48-7 15 11-6m24-8 7 15 7-14"/><ellipse class="shell" cx="61" cy="40" rx="35" ry="24"/><path class="shell-mark" d="m43 25 15-5 15 6 8 15-13 15H50L37 42Zm15-5-5 19 15 17m-31-14 16-3 28 2"/></svg></div>
  </div>

</section>

<!-- ========================================
     GALLERY SECTION
======================================== -->

<section class="gallery" id="gallery">

  <!-- Hikkaduwary heading -->
  <div class="gallery-heading">

    <p class="section-subtitle">DISCOVER OUR VILLA</p>

    <h2>GALLERY</h2>

    <div class="gold-line center-line"></div>

    <p>
      Discover the beauty, comfort, and peaceful atmosphere
      of our villa in Hikkaduwa.
    </p>

  </div>

  <!-- Hikkaduwary images -->
  <div class="gallery-grid" id="homeManagedHikkaduwaryGrid"></div>

</section>

<div class="gallery-more">
  <a href="./gallery.html" class="gallery-more-btn">
    VIEW MORE PHOTOS →
  </a>
</div>
<br>
<!-- ========================================
     CONTACT / SPECIAL REQUEST SECTION
======================================== -->

<section class="contact-section" id="contact">

  <!-- Section heading -->
  <div class="contact-content">

    <p class="section-subtitle">WE ARE HERE TO HELP</p>

    <h2>Have a Special Request?</h2>

    <div class="gold-line center-line"></div>

    <p class="contact-description">
      Planning a special stay or need more information?
      Contact us directly and we will be happy to assist you.
    </p>

    <!-- Contact buttons -->
    <div class="contact-buttons">

      <!-- Call button -->
      <a href="tel:+94725183824" class="contact-btn call-btn">
        📞 CALL US
      </a>

      <!-- Email button -->
      <a href="mailto:hanbokhikka@gmail.com" class="contact-btn email-btn">
        ✉ EMAIL US
      </a>

      <!-- WhatsApp button -->
      <a
        href="https://wa.me/94725183824"
        target="_blank"
        class="contact-btn whatsapp-btn"
      >
        💬 WHATSAPP
      </a>

    </div>

  </div>

</section>

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
     FOOTER SECTION
======================================== -->

<footer class="footer">

  <!-- Footer main content -->
  <div class="footer-content">

    <!-- Villa information -->
    <div class="footer-column footer-brand">

      <h3>HANBOK VILLA</h3>

      <p class="footer-location">
        HIKKADUWA, SRI LANKA
      </p>

      <p>
        Experience comfort, privacy, and the beauty of
        Sri Lanka during your stay with us.
      </p>

    </div>

    <!-- Quick Links -->
    <div class="footer-column">

      <h4>QUICK LINKS</h4>

      <a href="#home">Home</a>
      <a href="#about">About Villa</a>
      <a href="#rooms">Rooms</a>
      <a href="gallery.html">GALLERY</a>
      <a href="./explore.html">
          Explore Sri Lanka
        </a>
      <a href="booking.html">Contact</a>
      

    </div>

    <!-- Contact information -->
    <div class="footer-column">

      <h4>CONTACT</h4>

      <p>📞 +94 72 518 3824</p>
      <p>✉ hanbokhikka@gmail.com</p>
      <p>📍  Panvila Road, 80240 Hikkaduwa, Sri Lanka</p>

    </div>

  </div>

  <!-- Footer bottom -->
  <div class="footer-bottom">

    <p>
      © 2026 HANBOK VILLA. ALL RIGHTS RESERVED.
    </p>

  </div>

</footer>

  </main>
`

// Scroll-in effects are progressive enhancement: content remains visible if
// IntersectionObserver is unsupported, or reduced motion is requested.
const revealTargets = document.querySelectorAll<HTMLElement>(
  '.about-image, .about-content, .rooms-villa-panel, .room-card, .facilities-heading, .facility-card, .services-heading, .service-card, .location-heading, .location-card, .nearby-heading, .nearby-card, .gallery-heading, .contact-content'
)
const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if ('IntersectionObserver' in window && !prefersLessMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const target = entry.target as HTMLElement
      target.classList.add('hv-reveal-visible')
      observer.unobserve(target)
    })
  }, { rootMargin: '0px 0px -25px 0px', threshold: 0.06 })
  revealTargets.forEach((el, index) => {
    // Skip above-the-fold targets so the browser never hides initially visible content.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return
    el.style.setProperty('--hv-reveal-delay', `${(index % 3) * 65}ms`)
    el.classList.add('hv-reveal-ready')
    revealObserver.observe(el)
  })
}

/* ========================================
   BACK TO TOP BUTTON
======================================== */

// Load the same admin-managed photos used by the public Hikkaduwary page.
const homeManagedHikkaduwaryGrid = document.querySelector<HTMLDivElement>('#homeManagedHikkaduwaryGrid')

function escapeHikkaduwaryText(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char))
}

async function loadHomeManagedHikkaduwary(): Promise<void> {
  if (!homeManagedHikkaduwaryGrid) return
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('id,image_url,caption,display_order,created_at,media_type,show_on_home')
    .eq('show_on_home', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Could not load homepage gallery photos:', error.message)
    return
  }
  if (!data?.length) {
    homeManagedHikkaduwaryGrid.innerHTML = '<p>Hikkaduwary photos will be added soon.</p>'
    return
  }

  homeManagedHikkaduwaryGrid.innerHTML = data.slice(0, 5).map((media, index) => `
    <div class="gallery-item ${index === 0 ? 'gallery-large' : ''} ${index === 4 ? 'gallery-wide' : ''}">
      ${media.media_type === 'video'
        ? `<video src="${escapeHikkaduwaryText(media.image_url)}" controls muted playsinline preload="metadata" aria-label="${escapeHikkaduwaryText(media.caption || 'HANBOK Villa video')}"></video>`
        : `<img src="${escapeHikkaduwaryText(media.image_url)}" alt="${escapeHikkaduwaryText(media.caption || 'HANBOK Villa')}" loading="lazy">`}
      ${media.caption ? `<p class="gallery-photo-caption">${escapeHikkaduwaryText(media.caption)}</p>` : ''}
    </div>
  `).join('')
}

const managedMediaStyles = document.createElement('style')
managedMediaStyles.textContent = `#homeManagedHikkaduwaryGrid video,#managedHikkaduwaryGrid video{width:100%;height:100%;max-height:420px;object-fit:cover;border-radius:4px;background:#111}#managedHikkaduwaryGrid .gallery-page-item video{display:block;width:100%;max-height:520px;object-fit:cover;border-radius:4px;background:#111}#homeManagedHikkaduwaryGrid .gallery-item video{display:block;width:100%;height:100%;min-height:180px;object-fit:cover}`
document.head.appendChild(managedMediaStyles)

void loadHomeManagedHikkaduwary()

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

/* Menu button click කළාම menu open/close කිරීම */
menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('active')
})

/* Link එකක් click කළාම mobile menu එක close කිරීම */
navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active')
  })
})

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


/* ========================================
   HANBOK VILLA - WELCOME INTRO
   Once Per Day
   Desktop + Mobile Video Support
======================================== */

// Get intro elements from the HTML
const introScreen =
  document.querySelector<HTMLElement>("#introScreen");

const introVideo =
  document.querySelector<HTMLVideoElement>("#introVideo");

const introEnter =
  document.querySelector<HTMLButtonElement>("#introEnter");


// Get current date
const now = new Date();

const month = now.getMonth() + 1;
const day = now.getDate();

// Create today's date string
const today =
  `${now.getFullYear()}-${month}-${day}`;


// Check whether intro was already shown today
const introShownDate =
  localStorage.getItem("galleVillaIntroDate");


// Check if the device is in mobile mode
const isMobile =
  window.matchMedia("(max-width: 768px)").matches;


// Run intro logic only if all elements exist
if (introScreen && introVideo && introEnter) {

  // ========================================
  // Already Shown Today → Skip Intro
  // ========================================

  if (introShownDate === today) {

    introScreen.remove();

  } else {

    // ========================================
    // Select Intro Video
    // ========================================

    let videoSrc = "./images/welcome-video.mp4";


    // January 1 & 2 → New Year Video
    if (month === 1 && (day === 1 || day === 2)) {

      videoSrc = isMobile
        ? "./images/new-year-video-mobile.mp4"
        : "./images/new-year-video.mp4";

    }

    // December → Christmas Video
    else if (month === 12) {

      videoSrc = isMobile
        ? "./images/christmas-video-mobile.mp4"
        : "./images/christmas-video.mp4";

    }

    // All Other Days → Normal Welcome Video
    else {

      videoSrc = isMobile
        ? "./images/welcome-video-mobile.mp4"
        : "./images/welcome-video.mp4";

    }


    // ========================================
    // Load and Play Selected Video
    // ========================================

    introVideo.src = videoSrc;

    introVideo.load();

    // Attempt autoplay
    introVideo.play().catch(() => {
      // Browser may block autoplay.
      // User can still click ENTER THE VILLA.
    });


    // ========================================
    // ENTER THE VILLA Button
    // ========================================

    introEnter.addEventListener("click", () => {

      // Save today's date
      // Intro will be skipped for the rest of today
      localStorage.setItem(
        "galleVillaIntroDate",
        today
      );


      // Start intro fade-out animation
      introScreen.classList.add("intro-exit");


      // Remove intro after animation
      setTimeout(() => {

        introScreen.remove();

        // Start home page from the top
        window.scrollTo(0, 0);

      }, 1200);

    });

  }

}

// Home card prices: read the same active prices used by the booking form.
async function refreshHomeRoomPrices(): Promise<void> {
  const roomEl = document.querySelector<HTMLElement>('#homeRoomOnePrice')
  const villaEl = document.querySelector<HTMLElement>('#homeEntireVillaPrice')
  const { data, error } = await supabase.from('room_prices')
    .select('accommodation,guest_count,price_lkr,active').eq('active', true)
  if (error) {
    console.error('Could not load home prices:', error.message)
    if (roomEl) roomEl.textContent = 'Contact us for price'
    if (villaEl) villaEl.textContent = 'Contact us for price'
    return
  }
  const rows = data || []
  const format = (amount: number) => `LKR ${amount.toLocaleString('en-US')} / night`
  const room = rows.find(r => r.accommodation === 'room-one' && r.guest_count === 2)
  const villa = rows.find(r => r.accommodation === 'entire-villa' && r.guest_count === 4)
  if (roomEl) roomEl.textContent = room ? format(Number(room.price_lkr)) : 'Contact us for price'
  if (villaEl) villaEl.textContent = villa ? format(Number(villa.price_lkr)) : 'Contact us for price'
}
void refreshHomeRoomPrices()
window.addEventListener('pageshow', () => { void refreshHomeRoomPrices() })
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) void refreshHomeRoomPrices()
})
