function getUniqueAppliances(sourceRecipes) {
    const uniqueAppliances = [];

    for (let recipeIndex = 0; recipeIndex < sourceRecipes.length; recipeIndex++) {
        const appliance = sourceRecipes[recipeIndex].appliance.trim().toLowerCase();

        if (!arrayContainsExactValue(uniqueAppliances, appliance)) {
            uniqueAppliances.push(appliance);
        }
    }

    return uniqueAppliances;
}

const allAppliances = getUniqueAppliances(recipes);
const dd2ListContainer = document.querySelector('.dd2-list');

function renderApplianceOptions(options) {
    dd2ListContainer.innerHTML = '';

    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        const appliance = options[optionIndex];
        const pElement = document.createElement('p');
        pElement.textContent = appliance;
        pElement.setAttribute('data-filter', appliance);
        pElement.onclick = function () {
            selectItem(this);
        };
        dd2ListContainer.appendChild(pElement);
    }
}

renderApplianceOptions(allAppliances);
