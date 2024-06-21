const series_section = document.getElementById('section');
const searchBar = document.getElementById('searchBar');
const selectCategory = document.getElementById('category');

fetch('json/series.json').then(response => {
    // Check if error is network related
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    // Return the response as a JSON file, if response status 200
    return response.json();
})
// Make a variable that contains the series array from response JSON file (series.json)
.then(data => {
    const series = data.series;
    displaySeries(series);

    // Adds an event listener to the search bar that fires when the value of the input field changes
    searchBar.addEventListener('input', (event) => {
        // When the event happens, it takes the input from the search bar 
        // and converts the input to lowercase
        const searchText = event.target.value.toLowerCase();
        // For each series in the series array, it checks if the series.title includes the searchText.
        const filteredSeries = series.filter(serie => serie.title.toLowerCase().includes(searchText));
        // The displaySeries is used to show the series that includes the searchText
        displaySeries(filteredSeries); 
    });

    selectCategory.addEventListener('change', (event) => {
        const categoryValue = event.target.value;

        if (categoryValue === "") {
            displaySeries(series)
        } else {
            const filteredCategories = series.filter(serie => serie.categories && serie.categories.includes(categoryValue));
            displaySeries(filteredCategories);
        }
    });
})
// Catch any errors that could occur while fetching the series from the JSON file
.catch(error => {
    console.error('Error fetching series', error);
    series_section.textContent = 'Failed to load series';
});

function displaySeries(series) {
    // Clear previous series to avoid duplication
    series_section.innerHTML = '';

    // For each series, create elements and add them to the series section in the HTML file
    series.forEach(serie => {
        // Create the series title element
        const seriesElement = document.createElement('h1');
        seriesElement.textContent = `${serie.title}`;

        const serieIDElement = document.createElement('p');
        serieIDElement.textContent = `Serie nr.${serie.id}`;
        
        // Create the big container for series and heading
        const BigContainerSeriesAndHeading = document.createElement('article');
        BigContainerSeriesAndHeading.classList.add("BigContainerAndHeading");

        // Create the container for the series image
        const seriesContainer = document.createElement('article');
        seriesContainer.classList.add("Container");

        // Create the image element
        const seriesImg = document.createElement('img');
        seriesImg.src = `series_pictures/${serie.title}.webp`;

        // Pointer makes the html element look like it can be clicked
        seriesImg.style.cursor = 'pointer';
        // i add an eventlistener and then redirects me to another page with query parameters
        // these are encoded using the encodeURIComponent so it can be used as parameter in the url
        seriesImg.addEventListener('click', () => {
            window.location.href = `movie_or_series_detail.html?title=${encodeURIComponent(serie.title)}&image=${encodeURIComponent(`series_pictures/${serie.title}.webp`)}`;
        });

        // Append the image to the series container
        seriesContainer.appendChild(seriesImg);

        // Append the series container and title element to the big container
        BigContainerSeriesAndHeading.appendChild(seriesContainer);
        BigContainerSeriesAndHeading.appendChild(seriesElement);
        BigContainerSeriesAndHeading.appendChild(serieIDElement);

        // Append the big container to the series section
        series_section.appendChild(BigContainerSeriesAndHeading);
    });
}