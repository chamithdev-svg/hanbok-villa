import './style.css'
import { supabase } from './supabase'
import * as XLSX from 'xlsx'

type Booking = {
  id: string
  guest_name: string | null
  email: string | null
  phone: string | null
  country: string | null
  check_in: string
  check_out: string
  guests: number
  room_type: string
  extra_services: unknown
  total_amount: number | string | null
  currency: string | null
  payment_method: string | null
  booking_status: string | null
  archived_at: string | null
  created_at: string | null
}

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Missing #app element')

const style = document.createElement('style')
style.textContent = `
  .hv-admin{max-width:1440px;margin:0 auto;padding:28px 20px 60px;color:#252525;font-family:Arial,sans-serif}
  .hv-admin *{box-sizing:border-box}.hv-admin-head{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:24px}
  .hv-admin h1{font-size:clamp(25px,4vw,36px);margin:0 0 7px}.hv-muted{color:#666}.hv-panel{background:#fff;border:1px solid #e7e1d7;border-radius:14px;padding:22px;margin-bottom:20px;box-shadow:0 4px 18px #00000008}
  .hv-login{max-width:430px;margin:8vh auto}.hv-admin label{display:block;font-weight:600;font-size:14px;margin:13px 0 6px}.hv-admin input,.hv-admin select{width:100%;padding:12px;border:1px solid #d5d5d5;border-radius:8px;background:#fff;font:inherit}.hv-btn{border:0;border-radius:8px;padding:11px 15px;background:#9b7536;color:white;font-weight:700;cursor:pointer}.hv-btn:disabled{opacity:.55;cursor:wait}.hv-btn.secondary{background:#eee;color:#222}.hv-btn.danger{background:#8c3434}.hv-actions{display:flex;gap:8px;flex-wrap:wrap}.hv-error{color:#a12626;white-space:pre-wrap}.hv-success{color:#176a38}.hv-stats{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:12px;margin-bottom:20px}.hv-stat{padding:15px;border:1px solid #e7e1d7;border-radius:12px;background:#faf8f4}.hv-stat strong{display:block;font-size:25px;margin-top:6px}.hv-toolbar{display:grid;grid-template-columns:1fr 220px 180px;gap:12px;margin-bottom:15px}.hv-table-wrap{overflow:auto}table.hv-table{border-collapse:collapse;width:100%;min-width:1050px;font-size:14px}table.hv-table th,table.hv-table td{padding:12px 10px;border-bottom:1px solid #eee;text-align:left;vertical-align:top}table.hv-table th{background:#f8f6f1;white-space:nowrap}.hv-table td small{display:block;color:#666;margin-top:4px}.hv-status{display:inline-block;border-radius:20px;padding:5px 9px;background:#f5eddb;font-size:12px;font-weight:700;text-transform:capitalize}.hv-status.confirmed{background:#e4f4e9;color:#176a38}.hv-status.cancelled{background:#f8e5e5;color:#982e2e}.hv-status.pending{background:#fff1cc;color:#765414}.hv-note{font-size:13px;color:#666;line-height:1.5}.hv-empty{padding:30px;text-align:center;color:#666}.hv-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px}.hv-tab{border:1px solid #ddd;background:#fff;color:#222;border-radius:8px;padding:10px 14px;font-weight:700;cursor:pointer}.hv-tab.active{background:#9b7536;color:#fff;border-color:#9b7536}.hv-media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}.hv-media-card{border:1px solid #e7e1d7;border-radius:12px;padding:10px;min-width:0}.hv-media-card img,.hv-media-card video{width:100%;height:145px;object-fit:cover;border-radius:8px;background:#f4f1eb}.hv-media-card p{overflow-wrap:anywhere;font-size:13px}.hv-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 14px}.hv-media-card .hv-actions{margin-top:10px}.hv-section[hidden]{display:none}.hv-blocked-list{display:grid;gap:10px}.hv-blocked-item{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;padding:14px;border:1px solid #e7e1d7;border-radius:10px}.hv-blocked-item p{margin:4px 0}.hv-blocked-form{max-width:760px}@media(max-width:600px){.hv-form-grid{grid-template-columns:1fr}}
  .hv-pagination{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:16px}.hv-page-buttons{display:flex;gap:6px;align-items:center;flex-wrap:wrap}.hv-page-buttons button{border:1px solid #d9d3c8;border-radius:8px;padding:8px 12px;background:#fff;color:#252525;cursor:pointer;min-width:38px}.hv-page-buttons button.active{background:#9b7536;color:#fff;border-color:#9b7536;font-weight:700}.hv-page-buttons button:disabled{opacity:.45;cursor:not-allowed}.hv-page-size{display:flex;align-items:center;gap:8px}.hv-admin .hv-page-size select{width:auto;min-width:75px;padding:8px}.hv-pagination-info{font-size:13px;color:#666}
  .hv-archive-toggle{display:flex;align-items:center;gap:9px;margin:12px 0}.hv-admin .hv-archive-toggle input{width:auto}.hv-archive-badge{display:inline-block;color:#6b527b;background:#f2ebf7;border-radius:12px;padding:3px 8px;font-size:12px}.hv-archive-tools{margin:12px 0;display:flex;gap:12px;flex-wrap:wrap;align-items:center}
  .hv-report-controls{display:flex;gap:12px;align-items:end;flex-wrap:wrap}.hv-report-controls>div{min-width:150px}.hv-report-controls label{margin-top:0}.hv-report-controls button{margin-bottom:0}.hv-report-info{margin-top:12px}
  @media(max-width:720px){.hv-admin{padding:18px 12px}.hv-panel{padding:15px}.hv-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.hv-toolbar{grid-template-columns:1fr}.hv-admin-head{align-items:flex-start}}

  /* HANBOK VILLA responsive admin — visual changes only; database logic untouched. */
  .hv-admin [hidden]{display:none!important}
  .hv-admin button,.hv-admin input,.hv-admin select{min-height:42px}
  .hv-admin :focus-visible{outline:3px solid #d4a44d;outline-offset:2px}
  .hv-admin-head{border-bottom:1px solid #e8e0d3;padding-bottom:18px}
  .hv-admin-head .hv-actions{flex-shrink:0}
  .hv-tab{transition:background .18s ease,transform .18s ease}
  .hv-tab:hover{background:#f6eee0}.hv-tab.active:hover{background:#9b7536}
  .hv-stat{position:relative;overflow:hidden}.hv-stat strong{color:#243b30}
  .hv-table td{overflow-wrap:anywhere}
  @media(max-width:760px){
    body{overflow-x:hidden}
    .hv-admin{padding:14px 12px 44px;width:100%;max-width:100%;font-size:14px}
    .hv-admin-head{gap:14px;margin-bottom:14px;padding:6px 2px 16px}
    .hv-admin-head h1{font-size:clamp(25px,7vw,32px);line-height:1.18}
    .hv-admin-head .hv-muted{line-height:1.45}
    .hv-admin-head .hv-actions{width:100%;display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .hv-admin-head .hv-actions button{width:100%}
    .hv-panel{padding:17px 14px;margin-bottom:14px;border-radius:16px;box-shadow:0 5px 15px #00000007;min-width:0}
    .hv-panel h2{font-size:20px;line-height:1.3;margin:0 0 9px}
    .hv-tabs{display:flex;flex-wrap:nowrap;overflow-x:auto;scroll-snap-type:x proximity;gap:8px;padding:4px 2px 12px;margin-bottom:10px;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:#c7aa7c transparent}
    .hv-tab{white-space:nowrap;flex:0 0 auto;scroll-snap-align:start;padding:12px 14px;border-radius:12px;font-size:13px;min-height:46px}
    .hv-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:14px}
    .hv-stat{padding:14px 12px;border-radius:14px;background:linear-gradient(145deg,#fff,#f8f5ee);font-size:13px}
    .hv-stat strong{font-size:28px;margin-top:8px}
    .hv-toolbar{grid-template-columns:1fr;gap:9px;margin-bottom:12px}
    .hv-toolbar input,.hv-toolbar select{min-width:0}
    .hv-form-grid{grid-template-columns:1fr;gap:0}
    .hv-admin .hv-archive-toggle{display:flex;line-height:1.45;align-items:center;font-size:13px;margin:12px 0}
    .hv-admin .hv-archive-toggle input{flex:0 0 18px;min-height:18px;height:18px}
    .hv-table-wrap{overflow:visible;min-width:0}
    table.hv-table{display:block;min-width:0;width:100%;border-collapse:separate}
    table.hv-table thead{display:none}
    table.hv-table tbody{display:grid;gap:14px}
    table.hv-table tbody tr{display:block;border:1px solid #e7e1d7;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 14px #00000008;padding:6px 14px}
    table.hv-table tbody tr:has(.hv-empty){padding:4px}
    table.hv-table tbody td{display:block;width:100%;border-bottom:1px solid #eee9df;padding:11px 0;min-width:0;overflow-wrap:anywhere;font-size:13px;line-height:1.45}
    table.hv-table tbody td:last-child{border-bottom:0}
    table.hv-table tbody td[data-label]::before{content:attr(data-label);display:block;color:#87704c;font-size:11px;line-height:1.4;letter-spacing:.07em;font-weight:800;text-transform:uppercase;margin-bottom:5px}
    table.hv-table tbody td[data-label="Guest"]{font-size:15px;border-bottom:1px solid #e2d7c6}
    table.hv-table tbody td[data-label="Guest"]::before{content:'GUEST DETAILS'}
    table.hv-table tbody td[data-label="Guest"] strong{font-size:17px;color:#1d3329}
    table.hv-table tbody td[data-label="Amount"] strong{font-size:18px;color:#9b7536}
    table.hv-table tbody td small{font-size:12px;line-height:1.5;overflow-wrap:anywhere}
    table.hv-table tbody .hv-actions{display:grid;grid-template-columns:1fr;gap:8px;width:100%}
    table.hv-table tbody .hv-actions select,table.hv-table tbody .hv-actions button,table.hv-table tbody td[data-label="Archive / Restore"] button,table.hv-table tbody td[data-label="Permanent Delete"] button{width:100%;min-height:44px}
    .hv-pagination{display:flex;flex-direction:column;align-items:stretch;gap:12px}
    .hv-page-buttons{justify-content:center;gap:6px}
    .hv-page-buttons button{min-width:38px;padding:9px 10px}
    .hv-page-size{justify-content:space-between;font-size:13px}
    .hv-pagination-info{text-align:center}
    .hv-admin .hv-page-size select{max-width:110px}
    .hv-media-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .hv-media-card{padding:9px}.hv-media-card img,.hv-media-card video{height:115px}
    .hv-media-card .hv-actions button{width:100%}
    .hv-blocked-item{align-items:stretch;padding:13px;gap:12px;border-radius:13px}
    .hv-blocked-item>div{width:100%;min-width:0!important}
    .hv-blocked-item>.hv-actions{width:100%}
    .hv-blocked-item>.hv-actions button{flex:1}
    .hv-price-form .hv-actions{display:grid;grid-template-columns:minmax(0,1fr) auto;width:100%}
    .hv-price-form .hv-actions input{width:100%!important;min-width:0}
    .hv-report-controls>div{width:100%;min-width:0}
    #hv-create-coupon{width:100%}
    #hv-coupon-admin-list .hv-blocked-item button{min-height:44px}
    .hv-login{margin:8vh auto;max-width:430px}
  }
  @media(max-width:380px){
    .hv-admin{padding:10px 9px 35px}
    .hv-panel{padding:13px 11px}
    .hv-tab{padding:10px 11px}
    .hv-media-grid{grid-template-columns:1fr}
  }
`
document.head.appendChild(style)

