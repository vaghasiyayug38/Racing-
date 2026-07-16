import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaBolt, FaCloudSun, FaCar, FaTrophy } from 'react-icons/fa'

const features = [
  { icon: FaBolt, title: 'Lightning Speed', desc: 'Experience 400+ km/h with hyper-realistic physics.' },
  { icon: FaCloudSun, title: 'Dynamic Weather', desc: 'Race through rain, snow, and neon nights.' },
  { icon: FaCar, title: '200+ Licensed Cars', desc: 'From classics to hypercars, fully customizable.' },
  { icon: FaTrophy, title: 'Esports Ready', desc: 'Compete in global tournaments for huge prizes.' },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-24 px-6 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-orbitron font-black text-center mb-16"
        >
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">UNMATCHED FEATURES</span>
        </motion.h2>
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass p-8 rounded-2xl hover:border-neon-blue/30 transition-all group"
            >
              <f.icon className="text-5xl text-neon-blue mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-white/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
