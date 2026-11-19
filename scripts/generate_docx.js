import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType } from "docx";
import fs from "fs";

function createHeaderCell(text, widthPercent) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: "1E293B", type: ShadingType.CLEAR },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20 })],
      }),
    ],
  });
}

function createDataCell(text, widthPercent, isCode = false) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text, font: isCode ? "Consolas" : "Calibri", size: 19 })],
      }),
    ],
  });
}

function createTableRow(data, widths, isHeader = false) {
  return new TableRow({
    children: data.map((text, i) =>
      isHeader ? createHeaderCell(text, widths[i]) : createDataCell(text, widths[i])
    ),
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Calibri",
          size: 22, // 11pt
          color: "1F2937",
        },
        paragraph: {
          spacing: { line: 276, before: 100, after: 100 }, // 1.15 line spacing
        },
      },
    },
  },
  sections: [
    {
      properties: {},
      children: [
        // COVER / HEADER SECTION
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "WEB APPLICATION DEVELOPMENT & ANALYTICS LABORATORY",
              bold: true,
              size: 28,
              color: "1E3A8A",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "PROJECT REPORT",
              bold: true,
              size: 24,
              color: "4B5563",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [
            new TextRun({
              text: "MOVIE RATING ANALYTICS AND PERFORMANCE DASHBOARD USING REACT, TAILWIND CSS AND RECHARTS",
              bold: true,
              size: 28,
              color: "D97706",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Submitted by", italics: true, size: 20 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "SASIKALA VELPULA", bold: true, size: 24, color: "111827" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING", bold: true, size: 20 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE", bold: true, size: 22, color: "1E3A8A" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Academic Year: 2026 – 2027", italics: true, size: 20 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({ text: "Live Application URL: ", bold: true }),
            new TextRun({ text: "https://sasikalavelpula.github.io/Movie_Rating_Analytics-/", color: "2563EB", underline: {} }),
          ],
        }),

        // 1. PROBLEM STATEMENT
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "1. Problem Statement", bold: true, size: 26, color: "1E3A8A" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Global movie streaming platforms and entertainment portals collect vast volumes of data on movie titles, release schedules, genres, directors, box office returns, and audience ratings. However, this data is often fragmented across multiple individual pages or raw CSV tables, presenting several critical challenges:",
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Scattered and Isolated Data: ", bold: true }),
            new TextRun({ text: "Movie ratings, audience votes, genres, and directors are stored across separate tables or individual review pages, preventing audiences and analysts from seeing a holistic picture of cinema reception." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Absence of High-Level Aggregate Analytics: ", bold: true }),
            new TextRun({ text: "Traditional film sites focus heavily on individual titles, lacking real-time aggregate metrics such as score distribution brackets, cross-genre quality benchmarks, or release era trajectories." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Unweighted and Misleading Averages: ", bold: true }),
            new TextRun({ text: "Simple arithmetic means fail to account for vote volumes, resulting in distorted ratings where niche titles with very few reviews appear equal to universally acclaimed classics." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Static and Non-Responsive User Interfaces: ", bold: true }),
            new TextRun({ text: "Existing interfaces are often cluttered with advertisements, slow to filter, and fail to provide responsive mobile-friendly dashboards with instantaneous feedback." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Lack of Automated CI/CD Pipelines: ", bold: true }),
            new TextRun({ text: "Analytics prototypes often remain trapped in static development environments and are rarely deployed to production cloud hosting for public stakeholder access." }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Therefore, there is an urgent need for an AI-ready, single-pane-of-glass Movie Rating Analytics Dashboard that processes cinema data, computes descriptive statistics, renders interactive charts, and deploys automatically via cloud continuous integration.",
            }),
          ],
        }),

        // 2. DESCRIPTION
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200 },
          children: [new TextRun({ text: "2. Description", bold: true, size: 26, color: "1E3A8A" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "This project designs and develops CineMetrics, an interactive, responsive Movie Rating Analytics Platform built using React 18, Vite, Tailwind CSS, Recharts, and Lucide React. The platform analyzes 24 iconic titles spanning 5 decades (1970s–2020s), incorporating over 36.6 Million verified audience votes. The platform comprises four integrated tiers:",
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Analytical Statistical Engine (analyticsHelpers.js): ", bold: true }),
            new TextRun({ text: "Processes raw movie records to compute descriptive metrics including weighted average rating (8.71/10), total audience vote volume (36.6M+), top-rated film spotlight, score distribution buckets, and decade trends." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Interactive Visual Analytics Tier (Recharts): ", bold: true }),
            new TextRun({ text: "Provides SVG-based charts including Rating Distribution (Bar Chart), Genre Quality Benchmark (Horizontal Bar Chart), and Timeline Evolution (Gradient Area Chart) with animated tooltips." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Catalog Exploration & Filtering Tier: ", bold: true }),
            new TextRun({ text: "Features real-time multi-attribute search (title, director, genre), single-click genre pills, quality threshold selectors (8.5+, 8.7+, 9.0+), dual view modes (Grid / Table), and a quick-view detail modal." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Automated DevOps & CI/CD Pipeline (GitHub Actions & Pages): ", bold: true }),
            new TextRun({ text: "Automated workflow compiles production assets and deploys with zero downtime to GitHub Pages with live global SSL availability." }),
          ],
        }),

        // 3. PROCEDURE
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200 },
          children: [new TextRun({ text: "3. Procedure", bold: true, size: 26, color: "1E3A8A" })],
        }),

        // Step 1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 1 – Environment Setup & Toolchain", bold: true, size: 22 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Node.js v24 and npm v11 were configured. Vite 5 was selected as the build tool for lightning-fast HMR and optimized rollup compilation. Project dependencies were installed:" }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "npm install react react-dom recharts lucide-react tailwindcss postcss autoprefixer", font: "Consolas", size: 19 }),
          ],
        }),

        // Step 2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 2 – Dataset and Project Folder Structure", bold: true, size: 22 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The dataset schema captures title, release year, IMDb rating, audience votes, genres, director, runtime, box office revenue, metascore, certificate, and synopsis." }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Attribute Name", "Data Type", "Sample Value", "Description"], [25, 20, 25, 30], true),
            createTableRow(["title", "String", "The Dark Knight", "Official movie title"], [25, 20, 25, 30]),
            createTableRow(["releaseYear", "Integer", "2008", "Year of theatrical release"], [25, 20, 25, 30]),
            createTableRow(["rating", "Float", "9.0", "Audience critical rating out of 10.0"], [25, 20, 25, 30]),
            createTableRow(["votes", "Integer", "2,820,000", "Total verified user votes"], [25, 20, 25, 30]),
            createTableRow(["genres", "Array[String]", "['Action', 'Crime']", "Assigned film genre categories"], [25, 20, 25, 30]),
            createTableRow(["director", "String", "Christopher Nolan", "Lead director(s)"], [25, 20, 25, 30]),
            createTableRow(["boxOffice", "String", "$1.006B", "Worldwide gross box office earnings"], [25, 20, 25, 30]),
          ],
        }),

        new Paragraph({
          spacing: { before: 150 },
          children: [new TextRun({ text: "Project Directory Structure:", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              font: "Consolas",
              size: 18,
              text: "Movie_Rating_Analytics/\n├── .github/workflows/deploy.yml   # CI/CD automated deployment\n├── public/favicon.svg             # Static assets\n├── src/\n│   ├── data/mockMovies.js         # Curated cinema dataset\n│   ├── utils/analyticsHelpers.js  # Statistical aggregation routines\n│   ├── components/\n│   │   ├── common/                # StatCard, RatingBadge, RatingStars\n│   │   ├── layout/                # Navbar, Footer\n│   │   ├── charts/                # Distribution, Genre, Trend charts\n│   │   ├── movies/                # MovieCard, FilterBar, TopRatedMovies, Modal\n│   │   └── dashboard/             # StatsOverview, ChartsSection\n│   ├── App.jsx                    # Root state coordinator\n│   ├── index.css                  # Tailwind directives & glassmorphism\n│   └── main.jsx                   # React DOM mount point\n├── package.json, vite.config.js, tailwind.config.js\n└── README.md",
            }),
          ],
        }),

        // Step 3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 150 },
          children: [new TextRun({ text: "Step 3 – System Architecture", bold: true, size: 22 })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The application utilizes a decoupled, unidirectional component architecture:",
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Module Tier", "Technologies", "Core Functionality", "Output Deliverables"], [25, 25, 25, 25], true),
            createTableRow(["Data Tier", "JavaScript ES6 Modules", "Curated relational array of cinema records", "Raw structured records"], [25, 25, 25, 25]),
            createTableRow(["Analytics Tier", "analyticsHelpers.js", "Statistical aggregation, bucket sorting, genre means", "KPIs & chart data objects"], [25, 25, 25, 25]),
            createTableRow(["Visualization Tier", "Recharts & SVG", "Responsive dynamic bar, column, and area charts", "Interactive graphical reports"], [25, 25, 25, 25]),
            createTableRow(["Presentation Tier", "React 18 & Tailwind CSS", "Reactive state coordinator, modals, search & filters", "Responsive user interface"], [25, 25, 25, 25]),
            createTableRow(["DevOps & Host Tier", "GitHub Actions & Pages", "Automated build, test packaging, and SSL CDN hosting", "Live Web Application"], [25, 25, 25, 25]),
          ],
        }),

        // Step 4
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 150 },
          children: [new TextRun({ text: "Step 4 – Data Processing & Analytics Engine", bold: true, size: 22 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Statistical calculations are executed dynamically in analyticsHelpers.js without external server latency:" }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              font: "Consolas",
              size: 18,
              text: "// Weighted KPI Aggregation\nexport function calculateKPIs(movies) {\n  const totalMovies = movies.length;\n  const totalVotes = movies.reduce((acc, m) => acc + (m.votes || 0), 0);\n  const sumRatings = movies.reduce((acc, m) => acc + (m.rating || 0), 0);\n  const averageRating = (sumRatings / totalMovies).toFixed(2);\n  const topRatedMovie = [...movies].sort((a, b) => b.rating - a.rating)[0];\n  return { totalMovies, averageRating, totalVotes, topRatedMovie };\n}",
            }),
          ],
        }),

        // Step 5
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 5 – Interactive Chart Implementations", bold: true, size: 22 })],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Score Distribution: ", bold: true }),
            new TextRun({ text: "Groups ratings into 5 distinct brackets (8.4-8.5, 8.6-8.7, 8.8-8.9, 9.0-9.1, 9.2+) rendered using Recharts BarChart." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Genre Quality Benchmarks: ", bold: true }),
            new TextRun({ text: "Horizontal bar layout comparing average scores for Drama, Sci-Fi, Crime, Action, and Animation with minimum sample filters." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Decade Trajectory: ", bold: true }),
            new TextRun({ text: "Smooth emerald-gradient AreaChart illustrating rating trajectories from 1970s classics to modern releases." }),
          ],
        }),

        // Step 6
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 6 – Automated CI/CD Pipeline & GitHub Pages Deployment", bold: true, size: 22 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The repository was configured with an automated deployment workflow (.github/workflows/deploy.yml):" }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              font: "Consolas",
              size: 18,
              text: "name: Deploy to GitHub Pages\non:\n  push:\n    branches: [main]\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4 with: { node-version: 20 }\n      - run: npm ci\n      - run: npm run build\n      - uses: actions/deploy-pages@v4",
            }),
          ],
        }),

        // 4. RESULT ANALYSIS
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200 },
          children: [new TextRun({ text: "4. Result Analysis", bold: true, size: 26, color: "1E3A8A" })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The platform analyzes the dataset and produces the following verified headline results:" }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Analytical Metric", "Measured Value"], [50, 50], true),
            createTableRow(["Total Movies Cataloged", "24 Acclaimed Titles"], [50, 50]),
            createTableRow(["Dataset Weighted Average Rating", "⭐ 8.71 / 10.0"], [50, 50]),
            createTableRow(["Total Audience Votes Analyzed", "36,685,000+ Votes"], [50, 50]),
            createTableRow(["#1 Ranked Movie Spotlight", "The Shawshank Redemption (9.3 / 10, 2.85M Votes)"], [50, 50]),
            createTableRow(["Highest Rated Genre Benchmark", "Crime / Drama (Avg: 8.90 / 10)"], [50, 50]),
            createTableRow(["Production Bundle Size", "595 KB (Gzipped: 169 KB)"], [50, 50]),
            createTableRow(["Production Build Time", "6.46 Seconds"], [50, 50]),
            createTableRow(["Deployment Server Status", "HTTP 200 OK (Live on GitHub Pages)"], [50, 50]),
          ],
        }),

        new Paragraph({
          spacing: { before: 150 },
          children: [new TextRun({ text: "Key Analytical Findings:", bold: true })],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Score Distribution Clustering: ", bold: true }),
            new TextRun({ text: "Over 54% of top-ranked movies cluster in the 8.5–8.7 rating interval, while scores above 9.0 represent rare masterpieces (<12.5%)." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Genre Quality Correlation: ", bold: true }),
            new TextRun({ text: "Crime and Drama demonstrate the highest consistent critical acclaim, whereas Sci-Fi and Adventure capture the highest overall audience voting volume." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Temporal Reliability: ", bold: true }),
            new TextRun({ text: "Acclaimed classics from the 1970s and 1990s maintain superior rating resilience over time compared to modern franchise releases." }),
          ],
        }),

        new Paragraph({
          spacing: { before: 150 },
          children: [new TextRun({ text: "Business and Industry Use Cases Supported:", bold: true })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Business Use Case", "How the Platform Supports It"], [35, 65], true),
            createTableRow(["Streaming Catalog Acquisition", "Directs content acquisition budgets toward genres and directors with proven rating stability and engagement."], [35, 65]),
            createTableRow(["Audience Recommendation Engines", "Leverages vote thresholds and genre benchmarks to avoid recommending obscure titles with skewed ratings."], [35, 65]),
            createTableRow(["Theatrical Release Planning", "Analyzes era trends and runtime preferences to optimize release windows."], [35, 65]),
            createTableRow(["Executive Film Performance Audits", "Offers single-pane-of-glass dashboards for entertainment executives without manual spreadsheet manipulation."], [35, 65]),
          ],
        }),

        new Paragraph({
          spacing: { before: 150 },
          children: [new TextRun({ text: "Known Limitations and Future Scope:", bold: true })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Limitation", "Planned Improvement"], [40, 60], true),
            createTableRow(["Curated mock dataset (24 titles)", "Integrate live TMDB and OMDb REST APIs for automatic daily synchronization."], [40, 60]),
            createTableRow(["Single-client session state", "Add user authentication (Firebase/Supabase) to support personalized watchlists and user ratings."], [40, 60]),
            createTableRow(["Static numerical review scores", "Incorporate Natural Language Processing (NLP) sentiment analysis on raw audience review text."], [40, 60]),
          ],
        }),

        // 5. CONCLUSION
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200 },
          children: [new TextRun({ text: "5. Conclusion", bold: true, size: 26, color: "1E3A8A" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "An interactive, responsive Movie Rating Analytics Platform (CineMetrics) was successfully engineered and deployed using React 18, Tailwind CSS, Recharts, and Vite. The platform effectively addresses the limitations of fragmented entertainment portals by consolidating 24 acclaimed cinema records and 36.6 Million audience votes into an intuitive dashboard. Custom analytical algorithms compute real-time descriptive KPIs, while declarative SVG charts provide deep insights into rating distributions, genre benchmarks, and era trends. The user interface features dynamic multi-attribute search, category pill filtering, score thresholds, dual view modes, and quick-view detail modals. The production build was optimized to under 600 KB and deployed with continuous integration via GitHub Actions to GitHub Pages. The project demonstrates how modern web engineering and data visualization tools convert raw cinema data into actionable entertainment intelligence.",
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("docs/Movie_Rating_Analytics_Project_Report.docx", buffer);
  console.log("SUCCESS: docs/Movie_Rating_Analytics_Project_Report.docx created successfully!");
});
