import csv
import requests
import json

# Your API key
api_key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWYxN2E1NzdiODM5ZWY5Y2UxMGRlNzMwOGU0ZWY3ZSIsIm5iZiI6MTcxOTA0Nzg2NS4xOTIyOTksInN1YiI6IjY2NzE0ZjVjNDA4ZjNiMmE3NDNmMGFkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9PSTDDH8FctSLSmSGaigt2W5M-ydlrWtc8vbg8yQa2k"  # Replace with your actual API key

# CSV file containing the movie titles and API IDs
csv_file = 'csv/movies_API_ID.csv'  # Replace with your CSV file name

# JSON file to write the results to
json_file = 'json/movie_details.json'

# Prepare headers with API key
headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {api_key}"
}

# List to store the movie details
movie_details = []

# Read the CSV file
with open(csv_file, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        title = row['title']
        api_id = row['apiID']

        # Construct the URL for the API request
        url = f"https://api.themoviedb.org/3/movie/{api_id}?language=da"

        # Make the request
        response = requests.get(url, headers=headers)

        # Check if request was successful
        if response.status_code == 200:
            data = response.json()
            # Extract the required information
            overview = data.get('overview', '')
            release_date = data.get('release_date', '')
            production_companies = [company['name'] for company in data.get('production_companies', [])]

            # Append the details to the list
            movie_details.append({
                'title': title,
                'api_id': api_id,
                'overview': overview,
                'release_date': release_date,
                'production_companies': production_companies
            })
        else:
            print(f"Failed to retrieve data for '{title}'. Status code: {response.status_code}")

# Write the details to a JSON file
with open(json_file, 'w', encoding='utf-8') as file:
    json.dump(movie_details, file, ensure_ascii=False, indent=4)

print(f"Movie details have been written to {json_file}")