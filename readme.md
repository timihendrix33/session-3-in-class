#Session 3

$0.classList

window.matchMedia('only screen and (max-width: 700px)')

window.matchMedia('only screen and (max-width: 700px)').matches

##Responsive Navigation

Move all nav related css into a new partial `_nav.scss` and import:

`@import "imports/nav";`


Nest the CSS rules:

```css
nav {
  display: flex;
  background: #007eb6;
  top: 0;
  width: 100%;
  transition: all 0.5s;
  position: relative;
  z-index: 1; 
  .fixed-nav & {
    position: fixed;
    box-shadow: 0 5px 3px rgba(0, 0, 0, 0.1); 
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    min-height: 2.25rem; 
  }
  li {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  a {
    text-decoration: none;
    display: inline-block;
    color: white; 
  }
}

.logo {
  max-width:0;
  overflow: hidden;
  transition: all 0.5s;
  img {
    padding-top: 0.25rem;
    width: 2rem;
    margin-left: 0.5rem;
  }
  .fixed-nav & {
    max-width:500px;
  }
}

```

Flip the `<ul>` flex direction on small screens to column:

```css
  ul {
    ...
    flex-direction: column;
    @media screen and (min-width: $break-two) {
      flex-direction: row;
    }
  }
```

Hide the nav-liks initially on small screens while maintaining the flex display characteristics on wide:

```css
  ul {
    ...
    display: none;
    // display: flex;
    @media (min-width: $break-two){
      display: flex;
      flex-direction: row;
    }
  }
```

Show the logo in small screens to use as a button (e.g. hamburger icon) to show the menu:

```css
.logo {
	display: block;
	max-width:100%;
	img {
		padding: 0.25rem;
		width: 2rem;
	}
	@media (min-width: $break-two) {
		max-width: 0;
		overflow: hidden;
	}
}
```

Make clicking on the logo show the menu on narrow screens:

```js
const logo = document.querySelector('.logo');
if (document.documentElement.clientWidth <= 740) {
  logo.addEventListener('click', showMenu);
}

function showMenu(e){
  if (window.matchMedia('only screen and (max-width: 740px)').matches){
    document.body.classList.toggle('show');
  }
  e.preventDefault();
}
```

Add to `_nav.scss`:

```
.show #main ul {
  display: block !important;
}
```


Adjust the display of the list items moving most of the existing CSS into the media query.

```css
	li {
		padding: 0.5rem;
		align-items: center; 
		@media screen and (min-width: $break-two) {
			display: flex;
			flex: 1;
			justify-content: center;
			text-align: center;
		}
	}
```

Remove display: flex from the default state of nav and at it to the wide screen only:

```css
nav {
  ...
  // display: flex;
  @media screen and (min-width: $break-two){
    display: flex;
  }
```

Add a call to showMenu() after the hash change (also pass the event so we can send it to showMenu where it is needed):

```js
window.onhashchange = function() {
  let newloc = window.location.hash;
  let newContent = navItems.filter(navItem => navItem.link == newloc);
  siteWrap.innerHTML = `
  <h1>${newContent[0].label}</h1>
  <h2>${newContent[0].header}</h2>
  <p>${newContent[0].content}</p>
  `;
  document.body.classList.remove('show');
}
```


##Remember the viewport META tag

* Use the meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to ensure this works on devices

* Chrome device toolbar

* http://daniel.deverell.com/barcap/public


##SASS Links

