import json
import csv

# Define the data
movies = []

# Load movie details from JSON
with open('json/movie_details.json', 'r', encoding='utf-8') as json_file:
    movie_details = json.load(json_file)

# Create a dictionary for quick lookup of release dates by title
release_date_lookup = {movie['title']: movie['release_date'] for movie in movie_details}

# Read movies from CSV and update release dates
with open('csv/movies.csv', 'r', encoding='utf-8') as csv_file:
    csv_array = csv.reader(csv_file)
    headers = next(csv_array)  # Corrected from next(csv_file) to next(csv_array)

    # start id at one
    movie_id = 1

    for row in csv_array:
        title = row[0]
        categories = [category.strip() for category in row[1:] if category]

        # Use the release date from the movie details JSON if available
        release_date = release_date_lookup.get(title, '')

        movie = {
            "id": movie_id,
            "release_date": release_date,
            "title": title,
            "categories": categories
        }

        movies.append(movie)

        # add 1 to the id every time loop is run 
        movie_id += 1

# Wrap the movies list in a dictionary with the key "movies". (don't need to do anything else)
data = {
    "movies": movies
}

with open('json/movies.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)