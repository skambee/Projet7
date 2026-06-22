function getUniqueUstensils(sourceRecipes) {
    const uniqueUstensils = [];

    for (let recipeIndex = 0; recipeIndex < sourceRecipes.length; recipeIndex++) {
        const ustensils = sourceRecipes[recipeIndex].ustensils;
        let ustensilIndex = 0;

        while (ustensilIndex < ustensils.length) {
            const ustensil = ustensils[ustensilIndex].trim().toLowerCase();

            if (!arrayContainsExactValue(uniqueUstensils, ustensil)) {
                uniqueUstensils.push(ustensil);
            }
            ustensilIndex++;
        }
    }

    return uniqueUstensils;
}

const allUstensils = getUniqueUstensils(recipes);
const dd3ListContainer = document.querySelector('.dd3-list');

function renderUstensilOptions(options) {
    dd3ListContainer.innerHTML = '';

    let optionIndex = 0;
    while (optionIndex < options.length) {
        const ustensil = options[optionIndex];
        const pElement = document.createElement('p');
        pElement.textContent = ustensil;
        pElement.setAttribute('data-filter', ustensil);
        pElement.onclick = function () {
            selectItem(this);
        };
        dd3ListContainer.appendChild(pElement);
        optionIndex++;
    }
}

renderUstensilOptions(allUstensils);
