# US-010 - Ajouter une entreprise aux favoris

## Objectif

Permettre à l'utilisateur d'ajouter ou retirer une entreprise de ses favoris depuis la liste des entreprises.

## Règles

- Utiliser l'icône cœur déjà présente si elle existe.
- Ne pas refaire le design global.
- Ne pas modifier les fonctionnalités existantes.
- Modifier uniquement les fichiers nécessaires.
- Respecter l'architecture actuelle.

## Comportement attendu

- Chaque carte entreprise affiche une icône cœur.
- Clic sur le cœur :
  - ajoute l'entreprise aux favoris si elle ne l'est pas
  - retire l'entreprise des favoris si elle l'est déjà
- Le changement est visible immédiatement dans l'interface.
- L'état favori reste cohérent après rechargement de la page si l'API/le modèle le permet déjà.

## Backend

Si le champ favori existe déjà :
- réutiliser le champ existant.

Sinon :
- ajouter un champ booléen simple sur l'entreprise :
  - `isFavorite`
  - valeur par défaut : `false`

Ajouter ou réutiliser une route pour modifier uniquement ce champ.

Exemple attendu :

PATCH /companies/:id/favorite

Body :
{
  "isFavorite": true
}

## Frontend

Sur la carte entreprise :

- afficher un cœur vide si `isFavorite === false`
- afficher un cœur plein si `isFavorite === true`
- au clic :
  - appeler l'API
  - mettre à jour l'état local
  - ne pas recharger toute la page

## Critères d'acceptation

- Je vois une icône cœur sur chaque carte entreprise.
- Je peux ajouter une entreprise aux favoris.
- Je peux retirer une entreprise des favoris.
- L'état visuel du cœur change immédiatement.
- Le favori est sauvegardé.
- Aucun autre comportement de la carte n'est cassé.