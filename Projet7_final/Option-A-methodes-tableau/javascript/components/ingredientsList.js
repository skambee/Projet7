function getUniqueIngredients(sourceRecipes) {
    const uniqueIngredients = [];

    sourceRecipes.forEach(recipe => {
        const ingredientNames = recipe.ingredients.map(ingredient =>
            ingredient.ingredient.trim().toLowerCase()
        );

        ingredientNames.forEach(ingredientName => {
            const alreadyExists = uniqueIngredients.some(
                existingIngredient => existingIngredient === ingredientName
            );

            if (!alreadyExists) {
                uniqueIngredients.push(ingredientName);
            }
        });
    });

    return uniqueIngredients;
}

const allIngredients = getUniqueIngredients(recipes);
const dd1ListContainer = document.querySelector('.dd1-list');
const selectedContainer = document.getElementById('selectedContainer');

function renderIngredientOptions(options) {
    dd1ListContainer.innerHTML = '';

    options.forEach(ingredient => {
        const pElement = document.createElement('p');
        pElement.textContent = ingredient;
        pElement.setAttribute('data-filter', ingredient);
        pElement.onclick = function () {
            selectItem(this);
        };
        dd1ListContainer.appendChild(pElement);
    });
}

renderIngredientOptions(allIngredients);
