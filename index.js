//API = OMDb API 
document.getElementById("search-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const movieName = document.getElementById("movie-name").value;
    //array that holds all films imdbId's
    let movieID = [];

    //fetching data
    const response = await fetch(`https://omdbapi.com/?s=${movieName}&Season&apikey=1dd47719`);
    const data = await response.json();
    //Catching error if there is an incorrect search
    if (data.Response === "False") {
      document.getElementById("main").innerHTML = `<p class="error">Unable to find what you’re looking for.
                                                            Please try another search.</p>`;
    } else {
      //Pushing Data to movie id array we have to hold all the film imdbID's because 
      //We cannot reach film data with a name search.
      for (let film of data.Search) {
        movieID.push(film.imdbID);
      }
      let html = "";
      for (let filmID of movieID) {
        fetch(`https://omdbapi.com/?i=${filmID}&apikey=1dd47719`)
          .then((res) => res.json())
          .then((filmData) => {
            html += `<div class="film-container">
                            <img class="movie-image"src=${filmData.Poster} 
                            alt="${filmData.Title} poster "></img>
                            
                            <div class="film-info">
                                <div class="film-name">
                                        <h3>${filmData.Title}</h3>
                                        <p>⭐</p>
                                        <h5>${filmData.imdbRating}</h5>
                                </div>
                                
                                <div class="film-genre">
                                        <h4>${filmData.Runtime}</h4>
                                        <h5>${filmData.Genre}</h5>
                                        
                                        
                                </div>
                                <div class="btn-container">
                                            <button id="add-btn" 
                                            data-poster="${filmData.Poster}"
                                            data-title="${filmData.Title}"
                                            data-imdb-rating="${filmData.imdbRating}"
                                            data-runtime="${filmData.Runtime}"
                                            data-genre="${filmData.Genre}"
                                            data-plot="${filmData.Plot}"
                                            data-film-id="${filmData.imdbID}" ></button>
                                            <h6>Add To Watchlist</h6>
                                </div>
                                 
                            </div> 
                            <div class="film-plot">
                                <p>${filmData.Plot}</p>   
                            </div>  
                        </div>
                        
                        <hr>
                        `;
            document.getElementById("main").innerHTML = html;
          });
      }
    }
  });

//setting filmsArray to local storage values
let filmsArray = [];
const filmStorage = JSON.parse(localStorage.getItem("film"));
if (filmStorage) {
  filmsArray = filmStorage;
}
//Add movies to watchlist
document.addEventListener("click", function (e) {
  //only click the add button
  if (e.target.dataset.genre) {
    //converting domStringObject to object
    const dataObject = { ...e.target.dataset };
    //If the film you want to add is already in your watch list,
    let isExist = filmsArray.some(
      (filmList) => filmList["filmId"] === dataObject.filmId
    );
    if (!isExist) {
      //add film to first element of filmsArray
      filmsArray.unshift(dataObject);
      setDataStorage();
      addedAlert();
    } else {
      existAlert();
    }
  }
});

//saving data to local storage
function setDataStorage() {
  localStorage.setItem("film", JSON.stringify(filmsArray));
}

//snackbar function (already exist)
function existAlert() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 1000);
}
//snackbar (function added)
function addedAlert() {
  var y = document.getElementById("snackbar2");
  y.className = "show";
  setTimeout(function () {
    y.className = y.className.replace("show", "");
  }, 1000);
}
