'use strict';

console.log('Skittles, Taste the Rainbow');

//search bar
var searchInput = document.querySelector('#search-input');
var search = document.querySelector('#search');

//area of posts
var postsFeed = document.querySelector('.col');

search.addEventListener("click", function (e) {
	searchPosts();
	searchInput.value = '';

	scrollToTop(postsFeed);
});

var scrollToTop = function scrollToTop(element) {
	element.scrollIntoView(true);
};

var searchPosts = function searchPosts() {

	var url = API_URL + 'search/';

	axios.get(url + searchInput.value).then(function (response) {
		console.log(response);

		createPostsModule.createPosts(response.data);
	}).catch(function (error) {
		console.log(error);
	});
};
//# sourceMappingURL=main.js.map
