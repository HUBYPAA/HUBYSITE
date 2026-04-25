# Content Inventory

## Source Data Copy

Content that comes directly from the data files:

- **Meeting names, locations, schedules** — from `src/lib/data/source/meetings.ts`
- **Conference names, dates, venues, organizers** — from `src/lib/data/source/conferences.ts`
- **State names, intergroup names, YPAA committee names** — from `src/lib/data/source/states.ts`
- **Crisis hotline names and numbers** — hardcoded in `src/app/safety/page.tsx`

## Authored Copy

Page-specific copy written for the product:

### Homepage (`src/app/page.tsx`)
- Headline: *"Find the room. Follow the weekend. Keep the signal alive."*
- Lead: Description of the atlas as a practical recovery directory
- Metrics: Rooms, Weekends, States counts
- Live signal section: "Room opening soon", "Next online", "Useful before beautiful"
- Featured conference section: "The next good weekend. Already here."
- Canopy reveal: "All these rooms and weekends belong to one larger pattern."
- Regional memory: Correction path, newsletter signal, YPAA doorway
- Safety section: "No games with anonymity."
- CTA section: "Send the correction. Keep the signal moving."

### Meetings Page (`src/app/meetings/meetings-client.tsx`)
- Headline: *"Calm rescue. Find a room fast."*
- Lead: "Search by city, room, day, state, meeting type, or attendance."
- Filter labels: Search first, Quick filters, Results
- Empty state: "Nothing fits those filters."
- Detail panel: "Pick a room to open the detail rail."

### Conferences Page (`src/app/conferences/page.tsx`)
- Headline: *"The weekends as regional rhythm. Readable, desirable, and real."*
- Honesty copy about scaffold records
- Canopy reveal: "Separate weekends, one living pattern."
- Archive section: "Institutional memory, not dead space."

### Conference Detail (`src/app/conferences/[slug]/page.tsx`)
- Verification notes: "Source file", website, registration links
- Status rail: "Read the record", "Verify before travel", "Report anything stale"
- Nearby meetings section
- Scaffold warning when applicable

### About Page (`src/app/about/page.tsx`)
- Headline: *"The information is real. The path to it is usually messy."*
- Mission: "Useful before beautiful."
- Principles: human-reviewed, regional without governing, clear for newcomers

### What Is YPAA Page (`src/app/what-is-ypaa/page.tsx`)
- Headline: *"No separate fellowship. No alternate AA."*
- Explanations of YPAA meetings, age questions, open vs closed, service path
- Canopy reveal with CTAs to meetings, conferences, corrections

### Safety Page (`src/app/safety/page.tsx`)
- Headline: *"Safety is not an afterthought. Anonymity is not decorative copy."*
- Crisis hotlines: SAMHSA, 988, Crisis Text Line, AA GSO
- Sections: anonymity, online spaces, travel, boundaries

### Submit Page (`src/app/submit/page.tsx`)
- Headline: *"Send what you know while it is fresh."*
- Form sections: What is it?, When/Where, Verification, Follow up
- Guidance rail: source links beat screenshots, plain wins, no login required

### Events Page (`src/app/events/page.tsx`)
- Headline: *"Warm motion. Small sparks, not clutter."*
- Empty state: "Nothing public is queued right now."

### Newsletter Page (`src/app/newsletter/page.tsx`)
- Headline: *"Useful regional signal. Trust first."*
- Promise: "Pick your regions. Leave the rest alone."
- Privacy note: no ads, no tracking, no shared lists

### Portal Pages
- Portal headline: *"Warm workbench. I know what needs doing."*
- Admin headline: *"Command center. Nothing is vague. Nothing is lost."*

---

## Copy Conventions

- **Headlines** use sentence case with occasional italic emphasis for the second line
- **Kickers** are mono uppercase with wide tracking (`0.2em`)
- **Body copy** is plain, direct, and avoids nonprofit boilerplate
- **Honesty over confidence** — scaffold records are labeled as such
- **No member names** appear anywhere on the public site
