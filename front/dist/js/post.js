"use strict";

//input fields

var typeField = document.querySelector("#type");
var usernameField = document.querySelector("#username");
var dateField = document.querySelector("#date");
var timeField = document.querySelector("#time");
var eventTitleField = document.querySelector("#eventTitle");
var descriptionField = document.querySelector("#description");
var expiryTimeField = document.querySelector("#expiryTime");
var emailField = document.querySelector("#email");
var commentsField = document.querySelector("#comments");

//buttons

var submit = document.querySelector("#submit");

//forms

var form = document.querySelector("#postForm");
var confirmation = document.querySelector(".confirmation");

//on click, pull data from info fields

submit.addEventListener("click", function (e) {
	e.preventDefault();

	//if the comment field is checked, call the function with the true comment value
	//else, call it as a null value
	//confirmation page shown
	if (commentsField.checked) {
		sendPost(commentsField.checked);
	} else {
		sendPost(null);
	}
	form.classList.add("is-inactive");
	confirmation.classList.add("is-active");
});

var sendPost = function sendPost(comm) {
	//format the date and time.
	var formatDate = dateField.value;
	var formatTime = timeField.value;

	var url = 'http://localhost:1337/post';

	axios.post(url, {
		type: typeField.value,
		username: usernameField.value,
		date: moment(formatDate).format("MMM Do YYYY"),
		time: moment(formatTime, "HH:mm").format("h:mm A"),
		eventTitle: eventTitleField.value,
		description: descriptionField.value,
		expiryTime: expiryTimeField.value,
		email: emailField.value,
		comments: comm
	}).then(function (response) {
		console.log(response);
	}).catch(function (error) {
		console.log(error);
	});
};
//# sourceMappingURL=post.js.map
