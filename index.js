const results = document.querySelector('.results')
const searchInput = document.querySelector('#searchInput')

// Firebase is now available globally
const { initializeApp, getDatabase, ref, set, get, remove } = window.firebase;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "movie-watchlist-18757.firebaseapp.com",
  projectId: "movie-watchlist-18757",
  storageBucket: "movie-watchlist-18757.appspot.com",
  messagingSenderId: "805387743764",
  appId: "1:805387743764:web:1d88b6c60f2d5885742d01",
  measurementId: "G-6975S4HSXS",
  databaseURL: "https://movie-watchlist-18757-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Make sure Firebase is initialized before using it
console.log("Firebase initialized:", app);

//Defining the maximum length of the description
const MAX_LENGTH = 350;

async function fetchData(){
  const searchValue = searchInput.value;
  const response = await fetch(`http://www.omdbapi.com/?apikey=99542785&t=${searchValue}&plot=full`)
  const data = await response.json()
  displayData(data)
}

function displayData(movie){
  // Clear previous results
  results.innerHTML = '';

  if (movie.Response === "False") {
    results.innerHTML = `<p>${movie.Error}</p>`;
    return;
  }

  let movieCard = document.createElement('li')
  movieCard.classList.add('movie-card')

  const truncatedDescription = truncateDescription(movie.Plot || 'N/A', MAX_LENGTH)
  const showReadMore = (movie.Plot || 'N/A').length >= MAX_LENGTH

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
            <img src="/assets/icons/icon-1.svg" alt="A button to add the movie to the watchlist" class="movie-card__watchlist-icon" id="buttonAddToWatchList-${movie.imdbID}">
            <span class="buttonAddToWatchList" id="buttonAddToWatchList-${movie.imdbID}">Watchlist</span>
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
  //Adding event listener to the watchlist button
  const buttonAddToWatchlist = movieCard.querySelector(`#buttonAddToWatchList-${movie.imdbID}`);
  buttonAddToWatchlist.addEventListener('click', () => {
    addToWatchList(movie);
  });
  
  results.appendChild(movieCard)

  //Adding event listener to the read more button
  if(showReadMore){
    const readMoreButton = movieCard.querySelector('.movie-card__read-more');
    readMoreButton.addEventListener('click', () => {
      toggleDescription(readMoreButton, movie.Plot || 'N/A')
    });
  }
}

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

//Function to add to watchlist
function addToWatchList(movie) {
  const movieRef = ref(db, 'watchlist/' + movie.imdbID);
  set(movieRef, movie)
    .then(() => {
      console.log('Movie added to watchlist successfully');
      // Optionally, you can update the UI here to indicate the movie was added
    })
    .catch((error) => {
      console.error('Error adding movie to watchlist:', error);
    });
}


//Adding event listener to the search form
document.querySelector('.search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  fetchData();
});

