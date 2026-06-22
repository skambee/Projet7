
// Récupère et normalise la valeur d'un filtre.
function getFilterValue(element) {
    return (element.getAttribute('data-filter') || element.textContent).trim().toLowerCase();
}

// Recherche la position d'un filtre sélectionné.
function findFilterIndex(filterValue) {
    // Parcourt la liste des filtres.
    for (let filterIndex = 0; filterIndex < selectedFilters.length; filterIndex++) {
        // Retourne la position du filtre trouvé.
        if (selectedFilters[filterIndex] === filterValue) {
            return filterIndex;
        }
    }

    // Indique que le filtre n'a pas été trouvé.
    return -1;
}

// Ajoute ou retire un filtre sélectionné.
function selectItem(selectedElement) {
    const filterValue = getFilterValue(selectedElement);
    const existingIndex = findFilterIndex(filterValue);

    // Ajoute le filtre s'il n'est pas sélectionné.
    if (existingIndex === -1) {
        selectedFilters.push(filterValue);
    } else {
        // Retire le filtre s'il est déjà sélectionné.
        selectedFilters.splice(existingIndex, 1);
    }

    // Actualise les résultats et l'affichage.
    searchByFilters();
    renderSelectedFilters();
    updateSelectedVisuals();
}

// Affiche les filtres sélectionnés.
function renderSelectedFilters() {
    // Supprime l'ancien affichage.
    selectedContainer.innerHTML = '';

    // Parcourt les filtres sélectionnés.
    for (let filterIndex = 0; filterIndex < selectedFilters.length; filterIndex++) {
        const filterValue = selectedFilters[filterIndex];
        const selectedItem = document.createElement('p');
        selectedItem.textContent = filterValue;
        selectedItem.classList.add('selected-item');
        selectedItem.setAttribute('data-filter', filterValue);
        selectedItem.appendChild(createCloseSvg(false));

        // Retire le filtre au clic.
        selectedItem.onclick = function () {
            selectItem(this);
        };
        selectedContainer.appendChild(selectedItem);
    }
}

// Modifie l'apparence d'un filtre sélectionné.
function updateSelectedItemLayout(selectedElement) {
    const filterValue = getFilterValue(selectedElement);
    selectedElement.classList.add('selected');
    selectedElement.setAttribute('data-filter', filterValue);

    // Ajoute l'icône si elle n'existe pas.
    if (!selectedElement.querySelector('svg')) {
        selectedElement.appendChild(createCloseSvg(true));
    }
}

// Supprime un filtre sélectionné.
function removeSelectedItem(selectedElement) {
    const filterValue = getFilterValue(selectedElement);
    const filterIndex = findFilterIndex(filterValue);

    // Retire le filtre s'il existe.
    if (filterIndex !== -1) {
        selectedFilters.splice(filterIndex, 1);
    }

    // Actualise les résultats et l'affichage.
    searchByFilters();
    renderSelectedFilters();
    updateSelectedVisuals();
}

// Réinitialise la recherche et les filtres.
function resetPageState() {
    selectedFilters = [];
    searchInput.value = '';
    searchClose.style.display = 'none';
    results = recipes;

    // Réaffiche toutes les recettes.
    updateSearchResults(results);
    populateCards(results);
    renderSelectedFilters();
}

// Met à jour l'apparence des options sélectionnées.
function updateSelectedVisuals() {
    const dropdownContainers = [dd1ListContainer, dd2ListContainer, dd3ListContainer];

    // Parcourt les menus déroulants.
    for (let containerIndex = 0; containerIndex < dropdownContainers.length; containerIndex++) {
        const options = dropdownContainers[containerIndex].querySelectorAll('p');
        let optionIndex = 0;

        // Parcourt les options du menu.
        while (optionIndex < options.length) {
            const option = options[optionIndex];
            const filterValue = getFilterValue(option);
            const isSelected = findFilterIndex(filterValue) !== -1;
            const existingSvg = option.querySelector('svg');

            // Applique l'état visuel du filtre.
            option.classList.toggle('selected', isSelected);
            option.setAttribute('data-filter', filterValue);

            // Ajoute ou retire l'icône de fermeture.
            if (isSelected && !existingSvg) {
                option.appendChild(createCloseSvg(true));
            } else if (!isSelected && existingSvg) {
                existingSvg.remove();
            }
            optionIndex++;
        }
    }
}

// Crée une icône SVG de fermeture.
function createCloseSvg(forDropdown) {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    // Crée l'icône des menus déroulants.
    if (forDropdown) {
        svgElement.setAttribute('width', '17');
        svgElement.setAttribute('height', '17');
        svgElement.setAttribute('viewBox', '0 0 17 17');

        // Crée le fond rond.
        const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElement.setAttribute('cx', '8.5');
        circleElement.setAttribute('cy', '8.5');
        circleElement.setAttribute('r', '8.5');
        circleElement.setAttribute('fill', 'black');

        // Crée la croix de fermeture.
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', 'M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11');
        pathElement.setAttribute('stroke', '#FFD15B');
        pathElement.setAttribute('stroke-linecap', 'round');
        pathElement.setAttribute('stroke-linejoin', 'round');
        svgElement.appendChild(circleElement);
        svgElement.appendChild(pathElement);
    } else {
        // Crée l'icône des filtres affichés.
        svgElement.setAttribute('width', '14');
        svgElement.setAttribute('height', '13');
        svgElement.setAttribute('viewBox', '0 0 14 13');
        svgElement.setAttribute('fill', 'none');

        // Crée la croix de fermeture.
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', 'M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5');
        pathElement.setAttribute('stroke', '#1B1B1B');
        pathElement.setAttribute('stroke-width', '2.16667');
        pathElement.setAttribute('stroke-linecap', 'round');
        pathElement.setAttribute('stroke-linejoin', 'round');
        svgElement.appendChild(pathElement);
    }

    // Retourne l'icône créée.
    return svgElement;
}

