'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Wand2, FileText } from 'lucide-react'

interface SlideRequest {
  purpose: string
  audience: string
  slideCount: number
  details: string
  inspiration: string
  slideType: 'swot' | 'situation-complication' | 'agenda' | 'dashboard' | 'custom'
}

interface Props {
  onComplete: (request: SlideRequest) => void
}

export function SlideWizard({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0)
  const [request, setRequest] = useState<SlideRequest>({
    purpose: '',
    audience: '',
    slideCount: 5,
    details: '',
    inspiration: '',
    slideType: 'custom'
  })

  const steps = [
    {
      title: "Vad är syftet?",
      subtitle: "Vad ska presentationen användas till?",
      field: 'purpose',
      type: 'textarea',
      placeholder: "T.ex. Presentera SWOT-analys för Svensk Travsport, förklara AI-strategi för styrelsen..."
    },
    {
      title: "Vem är målgruppen?", 
      subtitle: "Vilka ska se presentationen?",
      field: 'audience',
      type: 'select',
      options: [
        { value: 'styrelse', label: 'Styrelse/ledning' },
        { value: 'kollegor', label: 'Kollegor/team' },
        { value: 'kunder', label: 'Kunder/externa' },
        { value: 'workshop', label: 'Workshop-deltagare' },
        { value: 'allmän', label: 'Allmän publik' }
      ]
    },
    {
      title: "Typ av presentation?",
      subtitle: "Välj mall eller skapa egen",
      field: 'slideType',
      type: 'select',
      options: [
        { value: 'swot', label: 'SWOT-analys' },
        { value: 'situation-complication', label: 'Situation-Complication' },
        { value: 'agenda', label: 'Agenda/Mötesstruktur' },
        { value: 'dashboard', label: 'Dashboard/KPI' },
        { value: 'custom', label: 'Egen struktur' }
      ]
    },
    {
      title: "Hur många slides?",
      subtitle: "Ungefärligt antal",
      field: 'slideCount',
      type: 'slider',
      min: 1,
      max: 20
    },
    {
      title: "Berätta mer",
      subtitle: "Specifika detaljer, innehåll, fokusområden",
      field: 'details',
      type: 'textarea',
      placeholder: "Viktiga punkter, data som ska inkluderas, speciella krav..."
    },
    {
      title: "Inspiration eller referenser?",
      subtitle: "Ladda upp PowerPoint, Excel, Word-filer eller beskriv (valfritt)",
      field: 'inspiration',
      type: 'file-upload',
      placeholder: "Referera till tidigare presentation, specifik layout, etc...",
      acceptedFiles: '.pptx,.ppt,.xlsx,.xls,.docx,.doc'
    }
  ]

  const currentStepData = steps[currentStep]
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(request)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (value: any) => {
    setRequest(prev => ({
      ...prev,
      [currentStepData.field]: value
    }))
  }

  const canProceed = () => {
    const currentValue = request[currentStepData.field as keyof SlideRequest]
    if (currentStepData.field === 'inspiration') return true // Optional field
    return currentValue !== '' && currentValue !== 0
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-knowit-blue-50 to-knowit-purple-50">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-knowit-gray-600">
              Steg {currentStep + 1} av {steps.length}
            </span>
            <span className="text-sm text-knowit-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-knowit-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-knowit-blue-500 to-knowit-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-knowit-blue-500 to-knowit-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-knowit-gray-900 mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-knowit-gray-600">
              {currentStepData.subtitle}
            </p>
          </div>

          {/* Input */}
          <div className="mb-8">
            {currentStepData.type === 'textarea' && (
              <textarea
                value={request[currentStepData.field as keyof SlideRequest] as string}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentStepData.placeholder}
                rows={4}
                className="w-full p-4 border-2 border-knowit-gray-200 rounded-lg focus:border-knowit-blue-500 focus:ring-0 transition-colors"
                autoFocus
              />
            )}

            {currentStepData.type === 'select' && (
              <select
                value={request[currentStepData.field as keyof SlideRequest] as string}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full p-4 border-2 border-knowit-gray-200 rounded-lg focus:border-knowit-blue-500 focus:ring-0 transition-colors"
                autoFocus
              >
                <option value="">Välj alternativ...</option>
                {currentStepData.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {currentStepData.type === 'slider' && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-knowit-blue-600">
                    {request.slideCount}
                  </span>
                  <span className="text-lg text-knowit-gray-500 ml-2">slide{request.slideCount > 1 ? 's' : ''}</span>
                </div>
                <input
                  type="range"
                  min={currentStepData.min}
                  max={currentStepData.max}
                  value={request.slideCount}
                  onChange={(e) => handleInputChange(parseInt(e.target.value))}
                  className="w-full h-3 bg-knowit-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-knowit-gray-500">
                  <span>{currentStepData.min}</span>
                  <span>{currentStepData.max}</span>
                </div>
              </div>
            )}

            {currentStepData.type === 'file-upload' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-knowit-gray-300 rounded-lg p-8 text-center hover:border-knowit-blue-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept={currentStepData.acceptedFiles}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      const fileNames = files.map(f => f.name).join(', ')
                      handleInputChange(fileNames)
                    }}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-knowit-blue-100 rounded-full flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-knowit-blue-600" />
                    </div>
                    <p className="font-medium text-knowit-gray-900 mb-1">
                      Välj filer eller dra och släpp
                    </p>
                    <p className="text-sm text-knowit-gray-500">
                      PowerPoint (.pptx), Excel (.xlsx), Word (.docx)
                    </p>
                  </label>
                </div>
                
                {request.inspiration && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      <strong>Uppladdade filer:</strong> {request.inspiration}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-knowit-gray-700 mb-1">
                    Eller beskriv din inspiration
                  </label>
                  <textarea
                    value={typeof request.inspiration === 'string' && !request.inspiration.includes('.') ? request.inspiration : ''}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentStepData.placeholder}
                    rows={3}
                    className="w-full p-3 border border-knowit-gray-300 rounded-lg focus:border-knowit-blue-500 focus:ring-0 transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-3 border-2 border-knowit-gray-300 text-knowit-gray-700 rounded-lg hover:border-knowit-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Tillbaka
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-3 bg-gradient-to-r from-knowit-blue-500 to-knowit-purple-500 text-white rounded-lg hover:from-knowit-blue-600 hover:to-knowit-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Wand2 className="w-5 h-5" />
                  Skapa Slides
                </>
              ) : (
                <>
                  Nästa
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}