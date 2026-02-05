'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { SlideEditor } from '@/components/slides/SlideEditor'
import { SlidePreview } from '@/components/slides/SlidePreview'
import { SlideSettings } from '@/components/slides/SlideSettings'
import type { SlideData } from '@/types/slide'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState<SlideData>({
    id: '1',
    title: 'Welcome to Adam & Lisa Workspace',
    content: 'Create professional presentations with Knowit branding',
    background: 'gradient-knowit',
    layout: 'title-content',
    theme: 'knowit-blue'
  })

  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit')

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-knowit bg-clip-text text-transparent mb-4">
            Slide Creator
          </h1>
          <p className="text-knowit-gray-600 text-lg">
            Create stunning presentations with professional Knowit branding
          </p>
        </div>

        <div className="flex gap-8">
          {/* Editor Panel */}
          <div className="flex-1 space-y-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setPreviewMode('edit')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  previewMode === 'edit'
                    ? 'button-primary'
                    : 'button-secondary'
                }`}
              >
                Edit Mode
              </button>
              <button
                onClick={() => setPreviewMode('preview')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  previewMode === 'preview'
                    ? 'button-primary'
                    : 'button-secondary'
                }`}
              >
                Preview Mode
              </button>
            </div>

            {previewMode === 'edit' ? (
              <SlideEditor 
                slide={currentSlide} 
                onUpdate={setCurrentSlide}
              />
            ) : (
              <SlidePreview 
                slide={currentSlide}
              />
            )}
          </div>

          {/* Settings Panel */}
          <div className="w-80">
            <SlideSettings 
              slide={currentSlide}
              onUpdate={setCurrentSlide}
            />
          </div>
        </div>
      </div>
    </main>
  )
}