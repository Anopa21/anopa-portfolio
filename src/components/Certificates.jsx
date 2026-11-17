import { Award } from 'lucide-react'
import Section from './Section'
import './Certificates.css'

// Newest first. To add another, copy one block and edit it.
const items = [
    {
        title: 'ESG Job Simulation',
        issuer: 'Tata (via Forage)',
        date: 'August 2026',
        type: 'Job simulation',
        link: 'https://lnkd.in/p/gKdBzubv',
        linkLabel: 'View on LinkedIn',
    },
    {
        title: 'Foundations of Cybersecurity',
        issuer: 'Google (via Coursera)',
        date: 'June 2026',
        type: 'Course certificate',
        link: 'https://coursera.org/verify/P3PUYJDRC7ST',
        linkLabel: 'Verify credential',
    },
    {
        title: 'Machine Learning with Python',
        issuer: 'IBM (via Coursera)',
        date: 'May 2026',
        type: 'Course certificate',
        link: 'https://coursera.org/verify/AJ5QAS09DN1C',
        linkLabel: 'Verify credential',
    },
    {
        title: 'Programming for Everybody (Getting Started with Python)',
        issuer: 'University of Michigan (via Coursera)',
        date: 'May 2026',
        type: 'Course certificate',
        link: 'https://coursera.org/verify/VEM4KS3PUUFA',
        linkLabel: 'Verify credential',
    },
    {
        title: 'SBSS Subject Matter Expert Series 1: Portfolio Management',
        issuer: 'Albukhary International University',
        date: 'April 2026',
        type: 'Certificate of participation',
        link: '',
        linkLabel: '',
    },
]

export default function Certificates() {
    return (
        <Section id="certificates" eyebrow="05 / Achievements" title="Certificates & achievements">
            <div className="cert-grid">
                {items.map((c) => (
                    <div className="glass-card cert-card" key={c.title}>
                        <Award className="cert-icon" size={28} />
                        <div>
                            <span className="chip">{c.type}</span>
                            <h3 className="cert-title">{c.title}</h3>
                            <p className="cert-meta">
                                {c.issuer} · {c.date}
                            </p>
                            {c.link && (
                                <a className="cert-link" href={c.link} target="_blank" rel="noreferrer">
                                    {c.linkLabel}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}