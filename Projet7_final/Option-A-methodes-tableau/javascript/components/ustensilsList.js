function getUniqueUstensils(sourceRecipes) {
    const uniqueUstensils = [];

    sourceRecipes.forEach(recipe => {
        recipe.ustensils
            .map(ustensil => ustensil.trim().toLowerCase())
            .forEach(ustensil => {
                if (!uniqueUstensils.some(existingUstensil => existingUstensil === ustensil)) {
                    uniqueUstensils.push(ustensil);
                }
            });
    });

    return uniqueUstensils;
}

const allUstensils = getUniqueUstensils(recipes);
const dd3ListContainer = document.querySelector('.dd3-list');

function renderUstensilOptions(options) {
    dd3ListContainer.innerHTML = '';

    options.forEach(ustensil => {
        const pElement = document.createElement('p');
        pElement.textContent = ustensil;
        pElement.setAttribute('data-filter', ustensil);
        pElement.onclick = function () {
            selectItem(this);
        };
        dd3ListContainer.appendChild(pElement);
    });
}

renderUstensilOptions(allUstensils);
