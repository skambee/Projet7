# Blocs à copier dans JSBEN.CH

Commence par coller tout le fichier `JSBENCH-SETUP.js` dans la zone **Setup**.

Laisse la zone **Boilerplate** vide.

## Test 1 — recherche principale

### Bloc Option A

```js
benchResult = filterRecipesByMainSearchA(
    recipes,
    searchTermBench
).length;
```

### Bloc Option B

```js
benchResult = filterRecipesByMainSearchB(
    recipes,
    searchTermBench
).length;
```

Avec le mot `coco`, les deux options doivent trouver **6 recettes**.

## Test 2 — filtres avancés

### Bloc Option A

```js
benchResult = filterRecipesBySelectedFiltersA(
    recipes,
    selectedFiltersBench
).length;
```

### Bloc Option B

```js
benchResult = filterRecipesBySelectedFiltersB(
    recipes,
    selectedFiltersBench
).length;
```

Avec `tomate` et `couteau`, les deux options doivent trouver **9 recettes**.

## Test 3 — recherche complète

### Bloc Option A

```js
benchResult = filterRecipesBySelectedFiltersA(
    filterRecipesByMainSearchA(recipes, "tom"),
    ["couteau"]
).length;
```

### Bloc Option B

```js
benchResult = filterRecipesBySelectedFiltersB(
    filterRecipesByMainSearchB(recipes, "tom"),
    ["couteau"]
).length;
```

Les deux options doivent trouver **9 recettes**.

## Lire le résultat

Le nombre le plus élevé est le meilleur : il indique que le code a été exécuté davantage de fois pendant le test.

Relance chaque comparaison au moins cinq fois dans le même navigateur. Un petit écart peut être dû à l'ordinateur ou aux autres logiciels ouverts.
