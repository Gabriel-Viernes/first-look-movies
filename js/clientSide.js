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


