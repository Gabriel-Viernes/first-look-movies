// ROTTEN TOMATOES KEY: emsqjacpmmqtms79muj8v6xm
// ROTTEN TOMATOES SECRET: Qt7Fp4QJQG
// OMDB KEY:  4efa80bc
// REDDIT KEY(?): n4brKxZAfsAOHMyzmUlhpw

// REDDIT SECRET: 	YF7RwwTWTPa8eUc6smx-WRMIbOxyuw
// REDDIT USERNAME: movieLookup
// REDDIT PASSWORD: keyboard

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Handle the data received from the OMDB API
//     console.log(data);
//   })
//   .catch(error => {
//     // Handle any errors that occurred during the fetch
//     console.error('Fetch error:', error);
//   });

let omdbElement = document.getElementById('placeholder omdb element');
let redditElement = document.getElementById('placeholder reddit id')


// encodeURIComponent replaces non english characters with escape sequences that can be read by APIs
async function getOmdbData(movieTitle) {
    const apiUrl = `http://www.omdbapi.com/?apikey=4efa80bc&t=${encodeURIComponent(movieTitle)}`
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      // Handle the data received from the OMDB API
      console.log(data);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    }
    return data;
}

async function getRedditAPI(input) {
    let url = `https://api.reddit.com/r/movies/search/?q=${encodeURIComponent(input)}&restrict_sr=1`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Reddit network response failed');
        }
        const data = await response.json();
    } catch (error) {
        console.error('Reddit fetch error:' + error)
    }
    return data;
}

async function displaySearch() {
  let input = document.getElementById('movie-search').value;
  if (input === '') {
    console.log('nothing inputted');
  } else {
    let omdbData = await getOmdbData(input);
    let redditData = await getRedditAPI(input);
    // negash's function
  //   let card = document.createElement('div')
  // for (let i = 0; i < data.data.children.length; i++) {
  //   card.innerHTML(`
  //     <h3>${data.data.children[i].data.title}<a href = ${data.data.children[i].data.url}>[Link]</a></h3>
  //     <p>${data.data.children[i].data.year}</p>
  //     <p>${data.data.children[i].data.Released}</p>
  //     <p>${data.data.children[i].data.Runtime}</p>
  //     <p>${data.data.children[i].data.Genre}</p>
  //     <p>${data.data.children[i].data.Director}</p>
  //     <p>${data.data.children[i].data.Writer}</p>
  //     <p>${data.data.children[i].data.Actors}</p>
  //     <p>${data.data.children[i].data.Plot}</p>
  //     <p>${data.data.children[i].data.Language}</p>
  //     <p>${data.data.children[i].data.Country}</p>
  //     <p>${data.data.children[i].data.Awards}</p>
  //     <p>${data.data.children[i].data.Poster}</p>
  //     ${data.data.children[i].data.Rated}

  function displayMovieData(movieData) {
    const movieDetailsContainer = document.getElementById('movieDetails');
  
    // Create HTML elements to display the movie details
    const titleElement = document.createElement('h1');
    titleElement.textContent = movieData.Title;
    const yearElement = document.createElement('p');
    yearElement.textContent = `Year: ${movieData.Year}`;
    const ratedElement = document.createElement('p');
    yearElement.textContent = movieData.Rated;
    const releasedElement = document.createElement('p');
    yearElement.textContent = movieData.Released;
    const runtimeElement = document.createElement('p');
    yearElement.textContent = movieData.Runtime;
    const genreElement = document.createElement('p');
    yearElement.textContent = movieData.Genre;
    const directorElement = document.createElement('p');
    yearElement.textContent = movieData.Director;
    const writerElement = document.createElement('p');
    yearElement.textContent = movieData.Writer;
    const actorsElement = document.createElement('p');
    yearElement.textContent = movieData.Actors;
    const plotElement = document.createElement('p');
    yearElement.textContent = movieData.Plot;
    const languageElement = document.createElement('p');
    yearElement.textContent = movieData.Language;
    const countryElement = document.createElement('p');
    yearElement.textContent = movieData.Country;
    const awardsElement = document.createElement('p');
    yearElement.textContent = movieData.Awards;
    const posterElement = document.createElement('p');
    yearElement.textContent = movieData.Poster;
    Rating:

    const metascoreElement = document.createElement('p');
    yearElement.textContent = movieData.Metascore;
    const imdbratingElement = document.createElement('p');
    yearElement.textContent = movieData.imdbRating;
    const imdbvotesElement = document.createElement('p');
    yearElement.textContent = movieData.imdbVotes;
    // Add more elements for other details as needed
  
    // Append the elements to the container
    movieDetailsContainer.appendChild(titleElement);
    movieDetailsContainer.appendChild(yearElement);
    movieDetailsContainer.appendChild(ratedElement);
    movieDetailsContainer.appendChild(releasedElement);
    movieDetailsContainer.appendChild(runtimeElement);
    movieDetailsContainer.appendChild(genreElement);
    movieDetailsContainer.appendChild(directorElement);
    movieDetailsContainer.appendChild(writerElement);
    movieDetailsContainer.appendChild(actorsElement);
    movieDetailsContainer.appendChild(plotElement);
    movieDetailsContainer.appendChild(languageElement);
    movieDetailsContainer.appendChild(countryElement);
  
    // Add more elements to display other details
  }
  
  // Call the fetchMovieData function to fetch and display the data
  fetchMovieData();
 
  
  
  
  
  
  

    `)
    displayReddit(redditData);
  }
}

function displayReddit(data) {
  let card = document.createElement('div')
  for (let i = 0; i < data.data.children.length; i++) {
    card.innerHTML(`
      <h3>${data.data.children[i].data.title}<a href = ${data.data.children[i].data.url}>[Link]</a></h3>
      <p>${data.data.children[i].data.author}</p>
      ${data.data.children[i].data.selftext_html}
    `)
  }
  document.getElementById('placeholder').append(card)

}
// placeholder id for submit
document.getElementById('//placeholder for submit button').addEventListener('click', displaySearch);



