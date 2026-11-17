import { ArrowUp } from 'lucide-react'
import SocialLinks from './SocialLinks'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div>
                    <p className="footer-name">Anopa Machipisa</p>
                    <p className="footer-sub">
                        © {new Date().getFullYear()} · Built with React &amp; Vite
                    </p>
                </div>

                <SocialLinks />

                <a href="#home" className="to-top">
                    <ArrowUp size={16} /> Back to top
                </a>
            </div>
        </footer>
    )
}