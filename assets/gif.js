// You should try to get in the habit of wrapping your JS code inside document.ready blocks
// or an IIFE (Immediately Invoked Function Expression) so as to prevent your variables from
// implicitly being placed on the global scope - this is mainly an issue because it becomes
// much more likely that you'll have variable collisions.

//initial array of search terms
var emotions = ["joy", "envy", "anger"];

//function to capture emotion user enters
function alertEmotion(){
	var emotion = $(this).attr("data-name");
	// Best to leave console.log statements out of your production code 🙃
	// console.log(emotion)
}

//function for displaying emotions as buttons
function renderButtons(){
	$("#searchButtons").empty();

	//looping through array of emotions
	for (var i=0; i < emotions.length; i++){
		var a = $("<button>");
		a.addClass("emotion");
		a.attr("data-name", emotions[i]);
		a.text(emotions[i]);
		$("#searchButtons").append(a);
	}
}

//adding emotions to the array and adding the buttons for those emotions
$("#add-emotion").on("click", function(event){
	event.preventDefault();
	var emotion = $("#emotion-input").val();
	// console.log(emotion);
	emotions.push(emotion);
	renderButtons();

	// console.log(emotions)
})

$(document).on("click", ".emotion", alertEmotion);

renderButtons();


//--------Connecting buttons to GIPHY API-------------------//
//---include rating and 10 gifs----//

	// Because you've set this listener on container for your buttons `$(this)`
	// is going to refer to the container element which won't have the data
	// necessary for you to do a dynamic query. If you add another parameter
	// to the listener you can tell it to only execute the listener
	// function for specific child elements - it's just like how you set up
	// the listener above this on line 41 and it would loook like so:
	// $("#searchButtons").on("click", "button.emotion", function(){
$("#searchButtons").on("click", function(){
	// Instead of getting the `emotion-input` attr, you actually
	// want to get the `data-name` since that's where you're
	// storing the emotion value on line 24 above.
	var emotionGif = $(this).attr("emotion-input");
	// console.log(emotionGif)//this is wrong - need a new identifier here
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ea80f730526f41e4834ad04c8f8ba3b8&q=anger&limit=10&lang=en";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		// console.log(response.data)

		// Would be good to empty out the `#gifs-here` div before adding more gifs
		// that way you'll only ever have 10 at a time as opposed to a never ending list.

		var data = response.data;

		for (var i=0; i<data.length; i++){
			var gifDiv = $("<div class='item'>");
			var rating = data[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			var emotionImage = $("<img>");
			

			emotionImage.attr("src", data[i].images.fixed_height_still.url);
			emotionImage.addClass("gif")
			// By setting attributes on the `$(".gif")` selector you end up overwriting
			// the attributes for all the elements with a class of `gif` which means
			// that any image you click on will be changed into whatever image you
			// most recently added. It also means that you won't set a `data-still`
			// or `data-animate` value for the image you add last because you're
			// only setting those things for elements already in the DOM
			// and you don't add the last element to the DOM until after you set
			// those attributes.
			$(".gif").attr("data-still", data[i].images.fixed_height_still.url)
			$(".gif").attr("data-animate", data[i].images.fixed_height.url)
			// console.log(emotionImage)

			gifDiv.append(p);
			gifDiv.append(emotionImage);

			$("#gifs-here").prepend(gifDiv);
		}
	})
})

// Here you'll also want to use the same listener syntax I mentioned above
// because otherwise this listener will only be set on the `img.gif` elements
// that are in the DOM when this bit of code runs - which means it won't be set on anything 😮
// So instead you'd want something like this:
// $(document).on("click", "img.gif", function(){

$("img.gif").on("click", function(){
	var currentState = $(this).attr("data-state")
	var newState = (currentState==='still') ? 'animate' : 'still'
	var imageURL = $(this).attr("data-" + newState)

	$(this).attr("src", imageURL)
	$(this).attr("data-state", newState)

})







