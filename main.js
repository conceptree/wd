"use-strict";

(function () {

    const moviesContainer = document.querySelector("#moviesContainer");
    let movies = JSON.parse(localStorage.getItem("movies"));

    if (!movies) {
        localStorage.setItem("movies", JSON.stringify(
            [{
                "title": "Movie Title",
                "director": "Movie director name",
                "cast": "actor name 1, actor name 2",
                "genre": "action",
                "location": "cinema location",
                "producer": "producer name",
                "thumbnail": "./assets/bg.jpeg",
                "description": "Movie short text description"
            }]
        ));
        movies = JSON.parse(localStorage.getItem("movies"));
    }

    function loadMovies() {
        if (movies.length > 0) {
            movies.forEach((movie) => {
                moviesContainer.innerHTML += `<div class="movie-card">
                <img src="${movie.thumbnail}"/>
                <h1>${movie.title}</h1>
                <p>
                    ${movie.description}
                </p>
            </div>`;
            });
        }
    }
    loadMovies();

    function showDialogue(dialogue){
        
    }

    function serializeDialogue(dialogue){

    }

}());