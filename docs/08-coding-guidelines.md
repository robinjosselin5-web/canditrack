# Coding Guidelines

## Objectif

Ce document définit les conventions de développement du projet **CandiTrack**.

Toutes les contributions doivent respecter ces règles afin de garantir :

- un code lisible ;
- une architecture cohérente ;
- une maintenance facilitée ;
- une expérience de développement homogène.

---

# Stack technique

## Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- TailwindCSS
- Lucide React

## Backend

- Node.js
- Express
- TypeScript

## Base de données

- PostgreSQL

---

# Principes de développement

Le projet suit les principes suivants :

- SOLID
- DRY
- KISS
- YAGNI
- Composition over Inheritance

Chaque composant doit avoir une seule responsabilité.

---

# Organisation des dossiers

```
src/

assets/

components/

features/

hooks/

layouts/

pages/

routes/

services/

store/

types/

utils/
```

Une fonctionnalité doit toujours être développée dans son dossier `features`.

Exemple :

```
features/

companies/

components/

hooks/

pages/

services/

types/
```

---

# Convention de nommage

## Composants React

Toujours en PascalCase.

Exemple :

```
CompanyCard.tsx

DashboardLayout.tsx

LoginForm.tsx
```

---

## Hooks

Toujours préfixés par use.

Exemple :

```
useCompanies.ts

useAuth.ts

useFilters.ts
```

---

## Services

Toujours suffixés par Service.

```
companyService.ts

authService.ts

resumeService.ts
```

---

## Interfaces

Toujours préfixées par I.

```
ICompany

IUser

IResume
```

---

## Types

Toujours suffixés par Type.

```
StatusType

RoleType

CategoryType
```

---

## Enum

Toujours en PascalCase.

```
CompanyStatus

UserRole
```

---

## Constantes

Toujours en UPPER_SNAKE_CASE.

```
MAX_UPLOAD_SIZE

API_BASE_URL

DEFAULT_STATUS
```

---

## Fonctions

Toujours en camelCase.

```
createCompany()

deleteCompany()

generateEmail()
```

---

## Variables

Toujours explicites.

Bon :

```
selectedCompany

filteredCompanies
```

Mauvais :

```
obj

data

tmp
```

---

# TypeScript

Le type any est interdit.

Toujours typer :

- props
- états React
- fonctions
- réponses API

Exemple :

```ts
interface CompanyCardProps {
    company: ICompany;
}
```

---

# React

Préférer les composants fonctionnels.

Toujours utiliser :

- useState
- useEffect
- useMemo
- useCallback

uniquement lorsqu'ils apportent une réelle valeur.

Éviter les re-renders inutiles.

---

# Props

Toujours utiliser une interface.

```ts
interface ButtonProps {
    label: string;
    onClick: () => void;
}
```

---

# État global

Les données globales doivent être stockées dans le store.

Exemples :

- utilisateur connecté
- entreprises
- catégories
- thème

Les états locaux restent dans les composants.

---

# API

Toutes les requêtes HTTP passent par le dossier :

```
services/
```

Aucun fetch ou axios directement dans un composant.

Exemple :

```
companyService.ts
```

```ts
export async function getCompanies() {}
```

---

# React Query

Toutes les données serveur doivent utiliser TanStack Query.

Utiliser :

- useQuery
- useMutation
- invalidateQueries

Ne jamais gérer le cache manuellement.

---

# Tailwind

Toujours utiliser TailwindCSS.

Le CSS personnalisé est réservé :

- aux animations complexes ;
- aux composants impossibles à réaliser avec Tailwind.

---

# Responsive

Approche Mobile First.

Breakpoints :

```
sm

md

lg

xl

2xl
```

Tous les composants doivent être responsive.

---

# Accessibilité

Chaque formulaire doit posséder :

- un label
- un placeholder
- une gestion du focus
- une navigation clavier

Toutes les images doivent avoir un attribut alt.

---

# Gestion des erreurs

Chaque appel API doit gérer :

- loading
- success
- error

Aucune erreur ne doit être ignorée.

---

# Validation

Tous les formulaires doivent être validés.

Exemple :

- email valide
- URL valide
- champs obligatoires
- longueur minimale

---

# Commentaires

Les commentaires doivent expliquer le "pourquoi", jamais le "quoi".

Bon :

```ts
// Empêche l'utilisateur de soumettre deux fois le formulaire
```

Mauvais :

```ts
// Incrémente i
i++;
```

---

# Git

Une branche par User Story.

Exemple :

```
feature/US-006-add-company

feature/US-017-send-application
```

---

# Convention de commit

Format :

```
type(scope): description
```

Exemples :

```
feat(company): add company creation

fix(auth): resolve login bug

refactor(api): simplify company service

style(button): improve hover animation
```

---

# Tests

Chaque fonctionnalité importante doit être testée.

