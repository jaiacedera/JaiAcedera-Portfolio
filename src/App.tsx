import Stack from './components/Stack';
import React, { useState, useEffect } from 'react'
import ProfileCard from './components/ProfileCard';
import type { FormEvent } from 'react'

interface EducationItem {
  degree: string
  institution: string
  period: string
  details: string
}

interface ExperienceItem {
  role: string
  company: string
  period: string
  achievements: string[]
}

interface Project {
  title: string
  description: string
  stack: string[]
  sourceUrl: string
  liveUrl: string
}

interface Service {
  title: string
  summary: string
}

interface TechStackGroup {
  category: string
  focus: string
  items: string[]
}

interface Certification {
  title: string
  issuer: string
  year: string
  credentialId: string
}

const education: EducationItem[] = [
  {
    degree: 'B.S. in Computer Engineering',
    institution: 'Batangas State University',
    period: '2022 — 2026',
    details:
      'Focused on software engineering, human-computer interaction, and distributed systems.',
  },
  {
    degree: 'Frontend Specialization',
    institution: 'Design + Code Institute',
    period: '2022',
    details:
      'Advanced training in modern React architecture, performance optimization, and accessible UI.',
  },
]

const experiences: ExperienceItem[] = [
  {
    role: 'Software Developer Intern',
    company: 'Creotec Philippines Inc',
    period: 'February 2026 - April 2026',
    achievements: [
      'Built responsive user interfaces using React and TypeScript under senior developer mentorship.',
      'Implemented reusable components and assisted with API integration for dashboard features.',
      'Contributed bug fixes, testing support, and UI polish across sprint deliverables.',
    ],
  },
]

const projects: Project[] = [
  {
    title: 'Analytics Command Center',
    description:
      'A data-rich admin portal with role-based views, charting modules, and advanced table interactions.',
    stack: ['React', 'TypeScript', 'Tailwind', 'TanStack Query'],
    sourceUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'E-Commerce Experience Platform',
    description:
      'A conversion-focused storefront with dynamic merchandising, reusable UI primitives, and SEO optimization.',
    stack: ['Vite', 'React', 'TypeScript', 'REST API'],
    sourceUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Portfolio CMS Starter',
    description:
      'A starter platform for creators to manage projects, case studies, and media through a simple dashboard.',
    stack: ['React', 'Node', 'PostgreSQL', 'Cloud Storage'],
    sourceUrl: '#',
    liveUrl: '#',
  },
]

const hardwareProjects: Project[] = [
  {
    title: 'Smart Greenhouse Controller',
    description:
      'An IoT-based greenhouse monitor that automates irrigation and ventilation using real-time environmental sensor data.',
    stack: ['ESP32', 'C++', 'MQTT', 'BME280'],
    sourceUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'RFID Attendance System',
    description:
      'A classroom attendance tracker using RFID cards, local display feedback, and cloud sync for logs and reporting.',
    stack: ['Arduino', 'RFID RC522', 'Firebase', 'C++'],
    sourceUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Gesture-Controlled Robotic Arm',
    description:
      'A prototype robotic arm controlled by glove-based flex sensors and mapped servo movements for intuitive operation.',
    stack: ['Arduino Nano', 'Servo Motors', 'Flex Sensors', 'Embedded C'],
    sourceUrl: '#',
    liveUrl: '#',
  },
]

const services: Service[] = [
  {
    title: 'UI/UX Implementation',
    summary:
      'High-fidelity, responsive interfaces built with accessibility, clarity, and performance in mind.',
  },
  {
    title: 'Frontend Architecture',
    summary:
      'Scalable React + TypeScript codebases with maintainable patterns and predictable state strategies.',
  },
  {
    title: 'Hardware Projects for STEM Students',
    summary:
      'Guidance and development support for student hardware builds, from microcontroller setup to sensor integration and project documentation.',
  },
]

