//initial array of search terms
var emotions = ["joy", "envy", "anger"];

//function to capture emotion user enters
function alertEmotion(){
	var emotion = $(this).attr("data-name");
	console.log(emotion)
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
	console.log(emotion);
	emotions.push(emotion);
	renderButtons();

	console.log(emotions)
})

$(document).on("click", ".emotion", alertEmotion);

renderButtons();


//--------Connecting buttons to GIPHY API-------------------//
//---include rating and 10 gifs----//
$("#searchButtons").on("click", function(){
	var emotionGif = $(this).attr("emotion-input");
	console.log(emotionGif)//this is wrong - need a new identifier here
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ea80f730526f41e4834ad04c8f8ba3b8&q=anger&limit=10&lang=en";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response){
		console.log(response.data)
		var data = response.data;

		for (var i=0; i<data.length; i++){
			var gifDiv = $("<div class='item'>");
			var rating = data[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			var emotionImage = $("<img>");
			

			emotionImage.attr("src", data[i].images.fixed_height_still.url);
			emotionImage.addClass("gif")
			$(".gif").attr("data-still", data[i].images.fixed_height_still.url)
			$(".gif").attr("data-animate", data[i].images.fixed_height.url)
			console.log(emotionImage)

			gifDiv.append(p);
			gifDiv.append(emotionImage);

			$("#gifs-here").prepend(gifDiv);
		}
	})
})

$("img.gif").on("click", function(){
	var currentState = $(this).attr("data-state")
	var newState = (currentState==='still') ? 'animate' : 'still'
	var imageURL = $(this).attr("data-" + newState)

	$(this).attr("src", imageURL)
	$(this).attr("data-state", newState)

})







