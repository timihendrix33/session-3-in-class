const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
	if (err) return console.log(err)
		db = database
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// app.listen(3000, function() {
// 	console.log('listening on 3000 and ...')
// })

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/public/index.html')
// })

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

// app.post('/quotes', (req, res) => {
// 	console.log(req.body)
// })


app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err)
			console.log('saved to database')
		res.redirect('/')
	})

	db.collection('quotes').find().toArray(function(err, results) {
		console.log(results)
	  // send HTML file populated with quotes here
	})


})

