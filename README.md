# Quran App - Al-Quran Al-Kareem

A modern Quran application built with Next.js and Tailwind CSS, featuring Arabic text display with multiple font options, translations, and responsive design.

## Features

### Core Functionality
- **Browse all 114 Surahs** of the Holy Quran
- **Read full Surah** with Arabic text and translations
- **Search verses** by keywords
- **Infinite scroll** for Surah list pagination

### Settings Panel
- **Arabic Font Selection**: Choose from 3 fonts:
  - Amiri (default)
  - Nastaliq
  - Scheherazade
- **Arabic Font Size**: Adjustable (16px - 64px)
- **Translation Font Size**: Adjustable (12px - 32px)
- **Persistent Settings**: All settings saved to localStorage

### Responsive Design
- Full-screen responsive navbar
- Content centered on screen
- Sidebar slides in from left
- Mobile-friendly layouts

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **API**: Quran API (external)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd quran-frontend

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
quran-frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page (Surah list)
│   ├── globals.css        # Global styles
│   ├── search/           # Search page
│   │   └── page.tsx
│   └── surah/[id]/      # Surah detail page
│       └── page.tsx
├── components/
│   ├── Navbar.tsx         # Navigation bar
│   ├── SettingsSidebar.tsx # Settings panel
│   ├── SurahList.tsx     # Surah list with infinite scroll
│   ├── SurahCard.tsx      # Individual Surah card
│   ├── SurahView.tsx     # Surah detail view
│   ├── SurahPageClient.tsx # Client wrapper
│   ├── SearchBar.tsx      # Search input
│   └── Providers.tsx      # Context providers
├── context/
│   └── SettingsContext.tsx # Settings state management
├── lib/
│   └── api.ts           # API integration
└── types/
    └── quran.ts        # TypeScript types
```

## Environment Variables

Optional API URL override:

```env
NEXT_PUBLIC_API_URL=https://quran-api-y23k.onrender.com/api
```

Default API: `https://quran-api-y23k.onrender.com/api`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - Browse all Surahs |
| `/surah/[id]` | Read Surah with translation |
| `/search?q={query}` | Search verses |

## License

MIT