app.innerHTML = `
  <main class="hv-admin">
    <section id="hv-login-view" class="hv-panel hv-login">
      <h1>HANBOK VILLA</h1><p class="hv-muted">Admin booking management</p>
      <form id="hv-login-form">
        <label for="hv-email">Admin email</label><input id="hv-email" type="email" autocomplete="username" required>
        <label for="hv-password">Password</label><input id="hv-password" type="password" autocomplete="current-password" required>
        <button class="hv-btn" style="width:100%;margin-top:18px" type="submit">Sign in</button>
        <p id="hv-login-message" class="hv-error" role="status" aria-live="polite"></p>
        <p class="hv-note" style="margin-top:12px">Security: 5 incorrect sign-in attempts lock this browser for 10 minutes. Admin sessions sign out after 10 minutes of inactivity.</p>
      </form>
      <p class="hv-note">Use an admin account created in Supabase Authentication. Public sign-up is not provided on this page.</p>
    </section>
    <section id="hv-dashboard" hidden>
      <header class="hv-admin-head"><div><p class="hv-muted" style="margin:0 0 7px">HANBOK VILLA · PRIVATE AREA</p><h1>Admin Dashboard</h1><p class="hv-muted" style="margin:0">Manage bookings, gallery photos and guest review photos.</p></div><div class="hv-actions"><button id="hv-refresh" class="hv-btn secondary">Refresh</button><button id="hv-logout" class="hv-btn secondary">Sign out</button></div></header>
      <p id="hv-message" role="status"></p>
      <nav class="hv-tabs" aria-label="Admin sections"><button class="hv-tab active" data-tab="bookings">Bookings</button><button class="hv-tab" data-tab="cancellations">Cancellation Requests</button><button class="hv-tab" data-tab="gallery">Gallery Photos</button><button class="hv-tab" data-tab="reviews">Guest Reviews</button><button class="hv-tab" data-tab="blocked">Blocked Dates</button><button class="hv-tab" data-tab="prices">Room Prices</button><button class="hv-tab" data-tab="coupons">Coupons (5%)</button></nav>
      <section id="hv-bookings-section" class="hv-section">
      <section class="hv-panel hv-full-backup-panel">
        <h2>Full Data Backup</h2>
        <p class="hv-note">Export all accessible booking, cancellation, coupon, gallery, review, blocked-date and room-price records into one Excel workbook. No date filter. This is a data export, not a complete Supabase database or media-file backup.</p>
        <button id="hv-full-backup" class="hv-btn" type="button">Download Full Backup (.xlsx)</button>
        <p id="hv-full-backup-message" class="hv-note" role="status" aria-live="polite"></p>
      </section>

      <section class="hv-panel">
  <h2>Monthly Guest Report</h2>
  <p class="hv-note">
    Select a year and month to download the Excel report.
  </p>

  <div class="hv-form-grid">
    <div>
      <label for="hv-report-year">Year</label>
      <input
        id="hv-report-year"
        type="number"
        min="2000"
        max="2100"
        value="2026"
      >
    </div>

    <div>
      <label for="hv-report-month">Month</label>
      <select id="hv-report-month"></select>
    </div>
  </div>

  <button
    id="hv-export-report"
    class="hv-btn"
    type="button"
    style="margin-top:15px"
  >
    Download Excel (.xlsx)
  </button>

  <p id="hv-report-message" class="hv-note"></p>
</section>
      <div class="hv-stats"><div class="hv-stat">All bookings<strong id="hv-stat-all">—</strong></div><div class="hv-stat">Pending<strong id="hv-stat-pending">—</strong></div><div class="hv-stat">Confirmed<strong id="hv-stat-confirmed">—</strong></div><div class="hv-stat">Cancelled<strong id="hv-stat-cancelled">—</strong></div></div>
      <section class="hv-panel"><div class="hv-toolbar"><input id="hv-search" type="search" placeholder="Search guest, email, phone…" aria-label="Search bookings"><select id="hv-status-filter" aria-label="Filter by status"><option value="all">All statuses</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option></select><select id="hv-room-filter" aria-label="Filter by accommodation"><option value="all">All accommodations</option><option value="room-one">Room 1</option><option value="room-two">Room 2</option><option value="entire-villa">Entire Villa</option></select></div>
      <label class="hv-archive-toggle"><input id="hv-show-archived-bookings" type="checkbox"> Show archived bookings (hidden by default)</label>
      <div class="hv-table-wrap"><table class="hv-table"><thead><tr><th>Guest</th><th>Stay</th><th>Guests / Room</th><th>Extras</th><th>Amount</th><th>Status</th><th>Update status</th><th>Archive / Restore</th><th>Permanent Delete</th></tr></thead><tbody id="hv-bookings-body"><tr><td colspan="9" class="hv-empty">Loading bookings…</td></tr></tbody></table></div>
      <div class="hv-pagination" role="navigation" aria-label="Bookings pagination">
        <span id="hv-pagination-info" class="hv-pagination-info" aria-live="polite">Showing 0 bookings</span>
        <div id="hv-pagination-buttons" class="hv-page-buttons"></div>
        <label class="hv-page-size" for="hv-page-size">Rows per page
          <select id="hv-page-size" aria-label="Bookings per page">
            <option value="10">10</option>
            <option value="20" selected>20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <p class="hv-note">Archive hides old records but does not delete them or change booking availability. Only cancelled or checked-out bookings can be archived. Restore makes them visible again. Permanent Delete appears only on eligible archived bookings; verify a Full Backup before deleting.</p>
      <p class="hv-note">Confirm only after checking availability and arranging payment with the guest. Browser checks are not a substitute for database-level protection against concurrent admin changes. Cancelling here updates the status permanently; it does not automatically refund a payment. Booking emails are handled separately by the configured notification service.</p></section>
      </section>
       <section id="hv-cancellations-section" class="hv-section" hidden>
         <section class="hv-panel">
           <h2>Cancellation Requests <span id="hv-cancellation-count" class="hv-status pending">0 pending</span></h2>
           <p class="hv-note">Approval cancels the booking but does not issue a refund. Review the guest's request and payment details first.</p>
           <label class="hv-archive-toggle"><input id="hv-show-archived-cancellations" type="checkbox"> Show archived requests</label>
           <p id="hv-cancellation-message" role="status"></p>
           <div id="hv-cancellation-list" class="hv-blocked-list">Loading cancellation requests…</div>
         </section>
       </section>
      <section id="hv-prices-section" class="hv-section" hidden>
        <section class="hv-panel"><h2>Room Prices</h2><p class="hv-note">LKR per night. Changes apply to new booking requests only; existing bookings retain their saved totals.</p><div id="hv-prices-list">Loading prices…</div><p id="hv-prices-message" role="status"></p></section>
      </section>
      <section id="hv-coupons-section" class="hv-section" hidden>
        <section class="hv-panel"><h2>One-Time 5% Coupons</h2><p class="hv-note">Create a single-use coupon; it is consumed when the booking request is successfully saved. Cancellation does not automatically return a used coupon.</p>
          <button id="hv-create-coupon" type="button" class="hv-btn">Generate 5% coupon</button>
          <p id="hv-coupon-admin-message" role="status"></p>
          <div id="hv-coupon-admin-list" class="hv-blocked-list">Open this tab to view coupons.</div>
        </section>
      </section>
      <section id="hv-gallery-section" class="hv-section" hidden>
        <section class="hv-panel"><h2>Homepage & Gallery Media</h2><p class="hv-note">Upload photos or videos and choose where they appear. Videos are limited to 100 MB each.</p>
          <form id="hv-gallery-form"><label for="hv-gallery-file">Choose photo or video</label><input id="hv-gallery-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime" required><div class="hv-form-grid"><div><label for="hv-gallery-destination">Show on</label><select id="hv-gallery-destination"><option value="both">Home page and Gallery page</option><option value="home">Home page only</option><option value="gallery">Gallery page only</option></select></div><div><label for="hv-gallery-caption">Caption (optional)</label><input id="hv-gallery-caption" maxlength="160" placeholder="Villa garden"></div><div><label for="hv-gallery-order">Display order</label><input id="hv-gallery-order" type="number" min="0" value="0"></div></div><button class="hv-btn" type="submit" style="margin-top:14px">Upload media</button></form><p id="hv-gallery-message" role="status"></p></section>
        <section class="hv-panel"><h2>Current Gallery Photos</h2><div id="hv-gallery-grid" class="hv-media-grid"><p class="hv-muted">Loading photos…</p></div></section>
      </section>
      <section id="hv-blocked-section" class="hv-section" hidden>
        <section class="hv-panel hv-blocked-form">
          <h2>Block Dates</h2>
          <p class="hv-note">Use this for bookings received by phone or WhatsApp. Choose Room 1, Room 2, or Entire Villa. Check-out date is not included in blocked nights. Check bookings before blocking; this form does not perform an atomic inventory reservation.</p>
          <form id="hv-blocked-form">
            <div class="hv-form-grid">
              <div><label for="hv-blocked-room">Accommodation</label><select id="hv-blocked-room" required><option value="room-one">Room 1</option><option value="room-two">Room 2</option><option value="entire-villa">Entire Villa</option></select></div>
              <div><label for="hv-blocked-note">Note</label><input id="hv-blocked-note" maxlength="200" placeholder="Phone booking / WhatsApp"></div>
              <div><label for="hv-blocked-start">Check-in date</label><input id="hv-blocked-start" type="date" required></div>
              <div><label for="hv-blocked-end">Check-out date</label><input id="hv-blocked-end" type="date" required></div>
            </div>
            <button class="hv-btn" type="submit" style="margin-top:14px">Block dates</button>
          </form>
          <p id="hv-blocked-message" role="status"></p>
        </section>
        <section class="hv-panel">
          <h2>Currently Blocked Dates</h2>
          <div id="hv-blocked-list" class="hv-blocked-list"><p class="hv-muted">Loading blocked dates…</p></div>
        </section>
      </section>
      <section id="hv-reviews-section" class="hv-section" hidden>
        <section class="hv-panel"><h2>Add Guest Review</h2><p class="hv-note">Only publish reviews you have permission to share. Add a review photo if the guest has agreed.</p>
          <form id="hv-review-form"><div class="hv-form-grid"><div><label for="hv-review-name">Guest name</label><input id="hv-review-name" required maxlength="100" placeholder="Guest name"></div><div><label for="hv-review-rating">Rating</label><select id="hv-review-rating"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></div></div><label for="hv-review-text">Review</label><textarea id="hv-review-text" required maxlength="1200" rows="4" style="width:100%;padding:12px;border:1px solid #d5d5d5;border-radius:8px;font:inherit" placeholder="Guest review text"></textarea><label for="hv-review-photo">Review photo (optional)</label><input id="hv-review-photo" type="file" accept="image/*"><label for="hv-review-order">Display order</label><input id="hv-review-order" type="number" min="0" value="0"><button class="hv-btn" type="submit" style="margin-top:14px">Publish review</button></form><p id="hv-review-message" role="status"></p></section>
        <section class="hv-panel"><h2>Current Guest Reviews</h2><div id="hv-reviews-grid" class="hv-media-grid"><p class="hv-muted">Loading reviews…</p></div></section>
      </section>
    </section>
  </main>`

