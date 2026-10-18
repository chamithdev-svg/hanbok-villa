import './style.css'
import { supabase } from './supabase'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <!-- ========================================
       BOOKING PAGE
  ======================================== -->

  <main class="booking-page">


    <!-- ========================================
         NAVIGATION
    ======================================== -->

    
<nav class="booking-nav">

  <a href="./index.html" class="booking-logo">

    <img
      src="./images/logo.jpg"
      alt="HANBOK Villa Logo"
    >

    <div>
      <span class="logo-title">HANBOK VILLA</span>
      <span class="logo-location">SRI LANKA</span>
    </div>

  </a>

  <a href="./index.html" class="back-home-btn">
    ← BACK TO HOME
  </a>

</nav>



    <!-- ========================================
         BOOKING HERO
    ======================================== -->

    <section class="booking-hero">

      <div class="booking-hero-content">

        <p class="section-subtitle">
          PLAN YOUR STAY
        </p>

        <h1>Book Your Stay</h1>

        <div class="gold-line center-line"></div>

        <p>
          Select your stay details and book your
          perfect villa experience.
        </p>

      </div>

    </section>



    <!-- ========================================
         ONLINE BOOKING
    ======================================== -->

    <section class="booking-section">

      <div class="booking-container">


        <!-- ========================================
             BOOKING INFORMATION
        ======================================== -->

        <div class="booking-info">

          <p class="section-subtitle">
            ONLINE BOOKING
          </p>

          <h2>Plan Your Stay</h2>

          <div class="gold-line"></div>

          <p>
            Choose your accommodation, travel dates,
            and number of guests to start your booking.
          </p>


          <div class="booking-info-list">

            <div>
              <span>🛏️</span>

              <p>
                Select your preferred room or the entire villa.
              </p>
            </div>


            <div>
              <span>📅</span>

              <p>
                Choose your check-in and check-out dates.
              </p>
            </div>


            <div>
              <span>👥</span>

              <p>
                Online booking is available for up to 4 guests. For 5 or more guests, send a group request for a personalised quote.
              </p>
            </div>


            <div>
              <span>💳</span>

              <p>
                Choose your preferred payment option; payment details will be confirmed by our team.
              </p>
            </div>


            <div>
              <span>📧</span>

              <p>
                We will contact you to confirm availability and payment.
              </p>
            </div>

          </div>

        </div>



        <!-- ========================================
             ONLINE BOOKING FORM
        ======================================== -->

        <form class="booking-form" id="bookingForm">


          <!-- Guest Details -->

          <h3>Guest Details</h3>


          <div class="form-row">

         
            <div class="form-group">

              <label for="name">
                Full Name *
              </label>

              <input
                type="text"
                id="name"
                name="name"
                required
              >

            </div>


            <div class="form-group">

              <label for="email">
                Email Address *
              </label>

              <input
                type="email"
                id="email"
                name="email"
                required
              >

            </div>


          </div>



          <div class="form-group">
              <label for="country">Country / Region *</label>
              <select id="country" name="country" required>
                <option value="">Select your country / region</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czechia">Czechia</option>
                <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Greece">Greece</option>
                <option value="Grenada">Grenada</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Honduras">Honduras</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Kosovo">Kosovo</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">Micronesia</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="North Korea">North Korea</option>
                <option value="North Macedonia">North Macedonia</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestine">Palestine</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Qatar">Qatar</option>
                <option value="Republic of the Congo">Republic of the Congo</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Korea">South Korea</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-Leste">Timor-Leste</option>
                <option value="Togo">Togo</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vatican City">Vatican City</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="Other">Other</option>
                </select>
            </div>

          <!-- Phone -->

          <div class="form-group">

            <label for="phone">
              Phone / WhatsApp *
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              required
            >

          </div>



          <!-- ========================================
               YOUR STAY
          ======================================== -->

          <h3>Your Stay</h3>


          <!-- Dates -->

          <div class="form-row">


            <div class="form-group">

              <label for="checkin">
                Check-in Date *
              </label>

              <input
                type="date"
                id="checkin"
                name="checkin"
                required
              >

            </div>


            <div class="form-group">

              <label for="checkout">
                Check-out Date *
              </label>

              <input
                type="date"
                id="checkout"
                name="checkout"
                required
              >

            </div>


          </div>



          <!-- Guests -->

          <div class="form-group">

            <label for="guests">
              Number of Guests *
            </label>

            <select
              id="guests"
              name="guests"
              required
            >

              <option value="">
                Select number of guests
              </option>

              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>

            </select>

          </div>



          <!-- Accommodation -->

          <div class="form-group">

            <label for="accommodation">
              Accommodation *
            </label>

            <select
              id="accommodation"
              name="accommodation"
              required
            >

              <option value="">
                Select your accommodation
              </option>

              <option value="room-one">
                Room One
              </option>
