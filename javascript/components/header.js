// réinitialiser et fermer l'entrée avec l'icône en forme de croix

const searchInput = document.getElementById("search-input");
const searchClose = document.getElementById("search-close");

searchInput.addEventListener("input", function () {
    if (searchInput.value) {
        searchClose.style.display = "block";
    } else {
        searchClose.style.display = "none";
    }
});

searchClose.addEventListener("click", function () {
    searchInput.value = "";
    searchClose.style.display = "none";
});


// traiter l'arrière-plan de l'en-tête à positionnement absolu
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
  