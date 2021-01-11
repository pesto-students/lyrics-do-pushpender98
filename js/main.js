var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");

/**
 * Class for fetching and interaction with lyrics api
 */
class Api {
  suggestionURL = "https://api.lyrics.ovh";

  getJSON = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };

  getSuggestions = (inputQuery) => {
    this.getJSON(`${this.suggestionURL}/suggest/${inputQuery}`, (err, data) => {
      if (err !== null) {
        alert("Something went wrong: " + err);
      } else {
        _DisplaySuggestions.displaySongSuggestion(data);
      }
    });
  };
}
let _Api = new Api();

/**
 * Display suggestion will display result when we hit click on the button
 */
class DisplaySuggestions {
  suggestionEmpty = document.getElementById("suggestion-empty");
  suggestionSong = document.getElementById("suggestion-song");
  suggestionInnerSong = document.getElementById("suggestion-inner-song");

  dummyTemplate = (songTitle, songArtistName) => {
    return `
        <div class="song-title">${songTitle}</div>
        <div class="song-artist-name">${songArtistName}</div>
    `;
  }

  displaySongSuggestion = (songData) => {
    console.log(songData);
    if(songData.data.length !=0){

      for (let song of songData.data) {
        let cloneDiv = this.suggestionInnerSong.cloneNode();
        cloneDiv.setAttribute('id', 'suggestion-inner-song_' + song.id);
        let temp = document.createElement('div');
        temp.innerHTML = this.dummyTemplate(song.title, song.artist.name);
        temp.classList.add('song-details');
        cloneDiv.append(temp);
        this.suggestionSong.appendChild(cloneDiv);
        
        this.suggestionSong.classList.remove('d-none');
        this.suggestionSong.classList.add('d-flex');
        this.suggestionEmpty.classList.add('d-none');
      }
    }
    else {
      this.suggestionEmpty.classList.remove('d-none');
      this.suggestionSong.classList.add('d-none');
      this.suggestionEmpty.innerText = "No song available";
    }
  };

  removeOldSuggestions = (elms) => {
    elms.forEach(el => el.remove());
  }
}
let _DisplaySuggestions = new DisplaySuggestions();

searchButton.addEventListener("click", function () {
  _DisplaySuggestions.removeOldSuggestions(document.querySelectorAll(".song-sugestion-data"));
  _Api.getSuggestions(searchInput.value);
});
