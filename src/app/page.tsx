'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { SlideWizard } from '@/components/SlideWizard'
import { KnowitSlideRenderer } from '@/components/KnowitSlideRenderer'

interface SlideRequest {
  purpose: string
  audience: string
  slideCount: number
  details: string
  inspiration: string
  slideType: 'swot' | 'situation-complication' | 'agenda' | 'dashboard' | 'custom'
}

interface SlideData {
  title: string
  subtitle?: string
  content: string[]
  slideType: 'title' | 'content' | 'swot' | 'agenda'
  template: 'knowit-blue' | 'knowit-purple'
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<'wizard' | 'preview'>('wizard')
  const [slides, setSlides] = useState<SlideData[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleWizardComplete = async (request: SlideRequest) => {
    setIsGenerating(true)
    
    // Generate slides based on request
    const generatedSlides = await generateSlides(request)
    setSlides(generatedSlides)
    
    setIsGenerating(false)
    setCurrentStep('preview')
  }

  const generateSlides = async (request: SlideRequest): Promise<SlideData[]> => {
    // Simulate AI generation (in real implementation, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const slides: SlideData[] = []
    
    // Title slide
    slides.push({
      title: extractTitleFromPurpose(request.purpose),
      subtitle: `Presentation för ${request.audience}`,
      content: [
        `Syfte: ${request.purpose}`,
        `Datum: ${new Date().toLocaleDateString('sv-SE')}`,
        'Skapad med Adam & Lisa Workspace'
      ],
      slideType: 'title',
      template: 'knowit-blue'
    })

    if (request.slideType === 'swot') {
      slides.push({
        title: 'SWOT-analys',
        content: [
          'Styrka: Stark marknadsposition',
          'Styrka: Erfaren team',
          'Svaghet: Begränsade resurser', 
          'Svaghet: Teknisk skuld',
          'Möjlighet: Ny marknad',
          'Möjlighet: AI-integration',
          'Hot: Konkurrens',
          'Hot: Regelförändringar'
        ],
        slideType: 'swot',
        template: 'knowit-blue'
      })
    }

    if (request.slideType === 'situation-complication') {
      slides.push({
        title: 'Situation',
        content: [
          'Nuvarande läge och utmaningar',
          'Marknadsdynamik och trender',
          'Interna faktorer som påverkar'
        ],
        slideType: 'content',
        template: 'knowit-blue'
      })
      
      slides.push({
        title: 'Complication',
        content: [
          'Identifierade problemområden',
          'Riskfaktorer som behöver adresseras',
          'Tidskritiska beslut'
        ],
        slideType: 'content',
        template: 'knowit-purple'
      })
    }

    if (request.slideType === 'agenda') {
      slides.push({
        title: 'Agenda',
        content: [
          'Välkomst och introduktion',
          'Genomgång av huvudpunkter',
          'Diskussion och frågor',
          'Nästa steg och uppföljning',
          'Avslutning'
        ],
        slideType: 'agenda',
        template: 'knowit-blue'
      })
    }

    // Add content slides based on details
    if (request.details.trim()) {
      const detailPoints = request.details.split('\n').filter(p => p.trim())
      if (detailPoints.length > 0) {
        slides.push({
          title: 'Viktiga punkter',
          content: detailPoints,
          slideType: 'content',
          template: 'knowit-blue'
        })
      }
    }

    // Summary slide
    slides.push({
      title: 'Sammanfattning',
      content: [
        'Nyckelinsikter från presentationen',
        'Rekommenderade åtgärder',
        'Nästa steg i processen'
      ],
      slideType: 'content',
      template: 'knowit-purple'
    })

    return slides.slice(0, request.slideCount)
  }

  const extractTitleFromPurpose = (purpose: string): string => {
    // Simple title extraction
    if (purpose.toLowerCase().includes('swot')) return 'SWOT-analys'
    if (purpose.toLowerCase().includes('strategi')) return 'Strategipresentation'
    if (purpose.toLowerCase().includes('projekt')) return 'Projektgenomgång'
    return 'Presentation'
  }

  const handleStartOver = () => {
    setCurrentStep('wizard')
    setSlides([])
  }

  if (isGenerating) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-knowit-blue-500 to-knowit-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-knowit-gray-900 mb-2">Skapar dina slides...</h2>
            <p className="text-knowit-gray-600">Detta tar bara några sekunder</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {currentStep === 'wizard' && (
        <SlideWizard onComplete={handleWizardComplete} />
      )}

      {currentStep === 'preview' && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 text-center">
            <button
              onClick={handleStartOver}
              className="px-4 py-2 border-2 border-knowit-blue-600 text-knowit-blue-600 hover:bg-knowit-blue-600 hover:text-white rounded-lg transition-colors"
            >
              Skapa ny presentation
            </button>
          </div>
          
          <KnowitSlideRenderer slides={slides} />
        </div>
      )}
    </main>
  )
}