let bagItemsObj;
fetch('products.json').then(responce => responce.json()).then(data => {
    products = data;
    console.log(products)
    laodBagItemObj();
    bagSimilerProduct()
})





onload()
function onload() {
    let bagProductStr = localStorage.getItem('bagProducts');
    bagProducts = bagProductStr ? JSON.parse(bagProductStr) : [];
    showProductBag()
    displayBagsItems();
}



function laodBagItemObj() {
    bagItemsObj = bagProducts.map(itemId => {
        for (let i = 0; i < products.length; i++) {
            if (itemId == products[i].id) {
                return products[i]
            }
        }
    })
    console.log(bagItemsObj)
    displayBagsItems()
}


function showProductBag() {
    let bagIcon = document.querySelector('.bag-item');

    if (bagProducts.length > 0) {
        bagIcon.style.visibility = 'visible';
        bagIcon.innerText = bagProducts.length;
    } else {
        bagIcon.style.visibility = 'hidden';
    }
}



function displayBagsItems() {
    newProductSummuryPrint()
    let itemsProductHtml = document.querySelector('.simpletext');
    if (itemsProductHtml === null) return;
    let newTextHtml = '';

    bagItemsObj.forEach(product => {
        newTextHtml += generateItemHTML(product)
    })


    itemsProductHtml.innerHTML = newTextHtml;
}



function generateItemHTML(product) {
    return `
    <div class="detail-box-js">
        <img src="${product.productImg}" alt="">
        <div class="cantainer-js">
           <div class="mainPart">
           <h1 class="name-box-js">${product.productTitle}</h1>
            <button id="de-btn" onclick="removeFromBag(${product.id})">Remove</button>
            </div>
           <div class="some-box-js">
             <div class="price-box-js">Rs. ${product.productPrice}</div>
             <div class="review-box-js">${product.review}</div>
             <div class="descriptions-box">${product.description}</div>
           </div>
           </div>
    </div>
    `

}
function newProductSummuryPrint() {
    let detailProduct = document.getElementById('detailProduct');
    let Items = bagItemsObj.length;
    let Total_MRP = 0;
    let Convenience = 99;

    bagItemsObj.forEach(product => {
        Total_MRP += product.productPrice;
    })
    let Discount = Total_MRP * 10 / 100;

    let totalAmount = Total_MRP - Discount + Convenience;


    if (Items <= 0) {
        detailProduct.style.display = 'none';
    }
    detailProduct.innerHTML =
        `
     <div class="pro-price">
         <div class="price_Detauls"><p>PRICE DETAILS </p><span>(${Items} Items)</span></div>
         <div class="total_Mrp"><p>Total MRP</p> <span>Rs ${Total_MRP}</span></div>
         <div class="MRP_Discount"><p>Discount on MRP </p><span>-Rs ${Discount}</span></div>
         <div class="Convensen_fee"><p>Convenience Fee </p><span>Rs${Convenience}</span></div>
     </div>
     <div class="total-amount">
        <div class="first"><p>Total Amount</p> <span>Rs ${totalAmount}</span></div>
        <a  href=""><button class="place-btn">PLACE ORDER</button></a>
     </div>
    `
}


function removeFromBag(itemId) {
    bagProducts = bagProducts.filter(productId => productId !== itemId);
    localStorage.setItem('bagProducts', JSON.stringify(bagProducts));
    laodBagItemObj();
    displayBagsItems();
    showProductBag()
}









function bagSimilerProduct() {
    let listProductBags = document.querySelector('.listProductBags');
    products.forEach((product, index) => {
        if (index > 8 && index < 17) {

            let newElement = document.createElement('a');
            newElement.href = 'details.html?id=' + product.id;
            newElement.classList.add('item');
            newElement.innerHTML = `
            <img class="productImg" src="${product.productImg}" alt="">
            <h2 class="pro-title">${product.productTitle}</h2>
            <div class="pro-price">Rs. ${product.productPrice} <span>${product.review}</span></div>     
            `

            listProductBags.appendChild(newElement);

        }
    })
}


