var productName = document.getElementById("prod-name");
var productPrice = document.getElementById("prod-price");
var productsDesc = document.getElementById("prod-desc");
var productCat = document.getElementById("prod-cat");
var addButton = document.getElementById("update-btn");
var updatebutton = document.getElementById("update-btn");
var showButton = document.getElementById("show-btn");
var productImage = document.getElementById("file-input");

// Error message elements
var nameError = document.getElementById("name-error");
var priceError = document.getElementById("price-error");
var catError = document.getElementById("cat-error");
var descError = document.getElementById("desc-error");
var imageError = document.getElementById("image-error");

const validations = {
    productName: /^[a-zA-Z0-9\s\-'&.!]{2,100}$/,
    productPrice: /^\d+(\.\d{1,2})?$/,
    productCategory: /^[a-zA-Z0-9\s\-&]{2,50}$/,
    productDescription: /^[a-zA-Z0-9\s\-'",.!?()]{10,1000}$/,
    productImage: /\.(jpe?g|png|gif|bmp|webp|svg)$/i,
    safeFilename: /^[a-zA-Z0-9_\-]+\.(jpe?g|png|gif|bmp|webp|svg)$/i
};

var products;
var upIndex;

// Add input event listeners for real-time validation
productName.addEventListener('input', validateName);
productPrice.addEventListener('input', validatePrice);
productCat.addEventListener('change', validateCategory);
productsDesc.addEventListener('input', validateDescription);
productImage.addEventListener('change', validateImage);

function validateName() {
    if (!productName.value) {
        nameError.textContent = "Product name is required";
        return false;
    } else if (!validations.productName.test(productName.value)) {
        nameError.textContent = "Product name must be 2-100 characters and can contain letters, numbers, spaces, and basic punctuation";
        return false;
    } else {
        nameError.textContent = "";
        return true;
    }
}

function validatePrice() {
    if (!productPrice.value) {
        priceError.textContent = "Product price is required";
        return false;
    } else if (!validations.productPrice.test(productPrice.value)) {
        priceError.textContent = "Product price must be a valid number with up to 2 decimal places";
        return false;
    } else {
        priceError.textContent = "";
        return true;
    }
}

function validateCategory() {
    if (!productCat.value) {
        catError.textContent = "Product category is required";
        return false;
    } else if (!validations.productCategory.test(productCat.value)) {
        catError.textContent = "Product category must be 2-50 characters and contain only letters, numbers, spaces, and basic punctuation";
        return false;
    } else {
        catError.textContent = "";
        return true;
    }
}

function validateDescription() {
    if (!productsDesc.value) {
        descError.textContent = "Product description is required";
        return false;
    } else if (!validations.productDescription.test(productsDesc.value)) {
        descError.textContent = "Product description must be 10-1000 characters and contain only valid characters";
        return false;
    } else {
        descError.textContent = "";
        return true;
    }
}

function validateImage() {
    if (!productImage.files[0]) {
        imageError.textContent = "Product image is required";
        return false;
    } else if (!validations.productImage.test(productImage.files[0].name)) {
        imageError.textContent = "Product image must be a valid image file (jpg, png, gif, bmp, webp, svg)";
        return false;
    } else {
        imageError.textContent = "";
        return true;
    }
}

function isValidProduct() {
    var isValid = true;
    
    if (!validateName()) isValid = false;
    if (!validatePrice()) isValid = false;
    if (!validateCategory()) isValid = false;
    if (!validateDescription()) isValid = false;
    if (!validateImage()) isValid = false;
    
    return isValid;
}

if(localStorage.getItem("products")){
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
} else {
    products = [];
}

function addProduct() {
    if (!isValidProduct()) {
        alert("Please fix all validation errors before adding the product");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        var product = {
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
        clearAllErrors();
    }
    reader.readAsDataURL(document.getElementById("file-input").files[0]);
}

function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productsDesc.value = "";
    productCat.value = "Accessories"; // Reset to default
    document.getElementById("file-input").value = "";
}

function clearAllErrors() {
    nameError.textContent = "";
    priceError.textContent = "";
    catError.textContent = "";
    descError.textContent = "";
    imageError.textContent = "";
}

function displayProducts() {
    var productList = "";
    
    for(var i = 0; i < products.length; i++){
        productList += `
        <div class='product'> 
            <img src="${products[i].image}" alt="product image"  >
            <h2>${products[i].name}</h2> 
            <p>Price: $${products[i].price}</p>
            <p>Category: ${products[i].cat}</p>
            <p>Description: ${products[i].desc}</p>
            <button onclick="deleteProduct(${i})" id="delete-btn">Delete Product</button>
            <button class="update-btn" onclick="updateProduct(${i})">Update Product</button>
        </div>
        `;
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
    
    // Clear any existing errors
    clearAllErrors();
}

function showUpdatedProduct() {
    if (!validateName() || !validatePrice() || !validateCategory() || !validateDescription()) {
        alert("Please fix all validation errors before updating the product");
        return;
    }
    
    products[upIndex].name = productName.value;
    products[upIndex].price = productPrice.value;
    products[upIndex].desc = productsDesc.value;
    products[upIndex].cat = productCat.value;
    
    displayProducts();
    clearForm();
    clearAllErrors();
    
    updatebutton.classList.remove("d-none");
    showButton.classList.add("d-none");
    localStorage.setItem("products", JSON.stringify(products));
    var storedProducts = JSON.parse(localStorage.getItem("products"));
    console.log(storedProducts);    
}    

function search() {
    var searchInput = document.getElementById("search");
    var productList2 = "";
    
    for(var i = 0; i < products.length; i++){
        if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            productList2 += `
            <div class='product'> 
                <img src="${products[i].image}" alt="product image"  >
                <h2>${products[i].name}</h2> 
                <p>Price: $${products[i].price}</p>
                <p>Category: ${products[i].cat}</p>
                <p>Description: ${products[i].desc}</p>
                <button onclick="deleteProduct(${i})" id="delete-btn">Delete Product</button>
                <button class="update-btn" onclick="updateProduct(${i})">Update Product</button>
            </div>
            `;
        }
    }
    
    if (productList2 === "") {
        document.getElementById("products").innerHTML = "<p>No products found</p>";
    } else {
        document.getElementById("products").innerHTML = productList2;
    }
}

// Initialize search on page load
search();

// Add CSS for error messages (you can add this to your styles.css file)
var style = document.createElement('style');
style.textContent = `
    .error-message {
        color: red;
        font-size: 12px;
        display: block;
        margin-top: 5px;
        margin-bottom: 10px;
    }
    
    input.error, select.error, textarea.error {
        border: 2px solid red;
    }
    
    
    .d-none {
        display: none;
    }
`;
document.head.appendChild(style);