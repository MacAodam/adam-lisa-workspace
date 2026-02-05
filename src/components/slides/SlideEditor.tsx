'use client'

import { useState } from 'react'
import { Type, Image as ImageIcon, List, Layout, Palette } from 'lucide-react'
import type { SlideData } from '@/types/slide'

interface SlideEditorProps {
  slide: SlideData
  onUpdate: (slide: SlideData) => void
}

export function SlideEditor({ slide, onUpdate }: SlideEditorProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content')

  const handleTitleChange = (title: string) => {
    onUpdate({ ...slide, title })
  }

  const handleContentChange = (content: string) => {
    onUpdate({ ...slide, content })
  }

  const handleSubtitleChange = (subtitle: string) => {
    onUpdate({ ...slide, subtitle })
  }

  return (
    <div className="card-knowit">
      {/* Tab Navigation */}
      <div className="border-b border-knowit-gray-200 px-6 pt-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 font-medium border-b-2 transition-all ${
              activeTab === 'content'
                ? 'border-knowit-blue-500 text-knowit-blue-600'
                : 'border-transparent text-knowit-gray-600 hover:text-knowit-gray-900'
            }`}
          >
            <Type className="w-4 h-4 inline-block mr-2" />
            Content
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`px-4 py-2 font-medium border-b-2 transition-all ${
              activeTab === 'design'
                ? 'border-knowit-blue-500 text-knowit-blue-600'
                : 'border-transparent text-knowit-gray-600 hover:text-knowit-gray-900'
            }`}
          >
            <Palette className="w-4 h-4 inline-block mr-2" />
            Design
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-knowit-gray-700 mb-2">
                Slide Title
              </label>
              <input
                type="text"
                value={slide.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 border border-knowit-gray-300 rounded-lg focus:ring-2 focus:ring-knowit-blue-500 focus:border-transparent text-lg font-semibold"
                placeholder="Enter slide title..."
              />
            </div>

            {/* Subtitle Input */}
            <div>
              <label className="block text-sm font-medium text-knowit-gray-700 mb-2">
                Subtitle (optional)
              </label>
              <input
                type="text"
                value={slide.subtitle || ''}
                onChange={(e) => handleSubtitleChange(e.target.value)}
                className="w-full px-4 py-2 border border-knowit-gray-300 rounded-lg focus:ring-2 focus:ring-knowit-blue-500 focus:border-transparent"
                placeholder="Enter subtitle..."
              />
            </div>

            {/* Content Input */}
            <div>
              <label className="block text-sm font-medium text-knowit-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={slide.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="w-full px-4 py-3 border border-knowit-gray-300 rounded-lg focus:ring-2 focus:ring-knowit-blue-500 focus:border-transparent resize-none"
                rows={8}
                placeholder="Enter slide content..."
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 pt-4 border-t border-knowit-gray-200">
              <button className="flex items-center gap-2 px-4 py-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-blue-50 rounded-lg transition-all">
                <ImageIcon className="w-4 h-4" />
                Add Image
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-blue-50 rounded-lg transition-all">
                <List className="w-4 h-4" />
                Bullet Points
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-blue-50 rounded-lg transition-all">
                <Layout className="w-4 h-4" />
                Change Layout
              </button>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-6">
            <div className="text-center py-12 text-knowit-gray-500">
              <Palette className="w-12 h-12 mx-auto mb-4 text-knowit-gray-400" />
              <h3 className="text-lg font-medium mb-2">Design Controls</h3>
              <p>Design customization options coming in v2</p>
              <div className="mt-6 p-4 bg-knowit-blue-50 rounded-lg">
                <p className="text-sm text-knowit-blue-700">
                  Current slide uses <strong>{slide.theme}</strong> theme with{' '}
                  <strong>{slide.background}</strong> background
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}