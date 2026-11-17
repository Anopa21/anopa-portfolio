import { motion } from 'framer-motion'
import './Section.css'

export default function Section({ id, eyebrow, title, children }) {
    return (
        <section id={id} className="section">
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <p className="eyebrow">{eyebrow}</p>
                <h2>{title}</h2>
                {children}
            </motion.div>
        </section>
    )
}