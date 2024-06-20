// runs the getQueryParameteres() function
const parameters = getQueryParameteres();
// uses the parameters variable to get the title of the movie
const title = parameters.title;
// uses the parameters variable to get the image of the movie
const image = parameters.image;

// Sets the HTML elements to the title and image of the movie
if (image && title) {
    document.getElementById("title").textContent = title;
    document.getElementById("image").src = image;
} else {
    document.body.textContent("Error: Movie title or image not found")
}


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
