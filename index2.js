
const watchlistMain =document.getElementById("main")

function renderFilms(){
const filmStorage =  JSON.parse(localStorage.getItem("film"));
//Check if the watch list is empty
if(filmStorage.length === 0 ){
    watchlistMain.innerHTML=`<p>Your watchlist is looking a little empty...</p>
                                <span class="add-btn-container">
                                    <a href="./index.html" id="add-btn-link"></a> 
                                    <h5>Lets add some movies!</h5>
                                </span>  ` 
}else{
    let html = "";
    for(let filmData of  filmStorage){
        html += `<div class="film-container">
                    <img class="movie-image"src=${filmData.poster}></img>
                    <div class="film-info">
                        <div class="film-name">
                            <h3>${filmData.title}</h3>
                            <p>⭐</p>
                            <h5>${filmData.imdbRating}</h5>
                        </div>
                                
                        <div class="film-genre">
                            <h4>${filmData.runtime}</h4>
                            <h5>${filmData.genre}</h5>
                        </div>
                        <div class="btn-container">
                            <button id="remove-btn"
                            data-film-id="${filmData.filmId}"></button>
                            <h6>Remove</h6>
                        </div>
                    </div> 
                    <div class="film-plot">
                        <p>${filmData.plot}</p>   
                    </div>      
                </div>
            <hr>
            `;
    }
    
        watchlistMain.innerHTML=html;
    }

}

renderFilms()

//remove button
document.addEventListener("click",function(e){
    if(e.target.dataset.filmId){    
        const dataObject={...e.target.dataset} 
        const currentFilmStorage =  JSON.parse(localStorage.getItem("film"));
        //find the index of object that  you want to delete
        const index = currentFilmStorage.findIndex(film => film.filmId === dataObject.filmId);
        //delete
        currentFilmStorage.splice(index,1)
        //update local storage
        localStorage.setItem("film", JSON.stringify(currentFilmStorage)); 
        //call the render
        renderFilms()
    }
})


