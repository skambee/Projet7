// OPTION A : recherche fondée sur les méthodes avancées des tableaux.

// Lance la recherche à chaque saisie dans le champ.
searchInput.addEventListener('input', handleSearch);

// === DÉBUT DU CODE À COPIER DANS JSBEN.CH — OPTION A ===

// Filtre les recettes selon la recherche principale.
function filterRecipesByMainSearchA(sourceRecipes, userInput) {
    // Nettoie et normalise le texte saisi.
    const normalizedInput = userInput.trim().toLowerCase();

    // Ne lance pas la recherche avant trois caractères.
    if (normalizedInput.length < 3) {
        return sourceRecipes;
    }

    // Vérifie la présence du texte dans chaque recette.
    return sourceRecipes.filter(recipe => {
        const titleMatch = recipe.name.toLowerCase().includes(normalizedInput);
        const descriptionMatch = recipe.description.toLowerCase().includes(normalizedInput);

        // Récupère les noms des ingrédients.
        const ingredientNames = recipe.ingredients.map(ingredient =>
            ingredient.ingredient.toLowerCase()
        );

        // Recherche une correspondance dans les ingrédients.
        const ingredientsMatch = ingredientNames.some(ingredientName =>
            ingredientName.includes(normalizedInput)
        );

        // Garde la recette si une correspondance est trouvée.
        return titleMatch || descriptionMatch || ingredientsMatch;
    });
}

// Filtre les recettes selon les filtres sélectionnés.
function filterRecipesBySelectedFiltersA(sourceRecipes, filters) {
    return sourceRecipes.filter(recipe =>
        // Vérifie que tous les filtres correspondent à la recette.
        filters.every(filterValue => {
            const normalizedFilter = filterValue.trim().toLowerCase();

            // Récupère les ingrédients et les ustensiles de la recette.
            const ingredientNames = recipe.ingredients.map(ingredient =>
                ingredient.ingredient.toLowerCase()
            );
            const ustensilNames = recipe.ustensils.map(ustensil =>
                ustensil.toLowerCase()
            );

            // Vérifie les correspondances avec les différents filtres.
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

// Actualise les recettes selon la recherche et les filtres.
function refreshSearchResults() {
    const mainSearchResults = filterRecipesByMainSearchA(recipes, searchInput.value);
    results = filterRecipesBySelectedFiltersA(mainSearchResults, selectedFilters);

    // Met à jour les listes et les cartes affichées.
    updateSearchResults(results);
    populateCards(results);
}

// Appelle l'actualisation lors d'une recherche.
function handleSearch() {
    refreshSearchResults();
}

// Appelle l'actualisation après la sélection d'un filtre.
function searchByFilters() {
    refreshSearchResults();
}

// Met à jour les options disponibles dans les menus.
function updateSearchResults(currentResults) {
    const uniqueIngredients = getUniqueIngredients(currentResults);
    const uniqueAppliances = getUniqueAppliances(currentResults);
    const uniqueUstensils = getUniqueUstensils(currentResults);

    updateDropdownOptions(1, uniqueIngredients);
    updateDropdownOptions(2, uniqueAppliances);
    updateDropdownOptions(3, uniqueUstensils);
    updateSelectedVisuals();
}

// Recherche un élément dans les menus à partir de son texte.
function findDropdownElementByText(text, containers) {
    let foundElement = null;
    const normalizedText = text.trim().toLowerCase();

    // Parcourt les menus jusqu'à trouver l'élément.
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

// Réinitialise l'affichage avec toutes les recettes.
function resetRecipes() {
    results = recipes;
    updateSearchResults(results);
    populateCards(results);
}

// Remplit un menu déroulant avec les options disponibles.
function updateDropdownOptions(dropdownNumber, options) {
    const dropdown = document.getElementById(`dd${dropdownNumber}-list`);

    // Arrête la fonction si le menu est introuvable.
    if (!dropdown) {
        console.error(`Dropdown dd${dropdownNumber}-list introuvable.`);
        return;
    }

    // Supprime les anciennes options.
    dropdown.innerHTML = '';

    // Crée et ajoute chaque nouvelle option.
    options.forEach(option => {
        const optionElement = document.createElement('p');
        const optionText = String(option).trim().toLowerCase();
        optionElement.textContent = optionText;
        optionElement.setAttribute('data-filter', optionText);

        // Sélectionne l'option au clic.
        optionElement.onclick = function () {
            selectItem(this);
        };

        dropdown.appendChild(optionElement);
    });
}