[The SASS Way](http://thesassway.com)

[Responsive Design Patterns](https://bradfrost.github.io/this-is-responsive/)


##Babel

Install the dependencies babel-cli and babel-preset-es2015 and add presets to package.json:

```
{
  "name": "basic-dom-dd2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "watch-node-sass": "node-sass --watch scss/styles.scss --output public/css/  --source-map true",
    "start": "browser-sync start --browser \"google chrome\" --server 'public' --files 'public'",
    "babel": "babel app.js --watch --out-file test.js",
    "boom!": "concurrently \"npm run start\" \"npm run watch-node-sass\" "
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.22.2",
    "babel-preset-es2015": "^6.22.0",
    "browser-sync": "^2.18.6",
    "concurrently": "^3.1.0",
    "node-sass": "^4.4.0"
  },
  "babel": {
    "presets": [
      "es2015"
    ]
  }
}

```

Compile the js into the public/js directory:

```
"babel": "babel app.js --watch --out-file public/js/main.js",
```

Add babel to our concurrent commands:

```
"boom!": "concurrently \"npm run start\" \"npm run watch-node-sass\"  \"npm run babel\" "
```



##GIT and GITHUB

Since we've just created a nice reusable setup we should save it. 

Git is a version control system originally invented for use developing Linux by Linus Torvalds. It is the standard version tool and integrates with Github to permit collaboration.

There is a handy and very simple tutorial for Git on [the Git Website](https://try.github.io/levels/1/challenges/1) which is highly recommended for newbies.

1. make sure terminal is in the `basic-dom` directory using `cd` (drag-and-drop, copy paste)
1. initialize the repo:

```
git init
```

Configuring Git - only if you haven't done this before, and you only need to do this once:

```
git config
git config --global user.name " ***** "
git config --global user.email " ***** "
git config --list
```

* Add (watch) all your files:

```
git add .
```

Once you have made changes you need to commit them

```
git commit -m 'initial commit'
```

Note: `git commit`  without the `-m` flag goes into VI - a text popular UNIX text editor. To avoid this always using the -m flag when committing. (If you end up in VI, hit ESC and type “:q” to exit.)

Git Status

```
git status
On branch master
nothing to commit, working directory clean
```

* Create a new branch:

```
git branch <new branchname>
git checkout <new branchname>
git branch
```

To merge branches

* make sure the branch you want to merge is clear (`$ git status`)
* checkout the branch you want to merge into
* run status on that branch too (make sure it is clear)

```
git checkout master
git status
git merge <new branchname>
```

Delete branches:

```
git branch -d <branchname>
```

Pushing Files to Remote Repos - Github

Note: always create a .gitignore file to prevent local working / utility files from being pushed.

```
.sass_cache
.DS_store
node_modules
```

* Log into Github, create and new repo and follow the instructions e.g.:

```
git remote add origin https://github.com/<nameofgithubrepo>
git push -u origin master
```

Finally - when downloading a github repo use the `clone` method to move it to your local disk while retaining the git history, branches, and etc.

Use of MSCode as a Git / diff client?


##NODE and Express JS

#NODE

A simple node.js [server](https://nodejs.org/en/about/). 

Note the use of const, template strings, arrow functions and the request and response variables.

Save this as script.js in our basic-dom folder and run it using `node script.js`

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```


##Express

Express is a framework for building web applications on top of Node.js. It simplifies the server creation process that is already available in Node. Node allows you to use JavaScript as your server-side language.

Let's look at the canonical "Hello world" [example](https://expressjs.com/en/starter/hello-world.html).

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
})
```

Run with `$ node script.js`

Here is the [generator](https://expressjs.com/en/starter/generator.html). Note the directory structure and the use of [Jade](http://learnjade.com) as a template tool. Here's a [Jade converter](http://www.html2jade.org). Note: Jade has been renamed to Pug due to a software trademark claim.

We will be using HTML [static](https://expressjs.com/en/starter/static-files.html) files in our exercise.

Add to app.js:

```
app.use(express.static('public'))
```

Note that we have to stop and start the server in order for chnages to take place.

##CRUD

CRUD is an acronym for Create, Read, Update and Delete. It is a set of operations we get servers to execute (POST, GET, PUT and DELETE respectively). This is what each operation does:

* Create (POST) - Make something
* Read (GET)_- Get something
* Update (PUT) - Change something
* Delete (DELETE)- Remove something

In Express, we handle a GET request with the get method: `app.get(path, callback)`

The first argument, path, is the path of the GET request. It’s anything that comes after your domain name.

When we’re visiting localhost:3000, our browsers are actually looking for localhost:3000/. The path argument in this case is /.

The second argument is a callback function that tells the server what to do when the path is matched. It takes in two arguments, a request object and a response object:

```
app.get('/', (req, res) => res.send('Hello World!'))
```

Let’s change our app so we serve an index.html page back to the browser instead. 

To do so, we use the sendFile method that’s provided by the res object.

```
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
```

__dirname is directory that contains the JavaScript source code. 

Create index.html in the top level

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MY APP</title>
</head>
<body>
  <p>Testing 1 2 3</p>
</body>
</html>
```

Restart your server and refresh your browser. You should be able to see the results of your HTML file now.

We need to restart the server whenever you make a change to app.js. Let’s streamline it by creating an npm script in package.json:

`"dev": "nodemon server.js"`

Add a script to package.json:

```
"dev": "nodemon server.js"
```

##CRUD - CREATE
The CREATE operation is performed only by the browser if a POST request is sent to the server. This POST request can triggered either with JavaScript or through a <form> element.

```
  <form action="/entries" method="POST">
    <input type="text" placeholder="label" name="label">
    <input type="text" placeholder="header" name="header">
    <textarea type="text" placeholder="content" name="content"></textarea>
    <button type="submit">Submit</button>
  </form>
```

1. An action attribute
2. a method attribute
3. and name attributes on all <input> elements within the form

The action attribute tells the browser where to navigate to in our Express app. 

The method attribute tells the browser what to request to send. In this case, it’s a POST request.

On our server, we can handle this POST request with a post method that Express provides. It takes the same arguments as the GET method:

```
app.post('/entries', (req, res) => {
  console.log('Hello')
})
```

Refresh your browser then enter something into your form element. You should be able to see 'Hello' in your command line.

Express doesn’t handle reading data from the <form> element on it’s own. We have to add another package called body-parser to gain this functionality.

`$ npm install body-parser --save`

```
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
```

The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.

Now, you should be able to see everything in the form field within the req.body object. Try doing a console.log:

```
app.post('/entries', (req, res) => {
  console.log(req.body)
})
```

##MongoDB

We first have to install MongoDB through npm if we want to use it as our database.

`$ npm install mongodb --save`

Once installed, we can connect to MongoDB through the Mongo.Client‘s connect method as shown in the code below:

```
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
})
```

The next part is to get the correct link to our database. Most people store their databases on cloud services like MongoLab. We’re going to do same as well.

Create a free account with MongoLab. Once you’re done, create a new MongoDB Deployment and set the plan to sandbox.

Once you’re done creating the deployment, head into it and create a database user and database password. Remember the database user and database password because you’re going to use it to connect the database you’ve just created.

Finally, grab the MongoDB url and add it to your MongoClient.connect method. Make sure you use your database user and password!

`MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {...}`

We want to start our servers only when the database is connected so let’s move app.listen into the connect method. We’re also going to create a db variable to allow us to use the database when we handle requests from the browser.

```js
MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
   if (err) return console.log(err)
    db = database
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
})
```

We’re done setting up MongoDB. Now, let’s create a collection to store content for our application.

A collection is a named location to store data. 

We can create the collection by using the string entries while calling MongoDB’s db.collection() method. While creating the entries collection, we can also save our first entry into MongoDB with the save method simultaneously.

Once we’re done saving, we have to redirect the user somewhere (or they’ll be stuck waiting forever for our server to move). In this case, we’re going to redirect them back to /, which causes their browsers to reload.

```js
app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
```

Now, if you enter something into the <form> element, you’ll be able to see an entry in your MongoDB collection.

####Showing entries to users

We have to do two things to show the entries stored in MongoLab to our users.

1. Get entries from MongoLab
2. Use a template engine to display the entries

We can get the entries from MongoLab by using the find method that’s available in the collection method.

```
app.get('/', (req, res) => {
  var cursor = db.collection('entries').find()
  console.log(cursor)
  res.sendFile(__dirname + '/index.html')
})
```

The find method returns a cursor (A Mongo Object) that probably doesn’t make sense if you console.log it out.

The good news is, this cursor object contains all entries from our database. It also contains a bunch of other properties and methods that allow us to work with data easily. One such method is the toArray method.

The toArray method takes in a callback function that allows us to do stuff with entries we retrieved from MongoLab. Let’s try doing a console.log() for the results and see what we get!


```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, results) => {
    console.log(results)
    res.sendFile(__dirname + '/index.html')
  })
})
```

You now see an array of entries. We’ve completed the first part – getting data from MongoLab. The next part is to generate a HTML that contains all our entries.

We can’t serve our index.html file and expect entries to magically appear because there’s no way to add dynamic content to a HTML file. What we can do instead, is to use template engines to help us out. Some popular template engines include Jade/pug, Embedded JavaScript and Nunjucks.

For this tutorial, we’re going to use Embedded JavaScript (ejs) as our template engine because it’s the easiest to start with. You’ll find it familiar from the get-go since you already know HTML and JavaScript.

We can use EJS by first installing it, then setting the view engine in Express to ejs.

`$ npm install ejs --save`

`app.set('view engine', 'ejs')`

Once the view engine is set, we can begin generating the HTML with our entries. This process is also called rendering. We can use the render object built into the response object render to do so. It has the following syntax:

`res.render(view, locals)`

The first parameter, views, is the name of the file we’re rendering. This file must be placed within a views folder.

The second parameter, locals, is an object that passes data into the view.

Let’s first create an index.ejs file within a views folder so we can start populating data.

```
mkdir views
touch views/index.ejs
```

Now, place the following code within index.ejs.

```
  <% for(var i=0; i<entries.length; i++) { %>
    <h2><%= entries[i].label %></h2>
    <p><%= entries[i].content %></p>
  <% } %>
