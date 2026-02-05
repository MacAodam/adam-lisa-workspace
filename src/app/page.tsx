'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { SlideWizard } from '@/components/SlideWizard'
import { KnowitSlideRenderer } from '@/components/KnowitSlideRenderer'
import { generateSlidesWithOpus } from '@/lib/slideGenerator'

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
  slideType: 'title' | 'content' | 'swot' | 'agenda' | 'dashboard'
  layout: 'knowit-standard' | 'knowit-title' | 'knowit-two-column'
  notes?: string
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
    // Use Opus 4.5 for professional slide generation following Knowit template
    try {
      const slides = await generateSlidesWithOpus(request)
      return slides
    } catch (error) {
      console.error('Failed to generate slides with Opus:', error)
      // Fallback to local generation if API fails
      return generateFallbackSlides(request)
    }
  }

  const generateFallbackSlides = (request: SlideRequest): SlideData[] => {
    const slides: SlideData[] = []
    
    // Title slide following Knowit template
    slides.push({
      title: extractTitleFromPurpose(request.purpose),
      subtitle: getAudienceString(request.audience),
      content: [
        `Syfte: ${request.purpose}`,
        `Målgrupp: ${getAudienceString(request.audience)}`,
        `Datum: ${new Date().toLocaleDateString('sv-SE')}`,
        'Knowit Ascend'
      ],
      slideType: 'title',
      layout: 'knowit-title',
      notes: `Presentationens syfte: ${request.purpose}`
    })

    // Generate based on type with proper Knowit formatting
    if (request.slideType === 'swot') {
      slides.push({
        title: 'SWOT-analys',
        content: [
          'Styrkor: Marknadsposition, erfaren team, etablerade processer',
          'Svagheter: Begränsade resurser, teknisk skuld, kompetensluckor',
          'Möjligheter: AI-integration, nya marknadssegment, strategiska partnerskap',
          'Hot: Ökad konkurrens, regelförändringar, ekonomisk osäkerhet'
        ],
        slideType: 'swot',
        layout: 'knowit-standard',
        notes: 'Genomgå systematiskt varje kategori med konkreta exempel'
      })
    }

    if (request.slideType === 'situation-complication') {
      slides.push({
        title: 'Situation - Nuläge',
        content: [
          'Marknadsläge: Aktuella trender och utveckling',
          'Organisationens position: Resurser och kapacitet',  
          'Pågående initiativ: Status och preliminära resultat',
          'Intressenter: Förväntningar och krav'
        ],
        slideType: 'content',
        layout: 'knowit-standard',
        notes: 'Etablera gemensam förståelse av nuläget med data och exempel'
      })
      
      slides.push({
        title: 'Utmaning - Vad som måste adresseras',
        content: [
          'Kritiska problemområden som hindrar framsteg',
          'Riskfaktorer som kan påverka resultatet negativt',
          'Tidskritiska beslutspunkter som närmar sig',
          'Resurskonflikter och prioriteringsbehov'
        ],
        slideType: 'content',
        layout: 'knowit-standard',
        notes: 'Fokus på kritiska utmaningar och konsekvenserna av inaction'
      })
    }

    if (request.slideType === 'agenda') {
      const totalTime = Math.max(30, request.slideCount * 3)
      slides.push({
        title: 'Agenda',
        content: [
          'Välkomst och syfte (5 min)',
          `Genomgång huvudpunkter (${totalTime - 15} min)`,
          'Diskussion och frågor (5 min)',
          'Sammanfattning och nästa steg (5 min)'
        ],
        slideType: 'agenda',
        layout: 'knowit-standard',
        notes: `Total tid: ${totalTime} minuter. Håll tight schema för diskussion`
      })
    }

    if (request.slideType === 'dashboard') {
      slides.push({
        title: 'Dashboard - Nyckeltal',
        content: [
          'KPI 1: Status och trend (target vs actual)',
          'KPI 2: Utveckling över tid med prognos', 
          'KPI 3: Jämförelse mot benchmark',
          'Sammanfattande bedömning och indikationer'
        ],
        slideType: 'dashboard',
        layout: 'knowit-two-column',
        notes: 'Fokusera på insights och actionable takeaways'
      })
    }

    // Add detail slides
    if (request.details.trim()) {
      const detailPoints = request.details.split('\n').filter(p => p.trim())
      if (detailPoints.length > 0) {
        slides.push({
          title: 'Viktiga punkter',
          content: detailPoints.slice(0, 5),
          slideType: 'content', 
          layout: 'knowit-standard',
          notes: 'Fördjupa varje punkt med konkreta exempel'
        })
      }
    }

    // Summary slide
    slides.push({
      title: 'Sammanfattning & nästa steg',
      content: [
        'Nyckelinsikter från genomgången',
        'Prioriterade handlingsområden',
        'Föreslagna nästa steg med tidplan',
        'Uppföljning och ansvar'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Avsluta med tydliga åtgärder och ansvar'
    })

    return slides.slice(0, request.slideCount)
  }

  const getAudienceString = (audience: string): string => {
    switch (audience) {
      case 'styrelse': return 'För styrelse och ledning'
      case 'kollegor': return 'Teamgenomgång'
      case 'kunder': return 'Kundpresentation'
      case 'workshop': return 'Workshop-session'
      case 'allmän': return 'Allmän presentation'
      default: return 'Presentation'
    }
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
        <Header title="Genererar slides..." />
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
      {currentStep === 'wizard' && (
        <SlideWizard onComplete={handleWizardComplete} />
      )}

      {currentStep === 'preview' && (
        <>
          <Header 
            showBackButton={true} 
            onBack={handleStartOver}
            title="Din Presentation"
          />
          <div className="container mx-auto px-4 py-8">
            <KnowitSlideRenderer slides={slides} />
          </div>
        </>
      )}
    </main>
  )
}