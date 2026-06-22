
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
    currentResults.forEach((recipe, index) => {
        recipesContainer.appendChild(createRecipeCard(recipe, index));
    });

    // Met à jour le nombre de recettes.
    updateRecipeCount();
}

// Crée la carte d'une recette.
function createRecipeCard(recipe, index) {
    // Crée le conteneur principal.
    const card = document.createElement('div');
    card.classList.add('recipe-container');
    card.id = `recipe-container-${index + 1}`;

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

    const recetteHeading = document.createElement('h2');
    recetteHeading.textContent = 'Recette';

    // Crée la zone de description.
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container');

    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('recipe-description');
    recipeDescription.textContent = recipe.description;

    const ingredientsHeading = document.createElement('h2');
    ingredientsHeading.textContent = 'Ingrédients';

    // Crée la liste des ingrédients.
    const recipeIngredients = document.createElement('div');
    recipeIngredients.classList.add('recipe-ingredients');

    // Ajoute chaque ingrédient à la carte.
    recipe.ingredients.forEach((ingredient, ingredientIndex) => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add(`ingredient${ingredientIndex + 1}`);

        const ingredientName = document.createElement('p');
        ingredientName.classList.add('ingredient-name');
        ingredientName.textContent = ingredient.ingredient;

        // Affiche la quantité et l'unité.
        const ingredientQuantity = document.createElement('p');
        ingredientQuantity.classList.add('ingredient-quantity');
        const quantity = ingredient.quantity !== undefined ? ingredient.quantity : '-';
        const unit = ingredient.unit !== undefined ? ingredient.unit : '';
        ingredientQuantity.textContent = `${quantity} ${unit}`.trim();

        // Ajoute les informations de l'ingrédient.
        ingredientDiv.appendChild(ingredientName);
        ingredientDiv.appendChild(ingredientQuantity);
        recipeIngredients.appendChild(ingredientDiv);
    });

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

    return card;
}

// Met à jour le nombre de recettes affichées.
function updateRecipeCount() {
    const recipeCountElement = document.getElementById('number-recipes');
    const numberOfRecipes = document.querySelectorAll('.recipe-container').length;

    // Adapte le texte selon le nombre de recettes.
    if (numberOfRecipes === 0) {
        recipeCountElement.textContent = 'Aucune recette';
    } else {
        recipeCountElement.textContent = `${numberOfRecipes} ${numberOfRecipes === 1 ? 'recette' : 'recettes'}`;
    }
}

