'use strict';

var postsFeed = document.querySelector('.col-2');

window.addEventListener('load', function (e) {
	showPosts();
});

var showPosts = function showPosts() {
	var url = 'http://localhost:1337/';

	axios.get(url).then(function (response) {
		console.log("array of posts: ", response);
		response.data.forEach(function (arr) {
			var article = document.createElement('article');

			var titleTypeCont = document.createElement('div');
			var eventTitle = document.createElement('h3');
			var type = document.createElement('p');

			var userEmailCont = document.createElement('div');
			var username = document.createElement('h4');
			var email = document.createElement('p');

			var dateTimeCont = document.createElement('div');
			var date = document.createElement('p');
			var time = document.createElement('p');

			var description = document.createElement('p');
			var comments = document.createElement('p');

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
		});
	}).catch(function (error) {
		console.log(error);
	});
};
//# sourceMappingURL=homepage.js.map
