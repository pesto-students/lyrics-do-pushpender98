var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');

/**
 * Class for fetching and interaction with lyrics api
 */
class Api {
    suggestionURL = 'https://api.lyrics.ovh';

    getJSON = (url, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    }

    getSuggestions = (inputQuery) =>{
        this.getJSON(`${this.suggestionURL}/suggest/${inputQuery}`, (err, data) => {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                console.log(data);
            }
        });
    }

}
let _Api = new Api();

/**
 * Display suggestion will display result when we hit click on the button
 */
class DisplaySuggestions {
    

}
let _DisplaySuggestions = new DisplaySuggestions();

searchButton.addEventListener('click', function () {
    _Api.getSuggestions(searchInput.value);
});
