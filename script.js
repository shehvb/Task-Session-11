var productName = document.getElementById("prod-name");
var productPrice = document.getElementById("prod-price");
var productsDesc = document.getElementById("prod-desc");
var productCat = document.getElementById("prod-cat");
var addButton = document.getElementById("add-btn");
var productList = document.getElementById("product-list");
var updatebutton = document.getElementById("update-btn");
var showButton = document.getElementById("show-btn");
var productImage = document.getElementById("file-input");


const validations = {
    productName: /^[a-zA-Z0-9\s\-'&.!]{2,100}$/,
    productPrice: /^\d+(\.\d{1,2})?$/,
    productCategory: /^[a-zA-Z0-9\s\-&]{2,50}$/,
    productDescription: /^[a-zA-Z0-9\s\-'",.!?()]{10,1000}$/,
    productImage: /\.(jpe?g|png|gif|bmp|webp|svg)$/i,
    safeFilename: /^[a-zA-Z0-9_\-]+\.(jpe?g|png|gif|bmp|webp|svg)$/i
};
// var addClassList = addButton.classList;
// var classlist = updatebutton.classList;

var products;
var upIndex;
function isValidProduct() {
    return (
        validations.productName.test(productName.value) &&
        validations.productPrice.test(productPrice.value) &&
        validations.productCategory.test(productCat.value) &&
        validations.productDescription.test(productsDesc.value) &&
        productImage.files[0] && 
        validations.productImage.test(productImage.files[0].name)
    );
}

if(localStorage.getItem("products")){
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}else{
    var products = [];

}

function addProduct() {
    // product= {
    //     name: productName.value,
    //     price: productPrice.value,
    //     cat: productCat.value,
    //     desc: productsDesc.value,
    //     image: `images/${productImage.files[0].name}`,
    // }
    // products.push(product);
    // console.log(products);
    // // clearForm();
    // displayProducts();
    // isValidProduct();
    // localStorage.setItem("products", JSON.stringify(products));
    // var storedProducts = JSON.parse(localStorage.getItem("products"));
    // console.log(storedProducts);
    
    // sessionStorage.setItem("products", JSON.stringify(products));
    // var storedProductsSession = JSON.parse(sessionStorage.getItem("products"));
    // console.log(storedProductsSession);

    var reader = new FileReader();
    reader.onload = function(e) {
        product = {
            name: productName.value,
            price: productPrice.value,
            cat: productCat.value,
            desc: productsDesc.value,
            image: e.target.result
        }
        products.push(product);
        displayProducts();
        localStorage.setItem("products", JSON.stringify(products));
        clearForm();
    }
    reader.readAsDataURL(document.getElementById("file-input").files[0]);
}
function clearForm() {
    productName.value=null;
    productPrice.value=null;
    productsDesc.value=null;
    productCat.value=null;
}

function displayProducts() {
    var productList = "";
    
    for(var i=0; i<products.length; i++){
        productList += `
        <div class='product'> 
            <img src="${products[i].image}" alt="product image">
            <h2>  ${ products[i].name  } </h2> 
            <p>Price:   ${ products[i].price }  </p>
            <p>Category: ${   products[i].cat }  </p>
            <p>Description: ${  products[i].desc  }  </p>
            <button onclick="deleteProduct(${i})" id="delete-btn">Delete Product</button>
            
            <button class="update-btn " onclick="updateProduct(${i})" id="update-btn">Update Product</button>
            </div>
            `
        }
    document.getElementById("products").innerHTML = productList;
    console.log(products);
}    
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
    localStorage.setItem("products", JSON.stringify(products));
}




function updateProduct(updateindex) {
    upIndex = updateindex;
    updatebutton.classList.add("d-none");
    showButton.classList.remove("d-none");
    console.log(upIndex);
    productName.value = products[upIndex].name;
    productPrice.value = products[upIndex].price;
    productsDesc.value = products[upIndex].desc;
    productCat.value = products[upIndex].cat;
    
    // document.querySelector(".add-prod").classList.add("s-none");
    // document.getElementById("update-btn").classList.remove("s-none");
}
function showUpdatedProduct() {
    products[upIndex].name = productName.value;
    products[upIndex].price = productPrice.value;
    products[upIndex].desc = productsDesc.value;
    products[upIndex].cat = productCat.value;
    displayProducts();
    clearForm();
    
    updatebutton.classList.remove("d-none");
    showButton.classList.add("d-none");
    localStorage.setItem("products", JSON.stringify(products));
    var storedProducts = JSON.parse(localStorage.getItem("products"));
    console.log(storedProducts);    


}    

// localStorage.setItem("username", "JohnDoe");
// localStorage.setItem("products", JSON.stringify(products));
// var storedProducts = JSON.parse(localStorage.getItem("products"));
// console.log(storedProducts);

sessionStorage.setItem("products", JSON.stringify(products));
var storedProductsSession = JSON.parse(sessionStorage.getItem("products"));
console.log(storedProductsSession);

function search(){
    var searchInput = document.getElementById("search");
    var productList2="";
    for(var i = 0; i<products.length;i++){
        if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            productList2 += `
            <div class='product'> 
                <img src="${products[i].image}" alt="product image">
                <h2>  ${ products[i].name  } </h2> 
                <p>Price:   ${ products[i].price }  </p>
                <p>Category: ${   products[i].cat }  </p>
                <p>Description: ${  products[i].desc  }  </p>
                <button onclick="deleteProduct(${i})" id="delete-btn">Delete Product</button>
                
                <button class="update-btn " onclick="updateProduct(${i})" id="update-btn">Update Product</button>
                </div>
                `
        }
    }
    document.getElementById("products").innerHTML = productList2;
}
search();