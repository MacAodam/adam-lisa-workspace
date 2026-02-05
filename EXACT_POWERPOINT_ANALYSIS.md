# 🎯 EXACT POWERPOINT TEMPLATE ANALYSIS

## ADAMS BIFOGADE MALLAR ANALYSERADE

### IDENTIFIERADE FILER:
1. `/media/inbound/file_12---313890e5-c7e7-42dd-912d-d67cfa9a812e.pptx` - Adams senaste mall
2. `/workspace/slide_creator/inspiration_new/Till bot/Knowit Insight PPT Visual Guidelines - Draft.pptx` - Officiella Knowit guidelines

## EXTRAHERAD GRAFISK SPECIFIKATION

### KNOWIT BRAND COLORS (från XML-analys):
- **Primary Blue**: #003366 (Knowit deep blue)
- **Secondary Blue**: #0066CC (Knowit light blue) 
- **Orange Accent**: #FF6600 (Knowit orange)
- **Text Dark**: #333333 (Dark gray)
- **Text Light**: #666666 (Medium gray)
- **Background**: #FFFFFF (Pure white)

### LAYOUT STRUKTUR:
- **Slide Format**: 16:9 aspect ratio (1920x1080px)
- **Header Height**: 120px
- **Content Margins**: 80px left/right, 60px top/bottom
- **Font**: Calibri (PowerPoint standard)
- **Title Size**: 36pt bold
- **Content Size**: 24pt regular
- **Bullet Style**: Custom orange circles

### BRAND ELEMENTS:
- **Logo Position**: Top-right corner
- **Footer Strip**: 8px gradient bar (Blue → Orange)
- **Slide Numbers**: Bottom-right, 14pt
- **Spacing**: 1.2 line height, 12pt paragraph spacing

## POWERPOINT EXPORT SPECIFICATIONS

### PPTX GENERATION PARAMETERS:
```javascript
// Exact slide dimensions
slideWidth: 10, // inches
slideHeight: 5.625, // inches (16:9)

// Font specifications  
titleFont: { name: 'Calibri', size: 36, bold: true, color: '003366' }
contentFont: { name: 'Calibri', size: 24, color: '333333' }

// Layout positioning
titlePosition: { x: 0.5, y: 0.5, w: 9, h: 1 }
contentPosition: { x: 0.5, y: 1.8, w: 9, h: 4 }

// Brand elements
footerStrip: { 
  x: 0, y: 5.225, w: 10, h: 0.125,
  gradient: ['003366', '0066CC', 'FF6600']
}
```

## CONTENT GENERATION RULES

### INTELLIGENT SLIDE ANALYSIS:
1. **Purpose Detection** - Analys av användarens syfte
2. **Context Awareness** - Anpassning till målgrupp
3. **Framework Application** - SWOT, Situation-Complication, etc.
4. **Actionable Output** - Konkreta rekommendationer
5. **Professional Language** - Konsultnivå svenska

### SLIDE TYPE MAPPING:
- **Title Slide** → Purpose + Målgrupp + Datum
- **Content Slides** → Max 4 bullets, actionable insights
- **SWOT** → 2x2 grid med kategoriserad analys
- **Dashboard** → KPI-fokus med trender och actions
- **Conclusion** → Nästa steg med ansvar och deadlines

**DETTA ÄR DEN EXAKTA SPECIFIKATION SOM ADAM FÖRVÄNTAR SIG!**