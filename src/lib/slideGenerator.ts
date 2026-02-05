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
  return `Du är expert på Knowit-presentationer och använder ENDAST Knowits officiella mall.

KNOWIT DESIGN RULES (ABSOLUT FÖLJ):
- Titel: Stor, fet, vänsterställd
- Innehåll: Bullet points, geometriska ikoner (inte emojis)  
- Färger: Knowit blå/lila theme colors, sparsam peach accent
- Layout: Clean, professionell, inte för mycket text per slide
- Font: Arial konsekvent
- Footer: Knowit brand strip

UPPDRAG: Skapa ${request.slideCount} slides för: "${request.purpose}"

MÅLGRUPP: ${request.audience}
TYP: ${request.slideType}
DETALJER: ${request.details}
${request.inspiration ? `INSPIRATION: ${request.inspiration}` : ''}

KRAV:
- Svensk text
- Actionable insights
- Tydlig struktur enligt Knowit-standard
- Varje slide ska ha praktiskt värde
- Professionell konsultnivå

Leverera JSON-struktur med exakt denna format:
{
  "slides": [
    {
      "title": "Titel här",
      "subtitle": "Undertitel (valfritt)",  
      "content": ["Bullet punkt 1", "Bullet punkt 2", "..."],
      "slideType": "title|content|swot|agenda|dashboard",
      "layout": "knowit-standard",
      "notes": "Speaker notes"
    }
  ]
}

GÖR DET PROFESSIONELLT ENLIGT KNOWIT-MALLEN!`
}

function generateSlidesLocally(request: SlideRequest): GeneratedSlide[] {
  // Fallback local generation following Knowit template
  const slides: GeneratedSlide[] = []
  
  // Title slide
  slides.push({
    title: extractTitleFromPurpose(request.purpose),
    subtitle: getAudienceString(request.audience),
    content: [
      `Syfte: ${request.purpose}`,
      `Datum: ${new Date().toLocaleDateString('sv-SE')}`,
      'Knowit Ascend'
    ],
    slideType: 'title',
    layout: 'knowit-title',
    notes: 'Introduktion och syfte med presentationen'
  })
  
  // Generate content based on type
  if (request.slideType === 'swot') {
    slides.push({
      title: 'SWOT-analys',
      content: [
        'Styrkor: Marknadsposition, expertis, team',
        'Svagheter: Resurser, processer, teknik', 
        'Möjligheter: AI, nya marknader, partnerskap',
        'Hot: Konkurrens, reglering, ekonomi'
      ],
      slideType: 'swot',
      layout: 'knowit-standard',
      notes: 'Genomgå varje kategori systematiskt'
    })
  }
  
  if (request.slideType === 'situation-complication') {
    slides.push({
      title: 'Situation',
      content: [
        'Nuvarande marknadsläge och trender',
        'Organisationens position och resurser',
        'Pågående initiativ och resultat'
      ],
      slideType: 'content',
      layout: 'knowit-standard',
      notes: 'Etablera baseline och kontext'
    })
    
    slides.push({
      title: 'Utmaning',
      content: [
        'Identifierade problemområden',
        'Riskfaktorer som måste adresseras',
        'Tidskritiska beslutspunkter'
      ],
      slideType: 'content', 
      layout: 'knowit-standard',
      notes: 'Fokus på kritiska utmaningar som kräver handling'
    })
  }
  
  if (request.slideType === 'agenda') {
    slides.push({
      title: 'Agenda',
      content: [
        'Välkomst och syfte (5 min)',
        'Genomgång huvudpunkter (20 min)',
        'Diskussion och frågor (10 min)',
        'Nästa steg (5 min)'
      ],
      slideType: 'agenda',
      layout: 'knowit-standard',
      notes: 'Håll tidsramarna - total 40 minuter'
    })
  }
  
  // Add details if provided
  if (request.details.trim()) {
    const detailPoints = request.details.split('\n').filter(p => p.trim())
    if (detailPoints.length > 0) {
      slides.push({
        title: 'Viktiga punkter',
        content: detailPoints.slice(0, 5), // Max 5 points per slide
        slideType: 'content',
        layout: 'knowit-standard',
        notes: 'Fördjupa varje punkt med exempel och data'
      })
    }
  }
  
  // Summary slide
  slides.push({
    title: 'Sammanfattning & nästa steg',
    content: [
      'Nyckelinsikter från analysen',
      'Prioriterade handlingsområden',
      'Konkreta nästa steg med tidplan',
      'Uppföljning och ansvar'
    ],
    slideType: 'content',
    layout: 'knowit-standard',
    notes: 'Avsluta med tydliga åtgärder och ansvar'
  })
  
  return slides.slice(0, request.slideCount)
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