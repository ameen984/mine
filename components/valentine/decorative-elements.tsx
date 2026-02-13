"use client"

import { useMemo } from "react"

interface DecorativeElement {
  type: "heart" | "paperPlane"
  x: number
  y: number
  size: number
  animationDelay: number
  duration: number
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  )
}

function generateRandomElements(count: number): DecorativeElement[] {
  const elements: DecorativeElement[] = []
  for (let i = 0; i < count; i++) {
    elements.push({
      type: i % 3 === 0 ? "paperPlane" : "heart",
      x: (i * 17 + 5) % 90 + 3,
      y: (i * 23 + 10) % 85 + 5,
      size: 12 + (i % 4) * 6,
      animationDelay: (i * 0.7) % 5,
      duration: 5 + (i % 4) * 2,
    })
  }
  return elements
}

export function DecorativeElements() {
  const elements = useMemo(() => generateRandomElements(10), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute text-[#F4A0A8] opacity-30"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            animation: `${element.type === "heart" ? "float" : "drift"} ${element.duration}s ease-in-out infinite`,
            animationDelay: `${element.animationDelay}s`,
          }}
        >
          {element.type === "heart" ? (
            <HeartIcon className="w-full h-full" />
          ) : (
            <PaperPlaneIcon className="w-full h-full" />
          )}
        </div>
      ))}
    </div>
  )
}
