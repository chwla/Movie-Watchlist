const apiKey = 'fa49e15f0e87ff6b838e67136b507e17';
const search = document.getElementById('search');
const sButton = document.getElementById('sButton');
const moviesList = document.getElementById('moviesList');

search.addEventListener('click', searchMovies);

function searchMovies() {
  const query = search.value.trim();
  if (query === '') {
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayMovies(data.results);
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

function displayMovies(movies) {
  moviesList.innerHTML = '';

  movies.forEach(movie => {
    const movieItem = document.createElement('li');

    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;

    const movieOverview = document.createElement('p');
    movieOverview.textContent = movie.overview;

    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;

    const watchlistButton = document.createElement('button');
    watchlistButton.textContent = 'Add to Watchlist';
    watchlistButton.addEventListener('click', () => addToWatchlist(movie));

    movieItem.appendChild(movieTitle);
    movieItem.appendChild(moviePoster);
    movieItem.appendChild(movieOverview);
    movieItem.appendChild(watchlistButton);

    moviesList.appendChild(movieItem);
  });
}

function addToWatchlist(movie) {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}
