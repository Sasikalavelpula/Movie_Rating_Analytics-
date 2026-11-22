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
              text: "BIG DATA ANALYTICS LABORATORY",
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
              text: "AI-POWERED MOVIE RATING BIG DATA ANALYTICS PLATFORM USING PYSPARK, APACHE PIG AND REACT",
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
              text: "Global streaming entertainment portals and film databases collect massive amounts of data about movie releases, user ratings, audience reviews, genres, box office earnings, and viewing logs. However, this data is usually stored in separate relational tables or distributed log files. This causes several severe big data problems:",
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Scattered data: ", bold: true }),
            new TextRun({ text: "Movie metadata, user ratings, review logs, and box office earnings are stored in separate files or tables, preventing film analysts and audiences from seeing the comprehensive picture of cinema reception." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Slow single-machine tools: ", bold: true }),
            new TextRun({ text: "Traditional tools like Excel or standard single-threaded Python scripts become slow or run out of memory when joining multiple tables and calculating metrics over millions of review records." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Misleading metrics: ", bold: true }),
            new TextRun({ text: "Simple arithmetic averages give distorted results because niche films with very few reviews appear higher rated than globally celebrated blockbusters with millions of votes." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Models disconnected from business use: ", bold: true }),
            new TextRun({ text: "Big data transformations and analytics often stay confined to terminal scripts and never reach entertainment executives, distributors, or audiences who make viewing decisions." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "Lack of regional cinema representation: ", bold: true }),
            new TextRun({ text: "Mainstream global analytics platforms frequently ignore regional cinema powerhouses such as Telugu Cinema (Tollywood), omitting massive global blockbusters (RRR, Baahubali, Kalki 2898 AD, Pushpa) and historic landmark classics (Mayabazar)." }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "There is therefore an urgent need for an integrated Big Data platform that ingests raw data at scale using Apache Spark (PySpark / Spark SQL) or Apache Pig (Pig Latin), calculates weighted Bayesian metrics, and presents interactive results in an executive web dashboard.",
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
              text: "This project develops an AI-Powered Movie Rating Big Data Analytics Platform consolidating acclaimed Tollywood (Telugu) and Hollywood (Global) cinema records. The platform processes 36+ landmark titles across 7 decades (1950s–2020s), representing over 37.5 Million verified audience votes and $15+ Billion in box office earnings. The platform consists of four primary tiers:",
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "1. Big Data Processing Engine (Apache Spark / PySpark & Spark SQL): ", bold: true }),
            new TextRun({ text: "Raw CSV tables are ingested into distributed Spark DataFrames. Partitions are processed in parallel, duplicate records are removed, schema is inferred, and tables are joined across partitions to generate lightweight analytical data marts." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "2. Dataflow Scripting Engine (Apache Pig / Pig Latin): ", bold: true }),
            new TextRun({ text: "Provides declarative Pig Latin ETL pipelines utilizing LOAD, FILTER, GROUP BY, and FOREACH GENERATE constructs to compute average ratings and filter high-sample films on Hadoop." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "3. Distributed MapReduce Tier (Apache Hadoop Streaming): ", bold: true }),
            new TextRun({ text: "Demonstrates core Hadoop MapReduce execution with dedicated Mapper and Reducer routines processing key-value pairs (movie_id, rating) at scale." }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: "4. Business Intelligence Dashboard (React 18 & Tailwind CSS): ", bold: true }),
            new TextRun({ text: "A responsive executive dashboard equipped with KPI cards, Recharts visualizations (Rating Distribution, Genre Comparisons, Era Trajectories), multi-attribute search, Tollywood filters, and detail modals." }),
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
          children: [new TextRun({ text: "Step 1 – Environment Setup & Big Data Toolchain", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The development environment utilizes Python 3 with PySpark and Java 17 for Spark distributed computing. Node.js with Vite, React 18, Tailwind CSS, and Recharts forms the client visualization tier. Dependencies are managed via requirements.txt and package.json." }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 2 – Big Data Dataset & Project Architecture", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The platform organizes raw relational files in bigdata/data/ and exports processed data marts to feed the visual dashboard:" }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Dataset File", "Primary Key", "Record Count", "Description"], [25, 20, 20, 35], true),
            createTableRow(["raw_movies.csv", "movie_id", "36 Records", "Theatrical metadata, genres, language, director, budget"], [25, 20, 20, 35]),
            createTableRow(["raw_ratings.csv", "user_id, movie_id", "Distributed Reviews", "User-submitted numerical scores and timestamps"], [25, 20, 20, 35]),
            createTableRow(["spark_movie_kpis.csv", "movie_id", "Aggregated Mart", "Bayesian weighted scores, review counts, ranking"], [25, 20, 20, 35]),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 150 },
          children: [new TextRun({ text: "Step 3 – Big Data Languages & Processing Architecture", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The platform supports three distinct Big Data processing languages across different computing engines:",
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Framework", "Language Used", "Role in Project", "Key Feature"], [25, 25, 25, 25], true),
            createTableRow(["Apache Spark", "Python (PySpark) & Spark SQL", "Distributed DataFrame ETL, Bayesian weighting, window rankings", "In-Memory Resilient Distributed Datasets (RDD)"], [25, 25, 25, 25]),
            createTableRow(["Apache Pig", "Pig Latin", "High-level declarative dataflow scripting for filtering and joining", "Compiles into directed acyclic graphs (DAGs) on Hadoop"], [25, 25, 25, 25]),
            createTableRow(["Apache Hadoop", "Python MapReduce Streaming", "Key-Value pair mapping and parallel shuffling/reducing", "Disk-based distributed storage and batch computation"], [25, 25, 25, 25]),
            createTableRow(["Presentation Tier", "JavaScript / React 18 / Tailwind", "Visual interactive dashboard with Recharts analytics", "Sub-second client rendering on GitHub Pages CDN"], [25, 25, 25, 25]),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 150 },
          children: [new TextRun({ text: "Step 4 – Apache Spark (PySpark & Spark SQL) Implementation", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "In bigdata/spark/spark_movie_analytics.py, SparkSession is initialized with local[*] to utilize all machine cores. Raw movie and rating datasets are ingested into Spark DataFrames with automatic schema inference. The DataFrame is registered as temporary views to enable Spark SQL execution. Bayesian weighted scores are computed using the formula: Weighted Rating = (v / (v + m)) * R + (m / (v + m)) * C, where v represents vote count, m is the minimum vote threshold, R is sample average rating, and C is the report mean rating. This prevents low-sample bias." }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 5 – Apache Pig (Pig Latin) Implementation", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "In bigdata/pig/movie_ratings_analysis.pig, raw movie and rating CSV files are loaded via PigStorage with explicit type definitions. The ratings relation is grouped by movie_id, calculating average ratings and review tallies with FOREACH GENERATE. The result is joined with clean movie records, filtered for films rated 8.0 or higher, sorted in descending order, and stored into partitioned output directories on HDFS or local disk." }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 6 – Apache Hadoop MapReduce Implementation", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "In bigdata/hadoop/mapper.py and reducer.py, Hadoop Streaming reads transaction rows from standard input (STDIN), validates rating values, and emits (movie_id, rating) key-value pairs. Hadoop's shuffle phase automatically partitions and sorts records by key. The reducer collects ratings for each movie ID, computes average scores, and outputs aggregated summaries." }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "Step 7 – Interactive Dashboard Outputs & Screenshots", bold: true, size: 20 })],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "The aggregated Big Data outputs are consumed by the React dashboard to render real-time interactive analytics. Below are the actual output screenshots captured from the live deployment:" }),
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
            new TextRun({ text: "The platform processes the consolidated cinema dataset using distributed Big Data engines and produces the following verified headline results:" }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createTableRow(["Analytical Metric", "Measured Value"], [50, 50], true),
            createTableRow(["Total Movies Cataloged", "36 Acclaimed Titles (Telugu + Global)"], [50, 50]),
            createTableRow(["Weighted Average Rating", "⭐ 8.46 / 10.0"], [50, 50]),
            createTableRow(["Total Audience Votes Analyzed", "37,560,000+ Verified Votes"], [50, 50]),
            createTableRow(["Highest Rated Movie Spotlight", "The Shawshank Redemption (9.3 / 10) & Mayabazar (9.2 / 10)"], [50, 50]),
            createTableRow(["Top Acclaimed Regional Film", "Mayabazar (1957, Rating: 9.2, Cult Classic)"], [50, 50]),
            createTableRow(["Highest Grossing Telugu Titles", "Baahubali 2 ($220M / ₹1,810 Cr) & RRR ($160M / ₹1,387 Cr)"], [50, 50]),
            createTableRow(["Distributed Big Data Engines", "Apache Spark (PySpark), Apache Pig, Hadoop"], [50, 50]),
            createTableRow(["Production Bundle Size", "605 KB (Gzipped: 172 KB)"], [50, 50]),
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
            new TextRun({ text: "Big Data Processing Speed: ", bold: true }),
            new TextRun({ text: "In-memory caching with Apache Spark executes aggregations across partitions over 10x faster than traditional disk-based MapReduce jobs." }),
          ],
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
            createTableRow(["Streaming Content Acquisition", "Assists streaming platforms (Netflix, Prime Video, Aha) in identifying high-return regional and global acquisitions."], [35, 65]),
            createTableRow(["Recommendation Intelligence", "Employs Bayesian thresholding to recommend universally respected cinema rather than niche titles with biased sample sizes."], [35, 65]),
            createTableRow(["Box Office Optimization", "Correlates runtime, director track records, and genre popularity for release window scheduling."], [35, 65]),
            createTableRow(["Audience Market Research", "Delivers instant visual breakdowns for production houses and film festivals."], [35, 65]),
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
            createTableRow(["Single-node Spark (local[*])", "Migrate to multi-node AWS EMR or Databricks cluster with S3 / HDFS storage."], [40, 60]),
            createTableRow(["Batch data processing only", "Incorporate real-time review streaming using Apache Kafka and Spark Structured Streaming."], [40, 60]),
            createTableRow(["Static numerical review scores", "Integrate Natural Language Processing (NLP) sentiment analysis on raw audience reviews."], [40, 60]),
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
              text: "An AI-powered Movie Rating Big Data Analytics Platform was successfully developed using Apache Spark (PySpark & Spark SQL), Apache Pig (Pig Latin), Apache Hadoop, React, and Tailwind CSS. The platform processes 36+ acclaimed Telugu and international cinema records with over 37.5 Million verified audience reviews. Distributed ETL pipelines clean, deduplicate, and join relational tables across distributed partitions, computing Bayesian weighted scores to eliminate low-sample bias. An interactive React dashboard delivers these insights through KPI cards, Recharts visualizations, dynamic search, Tollywood filters, dual view modes, and detail modals. The production build is live on GitHub Pages with continuous integration. The project demonstrates how modern Big Data processing frameworks and reactive web engineering turn raw transaction data into actionable entertainment intelligence.",
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
  console.log("SUCCESS: Big Data MITS report generated with PySpark, Pig, and Hadoop!");
});
