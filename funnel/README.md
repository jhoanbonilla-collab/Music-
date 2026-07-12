# XolosaX — Inquiry → Booking Funnel

The complete operating system for turning an inquiry into a confirmed, well-run,
review-generating gig — with **form fields instead of back-and-forth email**, templated
responses at every stage, and a single pipeline tracker as the source of truth.

```
Inquiry (site form / social DM / referral)
   ↓
Auto-response            instant — confirms received, sets reply-time expectation
   ↓
Qualification            event type, date, location, tier fit — captured by the form
   ↓
Quote sent               templated by tier, personalized fee
   ↓
Date hold                calendar block, no payment — time-limited (48 hrs)
   ↓
Contract + deposit       auto-sent on quote acceptance
   ↓
Confirmed booking        → added to CRM / tracker
   ↓
Pre-gig sequence         logistics email 1 week out · day-of details
   ↓
Post-gig                 thank you + referral / review ask
```

---

## What's in this folder

| File | What it is |
|------|------------|
| [`inquiry-form.html`](inquiry-form.html) | Branded inquiry + qualification form. One submission captures everything needed to quote — no email ping-pong. Doubles as the instant confirmation screen. |
| [`tracker.html`](tracker.html) | The CRM: a booking pipeline board (one column per funnel stage) with 48-hr hold countdowns, next-action prompts, pipeline value, and CSV export. Runs in the browser, stores data locally. |
| [`tracker-template.csv`](tracker-template.csv) | The same tracker as spreadsheet columns, for Google Sheets / Excel / Notion import. |
| [`templates/`](templates/) | Copy-paste message templates for every stage (email + short DM variants). |
| [`contract-template.md`](contract-template.md) | Performance agreement skeleton sent with the deposit request. |

---

## Stage-by-stage playbook

### 1 · Inquiry
Three doors, one destination — **everything funnels into the form**:

- **Site form** — `inquiry-form.html`, linked from the site's "Book" button.
- **Social DM** — reply with the DM template ([`templates/01-auto-response.md`](templates/01-auto-response.md), DM variant) that sends them the form link. Don't qualify inside the DM thread.
- **Referral** — same: thank them, send the form link.

> **Rule:** no quote is ever produced without a completed form. The form *is* the
> qualification step.

### 2 · Auto-response — instant
Confirms receipt and sets the expectation: **a personal reply within 24 hours**.
- Site form → the form's built-in success screen + the auto-reply email your form
  service sends ([`templates/01-auto-response.md`](templates/01-auto-response.md)).
- Log the inquiry in the tracker as **New Inquiry** the moment it lands.

### 3 · Qualification — form fields, not email
The form captures: event type · date (+ flexibility) · city/venue · guest count ·
performance window · tier interest · budget range · source. When it arrives, do a
60-second triage:

- **Date free + tier fit** → move to **Qualified**, build the quote.
- **Form incomplete / came in by DM with missing info** → send the one-shot nudge
  ([`templates/02-qualification-nudge.md`](templates/02-qualification-nudge.md)). One nudge, then park it.
- **Date already booked / not a fit** → decline politely, offer referral, mark **Lost** (reason: date/fit).

### 4 · Quote — templated by tier, personalized fee
Pick the tier template, personalize the fee and one line about *their* event, send
within 24 hrs of qualification:

| Tier | Template | Built for |
|------|----------|-----------|
| **I — Solo Sax Session** | [`templates/03-quote-tier-1-solo.md`](templates/03-quote-tier-1-solo.md) | Ceremonies, cocktail hours, dinners — up to 2 × 45-min sets |
| **II — Sax × DJ Experience** | [`templates/03-quote-tier-2-sax-dj.md`](templates/03-quote-tier-2-sax-dj.md) | Live sax over DJ sets — parties, launches, up to 3 hrs |
| **III — XolosaX Signature** | [`templates/03-quote-tier-3-signature.md`](templates/03-quote-tier-3-signature.md) | The full evening: ceremony → cocktail → party, custom arrangements |

Every quote ends with the same two calls to action: *"Reply **HOLD** to hold the date
(free, 48 hrs) or **BOOK** to go straight to contract."* Move card to **Quote Sent**.

### 5 · Date hold — 48 hours, no payment
On "HOLD": block the date in the calendar, send
[`templates/04-date-hold.md`](templates/04-date-hold.md) (states the exact expiry
date/time), move card to **Date Hold** and set the hold expiry — the tracker counts it
down. At ~24 hrs left, send the reminder variant. On expiry with no answer: release the
calendar block, send the release note, mark **Lost** (reason: hold expired). Only **one
active hold per date** — first HOLD wins; tell others the date is pencilled and offer
next-in-line.

### 6 · Contract + deposit — auto-sent on acceptance
On "BOOK" (or any acceptance): send
[`templates/05-contract-deposit.md`](templates/05-contract-deposit.md) with the
[contract](contract-template.md) and the deposit link **the same day — no gap between
"yes" and "sign here."** Deposit = **30% (non-refundable), remainder due 7 days before
the event.** Date is only confirmed when **both** signed contract and deposit are in.
Move card to **Contract Sent**.

### 7 · Confirmed booking → CRM
Deposit lands → send [`templates/06-booking-confirmed.md`](templates/06-booking-confirmed.md),
move card to **Confirmed**, convert the calendar hold into a confirmed event, and
schedule two reminders: logistics email (event − 7 days) and day-of message (event − 1 day).

### 8 · Pre-gig sequence
- **1 week out** — [`templates/07-pre-gig-logistics.md`](templates/07-pre-gig-logistics.md):
  confirms schedule, collects venue contact, load-in, power/space needs, special-song
  requests, and the remaining balance. Move card to **Pre-Gig**.
- **Day before / day of** — [`templates/08-day-of-details.md`](templates/08-day-of-details.md):
  short WhatsApp/SMS with arrival time and your number.

### 9 · Post-gig — within 48 hours
Send [`templates/09-post-gig.md`](templates/09-post-gig.md): thank you + **one** primary
ask (Google review *or* video testimonial) + the referral line (referral credit toward a
future booking for them or the friend). Move card to **Completed**, log the review/referral
outcome, and add any planner/coordinator you met to the referral-partners list.

---

## Response-time SLAs

| Event | Respond within |
|-------|----------------|
| Inquiry received | instant (auto-response) |
| Personal reply / quote | 24 hrs |
| Quote accepted → contract out | same day |
| Hold expiring | reminder at 24 hrs left |
| Post-gig thank-you | 48 hrs |

## Numbers to watch (monthly, from the tracker)

- **Inquiry → Quote rate** (are inquiries qualified?)
- **Quote → Confirmed rate** (is pricing/pitch landing? target ≥ 40%)
- **Average fee per confirmed booking**, by tier
- **Lost reasons** (date clash vs. price vs. ghosted — each has a different fix)
- **% of bookings from referrals** (the post-gig ask compounding)

## Placeholders

Templates use `[BRACKETED]` tokens — `[CLIENT NAME]`, `[EVENT DATE]`, `[FEE]`,
`[HOLD EXPIRY]`, `[PAYMENT LINK]`, `[FORM LINK]`, `[REVIEW LINK]`. Fees and budget
ranges are intentionally left as placeholders — set them once per tier and reuse.
