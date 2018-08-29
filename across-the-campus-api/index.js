
const colors = require('colors')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
//tell the api to respond to anybody in the multiverse!
app.use(cors())
//for parsing application/json
app.use(bodyParser.json());
//for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));


console.log('across the campus back end')


let arrayPosts = []


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
		arrayPosts.comments
	)
	res.send(arrayPosts)
})

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
		"comments": req.body.comments
	})
	console.log('posts array: ', arrayPosts)
	res.send('Post sent!')
})

app.listen(1337, function() {
	console.log('Test app listening on port 1337!')
})