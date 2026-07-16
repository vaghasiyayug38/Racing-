import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGamepad, FaBars, FaTimes } from "react-icons/fa";
import MagneticButton from "./ui/MagneticButton";

const navItems = [
  "Home",
  "Cars",
  "Garage",
  "News",
  "Download",
  "Community",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={fixed top-0 left-0 right-0 z-40 px-6 lg:px-12 py-4 transition-all duration-300 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <FaGamepad className="text-3xl text-cyan-400" />
          <span className="text-2xl font-bold text-white">
            NITRO RUSH
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={#${item.toLowerCase()}}
              className="text-white/70 hover:text-cyan-400 transition-colors duration-300"
            >
              {item}
            </a>
          ))}

          <MagneticButton variant="outline" size="sm">
            Login
          </MagneticButton>
        </div>

        <button
          type="button"
          className="md:hidden text-white text-3xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={#${item.toLowerCase()}}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-cyan-400 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}

              <MagneticButton variant="outline" size="sm">
                Login
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
