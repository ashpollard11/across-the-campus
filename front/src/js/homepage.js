

const postsFeed = document.querySelector('.col-2')

window.addEventListener('load', function(e) {
	showPosts()
})

const showPosts = function() {
	let url = 'http://localhost:1337/';

	axios.get(url)
	.then(function (response) {
		console.log( "array of posts: ", response);
		response.data.forEach((arr) => {
			const article = document.createElement('article');

			const titleTypeCont = document.createElement('div');
			const eventTitle = document.createElement('h3');
			const type = document.createElement('p');

			const userEmailCont = document.createElement('div');
			const username = document.createElement('h4');
			const email = document.createElement('p');

			const dateTimeCont = document.createElement('div');
			const date = document.createElement('p');
			const time = document.createElement('p');

			const description = document.createElement('p');
			const comments = document.createElement('p');

			postsFeed.appendChild(article);
			article.appendChild(titleTypeCont);
			article.appendChild(userEmailCont);
			article.appendChild(dateTimeCont);

			titleTypeCont.appendChild(eventTitle);
			titleTypeCont.appendChild(type);

			userEmailCont.appendChild(username);
			userEmailCont.appendChild(email);

			dateTimeCont.appendChild(date);
			dateTimeCont.appendChild(time);

			article.appendChild(description);

			//if comments are checked, include them
			if (arr.comments = 'addComments') {
				article.appendChild(comments);
			}

		})
	})
	  .catch(function (error) {
		console.log(error);
	});
}






