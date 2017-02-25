setTimeout(function() {
    $(".intro").fadeOut();
}, 3000);

setTimeout(function() {
    $(".hidden").removeClass("hidden");
}, 3500);

var topics = [];

topics = ["Funniest GIF", "Early Animation", "Eadweard Muybridge", "Motion Studies", "Jean Renoir"];

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
    $("button").click(function() {
        var x = $(this).data("name");
        console.log(x)

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                $('#results').prepend("<img class='giff' data-toggle='0' data-alt='" + response.data[i].images.downsized.url + "'  data-still='" + response.data[i].images.downsized_still.url + "' src='" + response.data[i].images.downsized_still.url + "' ><p>Rating:  " + response.data[i].rating.toUpperCase());
            };


            //start of swap gif with still
        });
    });
}

$("#results").on('click', '.giff', function() {

    var x = $(this).data("alt");
    var y = $(this).data("still");
    var z = $(this).data("toggle");

    console.log(this);
    console.log(x);
    console.log(y);
    console.log(z);

    if (z === 0) {
        console.log("IT'S ZEROOOO")
        $(this).attr('src', x);
        $(this).data('toggle', 1);
        z = 1;
    } else {
        console.log("HUH")
        $(this).attr('src', y);
        $(this).data('toggle', 0);
        z = 0;
    };
});

renderButtons();

// This function handles events where one button is clicked  - CREATE NEW BUTTON
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    var existsalready = topics.includes(topic);
    if (topic == "") {
        return;
    } else if (existsalready) {
        return;
    } else {

        topics.push(topic);
        $("#topic-input").val("")
        renderButtons();
    }
});


var spy = {
    deadmansSwitch: [],
    secret: "cool",
    addSwitch: function(callback) {
        this.deadmansSwitch.push(callback)
    },
    kill: function() {
        this.deadmansSwitch.forEach(function(callback) {
            callback(this.secret)
        })
    }
}

spy.addSwitch(function(secret) {
    console.log("Oh no, I'm dead!")
})

spy.addSwitch(function(secret) {
    console.log("Tell my wife my netflix password is:" + secret)
})

spy.kill()
