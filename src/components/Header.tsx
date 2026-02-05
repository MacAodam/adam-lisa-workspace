'use client'

import { Presentation, ArrowLeft } from 'lucide-react'

interface Props {
  showBackButton?: boolean
  onBack?: () => void
  title?: string
}

export function Header({ showBackButton = false, onBack, title }: Props) {
  return (
    <header className="bg-white shadow-sm border-b border-knowit-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="p-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-gray-100 rounded-lg transition-all"
                title="Tillbaka"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-knowit-blue-500 to-knowit-purple-500 rounded-lg flex items-center justify-center">
                <Presentation className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-knowit-gray-900">
                  {title || 'Adam & Lisa Workspace'}
                </h1>
                <p className="text-sm text-knowit-gray-500">Slide Creator</p>
              </div>
            </div>
          </div>

          {/* Simple Status */}
          <div className="text-sm text-knowit-gray-500">
            Knowit Branding
          </div>
        </div>
      </div>

      {/* Knowit Brand Strip */}
      <div className="h-1 bg-gradient-to-r from-knowit-blue-500 via-knowit-purple-500 to-knowit-peach-500"></div>
    </header>
  )
}