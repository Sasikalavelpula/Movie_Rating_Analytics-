# CineMetrics — Movie Rating Analytics Dashboard

A responsive, cinema-inspired **Movie Rating Analytics Dashboard** built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

![CineMetrics Dashboard](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 1. **Executive KPI Stat Cards**
- **Total Movies**: Live count of cataloged movies.
- **Average Rating**: Weighted mean rating (e.g. ⭐ 8.71 / 10).
- **Total Votes**: IMDb community engagement tally (e.g. 36.6M+ votes).
- **Top Rated Spotlight**: Direct callout of the #1 rated cinema classic.

### 2. **Interactive Visualizations (Recharts)**
- **Rating Distribution**: Bar chart categorizing titles into score brackets (8.4–8.5, 8.6–8.7, 8.8–8.9, 9.0–9.1, 9.2+).
- **Average Rating by Genre**: Comparative bar chart evaluating quality benchmarks across Drama, Sci-Fi, Crime, Action, Animation, and Adventure.
- **Rating Trends Across Eras**: Area chart illustrating cinematic rating evolution from the 1970s through the 2020s.

### 3. **Movie Catalog & Filtering Engine**
- **Dynamic Search**: Instant multi-attribute search across movie title, director, and genre.
- **Genre Filter Pills**: Single-click quick filter buttons for individual genres.
- **Rating Threshold Selector**: Filter for 8.5+, 8.7+, or 9.0+ masterpiece films.
- **Comprehensive Sorter**: Sort by Rating (High/Low), Votes count, Release Date (Newest/Oldest), or Title (A–Z).
- **View Toggle**: Switch between **Grid Cards** with posters and **Detailed Table List**.

### 4. **Movie Quick View Modal**
- Click any movie card or table row to open an inspection dialog with full synopsis, director, release year, runtime, metascore, audience votes, and box office stats.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn

### Installation & Launch
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application runs locally at `http://localhost:3000`.
