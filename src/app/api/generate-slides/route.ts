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
  
  // PROFESSIONAL TITLE SLIDE - Knowit Consultant Level
  const titleSlide = {
    title: extractTitleFromPurpose(request.purpose),
    subtitle: `${getAudienceString(request.audience)} - ${new Date().toLocaleDateString('sv-SE')}`,
    content: extractPurposePoints(request.purpose, request.details),
    slideType: 'title' as const,
    layout: 'knowit-title' as const,
    notes: `Öppna starkt: Etablera värdet av denna session. Förväntad längd: ${estimatePresentationTime(request.slideCount)} minuter. Fokus på actionable insights.`
  }
  slides.push(titleSlide)

  // INTELLIGENT CONTENT GENERATION based on purpose analysis
  const contentSlides = generatePurposeDrivenContent(request)
  slides.push(...contentSlides)

  // STRUCTURED CONCLUSION - Always actionable
  const conclusionSlide = {
    title: 'Nästa steg & ansvar',
    content: generateActionableConclusion(request.purpose, request.slideType),
    slideType: 'content' as const,
    layout: 'knowit-standard' as const,
    notes: 'Avsluta definitivt: Varje deltagare ska veta exakt vad de ska göra härnäst. Boka uppföljning innan alla lämnar rummet.'
  }
  slides.push(conclusionSlide)

  return slides.slice(0, request.slideCount)
}

function extractPurposePoints(purpose: string, details: string): string[] {
  const points: string[] = []
  
  // Intelligent purpose extraction
  if (purpose.toLowerCase().includes('analys')) {
    points.push('Djupanalys för datadrivna beslut')
  }
  if (purpose.toLowerCase().includes('strategi')) {
    points.push('Strategiska vägval och prioritering')
  }
  if (purpose.toLowerCase().includes('problem')) {
    points.push('Problemlösning och handlingsplan')
  }
  if (purpose.toLowerCase().includes('status')) {
    points.push('Lägesuppdatering och prognos')
  }
  
  // Add specific context from details
  if (details.trim()) {
    const contextPoints = details.split('\n')
      .filter(line => line.trim().length > 10)
      .slice(0, 2)
      .map(line => line.trim())
    points.push(...contextPoints)
  }
  
  // Default professional context
  if (points.length === 0) {
    points.push('Insiktsdrivet beslutsunderlag')
    points.push('Actionable rekommendationer')
  }
  
  points.push('Knowit Consulting')
  return points.slice(0, 4) // Max 4 points for clean title slide
}

function generatePurposeDrivenContent(request: SlideRequest): GeneratedSlide[] {
  const slides: GeneratedSlide[] = []
  const availableSlots = request.slideCount - 2 // Minus title and conclusion
  
  // INTELLIGENT SLIDE TYPE MAPPING
  if (request.slideType === 'swot') {
    slides.push(generateAdvancedSWOT(request))
    
    if (availableSlots > 1) {
      slides.push({
        title: 'Strategiska implikationer',
        content: [
          'Utnyttja styrkor för att maximera möjligheter',
          'Adressera kritiska svagheter innan hot materialiseras', 
          'Byggstenskonceptet - stärka vad som redan fungerar',
          'Riskmitigering genom proaktiv planering'
        ],
        slideType: 'content',
        layout: 'knowit-standard',
        notes: 'Koppla SWOT-analys till konkreta strategiska beslut. Fokus på implementation, inte bara analys.'
      })
    }
  }
  
  else if (request.slideType === 'situation-complication') {
    slides.push(...generateSituationComplicationFramework(request, availableSlots))
  }
  
  else if (request.slideType === 'agenda') {
    slides.push(generateDynamicAgenda(request))
    
    if (availableSlots > 1) {
      slides.push({
        title: 'Förväntat utfall',
        content: [
          'Tydliga beslutspunkter identifierade',
          'Konsensus kring prioritering och resurser',
          'Konkret handlingsplan med ägare och timelines', 
          'Uppföljningsplan och success metrics'
        ],
        slideType: 'content',
        layout: 'knowit-standard',
        notes: 'Sätt förväntningar högt - denna session ska generera verkligt värde och framsteg.'
      })
    }
  }
  
  else if (request.slideType === 'dashboard') {
    slides.push(generateIntelligentDashboard(request))
    
    if (availableSlots > 1) {
      slides.push({
        title: 'KPI-analys & trender',
        content: [
          'Performance vs målsättning - gap analysis',
          'Trendanalys: vart är vi på väg?',
          'Leading indicators för proaktiv styrning',
          'Benchmark mot branschstandard'
        ],
        slideType: 'content',
        layout: 'knowit-standard',
        notes: 'Fokus på insights från datan, inte bara siffrorna. Vad ska vi göra annorlunda baserat på detta?'
      })
    }
  }
  
  // Custom content generation for unspecified types
  else {
    slides.push(...generateCustomContentSlides(request, availableSlots))
  }
  
  return slides
}

