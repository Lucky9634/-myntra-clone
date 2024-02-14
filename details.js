

fetch('products.json').then(responce => responce.json()).then(data =>{
    products = data;
    showProductsDetailPage();
    similerProduct()
    console.log(products)
})

function showProductsDetailPage(){
    let details = document.querySelector('.detail');
    let productId = new URLSearchParams(window.location.search).get('id');
    let newMatchProduct = products.filter(value =>{
        return value.id == productId;
    })[0];

    if(!newMatchProduct){
        window.location.href = "index.html";
    }

    details.innerHTML =
    `
    <div class="detail">
     <div class="image">
         <img src="${newMatchProduct.productImg}" alt="">
     </div>
     <div class="content">
         <h1 class="name">${newMatchProduct.productTitle}</h1>
         <div class="some">
             <div class="price">Rs. ${newMatchProduct.productPrice}</div>
             <div class="review">${newMatchProduct.review}</div>
         </div>
         <div class="buttons">
             <button id="yellow">Check Out</button>
             <button id="red"  onclick="addToBag(${newMatchProduct.id})">Add To Card</button>
         </div>
         <div class="descriptions">${newMatchProduct.description}</div>
     </div>
    </div> 
    `
}


// Similer Products

let listProductDetail = document.querySelector('.listProductDetail');

function similerProduct(){
    products.forEach((product , index )=>{
        if(index < 8){

            let newElement = document.createElement('a');
            newElement.href = 'details.html?id=' + product.id;
            newElement.classList.add('item');
            newElement.innerHTML = `
            <img class="productImg" src="${product.productImg}" alt="">
            <h2 class="pro-title">${product.productTitle}</h2>
            <div class="pro-price">Rs. ${product.productPrice} <span>${product.review}</span></div>     
            `
    
            listProductDetail.appendChild(newElement);

        }
    })
}

// Product Add To The Bag ..... .... ... .. . 

let bagProducts;


onload()
function onload(){
    let bagProductStr = localStorage.getItem('bagProducts');
    bagProducts = bagProductStr ? JSON.parse(bagProductStr) : [];
    showProductBag()
}

function addToBag(productId){
    bagProducts.push(productId)
    localStorage.setItem('bagProducts', JSON.stringify(bagProducts));
    showProductBag()
    alert("Add Your Product SuccessFull !")
}
function showProductBag(){
    let bagIcon = document.querySelector('.bag-item');

    if(bagProducts.length > 0){
        bagIcon.style.visibility = 'visible';
        bagIcon.innerText = bagProducts.length;
    }else{
        bagIcon.style.visibility = 'hidden';
    }
}