const loginView = document.querySelector<HTMLElement>('#hv-login-view')!
const dashboard = document.querySelector<HTMLElement>('#hv-dashboard')!
const loginForm = document.querySelector<HTMLFormElement>('#hv-login-form')!
const loginMessage = document.querySelector<HTMLElement>('#hv-login-message')!
const message = document.querySelector<HTMLElement>('#hv-message')!
const tbody = document.querySelector<HTMLTableSectionElement>('#hv-bookings-body')!
const searchInput = document.querySelector<HTMLInputElement>('#hv-search')!
const statusFilter = document.querySelector<HTMLSelectElement>('#hv-status-filter')!
const roomFilter = document.querySelector<HTMLSelectElement>('#hv-room-filter')!
let bookings: Booking[] = []
let busyIds = new Set<string>()
const showArchivedBookings = document.querySelector<HTMLInputElement>('#hv-show-archived-bookings')!
let currentBookingPage = 1
const pageSizeSelect = document.querySelector<HTMLSelectElement>('#hv-page-size')!
const paginationInfo = document.querySelector<HTMLElement>('#hv-pagination-info')!
const paginationButtons = document.querySelector<HTMLElement>('#hv-pagination-buttons')!

type BlockedDate = {
  id: number
  room_type: string
  start_date: string
  end_date: string
  note: string | null
  created_at: string | null
}
const blockedForm = document.querySelector<HTMLFormElement>('#hv-blocked-form')!
const blockedList = document.querySelector<HTMLDivElement>('#hv-blocked-list')!
const blockedMessage = document.querySelector<HTMLElement>('#hv-blocked-message')!
const blockedStart = document.querySelector<HTMLInputElement>('#hv-blocked-start')!
const blockedEnd = document.querySelector<HTMLInputElement>('#hv-blocked-end')!
let blockedDates: BlockedDate[] = []
let busyBlockedIds = new Set<number>()

function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]!))
}
function niceDate(value: string | null | undefined): string {
  if (!value) return '—'
  const parts = value.split('-').map(Number)
  if (parts.length !== 3 || parts.some(Number.isNaN)) return escapeHtml(value)
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])))
}
function roomName(value: string): string {
  if (value === 'room-one' || value === 'Room One') return 'Room 1'
  if (value === 'room-two' || value === 'Room Two') return 'Room 2'
  if (value === 'entire-villa' || value === 'Entire Villa') return 'Entire Villa'
  return value || '—'
}
function extrasText(value: unknown): string {
  if (!Array.isArray(value) || value.length === 0) return 'None'
  return value.map(item => typeof item === 'string' ? item : JSON.stringify(item)).join(', ')
}
function filteredBookings(): Booking[] {
  const q = searchInput.value.trim().toLowerCase()
  return bookings.filter(b => {
    const archiveOk = showArchivedBookings.checked || !b.archived_at
    const statusOk = statusFilter.value === 'all' || (b.booking_status || 'pending').toLowerCase() === statusFilter.value
    const roomOk = roomFilter.value === 'all' || b.room_type === roomFilter.value
    const searchOk = !q || [b.guest_name, b.email, b.phone, b.country, b.id].some(v => String(v ?? '').toLowerCase().includes(q))
    return archiveOk && statusOk && roomOk && searchOk
  })
}
function renderBookingPagination(total: number, pageCount: number, pageSize: number): void {
  const first = total === 0 ? 0 : (currentBookingPage - 1) * pageSize + 1
  const last = Math.min(currentBookingPage * pageSize, total)
  paginationInfo.textContent = `Showing ${first}–${last} of ${total} booking(s) · Page ${currentBookingPage} of ${pageCount}`
  const pages = new Set<number>([1, pageCount])
  for (let page = Math.max(1, currentBookingPage - 2); page <= Math.min(pageCount, currentBookingPage + 2); page++) pages.add(page)
  const orderedPages = [...pages].sort((a,b) => a-b)
  const controls: string[] = [`<button type="button" data-page="${currentBookingPage - 1}" ${currentBookingPage <= 1 ? 'disabled' : ''} aria-label="Previous page">‹ Previous</button>`]
  let previous = 0
  for (const page of orderedPages) {
    if (page > previous + 1) controls.push('<span aria-hidden="true">…</span>')
    controls.push(`<button type="button" data-page="${page}" class="${page === currentBookingPage ? 'active' : ''}" ${page === currentBookingPage ? 'aria-current="page"' : ''}>${page}</button>`)
    previous = page
  }
  controls.push(`<button type="button" data-page="${currentBookingPage + 1}" ${currentBookingPage >= pageCount ? 'disabled' : ''} aria-label="Next page">Next ›</button>`)
  paginationButtons.innerHTML = controls.join('')
  paginationButtons.querySelectorAll<HTMLButtonElement>('button[data-page]').forEach(button => {
    button.addEventListener('click', () => {
      const page = Number(button.dataset.page)
      if (Number.isInteger(page) && page >= 1 && page <= pageCount && page !== currentBookingPage) {
        currentBookingPage = page
        render()
      }
    })
  })
}
function sriLankaToday(): string {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  const part = (type: string) => parts.find(item => item.type === type)?.value || ''
  return `${part('year')}-${part('month')}-${part('day')}`
}
function render(): void {
  const visible = bookings.filter(b => !b.archived_at)
  const count = (status: string) => visible.filter(b => (b.booking_status || 'pending').toLowerCase() === status).length
  document.querySelector('#hv-stat-all')!.textContent = String(visible.length)
  document.querySelector('#hv-stat-pending')!.textContent = String(count('pending'))
  document.querySelector('#hv-stat-confirmed')!.textContent = String(count('confirmed'))
  document.querySelector('#hv-stat-cancelled')!.textContent = String(count('cancelled'))
  const filtered = filteredBookings()
  const pageSize = Number(pageSizeSelect.value) || 20
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  currentBookingPage = Math.max(1, Math.min(currentBookingPage, pageCount))
  renderBookingPagination(filtered.length, pageCount, pageSize)
  const rows = filtered.slice((currentBookingPage - 1) * pageSize, currentBookingPage * pageSize)
  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="hv-empty">No bookings match these filters.</td></tr>'
    return
  }
  tbody.innerHTML = rows.map(b => {
    const status = (b.booking_status || 'pending').toLowerCase()
    const busy = busyIds.has(b.id)
    const canArchive = (b.booking_status || 'pending').toLowerCase() === 'cancelled' || b.check_out <= sriLankaToday()
    const extras = escapeHtml(extrasText(b.extra_services))
    const amount = b.total_amount == null ? '—' : `${escapeHtml(b.currency || 'LKR')} ${escapeHtml(Number(b.total_amount).toLocaleString('en-US', { maximumFractionDigits: 2 }))}`
    return `<tr>
      <td data-label="Guest"><strong>${escapeHtml(b.guest_name || 'Guest')}</strong><small>${escapeHtml(b.email)}</small><small>${escapeHtml(b.phone)} · ${escapeHtml(b.country)}</small><small>ID: ${escapeHtml(b.id)}</small></td>
      <td data-label="Stay">${niceDate(b.check_in)} → ${niceDate(b.check_out)}<small>Check-in: 2:00 PM onwards · Check-out: before 11:00 AM (Sri Lanka time)</small><small>Requested ${escapeHtml(b.created_at ? new Date(b.created_at).toLocaleString() : '—')}</small></td>
      <td data-label="Guests / Room">${escapeHtml(b.guests)} guest(s)<small>${escapeHtml(roomName(b.room_type))}</small></td>
      <td data-label="Extras">${extras}</td><td data-label="Amount"><strong>${amount}</strong><small>Payment: ${escapeHtml(b.payment_method || '—')}</small></td>
      <td data-label="Status"><span class="hv-status ${escapeHtml(status)}">${escapeHtml(status)}</span>${b.archived_at ? '<small class="hv-archive-badge">Archived</small>' : ''}</td>
      <td data-label="Update Status"><div class="hv-actions"><select data-status-for="${escapeHtml(b.id)}" aria-label="New status for booking" ${busy || status === 'cancelled' || Boolean(b.archived_at) ? 'disabled' : ''}><option value="pending" ${status === 'pending' ? 'selected' : ''}>Pending</option><option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option><option value="cancelled" ${status === 'cancelled' ? 'selected' : ''}>Cancelled</option></select><button class="hv-btn" data-save-status="${escapeHtml(b.id)}" ${busy || status === 'cancelled' || Boolean(b.archived_at) ? 'disabled' : ''}>${status === 'cancelled' ? 'Final status' : busy ? 'Saving…' : 'Save'}</button></div>${status === 'cancelled' ? '<small>Cancelled — Final Status</small>' : ''}</td>
      <td data-label="Archive / Restore"><button type="button" class="hv-btn ${b.archived_at ? 'secondary' : 'danger'}" data-booking-archive="${escapeHtml(b.id)}" ${busy || (!b.archived_at && !canArchive) ? 'disabled' : ''}>${b.archived_at ? 'Restore' : 'Archive'}</button>${!b.archived_at && !canArchive ? '<small>Available after checkout or cancellation</small>' : ''}</td>
      <td data-label="Permanent Delete">${b.archived_at && canArchive ? `<button type="button" class="hv-btn danger" data-booking-delete="${escapeHtml(b.id)}" ${busy ? 'disabled' : ''}>Delete Forever</button>` : '<small>Archive a completed/cancelled booking first.</small>'}</td>
    </tr>`
  }).join('')
  tbody.querySelectorAll<HTMLButtonElement>('[data-save-status]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.saveStatus!
    const select = tbody.querySelector<HTMLSelectElement>(`select[data-status-for="${CSS.escape(id)}"]`)
    if (select) void updateStatus(id, select.value)
  }))
  tbody.querySelectorAll<HTMLButtonElement>('[data-booking-archive]').forEach(button => button.addEventListener('click', () => void changeBookingArchive(button.dataset.bookingArchive!)))
  tbody.querySelectorAll<HTMLButtonElement>('[data-booking-delete]').forEach(button => button.addEventListener('click', () => void permanentlyDeleteBooking(button.dataset.bookingDelete!)))
}
// Full application-data export. Kept separate from the existing monthly report.
// Export is deliberately read-only and stops completely on any table/RLS failure.
const hvFullBackupButton = document.querySelector<HTMLButtonElement>('#hv-full-backup')!
const hvFullBackupMessage = document.querySelector<HTMLElement>('#hv-full-backup-message')!
const hvBackupTables = [
  { table: 'bookings', sheet: 'Bookings', key: 'id' },
  { table: 'booking_cancellation_requests', sheet: 'Cancellations', key: 'id' },
  { table: 'hv_discount_coupons', sheet: 'Coupons', key: 'code' },
  { table: 'gallery_photos', sheet: 'Gallery', key: 'id' },
  { table: 'guest_reviews', sheet: 'Reviews', key: 'id' },
  { table: 'blocked_dates', sheet: 'Blocked Dates', key: 'id' },
  { table: 'room_prices', sheet: 'Room Prices', key: 'id' },
] as const

