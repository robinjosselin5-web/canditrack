# Project Overview

Projet : CandiTrack

Version : 1.0

---

# Présentation

CandiTrack est une application web SaaS permettant aux utilisateurs de gérer efficacement leurs candidatures.

L'application centralise l'ensemble du processus de recherche d'emploi :

- suivi des entreprises
- personnalisation des candidatures
- génération de contenu grâce à l'intelligence artificielle
- gestion des CV
- suivi des recrutements
- organisation des entreprises via un Dashboard Kanban

L'objectif est de simplifier les démarches administratives afin que l'utilisateur puisse consacrer davantage de temps à la préparation de ses entretiens.

---

# Objectifs

Les principaux objectifs du projet sont :

- centraliser les candidatures ;
- automatiser les tâches répétitives ;
- personnaliser les candidatures grâce à l'IA ;
- offrir un suivi visuel des entreprises ;
- fournir une expérience utilisateur moderne, rapide et intuitive.

---

# Fonctionnalités principales

## Authentification

- Création de compte
- Connexion
- Déconnexion
- Gestion du profil

---

## Gestion des entreprises

- Ajouter une entreprise
- Modifier une entreprise
- Supprimer une entreprise
- Consulter une entreprise
- Classement par catégories

---

## Intelligence artificielle

- Génération automatique d'un résumé d'entreprise
- Génération d'un e-mail personnalisé
- Génération future d'une lettre de motivation
- Adaptation future du CV

---

## Gestion des candidatures

- Import de plusieurs CV
- Sélection d'un CV
- Envoi d'une candidature
- Historique des candidatures

---

## Dashboard

- Vue Kanban
- Drag & Drop
- Filtres
- Recherche
- Statistiques

---

## Notes

- Notes personnelles
- Historique des échanges
- Informations recruteur

---

# Public cible

L'application s'adresse principalement :

- aux étudiants ;
- aux jeunes diplômés ;
- aux personnes en reconversion professionnelle ;
- aux chercheurs d'emploi ;
- aux freelances répondant régulièrement à des appels d'offres.

---

# Stack technique

## Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- TailwindCSS
- Lucide React

---

## Backend

- Node.js
- Express
- TypeScript

---

## Base de données

- PostgreSQL

---

## Intelligence Artificielle

- API OpenAI

---

## Authentification

- JWT

---

# Architecture

Le projet suit une **Feature Based Architecture**.

Les fonctionnalités sont complètement isolées afin de faciliter :

- la maintenance ;
- les tests ;
- la réutilisation ;
- l'évolutivité.

Toutes les règles d'architecture sont décrites dans :

```
docs/architecture.md
```

---

# Design

L'interface suit un Design System unique.

Principes :

- minimaliste
- moderne
- pastel
- responsive
- accessible

Toutes les interfaces respectent :

```
docs/design-system.md
```

---

# Documentation

Le projet est entièrement documenté.

Documents disponibles :

- architecture.md
- api.md
- backlog.md
- coding-guidelines.md
- database.md
- design-system.md
- roadmap.md
- testing.md

Chaque User Story possède son propre document dans :

```
docs/user-stories/
```

---

# Méthodologie

Le projet est développé selon la méthode Agile Scrum.

Organisation :

- Product Backlog
- Sprint Planning
- User Stories
- Definition of Ready
- Definition of Done
- Roadmap Produit

Chaque développement correspond à une User Story.

Une seule User Story est développée à la fois.

---

# Philosophie de développement

Le projet privilégie :

- la simplicité ;
- la lisibilité ;
- la réutilisation ;
- la maintenabilité ;
- les bonnes pratiques.

Les principes suivants sont appliqués :

- SOLID
- DRY
- KISS
- Clean Code
- Clean Architecture

---

# Conventions

Toutes les conventions de développement sont décrites dans :

```
docs/coding-guidelines.md
```

Le Design System est décrit dans :

```
docs/design-system.md
```

Le comportement attendu de l'IA est défini dans :

```
AGENTS.md
```

---

# Workflow

Chaque nouvelle fonctionnalité suit le processus suivant :

1. Sélection d'une User Story.
2. Analyse des impacts.
3. Développement.
4. Tests.
5. Validation.
6. Merge.
7. Sprint Review.

---

# Vision

CandiTrack n'est pas conçu comme un simple projet pédagogique.

L'objectif est de développer une application professionnelle, évolutive et facilement maintenable, en appliquant les standards actuels du développement web.

Toutes les décisions techniques doivent être prises dans cette optique.

---

# Source de vérité

Les documents du dossier `docs/` constituent la documentation officielle du projet.

En cas de doute, toujours se référer à cette documentation avant toute implémentation.