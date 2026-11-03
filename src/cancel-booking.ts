
import './style.css'
import { supabase } from './supabase'

const app = document.querySelector<HTMLDivElement>(
  '#cancel-booking-app'
)!

const params = new URLSearchParams(window.location.search)
const token = params.get('token')

app.innerHTML = `
  <main class="cancel-page">
    <div class="cancel-card">
      <h1>HANBOK VILLA</h1>
      <h2>Request Booking Cancellation</h2>

      <p>
        You can request cancellation within 72 hours
        after your booking confirmation email is sent.
      </p>

      <form id="cancellationForm">
        <label for="cancelReason">
          Reason for cancellation
        </label>

        <textarea
          id="cancelReason"
          rows="5"
          maxlength="2000"
          required
          placeholder="Please explain why you would like to cancel..."
        ></textarea>

        <button type="submit" id="cancelSubmit">
          Submit Cancellation Request
        </button>
      </form>

      <p id="cancelMessage" role="status" aria-live="polite"></p>

      <a href="./index.html">Back to Home</a>
    </div>
  </main>
`

const form = document.querySelector<HTMLFormElement>(
  '#cancellationForm'
)!

const message = document.querySelector<HTMLElement>(
  '#cancelMessage'
)!

const submitButton = document.querySelector<HTMLButtonElement>(
  '#cancelSubmit'
)!

const reasonInput = document.querySelector<HTMLTextAreaElement>(
  '#cancelReason'
)!

if (!token || !/^[a-f0-9]{64}$/.test(token)) {
  message.textContent =
    'Invalid cancellation link. Please use the link in your confirmation email.'

  submitButton.disabled = true
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    message.textContent = 'Invalid cancellation link.'
    return
  }

  const reason = reasonInput.value.trim()

  if (!reason || reason.length > 2000) {
    message.textContent =
      'Please enter a cancellation reason (maximum 2000 characters).'
    return
  }

  submitButton.disabled = true
  submitButton.textContent = 'Submitting...'
  message.textContent = 'Submitting your cancellation request...'

  try {
    const { data, error } = await supabase.functions.invoke(
      'request-booking-cancellation',
      {
        body: {
          token,
          reason
        }
      }
    )

    if (error) {
      let errorMessage = 'Unable to submit your request. Please try again.'

      // Supabase returns the Edge Function response in the error context.
      const context = (error as { context?: Response }).context

      if (context && typeof context.json === 'function') {
        try {
          const responseBody = await context.json()
          if (typeof responseBody?.error === 'string') {
            errorMessage = responseBody.error
          }
        } catch {
          // Keep the fallback message.
        }
      }

      throw new Error(errorMessage)
    }

    if (data?.success !== true) {
      throw new Error(
        typeof data?.error === 'string'
          ? data.error
          : 'Cancellation request was not accepted.'
      )
    }

    message.textContent =
      'Your cancellation request has been submitted successfully. Our team will review it. Your booking is not cancelled yet.'

    message.style.color = 'green'
    form.reset()
    reasonInput.disabled = true
    submitButton.textContent = 'Request Submitted'
    submitButton.disabled = true

  } catch (error) {
    console.error('Cancellation request failed:', error)

    message.textContent =
      error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again.'

    message.style.color = 'red'
    submitButton.disabled = false
    submitButton.textContent = 'Submit Cancellation Request'
  }
})
