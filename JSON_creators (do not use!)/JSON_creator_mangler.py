import json
import csv

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