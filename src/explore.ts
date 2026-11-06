import './style.css'

document.querySelector<HTMLDivElement>('#explore-app')!.innerHTML = `

  <!-- ========================================
       NAVIGATION
  ======================================== -->

  <nav class="navbar explore-navbar">

    <!-- LOGO -->
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


    
<!-- NAVIGATION LINKS -->
<div class="nav-links" id="navLinks">

  <a href="./index.html">HOME</a>

  <a href="./index.html#about">ABOUT</a>

  <a href="./index.html#rooms">ROOMS</a>

  <a href="./gallery.html">GALLERY</a>

  <a href="./explore.html" class="active">
    EXPLORE SRI LANKA
  </a>

  <a href="./index.html#contact">CONTACT</a>

</div>


    <!-- NAVIGATION ACTIONS -->
    <div class="nav-actions">

      <a href="./booking.html" class="book-btn">
        BOOK NOW
      </a>

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
       HERO SECTION
  ======================================== -->

 <section class="explore-hero">

  <div class="explore-hero-overlay"></div>

  <div class="explore-hero-content">

    <p class="section-subtitle">
      DISCOVER MORE
    </p>

    <h1>
      Explore Hikkaduwa & Sri Lanka
    </h1>

    <div class="gold-line center-line"></div>

    <p>
      Discover Hikkaduwa beaches, Galle Fort and amazing
      places across Sri Lanka during your stay at HANBOK VILLA.
    </p>

  </div>

  <div class="begin-journey">
    <a href="#south-coast">
      <span>BEGIN THE JOURNEY</span>
      <i></i>
    </a>
  </div>

</section>


  <!-- ========================================
       SOUTH COAST
  ======================================== -->

  <section class="destinations-section" id="south-coast">

    <div class="destinations-heading">

      <p class="section-subtitle">
        SOUTH COAST
      </p>

      <h2>
        Discover the Southern Coast
      </h2>

      <div class="gold-line center-line"></div>

      <p>
        Explore the south coast from Hikkaduwa, including beautiful
        beaches, historic Galle Fort and coastal destinations.
      </p>

    </div>


    <div class="destinations-grid">


      <!-- HIKKADUWA -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/hikkaduwa.jpg"
            alt="Hikkaduwa Beach on the southern coast of Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            01
          </span>

          <h3>
            Hikkaduwa
          </h3>

          <p>
            Beautiful beaches, coral reefs,
            sea turtles and unforgettable
            tropical experiences.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>



      <!-- GALLE -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/galle.jpg"
            alt="Historic Galle Fort in southern Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            02
          </span>

          <h3>
            Galle
          </h3>

          <p>
            Discover the historic Galle Fort,
            colonial streets and beautiful
            ocean views.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>



      <!-- UNAWATUNA -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/unawatuna.jpg"
            alt="Unawatuna Beach on the south coast of Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            03
          </span>

          <h3>
            Unawatuna
          </h3>

          <p>
            Relax on golden sands and enjoy
            crystal-clear waters surrounded
            by tropical beauty.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>



      <!-- MIRISSA -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/mirissa.jpg"
            alt="Mirissa Beach in southern Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            04
          </span>

          <h3>
            Mirissa
          </h3>

          <p>
            Stunning beaches, ocean adventures
            and exciting whale-watching
            experiences.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>



      <!-- BENTOTA -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/bentota.jpg"
            alt="Bentota Beach in Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            05
          </span>

          <h3>
            Bentota
          </h3>

          <p>
            Golden beaches, calm waters,
            river safaris and exciting
            water activities.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>


    </div>

  </section>



  <!-- ========================================
       HILL COUNTRY
  ======================================== -->

  <section class="destinations-section destinations-alt">

    <div class="destinations-heading">

      <p class="section-subtitle">
        HILL COUNTRY
      </p>

      <h2>
        Into the Mountains
      </h2>

      <div class="gold-line center-line"></div>

      <p>
        Misty mountains, tea plantations,
        waterfalls and scenic journeys.
      </p>

    </div>


    <div class="destinations-grid">


      <!-- ELLA -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/ella.jpg"
            alt="Ella hill country in Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            06
          </span>

          <h3>
            Ella
          </h3>

          <p>
            Scenic train rides, green mountains,
            waterfalls and breathtaking views.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>



      <!-- NUWARA ELIYA -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/nuwara-eliya.jpg"
            alt="Nuwara Eliya hill country in Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            07
          </span>

          <h3>
            Nuwara Eliya
          </h3>

          <p>
            Cool mountain air, beautiful tea fields,
            lakes and peaceful surroundings.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>



      <!-- KANDY -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/kandy.jpg"
            alt="Kandy in Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            08
          </span>

          <h3>
            Kandy
          </h3>

          <p>
            Discover Sri Lanka's culture,
            beautiful hills, temples and
            the peaceful Kandy Lake.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>


    </div>

  </section>



  <!-- ========================================
       CULTURAL HERITAGE
  ======================================== -->

  <section class="destinations-section">

    <div class="destinations-heading">

      <p class="section-subtitle">
        CULTURAL HERITAGE
      </p>

      <h2>
        Step Into History
      </h2>

      <div class="gold-line center-line"></div>

      <p>
        Explore ancient kingdoms, remarkable
        architecture and Sri Lanka's heritage.
      </p>

    </div>


    <div class="destinations-grid single-feature">


      <!-- SIGIRIYA -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/sigiriya.jpg"
            alt="Sigiriya Rock Fortress in Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            09
          </span>

          <h3>
            Sigiriya
          </h3>

          <p>
            Explore the ancient rock fortress,
            historic gardens and breathtaking
            views from one of Sri Lanka's
            most famous landmarks.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>


    </div>

  </section>



  <!-- ========================================
       WILDLIFE
  ======================================== -->

  <section class="destinations-section destinations-alt">

    <div class="destinations-heading">

      <p class="section-subtitle">
        WILDLIFE & NATURE
      </p>

      <h2>
        Into the Wild
      </h2>

      <div class="gold-line center-line"></div>

      <p>
        Experience the wild beauty of Sri Lanka
        and unforgettable safari adventures.
      </p>

    </div>


    <div class="destinations-grid single-feature">


      <!-- YALA -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/yala.jpg"
            alt="Yala National Park in Sri Lanka"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            10
          </span>

          <h3>
            Yala
          </h3>

          <p>
            Discover wildlife, elephants,
            leopards, beautiful landscapes
            and exciting safari experiences.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>


    </div>

  </section>



  <!-- ========================================
       EAST COAST
  ======================================== -->

  <section class="destinations-section">

    <div class="destinations-heading">

      <p class="section-subtitle">
        EAST COAST
      </p>

      <h2>
        Arugam Bay
      </h2>

      <div class="gold-line center-line"></div>

      <p>
        Surf, sunshine, laid-back beaches
        and a different side of Sri Lanka.
      </p>

    </div>


    <div class="destinations-grid single-feature">


      <!-- ARUGAM BAY -->

      <article class="destination-card">

        <div class="destination-image">

          <img
            src="./images/explore/arugam%20beach.jpg"
            alt="Arugam Bay Beach on Sri Lanka’s east coast"
          >

        </div>

        <div class="destination-content">

          <span class="destination-number">
            11
          </span>

          <h3>
            Arugam Bay
          </h3>

          <p>
            Famous for surfing, beautiful beaches,
            relaxed vibes and unforgettable
            coastal adventures.
          </p>

          <a href="#" class="learn-more">EXPLORE →</a>

        </div>

      </article>


    </div>

  </section>



  <!-- ========================================
       CTA
  ======================================== -->

  <section class="explore-cta">

    <div class="explore-cta-overlay"></div>

    <div class="explore-cta-content">

      <p class="section-subtitle">
        YOUR SRI LANKAN JOURNEY
      </p>

      <h2>
        Stay With Us.<br>
        Explore Sri Lanka.
      </h2>

      <p>
        Make HANBOK Villa your comfortable base
        while discovering the beauty of Sri Lanka.
      </p>

      <a
        href="./booking.html"
        class="explore-cta-btn"
      >
        PLAN YOUR STAY →
      </a>

    </div>

  </section>


<section class="destination-modal" id="destinationModal">
  <div class="modal-overlay"></div>

  <div class="modal-box">
    <button class="modal-close" id="modalClose">&times;</button>

    <img id="modalImage" src="" alt="Destination">

    <div class="modal-content">
      <p class="section-subtitle" id="modalRegion"></p>
      <h2 id="modalTitle"></h2>
      <div class="gold-line"></div>
      <p id="modalDescription"></p>

      <a href="./booking.html" class="book-btn modal-book-btn">
        PLAN YOUR STAY
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
       FOOTER
  ======================================== -->

  <footer class="footer">

    <div class="footer-content">


      <!-- BRAND -->

      <div class="footer-column footer-brand">

        <h3>
          HANBOK VILLA
        </h3>

        <p class="footer-location">
          HIKKADUWA, SRI LANKA
        </p>

        <p>
          Experience comfort, privacy and
          the beauty of Sri Lanka during
          your stay with us.
        </p>

      </div>


      <!-- QUICK LINKS -->

      <div class="footer-column">

        <h4>
          QUICK LINKS
        </h4>

        <a href="/">
          Home
        </a>

        <a href="/#about">
          About Villa
        </a>

        <a href="/#rooms">
          Rooms
        </a>

        <a href="./gallery.html">
          Gallery
        </a>

        <a href="./explore.html">
          Explore Sri Lanka
        </a>

        <a href="/#contact">
          Contact
        </a>

      </div>


      <!-- CONTACT -->

      <div class="footer-column">

        <h4>
          CONTACT
        </h4>

        <p>
          📞 +94 72-518-3824
        </p>

        <p>
          ✉ hanbokhikka@gmail.com
        </p>

        <p>
          📍 Panvila Road, 80240 Hikkaduwa, Sri Lanka
        </p>

      </div>


    </div>


    <div class="footer-bottom">

      <p>
        © 2026 HANBOK VILLA.
        ALL RIGHTS RESERVED.
      </p>

    </div>

  </footer>


  

`;
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

