var topics=[];

topics = ["time-lapse","long exposure","high speed"];


      function renderButtons() {

        $(".buttons").empty();

        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");
          a.addClass("topic");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $(".buttons").append(a);
        }
      }

      // This function handles events where one button is clicked  - CREATE NEW BUTTON
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        renderButtons();
      });

      renderButtons();


$("button").on('click',function(){
var x = $(this).data("name");
// console.log(x)

// l3q2AmjYlPXbC6nn2    26xBLgiRBkaXajq1O

var queryURL = "http://api.giphy.com/v1/gifs/search?q="+x+"+photo&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
for (var i = 0; i < response.data.length; i++) {

      $('#results').prepend("<img data-alt='"  + response.data[i].images.original.url +  "' src='" + response.data[i].images.fixed_height_still.url + "'><p>Rating: "+response.data[i].rating);

  }
    });


})