'use client'

import { useState, useEffect } from 'react'
import { BarChart3, MessageSquare, TrendingUp, Users, Download } from 'lucide-react'

interface FeedbackData {
  rating: 'positive' | 'negative' | null
  comment: string
  feature: string
  timestamp: number
  url: string
}

export function FeedbackDashboard() {
  const [feedback, setFeedback] = useState<FeedbackData[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const loadFeedback = () => {
      try {
        const data = JSON.parse(localStorage.getItem('adam-lisa-feedback') || '[]')
        setFeedback(data)
      } catch (error) {
        console.error('Error loading feedback:', error)
      }
    }
    loadFeedback()
  }, [])

  const stats = {
    total: feedback.length,
    positive: feedback.filter(f => f.rating === 'positive').length,
    negative: feedback.filter(f => f.rating === 'negative').length,
    topFeature: feedback.reduce((acc, f) => {
      if (f.feature) {
        acc[f.feature] = (acc[f.feature] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(feedback, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `adam-lisa-feedback-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // Toggle visibility with Ctrl+Shift+F
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault()
        setIsVisible(!isVisible)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-knowit-gray-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-knowit-blue-600" />
              Feedback Dashboard
            </h2>
            <div className="flex gap-2">
              <button
                onClick={exportData}
                className="px-4 py-2 bg-knowit-blue-600 text-white rounded-lg hover:bg-knowit-blue-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Stäng
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Tryck Ctrl+Shift+F för att visa/dölja</p>
        </div>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-knowit-blue-600" />
                <span className="font-semibold">Total Feedback</span>
              </div>
              <div className="text-2xl font-bold text-knowit-gray-900">{stats.total}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Positive</span>
              </div>
              <div className="text-2xl font-bold text-green-700">{stats.positive}</div>
              <div className="text-sm text-green-600">
                {stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}%
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />
                <span className="font-semibold">Negative</span>
              </div>
              <div className="text-2xl font-bold text-red-700">{stats.negative}</div>
              <div className="text-sm text-red-600">
                {stats.total > 0 ? Math.round((stats.negative / stats.total) * 100) : 0}%
              </div>
            </div>
          </div>

          {/* Top Feature Requests */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Top Feature Requests</h3>
            <div className="space-y-2">
              {Object.entries(stats.topFeature)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([feature, count]) => (
                  <div key={feature} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span className="capitalize">{feature.replace('_', ' ')}</span>
                    <span className="bg-knowit-blue-100 text-knowit-blue-800 px-2 py-1 rounded text-sm font-medium">
                      {count} requests
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Feedback */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Recent Feedback</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {feedback
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 10)
                .map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                          item.rating === 'positive' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm text-gray-600">
                          {new Date(item.timestamp).toLocaleDateString('sv-SE')}
                        </span>
                      </div>
                      {item.feature && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {item.feature}
                        </span>
                      )}
                    </div>
                    {item.comment && (
                      <p className="text-gray-700 text-sm">{item.comment}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}