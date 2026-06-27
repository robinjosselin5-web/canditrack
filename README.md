<div align="center">

# 🚀 CandiTrack

### Smart Job Application Manager

Une application SaaS moderne permettant de gérer ses candidatures grâce à l'intelligence artificielle.

---

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![NodeJS](https://img.shields.io/badge/Node.js-24-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991)

</div>

---

# 📖 Présentation

**CandiTrack** est une application web permettant de gérer efficacement l'ensemble de ses candidatures.

Elle centralise :

- 📄 les CV
- 🏢 les entreprises
- ✉️ les candidatures
- 🤖 l'intelligence artificielle
- 📊 les statistiques
- 📅 le suivi des recrutements

L'objectif est de permettre aux utilisateurs de suivre facilement leur recherche d'emploi tout en automatisant les tâches répétitives.

---

# ✨ Fonctionnalités

## 👤 Authentification

- Création de compte
- Connexion
- Déconnexion
- Gestion du profil

---

## 🏢 Gestion des entreprises

- Ajouter une entreprise
- Modifier une entreprise
- Supprimer une entreprise
- Catégories personnalisées
- Favoris

---

## 🤖 Intelligence Artificielle

- Résumé automatique d'une entreprise
- Génération d'e-mails personnalisés
- Génération future de lettres de motivation
- Adaptation future des CV

---

## 📄 Gestion des CV

- Import de plusieurs CV
- Sélection d'un CV
- Gestion des versions

---

## 📊 Dashboard

- Vue Kanban
- Drag & Drop
- Statistiques
- Recherche
- Filtres

---

## 📝 Notes

- Notes personnelles
- Historique
- Informations recruteur

---

# 🛠 Stack Technique

## Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- TailwindCSS
- Lucide React

## Backend

- Node.js
- Express
- TypeScript

## Base de données

- PostgreSQL

## Intelligence Artificielle

- OpenAI API

## Authentification

- JWT

---

# 🏛 Architecture

Le projet suit une **Feature Based Architecture**.

```text
src/

assets/
components/
config/
features/
hooks/
layouts/
lib/
pages/
routes/
services/
store/
types/
utils/
```

Toute l'architecture est documentée dans :

```text
docs/architecture.md
```

---

# 🎨 Design

L'interface suit un Design System unique.

- Palette pastel
- Responsive
- Mobile First
- Accessible
- Design inspiré de Linear, Notion et Attio

Voir :

```text
docs/design-system.md
```

---

# 📂 Structure du projet

```text
.
├── docs/
├── src/
├── public/
├── AGENTS.md
├── package.json
└── README.md
```

---

# 🚀 Installation

## Cloner le dépôt

```bash
git clone https://github.com/USERNAME/canditrack.git

cd canditrack
```

---

## Installer les dépendances

```bash
npm install
```

---

## Variables d'environnement

Créer un fichier :

```text
.env
```

Exemple :

```env
VITE_API_URL=http://localhost:3000/api/v1

OPENAI_API_KEY=xxxxxxxxxxxxxxxx
```

---

## Lancer le projet

Frontend

```bash
npm run dev
```

Backend

```bash
npm run server
```

---

# 📦 Scripts

```bash
npm run dev

npm run build

npm run preview

npm run lint

npm run test

npm run coverage
```

---

# 🧪 Tests

Le projet utilise :

- Vitest
- React Testing Library
- Playwright
- MSW

Documentation :

```text
docs/testing.md
```

---

# 📚 Documentation

Toute la documentation est disponible dans :

```text
docs/
```

Contenu :

- Architecture
- API
- Base de données
- Backlog
- Design System
- Roadmap
- Tests
- User Stories

---

# 🤖 Utilisation avec Codex

Le projet est conçu pour être développé avec **OpenAI Codex**.

Avant toute implémentation, Codex doit consulter :

```text
AGENTS.md
```

Ainsi que :

```text
docs/
```

Toutes les règles de développement y sont documentées.

---

# 📋 Workflow

Chaque fonctionnalité est développée selon Scrum.

Le processus est le suivant :

```text
Backlog

↓

User Story

↓

Sprint

↓

Développement

↓

Tests

↓

Review

↓

Merge

↓

Déploiement
```

Une seule User Story est développée à la fois.

---

# 🌱 Roadmap

## MVP

- Authentification
- Gestion des entreprises
- Dashboard
- IA
- Gestion des CV

## V1

- Drag & Drop
- Catégories
- Notes
- Recherche

## V2

- Adaptation automatique du CV
- Lettre de motivation IA
- Statistiques avancées

## V3

- Mobile
- Extension navigateur
- Synchronisation LinkedIn

---

# 🤝 Contribution

Avant toute Pull Request :

- respecter `coding-guidelines.md`
- respecter `architecture.md`
- respecter `design-system.md`
- respecter `AGENTS.md`

Toute nouvelle fonctionnalité doit être liée à une User Story du Product Backlog.

---

# 📜 Licence

Ce projet est distribué sous licence MIT.

---

<div align="center">

Développé avec ❤️ en utilisant React, TypeScript et OpenAI.

</div>