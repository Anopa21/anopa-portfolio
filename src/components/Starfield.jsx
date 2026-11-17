import { useEffect, useRef } from 'react'

export default function Starfield() {
    const ref = useRef(null)

    useEffect(() => {
        const canvas = ref.current
        const ctx = canvas.getContext('2d')
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let w, h, frame, stars = []

        const setup = () => {
            w = canvas.width = window.innerWidth
            h = canvas.height = window.innerHeight
            const count = Math.min(160, Math.floor((w * h) / 9000))
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.4 + 0.3,
                speed: Math.random() * 0.15 + 0.03,
                phase: Math.random() * 6.28,
                cyan: Math.random() < 0.25,
            }))
        }

        const draw = (t = 0) => {
            ctx.clearRect(0, 0, w, h)
            for (const s of stars) {
                const alpha = 0.35 + 0.35 * Math.sin(t / 900 + s.phase)
                ctx.fillStyle = s.cyan ? `rgba(34,211,238,${alpha})` : `rgba(147,197,253,${alpha})`
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r, 0, 6.28)
                ctx.fill()
                if (!reduceMotion) {
                    s.y -= s.speed
                    if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w }
                }
            }
            if (!reduceMotion) frame = requestAnimationFrame(draw)
        }

        setup()
        draw()
        window.addEventListener('resize', setup)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('resize', setup)
        }
    }, [])

    return (
        <canvas
            ref={ref}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />
    )
}