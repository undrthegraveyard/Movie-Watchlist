import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { firebaseConfig } from './firebaseConfig';

// Import the SVG icons
import iconStar from './assets/icons/Icon-star.svg';
import icon2 from './assets/icons/icon-2.svg';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Make sure Firebase is initialized before using it
console.log("Firebase initialized:", app);

//Defining the maximum length of the description
const MAX_LENGTH = 350;

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
                  <img src="${iconStar}" alt="movie ratings" class="movie-card__rating-icon">
                  <span class="movie-card__imdb-rating">${movie.imdbRating || 'N/A'}</span>
                </div>
              </div>
              <div class="movie-card__info-container">
                <div class="movie-card__info">
                  <p class="movie-card__runtime">${movie.Runtime || 'N/A'}</p>
                  <p class="movie-card__genre">${movie.Genre || 'N/A'}</p>
                  <div class="movie-card__watchlist">
                    <img src="${icon2}" alt="A button to remove the movie from the watchlist" class="movie-card__watchlist-icon" id="buttonRemoveFromWatchList-${movie.imdbID}">
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

          // Adding event listener to the read more button
          if(showReadMore){
            const readMoreButton = movieCard.querySelector('.movie-card__read-more');
            readMoreButton.addEventListener('click', () => {
              toggleDescription(readMoreButton, movie.Plot || 'N/A')
            });
          }

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

// Function to truncate the description to the maximum length
function truncateDescription(description, maxLength){
  if(description.length >= maxLength){
    return description.substring(0, maxLength) + "..."
  }
  return description
}

//Function to toggle the read more button
function toggleDescription(button, fullDescription){
  const descriptionElement = button.closest('.movie-card__description').querySelector('.movie-card__description-text');
  if (button.textContent === 'Read More') {
    descriptionElement.textContent = fullDescription;
    button.textContent = 'Show Less';
  } else {
    descriptionElement.textContent = truncateDescription(fullDescription, MAX_LENGTH);
    button.textContent = 'Read More';
  }
}

//Function to remove from watchlist
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
