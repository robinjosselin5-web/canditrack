# Sprint Goal — Sprint 02

## Objectif

Valider que toutes les fonctionnalités du Sprint 02 sont terminées, cohérentes et conformes à la documentation.

---

## User Stories concernées

* US-006 — Ajouter une entreprise
* US-022 — Afficher les entreprises
* US-007 — Modifier une entreprise
* US-008 — Supprimer une entreprise
* US-009 — Consulter une entreprise

---

## Fonctionnalités attendues

### Création

* création d'une entreprise
* validation des champs
* website accepte `google.com`
* website est enregistré avec `https://`
* statut initial = `draft`

---

### Liste

* affichage d'une carte par entreprise
* tri par date décroissante
* état vide
* loading
* error

---

### Navigation

* clic sur une CompanyCard ouvre :

`/companies/:id`

* Favori et menu d'actions ne déclenchent pas la navigation.

---

### Consultation

Afficher :

* nom
* statut
* website
* email
* téléphone
* ville
* pays
* recruteur
* createdAt
* updatedAt

---

### Modification

* formulaire prérempli
* sauvegarde
* rafraîchissement de la fiche
* rafraîchissement de la liste

---

### Suppression

* confirmation
* suppression
* retour automatique vers `/companies`

---

## Sécurité

* JWT obligatoire
* utilisateur isolé
* aucun accès aux entreprises d'un autre utilisateur

---

## Architecture

Vérifier :

* architecture respectée
* aucun `any`
* services séparés
* hooks séparés
* composants réutilisés
* aucune logique métier dans les composants

---

## Qualité

* TypeScript OK
* ESLint OK
* Build OK

---

## Définition de Done

Le Sprint est terminé si toutes les User Stories sont conformes et qu'aucun point bloquant n'est détecté.
