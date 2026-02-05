# Adam & Lisa Workspace - Slide Creator

En professionell Next.js-applikation för slide creation med Knowit-branding.

## 🚀 Teknisk Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.3
- **UI Framework**: React 18
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Development**: ESLint, TypeScript

## 🎨 Design System

### Knowit Brand Colors
- **Blue Spectrum**: #3B82F6 → #2563EB → #1D4ED8
- **Purple Spectrum**: #A855F7 → #9333EA → #7C3AED  
- **Peach Accent**: #F48454 → #EC6930 → #D4551C
- **Neutral Grays**: #F9FAFB → #4B5563 → #111827

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

### Development Server
Open [http://localhost:3000](http://localhost:3000) i din browser.

## 🏗️ Project Structure

```
adam-lisa-workspace/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── globals.css      # Global styles & Tailwind
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React komponenter
│   │   ├── Header.tsx       # App header med navigation
│   │   └── slides/          # Slide-relaterade komponenter
│   │       ├── SlideEditor.tsx      # Content editor
│   │       ├── SlidePreview.tsx     # Live preview
│   │       └── SlideSettings.tsx    # Design settings
│   ├── lib/                 # Utilities & helpers
│   │   └── utils.ts         # Common functions
│   └── types/               # TypeScript type definitions
│       └── slide.ts         # Slide & presentation types
├── public/                  # Static assets
│   └── favicon.ico          # App favicon
├── tailwind.config.ts       # Tailwind konfiguration
├── next.config.js           # Next.js konfiguration
├── tsconfig.json           # TypeScript konfiguration
├── package.json            # Dependencies & scripts
└── README.md              # Denna fil
```

## ✨ Features

### Current (v1.0)
- ✅ Modern Next.js 14 setup med App Router
- ✅ TypeScript integration
- ✅ Knowit brand colors & design system
- ✅ Responsive design med Tailwind CSS
- ✅ Slide editor med live preview
- ✅ Theme & layout selection
- ✅ Professional UI/UX
- ✅ Ready för Vercel deployment

### Mockup Features (v1.0)
- 🎨 Slide content editing (title, subtitle, content)
- 👁️ Live slide preview med Knowit branding
- 🎯 Theme selection (Blue, Purple, Peach, Minimal)
- 🖼️ Background options (Gradients, White, Dark)
- 📐 Layout templates (Title+Content, Image+Content, etc.)
- 📊 Slide statistics (character count, word count)

### Planned (v2.0+)
- 🔄 Full slide generation backend
- 💾 Presentation management
- 🖼️ Image upload & integration
- 👥 Collaboration features
- 📤 Export functionality (PDF, PPTX)
- 🎭 Advanced animations
- 📱 Mobile responsive editor

## 🚀 Deployment

### Vercel (Recommended)
1. Push kod till GitHub repository
2. Connect repository till Vercel
3. Deploy automatiskt med varje push

```bash
# Build locally för att testa
npm run build
```

### Manual Deployment
```bash
# Build applikationen
npm run build

# Start production server
npm start
```

## 🎯 Usage

1. **Edit Mode**: Redigera slide content (title, subtitle, content)
2. **Preview Mode**: Se live preview av slide med Knowit branding
3. **Settings Panel**: Anpassa theme, background och layout
4. **Export**: (Coming in v2) Exportera slides till olika format

## 🔧 Configuration

### Environment Variables
Skapa `.env.local` för lokala inställningar:

```bash
# Development
NEXT_PUBLIC_APP_ENV=development

# Production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_URL=https://your-api.com
```

### Customization
- **Colors**: Uppdatera `tailwind.config.ts` för brand colors
- **Fonts**: Ändra i `layout.tsx` och `globals.css`
- **Components**: Utöka komponenter i `src/components/`

## 🐛 Troubleshooting

### Common Issues
- **Type errors**: Kör `npm run type-check`
- **Style issues**: Kontrollera Tailwind konfiguration
- **Build errors**: Se till att alla dependencies är installerade

## 📝 Contributing

1. Follow established patterns och file structure
2. Använd TypeScript för type safety
3. Follow Tailwind CSS best practices
4. Test thoroughly innan commit

## 📄 License

Detta projekt är utvecklat för Adam & Lisa Workspace med Knowit branding.

---

**Utvecklad av Developer Agent för Adam & Lisa Professional Development Team**

**Status**: ✅ Ready for deployment
**Version**: 1.0.0
**Last Updated**: 2026-02-05