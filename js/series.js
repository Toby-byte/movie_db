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
            seriesElement = document.createElement('p');
            seriesElement.textContent = `${serie.title}`;
            series_section.appendChild(seriesElement);
        });
})
// catch any errors that could occur, fecthing the movies from the json file
.catch( error => {
    console.error('Error fetching series', error);
    series_section.textContent = 'Failed to load series';
});