import { GraduationCap, MapPin, Flag } from 'lucide-react'
import Section from './Section'
import './Education.css'

const coursework = [
    'Data Mining and Analytics',
    'Database Management Systems',
    'Artificial Intelligence',
    'Data Structures and Algorithms',
    'Object-Oriented Programming',
    'Software Engineering',
]

export default function Education() {
    return (
        <Section id="education" eyebrow="02 / Education" title="Education">
            <ol className="edu-timeline">
                <li className="edu-item">
                    <span className="edu-dot">
                        <GraduationCap size={16} />
                    </span>

                    <div className="glass-card edu-card">
                        <span className="edu-date">2024 – Present</span>
                        <h3>Bachelor of Computer Science (Honours)</h3>
                        <p className="edu-spec">Specialisation: Data Science</p>
                        <p className="edu-school">Albukhary International University (AIU)</p>
                        <p className="edu-loc">
                            <MapPin size={15} /> Alor Setar, Kedah, Malaysia · Undergraduate
                        </p>

                        <p className="edu-desc">
                            Currently pursuing a degree specialising in Data Science, developing knowledge
                            and practical skills in programming, data analysis, database management,
                            artificial intelligence and software development.
                        </p>

                        <h4>Relevant coursework</h4>
                        <div className="chips">
                            {coursework.map((c) => (
                                <span className="chip" key={c}>
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                </li>

                <li className="edu-item">
                    <span className="edu-dot end">
                        <Flag size={15} />
                    </span>
                    <div className="edu-end">
                        <span className="edu-date">2027</span>
                        <p>Expected completion</p>
                    </div>
                </li>
            </ol>
        </Section>
    )
}