<option value="entire-villa">
                Entire Villa
              </option>

            </select>

          </div>

<!-- Currency Selector -->
<div class="currency-selector-wrap" style="margin: 18px 0;">
  <label for="currencySelector" style="display:block;margin-bottom:8px;font-weight:600;">Display currency</label>
  <select id="currencySelector" name="currency" aria-label="Choose display currency" style="width:100%;padding:12px;border:1px solid #cfcfcf;border-radius:8px;background:#fff;">
    <option value="LKR" selected>Sri Lankan Rupees (LKR Rs.)</option>
    <option value="USD">US Dollars (USD $)</option>
  </select>
  <small id="exchangeRateNote" style="display:block;margin-top:6px;color:#666;">Prices are shown in LKR.</small>
</div>

          <!-- ========================================
               EXTRA SERVICES
          ======================================== -->

          <div class="extra-options">

            <h3>Extra Services</h3>

            <p>
              Available on request. Additional charges may apply.
            </p>


            <label class="checkbox-option">

              <input
                type="checkbox"
                name="services"
                value="airport-pickup"
              >

              ✈️ Airport Pickup

            </label>


            <label class="checkbox-option">

              <input
                type="checkbox"
                name="services"
                value="airport-dropoff"
              >

              🛫 Airport Drop-off

            </label>


            <label class="checkbox-option">

              <input
                type="checkbox"
                name="services"
                value="sri-lanka-tour"
              >

              🚐 Sri Lanka Tour with Driver

            </label>


            <label class="checkbox-option">

              <input
                type="checkbox"
                name="services"
                value="bike-rental"
              >

              🛵 Complimentary Scooter (licence/documents and refundable deposit required; details confirmed separately)

            </label>


            <label class="checkbox-option">

              <input
                type="checkbox"
                name="services"
                value="car-rental"
              >

              🚗 Car Rental

            </label>

          </div>



          <!-- ========================================
               PAYMENT OPTION
          ======================================== -->

          <div class="payment-options">

            <h3>Payment Option</h3>

            <p>
              Choose how you would like to pay for your booking.
            </p>


            <label class="payment-option">

              <input
                type="radio"
                name="payment"
                value="deposit"
                checked
              >

              <div>

                <strong>
                  Pay 30% Deposit
                </strong>

                <span>
                  Pay the remaining balance after confirmation.
                </span>

              </div>

            </label>



            <label class="payment-option">

              <input
                type="radio"
                name="payment"
                value="full"
              >

              <div>

                <strong>
                  Pay Full Amount
                </strong>

                <span>
                  Request full-payment details from our team.
                </span>

              </div>

            </label>

          </div>



          <!-- ========================================
               BOOKING SUMMARY
          ======================================== -->

          <div class="booking-summary">

            <h3>Booking Summary</h3>


            <div class="summary-row">

              <span>Accommodation</span>

              <strong id="summaryRoom">
                Not selected
              </strong>

            </div>


            <div class="summary-row">

              <span>Guests</span>

              <strong id="summaryGuests">
                Not selected
              </strong>

            </div>


            <div class="summary-row">

              <span>Check-in</span>

              <strong id="summaryCheckin">
                Not selected
              </strong>

            </div>


            <div class="summary-row">

              <span>Check-out</span>

              <strong id="summaryCheckout">
                Not selected
              </strong>

            </div>


            <div class="summary-row">

              <span>Payment</span>

              <strong id="summaryPayment">
                30% Deposit
              </strong>

            </div>


            <!-- ========================================
     PRICE SUMMARY
======================================== -->

<div class="price-summary">


  <div class="price-row">

    <span>
      Total Stay Price
    </span>

    <strong id="totalStayPrice">
      Price will be calculated
    </strong>

  </div>


  <div class="price-row pay-now-row">

    <span id="payNowLabel">
      Deposit requested (30%)
    </span>

    <strong id="payNowPrice">
      Price will be calculated
    </strong>

  </div>


  <div class="price-row remaining-row">

    <span>
      Remaining Balance
    </span>

    <strong id="remainingBalance">
      Price will be calculated
    </strong>

  </div>


