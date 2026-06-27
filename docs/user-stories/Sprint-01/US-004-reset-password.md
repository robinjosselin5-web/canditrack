---
id: US-004
epic: EPIC-01
title: Réinitialisation du mot de passe
priority: Should
storyPoints: 5
status: Todo
sprint: Sprint-01
author: Product Owner
version: 1.0
---

# US-004 — Réinitialisation du mot de passe

## Objectif

Permettre à un utilisateur ayant oublié son mot de passe de récupérer l'accès à son compte de manière sécurisée.

Cette fonctionnalité garantit l'autonomie de l'utilisateur sans intervention d'un administrateur.

---

# Description

**En tant qu'** utilisateur

**Je souhaite** réinitialiser mon mot de passe

**Afin de** retrouver l'accès à mon compte lorsque je l'ai oublié.

---

# Valeur métier

Les utilisateurs oublient régulièrement leur mot de passe.

Cette fonctionnalité réduit les abandons et améliore l'expérience utilisateur.

---

# Priorité

Should Have

---

# Story Points

5

---

# Dépendances

- US-001 — Création d'un compte utilisateur

---

# Wireframes

Mobile

```
docs/wireframes/Sprint-01/reset-password-mobile.png
```

Desktop

```
docs/wireframes/Sprint-01/reset-password-desktop.png
```

---

# Mockups

Mobile

```
docs/mockups/Sprint-01/reset-password-mobile.png
```

Desktop

```
docs/mockups/Sprint-01/reset-password-desktop.png
```

---

# Écran concerné

Mot de passe oublié

---

# Acteur

Utilisateur

---

# Parcours utilisateur

1.

L'utilisateur clique sur **Mot de passe oublié ?**

↓

2.

Il saisit son adresse e-mail.

↓

3.

Il valide.

↓

4.

Un e-mail contenant un lien sécurisé lui est envoyé.

↓

5.

Il clique sur le lien.

↓

6.

Il saisit son nouveau mot de passe.

↓

7.

Le mot de passe est enregistré.

↓

8.

Il est redirigé vers la page de connexion.

---

# Champs du formulaire

Adresse e-mail

Obligatoire

Format valide

---

Nouveau mot de passe

Obligatoire

Minimum 8 caractères

Au moins :

- une majuscule
- une minuscule
- un chiffre
- un caractère spécial

---

Confirmation du mot de passe

Obligatoire

Doit être identique au nouveau mot de passe.

---

# Critères d'acceptation

## AC-01

Given

L'utilisateur possède un compte.

When

Il demande une réinitialisation.

Then

Un e-mail contenant un lien sécurisé lui est envoyé.

---

## AC-02

Given

L'utilisateur ouvre le lien reçu.

When

Le token est valide.

Then

Le formulaire de réinitialisation est affiché.

---

## AC-03

Given

Les deux mots de passe correspondent.

When

Le formulaire est validé.

Then

Le mot de passe est mis à jour.

---

## AC-04

Given

Le token est expiré.

When

L'utilisateur ouvre le lien.

Then

Une erreur est affichée.

---

## AC-05

Given

L'adresse e-mail n'existe pas.

When

La demande est envoyée.

Then

Le système affiche un message générique sans révéler si l'adresse existe ou non.

---

# Règles métier

Un lien de réinitialisation est valable pendant une durée limitée.

Le lien ne peut être utilisé qu'une seule fois.

Le mot de passe est immédiatement remplacé.

Toutes les anciennes sessions peuvent être invalidées après la réinitialisation.

---

# Validation

Validation réalisée :

- Frontend
- Backend

Tous les champs sont obligatoires.

---

# Sécurité

Le lien contient un token unique.

Le token possède une date d'expiration.

Le mot de passe est hashé avec bcrypt.

Le système ne divulgue jamais si une adresse e-mail existe dans la base de données.

---

# API concernées

## POST

```
/api/v1/auth/forgot-password
```

Body

```json
{
    "email": ""
}
```

---

## POST

```
/api/v1/auth/reset-password
```

Body

```json
{
    "token": "",
    "password": ""
}
```

---

# Base de données

Table concernée

```
users
```

Évolution recommandée

Ajouter :

```
password_reset_token

password_reset_expires_at
```

---

# Composants UI

Réutiliser uniquement :

- AuthLayout
- Card
- Input
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

Loader affiché.

---

## Success

Message :

"Si un compte est associé à cette adresse e-mail, un lien de réinitialisation a été envoyé."

---

## Error

Erreur affichée.

Le formulaire reste accessible.

---

# Responsive

Mobile First.

Le formulaire reste centré.

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

Adresse e-mail invalide.

Adresse e-mail inexistante.

Token expiré.

Token invalide.

Token déjà utilisé.

Mot de passe trop faible.

Erreur serveur.

Connexion Internet absente.

---

# Tests attendus

## Tests unitaires

- Validation de l'e-mail.
- Validation du mot de passe.
- Validation du token.

---

## Tests d'intégration

- Envoi du mail.
- Réinitialisation du mot de passe.
- Gestion des erreurs.

---

## Tests End-to-End

- Demande de réinitialisation.
- Réception de l'e-mail.
- Réinitialisation réussie.
- Connexion avec le nouveau mot de passe.

---

# Définition de Done

Le développement est terminé lorsque :

- le formulaire est responsive ;
- l'e-mail est envoyé ;
- le lien fonctionne ;
- le mot de passe est correctement mis à jour ;
- les validations sont réalisées côté Frontend et Backend ;
- les tests passent ;
- ESLint ne retourne aucune erreur ;
- TypeScript ne retourne aucune erreur.

---

# Notes techniques

Utiliser :

- React Hook Form
- Zod
- TanStack Query

Créer un service dédié :

```
auth.service.ts
```

Le token de réinitialisation doit être généré côté serveur.

L'envoi d'e-mail doit être externalisé dans un service dédié.

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