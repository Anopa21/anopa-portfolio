import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { MapPin } from 'lucide-react'
import './LanyardCard.css'
import photo from '../assets/Ano.jpg'

// Decorative QR-style graphic (not scannable). A real QR code comes in a later step.
const N = 21
function buildQR() {
    let seed = 7
    const rnd = () => {
        seed = (seed * 1103515245 + 12345) % 2147483648
        return seed / 2147483648
    }
    const cells = []
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const inFinder = (r < 8 && c < 8) || (r < 8 && c > N - 9) || (r > N - 9 && c < 8)
            if (!inFinder && rnd() > 0.52) cells.push([c, r])
        }
    }
    return cells
}
const QR_CELLS = buildQR()
const FINDERS = [
    [0, 0],
    [N - 7, 0],
    [0, N - 7],
]

function QrGraphic() {
    return (
        <svg viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges" className="qr" aria-hidden="true">
            <rect width={N} height={N} fill="#e6f6ff" />
            {QR_CELLS.map(([c, r]) => (
                <rect key={`${c}-${r}`} x={c} y={r} width="1" height="1" fill="#04101f" />
            ))}
            {FINDERS.map(([x, y]) => (
                <g key={`${x}-${y}`}>
                    <rect x={x} y={y} width="7" height="7" fill="#04101f" />
                    <rect x={x + 1} y={y + 1} width="5" height="5" fill="#e6f6ff" />
                    <rect x={x + 2} y={y + 2} width="3" height="3" fill="#04101f" />
                </g>
            ))}
        </svg>
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
                            <QrGraphic />
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