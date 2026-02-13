"use client"

import { useState } from "react"

interface ProposalScreenProps {
  onNavigate: (screen: string) => void
}

function BunnyMascot() {
  return (
    <svg viewBox="0 0 120 140" className="w-28 h-32 md:w-36 md:h-40" aria-hidden="true">
      {/* Ears */}
      <ellipse cx="42" cy="30" rx="14" ry="35" fill="#FFD6D9" stroke="#333" strokeWidth="2" />
      <ellipse cx="42" cy="30" rx="8" ry="25" fill="#FFB6C1" />
      <ellipse cx="78" cy="30" rx="14" ry="35" fill="#FFD6D9" stroke="#333" strokeWidth="2" />
      <ellipse cx="78" cy="30" rx="8" ry="25" fill="#FFB6C1" />
      {/* Head */}
      <circle cx="60" cy="75" r="35" fill="#FFD6D9" stroke="#333" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="48" cy="70" r="4" fill="#333" />
      <circle cx="72" cy="70" r="4" fill="#333" />
      <circle cx="50" cy="68" r="1.5" fill="#fff" />
      <circle cx="74" cy="68" r="1.5" fill="#fff" />
      {/* Nose */}
      <ellipse cx="60" cy="80" rx="3" ry="2" fill="#FF8FA0" />
      {/* Mouth */}
      <path d="M55 84 Q60 90 65 84" stroke="#333" strokeWidth="1.5" fill="none" />
      {/* Cheeks */}
      <ellipse cx="40" cy="82" rx="6" ry="4" fill="#FFB6C1" opacity="0.5" />
      <ellipse cx="80" cy="82" rx="6" ry="4" fill="#FFB6C1" opacity="0.5" />
      {/* Body */}
      <ellipse cx="60" cy="120" rx="25" ry="18" fill="#FFD6D9" stroke="#333" strokeWidth="2" />
      {/* Heart */}
      <g transform="translate(52, 112) scale(0.6)">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E84057" />
      </g>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <div className="flex flex-col items-center bg-card rounded-lg shadow-md overflow-hidden border border-foreground/10 w-16 md:w-20">
      <div className="bg-[#E84057] w-full text-center py-1">
        <span className="text-card text-xs font-sans font-bold tracking-wider">FEB</span>
      </div>
      <div className="py-1.5 md:py-2">
        <span className="text-foreground text-xl md:text-2xl font-bold font-sans">14</span>
      </div>
    </div>
  )
}

export function ProposalScreen({ onNavigate }: ProposalScreenProps) {
  const [noCount, setNoCount] = useState(0)

  const handleNo = () => {
    setNoCount((c) => c + 1)
  }

  const noButtonScale = Math.max(0.5, 1 - noCount * 0.15)
  const yesButtonScale = 1 + noCount * 0.1

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative" data-screen="proposal">
      {/* Calendar icon */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8">
        <CalendarIcon />
      </div>

      {/* Mascot */}
      <div className="mb-6 animate-bounce-gentle">
        <BunnyMascot />
      </div>

      {/* Title */}
      <h1 className="font-handwritten text-4xl md:text-5xl lg:text-6xl text-foreground text-center mb-8 text-balance leading-relaxed">
        Hey there, Will you be my Valentine?
      </h1>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={() => onNavigate("giftSelection")}
          className="px-8 py-3 rounded-full bg-card text-foreground border-2 border-foreground font-sans font-medium text-base hover:bg-[#E84057] hover:text-card hover:border-[#E84057] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E84057] focus:ring-offset-2 min-w-[180px] min-h-[44px]"
          style={{ transform: `scale(${yesButtonScale})` }}
          aria-label="Accept Valentine proposal"
        >
          YES OF COURSE
        </button>
        <button
          onClick={handleNo}
          className="px-8 py-3 rounded-full bg-card text-foreground border-2 border-foreground font-sans font-medium text-base hover:bg-foreground/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 min-w-[180px] min-h-[44px]"
          style={{ transform: `scale(${noButtonScale})` }}
          aria-label="Decline Valentine proposal"
        >
          {noCount === 0
            ? "NO THANK YOU"
            : noCount === 1
              ? "Are you sure?"
              : noCount === 2
                ? "Really sure?"
                : noCount === 3
                  ? "Think again!"
                  : "Pls say yes!"}
        </button>
      </div>
    </div>
  )
}
