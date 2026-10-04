# Pravesh — Product Requirements Document

## Summary

Pravesh is a free, family-first accountability app for Indian competitive-exam aspirants. It turns daily study effort into a visible streak, syllabus progress and mock trend, and lets the aspirant share an honest weekly summary with a guardian. It deliberately does not sell content.

## Target users

- **Aspirant** (core 18–25, also school students and droppers preparing for NEET/JEE) who needs consistency more than more material
- **Guardian** (parent or mentor) who funds or supports the preparation and wants an accurate, low-pressure view of it

## Problem statement

Long exam preparation fails quietly. An aspirant loses rhythm for a week, nobody notices, and the gap compounds. Families sense this but only have two tools, asking and worrying, and both raise pressure without adding information. Content platforms track test performance, not the daily habit that produces it.

## Core loop

Daily check-in → streak → topic-level syllabus → mock trend → (optional) guardian sees a summary → encouragement flows back.

## Functional requirements

- **Auth and roles:** email OTP; aspirant or guardian; age gate at 18
- **Consent:** under-18 accounts hold only a first name and parent email until a parent approves via a token link; enforced server-side; the minor can withdraw at any time
- **Check-in and streak:** one check-in per day; one streak freeze per 7 days
- **Focus timer:** adds hours to the day automatically
- **Syllabus:** topic checklists with starter lists; paper-level % is derived only from ticked topics, never typed in
- **Mock log:** score history and trend; raw scores are never shared
- **Study plan:** study mode, coaching yes/no, daily target; guardian sees "5 of 6 days on target", not raw hours
- **Study clock:** rolling 7/30/90-day hours; pace till exam (14-day average against target)
- **Guardian snapshot:** fixed allow-list, pinned by an automated test; refreshed daily and before each digest; labelled "self-reported"
- **Sunday digest:** opt-in email, wins first, compares only against the aspirant's own target; the aspirant previews it and can add a note
- **Reminders:** opt-in daily check-in email; no guilt notifications
- **Help:** FAQ → AI assistant (scoped to app use and study planning, 30/day, moderation pre-filter, replies in the UI language) → human ticket
- **Community:** leaderboard, discussion, materials, reporting and moderation; DMs blocked if either party is under 18
- **Support:** voluntary UPI contribution, shown only to confirmed adults
- **Data rights:** printable report, JSON export, full deletion

## Out of scope (v1)

- Content, lectures, question banks, mock tests
- Exam catalogue with syllabus content (the exam picker is a searchable directory only)
- Pass predictors, rank estimates, screenshot proof of mocks, timer presence checks
- Paid tiers of any kind
- Regional languages below 98% translation coverage

## Success metrics

Measured in a two-week soft launch with 15–20 real users, using aggregate queries only (no behavioural event tracking):

- **Activation:** share of sign-ups that complete onboarding and log a first check-in
- **Habit:** share of activated users checking in on at least 4 of 7 days in week 2
- **Family pull:** share of aspirants who turn on guardian sharing, and guardians who open the digest
- **Trust:** NPS and free-text feedback from the in-app form
- **Safety:** consent requests answered within 30 days; zero minors with unmoderated adult contact

## Status

Live and feature-complete for soft launch. Next: owner phone test of the latest build, then 15–20 users for two weeks, read metrics weekly, and decide on study pods only if week-2 retention justifies them.