</div>

          </div>



          <!-- Special Request -->

          <div class="form-group">

            <label for="message">
              Special Requests
            </label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell us about any special requests..."
            ></textarea>

          </div>



          <!-- Submit -->

          <button
            type="submit"
            class="booking-submit-btn"
          >

            SUBMIT BOOKING REQUEST

          </button>


          <p class="booking-form-note">

            Your request is not a confirmed booking. We will verify availability and contact you about payment.

          </p>

        </form>

      </div>

    </section>



    <!-- ========================================
         LARGE GROUP CONTACT FORM
    ======================================== -->

    <section class="large-group-section">

      <div class="large-group-container">


        <div class="large-group-heading">

          <p class="section-subtitle">
            LARGE GROUPS
          </p>

          <h2>Traveling with More Than 4 Guests?</h2>

          <div class="gold-line center-line"></div>

          <p>
            Planning a stay for 5 or more guests? Send us your details
            and we will check availability and suitable options
            for your group.
          </p>

        </div>



        <!-- Large Group Form -->

        <form
          class="large-group-form"
          id="largeGroupForm"
        >


          <div class="form-row">


            <div class="form-group">

              <label for="groupName">
                Full Name *
              </label>

              <input
                type="text"
                id="groupName"
                required
              >

            </div>


            <div class="form-group">

              <label for="groupEmail">
                Email Address *
              </label>

              <input
                type="email"
                id="groupEmail"
                required
              >

            </div>


          </div>



          <div class="form-row">


            <div class="form-group">

              <label for="groupCheckin">
                Check-in Date *
              </label>

              <input
                type="date"
                id="groupCheckin"
                required
              >

            </div>


            <div class="form-group">

              <label for="groupCheckout">
                Check-out Date *
              </label>

              <input
                type="date"
                id="groupCheckout"
                required
              >

            </div>


          </div>



          <div class="form-group">

            <label for="groupGuests">
              Number of Guests *
            </label>

            <input
              type="number"
              id="groupGuests"
              min="5"
              placeholder="5 or more guests"
              required
            >

          </div>



          <div class="form-group">

            <label for="groupMessage">
              Tell Us About Your Group
            </label>

            <textarea
              id="groupMessage"
              rows="5"
              placeholder="Tell us about your travel plans and requirements..."
            ></textarea>

          </div>



          <button
            type="submit"
            class="booking-submit-btn"
          >

            SEND GROUP REQUEST

          </button>

        </form>

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

      <p>📞 +94 72-518-3824</p>
      <p>✉ hanbokhikka@gmail.com</p>
      <p>📍 Hikkaduwa, Sri Lanka</p>

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
   BOOKING SUMMARY LIVE UPDATE
======================================== */

const guests = document.querySelector<HTMLSelectElement>('#guests')
const accommodation = document.querySelector<HTMLSelectElement>('#accommodation')
const checkin = document.querySelector<HTMLInputElement>('#checkin')
const checkout = document.querySelector<HTMLInputElement>('#checkout')

const summaryRoom = document.querySelector<HTMLElement>('#summaryRoom')
const summaryGuests = document.querySelector<HTMLElement>('#summaryGuests')
const summaryCheckin = document.querySelector<HTMLElement>('#summaryCheckin')
const summaryCheckout = document.querySelector<HTMLElement>('#summaryCheckout')
const summaryPayment = document.querySelector<HTMLElement>('#summaryPayment')


/* Update Summary */

function updateBookingSummary() {

  if (accommodation && summaryRoom) {

    const selectedOption =
      accommodation.options[accommodation.selectedIndex]

    summaryRoom.textContent =
      accommodation.value
        ? selectedOption.text
        : 'Not selected'

  }


  if (guests && summaryGuests) {

    summaryGuests.textContent =
      guests.value
        ? `${guests.value} Guest${guests.value === '1' ? '' : 's'}`
        : 'Not selected'

  }


  if (checkin && summaryCheckin) {

    summaryCheckin.textContent =
      checkin.value || 'Not selected'

  }


  if (checkout && summaryCheckout) {

    summaryCheckout.textContent =
      checkout.value || 'Not selected'

  }


  const payment =
    document.querySelector<HTMLInputElement>(
      'input[name="payment"]:checked'
    )


  if (payment && summaryPayment) {

    summaryPayment.textContent =
      payment.value === 'deposit'
        ? '30% Deposit'
        : 'Full Payment'

  }

}


/* Event Listeners */

guests?.addEventListener(
  'change',
  updateBookingSummary
)


accommodation?.addEventListener(
  'change',
  updateBookingSummary
)


