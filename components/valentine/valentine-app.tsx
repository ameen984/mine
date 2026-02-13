"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { DecorativeElements } from "./decorative-elements"
import { ProposalScreen } from "./proposal-screen"
import { GiftSelectionScreen } from "./gift-selection-screen"
import { BouquetScreen } from "./bouquet-screen"
import { LoveLetterScreen } from "./love-letter-screen"
import { QRCodeScreen } from "./qr-code-screen"

type ScreenType = "proposal" | "giftSelection" | "bouquet" | "letter" | "qrCode"

const allowedTransitions: Record<ScreenType, ScreenType[]> = {
  proposal: ["giftSelection"],
  giftSelection: ["bouquet", "letter", "qrCode"],
  bouquet: ["giftSelection"],
  letter: ["giftSelection"],
  qrCode: ["giftSelection", "proposal"],

}

export function ValentineApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("proposal")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayScreen, setDisplayScreen] = useState<ScreenType>("proposal")
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const navigateToScreen = useCallback(
    (targetScreen: string) => {
      const target = targetScreen as ScreenType

      // Validate transition
      if (!allowedTransitions[currentScreen]?.includes(target)) {
        console.warn(`Invalid transition from ${currentScreen} to ${target}`)
        return
      }

      if (isTransitioning) {
        console.warn("Navigation blocked: transition in progress")
        return
      }

      // Start fade-out
      setIsTransitioning(true)

      // Clear any existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }

      // After fade-out, swap screen and fade-in
      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentScreen(target)
        setDisplayScreen(target)
        // Allow the fade-in animation to start
        requestAnimationFrame(() => {
          setIsTransitioning(false)
        })
      }, 400)
    },
    [currentScreen, isTransitioning]
  )



  // Audio ref and state
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const BASE_VOLUME = 0.1

  const fadeAudio = (targetVolume: number, duration: number, onComplete?: () => void) => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)

    const stepTime = 50
    const steps = duration / stepTime
    const volumeStep = (targetVolume - audio.volume) / steps

    fadeIntervalRef.current = setInterval(() => {
      let newVolume = audio.volume + volumeStep
      
      // Clamp volume
      if (volumeStep > 0 && newVolume >= targetVolume) newVolume = targetVolume
      if (volumeStep < 0 && newVolume <= targetVolume) newVolume = targetVolume
      
      // Ensure bounds
      newVolume = Math.max(0, Math.min(1, newVolume))

      audio.volume = newVolume

      if ((volumeStep > 0 && newVolume >= targetVolume) || 
          (volumeStep < 0 && newVolume <= targetVolume) ||
          newVolume === targetVolume) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        if (onComplete) onComplete()
      }
    }, stepTime)
  }

  // Handle autoplay and user interaction
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set initial properties
    audio.volume = BASE_VOLUME

    // Attempt autoplay
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (err) {
        console.log("Autoplay blocked, waiting for interaction", err)
        setIsPlaying(false)
      }
    }

    playAudio()

    // Global click handler to start audio if allowed and not playing
    const handleInteraction = () => {
      if (audio.paused && currentScreen !== "qrCode") {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Play failed", e))
      }
    }

    document.addEventListener("click", handleInteraction)
    return () => document.removeEventListener("click", handleInteraction)
  }, []) 

  // Handle screen changes for audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (currentScreen === "qrCode") {
      // Fade out and pause
      fadeAudio(0, 1500, () => {
        audio.pause()
        setIsPlaying(false)
      })
    } else {
      // If paused (and we are leaving QR code or just starting), fade in
      if (audio.paused || audio.volume < BASE_VOLUME) {
        audio.play()
          .then(() => {
            setIsPlaying(true)
            fadeAudio(BASE_VOLUME, 1500)
          })
          .catch(e => console.log("Resume failed", e))
      }
    }
  }, [currentScreen])


  const renderScreen = () => {
    switch (displayScreen) {
      case "proposal":
        return <ProposalScreen onNavigate={navigateToScreen} />
      case "giftSelection":
        return <GiftSelectionScreen onNavigate={navigateToScreen} />
      case "bouquet":
        return <BouquetScreen onNavigate={navigateToScreen} />
      case "letter":
        return <LoveLetterScreen onNavigate={navigateToScreen} />
      case "qrCode":
        return <QRCodeScreen onNavigate={navigateToScreen} />
      default:
        return <ProposalScreen onNavigate={navigateToScreen} />
    }
  }

  return (
    <div className="relative min-h-screen bg-[#FDE2E4] overflow-hidden">
      <DecorativeElements />
      <div
        className={`relative z-10 transition-all duration-500 ease-in-out ${
          isTransitioning
            ? "opacity-0 -translate-y-5"
            : "opacity-100 translate-y-0"
        }`}
        data-testid="current-screen"
        data-screen={currentScreen}
      >
        {renderScreen()}
      </div>
      
      <button
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.play()
              .then(() => setIsPlaying(true))
              .catch(e => console.error("Manual play failed", e))
          }
        }}
        className="fixed bottom-4 left-4 z-50 text-xs text-foreground/30 hover:text-foreground/80 transition-colors"
      >
        {isPlaying ? "Music Playing ♪" : "Play Music ▶"}
      </button>

      <audio ref={audioRef} src="/music.mp3" loop />
    </div>
  )
}

