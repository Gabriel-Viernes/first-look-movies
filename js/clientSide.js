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

// function displayMovieData(movieData) {
//   const movieDetailsContainer = document.getElementById('movieDetails');

//   // Create HTML elements to display the movie details
//   const titleElement = document.createElement('h1');
//   titleElement.textContent = movieData.Title;
//   const yearElement = document.createElement('p');
//   yearElement.textContent = `Year: ${movieData.Year}`;
//   const ratedElement = document.createElement('p');
//   yearElement.textContent = movieData.Rated;
//   const releasedElement = document.createElement('p');
//   yearElement.textContent = movieData.Released;
//   const runtimeElement = document.createElement('p');
//   yearElement.textContent = movieData.Runtime;
//   const genreElement = document.createElement('p');
//   yearElement.textContent = movieData.Genre;
//   const directorElement = document.createElement('p');
//   yearElement.textContent = movieData.Director;
//   const writerElement = document.createElement('p');
//   yearElement.textContent = movieData.Writer;
//   const actorsElement = document.createElement('p');
//   yearElement.textContent = movieData.Actors;
//   const plotElement = document.createElement('p');
//   yearElement.textContent = movieData.Plot;
//   const languageElement = document.createElement('p');
//   yearElement.textContent = movieData.Language;
//   const countryElement = document.createElement('p');
//   yearElement.textContent = movieData.Country;
//   const awardsElement = document.createElement('p');
//   yearElement.textContent = movieData.Awards;
//   const posterElement = document.createElement('p');
//   yearElement.textContent = movieData.Poster;
//   Rating:

//   const metascoreElement = document.createElement('p');
//   yearElement.textContent = movieData.Metascore;
//   const imdbratingElement = document.createElement('p');
//   yearElement.textContent = movieData.imdbRating;
//   const imdbvotesElement = document.createElement('p');
//   yearElement.textContent = movieData.imdbVotes;
//   // Add more elements for other details as needed

//   // Append the elements to the container
//   movieDetailsContainer.appendChild(titleElement);
//   movieDetailsContainer.appendChild(yearElement);
//   movieDetailsContainer.appendChild(ratedElement);
//   movieDetailsContainer.appendChild(releasedElement);
//   movieDetailsContainer.appendChild(runtimeElement);
//   movieDetailsContainer.appendChild(genreElement);
//   movieDetailsContainer.appendChild(directorElement);
//   movieDetailsContainer.appendChild(writerElement);
//   movieDetailsContainer.appendChild(actorsElement);
//   movieDetailsContainer.appendChild(plotElement);
//   movieDetailsContainer.appendChild(languageElement);
//   movieDetailsContainer.appendChild(countryElement);

//   // Add more elements to display other details
// }

let omdbElement = document.getElementById('ombd');
let redditElement = document.getElementById('reddit')


// encodeURIComponent replaces non english characters with escape sequences that can be read by APIs
async function getOmdbData(movieTitle) {
    const apiUrl = `http://www.omdbapi.com/?apikey=4efa80bc&t=${encodeURIComponent(movieTitle)}`
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
      // Handle the data received from the OMDB API
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    }
}

async function getRedditAPI(input) {
    let url = `https://api.reddit.com/r/movies/search/?q=${encodeURIComponent(input)}&restrict_sr=1`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Reddit network response failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Reddit fetch error:' + error)
    }
}

async function displaySearch() {
  let input;
  if(this.getAttribute('id') === 'submitBtn') {
    console.log(this)
    input = document.getElementById('movieSearch').value;
    document.querySelector('.content').remove();
    document.getElementById('searchBarHidden').setAttribute('style', 'margin-bottom:.5em')
  } else {
    input = document.getElementById('movieSearchHidden').value;
    console.log(this)
  }
  console.log('button pressed')
  if (input === '') {
    console.log('nothing inputted');
  } else {
    let omdbData = await getOmdbData(input);
    let redditData = await getRedditAPI(input);  
    // Call the fetchMovieData function to fetch and display the data
    displayMovieData(omdbData);
    displayReddit(redditData);
  }

}

function displayMovieData(movieData) {
  document.getElementById('omdb').innerHTML = ``;
  let ratings = document.createElement('div');
  for (let i = 0; i < movieData.Ratings.length; i++) {
    let source = document.createElement('h2');
    source.textContent = `
      ${movieData.Ratings[i].Source} || ${movieData.Ratings[i].Value}
    `
    ratings.append(source);
  }
  document.getElementById('omdb').innerHTML = `
    <div id = "omdb-inner">
      <h2> ${movieData.Title}</h2>
      <p>Released: ${movieData.Released} | Runtime: ${movieData.Runtime}</p>
      <p>${movieData.Genre}</p>
      <p>Director: ${movieData.Director} | ${movieData.Writer} | ${movieData.Actors}</p>
      <p style= 'width:60%; margin:auto;'>${movieData.Plot}</p>
      <p>${movieData.Awards}</p>
      <img src = ${movieData.Poster}></img>
    </div>
  `;


  document.getElementById('omdb-inner').append(ratings);
}  

function displayReddit(data) {
  document.getElementById('reddit').innerHTML = ``;
  document.getElementById('reddit').innerHTML = `
    <h1>See what people on Reddit are saying!</h1>
  `
  for (let i = 0; i < data.data.children.length; i++) {
    let card = document.createElement('div')
    card.innerHTML= `
      <h3>${data.data.children[i].data.title}<a href = ${data.data.children[i].data.url}>[Link]</a></h3>
      <p>${data.data.children[i].data.author}</p>
      <p>${data.data.children[i].data.selftext}</p>
    `;
    console.log('card created')
    document.getElementById('reddit').append(card)
  }
}
let button = document.getElementById('submitBtn')
let buttonHidden = document.getElementById('submitBtnHidden')
button.addEventListener('click', displaySearch);
buttonHidden.addEventListener('click', displaySearch);



