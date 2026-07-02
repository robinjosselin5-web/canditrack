<div align="center">

# CandiTrack

Application web de suivi de candidatures, avec un front-end React/TypeScript et un back-end Node/Express typés, reliés a PostgreSQL via Prisma.

</div>

---

## Presentation

CandiTrack permet de gerer:

- les entreprises suivies
- les candidatures
- les CV importes
- le profil utilisateur
- les statistiques et pages de suivi associees

Le projet est organise pour separer clairement le front-end, le back-end et la documentation fonctionnelle.

---

## Stack Technique

- Frontend: React, TypeScript, Vite, React Router, TanStack Query, React Hook Form, Zod, Tailwind CSS, Lucide React
- Backend: Node.js, Express, TypeScript
- Donnees: PostgreSQL, Prisma, `@prisma/adapter-pg`
- Outils: Axios, bcrypt, JWT, Multer, Nodemailer, MailDev, ESLint

---

## Fonctionnalites Principales

- Authentification
- Gestion du profil utilisateur
- Gestion des entreprises
- Gestion des CV
- Pages de dashboard, candidatures et statistiques
- Envoi d'e-mails locaux pour les parcours d'authentification

La fonctionnalite CV est exposee dans l'interface front-end et cote API via `/api/profile/cv`.

---

## Architecture du Depot

Le depot suit une architecture basee sur les features.

```text
src/
├── components/
├── config/
├── features/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── routes/
├── services/
├── store/
├── types/
└── utils/
```

### Principes importants

- `src/features/*` contient le code specifique a un domaine fonctionnel
- `src/features/<feature>/config/` contient uniquement des constantes, mappings ou listes statiques propres a la feature
- aucun composant React, hook, service ou logique metier ne doit etre place dans `config/`
- on ne cree un dossier `config/` que lorsqu'une feature contient vraiment ce type de fichiers
- `src/pages/` contient les pages globales ou temporaires pas encore rattachees a une feature
- `src/server/` contient toute la partie back-end
- `src/server/types/` contient les types serveur, y compris les augmentations Express

---

## Installation

```bash
git clone https://github.com/USERNAME/canditrack.git
cd canditrack
npm install
```

---

## Variables d'Environnement

Creer un fichier `.env` a la racine du projet.

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
MAIL_FROM=CandiTrack <noreply@canditrack.local>
VITE_API_URL=http://localhost:3000/api/v1
```

Notes:

- `DATABASE_URL` est utilisee par Prisma
- `VITE_API_URL` est utilisee cote front-end
- d'autres variables peuvent exister dans le code serveur, a verifier dans `src/server/config/env.ts`

---

## Base de Donnees / Prisma

Prisma est la source de verite du modele de donnees et des migrations applicatives.

Le backend utilise `@prisma/adapter-pg` avec une connexion PostgreSQL locale definie dans `src/server/config/prisma.ts`.

Scripts utilitaires:

```bash
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

Le schema Prisma est defini dans:

```text
prisma/schema.prisma
```

Les migrations Prisma sont dans:

```text
prisma/migrations/
```

---

## Commandes Utiles

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Qualite

```bash
npm run lint
```

### Back-end

```bash
npm run server:dev
npm run server:build
npm run server:start
```

### E-mails locaux

```bash
npm run mail:dev
```

MailDev est ensuite disponible sur:

```text
http://localhost:1080
```

---

## Documentation Projet

La documentation principale se trouve dans:

```text
docs/
```

Contenu utile:

- `docs/01-architecture.md`
- `docs/02-design-system.md`
- `docs/04-database.md`
- `docs/05-api.md`
- `docs/06-testing.md`
- `docs/07-backlog.md`
- `docs/08-coding-guidelines.md`
- `docs/user-stories/`

### Consignes Codex / agents

- `AGENTS.md` a la racine pour les regles globales
- `src/AGENTS.md` pour le front-end
- `src/server/AGENTS.md` pour le back-end

---

## Conventions Importantes

- `*Page.tsx` pour les pages React
- `*.types.ts` pour les types et augmentations de types
- `config/` pour les constantes et configurations non React
- `components/` pour les composants React reutilisables
- `hooks/` pour la logique React partagee
- `services/` pour les appels API ou la logique d'acces aux donnees
- `config/` reste reserve aux valeurs statiques locales a une feature, jamais aux composants

---

## Notes de Contexte

- Le dossier `src/pages/` contient les pages globales non encore rattachees a une feature dediee.
- Le dossier `public/` est le seul emplacement attendu pour les ressources statiques.
- Certains fichiers et pages conservent encore le vocabulaire `CV` dans l'UI ou les routes API pour rester compatibles avec l'existant, a verifier avant tout renommage transversal.
