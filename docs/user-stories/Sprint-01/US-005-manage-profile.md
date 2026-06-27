---
id: US-005
epic: EPIC-01
title: Gestion du profil utilisateur
priority: Should
storyPoints: 3
status: Todo
sprint: Sprint-01
author: Product Owner
version: 1.0
---

# US-005 — Gestion du profil utilisateur

## Objectif

Permettre à un utilisateur connecté de consulter et modifier les informations de son profil afin de maintenir ses informations personnelles à jour.

Cette User Story clôture l'EPIC Authentification en donnant à l'utilisateur le contrôle sur son compte.

---

# Description

**En tant qu'** utilisateur connecté

**Je souhaite** consulter et modifier mon profil

**Afin de** mettre à jour mes informations personnelles.

---

# Valeur métier

Un utilisateur doit pouvoir gérer lui-même ses informations personnelles sans intervention d'un administrateur.

Cette fonctionnalité améliore l'autonomie et la confiance dans l'application.

---

# Priorité

Should Have

---

# Story Points

3

---

# Dépendances

- US-001 — Création d'un compte
- US-002 — Connexion

---

# Wireframes

Mobile

```
docs/wireframes/Sprint-01/profile-mobile.png
```

Desktop

```
docs/wireframes/Sprint-01/profile-desktop.png
```

---

# Mockups

Mobile

```
docs/mockups/Sprint-01/profile-mobile.png
```

Desktop

```
docs/mockups/Sprint-01/profile-desktop.png
```

---

# Écran concerné

Profil utilisateur

---

# Acteur

Utilisateur connecté

---

# Parcours utilisateur

1.

L'utilisateur ouvre son profil.

↓

2.

Les informations sont affichées.

↓

3.

Il modifie un ou plusieurs champs.

↓

4.

Il clique sur

**Enregistrer**.

↓

5.

Les informations sont validées.

↓

6.

Le profil est mis à jour.

↓

7.

Un message de confirmation est affiché.

---

# Champs du formulaire

Prénom

Obligatoire

Maximum 100 caractères.

---

Nom

Obligatoire

Maximum 100 caractères.

---

Adresse e-mail

Obligatoire

Format valide.

Unique.

---

Photo de profil

Optionnelle.

Formats autorisés :

- JPG
- PNG
- WEBP

Taille maximale :

5 MB.

---

# Critères d'acceptation

## AC-01

Given

L'utilisateur est connecté.

When

Il ouvre son profil.

Then

Ses informations sont affichées.

---

## AC-02

Given

L'utilisateur modifie son prénom.

When

Il enregistre.

Then

Le prénom est mis à jour.

---

## AC-03

Given

L'utilisateur modifie son adresse e-mail.

When

L'adresse est déjà utilisée.

Then

Une erreur est affichée.

---

## AC-04

Given

Les informations sont valides.

When

L'utilisateur clique sur

Enregistrer.

Then

Le profil est mis à jour.

---

## AC-05

Given

La mise à jour est terminée.

When

Le serveur répond.

Then

Un message de confirmation est affiché.

---

# Règles métier

Un utilisateur ne peut modifier que son propre profil.

Une adresse e-mail doit rester unique.

Les informations sont sauvegardées immédiatement après validation.

Le changement d'adresse e-mail ne modifie pas les données des candidatures existantes.

---

# Validation

Validation réalisée :

- Frontend
- Backend

Tous les champs obligatoires doivent être renseignés.

---

# Sécurité

Un utilisateur ne peut accéder qu'à son propre profil.

Toutes les requêtes nécessitent un JWT valide.

La photo est analysée avant stockage.

---

# API concernées

## GET

```
/api/v1/users/me
```

Retourne les informations du profil.

---

## PATCH

```
/api/v1/users/me
```

Body

```json
{
    "firstname": "",
    "lastname": "",
    "email": ""
}
```

---

## POST

```
/api/v1/users/me/avatar
```

Multipart/form-data

Champ

```
file
```

---

# Base de données

Table concernée

```
users
```

Colonnes utilisées

- firstname
- lastname
- email

Évolution recommandée

```
avatar_url
```

---

# Composants UI

Réutiliser uniquement :

- AppLayout
- Card
- Avatar
- Input
- FileUpload
- Button
- Alert
- Loader

---

# États de l'interface

## Initial

Les informations sont affichées.

---

## Editing

Les champs deviennent modifiables.

---

## Loading

Le bouton est désactivé.

Loader affiché.

---

## Success

Toast :

"Profil mis à jour avec succès."

---

## Error

Message d'erreur affiché.

Les données restent dans le formulaire.

---

# Responsive

Approche Mobile First.

Les informations sont affichées dans une seule colonne sur mobile.

Deux colonnes sur Desktop.

---

# Accessibilité

Tous les champs possèdent :

- label
- placeholder
- aria-label

Navigation clavier complète.

Le focus est visible.

---

# Cas limites

Adresse e-mail déjà utilisée.

Photo trop volumineuse.

Format d'image non autorisé.

Connexion Internet absente.

Erreur serveur.

Session expirée.

---

# Tests attendus

## Tests unitaires

- Validation des champs.
- Validation de l'adresse e-mail.
- Validation du formulaire.

---

## Tests d'intégration

- Chargement du profil.
- Mise à jour.
- Upload de l'avatar.

---

## Tests End-to-End

Connexion.

↓

Ouverture du profil.

↓

Modification.

↓

Sauvegarde.

↓

Affichage des nouvelles informations.

---

# Définition de Done

Le développement est terminé lorsque :

- les informations sont affichées correctement ;
- le profil peut être modifié ;
- les validations fonctionnent ;
- les erreurs sont correctement affichées ;
- les tests passent ;
- ESLint ne retourne aucune erreur ;
- TypeScript ne retourne aucune erreur.

---

# Notes techniques

Utiliser :

- React Hook Form
- Zod
- TanStack Query

Créer :

```
user.service.ts
```

Les informations de l'utilisateur connecté doivent être centralisées dans le store d'authentification.

L'avatar doit être stocké dans un service dédié (Cloudinary ou équivalent).

---

# Liens

Backlog

```
docs/backlog.md
```

Architecture

```
docs/architecture.md
```

API

```
docs/api.md
```

Database

```
docs/database.md
```

Design System

```
docs/design-system.md
```

AGENTS

```
AGENTS.md
```