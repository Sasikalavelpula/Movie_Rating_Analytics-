"""
================================================================================
APACHE SPARK / PYSPARK & SPARK SQL: MOVIE RATING BIG DATA ANALYTICS PIPELINE
Course: Big Data Analytics and AI Applications (23CAI205)
Institution: Madanapalle Institute of Technology & Science (MITS)
Student: Sasikala Velpula (24691A31O7)
================================================================================
"""

import sys
import os

try:
    from pyspark.sql import SparkSession
    from pyspark.sql.functions import (
        col, avg, count, round as spark_round, split, explode,
        when, desc, lit, to_timestamp, from_unixtime
    )
    from pyspark.sql.window import Window
    SPARK_AVAILABLE = True
except ImportError:
    SPARK_AVAILABLE = False


def run_spark_pipeline(data_dir="bigdata/data", output_dir="bigdata/output"):
    print("=" * 80)
    print("INITIALIZING APACHE SPARK (PYSPARK & SPARK SQL) DISTRIBUTED PIPELINE")
    print("=" * 80)

    if not SPARK_AVAILABLE:
        print("[NOTICE] PySpark module not directly installed in this environment.")
        print("Displaying full Spark pipeline source & architecture for execution in Spark cluster.")
        return

    # Step 1: Initialize SparkSession with local[*] cluster
    spark = SparkSession.builder \
        .appName("MovieRatingAnalyticsMITS") \
        .master("local[*]") \
        .config("spark.sql.shuffle.partitions", "4") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("WARN")
    print(f"[*] Spark Master: {spark.sparkContext.master}")
    print(f"[*] Spark Version: {spark.version}")

    movies_path = os.path.join(data_dir, "raw_movies.csv")
    ratings_path = os.path.join(data_dir, "raw_ratings.csv")

    # Step 2: Distributed Data Ingestion & Schema Inference
    print(f"\n[1] Ingesting raw movie records from {movies_path}...")
    movies_df = spark.read.csv(movies_path, header=True, inferSchema=True)
    movies_df = movies_df.dropDuplicates(["movie_id"]).dropna(subset=["movie_id", "title"])
    movies_df.printSchema()

    print(f"\n[2] Ingesting raw user ratings from {ratings_path}...")
    ratings_df = spark.read.csv(ratings_path, header=True, inferSchema=True)
    ratings_df = ratings_df.withColumn("rated_at", from_unixtime(col("timestamp")))
    ratings_df.printSchema()

    # Step 3: Register Temporary Views for Spark SQL
    movies_df.createOrReplaceTempView("movies")
    ratings_df.createOrReplaceTempView("ratings")

    # Step 4: Distributed Join & Rating Aggregation via Spark SQL
    print("\n[3] Executing Spark SQL Aggregation across Distributed Partitions...")
    aggregated_ratings = spark.sql("""
        SELECT 
            m.movie_id,
            m.title,
            m.release_year,
            m.language,
            m.genres,
            m.director,
            m.box_office_usd,
            COUNT(r.rating) AS total_user_reviews,
            ROUND(AVG(r.rating), 2) AS sample_avg_rating
        FROM movies m
        LEFT JOIN ratings r ON m.movie_id = r.movie_id
        GROUP BY 
            m.movie_id, m.title, m.release_year, m.language, 
            m.genres, m.director, m.box_office_usd
    """)

    # Step 5: Bayesian Weighted Score Calculation
    # Formula: WR = (v / (v + m)) * R + (m / (v + m)) * C
    C = aggregated_ratings.select(avg("sample_avg_rating")).first()[0] or 8.5
    m = 2  # minimum reviews threshold

    weighted_df = aggregated_ratings.withColumn(
        "weighted_score",
        spark_round(
            (col("total_user_reviews") / (col("total_user_reviews") + lit(m))) * col("sample_avg_rating") +
            (lit(m) / (col("total_user_reviews") + lit(m))) * lit(C),
            2
        )
    ).orderBy(desc("weighted_score"))

    print("\n[TopAcclaimed Movies in Spark]")
    weighted_df.select("title", "language", "release_year", "weighted_score", "director").show(10, truncate=False)

    # Step 6: Genre Explode and Cross-Genre Quality Benchmarking
    print("\n[4] Computing Genre-Level Benchmarks (PySpark Explode)...")
    genre_df = movies_df.withColumn("genre", explode(split(col("genres"), "\\|")))
    genre_metrics = genre_df.join(ratings_df, "movie_id") \
        .groupBy("genre") \
        .agg(
            count("*").alias("total_ratings_count"),
            spark_round(avg("rating"), 2).alias("avg_genre_rating")
        ) \
        .orderBy(desc("avg_genre_rating"))

    genre_metrics.show(10, truncate=False)

    # Step 7: Regional Cinema Analysis (Telugu vs. International)
    print("\n[5] Regional Cinema Analysis (Tollywood vs Global)...")
    regional_summary = weighted_df.groupBy("language") \
        .agg(
            count("*").alias("title_count"),
            spark_round(avg("weighted_score"), 2).alias("avg_industry_score")
        )
    regional_summary.show()

    # Step 8: Save Output Marts to Storage
    os.makedirs(output_dir, exist_ok=True)
    out_csv = os.path.join(output_dir, "spark_movie_kpis.csv")
    print(f"\n[6] Exporting Spark Data Mart to {out_csv}...")
    weighted_df.coalesce(1).write.mode("overwrite").option("header", "true").csv(out_csv)

    print("\n[SUCCESS] PySpark distributed pipeline completed successfully!")
    spark.stop()


if __name__ == "__main__":
    run_spark_pipeline()
