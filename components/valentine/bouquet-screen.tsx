"use client"

import { useState } from "react"

interface BouquetScreenProps {
  onNavigate: (screen: string) => void
}

function RoseBouquet() {
  return (
    <svg viewBox="0 0 200 260" className="w-48 h-60 md:w-56 md:h-72" aria-label="A bouquet of red roses wrapped in white paper">
      {/* Wrapping paper */}
      <path d="M50 130 L100 250 L150 130" fill="#F5F0E8" stroke="#333" strokeWidth="2" />
      <path d="M50 130 L100 250 L150 130" fill="none" stroke="#D4C9B8" strokeWidth="1" strokeDasharray="4 4" />
      {/* Ribbon */}
      <path d="M85 180 Q100 190 115 180" stroke="#E84057" strokeWidth="3" fill="none" />
      <circle cx="100" cy="178" r="5" fill="#E84057" />
      {/* Stems */}
      <line x1="70" y1="130" x2="80" y2="80" stroke="#2D5A27" strokeWidth="3" />
      <line x1="100" y1="130" x2="100" y2="60" stroke="#2D5A27" strokeWidth="3" />
      <line x1="130" y1="130" x2="120" y2="75" stroke="#2D5A27" strokeWidth="3" />
      <line x1="85" y1="120" x2="65" y2="70" stroke="#2D5A27" strokeWidth="3" />
      <line x1="115" y1="120" x2="135" y2="70" stroke="#2D5A27" strokeWidth="3" />
      {/* Leaves */}
      <ellipse cx="75" cy="110" rx="8" ry="4" fill="#3A7D32" transform="rotate(-20, 75, 110)" />
      <ellipse cx="125" cy="105" rx="8" ry="4" fill="#3A7D32" transform="rotate(20, 125, 105)" />
      <ellipse cx="90" cy="100" rx="7" ry="3.5" fill="#4A8D42" transform="rotate(-30, 90, 100)" />
      {/* Roses */}
      <circle cx="80" cy="75" r="18" fill="#C9303E" />
      <circle cx="80" cy="75" r="12" fill="#E84057" />
      <circle cx="80" cy="75" r="6" fill="#D43A4B" />
      <circle cx="100" cy="55" r="20" fill="#C9303E" />
      <circle cx="100" cy="55" r="14" fill="#E84057" />
      <circle cx="100" cy="55" r="7" fill="#D43A4B" />
      <circle cx="120" cy="70" r="17" fill="#C9303E" />
      <circle cx="120" cy="70" r="11" fill="#E84057" />
      <circle cx="120" cy="70" r="5.5" fill="#D43A4B" />
      <circle cx="65" cy="65" r="15" fill="#C9303E" />
      <circle cx="65" cy="65" r="10" fill="#E84057" />
      <circle cx="65" cy="65" r="5" fill="#D43A4B" />
      <circle cx="135" cy="65" r="15" fill="#C9303E" />
      <circle cx="135" cy="65" r="10" fill="#E84057" />
      <circle cx="135" cy="65" r="5" fill="#D43A4B" />
      {/* Baby breath */}
      <circle cx="55" cy="55" r="3" fill="#fff" opacity="0.8" />
      <circle cx="60" cy="48" r="2.5" fill="#fff" opacity="0.8" />
      <circle cx="145" cy="55" r="3" fill="#fff" opacity="0.8" />
      <circle cx="140" cy="48" r="2.5" fill="#fff" opacity="0.8" />
      <circle cx="90" cy="42" r="2" fill="#fff" opacity="0.8" />
      <circle cx="110" cy="44" r="2" fill="#fff" opacity="0.8" />
    </svg>
  )
}

const messages = [
  "I will always love you no matter what",
  "You are the best part of my life",
  "You will forever be my only option",
  "I can't imagine a life without you in it",
]


interface FlowerProps {
  id: number
  left: number
  delay: number
  duration: number
}

export function BouquetScreen({ onNavigate }: BouquetScreenProps) {
  const [flowers, setFlowers] = useState<FlowerProps[]>([])

  const handleBouquetClick = () => {
    const newFlowers = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100, // random position 0-100%
      delay: Math.random() * 0.5, // random delay
      duration: 3 + Math.random() * 2, // random duration 3-5s
    }))
    setFlowers((prev) => [...prev, ...newFlowers])

    // Cleanup flowers after animation
    setTimeout(() => {
      setFlowers((prev) => prev.filter((f) => !newFlowers.includes(f)))
    }, 5000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden" data-screen="bouquet">
      {/* Falling flowers */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute top-0 pointer-events-none animate-fall"
          style={{
            left: `${flower.left}%`,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E84057" fillOpacity="0.8"/>
          </svg>
        </div>
      ))}

      <h1 className="font-handwritten text-3xl md:text-4xl text-foreground text-center mb-8 text-balance">
        A bouquet, just for you
      </h1>

      {/* Bouquet with surrounding messages */}
      <div className="relative w-full max-w-lg flex items-center justify-center py-8">
        {/* Top-left message */}
        <div className="absolute top-0 left-0 md:left-4 max-w-[140px] md:max-w-[160px] animate-fade-slide-in" style={{ animationDelay: "0.2s" }}>
          <div className="animate-drift" style={{ animationDelay: "0s" }}>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-foreground/10 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-white/95 hover:to-[#E84057]/20 cursor-default">
              <p className="font-handwritten text-base md:text-lg text-foreground text-center leading-relaxed">{messages[0]}</p>
            </div>
          </div>
        </div>

        {/* Top-right message */}
        <div className="absolute top-0 right-0 md:right-4 max-w-[140px] md:max-w-[160px] animate-fade-slide-in" style={{ animationDelay: "0.4s" }}>
          <div className="animate-drift" style={{ animationDelay: "2s" }}>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-foreground/10 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-white/95 hover:to-[#E84057]/20 cursor-default">
              <p className="font-handwritten text-base md:text-lg text-foreground text-center leading-relaxed">{messages[1]}</p>
            </div>
          </div>
        </div>

        {/* Center bouquet */}
        <div className="animate-fade-slide-in cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95" onClick={handleBouquetClick}>
          <RoseBouquet />
        </div>

        {/* Bottom-left message */}
        <div className="absolute bottom-0 left-0 md:left-4 max-w-[140px] md:max-w-[160px] animate-fade-slide-in" style={{ animationDelay: "0.6s" }}>
          <div className="animate-drift" style={{ animationDelay: "4s" }}>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-foreground/10 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-white/95 hover:to-[#E84057]/20 cursor-default">
              <p className="font-handwritten text-base md:text-lg text-foreground text-center leading-relaxed">{messages[2]}</p>
            </div>
          </div>
        </div>

        {/* Bottom-right message */}
        <div className="absolute bottom-0 right-0 md:right-4 max-w-[140px] md:max-w-[160px] animate-fade-slide-in" style={{ animationDelay: "0.8s" }}>
           <div className="animate-drift" style={{ animationDelay: "1s" }}>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-foreground/10 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-br hover:from-white/95 hover:to-[#E84057]/20 cursor-default">
              <p className="font-handwritten text-base md:text-lg text-foreground text-center leading-relaxed">{messages[3]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow button */}
      {/* Back button */}
      <button
        onClick={() => onNavigate("giftSelection")}
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-foreground font-handwritten text-lg hover:text-[#E84057] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E84057] focus:ring-offset-2 rounded-full px-4 py-2 min-h-[44px] min-w-[44px] bg-card/50 backdrop-blur-sm border border-foreground/10"
        aria-label="Back to gifts"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Back</span>
      </button>
    </div>
  )
}

