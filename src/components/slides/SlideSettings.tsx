'use client'

import { Settings2, Palette, Layout, Download, Share2 } from 'lucide-react'
import type { SlideData, SlideTheme, SlideBackground, SlideLayout } from '@/types/slide'

interface SlideSettingsProps {
  slide: SlideData
  onUpdate: (slide: SlideData) => void
}

export function SlideSettings({ slide, onUpdate }: SlideSettingsProps) {
  const themes: { value: SlideTheme; label: string; preview: string }[] = [
    { value: 'knowit-blue', label: 'Knowit Blue', preview: 'bg-knowit-blue-500' },
    { value: 'knowit-purple', label: 'Knowit Purple', preview: 'bg-knowit-purple-500' },
    { value: 'knowit-peach', label: 'Knowit Peach', preview: 'bg-knowit-peach-500' },
    { value: 'minimal', label: 'Minimal', preview: 'bg-knowit-gray-400' },
  ]

  const backgrounds: { value: SlideBackground; label: string; preview: string }[] = [
    { value: 'gradient-knowit', label: 'Knowit Gradient', preview: 'bg-gradient-to-r from-knowit-blue-500 to-knowit-purple-500' },
    { value: 'gradient-knowit-peach', label: 'Peach Gradient', preview: 'bg-gradient-to-r from-knowit-peach-400 to-knowit-peach-600' },
    { value: 'white', label: 'White', preview: 'bg-white border border-knowit-gray-300' },
    { value: 'dark', label: 'Dark', preview: 'bg-knowit-gray-900' },
  ]

  const layouts: { value: SlideLayout; label: string; icon: string }[] = [
    { value: 'title-content', label: 'Title + Content', icon: '📝' },
    { value: 'title-subtitle-content', label: 'Title + Subtitle + Content', icon: '📄' },
    { value: 'image-content', label: 'Image + Content', icon: '🖼️' },
    { value: 'full-image', label: 'Full Image', icon: '🎨' },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="card-knowit p-4">
        <h3 className="font-semibold text-knowit-gray-900 mb-4 flex items-center gap-2">
          <Settings2 className="w-4 h-4" />
          Quick Actions
        </h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 bg-knowit-blue-50 text-knowit-blue-700 rounded-lg hover:bg-knowit-blue-100 transition-all">
            <Download className="w-4 h-4" />
            Export Slide
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-knowit-peach-50 text-knowit-peach-700 rounded-lg hover:bg-knowit-peach-100 transition-all">
            <Share2 className="w-4 h-4" />
            Share Slide
          </button>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="card-knowit p-4">
        <h3 className="font-semibold text-knowit-gray-900 mb-4 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Theme
        </h3>
        <div className="space-y-2">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => onUpdate({ ...slide, theme: theme.value })}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                slide.theme === theme.value
                  ? 'bg-knowit-blue-50 border-2 border-knowit-blue-500'
                  : 'hover:bg-knowit-gray-50 border-2 border-transparent'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${theme.preview}`}></div>
              <span className="text-sm font-medium">{theme.label}</span>
              {slide.theme === theme.value && (
                <div className="ml-auto w-2 h-2 bg-knowit-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Background Selection */}
      <div className="card-knowit p-4">
        <h3 className="font-semibold text-knowit-gray-900 mb-4">Background</h3>
        <div className="space-y-2">
          {backgrounds.map((bg) => (
            <button
              key={bg.value}
              onClick={() => onUpdate({ ...slide, background: bg.value })}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                slide.background === bg.value
                  ? 'bg-knowit-blue-50 border-2 border-knowit-blue-500'
                  : 'hover:bg-knowit-gray-50 border-2 border-transparent'
              }`}
            >
              <div className={`w-8 h-4 rounded ${bg.preview}`}></div>
              <span className="text-sm font-medium">{bg.label}</span>
              {slide.background === bg.value && (
                <div className="ml-auto w-2 h-2 bg-knowit-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Selection */}
      <div className="card-knowit p-4">
        <h3 className="font-semibold text-knowit-gray-900 mb-4 flex items-center gap-2">
          <Layout className="w-4 h-4" />
          Layout
        </h3>
        <div className="space-y-2">
          {layouts.map((layout) => (
            <button
              key={layout.value}
              onClick={() => onUpdate({ ...slide, layout: layout.value })}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                slide.layout === layout.value
                  ? 'bg-knowit-blue-50 border-2 border-knowit-blue-500'
                  : 'hover:bg-knowit-gray-50 border-2 border-transparent'
              }`}
            >
              <span className="text-lg">{layout.icon}</span>
              <span className="text-sm font-medium">{layout.label}</span>
              {slide.layout === layout.value && (
                <div className="ml-auto w-2 h-2 bg-knowit-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Slide Info */}
      <div className="card-knowit p-4">
        <h3 className="font-semibold text-knowit-gray-900 mb-4">Slide Info</h3>
        <div className="space-y-2 text-sm text-knowit-gray-600">
          <div className="flex justify-between">
            <span>Slide ID:</span>
            <span className="font-mono">{slide.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Characters:</span>
            <span>{slide.content.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Words:</span>
            <span>{slide.content.trim().split(/\s+/).length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}