# Pravesh — Product Spec

## Problem

Indian competitive-exam aspirants (UPSC, SSC, Banking, State PSC, NEET, JEE, CAT) prepare for one to three years, mostly alone. Their families usually fund that preparation but have no honest view of how it is going, so the conversation at home swings between silence and pressure. Existing prep apps sell content and mock tests. None of them help an aspirant stay consistent or give the family a calm, accurate picture of the effort.

## Target user

- **Aspirant:** 15–30 years old, core 18–25, often studying from a smaller city and often more comfortable in Hindi or Hinglish than English.
- **Guardian:** a parent or mentor who wants to support the aspirant without nagging or surveillance.

## Goals

- Make daily consistency visible to the aspirant first: streak, hours, topics covered, mock trend
- Let the aspirant choose to share a fixed, honest summary with a guardian
- Keep every feature free, with voluntary support only
- Work in the aspirant's own language, never in half-English screens

## Non-goals (v1)

- Content, video lectures, question banks or mock tests (Testbook and Adda247 already compete there)
- Exam dates or cut-offs presented as fact
- AI pass predictors or rank estimates (false precision)
- Any paywall, including a paid parent tier
- Contact harvesting, location tracking, or proof-of-study surveillance (screenshots, tab-visibility checks)

## Core features (v1 scope)

- **Onboarding:** state and language picker, email OTP sign-in, aspirant or guardian role, 18+/under-18 gate
- **Parental consent:** under-18s give only a first name and a parent email until the parent approves by email link; unanswered requests purge after 30 days
- **Daily loop:** check-in with streak (one freeze per 7 days), focus timer that logs hours automatically, topic-level syllabus checklist, mock-test score log
- **Study plan and clock:** study mode (full-time, college, job, school, dropper), daily target, rolling 7/30/90-day hours and pace till exam
- **Private study log:** a "what I covered" line that is never shared
- **Guardian sharing:** an allow-listed snapshot via code or linked account, a Sunday digest the aspirant can preview and annotate, and instant revocation
- **Community:** leaderboard, discussion and shared materials, moderated; no direct messages involving under-18 accounts
- **Help:** FAQ, then "Ask Pravesh" (AI, 30 asks a day, replies in the app's language), then a ticket to a human
- **Data rights:** printable progress report, full JSON export, account deletion
- **Languages and themes:** English, Hindi and Hinglish reviewed; five themes

## User stories

- As an aspirant, I want to check in and see my streak in under 30 seconds, so the habit survives a bad day.
- As an aspirant, I want to see my pace against my exam date, so I know whether I'm actually on track.
- As an aspirant, I want to decide exactly what my parent sees, so sharing feels like support, not surveillance.
- As a guardian, I want a short weekly summary that leads with wins, so I can encourage instead of interrogate.
- As a 16-year-old NEET aspirant, I want my parent to approve my account before I start, so the app is safe for me to use.
- As a Hindi-first user, I want every screen in Hindi, so I never get stuck on an English button.

## Constraints

- India's DPDP Act 2023: consent before data, data minimisation, portability and deletion
- Mobile-first: layouts verified at 320, 360, 768 and 1440 px, in Hindi
- Safety messages (crisis helpline, refusals, outages) are hand-written in every language and never depend on a model

## Status

Deployed and working end to end, before a soft launch with a small known group.
