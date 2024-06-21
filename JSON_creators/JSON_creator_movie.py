import json
import csv

# create movies

# Define the data
movies = []

with open('csv/movies.csv', 'r', encoding='utf-8') as csv_file:
    csv_array = csv.reader(csv_file)
    headers = next(csv_file)

    # start id at one
    serie_id = 1

    for row in csv_array:
        title = row[0]

        categories = [category.strip() for category in row[1:] if category]

        movie = {
            "id":serie_id,
            "title": title,
            "categories": categories 
        }

        movies.append(movie)

        # add 1 to the id every time loop is run 
        serie_id += 1

# Wrap the movies list in a dictionary with the key "movies". (don't need to do anything else)
data = {
    "movies": movies
}

with open('json/movies.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)