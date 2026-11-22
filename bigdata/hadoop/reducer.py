#!/usr/bin/env python3
"""
HADOOP MAPREDUCE (PYTHON STREAMING): REDUCER
Course: Big Data Analytics and AI Applications (23CAI205)
Institution: Madanapalle Institute of Technology & Science (MITS)
Student: Sasikala Velpula (24691A31O7)
"""

import sys

def reducer():
    current_movie = None
    total_rating = 0.0
    count = 0

    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue

        parts = line.split("\t")
        if len(parts) != 2:
            continue

        movie_id, rating = parts[0], parts[1]
        try:
            rating = float(rating)
        except ValueError:
            continue

        if current_movie == movie_id:
            total_rating += rating
            count += 1
        else:
            if current_movie:
                avg_rating = round(total_rating / count, 2)
                print(f"{current_movie}\t{count}\t{avg_rating}")

            current_movie = movie_id
            total_rating = rating
            count = 1

    if current_movie:
        avg_rating = round(total_rating / count, 2)
        print(f"{current_movie}\t{count}\t{avg_rating}")

if __name__ == "__main__":
    reducer()
