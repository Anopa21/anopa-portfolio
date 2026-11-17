import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Wrench, Users, Brain, TrendingUp } from 'lucide-react'
import Section from './Section'
import './Skills.css'

const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons'

// icon: a Devicon folder name (brand logo) OR a lucide icon component.
// invert: true makes a dark logo visible on the dark background.
const technologies = [
    { name: 'Python', icon: 'python/python-original.svg' },
    { name: 'Java', icon: 'java/java-original.svg' },
    { name: 'JavaScript', icon: 'javascript/javascript-original.svg' },
    { name: 'HTML5', icon: 'html5/html5-original.svg' },
    { name: 'CSS3', icon: 'css3/css3-original.svg' },
    { name: 'SQL', Icon: Database },
    { name: 'React', icon: 'react/react-original.svg' },
    { name: 'Git', icon: 'git/git-original.svg' },
    { name: 'GitHub', icon: 'github/github-original.svg', invert: true },
    { name: 'Jupyter Notebook', icon: 'jupyter/jupyter-original.svg' },
    { name: 'Machine Learning', Icon: Brain },
    { name: 'Data Analysis', Icon: TrendingUp },
]

const groups = [
    {
        title: 'Programming & Development',
        Icon: Code,
        items: ['Python', 'Java', 'SQL', 'HTML5', 'CSS3', 'JavaScript', 'SQLite', 'Git & GitHub'],
    },
    {
        title: 'Data Science',
        Icon: Database,
        items: [
            'Data Analysis',
            'Data Cleaning',
            'Data Visualisation',
            'Exploratory Data Analysis (EDA)',
            'Statistical Analysis',
            'Machine Learning Fundamentals',
        ],
    },
    {
        title: 'Tools & Technologies',
        Icon: Wrench,
        items: ['Visual Studio Code', 'Jupyter Notebook', 'MySQL', 'XAMPP', 'Microsoft Office'],
    },
    {
        title: 'Professional Skills',
        Icon: Users,
        items: [
            'Problem-Solving',
            'Critical Thinking',
            'Teamwork',
            'Communication',
            'Time Management',
            'Adaptability',
            'Continuous Learning',
        ],
    },
]

const builtWith = [
    'React',
    'Vite',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Framer Motion',
    'Lucide React',
]

function TechIcon({ tech }) {
    const [failed, setFailed] = useState(false)

    if (tech.Icon) {
        const Icon = tech.Icon
        return <Icon size={44} className="tech-line-icon" />
    }

    if (failed) {
        return <span className="tech-fallback">{tech.name.slice(0, 2)}</span>
    }

    return (
        <img
            src={`${ICON_BASE}/${tech.icon}`}
            alt=""
            width="44"
            height="44"
            loading="lazy"
            draggable="false"
            className={tech.invert ? 'invert' : ''}
            onError={() => setFailed(true)}
        />
    )
}

export default function Skills() {
    return (
        <Section id="skills" eyebrow="03 / Skills" title="Skills & technologies">
            <p className="tech-intro">
                Technologies I work with and am learning. I&apos;m a student, so this list keeps growing.
            </p>

            <div className="tech-grid">
                {technologies.map((t, i) => (
                    <motion.div
                        key={t.name}
                        className="tech-tile"
                        initial={{ opacity: 0, y: 24, scale: 0.85 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ y: -8, scale: 1.05 }}
                    >
                        <TechIcon tech={t} />
                        <span>{t.name}</span>
                    </motion.div>
                ))}
            </div>

            <h3 className="skills-sub">More skills</h3>
            <div className="skills-grid">
                {groups.map(({ title, Icon, items }) => (
                    <div className="glass-card" key={title}>
                        <Icon className="skill-icon" size={28} />
                        <h3>{title}</h3>
                        <div className="chips">
                            {items.map((s) => (
                                <span className="chip" key={s}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <p className="built-label">This website is built with:</p>
            <div className="chips">
                {builtWith.map((s) => (
                    <span className="chip" key={s}>
                        {s}
                    </span>
                ))}
            </div>
        </Section>
    )
}