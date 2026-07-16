import { useRef, useState, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current.getBoundingClientRect();

    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses =
    "relative overflow-hidden font-orbitron font-bold uppercase tracking-wider transition-all duration-300 rounded-full border-2";

  const sizeClasses =
    size === "sm"
      ? "px-6 py-2 text-sm"
      : size === "lg"
      ? "px-10 py-4 text-lg"
      : "px-8 py-3";

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-neon-blue to-neon-pink text-black border-transparent shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:shadow-[0_0_30px_rgba(0,242,255,0.8)]"
      : "border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 backdrop-blur-md";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}>
      <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity rounded-full pointer-events-none"></span>

      <span className="relative z-10">{children}</span>

      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-blue via-neon-pink to-neon-purple opacity-40 blur-lg animate-gradient-x bg-300% pointer-events-none"></span>
    </motion.button>
  );
  }
