# CandiTrack

## 1. Fiche d'identite

**Nom du projet** : CandiTrack

**Type d'application** : application web de suivi de candidatures, avec une interface React/TypeScript et une API Node.js/Express.

**Description courte** : le depot regroupe un front-end organise par features, un back-end REST type en TypeScript et une base PostgreSQL geree via Prisma. L'application couvre l'authentification, le suivi des entreprises, le profil utilisateur et la gestion de CV candidats.

## 2. Objectif / Presentation

CandiTrack sert a centraliser le suivi d'une recherche d'emploi ou de stage. L'utilisateur peut se connecter, gerer son profil, suivre les entreprises ciblees, marquer ses favoris et importer des CV au format PDF.

Le projet cible avant tout un candidat qui souhaite structurer ses demarches dans une seule interface. La navigation front expose aussi des pages dediees au tableau de bord, aux candidatures, aux statistiques et a l'exploitation des donnees extraites depuis les CV.

## 3. Fonctionnalites principales

Fonctionnalites effectivement observees dans le code :

- Authentification utilisateur : inscription, connexion, deconnexion, verification d'e-mail, renvoi du code de verification, mot de passe oublie, reinitialisation du mot de passe.
- Profil utilisateur : consultation et mise a jour du profil courant via `/users/me`.
- Gestion des entreprises : listing, creation, consultation detail, modification, suppression, mise en favori.
- Gestion des CV candidats : import PDF, listing, suppression, statut d'analyse, extraction de texte et pipeline d'analyse de CV cote serveur.
- Donnees extraites du CV cote front : pages dediees aux experiences, competences et formations.
- Pages applicatives transverses : tableau de bord, candidatures, statistiques, parametres.
- API de sante : endpoint `/api/v1/health`.
- E-mails transactionnels : verification d'e-mail et reinitialisation de mot de passe via `nodemailer`, avec script local MailDev.

Points a noter :

- Le schema Prisma contient aussi les modeles `Application`, `Resume`, `Note`, `Category` et `ActionHistory`.
- En revanche, seules les routes API d'authentification, utilisateur, entreprises, CV candidat et sante sont actuellement visibles dans `src/server/routes`.
- Les pages `Dashboard`, `Applications` et `Statistics` existent cote front, mais leur alimentation API dediee n'apparait pas dans les routes serveur presentes.

## 4. Stack technique

### Interface utilisateur

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS v4
- Lucide React

### Serveur / API

- Node.js
- Express 5
- TypeScript
- Middleware CORS
- Validation des payloads avec Zod
- JWT pour l'authentification

### Persistance des donnees

- PostgreSQL
- Prisma
- `@prisma/adapter-pg`
- Migrations versionnees dans `prisma/migrations/`

### Outils transverses

- Auth : `jsonwebtoken`, `bcrypt`
- Upload de fichiers : `multer`
- Lecture PDF : `pdf-parse`
- E-mails : `nodemailer`, `maildev`
- HTTP client front : `axios`
- Qualite de code : ESLint, Prettier

## 5. Architecture du depot

Le depot suit une organisation mixte :

- architecture front par feature dans `src/features/`
- composants transverses dans `src/components/`
- routes et layouts partages dans `src/routes/` et `src/layouts/`
- back-end isole dans `src/server/`
- schema et migrations de base dans `prisma/`
- documentation produit, technique et UX dans `docs/`

### Organisation principale

```text
.
|- docs/                Documentation produit, technique, design, backlog
|- prisma/              Schema Prisma, migrations, consignes DB
|- public/              Assets statiques publics
|- src/
|  |- components/       UI partagee
|  |- config/           Navigation et configuration front partagee
|  |- features/         Code metier front par domaine
|  |- layouts/          Coquilles d'ecran
|  |- lib/              Infrastructure front, ex. QueryClient
|  |- pages/            Pages globales ou temporaires hors feature
|  |- routes/           Routage front, gardes public/prive
|  |- services/         Services front transverses
|  |- store/            Etat global front
|  |- types/            Types front generiques
|  `- server/           API Express, logique metier et acces donnees
|- docker-compose.yml   Postgres local
`- package.json         Scripts et dependances
```

### Logique de rangement

- `src/features/auth/` : pages, hooks, schemas et services lies a l'authentification.
- `src/features/companies/` : gestion des entreprises, formulaires, filtres et pages detail.
- `src/features/resumes/` : liste des CV, cartes de CV et pages de donnees extraites.
- `src/features/user/` : page de parametres, profil et hooks associes.
- `src/server/controllers/` : adaptation HTTP.
- `src/server/services/` : logique metier.
- `src/server/repositories/` : acces Prisma.
- `src/server/validators/` : schemas de validation.

Les fichiers `AGENTS.md` et `docs/01-architecture.md` confirment l'intention suivante :

- front mobile-first
- composants petits et reutilisables
- logique metier hors composants de presentation
- back organise en chaine `Controller -> Service -> Repository -> Prisma`
- Prisma utilise uniquement depuis les repositories

## 6. Mise en route

