import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import SocialLinks from './SocialLinks'
import LanyardCard from './LanyardCard'
import FloatingShapes from './FloatingShapes'
import cvFile from '../assets/Anopa-Machipisa-CV.pdf'
import './Hero.css'

const roles = [
    'Data Science Enthusiast',
    'Software Developer',
    'AI & Machine Learning Enthusiast',
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
}

const letter = {
    hidden: { opacity: 0, y: '60%', rotateX: -70, filter: 'blur(8px)' },
    show: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
    },
}

function Line({ text, accent }) {
    return (
        <motion.span
            className={accent ? 'line accent' : 'line'}
            variants={container}
            initial="hidden"
            animate="show"
            aria-hidden="true"
        >
            {text.split('').map((ch, i) => (
                <motion.span key={i} variants={letter} className="ch">
                    {ch}
                </motion.span>
            ))}
        </motion.span>
    )
}

function useTypewriter(words) {
    const [text, setText] = useState('')

    useEffect(() => {
        let wordIndex = 0
        let charCount = 0
        let deleting = false
        let timer

        const tick = () => {
            const full = words[wordIndex]
            charCount += deleting ? -1 : 1
            setText(full.slice(0, charCount))

            let delay = deleting ? 35 : 80
            if (!deleting && charCount === full.length) {
                deleting = true
                delay = 1600
            } else if (deleting && charCount === 0) {
                deleting = false
                wordIndex = (wordIndex + 1) % words.length
                delay = 350
            }
            timer = setTimeout(tick, delay)
        }

        timer = setTimeout(tick, 1400)
        return () => clearTimeout(timer)
    }, [words])

    return text
}

const fade = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7 },
})

export default function Hero() {
    const typed = useTypewriter(roles)
    const heroRef = useRef(null)

    const handleMouseMove = (e) => {
        const rect = heroRef.current.getBoundingClientRect()
        heroRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        heroRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }

    return (
        <section id="home" className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
            <div className="aurora" aria-hidden="true">
                <i />
                <i />
                <i />
            </div>
            <div className="grid-bg" aria-hidden="true" />
            <div className="spotlight" aria-hidden="true" />
            <FloatingShapes />

            <div className="hero-grid">
                <div className="hero-inner">
                    <motion.div
                        className="status"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                    >
                        <span className="pulse" />
                        Welcome to my portfolio 👋 I&apos;m
                    </motion.div>

                    <h1 aria-label="Anopa Machipisa">
                        <Line text="Anopa" />
                        <Line text="Machipisa" accent />
                    </h1>

                    <motion.p className="job-title" {...fade(1.1)}>
                        Computer Science Student <span>|</span> Aspiring Data Scientist
                    </motion.p>

                    <motion.p
                        className="typed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                    >
                        <span className="glow-text">{typed}</span>
                        <span className="caret" />
                    </motion.p>

                    <motion.p className="intro" {...fade(1.6)}>
                        I&apos;m studying Data Science at Albukhary International University in Malaysia. I
                        enjoy turning data into insight and ideas into working software.
                    </motion.p>

                    <motion.div className="hero-buttons" {...fade(1.9)}>
                        <a href="#projects" className="btn primary">
                            Explore My Work <ArrowRight size={16} />
                        </a>

                        <a href={cvFile} download="Anopa-Machipisa-CV.pdf" className="btn ghost">
                            <Download size={16} /> Download CV
                        </a>
                    </motion.div>

                    <motion.div {...fade(2.1)}>
                        <SocialLinks />
                    </motion.div>
                </div>

                <LanyardCard />
            </div>
        </section>
    )
}