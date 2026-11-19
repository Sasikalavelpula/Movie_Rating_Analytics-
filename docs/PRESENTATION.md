# Presentation Deck: Movie Rating Analytics Dashboard (CineMetrics)

**Author:** Sasikala Velpula  
**Project:** CineMetrics — Movie Rating Analytics Dashboard  
**Format:** Slide Deck (12 Slides)  
**Live URL:** [https://sasikalavelpula.github.io/Movie_Rating_Analytics-/](https://sasikalavelpula.github.io/Movie_Rating_Analytics-/)  

---

## Slide 1: Title Slide
* **Title:** CineMetrics
* **Subtitle:** Modern Movie Rating Analytics & Performance Dashboard
* **Presented By:** Sasikala Velpula
* **Tech Stack:** React • Vite • Tailwind CSS • Recharts • GitHub Pages
* **Presenter Note:** "Good morning/afternoon everyone. Today I am presenting CineMetrics, a responsive analytics dashboard that provides deep insights into movie ratings, genre benchmarks, and historical cinema trends."

---

## Slide 2: Problem Statement & Objectives
* **Challenges with Traditional Film Portals:**
  * Rating information is fragmented across multiple individual movie pages.
  * Lack of aggregate high-level metrics (overall averages, genre distributions, era trends).
  * Static interfaces with limited real-time filtering and visualization.
* **Project Goals:**
  * Build an interactive, single-page analytics command center.
  * Visualize distributions, benchmarks, and historical performance using responsive charts.
  * Deliver a cinema-grade dark UI with seamless mobile responsiveness.

---

## Slide 3: Proposed Solution
* **Introducing CineMetrics:**
  * Executive **KPI Cards** highlighting key statistics at a glance.
  * **Interactive Visualizations** with custom tooltips powered by Recharts.
  * **Dynamic Catalog & Exploration** with real-time multi-attribute search.
  * **Modal Inspection Window** for in-depth plot, box office, and director details.
  * Fully automated **CI/CD Deployment** pipeline via GitHub Actions.

---

## Slide 4: Technology Architecture
* **Frontend Framework:** React 18 with Vite for lightning-fast HMR and bundling.
* **Styling & Theme:** Tailwind CSS with a cinematic dark theme and custom glassmorphism.
* **Charts & Analytics:** Recharts declarative SVG charts (Bar, Horizontal Bar, Area).
* **Iconography:** Lucide React for consistent vector symbols.
* **Hosting & CI/CD:** GitHub Actions building and deploying to GitHub Pages.

---

## Slide 5: System Architecture & Data Flow
```
[ Dataset & Records ] ──► [ Analytics Helpers (KPIs, Distributions, Eras) ]
                                    │
                                    ▼
                         [ App.jsx State Manager ]
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
[ KPI Stat Cards ]         [ Recharts Analytics ]      [ Filter & Catalog ]
Total Movies, Avg Rating   Distribution, Genre, Eras   Grid / Table / Modal
```

---

## Slide 6: Key Metrics & KPI Overview
* **Total Movies:** 24 acclaimed titles cataloged.
* **Weighted Average Rating:** ⭐ **8.71 / 10** across the dataset.
* **Audience Engagement:** **36.6M+** verified audience votes analyzed.
* **Top-Rated Spotlight:** *The Shawshank Redemption* (#1 Ranked, 9.3/10).
* **Top Performing Genre:** Highlighting critically acclaimed genres with sample sizes.

---

## Slide 7: Visual Analytics (Recharts Engine)
1. **Rating Distribution (Bar Chart):**
   * Groups titles into 5 score brackets (8.4–8.5, 8.6–8.7, 8.8–8.9, 9.0–9.1, 9.2+).
2. **Average Rating by Genre (Horizontal Bar Chart):**
   * Compares critical scores across Drama, Sci-Fi, Crime, Action, Animation, and Adventure.
3. **Decade Trends (Area Chart):**
   * Maps cinematic quality trajectory from the 1970s classic era to the 2020s.

---

## Slide 8: Movie Catalog & Exploration Engine
* **Instant Search:** Searches by movie title, director, and genre keywords simultaneously.
* **Filter Pills:** Instant genre-specific filtering.
* **Quality Thresholds:** Dropdown for 8.5+, 8.7+, and 9.0+ masterpiece films.
* **Dual View Modes:**
  * **Grid View:** High-impact movie cards with posters, badges, and quick-view triggers.
  * **Table View:** Compact, data-dense view with rankings and vote counts.
* **Quick-View Modal:** Full synopsis, box office, runtime, and metascore inspection.

---

## Slide 9: Automated CI/CD & Deployment
* **Version Control:** Managed in Git on GitHub repository `Movie_Rating_Analytics-`.
* **GitHub Actions Workflow:**
  * Triggered automatically on push to branch `main`.
  * Runs Node.js 20 environment to build production bundle (`dist`).
  * Automatically publishes build artifacts to GitHub Pages with zero manual intervention.
* **Production Status:** Live with HTTP 200 OK.

---

## Slide 10: Live Demonstration
* **Website URL:** [https://sasikalavelpula.github.io/Movie_Rating_Analytics-/](https://sasikalavelpula.github.io/Movie_Rating_Analytics-/)
* **Repository:** [https://github.com/Sasikalavelpula/Movie_Rating_Analytics-](https://github.com/Sasikalavelpula/Movie_Rating_Analytics-)
* **Highlights during demo:**
  * Dynamic metric updates on search/filter.
  * Smooth hover tooltips on Recharts charts.
  * Quick-view modal interaction.
  * Fully fluid mobile layout.

---

## Slide 11: Future Roadmap
* **Live API Feed:** Integration with TMDB / OMDb APIs for continuous live synchronization.
* **Review Sentiment Analysis:** NLP sentiment scoring on user comments.
* **User Accounts & Bookmarks:** Personal watchlist and custom rating lists.
* **Box Office ROI Modeling:** Financial analytics comparing production budgets with revenue.

---

## Slide 12: Conclusion & Q&A
* **Summary:** CineMetrics bridges the gap between raw entertainment data and visual intelligence.
* **Key Takeaway:** Combines clean modern React architecture, Tailwind styling, and automated DevOps deployment.
* **Thank You!** Questions and feedback are welcome.
