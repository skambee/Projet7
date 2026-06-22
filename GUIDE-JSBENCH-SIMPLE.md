# Guide simple et détaillé — comparer les options A et B sur JSBEN.CH

Ce guide utilise directement les fichiers du projet. Il n’y a **aucun fichier Setup préparé** à importer ou à copier.

Tu vas seulement utiliser :

- le fichier de données `recipes.js` ;
- la partie marquée de `mainSearch.js` dans l’Option A ;
- la partie marquée de `mainSearch.js` dans l’Option B ;
- deux petits blocs de test dans JSBEN.CH.

---

## 1. Ce que le benchmark doit comparer

### Option A — méthodes de tableau

La recherche repose sur :

- `filter()` ;
- `map()` ;
- `every()` ;
- `some()`.

Le projet emploie aussi `forEach()` pour certaines opérations d’affichage. Il ne faut pas inclure l’affichage dans ce benchmark, car cela mesurerait le DOM plutôt que l’algorithme de recherche.

### Option B — boucles

La recherche repose sur :

- `for` ;
- `while` ;
- `break` ;
- des retours anticipés avec `return`.

Les deux options doivent toujours retourner les mêmes recettes. Seule la manière de parcourir les données change.

---

## 2. Les fichiers à utiliser

### Données communes

Tu peux prendre `recipes.js` dans l’une ou l’autre option, car son contenu est identique :

```text
Option-A-methodes-tableau/javascript/data/recipes.js
```

### Fonctions de l’Option A

```text
Option-A-methodes-tableau/javascript/logic/mainSearch.js
```

Dans ce fichier, copie uniquement la partie située entre :

```js
// === DÉBUT DU CODE À COPIER DANS JSBEN.CH — OPTION A ===
```

et :

```js
// === FIN DU CODE À COPIER DANS JSBEN.CH — OPTION A ===
```

### Fonctions de l’Option B

```text
Option-B-boucles/javascript/logic/mainSearch.js
```

Dans ce fichier, copie uniquement la partie située entre :

```js
// === DÉBUT DU CODE À COPIER DANS JSBEN.CH — OPTION B ===
```

et :

```js
// === FIN DU CODE À COPIER DANS JSBEN.CH — OPTION B ===
```

Ces marqueurs évitent de copier les fonctions liées au HTML, aux cartes et aux menus déroulants.

---

# Partie 1 — benchmark de la recherche principale

## Étape 1 — ouvrir JSBEN.CH

Ouvre JSBEN.CH et crée un nouveau benchmark.

Titre conseillé :

```text
Projet 7 - Recherche principale - Option A contre Option B
```

## Étape 2 — remplir le Setup block

Le `Setup block` contient les données et les fonctions nécessaires aux deux tests. Ce code prépare le test, mais ne doit pas représenter le travail mesuré.

Effectue les opérations dans cet ordre.

### 2.1 Copier les recettes

1. Ouvre `Option-A-methodes-tableau/javascript/data/recipes.js`.
2. Sélectionne tout le fichier.
3. Copie-le.
4. Colle-le dans le `Setup block` de JSBEN.CH.

Le Setup commence alors par :

```js
const recipes = [
```

et se termine par :

```js
];
```

### 2.2 Copier les fonctions A

1. Ouvre le `mainSearch.js` de l’Option A.
2. Repère les marqueurs « DÉBUT » et « FIN ».
3. Copie uniquement le code compris entre ces deux marqueurs.
4. Colle-le sous le tableau `recipes` dans le `Setup block`.

Tu dois notamment obtenir les fonctions :

```js
filterRecipesByMainSearchA()
filterRecipesBySelectedFiltersA()
```

### 2.3 Copier les fonctions B

Fais la même opération avec le `mainSearch.js` de l’Option B.

Tu dois notamment obtenir :

```js
filterRecipesByMainSearchB()
filterRecipesBySelectedFiltersB()
```

Les deux petites fonctions auxiliaires de l’Option B doivent également être copiées, car elles se trouvent entre les marqueurs :

```js
recipeMatchesMainSearchB()
recipeMatchesOneFilterB()
```

