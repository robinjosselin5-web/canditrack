---

id: US-008
epic: EPIC-02
title: Supprimer une entreprise
priority: Must
storyPoints: 2
status: Todo
sprint: Sprint-02
-----------------

# US-008 — Supprimer une entreprise

## Objectif

Permettre à un utilisateur connecté de supprimer une entreprise depuis sa carte.

## Dépendances

* US-002
* US-006
* US-022

## Écran

`/companies`

Action :

`CompanyCard → Menu actions → Supprimer`

## API

### DELETE `/api/v1/companies/:id`

Réponse :

```json
{
  "success": true,
  "message": "Entreprise supprimée avec succès."
}
```

## Règles métier

* JWT obligatoire.
* L'utilisateur ne peut supprimer que ses propres entreprises.
* Confirmation obligatoire avant suppression.
* Suppression physique.
* Après succès, la carte disparaît de la liste.
* Si l'entreprise n'existe pas : `404`.
* Si l'entreprise appartient à un autre utilisateur : `403` ou `404`.

## Critères d'acceptation

### AC-01

Given une entreprise est affichée
When l'utilisateur clique sur `Supprimer`
Then une modale de confirmation apparaît

### AC-02

Given la modale est ouverte
When l'utilisateur clique sur `Annuler`
Then aucune suppression n'est faite

### AC-03

Given l'utilisateur confirme
When l'API répond avec succès
Then l'entreprise disparaît de la liste

### AC-04

Given l'API retourne une erreur
When la suppression échoue
Then un message lisible est affiché

## Frontend

Créer ou compléter :

* `company.service.ts`
* `useDeleteCompany.ts`
* `CompanyCard`
* `CompaniesPage`
* `ConfirmationModal` si inexistant

UI attendue :

* menu actions déjà présent
* bouton `Supprimer`
* modale confirmation
* loading pendant suppression
* toast succès
* message erreur

## Backend

Créer ou compléter :

* route `DELETE /api/v1/companies/:id`
* controller company
* service company
* repository company
* vérification propriétaire via JWT

## Hors périmètre

Ne pas développer :

* soft delete
* restauration
* suppression groupée
* détail entreprise
* favoris
* IA
* modification

## Tests minimum

* modale ouverte
* annulation
* suppression réussie
* carte retirée
* refus sans JWT
* refus autre utilisateur
* entreprise inexistante

## Done

* suppression depuis carte
* confirmation avant suppression
* suppression en base
* liste rafraîchie
* erreurs propres
* aucun `any`
* TypeScript OK
* ESLint OK
