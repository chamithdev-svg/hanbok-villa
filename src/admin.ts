import './style.css'
import { supabase } from './supabase'

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
  @media(max-width:720px){.hv-admin{padding:18px 12px}.hv-panel{padding:15px}.hv-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.hv-toolbar{grid-template-columns:1fr}.hv-admin-head{align-items:flex-start}}
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
        <p id="hv-login-message" class="hv-error" role="status"></p>
      </form>
      <p class="hv-note">Use an admin account created in Supabase Authentication. Public sign-up is not provided on this page.</p>
    </section>
    <section id="hv-dashboard" hidden>
      <header class="hv-admin-head"><div><p class="hv-muted" style="margin:0 0 7px">HANBOK VILLA · PRIVATE AREA</p><h1>Admin Dashboard</h1><p class="hv-muted" style="margin:0">Manage bookings, gallery photos and guest review photos.</p></div><div class="hv-actions"><button id="hv-refresh" class="hv-btn secondary">Refresh</button><button id="hv-logout" class="hv-btn secondary">Sign out</button></div></header>
      <p id="hv-message" role="status"></p>
      <nav class="hv-tabs" aria-label="Admin sections"><button class="hv-tab active" data-tab="bookings">Bookings</button><button class="hv-tab" data-tab="gallery">Gallery Photos</button><button class="hv-tab" data-tab="reviews">Guest Reviews</button><button class="hv-tab" data-tab="blocked">Blocked Dates</button></nav>
      <section id="hv-bookings-section" class="hv-section">
      <div class="hv-stats"><div class="hv-stat">All bookings<strong id="hv-stat-all">—</strong></div><div class="hv-stat">Pending<strong id="hv-stat-pending">—</strong></div><div class="hv-stat">Confirmed<strong id="hv-stat-confirmed">—</strong></div><div class="hv-stat">Cancelled<strong id="hv-stat-cancelled">—</strong></div></div>
      <section class="hv-panel"><div class="hv-toolbar"><input id="hv-search" type="search" placeholder="Search guest, email, phone…" aria-label="Search bookings"><select id="hv-status-filter" aria-label="Filter by status"><option value="all">All statuses</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option></select><select id="hv-room-filter" aria-label="Filter by accommodation"><option value="all">All accommodations</option><option value="room-one">Room One</option><option value="entire-villa">Entire Villa</option></select></div>
      <div class="hv-table-wrap"><table class="hv-table"><thead><tr><th>Guest</th><th>Stay</th><th>Guests / Room</th><th>Extras</th><th>Amount</th><th>Status</th><th>Update status</th></tr></thead><tbody id="hv-bookings-body"><tr><td colspan="7" class="hv-empty">Loading bookings…</td></tr></tbody></table></div>
      <p class="hv-note">Confirm only after checking availability and arranging payment with the guest. Cancelling here updates the status; it does not automatically refund a payment or email the guest.</p></section>
      </section>
      <section id="hv-gallery-section" class="hv-section" hidden>
        <section class="hv-panel"><h2>Homepage & Gallery Media</h2><p class="hv-note">Upload photos or videos and choose where they appear. Videos are limited to 100 MB each.</p>
          <form id="hv-gallery-form"><label for="hv-gallery-file">Choose photo or video</label><input id="hv-gallery-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime" required><div class="hv-form-grid"><div><label for="hv-gallery-destination">Show on</label><select id="hv-gallery-destination"><option value="both">Home page and Gallery page</option><option value="home">Home page only</option><option value="gallery">Gallery page only</option></select></div><div><label for="hv-gallery-caption">Caption (optional)</label><input id="hv-gallery-caption" maxlength="160" placeholder="Villa garden"></div><div><label for="hv-gallery-order">Display order</label><input id="hv-gallery-order" type="number" min="0" value="0"></div></div><button class="hv-btn" type="submit" style="margin-top:14px">Upload media</button></form><p id="hv-gallery-message" role="status"></p></section>
        <section class="hv-panel"><h2>Current Gallery Photos</h2><div id="hv-gallery-grid" class="hv-media-grid"><p class="hv-muted">Loading photos…</p></div></section>
      </section>
      <section id="hv-blocked-section" class="hv-section" hidden>
        <section class="hv-panel hv-blocked-form">
          <h2>Block Dates</h2>
          <p class="hv-note">Use this for bookings received by phone or WhatsApp. Check-out date is not included in the blocked nights.</p>
          <form id="hv-blocked-form">
            <div class="hv-form-grid">
              <div><label for="hv-blocked-room">Accommodation</label><select id="hv-blocked-room" required><option value="Room One">Room One</option><option value="Entire Villa">Entire Villa</option></select></div>
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
  if (value === 'room-one') return 'Room One'
  if (value === 'entire-villa') return 'Entire Villa'
  return value || '—'
}
function extrasText(value: unknown): string {
  if (!Array.isArray(value) || value.length === 0) return 'None'
  return value.map(item => typeof item === 'string' ? item : JSON.stringify(item)).join(', ')
}
function filteredBookings(): Booking[] {
  const q = searchInput.value.trim().toLowerCase()
  return bookings.filter(b => {
    const statusOk = statusFilter.value === 'all' || (b.booking_status || 'pending').toLowerCase() === statusFilter.value
    const roomOk = roomFilter.value === 'all' || b.room_type === roomFilter.value
    const searchOk = !q || [b.guest_name, b.email, b.phone, b.country, b.id].some(v => String(v ?? '').toLowerCase().includes(q))
    return statusOk && roomOk && searchOk
  })
}
function render(): void {
  const count = (status: string) => bookings.filter(b => (b.booking_status || 'pending').toLowerCase() === status).length
  document.querySelector('#hv-stat-all')!.textContent = String(bookings.length)
  document.querySelector('#hv-stat-pending')!.textContent = String(count('pending'))
  document.querySelector('#hv-stat-confirmed')!.textContent = String(count('confirmed'))
  document.querySelector('#hv-stat-cancelled')!.textContent = String(count('cancelled'))
  const rows = filteredBookings()
  if (!rows.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="hv-empty">No bookings match these filters.</td></tr>'
    return
  }
  tbody.innerHTML = rows.map(b => {
    const status = (b.booking_status || 'pending').toLowerCase()
    const busy = busyIds.has(b.id)
    const extras = escapeHtml(extrasText(b.extra_services))
    const amount = b.total_amount == null ? '—' : `${escapeHtml(b.currency || 'LKR')} ${escapeHtml(Number(b.total_amount).toLocaleString('en-US', { maximumFractionDigits: 2 }))}`
    return `<tr>
      <td><strong>${escapeHtml(b.guest_name || 'Guest')}</strong><small>${escapeHtml(b.email)}</small><small>${escapeHtml(b.phone)} · ${escapeHtml(b.country)}</small><small>ID: ${escapeHtml(b.id)}</small></td>
      <td>${niceDate(b.check_in)} → ${niceDate(b.check_out)}<small>Requested ${escapeHtml(b.created_at ? new Date(b.created_at).toLocaleString() : '—')}</small></td>
      <td>${escapeHtml(b.guests)} guest(s)<small>${escapeHtml(roomName(b.room_type))}</small></td>
      <td>${extras}</td><td><strong>${amount}</strong><small>Payment: ${escapeHtml(b.payment_method || '—')}</small></td>
      <td><span class="hv-status ${escapeHtml(status)}">${escapeHtml(status)}</span></td>
      <td><div class="hv-actions"><select data-status-for="${escapeHtml(b.id)}" aria-label="New status for booking" ${busy ? 'disabled' : ''}><option value="pending" ${status === 'pending' ? 'selected' : ''}>Pending</option><option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Confirmed</option><option value="cancelled" ${status === 'cancelled' ? 'selected' : ''}>Cancelled</option></select><button class="hv-btn" data-save-status="${escapeHtml(b.id)}" ${busy ? 'disabled' : ''}>${busy ? 'Saving…' : 'Save'}</button></div></td>
    </tr>`
  }).join('')
  tbody.querySelectorAll<HTMLButtonElement>('[data-save-status]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.saveStatus!
    const select = tbody.querySelector<HTMLSelectElement>(`select[data-status-for="${CSS.escape(id)}"]`)
    if (select) void updateStatus(id, select.value)
  }))
}
async function loadBookings(): Promise<void> {
  message.className = 'hv-muted'
  message.textContent = 'Loading bookings…'
  const { data, error } = await supabase.from('bookings').select('id,guest_name,email,phone,country,check_in,check_out,guests,room_type,extra_services,total_amount,currency,payment_method,booking_status,created_at').order('created_at', { ascending: false })
  if (error) {
    message.className = 'hv-error'
    message.textContent = `Could not load bookings: ${error.message}. Check that this signed-in user is listed in public.admin_users and the admin RLS policies are installed.`
    tbody.innerHTML = '<tr><td colspan="7" class="hv-empty">Unable to load bookings.</td></tr>'
    return
  }
  bookings = (data || []) as Booking[]
  message.className = 'hv-success'
  message.textContent = `${bookings.length} booking(s) loaded.`
  render()
}
async function updateStatus(id: string, status: string): Promise<void> {
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) return
  const booking = bookings.find(b => b.id === id)
  if (!booking) return
  if (status === 'confirmed' && booking.booking_status !== 'confirmed') {
    const conflict = bookings.some(other => other.id !== id && other.room_type === booking.room_type && ['pending', 'confirmed'].includes((other.booking_status || 'pending').toLowerCase()) && other.check_in < booking.check_out && other.check_out > booking.check_in)
    if (conflict) {
      const proceed = window.confirm('Another pending or confirmed booking overlaps these dates for the same accommodation. Confirm anyway? Only continue if you have verified the room inventory and that this will not cause a double booking.')
      if (!proceed) return
    }
  }
  if (!window.confirm(`Change booking status to “${status}” for ${booking.guest_name || 'this guest'}?`)) return
  busyIds.add(id); render(); message.className = 'hv-muted'; message.textContent = 'Saving status…'
  const { error } = await supabase.from('bookings').update({ booking_status: status }).eq('id', id)
  busyIds.delete(id)
  if (error) {
    message.className = 'hv-error'; message.textContent = `Status update failed: ${error.message}`
    render(); return
  }
  const current = bookings.find(b => b.id === id)
  if (current) current.booking_status = status
  message.className = 'hv-success'; message.textContent = `Booking status updated to ${status}.`
  render()
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
        <strong>${escapeHtml(roomName(item.room_type === 'Room One' ? 'room-one' : item.room_type === 'Entire Villa' ? 'entire-villa' : item.room_type))}</strong>
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
      (roomType === 'Entire Villa' || item.room_type === 'Entire Villa' || item.room_type === roomType)
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

