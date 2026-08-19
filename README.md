# Awais Mustafa Portfolio

A modern personal developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and a dark glassmorphism visual style.

This project is designed to present Awais Mustafa as a professional frontend and full stack developer. It includes a premium hero section, personalized about section, realistic skills showcase, featured projects, experience timeline, education, testimonials, and a working contact form powered by Resend.

## Project Overview

This portfolio focuses on:

- professional presentation
- realistic developer branding
- responsive design
- smooth but controlled motion
- data-driven sections for easy editing
- deploy-ready Next.js architecture

The UI uses a dark premium theme with accent gradients, glass panels, floating background orbs, and polished motion interactions while keeping the layout readable and practical.

## Main Features

- Personalized hero section for `Awais Mustafa`
- Smooth section-based single-page portfolio layout
- Custom typewriter effect for professional roles
- About section with portrait area, stats, and personal info cards
- Skills section with categorized skill cards and animated progress bars
- Featured projects section with cards, tags, visuals, links, and modal details
- Work experience timeline with motion-based reveal effects
- Education and certifications sections
- Testimonials section
- Contact section with validated form and backend email sending
- Initial loading screen
- Lenis-powered smooth scrolling
- Optimized background particle animation
- Accessible interactive elements with keyboard focus states

## Tech Stack

- `Next.js 14`
- `React 18`
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `Lenis`
- `Lucide React`
- `tsParticles`
- `Resend`
- `React Email`

## Visual Design System

- Theme: dark modern portfolio
- Primary background: `#0a0a0f`
- Secondary background: `#0f0f1a`
- Accent colors:
  - Purple: `#7C3AED`
  - Cyan: `#06B6D4`
  - Pink: `#EC4899`
- Typography:
  - `Space Grotesk` for headings
  - `Inter` for body text

## Current Portfolio Sections

### 1. Home

Includes:

- greeting text
- name heading
- animated role typewriter
- short professional introduction
- call-to-action buttons
- social links
- animated background

### 2. About

Includes:

- portrait image area
- 1+ years experience badge
- 10+ projects badge
- personal summary
- location, email, availability, and language cards
- animated stat counters

### 3. Skills

Includes:

- category filter buttons
- realistic skill levels
- progress bars
- animated reveal
- moving technology marquee

### 4. Projects

Includes:

- featured and regular project cards
- technology tags
- images/thumbnails
- live demo and GitHub references
- project details modal

### 5. Work Experience

Includes:

- animated timeline
- role and company information
- bullet-point summaries
- tech tags

### 6. Education

Includes:

- degree cards
- institution and academic details
- highlights
- skill tags
- certifications and courses

### 7. Testimonials

Includes:

- testimonial rows
- motion-based presentation

### 8. Contact

Includes:

- contact summary content
- direct contact cards
- form with `name`, `email`, `company`, and `message`
- backend API integration for email sending

## Project Structure

```text
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── about-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── education-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── hero-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── section-heading.tsx
│   │   ├── skills-section.tsx
│   │   └── testimonials-section.tsx
│   ├── ui/
│   │   ├── initial-loader.tsx
│   │   ├── particles-background.tsx
│   │   ├── project-modal.tsx
│   │   └── smooth-scroll-provider.tsx
│   └── portfolio-page.tsx
├── data/
│   ├── education.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── site.ts
│   ├── skills.ts
│   └── testimonials.ts
├── emails/
│   └── contact-form-email.tsx
├── hooks/
│   ├── useCounter.ts
│   └── useTypewriter.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── images/
│   └── awais-mustafa-resume.pdf
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Data-Driven Customization

Most portfolio content is controlled from the `data` folder:

- `data/site.ts` for navigation, hero roles, social links, contact info, and stats
- `data/skills.ts` for categories and skill percentages
- `data/projects.ts` for project cards and modal data
- `data/experience.ts` for work experience content
- `data/education.ts` for academic content
- `data/testimonials.ts` for testimonials

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open the project

Visit:

```text
http://localhost:3000
```

If port `3000` is busy, Next.js may move to another port such as `3001`.

## Available Scripts

- `npm run dev` starts the local development server
- `npm run build` creates the production build
- `npm run start` runs the production build
- `npm run lint` runs lint checks
- `npm run format` formats the codebase with Prettier

## Environment Variables

Create a `.env.local` file if you want the contact form to send real emails.

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
CONTACT_TO_EMAIL=awaismustafavhr@gmail.com
```

### What each variable does

- `RESEND_API_KEY`: authenticates requests to Resend
- `CONTACT_FROM_EMAIL`: sender address
- `CONTACT_TO_EMAIL`: destination email where form submissions are received

## Contact Form Flow

1. User fills the contact form in the portfolio
2. Form sends a `POST` request to `/api/contact`
3. Backend validates `name`, `email`, and `message`
4. Resend sends a formatted email using the React Email template
5. User receives success or error feedback in the UI

## Profile Image

The profile image currently loads from:

```text
public/images/profile-portrait.svg
```

To use your real portrait:

1. Replace that file with your actual image
2. Keep the same file name, or update the path in `components/sections/about-section.tsx`
3. Recommended formats:
   - `.png`
   - `.jpg`
   - `.webp`

## Resume File

The resume download button points to:

```text
public/awais-mustafa-resume.pdf
```

Replace this file with your real CV to make the download button work with your own resume.

## Performance and Motion Improvements

The project includes several motion systems. The current implementation has been improved to keep the experience smooth and more reliable:

- Lenis is used as the main smooth scrolling system
- the header now reacts to Lenis scroll state more cleanly
- background particles use lighter settings on mobile and coarse pointers
- reduced-motion users skip heavy background animation
- particle interaction does not block clicks or taps
- heavy blur intensity has been reduced for better responsiveness
- social icon interactions now use lighter hover motion instead of expensive visual effects

## Deployment

This project is ready for deployment on Vercel.

Short version:

1. Push the project to GitHub
2. Import the repository in Vercel
3. Add required environment variables
4. Deploy

For a full deployment walkthrough, read:

```text
VERCEL_DEPLOYMENT.md
```

## Recommended Next Customizations

- Replace SVG profile portrait with your real image
- Replace placeholder project URLs with real live/demo links
- Update education/testimonial content if needed
- Connect a custom domain on Vercel
- Add project screenshots that match your real work

## Troubleshooting

### Contact form does not send emails

Check:

- `RESEND_API_KEY`
- verified sender email in Resend
- `CONTACT_TO_EMAIL`

### Portfolio loads but animations feel disabled

Check:

- browser reduced motion settings
- low power mode on device
- browser extensions interfering with animations

### Social links do not open correctly

Verify the URLs in:

```text
data/site.ts
```

### Build fails

Run:

```bash
npm run build
```

Then fix any TypeScript or environment-related errors shown in the terminal.

## Author

**Awais Mustafa**

- City: Vehari, Pakistan
- Email: `awaismustafavhr@gmail.com`
- GitHub: `https://github.com/awaismustafavhr`

## License

This project is intended as a personal portfolio project for Awais Mustafa.
