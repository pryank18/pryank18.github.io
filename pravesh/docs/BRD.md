# Pravesh — Business Requirements Document

## Business objective

Build a trusted daily habit for Indian exam aspirants, with families as the reason it sticks, and reach that without paywalls, ads or data harvesting. Trust and retention come first; revenue is voluntary until the product proves it earns more.

## Background

Millions of Indians prepare for government, banking, medical and engineering entrance exams every year, often for several attempts. The category's software is built around content: lectures, test series and question banks, sold by subscription. Consistency, the variable that most decides an outcome over a long preparation, is left to the aspirant alone. Families pay for coaching but get no visibility, which feeds pressure at home.

## Strategic decisions

- **Family-first over community-first or institute licensing.** Peer features (leaderboard, discussion) stay as an acquisition funnel; guardian visibility is the differentiator. Selling to coaching institutes (B2B2C) is shelved, not dropped.
- **Free forever, voluntary support.** A planned ₹149/month guardian tier was removed before launch because it would exclude exactly the families who most need the product. Contributions go by direct UPI, shown only to confirmed adults. A payment gateway follows only once contributions are regular enough to need records.
- **Accountability, not content.** Content is crowded and capital-heavy; accountability is uncontested and cheap to serve.

## Scope

In scope: aspirant and guardian accounts, parental consent, daily loop, syllabus and mock tracking, study plan and clock, guardian snapshot and digest, moderated community, three-layer help, data rights, three reviewed languages.

Out of scope: content, paid tiers, institute licensing, regional languages without a native reviewer.

## Stakeholders

- **Aspirant:** primary user and owner of their data
- **Guardian:** secondary user; sees only what the aspirant shares
- **Product owner:** Pryank Wadhera (problem framing, scope, requirements, QA)

## Go-to-market

1. Soft launch with 15–20 known aspirants and their families for two weeks.
2. Read activation, week-2 habit and guardian take-up weekly.
3. Move the backend to an owner-held account before any public promotion.
4. Public promotion only if week-2 retention holds; growth through families and the peer community.

## Compliance and safety requirements

- DPDP Act 2023: verifiable parental consent for under-18s, data minimisation (no date of birth stored, only the 18+ gate), export and deletion
- No private messaging involving minors; no operator-to-minor private channel
- Crisis helpline text (Tele-MANAS 14416) hand-written in every language, shown even when AI is unavailable
- Privacy policy discloses where data is stored and which providers process it

## Success criteria

- Aspirants keep checking in after the novelty week
- Guardians who receive the digest describe it as helpful, not as surveillance
- No consent, child-safety or data-handling incident

## Assumptions

- Aspirants will share progress with family if they control what is shown
- Families value an honest weekly summary enough to keep the aspirant using the app
- Some adult users will contribute voluntarily once the product helps them

## Risks

- **Retention:** check-in habits decay after week one; mitigated by streak freezes, pace-till-exam and opt-in reminders, and tested in the soft launch
- **Perceived surveillance:** mitigated by the allow-list, a private study log, digest preview and "self-reported" labels
- **Platform cost:** AI help and email use platform credits; the assistant degrades to hand-written fallbacks when credits run out
- **Translation quality:** machine-generated languages stay hidden until 98% coverage and native review
