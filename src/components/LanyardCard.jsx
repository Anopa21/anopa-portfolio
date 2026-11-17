import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { MapPin, X } from 'lucide-react'
import './LanyardCard.css'
import photo from '../assets/Ano.jpg'
import qrImage from '../assets/portfolio-qr.png'

function QrCode() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) return undefined
        const onKey = (e) => e.key === 'Escape' && setOpen(false)
        document.addEventListener('keydown', onKey)
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = previous
        }
    }, [open])

    return (
        <>
            <button
                type="button"
                className="qr-btn"
                onClick={() => setOpen(true)}
                aria-label="Enlarge QR code"
            >
                <img className="qr" src={qrImage} alt="QR code linking to this portfolio" draggable="false" />
                <span className="qr-hint">Tap to enlarge</span>
            </button>

            {createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="qr-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        >
                            <motion.div
                                className="qr-modal"
                                role="dialog"
                                aria-modal="true"
                                aria-label="QR code"
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="qr-close" onClick={() => setOpen(false)} aria-label="Close">
                                    <X size={20} />
                                </button>
                                <img src={qrImage} alt="Large QR code linking to this portfolio" />
                                <p>Scan with your phone camera</p>
                                <span>anopa-portfolio.vercel.app</span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export default function LanyardCard() {
    const swing = useMotionValue(0)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const sx = useSpring(mouseX, { stiffness: 40, damping: 14 })
    const sy = useSpring(mouseY, { stiffness: 40, damping: 14 })

    const rotate = useTransform([swing, sx], ([a, b]) => a + b * 6)
    const tiltY = useTransform(sx, (v) => v * 12)
    const tiltX = useTransform(sy, (v) => v * -9)
    const glare = useTransform(
        [sx, sy],
        ([x, y]) =>
            `radial-gradient(circle at ${50 + x * 40}% ${30 + y * 30}%, rgba(255,255,255,0.22), transparent 55%)`
    )

    useEffect(() => {
        const move = (e) => {
            if (e.pointerType !== 'mouse') return
            mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
            mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
        }
        const reset = () => {
            mouseX.set(0)
            mouseY.set(0)
        }
        window.addEventListener('pointermove', move)
        document.addEventListener('mouseleave', reset)
        return () => {
            window.removeEventListener('pointermove', move)
            document.removeEventListener('mouseleave', reset)
        }
    }, [mouseX, mouseY])

    const handlePan = (_, info) => {
        swing.set(Math.max(-25, Math.min(25, info.offset.x / 6)))
    }
    const handlePanEnd = () => {
        animate(swing, 0, { type: 'spring', stiffness: 70, damping: 4 })
    }

    return (
        <motion.div
            className="lanyard-col"
            style={{ rotate, transformOrigin: '50% 0', touchAction: 'pan-y' }}
            initial={{ y: -360 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 55, damping: 10, delay: 0.5 }}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
        >
            <div className="idle">
                <div className="strap">
                    <span>ANOPA MACHIPISA • DATA SCIENCE • ANOPA MACHIPISA • DATA SCIENCE •</span>
                </div>
                <div className="clip" />

                <motion.div
                    className="card3d"
                    style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
                >
                    <div className="idcard">
                        <div className="slot" />

                        <div className="id-head">
                            <span>STUDENT ID</span>
                            <i className="chip-icon" />
                        </div>

                        <div className="photo">
                            <img
                                src={photo}
                                alt="Anopa Machipisa"
                                draggable="false"
                                style={{
                                    objectPosition: '50% 0%',
                                    transform: 'scale(3.2)',
                                    transformOrigin: '62% 40%',
                                }}
                            />
                        </div>

                        <h3>Anopa Machipisa</h3>
                        <p className="role">Computer Science Student</p>
                        <p className="tag">Data Science</p>

                        <div className="id-foot">
                            <QrCode />
                            <div className="foot-text">
                                <p className="uni">Albukhary International University</p>
                                <p className="loc">
                                    <MapPin size={13} /> Malaysia
                                </p>
                            </div>
                        </div>

                        <motion.div className="glare" style={{ background: glare }} />
                        <div className="holo" />
                    </div>
                </motion.div>
            </div>

            <p className="drag-hint">Drag me sideways</p>
        </motion.div>
    )
}