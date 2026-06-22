// OPTION A : recherche fondée sur les méthodes avancées des tableaux.
searchInput.addEventListener('input', handleSearch);

// === DÉBUT DU CODE À COPIER DANS JSBEN.CH — OPTION A ===
function filterRecipesByMainSearchA(sourceRecipes, userInput) {
    const normalizedInput = userInput.trim().toLowerCase();

    if (normalizedInput.length < 3) {
        return sourceRecipes;
    }

    return sourceRecipes.filter(recipe => {
        const titleMatch = recipe.name.toLowerCase().includes(normalizedInput);
        const descriptionMatch = recipe.description.toLowerCase().includes(normalizedInput);
        const ingredientNames = recipe.ingredients.map(ingredient =>
            ingredient.ingredient.toLowerCase()
        );
        const ingredientsMatch = ingredientNames.some(ingredientName =>
            ingredientName.includes(normalizedInput)
        );

        return titleMatch || descriptionMatch || ingredientsMatch;
    });
}

function filterRecipesBySelectedFiltersA(sourceRecipes, filters) {
    return sourceRecipes.filter(recipe =>
        filters.every(filterValue => {
            const normalizedFilter = filterValue.trim().toLowerCase();
            const ingredientNames = recipe.ingredients.map(ingredient =>
                ingredient.ingredient.toLowerCase()
            );
            const ustensilNames = recipe.ustensils.map(ustensil =>
                ustensil.toLowerCase()
            );

            const ingredientMatch = ingredientNames.some(ingredientName =>
                ingredientName.includes(normalizedFilter)
            );
            const applianceMatch = recipe.appliance.toLowerCase().includes(normalizedFilter);
            const ustensilMatch = ustensilNames.some(ustensilName =>
                ustensilName.includes(normalizedFilter)
            );

            return ingredientMatch || applianceMatch || ustensilMatch;
        })
    );
}

// === FIN DU CODE À COPIER DANS JSBEN.CH — OPTION A ===

function refreshSearchResults() {
    const mainSearchResults = filterRecipesByMainSearchA(recipes, searchInput.value);
    results = filterRecipesBySelectedFiltersA(mainSearchResults, selectedFilters);

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
    let foundElement = null;
    const normalizedText = text.trim().toLowerCase();

    containers.some(container =>
        Array.from(container.querySelectorAll('p')).some(element => {
            if (element.textContent.trim().toLowerCase() === normalizedText) {
                foundElement = element;
                return true;
            }
            return false;
        })
    );

    return foundElement;
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

    options.forEach(option => {
        const optionElement = document.createElement('p');
        const optionText = String(option).trim().toLowerCase();
        optionElement.textContent = optionText;
        optionElement.setAttribute('data-filter', optionText);
        optionElement.onclick = function () {
            selectItem(this);
        };
        dropdown.appendChild(optionElement);
    });
}
