// runs the getQueryParameteres() function
const parameters = getQueryParameteres();
// uses the parameters variable to get the title of the movie
const title = parameters.title;
// uses the parameters variable to get the image of the movie
const image = parameters.image;

const overview_section = document.getElementById("overview_section");

// Sets the HTML elements to the title and image of the movie
if (image && title) {
    document.getElementById("title").textContent = title;
    document.getElementById("image").src = image;
} else {
    document.body.textContent("Error: Movie title or image not found")
}

fetchMovieDetails();

async function fetchMovieDetails() {
    try {
        const response = await fetch("json/movie_details.json");
        const data = await response.json();

        // Log the data to debug
        console.log(data); // Check what the data looks like

        // Iterate over each movie to fetch details
        for (const movie of data) {
            const movieTitle = movie.title;

            if (movieTitle === title) {
                const overview = movie.overview;
                const overviewElement = document.createElement('p');
                overviewElement.textContent = overview;

                const release_date = movie.release_date;
                const release_dateElement = document.createElement('p');
                release_dateElement.textContent = release_date;

                overview_section.appendChild(overviewElement);
                overview_section.appendChild(release_dateElement);
            }
        }
    } catch (error) {
        console.error('Error creating overview',error);
    }
}

// -------------Functions down here here-------------

function getQueryParameteres() {
    // A object is created to store key value pairs
    const parameters = {};
    // returns the query string part of the URL fx. title=Inception&image=movie_pictures/Inception.webp
    // substring(1) removes the first character in this case the "?" from the string 
    window.location.search.substring(1)
    // splits the string based on a string in this case "&"
    // this will turn the url into an array of parameters fx. ["title=Inception","mage=movie_pictures/Inception.webp"]
    .split("&")
    // Then we go through the array with parameters using forEach 
    .forEach(parameter => {
        // For each parameter, we use the split method, so fx. title=Inception
        // Turns into "key = title" and "value = Inception" in the array    
        const [key, value] = parameter.split("=");
        // Then the parameters are decoded and stored in the parameter object
        // This is important because URLs can encode certain characters (e.g., spaces as %20)
        parameters[decodeURIComponent(key)] = decodeURIComponent(value); 
    });
    return parameters
};

// This is how the parameter object will look after the getQueryParameteres() function has run
// {
//     title: "Inception",
//     image: "movie_pictures/Inception.webp"
// }