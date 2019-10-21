'use strict';
function Product(title, src) {
    this.title = title;
    this.src = src;
    this.clickCtr = 0;
    this.shownCtr = 0;
    Product.all.push(this);
}
/////////////// step 1

Product.roundCtr = 0;
Product.roundLimit = 25;
Product.all = [];

/////////////// step 2

Product.container = document.getElementById('productcont');
Product.leftImage = document.getElementById('left-img');
Product.middImage = document.getElementById('midd-img');
Product.rightImage = document.getElementById('right-img');
Product.leftTitle = document.getElementById('left-title');
Product.middTitle = document.getElementById('midd-title');
Product.rightTitle = document.getElementById('right-title');

/////////////// step 3

Product.leftObject = null;
Product.middObject = null;
Product.rightObject = null;

/////////////// step 4

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
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

/////////////// step 5

function renderBus() {
    var forbidden = [Product.leftObject, Product.middObject, Product.rightObject];
    do {
        Product.leftObject = getRandomitems();
    } while (forbidden.includes(Product.leftObject))
    forbidden.push(Product.leftObject);
    do {
        Product.middObject = getRandomitems();
    } while (forbidden.includes(Product.middObject))
    forbidden.push(Product.middObject);
    do {
        Product.rightObject = getRandomitems();
    } while (forbidden.includes(Product.rightObject));

    /////////////// step 6

    Product.leftObject.shownCtr++;
    Product.middObject.shownCtr++;
    Product.rightObject.shownCtr++;

    /////////////// step 7

    var leftImageElement = Product.leftImage;
    var middimageElement = Product.middImage;
    var rightImageElement = Product.rightImage;

    /////////////// step 8

    leftImageElement.setAttribute('src', Product.leftObject.src);
    leftImageElement.setAttribute('alt', Product.leftObject.title);

    middimageElement.setAttribute('src', Product.middObject.src);
    middimageElement.setAttribute('alt', Product.middObject.title);

    rightImageElement.setAttribute('src', Product.rightObject.src);
    rightImageElement.setAttribute('alt', Product.rightObject.title);

    /////////////// step 9

    Product.leftTitle.textContent = Product.leftObject.title;
    Product.middTitle.textContent = Product.middObject.title;
    Product.rightTitle.textContent = Product.rightObject.title;

    /////////////// step 10
}
function getRandomitems() {
    var index = Math.floor(Math.random() * Product.all.length);
    return Product.all[index];
}
function randomInRange(min, max) {
    var range = max - min + 1;
    var rand = Math.floor(Math.random() * range) + min
    return rand;
}
function Totalsproducts() {
    var tableBody = document.getElementById('newpro');
    tableBody.innerHTML = '';
    for (var i = 0; i < Product.all.length; i++) {
        var item = Product.all[i];
        var row = addElement('tr', tableBody);
        addElement('td', row, item.title);
        addElement('td', row, '' + item.clickCtr);
        addElement('td', row, '' + item.shownCtr);
        addElement('td', row, '' + ' had ' + item.clickCtr + ' votes ' + ' and was shown ' + item.shownCtr);
    }
}
/////////////// step 11

function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    if (text) {
        element.textContent = text;
    }
    return element;
}
function clickItem(event) {
    var clickedId = event.target.id;
    var itemClicked;
    if (clickedId === 'left-img') {
        itemClicked = Product.leftObject;
    } else if (clickedId === 'midd-img') {
        itemClicked = Product.middObject;
    } else if (clickedId === 'right-img') {
        itemClicked = Product.rightObject;
    } else {
        console.log('Um, what was clicked on???', clickedId);
    }
    if (itemClicked) {
        itemClicked.clickCtr++;
        Product.roundCtr++;
        Totalsproducts();
        if (Product.roundCtr === Product.roundLimit) {
            rendermallitems();
            alert('No more clicking !');
            Product.container.removeEventListener('click', clickItem);
        } else {
            renderBus();
        }
    }
}
/////////////// step 12

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
    /////////////// step 13

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
/////////////// step 14

Product.container.addEventListener('click', clickItem);
Totalsproducts();
renderBus();
