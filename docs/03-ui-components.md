# UI Components

Version : 1.0

Projet : CandiTrack

---

# Objectif

Ce document décrit tous les composants UI du projet.

Avant de créer un nouveau composant, vérifier qu'il n'existe pas déjà dans cette documentation.

L'objectif est de :

- garantir une interface homogène ;
- favoriser la réutilisation ;
- éviter la duplication de code ;
- simplifier la maintenance.

Tous les composants respectent :

- docs/design-system.md
- docs/coding-guidelines.md

---

# Organisation

Les composants UI sont situés dans :

```

src/components/ui/

```

Les composants métier restent dans leur Feature.

---

# Conventions

Tous les composants :

- sont écrits en TypeScript
- utilisent TailwindCSS
- sont entièrement typés
- possèdent des props documentées
- sont responsive
- sont accessibles (WCAG)

---

# Layout

## AppLayout

Responsabilité

Layout principal de l'application.

Utilisé pour :

- Dashboard
- Entreprises
- CV
- Statistiques
- Paramètres

Contient :

- Sidebar
- Header
- Main

---

## AuthLayout

Layout des pages d'authentification.

Utilisé pour :

- Connexion
- Inscription
- Mot de passe oublié

---

# Navigation

## Sidebar

Responsabilité

Navigation principale.

Fonctionnalités :

- logo
- menu
- utilisateur connecté
- déconnexion

Desktop uniquement.

---

## BottomNavigation

Navigation mobile.

Contient :

- Dashboard
- Entreprises
- Candidatures
- Paramètres

Visible uniquement sur mobile.

---

## Header

Responsabilité

Barre supérieure.

Contient :

- recherche
- notifications
- avatar
- menu utilisateur

---

# Boutons

## Button

Variantes

- Primary
- Secondary
- Outline
- Ghost
- Danger
- Success

États

- Default
- Hover
- Disabled
- Loading

Props

```

variant

size

disabled

loading

iconLeft

iconRight

children

```

---

## IconButton

Bouton contenant uniquement une icône.

Utilisé pour :

- supprimer
- modifier
- favoris
- fermer

---

# Formulaires

## Input

Variantes

- Text
- Email
- Password
- Search
- Number

États

- Default
- Focus
- Error
- Success
- Disabled

---

## Textarea

Champ texte multilignes.

---

## Select

Liste déroulante.

---

## Checkbox

Case à cocher.

---

## Radio

Boutons radio.

---

## Switch

Interrupteur.

---

## DatePicker

Sélection de date.

---

## FileUpload

Upload d'un fichier.

Utilisé pour :

- CV
- pièces jointes

---

# Feedback

## Alert

Variantes

- Success
- Warning
- Error
- Info

---

## Toast

Notifications temporaires.

Position

Top Right.

---

## Loader

Indicateur de chargement.

Variantes

- Spinner
- Skeleton

---

## EmptyState

Affichage lorsqu'aucune donnée n'est disponible.

Exemple

"Aucune entreprise."

---

## ConfirmationModal

Demande de confirmation.

Utilisé avant :

- suppression
- déconnexion
- suppression du compte

---

# Cards

## Card

Carte générique.

---

## CompanyCard

Affiche :

- entreprise
- statut
- catégorie
- date

Utilisée :

Dashboard

Kanban

Recherche

---

## ResumeCard

Affiche un CV.

Contient :

- nom
- date
- taille
- actions

---

## StatisticsCard

Affiche :

- valeur
- icône
- évolution

---

# Dashboard

## KanbanColumn

Colonne du Kanban.

Contient :

- titre
- compteur
- cartes

Supporte le Drag & Drop.

---

## KanbanBoard

Regroupe toutes les colonnes.

---

## FilterBar

Filtres :

- statut
- catégorie
- date

---

## SearchBar

Recherche globale.

---

# Entreprises

## CompanyForm

Création

Modification

---

## CompanyDetails

Affichage complet.

Contient :

- résumé IA
- notes
- candidatures
- informations

---

## StatusBadge

Affiche le statut.

Couleurs

Draft

Pending

Interview

Rejected

Accepted

---

## CategoryBadge

Affiche une catégorie.

---

## FavoriteButton

Ajoute / retire des favoris.

---

# IA

## AiSummary

Résumé généré.

---

## AiEmailPreview

Prévisualisation de l'e-mail.

---

## AiLoader

Animation pendant la génération.

---

# CV

## ResumeSelector

Sélection du CV.

---

## ResumeUpload

Ajout d'un CV.

---

# Statistiques

## PieChart

Répartition.

---

## LineChart

Évolution.

---

## KPI

Indicateur principal.

---

# Avatar

## Avatar

Affiche :

- image
- initiales

---

## UserMenu

Menu utilisateur.

---

# Tableaux

## Table

Composant générique.

---

## Pagination

Navigation entre pages.

---

# Modales

## Modal

Composant de base.

---

## Drawer

Menu latéral mobile.

---

# Badges

## Badge

Variantes

- Default
- Success
- Warning
- Error
- Info

---

# Composants métier

Les composants suivants ne doivent jamais être placés dans :

```

components/ui

```

Ils restent dans leur Feature.

Exemple

```

features/companies/components/

CompanyForm

CompanyCard

CompanyTimeline

```

---

# Réutilisation

Avant de créer un composant :

Toujours vérifier :

Existe-t-il déjà ?

Si oui :

Le réutiliser.

---

# Philosophie

Les composants UI sont indépendants du métier.

Ils ne connaissent jamais :

- les entreprises
- les candidatures
- les catégories

Ils ne font qu'afficher des données.

Toute logique métier est placée :

- dans les hooks
- dans les services
- dans les Features

---

# Source de vérité

Ce document constitue la référence officielle des composants de l'application.

Toute création d'un nouveau composant doit être documentée ici avant son implémentation.