À minima :

- tests unitaires
- tests d'intégration

---

# Performance

Éviter :

- les re-renders inutiles
- les appels API en double
- les composants trop volumineux

Utiliser :

- lazy loading
- memo
- code splitting

---

# Taille des fichiers

Maximum conseillé :

Composant :

250 lignes

Hook :

150 lignes

Service :

200 lignes

Au-delà, découper le fichier.

---

# Structure d'un composant

Ordre recommandé :

1. Imports

2. Types

3. Hooks

4. États

5. Fonctions

6. JSX

7. Export

---

# Sécurité

Ne jamais :

- stocker un mot de passe
- exposer une clé API
- faire confiance aux données du Frontend

Toutes les validations doivent également être réalisées côté Backend.

---

# Checklist avant chaque Pull Request

- Code compilé
- ESLint valide
- Aucun any
- Aucun console.log oublié
- Types respectés
- Responsive vérifié
- Accessibilité vérifiée
- Tests passés
- Documentation mise à jour

---

# Philosophie

Avant d'écrire du code, toujours se demander :

- Le composant est-il réutilisable ?
- Cette logique existe-t-elle déjà ?
- Ce code est-il suffisamment simple ?
- Est-il facilement testable ?
- Est-il cohérent avec l'architecture du projet ?

La priorité est toujours donnée à la lisibilité et à la maintenabilité plutôt qu'à la quantité de code produite.

---

# Workflow avec Codex

Codex est utilisé comme assistant de développement tout au long du projet. Son rôle est d'accélérer la production de code tout en respectant les règles définies dans la documentation du projet.

Avant toute modification, Codex doit analyser l'architecture existante ainsi que les documents présents dans le dossier `docs/`.

Les règles suivantes doivent être systématiquement respectées.

---

## Analyse avant développement

Avant d'écrire du code, Codex doit :

- analyser les fichiers existants ;
- comprendre l'architecture du projet ;
- identifier les composants réutilisables ;
- vérifier si une logique similaire existe déjà.

Aucun code ne doit être généré sans cette phase d'analyse.

---

## Une User Story à la fois

Codex ne doit jamais développer plusieurs User Stories simultanément.

Chaque demande doit concerner une seule User Story.

Exemple :

✔ Implémenter US-006

❌ Implémenter toutes les User Stories du Dashboard

---

## Respect de l'architecture

Codex ne doit jamais modifier l'architecture du projet sans validation.

Les dossiers suivants sont obligatoires :

- features/
- components/
- hooks/
- services/
- types/
- utils/

Aucun nouveau dossier ne doit être créé sans justification.

---

## Réutilisation avant création

Avant de créer un composant, un hook ou un service, Codex doit vérifier si un élément équivalent existe déjà.

La duplication de code doit être évitée.

---

## Respect du Design System

Toutes les interfaces doivent respecter le fichier :

```
docs/design-system.md
```

Les couleurs, espacements, typographies et composants doivent rester cohérents dans toute l'application.

---

## Respect du Backlog

Les fonctionnalités développées doivent correspondre à une User Story présente dans :

```
docs/backlog.md
```

Aucune fonctionnalité supplémentaire ne doit être ajoutée sans validation.

---

## Documentation

Toute nouvelle fonctionnalité importante doit être accompagnée d'une mise à jour de la documentation concernée.

---

## Explication avant génération

Avant de produire du code, Codex doit :

1. expliquer brièvement son plan ;
2. identifier les fichiers qui seront modifiés ;
3. attendre une validation si les modifications sont importantes.

---

## Refactoring

Lorsqu'un meilleur design est possible, Codex peut proposer un refactoring.

Cependant, aucun refactoring ne doit être réalisé automatiquement s'il risque d'impacter le fonctionnement existant.

---

## Sécurité

Codex doit systématiquement vérifier :

- les validations des entrées utilisateur ;
- les permissions ;
- les accès API ;
- les données sensibles.

Les validations doivent toujours être réalisées côté serveur.

---

## TypeScript

Le type `any` est interdit.

Toutes les données doivent être typées.

Les interfaces existantes doivent être réutilisées autant que possible.

---

## Tests

Lorsqu'une User Story est terminée, Codex doit proposer :

- les tests unitaires à créer ;
- les cas limites à vérifier ;
- les tests fonctionnels à effectuer.

---

## Qualité du code

Le code généré doit être :

- lisible ;
- modulaire ;
- réutilisable ;
- facilement testable ;
- conforme aux conventions du projet.

---

## Communication

En cas d'ambiguïté, Codex ne doit jamais faire d'hypothèse.

Il doit demander une clarification avant de poursuivre.

---

## Principe fondamental

Codex est un assistant de développement.

Les décisions d'architecture, de conception et de priorisation appartiennent toujours au développeur.

Codex propose des solutions mais ne décide jamais à la place du développeur.