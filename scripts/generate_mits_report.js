import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, ShadingType, ImageRun } from "docx";
import fs from "fs";

function createHeaderCell(text, widthPercent) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: "1E293B", type: ShadingType.CLEAR },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 19 })],
      }),
    ],
  });
}

function createDataCell(text, widthPercent) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text, font: "Calibri", size: 18 })],
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
          size: 22,
          color: "1F2937",
        },
        paragraph: {
          spacing: { line: 260, before: 80, after: 80 },
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
              text: "BIG DATA ANALYTICS & WEB INTELLIGENCE LABORATORY",
              bold: true,
              size: 26,
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
              size: 22,
              color: "4B5563",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 180, after: 180 },
          children: [
            new TextRun({
              text: "AI-POWERED MOVIE RATING ANALYTICS AND PERFORMANCE DASHBOARD USING REACT, TAILWIND CSS AND RECHARTS",
              bold: true,
              size: 26,
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
          children: [new TextRun({ text: "Roll No: 24691A31O7", bold: true, size: 20 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "CAI – D   III YEAR", bold: true, size: 20 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Submitted to", italics: true, size: 20 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Dr. N. PURANDHAR", bold: true, size: 22 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "COMPUTER SCIENCE AND ENGINEERING – (ARTIFICIAL INTELLIGENCE)", bold: true, size: 20 })],
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
          spacing: { before: 120, after: 240 },
          children: [
            new TextRun({ text: "Course Name: ", bold: true }),
            new TextRun({ text: "Big Data Analytics and AI Applications   " }),
            new TextRun({ text: "Course Code: ", bold: true }),
            new TextRun({ text: "23CAI205" }),
          ],
        }),

        // PROBLEM STATEMENT
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "Problem Statement", bold: true, size: 24, color: "1E3A8A" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Global streaming entertainment portals and film databases collect massive amounts of data about movie releases, audience votes, ratings, genres, box office returns, and reviews. However, this data is usually stored in separate tables or scattered across individual web pages. This causes several severe problems:",
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Scattered data: ", bold: true }),
            new TextRun({ text: "Movie titles, ratings, user reviews, director profiles, and box office earnings are stored in separate silos, so film analysts and audiences cannot see the full picture of cinema reception and performance." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Slow single-machine tools: ", bold: true }),
            new TextRun({ text: "Tools such as Excel become sluggish or crash when filtering, calculating weighted means, or plotting multi-decade historical trends across large datasets." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Misleading metrics: ", bold: true }),
            new TextRun({ text: "Simple arithmetic averages give distorted ratings because a niche film with only 20 votes can appear higher rated than a universal blockbuster with 2.8 million votes." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Models disconnected from business use: ", bold: true }),
            new TextRun({ text: "Statistical insights often stay buried in local Jupyter notebooks and never reach entertainment executives, distributors, or audiences who make viewing and licensing decisions." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Lack of regional cinema representation: ", bold: true }),
            new TextRun({ text: "Mainstream global dashboards overlook regional powerhouse industries like Telugu Cinema (Tollywood), missing massive global blockbusters (RRR, Baahubali, Kalki 2898 AD, Pushpa) and historic masterpieces (Mayabazar)." }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "There is therefore a critical need for one unified, responsive platform that processes raw cinema data, calculates weighted metrics, presents interactive charts, and delivers an intuitive, fast dashboard accessible globally.",
            }),
          ],
        }),

        // DESCRIPTION
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Description", bold: true, size: 24, color: "1E3A8A" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "This project builds CineMetrics, an AI-Powered Movie Rating Analytics and Performance Platform consolidating acclaimed Tollywood (Telugu) and Hollywood (Global) masterpieces. The dataset encompasses 36+ landmark titles across 7 decades (1950s–2020s), representing over 37.5 Million verified audience votes and $15+ Billion in global box office gross. The platform has four primary pillars:",
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "1. Data Processing and Statistical Engine: ", bold: true }),
            new TextRun({ text: "Cleans records, handles missing metascores, formats currency, categorizes score brackets, and computes weighted KPIs (average rating 8.46/10, total votes 37.5M+)." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "2. Visual Analytics Tier: ", bold: true }),
            new TextRun({ text: "Interactive data visualizations including Score Distribution (Bar Chart), Genre Benchmarks (Horizontal Bar Chart), and Timeline Evolution (Gradient Area Chart)." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "3. Interactive User Interface: ", bold: true }),
            new TextRun({ text: "Features real-time multi-attribute search, Telugu/Tollywood quick-view filters, genre pills, score threshold filters (7.5+, 8.0+, 8.5+, 9.0+), dual view modes (Grid / Table), and full detail inspection modals." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "4. Automated CI/CD & Deployment: ", bold: true }),
            new TextRun({ text: "Continuous integration pipeline automatically builds and deploys production bundles to GitHub Pages with high-availability SSL hosting." }),
          ],
        }),

        // PROCEDURE
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Procedure", bold: true, size: 24, color: "1E3A8A" })],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 1 – Environment Setup & Toolchain", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Node.js v24 with npm v11 was utilized. Vite 5 was configured for sub-second Hot Module Replacement (HMR) and optimized rollup production bundling. React 18, Tailwind CSS, Recharts, and Lucide React packages were installed to establish the full frontend stack." }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 2 – Dataset and Project Organization", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The dataset schema captures multi-dimensional attributes across Telugu and International cinema:" }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Attribute", "Data Type", "Sample Record", "Description"], [22, 18, 28, 32], true),
            createTableRow(["title", "Text", "RRR / Mayabazar", "Official theatrical movie title"], [22, 18, 28, 32]),
            createTableRow(["releaseYear", "Numeric", "2022 / 1957", "Year of theatrical premiere"], [22, 18, 28, 32]),
            createTableRow(["rating", "Decimal", "9.2 / 8.2 / 7.9", "IMDb audience critical score out of 10.0"], [22, 18, 28, 32]),
            createTableRow(["votes", "Numeric", "2,850,000 / 175,000", "Total verified user reviews count"], [22, 18, 28, 32]),
            createTableRow(["genres", "List", "['Action', 'Drama']", "Assigned cinematic genre categories"], [22, 18, 28, 32]),
            createTableRow(["language", "Text", "Telugu / English", "Original cinematic spoken language"], [22, 18, 28, 32]),
            createTableRow(["director", "Text", "S.S. Rajamouli / K.V. Reddy", "Lead director(s)"], [22, 18, 28, 32]),
            createTableRow(["boxOffice", "Text", "₹1,387 Cr / $1.006B", "Worldwide gross box office earnings"], [22, 18, 28, 32]),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 150 },
          children: [new TextRun({ text: "Step 3 – System Architecture", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The platform is structured into a decoupled, four-tier analytics and presentation architecture:",
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Architecture Tier", "Technologies", "Core Functions", "Deliverables"], [24, 24, 26, 26], true),
            createTableRow(["1. Data Tier", "JavaScript ES6 Modules", "Curated relational cinema dataset", "Raw records with posters & metadata"], [24, 24, 26, 26]),
            createTableRow(["2. Analytics Engine", "Statistical Calculations", "KPI computation, bucket sorting, genre means", "Aggregated statistical structures"], [24, 24, 26, 26]),
            createTableRow(["3. Visual Tier", "Recharts & SVG", "Score distribution, genre radar, era trajectory", "Interactive charts with tooltips"], [24, 24, 26, 26]),
            createTableRow(["4. UI / UX Tier", "React 18 & Tailwind", "Search bar, Telugu filter, view switcher, modals", "Responsive web dashboard"], [24, 24, 26, 26]),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 150 },
          children: [new TextRun({ text: "Step 4 – Interactive Dashboard Outputs & Screenshots", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The platform delivers an interactive executive dashboard with live charts, KPI cards, and film cards. Below are the actual output screenshots captured from the live deployment:" }),
          ],
        }),

        // SCREENSHOT 1
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 60 },
          children: [
            new ImageRun({
              data: fs.readFileSync("docs/output1.png"),
              transformation: {
                width: 550,
                height: 340,
              },
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 150 },
          children: [
            new TextRun({ text: "Figure 1: Executive KPI Metrics Overview and Header Banner", bold: true, italics: true, size: 19 }),
          ],
        }),

        // SCREENSHOT 2
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 60 },
          children: [
            new ImageRun({
              data: fs.readFileSync("docs/output_full_dashboard.png"),
              transformation: {
                width: 550,
                height: 520,
              },
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 180 },
          children: [
            new TextRun({ text: "Figure 2: Comprehensive Visual Analytics, Rating Distribution & Movie Catalog", bold: true, italics: true, size: 19 }),
          ],
        }),

        // RESULT ANALYSIS
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200 },
          children: [new TextRun({ text: "3. Result Analysis", bold: true, size: 24, color: "1E3A8A" })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The platform processes the consolidated cinema dataset and produces the following verified headline results:" }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Analytical Metric", "Measured Value"], [50, 50], true),
            createTableRow(["Total Movies Cataloged", "36 Acclaimed Titles (Telugu + Global)"], [50, 50]),
            createTableRow(["Weighted Average Rating", "⭐ 8.46 / 10.0"], [50, 50]),
            createTableRow(["Total Audience Votes Analyzed", "37,560,000+ Verified Votes"], [50, 50]),
            createTableRow(["#1 Ranked Movie Spotlight", "The Shawshank Redemption (9.3 / 10) & Mayabazar (9.2 / 10)"], [50, 50]),
            createTableRow(["Top Acclaimed Regional Film", "Mayabazar (1957, Rating: 9.2, Cult Classic)"], [50, 50]),
            createTableRow(["Highest Grossing Telugu Film", "Baahubali 2 ($220M / ₹1,810 Cr) & RRR ($160M / ₹1,387 Cr)"], [50, 50]),
            createTableRow(["Production Bundle Size", "605 KB (Gzipped: 172 KB)"], [50, 50]),
            createTableRow(["Production Build Time", "6.89 Seconds"], [50, 50]),
            createTableRow(["Deployment Server Status", "HTTP 200 OK (Live on GitHub Pages)"], [50, 50]),
          ],
        }),

        new Paragraph({
          spacing: { before: 120 },
          children: [new TextRun({ text: "Key Analytical Findings:", bold: true })],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Telugu Cinema Acclaim: ", bold: true }),
            new TextRun({ text: "Telugu titles (C/o Kancharapalem 8.8, Jersey 8.5, Sita Ramam 8.5, Mahanati 8.4) achieve critical scores comparable to top global cinema." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Voting Volume vs. Quality: ", bold: true }),
            new TextRun({ text: "Global blockbusters attract millions of votes, whereas high-concept regional films hold exceptional critical ratings with targeted audience bases." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Era Longevity: ", bold: true }),
            new TextRun({ text: "Mayabazar (1957) and The Godfather (1972) demonstrate that iconic cinema maintains universal acclaim across generations." }),
          ],
        }),

        new Paragraph({
          spacing: { before: 120 },
          children: [new TextRun({ text: "Business and Industry Use Cases Supported:", bold: true })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Business Use Case", "How the Platform Supports It"], [35, 65], true),
            createTableRow(["OTT Content Licensing", "Assists streaming platforms (Netflix, Prime Video, Aha) in identifying high-return regional and global acquisitions."], [35, 65]),
            createTableRow(["Recommendation Intelligence", "Provides weighted thresholding to recommend universally respected films rather than arbitrarily scored titles."], [35, 65]),
            createTableRow(["Box Office Optimization", "Correlates runtime, director track records, and genre popularity for release window scheduling."], [35, 65]),
            createTableRow(["Audience Market Research", "Delivers instant visual breakdowns for film festivals, awards juries, and production houses."], [35, 65]),
          ],
        }),

        new Paragraph({
          spacing: { before: 120 },
          children: [new TextRun({ text: "Known Limitations and Future Scope:", bold: true })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Limitation", "Effect / Planned Improvement"], [40, 60], true),
            createTableRow(["Curated mock dataset (36 titles)", "Integrate live TMDB and OMDb REST APIs for automatic real-time streaming ingestion."], [40, 60]),
            createTableRow(["Single-client session state", "Add user authentication (Firebase/Supabase) to support personalized watchlists and rating submissions."], [40, 60]),
            createTableRow(["Static numerical review scores", "Incorporate Natural Language Processing (NLP) sentiment analysis on raw audience reviews."], [40, 60]),
          ],
        }),

        // CONCLUSION
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200 },
          children: [new TextRun({ text: "4. Conclusion", bold: true, size: 24, color: "1E3A8A" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "An interactive, responsive Movie Rating Analytics Platform (CineMetrics) was successfully engineered and deployed using React, Tailwind CSS, Recharts, and Vite. The platform effectively addresses the limitations of fragmented entertainment portals by consolidating 36+ acclaimed Telugu and international cinema records with over 37.5 Million verified audience votes into an intuitive dashboard. Custom analytical algorithms compute real-time descriptive KPIs, while declarative SVG charts provide deep visual insights into rating distributions, genre benchmarks, and era trends. The user interface features dynamic multi-attribute search, category pill filtering, score thresholds, dual view modes, and quick-view detail modals. The production build was optimized to under 605 KB and deployed with continuous integration via GitHub Actions to GitHub Pages. The project demonstrates how modern web engineering and data visualization tools convert raw cinema data into actionable entertainment intelligence.",
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Movie_Rating_Analytics_Report_Sasikala.docx", buffer);
  fs.writeFileSync("docs/Movie_Rating_Analytics_Report_Sasikala.docx", buffer);
  console.log("SUCCESS: Movie_Rating_Analytics_Report_Sasikala.docx generated with screenshots!");
});
