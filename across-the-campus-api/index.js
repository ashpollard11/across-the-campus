
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
	arrayPosts.push({
		"type": req.body.type,
		"username": req.body.username,
		"date": req.body.date,
		"time": req.body.time,
		"eventTitle": req.body.eventTitle,
		"description": req.body.description,
		"expiryTime": req.body.expiryTime,
		"email": req.body.email,
		"comments": req.body.comments,
		"commentsArr": [],
		"timePosted": moment().format('MMM Do YYYY, h:mm a')
	})
	console.log('posts array: ', arrayPosts)
	res.send(arrayPosts)
})


app.get('/', function(req, res) {
	console.log(
		arrayPosts.type,
		arrayPosts.username,
		arrayPosts.date,
		arrayPosts.time,
		arrayPosts.eventTitle,
		arrayPosts.description,
		arrayPosts.expiryTime,
		arrayPosts.email,
		arrayPosts.comments,
		arrayPosts.timePosted
	)
	res.send(arrayPosts)
})

app.delete('/', function(req, res) {
	console.log(req.body.removePost)
	arrayPosts.splice(req.body.removePost, 1)

	res.send(arrayPosts)
})


app.post('/comment', function(req, res) {
	arrayPosts[req.body.postIndex].commentsArr.push({
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
	
	const searchResult = arrayPosts.filter((arr) => Object.values(arr).includes(req.params.term));
	res.send(searchResult)
})




app.listen(1337, function() {
	console.log('Test app listening on port 1337!')
})