### 2.4 Ajouter les variables de test

Tout en bas du `Setup block`, ajoute seulement :

```js
var benchResult;
var searchTermBench = "coco";
var selectedFiltersBench = ["tomate", "couteau"];
```

À ce stade, ton Setup contient donc :

1. les recettes ;
2. les fonctions A ;
3. les fonctions B ;
4. les trois variables de test.

## Étape 3 — laisser le Boilerplate block vide

Ne mets rien dans le `Boilerplate block`.

Le but est que chaque bloc mesuré ne contienne que l’appel de la fonction recherchée.

## Étape 4 — créer le bloc de l’Option A

Titre conseillé :

```text
Option A - filter map some
```

Code :

```js
benchResult = filterRecipesByMainSearchA(
    recipes,
    searchTermBench
).length;
```

## Étape 5 — créer le bloc de l’Option B

Titre conseillé :

```text
Option B - for while break
```

Code :

```js
benchResult = filterRecipesByMainSearchB(
    recipes,
    searchTermBench
).length;
```

## Étape 6 — lancer le benchmark

Lance le test.

La valeur la plus élevée correspond à la version que JSBEN.CH a pu exécuter le plus souvent pendant la durée du test.

Avec `searchTermBench = "coco"`, les deux fonctions doivent trouver **6 recettes**. Ce nombre ne sera pas forcément affiché par JSBEN.CH, mais il permet de vérifier la cohérence du scénario dans le projet ou dans la console.

## Étape 7 — recommencer plusieurs fois

Lance le benchmark au moins cinq fois dans le même navigateur.

Évite pendant le test :

- de changer d’onglet ;
- de lancer un téléchargement ;
- d’ouvrir un logiciel lourd ;
- de comparer un résultat Chrome avec un résultat Firefox comme s’il s’agissait du même test.

Un petit écart peut changer d’un lancement à l’autre. Il vaut mieux observer une tendance que se fier à une seule mesure.

---

## 3. Tester plusieurs recherches

Modifie uniquement cette ligne en bas du Setup :

```js
var searchTermBench = "coco";
```

Scénarios simples :

### Recherche avec plusieurs résultats

```js
var searchTermBench = "coco";
```

### Recherche plus fréquente

```js
var searchTermBench = "four";
```

### Recherche dans plusieurs champs

```js
var searchTermBench = "tomate";
```

### Aucun résultat

```js
var searchTermBench = "zzz";
```

Les deux blocs doivent toujours utiliser exactement la même variable `searchTermBench`.

Ne change pas le code de l’Option A sans faire le changement équivalent dans l’Option B.

---

# Partie 2 — benchmark des filtres avancés

Il est préférable de créer un second benchmark séparé. Ainsi, tu ne mélanges pas la recherche principale et la recherche par filtres.

Titre conseillé :

```text
Projet 7 - Filtres avancés - Option A contre Option B
```

Le `Setup block` reste le même et le `Boilerplate block` reste vide.

## Bloc Option A

Titre :

```text
Option A - filter every map some
```

Code :

```js
benchResult = filterRecipesBySelectedFiltersA(
    recipes,
    selectedFiltersBench
).length;
```

## Bloc Option B

Titre :

```text
Option B - for while break
```

Code :

```js
benchResult = filterRecipesBySelectedFiltersB(
    recipes,
    selectedFiltersBench
).length;
```

## Modifier les filtres testés

Modifie cette ligne en bas du Setup :

```js
var selectedFiltersBench = ["tomate", "couteau"];
```

Scénarios conseillés :

### Un filtre avec beaucoup de résultats

```js
var selectedFiltersBench = ["four"];
```

### Deux filtres compatibles

```js
var selectedFiltersBench = ["tomate", "couteau"];
```

### Un filtre plus précis

```js
var selectedFiltersBench = ["lait de coco"];
```

### Aucun résultat

```js
var selectedFiltersBench = ["élément inexistant"];
```

Les filtres sont combinés avec une logique **ET** : pour rester dans les résultats, une recette doit correspondre à chacun des filtres du tableau.

