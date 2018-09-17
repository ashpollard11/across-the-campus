console.log(`Skittles, Taste the Rainbow`)


//search bar
let searchInput = document.querySelector('#search-input')
let search = document.querySelector('#search')


//area of posts
const postsFeed = document.querySelector('.col')

search.addEventListener("click", function(e) {
	searchPosts()
	searchInput.value = ''

	scrollToTop(postsFeed);
})

let scrollToTop = (element) => {
	    element.scrollIntoView(true);
	}

const searchPosts = function() {

	let url = 'http://159.65.67.93:1337/search/';

	axios.get(url + searchInput.value)
	.then(function (response) {
		console.log(response);

		createPostsModule.createPosts(response.data)
	})
	  .catch(function (error) {
		console.log(error);
	});
}