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

export async function generateSlidesWithOpus(request: SlideRequest): Promise<GeneratedSlide[]> {
  // Use Claude Opus 4.5 for high-quality slide generation
  const prompt = createSlideGenerationPrompt(request)
  
  try {
    const response = await fetch('/api/generate-slides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: 'opus', // Force Opus usage
        request
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to generate slides')
    }
    
    const data = await response.json()
    return data.slides
  } catch (error) {
    console.error('Slide generation error:', error)
    // Fallback to local generation
    return generateSlidesLocally(request)
  }
}

function createSlideGenerationPrompt(request: SlideRequest): string {
  return `Du är en senior Knowit-konsult som skapar presentations av högsta professionella standard.

KNOWIT DESIGN SPECIFICATION (EXAKT FÖLJ):
- Färger: #1E3A8A (titles), #F97316 (accent), #1F2937 (text)
- Font: Arial genomgående, 32px titles, 18px content
- Layout: Ren, strukturerad, max 4 bullet points per slide
- Brand strip: Gradient blue→purple→orange i footer
- Bullet style: Orange cirklar (#F97316)

PURPOSE-DRIVEN CONTENT (KRITISKT):
Syfte: "${request.purpose}"
Målgrupp: ${request.audience} 
Kontext: ${request.details}

CONSULTANT-LEVEL KRAV:
✓ Varje slide måste ha actionable business value
✓ Konkreta insights, inte generiska floskler
✓ Metrics, timelines, ansvar tydligt specificerat
✓ Strukturerad enligt proven consulting frameworks
✓ Språk: Professionell svenska, presist och kraftfullt

SLIDE TYPES MAPPING:
- SWOT: Strategiska implikationer och actions
- Situation-Complication: Problem → Analysis → Solution
- Agenda: Tidseffektiv struktur med outcomes
- Dashboard: KPIs med insights och recommendations

OUTPUT FORMAT (EXAKT):
{
  "slides": [
    {
      "title": "Kraftfull titel som fångar essensen",
      "subtitle": "Kontext/målgrupp om relevant",
      "content": ["Actionable insight 1", "Concrete point 2", "Measurable outcome 3"],
      "slideType": "title|content|swot|agenda|dashboard", 
      "layout": "knowit-standard",
      "notes": "Speaker notes med implementation guidance"
    }
  ]
}

LEVERANS: ${request.slideCount} slides som Adam blir proud av - consultant-quality content som driver real business impact!`
}

function generateSlidesLocally(request: SlideRequest): GeneratedSlide[] {
  // Professional Knowit-standard fallback generation
  console.log('🔧 Using enhanced local slide generation')
  
  // Reuse the improved API logic
  return generateKnowitSlides(request)
}

// Import the enhanced functions from API route logic
function generateKnowitSlides(request: SlideRequest): GeneratedSlide[] {
  const slides: GeneratedSlide[] = []
  
  // PROFESSIONAL TITLE SLIDE
  slides.push({
    title: extractTitleFromPurpose(request.purpose),
    subtitle: `${getAudienceString(request.audience)} - ${new Date().toLocaleDateString('sv-SE')}`,
    content: extractPurposePoints(request.purpose, request.details),
    slideType: 'title',
    layout: 'knowit-title',
    notes: `Öppna starkt med tydligt värde. Förväntad längd: ${Math.max(30, request.slideCount * 4)} min.`
  })

  // CONTEXT-DRIVEN CONTENT GENERATION
  const availableSlots = request.slideCount - 2
  if (request.slideType === 'swot') {
    slides.push(generateAdvancedSWOT(request))
  } else if (request.slideType === 'situation-complication') {
    slides.push(...generateSituationComplication(request, availableSlots))
  } else if (request.slideType === 'agenda') {
    slides.push(generateProfessionalAgenda(request))
  } else if (request.slideType === 'dashboard') {
    slides.push(generateContextualDashboard(request))
  } else {
    slides.push(...generateCustomContent(request, availableSlots))
  }

  // ACTIONABLE CONCLUSION
  slides.push({
    title: 'Nästa steg & ansvar',
    content: generateActionableNextSteps(request.purpose),
    slideType: 'content',
    layout: 'knowit-standard',
    notes: 'Säkerställ att varje deltagare har konkreta åtgärder med deadlines.'
  })

  return slides.slice(0, request.slideCount)
}

function extractPurposePoints(purpose: string, details: string): string[] {
  const points: string[] = []
  
  if (purpose.toLowerCase().includes('analys')) points.push('Datadrivet beslutsunderlag')
  if (purpose.toLowerCase().includes('strategi')) points.push('Strategisk riktning och prioritering')
  if (purpose.toLowerCase().includes('problem')) points.push('Lösningsfokuserad genomgång')
  
  // Add context from details
  if (details.trim()) {
    const relevantDetails = details.split('\n').filter(line => line.trim().length > 10).slice(0, 2)
    points.push(...relevantDetails)
  }
  
  if (points.length === 0) points.push('Actionable insights och rekommendationer')
  points.push('Knowit Consulting')
  
  return points.slice(0, 4)
}