checkin?.addEventListener(
  'change',
  updateBookingSummary
)


checkout?.addEventListener(
  'change',
  updateBookingSummary
)


const currencySelector =
  document.querySelector<HTMLSelectElement>(
    '#currencySelector'
  )

currencySelector?.addEventListener(
  'change',
  () => {
    selectedCurrency = currencySelector.value === 'USD' ? 'USD' : 'LKR'
    calculateBookingPrice()
  }
)


const largeGroupForm =
  document.querySelector<HTMLFormElement>(
    '#largeGroupForm'
  )


largeGroupForm?.addEventListener(
  'submit',
  (event) => {

    event.preventDefault()

    alert(
      'Thank you! Your group request has been received.'
    )

  }
)


/* ========================================
   DATE VALIDATION
======================================== */

const today = new Date().toISOString().split('T')[0]

if (checkin) {
  checkin.min = today
}

if (checkout) {
  checkout.min = today
}


/* When Check-in Date Changes */

checkin?.addEventListener('change', () => {

  if (!checkin.value || !checkout) return

  checkout.min = checkin.value


  /* Reset invalid checkout date */

  if (
    checkout.value &&
    checkout.value <= checkin.value
  ) {

    checkout.value = ''

  }


  updateBookingSummary()

})


/* When Check-out Date Changes */

checkout?.addEventListener('change', () => {

  if (
    checkin?.value &&
    checkout.value <= checkin.value
  ) {

    alert(
      'Check-out date must be after the check-in date.'
    )

    checkout.value = ''

  }


  updateBookingSummary()

})

/* ========================================
   STEP 2 - CHECK AVAILABILITY FROM SUPABASE
======================================== */



/*
  A pending or confirmed booking blocks overlapping dates.
  Checkout day is not blocked as a night, so a new guest may check in
  on the previous guest's checkout date.
*/
async function isRoomAvailable(
  room: string,
  selectedCheckin: string,
  selectedCheckout: string
): Promise<boolean> {
  // Use a database RPC so availability can be checked safely even when
  // the bookings table has Row Level Security enabled. The RPC returns only
  // a boolean and does not expose guests' personal information.
  const { data, error } = await supabase.rpc('check_booking_availability', {
    p_room_type: room,
    p_check_in: selectedCheckin,
    p_check_out: selectedCheckout
  })

  if (error) {
    console.error('Could not check booking availability via RPC:', error)
    throw new Error('Could not check availability from the database. Please try again.')
  }

  if (typeof data !== 'boolean') {
    console.error('Unexpected availability RPC response:', data)
    throw new Error('The database returned an unexpected availability response.')
  }

  return data
}

/* ========================================
   STEP 4 - SHOW AVAILABILITY STATUS
======================================== */

async function checkAvailability() {

  if (
    !accommodation?.value ||
    !checkin?.value ||
    !checkout?.value
  ) {

    return

  }


  let available: boolean
  try {
    available = await isRoomAvailable(
      accommodation.value,
      checkin.value,
      checkout.value
    )
  } catch {
    const oldStatus = document.querySelector('#availabilityStatus')
    oldStatus?.remove()
    const status = document.createElement('div')
    status.id = 'availabilityStatus'
    status.className = 'availability-status unavailable'
    status.textContent = 'Unable to verify availability. Please try again.'
    accommodation.parentElement?.insertAdjacentElement('afterend', status)
    return
  }


  /* Remove old availability message */

  const oldStatus =
    document.querySelector('#availabilityStatus')

  oldStatus?.remove()


  /* Create availability message */

  const availabilityStatus =
    document.createElement('div')

  availabilityStatus.id =
    'availabilityStatus'


  if (available) {

    availabilityStatus.className =
      'availability-status available'

    availabilityStatus.innerHTML = `
      <span>✓</span>
      Available for your selected dates!
    `

  } else {

    availabilityStatus.className =
      'availability-status unavailable'

    availabilityStatus.innerHTML = `
      <span>✕</span>
      Sorry, this accommodation is not available
      for the selected dates.
    `

  }


  /* Add message after accommodation */

  accommodation.parentElement?.insertAdjacentElement(

    'afterend',

    availabilityStatus

  )

}


/* ========================================
   AVAILABILITY EVENT LISTENERS
======================================== */

accommodation?.addEventListener(
  'change',
  checkAvailability
)


checkin?.addEventListener(
  'change',
  checkAvailability
)


checkout?.addEventListener(
  'change',
  checkAvailability
)

