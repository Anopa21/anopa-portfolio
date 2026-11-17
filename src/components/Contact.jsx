import { useState } from 'react'
import { Send, Copy, MapPin, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import Section from './Section'
import SocialLinks from './SocialLinks'
import './Contact.css'

const EMAIL = 'anopamachipisa93@gmail.com'

// CONNECT A REAL EMAIL SERVICE (see the steps I gave you in the chat):
// paste your form address between the quotes, e.g. 'https://formspree.io/f/abcdwxyz'
// While this is empty, the form does NOT send anything by itself.
const FORM_ENDPOINT = 'https://formspree.io/f/mrpqqooj'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
    const errors = {}
    if (!values.name.trim()) errors.name = 'Please enter your name.'
    else if (values.name.trim().length < 2) errors.name = 'Your name looks too short.'

    if (!values.email.trim()) errors.email = 'Please enter your email address.'
    else if (!emailPattern.test(values.email.trim()))
        errors.email = 'That email address does not look right.'

    if (!values.subject.trim()) errors.subject = 'Please add a subject.'

    if (!values.message.trim()) errors.message = 'Please write a message.'
    else if (values.message.trim().length < 10)
        errors.message = 'Your message is too short (at least 10 characters).'

    return errors
}

export default function Contact() {
    const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState({ type: 'idle', text: '' })

    const update = (field) => (e) => {
        const next = { ...values, [field]: e.target.value }
        setValues(next)
        if (errors[field]) setErrors({ ...errors, [field]: validate(next)[field] })
    }

    const blur = (field) => () => {
        const message = validate(values)[field]
        setErrors((prev) => ({ ...prev, [field]: message }))
    }

    const mailtoLink = () =>
        `mailto:${EMAIL}?subject=${encodeURIComponent(values.subject || 'Portfolio message')}&body=${encodeURIComponent(
            `${values.message}\n\nFrom: ${values.name} (${values.email})`
        )}`

    const handleSubmit = async (e) => {
        e.preventDefault()
        const found = validate(values)
        setErrors(found)
        if (Object.keys(found).length > 0) {
            setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' })
            return
        }

        // No email service connected yet: be honest and offer the email app instead.
        if (!FORM_ENDPOINT) {
            setStatus({
                type: 'info',
                text: 'This form is not connected to an email service yet, so nothing was sent. Use the button below to send your message from your email app instead.',
            })
            return
        }

        setStatus({ type: 'sending', text: 'Sending…' })
        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    name: values.name.trim(),
                    email: values.email.trim(),
                    subject: values.subject.trim(),
                    message: values.message.trim(),
                }),
            })
            if (!res.ok) throw new Error('Request failed')
            setStatus({ type: 'success', text: 'Thank you! Your message was sent. I will reply as soon as I can.' })
            setValues({ name: '', email: '', subject: '', message: '' })
            setErrors({})
        } catch {
            setStatus({
                type: 'error',
                text: `Sorry, your message could not be sent. Please try again, or email me directly at ${EMAIL}.`,
            })
        }
    }

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setStatus({ type: 'success', text: 'Email address copied.' })
        } catch {
            setStatus({ type: 'info', text: `Copy this address: ${EMAIL}` })
        }
    }

    const StatusIcon = { success: CheckCircle2, error: AlertCircle, info: Info }[status.type]

    const field = (name, label, props = {}) => (
        <div className={errors[name] ? 'field has-error' : 'field'}>
            <label htmlFor={`c-${name}`}>{label}</label>
            {name === 'message' ? (
                <textarea
                    id="c-message"
                    rows="5"
                    value={values.message}
                    onChange={update('message')}
                    onBlur={blur('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'e-message' : undefined}
                />
            ) : (
                <input
                    id={`c-${name}`}
                    value={values[name]}
                    onChange={update(name)}
                    onBlur={blur(name)}
                    aria-invalid={Boolean(errors[name])}
                    aria-describedby={errors[name] ? `e-${name}` : undefined}
                    {...props}
                />
            )}
            {errors[name] && (
                <span className="field-error" id={`e-${name}`}>
                    {errors[name]}
                </span>
            )}
        </div>
    )

    return (
        <Section id="contact" eyebrow="07 / Contact" title="Let's connect">
            <div className="contact-grid">
                <div className="contact-info">
                    <p className="contact-lead">
                        I&apos;m open to opportunities in data science, software development, artificial
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

                <form className="glass-card contact-form" onSubmit={handleSubmit} noValidate>
                    {field('name', 'Your name', { type: 'text', autoComplete: 'name' })}
                    {field('email', 'Your email', { type: 'email', autoComplete: 'email' })}
                    {field('subject', 'Subject', { type: 'text' })}
                    {field('message', 'Message')}

                    {/* Hidden spam trap: real visitors never see or fill this in. */}
                    <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="trap" aria-hidden="true" />

                    <button className="send-btn" type="submit" disabled={status.type === 'sending'}>
                        <Send size={16} /> {status.type === 'sending' ? 'Sending…' : 'Send message'}
                    </button>

                    <div className={`form-status ${status.type}`} role="status" aria-live="polite">
                        {status.text && (
                            <>
                                {StatusIcon && <StatusIcon size={18} />}
                                <span>{status.text}</span>
                            </>
                        )}
                    </div>

                    {status.type === 'info' && (
                        <a className="copy-btn" href={mailtoLink()}>
                            <Send size={16} /> Open in my email app
                        </a>
                    )}
                </form>
            </div>
        </Section>
    )
}