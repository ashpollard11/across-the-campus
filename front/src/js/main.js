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

searchInput.addEventListener("keyup", function(e) {

	if (event.keyCode === 13) {
		search.click()
	}
})

let scrollToTop = (element) => {
	    element.scrollIntoView(true);
	}

const searchPosts = function() {

	let url = API_URL+'search/';

	axios.get(url + searchInput.value)
	.then(function (response) {
		console.log(response);

		createPostsModule.createPosts(response.data)
	})
	  .catch(function (error) {
		console.log(error);
	});
}