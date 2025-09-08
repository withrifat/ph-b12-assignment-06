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
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) => {
      loadLevelCards(json.plants);
    })
    .catch((err) => console.error('Error fetching plants:', err));
};

// All trees category default
const allTreeCard = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((json) => {
      loadLevelCards(json.plants);
    })
    .catch((err) => console.error('Error fetching all plants:', err));
};

// Active button helper
const removeActive = () => {
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
};
// Open modal with plant details (fetching from API)
const openPlantModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      const plant = data.plants; 
      const modalContent = document.getElementById('modal-content');
      modalContent.innerHTML = `
        <div class="space-y-4">
          <img src="${plant.image}" alt="${plant.name}" class="w-full h-64 object-cover rounded-lg">
          <h2 class="text-2xl font-bold text-gray-800">${plant.name}</h2>
          <p class="text-gray-600">${plant.description}</p>
          <div class="flex justify-between items-center">
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full">${plant.category}</span>
            <span class="font-semibold text-lg text-gray-800">৳${plant.price}</span>
          </div>
        </div>
      `;

      document.getElementById('plant_modal').showModal();
    })
    .catch(err => console.error("Error fetching plant details:", err));
};


const loadLevelCards = (cards) => {
  const createCard = document.getElementById('cards');
  createCard.innerHTML = '';

  cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add("bg-white", "rounded-2xl", "shadow-lg", "hover:shadow-2xl", "transition-shadow", "duration-300", "p-4", "flex", "flex-col", "h-[500px]");

    cardElement.innerHTML = `
      <div class="h-44 md:h-52 lg:h-60 mb-4 overflow-hidden rounded-xl">
        <img src="${card.image}" alt="${card.name}" class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-xl">
      </div>
      <h3 class="plant-name font-bold text-lg md:text-xl mb-2 text-gray-800 cursor-pointer hover:text-green-600" data-id="${card.id}">
        ${card.name}
      </h3>
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
    `;

    // add evenlistener for modal call
    cardElement.querySelector(".plant-name").addEventListener("click", (e) => {
      const plantId = e.target.dataset.id;
      openPlantModal(plantId);
    });

    createCard.appendChild(cardElement);
  });
};


// Render categories with active button logic
const displayCategories = (categories) => {
  const wordContainer = document.getElementById('Categories');
  wordContainer.innerHTML = '';

  // Extra "All Trees" button
  const allTreesBtn = document.createElement('li');
  allTreesBtn.innerHTML = `
    <button class="category-btn w-full text-left px-3 py-2 rounded-xl">
      All Trees
    </button>
  `;
  wordContainer.appendChild(allTreesBtn);
  allTreesBtn.querySelector('button').classList.add('active');    // Set default active 
  // Other categories
  categories.forEach((category) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <button class="category-btn w-full text-left px-3 py-2 rounded-xl" data-id="${category.id}">
        ${category.category_name}
      </button>
    `;
    wordContainer.appendChild(li);
  });

  // Add click event for active class and loading
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      removeActive();             
      btn.classList.add('active'); 
      const id = btn.dataset.id;
      if(id) {
        loadLevelCard(id);        
      } else {
        allTreeCard();            
      }
    });
  });
};

// Initialize
CategoriesApi();
allTreeCard(); // default card
