---
id: US-002
epic: EPIC-01
title: Connexion utilisateur
priority: Must
storyPoints: 3
status: Todo
sprint: Sprint-01
author: Product Owner
version: 1.0
---

# US-002 — Connexion utilisateur

## Objectif

Permettre à un utilisateur possédant un compte de se connecter afin d'accéder à son espace personnel et à ses données.

Cette User Story permet d'authentifier l'utilisateur et de sécuriser l'accès à l'application.

---

# Description

**En tant qu'** utilisateur

**Je souhaite** me connecter

**Afin d'** accéder à mon Dashboard et gérer mes candidatures.

---

# Valeur métier

L'authentification protège les données personnelles des utilisateurs.

Elle est indispensable avant toute utilisation de l'application.

---

# Priorité

Must Have

---

# Story Points

3

---

# Dépendances

US-001 — Création d'un compte utilisateur

---

# Wireframes

Mobile

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

Connexion

---

# Acteur

Utilisateur

---

# Parcours utilisateur

1.

L'utilisateur ouvre l'application.

↓

2.

Il saisit son adresse e-mail.

↓

3.

Il saisit son mot de passe.

↓

4.

Il clique sur

Se connecter.

↓

5.

Les identifiants sont vérifiés.

↓

6.

Le JWT est enregistré.

↓

7.

L'utilisateur est redirigé vers le Dashboard.

---

# Champs du formulaire

Adresse e-mail

Obligatoire

Format valide

---

Mot de passe

Obligatoire

Minimum 8 caractères

---

Se souvenir de moi

Optionnel

Checkbox

Permet de prolonger la session utilisateur.

---

# Critères d'acceptation

## AC-01

Given

Un utilisateur possède un compte.

When

Il saisit des identifiants valides.

Then

Il est connecté.

---

## AC-02

Given

L'adresse e-mail est incorrecte.

When

Le formulaire est envoyé.

Then

Un message d'erreur est affiché.

---

## AC-03

Given

Le mot de passe est incorrect.

When

Le formulaire est envoyé.

Then

La connexion est refusée.

---

## AC-04

Given

Le serveur est indisponible.

When

L'utilisateur tente de se connecter.

Then

Un message d'erreur est affiché.

---

## AC-05

Given

La connexion est réussie.

When

Le JWT est reçu.

Then

L'utilisateur est redirigé vers le Dashboard.

---

# Règles métier

Un utilisateur doit être authentifié pour accéder aux pages protégées.

Le JWT est utilisé pour toutes les requêtes sécurisées.

Le mot de passe n'est jamais renvoyé par l'API.

---

# Validation

Tous les champs sont obligatoires.

Validation réalisée :

Frontend

Backend

---

# Sécurité

Authentification JWT.

Mot de passe vérifié avec bcrypt.

Le token est stocké de manière sécurisée.

Les routes privées nécessitent un JWT valide.

---

# API concernée

POST

```
/api/v1/auth/login
```

Body

```json
{
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

Table concernée

users

Lecture uniquement.

---

# Composants UI

Réutiliser uniquement :

- AuthLayout
- Card
- Input
- Checkbox
- Button
- Alert
- Loader

---

# États de l'interface

## Initial

Formulaire vide.

---

## Loading

Bouton désactivé.

Loader visible.

---

## Success

Redirection vers le Dashboard.

---

## Error

Message d'erreur affiché.

Les champs restent remplis.

---

# Responsive

Approche Mobile First.

Le formulaire est centré.

Largeur maximale Desktop :

450 px.

---

# Accessibilité

Tous les champs possèdent :

- label
- placeholder
- aria-label

Navigation clavier complète.

Focus visible.

---

# Cas limites

Adresse e-mail inexistante.

Mot de passe incorrect.

Compte supprimé.

Token expiré.

Connexion Internet absente.

Erreur serveur.

Double clic sur le bouton.

Tentative de connexion avec des champs vides.

---

# Tests attendus

## Tests unitaires

Validation des champs.

Validation de l'e-mail.

Gestion du bouton Loading.

---

## Tests d'intégration

Connexion réussie.

Connexion refusée.

Gestion des erreurs API.

Stockage du JWT.

---

## Tests End-to-End

Connexion complète.

Redirection vers le Dashboard.

Accès aux routes protégées.

Déconnexion.

---

# Définition de Done

Le développement est terminé lorsque :

- le formulaire est responsive ;
- les validations fonctionnent ;
- le JWT est correctement stocké ;
- les routes protégées sont accessibles ;
- les erreurs sont correctement affichées ;
- les tests passent ;
- ESLint ne retourne aucune erreur ;
- TypeScript ne retourne aucune erreur.

---

# Notes techniques

Utiliser React Hook Form.

Utiliser Zod.

Utiliser TanStack Query (useMutation).

Les appels API passent uniquement par :

```
auth.service.ts
```

Le JWT ne doit jamais être manipulé directement dans les composants.

La protection des routes doit être réalisée via un composant dédié (`ProtectedRoute`) ou un middleware de routage.

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