function generateAdvancedSWOT(request: SlideRequest): GeneratedSlide {
  // Intelligent SWOT based on purpose and context
  const contextualSWOT = analyzePurposeForSWOT(request.purpose, request.details)
  
  return {
    title: 'SWOT-analys',
    content: [
      `Styrkor: ${contextualSWOT.strengths}`,
      `Svagheter: ${contextualSWOT.weaknesses}`,
      `Möjligheter: ${contextualSWOT.opportunities}`, 
      `Hot: ${contextualSWOT.threats}`
    ],
    slideType: 'swot',
    layout: 'knowit-standard',
    notes: 'Varje SWOT-kategori ska kopplas till konkreta beslutspunkter. Kvantifiera där möjligt med metrics och deadlines.'
  }
}

function analyzePurposeForSWOT(purpose: string, details: string) {
  const lower = purpose.toLowerCase() + ' ' + details.toLowerCase()
  
  let strengths = 'Etablerad marknadsposition, erfaret team'
  let weaknesses = 'Resursbegränsningar, processineffektivitet'
  let opportunities = 'Teknisk innovation, nya marknadssegment'
  let threats = 'Ökad konkurrens, marknadsvolatilitet'
  
  // Context-aware SWOT generation
  if (lower.includes('ai') || lower.includes('teknologi')) {
    strengths = 'Teknisk expertis, innovationskultur, tidiga adopters'
    opportunities = 'AI-implementation, automatisering, new business models'
    threats = 'Teknisk disruption, cybersäkerhet, kompetensklyftor'
  }
  
  if (lower.includes('kund') || lower.includes('försäljning')) {
    strengths = 'Starka kundrelationer, brand recognition, säljteam'
    opportunities = 'Marknadstillväxt, cross-selling, customer lifetime value'
    threats = 'Kundförlust, prispress, nya competitors'
  }
  
  if (lower.includes('projekt') || lower.includes('implementation')) {
    strengths = 'Projektmetodik, change management, stakeholder buy-in'
    weaknesses = 'Scope creep, resource conflicts, timeline pressure'
    opportunities = 'Scalable processes, lessons learned, best practices'
  }
  
  return { strengths, weaknesses, opportunities, threats }
}

