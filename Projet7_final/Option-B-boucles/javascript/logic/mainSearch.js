
// OPTION B : recherche fondée uniquement sur des boucles et des arrêts anticipés.

// Lance la recherche pendant la saisie.
searchInput.addEventListener('input', handleSearch);

// === DÉBUT DU CODE À COPIER DANS JSBEN.CH — OPTION B ===

// Vérifie si une recette correspond à la recherche principale.
function recipeMatchesMainSearchB(recipe, normalizedInput) {
    // Recherche dans le nom de la recette.
    if (recipe.name.toLowerCase().includes(normalizedInput)) {
        return true;
    }

    // Parcourt les ingrédients avec une boucle.
    let ingredientIndex = 0;
    while (ingredientIndex < recipe.ingredients.length) {
        const ingredientName = recipe.ingredients[ingredientIndex].ingredient.toLowerCase();

        // Arrête la recherche si un ingrédient correspond.
        if (ingredientName.includes(normalizedInput)) {
            return true;
        }
        ingredientIndex++;
    }

    // Recherche ensuite dans la description.
    return recipe.description.toLowerCase().includes(normalizedInput);
}

// Filtre les recettes selon la recherche principale.
function filterRecipesByMainSearchB(sourceRecipes, userInput) {
    // Nettoie et normalise le texte saisi.
    const normalizedInput = userInput.trim().toLowerCase();

    // Ne filtre pas avant trois caractères.
    if (normalizedInput.length < 3) {
        return sourceRecipes;
    }

    // Stocke les recettes correspondantes.
    const matchingRecipes = [];

    // Parcourt toutes les recettes.
    for (let recipeIndex = 0; recipeIndex < sourceRecipes.length; recipeIndex++) {
        const recipe = sourceRecipes[recipeIndex];

        // Ajoute la recette si elle correspond.
        if (recipeMatchesMainSearchB(recipe, normalizedInput)) {
            matchingRecipes.push(recipe);
        }
    }

    return matchingRecipes;
}

// Vérifie si une recette correspond à un filtre.
function recipeMatchesOneFilterB(recipe, normalizedFilter) {
    let ingredientIndex = 0;

    // Recherche dans les ingrédients.
    while (ingredientIndex < recipe.ingredients.length) {
        const ingredientName = recipe.ingredients[ingredientIndex].ingredient.toLowerCase();

        if (ingredientName.includes(normalizedFilter)) {
            return true;
        }
        ingredientIndex++;
    }

    // Recherche dans l'appareil.
    if (recipe.appliance.toLowerCase().includes(normalizedFilter)) {
        return true;
    }

    // Recherche dans les ustensiles.
    for (let ustensilIndex = 0; ustensilIndex < recipe.ustensils.length; ustensilIndex++) {
        if (recipe.ustensils[ustensilIndex].toLowerCase().includes(normalizedFilter)) {
            return true;
        }
    }

    // Aucun élément ne correspond au filtre.
    return false;
}

// Filtre les recettes selon les filtres sélectionnés.
function filterRecipesBySelectedFiltersB(sourceRecipes, filters) {
    const matchingRecipes = [];

    // Parcourt toutes les recettes.
    for (let recipeIndex = 0; recipeIndex < sourceRecipes.length; recipeIndex++) {
        const recipe = sourceRecipes[recipeIndex];
        let allFiltersMatch = true;
        let filterIndex = 0;

        // Vérifie chaque filtre sélectionné.
        while (filterIndex < filters.length) {
            const normalizedFilter = filters[filterIndex].trim().toLowerCase();

            // Arrête la vérification si un filtre ne correspond pas.
            if (!recipeMatchesOneFilterB(recipe, normalizedFilter)) {
                allFiltersMatch = false;
                break;
            }
            filterIndex++;
        }

        // Ajoute la recette si tous les filtres correspondent.
        if (allFiltersMatch) {
            matchingRecipes.push(recipe);
        }
    }

    return matchingRecipes;
}

// === FIN DU CODE À COPIER DANS JSBEN.CH — OPTION B ===

// Actualise les résultats de recherche.
function refreshSearchResults() {
    const mainSearchResults = filterRecipesByMainSearchB(recipes, searchInput.value);
    results = filterRecipesBySelectedFiltersB(mainSearchResults, selectedFilters);

    // Met à jour les menus et les cartes.
    updateSearchResults(results);
    populateCards(results);
}

// Lance l'actualisation après une saisie.
function handleSearch() {
    refreshSearchResults();
}

// Lance l'actualisation après un filtre.
function searchByFilters() {
    refreshSearchResults();
}

// Met à jour les options des menus déroulants.
function updateSearchResults(currentResults) {
    const uniqueIngredients = getUniqueIngredients(currentResults);
    const uniqueAppliances = getUniqueAppliances(currentResults);
    const uniqueUstensils = getUniqueUstensils(currentResults);

    updateDropdownOptions(1, uniqueIngredients);
    updateDropdownOptions(2, uniqueAppliances);
    updateDropdownOptions(3, uniqueUstensils);
    updateSelectedVisuals();
}

// Recherche un élément selon son texte.
function findDropdownElementByText(text, containers) {
    const normalizedText = text.trim().toLowerCase();

    // Parcourt les différents menus.
    for (let containerIndex = 0; containerIndex < containers.length; containerIndex++) {
        const elements = containers[containerIndex].querySelectorAll('p');
        let elementIndex = 0;

        // Parcourt les options du menu.
        while (elementIndex < elements.length) {
            const element = elements[elementIndex];

            // Retourne immédiatement l'élément trouvé.
            if (element.textContent.trim().toLowerCase() === normalizedText) {
                return element;
            }
            elementIndex++;
        }
    }

    // Retourne null si aucun élément n'est trouvé.
    return null;
}

// Réinitialise la liste des recettes.
function resetRecipes() {
    results = recipes;
    updateSearchResults(results);
    populateCards(results);
}

// Met à jour les options d'un menu déroulant.
function updateDropdownOptions(dropdownNumber, options) {
    const dropdown = document.getElementById(`dd${dropdownNumber}-list`);

    // Arrête la fonction si le menu est introuvable.
    if (!dropdown) {
        console.error(`Dropdown dd${dropdownNumber}-list introuvable.`);
        return;
    }

    // Supprime les anciennes options.
    dropdown.innerHTML = '';

    // Crée les nouvelles options avec une boucle.
    let optionIndex = 0;
    while (optionIndex < options.length) {
        const optionText = String(options[optionIndex]).trim().toLowerCase();
        const optionElement = document.createElement('p');
        optionElement.textContent = optionText;
        optionElement.setAttribute('data-filter', optionText);

        // Sélectionne l'option au clic.
        optionElement.onclick = function () {
            selectItem(this);
        };
        dropdown.appendChild(optionElement);
        optionIndex++;
    }
}
