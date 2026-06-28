# Sprint Goal

Mettre en place les fondations techniques de CandiTrack en developpant le systeme complet d'authentification.

## Statut

Pret pour validation fonctionnelle.

Le Sprint 01 couvre les parcours essentiels d'authentification et de gestion de session. Les fondations frontend, backend, validation, persistance de session et protection des routes sont en place.

## Objectifs

- Creation de compte
- Connexion
- Deconnexion
- Reinitialisation du mot de passe
- Gestion du profil

## User Stories concernees

| User Story | Objectif | Statut de couverture |
| --- | --- | --- |
| US-001 | Creation de compte utilisateur | Couvert |
| US-002 | Connexion utilisateur | Couvert |
| US-003 | Deconnexion utilisateur | Couvert |
| US-004 | Reinitialisation du mot de passe | Couvert avec MailDev en local |
| US-005 | Gestion du profil utilisateur | Couvert pour les informations personnelles |

## Resultat attendu

A la fin du Sprint, un utilisateur peut creer un compte, s'authentifier, gerer son profil et acceder aux fonctionnalites protegees de l'application.

## Resultat obtenu

L'utilisateur peut :

- creer un compte avec validation frontend et backend ;
- se connecter avec un JWT ;
- choisir une session persistante via "Se souvenir de moi" ;
- acceder uniquement aux routes protegees lorsqu'il est authentifie ;
- se deconnecter avec suppression de la session et nettoyage du cache React Query ;
- demander une reinitialisation de mot de passe ;
- recevoir le lien de reinitialisation via MailDev en local ;
- definir un nouveau mot de passe ;
- consulter et modifier son profil personnel.

## Fondations techniques livrees

- Routes publiques et protegees cote frontend.
- Layout d'authentification.
- Layout applicatif connecte.
- Store d'authentification centralise.
- Services API dedies.
- Validation Zod cote frontend et backend.
- Controllers, services et repositories backend.
- Prisma connecte a PostgreSQL.
- Envoi d'e-mails local via MailDev.
- Gestion du profil via `/api/v1/users/me`.

## Points de vigilance

- L'upload d'avatar mentionne dans US-005 n'est pas encore branche cote backend.
- Les tests automatises unitaires, integration et E2E restent a ajouter.
- La validation finale depend d'un test manuel avec PostgreSQL, API, frontend et MailDev demarres.

## Validation conseillee

1. Demarrer PostgreSQL.
2. Lancer l'API backend.
3. Lancer le frontend.
4. Lancer MailDev.
5. Tester le parcours complet :
   - creation de compte ;
   - connexion ;
   - acces dashboard ;
   - modification du profil ;
   - deconnexion ;
   - reinitialisation du mot de passe.

## Definition of Done du Sprint

Le Sprint peut etre considere comme valide lorsque :

- toutes les User Stories Sprint-01 passent en validation manuelle ;
- ESLint ne retourne aucune erreur ;
- TypeScript compile sans erreur ;
- les parcours critiques fonctionnent en local ;
- les limites connues sont documentees ;
- les tests automatises prioritaires sont planifies.

## Prochaine etape

Valider fonctionnellement le Sprint 01 en local, puis creer les tests automatises prioritaires avant d'ouvrir le Sprint suivant.
