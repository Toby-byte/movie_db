import json
import csv

# create movies

# Define the data
movies = []

with open('csv/movies.csv', 'r', encoding='utf-8') as csv_file:
    csv_array = csv.DictReader(csv_file)

    for row in csv_array:
        movies.append(row)

# Wrap the movies list in a dictionary with the key "movies". (don't need to do anything else)
data = {
    "movies": movies
}

with open('json/movies.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False ,indent=4)

# create series

series = []

with open('csv/series.csv', 'r', encoding='utf-8') as csv_file:
    csv_array = csv.DictReader(csv_file)

    for row in csv_array:
        series.append(row)

data = {
    "series": series
}

with open('json/series.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

# create missing series and movies

mangler = []

with open('csv/mangler.csv', 'r', encoding='utf-8') as csv_file:
    csv_array = csv.DictReader(csv_file)

    for row in csv_array:
        mangler.append(row)

data = {
    "mangler": mangler
}

with open('json/mangler.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)