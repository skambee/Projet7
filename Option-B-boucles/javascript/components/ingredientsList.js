function arrayContainsExactValue(values, searchedValue) {
    let valueIndex = 0;

    while (valueIndex < values.length) {
        if (values[valueIndex] === searchedValue) {
            return true;
        }
        valueIndex++;
    }

    return false;
}

function getUniqueIngredients(sourceRecipes) {
    const uniqueIngredients = [];

    for (let recipeIndex = 0; recipeIndex < sourceRecipes.length; recipeIndex++) {
        const ingredients = sourceRecipes[recipeIndex].ingredients;

        for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {
            const ingredientName = ingredients[ingredientIndex].ingredient.trim().toLowerCase();

            if (!arrayContainsExactValue(uniqueIngredients, ingredientName)) {
                uniqueIngredients.push(ingredientName);
            }
        }
    }

    return uniqueIngredients;
}

const allIngredients = getUniqueIngredients(recipes);
const dd1ListContainer = document.querySelector('.dd1-list');
const selectedContainer = document.getElementById('selectedContainer');

function renderIngredientOptions(options) {
    dd1ListContainer.innerHTML = '';

    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        const ingredient = options[optionIndex];
        const pElement = document.createElement('p');
        pElement.textContent = ingredient;
        pElement.setAttribute('data-filter', ingredient);
        pElement.onclick = function () {
            selectItem(this);
        };
        dd1ListContainer.appendChild(pElement);
    }
}

renderIngredientOptions(allIngredients);