function hvBackupCell(value: unknown): string | number | boolean | null {
  if (value === null || value === undefined) return null
  if (typeof value === 'number') return Number.isFinite(value) ? value : String(value)
  if (typeof value === 'boolean') return value
  const raw = typeof value === 'string' ? value : JSON.stringify(value)
  // Treat potentially executable Excel formula-like strings as literal text.
  return /^[\s\u0000-\u001f]*[=+\-@]/.test(raw) ? "'" + raw : raw
}

async function hvFetchAllBackupRows(table: string, key: string): Promise<Record<string, unknown>[]> {
  const result: Record<string, unknown>[] = []
  const batchSize = 500
  for (let offset = 0; ; offset += batchSize) {
    const { data, error } = await supabase.from(table)
      .select('*')
      .order(key, { ascending: true })
      .range(offset, offset + batchSize - 1)
    if (error) throw new Error(`${table}: ${error.message}`)
    const batch = (data || []) as Record<string, unknown>[]
    result.push(...batch)
    if (result.length > 1048575) throw new Error(`${table} exceeds Excel's row limit.`)
    if (batch.length < batchSize) break
  }
  return result
}

async function hvExportFullBackup(): Promise<void> {
  hvFullBackupButton.disabled = true
  hvFullBackupMessage.className = 'hv-note'
  hvFullBackupMessage.textContent = 'Checking admin account…'
  try {
    const { data: userResult, error: userError } = await supabase.auth.getUser()
    if (userError || !userResult.user) throw new Error('Please sign in as admin before exporting.')
    const workbook = XLSX.utils.book_new()
    const exportedAt = new Date().toISOString()
    const summary: (string | number)[][] = [
      ['HANBOK VILLA — Application Data Export'],
      ['Exported at (UTC)', exportedAt],
      ['Scope', 'All rows readable by this admin account, including archived records'],
      ['Limitations', 'Not a complete Supabase backup. Does not include media binaries, Auth users, RLS policies, functions, storage files or private server configuration.'],
      ['Warning', 'Keep this file secure: it may contain personal guest data.'],
      [],
      ['Sheet', 'Record count'],
    ]
    for (const { table, sheet, key } of hvBackupTables) {
      hvFullBackupMessage.textContent = `Exporting ${sheet}…`
      const rows = await hvFetchAllBackupRows(table, key)
      const columns = Array.from(new Set(rows.flatMap(row => Object.keys(row))))
      // Include a column label even if the table is empty.
      const headings = columns.length ? columns : ['No records']
      const sheetData = [headings, ...rows.map(row => headings.map(name => hvBackupCell(row[name])))]
      const ws = XLSX.utils.aoa_to_sheet(sheetData)
      ws['!cols'] = headings.map(name => ({ wch: Math.min(40, Math.max(16, name.length + 3)) }))
      XLSX.utils.book_append_sheet(workbook, ws, sheet)
      summary.push([sheet, rows.length])
    }
    const summaryWs = XLSX.utils.aoa_to_sheet(summary)
    summaryWs['!cols'] = [{ wch: 38 }, { wch: 100 }]
    // Put export manifest first for easy validation after download.
    XLSX.utils.book_append_sheet(workbook, summaryWs, 'Export Info')
    workbook.SheetNames.splice(workbook.SheetNames.indexOf('Export Info'), 1)
    workbook.SheetNames.unshift('Export Info')
    const fileDate = exportedAt.slice(0, 10)
    XLSX.writeFile(workbook, `HANBOK_VILLA_Full_Data_Export_${fileDate}.xlsx`)
    hvFullBackupMessage.className = 'hv-success'
    hvFullBackupMessage.textContent = 'Excel export generated. Check the Export Info sheet and store the file securely. This does not include image/video files or database configuration.'
  } catch (error) {
    hvFullBackupMessage.className = 'hv-error'
    hvFullBackupMessage.textContent = `Full data export failed; no complete backup was produced: ${error instanceof Error ? error.message : String(error)}`
  } finally {
    hvFullBackupButton.disabled = false
  }
}
hvFullBackupButton.addEventListener('click', () => void hvExportFullBackup())

// Monthly report is fetched directly from Supabase in batches, so exports are not
// limited by the dashboard's current booking list or Supabase's default row cap.
const reportYear = document.querySelector<HTMLInputElement>('#hv-report-year')!
const reportMonth = document.querySelector<HTMLSelectElement>('#hv-report-month')!
const reportButton = document.querySelector<HTMLButtonElement>('#hv-export-report')!
const reportMessage = document.querySelector<HTMLElement>('#hv-report-message')!
const currentYear = new Date().getFullYear()
reportYear.value = String(currentYear)
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
monthNames.forEach((name, index) => reportMonth.add(new Option(name, String(index + 1).padStart(2, '0'))))
reportMonth.value = String(new Date().getMonth() + 1).padStart(2, '0')

async function exportMonthlyReport(): Promise<void> {
  const year = Number(reportYear.value)
  const month = Number(reportMonth.value)
  if (!Number.isInteger(year) || year < 2000 || year > 2100 || !Number.isInteger(month) || month < 1 || month > 12) {
    reportMessage.textContent = 'Choose a valid year and month.'
    return
  }
  const start = `${year}-${String(month).padStart(2, '0')}-01`
  const end = month === 12 ? `${year + 1}-01-01` : `${year}-${String(month + 1).padStart(2, '0')}-01`
  reportButton.disabled = true
  reportMessage.className = 'hv-report-info hv-note'
  reportMessage.textContent = 'Preparing report…'
  try {
    const all: Booking[] = []
    const batchSize = 500
    for (let offset = 0; ; offset += batchSize) {
      const { data, error } = await supabase.from('bookings')
        .select('id,guest_name,email,phone,country,check_in,check_out,guests,room_type,extra_services,total_amount,currency,payment_method,booking_status,archived_at,created_at')
        .gte('check_in', start).lt('check_in', end)
        .order('check_in', { ascending: true }).order('id', { ascending: true })
        .range(offset, offset + batchSize - 1)
      if (error) throw error
      const batch = (data || []) as Booking[]
      all.push(...batch)
      if (batch.length < batchSize) break
    }
    // Avoid mixing currencies in one total.
    const currencies = [...new Set(all.map(b => b.currency || 'LKR'))].sort()
    const rows: (string | number | null)[][] = [
      ['HANBOK VILLA — Monthly Guest Report'],
      ['Check-in month', `${monthNames[month - 1]} ${year}`],
      ['Report basis', 'Bookings with check-in dates during the selected month'],
      ['Important', 'Booking values are not confirmed payments received'],
      [],
      ['Booking ID','Guest Name','Email','Phone','Country','Check-in','Check-out','Guests','Accommodation','Extra Services','Booking Status','Payment Method','Currency','Booking Value','Request Date'],
    ]
    for (const b of all) {
      const amount = b.total_amount == null || b.total_amount === '' ? null : Number(b.total_amount)
      rows.push([b.id,b.guest_name || '',b.email || '',b.phone || '',b.country || '',b.check_in,b.check_out,Number(b.guests) || 0,roomName(b.room_type),extrasText(b.extra_services),b.booking_status || 'pending',b.payment_method || '',b.currency || 'LKR',amount != null && Number.isFinite(amount) ? amount : null,b.created_at || ''])
    }
    rows.push([],['SUMMARY'],['Total Bookings',all.length],['Total Guests',all.reduce((sum,b) => sum + (Number(b.guests) || 0),0)],['Confirmed Bookings',all.filter(b => (b.booking_status || '').toLowerCase() === 'confirmed').length])
    for (const currency of currencies) {
      const matching = all.filter(b => (b.currency || 'LKR') === currency)
      const total = (items: Booking[]) => items.reduce((sum,b) => {
        const value = Number(b.total_amount)
        return sum + (b.total_amount != null && Number.isFinite(value) ? value : 0)
      },0)
      rows.push([`All Booking Value (${currency})`,total(matching)])
      rows.push([`Confirmed Booking Value (${currency})`,total(matching.filter(b => (b.booking_status || '').toLowerCase() === 'confirmed'))])
    }
    rows.push(['Payments Actually Received','Not tracked in this report'])
    const sheet = XLSX.utils.aoa_to_sheet(rows)
    sheet['!cols'] = [{wch:38},{wch:25},{wch:32},{wch:19},{wch:18},{wch:16},{wch:16},{wch:12},{wch:20},{wch:34},{wch:20},{wch:20},{wch:12},{wch:18},{wch:25}]
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook,sheet,'Monthly Guests')
    XLSX.writeFile(workbook,`HANBOK_VILLA_Guests_${year}-${String(month).padStart(2,'0')}.xlsx`)
    reportMessage.className = 'hv-report-info hv-success'
    reportMessage.textContent = `Excel report downloaded: ${all.length} booking(s) for ${monthNames[month - 1]} ${year}.`
  } catch (error) {
    reportMessage.className = 'hv-report-info hv-error'
    reportMessage.textContent = `Report failed: ${error instanceof Error ? error.message : String(error)}`
  } finally {
    reportButton.disabled = false
  }
}
reportButton.addEventListener('click', () => void exportMonthlyReport())

async function loadBookings(): Promise<void> {
  message.className = 'hv-muted'
  message.textContent = 'Loading bookings…'
  // Paginate Supabase requests too: its default SELECT limit is often 1,000 rows.
  // This ensures searching, stats, and dashboard page navigation include all records.
  try {
    const all: Booking[] = []
    const batchSize = 500
    for (let offset = 0; ; offset += batchSize) {
      const { data, error } = await supabase.from('bookings')
        .select('id,guest_name,email,phone,country,check_in,check_out,guests,room_type,extra_services,total_amount,currency,payment_method,booking_status,archived_at,created_at')
        .order('created_at', { ascending: false, nullsFirst: false })
        .order('id', { ascending: false })
        .range(offset, offset + batchSize - 1)
      if (error) throw error
      const batch = (data || []) as Booking[]
      all.push(...batch)
      if (batch.length < batchSize) break
    }
    bookings = all
    message.className = 'hv-success'
    message.textContent = `${bookings.length} booking(s) loaded.`
    render()
  } catch (error) {
    bookings = []
    render()
    message.className = 'hv-error'
    message.textContent = `Could not load bookings: ${error instanceof Error ? error.message : String(error)}. Check that this signed-in user is listed in public.admin_users and the admin RLS policies are installed.`
    tbody.innerHTML = '<tr><td colspan="9" class="hv-empty">Unable to load bookings.</td></tr>'
  }
}

// Permanent deletion is controlled by a server-side admin-only RPC; no direct table DELETE grants.
async function permanentlyDeleteBooking(id: string): Promise<void> {
  const booking = bookings.find(item => item.id === id)
  if (!booking || !booking.archived_at || busyIds.has(id)) return
  if (!confirm(`PERMANENTLY delete booking for ${booking.guest_name || 'Guest'}?\n\nBooking and linked reviewed cancellation requests will be removed. Coupon codes remain untouched.\n\nExport and verify your Full Backup first.`)) return
  if (prompt(`To confirm permanent deletion, type DELETE exactly:\nBooking ID: ${id}`) !== 'DELETE') return
  busyIds.add(id); render()
  try {
    const { data, error } = await supabase.rpc('hv_admin_delete_archived_booking', { p_booking_id: id })
    if (error) throw error
    if (data !== true) throw new Error('Database did not confirm deletion.')
    await loadBookings()
    await loadCancellationRequests()
    setNotice(message, 'Booking permanently deleted from database. Coupon records were retained.', true)
  } catch (error) {
    setNotice(message, `Permanent delete failed: ${error instanceof Error ? error.message : String(error)}`)
  } finally { busyIds.delete(id); render() }
}

