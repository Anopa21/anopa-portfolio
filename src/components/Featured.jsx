import { HeartPulse, Check, Minus } from 'lucide-react'
import Section from './Section'
import './Featured.css'

const working = [
    'Case workflow, status changes and audit trail',
    'Demo login with clinician and viewer roles',
    'Per-case consent and preferences. Declined consent blocks message previews',
    'English and Arabic interface with right-to-left layout',
    'Rule-based child flags (demonstration logic)',
]

const notConnected = [
    'Adult risk model: not connected. The prediction endpoint refuses until a real model is connected',
    'Model metrics, fairness results and population statistics: shown as "Not available"',
    'Messaging: preview only, nothing is ever sent',
    'Arabic wording is a draft and needs native review',
]

export default function Featured() {
    return (
        <Section id="featured" eyebrow="06 / Featured project" title="CarePath AI">
            <div className="featured-grid">
                <div className="glass-card featured-main">
                    <HeartPulse className="featured-icon" size={34} />
                    <h3>Preventive-care navigation platform for Abu Dhabi</h3>
                    <p className="featured-desc">
                        A demonstration platform that connects health data, risk identification,
                        explanation, preventive pathway, engagement, follow-up and outcome measurement for
                        children (Well-Child Visit pathway) and adults (Comprehensive Screening pathway).
                    </p>
                    <p className="featured-note">
                        All case records are synthetic demo data. There are no real patients and no trained
                        model is connected. Where verified data does not exist, the app says "Not available"
                        instead of inventing numbers.
                    </p>
                    <div className="chips">
                        {['TypeScript', 'Python', 'SQLite'].map((s) => (
                            <span className="chip" key={s}>
                                {s}
                            </span>
                        ))}
                    </div>
                    <a
                        className="featured-link"
                        href="https://github.com/Anopa21/carepath-ai"
                        target="_blank"
                        rel="noreferrer"
                    >
                        View code on GitHub
                    </a>
                </div>

                <div className="featured-lists">
                    <div className="glass-card">
                        <h4>Working (synthetic data)</h4>
                        <ul className="status-list">
                            {working.map((item) => (
                                <li key={item}>
                                    <Check size={16} className="ok" /> <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass-card">
                        <h4>Not connected, and not claimed</h4>
                        <ul className="status-list">
                            {notConnected.map((item) => (
                                <li key={item}>
                                    <Minus size={16} className="no" /> <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    )
}