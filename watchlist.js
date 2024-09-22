const clearWatchlistButton = document.getElementById('clear-watchlist');
const buttonRemoveFromWatchList = document.querySelector('#remove-from-watchlist-button');

//function to display the watchlist
function displayWatchList(movie){
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

//function to display the watchlist in the DOM when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  const watchlistContainer = document.querySelector('.watchlist');
  
  //looping through the watchlist and displaying each movie in the DOM
  watchlist.forEach(movie => {
    let movieCard = document.createElement('li');
    movieCard.classList.add('movie-card');

    const truncatedDescription = truncateDescription(movie.Plot || 'N/A', MAX_LENGTH);
    const showReadMore = (movie.Plot || 'N/A').length >= MAX_LENGTH;

    movieCard.innerHTML = `
    <div class="movie-card__main-container">
      <div class="movie-card__poster-container">
        <img src="${movie.Poster}" alt="${movie.Title} poster" class="movie-card__poster">
      </div>
      <div class="movie-card__container">
        <div class="movie-card__header">
          <p class="movie-card__title">${movie.Title}</p>
          <div class="movie-card__rating">
            <img src="./assets/icons/icon-star.svg" alt="movie ratings" class="movie-card__rating-icon">
            <span class="movie-card__imdb-rating">${movie.imdbRating || 'N/A'}</span>
          </div>
        </div>
        <div class="movie-card__info-container">
          <div class="movie-card__info">
            <p class="movie-card__runtime">${movie.Runtime || 'N/A'}</p>
            <p class="movie-card__genre">${movie.Genre || 'N/A'}</p>
            <div class="movie-card__watchlist">
              <img src="/assets/icons/icon-2.svg" alt="A button to remove the movie from the watchlist" class="movie-card__watchlist-icon" id="buttonRemoveFromWatchList-${movie.imdbID}">
              <span class="buttonRemoveFromWatchList" id="buttonRemoveFromWatchList-${movie.imdbID}">Watchlist</span>
            </div>
          </div>
          <div class="movie-card__description">
            <p class="movie-card__description-text">${truncatedDescription}
            ${showReadMore ? `<button class="movie-card__read-more">Read More</button>` : ''}
            </p>
          </div>
        </div>
        </div>
      </div>
    `
    //removing the movie from the watchlist when the user clicks the remove button
    const removeButton = movieCard.querySelector(`#buttonRemoveFromWatchList-${movie.imdbID}`);
    removeButton.addEventListener('click', () => {
      removeFromWatchlist(movie);
      movieCard.remove(); 
    });
    
    //adding the movie to the watchlist when the user clicks the watchlist button
    watchlistContainer.appendChild(movieCard);
  });
});

//function to clear the watchlist when the user clicks the clear button
clearWatchlistButton.addEventListener('click', () => {
  localStorage.removeItem('watchlist');
  location.reload();
})

//function to remove the movie from the watchlist
function removeFromWatchlist(movie){
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  const updatedWatchlist = watchlist.filter(item => item.imdbID !== movie.imdbID);
  localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  location.reload();
}