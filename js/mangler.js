movie_section = document.getElementById('section');

fetch('json/mangler.json').then(response => {
    // Check if error is network related
    if (!response.ok) {
        throw new Error('Network responce was not ok' + response.statusText);
    }
    // return the responce as a json file, if responce status 200
    return response.json();
    })
    // make a verialbe that contains the movies array from responce json file (movies.json)
    .then(data => {
        const mangler = data.mangler
        // For each movie create a 'h1' element and add it to the movie section in the HTML file 
        mangler.forEach(mangler => {
            // Create the movie title element
            const movieElement = document.createElement('h1');
            movieElement.textContent = `${mangler.title}`;
                        
            // Create the big container for movie and heading
            const BigContainerMovieAndHeading = document.createElement('article');
            BigContainerMovieAndHeading.classList.add("BigContainerAndHeading");
            
            // Create the container for the movie image
            const movieContainer = document.createElement('article');
            movieContainer.classList.add("Container");
            
            // Create the image element
            const movieImg = document.createElement('img');
            movieImg.src = `missing_movies_and_series/${mangler.title}.webp`;
            
            // Append the image to the movie container
            movieContainer.appendChild(movieImg);

            // Append the movie container and title element to the big container
            BigContainerMovieAndHeading.appendChild(movieContainer);
            BigContainerMovieAndHeading.appendChild(movieElement);

            // Append the big container to the movie section
            movie_section.appendChild(BigContainerMovieAndHeading);
    });
})
// catch any errors that could occur, fecthing the movies from the json file
.catch( error => {
    console.error('Error fetching movies', error);
    movie_section.textContent = 'Failed to load movies';
});