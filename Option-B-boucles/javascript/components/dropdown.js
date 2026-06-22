const dropdown1 = document.querySelector('.dropdown1');
const dropdown2 = document.querySelector('.dropdown2');
const dropdown3 = document.querySelector('.dropdown3');
const visiblePart1 = document.querySelector('.dd1-visiblepart');
const visiblePart2 = document.querySelector('.dd2-visiblepart');
const visiblePart3 = document.querySelector('.dd3-visiblepart');
const dropdownArrow1 = document.getElementById('dropdownArrow1');
const dropdownArrow2 = document.getElementById('dropdownArrow2');
const dropdownArrow3 = document.getElementById('dropdownArrow3');

visiblePart1.addEventListener('click', function () {
    dropdownArrow1.classList.toggle('rotate180');
    dropdown1.classList.toggle('open');
});

visiblePart2.addEventListener('click', function () {
    dropdownArrow2.classList.toggle('rotate180');
    dropdown2.classList.toggle('open');
});

visiblePart3.addEventListener('click', function () {
    dropdownArrow3.classList.toggle('rotate180');
    dropdown3.classList.toggle('open');
});

function filterDropdownOptions(input, listContainer) {
    const inputValue = input.value.trim().toLowerCase();
    const options = listContainer.querySelectorAll('p');

    for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        const option = options[optionIndex];
        const optionText = option.textContent.trim().toLowerCase();
        option.style.display = optionText.includes(inputValue) ? 'flex' : 'none';
    }
}

const dd1Input = document.getElementById('dd1-input');
const dd2Input = document.getElementById('dd2-input');
const dd3Input = document.getElementById('dd3-input');

dd1Input.addEventListener('input', function () {
    filterDropdownOptions(dd1Input, document.getElementById('dd1-list'));
});

dd2Input.addEventListener('input', function () {
    filterDropdownOptions(dd2Input, document.getElementById('dd2-list'));
});

dd3Input.addEventListener('input', function () {
    filterDropdownOptions(dd3Input, document.getElementById('dd3-list'));
});
