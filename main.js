"use-strict";

(function () {

    ///  VARIABLES
    const moviesContainer = document.querySelector("#moviesContainer");
    const dialogue = document.querySelector("#dialogue");
    const loginButton = document.querySelector("#loginButton");
    const actions = document.querySelector(".form-wrapper>form .action")
    const regForm = document.querySelector("#regForm");
    const loginForm = document.querySelector("#loginForm");
    let openMovie = null;
    let movies = JSON.parse(localStorage.getItem("movies"));

    /// LOCAL STORAGE MOVIES VALIDATION
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
                moviesContainer.innerHTML += `<div id="${movie.id}" class="movie-card">
                <img src="${movie.thumbnail}"/>
                <h1>${movie.title}</h1>
            </div>`;
            });
            moviesContainer.addEventListener("click", movieDetails);
        } else {
            moviesContainer.innerHTML += `NO MOVIES`;
        }
    }
    loadMovies();

    loginButton.addEventListener("click", () => {
        dialogue.classList.add("show");
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formElements = event.currentTarget.children;
        const users = JSON.parse(localStorage.getItem("users"));
        if (!users || users.length == 0) {
            alert("No user is registered!");
        } else {
            const user = users.find((u) => {
                if (u.userName === formElements["userName"].value && u.password === formElements["userPassword"].value) {
                    return u;
                }
            });
            if (user) {
                window.open("./backoffice/", "_target");
                dialogue.classList.remove("show");
            } else {
                alert("Invalid Credentials, please try again!");
            }
        }
    });

    regForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formElements = event.currentTarget.children;
        const users = JSON.parse(localStorage.getItem("users"));
        if (formElements["regUserPassword"].value === formElements["regUserRepPassword"].value) {
            if (!users || users.length == 0) {

                localStorage.setItem("users", JSON.stringify([{
                    name: formElements["regName"].value,
                    userName: formElements["regUserName"].value,
                    email: formElements["regUserEmail"].value,
                    password: formElements["regUserPassword"].value,
                }]));

            } else {
                const user = users.find((u) => {
                    if(u.userName === formElements["regUserName"].value || u.email === formElements["regUserEmail"].value){
                        return u;
                    }
                });
                if (user) {
                    alert("Username already exists, please try other!");
                } else {
                    const user = {
                        id: guid(),
                        name: formElements["regName"].value,
                        userName: formElements["regUserName"].value,
                        email: formElements["regUserEmail"].value,
                        password: formElements["regUserPassword"].value,
                    };
                    users.push(user);
                    localStorage.setItem("users", JSON.stringify(users));
                    alert("User registered with success!");
                    dialogue.classList.remove("show");
                }
            }
        } else {
            alert("Passwords don't match, please try again!");
        }
    });

    document.querySelector("#goToLogin").addEventListener("click", () => {
        document.querySelector("#loginForm").classList.add("show");
        document.querySelector("#regForm").classList.remove("show");
    });

    document.querySelector("#goToRegister").addEventListener("click", () => {
        document.querySelector("#regForm").classList.add("show");
        document.querySelector("#loginForm").classList.remove("show");
    });

    function movieDetails(event) {
        openMovie = movies.find(movie => movie.id === event.target.id);

        if (openMovie) {
            document.querySelector("#movieDetails").innerHTML = `
                <img src="${openMovie.thumbnail}"/>
                <div class="details">
                    <h1>${openMovie.title}</h1>
                    <p><b>Genre</b>: ${openMovie.genre}</p>
                    <p><b>Director</b>: ${openMovie.director}</p>
                    <p><b>Producer</b>: ${openMovie.producer}</p>
                    <p><b>Cast</b>: ${openMovie.cast}</p>
                    <p><b>Location</b>: ${openMovie.location}</p>
                    <p><b>Description</b>: ${openMovie.description}</p>
                </div>
            `;
            document.querySelector(".movie-details").classList.add("show");
        }
    }

    document.querySelector("#closeDialogue").addEventListener("click", () => {
        dialogue.classList.remove("show");
    });

    document.querySelector("#closeDetails").addEventListener("click", () => {
        document.querySelector(".movie-details").classList.remove("show");
        openMovie = null;
    });

    document.querySelector("#lunchTrailer").addEventListener("click", () => {
        window.open(openMovie.trailerUrl, "_blank");
    });

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

}());