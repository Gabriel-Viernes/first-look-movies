async function logMovies() {
    const response = await fetch("https://api.github.com/users/victor");
    const user = await response.json();
    return user
  }

const victor = logMovies()
victor.then((value)=> console.log(value.html_url))
