# Testing Strategy

Version : 1.0

Projet : CandiTrack

---

# Objectif

Ce document définit la stratégie de tests officielle du projet.

Tous les développements doivent respecter cette stratégie afin de garantir :

- la stabilité du projet ;
- la non-régression ;
- la qualité du code ;
- la facilité de maintenance.

Chaque User Story doit être accompagnée de tests adaptés.

---

# Philosophie

Le projet applique une stratégie de tests progressive.

Plus une logique est critique, plus elle doit être testée.

L'objectif n'est pas d'avoir 100 % de couverture.

L'objectif est d'avoir une couverture intelligente.

---

# Pyramide des tests

```

```
           E2E
        Integration
      Unit Tests
```

La majorité des tests sont :

- unitaires

Puis :

- intégration

Enfin :

- end-to-end

---

# Stack

## Unit Testing

Vitest

React Testing Library

---

## Integration Testing

Vitest

MSW

---

## End-to-End

Playwright

---

## API Testing

Postman

ou

Bruno

---

# Arborescence

```
src/

features/

companies/

components/

CompanyCard/

CompanyCard.tsx

CompanyCard.test.tsx

```

Chaque composant possède son propre fichier de test.

---

# Ce qui doit être testé

## Composants

Tester :

- affichage
- interactions
- props
- états

Ne jamais tester :

le CSS.

---

## Hooks

Tester :

- valeurs retournées
- erreurs
- états
- appels API

---

## Services

Tester :

- appels HTTP
- erreurs
- mapping des données

---

## Utils

Tester :

- tous les cas

Les fonctions utilitaires doivent être couvertes à 100 %.

---

# Cas à tester

Toujours prévoir :

Cas nominal

Cas vide

Cas erreur

Cas limite

Exemple

Input vide

Email invalide

Entreprise inexistante

API indisponible

---

# User Stories

Chaque User Story doit posséder :

- ses tests unitaires
- ses cas limites
- sa checklist

---

Exemple

US-006

Ajouter une entreprise.

Tests :

✓ Création réussie

✓ Nom obligatoire

✓ Email invalide

✓ IA indisponible

✓ Utilisateur non connecté

---

# Critères d'acceptation

Les critères Given / When / Then doivent être transformés en tests.

Exemple

Given

Utilisateur connecté.

When

Il ajoute une entreprise.

Then

La fiche apparaît.

Ce scénario devient un test.

---

# Mock

Les appels API doivent être mockés.

Utiliser :

MSW

Jamais :

des appels réseau réels.

---

# Données de test

Créer des fixtures.

Exemple

```
company.fixture.ts

user.fixture.ts

resume.fixture.ts
```

Toujours réutiliser ces fixtures.

Ne jamais recréer les mêmes données.

---

# Couverture

Objectif :

Global

80 %

Utils

100 %

Services

90 %

Hooks

80 %

Composants critiques

80 %

---

# Performance

Les tests doivent être rapides.

Un test unitaire ne doit jamais dépendre :

- du réseau
- de la base
- d'un service externe

---

# Tests E2E

Tester uniquement les parcours utilisateurs.

Exemple

Connexion

↓

Création entreprise

↓

Résumé IA

↓

Envoi candidature

↓

Statut Pending

---

Ne jamais tester chaque petit composant en E2E.

---

# Tests API

Chaque endpoint doit être testé.

Tester :

200

201

400

401

403

404

500

---

# Sécurité

Tester :

JWT invalide

JWT expiré

Utilisateur non autorisé

Payload invalide

Injection SQL

XSS

---

# Accessibilité

Utiliser :

Testing Library

Tester :

navigation clavier

focus

aria-label

labels

---

# Responsive

Tester :

Mobile

Tablette

Desktop

---

# Avant chaque Pull Request

Les tests doivent passer.

Aucun merge si :

Un test échoue.

---

# Régression

Chaque bug corrigé doit être accompagné :

d'un nouveau test.

Ainsi :

Le bug ne pourra plus revenir.

---

# Workflow

Lorsque Codex termine une User Story :

Toujours proposer :

1.

Tests unitaires

2.

Tests d'intégration

3.

Cas limites

4.

Checklist de validation

5.

Scénarios Playwright

---

# Exemple

US-017

Envoyer une candidature.

Tests unitaires

✓ validation formulaire

✓ génération email

✓ changement statut

Tests intégration

✓ appel API

✓ mise à jour cache

Tests E2E

✓ utilisateur envoie une candidature complète

---

# Définition d'une User Story terminée

Une User Story n'est jamais considérée comme terminée si :

- les tests ne sont pas écrits
- les tests ne passent pas

---

# Qualité

Le projet privilégie :

des tests lisibles

plutôt

que

des tests nombreux.

Un test doit expliquer le comportement attendu.

---

# Source de vérité

Ce document est la référence officielle concernant la stratégie de tests.

Toute évolution devra être documentée ici.