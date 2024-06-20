series_section = document.getElementById('series_section');

fetch('json/series.json').then(response => {
    // Check if error is network related
    if (!response.ok) {
        throw new Error('Network responce was not ok' + response.statusText);
    }
    // return the responce as a json file, if responce status 200
    return response.json();
    })
    // make a verialbe that contains the movies array from responce json file (movies.json)
    .then(data => {
        const series = data.series
        // For each movie create a 'p' element and add it to the movie section in the HTML file
        series.forEach(serie => {
            // Create the series title element
            seriesElement = document.createElement('h1');
            seriesElement.textContent = `${serie.title}`;

            // Create the big container for series and heading
            const BigContainerSeriesAndHeading = document.createElement('article');
            BigContainerSeriesAndHeading.classList.add("BigContainerSeriesAndHeading");
            
            // Create the container for the series image
            const seriesContainer = document.createElement('article');
            seriesContainer.classList.add("seriesContainer");

            // Create the image element
            const seriesImg = document.createElement('img');
            seriesImg.src = `series_pictures/${serie.title}.webp`;

            // Append the image to the series container
            seriesContainer.appendChild(seriesImg);

            // Append the series container and title element to the big container
            BigContainerSeriesAndHeading.appendChild(seriesContainer);
            BigContainerSeriesAndHeading.appendChild(seriesElement);

            // Append the big container to the series section
            series_section.appendChild(BigContainerSeriesAndHeading);
        });
})
// catch any errors that could occur, fecthing the movies from the json file
.catch( error => {
    console.error('Error fetching series', error);
    series_section.textContent = 'Failed to load series';
});