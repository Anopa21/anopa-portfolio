import './FloatingShapes.css'

// Decorative only. type: 'glyph' | 'ring' | 'square' | 'plus'
const shapes = [
    { type: 'glyph', text: '</>', left: '6%', top: '24%', dur: 9, delay: 0 },
    { type: 'glyph', text: '{ }', left: '44%', top: '12%', dur: 11, delay: -3 },
    { type: 'glyph', text: '01', left: '90%', top: '72%', dur: 10, delay: -5 },
    { type: 'glyph', text: 'Σ', left: '12%', top: '78%', dur: 12, delay: -2, hide: true },
    { type: 'glyph', text: 'π', left: '52%', top: '88%', dur: 9, delay: -6, hide: true },
    { type: 'ring', left: '30%', top: '8%', dur: 13, delay: -4 },
    { type: 'ring', left: '78%', top: '16%', dur: 10, delay: -1, hide: true },
    { type: 'square', left: '4%', top: '52%', dur: 12, delay: -7 },
    { type: 'square', left: '66%', top: '82%', dur: 14, delay: -2, hide: true },
    { type: 'plus', left: '38%', top: '70%', dur: 11, delay: -3 },
    { type: 'plus', left: '94%', top: '38%', dur: 9, delay: -5, hide: true },
]

export default function FloatingShapes() {
    return (
        <div className="floaters" aria-hidden="true">
            {shapes.map((s, i) => (
                <span
                    key={i}
                    className={`float ${s.type}${s.hide ? ' hide-sm' : ''}`}
                    style={{
                        left: s.left,
                        top: s.top,
                        animationDuration: `${s.dur}s`,
                        animationDelay: `${s.delay}s`,
                    }}
                >
                    {s.type === 'glyph' ? s.text : null}
                </span>
            ))}
        </div>
    )
}