const techStackGroups: TechStackGroup[] = [
  {
    category: 'Frontend (Web)',
    focus: 'Building responsive and interactive web interfaces',
    items: ['HTML', 'CSS', 'JavaScript', 'React JS', 'TypeScript', 'Tailwind CSS', 'Konva JS', 'Vite'],
  },
  {
    category: 'Mobile App Development',
    focus: 'Cross-platform and native mobile development',
    items: ['Flutter', 'Dart', 'React Native', 'Expo', 'Kotlin'],
  },
  {
    category: 'Backend, Cloud & Security',
    focus: 'Server-side logic, cloud data, and authentication',
    items: ['Django', 'Node.js', 'Firebase Firestore', 'Firebase Authentication', 'OAuth'],
  },
  {
    category: 'Hardware & Microcontrollers',
    focus: 'Embedded systems and electronics prototyping',
    items: ['Arduino', 'ESP32', 'Raspberry Pi Pico', 'STM32', 'Microcontrollers'],
  },
  {
    category: 'Design, Collaboration & Tooling',
    focus: 'Design workflow, version control, and build tools',
    items: ['Figma', 'Git', 'GitHub', 'Gradle'],
  },
  {
    category: 'Programming Languages',
    focus: 'Languages used across frontend, mobile, and backend work',
    items: ['JavaScript', 'TypeScript', 'Dart', 'Kotlin', 'C++'],
  },
]

const certifications: Certification[] = [
  {
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    year: '2024',
    credentialId: 'CERT-XXXX-0001',
  },
  {
    title: 'Responsive Web Design Certification',
    issuer: 'freeCodeCamp',
    year: '2023',
    credentialId: 'FCC-RESP-0002',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    year: '2023',
    credentialId: 'FCC-JSAD-0003',
  },
]

function SectionHeading({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">{title}</h2>
    </div>
  )
}

