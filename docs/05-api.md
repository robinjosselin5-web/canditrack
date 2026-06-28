# API

Version : 1.0

Projet : CandiTrack

---

# Objectif

Ce document décrit l'API REST officielle.

Toutes les communications entre le Frontend et le Backend doivent respecter ce contrat.

Les routes décrites ici sont la seule source de vérité.

---

# Conventions

## Base URL

/api/v1

---

## Format

Toutes les requêtes utilisent :

application/json

---

## Authentification

JWT Bearer Token

Header :

Authorization

```
Bearer <token>
```

---

## Réponses

Succès

```json
{
    "success": true,
    "data": {}
}
```

Erreur

```json
{
    "success": false,
    "message": "Human readable message",
    "errors": []
}
```

Toutes les réponses doivent respecter ce format.

---

# Codes HTTP

200

OK

201

Created

204

No Content

400

Bad Request

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

422

Validation Error

500

Internal Server Error

---

# Auth

## POST /auth/register

Créer un compte.

Body

```json
{
    "firstname": "",
    "lastname": "",
    "email": "",
    "password": ""
}
```

Response

```json
{
    "email": ""
}
```

Un code alphanumerique de 5 caracteres est envoye par e-mail.

Le code expire apres 30 minutes.

---

## POST /auth/email-verification/verify

Valider l'adresse e-mail apres inscription.

Body

```json
{
    "email": "",
    "code": ""
}
```

Response

```json
{
    "user": {},
    "token": ""
}
```

---

## POST /auth/email-verification/resend

Renvoyer un code de validation pour un compte non valide.

Body

```json
{
    "email": ""
}
```

Response

```json
{
    "email": ""
}
```

---

## POST /auth/login

Connexion.

Body

```json
{
    "email": "",
    "password": ""
}
```

Response

```json
{
    "user": {},
    "token": ""
}
```

Si le compte n'est pas valide, la connexion retourne 403 et aucun token n'est genere.

---

## POST /auth/logout

Déconnexion.

Body

Aucun.

---

## GET /auth/me

Retourne l'utilisateur connecté.

---

# Companies

## GET /companies

Retourne toutes les entreprises.

Supporte :

page

limit

search

status

category

favorite

sort

---

## GET /companies/:id

Retourne une entreprise.

---

## POST /companies

Créer une entreprise.

Body

```json
{
    "name": "",
    "website": "",
    "email": "",
    "phone": "",
    "categoryId": ""
}
```

Le résumé IA est généré automatiquement après la création.

---

## PATCH /companies/:id

Modifier une entreprise.

Tous les champs sont optionnels.

---

## DELETE /companies/:id

Supprimer une entreprise.

---

## PATCH /companies/:id/status

Modifier le statut.

Body

```json
{
    "status": "pending"
}
```

Statuts autorisés

- draft
- pending
- no_response
- follow_up
- interview
- rejected
- accepted

---

## PATCH /companies/:id/favorite

Ajouter ou retirer des favoris.

Body

```json
{
    "favorite": true
}
```

---

# Categories

## GET /categories

Retourne toutes les catégories.

---

## POST /categories

Créer une catégorie.

Body

```json
{
    "name": "",
    "color": ""
}
```

---

## PATCH /categories/:id

Modifier une catégorie.

---

## DELETE /categories/:id

Supprimer une catégorie.

---

# Notes

## GET /companies/:id/notes

Retourne les notes.

---

## POST /companies/:id/notes

Créer une note.

Body

```json
{
    "content": ""
}
```

---

## PATCH /notes/:id

Modifier une note.

---

## DELETE /notes/:id

Supprimer une note.

---

# Resumes

## GET /resumes

Retourne les CV.

---

## POST /resumes

Upload d'un CV.

Multipart/form-data

Champs :

- file

Formats

- PDF
- DOCX

Maximum

5 MB

---

## DELETE /resumes/:id

Supprimer un CV.

---

# Applications

## GET /applications

Retourne les candidatures.

---

## POST /applications

Créer une candidature.

Body

```json
{
    "companyId": "",
    "resumeId": "",
    "emailSubject": "",
    "emailBody": ""
}
```

Le statut de l'entreprise passe automatiquement à :

pending

---

# AI

## POST /ai/company-summary

Générer un résumé.

Body

```json
{
    "companyId": ""
}
```

Response

```json
{
    "summary": ""
}
```

---

## POST /ai/email

Générer un email.

Body

```json
{
    "companyId": "",
    "resumeId": ""
}
```

Response

```json
{
    "subject": "",
    "body": ""
}
```

---

## POST /ai/cover-letter

Future version.

---

# Dashboard

## GET /dashboard

Retourne :

- statistiques
- entreprises
- catégories
- derniers événements

---

# Statistics

## GET /statistics

Retourne

- nombre de candidatures
- nombre d'entretiens
- taux de réponse
- taux de succès

---

# Action History

## GET /history

Retourne l'historique.

---

# Pagination

Toutes les listes utilisent :

```
?page=1

&limit=20
```

Réponse

```json
{
    "items": [],
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
}
```

---

# Recherche

Toutes les listes supportent

```
search=
```

---

# Tri

```
sort=name

sort=createdAt

sort=status
```

---

# Validation

Toutes les données reçues sont validées.

Les validations utilisent :

Zod

Aucune donnée du Frontend n'est considérée comme fiable.

---

# Versionnement

Toutes les routes commencent par

```
/api/v1
```

Une future version utilisera

```
/api/v2
```

sans casser les anciennes.

---

# Principes

Une route = une responsabilité.

Toujours utiliser :

GET

POST

PATCH

DELETE

Éviter PUT sauf remplacement complet d'une ressource.

---

# Source de vérité

Ce document est la référence officielle de l'API.

Toute nouvelle route doit être ajoutée ici avant d'être développée.
