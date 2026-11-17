import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Folder, X, Code, ExternalLink } from 'lucide-react'
import Section from './Section'
import './Projects.css'

// Screenshots: put image files in src/assets/projects/ and write the file name in "image" below.
// Example: image: 'luxe-studio.jpg'
const imageFiles = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
})
const getImage = (name) => (name ? imageFiles[`../assets/projects/${name}`] : undefined)

const categories = [
    'All',
    'Web Development',
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
]

// status: 'Completed' | 'In progress' | 'Concept'
// categories: one or more of the category names above.
// details / note / image are optional. To add a project, copy a block and edit it.
const projects = [
    {
        title: 'CarePath AI',
        status: 'In progress',
        categories: ['Web Development', 'Artificial Intelligence'],
        description:
            'A demonstration platform for preventive-care navigation in Abu Dhabi, covering child Well-Child Visit and adult screening pathways. Uses synthetic data only, with no real patients and no trained model connected.',
        details: [
            'Case workflow, status changes and audit trail on synthetic cases',
            'Demo login with clinician and viewer roles',
            'Per-case consent and preferences. Declined consent blocks message previews',
            'English and Arabic interface with right-to-left layout',
            'Rule-based child flags. No adult risk model is connected',
            'Model metrics and fairness results show "Not available" until real evaluation data exists',
        ],
        note: 'All case records are synthetic demo data. Arabic wording is a draft and needs native review.',
        stack: ['TypeScript', 'Python', 'SQLite'],
        repo: 'https://github.com/Anopa21/carepath-ai',
        demo: '',
        image: '',
    },
    {
        title: 'LUXE STUDIO',
        status: 'Completed',
        categories: ['Web Development'],
        description:
            'A premium, editorial-style website for a fictional luxury hair salon, built to practise modern React, responsive design and motion. Includes a 3D hero object.',
        details: [
            'Editorial, responsive design with smooth motion',
            '3D gold object in the hero section (desktop only)',
            'Deployed online on Vercel',
        ],
        note: 'Fictional business. All names, prices, reviews and contact details are sample content.',
        stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
        repo: 'https://github.com/Anopa21/luxe-studio',
        demo: 'https://luxe-studio-eight.vercel.app',
        image: '',
    },
    {
        title: 'Bank Marketing Classification',
        status: 'Completed',
        categories: ['Machine Learning', 'Data Science'],
        description:
            'Predicts whether a customer will subscribe to a term deposit using bank marketing call data, handling imbalanced classes and checking for data leakage.',
        details: [],
        note: '',
        stack: ['Python'],
        repo: 'https://github.com/Anopa21/bank-marketing-classification',
        demo: '',
        image: '',
    },
    {
        title: 'Student Performance Analysis',
        status: 'Completed',
        categories: ['Data Science'],
        description:
            'Explores the factors associated with academic achievement in secondary school students.',
        details: [],
        note: '',
        stack: ['Python'],
        repo: 'https://github.com/Anopa21/student-performance-analysis',
        demo: '',
        image: '',
    },
    {
        title: 'Chinook SQL Analysis',
        status: 'Completed',
        categories: ['Data Science'],
        description:
            'SQL practice on the Chinook sample database: schema exploration, joins, CTEs, window functions and data-quality checks, run from Python with saved query outputs.',
        details: [
            'Schema exploration: primary keys, foreign keys and how the 11 tables connect',
            'Joins, CTEs and window functions such as RANK, ROW_NUMBER and LAG',
            'Data-quality checks for orphaned rows, duplicates and totals that should match their parts',
            'Runs the SQL files from Python with sqlite3 and pandas and saves each output',
        ],
        note: 'The sample database has randomly generated sales data, so this project shows SQL skills, not business findings.',
        stack: ['SQL', 'SQLite', 'Python', 'pandas'],
        repo: 'https://github.com/Anopa21/chinook-sql-analysis',
        demo: '',
        image: '',
    },
    {
        title: 'CampusFix',
        status: 'Completed',
        categories: ['Web Development'],
        description:
            'A university service request system where students report campus problems such as broken air conditioning or Wi-Fi issues. Validates requests, generates ticket numbers and tracks active and resolved tickets.',
        details: [
            'Submit a request with required-field validation and a unique ticket number',
            'Tickets are saved to a database, with a list of all tickets and a full detail view',
            'Shows active and resolved ticket counts, sorted from newest to oldest',
            'Each ticket records title, description, category, location, priority, status and date',
        ],
        note: '',
        stack: ['Java 21', 'Spring Boot', 'Thymeleaf', 'Spring Data JPA', 'H2', 'Maven'],
        repo: 'https://github.com/Anopa21/Campusfix',
        demo: '',
        image: '',
    },
    {
        title: 'MediScan AI',
        status: 'Concept',
        categories: ['Artificial Intelligence', 'Machine Learning'],
        description:
            'A concept for an intelligent diagnostic assistant. This is an idea only. Nothing has been built yet.',
        details: [],
        note: 'Concept only. No code, data or results exist yet.',
        stack: [],
        repo: '',
        demo: '',
        image: '',
    },
]

