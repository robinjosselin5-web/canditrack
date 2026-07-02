---

id: US-009
epic: EPIC-02
title: Consulter une entreprise
priority: Must
storyPoints: 3
status: Todo
sprint: Sprint-02
-----------------

# US-009 — Consulter une entreprise

## Objectif

Permettre à un utilisateur connecté de consulter la fiche détaillée d'une entreprise.

## Dépendances

* US-002
* US-006
* US-022

## Écran

Route :

`/companies/:id`

Accès :

Cliquer n'importe où sur la CompanyCard ouvre la fiche de l'entreprise.

Exceptions :

- le bouton Favori
- le menu d'actions (...)

Ces deux éléments ne doivent pas déclencher la navigation.
## API

### GET `/api/v1/companies/:id`

Réponse :

```json id="cfmrwd"
{
  "success": true,
  "data": {
    "id": "",
    "name": "",
    "website": "",
    "email": "",
    "phone": "",
    "city": "",
    "country": "",
    "recruiterName": "",
    "status": "draft",
    "createdAt": "",
    "updatedAt": ""
  }
}
```

## Règles métier

* JWT obligatoire.
* L'utilisateur ne consulte que ses entreprises.
* Si l'entreprise n'existe pas : 404.
* Les champs optionnels absents ne doivent jamais afficher undefined.
* Un clic sur la carte ouvre la fiche de l'entreprise.
* Les boutons Favori et Menu d'actions empêchent la propagation du clic.
* Toute la surface de la CompanyCard est cliquable.
* Un clic sur une CompanyCard ouvre la page de détail de l'entreprise.
* Les boutons interactifs présents sur la carte (Favori et Menu d'actions) ne doivent pas déclencher la navigation.
* Les boutons interactifs doivent empêcher la propagation de l'événement (`stopPropagation`).
* La navigation se fait vers :

/companies/:id

# Wireframes

Mobile

```
../docs/wireframes/company-details-mobile.png
```

Desktop

```
../docs/wireframes/company-details-desktop.png
```

---

# Mockups

Mobile

```
../docs/mockups/company-details-mobile.png
```

Desktop

```
../docs/mockups/company-details-desktop.png
```

## Données affichées

Afficher :

* nom
* statut
* site web
* email
* téléphone
* ville
* pays
* recruteur
* date de création
* date de dernière modification

## Critères d'acceptation

### AC-01

Given une entreprise existe

When l'utilisateur ouvre sa fiche

Then toutes les informations sont affichées

### AC-02

Given un champ est vide

When la fiche est affichée

Then aucune valeur `undefined` ou `null` n'est visible

### AC-03

Given l'entreprise appartient à un autre utilisateur

When la page est ouverte

Then l'API retourne `403` ou `404`

### AC-04

Given une erreur API

When la page charge

Then un message lisible est affiché

### AC-05

Given une entreprise est affichée sous forme de carte

When l'utilisateur clique sur la carte

Then il est redirigé vers :

/companies/:id

### AC-06

Given l'utilisateur clique sur le bouton Favori

When le clic est effectué

Then aucune navigation n'est déclenchée

### AC-07

Given l'utilisateur clique sur le menu d'actions (...)

When le clic est effectué

Then aucune navigation n'est déclenchée

## Frontend

Créer ou compléter :

* CompanyCard
* CompanyDetailsPage
* useCompany
* company.service.ts

CompanyCard doit être entièrement cliquable.

Les composants suivants ne doivent pas déclencher la navigation :

* bouton Favori
* menu d'actions

Utiliser :

* AppLayout
* Card
* Badge
* Loader
* Alert

CompanyCard doit être entièrement cliquable.

Navigation :

* clic sur la carte → CompanyDetailsPage

Ne doivent jamais déclencher la navigation :

* bouton Favori
* menu d'actions (...)

Utiliser stopPropagation() sur les composants interactifs.

## Backend

Créer ou compléter :

* GET `/api/v1/companies/:id`
* controller
* service
* repository
* vérification propriétaire

## États UI

* loading
* success
* error

## Hors périmètre

Ne pas développer :

* modification
* suppression
* favoris
* notes
* résumé IA
* drag & drop

## Tests minimum

* récupération entreprise
* entreprise inexistante
* autre utilisateur
* affichage loading
* affichage erreur

## Done

* fiche entreprise fonctionnelle
* données affichées
* aucun `undefined`
* TypeScript OK
* ESLint OK
