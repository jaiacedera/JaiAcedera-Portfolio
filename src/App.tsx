// Custom hook to detect orientation
function useOrientation() {
  const [orientation, setOrientation] = React.useState(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );
  React.useEffect(() => {
    function handleResize() {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return orientation;
}
import Stack from './components/Stack';
import React, { useState, useEffect, useRef } from 'react'
import ProfileCard from './components/ProfileCard';
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
]

const experiences: ExperienceItem[] = [
  {
    role: 'Software Developer Intern',
    company: 'Creotec Philippines Inc',
    period: 'February 2026 - April 2026',
    achievements: [
      'Engineered an interactive wiring simulation system with structured difficulty progression to model real-world mechatronics tasks.',
      'Developed a real-time progress tracking engine that monitors trainee competency growth and marks simulation milestones.',
      'Designed a seamless trainee interface for navigating digital learning modules and launching integrated hardware simulations.',
      'Optimized the simulation workflow to support the project’s goal of compressing a 20-day training curriculum into a single day.',
    ],
  },
]

const projects: Project[] = [
  {
    title: 'Buso-Buso EOC App',
    description:
      'Buso-Buso Mobile App is a mobile Emergency Operations Center (EOC) app for Barangay Buso-Buso residents. It helps residents register their profile, submit distress reports, track report status, and view community alerts in real time.',
    stack: ['React Native', 'TypeScript', 'Tailwind', 'Expo', 'Firebase Firestore', 'gpt-4.1'],
    sourceUrl: 'https://github.com/jaiacedera/BusoBusoMobileApp',
    liveUrl: '#',
  },
  {
    title: 'Smol Suji Website',
    description:
      'Smol Suji is a minimal, full-stack e-commerce platform for "cute things in smol packages." It offers a delightful shopping experience with real-time cart updates and secure checkout, alongside a robust admin panel for managing inventory, tracking orders, and handling automated invoicing.',
    stack: ['Vite', 'Next.js', 'Tailwind CSS', 'Supabase', 'Typescript'],
    sourceUrl: 'https://github.com/jaiacedera/SmolSuji-Website',
    liveUrl: '#',
  },
  {
    title: 'CREO MechaLab X',
    description:
      'CREO MechaLab X is an interactive web platform that condenses 20-day Mechatronics training into a one-day digital experience. It features a trainee portal for simulations and modules, paired with an admin system for cohort management and progress tracking.',
    stack: ['React.js', 'Node', 'MySQL', 'Konva JS', 'Docker', 'Tailwind CSS', 'TypeScript'],
    sourceUrl: 'https://github.com/Qualestrom/creotec-mechalab-x',
    liveUrl: '#',
  },
  {
    title: 'Cradle',
    description:
      'CRADLE is a secure Android app for dormitory rentals, featuring real-time synchronization and verified listings to prevent scams. It provides tailored, role-based access for both landlords and tenants to ensure a seamless rental process.',
    stack: ['React.js', 'Node', 'MySQL', 'Konva JS', 'Docker', 'Tailwind CSS', 'TypeScript'],
    sourceUrl: 'https://github.com/Qualestrom/CRADLE_PROJECT',
    liveUrl: '#',
  },
]

const hardwareProjects: Project[] = [
  {
    title: 'Stored Program Machine for Car Kit Control',
    description:
      'Designed custom instruction sets for precise program execution. Integrated modular hardware, including memory and logic units, to ensure system stability. Applied computer architecture principles to develop and operate a functional car kit.',
    stack: ['Instruction Memory', '74LS161 Binary Counter', '74LS173 Register IC', 'L298N Motor Driver', '555 Timer'],
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
    category: 'Design & Tooling',
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
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">{title}</h2>
    </div>
  )
}

function App() {
  // Tech stack mobile accordion state
  const [activeTechIndex, setActiveTechIndex] = useState<number | null>(0);
  const toggleTechIndex = (index: number) => {
    setActiveTechIndex((prev) => (prev === index ? null : index));
  };
          const orientation = useOrientation();
        const linkedInUrl = 'https://www.linkedin.com/in/jairah-denise-acedera-17444a175?'
        const githubUrl = 'https://github.com/jaiacedera'

          const handleExternalRedirect = (url: string) => {
            window.open(url, '_blank', 'noopener,noreferrer')
          }

  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

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
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [projectDirection, setProjectDirection] = useState(0)

  const goToPreviousProject = () => {
    setProjectDirection(-1)
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToNextProject = () => {
    setProjectDirection(1)
    setActiveProjectIndex((prev) => (prev + 1) % projects.length)
  }

  const selectProjectIndex = (index: number) => {
    if (index === activeProjectIndex) return
    setProjectDirection(index > activeProjectIndex ? 1 : -1)
    setActiveProjectIndex(index)
  }

  const [desktopProjectStartIndex, setDesktopProjectStartIndex] = useState(0)

  const goToPreviousDesktopProjects = () => {
    setDesktopProjectStartIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToNextDesktopProjects = () => {
    setDesktopProjectStartIndex((prev) => (prev + 1) % projects.length)
  }

  const visibleDesktopProjects =
    projects.length === 0
      ? []
      : Array.from({ length: Math.min(3, projects.length) }, (_, offset) => projects[(desktopProjectStartIndex + offset) % projects.length])

  const [activeHardwareIndex, setActiveHardwareIndex] = useState(0)
  const [hardwareDirection, setHardwareDirection] = useState(0)

  const goToPreviousHardware = () => {
    setHardwareDirection(-1)
    setActiveHardwareIndex((prev) => (prev - 1 + hardwareProjects.length) % hardwareProjects.length)
  }

  const goToNextHardware = () => {
    setHardwareDirection(1)
    setActiveHardwareIndex((prev) => (prev + 1) % hardwareProjects.length)
  }

  const selectHardwareIndex = (index: number) => {
    if (index === activeHardwareIndex) return
    setHardwareDirection(index > activeHardwareIndex ? 1 : -1)
    setActiveHardwareIndex(index)
  }

  const [desktopHardwareStartIndex, setDesktopHardwareStartIndex] = useState(0)

  const goToPreviousDesktopHardware = () => {
    setDesktopHardwareStartIndex((prev) => (prev - 1 + hardwareProjects.length) % hardwareProjects.length)
  }

  const goToNextDesktopHardware = () => {
    setDesktopHardwareStartIndex((prev) => (prev + 1) % hardwareProjects.length)
  }

  const visibleDesktopHardwareProjects =
    hardwareProjects.length === 0
      ? []
      : Array.from({ length: Math.min(3, hardwareProjects.length) }, (_, offset) => hardwareProjects[(desktopHardwareStartIndex + offset) % hardwareProjects.length])

  const [activeCertificationIndex, setActiveCertificationIndex] = useState(0)
  const [certificationDirection, setCertificationDirection] = useState(0)

  const paginateCertification = (newDirection: number) => {
    if (certifications.length === 0) return
    setCertificationDirection(newDirection)
    setActiveCertificationIndex((prev) => (prev + newDirection + certifications.length) % certifications.length)
  }

  const selectCertification = (index: number) => {
    if (index === activeCertificationIndex) return
    setCertificationDirection(index > activeCertificationIndex ? 1 : -1)
    setActiveCertificationIndex(index)
  }

  const getCertificationPosition = (index: number) => {
    const total = certifications.length
    if (!total) return 'hidden'
    const diff = (index - activeCertificationIndex + total) % total
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    if (diff === total - 1) return 'left'
    return 'hidden'
  }

  const getCertificationVariant = (position: string) => {
    const transition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

    switch (position) {
      case 'center':
        return {
          zIndex: 10,
          opacity: 1,
          scale: 1,
          x: 0,
          filter: 'grayscale(0%)',
          pointerEvents: 'auto',
          transition,
        }
      case 'right':
        return {
          zIndex: 5,
          opacity: 0.5,
          scale: 0.9,
          x: 180,
          filter: 'grayscale(100%)',
          pointerEvents: 'auto',
          transition,
        }
      case 'left':
        return {
          zIndex: 5,
          opacity: 0.5,
          scale: 0.9,
          x: -180,
          filter: 'grayscale(100%)',
          pointerEvents: 'auto',
          transition,
        }
      default:
        return {
          zIndex: 0,
          opacity: 0,
          scale: 0.82,
          x: certificationDirection >= 0 ? 260 : -260,
          pointerEvents: 'none',
          filter: 'grayscale(100%)',
          transition,
        }
    }
  }

    const getCarouselPosition = (index: number, activeIndex: number, total: number) => {
      if (!total) return 'hidden'
      const diff = (index - activeIndex + total) % total
      if (diff === 0) return 'center'
      if (diff === 1) return 'right'
      if (diff === total - 1) return 'left'
      return 'hidden'
    }

    const getCarouselVariant = (position: string, direction: number) => {
      const transition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }

      switch (position) {
        case 'center':
          return {
            zIndex: 10,
            opacity: 1,
            scale: 1,
            x: 0,
            filter: 'grayscale(0%)',
            pointerEvents: 'auto',
            transition,
          }
        case 'right':
          return {
            zIndex: 5,
            opacity: 0.5,
            scale: 0.9,
            x: 180,
            filter: 'grayscale(100%)',
            pointerEvents: 'auto',
            transition,
          }
        case 'left':
          return {
            zIndex: 5,
            opacity: 0.5,
            scale: 0.9,
            x: -180,
            filter: 'grayscale(100%)',
            pointerEvents: 'auto',
            transition,
          }
        default:
          return {
            zIndex: 0,
            opacity: 0,
            scale: 0.82,
            x: direction >= 0 ? 260 : -260,
            pointerEvents: 'none',
            filter: 'grayscale(100%)',
            transition,
          }
      }
    }

  const projectTouchStartX = useRef<number | null>(null)
  const certificationTouchStartX = useRef<number | null>(null)
  const hardwareTouchStartX = useRef<number | null>(null)

  const aboutStackWidth = 250
  const aboutStackHeight = 250

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

  // Add orientation as a class for optional CSS targeting
  return (
    <div
      className={[
        'min-h-screen overflow-x-hidden transition-colors duration-300',
        isDarkMode
          ? 'bg-slate-950 text-slate-200'
          : 'bg-slate-100 text-slate-800',
        orientation === 'portrait' ? 'orientation-portrait' : 'orientation-landscape',
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
        <nav className="hidden items-center gap-8 text-sm text-slate-600 dark:text-slate-300 md:flex">
          <a href="#about" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">About</a>
          <a href="#education" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">Education</a>
          <a href="#projects" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">Projects</a>
          <a href="#hardware-projects" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">Hardware</a>
          <a href="#contact" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">Contact</a>
        </nav>
          <div className="ml-auto flex items-center gap-2 md:justify-self-end">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault()
                handleExternalRedirect(githubUrl)
              }}
              aria-label="GitHub"
              className="hidden rounded-md border border-slate-300 p-2 text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-cyan-300 md:inline-flex"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.12-1.45-1.12-1.45-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.11-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.69-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault()
                handleExternalRedirect(linkedInUrl)
              }}
              aria-label="LinkedIn"
              className="hidden rounded-md border border-slate-300 p-2 text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-cyan-300 md:inline-flex"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56a1.95 1.95 0 1 0-3.9 0 1.95 1.95 0 0 0 3.9 0ZM20 13.41c0-3.02-1.61-5.06-4.38-5.06-2.02 0-2.92 1.1-3.43 1.88V8.5H8.81V20h3.38v-5.69c0-1.5.29-2.96 2.14-2.96 1.82 0 1.85 1.7 1.85 3.06V20h3.37v-6.59Z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setIsDarkMode(v => !v)}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-md border border-slate-300 p-2 text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-cyan-300"
            >
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm9-7a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm14.95-6.95a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM6.757 17.243a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM18.95 18.95a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414ZM6.757 6.757a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 0 1 6.05 4.636l.707.707a1 1 0 0 1 0 1.414ZM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1Z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300 md:hidden"
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
                  'transition hover:text-cyan-700 dark:hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#education"
                className={[
                  'transition hover:text-cyan-700 dark:hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                Education
              </a>
              <a
                href="#projects"
                className={[
                  'transition hover:text-cyan-700 dark:hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                Software Projects
              </a>
              <a
                href="#hardware-projects"
                className={[
                  'transition hover:text-cyan-700 dark:hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                Hardware
              </a>
              <a
                href="#contact"
                className={[
                  'transition hover:text-cyan-700 dark:hover:text-cyan-300',
                  isDarkMode ? 'text-slate-300' : 'text-slate-700',
                ].join(' ')}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    event.preventDefault()
                    handleExternalRedirect(githubUrl)
                  }}
                  aria-label="GitHub"
                  className="inline-flex rounded-md border border-slate-300 p-2 text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-cyan-300"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.12-1.45-1.12-1.45-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.11-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.69-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                </a>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    event.preventDefault()
                    handleExternalRedirect(linkedInUrl)
                  }}
                  aria-label="LinkedIn"
                  className="inline-flex rounded-md border border-slate-300 p-2 text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-cyan-300"
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
        {/* Render mobile or laptop design based on orientation */}
        {orientation === 'portrait' ? (
          // MOBILE DESIGN (portrait)
          <section id="hero" className="min-h-screen flex items-start pb-16 pt-0 sm:pb-24 sm:pt-0 lg:pt-0">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              {/* ...existing code for mobile/portrait hero... */}
                <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                  Designing and building performant digital products with precision.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:mt-8 sm:text-lg">
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
                    className="w-full rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-100 dark:hover:text-cyan-300 sm:w-auto"
                  >
                    Let&apos;s Connect
                  </a>
                </div>
              <div className="relative mx-auto flex w-full justify-center lg:max-w-none">
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
        ) : (
          // LAPTOP DESIGN (landscape)
          <section id="hero" className="min-h-screen flex items-start pb-16 pt-0 sm:pb-24 sm:pt-0 lg:pt-0">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              {/* ...existing code for laptop/landscape hero... */}
              <div>
                <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-300/80">
                  Aspiring <span>{displayedRole}<span className="animate-blink">|</span></span>
                </p>
                <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                  Designing and building performant digital products with precision.
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:mt-8 sm:text-lg">
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
                    className="w-full rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-100 dark:hover:text-cyan-300 sm:w-auto"
                  >
                    Let&apos;s Connect
                  </a>
                </div>
              </div>
              <div className="relative mx-auto flex w-full justify-center lg:max-w-none">
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
        )}

        <section id="about" className="py-14 sm:py-20">
          <SectionHeading eyebrow="About Me" title="Building products with clarity and intent" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
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
              {/* Edit these props to customize Stack size. */}
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                cards={aboutStackCards}
                autoplay={false}
                autoplayDelay={3000}
                pauseOnHover={false}
                width={aboutStackWidth}
                height={aboutStackHeight}
              />
            </div>
          </div>
        </section>

        <section id="education" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Education" title="Academic and professional development" />

          <div className="relative space-y-8 border-l border-slate-200 dark:border-slate-800 pl-6">
            {education.map((item) => (
              <article key={`${item.degree}-${item.institution}`} className="relative">
                <span className="absolute -left-7.75 top-1 h-3 w-3 rounded-full bg-cyan-300" />
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.period}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{item.degree}</h3>
                <p className="mt-1 text-sm text-cyan-700 dark:text-cyan-300">{item.institution}</p>
                <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{item.details}</p>
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
                className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{item.role}</h3>
                <p className="mt-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">{item.company}</p>

                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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

          <div className="relative overflow-hidden pt-2 pb-8 sm:hidden">
            <div
              className="relative h-80"
              onTouchStart={(e) => { certificationTouchStartX.current = e.touches[0].clientX }}
              onTouchEnd={(e) => {
                if (certificationTouchStartX.current === null) return
                const diff = certificationTouchStartX.current - e.changedTouches[0].clientX
                if (Math.abs(diff) > 40) {
                  if (diff > 0) paginateCertification(1)
                  else paginateCertification(-1)
                }
                certificationTouchStartX.current = null
              }}
            >
              <button
                type="button"
                onClick={() => paginateCertification(-1)}
                className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300/80 bg-white/80 p-2 text-slate-600 backdrop-blur transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-cyan-300"
                aria-label="Previous certification"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => paginateCertification(1)}
                className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300/80 bg-white/80 p-2 text-slate-600 backdrop-blur transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-cyan-300"
                aria-label="Next certification"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="relative h-full">
                <AnimatePresence initial={false} custom={certificationDirection}>
                  {certifications.map((certification, index) => {
                    const position = getCertificationPosition(index)
                    if (position === 'hidden') return null

                    return (
                      <motion.article
                        key={`${certification.title}-${certification.credentialId}`}
                        initial={getCertificationVariant('hidden')}
                        animate={getCertificationVariant(position)}
                        exit={getCertificationVariant('hidden')}
                        className="absolute left-1/2 top-1/2 w-[min(82vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80 p-5 shadow-lg"
                      >
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{certification.year}</p>
                        <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{certification.title}</h3>
                        <p className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">{certification.issuer}</p>
                        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Credential ID: {certification.credentialId}</p>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-3 flex justify-center gap-2">
              {certifications.map((certification, index) => (
                <button
                  key={certification.credentialId}
                  type="button"
                  onClick={() => selectCertification(index)}
                  className={[
                    'h-2.5 w-2.5 rounded-full transition',
                    index === activeCertificationIndex
                      ? 'bg-cyan-600 dark:bg-cyan-300'
                      : 'bg-slate-300 hover:bg-cyan-400/70 dark:bg-slate-700 dark:hover:bg-cyan-300/60',
                  ].join(' ')}
                  aria-label={`Go to certification ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification) => (
              <article
                key={`${certification.title}-${certification.credentialId}`}
                className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{certification.year}</p>
                <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{certification.title}</h3>
                <p className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">{certification.issuer}</p>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Credential ID: {certification.credentialId}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="tech-stack" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Tech Stack" title="Tools I use to build fast, reliable products" />

          {/* Mobile block type - 2 columns with overlapping full-width details */}
          <div className="relative grid grid-cols-2 gap-3 overflow-visible sm:hidden">
            {techStackGroups.map((group, index) => {
              const isOpen = activeTechIndex === index
              const isLeftColumn = index % 2 === 0

              return (
                <div
                  key={group.category}
                  className="relative overflow-visible"
                >
                  <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70">
                    <button
                      type="button"
                      onClick={() => toggleTechIndex(index)}
                      className="flex min-h-20 w-full items-center justify-between px-4 py-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${group.category}`}
                    >
                      <span className="max-w-[78%] text-sm font-semibold leading-snug text-slate-900 dark:text-slate-100">
                      {group.category}
                    </span>

                    <span
                      className={`shrink-0 text-lg font-semibold text-cyan-600 transition-transform dark:text-cyan-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      +
                    </span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className={`absolute top-full z-30 mt-2 ${
                          isLeftColumn ? 'left-0' : 'right-0'
                        }`}
                        style={{ width: 'calc(200% + 0.75rem)' }}
                      >
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {group.focus}
                          </p>

                          <ul className="mt-4 flex flex-wrap gap-2">
                            {group.items.map((item) => (
                              <li
                                key={item}
                                className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-cyan-700 dark:text-cyan-200"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Desktop grid */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2">
            {techStackGroups.map((group) => (
              <article
                key={group.category}
                className="relative flex flex-col justify-center items-center min-h-56 min-w-72 w-full h-full overflow-visible rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-cyan-400/60 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {group.category}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {group.focus}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5 justify-center">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-cyan-700 dark:text-cyan-200"
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
          <SectionHeading eyebrow="Projects" title="Portfolio Highlights" />

          {/* Mobile carousel */}
          <div className="space-y-4 lg:hidden">
            {/*
              Hardware project container size is set here:
              - Mobile: className="relative h-105" (height: 26.25rem or 420px)
              - Desktop: className="flex h-full min-h-105 max-h-105 ..." (height: 26.25rem or 420px)
            */}
            <div
              className="relative h-105"
              onTouchStart={(e) => { projectTouchStartX.current = e.touches[0].clientX }}
              onTouchEnd={(e) => {
                if (projectTouchStartX.current === null) return
                const diff = projectTouchStartX.current - e.changedTouches[0].clientX
                if (Math.abs(diff) > 40) {
                  if (diff > 0) goToNextProject()
                  else goToPreviousProject()
                }
                projectTouchStartX.current = null
              }}
            >
              <button
                type="button"
                onClick={goToPreviousProject}
                className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300/80 bg-white/80 p-2 text-slate-600 backdrop-blur transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-cyan-300"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={goToNextProject}
                className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300/80 bg-white/80 p-2 text-slate-600 backdrop-blur transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-cyan-300"
                aria-label="Next project"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="relative h-full">
                <AnimatePresence initial={false} custom={projectDirection}>
                  {projects.map((project, index) => {
                    const position = getCarouselPosition(index, activeProjectIndex, projects.length)
                    if (position === 'hidden') return null

                    return (
                      <motion.article
                        key={`${project.title}-${index}`}
                        initial={getCarouselVariant('hidden', projectDirection)}
                        animate={getCarouselVariant(position, projectDirection)}
                        exit={getCarouselVariant('hidden', projectDirection)}
                        className="absolute left-1/2 top-1/2 flex h-full w-[min(82vw,320px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
                      >
                        <div className="flex h-full flex-col">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                            {project.title === 'Commissioned Project' && (
                              <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700">Commissioned Project</span>
                            )}
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto pt-6 flex items-center gap-4 text-sm">
                            <a href={project.sourceUrl} className="font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">
                              Source
                            </a>
                            <a href={project.liveUrl} className="font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => selectProjectIndex(index)}
                  className={[
                    'h-2.5 w-2.5 rounded-full transition',
                    index === activeProjectIndex
                      ? 'bg-cyan-600 dark:bg-cyan-300'
                      : 'bg-slate-300 hover:bg-cyan-400/70 dark:bg-slate-700 dark:hover:bg-cyan-300/60',
                  ].join(' ')}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Laptop/Desktop view: 3 cards + right arrow */}
          <div className="hidden lg:flex items-stretch gap-3">
            <button
              type="button"
              onClick={goToPreviousDesktopProjects}
              className="self-center rounded-full border border-slate-300 px-3 py-2 text-lg font-semibold leading-none text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300"
              aria-label="Show previous projects"
            >
              &lt;
            </button>

            <div className="grid flex-1 gap-6 lg:grid-cols-3">
              {visibleDesktopProjects.map((project, index) => (
                <article
                  key={`${project.title}-${desktopProjectStartIndex}-${index}`}
                  className="flex h-full min-h-105 max-h-105 overflow-hidden flex-col rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                    {project.title === 'Commissioned Project' && (
                      <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700">Commissioned Project</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 flex items-center gap-4 text-sm">
                    <a href={project.sourceUrl} className="font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">
                      Source
                    </a>
                    <a href={project.liveUrl} className="font-medium text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200">
                      Live Demo
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={goToNextDesktopProjects}
              className="self-center rounded-full border border-slate-300 px-3 py-2 text-lg font-semibold leading-none text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300"
              aria-label="Show next projects"
            >
              &gt;
            </button>
          </div>
        </section>

        <section id="hardware-projects" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Hardware Projects" title="Embedded and IoT builds" />

          {/* Mobile carousel */}
          <div className="space-y-4 lg:hidden">
            {/*
              Hardware project container size is set here:
              - Mobile: className="relative h-105" (height: 26.25rem or 420px)
              - Desktop: className="flex h-full min-h-105 max-h-105 ..." (height: 26.25rem or 420px)
              This matches the Projects section for visual consistency.
            */}
            <div
              className="relative h-105"
              onTouchStart={(e) => { hardwareTouchStartX.current = e.touches[0].clientX }}
              onTouchEnd={(e) => {
                if (hardwareTouchStartX.current === null) return
                const diff = hardwareTouchStartX.current - e.changedTouches[0].clientX
                if (Math.abs(diff) > 40) {
                  if (diff > 0) goToNextHardware()
                  else goToPreviousHardware()
                }
                hardwareTouchStartX.current = null
              }}
            >
              <button
                type="button"
                onClick={goToPreviousHardware}
                className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300/80 bg-white/80 p-2 text-slate-600 backdrop-blur transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-cyan-300"
                aria-label="Previous hardware project"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={goToNextHardware}
                className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300/80 bg-white/80 p-2 text-slate-600 backdrop-blur transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-cyan-300"
                aria-label="Next hardware project"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="relative h-full">
                <AnimatePresence initial={false} custom={hardwareDirection}>
                  {[...hardwareProjects, {
                    title: 'Commissioned Project',
                    description: 'A custom hardware solution built for a client, featuring embedded systems integration and IoT connectivity.',
                    stack: ['ESP32', 'Custom PCB', 'IoT', 'C++', 'MQTT']
                  }].map((project, index) => {
                    const position = getCarouselPosition(index, activeHardwareIndex, hardwareProjects.length + 1)
                    if (position === 'hidden') return null

                    return (
                      <motion.article
                        key={`${project.title}-${index}`}
                        initial={getCarouselVariant('hidden', hardwareDirection)}
                        animate={getCarouselVariant(position, hardwareDirection)}
                        exit={getCarouselVariant('hidden', hardwareDirection)}
                        className="absolute left-1/2 top-1/2 flex h-full w-[min(82vw,320px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900/80"
                      >
                        <div className="flex h-full flex-col">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {hardwareProjects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => selectHardwareIndex(index)}
                  className={[
                    'h-2.5 w-2.5 rounded-full transition',
                    index === activeHardwareIndex
                      ? 'bg-cyan-600 dark:bg-cyan-300'
                      : 'bg-slate-300 hover:bg-cyan-400/70 dark:bg-slate-700 dark:hover:bg-cyan-300/60',
                  ].join(' ')}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop view: 3 cards + arrows when more than 3 projects */}
          <div className="hidden lg:flex items-stretch gap-3">
            {hardwareProjects.length > 3 && (
              <button
                type="button"
                onClick={goToPreviousDesktopHardware}
                className="self-center rounded-full border border-slate-300 px-3 py-2 text-lg font-semibold leading-none text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300"
                aria-label="Show previous hardware projects"
              >
                &lt;
              </button>
            )}

            <div className="grid flex-1 gap-6 lg:grid-cols-3">
              {[...visibleDesktopHardwareProjects, {
                title: 'Commissioned Project',
                description: 'A custom hardware solution built for a client, featuring embedded systems integration and IoT connectivity.',
                stack: ['ESP32', 'Custom PCB', 'IoT', 'C++', 'MQTT']
              }].map((project, index) => (
                <article
                  key={`${project.title}-${desktopHardwareStartIndex}-${index}`}
                  className="flex h-full min-h-105 max-h-105 overflow-hidden flex-col rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {hardwareProjects.length > 3 && (
              <button
                type="button"
                onClick={goToNextDesktopHardware}
                className="self-center rounded-full border border-slate-300 px-3 py-2 text-lg font-semibold leading-none text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-cyan-300"
                aria-label="Show next hardware projects"
              >
                &gt;
              </button>
            )}
          </div>
        </section>

        <section id="services" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Services" title="Core offerings" />

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60"
              >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="py-14 sm:py-20">
          <SectionHeading eyebrow="Contact" title="Start a project or collaboration" />

          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Let&apos;s build something meaningful.</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Share your project goals, timeline, and technical context. I&apos;ll get back with a practical,
                structured plan for the next steps.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/70 p-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your goals, constraints, and timeline."
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
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
                        : 'text-cyan-700 dark:text-cyan-300',
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

      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:px-6 sm:text-left lg:px-10">
          <p>© {new Date().getFullYear()} Jai Acedera. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault()
                handleExternalRedirect(linkedInUrl)
              }}
              className="transition hover:text-cyan-700 dark:hover:text-cyan-300"
            >
              LinkedIn
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault()
                handleExternalRedirect(githubUrl)
              }}
              className="transition hover:text-cyan-700 dark:hover:text-cyan-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
