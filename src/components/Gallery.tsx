import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const images = [
  'https://picsum.photos/seed/g1/600/400',
  'https://picsum.photos/seed/g2/600/400',
  'https://picsum.photos/seed/g3/600/400',
  'https://picsum.photos/seed/g4/600/400',
  'https://picsum.photos/seed/g5/600/400',
  'https://picsum.photos/seed/g6/600/400',
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="gallery" className="py-24 px-6 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-orbitron font-black text-center mb-16">
          <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">GALLERY</span>
        </h2>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl glass"
            >
              <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
      )
}
