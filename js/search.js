const searchBar = document.querySelector('form');

searchBar.addEventListener('submit', (e) => {
    const submitSearch = document.getElementById('search-movie').value;
    e.preventDefault();
    fetchMovies(submitSearch);
});