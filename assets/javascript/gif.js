var gifs = ["Rabbit", "Cats", "Dogs", "Lizard"]



function displayMovieInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=Woe8iVBWAKGEpRHcxIIpyd0R9VU31Z1z&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
      // Creating a div to hold the gif
      var movieDiv = $("<div class='gif'>");

      // Storing the rating data
      var rating = response.Rated;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      movieDiv.append(pOne);

      // Storing the release year
      var released = response.Released;

      // Creating an element to hold the release year
      var pTwo = $("<p>").text("Released: " + released);

      // Displaying the release year
      movieDiv.append(pTwo);

      // Storing the plot
      var plot = response.Plot;

      // Creating an element to hold the plot
      var pThree = $("<p>").text("Plot: " + plot);

      // Appending the plot
      movieDiv.append(pThree);

      // Retrieving the URL for the image
      var imgURL = response.Poster;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      movieDiv.append(image);

      // Putting the entire gif above the previous movies
      $("#movies-view").prepend(movieDiv);
    });

  }

  // Function for displaying gif data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifs.length; i++) {

      // Then dynamicaly generating buttons for each gif in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of gif-btn to our button
      a.addClass("gif-btn");
      // Adding a data-attribute
      a.attr("data-name", gifs[i]);
      // Providing the initial button text
      a.text(gifs[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a gif button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // Adding gif from the textbox to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "gif-btn"
  $(document).on("click", ".gif-btn", displayMovieInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();