const menuBtn =
  document.querySelector<HTMLButtonElement>('#menuBtn');

const navLinks =
  document.querySelector<HTMLDivElement>('#navLinks');


menuBtn?.addEventListener('click', () => {

  navLinks?.classList.toggle('active');

  menuBtn.classList.toggle('active');

});


navLinks?.querySelectorAll('a').forEach((link) => {

  link.addEventListener('click', () => {

    navLinks?.classList.remove('active');

    menuBtn?.classList.remove('active');

  });

});

const destinationData: Record<string, {
  region: string;
  title: string;
  image: string;
  description: string;
}> = {
  Hikkaduwa: {
    region: "SOUTH COAST",
    title: "Hikkaduwa",
    image: "./images/explore/hikkaduwa.jpg",
    description:
      "A beautiful coastal town famous for its golden beaches, coral reefs, tropical atmosphere and unforgettable ocean experiences."
  },

  Galle: {
    region: "SOUTH COAST",
    title: "Galle",
    image: "./images/explore/galle.jpg",
    description:
      "Discover the historic Galle Fort, charming colonial streets, beautiful architecture and the relaxed atmosphere of Sri Lanka's southern coast."
  },

  Unawatuna: {
    region: "SOUTH COAST",
    title: "Unawatuna",
    image: "./images/explore/unawatuna.jpg",
    description:
      "A tropical beach destination with crystal-clear water, palm-lined shores, relaxing cafés and beautiful sunsets."
  },

  Mirissa: {
    region: "SOUTH COAST",
    title: "Mirissa",
    image: "./images/explore/mirissa.jpg",
    description:
      "Enjoy one of Sri Lanka's most beautiful beaches, spectacular sunsets and exciting whale-watching experiences."
  },

  Bentota: {
    region: "SOUTH COAST",
    title: "Bentota",
    image: "./images/explore/bentota.jpg",
    description:
      "A peaceful coastal escape offering beautiful beaches, water activities, river adventures and luxury experiences."
  },

  Ella: {
    region: "HILL COUNTRY",
    title: "Ella",
    image: "./images/explore/ella.jpg",
    description:
      "Surrounded by green mountains, tea plantations and waterfalls, Ella is perfect for scenic train journeys and nature adventures."
  },

  "Nuwara Eliya": {
    region: "HILL COUNTRY",
    title: "Nuwara Eliya",
    image: "./images/explore/nuwara-eliya.jpg",
    description:
      "Known as Little England, Nuwara Eliya offers cool weather, beautiful tea estates, misty mountains and peaceful landscapes."
  },

  Kandy: {
    region: "HILL COUNTRY",
    title: "Kandy",
    image: "./images/explore/kandy.jpg",
    description:
      "Explore Sri Lanka's cultural heart, home to the Temple of the Sacred Tooth Relic, Kandy Lake and beautiful surrounding hills."
  },

  Sigiriya: {
    region: "CULTURAL HERITAGE",
    title: "Sigiriya",
    image: "./images/explore/sigiriya.jpg",
    description:
      "Visit the legendary Lion Rock fortress and experience one of Sri Lanka's most remarkable historical and cultural landmarks."
  },

  Yala: {
    region: "WILDLIFE & NATURE",
    title: "Yala",
    image: "./images/explore/yala.jpg",
    description:
      "Experience an unforgettable safari surrounded by wild landscapes and the incredible wildlife of Yala National Park."
  },

  "Arugam Bay": {
    region: "EAST COAST",
    title: "Arugam Bay",
    image: "./images/explore/arugam%20beach.jpg",
    description:
      "A world-famous surfing destination with beautiful beaches, relaxed coastal vibes and unforgettable sunsets."
  }
};


