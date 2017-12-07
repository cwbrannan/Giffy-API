var heros = ["superman", "batman", "spiderman", "hulk", "ironman", "thor", "captainamerica"]
// Function for  creating and displaying Button data
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();
    /

    // Looping through the array of movies
    for (var i = 0; i < heros.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("data-heros herosBtn");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", heros[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(heros[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}


$(document).ready(function() {

    //creating the UI.
    renderButtons();


});

//=======================================
// Adding click event listen listener to all buttons
$(document).on("click", ".herosBtn", function() {
    // Grabbing and storing the data-heros property value from the button
    var heros = $(this).attr("data-name");
    queryGiphy(heros);

});

function queryGiphy(heros) {
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        heros + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {

            // storing the data from the AJAX request in the results variable
            var results = response.data;
            // Looping through each result item
            $("#gifs-appear-here").empty()
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var herosDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var herosImage = $("<img class=gif>");
                // Setting the src attribute of the image to a property pulled off the result item
                herosImage.attr("data-state", "still");
                //setting data-still attribute and setting the url 
                herosImage.attr("data-still", results[i].images.original_still.url);
                //setting data-animate attribute and setting the url 
                herosImage.attr("data-animate", results[i].images.original.url);
                //setting the still URL 
                herosImage.attr("src", results[i].images.original_still.url);
                // Appending the paragraph and image tag to the herosDiv

                herosDiv.append(herosImage);
                herosDiv.append(p);

                // Prependng the herosDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(herosDiv);
            }
        });
}

$(document).on("click", ".gif", function() {

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var currentState = $(this).attr("data-state");

    // Var currentState = $(this).attr("src") - - - Didnt work!

    // Ternary Operator - See if it works correctly?
    var newState = (currentState === 'still') ? 'animate' : 'still';

    //Copying the state to the imageUrl
    var imageUrl = $(this).attr("data-" + newState);

    $(this).attr("src", imageUrl);

    $(this).attr("data-state", newState);

})


// This function handles events where one button is clicked
$(".addHeroBtn").on("click", function(event) {
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var newHero = $("#addHero").val().trim();

    // The movie from the textbox is then added to our array
    heros.push(newHero);
    // clearing the input box after adding the button.
    $('#addHero').val('');

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});