Avec `["tomate", "couteau"]`, les deux options doivent retourner **9 recettes**.

---

# Partie 3 — test facultatif du fonctionnement complet

Le site applique d’abord la recherche principale, puis les filtres sur les recettes restantes.

Tu peux créer un troisième benchmark pour reproduire ce fonctionnement.

## Option A

```js
benchResult = filterRecipesBySelectedFiltersA(
    filterRecipesByMainSearchA(recipes, searchTermBench),
    selectedFiltersBench
).length;
```

## Option B

```js
benchResult = filterRecipesBySelectedFiltersB(
    filterRecipesByMainSearchB(recipes, searchTermBench),
    selectedFiltersBench
).length;
```

Scénario conseillé :

```js
var searchTermBench = "tom";
var selectedFiltersBench = ["couteau"];
```

Ce test est utile pour illustrer le fonctionnement réel du site, mais les deux premiers benchmarks sont plus faciles à expliquer pendant une soutenance.

---

# 4. Ce qu’il ne faut pas copier dans JSBEN.CH

Ne copie pas :

```js
searchInput.addEventListener(...)
refreshSearchResults()
updateSearchResults()
populateCards()
updateDropdownOptions()
```

Ces fonctions travaillent avec le DOM ou l’affichage. Elles rendraient le résultat plus difficile à interpréter et pourraient provoquer des erreurs, car JSBEN.CH ne possède pas la page HTML de ton projet.

Ne copie pas non plus :

- `index.html` ;
- `styles.css` ;
- les images ;
- les fonctions de création des cartes ;
- les fonctions d’ouverture des menus déroulants.

Pour ce benchmark, seuls les **données** et les **algorithmes purs de recherche** sont nécessaires.

---

# 5. Comment lire les résultats simplement

JSBEN.CH exécute chaque bloc de nombreuses fois.

- Une valeur plus élevée signifie que le bloc a réalisé davantage d’exécutions pendant le test.
- Une différence faible ne suffit pas à prouver qu’une méthode est toujours meilleure.
- Le résultat dépend du navigateur, de l’ordinateur et du scénario de recherche.
- Avec seulement 50 recettes, les écarts peuvent être petits et variables.

Exemple de formulation prudente :

> Sur ce scénario et dans ce navigateur, l’Option B a effectué davantage d’opérations par seconde que l’Option A. Les deux versions retournent les mêmes recettes, mais la différence reste liée au jeu de données et à l’environnement du test.

Si l’Option A passe devant :

> Sur ce scénario et dans ce navigateur, les méthodes de tableau ont obtenu le meilleur résultat. Cela ne signifie pas qu’elles seront systématiquement plus rapides dans tous les contextes.

Si les résultats sont proches :

> Les deux implémentations présentent des performances proches sur les 50 recettes du projet. Le choix peut donc aussi prendre en compte la lisibilité et la maintenabilité du code.

---

# 6. Présentation simple pendant la soutenance

Tu peux expliquer la démarche ainsi :

> J’ai isolé les fonctions de recherche afin de ne pas mesurer la création du DOM. J’ai utilisé le même tableau de 50 recettes, le même terme et les mêmes filtres pour les deux algorithmes. L’Option A utilise les méthodes de tableau `filter`, `map`, `every` et `some`. L’Option B utilise des boucles `for`, `while` et des arrêts anticipés avec `break`. J’ai vérifié que les deux versions retournent les mêmes résultats avant de comparer leurs performances sur plusieurs lancements.

---

# 7. Résumé des deux benchmarks essentiels

## Recherche principale

Option A :

```js
benchResult = filterRecipesByMainSearchA(recipes, searchTermBench).length;
```

Option B :

```js
benchResult = filterRecipesByMainSearchB(recipes, searchTermBench).length;
```

## Filtres

Option A :

```js
benchResult = filterRecipesBySelectedFiltersA(recipes, selectedFiltersBench).length;
```

Option B :

```js
benchResult = filterRecipesBySelectedFiltersB(recipes, selectedFiltersBench).length;
```

Le reste du code vient directement des fichiers `recipes.js` et `mainSearch.js` des deux options.
