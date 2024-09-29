def check_missing_commas_in_csv(input_file):
    with open(input_file, 'r') as infile:
        for line_number, line in enumerate(infile, start=1):
            if ',' not in line:
                print(f"Line {line_number} is missing a comma: {line.strip()}")

# Example usage
input_csv = 'csv\movies.csv'
check_missing_commas_in_csv(input_csv)

# will return nothing, if there is no missing commas