async function changeBookingArchive(id: string): Promise<void> {
  const booking = bookings.find(b => b.id === id)
  if (!booking || busyIds.has(id)) return
  const restoring = Boolean(booking.archived_at)
  const todaySriLanka = sriLankaToday()
  if (!restoring && booking.booking_status !== 'cancelled' && booking.check_out > todaySriLanka) {
    setNotice(message, 'Only checked-out or cancelled bookings can be archived.')
    return
  }
  if (!confirm(`${restoring ? 'Restore' : 'Archive'} booking for ${booking.guest_name || 'this guest'}? Records will not be deleted.`)) return
  busyIds.add(id); render()
  try {
    const { data, error } = await supabase.from('bookings')
      .update({ archived_at: restoring ? null : new Date().toISOString() })
      .eq('id', id).select('id,archived_at')
    if (error) throw error
    if (!data || data.length !== 1 || Boolean(data[0].archived_at) === restoring) throw new Error('Archive change not saved; check admin UPDATE/SELECT RLS policies.')
    await loadBookings()
    setNotice(message, restoring ? 'Booking restored.' : 'Booking archived. Use Show archived bookings to restore it.', true)
  } catch (error) {
    setNotice(message, `Archive failed: ${error instanceof Error ? error.message : String(error)}`)
  } finally { busyIds.delete(id); render() }
}

async function updateStatus(id: string, status: string): Promise<void> {
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) return
  const booking = bookings.find(b => b.id === id)
  if (!booking) return
  if ((booking.booking_status || 'pending').toLowerCase() === 'cancelled') {
    setNotice(message, 'Cancelled bookings are final and cannot be changed.')
    return
  }
  if (status === 'confirmed' && booking.booking_status !== 'confirmed') {
    // Re-read inventory: the in-memory list may be stale. Do not offer a conflict override.
    const [liveBookings, liveBlocks] = await Promise.all([
      supabase.from('bookings').select('id,room_type,check_in,check_out,booking_status'),
      supabase.from('blocked_dates').select('room_type,start_date,end_date')
    ])
    if (liveBookings.error || liveBlocks.error) {
      setNotice(message, `Cannot verify inventory: ${liveBookings.error?.message || liveBlocks.error?.message}`)
      return
    }
    const normalize = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-')
    const target = normalize(booking.room_type)
    const conflicts = (a: string, b: string) => a === 'entire-villa' || b === 'entire-villa' || a === b
    const bookingConflict = (liveBookings.data || []).some(other =>
      other.id !== id && ['pending', 'confirmed'].includes((other.booking_status || 'pending').toLowerCase()) &&
      other.check_in < booking.check_out && other.check_out > booking.check_in &&
      conflicts(normalize(other.room_type || ''), target)
    )
    const blockConflict = (liveBlocks.data || []).some(block =>
      block.start_date < booking.check_out && block.end_date > booking.check_in &&
      conflicts(normalize(block.room_type || ''), target)
    )
    if (bookingConflict || blockConflict) {
      setNotice(message, 'Cannot confirm: another active booking or blocked date overlaps this accommodation. Resolve the conflict first.')
      return
    }
  }
  if (!window.confirm(`Change booking status to “${status}” for ${booking.guest_name || 'this guest'}?`)) return
  busyIds.add(id); render(); message.className = 'hv-muted'; message.textContent = 'Saving status…'
  try {
    const { data: updated, error } = await supabase
      .from('bookings')
      .update({ booking_status: status })
      .eq('id', id)
      .select('id,booking_status')

    if (error) throw error
    if (!updated || updated.length !== 1 || updated[0].booking_status !== status) {
      throw new Error('Database did not confirm the update. Check Supabase admin UPDATE and SELECT RLS policies.')
    }

    await loadBookings()
    message.className = 'hv-success'
    message.textContent = `Booking status saved as ${status}.`
  } catch (err) {
    message.className = 'hv-error'
    message.textContent = `Status update failed: ${err instanceof Error ? err.message : String(err)}`
    render()
  } finally {
    busyIds.delete(id)
    render()
  }
}

const galleryGrid = document.querySelector<HTMLDivElement>('#hv-gallery-grid')!
const reviewsGrid = document.querySelector<HTMLDivElement>('#hv-reviews-grid')!
const galleryMessage = document.querySelector<HTMLElement>('#hv-gallery-message')!
const reviewMessage = document.querySelector<HTMLElement>('#hv-review-message')!
const mediaBucket = 'villa-media'

type GalleryPhoto = { id: string; image_url: string; caption: string | null; display_order: number | null; storage_path: string | null; media_type: 'image' | 'video'; show_on_home: boolean; show_in_gallery: boolean; created_at: string }
type GuestReview = { id: string; guest_name: string; review_text: string; rating: number; photo_url: string | null; photo_path: string | null; display_order: number | null; created_at: string }
function setNotice(el: HTMLElement, text: string, ok = false) { el.className = ok ? 'hv-success' : 'hv-error'; el.textContent = text }
function safeFileName(name: string) { return name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(-100) || 'photo' }
async function uploadMedia(file: File): Promise<{url:string; path:string; mediaType:'image'|'video'}> {
  const isImage = file.type.startsWith('image/')
  const isVideo = file.type.startsWith('video/')
  if (!isImage && !isVideo) throw new Error('Choose an image or video file.')
  if (isImage && file.size > 8 * 1024 * 1024) throw new Error('Images must be 8 MB or smaller.')
  if (isVideo && file.size > 100 * 1024 * 1024) throw new Error('Videos must be 100 MB or smaller.')
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user) throw new Error('Please sign in again before uploading.')
  const path = `${userData.user.id}/${Date.now()}-${safeFileName(file.name)}`
  const { error } = await supabase.storage.from(mediaBucket).upload(path, file, { upsert: false, contentType: file.type })
  if (error) throw error
  const { data } = supabase.storage.from(mediaBucket).getPublicUrl(path)
  return { url: data.publicUrl, path, mediaType: isVideo ? 'video' : 'image' }
}
async function removeStoredFile(path: string | null | undefined) {
  if (!path) return
  const { error } = await supabase.storage.from(mediaBucket).remove([path])
  if (error) console.warn('Could not remove stored image:', error.message)
}
async function loadGallery() {
  galleryGrid.innerHTML = '<p class="hv-muted">Loading media…</p>'
  const { data, error } = await supabase.from('gallery_photos').select('id,image_url,caption,display_order,storage_path,media_type,show_on_home,show_in_gallery,created_at').order('display_order', { ascending: true }).order('created_at', { ascending: false })
  if (error) { galleryGrid.innerHTML = ''; setNotice(galleryMessage, `Could not load media: ${error.message}`); return }
  const items = (data || []) as GalleryPhoto[]
  galleryMessage.textContent = `${items.length} media item(s).`
  galleryGrid.innerHTML = items.length ? items.map(item => `<article class="hv-media-card">${item.media_type === 'video' ? `<video src="${escapeHtml(item.image_url)}" controls preload="metadata"></video>` : `<img src="${escapeHtml(item.image_url)}" alt="${escapeHtml(item.caption || 'Villa gallery photo')}" loading="lazy">`}<p><strong>${escapeHtml(item.caption || 'No caption')}</strong><br><span class="hv-muted">${item.media_type === 'video' ? 'Video' : 'Photo'} · Order: ${escapeHtml(item.display_order ?? 0)}<br>Home: ${item.show_on_home ? 'Yes' : 'No'} · Gallery: ${item.show_in_gallery ? 'Yes' : 'No'}</span></p><div class="hv-actions"><button class="hv-btn danger" data-delete-gallery="${escapeHtml(item.id)}">Delete</button></div></article>`).join('') : '<p class="hv-empty">No managed media yet.</p>'
  galleryGrid.querySelectorAll<HTMLButtonElement>('[data-delete-gallery]').forEach(btn => btn.addEventListener('click', () => void deleteGalleryPhoto(btn.dataset.deleteGallery!)))
}
async function deleteGalleryPhoto(id: string) {
  const { data: item, error: readError } = await supabase.from('gallery_photos').select('id,storage_path').eq('id', id).single()
  if (readError || !item) { setNotice(galleryMessage, `Could not find media: ${readError?.message || 'Not found'}`); return }
  if (!confirm('Delete this media item from the website? This cannot be undone.')) return
  const { error } = await supabase.from('gallery_photos').delete().eq('id', id)
  if (error) { setNotice(galleryMessage, `Delete failed: ${error.message}`); return }
  await removeStoredFile(item.storage_path)
  setNotice(galleryMessage, 'Media deleted.', true); await loadGallery()
}
document.querySelector<HTMLFormElement>('#hv-gallery-form')!.addEventListener('submit', async event => {
  event.preventDefault(); const form = event.currentTarget as HTMLFormElement
  const file = document.querySelector<HTMLInputElement>('#hv-gallery-file')!.files?.[0]
  if (!file) return
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!; submit.disabled = true; setNotice(galleryMessage, 'Uploading media…')
  let uploaded: {url:string;path:string;mediaType:'image'|'video'} | null = null
  try {
    uploaded = await uploadMedia(file)
    const caption = document.querySelector<HTMLInputElement>('#hv-gallery-caption')!.value.trim() || null
    const order = Number(document.querySelector<HTMLInputElement>('#hv-gallery-order')!.value || 0)
    const destination = document.querySelector<HTMLSelectElement>('#hv-gallery-destination')!.value
    const { error } = await supabase.from('gallery_photos').insert({ image_url: uploaded.url, storage_path: uploaded.path, caption, display_order: order, media_type: uploaded.mediaType, show_on_home: destination === 'home' || destination === 'both', show_in_gallery: destination === 'gallery' || destination === 'both' })
    if (error) { await removeStoredFile(uploaded.path); throw error }
    form.reset(); document.querySelector<HTMLInputElement>('#hv-gallery-order')!.value = '0'; document.querySelector<HTMLSelectElement>('#hv-gallery-destination')!.value = 'both'; setNotice(galleryMessage, `${uploaded.mediaType === 'video' ? 'Video' : 'Photo'} uploaded successfully.`, true); await loadGallery()
  } catch (err) { setNotice(galleryMessage, `Upload failed: ${err instanceof Error ? err.message : String(err)}`) }
  finally { submit.disabled = false }
})
async function loadReviews() {
  reviewsGrid.innerHTML = '<p class="hv-muted">Loading reviews…</p>'
  const { data, error } = await supabase.from('guest_reviews').select('id,guest_name,review_text,rating,photo_url,photo_path,display_order,created_at').order('display_order', { ascending: true }).order('created_at', { ascending: false })
  if (error) { reviewsGrid.innerHTML = ''; setNotice(reviewMessage, `Could not load reviews: ${error.message}`); return }
  const items = (data || []) as GuestReview[]
  reviewMessage.textContent = `${items.length} review(s).`
  reviewsGrid.innerHTML = items.length ? items.map(item => `<article class="hv-media-card">${item.photo_url ? `<img src="${escapeHtml(item.photo_url)}" alt="Photo for review by ${escapeHtml(item.guest_name)}" loading="lazy">` : '<div style="height:145px;display:grid;place-items:center;background:#f4f1eb;border-radius:8px">No photo</div>'}<p><strong>${escapeHtml(item.guest_name)}</strong> · ${'★'.repeat(Math.max(1,Math.min(5,Number(item.rating)||5)))}<br>${escapeHtml(item.review_text)}<br><span class="hv-muted">Order: ${escapeHtml(item.display_order ?? 0)}</span></p><div class="hv-actions"><button class="hv-btn danger" data-delete-review="${escapeHtml(item.id)}">Delete</button></div></article>`).join('') : '<p class="hv-empty">No guest reviews yet.</p>'
  reviewsGrid.querySelectorAll<HTMLButtonElement>('[data-delete-review]').forEach(btn => btn.addEventListener('click', () => void deleteReview(btn.dataset.deleteReview!)))
}
async function deleteReview(id: string) {
  const { data: item, error: readError } = await supabase.from('guest_reviews').select('id,photo_path').eq('id', id).single()
  if (readError || !item) { setNotice(reviewMessage, `Could not find review: ${readError?.message || 'Not found'}`); return }
  if (!confirm('Delete this guest review? This cannot be undone.')) return
  const { error } = await supabase.from('guest_reviews').delete().eq('id', id)
  if (error) { setNotice(reviewMessage, `Delete failed: ${error.message}`); return }
  await removeStoredFile(item.photo_path)
  setNotice(reviewMessage, 'Guest review deleted.', true); await loadReviews()
}
document.querySelector<HTMLFormElement>('#hv-review-form')!.addEventListener('submit', async event => {
  event.preventDefault(); const form = event.currentTarget as HTMLFormElement
  const name = document.querySelector<HTMLInputElement>('#hv-review-name')!.value.trim()
  const reviewText = document.querySelector<HTMLTextAreaElement>('#hv-review-text')!.value.trim()
  const rating = Number(document.querySelector<HTMLSelectElement>('#hv-review-rating')!.value)
  const photo = document.querySelector<HTMLInputElement>('#hv-review-photo')!.files?.[0]
  const order = Number(document.querySelector<HTMLInputElement>('#hv-review-order')!.value || 0)
  if (!name || !reviewText) return
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!; submit.disabled = true; setNotice(reviewMessage, 'Publishing review…')
  let uploaded: {url:string;path:string} | null = null
  try {
    if (photo) uploaded = await uploadMedia(photo)
    const { error } = await supabase.from('guest_reviews').insert({ guest_name: name, review_text: reviewText, rating, photo_url: uploaded?.url ?? null, photo_path: uploaded?.path ?? null, display_order: order })
    if (error) { if (uploaded) await removeStoredFile(uploaded.path); throw error }
    form.reset(); document.querySelector<HTMLInputElement>('#hv-review-order')!.value = '0'; setNotice(reviewMessage, 'Guest review published.', true); await loadReviews()
  } catch (err) { setNotice(reviewMessage, `Publish failed: ${err instanceof Error ? err.message : String(err)}`) }
  finally { submit.disabled = false }
})
function renderBlockedDates(): void {
  if (!blockedDates.length) {
    blockedList.innerHTML = '<p class="hv-empty">No dates are currently blocked.</p>'
    return
  }
  blockedList.innerHTML = blockedDates.map(item => {
    const busy = busyBlockedIds.has(item.id)
    return `<article class="hv-blocked-item">
      <div>
        <strong>${escapeHtml(roomName(item.room_type))}</strong>
        <p>${niceDate(item.start_date)} → ${niceDate(item.end_date)} <span class="hv-muted">(check-out excluded)</span></p>
        <small>${escapeHtml(item.note || 'No note')} · Added ${escapeHtml(item.created_at ? new Date(item.created_at).toLocaleString() : 'date unknown')}</small>
      </div>
      <button class="hv-btn danger" data-unblock-date="${item.id}" ${busy ? 'disabled' : ''}>${busy ? 'Removing…' : 'Unblock'}</button>
    </article>`
  }).join('')
  blockedList.querySelectorAll<HTMLButtonElement>('[data-unblock-date]').forEach(button => {
    button.addEventListener('click', () => void unblockDates(Number(button.dataset.unblockDate)))
  })
}

