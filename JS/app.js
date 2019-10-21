'use strict';
function Product(title, src) {
  this.title = title;
  this.src = src;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Product.all.push(this);
}
Product.roundCtr = 0;
Product.roundLimit = 25;
Product.all = [];

Product.container = document.getElementById('productcont');

///////////////////// step 1

Product.leftImage = document.getElementById('left-img');
Product.middImage = document.getElementById('midd-img');
Product.rightImage = document.getElementById('right-image');

Product.leftTitle = document.getElementById('left-title');
Product.middTitle = document.getElementById('midd-title');
Product.rightTitle = document.getElementById('right-title');

///////////////////// step 2

Product.leftObject = null;
Product.middObject= null;
Product.rightObject = null;

///////////////////// step 3

new Product('Bag', 'images/bag.jpg');
new Product('Banana', 'images/banana.jpg');
new Product('Bathroom', 'images/bathroom.jpg');
new Product('Boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

///////////////////// step 4

function renderNewProduct() {

  var forbidden = [Product.leftObject, Product.middObject, Product.rightObject];

///////////////////// step 5

  do {
    Product.leftObject = getRandomProduct();
  } while (forbidden.includes(Product.leftObject))
  forbidden.push(Product.leftObject);

  do {
    Product.middObject = getRandomProduct();
  } while (forbidden.includes(Product.middObject))
  forbidden.push(Product.middObject);

  do {
    Product.rightObject = getRandomProduct();
  } while (forbidden.includes(Product.rightObject));

///////////////////// step 6

  Product.leftObject.shownCtr++;
  Product.middObject.shownCtr++;
  Product.rightObject.shownCtr++;

///////////////////// step 7

  var leftProductImageElement = Product.leftImage;
  var middProductImageElement = Product.middImage;
  var rightProductImageElement = Product.rightImage;

///////////////////// step 8

  leftProductImageElement.setAttribute('src', Product.leftObject.src);
  leftProductImageElement.setAttribute('alt', Product.leftObject.title);

  middProductImageElement.setAttribute('src', Product.middObject.src);
  middProductImageElement.setAttribute('alt', Product.middObject.title);

  rightProductImageElement.setAttribute('src', Product.rightObject.src);
  rightProductImageElement.setAttribute('alt', Product.rightObject.title);

///////////////////// step 9

  Product.leftTitle.textContent = Product.leftObject.title;
  Product.middTitle.textContent = Product.middObject.title;
  Product.rightTitle.textContent = Product.rightObject.title;

///////////////////// step 10
}
function getRandomProduct() {
  var index = Math.floor(Math.random() * Product.all.length);
  return Product.all[index];
}
function randomInRange(min, max) {
  var range = max - min + 1;
  var rand = Math.floor(Math.random() * range) + min
  return rand;
}
function updateTotals() {
  var tableBody = document.getElementById('newpro');

  tableBody.innerHTML = '';
  for (var i = 0; i < Product.all.length; i++) {
    var produc = Product.all[i];
    var row = addElement('tr', tableBody);
    addElement('td', row, produc.title);
    addElement('td', row, '' + produc.clickCtr);
    addElement('td', row, '' + produc.shownCtr);
  }
}
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;
}
function clickHandler(event) {
  var clickedId = event.target.id;
  var ProductClicked;
  if (clickedId === 'left-img') {
    ProductClicked = Product.leftObject;
  } else if (clickedId === 'midd-img') {
    ProductClicked = Product.middObject;
  } else if (clickedId === 'right-image') {
    ProductClicked = Product.rightObject;
  } else {
    alert('Please just click on one of the pictures products listed on the screen, not outside the picture frame ^_^')
  }
  if (ProductClicked) {
    ProductClicked.clickCtr++;
    Product.roundCtr++;
    updateTotals();
    if (Product.roundCtr === Product.roundLimit) {
      alert('No more clicking');
      Product.container.removeEventListener('click', clickHandler);
    } else {
      renderNewProduct();
    }
  }
}

///////////////////// step 11

Product.container.addEventListener('click', clickHandler);
updateTotals();
renderNewProduct();