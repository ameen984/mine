"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface LyricLine {
  text: string
  time: number // seconds
}

const lyrics: LyricLine[] = [
  // Verse 1
  { time: 14.5, text: "Georgia, wrap me up in all your..." },
  { time: 19, text: "I want ya in my arms" },
  { time: 23.5, text: "Oh, let me hold ya" },
  { time: 28, text: "I'll never let you go again like I did" },
  { time: 33, text: "Oh, I used to say" },

  // Chorus 1
  { time: 37.5, text: "\"I would never fall in love again until I found her\"" },
  { time: 45.5, text: "I said, \"I would never fall, unless it's you I fall into\"" },
  { time: 53.5, text: "I was lost within the darkness, but then I found her" },
  { time: 61.5, text: "I found you" },

  // Verse 2
  { time: 69.5, text: "Georgia pulled me in" },
  { time: 73.5, text: "I asked to love her once again" },
  { time: 77.5, text: "You fell, I caught ya" },
  { time: 82.5, text: "I'll never let you go again like I did" },
  { time: 87.5, text: "Oh, I used to say" },

  // Chorus 2
  { time: 92.5, text: "\"I would never fall in love again until I found her\"" },
  { time: 100.5, text: "I said, \"I would never fall unless it's you I fall into\"" },
  { time: 108.5, text: "I was lost within the darkness, but then I found her" },
  { time: 116.5, text: "I found you" },
]

export default function OurSongPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(20).fill(5))
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const requestRef = useRef<number>(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)

  // Constant for look-ahead time (in seconds) to make lyrics feel more responsive
  const LOOK_AHEAD_OFFSET = 0.2

  // High-precision sync loop
  const animate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime
  
      // Sync Lyrics with look-ahead
      const syncTime = currentTime + LOOK_AHEAD_OFFSET
      const index = lyrics.findIndex((line, i) => {
        const nextLine = lyrics[i + 1]
        return syncTime >= line.time && (nextLine ? syncTime < nextLine.time : true)
      })

      if (index !== -1 && index !== currentLineIndex) {
        setCurrentLineIndex(index)
      }

      // Visualizer Logic
      if (analyserRef.current && isPlaying) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(dataArray)
        
        // Downsample to 20 bars
        const step = Math.floor(dataArray.length / 20)
        const newVisualizerData = []
        for (let i = 0; i < 20; i++) {
          const value = dataArray[i * step]
          // Normalize to percentage (roughly 5-40%)
          const height = Math.max(5, (value / 255) * 40) 
          newVisualizerData.push(height)
        }
        setVisualizerData(newVisualizerData)
      }
    }
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isPlaying, currentLineIndex])


  const togglePlay = async () => {
    if (!audioRef.current) return

    // Initialize AudioContext on first user interaction
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 64 // Small FFT size for fewer bars
      
      // Create source from the audio element
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)
    }

    // Resume context if suspended (browser policy)
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume()
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentLineIndex(-1)
  }
  
  // Framer Motion variants for typewriter
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.08, // Adjust speed of typing here
      },
    },
  }
  
  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.1 } // Smooth fade in for each letter
    },
  }

  return (
    <div className="min-h-screen bg-[#FDE2E4] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Visualizer Background */}
      <div className="absolute inset-0 flex items-end justify-center gap-1 opacity-20 pointer-events-none pb-20">
        {visualizerData.map((height, i) => (
          <motion.div
            key={i}
            className="w-1.5 md:w-2 bg-[#E84057] rounded-t-md"
            animate={{ height: `${height}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-2xl text-center">
        <h1 className="font-handwritten text-4xl md:text-5xl text-foreground mb-12">
          Our Special Song
        </h1>

        {/* Lyrics Display */}
        <div className="min-h-[160px] mb-8 flex items-center justify-center">
            {currentLineIndex !== -1 ? (
                <motion.p 
                    key={currentLineIndex} // Re-renders and restarts animation on line change
                    variants={sentenceVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-handwritten text-2xl md:text-3xl text-[#E84057] leading-relaxed relative min-h-[3rem] text-balance"
                >
                  {lyrics[currentLineIndex].text.split("").map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                  {/* Cursor */}
                  <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="ml-1 inline-block text-[#E84057]"
                  >
                    |
                  </motion.span>
                </motion.p>
            ) : (
                !isPlaying && (
                    <p className="font-handwritten text-xl text-foreground/50 absolute">
                    Press play to start...
                    </p>
                )
            )}
        </div>

        {/* Controls */}
        <button
          onClick={togglePlay}
          className="rounded-full bg-card px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all text-foreground font-handwritten text-xl border border-foreground/10"
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>

        {/* Native Audio Element */}
        <audio
            ref={audioRef}
            src="/our-song.mp3"
            onEnded={handleEnded}
            className="hidden"
            crossOrigin="anonymous" 
        />
      </div>
    </div>
  )
}
