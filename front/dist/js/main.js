"use strict";

console.log("Skittles, Taste the Rainbow");

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

if (commentsField.checked) {
	commentsField.value = 'addComments';
}
if (!commentsField.checked) {
	commentsField.value = 'noComments';
}

//on click, pull data from info fields

submit.addEventListener("click", function (e) {
	e.preventDefault();
	sendPost();
	form.classList.add("is-inactive");
	confirmation.classList.add("is-active");
});

var sendPost = function sendPost() {
	var url = 'http://localhost:1337/post';

	axios.post(url, {
		type: typeField.value,
		username: usernameField.value,
		date: dateField.value,
		time: timeField.value,
		eventTitle: eventTitleField.value,
		description: descriptionField.value,
		expiryTime: expiryTimeField.value,
		email: emailField.value,
		comments: commentsField.value
	}).then(function (response) {
		console.log(response);
	}).catch(function (error) {
		console.log(error);
	});
};
//# sourceMappingURL=main.js.map
