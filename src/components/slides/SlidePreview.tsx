'use client'

import { Eye, Maximize2 } from 'lucide-react'
import type { SlideData } from '@/types/slide'

interface SlidePreviewProps {
  slide: SlideData
}

export function SlidePreview({ slide }: SlidePreviewProps) {
  const getBackgroundClass = () => {
    switch (slide.background) {
      case 'gradient-knowit':
        return 'bg-gradient-to-br from-knowit-blue-500 to-knowit-purple-600'
      case 'gradient-knowit-peach':
        return 'bg-gradient-to-br from-knowit-peach-400 to-knowit-peach-600'
      case 'dark':
        return 'bg-knowit-gray-900'
      default:
        return 'bg-white'
    }
  }

  const getTextClass = () => {
    return slide.background === 'white' 
      ? 'text-knowit-gray-900' 
      : 'text-white'
  }

  const getSubtitleClass = () => {
    return slide.background === 'white' 
      ? 'text-knowit-gray-600' 
      : 'text-white/80'
  }

  return (
    <div className="card-knowit">
      {/* Preview Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-knowit-gray-200">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-knowit-gray-600" />
          <h3 className="font-medium text-knowit-gray-900">Slide Preview</h3>
        </div>
        <button className="p-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-gray-100 rounded-lg transition-all">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Preview Content */}
      <div className="p-6">
        <div className="relative">
          {/* Slide Container */}
          <div 
            className={`aspect-[16/9] rounded-lg shadow-lg overflow-hidden ${getBackgroundClass()}`}
          >
            <div className="h-full flex flex-col justify-center px-12 py-8">
              {/* Knowit Logo Placeholder */}
              <div className="absolute top-6 right-6">
                <div className="w-16 h-6 bg-white/20 rounded backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-white/80">KNOWIT</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                {/* Title */}
                <h1 className={`text-4xl font-bold leading-tight ${getTextClass()}`}>
                  {slide.title}
                </h1>

                {/* Subtitle */}
                {slide.subtitle && (
                  <h2 className={`text-xl font-medium ${getSubtitleClass()}`}>
                    {slide.subtitle}
                  </h2>
                )}

                {/* Content */}
                <div className={`text-lg leading-relaxed ${getSubtitleClass()} max-w-3xl`}>
                  {slide.content.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bottom Branding */}
              <div className="absolute bottom-6 left-6">
                <div className="w-2 h-8 bg-knowit-peach-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Preview Controls */}
          <div className="mt-4 flex justify-center gap-3">
            <button className="px-4 py-2 bg-knowit-gray-100 text-knowit-gray-700 rounded-lg hover:bg-knowit-gray-200 transition-all text-sm">
              Previous Slide
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-knowit-blue-50 text-knowit-blue-700 rounded-lg text-sm">
              <div className="w-2 h-2 bg-knowit-blue-500 rounded-full"></div>
              Slide 1 of 1
            </div>
            <button className="px-4 py-2 bg-knowit-gray-100 text-knowit-gray-700 rounded-lg hover:bg-knowit-gray-200 transition-all text-sm">
              Next Slide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}