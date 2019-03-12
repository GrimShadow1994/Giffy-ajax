var gifs = ["Rabbit", "Cats", "Dogs", "Lizard"]



function displayMovieInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=Woe8iVBWAKGEpRHcxIIpyd0R9VU31Z1z&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(p);
                gifDiv.append(gifImage);

                $("#gif-view").prepend(gifDiv);
            }
        });

}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < gifs.length; i++) {

        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();

    gifs.push(gif);

    renderButtons();
});

$(document).on("click", ".gif-btn", displayMovieInfo);

renderButtons();