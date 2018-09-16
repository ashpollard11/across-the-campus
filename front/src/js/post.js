
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


//on click, pull data from info fields

submit.addEventListener("click", function(e) {
	e.preventDefault()

	//if the comment field is checked, call the function with the true comment value
	//else, call it as a null value
	//confirmation page shown
	if (commentsField.checked) {
		sendPost(commentsField.checked)
	} else {
		sendPost(null)
	}
	form.classList.add("is-inactive")
	confirmation.classList.add("is-active")
})

const sendPost = function(comm) {
	//format the date and time.
	let formatDate = dateField.value;
	let formatTime = timeField.value;

	let url = 'http://localhost:1337/post';

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
	})
	.then(function (response) {
		console.log(response);
	})
	  .catch(function (error) {
		console.log(error);
	});
}