```

In EJS, you can write JavaScript within <% and %> tags. You can also output JavaScript as strings if you use the <%= and %> tags.

Here, you can see that we’re basically looping through the entries array and create strings with entries[i].name and entries[i].content.

One more thing to do before we move on from the index.ejs file. Remember to copy the <form> element from the index.html file into this file as well. The complete index.ejs file so far should be:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Testing</title>
</head>
<body>

  <% for(var i=0; i<entries.length; i++) { %>
    <h2><%= entries[i].label %></h2>
    <p><%= entries[i].content %></p>
  <% } %>

  <form action="/entries" method="POST">
    <input type="text" placeholder="label" name="label">
    <input type="text" placeholder="header" name="header">
    <textarea type="text" placeholder="content" name="content"></textarea>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

Finally, we have to render this index.ejs file when handling the GET request. Here, we’re setting the results (an array) as the entries array we used in index.ejs above.


```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {entries: result})
  })
})
```

Now, refresh your browser and you should be able to see all entries.



###Notes

Some interesting applications of SVG:

* http://responsivelogos.co.uk
* http://www.svgeneration.com/recipes/Beam-Center/

##Server Accounts

Username is the first seven letters of your last name + first letter of first name

Hostname is oit2.scps.nyu.edu

Password is first initial, last initial, 123890

e.g. devereld // dd123890

Test to see if your account is active by entering this URL into a new browser tab (use your username after the tilde):

http://oit2.scps.nyu.edu/~******

Ensure you are using sFTP (port 22).

Suggested clients: Cyberduck, FileZilla



https://zellwk.com/blog/crud-express-mongodb/
https://zellwk.com/blog/crud-express-and-mongodb-2/