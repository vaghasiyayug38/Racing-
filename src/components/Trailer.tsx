export default function Trailer() {
  return (
    <section id="trailer" className="py-24 px-6 lg:px-16 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-orbitron font-black mb-12">
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">WATCH TRAILER</span>
        </h2>
        <div className="relative w-full overflow-hidden rounded-2xl glass">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&modestbranding=1&rel=0"
            title="Game Trailer"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </section>
  )
}
