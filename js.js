
let products = null;
fetchData();
function fetchData(){
    fetch('products.json').then(responce => responce.json()).then(data =>{
        products = data;
        showProductsHtmlHomePage();
    });
} 


let listProduct = document.querySelector('.listProduct');

function showProductsHtmlHomePage(){
    products.forEach(product =>{
        let newAcker = document.createElement('a');
        newAcker.href = 'details.html?id=' + product.id;
        newAcker.classList.add('item');

        newAcker.innerHTML =
        `
            <img class="productImg" src="${product.productImg}" alt="">
            <h2 class="pro-title">${product.productTitle}</h2>
            <div class="pro-price">Rs. ${product.productPrice} <span>${product.review}</span></div>
                
        `;




        listProduct.appendChild(newAcker);
    })
}



onload()
function onload(){
    let bagProductStr = localStorage.getItem('bagProducts');
    bagProducts = bagProductStr ? JSON.parse(bagProductStr) : [];
    showProductBag()
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