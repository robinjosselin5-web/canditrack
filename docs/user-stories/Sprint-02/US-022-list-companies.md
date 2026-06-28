---

id: US-022
epic: EPIC-06
title: Afficher les entreprises ajoutées
priority: Must
storyPoints: 8
status: Todo
sprint: Sprint-02
-----------------

# US-022 — Afficher les entreprises ajoutées

## Objectif

Permettre à un utilisateur connecté de visualiser toutes les entreprises qu'il a ajoutées sous forme de cartes dans l'onglet **Entreprises**.

## Description

En tant qu'utilisateur connecté, je souhaite voir une carte pour chaque entreprise enregistrée afin de consulter rapidement mes candidatures et accéder aux actions associées.

## Dépendances

* US-002 — Connexion utilisateur
* US-006 — Ajouter une entreprise
* Backend local fonctionnel
* Authentification JWT fonctionnelle

## Écran concerné

Onglet :

```text
Entreprises
```

Route recommandée :

```text
/companies
```

## API

### GET `/api/v1/companies`

Retourne toutes les entreprises de l'utilisateur connecté.

Response attendue :

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Google",
      "website": "https://www.google.com",
      "email": "rh@google.com",
      "phone": "0123456789",
      "city": "Paris",
      "country": "France",
      "recruiterName": "John Doe",
      "status": "draft",
      "createdAt": "2026-06-28T10:00:00.000Z",
      "updatedAt": "2026-06-28T10:00:00.000Z"
    }
  ]
}
```

## Règles métier

* L'utilisateur doit être connecté.
* L'utilisateur ne voit que ses propres entreprises.
* Une entreprise enregistrée correspond à une carte affichée.
* Les entreprises sont triées par date de création décroissante.
* Le statut par défaut d'une entreprise nouvellement créée est `draft`.
* Si aucune entreprise n'existe, afficher un état vide.
* Une entreprise sans champ optionnel renseigné doit quand même s'afficher correctement.
* Aucun utilisateur ne peut voir les entreprises d'un autre utilisateur.

## Données affichées sur chaque carte

Chaque carte entreprise doit afficher au minimum :

| Donnée              | Obligatoire sur la carte |
| ------------------- | -----------------------: |
| Nom de l'entreprise |                      Oui |
| Site web            |                      Oui |
| Adresse e-mail      |                      Oui |
| Ville               |            Si disponible |
| Pays                |            Si disponible |
| Recruteur           |            Si disponible |
| Statut              |                      Oui |
| Date d'ajout        |                      Oui |

## Structure visuelle d'une carte

Chaque carte doit contenir :

* un titre avec le nom de l'entreprise ;
* un badge de statut ;
* le site web ;
* l'adresse e-mail ;
* la localisation si disponible ;
* le nom du recruteur si disponible ;
* la date d'ajout ;
* un menu d'actions visuel, même non fonctionnel dans cette US.

Exemple de contenu :

```text
Google
Statut : Brouillon
Site : https://www.google.com
Email : rh@google.com
Localisation : Paris, France
Recruteur : John Doe
Ajoutée le : 28/06/2026
```

## Couleur du statut

Le badge de statut doit utiliser les couleurs définies dans :

```text
docs/design-system.md
```

Mapping attendu :

| Statut technique | Libellé affiché | Couleur     |
| ---------------- | --------------- | ----------- |
| draft            | Brouillon       | Gris        |
| pending          | En attente      | Bleu pastel |
| no_response      | Sans réponse    | Pêche       |
| follow_up        | À relancer      | Lavande     |
| interview        | Entretien       | Menthe      |
| rejected         | Refusée         | Rose pastel |
| accepted         | Acceptée        | Vert        |

## Critères d'acceptation

### AC-01 — Affichage des cartes

Given l'utilisateur est connecté
When il ouvre l'onglet Entreprises
Then une carte est affichée pour chaque entreprise enregistrée

### AC-02 — Données affichées

Given une entreprise possède un nom, un site web et un email
When la carte est affichée
Then ces informations sont visibles sur la carte

### AC-03 — Champs optionnels absents

Given une entreprise n'a pas de ville, pays ou recruteur
When la carte est affichée
Then la carte reste propre et n'affiche pas de valeur vide ou `undefined`

### AC-04 — Isolation utilisateur

Given plusieurs utilisateurs ont des entreprises
When un utilisateur ouvre l'onglet Entreprises
Then seules ses propres entreprises sont affichées

### AC-05 — Tri des entreprises

Given plusieurs entreprises existent
When elles sont affichées
Then les plus récentes apparaissent en premier

### AC-06 — État vide

Given l'utilisateur n'a aucune entreprise
When il ouvre l'onglet Entreprises
Then un état vide est affiché avec un bouton **Ajouter une entreprise**

### AC-07 — Erreur API

Given l'API retourne une erreur
When la page charge les entreprises
Then un message d'erreur compréhensible est affiché

## Frontend attendu

Créer ou compléter :

* `features/companies/types`
* `features/companies/services/company.service.ts`
* `features/companies/hooks/useCompanies.ts`
* `features/companies/components/CompanyCard`
* `features/companies/pages/CompaniesPage`

Utiliser :

* TanStack Query
* AppLayout
* Card
* Badge
* Button
* EmptyState
* Loader ou Skeleton
* Alert

## Backend attendu

Créer ou compléter :

* route `GET /api/v1/companies`
* controller company
* service company
* repository company
* middleware auth JWT

## États de l'interface

### Loading

Afficher un loader ou skeleton de cartes.

### Success

Afficher une grille de cartes entreprises.

### Empty

Afficher un état vide :

```text
Aucune entreprise ajoutée.
Commencez par ajouter votre première entreprise.
```

Avec un bouton :

```text
Ajouter une entreprise
```

### Error

Afficher un message :

```text
Impossible de charger les entreprises.
Veuillez réessayer.
```

## Responsive

Mobile :

* cartes affichées en une colonne ;
* largeur 100 % ;
* espacement vertical de 16 px.

Desktop :

* cartes affichées en grille ;
* 2 à 3 colonnes selon la largeur disponible.

## Hors périmètre

Ne pas développer :

* modification d'entreprise ;
* suppression d'entreprise ;
* détail complet d'entreprise ;
* résumé IA ;
* drag & drop ;
* filtres avancés ;
* actions du menu.

Le menu d'actions peut être visible mais non fonctionnel.

## Tests attendus

Minimum :

* récupération des entreprises côté backend ;
* liste filtrée par utilisateur connecté ;
* affichage d'une carte par entreprise ;
* absence de texte `undefined` dans une carte ;
* affichage loading ;
* affichage empty state ;
* affichage erreur ;
* tri par date décroissante.

## Définition de Done

L'US est terminée lorsque :

* l'utilisateur voit une carte par entreprise enregistrée ;
* les cartes sont affichées dans l'onglet Entreprises ;
* les données principales sont visibles ;
* les champs optionnels absents n'affichent pas `undefined` ;
* les entreprises appartiennent uniquement à l'utilisateur connecté ;
* les entreprises sont triées de la plus récente à la plus ancienne ;
* un état vide existe ;
* les erreurs API sont gérées proprement ;
* TypeScript ne retourne aucune erreur ;
* ESLint ne retourne aucune erreur.
