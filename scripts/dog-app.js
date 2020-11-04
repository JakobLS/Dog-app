'use-strict';



function createRandomString(nbrImg) {
    // Function for creating a string to randomly return nbrImg of images
    return `https://dog.ceo/api/breeds/image/random/${nbrImg}`;
}

function createBreedString(breed) {
    // Function for creating a string to return a specific breed. Replace white space with hyphens
    return `https://dog.ceo/api/breed/${breed.replace(" ", "-")}/images/random`;
}

function getDogImages(breedString) {
    // Function for fetching breed image
    fetch(breedString)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert(`${error.message}`));
}

function generateImageElement(image) {
    // Function for generating an image string element
    return `<img src="${image}" class="output-img">`;
}

function generateImageString(responseList) {
    // Function for generating the image string
    const images = responseList.map(img => generateImageElement(img));
    return images.join("");
}

function displayResults(responseJson) {
    // Function for displaying the results in the DOM
    const message = responseJson.message;
    if (responseJson.status == 'error') {
        throw new Error('Error: Could not find breed. Please try another.');
    } else if (typeof message === 'object') {
        var imgString = generateImageString(message);
    } else if (typeof message === 'string') {
        var imgString = generateImageElement(message);
    };
    $('.js-output-section').html(imgString);
}

// Functionality for when the I'm lucky button is clicked
function luckyButtonClicked() {
    $('#js-dog-image-form').submit(event => {
        event.preventDefault();
        let nbrImages = $('.js-image-entry').val()
        $('.js-image-entry').val('');

        // Set default number of images to display to 3 if no or bad input is given
        if (nbrImages == false) {
            nbrImages = 3;
        }
        const apiString = createRandomString(nbrImages);
        getDogImages(apiString);
    });
}

function breedButtonClicked() {
    // Function for when the Get Breed button is clicked
    $('#js-breed-image-form').submit(event => {
        event.preventDefault();
        const img = $('.js-breed-entry').val();
        const imgString = createBreedString(img.toLowerCase());
        getDogImages(imgString);
    });
}


function main() {
    luckyButtonClicked();
    breedButtonClicked();
}

$(main);

