"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mountain, RotateCcw, Play } from "lucide-react"

export function CostLandscapeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRotating, setIsRotating] = useState(false)
  const [rotation, setRotation] = useState({ x: 0.6, y: 0.8 })
  const animationRef = useRef<number>()

  // Cost function for VQE (simplified H2 molecule Hamiltonian)
  const costFunction = (theta: number, phi: number): number => {
    return (
      Math.cos(theta) +
      Math.sin(phi) +
      0.5 * Math.cos(2 * theta) +
      0.3 * Math.sin(2 * phi) +
      0.2 * Math.cos(theta + phi)
    )
  }

  // 3D to 2D projection
  const project3D = (
    x: number,
    y: number,
    z: number,
    rotX: number,
    rotY: number,
    scale: number,
    offsetX: number,
    offsetY: number,
  ) => {
    // Rotate around X axis
    const y1 = y * Math.cos(rotX) - z * Math.sin(rotX)
    const z1 = y * Math.sin(rotX) + z * Math.cos(rotX)

    // Rotate around Y axis
    const x1 = x * Math.cos(rotY) + z1 * Math.sin(rotY)
    const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY)

    // Project to 2D
    const perspective = 300 / (300 + z2)
    return {
      x: x1 * scale * perspective + offsetX,
      y: y1 * scale * perspective + offsetY,
      z: z2,
    }
  }

  const drawLandscape = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height)

    const resolution = 40
    const scale = 60
    const offsetX = width / 2
    const offsetY = height / 2

    // Generate landscape points
    const points: Array<{ x: number; y: number; z: number; cost: number }> = []

    for (let i = 0; i <= resolution; i++) {
      for (let j = 0; j <= resolution; j++) {
        const theta = (i / resolution) * Math.PI * 2
        const phi = (j / resolution) * Math.PI * 2
        const cost = costFunction(theta, phi)

        const x = (i - resolution / 2) * 0.3
        const y = (j - resolution / 2) * 0.3
        const z = cost * 2

        points.push({ x, y, z, cost })
      }
    }

    // Sort points by z-depth for proper rendering
    const projectedPoints = points.map((p) => ({
      ...p,
      projected: project3D(p.x, p.y, p.z, rotation.x, rotation.y, scale, offsetX, offsetY),
    }))

    projectedPoints.sort((a, b) => a.projected.z - b.projected.z)

    // Draw grid lines
    ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
    ctx.lineWidth = 1

    // Horizontal lines
    for (let i = 0; i <= resolution; i++) {
      ctx.beginPath()
      for (let j = 0; j <= resolution; j++) {
        const idx = i * (resolution + 1) + j
        const point = projectedPoints.find((p, index) => index === idx)
        if (point) {
          if (j === 0) {
            ctx.moveTo(point.projected.x, point.projected.y)
          } else {
            ctx.lineTo(point.projected.x, point.projected.y)
          }
        }
      }
      ctx.stroke()
    }

    // Vertical lines
    for (let j = 0; j <= resolution; j++) {
      ctx.beginPath()
      for (let i = 0; i <= resolution; i++) {
        const idx = i * (resolution + 1) + j
        const point = projectedPoints.find((p, index) => index === idx)
        if (point) {
          if (i === 0) {
            ctx.moveTo(point.projected.x, point.projected.y)
          } else {
            ctx.lineTo(point.projected.x, point.projected.y)
          }
        }
      }
      ctx.stroke()
    }

    // Draw colored surface
    projectedPoints.forEach((point) => {
      const normalizedCost = (point.cost + 2) / 4 // Normalize to 0-1
      const hue = 240 - normalizedCost * 120 // Blue to purple
      ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.6)`
      ctx.beginPath()
      ctx.arc(point.projected.x, point.projected.y, 2, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw axes labels
    ctx.fillStyle = "#e5e7eb"
    ctx.font = "12px monospace"
    ctx.fillText("θ", offsetX + 150, offsetY + 20)
    ctx.fillText("φ", offsetX - 160, offsetY + 20)
    ctx.fillText("E", offsetX - 20, offsetY - 150)
  }

  useEffect(() => {
    drawLandscape()
  }, [rotation])

  useEffect(() => {
    if (isRotating) {
      const animate = () => {
        setRotation((prev) => ({
          x: prev.x,
          y: prev.y + 0.01,
        }))
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isRotating])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1 && !isRotating) {
      setRotation((prev) => ({
        x: prev.x + e.movementY * 0.01,
        y: prev.y + e.movementX * 0.01,
      }))
    }
  }

  const resetView = () => {
    setRotation({ x: 0.6, y: 0.8 })
    setIsRotating(false)
  }

  return (
    <Card className="quantum-glow-purple">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mountain className="w-5 h-5 text-quantum-purple" />
              3D Cost Landscape
            </CardTitle>
            <CardDescription>Energy surface visualization in parameter space</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsRotating(!isRotating)}>
              <Play className="w-4 h-4 mr-2" />
              {isRotating ? "Stop" : "Auto-Rotate"}
            </Button>
            <Button size="sm" variant="outline" onClick={resetView}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-auto border border-border rounded-lg cursor-move bg-black"
            onMouseMove={handleMouseMove}
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4">
              <Badge variant="outline" className="font-mono">
                θ rotation: {rotation.x.toFixed(2)}
              </Badge>
              <Badge variant="outline" className="font-mono">
                φ rotation: {rotation.y.toFixed(2)}
              </Badge>
            </div>
            <p className="text-muted-foreground">Drag to rotate • Click auto-rotate for animation</p>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-card border border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-blue">2</div>
              <div className="text-xs text-muted-foreground">Parameters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-purple">1600</div>
              <div className="text-xs text-muted-foreground">Grid Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-cyan">3D</div>
              <div className="text-xs text-muted-foreground">Visualization</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
