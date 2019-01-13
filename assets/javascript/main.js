var topics = ['Luke Skywalker', 'Princess Leia', 'Han Solo', 'Darth Vader', 'Emperor Palpatine', 'Obi-Wan Kenobi', 'Lightsaber', ]

// Function for displaying buttons
function renderButtons() {

    // Deletes the content inside the topics-buttons div prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $('#topics-buttons').empty();

    // Loop through the array of topics, then generate buttons for each movie in the array
    topics.forEach(function(topics){
      var topicsButton = $('<button>').text(topics).attr('data-name', topics);
      $('#topics-buttons').append(topicsButton);
    })
  }

  renderButtons();

  $("button").on("click", function() {
    var starWarsSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      starWarsSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }) //makes a promise so .then can fucntion
      .then(function(response) {
        console.log(response)
        console.log(response.data[0].url)
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

          // gifDiv.prepend(p);
          gifDiv.prepend(personImage, p);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

// $(document).ready(function() {
//     for (var i = 0; i < characterArray.length; i++) {
//         $("#buttons").append("<button type='button' onclick='searchGif(\"" + characterArray[i] + "\")' class='btn btn-primary' value=' " + characterArray[i] + "'> " + characterArray[i] + " </button>");
//     }
// });

// function characterButtonClicked() {
//     var userInput = $('#character-input').val();
//     searchGif(userInput);
// }

// function submitButtonClicked() {
//     var userInput = $('#character-input').val();

//     if (userInput) {
//         $('#athlete-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
//     }
// }


// $("button[data-input]").on("click", function() {
//     var person = $(this).attr("data-input");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       person + "&api_key=dc6zaTOxFJmzC&limit=10";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }) //makes a promise so .then can fucntion
//       .then(function(response) {
//         console.log(response)
//         console.log(response.data[0].url)
//         var results = response.data;

//         for (var i = 0; i < results.length; i++) {
//           var gifDiv = $("<div>");

//           var rating = results[i].rating;

//           var p = $("<p>").text("Rating: " + rating);

//           var personImage = $("<img>");
//           personImage.attr("src", results[i].images.fixed_height.url);

//           // gifDiv.prepend(p);
//           gifDiv.prepend(personImage, p);

//           $("#gifs-appear-here").prepend(gifDiv);
//         }
//       });
//   });