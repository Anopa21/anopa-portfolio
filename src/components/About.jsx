import Section from './Section'
import photo from '../assets/Ano.png'
import './About.css'

const focusAreas = [
    'Data Science',
    'Software Development',
    'Artificial Intelligence',
    'Machine Learning',
    'Web Development',
]

// Taken from your certificates and projects. Add new steps at the bottom.
const journey = [
    { date: 'May 2026', title: 'Programming for Everybody (Getting Started with Python)', where: 'University of Michigan' },
    { date: 'May 2026', title: 'Machine Learning with Python', where: 'IBM' },
    { date: 'Jun 2026', title: 'Foundations of Cybersecurity', where: 'Google' },
    { date: 'Aug 2026', title: 'ESG Job Simulation', where: 'Tata (via Forage)' },
]

export default function About() {
    return (
        <Section id="about" eyebrow="01 / About" title="About me">
            <div className="about-top">
                <div className="about-photo">
                    <div className="about-frame">
                        <img src={photo} alt="Anopa Machipisa" draggable="false" />
                    </div>
                </div>

                <div className="about-text">
                    <p>
                        I am a Computer Science student specialising in Data Science at Albukhary
                        International University, Malaysia, with a strong interest in technology,
                        data-driven solutions, and software development.
                    </p>
                    <p>
                        I am passionate about exploring how technology and data can be used to solve
                        real-world problems. My interests include data science, machine learning,
                        artificial intelligence, and web development. Through my academic journey and
                        personal projects, I am continuously developing my technical skills,
                        strengthening my problem-solving abilities, and gaining practical experience in
                        building innovative digital solutions.
                    </p>
                    <p>
                        I am a curious, adaptable, and motivated individual who enjoys learning new
                        technologies, taking on challenges, and turning ideas into meaningful projects. I
                        look forward to gaining industry experience, collaborating with others, and
                        growing as a technology professional.
                    </p>

                    <h4 className="about-label">Interests</h4>
                    <div className="chips">
                        {focusAreas.map((area) => (
                            <span className="chip" key={area}>
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <h3 className="journey-title">My learning journey</h3>
            <ol className="journey">
                {journey.map((j) => (
                    <li key={j.title}>
                        <span className="j-date">{j.date}</span>
                        <span className="j-title">{j.title}</span>
                        <span className="j-where">{j.where}</span>
                    </li>
                ))}
            </ol>
        </Section>
    )
}