async function loadBlockedDates(): Promise<void> {
  blockedList.innerHTML = '<p class="hv-muted">Loading blocked dates…</p>'
  const { data, error } = await supabase
    .from('blocked_dates')
    .select('id,room_type,start_date,end_date,note,created_at')
    .order('start_date', { ascending: true })
  if (error) {
    blockedDates = []
    blockedList.innerHTML = '<p class="hv-error">Unable to load blocked dates.</p>'
    setNotice(blockedMessage, `Could not load blocked dates: ${error.message}. Check that the blocked_dates table and admin RLS policies exist.`)
    return
  }
  blockedDates = (data || []) as BlockedDate[]
  blockedMessage.className = 'hv-success'
  blockedMessage.textContent = `${blockedDates.length} blocked date range(s) loaded.`
  renderBlockedDates()
}

async function unblockDates(id: number): Promise<void> {
  const item = blockedDates.find(row => row.id === id)
  if (!item || !confirm(`Unblock ${item.room_type} from ${item.start_date} to ${item.end_date}?`)) return
  busyBlockedIds.add(id)
  renderBlockedDates()
  const { error } = await supabase.from('blocked_dates').delete().eq('id', id)
  busyBlockedIds.delete(id)
  if (error) {
    setNotice(blockedMessage, `Could not unblock dates: ${error.message}`)
    renderBlockedDates()
    return
  }
  blockedDates = blockedDates.filter(row => row.id !== id)
  setNotice(blockedMessage, 'Date range unblocked.', true)
  renderBlockedDates()
}

blockedForm.addEventListener('submit', async event => {
  event.preventDefault()
  const roomType = document.querySelector<HTMLSelectElement>('#hv-blocked-room')!.value
  const startDate = blockedStart.value
  const endDate = blockedEnd.value
  const note = document.querySelector<HTMLInputElement>('#hv-blocked-note')!.value.trim() || 'Phone booking'
  if (!startDate || !endDate || endDate <= startDate) {
    setNotice(blockedMessage, 'Check-out date must be after check-in date.')
    return
  }
  const submit = blockedForm.querySelector<HTMLButtonElement>('button[type="submit"]')!
  submit.disabled = true
  setNotice(blockedMessage, 'Saving blocked dates…')
  try {
    const overlaps = blockedDates.some(item =>
      item.start_date < endDate && item.end_date > startDate &&
      (roomType === 'entire-villa' || ['entire-villa', 'Entire Villa'].includes(item.room_type) || item.room_type.toLowerCase().replace(/\s+/g, '-') === roomType)
    )
    if (overlaps) {
      setNotice(blockedMessage, 'These dates overlap an existing blocked range for this accommodation. Review the list before adding another range.')
      return
    }
    const { error } = await supabase.from('blocked_dates').insert({
      room_type: roomType,
      start_date: startDate,
      end_date: endDate,
      note
    })
    if (error) throw error
    blockedForm.reset()
    setNotice(blockedMessage, 'Dates blocked successfully.', true)
    await loadBlockedDates()
  } catch (err) {
    setNotice(blockedMessage, `Could not block dates: ${err instanceof Error ? err.message : String(err)}`)
  } finally {
    submit.disabled = false
  }
})

type RoomPrice = { id: string; accommodation: string; guest_count: number; price_lkr: number; active: boolean }
async function loadPrices(): Promise<void> {
  const list = document.querySelector<HTMLElement>('#hv-prices-list')!
  const notice = document.querySelector<HTMLElement>('#hv-prices-message')!
  list.textContent = 'Loading prices…'
  const { data, error } = await supabase.from('room_prices').select('id,accommodation,guest_count,price_lkr,active').order('accommodation').order('guest_count')
  if (error) { list.textContent = ''; setNotice(notice, `Unable to load prices: ${error.message}`); return }
  const prices = (data || []) as RoomPrice[]
  list.innerHTML = prices.map(p => `<form class="hv-price-form hv-blocked-item" data-price-id="${escapeHtml(p.id)}"><div><strong>${escapeHtml(roomName(p.accommodation))}</strong><p>${p.guest_count} guest(s) · ${p.active ? 'Active' : 'Inactive'}</p></div><div class="hv-actions"><input type="number" min="1" step="1" required value="${p.price_lkr}" aria-label="Price in LKR" style="width:160px"><button class="hv-btn" type="submit">Save Price</button></div></form>`).join('') || '<p>No room prices found.</p>'
  list.querySelectorAll<HTMLFormElement>('form[data-price-id]').forEach(form => form.addEventListener('submit', async e => {
    e.preventDefault()
    const input = form.querySelector<HTMLInputElement>('input')!
    const button = form.querySelector<HTMLButtonElement>('button')!
    const amount = Number(input.value)
    if (!Number.isSafeInteger(amount) || amount <= 0) { setNotice(notice, 'Enter a valid positive LKR price.'); return }
    button.disabled = true
    const { data: updated, error } = await supabase.from('room_prices').update({ price_lkr: amount, updated_at: new Date().toISOString() }).eq('id', form.dataset.priceId!).select('id')
    button.disabled = false
    if (error) { setNotice(notice, `Price update failed: ${error.message}`); return }
    if (!updated?.length) { setNotice(notice, 'Price was not updated. Check admin RLS permissions.'); return }
    setNotice(notice, 'Price saved successfully.', true)
    await loadPrices()
  }))
}

type CancellationRequest = {
  id: string
  booking_id: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  requested_at: string
  reviewed_at: string | null
  archived_at: string | null
}
const cancellationList = document.querySelector<HTMLElement>('#hv-cancellation-list')!
const cancellationMessage = document.querySelector<HTMLElement>('#hv-cancellation-message')!
const cancellationCount = document.querySelector<HTMLElement>('#hv-cancellation-count')!
let cancellationRequests: CancellationRequest[] = []
const busyCancellationIds = new Set<string>()
const showArchivedCancellations = document.querySelector<HTMLInputElement>('#hv-show-archived-cancellations')!

