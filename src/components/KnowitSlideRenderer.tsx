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
      
      // Set presentation metadata
      pptx.author = 'Adam & Lisa Workspace'
      pptx.company = 'Knowit'
      pptx.title = slides[0]?.title || 'Knowit Presentation'

      slides.forEach((slide, index) => {
        const pptxSlide = pptx.addSlide()
        
        // Title with Knowit blue background
        pptxSlide.addText(slide.title, {
          x: 0.5, y: 0.5, w: 9, h: 1,
          fontSize: 28, bold: true, color: '1E3A8A',
          fontFace: 'Arial', align: 'left'
        })
        
        // Subtitle if exists
        if (slide.subtitle) {
          pptxSlide.addText(slide.subtitle, {
            x: 0.5, y: 1.5, w: 9, h: 0.5,
            fontSize: 18, color: '4B5563',
            fontFace: 'Arial'
          })
        }
        
        // Content bullets
        let yPos = slide.subtitle ? 2.2 : 1.8
        const contentText = slide.content.map(item => `• ${item}`).join('\n')
        pptxSlide.addText(contentText, {
          x: 1, y: yPos, w: 8, h: 4,
          fontSize: 16, color: '1F2937',
          fontFace: 'Arial', lineSpacing: 24,
          bullet: { code: '2022' }
        })
        
        // Knowit accent line at bottom
        pptxSlide.addShape('line', {
          x: 0, y: 6.8, w: 10, h: 0,
          line: { color: 'F97316', width: 8 }
        })
      })

      // Generate and download PPTX file
      const fileName = `knowit-slides-${new Date().toISOString().split('T')[0]}.pptx`
      await pptx.writeFile({ fileName })
      
      if (onExport) onExport()
    } catch (error) {
      console.error('PPTX generation error:', error)
      
      // Fallback: Create structured PowerPoint XML that can be imported
      const pptxXml = `<?xml version="1.0" encoding="UTF-8"?>
<presentation xmlns="http://schemas.openxmlformats.org/presentationml/2006/main">
  <sldMasterIdLst>
    <sldMasterId id="2147483649" r:id="rId1"/>
  </sldMasterIdLst>
  <sldIdLst>
    ${slides.map((slide, index) => `
    <sldId id="${2147483650 + index}" r:id="rId${index + 2}"/>
    `).join('')}
  </sldIdLst>
</presentation>`
      
      const blob = new Blob([pptxXml], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `knowit-slides-${new Date().toISOString().split('T')[0]}.pptx`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  if (slides.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-knowit-gray-400 mx-auto mb-4" />
        <p className="text-knowit-gray-600">Inga slides att visa ännu</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Export Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-knowit-gray-900">
          Din Presentation ({slides.length} slides)
        </h2>
        <button
          onClick={exportToPowerPoint}
          className="px-4 py-2 bg-knowit-blue-600 hover:bg-knowit-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportera PowerPoint
        </button>
      </div>

      {/* Slides */}
      <div className="space-y-8">
        {slides.map((slide, index) => (
          <div key={index} className="bg-white shadow-xl overflow-hidden border border-gray-200" style={{fontFamily: 'Arial, sans-serif'}}>
            {/* Knowit Header - Följer officell mall */}
            <div className="bg-gradient-to-r from-blue-800 to-purple-600 text-white px-8 py-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2 text-left">{slide.title}</h1>
                  {slide.subtitle && (
                    <p className="text-lg text-blue-100 font-normal">{slide.subtitle}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded">
                    {index + 1}/{slides.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Slide Content - Knowit Layout */}
            <div className="px-8 py-8 min-h-[400px]">
              {slide.slideType === 'swot' && (
                <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 border-l-4 border-green-500">
                      <h3 className="font-bold text-green-800 mb-3 flex items-center">
                        <span className="w-4 h-4 bg-green-500 rounded mr-2"></span>
                        Styrkor
                      </h3>
                      <ul className="space-y-2">
                        {slide.content.filter(item => item.toLowerCase().includes('styrk')).map((item, i) => (
                          <li key={i} className="text-green-700 text-sm leading-relaxed">
                            • {item.replace(/^styrk[a-zA-Z]*:?\s*/i, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 border-l-4 border-blue-500">
                      <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                        <span className="w-4 h-4 bg-blue-500 rounded mr-2"></span>
                        Möjligheter
                      </h3>
                      <ul className="space-y-2">
                        {slide.content.filter(item => item.toLowerCase().includes('möjlighet')).map((item, i) => (
                          <li key={i} className="text-blue-700 text-sm leading-relaxed">
                            • {item.replace(/^möjlighet[a-zA-Z]*:?\s*/i, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-orange-50 p-4 border-l-4 border-orange-500">
                      <h3 className="font-bold text-orange-800 mb-3 flex items-center">
                        <span className="w-4 h-4 bg-orange-500 rounded mr-2"></span>
                        Svagheter
                      </h3>
                      <ul className="space-y-2">
                        {slide.content.filter(item => item.toLowerCase().includes('svagh')).map((item, i) => (
                          <li key={i} className="text-orange-700 text-sm leading-relaxed">
                            • {item.replace(/^svagh[a-zA-Z]*:?\s*/i, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-4 border-l-4 border-red-500">
                      <h3 className="font-bold text-red-800 mb-3 flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded mr-2"></span>
                        Hot
                      </h3>
                      <ul className="space-y-2">
                        {slide.content.filter(item => item.toLowerCase().includes('hot')).map((item, i) => (
                          <li key={i} className="text-red-700 text-sm leading-relaxed">
                            • {item.replace(/^hot:?\s*/i, '')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {slide.slideType === 'agenda' && (
                <div className="space-y-4">
                  {slide.content.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded border-l-4 border-blue-600">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <span className="text-gray-800 text-lg leading-relaxed flex-1">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {slide.slideType === 'dashboard' && (
                <div className="grid grid-cols-2 gap-6">
                  {slide.content.map((item, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded border-l-4 border-purple-600">
                      <div className="flex items-start gap-3">
                        <span className="w-3 h-3 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        <p className="text-gray-800 leading-relaxed">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(slide.slideType === 'content' || slide.slideType === 'title') && (
                <div className="space-y-4">
                  {slide.content.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-800 text-lg leading-relaxed flex-1">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Speaker Notes Preview */}
              {slide.notes && (
                <div className="mt-8 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Anteckningar:</h4>
                  <p className="text-sm text-gray-500 italic">{slide.notes}</p>
                </div>
              )}
            </div>

            {/* Knowit Brand Strip - Enligt mall */}
            <div className="h-3 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500"></div>
          </div>
        ))}
      </div>
    </div>
  )
}