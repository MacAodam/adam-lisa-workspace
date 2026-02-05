export type SlideLayout = 
  | 'title-content'
  | 'title-subtitle-content'
  | 'image-content'
  | 'full-image'
  | 'two-column'
  | 'bullet-points'

export type SlideTheme = 
  | 'knowit-blue'
  | 'knowit-purple' 
  | 'knowit-peach'
  | 'minimal'
  | 'dark'

export type SlideBackground = 
  | 'gradient-knowit'
  | 'gradient-knowit-peach'
  | 'white'
  | 'dark'
  | 'custom'

export interface SlideData {
  id: string
  title: string
  content: string
  subtitle?: string
  background: SlideBackground
  layout: SlideLayout
  theme: SlideTheme
  imageUrl?: string
  bulletPoints?: string[]
  customCSS?: string
}

export interface SlideTemplate {
  id: string
  name: string
  description: string
  preview: string
  defaultData: Partial<SlideData>
}

export interface PresentationData {
  id: string
  title: string
  description?: string
  slides: SlideData[]
  theme: string
  createdAt: Date
  updatedAt: Date
}