document.addEventListener('DOMContentLoaded', () => {
    const categoriesDiv = document.getElementById('category')

    let currCategory = null;

    // function that fetches the list of categories
    async function fetchAllCategories() {
        const response = await fetch('https://fakestoreapi.com/products/categories')
        const allCategories = await response.json()
        return allCategories;
    }

    // function that fetches each category
    async function fetchEachCategory(category) {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const each = await res.json()
        displayEachCategory(each);
    }

    // this is the function that displays them
    function displayAllCategories (categories, index) {
            categories.forEach((category) => {
            const eachCategory = document.createElement('h3');
            eachCategory.className = 'category'
            eachCategory.innerText = category
            categoriesDiv.appendChild(eachCategory);

            if (category === 'electronics') {
                console.log(index)
                eachCategory.style.color = '#27b737';
                currCategory = eachCategory;
            }

            eachCategory.addEventListener('click', function() {
                if (currCategory) {
                    currCategory.style.color = '';
                }
                fetchEachCategory(category);
                eachCategory.style.color = '#27b737';
                currCategory = eachCategory;
            })
        })
    }

    function displayEachCategory (products) {
        const categoryContainer = document.getElementById('categories');
        categoryContainer.innerHTML = "";
        products.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.className = "row"
            productDiv.innerHTML = `<img class="try" src=${product.image} alt="" />
            <div class="product-text">
              <h5>sale</h5>
            </div>
            <div class="heart-icon">
              <i class="bx bx-heart"></i>
            </div>
            <div class="ratting">
              <i class="bx bx-star"></i>
              <i class="bx bx-star"></i>
              <i class="bx bx-star"></i>
              <i class="bx bx-star"></i>
              <i class="bx bx-star-half"></i>
              <h3>${product.rating.rate} <span>${product.rating.count}</span></h3>
            </div>
            <div class="price">
              <h4>${product.title}</h4>
              <p>$100</p>
            </div>`
            categoryContainer.appendChild(productDiv);
        })
    }

    const displayCategory = async () => {
        const categories = await fetchAllCategories()
        displayAllCategories(categories);
    }
    fetchEachCategory('electronics');

    displayCategory(); 
})