function renderCancellationRequests(): void {
  const pending = cancellationRequests.filter(r => r.status === 'pending' && !r.archived_at).length
  const visibleRequests = cancellationRequests.filter(r => showArchivedCancellations.checked || !r.archived_at)
  cancellationCount.textContent = `${pending} pending`
  if (!visibleRequests.length) {
    cancellationList.innerHTML = '<p class="hv-empty">No cancellation requests found.</p>'
    return
  }
  cancellationList.innerHTML = visibleRequests.map(request => {
    const booking = bookings.find(b => b.id === request.booking_id)
    const busy = busyCancellationIds.has(request.id)
    const guest = booking?.guest_name || 'Guest details unavailable'
    const dates = booking ? `${niceDate(booking.check_in)} → ${niceDate(booking.check_out)}` : 'Booking details unavailable'
    return `<article class="hv-blocked-item">
      <div style="flex:1;min-width:230px;overflow-wrap:anywhere">
        <strong>${escapeHtml(guest)}</strong> <span class="hv-status ${escapeHtml(request.status)}">${escapeHtml(request.status)}</span>
        <p>${dates} · ${escapeHtml(booking ? roomName(booking.room_type) : '—')}</p>
        <p><strong>Reason:</strong> ${escapeHtml(request.reason)}</p>
        <small>${escapeHtml(booking?.email || '—')} · Booking: ${escapeHtml(request.booking_id)}</small><br>
        <small>Requested: ${escapeHtml(new Date(request.requested_at).toLocaleString())}</small>
        ${request.reviewed_at ? `<br><small>Reviewed: ${escapeHtml(new Date(request.reviewed_at).toLocaleString())}</small>` : ''}
        <br><small>Booking status: ${escapeHtml(booking?.booking_status || 'unknown')}</small>
      </div>
      <div class="hv-actions">${request.archived_at ? '<span class="hv-archive-badge">Archived</span>' : ''}
       ${request.status !== 'pending' ? `<button type="button" class="hv-btn ${request.archived_at ? 'secondary' : 'danger'}" data-cancellation-archive="${escapeHtml(request.id)}" ${busy ? 'disabled' : ''}>${request.archived_at ? 'Restore' : 'Archive'}</button>` : ''}${request.archived_at && request.status !== 'pending' ? `<button type="button" class="hv-btn danger" data-cancellation-delete="${escapeHtml(request.id)}" ${busy ? 'disabled' : ''}>Delete Forever</button>` : ''}</div>
       ${request.status === 'pending' ? `<div class="hv-actions">
        <button class="hv-btn" data-cancel-approve="${escapeHtml(request.id)}" ${busy || booking?.booking_status !== 'confirmed' ? 'disabled' : ''}>${busy ? 'Processing…' : 'Approve'}</button>
        <button class="hv-btn danger" data-cancel-reject="${escapeHtml(request.id)}" ${busy || booking?.booking_status !== 'confirmed' ? 'disabled' : ''}>Reject</button>
      </div>` : ''}
    </article>`
  }).join('')
  cancellationList.querySelectorAll<HTMLButtonElement>('[data-cancellation-archive]').forEach(button => button.addEventListener('click', () => void changeCancellationArchive(button.dataset.cancellationArchive!)))
  cancellationList.querySelectorAll<HTMLButtonElement>('[data-cancellation-delete]').forEach(button => button.addEventListener('click', () => void permanentlyDeleteCancellation(button.dataset.cancellationDelete!)))
  cancellationList.querySelectorAll<HTMLButtonElement>('[data-cancel-approve]').forEach(button =>
    button.addEventListener('click', () => void reviewCancellation(button.dataset.cancelApprove!, 'approved')))
  cancellationList.querySelectorAll<HTMLButtonElement>('[data-cancel-reject]').forEach(button =>
    button.addEventListener('click', () => void reviewCancellation(button.dataset.cancelReject!, 'rejected')))
}

async function loadCancellationRequests(): Promise<void> {
  cancellationMessage.className = 'hv-muted'
  cancellationMessage.textContent = 'Loading cancellation requests…'
  const { data, error } = await supabase.from('booking_cancellation_requests')
    .select('id,booking_id,reason,status,requested_at,reviewed_at,archived_at')
    .order('requested_at', { ascending: false })
  if (error) {
    cancellationMessage.className = 'hv-error'
    cancellationMessage.textContent = `Unable to load cancellation requests: ${error.message}. Check admin RLS permissions.`
    cancellationList.innerHTML = '<p class="hv-error">Could not load requests.</p>'
    return
  }
  cancellationRequests = (data || []) as CancellationRequest[]
  cancellationMessage.className = 'hv-success'
  cancellationMessage.textContent = `${cancellationRequests.length} cancellation request(s) loaded.`
  renderCancellationRequests()
}

async function permanentlyDeleteCancellation(id: string): Promise<void> {
  const request = cancellationRequests.find(item => item.id === id)
  if (!request || !request.archived_at || request.status === 'pending' || busyCancellationIds.has(id)) return
  if (!confirm('PERMANENTLY delete this archived, reviewed cancellation request? Verify your Full Backup first.')) return
  if (prompt(`Type DELETE exactly to remove cancellation request ${id}`) !== 'DELETE') return
  busyCancellationIds.add(id); renderCancellationRequests()
  try {
    const { data, error } = await supabase.rpc('hv_admin_delete_archived_cancellation', { p_request_id: id })
    if (error) throw error
    if (data !== true) throw new Error('Database did not confirm deletion.')
    await loadCancellationRequests()
    setNotice(cancellationMessage, 'Cancellation request permanently deleted.', true)
  } catch (error) {
    setNotice(cancellationMessage, `Permanent delete failed: ${error instanceof Error ? error.message : String(error)}`)
  } finally { busyCancellationIds.delete(id); renderCancellationRequests() }
}

async function changeCancellationArchive(id: string): Promise<void> {
  const request = cancellationRequests.find(r => r.id === id)
  if (!request || request.status === 'pending' || busyCancellationIds.has(id)) return
  const restoring = Boolean(request.archived_at)
  if (!confirm(`${restoring ? 'Restore' : 'Archive'} this reviewed cancellation request? The record will not be deleted.`)) return
  busyCancellationIds.add(id); renderCancellationRequests()
  try {
    const { data, error } = await supabase.from('booking_cancellation_requests')
      .update({ archived_at: restoring ? null : new Date().toISOString() })
      .eq('id', id).select('id,archived_at')
    if (error) throw error
    if (!data || data.length !== 1 || Boolean(data[0].archived_at) === restoring) throw new Error('Archive update not saved; check admin UPDATE/SELECT RLS policies.')
    await loadCancellationRequests()
    setNotice(cancellationMessage, restoring ? 'Request restored.' : 'Request archived.', true)
  } catch (error) {
    setNotice(cancellationMessage, `Archive failed: ${error instanceof Error ? error.message : String(error)}`)
  } finally { busyCancellationIds.delete(id); renderCancellationRequests() }
}

async function reviewCancellation(id: string, decision: 'approved' | 'rejected'): Promise<void> {
  const request = cancellationRequests.find(r => r.id === id)
  if (!request || request.status !== 'pending' || busyCancellationIds.has(id)) return
  const booking = bookings.find(b => b.id === request.booking_id)
  const verb = decision === 'approved' ? 'APPROVE and CANCEL the booking' : 'REJECT the cancellation request'
  if (!window.confirm(`${verb} for ${booking?.guest_name || 'this guest'}?\n\nRefunds and guest notifications are NOT automatic.`)) return
  busyCancellationIds.add(id)
  renderCancellationRequests()
  cancellationMessage.className = 'hv-muted'
  cancellationMessage.textContent = 'Saving review…'
  try {
    const { data, error } = await supabase.rpc('hv_review_cancellation_request', {
      p_request_id: id,
      p_decision: decision,
    })
    if (error) throw error
    if (data !== decision) throw new Error(`Review was not completed: ${String(data)}`)
    await loadBookings()
    await loadCancellationRequests()
    cancellationMessage.className = 'hv-success'
    cancellationMessage.textContent = decision === 'approved'
      ? 'Cancellation approved; booking cancelled. Handle refunds and guest notification separately.'
      : 'Cancellation rejected; booking remains confirmed. Notify the guest separately.'
  } catch (error) {
    cancellationMessage.className = 'hv-error'
    cancellationMessage.textContent = `Review failed: ${error instanceof Error ? error.message : String(error)}`
  } finally {
    busyCancellationIds.delete(id)
    renderCancellationRequests()
  }
}

type HvCouponRow = { code: string; created_at: string; redeemed_at: string | null; booking_id: string | null }
const hvAdminCouponMsg = document.querySelector<HTMLElement>('#hv-coupon-admin-message')!
const hvAdminCouponList = document.querySelector<HTMLElement>('#hv-coupon-admin-list')!
async function hvLoadCoupons(): Promise<void> {
  hvAdminCouponList.textContent = 'Loading coupons…'
  const { data, error } = await supabase.from('hv_discount_coupons')
    .select('code,created_at,redeemed_at,booking_id').order('created_at', { ascending: false }).limit(200)
  if (error) { setNotice(hvAdminCouponMsg, `Coupon list failed: ${error.message}`); hvAdminCouponList.textContent = ''; return }
  const items = (data || []) as HvCouponRow[]
  hvAdminCouponList.innerHTML = items.length ? items.map(item =>
    `<div class="hv-blocked-item"><div><strong>${escapeHtml(item.code)}</strong> <span class="hv-status ${item.redeemed_at ? 'cancelled' : 'confirmed'}">${item.redeemed_at ? 'Used' : 'Available'}</span><p class="hv-note">Created: ${escapeHtml(new Date(item.created_at).toLocaleString())}${item.booking_id ? `<br>Booking: ${escapeHtml(item.booking_id)}` : ''}</p></div><button class="hv-btn secondary" data-copy-code="${escapeHtml(item.code)}">Copy</button></div>`
  ).join('') : '<p class="hv-empty">No coupons yet.</p>'
  hvAdminCouponList.querySelectorAll<HTMLButtonElement>('[data-copy-code]').forEach(btn => btn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(btn.dataset.copyCode || '')
    setNotice(hvAdminCouponMsg, 'Coupon copied.', true)
  }))
}
document.querySelector<HTMLButtonElement>('#hv-create-coupon')!.addEventListener('click', async (e) => {
  const button = e.currentTarget as HTMLButtonElement
  button.disabled = true
  try {
    const { data, error } = await supabase.rpc('hv_generate_coupon')
    if (error) throw error
    if (typeof data !== 'string') throw new Error('Unexpected response')
    setNotice(hvAdminCouponMsg, `New 5% coupon: ${data}`, true)
    await hvLoadCoupons()
  } catch (err) { setNotice(hvAdminCouponMsg, `Could not generate coupon: ${err instanceof Error ? err.message : String(err)}`) }
  finally { button.disabled = false }
})

function activateTab(tab: string) {
  document.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab))
  document.querySelector('#hv-bookings-section')!.toggleAttribute('hidden', tab !== 'bookings')
  document.querySelector('#hv-cancellations-section')!.toggleAttribute('hidden', tab !== 'cancellations')
  document.querySelector('#hv-gallery-section')!.toggleAttribute('hidden', tab !== 'gallery')
  document.querySelector('#hv-reviews-section')!.toggleAttribute('hidden', tab !== 'reviews')
  document.querySelector('#hv-blocked-section')!.toggleAttribute('hidden', tab !== 'blocked')
  document.querySelector('#hv-prices-section')!.toggleAttribute('hidden', tab !== 'prices')
  document.querySelector('#hv-coupons-section')!.toggleAttribute('hidden', tab !== 'coupons')
  if (tab === 'cancellations') void (async () => { await loadBookings(); await loadCancellationRequests() })()
  if (tab === 'prices') void loadPrices()
  if (tab === 'coupons') void hvLoadCoupons()
  if (tab === 'blocked') void loadBlockedDates()
  if (tab === 'gallery') void loadGallery()
  if (tab === 'reviews') void loadReviews()
}
document.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab!)))

