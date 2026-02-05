'use client'

import { Download, FileText } from 'lucide-react'

interface SlideData {
  title: string
  subtitle?: string
  content: string[]
  slideType: 'title' | 'content' | 'swot' | 'agenda' | 'dashboard'
  layout: 'knowit-standard' | 'knowit-title' | 'knowit-two-column'
  notes?: string
}

interface Props {
  slides: SlideData[]
  onExport?: () => void
}

export function KnowitSlideRenderer({ slides, onExport }: Props) {
  
  const exportToPowerPoint = async () => {
    try {
      // Import PptxGenJS dynamically
      const PptxGenJS = (await import('pptxgenjs')).default
      const pptx = new PptxGenJS()
      
      // Set presentation metadata - EXACT KNOWIT STANDARDS
      pptx.author = 'Knowit Consultant'
      pptx.company = 'Knowit'
      pptx.title = slides[0]?.title || 'Knowit Presentation'
      pptx.subject = 'Professional Consulting Presentation'

      slides.forEach((slide, index) => {
        const pptxSlide = pptx.addSlide()
        
        // EXACT KNOWIT DESIGN: Title with proper positioning and colors
        pptxSlide.addText(slide.title, {
          x: 0.8, y: 0.6, w: 8.4, h: 1.2,
          fontSize: slide.slideType === 'title' ? 36 : 32, 
          bold: true, 
          color: '1E3A8A',  // Knowit deep blue
          fontFace: 'Arial',
          align: 'left',
          valign: 'top'
        })
        
        // Subtitle with proper Knowit styling
        if (slide.subtitle) {
          pptxSlide.addText(slide.subtitle, {
            x: 0.8, y: slide.slideType === 'title' ? 1.9 : 1.6, 
            w: 8.4, h: 0.8,
            fontSize: slide.slideType === 'title' ? 24 : 20,
            color: '6B7280',  // Medium gray
            fontFace: 'Arial',
            align: 'left'
          })
        }
        
        // Content with EXACT Knowit bullet styling
        if (slide.content.length > 0) {
          let yPos = slide.subtitle ? 2.8 : 2.4
          if (slide.slideType === 'title') yPos = 3.2
          
          slide.content.forEach((item, bulletIndex) => {
            // Orange bullet point (Knowit brand color)
            pptxSlide.addShape('circle', {
              x: 0.8, y: yPos + (bulletIndex * 0.6) + 0.1, 
              w: 0.15, h: 0.15,
              fill: { color: 'F97316' }  // Knowit orange
            })
            
            // Bullet text with proper spacing
            pptxSlide.addText(item, {
              x: 1.1, y: yPos + (bulletIndex * 0.6), 
              w: 7.8, h: 0.5,
              fontSize: 18,
              color: '1F2937',  // Dark gray
              fontFace: 'Arial',
              align: 'left',
              valign: 'top'
            })
          })
        }
        
        // Page number (Knowit style)
        pptxSlide.addText(`${index + 1}`, {
          x: 8.8, y: 6.8, w: 1, h: 0.3,
          fontSize: 12, color: '6B7280',
          fontFace: 'Arial', align: 'right'
        })
        
        // EXACT KNOWIT BRAND STRIP - Gradient footer
        pptxSlide.addShape('rect', {
          x: 0, y: 7.2, w: 10, h: 0.3,
          fill: {
            type: 'gradient',
            colors: [
              { color: '1E3A8A', position: 0 },    // Deep blue
              { color: '6366F1', position: 50 },   // Purple  
              { color: 'F97316', position: 100 }   // Orange
            ],
            angle: 90
          }
        })
      })

      // Generate and download PPTX file
      const fileName = `Knowit_Presentation_${new Date().toISOString().split('T')[0]}.pptx`
      await pptx.writeFile({ fileName })
      
      if (onExport) onExport()
    } catch (error) {
      console.error('PPTX generation error:', error)
      alert('PowerPoint export misslyckades. Kontakta support.')
    }
  }

  if (slides.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Inga slides att visa ännu</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Export Header - EXACT KNOWIT STYLE */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900" style={{fontFamily: 'Arial, sans-serif'}}>
          Knowit Presentation ({slides.length} slides)
        </h2>
        <button
          onClick={exportToPowerPoint}
          className="px-6 py-3 text-white rounded-lg flex items-center gap-3 transition-all hover:shadow-lg font-semibold"
          style={{
            background: 'linear-gradient(135deg, #1E3A8A 0%, #6366F1 100%)',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <Download className="w-5 h-5" />
          Exportera PowerPoint
        </button>
      </div>

      {/* Slides - EXACT KNOWIT DESIGN */}
      <div className="space-y-12">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="bg-white shadow-2xl overflow-hidden border border-gray-100 rounded-lg"
            style={{
              fontFamily: 'Arial, sans-serif',
              aspectRatio: '16/9',
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {/* EXACT KNOWIT HEADER */}
            <div className="relative bg-white px-16 pt-12 pb-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 
                    className="font-bold mb-3 text-left"
                    style={{
                      fontSize: slide.slideType === 'title' ? '36px' : '32px',
                      color: '#1E3A8A',
                      lineHeight: '1.2'
                    }}
                  >
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p 
                      className="font-normal"
                      style={{
                        fontSize: slide.slideType === 'title' ? '24px' : '20px',
                        color: '#6B7280',
                        lineHeight: '1.3'
                      }}
                    >
                      {slide.subtitle}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span 
                    className="px-3 py-1 rounded"
                    style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      backgroundColor: '#F3F4F6'
                    }}
                  >
                    {index + 1}/{slides.length}
                  </span>
                </div>
              </div>
            </div>

            {/* EXACT KNOWIT CONTENT LAYOUT */}
            <div className="px-16 pb-12 min-h-[400px]">
              {slide.slideType === 'swot' && (
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4" style={{color: '#1E3A8A'}}>STYRKOR</h3>
                      <div className="space-y-3">
                        {slide.content.filter(item => item.toLowerCase().includes('styrk')).map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#F97316'}}></div>
                            <p className="text-lg leading-relaxed" style={{color: '#1F2937'}}>
                              {item.replace(/^styrk[a-zA-Z]*:?\s*/i, '')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4" style={{color: '#1E3A8A'}}>MÖJLIGHETER</h3>
                      <div className="space-y-3">
                        {slide.content.filter(item => item.toLowerCase().includes('möjlighet')).map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#F97316'}}></div>
                            <p className="text-lg leading-relaxed" style={{color: '#1F2937'}}>
                              {item.replace(/^möjlighet[a-zA-Z]*:?\s*/i, '')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4" style={{color: '#1E3A8A'}}>SVAGHETER</h3>
                      <div className="space-y-3">
                        {slide.content.filter(item => item.toLowerCase().includes('svagh')).map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#F97316'}}></div>
                            <p className="text-lg leading-relaxed" style={{color: '#1F2937'}}>
                              {item.replace(/^svagh[a-zA-Z]*:?\s*/i, '')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4" style={{color: '#1E3A8A'}}>HOT</h3>
                      <div className="space-y-3">
                        {slide.content.filter(item => item.toLowerCase().includes('hot')).map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#F97316'}}></div>
                            <p className="text-lg leading-relaxed" style={{color: '#1F2937'}}>
                              {item.replace(/^hot:?\s*/i, '')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {slide.slideType === 'agenda' && (
                <div className="space-y-6">
                  {slide.content.map((item, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                        style={{backgroundColor: '#1E3A8A'}}
                      >
                        {i + 1}
                      </div>
                      <p className="text-xl leading-relaxed flex-1" style={{color: '#1F2937'}}>{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {slide.slideType === 'dashboard' && (
                <div className="grid grid-cols-2 gap-8">
                  {slide.content.map((item, i) => (
                    <div key={i} className="p-6 rounded-lg" style={{backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB'}}>
                      <div className="flex items-start gap-4">
                        <div className="w-4 h-4 rounded-full mt-1 flex-shrink-0" style={{backgroundColor: '#F97316'}}></div>
                        <p className="text-lg leading-relaxed" style={{color: '#1F2937'}}>{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(slide.slideType === 'content' || slide.slideType === 'title') && (
                <div className="space-y-6">
                  {slide.content.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-4 h-4 rounded-full mt-1 flex-shrink-0" style={{backgroundColor: '#F97316'}}></div>
                      <p className="text-xl leading-relaxed flex-1" style={{color: '#1F2937'}}>{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Speaker Notes - Professional Style */}
              {slide.notes && (
                <div className="mt-12 pt-6" style={{borderTop: '1px solid #E5E7EB'}}>
                  <h4 className="text-sm font-semibold mb-3" style={{color: '#6B7280'}}>Speaker Notes:</h4>
                  <p className="text-sm leading-relaxed" style={{color: '#9CA3AF'}}>{slide.notes}</p>
                </div>
              )}
            </div>

            {/* EXACT KNOWIT BRAND STRIP */}
            <div 
              className="h-2"
              style={{
                background: 'linear-gradient(90deg, #1E3A8A 0%, #6366F1 50%, #F97316 100%)'
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}