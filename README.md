# Jai Acedera Portfolio Website

Single-page portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (via `@tailwindcss/vite`)

## Features

- Responsive single-page portfolio layout
- Dark-themed Slate/Cyan visual style
- Hero section with profile image
- About, Education, Certifications, Internship Experience, Tech Stack, Projects, Hardware Projects, Services
- Contact form integration via Formspree
- Mobile-friendly top navigation and section anchors

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

Create `.env` (or update existing) with:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

3. Start development server:

```bash
npm run dev
```

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Test on Phone (Same Wi-Fi)

Run:

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

Open on phone:

```text
http://YOUR_LOCAL_IP:5173
```

## Formspree Notes

- Make sure your Formspree form is active and your email is verified.
- If submissions fail, check Formspree dashboard logs and spam section.
- Restart `npm run dev` after updating `.env` values.
