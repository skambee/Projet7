function getUniqueAppliances(sourceRecipes) {
    const uniqueAppliances = [];

    sourceRecipes
        .map(recipe => recipe.appliance.trim().toLowerCase())
        .forEach(appliance => {
            if (!uniqueAppliances.some(existingAppliance => existingAppliance === appliance)) {
                uniqueAppliances.push(appliance);
            }
        });

    return uniqueAppliances;
}

const allAppliances = getUniqueAppliances(recipes);
const dd2ListContainer = document.querySelector('.dd2-list');

function renderApplianceOptions(options) {
    dd2ListContainer.innerHTML = '';

    options.forEach(appliance => {
        const pElement = document.createElement('p');
        pElement.textContent = appliance;
        pElement.setAttribute('data-filter', appliance);
        pElement.onclick = function () {
            selectItem(this);
        };
        dd2ListContainer.appendChild(pElement);
    });
}

renderApplianceOptions(allAppliances);