function generateAdvancedSWOT(request: SlideRequest): GeneratedSlide {
  return {
    title: 'SWOT-analys',
    content: [
      'Styrkor: Etablerad position, kompetent team, beprövade processer',
      'Svagheter: Resursbegränsningar, teknisk skuld, kompetensglapp', 
      'Möjligheter: Marknadstillväxt, teknisk innovation, strategiska partnerskap',
      'Hot: Ökad konkurrens, regulatoriska förändringar, marknadsvolatilitet'
    ],
    slideType: 'swot',
    layout: 'knowit-standard',
    notes: 'Koppla varje SWOT-kategori till konkreta åtgärder och beslutspunkter.'
  }
}

function generateSituationComplication(request: SlideRequest, slots: number): GeneratedSlide[] {
  const slides = []
  
  slides.push({
    title: 'Situation - Nuläge',
    content: [
      'Marknadsposition och konkurrentanalys',
      'Organisationens resurser och kapacitet',
      'Pågående initiativ och status',
      'Intressentförväntningar och krav'
    ],
    slideType: 'content',
    layout: 'knowit-standard',
    notes: 'Etablera gemensam förståelse med hårda facts och data.'
  })
  
  if (slots > 1) {
    slides.push({
      title: 'Utmaning - Kritiska problemområden',
      content: [
        'Performance gaps som hindrar måluppfyllelse',
        'Systembrister och processineffektivitet',
        'Riskfaktorer med hög business impact',
        'Tidskritiska beslutspunkter som närmar sig'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Definiera the burning platform - varför måste vi agera NU?'
    })
  }
  
  return slides.slice(0, slots)
}

function generateProfessionalAgenda(request: SlideRequest): GeneratedSlide {
  const totalTime = Math.max(30, request.slideCount * 4)
  const mainTime = totalTime - 15
  
  return {
    title: 'Agenda',
    content: [
      'Introduktion och målsättning (5 min)',
      `Genomgång och analys (${mainTime} min)`,
      'Diskussion och beslutspunkter (5 min)',
      'Sammanfattning och åtgärdsplan (5 min)'
    ],
    slideType: 'agenda',
    layout: 'knowit-standard',
    notes: `Total tid: ${totalTime} min. Fokus på konkreta beslut och åtgärder.`
  }
}

function generateContextualDashboard(request: SlideRequest): GeneratedSlide {
  return {
    title: 'KPI Dashboard',
    content: [
      'Performance vs Target: Status och trendanalys',
      'Leading Indicators: Prediktiva metrics för framtid',
      'Benchmarking: Position vs konkurrenter/branschstandard',
      'Action Items: Åtgärder baserade på datainsights'
    ],
    slideType: 'dashboard',
    layout: 'knowit-standard',
    notes: 'Fokus på vad datan berättar och vilka actions den driver.'
  }
}

function generateCustomContent(request: SlideRequest, slots: number): GeneratedSlide[] {
  const slides = []
  
  slides.push({
    title: 'Analys och insights',
    content: [
      'Nyckeldata och identifierade mönster',
      'Root cause analysis av kritiska issues',
      'Benchmark mot best practice',
      'Implikationer för organisation och strategi'
    ],
    slideType: 'content',
    layout: 'knowit-standard',
    notes: 'Varje punkt ska leda till en konkret rekommendation eller åtgärd.'
  })
  
  return slides.slice(0, slots)
}

function generateActionableNextSteps(purpose: string): string[] {
  const steps = []
  
  if (purpose.toLowerCase().includes('beslut')) {
    steps.push('Kritiska beslutspunkter med deadlines')
    steps.push('Beslutsfattare och eskaleringsvägar')
  } else {
    steps.push('Prioriterade åtgärder (0-30 dagar)')
    steps.push('Ansvariga personer och leveranser')
  }
  
  steps.push('Success metrics och uppföljningsplan')
  steps.push('Nästa möte och kommunikationsplan')
  
  return steps
}

function extractTitleFromPurpose(purpose: string): string {
  const lowerPurpose = purpose.toLowerCase()
  if (lowerPurpose.includes('swot')) return 'SWOT-analys'
  if (lowerPurpose.includes('strategi')) return 'Strategianalys'
  if (lowerPurpose.includes('projekt')) return 'Projektöversikt'
  if (lowerPurpose.includes('status')) return 'Statusrapport'
  if (lowerPurpose.includes('plan')) return 'Handlingsplan'
  return 'Analys och rekommendationer'
}

function getAudienceString(audience: string): string {
  switch (audience) {
    case 'styrelse': return 'För styrelse och ledning'
    case 'kollegor': return 'Teamgenomgång'
    case 'kunder': return 'Kundpresentation'  
    case 'workshop': return 'Workshop-session'
    default: return 'Presentation'
  }
}