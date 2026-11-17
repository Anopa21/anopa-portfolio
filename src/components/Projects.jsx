import { motion } from 'framer-motion'
import { Folder } from 'lucide-react'
import Section from './Section'
import './Projects.css'

const projects = [
    {
        title: 'CarePath AI',
        description:
            'A demonstration platform for preventive-care navigation in Abu Dhabi, covering child Well-Child Visit and adult screening pathways. English and Arabic (right-to-left) interface, consent controls, case workflow and audit trail. Uses synthetic data only, with no real patients and no trained model connected.',
        stack: ['TypeScript', 'Python', 'SQLite'],
        repo: 'https://github.com/Anopa21/carepath-ai',
        demo: '',
    },
    {
        title: 'LUXE STUDIO',
        description:
            'A premium, editorial-style website for a fictional luxury hair salon, built to practise modern React, responsive design and motion. Includes a 3D hero object.',
        stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
        repo: 'https://github.com/Anopa21/luxe-studio',
        demo: 'https://luxe-studio-eight.vercel.app',
    },
    {
        title: 'Bank Marketing Classification',
        description:
            'Predicts whether a customer will subscribe to a term deposit using bank marketing call data, handling imbalanced classes and checking for data leakage.',
        stack: ['Python'],
        repo: 'https://github.com/Anopa21/bank-marketing-classification',
        demo: '',
    },
    {
        title: 'Student Performance Analysis',
        description:
            'Explores the factors associated with academic achievement in secondary school students.',
        stack: ['Python'],
        repo: 'https://github.com/Anopa21/student-performance-analysis',
        demo: '',
    },
    {
        title: 'Chinook SQL Analysis',
        description:
            'SQL practice on the Chinook sample database: schema exploration, joins, CTEs, window functions and data-quality checks, run from Python with saved query outputs.',
        stack: ['SQL', 'SQLite', 'Python', 'pandas'],
        repo: 'https://github.com/Anopa21/chinook-sql-analysis',
        demo: '',
    },
    {
        title: 'CampusFix',
        description:
            'A university service request system where students report campus problems such as broken air conditioning or Wi-Fi issues. Validates requests, generates ticket numbers and tracks active and resolved tickets.',
        stack: ['Java 21', 'Spring Boot', 'Thymeleaf', 'Spring Data JPA', 'H2', 'Maven'],
        repo: 'https://github.com/Anopa21/Campusfix',
        demo: '',
    },
]

export default function Projects() {
    return (
        <Section id="projects" eyebrow="04 / Projects" title="Projects">
            <div className="projects-grid">
                {projects.map((p) => (
                    <motion.article
                        key={p.title}
                        className="glass-card project-card"
                        whileHover={{ y: -6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <Folder className="project-icon" size={28} />
                        <h3>{p.title}</h3>
                        <p className="project-desc">{p.description}</p>

                        <div className="chips">
                            {p.stack.map((s) => (
                                <span className="chip" key={s}>
                                    {s}
                                </span>
                            ))}
                        </div>

                        <div className="project-links">
                            {p.repo && (
                                <a href={p.repo} target="_blank" rel="noreferrer">
                                    View code
                                </a>
                            )}
                            {p.demo && (
                                <a href={p.demo} target="_blank" rel="noreferrer">
                                    Live demo
                                </a>
                            )}
                        </div>
                    </motion.article>
                ))}
            </div>
        </Section>
    )
}