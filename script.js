var genreOption;
var fname = $("#fname");
var selectedGenre;
var selectedMusicGenre;
var keyword;
var movieID;
var randomID = "";
var genreMusic = ["Country", "Pop", "Rock", "Hip-Hop/Rap", "World", "Jazz", "Blues", "Bluegrass", "Funk", "Soul"];
var genreCategory = [{
        genre: "Action",
        genreID: 28
    },
    {
        genre: "Comedy",
        genreID: 16
    },
    {
        genre: "Crime",
        genreID: 80
    },
    {
        genre: "Documentary",
        genreID: 99
    },
    {
        genre: "Drama",
        genreID: 18
    },
    {
        genre: "Family",
        genreID: 10751
    },
    {
        genre: "Kids",
        genreID: 10762
    },
    {
        genre: "Mystery",
        genreID: 9648
    },
    {
        genre: "History",
        genreID: 36
    },
    {
        genre: "Romance",
        genreID: 10749
    },
    {
        genre: "Sci-Fi",
        genreID: 878
    },
    {
        genre: "Western",
        genreID: 37
    },
    {
        genre: "Horror",
        genreID: 27
    },
    {
        genre: "Adventure",
        genreID: 12
    }
]





// Populates genre drop downs what the app is opened

function init() {
    $("#movieMaster").hide();
    $("#movieMaster").children().hide();
    $("#musicMaster").hide();
    $("#musicMaster").children().hide();
    var dropDown = $("#genreDropDown");
    var musicDropDown = $("#musicDropDown");
    for (var i = 0; i < genreCategory.length; i++) {
        genreOption = $("<option>");
        genreOption.text(genreCategory[i].genre);
        genreOption.attr("value", genreCategory[i].genreID)
        genreOption.attr("class", "movieOption");
        dropDown.append(genreOption);
    }
    for (var i = 0; i < genreMusic.length; i++) {
        genreOption = $("<option>");
        genreOption.text(genreMusic[i]);
        genreOption.attr("value", genreMusic[i])
        genreOption.attr("class", "musicOption");
        musicDropDown.append(genreOption);
    }

}

// Clears input field if user decides to search by genre
$("#genreDropDown").on("change", function() {
    $("input").val("");
});



// Triggers the music genre search function
$("#musicSubmitBtn").on("click", function() {
    $("#musicPosterHere").empty();
    $("#musicInfoHere").empty();
    $("#musicMaster").show();
    $("#musicMaster").children().show();
    musicGenre();
});

// Takes user's genre selection and queries it. Returns a random result from the response arrays.
function musicGenre() {
    event.preventDefault();
    selectedMusicGenre = $("#musicDropDown").children("option:selected").val();
    console.log(selectedGenre);
    var queryGenre = "https://itunes.apple.com/search?term=" + selectedMusicGenre;
    $.ajax({
        url: queryGenre,
        method: "GET"
    }).then(function(response) {
        var itunes = JSON.parse(response);
        var st = Math.floor(Math.random() * 40);
        var end = st + 5;
        for (var i = st; i < end; i++) {
            var artistName = $("<h2>").text(itunes.results[i].artistName);
            var albumCover = itunes.results[i].artworkUrl100;
            var trackName = itunes.results[i].trackName;

            var newDiv = $("<div>");
            var br = $("<br>");
            $("#musicInfoHere").append(newDiv);
            $("#musicInfoHere").append(br);
            newDiv.append(artistName);
            var musicSummary = $("<p>").text(trackName);
            newDiv.append(musicSummary);
            musicSummary.append(br);
            var poster = $("<img>").attr("src", albumCover);
            $("#musicPosterHere").append(poster);
            $("#musicPosterHere").append(br);

        }
        console.log(itunes);
    });
}

// Takes either the value of input field and runs a keywords search or triggers the genre search function
$("#movieSubmitBtn").on("click", function() {
    $("#moviePosterHere").empty();
    $("#movieInfoHere").empty();
    $("#movieMaster").show();
    $("#movieMaster").children().show();
    musicGenre();
    if ($("input").val().trim()) {
        keyWords($("input").val());
    } else {
        movieGenre();
    }
});

