"use client"

import { useState, useEffect } from "react"

interface GiftSelectionScreenProps {
  onNavigate: (screen: string) => void
}

function HeartMascot() {
  return (
    <svg viewBox="0 0 80 90" className="w-20 h-24 md:w-24 md:h-28" aria-hidden="true">
      {/* Heart body */}
      <path
        d="M40 80 C40 80 8 55 8 32 C8 18 18 8 30 8 C36 8 40 14 40 14 C40 14 44 8 50 8 C62 8 72 18 72 32 C72 55 40 80 40 80Z"
        fill="#E84057"
        stroke="#333"
        strokeWidth="2"
      />
      {/* Eyes */}
      <circle cx="30" cy="36" r="3" fill="#333" />
      <circle cx="50" cy="36" r="3" fill="#333" />
      <circle cx="31.5" cy="34.5" r="1" fill="#fff" />
      <circle cx="51.5" cy="34.5" r="1" fill="#fff" />
      {/* Blush */}
      <ellipse cx="22" cy="44" rx="5" ry="3" fill="#FFB6C1" opacity="0.6" />
      <ellipse cx="58" cy="44" rx="5" ry="3" fill="#FFB6C1" opacity="0.6" />
      {/* Smile */}
      <path d="M34 48 Q40 55 46 48" stroke="#333" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function GiftSelectionScreen({ onNavigate }: GiftSelectionScreenProps) {
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const gifts = [
    { label: "Gift 1", screen: "bouquet" },
    { label: "Gift 2", screen: "letter" },
    { label: "Gift 3", screen: "qrCode" },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative" data-screen="giftSelection">
      {/* Heart mascot */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 animate-float">
        <HeartMascot />
      </div>

      {/* Title */}
      <h1 className="font-handwritten text-4xl md:text-5xl lg:text-6xl text-foreground text-center mb-2 text-balance">
        Yay, you said yes!
      </h1>
      <p className="font-handwritten text-2xl md:text-3xl text-foreground/70 text-center mb-12">
        I made all these for you hehe
      </p>

      {/* Gift buttons */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {gifts.map((gift, index) => (
          <button
            key={gift.label}
            onClick={() => onNavigate(gift.screen)}
            className={`w-full px-8 py-4 rounded-full bg-card text-foreground border-2 border-foreground font-sans font-medium text-lg hover:bg-[#E84057] hover:text-card hover:border-[#E84057] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E84057] focus:ring-offset-2 min-h-[44px] ${
              showButtons ? "animate-pop-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
            aria-label={`Select ${gift.label}`}
          >
            {gift.label}
          </button>
        ))}
      </div>
    </div>
  )
}
