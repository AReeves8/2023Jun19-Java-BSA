/**
 * here is the javascript for index.html for the Movies API
 */


const URL = 'http://localhost:8282/movies';
let allMovies = [];

/**
 * document - gives access to html elements
 * 
 * event listeners are hopw we respond to events on the html
 * 
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * DOM - Document Object Model
     *  
     *  DOMContentLoaded is an event that fires when the DOM is loaded
     *      page loads and refreshes
     * 
     */


    /**
     * AJAX - Asynchronous JavaScript and XML
     * 
     *  the primary object of AJAX, is XmlHttpRequest (XHR)
     * 
     */

    let xhr = new XMLHttpRequest();         // creating a new XHR object (this puts it into state 0 - unsent)

    /**
     * onreadystatechange - is a callback that fires everytime the state of the xhr changes
     * 
     *      5 stages (ready states):
     *          0 - unsent
     *          1 - opened
     *          2 - headers received
     *          3 - loading
     *          4 - done        ---> this is the main one we care about
     */
    xhr.onreadystatechange = () => {

        /**
         * strict equality (===) and regular equality (==) in JS
         *      strict equality checks values and data types
         *      regualr equality only checks values
         * 
         *      ex: 4 === '4' is false but 4 == '4' is true
         */
        if(xhr.readyState === 4) {
            // at readyState 4, we have our response from the server 

            // responseText contains the response from the server
            // JSON.parse() parses the JSON into js objects
            let movies = JSON.parse(xhr.responseText);

            // add movies to table
            movies.forEach(newMovie => {
                addMovieToTable(newMovie);
            });

        }

    };

    // use open to set the request method and the url to send the request to (state changed to 1 - opened)
    xhr.open('GET', URL);

    // this sends the request 
    xhr.send();

});


document.getElementById('new-movie-form').addEventListener('submit', () => {

    /**
     * one option to grab form data is to call document.getElementById().value for each input field
     * 
     * a beter option is to us FORM DATA
     * 
     * FormData provides all the data from a form in an easy to work with obect
     */

    // FormData takes in the html tags for your form
    let inputData = new FormData(document.getElementById('new-movie-form'));

    let newMovie = {
        // use .get() to retrieve a field from form data and pass in the NAME attribute from the <input> tag
        title : inputData.get('new-movie-title'),         
        rating : inputData.get('new-movie-rating'),
        director : {
            firstName : inputData.get('new-director-first'),
            lastName : inputData.get('new-director-last')
        }
    }


    /**
     * 
     * rather than using raw xhr objects, we can use fetch()
     * 
     * 
     * fetch() is a built-in function that can send http requests
     *      fetch() returns a Promise
     * 
     *      PROMISES
     *          something that will return.. eventually
     *          happen asynchronously from the rest of your program
     * 
     *      ASYNC and AWAIT
     *          use async on function to tell you program that the function returns a promise
     * 
     *          use await to tell our program to wait for some asynchronous operation
     *              they can ONLY be used inside async functions
     */
    doPostRequest(newMovie);

});

async function doPostRequest(newMovie) {

    let returnedData = await fetch(URL + '/movie', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'         // make sure your server is expecting to receive JSON in the body
        },
        body : JSON.stringify(newMovie)      // turns a js object into JSON
    });

    // .json() to deserialize the JSON back into js object - this ALSO returns a promise
    let movieJson = await returnedData.json();

    console.log('MOVIE JSON' + movieJson);

    // just need to add movie to table
    addMovieToTable(movieJson);
}


function addMovieToTable(newMovie) {

    console.log(newMovie);
    // DOM Manipulation - where we manually change the DOM

    // creting all necessary DOM elements
    let tr = document.createElement('tr');      // will create a <tr> tag
    let id = document.createElement('td');      // will create a <td> tag for movie id
    let title = document.createElement('td');      // will create a <td> tag for movie title
    let rating = document.createElement('td');      // will create a <td> tag for movie rating
    let director = document.createElement('td');      // will create a <td> tag for director
    let editBtn = document.createElement('td');      // will create a <td> tag for edit button
    let deleteBtn = document.createElement('td');      // will create a <td> tag for delete button

    id.innerText = newMovie.id;
    title.innerText = newMovie.title;
    rating.innerText = newMovie.rating;
    director.innerText = newMovie.director.firstName + ' ' + newMovie.director.lastName;

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="edit-button" onclick="activateEditForm(${newMovie.id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newMovie.id})">Delete</button>`;

    // adds the <td> tags as nested children to the tr> tag
    tr.appendChild(id);
    tr.appendChild(title);
    tr.appendChild(rating);
    tr.appendChild(director);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    // adds the <tr> tag to the <tbody> tag
    document.getElementById('movie-table-body').appendChild(tr);

    // adding the new movie to the list of all the movies
    allMovies.push(newMovie);

}

function activateEditForm(movieId) {


}

function activateDeleteForm(movieId) {

    
}
