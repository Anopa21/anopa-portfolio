import Starfield from './components/Starfield'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Featured from './components/Featured'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Starfield />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Featured />
        <Contact />
      </main>
      <Footer />
    </>
  )
}