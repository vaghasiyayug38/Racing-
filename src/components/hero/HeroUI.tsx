import { motion } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import { FaPlay } from 'react-icons/fa'

export default function HeroUI() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 lg:px-16 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="pointer-events-auto max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black leading-tight mb-6">
          <span className="bg-gradient-to-r from-neon-blue via-white to-neon-pink bg-clip-text text-transparent">
            AAA RACING<br />EXPERIENCE
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 font-light mb-12">
          Feel The Speed. Next Generation Graphics.
        </p>
        <div className="flex flex-wrap gap-6">
          <MagneticButton size="lg">
            Download Now
          </MagneticButton>
          <MagneticButton variant="outline" size="lg">
            <FaPlay className="mr-2 inline" /> Watch Trailer
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  )
}
