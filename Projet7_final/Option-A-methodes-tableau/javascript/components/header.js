// Gestion du champ de recherche principal et de son bouton de réinitialisation.
const searchInput = document.getElementById("search-input");
const searchClose = document.getElementById("search-close");

searchInput.addEventListener("input", function () {
    searchClose.style.display = searchInput.value ? "block" : "none";
});

searchClose.addEventListener("click", function () {
    searchInput.value = "";
    searchClose.style.display = "none";

    // Déclenche la même mise à jour que lorsque l'utilisateur efface le texte.
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
});

// Ajuste la hauteur du conteneur à celle de l'image d'arrière-plan.
function setContainerHeight() {
    const backgroundImage = document.querySelector('.background-img');
    const containerHeader = document.querySelector('.container-header');

    if (backgroundImage && containerHeader) {
        const imageHeight = backgroundImage.clientHeight;
        containerHeader.style.height = `${imageHeight}px`;
    }
}

document.addEventListener('DOMContentLoaded', setContainerHeight);
window.addEventListener('resize', setContainerHeight);