function activateTab(tab: string) {
  document.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab))
  document.querySelector('#hv-bookings-section')!.toggleAttribute('hidden', tab !== 'bookings')
  document.querySelector('#hv-gallery-section')!.toggleAttribute('hidden', tab !== 'gallery')
  document.querySelector('#hv-reviews-section')!.toggleAttribute('hidden', tab !== 'reviews')
  document.querySelector('#hv-blocked-section')!.toggleAttribute('hidden', tab !== 'blocked')
  if (tab === 'blocked') void loadBlockedDates()
  if (tab === 'gallery') void loadGallery()
  if (tab === 'reviews') void loadReviews()
}
document.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab!)))

async function showSession(): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession()
  loginView.hidden = Boolean(session)
  dashboard.hidden = !session
  if (session) await loadBookings()
}
loginForm.addEventListener('submit', async event => {
  event.preventDefault()
  const email = document.querySelector<HTMLInputElement>('#hv-email')!.value.trim()
  const password = document.querySelector<HTMLInputElement>('#hv-password')!.value
  const button = loginForm.querySelector<HTMLButtonElement>('button[type="submit"]')!
  button.disabled = true; loginMessage.textContent = 'Signing in…'
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  button.disabled = false
  if (error) { loginMessage.textContent = `Sign in failed: ${error.message}`; return }
  loginMessage.textContent = ''
  await showSession()
})
document.querySelector('#hv-refresh')!.addEventListener('click', () => void loadBookings())
document.querySelector('#hv-logout')!.addEventListener('click', async () => { await supabase.auth.signOut(); bookings = []; await showSession() })
searchInput.addEventListener('input', render)
statusFilter.addEventListener('change', render)
roomFilter.addEventListener('change', render)
supabase.auth.onAuthStateChange((_event, session) => {
  loginView.hidden = Boolean(session)
  dashboard.hidden = !session
  if (session) window.setTimeout(() => void loadBookings(), 0)
})
void showSession()
