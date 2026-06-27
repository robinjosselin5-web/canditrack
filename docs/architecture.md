# Architecture

Version : 1.0

Projet : CandiTrack

---

# Objectif

Ce document décrit l'architecture logicielle du projet.

Il constitue la référence pour l'organisation du code.

Toute nouvelle fonctionnalité doit respecter cette architecture.

L'objectif est de garantir :

- une architecture évolutive
- une maintenance simple
- une forte réutilisation
- un faible couplage
- une forte cohésion

---

# Architecture générale

Le projet suit une Feature Based Architecture.

Les fonctionnalités sont isolées.

Chaque Feature possède :

- ses composants
- ses hooks
- ses services
- ses types
- ses pages

Cette approche facilite :

- la maintenance
- les tests
- les évolutions

---

# Architecture globale

Frontend

↓

API REST

↓

Backend

↓

PostgreSQL

---

# Structure du projet

```
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

App.tsx

main.tsx
```

---

# Description des dossiers

## assets/

Contient uniquement :

- images
- illustrations
- logos
- icônes
- fonts

Jamais de logique.

---

## components/

Composants réutilisables.

Exemples :

```
Button

Input

Modal

Avatar

Badge

Card

EmptyState

Loader

SearchBar
```

Les composants ici ne connaissent jamais le métier.

Ils sont totalement génériques.

---

## config/

Configuration globale.

Exemples :

```
env.ts

constants.ts

routes.ts

queryClient.ts
```

---

## features/

Cœur du projet.

Chaque fonctionnalité possède son dossier.

Exemple :

```
features/

auth/

companies/

dashboard/

applications/

categories/

notes/

resumes/

statistics/

settings/
```

---

# Structure d'une Feature

Exemple

companies/

```
companies/

components/

hooks/

pages/

services/

types/

utils/

index.ts
```

Chaque Feature est indépendante.

---

## components/

Composants propres à la Feature.

Exemple

```
CompanyCard

CompanyForm

CompanyHeader

CompanyFilters

CompanyStatus
```

Ces composants ne doivent jamais être utilisés dans une autre Feature.

Si un composant devient générique :

Le déplacer dans

components/

---

## hooks/

Hooks spécifiques.

Exemple

```
useCompanies()

useCompany()

useDeleteCompany()
```

---

## services/

Communication API.

Exemple

```
company.service.ts
```

Toutes les requêtes passent ici.

Jamais dans les composants.

---

## pages/

Pages de la Feature.

Exemple

```
CompaniesPage

CompanyDetailsPage

CreateCompanyPage
```

---

## types/

Interfaces métier.

Exemple

```
ICompany

CompanyStatus

CreateCompanyDto
```

---

## utils/

Fonctions utilitaires propres à la Feature.

---

## index.ts

Point d'entrée de la Feature.

Toutes les exportations passent par ce fichier.

---

# layouts/

Layouts de l'application.

Exemple

```
DashboardLayout

AuthLayout
```

---

# pages/

Pages très simples.

Les pages doivent uniquement :

- assembler les composants
- appeler les hooks

Aucune logique métier.

---

# routes/

Configuration React Router.

Une seule responsabilité.

---

# services/

Services globaux.

Exemple

```
api.ts

auth.service.ts

storage.service.ts
```

---

# hooks/

Hooks globaux.

Exemple

```
useDebounce

useLocalStorage

useMediaQuery
```

---

# store/

État global.

Exemple

```
auth.store.ts

company.store.ts

theme.store.ts
```

Le store contient uniquement :

- données globales

Jamais des données locales.

---

# utils/

Fonctions utilitaires globales.

Exemple

```
formatDate()

formatCurrency()

capitalize()

slugify()
```

---

# lib/

Bibliothèques configurées.

Exemple

```
axios.ts

queryClient.ts

zod.ts
```

---

# Flux de données

Toujours respecter :

```
Component

↓

Hook

↓

Service

↓

API

↓

Database
```

Jamais :

```
Component

↓

Axios
```

---

# Communication

Frontend

↓

Service

↓

API

↓

Controller

↓

Service

↓

Repository

↓

Database

---

# Responsabilités

Component

Affichage.

Hook

Logique React.

Service

Communication HTTP.

Controller

Réception HTTP.

Business Service

Logique métier.

Repository

Accès aux données.

---

# Gestion des états

État local

useState

Pour :

- formulaire
- modal
- menu

---

État serveur

TanStack Query

Pour :

- entreprises
- catégories
- statistiques

---

État global

Store

Pour :

- utilisateur
- thème
- préférences

---

# Conventions React

Une page

↓

plusieurs composants

↓

plusieurs hooks

↓

plusieurs services

Toujours dans cet ordre.

---

# Taille maximale

Composant

250 lignes

Hook

150 lignes

Service

200 lignes

Page

150 lignes

Au-delà :

Découper.

---

# Communication entre Features

Une Feature ne doit jamais accéder directement aux fichiers internes d'une autre Feature.

Toujours utiliser :

```
index.ts
```

Comme point d'entrée.

---

# Importations

Bon

```
import { CompanyCard } from "@/features/companies";
```

Mauvais

```
import CompanyCard from "../../../features/companies/components/CompanyCard";
```

---

# Alias

Toujours utiliser :

```
@
```

pour :

```
src/
```

Éviter les chemins relatifs complexes.

---

# Gestion des erreurs

Chaque Service retourne :

- succès
- erreur

Les composants ne gèrent jamais directement Axios.

---

# API

Une requête = une fonction.

Exemple

```
getCompanies()

createCompany()

deleteCompany()
```

---

# Pagination

Toutes les listes doivent être pensées pour supporter la pagination.

Même si elle n'est pas encore utilisée.

---

# Recherche

La recherche doit être :

- indépendante
- réutilisable

Éviter les recherches directement dans les composants.

---

# Design Pattern

Favoriser :

Container / Presentational

Exemple

```
CompaniesPage

↓

CompaniesContainer

↓

CompanyList

↓

CompanyCard
```

---

# Réutilisation

Avant de créer :

- un composant
- un hook
- une fonction

Toujours vérifier :

Existe-t-il déjà ?

---

# Dépendances

Limiter les dépendances.

Toujours préférer :

- React
- TypeScript
- utilitaires internes

Avant une nouvelle librairie.

---

# Évolutivité

Toute nouvelle fonctionnalité doit pouvoir être ajoutée sans modifier l'architecture existante.

Si une modification importante est nécessaire :

Proposer une évolution d'architecture avant de coder.

---

# Règle d'or

Une responsabilité.

Un fichier.

Une logique.

Un composant.

Une Feature.

Plus le découpage est clair, plus le projet sera facile à maintenir.

L'architecture est prioritaire sur la rapidité de développement.