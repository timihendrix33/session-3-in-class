'use strict';

var nav = document.getElementById('main');
var navLinks = document.getElementById('nav-links');
var markup = '<ul>\n' + navItems.map(function (listItem) {
  return '<li><a href="' + listItem.link + '">' + listItem.label + '</a></li>';
}).join('') + '\n</ul>';
navLinks.innerHTML = markup;

var topOfNav = nav.offsetTop;
function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
window.addEventListener('scroll', fixNav);

var siteWrap = document.querySelector('.site-wrap');
window.onload = function () {
  window.location.hash = '#watchlist';
};

window.onhashchange = function () {
  var newloc = window.location.hash;
  var newContent = navItems.filter(function (navItem) {
    return navItem.link == newloc;
  });
  siteWrap.innerHTML = '\n  <h1>' + newContent[0].label + '</h1>\n  <h2>' + newContent[0].header + '</h2>\n  <p>' + newContent[0].content + '</p>\n  ';
  document.body.classList.remove('show');
};

var logo = document.querySelector('.logo');

if (document.documentElement.clientWidth <= 740) {
  logo.addEventListener('click', showMenu);
}

function showMenu(e) {
  if (window.matchMedia('only screen and (max-width: 740px)').matches) {
    document.body.classList.toggle('show');
  }
  e.preventDefault();
}

//# sourceMappingURL=main-compiled.js.map