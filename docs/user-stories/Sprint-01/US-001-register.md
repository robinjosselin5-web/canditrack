---
id: US-001
epic: EPIC-01
title: Création d'un compte utilisateur
priority: Must
storyPoints: 3
status: Todo
sprint: Sprint-01
author: Product Owner
version: 1.0
---

# US-001 — Création d'un compte utilisateur

## Objectif

Permettre à un visiteur de créer un compte afin d'accéder à toutes les fonctionnalités de CandiTrack.

Cette User Story constitue le point d'entrée de l'application.

---

# Description

**En tant que** visiteur

**Je souhaite** créer un compte

**Afin de** sauvegarder mes candidatures et accéder à mon espace personnel.

---

# Valeur métier

Sans authentification, aucune donnée ne peut être sauvegardée.

Cette fonctionnalité est indispensable au fonctionnement de l'application.

---

# Priorité

Must Have

---

# Story Points

3

---

# Dépendances

Aucune.

Cette User Story est la première à développer.

---

# Wireframes

```
docs/wireframes/Sprint-01/login-mobile.png
```

Desktop

```
docs/wireframes/Sprint-01/login-desktop.png
```

---

# Mockups

Mobile

```
docs/mockups/Sprint-01/login-mobile.png
```

Desktop

```
docs/mockups/Sprint-01/login-desktop.png
```

---

# Écran concerné

Connexion / Création de compte

---

# Acteur

Visiteur

---

# Parcours utilisateur

1.

Le visiteur ouvre l'application.

↓

2.

Il clique sur

Créer un compte

↓

3.

Il remplit le formulaire.

↓

4.

Il valide.

↓

5.

Le compte est créé.

↓

6.

Il est automatiquement connecté.

↓

7.

Redirection vers le Dashboard.

---

# Champs du formulaire

Prénom

Obligatoire

Maximum 100 caractères

---

Nom

Obligatoire

Maximum 100 caractères

---

Adresse e-mail

Obligatoire

Format e-mail valide

Unique

---

Mot de passe

Obligatoire

Minimum 8 caractères

Au moins :

- une majuscule
- une minuscule
- un chiffre
- un caractère spécial

---

Confirmation du mot de passe

Doit correspondre.

---

# Critères d'acceptation

## AC-01

Given

Le visiteur remplit correctement le formulaire.

When

Il clique sur

Créer mon compte.

Then

Le compte est créé.

---

## AC-02

Given

L'adresse e-mail existe déjà.

When

Le formulaire est envoyé.

Then

Un message d'erreur est affiché.

---

## AC-03

Given

Le mot de passe est trop faible.

When

Le formulaire est envoyé.

Then

Le compte n'est pas créé.

---

## AC-04

Given

Les deux mots de passe sont différents.

When

Validation.

Then

Le formulaire affiche une erreur.

---

## AC-05

Given

Le compte est créé.

When

La création est terminée.

Then

L'utilisateur est connecté automatiquement.

---

# Règles métier

Une adresse e-mail ne peut appartenir qu'à un seul compte.

Les mots de passe ne sont jamais stockés en clair.

Le mot de passe est hashé avant l'enregistrement.

L'utilisateur reçoit le rôle :

USER

par défaut.

---

# Validation

Tous les champs sont obligatoires.

Validation réalisée :

Frontend

Backend

---

# Sécurité

Hash du mot de passe :

bcrypt

JWT généré après création.

Aucun mot de passe ne transite en clair après traitement.

---

# API concernée

POST

```
/api/v1/auth/register
```

Body

```json
{
    "firstname": "",
    "lastname": "",
    "email": "",
    "password": ""
}
```

Response

```json
{
    "success": true,
    "data": {
        "user": {},
        "token": ""
    }
}
```

---

# Base de données

Table

users

Colonnes

- firstname
- lastname
- email
- password_hash

---

# Composants UI

Réutiliser uniquement les composants suivants :

- AuthLayout
- Card
- Input
- Button
- Checkbox
- Alert
- Loader

Aucun composant spécifique ne doit être créé.

---

# États de l'interface

## Initial

Formulaire vide.

---

## Loading

Bouton désactivé.

Loader affiché.

---

## Success

Redirection Dashboard.

---

## Error

Message d'erreur sous le champ concerné.

---

# Responsive

Mobile First.

Le formulaire est centré.

Desktop

Le formulaire reste centré avec une largeur maximale de 450 px.

---

# Accessibilité

Tous les champs possèdent :

- un label
- un placeholder
- un aria-label

Navigation clavier complète.

Le focus est visible.

---

# Cas limites

Adresse e-mail déjà utilisée.

Mot de passe trop court.

Mot de passe sans caractère spécial.

Mot de passe sans majuscule.

Adresse e-mail invalide.

Connexion Internet absente.

Erreur serveur.

Double clic sur le bouton.

---

# Tests attendus

## Unitaires

Validation du formulaire.

Validation des mots de passe.

Validation des e-mails.

---

## Intégration

Création utilisateur.

Réponse API.

Gestion des erreurs.

---

## End-to-End

Créer un compte.

Connexion automatique.

Redirection Dashboard.

---

# Définition de Done

Le développement est terminé lorsque :

- le formulaire est responsive ;
- les validations fonctionnent ;
- les tests passent ;
- la documentation est à jour ;
- ESLint ne retourne aucune erreur ;
- TypeScript ne retourne aucune erreur ;
- le compte est créé en base ;
- le JWT est généré ;
- l'utilisateur est redirigé vers le Dashboard.

---

# Notes techniques

Utiliser React Hook Form pour la gestion du formulaire.

Utiliser Zod pour la validation.

Utiliser TanStack Query pour la mutation.

Aucun appel Axios directement dans le composant.

Toutes les requêtes passent par :

auth.service.ts

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

Design

```
docs/design-system.md
```

AGENTS

```
AGENTS.md
```