let movieDataMap;

fetch('../labb1/json/data.json', {mode : 'no-cors'})
    .then(response => {
        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Parse the JSON from the response
        return response.json();
    })
    .then(data => {
        movieDataMap = new Map(data.map(movie => [movie.id, movie]));
        populateMovieList();
    })
    .catch(error => console.error(error));
// Function to populate the movie list
function populateMovieList() {
    const movieTemplate = document.getElementById('movieTemplate');
    const movieListContainer = document.getElementById('movieListContainer');

    movieDataMap.forEach((movie) => {
        const movieItem = movieTemplate.content.cloneNode(true);
        const movieTitle = movieItem.querySelector('#movieTitle');
        const movieImage = movieItem.querySelector('#movieImage');
        const starIcon = movieItem.querySelector('#starIcon');

        movieItem.querySelector('#movieTitle').textContent = movie.title;
        movieItem.querySelector('#movieGenre').textContent = movie.genre;
        movieItem.querySelector('#movieDirector').textContent = "Director: " + movie.director;
        movieItem.querySelector('#movieYear').textContent = movie.year;
        movieItem.querySelector('#movieRating').textContent = "Rating: " + movie.rating;

        // Check if the movie has an image URL
        if (movie.imageUrl) {
            movieItem.querySelector('#movieImage').src = movie.imageUrl;
        } else {
            // Use the default image URL from your img folder
            movieItem.querySelector('#movieImage').src = "img/cam.png";
        }

        // Toggle the 'favorite' class on the star icon based on the 'favourite' property of the movie
        starIcon.classList.toggle('favorite', movie.favourite);

        // event listener to the star icon
        starIcon.addEventListener("click", () => {
            movie.favourite = !movie.favourite;
            starIcon.classList.toggle('favorite', movie.favourite);
            updateFavouriteList(movie.id);
        });

        // Add click event listener to the movie title and image
        [movieTitle, movieImage].forEach((element) => {
            element.addEventListener("click", () => {
                window.location.href = "movie-details.html?id=" + movie.id;
            });
        });

        movieListContainer.appendChild(movieItem);


    });

}