/* ========================================
   STEP 6 - GUEST CAPACITY RULES
======================================== */

function checkGuestCapacity() {

  if (
    !guests?.value ||
    !accommodation?.value
  ) {
    return
  }


  const guestCount =
    Number(guests.value)


  const selectedRoom =
    accommodation.value


  let isValid = true


  /* Room One / Room Two */

  if (selectedRoom === 'room-one' && guestCount > 3) {
    isValid = false
  }


  /* Entire Villa */

  if (
    selectedRoom === 'entire-villa' &&
    guestCount > 6
  ) {
    isValid = false
  }


  /* Remove old message */

  const oldCapacityStatus =
    document.querySelector(
      '#capacityStatus'
    )

  oldCapacityStatus?.remove()


  /* Create status */

  const capacityStatus =
    document.createElement('div')

  capacityStatus.id =
    'capacityStatus'


  if (isValid) {

    capacityStatus.className =
      'capacity-status valid'

    capacityStatus.innerHTML = `
      <span>✓</span>
      This accommodation is suitable for your group.
    `

  } else {

    capacityStatus.className =
      'capacity-status invalid'

    capacityStatus.innerHTML = `
      <span>!</span>
      This room can accommodate a maximum of 3 guests.
      Please choose another accommodation option.
    `

  }


  /* Show message */

  accommodation.parentElement?.insertAdjacentElement(

    'afterend',

    capacityStatus

  )

}


/* ========================================
   CAPACITY EVENT LISTENERS
======================================== */

guests?.addEventListener(
  'change',
  checkGuestCapacity
)


accommodation?.addEventListener(
  'change',
  checkGuestCapacity
)
/* ========================================
   STEP 8 - BOOKING PRICE CALCULATION
======================================== */


/* ========================================
   TEMPORARY ROOM PRICES
======================================== */


const roomPrices = {
  LKR: {
    'room-one': 18000,
    'entire-villa': 25000
  }
}

// LKR remains the source price. USD is calculated using a live public exchange-rate API.
let selectedCurrency: 'LKR' | 'USD' = 'LKR'
let lkrToUsdRate = 0
let exchangeRateLoaded = false

async function loadExchangeRate() {
  const note = document.querySelector<HTMLElement>('#exchangeRateNote')
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/LKR', { cache: 'no-store' })
    if (!response.ok) throw new Error('Exchange-rate request failed')
    const data = await response.json() as { result?: string; rates?: { USD?: number }; time_last_update_utc?: string }
    if (data.result !== 'success' || !data.rates?.USD || data.rates.USD <= 0) throw new Error('Exchange rate unavailable')
    lkrToUsdRate = data.rates.USD
    exchangeRateLoaded = true
    if (note) note.textContent = `Live rate: Rs. 1 = $${lkrToUsdRate.toFixed(6)}. Rates may change.`
  } catch (error) {
    exchangeRateLoaded = false
    if (note) note.textContent = 'Live USD rate is unavailable. Please use LKR or try again later.'
    if (selectedCurrency === 'USD') {
      selectedCurrency = 'LKR'
      const selector = document.querySelector<HTMLSelectElement>('#currencySelector')
      if (selector) selector.value = 'LKR'
    }
  }
  calculateBookingPrice()
}

function convertFromLkr(amount: number) {
  return selectedCurrency === 'USD' ? amount * lkrToUsdRate : amount
}

