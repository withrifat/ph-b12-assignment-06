// Fetch categories
const CategoriesApi = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((json) => {
      displayCategories(json.categories);
    })
    .catch((err) => console.error('Error fetching categories:', err));
};

// Fetch plants by category
const loadLevelCard = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) => {
      loadLevelCards(json.plants);
    })
    .catch((err) => console.error('Error fetching plants:', err));
};
// all trees category default
const allTreeCard = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((json) => {
      loadLevelCards(json.plants);
    })
    .catch((err) => console.error('Error fetching all plants:', err));
};

// Render plant cards
const loadLevelCards = (cards) => {
  const createCard = document.getElementById('cards');
  createCard.innerHTML = '';
  cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = `
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col h-[500px]">
                <div class="h-44 md:h-52 lg:h-60 mb-4 overflow-hidden rounded-xl">
                    <img src="${card.image}" alt="${card.name}" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-xl">
                </div>
                <h3 class="font-bold text-lg md:text-xl mb-2 text-gray-800">${card.name}</h3>
                <p class="text-sm md:text-base text-gray-600 mb-4 flex-1 overflow-hidden line-clamp-4">
                    ${card.description}
                </p>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-xs md:text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">${card.category}</span>
                    <span class="font-semibold text-gray-800 text-sm md:text-base">৳${card.price}</span>
                </div>
                <button class="btn bg-[#15803D] text-white w-full py-6 rounded-full text-base md:text-lg font-semibold hover:bg-green-600 transition-colors duration-300">
                    Add to Cart
                </button>
            </div>
        `;
    createCard.appendChild(cardElement);
  });
};

// Render categories
const displayCategories = (categories) => {
  const wordContainer = document.getElementById('Categories');
  wordContainer.innerHTML = '';
  // Extra "All Trees" button
  const allTreesBtn = document.createElement('li');
  allTreesBtn.innerHTML = `
        <button onclick="allTreeCard()"  
            class="w-full text-left px-3 py-2 hover:bg-green-700 hover:text-white text-black rounded-xl">
            All Trees
        </button>
    `;
  wordContainer.appendChild(allTreesBtn);
  //other category
  categories.forEach((category) => {
    const li = document.createElement('li');
    li.innerHTML = `
            <button onclick="loadLevelCard(${category.id})"  
                class="w-full text-left px-3 py-2 hover:bg-green-700 hover:text-white text-black rounded-xl">
                ${category.category_name}
            </button>
        `;
    wordContainer.appendChild(li);
  });
};

// Initialize
CategoriesApi();
allTreeCard(); //default card
