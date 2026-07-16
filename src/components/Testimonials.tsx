import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const reviews = [
  { name: 'Alex R.', text: 'Best racing game I’ve ever played. The graphics are insane!' },
  { name: 'Jordan M.', text: 'Feels like a next-gen experience. The drift mechanics are perfect.' },
  { name: 'Sam K.', text: 'Competitive multiplayer is addicting. Highly recommend.' },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="community" className="py-24 px-6 lg:px-16 bg-black/20 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-16">
          <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">PLAYER REVIEWS</span>
        </h2>
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              className="glass p-8 rounded-2xl"
            >
              <p className="text-lg italic text-white/80 mb-4">“{r.text}”</p>
              <p className="font-bold text-neon-blue">— {r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    )
}
