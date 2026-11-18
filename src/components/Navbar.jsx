import { useEffect, useState } from 'react'
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
    ['ai-lab', 'AI Lab'],
    ['contact', 'Contact'],
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('home')
    const [scrolled, setScrolled] = useState(false)

    // Highlight the link for the section currently on screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id)
                })
            },
            { rootMargin: '-45% 0px -50% 0px' }
        )
        links.forEach(([id]) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    // Slightly stronger bar once the page has scrolled
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close the menu with the Escape key
    useEffect(() => {
        if (!open) return undefined
        const onKey = (e) => e.key === 'Escape' && setOpen(false)
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open])

    return (
        <header className={scrolled ? 'nav scrolled' : 'nav'}>
            <a href="#home" className="logo" onClick={() => setOpen(false)}>
                Anopa<span>.dev</span>
            </a>

            <nav id="site-links" className={open ? 'links open' : 'links'} aria-label="Main">
                {links.map(([id, label]) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className={active === id ? 'active' : ''}
                        aria-current={active === id ? 'true' : undefined}
                        onClick={() => setOpen(false)}
                    >
                        {label}
                    </a>
                ))}
            </nav>

            <button
                className="burger"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="site-links"
                onClick={() => setOpen(!open)}
            >
                {open ? <X size={22} /> : <Menu size={22} />}
            </button>
        </header>
    )
}