const URL = "https://www.omdbapi.com/?apikey=cffce37f&"
const selector = document.getElementById("movie");

const fetchAll = (movie) => {
    let movieNameClean = movie.replace(/\s/g, '+');
    fetch(URL + "s=" + movieNameClean)
      .then((response) => response.json())
      .then((response) => {
        let movies = response.Search
        selector.innerHTML = "";
        movies.forEach(movie => {
            if (movie.Poster !== "N/A"){
                const poster = movie.Poster;
                const title = movie.Title;
                const released = movie.Year;
      
                moviesInfo(poster, title, released)
            }
      });
    })
    .catch(error => {
        console.error('error: ', error);
    })
};

const fetchMovies = (movie) => {
    let movieNameClean = movie.replace(/\s/g, '+');
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

const moviesInfo = (poster, title, release) => {
    selector.innerHTML += `
                            <div class="movies-items">
                                <img class="movie-poster" src="${poster}">
                                <div class="movie-bottom">
                                    <h3>${title}</h3>
                                    <h4>${release}</h4>
                                    <button type="submit" class="btn btn-primary" onclick="fetchMovies('${title}')">Read More</button>
                                </div>
                            </div>
                            `
}

const showMovieFetched = (poster, title, release, writer, actors, description) => {
    const showInfoMovie = document.getElementById('modal');
    const infoMovie = document.getElementById('modal');
    showInfoMovie.innerHTML = ""
    infoMovie.classList.remove("hidden");
    showInfoMovie.style.display = "block";
    showInfoMovie.innerHTML += `
                            <div class="content-modal">
                                <span class="close">&times;</span>
                                <img src="${poster}">
                                <h3>${title}</h3>
                                <h4>${release}</h4>
                                <p><strong>Writed by: </strong>${writer}</p>
                                <p><strong>Acted by: </strong>${actors}</p>
                                <p>${description}</p>
                            </div>
                            `
    document.addEventListener('click', () => {
        infoMovie.classList.add("hidden");
        showInfoMovie.style.display = "none";
    })
}