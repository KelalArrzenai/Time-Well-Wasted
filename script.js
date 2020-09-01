var genreOption;
var select = $("#genreDropDown").val();

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
    for (var i = 0; i < genreCategory.length; i++) {
        genreOption = $("<option>");
        genreOption.text(genreCategory[i].genre);
        genreOption.attr("value", genreCategory[i].genreID)
        dropDown.append(genreOption);
    }

}
$(document).ready(function() {
    $("input").on("click", function() {
        event.preventDefault();
        var selectedGenre = $("#genreDropDown").children("option:selected").val();
        console.log(selectedGenre);


        var genreID = parseInt(selectedGenre);
        var APIKey = "1a0244fad68dbfa1e242e232ce4a493c"; //TMDB api
        var queryGenre = "https://api.themoviedb.org/3/discover/movie?api_key=1a0244fad68dbfa1e242e232ce4a493c&language=en-US&primary_release_year=2020&with_genres=" + genreID + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"; //2020 most popular movies
        var queryPopular = "https://api.themoviedb.org/3/trending/all/day?api_key=1a0244fad68dbfa1e242e232ce4a493c&language=en-US"; //Todays trending titles

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
                $("body").append(newDiv);
                var movieTitle = $("<h2>").text(response.results[i].title);
                newDiv.append(movieTitle);
                var movieSummary = $("<p>").text(response.results[i].overview);
                newDiv.append(movieSummary);
                var poster = $("<img>").attr("src", imgURL);
                newDiv.append(poster);

            }
            console.log(response);
        });
    });

});
init();