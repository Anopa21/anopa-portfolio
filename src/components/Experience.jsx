import { Briefcase } from 'lucide-react'
import Section from './Section'
import './Experience.css'

// Newest first. To add another, copy a block and edit it.
// "period" is optional: leave it as '' to hide the date.
const experience = [
    {
        role: 'Member',
        org: '3ZERO Club, Albukhary International University',
        period: '',
        points: [
            'Participate in a university student club focused on the 3ZERO vision: Zero Poverty, Zero Unemployment and Zero Net Carbon Emissions.',
        ],
    },
]

export default function Experience() {
    return (
        <Section id="experience" eyebrow="03 / Experience" title="Experience">
            {experience.length === 0 ? (
                <div className="glass-card exp-empty">
                    <Briefcase className="exp-empty-icon" size={30} />
                    <div>
                        <h3>
                            <span className="ph">Add your first role here</span>
                        </h3>
                    </div>
                </div>
            ) : (
                <ol className="exp-timeline">
                    {experience.map((e) => (
                        <li className="exp-item" key={`${e.role}-${e.org}`}>
                            <span className="exp-dot">
                                <Briefcase size={15} />
                            </span>
                            <div className="glass-card">
                                <span className="exp-date">{e.period || 'Leadership & activities'}</span>
                                <h3>{e.role}</h3>
                                <p className="exp-org">{e.org}</p>
                                {e.points?.length > 0 && (
                                    <ul className="exp-points">
                                        {e.points.map((p) => (
                                            <li key={p}>{p}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            )}
        </Section>
    )
}