function generateSituationComplicationFramework(request: SlideRequest, availableSlots: number): GeneratedSlide[] {
  const slides: GeneratedSlide[] = []
  
  // Situation slide
  slides.push({
    title: 'Situation - Var står vi idag?',
    content: generateSituationContent(request.purpose, request.details),
    slideType: 'content',
    layout: 'knowit-standard',
    notes: 'Etablera baseline med hårda facts. Alla i rummet ska ha samma utgångspunkt innan vi går vidare.'
  })
  
  if (availableSlots > 1) {
    // Complication slide
    slides.push({
      title: 'Utmaning - Vad hindrar oss?',
      content: generateComplicationContent(request.purpose, request.details),
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Definiera the burning platform - varför måste vi agera NU? Konsekvenserna av status quo ska vara kristallklara.'
    })
  }
  
  if (availableSlots > 2) {
    // Question/Answer slide
    slides.push({
      title: 'Lösning - Vad ska vi göra?',
      content: [
        'Kortsiktiga åtgärder (0-3 månader)',
        'Medellångmål och milestones (3-12 månader)',
        'Långsiktig vision och målbild (1-3 år)',
        'Kritiska success factors och KPI:er'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Konkret handlingsplan med tydliga ägare och deadlines. Varje punkt ska vara SMART (Specific, Measurable, Achievable, Relevant, Time-bound).'
    })
  }
  
  return slides.slice(0, availableSlots)
}

function generateSituationContent(purpose: string, details: string): string[] {
  const content = []
  const context = purpose.toLowerCase() + ' ' + details.toLowerCase()
  
  if (context.includes('projekt')) {
    content.push('Projektmål och scope - ursprungliga målsättningar')
    content.push('Aktuell status - deliverables, timeline, budget')
    content.push('Team och resurser - kapacitet och kompetens')
    content.push('Stakeholders - förväntningar och engagement')
  } else if (context.includes('försäljning') || context.includes('marknad')) {
    content.push('Marknadsposition - vårt läge vs konkurrenter')
    content.push('Säljresultat - pipeline, conversion, trends')
    content.push('Kundportfölj - retention, satisfaction, growth')
    content.push('Marknadstrender - opportunities och hot')
  } else {
    content.push('Nuvarande prestanda - KPI:er och trender')
    content.push('Organisationens resurser - team, kapacitet, kompetens')
    content.push('Pågående initiativ - status och resultat')
    content.push('Intressentförväntningar - krav och målsättningar')
  }
  
  return content
}

function generateComplicationContent(purpose: string, details: string): string[] {
  const content = []
  const context = purpose.toLowerCase() + ' ' + details.toLowerCase()
  
  if (context.includes('problem') || context.includes('utmaning')) {
    content.push('Kritiska flaskhalsar som blockerar framsteg')
    content.push('Riskfaktorer med hög sannolikhet och impact')
    content.push('Tidskritiska beslut - deadline approaching')
    content.push('Resurskonflikter - competing priorities')
  } else {
    content.push('Performance gaps - var missar vi target?')
    content.push('Systemproblem som skapar ineffektivitet')  
    content.push('Marknadstryck - competitive threats')
    content.push('Internpolitik - alignment challenges')
  }
  
  return content
}

function generateDynamicAgenda(request: SlideRequest): GeneratedSlide {
  const totalTime = estimatePresentationTime(request.slideCount)
  const mainContentTime = Math.max(15, totalTime - 15)
  
  const content = [
    'Introduktion och syfte (5 min)',
    `Genomgång och analys (${mainContentTime} min)`,
    'Diskussion och frågor (5 min)', 
    'Sammanfattning och next steps (5 min)'
  ]
  
  // Add specific agenda items based on slide type
  if (request.slideType === 'swot') {
    content[1] = `SWOT-analys och strategiska implikationer (${mainContentTime} min)`
  } else if (request.slideType === 'dashboard') {
    content[1] = `KPI-genomgång och trendanalys (${mainContentTime} min)`
  }
  
  return {
    title: 'Agenda',
    content,
    slideType: 'agenda',
    layout: 'knowit-standard',
    notes: `Total tid: ${totalTime} minuter. Håll fokus - varje punkt ska generera actionable insights. Avsätt tid för konkreta beslut i slutet.`
  }
}

function estimatePresentationTime(slideCount: number): number {
  // Professional consulting presentation timing
  const baseTime = 10 // Opening
  const slideTime = slideCount * 4 // 4 min per slide average
  const discussionTime = Math.max(10, slideCount * 2) // Discussion scales with content
  return baseTime + slideTime + discussionTime
}

function generateIntelligentDashboard(request: SlideRequest): GeneratedSlide {
  const context = request.purpose.toLowerCase() + ' ' + request.details.toLowerCase()
  let kpis = []
  
  if (context.includes('försäljning') || context.includes('kund')) {
    kpis = [
      'Revenue Growth: Monthly trend vs target (+/-%) ',
      'Customer Acquisition: New customers vs churn rate',
      'Pipeline Health: Conversion rate och genomsnittlig deal size',
      'Customer Satisfaction: NPS score och retention %'
    ]
  } else if (context.includes('projekt')) {
    kpis = [
      'Schedule Performance: On-time delivery vs planned milestones',
      'Budget Performance: Actual spend vs allocated budget (%)',
      'Quality Metrics: Defect rate och stakeholder approval',
      'Resource Utilization: Team capacity vs workload'
    ]
  } else if (context.includes('produkt') || context.includes('utveckling')) {
    kpis = [
      'User Engagement: DAU/MAU och session duration',
      'Product Quality: Bug reports och resolution time',  
      'Feature Adoption: Usage rate för nya releases',
      'Development Velocity: Story points per sprint'
    ]
  } else {
    kpis = [
      'Operational Efficiency: Throughput vs resource cost',
      'Quality Indicators: Error rate och customer complaints',
      'Financial Performance: ROI och budget variance',
      'Team Performance: Productivity metrics och satisfaction'
    ]
  }
  
  return {
    title: 'KPI Dashboard',
    content: kpis,
    slideType: 'dashboard',
    layout: 'knowit-two-column',
    notes: 'Varje KPI ska ha: current value, target, trend direction, och recommended action. Fokus på vad siffrorna BETYDER för business.'
  }
}

function generateCustomContentSlides(request: SlideRequest, availableSlots: number): GeneratedSlide[] {
  const slides: GeneratedSlide[] = []
  
  // Analyze purpose to create relevant content
  const purpose = request.purpose.toLowerCase()
  const details = request.details.toLowerCase()
  
  if (purpose.includes('analys') || purpose.includes('undersökning')) {
    slides.push({
      title: 'Analysresultat & insikter',
      content: [
        'Nyckeldata och trender - vad ser vi?',
        'Mönster och anomalier - vad sticker ut?',
        'Root cause analysis - varför ser det ut så här?',
        'Implikationer för business - vad betyder det?'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Data berättar en historia - hjälp audience förstå narrativet och implikationerna.'
    })
  }
  
  if (purpose.includes('rekommendation') || purpose.includes('förslag')) {
    slides.push({
      title: 'Rekommendationer',
      content: [
        'Prioriterade åtgärder - vad ska vi göra först?',
        'Implementation approach - hur genomför vi det?',
        'Resource requirements - vad behöver vi?',
        'Success metrics - hur mäter vi framgång?'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Varje rekommendation ska vara SMART och ha en tydlig ägare med deadline.'
    })
  }
  
  // Add detailed content if specified
  if (request.details.trim() && availableSlots > slides.length) {
    const detailSlides = generateDetailSlides(request.details, availableSlots - slides.length)
    slides.push(...detailSlides)
  }
  
  // Default content slide if nothing else fits
  if (slides.length === 0) {
    slides.push({
      title: 'Viktiga punkter',
      content: [
        'Kritisk situation som kräver uppmärksamhet',
        'Analys av alternativa lösningar och konsekvenser',
        'Rekommenderad approach baserad på data',
        'Implementation plan med tydliga milestones'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Standard consulting framework: Problem → Analysis → Solution → Implementation'
    })
  }
  
  return slides.slice(0, availableSlots)
}

function generateActionableConclusion(purpose: string, slideType: string): string[] {
  const conclusion = []
  
  // Purpose-driven conclusions
  if (purpose.toLowerCase().includes('beslut')) {
    conclusion.push('Beslutspunkter som kräver omedelbar action')
    conclusion.push('Ägare och ansvar för varje beslut')
    conclusion.push('Timeline för implementation och uppföljning')
    conclusion.push('Success criteria och mätmetoder')
  } else if (purpose.toLowerCase().includes('status')) {
    conclusion.push('Kritiska actions för att hålla timeline')
    conclusion.push('Risker som måste monitoras och mitigeras')  
    conclusion.push('Resource needs och eskaleringspunkter')
    conclusion.push('Nästa rapporteringstillfälle och agenda')
  } else {
    // Default professional conclusion
    conclusion.push('Prioriterade nästa steg (första 30 dagarna)')
    conclusion.push('Ansvariga personer och deadlines')
    conclusion.push('Success metrics och uppföljningsplan')
    conclusion.push('Kommunikation till organisationen')
  }
  
  return conclusion
}

function generateDetailSlides(details: string, maxSlides: number): GeneratedSlide[] {
  const detailPoints = details.split('\n').filter(p => p.trim() && p.trim().length > 5)
  const slides: GeneratedSlide[] = []
  
  if (detailPoints.length === 0) return slides
  
  // Intelligent grouping - max 4 points per slide for readability
  const pointsPerSlide = 4
  
  for (let i = 0; i < detailPoints.length && slides.length < maxSlides; i += pointsPerSlide) {
    const slidePoints = detailPoints.slice(i, i + pointsPerSlide)
      .map(point => enhanceDetailPoint(point))
    
    const slideNumber = slides.length + 1
    const title = slideNumber === 1 ? 'Detaljerad genomgång' : `Fortsättning (del ${slideNumber})`
    
    slides.push({
      title,
      content: slidePoints,
      slideType: 'content',
      layout: 'knowit-standard',
      notes: `Expandera varje punkt med konkreta exempel, metrics och deadlines. Säkerställ att audience förstår actionability och impact.`
    })
  }
  
  return slides
}

function enhanceDetailPoint(point: string): string {
  // Clean up and enhance detail points for professional presentation
  let enhanced = point.trim()
  
  // Remove bullet points if they exist
  enhanced = enhanced.replace(/^[•\-\*]\s*/, '')
  
  // Capitalize first letter
  enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1)
  
  // Ensure it ends properly
  if (!enhanced.match(/[.!?:]$/)) {
    enhanced += ''
  }
  
  return enhanced
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