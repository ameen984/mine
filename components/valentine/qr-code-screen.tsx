"use client"

import { useEffect, useRef, useState } from "react"
import QRCodeLib from "qrcode"

interface QRCodeScreenProps {
  onNavigate: (screen: string) => void
}

function RecordPlayer() {
  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28 md:w-36 md:h-36" aria-hidden="true">
      {/* Player base */}
      <rect x="10" y="20" width="100" height="80" rx="8" fill="#8B4513" stroke="#333" strokeWidth="2" />
      <rect x="14" y="24" width="92" height="72" rx="6" fill="#A0522D" />
      {/* Record */}
      <circle cx="55" cy="58" r="30" fill="#1a1a1a" />
      <circle cx="55" cy="58" r="25" fill="#222" />
      <circle cx="55" cy="58" r="20" fill="#1a1a1a" />
      <circle cx="55" cy="58" r="15" fill="#222" />
      <circle cx="55" cy="58" r="5" fill="#E84057" />
      <circle cx="55" cy="58" r="2" fill="#333" />
      {/* Grooves */}
      <circle cx="55" cy="58" r="22" fill="none" stroke="#333" strokeWidth="0.5" opacity="0.3" />
      <circle cx="55" cy="58" r="18" fill="none" stroke="#333" strokeWidth="0.5" opacity="0.3" />
      <circle cx="55" cy="58" r="12" fill="none" stroke="#333" strokeWidth="0.5" opacity="0.3" />
      <circle cx="55" cy="58" r="8" fill="none" stroke="#333" strokeWidth="0.5" opacity="0.3" />
      {/* Tone arm */}
      <line x1="90" y1="30" x2="65" y2="50" stroke="#C0C0C0" strokeWidth="2" />
      <circle cx="90" cy="30" r="4" fill="#C0C0C0" stroke="#333" strokeWidth="1" />
      <circle cx="65" cy="50" r="2" fill="#C0C0C0" />
      {/* Music notes */}
      <g fill="#E84057" opacity="0.8">
        <text x="95" y="50" fontSize="14" fontFamily="serif">&#9834;</text>
        <text x="100" y="38" fontSize="10" fontFamily="serif">&#9835;</text>
      </g>
    </svg>
  )
}

function QRCodeCanvas({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState(false)
  const isValidUrl = /^https?:\/\/.+/.test(url)

  useEffect(() => {
    if (!canvasRef.current || !isValidUrl) {
      if (isValidUrl && !canvasRef.current) {
         // Canvas not mounted yet, wait for next render where error is false
         setError(false)
      } else {
         setError(!isValidUrl)
      }
      return
    }

    QRCodeLib.toCanvas(canvasRef.current, url, {
      width: 256,
      margin: 2,
      color: { dark: "#000000", light: "#FFFFFF" },
    }).catch((err) => {
      console.error("QR Code generation failed", err)
      setError(true)
    })
  }, [url, isValidUrl, error])

  if (!isValidUrl || error) {
    return (
      <div className="w-[200px] h-[200px] flex items-center justify-center bg-card rounded-lg border border-foreground/10">
        <p className="font-sans text-sm text-foreground/60 text-center px-4">Invalid QR code URL</p>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="rounded-lg"
      style={{ width: 200, height: 200 }}
      aria-label={`QR code linking to ${url}`}
      role="img"
    />
  )
}

export function QRCodeScreen({ onNavigate }: QRCodeScreenProps) {
  const [songUrl, setSongUrl] = useState("")

  useEffect(() => {
    setSongUrl(window.location.origin + "/our-song")
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative" data-screen="qrCode">
      {/* Title */}
      <h1 className="font-handwritten text-4xl md:text-5xl text-foreground text-center mb-8 text-balance">
        A Song for you
      </h1>

      {/* QR Code */}
      <div className="bg-card p-6 rounded-2xl shadow-lg mb-6 animate-fade-slide-in border border-foreground/10">
        {songUrl ? <QRCodeCanvas url={songUrl} /> : (
            <div className="w-[200px] h-[200px] flex items-center justify-center">
                <p className="animate-pulse text-foreground/60">Loading...</p>
            </div>
        )}
      </div>

      <p className="font-sans text-sm text-foreground/60 mb-2 text-center">
        Scan the QR code to listen to our song
      </p>
      
      {/* Fallback Link for Localhost/Testing */}
      {songUrl && (
        <a 
          href={songUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#E84057] underline font-handwritten text-xl hover:text-foreground transition-colors mb-8"
        >
          Click here to open link directly
        </a>
      )}

      {/* Record player */}
      <div className="absolute bottom-20 left-6 md:bottom-16 md:left-8 animate-float">
        <RecordPlayer />
      </div>

      {/* Restart button */}
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

      {/* Restart button */}
      <button
        onClick={() => onNavigate("proposal")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-handwritten text-lg text-foreground/60 hover:text-[#E84057] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E84057] focus:ring-offset-2 rounded-full px-4 py-2 min-h-[44px]"
        aria-label="Restart the Valentine experience"
      >
        click to restart!
      </button>
    </div>
  )
}
