import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const links = [
    ['home', 'Home'],
    ['about', 'About'],
    ['education', 'Education'],
    ['experience', 'Experience'],
    ['skills', 'Skills'],
    ['projects', 'Projects'],
    ['certificates', 'Certificates'],
    ['featured', 'Featured'],
    ['contact', 'Contact'],
]
export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="nav">
            <a href="#home" className="logo" onClick={() => setOpen(false)}>
                Anopa<span>.dev</span>
            </a>

            <nav className={open ? 'links open' : 'links'}>
                {links.map(([id, label]) => (
                    <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                        {label}
                    </a>
                ))}
            </nav>

            <button
                className="burger"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                {open ? <X /> : <Menu />}
            </button>
        </header>
    )
}