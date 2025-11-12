"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Eye, Type, Contrast } from "lucide-react"

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const applyFontSize = (value: number) => {
    setFontSize(value)
    document.documentElement.style.fontSize = `${value}%`
  }

  const toggleHighContrast = (enabled: boolean) => {
    setHighContrast(enabled)
    if (enabled) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  const toggleReducedMotion = (enabled: boolean) => {
    setReducedMotion(enabled)
    if (enabled) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <Card className="mb-2 p-4 w-80 bg-background/95 backdrop-blur-md border-primary/20">
          <h3 className="text-sm font-semibold mb-4">Accessibility Settings</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="font-size" className="text-sm flex items-center gap-2 mb-2">
                <Type className="h-4 w-4" />
                Font Size: {fontSize}%
              </Label>
              <Slider
                id="font-size"
                min={75}
                max={150}
                step={5}
                value={[fontSize]}
                onValueChange={(value) => applyFontSize(value[0])}
                aria-label="Adjust font size"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="text-sm flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                High Contrast
              </Label>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={toggleHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Reduce Motion
              </Label>
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={toggleReducedMotion}
                aria-label="Toggle reduced motion"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() => {
                applyFontSize(100)
                toggleHighContrast(false)
                toggleReducedMotion(false)
              }}
            >
              Reset to Defaults
            </Button>
          </div>
        </Card>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40"
        aria-label={isOpen ? "Close accessibility toolbar" : "Open accessibility toolbar"}
      >
        <Eye className="h-5 w-5" />
      </Button>
    </div>
  )
}
