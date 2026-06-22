
// Affiche les recettes une fois la page chargée.
document.addEventListener('DOMContentLoaded', function () {
    populateCards(recipes);
});

// Affiche les cartes des recettes.
function populateCards(currentResults) {
    const recipesContainer = document.getElementById('cards-container');

    // Supprime le contenu déjà affiché.
    recipesContainer.innerHTML = '';

    // Affiche un message si aucune recette n'est trouvée.
    if (currentResults.length === 0) {
        const message = document.createElement('p');
        message.classList.add('no-results-message');
        message.textContent = `Oups ! Aucune recette ne correspond à votre recherche "${searchInput.value}"`;
        recipesContainer.appendChild(message);
        updateRecipeCount();
        return;
    }

    // Crée une carte pour chaque recette.
    for (let recipeIndex = 0; recipeIndex < currentResults.length; recipeIndex++) {
        recipesContainer.appendChild(createRecipeCard(currentResults[recipeIndex], recipeIndex));
    }

    // Met à jour le nombre de recettes.
    updateRecipeCount();
}

// Crée la carte d'une recette.
function createRecipeCard(recipe, index) {
    // Crée le conteneur principal.
    const card = document.createElement('div');
    card.classList.add('recipe-container');
    card.id = `recipe-container-${index + 1}`;

    // Crée l'article de la recette.
    const article = document.createElement('article');
    article.classList.add('recipes-card');

    // Ajoute l'image de la recette.
    const image = document.createElement('img');
    image.src = `./images/Recettes/${recipe.image}`;
    image.alt = recipe.name;
    image.classList.add('recipe-image');

    // Affiche le temps de préparation.
    const recipeTime = document.createElement('div');
    recipeTime.classList.add('recipe-time');
    recipeTime.textContent = `${recipe.time}min`;

    // Crée le conteneur du texte.
    const containerCardText = document.createElement('div');
    containerCardText.classList.add('container-card-text');

    // Ajoute le nom de la recette.
    const recipeName = document.createElement('h1');
    recipeName.textContent = recipe.name;

    // Ajoute le titre de la description.
    const recetteHeading = document.createElement('h2');
    recetteHeading.textContent = 'Recette';

    // Crée la zone de description.
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container');

    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('recipe-description');
    recipeDescription.textContent = recipe.description;

    // Ajoute le titre des ingrédients.
    const ingredientsHeading = document.createElement('h2');
    ingredientsHeading.textContent = 'Ingrédients';

    // Crée le conteneur des ingrédients.
    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('recipe-ingredients');

    // Parcourt les ingrédients avec une boucle.
    let ingredientIndex = 0;
    while (ingredientIndex < recipe.ingredients.length) {
        const ingredient = recipe.ingredients[ingredientIndex];

        // Crée le conteneur de l'ingrédient.
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add(`ingredient${ingredientIndex + 1}`);

        // Ajoute le nom de l'ingrédient.
        const ingredientName = document.createElement('p');
        ingredientName.classList.add('ingredient-name');
        ingredientName.textContent = ingredient.ingredient;

        // Ajoute la quantité et l'unité.
        const ingredientQuantity = document.createElement('p');
        ingredientQuantity.classList.add('ingredient-quantity');
        const quantity = ingredient.quantity !== undefined ? ingredient.quantity : '-';
        const unit = ingredient.unit !== undefined ? ingredient.unit : '';
        ingredientQuantity.textContent = `${quantity} ${unit}`.trim();

        // Ajoute l'ingrédient à la liste.
        ingredientDiv.appendChild(ingredientName);
        ingredientDiv.appendChild(ingredientQuantity);
        recipeIngredients.appendChild(ingredientDiv);
        ingredientIndex++;
    }

    // Assemble les éléments de la carte.
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

    // Retourne la carte créée.
    return card;
}

// Met à jour le nombre de recettes affichées.
function updateRecipeCount() {
    const recipeCountElement = document.getElementById('number-recipes');
    const numberOfRecipes = document.querySelectorAll('.recipe-container').length;

    // Adapte le texte au nombre de recettes.
    if (numberOfRecipes === 0) {
        recipeCountElement.textContent = 'Aucune recette';
    } else {
        recipeCountElement.textContent = `${numberOfRecipes} ${numberOfRecipes === 1 ? 'recette' : 'recettes'}`;
    }
}

