const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
const watchlistContainer = document.getElementById('watchlist');

displayWatchlist();

function displayWatchlist() {
  watchlistContainer.innerHTML = '';

  watchlist.forEach(movie => {
    const movieItem = document.createElement('li');

    const movieTitle = document.createElement('h2');
    movieTitle.classList.add('movie-title');
    movieTitle.textContent = movie.title;

    const movieOverview = document.createElement('p');
    movieOverview.textContent = movie.overview;

    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeFromWatchlist(movie));

    movieItem.appendChild(movieTitle);
    movieItem.appendChild(movieOverview);
    movieItem.appendChild(moviePoster);
    movieItem.appendChild(removeButton);

    watchlistContainer.appendChild(movieItem);
  });
}

function removeFromWatchlist(movie) {
  const index = watchlist.findIndex(item => item.id === movie.id);
  if (index !== -1) {
    watchlist.splice(index, 1);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist();
  }
}
