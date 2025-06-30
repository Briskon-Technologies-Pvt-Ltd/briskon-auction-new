"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface FloatingElementProps {
  className?: string
  children?: React.ReactNode
  delay?: number
  duration?: number
}

export function FloatingElement({ className = "", children, delay = 0, duration = 6 }: FloatingElementProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`${className} transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        animation: isVisible ? `float ${duration}s ease-in-out infinite` : undefined,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface FloatingOrbProps {
  position: string
  size: string
  color: string
  delay: number
}

export const FloatingOrb = ({ position, size, color, delay }: FloatingOrbProps) => (
  <div
    className={`absolute ${position} ${size} ${color} rounded-full blur-xl animate-pulse`}
    style={{ animationDelay: `${delay}ms` }}
  />
)

export function Floating3DShape({
  className = "",
  shape = "cube",
  size = 60,
  color = "rgba(59, 130, 246, 0.1)",
}: {
  className?: string
  shape?: "cube" | "sphere" | "pyramid"
  size?: number
  color?: string
}) {
  const shapeStyles = {
    cube: {
      width: size,
      height: size,
      background: `linear-gradient(45deg, ${color}, transparent)`,
      transform: "rotateX(45deg) rotateY(45deg)",
    },
    sphere: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color}, transparent)`,
    },
    pyramid: {
      width: 0,
      height: 0,
      borderLeft: `${size / 2}px solid transparent`,
      borderRight: `${size / 2}px solid transparent`,
      borderBottom: `${size}px solid ${color}`,
    },
  }

  return <div className={`absolute animate-float transform-3d ${className}`} style={shapeStyles[shape]} />
}
