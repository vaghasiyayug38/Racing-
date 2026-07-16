import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

const faqs = [
  { q: 'When is the release date?', a: 'Early access starts Q4 2025.' },
  { q: 'Which platforms?', a: 'PC, PS5, Xbox Series X|S.' },
  { q: 'Is there crossplay?', a: 'Yes, full cross-platform multiplayer.' },
  { q: 'Can I customize my car?', a: 'Absolutely, with thousands of parts.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6 lg:px-16 relative z-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-orbitron font-black text-center mb-16">
          <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">FAQ</span>
        </h2>
        {faqs.map((faq, i) => (
          <div key={i} className="mb-4 glass rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center p-6 text-left"
            >
              <span className="text-lg font-semibold">{faq.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <FaChevronDown />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-white/70"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
