// OPTION B : recherche fondée uniquement sur des boucles et des arrêts anticipés.
searchInput.addEventListener('input', handleSearch);

// === DÉBUT DU CODE À COPIER DANS JSBEN.CH — OPTION B ===
function recipeMatchesMainSearchB(recipe, normalizedInput) {
    if (recipe.name.toLowerCase().includes(normalizedInput)) {
        return true;
    }

    let ingredientIndex = 0;
    while (ingredientIndex < recipe.ingredients.length) {
        const ingredientName = recipe.ingredients[ingredientIndex].ingredient.toLowerCase();

        if (ingredientName.includes(normalizedInput)) {
            return true;
        }
        ingredientIndex++;
    }

    return recipe.description.toLowerCase().includes(normalizedInput);
}

function filterRecipesByMainSearchB(sourceRecipes, userInput) {
    const normalizedInput = userInput.trim().toLowerCase();

    if (normalizedInput.length < 3) {
        return sourceRecipes;
    }

    const matchingRecipes = [];

    for (let recipeIndex = 0; recipeIndex < sourceRecipes.length; recipeIndex++) {
        const recipe = sourceRecipes[recipeIndex];

        if (recipeMatchesMainSearchB(recipe, normalizedInput)) {
            matchingRecipes.push(recipe);
        }
    }

    return matchingRecipes;
}

function recipeMatchesOneFilterB(recipe, normalizedFilter) {
    let ingredientIndex = 0;

    while (ingredientIndex < recipe.ingredients.length) {
        const ingredientName = recipe.ingredients[ingredientIndex].ingredient.toLowerCase();

        if (ingredientName.includes(normalizedFilter)) {
            return true;
        }
        ingredientIndex++;
    }

    if (recipe.appliance.toLowerCase().includes(normalizedFilter)) {
        return true;
    }

    for (let ustensilIndex = 0; ustensilIndex < recipe.ustensils.length; ustensilIndex++) {
        if (recipe.ustensils[ustensilIndex].toLowerCase().includes(normalizedFilter)) {
            return true;
        }
    }

    return false;
}

function filterRecipesBySelectedFiltersB(sourceRecipes, filters) {
    const matchingRecipes = [];

    for (let recipeIndex = 0; recipeIndex < sourceRecipes.length; recipeIndex++) {
        const recipe = sourceRecipes[recipeIndex];
        let allFiltersMatch = true;
        let filterIndex = 0;

        while (filterIndex < filters.length) {
            const normalizedFilter = filters[filterIndex].trim().toLowerCase();

            if (!recipeMatchesOneFilterB(recipe, normalizedFilter)) {
                allFiltersMatch = false;
                break;
            }
            filterIndex++;
        }

        if (allFiltersMatch) {
            matchingRecipes.push(recipe);
        }
    }

    return matchingRecipes;
}

// === FIN DU CODE À COPIER DANS JSBEN.CH — OPTION B ===

function refreshSearchResults() {
    const mainSearchResults = filterRecipesByMainSearchB(recipes, searchInput.value);
    results = filterRecipesBySelectedFiltersB(mainSearchResults, selectedFilters);

    updateSearchResults(results);
    populateCards(results);
}

function handleSearch() {
    refreshSearchResults();
}

function searchByFilters() {
    refreshSearchResults();
}

function updateSearchResults(currentResults) {
    const uniqueIngredients = getUniqueIngredients(currentResults);
    const uniqueAppliances = getUniqueAppliances(currentResults);
    const uniqueUstensils = getUniqueUstensils(currentResults);

    updateDropdownOptions(1, uniqueIngredients);
    updateDropdownOptions(2, uniqueAppliances);
    updateDropdownOptions(3, uniqueUstensils);
    updateSelectedVisuals();
}

function findDropdownElementByText(text, containers) {
    const normalizedText = text.trim().toLowerCase();

    for (let containerIndex = 0; containerIndex < containers.length; containerIndex++) {
        const elements = containers[containerIndex].querySelectorAll('p');
        let elementIndex = 0;

        while (elementIndex < elements.length) {
            const element = elements[elementIndex];

            if (element.textContent.trim().toLowerCase() === normalizedText) {
                return element;
            }
            elementIndex++;
        }
    }

    return null;
}

function resetRecipes() {
    results = recipes;
    updateSearchResults(results);
    populateCards(results);
}

function updateDropdownOptions(dropdownNumber, options) {
    const dropdown = document.getElementById(`dd${dropdownNumber}-list`);

    if (!dropdown) {
        console.error(`Dropdown dd${dropdownNumber}-list introuvable.`);
        return;
    }

    dropdown.innerHTML = '';

    let optionIndex = 0;
    while (optionIndex < options.length) {
        const optionText = String(options[optionIndex]).trim().toLowerCase();
        const optionElement = document.createElement('p');
        optionElement.textContent = optionText;
        optionElement.setAttribute('data-filter', optionText);
        optionElement.onclick = function () {
            selectItem(this);
        };
        dropdown.appendChild(optionElement);
        optionIndex++;
    }
}
