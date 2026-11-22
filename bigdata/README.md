# Big Data Analytics Architecture: Movie Rating Intelligence Platform

**Course:** Big Data Analytics and AI Applications (23CAI205)  
**Institution:** Madanapalle Institute of Technology & Science (MITS)  
**Student:** Sasikala Velpula (24691A31O7)  

---

## 🚀 Overview of Big Data Languages & Frameworks Used

This project implements distributed data engineering and analytics using the three core pillars of modern Big Data processing:

| Technology | Language(s) Used | Architectural Role | Execution Mode |
| :--- | :--- | :--- | :--- |
| **Apache Spark** | **Python (PySpark)** & **Spark SQL** | In-memory distributed ETL, schema inference, Bayesian weighted ranking, genre exploding | Local[*] cluster / YARN / Standalone |
| **Apache Pig** | **Pig Latin** | Declarative dataflow scripting, relational joins, filtering, and data mart export | MapReduce / Tez execution engine |
| **Apache Hadoop** | **Python Streaming (Mapper & Reducer)** | Distributed disk-based parallel computation for massive review logs | Hadoop HDFS & YARN |
| **Presentation Tier** | **JavaScript / React 18 / Tailwind** | Real-time BI visualization of the processed Big Data marts | Client browser & GitHub Pages CDN |

---

## 1. Apache Spark Pipeline (PySpark & Spark SQL)

Located in `bigdata/spark/spark_movie_analytics.py`:
- **SparkSession Creation**: Initialized with `local[*]` to exploit multi-core parallelism.
- **Distributed Ingestion**: Reads `raw_movies.csv` and `raw_ratings.csv` with automatic schema inference and deduplication.
- **Spark SQL Integration**: Registers temporary views `movies` and `ratings` to execute SQL queries.
- **Bayesian Weighted Rating**: Computes true Bayesian averages avoiding low-sample bias:
  $$\text{WR} = \left(\frac{v}{v+m}\right) \cdot R + \left(\frac{m}{v+m}\right) \cdot C$$
- **Genre Explode & Window Functions**: Computes cross-genre benchmarks and ranks top cinema titles per category.
- **Data Mart Export**: Outputs clean, pre-aggregated analytics marts into `bigdata/output/` that feed directly into the React dashboard.

### How to Run Spark Job:
```bash
spark-submit --master local[*] bigdata/spark/spark_movie_analytics.py
# or via Python with PySpark installed:
python bigdata/spark/spark_movie_analytics.py
```

---

## 2. Apache Pig Pipeline (Pig Latin)

Located in `bigdata/pig/movie_ratings_analysis.pig`:
- **Declarative Dataflow**: Written in **Pig Latin**, designed for processing large datasets without writing complex Java MapReduce code.
- **Operations**:
  - `LOAD`: Ingests delimited records with strict Pig schemas.
  - `FILTER`: Cleans missing/corrupt ratings and eliminates header rows.
  - `GROUP BY`: Groups millions of user ratings per `movie_id`.
  - `FOREACH ... GENERATE`: Computes `AVG(rating)` and `COUNT(rating)`.
  - `JOIN`: Joins ratings summary with film metadata.
  - `STORE`: Exports data marts directly into HDFS or local filesystem.

### How to Run Pig Job:
```bash
pig -x local bigdata/pig/movie_ratings_analysis.pig
# In Hadoop cluster mode:
pig -x mapreduce bigdata/pig/movie_ratings_analysis.pig
```

---

## 3. Apache Hadoop MapReduce Pipeline

Located in `bigdata/hadoop/mapper.py` and `bigdata/hadoop/reducer.py`:
- **Mapper**: Reads raw transaction logs from `STDIN` and emits key-value pairs `(movie_id, rating)`.
- **Hadoop Shuffling**: Automatically partitions and sorts records by `movie_id`.
- **Reducer**: Aggregates rating counts and computes the mean rating per film.

### How to Test Locally & On Hadoop:
```bash
# Local testing with Unix pipes:
cat bigdata/data/raw_ratings.csv | python bigdata/hadoop/mapper.py | sort | python bigdata/hadoop/reducer.py

# On Hadoop Cluster (Hadoop Streaming):
hadoop jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-streaming-*.jar \
  -input /hdfs/path/raw_ratings.csv \
  -output /hdfs/path/output_ratings \
  -mapper "python3 mapper.py" \
  -reducer "python3 reducer.py" \
  -file bigdata/hadoop/mapper.py \
  -file bigdata/hadoop/reducer.py
```

---

## 4. End-to-End Pipeline Data Flow

```
[ Raw CSV Files / HDFS ]
           │
           ├──► [ Apache Pig (Pig Latin ETL) ]
           │
           ├──► [ Apache Hadoop (MapReduce Streaming) ]
           │
           └──► [ Apache Spark (PySpark & Spark SQL Distributed Engine) ]
                                   │
                                   ▼
                      [ Aggregated Data Marts ]
                                   │
                                   ▼
           [ React 18 + Tailwind CSS + Recharts Dashboard ]
             (Live at: https://sasikalavelpula.github.io/Movie_Rating_Analytics-/)
```
