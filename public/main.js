// Check hash for token
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

// Set token
let _token = hash.access_token;

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "49d489069bce4a5388c657a3351b176c";
// const redirectUri = "https://spotify-mixer.herokuapp.com";
const redirectUri = "http://localhost:5000";
const scopes = [
  "streaming",
  "user-read-birthdate",
  "user-read-email",
  "user-read-private",
  "playlist-modify-public",
  "user-modify-playback-state"
];

// If there is no token, redirect to Spotify Authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token`;
}

// Page Setup
showUser();
setUpSliders();
setUpMode();

$(function() {
  $('[data-toggle="popover"]').popover();
});

function showUser() {
  $.get("/user?token=" + _token, function(user) {
    $("#current-user").text(user.id);
    $("#display-name").text(user.display_name);
  });
}

$(document).keypress(function(e) {
  if ($("#genre-select").hasClass("show") && (e.keycode == 13 || e.which == 13)) {
    document.getElementById('get-recommendations').click();
  }
});


function getGenresList() {
  $("#genres-list").empty();
  $.get("/genres?token=" + _token, function(genres) {
    genres.forEach(function(genre) {
      let genreButtonElement =
        '<div class="btn-group-toggle"><label class="btn genre-button"><input class="genre-checkbox" type="checkbox" value="' +
        genre +
        '">' +
        genre +
        "</label></div>";
      $("#genres-list").append(genreButtonElement);
    });
  });
}

function setUpMode() {
  $("#mode-value").text("Minor");
}

function setUpSliders() {
  $("#positivity-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.5,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#positivity-value").text($("#positivity-slider").slider("values", 0));
    },
    slide: function() {
      $("#positivity-value").text($("#positivity-slider").slider("values", 0));
    }
  });
  $("#energy-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.3,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#energy-value").text($("#energy-slider").slider("values", 0));
    },
    slide: function() {
      $("#energy-value").text($("#energy-slider").slider("values", 0));
    }
  });
  $("#acousticness-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.65,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#acousticness-value").text(
        $("#acousticness-slider").slider("values", 0)
      );
    },
    slide: function() {
      $("#acousticness-value").text(
        $("#acousticness-slider").slider("values", 0)
      );
    }
  });
  $("#danceability-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.55,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#danceability-value").text(
        $("#danceability-slider").slider("values", 0)
      );
    },
    slide: function() {
      $("#danceability-value").text(
        $("#danceability-slider").slider("values", 0)
      );
    }
  });
  $("#instrumentalness-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.4,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#instrumentalness-value").text(
        $("#instrumentalness-slider").slider("values", 0)
      );
    },
    slide: function() {
      $("#instrumentalness-value").text(
        $("#instrumentalness-slider").slider("values", 0)
      );
    }
  });
  $("#liveness-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.6,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#liveness-value").text($("#liveness-slider").slider("values", 0));
    },
    slide: function() {
      $("#liveness-value").text($("#liveness-slider").slider("values", 0));
    }
  });
  $("#speechiness-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.5,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#speechiness-value").text(
        $("#speechiness-slider").slider("values", 0)
      );
    },
    slide: function() {
      $("#speechiness-value").text(
        $("#speechiness-slider").slider("values", 0)
      );
    }
  });

  $("#tempo-slider").slider({
    orientation: "horizantal",
    min: 0,
    max: 200,
    step: 1,
    value: 120,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#tempo-value").text($("#tempo-slider").slider("values", 0));
    },
    slide: function() {
      $("#tempo-value").text($("#tempo-slider").slider("values", 0));
    }
  });

  $("#popularity-slider").slider({
    orientation: "vertical",
    min: 0,
    max: 100,
    step: 1,
    value: 40,
    stop: function() {
      getRecommendations();
    },
    create: function() {
      $("#popularity-value").text($("#popularity-slider").slider("values", 0));
    },
    slide: function() {
      $("#popularity-value").text($("#popularity-slider").slider("values", 0));
    }
  });
}

