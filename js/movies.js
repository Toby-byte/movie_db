const movie_section = document.getElementById('section');
const searchBar = document.getElementById('searchBar');
const selectCategory = document.getElementById('category');

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
        displayMovies(movies);

        // adds a eventlistener to the search bar it fires, when the value of the input field changes
        searchBar.addEventListener('input', (event) => {
            // when the event happens it takes the input from the searchbar 
            // and converts the input to lowercase
            const searchText = event.target.value.toLowerCase();
            // For each movie in the movies array, it checks if the movie.title includes the searchText.
            const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchText));
            // the displayMovies is used to show the movies that includes the searchtext
            displayMovies(filteredMovies); 
        });
        // adds a eventlistener to the select category button it fires, when the category value changes
        selectCategory.addEventListener('change', (event) => {
            // when the event happens it takes the input from the select category button
            const categoryValue = event.target.value;
            
            // if no category is selected show all movies
            if (categoryValue === "") {
                displayMovies(movies);
            } else {
                // For each movie in the movies array, it checks if the movie.categories includes the category value.
                // this part "movie.categories &&" insures that the movie category is not null before calling includes  
                const filteredCategories = movies.filter(movie => movie.categories && movie.categories.includes(categoryValue));
                displayMovies(filteredCategories);
            }
        });
})
// catch any errors that could occur, fecthing the movies from the json file
.catch( error => {
    console.error('Error fetching movies', error);
    movie_section.textContent = 'Failed to load movies';
});

function displayMovies(movies) {
    movie_section.innerHTML = ''; // clear prevoius search result 

    // For each movie create a 'h1' element and add it to the movie section in the HTML file 
    movies.forEach(movie => {
        // Create the movie title element
        const movieElement = document.createElement('h1');
        movieElement.textContent = `${movie.title}`;

        // Create movie id element
        const movieIDElement = document.createElement('p');
        movieIDElement.textContent =  `Film nr.${movie.id}`;
        
        // Create movie id element
        const movieReleaseDateElement = document.createElement('p');
        movieReleaseDateElement.textContent =  `${movie.release_date}`;
                    
        // Create the big container for movie and heading
        const BigContainerMovieAndHeading = document.createElement('article');
        BigContainerMovieAndHeading.classList.add("BigContainerAndHeading");
        
        // Create the container for the movie image
        const movieContainer = document.createElement('article');
        movieContainer.classList.add("Container");
        
        // Create the image element
        const movieImg = document.createElement('img');
        movieImg.src = `movie_pictures/${movie.title}.webp`;
        movieImg.loading = "lazy"

        // Pointer makes the html element look like it can be clicked 
        movieImg.style.cursor = 'pointer';
        // i add an eventlistener and then redirects me to another page with query parameters
        // these are encoded using the encodeURIComponent so it can be used as parameter in the url
        movieImg.addEventListener('click', () => {
            window.location.href = `movie_or_series_detail.html?title=${encodeURIComponent(movie.title)}&image=${encodeURIComponent(`movie_pictures/${movie.title}.webp`)}`;
        });
        
        // Append the image to the movie container
        movieContainer.appendChild(movieImg);

        // Append the movie container and title element to the big container
        BigContainerMovieAndHeading.appendChild(movieContainer);
        BigContainerMovieAndHeading.appendChild(movieElement);
        BigContainerMovieAndHeading.appendChild(movieIDElement);
        BigContainerMovieAndHeading.appendChild(movieReleaseDateElement);

        // Append the big container to the movie section
        movie_section.appendChild(BigContainerMovieAndHeading);
});
}