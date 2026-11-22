-- ==============================================================================
-- APACHE PIG (PIG LATIN): MOVIE RATING DISTRIBUTED ETL & ANALYTICS PIPELINE
-- Course: Big Data Analytics and AI Applications (23CAI205)
-- Institution: Madanapalle Institute of Technology & Science (MITS)
-- Student: Sasikala Velpula (24691A31O7)
-- ==============================================================================

-- Step 1: Load Raw Datasets from HDFS or Local Storage
raw_movies = LOAD 'bigdata/data/raw_movies.csv' USING PigStorage(',') AS (
    movie_id:int,
    title:chararray,
    release_year:int,
    genres:chararray,
    language:chararray,
    director:chararray,
    runtime_min:int,
    budget_usd:long,
    box_office_usd:long
);

raw_ratings = LOAD 'bigdata/data/raw_ratings.csv' USING PigStorage(',') AS (
    user_id:int,
    movie_id:int,
    rating:float,
    timestamp:long
);

-- Step 2: Filter Header Rows and Invalid Values
clean_movies = FILTER raw_movies BY movie_id IS NOT NULL AND title != 'title';
clean_ratings = FILTER raw_ratings BY movie_id IS NOT NULL AND rating >= 0.0;

-- Step 3: Group Ratings by Movie and Compute Aggregate Statistics
ratings_grouped = GROUP clean_ratings BY movie_id;

movie_stats = FOREACH ratings_grouped GENERATE
    group AS movie_id,
    COUNT(clean_ratings.rating) AS total_reviews,
    ROUND(AVG(clean_ratings.rating) * 100.0) / 100.0 AS avg_rating;

-- Step 4: Join Movies Metadata with Aggregated Rating Statistics
joined_movie_data = JOIN clean_movies BY movie_id, movie_stats BY movie_id;

-- Step 5: Project Final Analytics Schema
projected_movies = FOREACH joined_movie_data GENERATE
    clean_movies::movie_id AS movie_id,
    clean_movies::title AS title,
    clean_movies::release_year AS release_year,
    clean_movies::language AS language,
    clean_movies::genres AS genres,
    clean_movies::director AS director,
    movie_stats::avg_rating AS avg_rating,
    movie_stats::total_reviews AS total_reviews;

-- Step 6: Filter Top-Tier Acclaimed Movies (Threshold: avg_rating >= 8.0)
top_rated_movies = FILTER projected_movies BY avg_rating >= 8.0;

-- Step 7: Order by Rating Descending, then Total Reviews Descending
sorted_movies = ORDER top_rated_movies BY avg_rating DESC, total_reviews DESC;

-- Step 8: Separate Telugu Cinema (Tollywood) Benchmark
telugu_movies = FILTER sorted_movies BY language == 'Telugu';

-- Step 9: Store Processed Data Marts to Output
STORE sorted_movies INTO 'bigdata/output/pig_top_movies' USING PigStorage(',');
STORE telugu_movies INTO 'bigdata/output/pig_telugu_movies' USING PigStorage(',');

-- Display Final Ranked Results (DUMP for Interactive Grunt Shell)
-- DUMP sorted_movies;
