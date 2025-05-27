import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Missions from './pages/Missions'


function App() {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      const playAudio = () => {
        audioRef.current.play().catch(() => {
          console.log('Autoplay blocked — user interaction required.')
        })
      }

      // Try to play immediately
      playAudio()

      // Resume on user interaction (for blocked autoplay)
      const handleInteraction = () => {
        playAudio()
        window.removeEventListener('click', handleInteraction)
      }

      window.addEventListener('click', handleInteraction)
    }
  }, [])

  return (
    <>
      <audio ref={audioRef} src="/Mission Impossible Theme (Full Theme).mp3" loop hidden />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/missions" element={<Missions />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
