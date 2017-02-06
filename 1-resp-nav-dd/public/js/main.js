
const navLinks = document.getElementById('nav-links');
const markup =
`${navItems.map(listItem => `<li><a href="${listItem.link}">${listItem.label}</a></li>`).join('')}`;
navLinks.innerHTML = markup;



const siteWrap = document.querySelector('.site-wrap');

window.onload = function () {
  window.location.hash = '#watchlist'
}

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


const logo = document.querySelector('.logo');
logo.addEventListener('click', showMenu);

function showMenu(e){
  if (window.matchMedia('only screen and (max-width: 740px)').matches){
    document.body.classList.toggle('show');
  }
  e.preventDefault();
}






