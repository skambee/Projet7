document.addEventListener('DOMContentLoaded', function () {
    populateCards(recipes);
    updateRecipeCount();
});


function populateCards(results) {
    const recipesContainer = document.getElementById('cards-container');
    recipesContainer.innerHTML = '';
    if (results.length === 0) {
        const message = document.createElement('p');
        message.textContent = `Oups ! Aucune recette ne correspond à votre recherche "${searchInput.value}"`;
        recipesContainer.appendChild(message);
        updateRecipeCount();
        setTimeout(() => {
            resetPageState();
        }, 2000);
    } else {
        results.forEach((recipe, index) => {
            const card = createRecipeCard(recipe, index);
            recipesContainer.appendChild(card);
        });
        updateRecipeCount();
    }
}
function createRecipeCard(recipe, index) {

    const card = document.createElement('div');
    card.classList.add('recipe-container');
    card.id = `recipe-container-${index + 1}`;
    const article = document.createElement('article');
    article.classList.add('recipes-card');
    const image = document.createElement('img');
    image.src = `./images/Recettes/${recipe.image}`;
    image.alt = recipe.name;
    image.classList.add('recipe-image');
    const recipeTime = document.createElement('div');
    recipeTime.classList.add('recipe-time');
    recipeTime.textContent = `${recipe.time}min`;
    const containerCardText = document.createElement('div');
    containerCardText.classList.add('container-card-text');
    const recipeName = document.createElement('h1');
    recipeName.textContent = recipe.name;
    const recetteHeading = document.createElement('h2');
    recetteHeading.textContent = 'Recette';
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container');
    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('recipe-description');
    recipeDescription.textContent = recipe.description;
    const ingredientsHeading = document.createElement('h2');
    ingredientsHeading.textContent = 'Ingrédients';
    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('recipe-ingredients');

    recipe.ingredients.forEach((ingredient, i) => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add(`ingredient${i + 1}`);

        const ingredientName = document.createElement('p');
        ingredientName.classList.add('ingredient-name');
        ingredientName.textContent = ingredient.ingredient;

        const ingredientQuantity = document.createElement('p');
        ingredientQuantity.classList.add('ingredient-quantity');
        ingredientQuantity.textContent = `${ingredient.quantity !== undefined ? ingredient.quantity : '-'} ${ingredient.unit !== undefined ? ingredient.unit : ''}`;

        ingredientDiv.appendChild(ingredientName);
        ingredientDiv.appendChild(ingredientQuantity);
        recipeIngredients.appendChild(ingredientDiv);
    });

    descriptionContainer.appendChild(recipeDescription);
    containerCardText.appendChild(recipeName);
    containerCardText.appendChild(recetteHeading);
    containerCardText.appendChild(descriptionContainer);
    containerCardText.appendChild(ingredientsHeading);
    containerCardText.appendChild(recipeIngredients);
    article.appendChild(image);
    article.appendChild(recipeTime);
    article.appendChild(containerCardText);
    card.appendChild(article);

    return card;
}


document.addEventListener('DOMContentLoaded', function () {
    const recipeDescriptions = document.querySelectorAll('.recipe-description');
    const containerCardTexts = document.querySelectorAll('.container-card-text');

    recipeDescriptions.forEach((recipeDescription, index) => {
        recipeDescription.addEventListener('mouseover', () => {
            containerCardTexts[index].style.height = `100%`;
        });

        recipeDescription.addEventListener('mouseout', () => {
            containerCardTexts[index].style.height = '478px';
        });
    });
});

function updateRecipeCount() {
    const recipeCountElement = document.getElementById('number-recipes');
    const visibleRecipeCards = document.querySelectorAll('.recipe-container');
    const numberOfRecipes = visibleRecipeCards.length;
    let recipeText;

    if (numberOfRecipes === 0) {
        recipeText = 'Aucune recette';
    } else {
        recipeText = numberOfRecipes === 1 ? 'recette' : 'recettes';
    }
    recipeCountElement.textContent = numberOfRecipes === 0 ? recipeText : `${numberOfRecipes} ${recipeText}`;
}