function formatCurrency(amountLkr: number) {
  const amount = convertFromLkr(amountLkr)
  return selectedCurrency === 'USD'
    ? `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `Rs. ${Math.round(amount).toLocaleString('en-LK')}`
}


/* ========================================
   GET NUMBER OF NIGHTS
======================================== */

function getNumberOfNights() {

  if (!checkin?.value || !checkout?.value) {

    return 0

  }


  const checkinDate =
    new Date(checkin.value)


  const checkoutDate =
    new Date(checkout.value)


  const difference =
    checkoutDate.getTime() -
    checkinDate.getTime()


  const nights =
    difference / (1000 * 60 * 60 * 24)


  return nights > 0 ? nights : 0

}


/* ========================================
   CALCULATE BOOKING PRICE
======================================== */

/* ========================================
   STEP 9 - PROFESSIONAL PRICE SUMMARY
======================================== */

function calculateBookingPrice() {


  const totalStayPrice =
    document.querySelector<HTMLElement>(
      '#totalStayPrice'
    )


  const payNowPrice =
    document.querySelector<HTMLElement>(
      '#payNowPrice'
    )


  const remainingBalance =
    document.querySelector<HTMLElement>(
      '#remainingBalance'
    )


  const payNowLabel =
    document.querySelector<HTMLElement>(
      '#payNowLabel'
    )


  /* Reset function */

  function resetPrices() {

    totalStayPrice!.textContent =
      'Price will be calculated'

    payNowPrice!.textContent =
      'Price will be calculated'

    remainingBalance!.textContent =
      'Price will be calculated'

  }


  /* Required booking information */

  if (
    !accommodation?.value ||
    !checkin?.value ||
    !checkout?.value
  ) {

    resetPrices()

    return

  }


  /* Guest Type */

  /* Currency Selector */

const currency = selectedCurrency

  if (currency === 'USD' && !exchangeRateLoaded) {
    resetPrices()
    return
  }

  /* Number of Nights */

  const nights =
    getNumberOfNights()


  if (nights <= 0) {

    resetPrices()

    return

  }


  /* Room Price */

  
const pricePerNightLkr =
  roomPrices.LKR[
    accommodation.value as
    keyof typeof roomPrices.LKR
  ]
  const pricePerNight = pricePerNightLkr


  /* Total Stay Price (base amount in LKR) */

  const totalPrice =
    pricePerNight * nights


  /* Payment Option */

  const payment =
    document.querySelector<HTMLInputElement>(
      'input[name="payment"]:checked'
    )


  const isDeposit =
    payment?.value === 'deposit'


  /* Payment Calculation */

  const payNowAmount =
    isDeposit
      ? totalPrice * 0.30
      : totalPrice


  const remainingAmount =
    totalPrice - payNowAmount


  /* Currency */

  /* Currency */

/* Format LKR base amounts in the selected display currency. */
  function formatPrice(amountLkr: number) {
    return formatCurrency(amountLkr)
  }


  /* Update Summary */

  totalStayPrice!.textContent =
    formatPrice(totalPrice)


  payNowPrice!.textContent =
    formatPrice(payNowAmount)


  remainingBalance!.textContent =
    formatPrice(remainingAmount)


  /* Update Label */

  if (payNowLabel) {

    payNowLabel.textContent =
      isDeposit
        ? 'Deposit requested (30%)'
        : 'Pay Now (Full Payment)'

  }

}


/* ========================================
   PRICE CALCULATION LIVE UPDATE
======================================== */


/* Accommodation */

accommodation?.addEventListener(
  'change',
  calculateBookingPrice
)


/* Dates */

checkin?.addEventListener(
  'change',
  calculateBookingPrice
)


checkout?.addEventListener(
  'change',
  calculateBookingPrice
)


/* Currency changes are handled by the single listener above. */

/* Payment Option */

document
  .querySelectorAll<HTMLInputElement>(
    'input[name="payment"]'
  )
  .forEach((option) => {

    option.addEventListener(
      'change',
      calculateBookingPrice
    )

  })

const bookingForm =
  document.querySelector<HTMLFormElement>('#bookingForm')
  /* ========================================
   STEP 10 - BOOKING CONFIRMATION
======================================== */

bookingForm?.addEventListener(
  'submit',
  async (event: SubmitEvent) => {

    event.preventDefault()


    /* Get selected booking details */

    const selectedRoom =
      accommodation?.value


    const selectedGuests =
      guests?.value


    const selectedCheckin =
      checkin?.value


    const selectedCheckout =
      checkout?.value


    /* Basic validation */

    if (
      !selectedRoom ||
      !selectedGuests ||
      !selectedCheckin ||
      !selectedCheckout
    ) {

      alert(
        'Please complete all booking details.'
      )

      return

    }


    /* ========================================
       CHECK GUEST CAPACITY
    ======================================== */

    const guestCount =
      Number(selectedGuests)

    if (guestCount > 4) {
      alert('For 5 or more guests, please use the Large Groups request form for a personalised quote.')
      return
    }

    if (
      selectedRoom === 'room-one' &&
      guestCount > 3
    ) {

      alert(
        'This room can accommodate a maximum of 3 guests.'
      )

      return

    }


    /* ========================================
       CHECK AVAILABILITY
    ======================================== */

    let available: boolean
    try {
      available = await isRoomAvailable(
        selectedRoom,
        selectedCheckin,
        selectedCheckout
      )
    } catch {
      alert('We could not verify availability with the database. Please try again in a moment.')
      return
    }

    if (!available) {

      alert(
        'Sorry, this accommodation is not available for the selected dates.'
      )

      return

    }


    /* ========================================
       GET BOOKING INFORMATION
    ======================================== */

    
      


    const selectedPayment =
      document.querySelector<HTMLInputElement>(
        'input[name="payment"]:checked'
      )


    


    const paymentType =
      selectedPayment?.value === 'deposit'
        ? '30% Deposit'
        : 'Full Payment'


    /* Room name */

    const roomName =
      accommodation?.options[
        accommodation.selectedIndex
      ].text || 'Not selected'


    /* Get price information from summary */

    const totalPrice =
      document.querySelector(
        '#totalStayPrice'
      )?.textContent ||
      ''


    const payNow =
      document.querySelector(
        '#payNowPrice'
      )?.textContent ||
      ''


    const remaining =
      document.querySelector(
        '#remainingBalance'
      )?.textContent ||
      ''


    /* ========================================
       CREATE CONFIRMATION MODAL
    ======================================== */

    const oldModal =
      document.querySelector(
        '#confirmationModal'
      )

    oldModal?.remove()


    const confirmationModal =
      document.createElement('div')


    confirmationModal.id =
      'confirmationModal'


    confirmationModal.className =
      'confirmation-modal'


    confirmationModal.innerHTML = `

      <div class="confirmation-box">


        <button
          class="confirmation-close"
          id="closeConfirmation"
          type="button"
        >
          ×
        </button>


        <p class="section-subtitle">
          REVIEW YOUR BOOKING
        </p>


        <h2>Confirm Your Stay</h2>


        <div class="gold-line"></div>


        <p class="confirmation-intro">

          Please review your booking details before submitting your request.

        </p>


        <div class="confirmation-details">


          <div>
            <span>Accommodation</span>
            <strong>${roomName}</strong>
          </div>


          


          <div>
            <span>Guests</span>
            <strong>${selectedGuests} Guest${selectedGuests === '1' ? '' : 's'}</strong>
          </div>


          <div>
            <span>Check-in</span>
            <strong>${selectedCheckin}</strong>
          </div>


          <div>
            <span>Check-out</span>
            <strong>${selectedCheckout}</strong>
          </div>


          <div>
            <span>Total Stay Price</span>
            <strong>${totalPrice}</strong>
          </div>


          <div class="confirmation-pay-now">
            <span>${paymentType}</span>
            <strong>${payNow}</strong>
          </div>


          <div>
            <span>Remaining Balance</span>
            <strong>${remaining}</strong>
          </div>


        </div>


        <div class="confirmation-actions">


          <button
            type="button"
            class="confirmation-back-btn"
            id="editBooking"
          >
            EDIT BOOKING
          </button>


          <button
            type="button"
            class="confirmation-payment-btn"
            id="confirmPayment"
          >
            CONFIRM BOOKING REQUEST
          </button>


        </div>


      </div>

    `


    document.body.appendChild(
      confirmationModal
    )


    /* ========================================
       CLOSE / EDIT BOOKING
    ======================================== */

    const closeConfirmation =
      document.querySelector<HTMLButtonElement>(
        '#closeConfirmation'
      )


    const editBooking =
      document.querySelector<HTMLButtonElement>(
        '#editBooking'
      )


    closeConfirmation?.addEventListener(
      'click',
      () => {

        confirmationModal.remove()

      }
    )


    editBooking?.addEventListener(
      'click',
      () => {

        confirmationModal.remove()

      }
    )


    /* ========================================
       CONFIRM BOOKING
    ======================================== */

    const confirmPayment =
      document.querySelector<HTMLButtonElement>(
        '#confirmPayment'
      )


    confirmPayment?.addEventListener(
      'click',
      async () => {
        confirmPayment.disabled = true
        confirmPayment.textContent = 'SAVING BOOKING...'

        try {
          const bookingData = createBookingData()

          // Re-check at final submission so a date booked while the modal was open is rejected.
          const stillAvailable = await isRoomAvailable(
            bookingData.stay.room,
            bookingData.stay.checkin,
            bookingData.stay.checkout
          )
          if (!stillAvailable) {
            confirmationModal.remove()
            alert('Sorry, these dates have just become unavailable. Please choose different dates.')
            return
          }

          const { error } = await supabase
            .from('bookings')
            .insert({
              guest_name: bookingData.guest.name,
              email: bookingData.guest.email,
              phone: bookingData.guest.phone,
              country: bookingData.guest.country,
              check_in: bookingData.stay.checkin,
              check_out: bookingData.stay.checkout,
              guests: bookingData.stay.guests,
              room_type: bookingData.stay.room,
              extra_services: bookingData.services,
              total_amount: bookingData.totalAmountLkr,
              currency: 'LKR',
              payment_method: bookingData.payment.type,
              booking_status: 'pending'
            })

          if (error) {
            console.error('Supabase booking insert failed:', error)
            alert(`Could not save your booking: ${error.message}`)
            confirmPayment.disabled = false
            confirmPayment.textContent = 'CONFIRM BOOKING REQUEST'
            return
          }

          // Only clear the form after Supabase confirms the booking was saved.
          confirmationModal.remove()
          bookingForm?.reset()

          // Reset the display currency to LKR and refresh the price summary.
          selectedCurrency = 'LKR'
          if (currencySelector) {
            currencySelector.value = 'LKR'
          }

          // Remove any availability message for the previous dates.
          document.querySelector('#availabilityStatus')?.remove()

          // Recalculate the empty/default form state.
          calculateBookingPrice()

          alert('Your booking request has been saved and is pending confirmation. The form has been cleared for the next booking. We will contact you to confirm availability, payment, breakfast, and any selected extra services.')
        } catch (error) {
          console.error('Booking submission error:', error)
          alert('Something went wrong while saving your booking. Please try again.')
          confirmPayment.disabled = false
          confirmPayment.textContent = 'CONFIRM BOOKING REQUEST'
        }
      }
    )

  }
)

/* ========================================
   STEP 11 - CREATE BOOKING DATA
======================================== */

function createBookingData() {


  /* ========================================
     GET GUEST DETAILS
  ======================================== */

  const name =
    document.querySelector<HTMLInputElement>(
      '#name'
    )?.value || ''


  const email =
    document.querySelector<HTMLInputElement>(
      '#email'
    )?.value || ''


  const phone =
    document.querySelector<HTMLInputElement>(
      '#phone'
    )?.value || ''


  

  const country =
    document.querySelector<HTMLSelectElement>('#country')?.value || ''

  const currency = selectedCurrency
/* ========================================
     GET BOOKING DETAILS
  ======================================== */

  const selectedRoom =
    accommodation?.value || ''


  const selectedGuests =
    guests?.value || ''


  const selectedCheckin =
    checkin?.value || ''


  const selectedCheckout =
    checkout?.value || ''

  const selectedRoomKey = selectedRoom as keyof typeof roomPrices.LKR
  const pricePerNight = roomPrices.LKR[selectedRoomKey] || 0
  const totalAmountLkr = pricePerNight * getNumberOfNights()


  


  /* ========================================
     GET PAYMENT OPTION
  ======================================== */

  const selectedPayment =
    document.querySelector<HTMLInputElement>(
      'input[name="payment"]:checked'
    )


  const paymentType =
    selectedPayment?.value || ''


  /* ========================================
     GET EXTRA SERVICES
  ======================================== */

  const selectedServices =
    document.querySelectorAll<HTMLInputElement>(
      'input[name="services"]:checked'
    )


  const services =
    Array.from(selectedServices).map(
      (service) => service.value
    )


  /* ========================================
     GET SPECIAL REQUEST
  ======================================== */

  const message =
    document.querySelector<HTMLTextAreaElement>(
      '#message'
    )?.value || ''


  /* ========================================
     CREATE BOOKING OBJECT
  ======================================== */

  const bookingData = {

    /* Booking ID */

    bookingId:

      'GV-' +
      Date.now(),


    /* Guest */

    guest: {

      name,

      email,

      phone,
      country

      

    },


    /* Stay */

    stay: {

      room: selectedRoom,

      guests: Number(selectedGuests),

      checkin: selectedCheckin,

      checkout: selectedCheckout

    },


    /* Extra Services */

    services,


    /* Special Request */

    message,


    /* Payment */

    payment: {

      type: paymentType,

      status: 'pending'

    },

    totalAmountLkr,
    displayCurrency: currency,


    /* Booking Status */

    status: 'pending',


    /* Created Date */

    createdAt:

      new Date().toISOString()

  }


  /* ========================================
     SHOW DATA FOR TESTING
  ======================================== */

  console.log(
    'BOOKING DATA:',
    bookingData
  )


  return bookingData

}

/* ========================================
   BOOKING NAVBAR SCROLL EFFECT
======================================== */

const bookingNav =
  document.querySelector(".booking-nav");


window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {

    bookingNav?.classList.add("scrolled");

  } else {

    bookingNav?.classList.remove("scrolled");

  }

});

// Load a fresh LKR→USD rate for the currency selector.
void loadExchangeRate()
