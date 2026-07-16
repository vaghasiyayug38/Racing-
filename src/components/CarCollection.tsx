import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cars = [
  { name: 'Apex V12', img: 'https://picsum.photos/seed/car1/400/250' },
  { name: 'Phantom GT', img: 'https://picsum.photos/seed/car2/400/250' },
  { name: 'Nitro X', img: 'https://picsum.photos/seed/car3/400/250' },
  { name: 'Venom S', img: 'https://picsum.photos/seed/car4/400/250' },
]

export default function CarCollection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="cars" className="py-24 px-6 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-orbitron font-black text-center mb-16">
          <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">CAR COLLECTION</span>
        </h2>
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cars.map((car, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="overflow-hidden">
                <img src={car.img} alt={car.name} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold">{car.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    )
}
