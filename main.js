const CategoriesApi = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(json => {
        displayCategories(json.categories); 
    })
    .catch(err => console.error('Error fetching categories:', err));
}

const displayCategories = (categories) => {
    console.log(categories);
    const wordContainer = document.getElementById('Categories');
    wordContainer.innerHTML = ''; // clear previous items
    categories.forEach(category => {
        const li = document.createElement('li'); 
        li.innerHTML = `
            <li><button class="w-full text-left px-3 py-2 hover:bg-green-700 text-black rounded">${category.category_name}</button></li>
        `;
        wordContainer.appendChild(li);
    });
}

CategoriesApi();
