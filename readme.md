#Session 3 coming soon

https://zellwk.com/blog/crud-express-mongodb/
https://zellwk.com/blog/crud-express-and-mongodb-2/

Error: listen EADDRINUSE :::3000


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
  document.body.classList.toggle('show');
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

```
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
```
nav {
  ...
  // display: flex;
  @media screen and (min-width: $break-two){
    display: flex;
  }
```

SInce we are not showing the bird this is not necessary:

```
window.onhashchange = function() {
  if(location.hash == '#0'){
    return;
  }
  let newloc = window.location.hash;
  ...
```

Add a call to showMenu() after the hash change (also pass the event so we can send it to showMenu where it is needed):

```
window.onhashchange = function (e) {
  let newloc = window.location.hash;
  let newContent = navItems.filter(navItem => navItem.link == newloc);
  siteWrap.innerHTML = `
  <h1>${newContent[0].label}</h1>
  <h2>${newContent[0].header}</h2>
  <p>${newContent[0].content}</p>
  `;
  showMenu(e);
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

Install the dependencies and test:

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



