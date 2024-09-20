const results = document.querySelector('.results')
//Defining the maximum length of the description
const MAX_LENGTH = 350;

async function fetchData(){
  const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=99542785&t=batman&plot=full')
  const data = await response.json()
  displayData(data)
}

function displayData(data){
  // Clear previous results
  results.innerHTML = '';

  // Check if Search property exists and is an array
  const movies = data.Search && Array.isArray(data.Search) ? data.Search : [data];
 
  // Loop through each movie and create a movie card
  for (const movie of movies) {
    let movieCard = document.createElement('li')
    movieCard.classList.add('movie-card')

    const truncatedDescription = truncateDescription(movie.Plot || 'N/A', MAX_LENGTH)
    const showReadMore = (movie.Plot || 'N/A').length >= MAX_LENGTH


    movieCard.innerHTML = 
    `
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
              <img src="/assets/icons/icon-1.svg" alt="A button to add the movie to the watchlist" class="movie-card__watchlist-icon">
              <span class="buttonAddToWatchlist" id="buttonAddToWatchlist">Watchlist</span>
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
    results.appendChild(movieCard)

    //Adding event listener to the read more button
    if(showReadMore){
      const readMoreButton = movieCard.querySelector('.movie-card__read-more');
      readMoreButton.addEventListener('click', () => {
        toggleDescription(readMoreButton, movie.Plot || 'N/A')
      });
    }
  }

  console.log(data)
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
fetchData()

