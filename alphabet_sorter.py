import csv

def sort_csv_alphabetically(input_file, output_file):
    # Open the input CSV file for reading
    with open(input_file, 'r', newline='') as infile:
        reader = csv.reader(infile)
        # Read the header (first line) separately
        header = next(reader)

        # Sort the rest of the rows alphabetically
        sorted_rows = sorted(reader, key=lambda row: [str(cell).lower() for cell in row])

    # Write the sorted data into the output CSV file
    with open(output_file, 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        # Write the header back first
        writer.writerow(header)
        # Write the sorted rows
        writer.writerows(sorted_rows)

# Example usage
input_csv = 'csv\movies.csv'
output_csv = 'csv\sorted_movies.csv'
sort_csv_alphabetically(input_csv, output_csv)

print(f"Sorted CSV file has been saved as {output_csv}")