import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, Copy, Check, AlertCircle, Info } from 'lucide-react'
import Section from './Section'
import './AIShowcase.css'

// CONNECT THE AI SERVICE HERE (next step in the chat).
// Put the address of your backend between the quotes, e.g. '/api/generate'.
// The backend must accept POST { topic, tone } and reply with { article: "text" }.
// While this is empty, the tool does NOT generate anything.
const AI_ENDPOINT = ''

const examples = [
    'How decision trees work',
    'Why data cleaning matters',
    'What overfitting means in machine learning',
]

const tones = ['Informative', 'Beginner-friendly', 'Professional']

// Turns plain text into paragraphs and simple headings (no HTML is ever injected).
function Article({ text }) {
    const blocks = text
        .split(/\n{2,}/)
        .map((b) => b.trim())
        .filter(Boolean)

    return blocks.map((b, i) => {
        if (b.startsWith('## ')) return <h4 key={i}>{b.slice(3)}</h4>
        if (b.startsWith('# ')) return <h3 key={i}>{b.slice(2)}</h3>
        return <p key={i}>{b}</p>
    })
}

export default function AIShowcase() {
    const [topic, setTopic] = useState('')
    const [tone, setTone] = useState(tones[0])
    const [loading, setLoading] = useState(false)
    const [article, setArticle] = useState('')
    const [status, setStatus] = useState({ type: 'idle', text: '' })
    const [copied, setCopied] = useState(false)

    const generate = async (e) => {
        e.preventDefault()
        const clean = topic.trim()

        if (clean.length < 3) {
            setStatus({ type: 'error', text: 'Please enter a topic (at least 3 characters).' })
            return
        }

        setArticle('')
        setCopied(false)

        if (!AI_ENDPOINT) {
            setStatus({
                type: 'info',
                text: 'The AI service is not connected yet, so no article was generated. The interface is ready. It needs a backend to keep the API key secret.',
            })
            return
        }

        setLoading(true)
        setStatus({ type: 'idle', text: '' })

        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 60000)

        try {
            const res = await fetch(AI_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: clean, tone }),
                signal: controller.signal,
            })
            if (!res.ok) throw new Error('Request failed')
            const data = await res.json()
            if (!data.article) throw new Error('Empty response')
            setArticle(String(data.article))
        } catch (err) {
            setStatus({
                type: 'error',
                text:
                    err.name === 'AbortError'
                        ? 'This is taking too long. Please try again.'
                        : 'Sorry, the article could not be generated. Please try again in a moment.',
            })
        } finally {
            clearTimeout(timer)
            setLoading(false)
        }
    }

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(article)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            setStatus({ type: 'error', text: 'Could not copy automatically. Select the text and copy it.' })
        }
    }

    const StatusIcon = status.type === 'error' ? AlertCircle : Info

    return (
        <Section id="ai-lab" eyebrow="08 / AI Lab" title="AI article generator">
            <p className="ai-intro">
                Type a topic and the tool drafts a short article about it. It needs an AI service
                connected through a backend, so until that is set up it will tell you clearly instead of
                pretending.
            </p>

            <div className="glass-card ai-card">
                <form onSubmit={generate} noValidate className="ai-form">
                    <div className="ai-row">
                        <div className="ai-field grow">
                            <label htmlFor="ai-topic">Article topic</label>
                            <input
                                id="ai-topic"
                                type="text"
                                maxLength={120}
                                placeholder="e.g. How decision trees work"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>

                        <div className="ai-field">
                            <label htmlFor="ai-tone">Tone</label>
                            <select id="ai-tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                                {tones.map((t) => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="ai-examples">
                        <span>Try:</span>
                        {examples.map((ex) => (
                            <button type="button" key={ex} onClick={() => setTopic(ex)}>
                                {ex}
                            </button>
                        ))}
                    </div>

                    <button className="ai-generate" type="submit" disabled={loading}>
                        <Sparkles size={18} /> {loading ? 'Generating…' : 'Generate article'}
                    </button>
                </form>

                <div className="ai-output" aria-live="polite">
                    {loading && (
                        <div className="ai-loading" role="status">
                            <p>
                                Writing your article<span className="dots" />
                            </p>
                            <div className="skeleton">
                                <i style={{ width: '90%' }} />
                                <i style={{ width: '100%' }} />
                                <i style={{ width: '78%' }} />
                                <i style={{ width: '95%' }} />
                                <i style={{ width: '60%' }} />
                            </div>
                        </div>
                    )}

                    {!loading && status.text && (
                        <div className={`ai-status ${status.type}`} role="status">
                            <StatusIcon size={18} />
                            <span>{status.text}</span>
                        </div>
                    )}

                    <AnimatePresence>
                        {!loading && article && (
                            <motion.div
                                className="ai-article"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="ai-article-top">
                                    <span>AI-generated draft. Check facts before using it.</span>
                                    <button type="button" onClick={copy}>
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                                <Article text={article} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!loading && !article && !status.text && (
                        <p className="ai-placeholder">Your article will appear here.</p>
                    )}
                </div>
            </div>
        </Section>
    )
}