function getSliderValues() {
  let values = {};

  let target_popularity = $("#popularity-slider").slider("values", 0);
  let target_positivity = $("#positivity-slider").slider("values", 0);
  let target_energy = $("#energy-slider").slider("values", 0);
  let target_acousticness = $("#acousticness-slider").slider("values", 0);
  let target_danceability = $("#danceability-slider").slider("values", 0);
  let target_instrumentalness = $("#instrumentalness-slider").slider(
    "values",
    0
  );
  let target_liveness = $("#liveness-slider").slider("values", 0);
  let target_speechiness = $("#speechiness-slider").slider("values", 0);
  let target_tempo = $("#tempo-slider").slider("values", 0);
  let target_mode;

  if ($("#mode-value").is(":checked")) {
    target_mode = 0;
    values["target_mode"] = 0;
    $("#mode-text").text("Minor");
  } else if ($("#mode-value").is(":not(:checked)")) {
    target_mode = 1;
    values["target_mode"] = 1;
    $("#mode-text").text("Major");
  }

  values["target_popularity"] = target_popularity;
  values["target_positivity"] = target_positivity;
  values["target_energy"] = target_energy;
  values["target_acousticness"] = target_acousticness;
  values["target_danceability"] = target_danceability;
  values["target_instrumentalness"] = target_instrumentalness;
  values["target_liveness"] = target_liveness;
  values["target_speechiness"] = target_speechiness;
  values["target_tempo"] = target_tempo;
  values["target_mode"] = target_mode;

  return values;
}

function getRecommendations() {
  // Get selected genres
  let genres = [];
  $("#genres-list input:checked").each(function() {
    genres.push($(this).val());
  });
  if (genres[0] && genres.length <= 5) {
    let genresString = genres.join();
    localStorage.setItem("currentGenres", genresString);
    $("#current-genres").text(genresString);

    // Get slider values
    let audioFeatures = getSliderValues();
    localStorage.setItem("currentFeatures", JSON.stringify(audioFeatures));

    // Send the request
    $.get(
      "/recommendations?seed_genres=" +
        genresString +
        "&" +
        $.param(audioFeatures) +
        "&token=" +
        _token,
      function(data) {
        $("#tracks").empty();
        let trackIds = [];
        let trackUris = [];
        if (data.tracks) {
          if (data.tracks.length > 0) {
            data.tracks.forEach(function(track) {
              trackIds.push(track.id);
              trackUris.push(track.uri);
            });
            localStorage.setItem("currentTracks", trackUris.join());
            renderTracks(trackIds);
          } else {
            alert("Try more broad parameters");
          }
        } else {
          alert("Please pick at least 1 genre!");
        }
      }
    );
  } else if (genres.length > 5) {
      alert("You picked " + genres.length + " genres. " + genres.length + " is more than 5. Read the instructions and try again.");
  } else if (!genres[0]) {
    alert(
      `Spotify's recommendation API requires that you pick a genre to send requests!`
    );
  }
}

function makePlaylist() {
  if (!localStorage.getItem("currentTracks")) {
    alert("No tracks :/ Try again...");
    refresh();
  } else if (localStorage.getItem("currentTracks")) {
    let playlistName = document.getElementById("playlist-name").value;
    $.post(
      "/playlist?tracks=" +
        localStorage.getItem("currentTracks") +
        "&genres=" +
        localStorage.getItem("currentGenres") +
        "&features=" +
        localStorage.getItem("currentFeatures") +
        "&playlistName=" +
        playlistName +
        "&token=" +
        _token,
      function(playlist) {}
    );
  }
  clearLocals();
}

function renderTracks(ids) {
  $.get("/tracks?ids=" + ids.join() + "&token=" + _token, function(tracks) {
    tracks.forEach(function(track) {
      let image = track.album.images
        ? track.album.images[0].url
        : "https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png";
      let trackElement =
        '<div class="row border-bottom"><div class="track-element col-12" id="' +
        track.uri +
        '"><div class="row"><div class="album-box col-3"><img class="album-art img-fluid" src="' +
        image +
        '"/></div><div class="col-9"><div class="row"><a class="track-link" href="https://open.spotify.com/track/' +
        track.id +
        '" target="_blank"><p class="track-name">' +
        track.name +
        '</p></a></div><div class="row"><p class="artist-name">' +
        track.artists[0].name +
        " - " +
        track.album.name +
        '</p></div></div></div><div class="col-1"></div></div>';
      $("#tracks").append(trackElement);
      $("#tracks-sm").append(trackElement);
    });
  });
}

function refresh() {
  location.reload();
}

function clearLocals() {
  localStorage.setItem("currentTracks", "");
  localStorage.setItem("currentGenres", "");
  localStorage.setItem("currentFeatures", "");
}
