"use client"

interface LoveLetterScreenProps {
  onNavigate: (screen: string) => void
}

function CuddlingCats() {
  return (
    <svg viewBox="0 0 140 100" className="w-32 h-24 md:w-40 md:h-28" aria-hidden="true">
      {/* Cat 1 (left, darker) */}
      {/* Ears */}
      <polygon points="20,30 28,10 36,30" fill="#A0522D" stroke="#333" strokeWidth="1.5" />
      <polygon points="24,28 28,14 32,28" fill="#FFB6C1" />
      {/* Head */}
      <circle cx="32" cy="42" r="18" fill="#C08050" stroke="#333" strokeWidth="1.5" />
      {/* Eyes (closed/happy) */}
      <path d="M24 40 Q28 36 32 40" stroke="#333" strokeWidth="1.5" fill="none" />
      {/* Nose */}
      <circle cx="32" cy="45" r="1.5" fill="#FF8FA0" />
      {/* Blush */}
      <ellipse cx="22" cy="46" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.5" />
      {/* Body */}
      <ellipse cx="40" cy="75" rx="22" ry="16" fill="#C08050" stroke="#333" strokeWidth="1.5" />
      {/* Tail */}
      <path d="M18 75 Q5 60 10 50" stroke="#C08050" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Cat 2 (right, lighter, leaning) */}
      {/* Ears */}
      <polygon points="85,28 93,8 101,28" fill="#FFD6D9" stroke="#333" strokeWidth="1.5" />
      <polygon points="89,26 93,12 97,26" fill="#FFB6C1" />
      {/* Head */}
      <circle cx="93" cy="40" r="17" fill="#FFD6D9" stroke="#333" strokeWidth="1.5" />
      {/* Eyes (closed/happy) */}
      <path d="M86 38 Q90 34 94 38" stroke="#333" strokeWidth="1.5" fill="none" />
      {/* Nose */}
      <circle cx="93" cy="43" r="1.5" fill="#FF8FA0" />
      {/* Blush */}
      <ellipse cx="103" cy="44" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.5" />
      {/* Body */}
      <ellipse cx="85" cy="73" rx="22" ry="16" fill="#FFD6D9" stroke="#333" strokeWidth="1.5" />
      {/* Tail */}
      <path d="M107 73 Q120 58 115 48" stroke="#FFD6D9" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Heart between them */}
      <g transform="translate(55, 25) scale(0.5)">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E84057" />
      </g>
    </svg>
  )
}

export function LoveLetterScreen({ onNavigate }: LoveLetterScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative" data-screen="letter">
      {/* XOXO */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8">
        <span className="font-handwritten text-3xl md:text-4xl text-[#E84057] animate-bounce-gentle">XOXO</span>
      </div>

      {/* Letter container */}
      <div className="w-full max-w-lg mx-auto">
        <div
          className="rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(#FFF9E6 0px, transparent 0px), repeating-linear-gradient(transparent, transparent 27px, #C9D4E0 27px, #C9D4E0 28px)",
            backgroundColor: "#FFF9E6",
          }}
        >
          {/* Red margin line */}
          <div className="absolute left-12 md:left-14 top-0 bottom-0 w-[1px] bg-[#E84057]/30" />

          {/* Title */}
          <h1 className="font-handwritten text-3xl md:text-4xl text-foreground text-center mb-6 leading-relaxed">
            Words from my Heart
          </h1>

          {/* Letter body */}
          <div className="pl-8 md:pl-10">
            <p className="font-handwritten text-lg md:text-xl text-foreground/80 leading-[28px] md:leading-[28px]">
              To the love of my life, you make my life so meaningful and i am so lucky to have you as
              my valentine this year. I love you wholeheartedly and i can&apos;t wait to continue
              loving you for the rest of my life...
            </p>
          </div>

          {/* Signature */}
          <div className="mt-6 text-right pr-4">
            <span className="font-handwritten text-xl text-[#E84057]">With all my love</span>
          </div>
        </div>
      </div>

      {/* Cuddling cats */}
      <div className="absolute bottom-16 left-6 md:bottom-12 md:left-8 animate-float-reverse">
        <CuddlingCats />
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
