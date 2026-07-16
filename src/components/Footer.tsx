import { FaTwitter, FaDiscord, FaYoutube, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="py-12 px-6 lg:px-16 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/40 text-sm">&copy; 2025 Nitro Rush. All rights reserved.</p>
        <div className="flex gap-6 text-2xl text-white/60">
          <a href="#" aria-label="Twitter"><FaTwitter className="hover:text-neon-blue transition-colors" /></a>
          <a href="#" aria-label="Discord"><FaDiscord className="hover:text-neon-blue transition-colors" /></a>
          <a href="#" aria-label="YouTube"><FaYoutube className="hover:text-neon-blue transition-colors" /></a>
          <a href="#" aria-label="Instagram"><FaInstagram className="hover:text-neon-blue transition-colors" /></a>
        </div>
      </div>
    </footer>
  )
}
