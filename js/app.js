'use strict';
function Product(title, src) {
   //// step 1 :- Defin object
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

//// step 2 :- img and title statment

Product.leftImage = document.getElementById('left-img');
Product.middImage = document.getElementById('midd-img');
Product.rightImage = document.getElementById('right-image');

Product.leftTitle = document.getElementById('left-title');
Product.middTitle = document.getElementById('midd-title');
Product.rightTitle = document.getElementById('right-title');


Product.leftObject = null;
Product.middObject = null;
Product.rightObject = null;

//// step 3 :- call or pull a images

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

//// step 4 :- loop statment

function renderNewProduct() {

  var forbidden = [Product.leftObject, Product.middObject, Product.rightObject];


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

  //// step 5 :- caonter 

  Product.leftObject.shownCtr++;
  Product.middObject.shownCtr++;
  Product.rightObject.shownCtr++;

  //// step 6 :- Arrange images with places to display

  var leftProductImageElement = Product.leftImage;
  var middProductImageElement = Product.middImage;
  var rightProductImageElement = Product.rightImage;

  //// step 7 :- images (src and title)

  leftProductImageElement.setAttribute('src', Product.leftObject.src);
  leftProductImageElement.setAttribute('alt', Product.leftObject.title);

  middProductImageElement.setAttribute('src', Product.middObject.src);
  middProductImageElement.setAttribute('alt', Product.middObject.title);

  rightProductImageElement.setAttribute('src', Product.rightObject.src);
  rightProductImageElement.setAttribute('alt', Product.rightObject.title);

  //// step 8 :- defin title images

  Product.leftTitle.textContent = Product.leftObject.title;
  Product.middTitle.textContent = Product.middObject.title;
  Product.rightTitle.textContent = Product.rightObject.title;

  //// step 9 :- math statment
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
//// step 10 :- local storage statment

function getProducts() {
  var data = localStorage.getItem('product');
  var ProductData = JSON.parse(data)
  if (ProductData) {
    Product.all = ProductData;
  }
}

function setProduct() {
  var ProductString = JSON.stringify(Product.all)
  localStorage.setItem('product', ProductString)
}



//// step 11 :- list of product statment

function finalList() {
  var list = document.getElementById("list");

  var li = document.createElement('li')
  list.appendChild(li)

  for (var i = 0; i < Product.all.length; i++) {
    var roduct = Product.all[i]
    li = document.createElement('li');
    list.appendChild(li);
    li.textContent = roduct.title + " had " + roduct.clickCtr + " votes and was shown " + roduct.shownCtr + " times.";
  }
}

//// step 12 :- click function statment

function clickHandler(event) {
  var clickedId = event.target.id;
  var ProductClicked;
  setProduct();
  if (clickedId === 'left-img') {
    ProductClicked = Product.leftObject;
  } else if (clickedId === 'midd-img') {
    ProductClicked = Product.middObject;
  } else if (clickedId === 'right-image') {
    ProductClicked = Product.rightObject;
  } else {
    alert('Please just click on one of the pictures Product listed on the screen, not outside the picture frame ^_^')
  }
  if (ProductClicked) {
    ProductClicked.clickCtr++;
    Product.roundCtr++;
    if (Product.roundCtr === Product.roundLimit) {
      alert('No more clicking');
      Product.container.removeEventListener('click', clickHandler);
      finalList();
      rendermallitems();




    } else {
      renderNewProduct();

    }
  }
}
function rendermallitems() {
  var MallArray = [];
  var ClickedArray = [];
  var shownArray = [];
  for (let i = 0; i < Product.all.length; i++) {
    var MallInstenc = Product.all[i];
    MallArray.push(MallInstenc.title + ' click');
    MallArray.push(MallInstenc.title + ' Shown');
    ClickedArray.push(MallInstenc.clickCtr);
    shownArray.push(MallInstenc.shownCtr);
  }
//// step 13 :- chart statment

  var ctx = document.getElementById('Chart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck ',
        'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
      ],
      datasets: [{
        label: 'Item click',
        backgroundColor: 'white',
        borderColor: 'black',
        data: ClickedArray,

      },
      {
        label: 'Item Shown',
        backgroundColor: 'red',
        borderColor: 'black',
        data: shownArray,
      }
      ],
      options: {}
    }
  });
}
//// step 14 :- call function

Product.container.addEventListener('click', clickHandler);
getProducts();
renderNewProduct();
