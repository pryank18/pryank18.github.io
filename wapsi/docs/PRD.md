# Wapsi — Product Requirements Document

## Summary

Wapsi wins back abandoned carts for D2C online stores over WhatsApp. It makes one decision per cart: whether to message the shopper at all, when, with which approved template, and whether a discount is worth giving. Lift is always measured against a holdout group, so the store sees sales the product actually added.

Live demo (sample data): [pryank18.github.io/wapsi/demo/](https://pryank18.github.io/wapsi/demo/) · Case study: [pryank18.github.io/wapsi/](https://pryank18.github.io/wapsi/)

## Target users

- **Store owner or growth lead** at an Indian D2C brand doing a few thousand orders a month, who wants abandoned-cart revenue back without training shoppers to wait for a coupon.
- **Shopper** who added items, left, and prefers WhatsApp to email.
- **Store support staff** who take over chats the assistant should not answer.

## Problem statement

Most carts never reach checkout. Email reminders go unread by shoppers who live on WhatsApp, blanket discounts reward people who were coming back anyway, and most tools count every order after a message as "recovered", so nobody knows the real lift. Careless sending also gets punished: shoppers block brands, and WhatsApp limits accounts with poor feedback.

## Core loop

1. A cart goes quiet. A sweep every five minutes picks up carts idle for 45 minutes with no order and no reminder sent.
2. Pre-send checks run in a fixed order: consent, orders on any device or by cash on delivery, stock and price, quiet hours, message limits.
3. Eligible carts are drawn into the messaged group or the holdout group.
4. The intent model rates the cart: likely to return anyway, persuadable, or casual browsing.
5. An approved reminder template goes out with a signed link that rebuilds the cart on any device.
6. Persuadable carts with no reply and no order after 24 hours get one offer. A reply or an order cancels it.
7. Replies inside the 24-hour window are answered by an assistant from live stock and store policy, or handed to staff.
8. Every order is attributed and compared with the holdout.

## Functional requirements

### Consent and identity
- FR1: Capture the phone number at login (OTP) or at the first checkout step.
- FR2: The WhatsApp opt-in box starts unticked; store the time, source and exact wording of every opt-in.
- FR3: A STOP reply withdraws consent immediately; START restores it.

### Cart sweep and pre-send checks
- FR4: Run the sweep every five minutes; a missed run is picked up by the next one.
- FR5: Stop if there is no consent, or if an order exists on any device or by cash on delivery.
- FR6: Skip if every item is sold out; list only available items if some are.
- FR7: Hold messages outside quiet hours (default 9 pm to 9 am) and re-check at the start of sending hours.
- FR8: Never send more than the per-cart limit (default 2) or the per-shopper weekly limit.
- FR9: If the shopper returns to the site before the sweep, stop the idle timer.

### Decisioning
- FR10: Draw a configurable holdout (default 10%) before any message; holdout carts are tracked but never messaged.
- FR11: Score intent; send offers only to persuadable carts, and only as the second message.
- FR12: Log every check with its result and reason, visible to the store.

### Messaging
- FR13: Use only approved WhatsApp templates outside the 24-hour customer window; never submit promotional copy as a utility template.
- FR14: Include a signed link that rebuilds the cart, with any offer code applied.
- FR15: Treat delivery failures from WhatsApp's per-person marketing cap as an expected outcome, with email fallback only where the shopper agreed to it.

### Replies
- FR16: The assistant answers stock, size, delivery, returns and cash-on-delivery questions from live data and store policy.
- FR17: Anything else is handed to staff; the assistant does not guess.

### Reporting
- FR18: North star: incremental recovered revenue (messaged carts minus the holdout's recovery, scaled to the same size).
- FR19: Show reachable carts, delivery, taps, recovery rate against the holdout, discount spend per recovered order and replies resolved without staff.
- FR20: Guardrails: opt-outs per 1,000 messages and block rate; sending pauses automatically if blocks pass a threshold.

## Out of scope (v1)

- SMS and push fallbacks
- First messages written freely by a model
- Browse-abandonment messages for shoppers who never added to cart
- Multi-store agency dashboards

## Success metrics

| Metric | Baseline | Target |
|---|---|---|
| Incremental recovered revenue | Holdout recovery, scaled | Messaged carts recover clearly more than the holdout |
| Reachable carts | Share with number and opt-in at launch | Rises after number capture moves to the first checkout step |
| Discount spend per recovered order | Blanket-offer approach | Falls with no drop in recovery |
| Opt-outs per 1,000 messages, block rate | First month of sending | Flat as volume grows |

## Rollout

1. **Rules and one reminder:** consent capture, sweep, every pre-send check, one approved template and the holdout. Move on when recovery beats the holdout and the block rate stays low.
2. **Reply assistant:** stock, size and delivery answers inside the open chat, with a clean handover. Move on when most replies resolve without staff.
3. **Intent and offer model:** trained on outcomes from phases 1 and 2. Move on when discount spend per recovered order falls with no drop in recovery.

## Status

A concept with a working in-browser demo on sample data. No store has used it yet. The next step would be a pilot with one D2C store to test reachability and whether the holdout lift holds with real shoppers.
