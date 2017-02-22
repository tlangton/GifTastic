var topics=[];

topics = ["time-lapse","long exposure","high speed"];

var x;
var y;
var z;

function renderButtons() {

	$(".buttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$(".buttons").append(a);
	}

//Giphy LOAD Images
$("button").on('click',function(){
	var x = $(this).data("name");
	console.log(x)

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"+photo&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			$('#results').prepend("<img class='giff' data-toggle=0 data-alt='"  +response.data[i].images.downsized.url+ "'  data-still='"+response.data[i].images.downsized_still.url+"' src='" +response.data[i].images.downsized_still.url+ "' ><p>Rating: "+response.data[i].rating);
		};

		$(".giff").on('click',function(){
			 x = $(this).data("alt");
			 y = $(this).data("still");
			 z = $(this).data("toggle");

			console.log(x);
			console.log(y);
			console.log(z);

			if (z===0) {
				$(this).attr('src', x);
				$(this).attr('data-toggle', 1);
				z = 1;
			} else
			{
				$(this).attr('src', y);
				$(this).attr('data-toggle', 0);
				z = 0;
			};
		});
	});
});

}

renderButtons();

      // This function handles events where one button is clicked  - CREATE NEW BUTTON
      $("#add-topic").on("click", function(event) {
      	event.preventDefault();
      	var topic = $("#topic-input").val().trim();
      	var existsalready = topics.includes(topic);
      	if (topic =="") {
      		return;
      	} else if (existsalready) {
      		return;
      	} else {
      		topics.push(topic);
      		$("#topic-input").text("");
      		renderButtons();
      	}
      });

