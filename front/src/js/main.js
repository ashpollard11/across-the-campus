console.log(`Skittles, Taste the Rainbow`)

//input fields

const typeField = document.querySelector("#type");
const usernameField = document.querySelector("#username");
const dateField = document.querySelector("#date");
const timeField = document.querySelector("#time");
const eventTitleField = document.querySelector("#eventTitle");
const descriptionField = document.querySelector("#description");
const expiryTimeField = document.querySelector("#expiryTime");
const emailField = document.querySelector("#email");
let commentsField = document.querySelector("#comments");

//buttons

const submit = document.querySelector("#submit");

//forms

const form = document.querySelector("#postForm");
const confirmation = document.querySelector(".confirmation");


	if (commentsField.checked) {
		commentsField.value = 'addComments'
	}
	if (!commentsField.checked) {
		commentsField.value = 'noComments'
	}


//on click, pull data from info fields

submit.addEventListener("click", function(e) {
	e.preventDefault()
	sendPost();
	form.classList.add("is-inactive")
	confirmation.classList.add("is-active")

})

const sendPost = function() {
	let url = 'http://localhost:1337/post';

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
	})
	.then(function (response) {
		console.log(response);
	})
	  .catch(function (error) {
		console.log(error);
	});
}





