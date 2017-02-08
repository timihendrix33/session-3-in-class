const express = require('express') 
// require the npm library
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express() 
// create a var for the app to be built using express
// app is the global variable namespace for the program we are building
const port = 9000

//app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://tstevenson33:dumbpass1234@ds145649.mlab.com:45649/bcl', (err, database) => {
   if (err) return console.log(err)
    db = database
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
})

app.get('/', (req, res) => 
	res.sendFile(__dirname + '/index.html')
	) 

// app.post('/entries', (req, res) =>
// 	console.log(req.body)
// 	)

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/entry/:name?', function(req, res){
  let name = req.params.name
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    `)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
})

app.get('*', function(req, res){
  res.send(`
    <h1>Page not found</h1>
    `)
})