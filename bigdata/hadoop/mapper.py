#!/usr/bin/env python3
"""
HADOOP MAPREDUCE (PYTHON STREAMING): MAPPER
Course: Big Data Analytics and AI Applications (23CAI205)
Institution: Madanapalle Institute of Technology & Science (MITS)
Student: Sasikala Velpula (24691A31O7)
"""

import sys

def mapper():
    for line in sys.stdin:
        line = line.strip()
        if not line or line.startswith("user_id"):
            continue

        parts = line.split(",")
        if len(parts) >= 3:
            movie_id = parts[1].strip()
            rating = parts[2].strip()
            try:
                float(rating)
                # Emit Key-Value pair: movie_id \t rating
                print(f"{movie_id}\t{rating}")
            except ValueError:
                continue

if __name__ == "__main__":
    mapper()
