"use strict";

var header = document.querySelector('header');
var header_nav = document.querySelector('#header__nav');

function mobileNav() {
  header_nav.classList.toggle("mobile__nav");
}

window.onscroll = function () {
  if (window.scrollY > 200) {
    header.style.backgroundColor = "#0093ff";
  } else {
    header.style.backgroundColor = "transparent";
  }
};

var container = document.querySelector(".testimonial__slider__container");
var allBox = container.children;
var containerWidth = container.offsetWidth;
var margin = 30;
var items = 0;
var totalItems = 0;
var jumpSlideWidth = 0;
var totalItemsWidth = 0; // item setup per slide

responsive = [{
  breakPoint: {
    width: 0,
    item: 1
  }
}, //if width greater than 0 (1 item will show) 
{
  breakPoint: {
    width: 600,
    item: 2
  }
}, //if width greater than 600 (2  item will show) 
{
  breakPoint: {
    width: 1000,
    item: 3
  }
} //if width greater than 1000 (3 item will show) 
];

function load() {
  for (var i = 0; i < responsive.length; i++) {
    if (window.innerWidth > responsive[i].breakPoint.width) {
      items = responsive[i].breakPoint.item;
    }
  }

  start();
}

function start() {
  for (var i = 0; i < allBox.length; i++) {
    // width and margin setup of items
    allBox[i].style.width = containerWidth / items - margin + "px";
    allBox[i].style.margin = margin / 2 + "px";
    totalItemsWidth += containerWidth / items;
    totalItems++;
  } // thumbnail-container width set up


  container.style.width = totalItemsWidth + "px";
}

var prev_icon = document.querySelector(".prev_icon");
var next_icon = document.querySelector(".next_icon"); // when click on numbers slide to next slide

function controlSlides(ele) {
  var maxSlide = totalItemsWidth - containerWidth;

  if (ele === "next" && jumpSlideWidth < totalItemsWidth - containerWidth) {
    jumpSlideWidth = jumpSlideWidth + containerWidth;
  } else if (ele === "prev" && jumpSlideWidth > 0) {
    jumpSlideWidth = jumpSlideWidth - containerWidth;
  }

  if (jumpSlideWidth > 0 && jumpSlideWidth < totalItemsWidth - containerWidth) {
    prev_icon.classList.remove('disabled');
    next_icon.classList.remove('disabled');
  }

  container.style.marginLeft = -jumpSlideWidth + "px";

  if (jumpSlideWidth == 0) {
    prev_icon.classList.add('disabled');
  }

  if (jumpSlideWidth == maxSlide) {
    next_icon.classList.add('disabled');
  }
}

window.onload = load();

window.onresize = function () {
  location.reload();
}; //Dropdown


var dropdownOptions = document.querySelectorAll('.dropdown__options');
var inputs = document.querySelectorAll('.hero__form input');
inputs.forEach(function (input, index) {
  console.log(input, index);
  input.addEventListener('click', function () {
    dropdownOptions[index].style.display = "block";
    toggleOptions(index);
  });
}); // inputs[0].onclick = ()=>{
//   dropdownOptions[0].style.display="block";
//   var inpId = 0;
//   toggleOptions(inpId);
// }
// inputs[1].onclick = ()=>{
//   dropdownOptions[1].style.display="block";
//   var inpId = 1;
//   toggleOptions(inpId);
// }
// inputs[2].onclick = ()=>{
//   dropdownOptions[2].style.display="block";
//   var inpId = 2;
//   toggleOptions(inpId);
// }

function selectOption(inputId, optionId) {
  var options = dropdownOptions[inputId].children;
  inputs[inputId].value = options[optionId].innerHTML;
  dropdownOptions[inputId].style.display = "none";
}

function toggleOptions(inpId) {
  document.addEventListener('click', function (event) {
    var targetele = event.target;

    if (targetele !== inputs[inpId]) {
      dropdownOptions[inpId].style.display = "none";
    }
  });
}