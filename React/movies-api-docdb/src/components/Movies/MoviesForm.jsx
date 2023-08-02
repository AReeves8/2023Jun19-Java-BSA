import { Button, Form, Label, TextInput } from "@trussworks/react-uswds";

export default function MoviesForm({handleNewMovie}) {

    const url = 'http://localhost:8282/movies';

    function handleSubmit(event) {
        
        // preventing page refresh
        event.preventDefault();

        // will grab all of the data from our form
        const data = new FormData(event.target);

        // creating movie object
        const newMovie = {
            title : data.get('movieTitle'),
            rating : data.get('movieRating'),
            director : {
                firstName : data.get('directorFirst'),
                lastName : data.get('directorLast')
            }
        }

        // sending the post request
        fetch(url + '/movie', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newMovie)
            })
            .then(data => data.json())
            .then(returnedData => {
                // calling handleNewMovie from Movies.jsx to add the movie to the table
                handleNewMovie(returnedData);

                // resetting the form
                event.target.reset();
            })
            .catch(error => console.error(error));
    }

    return(
        <>
            <Form onSubmit={handleSubmit} >
                <Label htmlFor="movie-title-input">Movie Title</Label>
                <TextInput id="movie-title-input" name="movieTitle" type="text"/>

                <Label htmlFor="movie-rating-input">Movie Rating</Label>
                <TextInput id="movie-rating-input" name="movieRating" type="number"/>

                <Label htmlFor="director-first-input">Director First Name</Label>
                <TextInput id="director-first-input" name="directorFirst" type="text"/>

                <Label htmlFor="director-last-input">Director Last Name</Label>
                <TextInput id="director-last-input" name="directorLast" type="text"/>

                <Button type="submit" data-close-modal='true'>Submit</Button>
            </Form>
        </>
    );
}