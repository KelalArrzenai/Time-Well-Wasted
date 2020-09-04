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

function init() {
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

$("#movieSubmitBtn").on("click", function() {
    $("#moviePosterHere").empty();
    $("#movieInfoHere").empty();
    movieGenre();
});
$("#musicSubmitBtn").on("click", function() {
    $("#musicPosterHere").empty();
    $("#musicInfoHere").empty();
    musicGenre();
});




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
}

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
            var artistName = itunes.results[i].artistName;
            var albumCover = itunes.results[i].artworkUrl100;
            var trackName = itunes.results[i].trackName;

            var newDiv = $("<div>");
            $("#musicInfoHere").append(newDiv);
            newDiv.append(artistName);
            var musicSummary = $("<p>").text(trackName);
            newDiv.append(musicSummary);
            var poster = $("<img>").attr("src", albumCover);
            $("#musicPosterHere").append(poster);

        }
        console.log(itunes);
    });
}

$("#movieRandom").on("click", function() {
    event.preventDefault();
    $("#moviePosterHere").empty();
    $("#movieInfoHere").empty();
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


$("input").on("click", function() {
    event.preventDefault();
    keyword = $(this).val();
    keyWords(keyword);
});

function keyWords(keyword) {
    event.preventDefault();
    var queryKeyWord = "http://api.themoviedb.org/3/search/keyword?api_key=1a0244fad68dbfa1e242e232ce4a493c&query=" + keyword + "&page=1";

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

$("#movieReset").on("click", function() {
    $("#moviePosterHere").empty();
    $("#movieInfoHere").empty();
    $("#musicPosterHere").empty();
    $("#musicInfoHere").empty();

})
init();