const modal = document.getElementById("destinationModal") as HTMLElement;
const modalClose = document.getElementById("modalClose") as HTMLButtonElement;
const modalImage = document.getElementById("modalImage") as HTMLImageElement;
const modalRegion = document.getElementById("modalRegion") as HTMLElement;
const modalTitle = document.getElementById("modalTitle") as HTMLElement;
const modalDescription = document.getElementById("modalDescription") as HTMLElement;


document.querySelectorAll(".learn-more").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const card = button.closest(".destination-card");

    if (!card) return;

    const titleElement = card.querySelector("h3");

    if (!titleElement) return;

    const destinationName = titleElement.textContent?.trim();

    if (!destinationName) return;

    const destination = destinationData[destinationName];

    if (!destination) return;

    modalImage.src = destination.image;
    modalImage.alt = destination.title;
    modalRegion.textContent = destination.region;
    modalTitle.textContent = destination.title;
    modalDescription.textContent = destination.description;

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});


function closeDestinationModal() {
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
}


modalClose.addEventListener("click", closeDestinationModal);


modal.querySelector(".modal-overlay")?.addEventListener("click", closeDestinationModal);


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDestinationModal();
  }
});

/* =================================
   EXPLORE NAVBAR SCROLL EFFECT
================================= */

const exploreNavbar = document.querySelector(".explore-navbar");

window.addEventListener("scroll", () => {
  if (!exploreNavbar) return;

  if (window.scrollY > 50) {
    exploreNavbar.classList.add("scrolled");
  } else {
    exploreNavbar.classList.remove("scrolled");
  }
});

/* ========================================
   SCROLL REVEAL ANIMATION
======================================== */

const revealElements = document.querySelectorAll(
  ".destination-card, .destinations-heading, .explore-cta-content"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  element.classList.add("reveal-element");
  revealObserver.observe(element);
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
