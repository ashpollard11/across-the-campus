
const postsFeed = document.querySelector('.col1')
// const postsFeed2 = document.querySelector('.col2')
// const postsFeed3 = document.querySelector('.col3')



// const deletePosts = function(post) {
// 	let url = API_URL;

// 	axios.delete(url, {
// 		removePost: post
// 	})
// 	.then(function (response) {
// 		console.log( "array of current posts: ", response.data);

// 		createPostsModule.createPosts(response.data)
		
// 	})
// 	  .catch(function (error) {
// 		console.log(error);
// 	});
// }

const showPosts = function() {
	console.log("showPosts")
	let url = API_URL;

	axios.get(url)
	.then(function (response) {
		console.log( "array of posts: ", response.data);

		createPostsModule.createPosts(response.data)
		
	})
	  .catch(function (error) {
		console.log(error);
	});
}

const createPostsModule = (function() {

	const createPosts = function(obj) {

		console.log("createPosts", obj)

		postsFeed.innerHTML = ''

		obj.forEach((arr, i) => {
			console.log(arr)
			console.log(i)

			//article(post)

			const article = document.createElement('article');

			//date and time is in one container

			const dateTimeCont = document.createElement('div');
			const dateEl = document.createElement('p');
			const timeEl = document.createElement('p');

			//title of event and event type in one container

			const titleTypeCont = document.createElement('div');
			const eventTitleEl = document.createElement('h3');
			const typeEl = document.createElement('p');

			//description
			
			const descriptionEl = document.createElement('p');

			//username and email in one container
			
			const userEmailCont = document.createElement('div');
			const usernameEl = document.createElement('h4');
			const emailEl = document.createElement('p');

			//time posted
			
			const timePostedEl = document.createElement('p');

			//comment section
			//container holding the arrow revealing the section

			const commentsCont = document.createElement('section');
			const commentsDiv = document.createElement('div');
			const commentsButton = document.createElement('button');
			const commentsLabel = document.createElement('p');

			//comment element containing all the comments as an object
			//username input field, comment box input, and send button

			const commentsForm = document.createElement('form');
			const commentsEl = document.createElement('p');
			const commenterLabel = document.createElement('label');
			const commenter = document.createElement('input');
			const commentBoxLabel = document.createElement('label');
			const commentBox = document.createElement('textarea');
			const sendButton = document.createElement('button');


			dateTimeCont.classList.add('dateTimeCont');
			dateEl.innerHTML = moment(arr.date).format('ll');
			// if (arr.time.charAt(0) === "0") {
			// 	arr.time = arr.time.substr(1);
			// }
			timeEl.innerHTML = moment(arr.time, "h:mm").format('LT');

			titleTypeCont.classList.add('titleTypeCont');
			eventTitleEl.innerHTML = arr.eventTitle;
			article.classList.add(arr.type);
			typeEl.innerHTML = arr.type;

			
			descriptionEl.classList.add("description");
			descriptionEl.innerHTML = arr.description;

			usernameEl.innerHTML = "By " + arr.username;
			emailEl.innerHTML = "Contact: " + arr.email;

			timePostedEl.classList.add("postDateTime");
			timePostedEl.innerHTML = "Date Posted: " + moment(arr.timePosted).format('lll');

			//if the comments area is true, add the button and title comments
			//the comment inputs are set, the button is added
			//else, the comments are disabled

			commentsCont.classList.add('comment-section')

			commentsEl.classList.add('comments')
			if (arr.comments) {
				console.log(arr.comments)
				commentsLabel.innerHTML = "Comments" + " (" + arr.commentsArr.length + ")"
				commentsButton.innerHTML = '&#9661;'
				commenter.type = "text"
				commenter.placeholder = "Name"
				commentBox.rows = "5"
				commentBox.placeholder = "Enter comment here"
				commentsForm.classList.add('comment-form')
				commenter.classList.add('comment-user')
				commentBox.classList.add('comment-input')
				sendButton.classList.add('send-comment')
				// commenterLabel.innerHTML = "Name: "
				// commentBoxLabel.innerHTML = "Reply: "
				sendButton.innerHTML = "send"
				sendButton.type = "button"
			} else {
				commentsEl.innerHTML = "Comments are disabled for this post."
			}

			// let count = 1;

			// if (count = 1) {
			// 	postsFeed1.appendChild(article);
			// 	count++;
			// } if (count = 2) {
			// 	postsFeed2.appendChild(article);
			// 	count++;
			// } else if (count = 3) {
			// 	postsFeed3.appendChild(article);
			// 	count = 1;
			// }

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


			// if (arr.expiryTime === "1 Hour After Event") {
			// 	let now  = arr.timePosted
			// 	let later = arr.date + "\xa0" +  arr.time;
			// 	let hour = 60000*60
			// 	let ms = moment(later,"HH:mm:ss").diff(moment(now,"HH:mm:ss"));
			// 	let totalExpiry = ms + hour
			// 	console.log("post " + i + " expires in " + totalExpiry + " seconds")
			// 	setTimeout(function(){
			// 		deletePosts(i)
			// 	}, totalExpiry);

			// } else if (arr.expiryTime) {
			// 	setTimeout(function(){
			// 		deletePosts(i)
			// 	}, 60000*60*arr.expiryTime);
			// }



			//if comments exist, append the children
			//else, only append the element stating a disabled comment area

			if (arr.comments) {
				commentsCont.appendChild(commentsDiv);
				commentsCont.appendChild(commentsForm);
				commentsDiv.appendChild(commentsButton);
				commentsDiv.appendChild(commentsLabel);
				commentsForm.appendChild(commentsEl);

				commentsForm.appendChild(commenter);
				// commenterLabel.appendChild(commenter);

				commentsForm.appendChild(commentBox);
				// commentBoxLabel.appendChild(commentBox);
				commentsForm.appendChild(sendButton);
			} else {
				commentsCont.appendChild(commentsForm);
				commentsForm.appendChild(commentsEl);
			}

			//create each comment

			let createComments = function(dataSet) {

				dataSet.forEach((commentObject) => {
					console.log(commentObject)

					const commentCont = document.createElement('div');
					const commentUser = document.createElement('p');
					const commentText = document.createElement('p');
					const commentTime = document.createElement('p');

					commentUser.innerHTML = commentObject.username
					commentText.innerHTML = commentObject.comment
					commentTime.innerHTML = commentObject.timePosted

					commentsEl.appendChild(commentCont)
					commentCont.appendChild(commentUser)
					commentCont.appendChild(commentText)
					commentCont.appendChild(commentTime)
				})
			}
			//set comments as active on load 
			commentsEl.classList.add('active');
			commentsButton.innerHTML = '&#9655;'
			

			//create current comments

			createComments(arr.commentsArr)

			//send new comments

			const sendComment = function(commentField, commenter, index) {

				console.log(index)

				let url = API_URL+'comment';
				

				axios.post(url, {
					comment: commentField.value,
					username: commenter.value,
					postIndex: index
				})
				.then(function (response) {
					console.log(response);
					createComments(response.data)
				})
				  .catch(function (error) {
					console.log(error);
				});
			}

			//send a comment and get the current ones

			sendButton.addEventListener("click", function(e) {
				sendComment(commentBox, commenter, i)
				commentsEl.innerHTML = ''
				commenter.value = ''
				commentBox.value = ''
			})

			//open button

			commentsButton.addEventListener("click", function(e) {
				commentsEl.classList.toggle('active');
				if (commentsEl.classList.contains('active')) {
					commentsButton.innerHTML = '&#9655;'
				} else {
					commentsButton.innerHTML = '&#9658;'
				}
			})
		})
	}

	return {
		createPosts: createPosts
	}

})();



window.addEventListener('load', showPosts)






