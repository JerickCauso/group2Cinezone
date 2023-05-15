const pageSet = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
};

//Display Slider
function displaySlider() {
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
    .then((response) => response.json())
    .then((responsedata) => {
      let nowPlaying = "";
      // console.log(responsedata);
      let display = responsedata.results;
      display.forEach((nowPlayingMovies) => {
        const div = document.createElement("div");
        div.classList.add("swiper-slide");

        div.innerHTML = `
      <a href="movie-details.html?id=${nowPlayingMovies.id}">
        <img src="https://image.tmdb.org/t/p/w500${nowPlayingMovies.poster_path}" alt="${nowPlayingMovies.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${nowPlayingMovies.vote_average} / 10
      </h4>`;

        document.querySelector(".swiper-wrapper").appendChild(div);

        initSwiper();
      });
    });
}

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
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

// TV Shows
function tvShows() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzk1MGMyMTIxZmFmZmJjOWJiNDdiZTA5OGJjYTRiNyIsInN1YiI6IjY0NWRjNzg4ZDZjMzAwMDBlNGFkZDk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwfMqTC9PkV48DzR2G3dEPO6N5FFfhi3Nm9FT4RSdPY",
    },
  };
  fetch(
    "https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  )
    .then((response) => response.json())
    .then((responsedata) => {
      // let tvShowDisplay = "";
      let shows = responsedata.results;
      console.log(shows);
      shows.forEach((show) => {
        const div = document.createElement("div");
        const tvShowDisplay = document
          .getElementById("popular-shows")
          .appendChild(div);

        tvShowDisplay.innerHTML += `
      <div class="card">
          <a href="tv-details.html?id=${show.id}">
              <img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"/>
          </a>
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${show.first_air_date} </small>
              </p>
            </div>
      </div>`;
      });
    });
}

//Movie Details
function movieDetails() {
  const movieId = window.location.search.split("=")[1];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzk1MGMyMTIxZmFmZmJjOWJiNDdiZTA5OGJjYTRiNyIsInN1YiI6IjY0NWRjNzg4ZDZjMzAwMDBlNGFkZDk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwfMqTC9PkV48DzR2G3dEPO6N5FFfhi3Nm9FT4RSdPY",
    },
  };
  fetch("https://api.themoviedb.org/3/movie/" + movieId, options)
    .then((response) => response.json())
    .then((responsedata) => {
      console.log(responsedata);
      // const show = responsedata.results;
      const div = document.createElement("div");
      const nowPlaying = document
        .querySelector("#movie-details")
        .appendChild(div);
      displayBackdrop("movie", responsedata.backdrop_path);

      div.innerHTML = `
      <div class="details-top">
      <div>
        <img
          src="https://image.tmdb.org/t/p/w500${responsedata.poster_path}"
          class="card-img-top"
          alt="Movie Title"
        />
      </div>
      <div>
        <h2>${responsedata.original_title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${responsedata.vote_average} / 10
        </p>
        <p class="text-muted">Release Date: ${responsedata.release_date}</p>
        <p>
        ${responsedata.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
        ${responsedata.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
        </ul>
        <a href="${
          responsedata.homepage
        }" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>`;
    });
}

function tvShowDetails() {
  const showId = window.location.search.split("=")[1];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzk1MGMyMTIxZmFmZmJjOWJiNDdiZTA5OGJjYTRiNyIsInN1YiI6IjY0NWRjNzg4ZDZjMzAwMDBlNGFkZDk0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwfMqTC9PkV48DzR2G3dEPO6N5FFfhi3Nm9FT4RSdPY",
    },
  };
  fetch("https://api.themoviedb.org/3/tv/" + showId, options)
    .then((response) => response.json())
    .then((responsedata) => {
      console.log(responsedata);
      // const show = responsedata.results;
      const div = document.createElement("div");
      const nowPlaying = document
        .querySelector("#show-details")
        .appendChild(div);
      displayBackdrop("tv", responsedata.backdrop_path);

      div.innerHTML = `
      <div class="details-top">
        <div>
          <img
            src="https://image.tmdb.org/t/p/w500${responsedata.poster_path}"
            class="card-img-top"
            alt="Movie Title"/>
        </div>
        <div>
          <h2>${responsedata.name}</h2>
          <p>
            <i class="fas fa-star text-primary">${responsedata.vote_average} / 10</i>
          </p>
          <p class="text-muted">Release Date: ${responsedata.release_date}</p>
          <p>
          ${responsedata.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
          </ul>
          <a href="${responsedata.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>`;
    });
}

// Display Backdrop
function displayBackdrop(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

function init() {
  switch (pageSet.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      moviesPopular();
      break;
    case "/shows.html":
      tvShows();
      break;
    case "/movie-details.html":
      movieDetails();
      break;
    case "/tv-details.html":
      tvShowDetails();
      break;
    case "/search.html":
      // search();
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
