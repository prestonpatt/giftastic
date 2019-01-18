var topics = ['Luke Skywalker', 'Princess Leia', 'Han Solo', 'Darth Vader', 'Emperor Palpatine', 'Obi-Wan Kenobi', 'Lightsaber', 'R2-D2', 'C-3PO', 'Death Star', 'Millenium Falcon', 'Alderaan']
// Function for displaying buttons
function renderButtons() {

  $('#topics-buttons').empty();
  topics.forEach(function (topics) {
    var topicsButton = $('<button>').text(topics).attr('data-name', topics);
    $('#topics-buttons').append(topicsButton);
  })
}

renderButtons();

function addThing() {
  event.preventDefault();
  var addTopic = $("#topic-input").val();
  topics.push(addTopic);
  renderButtons();
  $("#topic-input").val('');
  return false;
};

$(document).on("click", "#add-topic", addThing);

$(document).on("click", "button", function () {
  $('#gifs-appear-here').empty();
  var starWarsSearch = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    starWarsSearch + "&api_key=dc6zaTOxFJmzC&limit=10";
  //in class key used above. My key here:  nxImSOK2gN6TjiFCPgbGZwShpmvVzNT3

  console.log(starWarsSearch);

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response)
      console.log(response.data[0].url)
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var ratingCase = rating.toUpperCase();
        var p = $("<p>").text("Rating: " + ratingCase);
        var gifImage = $("<img>").addClass('gif-image');
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-still", response.data[i].images.fixed_height_still.url)
        gifImage.attr("data-animate", response.data[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifDiv.addClass('gif-div')
        gifDiv.append(p, gifImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });

    function imageChangeState() {          

      var state = $(this).attr("data-state");
      var animateImage = $(this).attr("data-animate");
      var stillImage = $(this).attr("data-still");

      if(state === "still") {
          $(this).attr("src", animateImage);
          $(this).attr("data-state", "animate");
      }

      else if(state === "animate") {
          $(this).attr("src", stillImage);
          $(this).attr("data-state", "still");
      }  
    };
    $(document).on("click", ".gif-image", imageChangeState); 

});

