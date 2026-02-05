'use client'

import { useState } from 'react'
import { Presentation, Settings, Download, Save, Users } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-knowit-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-knowit-blue-500 to-knowit-purple-500 rounded-lg flex items-center justify-center">
                <Presentation className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-knowit-gray-900">
                  Adam & Lisa Workspace
                </h1>
                <p className="text-sm text-knowit-gray-500">Slide Creator</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-knowit-gray-600 hover:text-knowit-blue-600 transition-colors">
              Templates
            </button>
            <button className="text-knowit-gray-600 hover:text-knowit-blue-600 transition-colors">
              My Presentations
            </button>
            <button className="text-knowit-gray-600 hover:text-knowit-blue-600 transition-colors">
              Brand Guidelines
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-gray-100 rounded-lg transition-all">
              <Save className="w-5 h-5" />
            </button>
            <button className="p-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-gray-100 rounded-lg transition-all">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-gray-100 rounded-lg transition-all">
              <Users className="w-5 h-5" />
            </button>
            <button className="p-2 text-knowit-gray-600 hover:text-knowit-blue-600 hover:bg-knowit-gray-100 rounded-lg transition-all">
              <Settings className="w-5 h-5" />
            </button>

            {/* Profile */}
            <div className="w-8 h-8 bg-gradient-to-r from-knowit-peach-400 to-knowit-peach-600 rounded-full flex items-center justify-center ml-3">
              <span className="text-white font-semibold text-sm">AL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Knowit Brand Strip */}
      <div className="h-1 bg-gradient-to-r from-knowit-blue-500 via-knowit-purple-500 to-knowit-peach-500"></div>
    </header>
  )
}// Forced commit for GitHub sync
// Force deployment trigger Thu Feb  5 10:18:17 AM UTC 2026