const statusClass = {
    Completed: 'completed',
    'In progress': 'progress',
    Concept: 'concept',
}

function ProjectModal({ project, onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', onKey)
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = previous
        }
    }, [onClose])

    const img = getImage(project.image)

    return (
        <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-label={project.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose} aria-label="Close details" autoFocus>
                    <X size={20} />
                </button>

                <span className={`status ${statusClass[project.status]}`}>{project.status}</span>
                <h3 className="modal-title">{project.title}</h3>
                <p className="project-cats">{project.categories.join(' · ')}</p>

                {img && <img className="modal-img" src={img} alt={`${project.title} screenshot`} />}

                <p className="modal-desc">{project.description}</p>

                {project.details.length > 0 && (
                    <>
                        <h4 className="modal-sub">What it includes</h4>
                        <ul className="modal-list">
                            {project.details.map((d) => (
                                <li key={d}>{d}</li>
                            ))}
                        </ul>
                    </>
                )}

                {project.note && <p className="modal-note">{project.note}</p>}

                {project.stack.length > 0 && (
                    <>
                        <h4 className="modal-sub">Technologies</h4>
                        <div className="chips">
                            {project.stack.map((s) => (
                                <span className="chip" key={s}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </>
                )}

                <div className="modal-actions">
                    {project.repo && (
                        <a className="m-btn primary" href={project.repo} target="_blank" rel="noreferrer">
                            <Code size={16} /> View code
                        </a>
                    )}
                    {project.demo && (
                        <a className="m-btn ghost" href={project.demo} target="_blank" rel="noreferrer">
                            <ExternalLink size={16} /> Live demo
                        </a>
                    )}
                    {!project.repo && !project.demo && <span className="no-link">No code yet</span>}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Projects() {
    const [active, setActive] = useState('All')
    const [selected, setSelected] = useState(null)

    const visible =
        active === 'All' ? projects : projects.filter((p) => p.categories.includes(active))

    const count = (c) =>
        c === 'All' ? projects.length : projects.filter((p) => p.categories.includes(c)).length

    return (
        <Section id="projects" eyebrow="04 / Projects" title="Projects">
            <div className="filter-bar" role="tablist" aria-label="Project categories">
                {categories.map((c) => (
                    <button
                        key={c}
                        role="tab"
                        aria-selected={active === c}
                        className={active === c ? 'filter active' : 'filter'}
                        onClick={() => setActive(c)}
                    >
                        {c} <span>{count(c)}</span>
                    </button>
                ))}
            </div>

            <motion.div layout className="projects-grid">
                <AnimatePresence mode="popLayout" initial={false}>
                    {visible.map((p) => {
                        const img = getImage(p.image)
                        return (
                            <motion.article
                                key={p.title}
                                layout
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.94 }}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card project-card"
                            >
                                {img && <img className="card-img" src={img} alt="" loading="lazy" />}

                                <div className="project-top">
                                    <Folder className="project-icon" size={28} />
                                    <span className={`status ${statusClass[p.status]}`}>{p.status}</span>
                                </div>

                                <h3>{p.title}</h3>
                                <p className="project-cats">{p.categories.join(' · ')}</p>
                                <p className="project-desc">{p.description}</p>

                                {p.stack.length > 0 && (
                                    <div className="chips">
                                        {p.stack.map((s) => (
                                            <span className="chip" key={s}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="project-links">
                                    <button className="details-btn" onClick={() => setSelected(p)}>
                                        View details
                                    </button>
                                    {p.repo && (
                                        <a href={p.repo} target="_blank" rel="noreferrer">
                                            Code
                                        </a>
                                    )}
                                    {p.demo && (
                                        <a href={p.demo} target="_blank" rel="noreferrer">
                                            Live demo
                                        </a>
                                    )}
                                </div>
                            </motion.article>
                        )
                    })}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </Section>
    )
}