function App() {
  const [isDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formspreeEndpoint) {
      setSubmitStatus('error')
      setSubmitMessage('Form service is not configured yet. Add VITE_FORMSPREE_ENDPOINT in your .env file.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    setSubmitStatus('submitting')
    setSubmitMessage('Sending your message...')

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed request')
      }

      form.reset()
      setSubmitStatus('success')
      setSubmitMessage('Thanks! Your message has been sent successfully.')
    } catch {
      setSubmitStatus('error')
      setSubmitMessage('Something went wrong while sending. Please try again.')
    }
  }

  // Typing animation for developer roles
  const roles = React.useMemo(() => [
    'Frontend Developer',
    'UI/UX ',
    'FullStack Developer',
    'Quality Assurance Engineer',
  ], [])
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(120)

  const aboutStackCards = React.useMemo(
    () =>
      [
        'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format',
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
        'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format',
      ].map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`card-${i + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )),
    []
  )

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timer: ReturnType<typeof setTimeout>
    if (!isDeleting && displayedRole.length < currentRole.length) {
      setTypingSpeed(120)
      timer = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1))
      }, typingSpeed)
    } else if (isDeleting && displayedRole.length > 0) {
      setTypingSpeed(60)
      timer = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, displayedRole.length - 1))
      }, typingSpeed)
    } else if (!isDeleting && displayedRole.length === currentRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 1000)
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }
    return () => clearTimeout(timer)
  }, [displayedRole, isDeleting, roleIndex, roles, typingSpeed])

  return (
    <div
      className={[
        'min-h-screen transition-colors duration-300',
        isDarkMode
          ? 'bg-slate-950 text-slate-200'
          : 'bg-slate-100 text-slate-800',
      ].join(' ')}
    >
      <header
        className={[
          'sticky top-0 z-30 border-b backdrop-blur-md transition-colors duration-300',
          isDarkMode
            ? 'border-slate-800/70 bg-slate-950/90'
            : 'border-slate-300 bg-slate-100/90',
        ].join(' ')}
      >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center px-4 py-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-10">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/profile-photo.jpg"
            alt="Jai Acedera avatar"
            className="h-9 w-9 rounded-full border border-cyan-300/60 object-cover"
          />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#about" className="transition hover:text-cyan-300">About</a>
          <a href="#education" className="transition hover:text-cyan-300">Education</a>
          <a href="#projects" className="transition hover:text-cyan-300">Projects</a>
          <a href="#hardware-projects" className="transition hover:text-cyan-300">Hardware</a>
          <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
        </nav>
          <div className="ml-auto flex items-center gap-2 md:justify-self-end">
            <a
              href="#"
              aria-label="GitHub"
              className="hidden rounded-md border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-300 md:inline-flex"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.12-1.45-1.12-1.45-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.11-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.69-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hidden rounded-md border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-300 md:inline-flex"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56a1.95 1.95 0 1 0-3.9 0 1.95 1.95 0 0 0 3.9 0ZM20 13.41c0-3.02-1.61-5.06-4.38-5.06-2.02 0-2.92 1.1-3.43 1.88V8.5H8.81V20h3.38v-5.69c0-1.5.29-2.96 2.14-2.96 1.82 0 1.85 1.7 1.85 3.06V20h3.37v-6.59Z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-300 hover:text-cyan-300 md:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
        {isMenuOpen ? (
          <nav
            className={[
              'border-t px-4 py-3 sm:px-6 md:hidden',
              isDarkMode ? 'border-slate-800/70' : 'border-slate-300',
            ].join(' ')}
          >
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="#about"
                className={[
                  'transition hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#education"
                className={[
                  'transition hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                Education
              </a>
              <a
                href="#projects"
                className={[
                  'transition hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#hardware-projects"
                className={[
                  'transition hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                Hardware
              </a>
              <a
                href="#contact"
                className={[
                  'transition hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href="#"
                  aria-label="GitHub"
                  className="inline-flex rounded-md border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.12-1.45-1.12-1.45-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.11-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.69-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="inline-flex rounded-md border border-slate-700 p-2 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56a1.95 1.95 0 1 0-3.9 0 1.95 1.95 0 0 0 3.9 0ZM20 13.41c0-3.02-1.61-5.06-4.38-5.06-2.02 0-2.92 1.1-3.43 1.88V8.5H8.81V20h3.38v-5.69c0-1.5.29-2.96 2.14-2.96 1.82 0 1.85 1.7 1.85 3.06V20h3.37v-6.59Z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-10 lg:pt-14">
        <section id="hero" className="min-h-screen flex items-start pb-16 pt-0 sm:pb-24 sm:pt-0 lg:pt-0">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                Aspiring <span>{displayedRole}<span className="animate-blink">|</span></span>
              </p>

              <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-slate-100 sm:text-5xl lg:text-6xl">
                Designing and building performant digital products with precision.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:mt-8 sm:text-lg">
                I craft polished web experiences that prioritize maintainability, speed, and clean architecture. 
                As a Computer Engineering graduate, I specialize in developing efficient software solutions that 
                bridge the gap between high-level web development and real-world hardware integration.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a
                  href="#projects"
                  className="w-full rounded-lg bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="w-full rounded-lg border border-slate-700 px-6 py-3 text-center text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-cyan-300 sm:w-auto"
                >
                  Let&apos;s Connect
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <ProfileCard
                name="Jairah Denise C. Acedera"
                title="Computer Engineer"
                handle="javicodes"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/profile-photo.jpg"
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
                behindGlowColor="rgba(125, 190, 255, 0.67)"
                iconUrl="/assets/demo/iconpattern.png"
                behindGlowEnabled={true}
                innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-14 sm:py-20">
          <SectionHeading eyebrow="About Me" title="Building products with clarity and intent" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-base leading-relaxed text-slate-300">
              <p>
                I approach frontend development as both an engineering and design discipline. Every screen should
                communicate clearly, perform quickly, and remain maintainable as products evolve.
              </p>
              <p>
                My workflow prioritizes semantic markup, accessible interactions, and modular architecture with
                TypeScript-driven reliability. I enjoy translating complex requirements into elegant,
                production-ready interfaces.
              </p>
            </div>
            <div className="flex justify-center">
              {/* Stack usage example with custom images and props */}
              <div style={{ width: 208, height: 208 }}>
                <Stack
                  randomRotation={false}
                  sensitivity={200}
                  sendToBackOnClick={true}
                  cards={aboutStackCards}
                  autoplay={false}
                  autoplayDelay={3000}
                  pauseOnHover={false}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Education" title="Academic and professional development" />

          <div className="relative space-y-8 border-l border-slate-800 pl-6">
            {education.map((item) => (
              <article key={`${item.degree}-${item.institution}`} className="relative">
                <span className="absolute -left-7.75 top-1 h-3 w-3 rounded-full bg-cyan-300" />
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-100">{item.degree}</h3>
                <p className="mt-1 text-sm text-cyan-300">{item.institution}</p>
                <p className="mt-3 max-w-3xl text-slate-300">{item.details}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Works & Experience" title="Professional history" />

          <div className="grid gap-6 md:grid-cols-2">
            {experiences.map((item) => (
              <article
                key={`${item.role}-${item.company}`}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-100">{item.role}</h3>
                <p className="mt-1 text-sm font-medium text-cyan-300">{item.company}</p>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Certifications" title="Professional credentials" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification) => (
              <article
                key={`${certification.title}-${certification.credentialId}`}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{certification.year}</p>
                <h3 className="mt-2 text-base font-semibold text-slate-100">{certification.title}</h3>
                <p className="mt-2 text-sm text-cyan-300">{certification.issuer}</p>
                <p className="mt-3 text-xs text-slate-400">Credential ID: {certification.credentialId}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="tech-stack" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Tech Stack" title="Tools I use to build fast, reliable products" />

          <div className="grid gap-6 sm:grid-cols-2">
            {techStackGroups.map((group) => (
              <article
                key={group.category}
                className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />

                <h3 className="text-lg font-semibold text-slate-100">{group.category}</h3>
                <p className="mt-2 text-sm text-slate-300">{group.focus}</p>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-cyan-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Projects" title="Selected work" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4 text-sm">
                  <a href={project.sourceUrl} className="font-medium text-cyan-300 transition hover:text-cyan-200">
                    Source
                  </a>
                  <a href={project.liveUrl} className="font-medium text-cyan-300 transition hover:text-cyan-200">
                    Live Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="hardware-projects" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Hardware Projects" title="Embedded and IoT builds" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hardwareProjects.map((project) => (
              <article
                key={project.title}
                className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4 text-sm">
                  <a href={project.sourceUrl} className="font-medium text-cyan-300 transition hover:text-cyan-200">
                    Source
                  </a>
                  <a href={project.liveUrl} className="font-medium text-cyan-300 transition hover:text-cyan-200">
                    Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Services" title="Core offerings" />

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <h3 className="text-lg font-semibold text-slate-100">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{service.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Contact" title="Start a project or collaboration" />

          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold text-slate-100">Let&apos;s build something meaningful.</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
                Share your project goals, timeline, and technical context. I&apos;ll get back with a practical,
                structured plan for the next steps.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your goals, constraints, and timeline."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none"
                />
              </div>

              <p className="text-xs text-slate-400">
                Messages are sent securely via Formspree.
              </p>

              {submitStatus !== 'idle' ? (
                <p
                  className={[
                    'text-sm',
                    submitStatus === 'success'
                      ? 'text-emerald-300'
                      : submitStatus === 'error'
                        ? 'text-rose-300'
                        : 'text-cyan-300',
                  ].join(' ')}
                >
                  {submitMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
              >
                {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/80 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-400 sm:flex-row sm:px-6 sm:text-left lg:px-10">
          <p>© {new Date().getFullYear()} Jai Acedera. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-cyan-300">
              LinkedIn
            </a>
            <a href="#" className="transition hover:text-cyan-300">
              GitHub
            </a>
            <a href="#" className="transition hover:text-cyan-300">
              Dribbble
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
