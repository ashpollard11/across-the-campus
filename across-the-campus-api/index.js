
const colors = require('colors')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()
//tell the api to respond to anybody in the multiverse!
app.use(cors())
//for parsing application/json
app.use(bodyParser.json());
//for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));


console.log('across the campus back end' .pink)


let arrayPosts = []



app.post('/post', function(req, res) {

	// instead of just saving 24 or 48 or 72
	// calculate the exact expiration time and save that instead

	var newPost = {
		type: 			req.body.type,
		username: 		req.body.username,
		date: 			req.body.date,
		time: 			req.body.time,
		eventTitle: 	req.body.eventTitle,
		description: 	req.body.description,
		expiryTime: 	req.body.expiryTime,
		email: 			req.body.email,
		comments: 		req.body.comments,
		commentsArr: 	[],
		timePosted: 	moment().format()
	}

	if (req.body.expiryTime === "untilHourAfterEvent") {

		newPost.timeToExpire = moment(req.body.date + " " + req.body.time)
			.add(1, "hours")
			.format()
	} else {
		newPost.timeToExpire = moment().add( newPost.expiryTime, "hours")
	}

	arrayPosts.unshift(newPost)
	console.log('posts array: ', arrayPosts)
	console.log("current server time is", moment().format('MMM Do YYYY, h:mm a'))

	res.send(arrayPosts)
})


app.get('/', function(req, res) {
	
	// filter out the expired posts before sending them

	let filteredPosts = arrayPosts.filter(arr => moment().diff(arr.timeToExpire) < 0);
	console.log(filteredPosts)

	// arrayPosts.filter((arr) => moment().diff(arr.timeToExpire) < 0 );
	res.send(filteredPosts)
})

app.delete('/', function(req, res) {
	console.log(req.body.removePost)
	arrayPosts.splice(req.body.removePost, 1)

	res.send(arrayPosts)
})


app.post('/comment', function(req, res) {
	arrayPosts[req.body.postIndex].commentsArr.unshift({
		"comment": req.body.comment,
		"username": req.body.username,
		"timePosted": moment().format('MMM Do YYYY, h:mm a')		
	})
	console.log('comments array: ', arrayPosts[req.body.postIndex].commentsArr)
	res.send(arrayPosts[req.body.postIndex].commentsArr)
})


// app.get('/comments', function(req, res) {
// 	console.log("this is the array of get comments: ", arrayPosts[req.body.postIndex].commentsArr)

// 	res.send(arrayPosts)
// })


app.get('/search/:term', function(req, res) {

	// filter out the expired posts before sending them

	let filteredPosts = arrayPosts.filter(arr => moment().diff(arr.timeToExpire) < 0);
	console.log(filteredPosts)
	
	let searchResult = filteredPosts.filter(arr => Object.values(arr).includes(req.params.term));
	res.send(searchResult)
})




app.listen(1337, function() {
	console.log('Test app listening on port 1337!')
})