// Admin UI safeguards: 10-minute inactivity sign-out and a 10-minute
// per-browser login cooldown after 5 invalid credentials. Supabase RLS + admin
// membership are still the authorization boundary. The login cooldown is NOT
// a server-wide rate limiter: browser storage can be cleared or bypassed.
const HV_ADMIN_IDLE_MS = 10 * 60 * 1000
const HV_LOGIN_LOCK_MS = 10 * 60 * 1000
const HV_LOGIN_MAX_FAILURES = 5
const HV_LOGIN_LOCK_KEY = 'hv_admin_login_cooldown_v1'
const HV_ADMIN_ACTIVITY_KEY = 'hv_admin_last_activity_v1'
type HvLoginCooldown = { attempts: number; firstFailureAt: number; lockedUntil: number }
let memoryLoginCooldown: HvLoginCooldown = { attempts: 0, firstFailureAt: 0, lockedUntil: 0 }
let memoryLastActivity = 0
const loginButton = loginForm.querySelector<HTMLButtonElement>('button[type="submit"]')!
let adminAuthCheckVersion = 0
let adminAuthorized = false
let adminSignoutInProgress = false
let loginRequestInProgress = false
let lastActivityWrite = 0

function readLoginCooldown(): HvLoginCooldown {
  try {
    const raw = window.localStorage.getItem(HV_LOGIN_LOCK_KEY)
    if (raw) {
      const obj: unknown = JSON.parse(raw)
      if (typeof obj === 'object' && obj !== null &&
          'attempts' in obj && 'firstFailureAt' in obj && 'lockedUntil' in obj &&
          Number.isFinite(Number(obj.attempts)) && Number.isFinite(Number(obj.firstFailureAt)) &&
          Number.isFinite(Number(obj.lockedUntil))) {
        return {
          attempts: Math.max(0, Math.min(HV_LOGIN_MAX_FAILURES, Number(obj.attempts))),
          firstFailureAt: Math.max(0, Number(obj.firstFailureAt)),
          lockedUntil: Math.max(0, Number(obj.lockedUntil))
        }
      }
    }
  } catch { /* Private mode/storage blocked: keep in-memory fallback. */ }
  return memoryLoginCooldown
}
function saveLoginCooldown(value: HvLoginCooldown): void {
  memoryLoginCooldown = value
  try { window.localStorage.setItem(HV_LOGIN_LOCK_KEY, JSON.stringify(value)) }
  catch { /* In-memory fallback still works within this page. */ }
}
function remainingLoginLockMs(): number {
  return Math.max(0, readLoginCooldown().lockedUntil - Date.now())
}
function loginLockMessage(ms: number): string {
  const seconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainder = String(seconds % 60).padStart(2, '0')
  return `Admin sign-in locked after 5 incorrect attempts. Try again in ${minutes}:${remainder}.`
}
function refreshLoginLockUI(): void {
  const remaining = remainingLoginLockMs()
  loginButton.disabled = loginRequestInProgress || remaining > 0
  if (remaining > 0) {
    loginMessage.textContent = loginLockMessage(remaining)
  } else if (loginMessage.textContent.startsWith('Admin sign-in locked after 5 incorrect attempts.')) {
    loginMessage.textContent = 'Sign-in is unlocked. You may try again.'
  }
}
function recordFailedCredentials(): number {
  const now = Date.now()
  const previous = readLoginCooldown()
  // A new rolling attempt window begins if the first failure was >10m ago.
  const reset = !previous.firstFailureAt || now - previous.firstFailureAt >= HV_LOGIN_LOCK_MS
  const attempts = (reset ? 0 : previous.attempts) + 1
  const lockedUntil = attempts >= HV_LOGIN_MAX_FAILURES ? now + HV_LOGIN_LOCK_MS : 0
  saveLoginCooldown({ attempts, firstFailureAt: reset ? now : previous.firstFailureAt, lockedUntil })
  return Math.max(0, HV_LOGIN_MAX_FAILURES - attempts)
}
function clearLoginFailures(): void {
  saveLoginCooldown({ attempts: 0, firstFailureAt: 0, lockedUntil: 0 })
}
function isInvalidCredentials(error: { message: string; code?: string }): boolean {
  return error.code === 'invalid_credentials' || /invalid login credentials|invalid credentials|invalid email or password/i.test(error.message)
}
function readAdminActivity(): number {
  try {
    const value = Number(window.localStorage.getItem(HV_ADMIN_ACTIVITY_KEY))
    if (Number.isFinite(value) && value > 0) return Math.max(value, memoryLastActivity)
  } catch { /* Fall back to memory. */ }
  return memoryLastActivity
}
function setAdminActivity(now = Date.now()): void {
  memoryLastActivity = now
  lastActivityWrite = now
  try { window.localStorage.setItem(HV_ADMIN_ACTIVITY_KEY, String(now)) }
  catch { /* Fall back to memory. */ }
}
function clearAdminActivity(): void {
  memoryLastActivity = 0
  lastActivityWrite = 0
  try { window.localStorage.removeItem(HV_ADMIN_ACTIVITY_KEY) }
  catch { /* Ignore unavailable storage. */ }
}
function recordAdminActivity(): void {
  if (!adminAuthorized || dashboard.hidden || adminSignoutInProgress) return
  const now = Date.now()
  // Timers may be suspended in background tabs; a click after an expired
  // inactivity period must not silently start a fresh login period.
  const previous = readAdminActivity()
  if (previous && now - previous >= HV_ADMIN_IDLE_MS) {
    void signOutAdminForIdle()
    return
  }
  // Avoid excessive storage writes from pointer-move events.
  memoryLastActivity = now
  if (now - lastActivityWrite >= 2000) setAdminActivity(now)
}
async function signOutAdminForIdle(): Promise<void> {
  if (adminSignoutInProgress) return
  adminSignoutInProgress = true
  adminAuthorized = false
  ++adminAuthCheckVersion // invalidate any in-flight membership checks
  dashboard.hidden = true
  loginView.hidden = false
  bookings = []
  clearAdminActivity()
  try {
    await supabase.auth.signOut()
    await showSession()
    loginMessage.textContent = 'Automatically signed out after 10 minutes of inactivity. Please sign in again.'
  } catch {
    loginMessage.textContent = 'Your admin session timed out. Please refresh and sign in again.'
  } finally {
    adminSignoutInProgress = false
    refreshLoginLockUI()
  }
}
function checkAdminIdle(): void {
  if (!adminAuthorized || dashboard.hidden || adminSignoutInProgress) return
  const last = readAdminActivity()
  if (last && Date.now() - last >= HV_ADMIN_IDLE_MS) void signOutAdminForIdle()
}
// Interaction inside the admin dashboard counts as activity; background
// token refresh, network traffic, and mere open tabs do not.
for (const eventName of ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel', 'scroll', 'input']) {
  dashboard.addEventListener(eventName, recordAdminActivity, { passive: true })
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) checkAdminIdle() })
window.addEventListener('focus', checkAdminIdle)
window.addEventListener('storage', event => {
  if (event.key === HV_LOGIN_LOCK_KEY) refreshLoginLockUI()
  if (event.key === HV_ADMIN_ACTIVITY_KEY) checkAdminIdle()
})
// Continue checking even if mouse/keyboard is idle; handle suspended browser
// tabs upon visibility/focus above. Timer is only UI/session management.
window.setInterval(() => { refreshLoginLockUI(); checkAdminIdle() }, 1000)

// Verify authorization against public.admin_users rather than merely checking
// for a Supabase session. Server-side RLS protects private database records.
async function showSession(): Promise<void> {
  if (adminSignoutInProgress) return
  const checkVersion = ++adminAuthCheckVersion
  dashboard.hidden = true
  loginView.hidden = false
  adminAuthorized = false

  const { data: userResult, error: userError } = await supabase.auth.getUser()
  if (checkVersion !== adminAuthCheckVersion || adminSignoutInProgress) return
  if (userError || !userResult.user) {
    bookings = []
    if (userError) loginMessage.textContent = 'Could not verify your sign-in. Please try again.'
    return
  }

  const { data: adminMembership, error: adminError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userResult.user.id)
    .maybeSingle()
  if (checkVersion !== adminAuthCheckVersion || adminSignoutInProgress) return
  if (adminError) {
    bookings = []
    loginMessage.textContent = 'Unable to verify administrator access. Please try again.'
    return
  }
  if (!adminMembership) {
    bookings = []
    loginMessage.textContent = 'This account is not authorized to access the admin dashboard.'
    await supabase.auth.signOut()
    return
  }

  // On refresh/reopening an existing session, do NOT silently renew an expired
  // inactivity window. A successful manual login sets activity explicitly.
  if (!readAdminActivity()) setAdminActivity()
  if (Date.now() - readAdminActivity() >= HV_ADMIN_IDLE_MS) {
    // Allow the timeout procedure to run without displaying admin data.
    adminAuthorized = true
    void signOutAdminForIdle()
    return
  }

  adminAuthorized = true
  loginMessage.textContent = ''
  loginView.hidden = true
  dashboard.hidden = false
  await loadBookings()
}
loginForm.addEventListener('submit', async event => {
  event.preventDefault()
  if (loginRequestInProgress) return
  if (remainingLoginLockMs() > 0) { refreshLoginLockUI(); return }

  const email = document.querySelector<HTMLInputElement>('#hv-email')!.value.trim()
  const passwordField = document.querySelector<HTMLInputElement>('#hv-password')!
  const password = passwordField.value
  loginRequestInProgress = true
  loginMessage.textContent = 'Signing in…'
  refreshLoginLockUI()
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      if (isInvalidCredentials(error)) {
        const left = recordFailedCredentials()
        loginMessage.textContent = left > 0
          ? `Incorrect email or password. ${left} attempt(s) remaining before a 10-minute lock.`
          : loginLockMessage(remainingLoginLockMs())
      } else {
        // Network/service errors are not counted as incorrect passwords.
        loginMessage.textContent = `Sign in failed: ${error.message}`
      }
      return
    }
    // Correct credentials: reset the browser's failed-attempt counter.
    clearLoginFailures()
    setAdminActivity()
    passwordField.value = ''
    loginMessage.textContent = ''
    await showSession()
  } catch {
    loginMessage.textContent = 'Sign-in service unavailable. Please try again.'
  } finally {
    loginRequestInProgress = false
    refreshLoginLockUI()
  }
})
document.querySelector('#hv-refresh')!.addEventListener('click', () => void (async () => { await loadBookings(); if (!document.querySelector('#hv-cancellations-section')!.hasAttribute('hidden')) await loadCancellationRequests() })())
document.querySelector('#hv-logout')!.addEventListener('click', async () => {
  adminAuthorized = false
  ++adminAuthCheckVersion
  dashboard.hidden = true
  clearAdminActivity()
  await supabase.auth.signOut()
  bookings = []
  await showSession()
})
function resetBookingPageAndRender(): void {
  currentBookingPage = 1
  render()
}
searchInput.addEventListener('input', resetBookingPageAndRender)
statusFilter.addEventListener('change', resetBookingPageAndRender)
roomFilter.addEventListener('change', resetBookingPageAndRender)
pageSizeSelect.addEventListener('change', resetBookingPageAndRender)
showArchivedBookings.addEventListener('change', resetBookingPageAndRender)
showArchivedCancellations.addEventListener('change', renderCancellationRequests)
// Supabase can emit this callback while its auth state is locked.
// Schedule the membership check outside the callback to avoid an auth deadlock.
supabase.auth.onAuthStateChange(() => {
  window.setTimeout(() => void showSession(), 0)
})
void showSession()
