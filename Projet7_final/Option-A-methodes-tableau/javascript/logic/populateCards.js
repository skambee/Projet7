document.addEventListener('DOMContentLoaded', function () {
    populateCards(recipes);
});

function populateCards(currentResults) {
    const recipesContainer = document.getElementById('cards-container');
    recipesContainer.innerHTML = '';

    if (currentResults.length === 0) {
        const message = document.createElement('p');
        message.classList.add('no-results-message');
        message.textContent = `Oups ! Aucune recette ne correspond à votre recherche "${searchInput.value}"`;
        recipesContainer.appendChild(message);
        updateRecipeCount();
        return;
    }

    currentResults.forEach((recipe, index) => {
        recipesContainer.appendChild(createRecipeCard(recipe, index));
    });

    updateRecipeCount();
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

    recipe.ingredients.forEach((ingredient, ingredientIndex) => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add(`ingredient${ingredientIndex + 1}`);

        const ingredientName = document.createElement('p');
        ingredientName.classList.add('ingredient-name');
        ingredientName.textContent = ingredient.ingredient;

        const ingredientQuantity = document.createElement('p');
        ingredientQuantity.classList.add('ingredient-quantity');
        const quantity = ingredient.quantity !== undefined ? ingredient.quantity : '-';
        const unit = ingredient.unit !== undefined ? ingredient.unit : '';
        ingredientQuantity.textContent = `${quantity} ${unit}`.trim();

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

function updateRecipeCount() {
    const recipeCountElement = document.getElementById('number-recipes');
    const numberOfRecipes = document.querySelectorAll('.recipe-container').length;

    if (numberOfRecipes === 0) {
        recipeCountElement.textContent = 'Aucune recette';
    } else {
        recipeCountElement.textContent = `${numberOfRecipes} ${numberOfRecipes === 1 ? 'recette' : 'recettes'}`;
    }
}
