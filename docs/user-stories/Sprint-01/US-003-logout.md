---
id: US-003
epic: EPIC-01
title: Déconnexion utilisateur
priority: Must
storyPoints: 1
status: Todo
sprint: Sprint-01
author: Product Owner
version: 1.0
---

# US-003 — Déconnexion utilisateur

## Objectif

Permettre à un utilisateur connecté de fermer sa session de manière sécurisée afin de protéger ses données personnelles.

Cette User Story termine le cycle complet d'authentification.

---

# Description

**En tant qu'** utilisateur connecté

**Je souhaite** me déconnecter

**Afin de** sécuriser mon compte lorsque j'utilise un appareil partagé ou que je termine ma session.

---

# Valeur métier

La déconnexion garantit la sécurité des données de l'utilisateur et empêche tout accès non autorisé après utilisation de l'application.

---

# Priorité

Must Have

---

# Story Points

1

---

# Dépendances

- US-001 — Création d'un compte utilisateur
- US-002 — Connexion utilisateur

---

# Wireframes

Mobile

```
docs/wireframes/Sprint-01/settings-mobile.png
```

Desktop

```
docs/wireframes/Sprint-01/settings-desktop.png
```

---

# Mockups

Mobile

```
docs/mockups/Sprint-01/settings-mobile.png
```

Desktop

```
docs/mockups/Sprint-01/settings-desktop.png
```

---

# Écran concerné

Paramètres

---

# Acteur

Utilisateur connecté

---

# Parcours utilisateur

1.

L'utilisateur est connecté.

↓

2.

Il ouvre la page Paramètres.

↓

3.

Il clique sur

**Se déconnecter**.

↓

4.

Une confirmation peut être affichée (optionnel).

↓

5.

Le JWT est supprimé.

↓

6.

Les données utilisateur sont vidées du store.

↓

7.

L'utilisateur est redirigé vers la page de connexion.

---

# Critères d'acceptation

## AC-01

Given

L'utilisateur est connecté.

When

Il clique sur **Se déconnecter**.

Then

Il est déconnecté.

---

## AC-02

Given

L'utilisateur est déconnecté.

When

Il tente d'accéder à une route protégée.

Then

Il est redirigé vers la page de connexion.

---

## AC-03

Given

Le JWT existe.

When

La déconnexion est effectuée.

Then

Le JWT est supprimé.

---

## AC-04

Given

Des données utilisateur sont présentes dans le cache.

When

La déconnexion est réalisée.

Then

Le cache est vidé.

---

# Règles métier

Un utilisateur déconnecté ne peut plus accéder aux routes protégées.

Toutes les informations liées à la session doivent être supprimées.

La déconnexion est immédiate.

---

# Validation

Aucune validation de formulaire.

---

# Sécurité

Le JWT doit être supprimé.

Les informations utilisateur présentes dans le store doivent être supprimées.

Le cache React Query doit être vidé.

Les données sensibles ne doivent plus être accessibles.

---

# API concernée

POST

```
/api/v1/auth/logout
```

Body

Aucun.

Response

```json
{
    "success": true
}
```

---

# Base de données

Aucune modification.

---

# Composants UI

Réutiliser uniquement :

- Button
- ConfirmationModal
- Alert

---

# États de l'interface

## Initial

Utilisateur connecté.

---

## Loading

Bouton désactivé.

---

## Success

Redirection vers la page de connexion.

---

## Error

Message d'erreur affiché.

L'utilisateur reste connecté.

---

# Responsive

Mobile First.

Le bouton de déconnexion est toujours facilement accessible.

---

# Accessibilité

Le bouton est accessible au clavier.

Le focus est visible.

Les lecteurs d'écran annoncent correctement l'action.

---

# Cas limites

Double clic sur le bouton.

JWT déjà expiré.

Perte de connexion réseau.

Erreur serveur.

Session déjà expirée.

---

# Tests attendus

## Tests unitaires

- Suppression du JWT.
- Nettoyage du store.
- Nettoyage du cache.

---

## Tests d'intégration

- Appel API.
- Redirection.
- Protection des routes.

---

## Tests End-to-End

Connexion.

↓

Déconnexion.

↓

Tentative d'accès au Dashboard.

↓

Redirection vers Login.

---

# Définition de Done

Le développement est terminé lorsque :

- le JWT est supprimé ;
- le cache React Query est vidé ;
- les données utilisateur sont supprimées du store ;
- les routes protégées ne sont plus accessibles ;
- la redirection fonctionne ;
- les tests passent ;
- ESLint ne retourne aucune erreur ;
- TypeScript ne retourne aucune erreur.

---

# Notes techniques

Utiliser :

- auth.service.ts
- auth.store.ts
- TanStack Query QueryClient pour vider le cache (`queryClient.clear()` ou méthode équivalente adaptée à ton architecture).

Ne jamais supprimer le JWT directement dans les composants.

Toute la logique de déconnexion doit être centralisée.

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