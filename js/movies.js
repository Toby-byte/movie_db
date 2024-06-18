movie_section = document.getElementById('movie_section');

fetch('json/movies.json').then(response => {
    // Check if error is network related
    if (!response.ok) {
        throw new Error('Network responce was not ok' + response.statusText);
    }
    // return the responce as a json file, if responce status 200
    return response.json();
    })
    // make a verialbe that contains the movies array from responce json file (movies.json)
    .then(data => {
        const movies = data.movies
        // For each movie create a 'p' element and add it to the movie section in the HTML file 
        movies.forEach(movie => {
            movieElement = document.createElement('p');
            movieElement.textContent = `${movie.title}`;
            movie_section.appendChild(movieElement);
    });
})
// catch any errors that could occur, fecthing the movies from the json file
.catch( error => {
    console.error('Error fetching movies', error);
    movie_section.textContent = 'Failed to load movies';
});