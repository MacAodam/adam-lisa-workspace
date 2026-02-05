import { NextRequest, NextResponse } from 'next/server'

interface SlideRequest {
  purpose: string
  audience: string
  slideCount: number
  details: string
  inspiration: string
  slideType: 'swot' | 'situation-complication' | 'agenda' | 'dashboard' | 'custom'
}

interface GeneratedSlide {
  title: string
  subtitle?: string
  content: string[]
  slideType: 'title' | 'content' | 'swot' | 'agenda' | 'dashboard'
  layout: 'knowit-standard' | 'knowit-title' | 'knowit-two-column'
  notes?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, model, request } = body as { 
      prompt: string
      model: string
      request: SlideRequest 
    }

    // For now, use local generation since we don't have Opus API access
    // In production, this would call Claude Opus 4.5
    const slides = generateKnowitSlides(request)
    
    return NextResponse.json({ 
      slides,
      model: 'opus-simulated',
      success: true
    })
  } catch (error) {
    console.error('Slide generation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate slides' },
      { status: 500 }
    )
  }
}

function generateKnowitSlides(request: SlideRequest): GeneratedSlide[] {
  const slides: GeneratedSlide[] = []
  
  // Title slide - följer Knowit mall
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
    notes: `Presentationens syfte: ${request.purpose}. Målgrupp: ${request.audience}. Förväntad längd baserat på ${request.slideCount} slides.`
  })

  // Generera content baserat på typ och Knowit-standarder
  if (request.slideType === 'swot') {
    slides.push(generateSWOTSlide(request))
  } else if (request.slideType === 'situation-complication') {
    slides.push(...generateSituationComplicationSlides(request))
  } else if (request.slideType === 'agenda') {
    slides.push(generateAgendaSlide(request))
  } else if (request.slideType === 'dashboard') {
    slides.push(generateDashboardSlide(request))
  }

  // Lägg till detaljer som content-slides
  if (request.details.trim()) {
    const detailSlides = generateDetailSlides(request.details, request.slideCount - slides.length - 1)
    slides.push(...detailSlides)
  }

  // Sammanfattning - alltid sista slide
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
    notes: 'Avsluta med konkreta åtgärder. Säkerställ att alla vet sina nästa steg innan mötet avslutas.'
  })

  return slides.slice(0, request.slideCount)
}

function generateSWOTSlide(request: SlideRequest): GeneratedSlide {
  return {
    title: 'SWOT-analys',
    content: [
      'Styrkor: Marknadsposition, erfaren team, etablerade processer',
      'Svagheter: Begränsade resurser, teknisk skuld, kompetensluckor',
      'Möjligheter: AI-integration, nya marknadssegment, strategiska partnerskap',
      'Hot: Ökad konkurrens, regelförändringar, ekonomisk osäkerhet'
    ],
    slideType: 'swot',
    layout: 'knowit-standard',
    notes: 'Genomgå systematiskt varje kategori. Fokusera på konkreta exempel och kvantifierbara faktorer där möjligt.'
  }
}

function generateSituationComplicationSlides(request: SlideRequest): GeneratedSlide[] {
  return [
    {
      title: 'Situation - Nuläge',
      content: [
        'Marknadsläge: Aktuella trender och utveckling',
        'Organisationens position: Resurser och kapacitet',
        'Pågående initiativ: Status och preliminära resultat',
        'Intressenter: Förväntningar och krav'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Etablera en gemensam förståelse av nuläget. Använd data och konkreta exempel.'
    },
    {
      title: 'Utmaning - Vad som måste adresseras',
      content: [
        'Kritiska problemområden som hindrar framsteg',
        'Riskfaktorer som kan påverka resultatet negativt',
        'Tidskritiska beslutspunkter som närmar sig',
        'Resurskonflikter och prioriteringsbehov'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Fokus på de mest kritiska utmaningarna. Var tydlig med konsekvenserna av inaction.'
    }
  ]
}

function generateAgendaSlide(request: SlideRequest): GeneratedSlide {
  const totalTime = Math.max(30, request.slideCount * 3) // Estimate 3 min per slide
  return {
    title: 'Agenda',
    content: [
      'Välkomst och syfte (5 min)',
      `Genomgång huvudpunkter (${totalTime - 15} min)`,
      'Diskussion och frågor (5 min)',
      'Sammanfattning och nästa steg (5 min)'
    ],
    slideType: 'agenda',
    layout: 'knowit-standard',
    notes: `Total tid: ${totalTime} minuter. Håll tight schema för att ha tid för diskussion.`
  }
}

function generateDashboardSlide(request: SlideRequest): GeneratedSlide {
  return {
    title: 'Dashboard - Nyckeltal',
    content: [
      'KPI 1: Status och trend (target vs actual)',
      'KPI 2: Utveckling över tid med prognos',
      'KPI 3: Jämförelse mot benchmark',
      'Sammanfattande bedömning och indikationer'
    ],
    slideType: 'dashboard',
    layout: 'knowit-two-column',
    notes: 'Visualisera data tydligt. Fokusera på insights och actionable takeaways snarare än bara siffror.'
  }
}

function generateDetailSlides(details: string, maxSlides: number): GeneratedSlide[] {
  const detailPoints = details.split('\n').filter(p => p.trim())
  const slides: GeneratedSlide[] = []
  
  // Group points into slides (max 4-5 points per slide för readability)
  const pointsPerSlide = 4
  for (let i = 0; i < detailPoints.length && slides.length < maxSlides; i += pointsPerSlide) {
    const slidePoints = detailPoints.slice(i, i + pointsPerSlide)
    slides.push({
      title: `Viktiga punkter ${slides.length > 0 ? ` (${slides.length + 1})` : ''}`,
      content: slidePoints,
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Fördjupa varje punkt med konkreta exempel och stödjande data när du presenterar.'
    })
  }
  
  return slides
}

function extractTitleFromPurpose(purpose: string): string {
  const lowerPurpose = purpose.toLowerCase()
  if (lowerPurpose.includes('swot')) return 'SWOT-analys'
  if (lowerPurpose.includes('strategi')) return 'Strategianalys'  
  if (lowerPurpose.includes('projekt')) return 'Projektöversikt'
  if (lowerPurpose.includes('status')) return 'Statusrapport'
  if (lowerPurpose.includes('plan')) return 'Handlingsplan'
  if (lowerPurpose.includes('analys')) return 'Analys och insikter'
  return 'Analys och rekommendationer'
}

function getAudienceString(audience: string): string {
  switch (audience) {
    case 'styrelse': return 'För styrelse och ledning'
    case 'kollegor': return 'Teamgenomgång' 
    case 'kunder': return 'Kundpresentation'
    case 'workshop': return 'Workshop-session'
    case 'allmän': return 'Allmän presentation'
    default: return 'Presentation'
  }
}