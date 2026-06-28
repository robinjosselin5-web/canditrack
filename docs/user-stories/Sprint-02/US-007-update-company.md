---

id: US-007
epic: EPIC-02
title: Modifier une entreprise
priority: Must
storyPoints: 3
status: Todo
sprint: Sprint-02
-----------------

# US-007 — Modifier une entreprise

## Objectif

Permettre à un utilisateur connecté de modifier les informations d'une entreprise déjà enregistrée.

## Description

En tant qu'utilisateur connecté, je souhaite modifier une entreprise afin de corriger ou compléter ses informations.

## Dépendances

* US-002 — Connexion utilisateur
* US-006 — Ajouter une entreprise
* US-022 — Afficher les entreprises ajoutées

## Écran concerné

Onglet :

```text
Entreprises
```

Action depuis une carte entreprise :

```text
Menu actions → Modifier l'entreprise
```

## API

### PATCH `/api/v1/companies/:id`

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
    "website": "",
    "email": "",
    "phone": "",
    "city": "",
    "country": "",
    "recruiterName": "",
    "status": "draft",
    "updatedAt": ""
  }
}
```

## Règles métier

* L'utilisateur doit être connecté.
* L'utilisateur ne peut modifier que ses propres entreprises.
* Le champ `id` ne doit jamais être modifiable.
* Le champ `userId` ne doit jamais être modifiable.
* Le champ `status` ne doit pas être modifié dans cette US.
* `name`, `website` et `email` sont obligatoires.
* `website` accepte `monsite.com`, `www.monsite.com`, `https://monsite.com`, `http://monsite.com`.
* Si le protocole est absent, le backend enregistre automatiquement en `https://`.
* `categoryId` est optionnel.
* Les champs optionnels vides doivent être enregistrés en `null` ou ignorés.
* Après modification, la liste des entreprises doit être rafraîchie.

## Champs du formulaire

| Champ         | Obligatoire | Validation            |
| ------------- | ----------: | --------------------- |
| name          |         Oui | 1 à 255 caractères    |
| website       |         Oui | domaine ou URL valide |
| email         |         Oui | email valide          |
| phone         |         Non | max 50 caractères     |
| city          |         Non | max 100 caractères    |
| country       |         Non | max 100 caractères    |
| categoryId    |         Non | UUID si présent       |
| recruiterName |         Non | max 150 caractères    |

## Critères d'acceptation

### AC-01 — Ouverture du formulaire

Given une entreprise est affichée sur une carte
When l'utilisateur clique sur `Modifier l'entreprise`
Then le formulaire de modification s'ouvre avec les données existantes

### AC-02 — Modification réussie

Given l'utilisateur modifie des informations valides
When il valide le formulaire
Then l'entreprise est mise à jour

### AC-03 — Rafraîchissement de la liste

Given la modification est réussie
When l'API répond
Then la carte affiche les nouvelles informations

### AC-04 — Validation des champs obligatoires

Given `name`, `website` ou `email` est vide
When l'utilisateur valide
Then une erreur est affichée sous le champ concerné

### AC-05 — URL sans protocole

Given l'utilisateur saisit `monsite.com`
When il valide
Then l'entreprise est enregistrée avec `https://monsite.com`

### AC-06 — Isolation utilisateur

Given une entreprise appartient à un autre utilisateur
When l'utilisateur tente de la modifier
Then l'API retourne `403` ou `404`

## Frontend attendu

Créer ou compléter :

* `features/companies/services/company.service.ts`
* `features/companies/hooks/useUpdateCompany.ts`
* `features/companies/components/CompanyForm`
* `features/companies/components/CompanyCard`
* `features/companies/pages/CompaniesPage`

Réutiliser le formulaire de US-006 si possible.

Le formulaire doit fonctionner en deux modes :

```text
create
update
```

## Backend attendu

Créer ou compléter :

* route `PATCH /api/v1/companies/:id`
* controller company
* service company
* repository company
* validator Zod
* vérification propriétaire via JWT

## États UI

### Loading

Bouton désactivé pendant la modification.

### Success

Toast :

```text
Entreprise modifiée avec succès.
```

### Error

Afficher les erreurs sous les champs concernés.

## Hors périmètre

Ne pas développer :

* suppression entreprise
* détail entreprise
* modification du statut
* résumé IA
* favoris
* drag & drop

## Tests attendus

Minimum :

* ouverture du formulaire prérempli
* validation champs obligatoires
* modification réussie
* URL sans protocole normalisée en `https://`
* refus si entreprise d'un autre utilisateur
* rafraîchissement de la liste après succès

## Définition de Done

L'US est terminée lorsque :

* l'utilisateur peut modifier une entreprise depuis sa carte
* les champs sont préremplis
* les validations fonctionnent
* les erreurs sont affichées proprement
* la liste est rafraîchie après modification
* l'utilisateur ne peut modifier que ses entreprises
* TypeScript ne retourne aucune erreur
* ESLint ne retourne aucune erreur