### Prerequis

- Node.js
- npm
- PostgreSQL
- optionnel : Docker Compose pour demarrer Postgres localement
- optionnel : MailDev pour visualiser les e-mails en local

### Installation

```bash
npm install
```

### Variables d'environnement

Variables serveur effectivement typees dans `src/server/config/env.ts` :

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/canditrack
JWT_SECRET=change-this-development-secret-with-at-least-32-characters
EMAIL_VERIFICATION_EXPIRES_MINUTES=30
PASSWORD_RESET_EXPIRES_MINUTES=30
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
MAIL_FROM=CandiTrack <noreply@canditrack.local>
VITE_API_URL=http://localhost:3000/api/v1
```

Variables egalement presentes dans `.env.example` :

```env
AI_CV_ANALYSIS_ENABLED=true
OPENROUTER_API_KEY=
OPENROUTER_MODEL=google/gemini-2.5-flash
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

Comme ces variables IA ne sont pas declarees dans le schema `src/server/config/env.ts`, leur usage exact doit etre valide sur la branche avant une mise en production.

### Base de donnees

Deux approches de lecture sont visibles dans le depot :

1. Avec Docker Compose

```bash
docker compose up -d
```

Le service PostgreSQL expose :

- base : `canditrack`
- utilisateur : `postgres`
- mot de passe : `postgres`
- port : `5432`

2. Avec une instance PostgreSQL locale configuree dans `DATABASE_URL`

### Commandes de developpement

```bash
npm run dev
npm run server:dev
npm run mail:dev
```

### Commandes de qualite et de build

```bash
npm run lint
npm run build
npm run server:build
npm run server:start
npm run prisma:generate
npm run prisma:validate
npm run prisma:migrate
npm run prisma:studio
```

### Tests

Le depot contient des fichiers de test unitaires, par exemple :

- `src/features/companies/utils/companySchema.test.ts`
- `src/server/validators/candidateCvValidators.test.ts`

En revanche, aucun script `npm test` n'est defini dans `package.json`. La strategie de tests est documentee dans `docs/06-testing.md`, mais l'execution standardisee des tests reste a confirmer.

## 7. Documentation complementaire

### Documentation dans `docs/`

- `docs/00-project-overview.md` : vue d'ensemble produit, objectifs, public cible, fonctionnalites et vision.
- `docs/01-architecture.md` : architecture generale, structure des dossiers, conventions React et circulation des donnees.
- `docs/02-design-system.md` : palette, typographie, composants et principes UI.
- `docs/03-ui-components.md` : inventaire cible des composants UI et metier.
- `docs/04-database.md` : structure de la base, tables, relations et contraintes metier.
- `docs/05-api.md` : conventions REST et catalogue d'endpoints cibles.
- `docs/06-testing.md` : strategie de tests, pyramide, couverture et definition of done qualite.
- `docs/07-backlog.md` : backlog par epic et user stories.
- `docs/08-coding-guidelines.md` : conventions de code, organisation et workflow de developpement.
- `docs/09-decisions.md` : journal de decisions d'architecture.

### Documentation produit et UX

- `docs/user-stories/` : user stories par sprint et par epic, avec objectifs, regles metier, wireframes et criteres d'acceptation.
- `docs/wireframes/` : wireframes des ecrans cles.
- `docs/mockups/` : mockups des ecrans cles.

### Fichiers de consignes

- `AGENTS.md` : regles globales du depot, stack, conventions de nommage et discipline de modification.
- `src/AGENTS.md` : principes front-end, architecture, typage fort, mobile-first.
- `src/server/AGENTS.md` : principes back-end, separation controller/service/repository.
- `prisma/AGENTS.md` : regles de modification Prisma et migrations.
- `src/pages/README.md` : role du dossier `src/pages/` pour les pages globales ou temporaires.
- `git-workflow.md` : conventions de branches, commits et workflow Git.

## 8. Conventions de code

Conventions identifiees dans `AGENTS.md`, `docs/08-coding-guidelines.md` et la structure du depot :

- `camelCase` pour les variables et fonctions.
- `PascalCase` pour les composants, pages et classes.
- prefixe `I` pour certaines interfaces, par exemple `IServerEnv`.
- `UPPER_CASE` pour les constantes.
- suffixe `Page` pour les composants de page, ex. `LoginPage.tsx`.
- suffixe `.types.ts` pour les types metier ou techniques.
- suffixe `.test.ts` pour les tests unitaires.
- dossiers `components/`, `hooks/`, `services/`, `types/`, `utils/` reserves a des responsabilites claires.
- `config/` reserve aux constantes, mappings et parametres statiques, pas a la logique metier ni aux composants React.
- code front fortement type et centre sur les features.
- code back separe entre validation HTTP, logique metier et acces aux donnees.
- Prisma comme source de verite du modele relationnel.

Autres regles visibles :

- ne modifier que les fichiers necessaires
- reutiliser le code existant
- eviter les dependances inutiles
- garder le projet compilable
- une user story correspond a une branche Git
- prefixes de commit attendus : `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
