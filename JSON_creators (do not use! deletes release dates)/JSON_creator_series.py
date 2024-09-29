import json
import csv

# create series

series = []

with open('csv/series.csv', 'r', encoding='utf-8') as csv_file:
    # read csv file into an array 
    csv_array = csv.reader(csv_file)
    headers = next(csv_file) # skip header row in csv file

    # start id at one
    serie_id = 1

    for row in csv_array:
        title = row[0]
        # combine all categories into an array
        categories = [category.strip() for category in row[1:] if category]

        # define the json object
        serie = {
            "id":serie_id,
            "title": title,
            "categories": categories 
        }
        # add the json object to the json file 
        series.append(serie)

        # add 1 to the id every time loop is run 
        serie_id += 1
# all data to be added
data = {
    "series": series
}

# write the data to the json file, don't make any ascii charecters and indent by 4 
with open('json/series.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)