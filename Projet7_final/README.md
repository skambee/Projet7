# Les Petits Plats — comparaison des performances

Ce dossier contient **deux façons de faire la même recherche** :

- **Option A** : utilise les méthodes de tableau comme `filter`, `map` et `some`.
- **Option B** : utilise surtout des boucles `for` et `while`.

Les deux options donnent les mêmes résultats. Le but du benchmark est simplement de voir laquelle travaille le plus vite.

## Lancer le test facilement

Aucune installation n'est nécessaire.

1. Ouvre le fichier **`BENCHMARK.html`** dans Chrome, Firefox ou Edge.
2. Clique sur **« Lancer le benchmark »**.
3. Attends la fin du test sans changer d'onglet.
4. Regarde la colonne **« opérations par seconde »** : le nombre le plus élevé gagne.

Tu peux relancer le test plusieurs fois. Le résultat peut légèrement changer selon l'ordinateur et le navigateur.

## Résultat obtenu

Sur les 50 recettes du projet et plusieurs recherches différentes :

> **L'Option B, avec les boucles, est la plus performante.**

Dans mes tests, elle était environ **17 % plus rapide en moyenne**. L'écart était surtout visible avec les filtres avancés. Pour certaines recherches simples, les deux options étaient très proches.

## Quel choix garder ?

Pour ce projet, je conseille de garder **l'Option B** :

- elle est généralement plus rapide ;
- elle peut arrêter la recherche dès qu'une correspondance est trouvée ;
- elle évite de créer plusieurs tableaux temporaires.

L'Option A reste plus courte et peut sembler plus facile à lire, mais elle réalise davantage d'opérations intermédiaires.

## Utiliser le site JSBEN.CH

Les fichiers suivants sont prêts :

- **`JSBENCH-SETUP.js`** : à coller dans la partie **Setup** de JSBEN.CH ;
- **`JSBENCH-BLOCS.md`** : contient les blocs Option A et Option B à copier dans les tests.

Le fichier **`BENCHMARK.html`** permet de faire la même comparaison localement, sans créer de compte et sans copier tout le code sur un site.

## Contenu du dossier

- `Option-A-methodes-tableau/` : version avec les méthodes de tableau ;
- `Option-B-boucles/` : version avec les boucles ;
- `BENCHMARK.html` : test automatique à ouvrir dans le navigateur ;
- `JSBENCH-SETUP.js` : préparation prête pour JSBEN.CH ;
- `JSBENCH-BLOCS.md` : petits blocs à comparer sur JSBEN.CH ;
- `RESULTATS-BENCHMARK.md` : détail des mesures déjà réalisées.
