'use strict';

var postsFeed = document.querySelector('.col');

window.addEventListener('load', function (e) {
	showPosts();
});

var deletePosts = function deletePosts(post) {
	var url = 'http://localhost:1337/';

	axios.delete(url, {
		removePost: post
	}).then(function (response) {
		console.log("array of current posts: ", response.data);

		createPostsModule.createPosts(response.data);
	}).catch(function (error) {
		console.log(error);
	});
};

var showPosts = function showPosts() {
	var url = 'http://localhost:1337/';

	axios.get(url).then(function (response) {
		console.log("array of posts: ", response.data);

		createPostsModule.createPosts(response.data);
	}).catch(function (error) {
		console.log(error);
	});
};

var createPostsModule = function () {

	var createPosts = function createPosts(obj) {

		postsFeed.innerHTML = '';

		obj.forEach(function (arr, i) {
			console.log(arr);
			console.log(i);

			//article(post)

			var article = document.createElement('article');

			//date and time is in one container

			var dateTimeCont = document.createElement('div');
			var dateEl = document.createElement('p');
			var timeEl = document.createElement('p');

			//title of event and event type in one container

			var titleTypeCont = document.createElement('div');
			var eventTitleEl = document.createElement('h3');
			var typeEl = document.createElement('p');

			//description

			var descriptionEl = document.createElement('p');

			//username and email in one container

			var userEmailCont = document.createElement('div');
			var usernameEl = document.createElement('h4');
			var emailEl = document.createElement('p');

			//time posted

			var timePostedEl = document.createElement('p');

			//comment section
			//container holding the arrow revealing the section

			var commentsCont = document.createElement('section');
			var commentsDiv = document.createElement('div');
			var commentsButton = document.createElement('button');
			var commentsLabel = document.createElement('p');

			//comment element containing all the comments as an object
			//username input field, comment box input, and send button

			var commentsForm = document.createElement('form');
			var commentsEl = document.createElement('p');
			var commenterLabel = document.createElement('label');
			var commenter = document.createElement('input');
			var commentBoxLabel = document.createElement('label');
			var commentBox = document.createElement('textarea');
			var sendButton = document.createElement('button');

			dateTimeCont.classList.add('dateTimeCont');
			dateEl.innerHTML = arr.date;
			// if (arr.time.charAt(0) === "0") {
			// 	arr.time = arr.time.substr(1);
			// }
			timeEl.innerHTML = arr.time;

			titleTypeCont.classList.add('titleTypeCont');
			eventTitleEl.innerHTML = arr.eventTitle;
			typeEl.innerHTML = arr.type;

			descriptionEl.classList.add("description");
			descriptionEl.innerHTML = arr.description;

			usernameEl.innerHTML = "By " + arr.username;
			emailEl.innerHTML = "Contact: " + arr.email;

			timePostedEl.classList.add("postDateTime");
			timePostedEl.innerHTML = "Date Posted: " + arr.timePosted;

			//if the comments area is true, add the button and title comments
			//the comment inputs are set, the button is added
			//else, the comments are disabled

			commentsCont.classList.add('comment-section');

			commentsEl.classList.add('comments');
			if (arr.comments) {
				console.log(arr.comments);
				commentsLabel.innerHTML = "Comments";
				commentsButton.innerHTML = '&#9661;';
				commenter.type = "text";
				commentBox.rows = "5";
				commentsForm.classList.add('comment-form');
				commenter.classList.add('comment-user');
				commentBox.classList.add('comment-input');
				sendButton.classList.add('send-comment');
				commenterLabel.innerHTML = "Name: ";
				commentBoxLabel.innerHTML = "Reply: ";
				sendButton.innerHTML = "send";
				sendButton.type = "button";
			} else {
				commentsEl.innerHTML = "Comments are disabled for this post.";
			}

			postsFeed.appendChild(article);
			article.appendChild(dateTimeCont);
			article.appendChild(titleTypeCont);
			article.appendChild(userEmailCont);

			dateTimeCont.appendChild(dateEl);
			dateTimeCont.appendChild(timeEl);

			titleTypeCont.appendChild(eventTitleEl);
			titleTypeCont.appendChild(typeEl);

			article.appendChild(descriptionEl);

			userEmailCont.appendChild(usernameEl);
			userEmailCont.appendChild(emailEl);

			article.appendChild(timePostedEl);

			article.appendChild(commentsCont);

			//if expiry time passes, remove child
			if (arr.expiryTime === "24") {
				setTimeout(function () {
					deletePosts(i);
				}, 60000 * 60 * 24);
			}

			if (arr.expiryTime === "48") {
				setTimeout(function () {
					deletePosts(i);
				}, 60000 * 60 * 48);
			}

			if (arr.expiryTime === "36") {
				setTimeout(function () {
					deletePosts(i);
				}, 60000 * 60 * 36);
			}

			if (arr.expiryTime === "1 Hour After Event") {
				var now = arr.timePosted;
				var later = arr.date + "\xa0" + arr.time;
				var ms = moment(later, "HH:mm:ss").diff(moment(now, "HH:mm:ss"));
				var hour = 60000 * 60;

				setTimeout(function () {
					deletePosts(i);
				}, ms + hour);
			}

			//if comments exist, append the children
			//else, only append the element stating a disabled comment area

			if (arr.comments) {
				commentsCont.appendChild(commentsDiv);
				commentsCont.appendChild(commentsForm);
				commentsDiv.appendChild(commentsButton);
				commentsDiv.appendChild(commentsLabel);
				commentsForm.appendChild(commentsEl);

				commentsForm.appendChild(commenterLabel);
				commenterLabel.appendChild(commenter);

				commentsForm.appendChild(commentBoxLabel);
				commentBoxLabel.appendChild(commentBox);
				commentsForm.appendChild(sendButton);
			} else {
				commentsCont.appendChild(commentsForm);
				commentsForm.appendChild(commentsEl);
			}

			//create each comment

			var createComments = function createComments(dataSet) {

				dataSet.forEach(function (commentObject) {
					console.log(commentObject);

					var commentCont = document.createElement('div');
					var commentUser = document.createElement('p');
					var commentText = document.createElement('p');
					var commentTime = document.createElement('p');

					commentUser.innerHTML = commentObject.username;
					commentText.innerHTML = commentObject.comment;
					commentTime.innerHTML = commentObject.timePosted;

					commentsEl.appendChild(commentCont);
					commentCont.appendChild(commentUser);
					commentCont.appendChild(commentText);
					commentCont.appendChild(commentTime);
				});
			};

			//create current comments

			createComments(arr.commentsArr);

			//send new comments

			var sendComment = function sendComment(commentField, commenter, index) {

				console.log(index);

				var url = 'http://localhost:1337/comment';

				axios.post(url, {
					comment: commentField.value,
					username: commenter.value,
					postIndex: index
				}).then(function (response) {
					console.log(response);
					createComments(response.data);
				}).catch(function (error) {
					console.log(error);
				});
			};

			//send a comment and get the current ones

			sendButton.addEventListener("click", function (e) {
				sendComment(commentBox, commenter, i);
				commentsEl.innerHTML = '';
				commenter.value = '';
				commentBox.value = '';
			});

			//open button

			commentsButton.addEventListener("click", function (e) {
				commentsEl.classList.toggle('active');
				if (commentsEl.classList.contains('active')) {
					commentsButton.innerHTML = '&#9651;';
				} else {
					commentsButton.innerHTML = '&#9661;';
				}
			});
		});
	};

	return {
		createPosts: createPosts
	};
}();
//# sourceMappingURL=homepage.js.map