// Queries movies based on genre selection
function movieGenre() {
    event.preventDefault();
    selectedGenre = $("#genreDropDown").children("option:selected").val();
    console.log(selectedGenre);
    var genreID = parseInt(selectedGenre);
    var APIKey = "1a0244fad68dbfa1e242e232ce4a493c"; //TMDB api
    var queryGenre = "https://api.themoviedb.org/3/discover/movie?api_key=1a0244fad68dbfa1e242e232ce4a493c&language=en-US&primary_release_year=2020&with_genres=" + genreID + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"; //2020 most popular movies
    $.ajax({
        url: queryGenre,
        method: "GET"
    }).then(function(response) {
        var st = Math.floor(Math.random() * 14);
        var end = st + 5;
        for (var i = st; i < end; i++) {
            // console.log(response.results[i].title);
            var poster = response.results[i].poster_path;
            var imgURL = "https://image.tmdb.org/t/p/w500" + poster;
            var genreID = response.results[i].genre_ids;

            var newDiv = $("<div>");
            var br = $("<br>");
            $("#movieInfoHere").append(newDiv);
            $("#movieInfoHere").append(br);
            var movieTitle = $("<h2>").text(response.results[i].title);
            newDiv.append(movieTitle);
            var movieSummary = $("<p>").text(response.results[i].overview);
            newDiv.append(movieSummary);
            newDiv.append(br);
            var poster = $("<img>").attr("src", imgURL);
            $("#moviePosterHere").append(poster);
            $("#moviePosterHere").append(br);

        }
        console.log(response);
    });
}

// Queries trending movies in 2020 and randomly selects out of the list of arrays
$("#movieRandom").on("click", function() {
    event.preventDefault();
    $("#moviePosterHere").empty();
    $("#movieInfoHere").empty();
    $("#movieMaster").show();
    $("#movieMaster").children().show();
    musicGenre();
    var APIKey = "1a0244fad68dbfa1e242e232ce4a493c"; //TMDB api
    var queryTrends = "https://api.themoviedb.org/3/trending/all/day?api_key=1a0244fad68dbfa1e242e232ce4a493c&language=en-US&primary_release_year=2020&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
    $.ajax({
        url: queryTrends,
        method: "GET"
    }).then(function(response) {
        var st = Math.floor(Math.random() * 18);
        var end = st + 5;
        for (var i = st; i < end; i++) {
            // console.log(response.results[i].title);
            var poster = response.results[i].poster_path;
            var imgURL = "https://image.tmdb.org/t/p/w500" + poster;
            var genreID = response.results[i].genre_ids;

            var newDiv = $("<div>");
            $("#movieInfoHere").append(newDiv);

            var movieTitle = $("<h2>").text(response.results[i].title);
            newDiv.append(movieTitle);
            var movieSummary = $("<p>").text(response.results[i].overview);
            newDiv.append(movieSummary);
            var poster = $("<img>").attr("src", imgURL);
            $("#moviePosterHere").append(poster);

        }
        console.log(response);
    });
});

// Takes user's input and queries that keyword and grabs the id associated with keyword and passes it to getMovie.
function keyWords(keyword) {
    event.preventDefault();
    var queryKeyWord = "https://api.themoviedb.org/3/search/keyword?api_key=1a0244fad68dbfa1e242e232ce4a493c&query=" + keyword + "&page=1";

    $.ajax({
        url: queryKeyWord,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < 5; i++) {
            var movieID = response.results[i].id;

        }
        getMovie(movieID);
        console.log(response);

    });
}

// Takes in keyword id and queries movies matching word in titles and descriptions.
function getMovie(movieID) {
    var queryByID = "https://api.themoviedb.org/3/discover/movie?api_key=1a0244fad68dbfa1e242e232ce4a493c&with_keywords=" + movieID + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    console.log(movieID);

    $.ajax({
        url: queryByID,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < 5; i++) {
            var poster = response.results[i].poster_path;
            var imgURL = "https://image.tmdb.org/t/p/w500" + poster;
            var newDiv = $("<div>");
            $("#movieInfoHere").append(newDiv);

            var movieTitle = $("<h2>").text(response.results[i].title);
            newDiv.append(movieTitle);
            var movieSummary = $("<p>").text(response.results[i].overview);
            newDiv.append(movieSummary);
            var poster = $("<img>").attr("src", imgURL);
            $("#moviePosterHere").append(poster);

        }
        console.log(response);
    });

};

// Clears all input fields
$("#movieReset").on("click", function() {
    $("#moviePosterHere").empty();
    $("#movieInfoHere").empty();
    $("#musicPosterHere").empty();
    $("#musicInfoHere").empty();

})

init();