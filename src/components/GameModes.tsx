import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaFlagCheckered, FaGhost, FaUsers, FaStopwatch } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const modes = [
  { icon: FaFlagCheckered, title: 'Career', desc: 'Rise from street racer to legend.' },
  { icon: FaGhost, title: 'Time Attack', desc: 'Beat ghost cars from top players.' },
  { icon: FaUsers, title: 'Multiplayer', desc: 'Compete with up to 32 players.' },
  { icon: FaStopwatch, title: 'Drift Events', desc: 'Score points with style.' },
]

export default function GameModes() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
      gsap.fromTo('.mode-card', { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gamemodes" className="py-24 px-6 lg:px-16 bg-black/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-orbitron font-black text-center mb-16">
          <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">GAME MODES</span>
        </h2>
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modes.map((m, i) => (
            <div key={i} className="mode-card glass p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
              <m.icon className="text-4xl text-neon-pink mb-4" />
              <h3 className="text-xl font-bold mb-2">{m.title}</h3>
              <p className="text-white/50">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
