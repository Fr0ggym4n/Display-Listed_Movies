const URL = "https://www.omdbapi.com/?apikey=cffce37f&"
const imgURL = "http://img.omdbapi.com/?apikey=cffce37f&"

const selector = document.getElementById("movie");

const fetchMovies = (movie) => {
    var movieNameClean = movie.replace(/\s/g, '+');
    fetch(URL + "t=" + movieNameClean)
        .then((response) => response.json())
        .then(movie => {
            const moviePoster = movie.Poster;
            const movieTitle = movie.Title;
            const movieRelease = movie.Released;
            const movieWriter = movie.Writer;
            const movieActors = movie.Actors;
            const movieDescription = movie.Plot;

            showMovieFetched(moviePoster, movieTitle, movieRelease, movieWriter, movieActors, movieDescription);
        })
        .catch(error => {
            console.error('error: ', error);
        })
}

const fetchAll = (movie) => {
    fetch(URL + "s=" + movieNameClean)
      .then((response) => response.json())
      .then((response) => {
        let movies = response.Search
        selector.innerHTML = "";
        console.log(response);
        movies.forEach(movie => {
          const poster = movie.Poster;
          const title = movie.Title;
          const released = movie.Year;
          const movieId = movie.imdbID
          showFilmInfo(poster, title, released, movieId)
      });
    })

}

const moviesInfo = (poster, title, release, movieId) => {
    selector.innerHTML += `
                            <div class="movies-items not-visible">
                                <img class="movie-poster" src="${poster}" onclick="fetchAll(${movieId})">
                                <div class="movie-bottom">
                                    <h3>${title}</h3>
                                    <h4>${release}</h4>
                                </div>
                            </div>
                            `
}

const showMovieFetched = (poster, title, release, writer, actors, description) => {
    selector.innerHTML += `
                            <div class="movie-items not-visible">
                                <img class="movie-poster" src="${poster}">
                                <div class="movie-bottom">
                                    <h3>${title}</h3>
                                    <h4>${release}</h4>
                                    <p><strong>Writed by: </strong> ${writer}</p>
                                    <p><strong>Acted by: </strong> ${actors}</p>
                                    <p>${description}</p>
                                </div>
                            </div>
                            `
}

