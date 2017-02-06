const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const port = 9000
let db 

app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
	if (err) {
		return console.log(err)
	}
	db = database
	app.listen(port, () => {
		console.log(`Listening on port ${port}!`)
	})
})

app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {entries: result})
  })
})

app.post('/entries', (req, res) => {
	db.collection('entries').save(req.body, (err, result) => {
		if (err) return console.log(err)
		console.log('saved to database')
		res.redirect('/')
	})
})
