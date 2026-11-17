import { Briefcase } from 'lucide-react'
import Section from './Section'
import './Experience.css'

// ADD YOUR REAL EXPERIENCE HERE (newest first). Leave the list empty to show the placeholder.
// This can include internships, part-time jobs, volunteering, student society roles
// or competitions. Only add things you have really done.
//
// Example (copy, remove the // marks and edit):
// {
//   role: 'Role or position',
//   org: 'Organisation',
//   period: 'Jan 2026 – Present',
//   points: ['One thing you did or achieved', 'Another thing'],
// },
const experience = []

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
                        <p>
                            <span className="ph">
                                Internships, volunteering, student society roles or competitions. Add only what
                                is real.
                            </span>
                        </p>
                    </div>
                </div>
            ) : (
                <ol className="exp-timeline">
                    {experience.map((e) => (
                        <li className="exp-item" key={`${e.role}-${e.period}`}>
                            <span className="exp-dot">
                                <Briefcase size={15} />
                            </span>
                            <div className="glass-card">
                                <span className="exp-date">{e.period}</span>
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