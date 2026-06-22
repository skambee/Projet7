function getFilterValue(element) {
    return (element.getAttribute('data-filter') || element.textContent).trim().toLowerCase();
}

function selectItem(selectedElement) {
    const filterValue = getFilterValue(selectedElement);
    const isAlreadySelected = selectedFilters.some(filter => filter === filterValue);

    selectedFilters = isAlreadySelected
        ? selectedFilters.filter(filter => filter !== filterValue)
        : [...selectedFilters, filterValue];

    searchByFilters();
    renderSelectedFilters();
    updateSelectedVisuals();
}

function renderSelectedFilters() {
    selectedContainer.innerHTML = '';

    selectedFilters.forEach(filterValue => {
        const selectedItem = document.createElement('p');
        selectedItem.textContent = filterValue;
        selectedItem.classList.add('selected-item');
        selectedItem.setAttribute('data-filter', filterValue);
        selectedItem.appendChild(createCloseSvg(false));
        selectedItem.onclick = function () {
            selectItem(this);
        };
        selectedContainer.appendChild(selectedItem);
    });
}

function updateSelectedItemLayout(selectedElement) {
    const filterValue = getFilterValue(selectedElement);
    selectedElement.classList.add('selected');
    selectedElement.setAttribute('data-filter', filterValue);

    if (!selectedElement.querySelector('svg')) {
        selectedElement.appendChild(createCloseSvg(true));
    }
}

function removeSelectedItem(selectedElement) {
    const filterValue = getFilterValue(selectedElement);
    selectedFilters = selectedFilters.filter(filter => filter !== filterValue);
    searchByFilters();
    renderSelectedFilters();
    updateSelectedVisuals();
}

function resetPageState() {
    selectedFilters = [];
    searchInput.value = '';
    searchClose.style.display = 'none';
    results = recipes;
    updateSearchResults(results);
    populateCards(results);
    renderSelectedFilters();
}

function updateSelectedVisuals() {
    const dropdownContainers = [dd1ListContainer, dd2ListContainer, dd3ListContainer];

    dropdownContainers.forEach(container => {
        Array.from(container.querySelectorAll('p')).forEach(option => {
            const filterValue = getFilterValue(option);
            const isSelected = selectedFilters.some(filter => filter === filterValue);

            option.classList.toggle('selected', isSelected);
            option.setAttribute('data-filter', filterValue);

            const existingSvg = option.querySelector('svg');
            if (isSelected && !existingSvg) {
                option.appendChild(createCloseSvg(true));
            } else if (!isSelected && existingSvg) {
                existingSvg.remove();
            }
        });
    });
}

function createCloseSvg(forDropdown) {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    if (forDropdown) {
        svgElement.setAttribute('width', '17');
        svgElement.setAttribute('height', '17');
        svgElement.setAttribute('viewBox', '0 0 17 17');

        const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElement.setAttribute('cx', '8.5');
        circleElement.setAttribute('cy', '8.5');
        circleElement.setAttribute('r', '8.5');
        circleElement.setAttribute('fill', 'black');

        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', 'M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11');
        pathElement.setAttribute('stroke', '#FFD15B');
        pathElement.setAttribute('stroke-linecap', 'round');
        pathElement.setAttribute('stroke-linejoin', 'round');
        svgElement.appendChild(circleElement);
        svgElement.appendChild(pathElement);
    } else {
        svgElement.setAttribute('width', '14');
        svgElement.setAttribute('height', '13');
        svgElement.setAttribute('viewBox', '0 0 14 13');
        svgElement.setAttribute('fill', 'none');

        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', 'M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5');
        pathElement.setAttribute('stroke', '#1B1B1B');
        pathElement.setAttribute('stroke-width', '2.16667');
        pathElement.setAttribute('stroke-linecap', 'round');
        pathElement.setAttribute('stroke-linejoin', 'round');
        svgElement.appendChild(pathElement);
    }

    return svgElement;
}
