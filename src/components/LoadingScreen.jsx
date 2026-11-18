import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './LoadingScreen.css'

const KEY = 'portfolio-loaded'

// Shows once per browser session, and never for people who prefer reduced motion.
function shouldShow() {
    try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
        return !sessionStorage.getItem(KEY)
    } catch {
        return true
    }
}

export default function LoadingScreen() {
    const [show, setShow] = useState(shouldShow)

    useEffect(() => {
        if (!show) return undefined
        document.body.style.overflow = 'hidden'
        const timer = setTimeout(() => {
            try {
                sessionStorage.setItem(KEY, '1')
            } catch {
                // ignore: the screen will simply show again next visit
            }
            setShow(false)
        }, 1100)
        return () => {
            clearTimeout(timer)
            document.body.style.overflow = ''
        }
    }, [show])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="loader"
                    role="status"
                    aria-label="Loading"
                    exit={{ opacity: 0, transition: { duration: 0.6 } }}
                >
                    <div className="loader-inner">
                        <p className="loader-logo">
                            Anopa<span>.dev</span>
                        </p>
                        <div className="loader-bar">
                            <i />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}