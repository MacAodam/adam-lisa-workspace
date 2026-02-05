'use client'

import { Download, FileText } from 'lucide-react'

interface SlideData {
  title: string
  subtitle?: string
  content: string[]
  slideType: 'title' | 'content' | 'swot' | 'agenda'
  template: 'knowit-blue' | 'knowit-purple'
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
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-knowit-gray-200">
            {/* Slide Header */}
            <div className="bg-gradient-to-r from-knowit-blue-600 to-knowit-purple-600 text-white p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{slide.title}</h3>
                  {slide.subtitle && (
                    <p className="text-knowit-blue-100">{slide.subtitle}</p>
                  )}
                </div>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {index + 1}
                </span>
              </div>
            </div>

            {/* Slide Content */}
            <div className="p-6">
              {slide.slideType === 'swot' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Styrkor</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      {slide.content.filter(item => item.includes('Styrka')).map((item, i) => (
                        <li key={i}>• {item.replace('Styrka: ', '')}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Svagheter</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {slide.content.filter(item => item.includes('Svaghet')).map((item, i) => (
                        <li key={i}>• {item.replace('Svaghet: ', '')}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Möjligheter</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {slide.content.filter(item => item.includes('Möjlighet')).map((item, i) => (
                        <li key={i}>• {item.replace('Möjlighet: ', '')}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Hot</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {slide.content.filter(item => item.includes('Hot')).map((item, i) => (
                        <li key={i}>• {item.replace('Hot: ', '')}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {slide.slideType === 'agenda' && (
                <div className="space-y-3">
                  {slide.content.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-knowit-gray-50 rounded-lg">
                      <span className="w-8 h-8 bg-knowit-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-knowit-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {(slide.slideType === 'content' || slide.slideType === 'title') && (
                <div className="space-y-3">
                  {slide.content.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-knowit-peach-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-knowit-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Knowit Brand Footer */}
            <div className="h-2 bg-gradient-to-r from-knowit-blue-500 via-knowit-purple-500 to-knowit-peach-500"></div>
          </div>
        ))}
      </div>
    </div>
  )
}