import json
import csv

# create series

series = []

with open('csv/series.csv', 'r', encoding='utf-8') as csv_file:
    csv_array = csv.reader(csv_file)
    headers = next(csv_file)

    for row in csv_array:
        title = row[0]

        categories = [category.strip() for category in row[1:] if category]

        serie = {
            "title": title,
            "categories": categories 
        }
        
        series.append(serie)

data = {
    "series": series
}

with open('json/series.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)