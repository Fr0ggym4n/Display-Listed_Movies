const searchBar = document.querySelector("form");

searchBar.addEventListener('submit', (e) => {
    const submitSearch = document.getElementById('searchButton').value;
    e.preventDefault();
    fetchAll(submitSearch);
});