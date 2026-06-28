---

id: US-006
epic: EPIC-02
title: Ajouter une entreprise
priority: Must
storyPoints: 5
status: Todo
sprint: Sprint-02
-----------------

# US-006 — Ajouter une entreprise

## Objectif

Permettre à un utilisateur connecté d'ajouter une entreprise afin de préparer une candidature.

## Description

En tant qu'utilisateur connecté, je souhaite ajouter une entreprise afin de suivre ma candidature dans CandiTrack.

## Dépendances

* US-001 — Création de compte
* US-002 — Connexion
* Backend local fonctionnel
* Authentification JWT fonctionnelle

## Wireframes obligatoires

* `docs/wireframes/create-company-mobile.png`
* `docs/wireframes/create-company-desktop.png`

## Mockups obligatoires

* `docs/mockups/create-company-mobile.png`
* `docs/mockups/create-company-desktop.png`

## Champs du formulaire

| Champ         | Obligatoire | Validation         |
| ------------- | ----------: | ------------------ |
| name          |         Oui | max 255 caractères |
| website       |         Non | URL valide         |
| email         |         Non | email valide       |
| phone         |         Non | texte              |
| city          |         Non | texte              |
| country       |         Non | texte              |
| categoryId    |         Non | UUID               |
| recruiterName |         Non | texte              |

## API

### POST `/api/v1/companies`

Body :

```json
{
  "name": "",
  "website": "",
  "email": "",
  "phone": "",
  "city": "",
  "country": "",
  "categoryId": "",
  "recruiterName": ""
}
```

Response :

```json
{
  "success": true,
  "data": {
    "id": "",
    "name": "",
    "status": "draft"
  }
}
```

## Base de données

Table : `companies`

Colonnes concernées :

* `user_id`
* `category_id`
* `name`
* `website`
* `email`
* `phone`
* `city`
* `country`
* `recruiter_name`
* `status`
* `created_at`
* `updated_at`

## Règles métier

* L'utilisateur doit être connecté.
* Une entreprise appartient toujours à l'utilisateur connecté.
* Le champ `name` est obligatoire.
* Le statut initial est `draft`.
* La création doit être protégée par JWT.
* Ne pas développer la génération IA dans cette US.

## Critères d'acceptation

### AC-01 — Création réussie

Given l'utilisateur est connecté
When il remplit correctement le formulaire
Then l'entreprise est créée avec le statut `draft`

### AC-02 — Nom manquant

Given le champ `name` est vide
When l'utilisateur valide le formulaire
Then une erreur est affichée

### AC-03 — Site invalide

Given le site web n'est pas une URL valide
When l'utilisateur valide le formulaire
Then une erreur est affichée

### AC-04 — Utilisateur non connecté

Given l'utilisateur n'est pas connecté
When il tente de créer une entreprise
Then l'API retourne une erreur `401`

## Frontend attendu

Créer ou compléter :

* `features/companies/types`
* `features/companies/services`
* `features/companies/hooks`
* `features/companies/components/CompanyForm`
* page ou modal d'ajout d'entreprise

Utiliser :

* React Hook Form
* Zod
* TanStack Query
* composants UI existants
* TailwindCSS
* design system pastel

## Backend attendu

Créer ou compléter :

* route `POST /api/v1/companies`
* controller company
* service company
* repository company
* validator Zod
* middleware auth JWT

## Tests attendus

Minimum :

* validation formulaire côté frontend
* création entreprise côté backend
* erreur si `name` vide
* erreur si JWT absent
* succès avec statut `draft`

## Hors périmètre

Ne pas développer :

* modification entreprise
* suppression entreprise
* détail entreprise
* résumé IA
* drag & drop
* dashboard complet

## Définition de Done

L'US est terminée lorsque :

* l'entreprise peut être créée depuis l'interface
* l'entreprise est enregistrée en base
* le statut initial est `draft`
* les erreurs sont affichées proprement
* l'API est protégée par JWT
* TypeScript ne retourne aucune erreur
* ESLint ne retourne aucune erreur
* les tests minimums sont présents ou listés
