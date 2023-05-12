//Now PLaying
function nowPlaying() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzk1MGMyMTIxZmFmZmJjOWJiNDdiZTA5OGJjYTRiNyIsInN1YiI6IjY0NWRjNzg4ZDZjMzAwMDBlNGFkZDk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwfMqTC9PkV48DzR2G3dEPO6N5FFfhi3Nm9FT4RSdPY",
    },
  };
  fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  )
    .then((res) => res.json())
    .then((resdata) => {
      let nowPlayingDisplay = "";
      console.log(resdata);
      let display2 = resdata.results;
      display2.forEach((nowPlayingMovies) => {
        nowPlayingDisplay = document.querySelector(".swiper-wrapper");

        nowPlayingDisplay.innerHTML += `
        
        <div class="swiper-slide">
        <a href="movie-details.html?id=${nowPlayingMovies.id}">
          <img
            src="https://image.tmdb.org/t/p/w500${nowPlayingMovies.poster_path}"
            alt="${nowPlayingMovies.title}"
          />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> ${nowPlayingMovies.vote_average} / 10
        </h4>
        </div>
        
        `;
      });
    });
}

//Popular Movies
function moviesPopular() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzk1MGMyMTIxZmFmZmJjOWJiNDdiZTA5OGJjYTRiNyIsInN1YiI6IjY0NWRjNzg4ZDZjMzAwMDBlNGFkZDk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwfMqTC9PkV48DzR2G3dEPO6N5FFfhi3Nm9FT4RSdPY",
    },
  };
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((responsedata) => {
      let popMovieDisplay = "";
      console.log(responsedata);
      let display = responsedata.results;
      display.forEach((popMovies) => {
        const popMovieDisplay = document.getElementById("popular-movies");

        popMovieDisplay.innerHTML += `
      <div class="card">
              <a href="movie-details.html?id=${popMovies.id}">
                <img
                  src="https://image.tmdb.org/t/p/w500${popMovies.poster_path}"
                  class="card-img-top"
                  alt="${popMovies.title}"
                />
              </a>
              <div class="card-body">
                <h5 class="card-title">${popMovies.title}</h5>
                <p class="card-text">
                  <small class="text-muted">Release: ${popMovies.release_date} </small>
                </p>
              </div>
            </div>`;
      });
    });
}

nowPlaying();
moviesPopular();
