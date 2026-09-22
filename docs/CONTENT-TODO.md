# CONTENT TODO - Lerriley Limited

Everything below must be supplied by Lerriley before the corresponding
feature can go live. The site builds and runs without these; affected
sections are omitted cleanly rather than faked.

This file is a Phase 7 handover deliverable. It is updated every time a
new page is built and a new content requirement appears.

---

## 1. Company identity

| Item | Where used | Required for |
|---|---|---|
| `baseLocation` in `content/company.ts` | Footer, metadata, LocalBusiness schema | Confirming a city or region |
| `foundedYear` in `content/company.ts` | Optional display | Only if you want it shown |
| `domain.productionUrl` in `content/company.ts` | Sitemap, robots, canonical URLs, OG images | Production launch |
| `contact.email` in `content/company.ts` | Contact form acknowledgement | Enabling email |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` | WhatsApp CTAs and `/go/whatsapp` | Enabling WhatsApp |

None of these are invented. Each is left blank until the real value is
supplied.

---

## 2. Photography - major pages

Nine major pages receive a real photograph. Utility pages do not.
Every image is saved to `public/` with a descriptive kebab-case filename
so it reads clearly in the code.

### Already provided

- **`public/lerriley-building.webp`** - The Lerriley Limited building at
  dusk, full facade, warm architectural lighting, blue evening sky.
  Currently used on the `/` hero.
  Additional use: `/company` header, using a different crop.

### Still needed

Each item below specifies what the photograph should show, how it should
be framed, and the filename to save it as. A phone photograph at good
light is sufficient for all of these.

**`/solutions` - `public/solutions-workspace.webp`**
A photograph of a workspace where the work happens. A desk with a laptop
open to a code editor, or a whiteboard with architecture sketches. Natural
light. Landscape orientation. Should feel real, not staged. No people
required.

**`/technology` - `public/technology-infrastructure.webp`**
A photograph of a physical technology detail: a server rack, a network
cabinet, a router, or a close-up of a screen showing system output.
Landscape orientation. The subject should be the equipment, not a person.

**`/industries` - `public/industries-clinic.webp`**
A photograph representing one of the five industries Lerriley serves.
Healthcare is the strongest candidate: a clinic reception, a pharmacy
counter, a laboratory bench. Landscape orientation. Clean, honest, no
posed subjects.

**`/work` - `public/work-screenshot.webp`**
A screenshot of a real system Lerriley has built, redacting anything
sensitive. This is added when the first case study is published. Until
then, the page uses an honest "work in progress" illustration instead.

**`/careers` - `public/careers-workspace.webp`**
A photograph of a workspace moment: a desk, a chair, a window, the
things that describe a place where people work. Not a posed team photo.
Portrait or landscape, whichever the room suggests.

**`/insights` - `public/insights-anchor.webp`**
A photograph used as the anchor image at the top of the Insights index.
A single object suggesting writing or reading: a notebook, a screen
with text, a reading chair. Landscape orientation, wide crop.

**`/company` - additional image (optional)**
If a second company photograph exists (a different angle of the building,
the entrance, the interior), save it as `public/company-office.webp`
and it will be used instead of reusing the building image.

### Not needed

- `/contact` - no photograph. A form page stays clean.
- `/privacy`, `/terms` - no photograph.
- `/404` - no photograph.
- `/news` - entries carry their own image only when they have one.

---

## 3. Logo assets

- **`public/lerriley-logo.png`** - Full emblem, black background. Source
  file, kept for reference.
- **`public/lerriley-logo-transparent.png`** - Full emblem, transparent
  background, extracted from the source. Currently used in the site header
  and footer.
- **Simplified logo mark** - A stripped version of the emblem with no
  embedded text, for use at favicon and small sizes. 256x256 transparent
  PNG or SVG, symbol only (the L and the arrow, no outer circle, no
  wordmark). Until this exists, the favicon uses a simple gold initial.

---

## 4. Verified profiles

Add to `content/company.ts` only when each URL is real and public:

- LinkedIn company page
- GitHub organization
- Google Business Profile

When supplied, they are added to the `Organization` schema's `sameAs`
array and to the footer.

---

## 5. Case studies

The spec defines two case study slugs - `clinic-management-emr` and
`pharmacy-management` - both shipped as `status: "draft"` and therefore
unlinked and excluded from the sitemap. Each becomes publishable when the
following exist:

- Real screenshots of the system
- The stack that was actually used
- The features that were actually shipped
- The engineering decisions with their real trade-offs
- Any verifiable outcome the client is willing to have published
- The client's written consent to publish

Until all of these exist, the case study remains a draft.

---

## 6. Insights articles

The four launch articles are written and published. Additional articles
are added with `npm run new:insight "Title"`, then edited and set to
`status: published`.

Each new article requires:
- An author name (currently "Lerriley Limited")
- A `reviewBy` name
- A description of 40-220 characters
- The correct `primaryTopic`, `secondaryTopics`, `searchIntent`

---

## 7. Careers content

The `/careers` page will publish once built. It requires:

- A "working at Lerriley" culture page (`npm run new:culture "Working at Lerriley"`)
- Any open roles (`npm run new:career "Role Title"`)
- When there are no open roles, an honest statement inviting interest

---

## 8. Infrastructure credentials

Required before the contact form sends email and stores leads:

| Variable | Where | Purpose |
|---|---|---|
| `DATABASE_URL` | `.env.local` | PostgreSQL connection for storing leads |
| `RESEND_API_KEY` | `.env.local` | Transactional email for lead notifications |
| `LEAD_NOTIFICATION_TO` | `.env.local` | Where lead notifications are sent |
| `TURNSTILE_SECRET` | `.env.local` | Optional Cloudflare Turnstile spam protection |
| `PLAUSIBLE_DOMAIN` | `.env.local` | Analytics domain |

Until these exist, the contact form logs leads to a file and the missing
values are noted here.

---

## 9. Legal pages

`/privacy` and `/terms` are built and accurate to the site's actual data
handling. They must be reviewed by Lerriley before launch.
