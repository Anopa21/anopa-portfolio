import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Eye, X } from 'lucide-react'
import Section from './Section'
import './Certificates.css'

// Images live in src/assets/certificates/. Write the file name in "image".
const imageFiles = import.meta.glob('../assets/certificates/*.{png,jpg,jpeg,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
})
const getImage = (name) => (name ? imageFiles[`../assets/certificates/${name}`] : undefined)

// Newest first. To add another, copy one block and edit it.
const items = [
    {
        title: 'ESG Job Simulation',
        issuer: 'Tata (via Forage)',
        date: 'August 2026',
        type: 'Job simulation',
        image: 'tata-esg.jpg',
        link: 'https://lnkd.in/p/gKdBzubv',
        linkLabel: 'View on LinkedIn',
    },
    {
        title: 'Foundations of Cybersecurity',
        issuer: 'Google (via Coursera)',
        date: 'June 2026',
        type: 'Course certificate',
        image: 'cybersecurity-google.jpg',
        link: 'https://coursera.org/verify/P3PUYJDRC7ST',
        linkLabel: 'Verify credential',
    },
    {
        title: 'Machine Learning with Python',
        issuer: 'IBM (via Coursera)',
        date: 'May 2026',
        type: 'Course certificate',
        image: 'ml-ibm.jpg',
        link: 'https://coursera.org/verify/AJ5QAS09DN1C',
        linkLabel: 'Verify credential',
    },
    {
        title: 'Programming for Everybody (Getting Started with Python)',
        issuer: 'University of Michigan (via Coursera)',
        date: 'May 2026',
        type: 'Course certificate',
        image: 'python-michigan.jpg',
        link: 'https://coursera.org/verify/VEM4KS3PUUFA',
        linkLabel: 'Verify credential',
    },
    {
        title: 'SBSS Subject Matter Expert Series 1: Portfolio Management',
        issuer: 'Albukhary International University',
        date: 'April 2026',
        type: 'Certificate of participation',
        image: 'aiu-sbss.jpg',
        link: '',
        linkLabel: '',
    },
]

function Lightbox({ item, onClose }) {
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

    return (
        <motion.div
            className="cert-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="cert-modal"
                role="dialog"
                aria-modal="true"
                aria-label={item.title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="cert-close" onClick={onClose} aria-label="Close" autoFocus>
                    <X size={20} />
                </button>
                <img src={getImage(item.image)} alt={`${item.title} certificate`} />
                <div className="cert-modal-foot">
                    <div>
                        <strong>{item.title}</strong>
                        <span>
                            {item.issuer} · {item.date}
                        </span>
                    </div>
                    {item.link && (
                        <a href={item.link} target="_blank" rel="noreferrer">
                            {item.linkLabel}
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Certificates() {
    const [selected, setSelected] = useState(null)

    return (
        <Section id="certificates" eyebrow="05 / Achievements" title="Certificates & achievements">
            <div className="cert-grid">
                {items.map((c) => {
                    const img = getImage(c.image)
                    return (
                        <div className="glass-card cert-card" key={c.title}>
                            {img ? (
                                <button
                                    className="cert-preview"
                                    onClick={() => setSelected(c)}
                                    aria-label={`View ${c.title} certificate`}
                                >
                                    <img src={img} alt="" loading="lazy" draggable="false" />
                                    <span className="cert-preview-hover">
                                        <Eye size={20} /> View certificate
                                    </span>
                                </button>
                            ) : (
                                <div className="cert-preview empty">
                                    <Award size={36} />
                                </div>
                            )}

                            <span className="chip">{c.type}</span>
                            <h3 className="cert-title">{c.title}</h3>
                            <p className="cert-meta">
                                {c.issuer} · {c.date}
                            </p>

                            <div className="cert-actions">
                                {img && (
                                    <button className="cert-view" onClick={() => setSelected(c)}>
                                        View certificate
                                    </button>
                                )}
                                {c.link && (
                                    <a className="cert-link" href={c.link} target="_blank" rel="noreferrer">
                                        {c.linkLabel}
                                    </a>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <AnimatePresence>
                {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </Section>
    )
}