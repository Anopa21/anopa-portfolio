import { useState } from 'react'
import { Send, Copy, MapPin } from 'lucide-react'
import Section from './Section'
import SocialLinks from './SocialLinks'
import './Contact.css'

const EMAIL = 'anopamachipisa93@gmail.com'

export default function Contact() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = encodeURIComponent(`Portfolio message from ${name}`)
        const body = encodeURIComponent(message)
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
        setStatus('Opening your email app. If nothing opens, use "Copy email" instead.')
    }

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setStatus('Email address copied.')
        } catch {
            setStatus(`Copy this address: ${EMAIL}`)
        }
    }

    return (
        <Section id="contact" eyebrow="07 / Contact" title="Let's connect">
            <div className="contact-grid">
                <div className="contact-info">
                    <p className="contact-lead">
                        I'm open to opportunities in data science, software development, artificial
                        intelligence and machine learning. Send me a message or find me online.
                    </p>

                    <p className="contact-line">
                        <MapPin size={16} /> Alor Setar, Kedah, Malaysia
                    </p>
                    <p className="contact-email">{EMAIL}</p>

                    <SocialLinks />

                    <button className="copy-btn" type="button" onClick={copyEmail}>
                        <Copy size={16} /> Copy email
                    </button>
                </div>

                <form className="glass-card contact-form" onSubmit={handleSubmit}>
                    <label>
                        Your name
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label>
                        Message
                        <textarea
                            required
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </label>

                    <button className="send-btn" type="submit">
                        <Send size={16} /> Send message
                    </button>

                    <p className="form-status" role="status">
                        {status}
                    </p>
                </form>
            </div>
        </Section>
    )
}