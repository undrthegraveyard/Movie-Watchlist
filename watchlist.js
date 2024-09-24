import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Defining the maximum length of the description
const MAX_LENGTH = 350;

// Function to display the watchlist
function displayWatchList(movie) {
  const movieRef = ref(db, 'watchlist/' + movie.imdbID);
  set(movieRef, movie);
}

// Function to remove the movie from the watchlist
function removeFromWatchlist(movie) {
  const movieRef = ref(db, 'watchlist/' + movie.imdbID);
  remove(movieRef)
    .then(() => {
      console.log('Movie successfully removed from watchlist');
    })
    .catch((error) => {
      console.error('Error removing movie from watchlist:', error);
    });
}

// Function to truncate the description
function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength) + "...";
}

// Wait for the DOM to be fully loaded before interacting with elements
document.addEventListener('DOMContentLoaded', () => {
  const clearWatchlistButton = document.getElementById('clear-watchlist');
  const watchlistContainer = document.querySelector('.watchlist');

  if (clearWatchlistButton) {
    clearWatchlistButton.addEventListener('click', () => {
      const watchlistRef = ref(db, 'watchlist');
      remove(watchlistRef).then(() => {
        location.reload();
      });
    });
  }

  // Function to display the watchlist in the DOM
  function loadWatchlist() {
    const watchlistContainer = document.querySelector('.watchlist');
    if (!watchlistContainer) {
      console.error('Watchlist container not found');
      return;
    }
  
    const watchlistRef = ref(db, 'watchlist');
    get(watchlistRef).then((snapshot) => {
      if (snapshot.exists()) {
        const watchlist = snapshot.val();
        
        watchlistContainer.innerHTML = ''; // Clear existing content
        
        Object.values(watchlist).forEach(movie => {
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
                  <img src="/assets/icons/icon-star.svg" alt="movie ratings" class="movie-card__rating-icon">
                  <span class="movie-card__imdb-rating">${movie.imdbRating || 'N/A'}</span>
                </div>
              </div>
              <div class="movie-card__info-container">
                <div class="movie-card__info">
                  <p class="movie-card__runtime">${movie.Runtime || 'N/A'}</p>
                  <p class="movie-card__genre">${movie.Genre || 'N/A'}</p>
                  <div class="movie-card__watchlist">
                    <img src="/assets/icons/icon-2.svg" alt="A button to remove the movie from the watchlist" class="movie-card__watchlist-icon" id="buttonRemoveFromWatchList-${movie.imdbID}">
                    <span class="buttonRemoveFromWatchList" id="buttonRemoveFromWatchList-${movie.imdbID}">Remove</span>
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
          `;

          // Removing the movie from the watchlist when the user clicks the remove button
          const removeButton = movieCard.querySelector(`#buttonRemoveFromWatchList-${movie.imdbID}`);
          removeButton.addEventListener('click', () => {
            removeFromWatchlist(movie);
            movieCard.remove(); 
          });

          watchlistContainer.appendChild(movieCard);
        });

      } else {
        watchlistContainer.innerHTML = '<p>Your watchlist is empty.</p>';
      }

    }).catch((error) => {
      console.error("Error loading watchlist:", error);
      watchlistContainer.innerHTML = '<p>Error loading watchlist. Please try again later.</p>';
    });
  }
  
  loadWatchlist();
});
