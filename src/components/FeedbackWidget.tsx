'use client'

import { useState } from 'react'
import { MessageSquare, ThumbsUp, ThumbsDown, X, Send } from 'lucide-react'

interface FeedbackData {
  rating: 'positive' | 'negative' | null
  comment: string
  feature: string
  timestamp: number
  url: string
}

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null)
  const [comment, setComment] = useState('')
  const [feature, setFeature] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    const feedback: FeedbackData = {
      rating,
      comment,
      feature,
      timestamp: Date.now(),
      url: window.location.href
    }

    // Save to localStorage for now (simple implementation)
    const existingFeedback = JSON.parse(localStorage.getItem('adam-lisa-feedback') || '[]')
    existingFeedback.push(feedback)
    localStorage.setItem('adam-lisa-feedback', JSON.stringify(existingFeedback))

    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setSubmitted(false)
      setRating(null)
      setComment('')
      setFeature('')
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-5 h-5" />
          <span>Tack för din feedback!</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Feedback Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-knowit-blue-600 hover:bg-knowit-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
          title="Ge feedback"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Feedback Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border border-knowit-gray-200 w-80 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-knowit-gray-900">Ge Feedback</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-knowit-gray-400 hover:text-knowit-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <p className="text-sm text-knowit-gray-600 mb-2">Hur var upplevelsen?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setRating('positive')}
                className={`p-2 rounded-lg border transition-all ${
                  rating === 'positive'
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-600 hover:border-green-500'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => setRating('negative')}
                className={`p-2 rounded-lg border transition-all ${
                  rating === 'negative'
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-600 hover:border-red-500'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Feature Request */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-knowit-gray-700 mb-1">
              Önskad förbättring
            </label>
            <select
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="w-full p-2 border border-knowit-gray-300 rounded-lg focus:ring-2 focus:ring-knowit-blue-500 focus:border-transparent"
            >
              <option value="">Välj kategori...</option>
              <option value="templates">Fler templates</option>
              <option value="export">Export till PowerPoint</option>
              <option value="colors">Fler färgalternativ</option>
              <option value="ui">Enklare navigation</option>
              <option value="speed">Snabbare laddning</option>
              <option value="mobile">Bättre mobilversion</option>
              <option value="other">Annat</option>
            </select>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-knowit-gray-700 mb-1">
              Kommentar (valfritt)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Berätta mer om vad du vill förbättra..."
              rows={3}
              className="w-full p-2 border border-knowit-gray-300 rounded-lg focus:ring-2 focus:ring-knowit-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!rating}
            className="w-full bg-knowit-blue-600 hover:bg-knowit-blue-700 disabled:bg-knowit-gray-300 text-white p-2 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Skicka Feedback
          </button>
        </div>
      )}
    </>
  )
}