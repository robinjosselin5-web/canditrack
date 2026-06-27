# Database

Version : 1.0

Projet : CandiTrack

---

# Objectif

Ce document décrit le modèle de données officiel de CandiTrack.

Il constitue l'unique source de vérité concernant :

- les tables
- les colonnes
- les relations
- les contraintes
- les statuts

Aucun développeur ne doit inventer une colonne ou une relation.

Toute modification doit être documentée ici.

---

# SGBD

PostgreSQL

---

# Convention générale

Toutes les tables utilisent :

- UUID comme clé primaire
- snake_case
- created_at
- updated_at

Toutes les clés étrangères utilisent :

xxx_id

Exemple

user_id

company_id

category_id

---

# Enum

## CompanyStatus

Les statuts possibles sont :

```text
draft
pending
no_response
follow_up
interview
rejected
accepted
```

Ne jamais inventer un nouveau statut.

---

# Table users

Description

Contient les utilisateurs.

Colonnes

id UUID PK

firstname VARCHAR(100)

lastname VARCHAR(100)

email VARCHAR(255)

password_hash VARCHAR(255)

created_at TIMESTAMP

updated_at TIMESTAMP

Contraintes

email UNIQUE

password_hash NOT NULL

---

# Table companies

Description

Entreprises suivies.

Colonnes

id UUID PK

user_id UUID FK

category_id UUID FK NULLABLE

name VARCHAR(255)

website VARCHAR(255)

sector VARCHAR(150)

city VARCHAR(100)

country VARCHAR(100)

email VARCHAR(255)

phone VARCHAR(50)

recruiter_name VARCHAR(150)

ai_summary TEXT

status CompanyStatus

is_favorite BOOLEAN

created_at TIMESTAMP

updated_at TIMESTAMP

---

# Table categories

Colonnes

id UUID PK

user_id UUID FK

name VARCHAR(100)

color VARCHAR(30)

position INTEGER

created_at TIMESTAMP

updated_at TIMESTAMP

---

# Table resumes

Description

CV de l'utilisateur.

Colonnes

id UUID PK

user_id UUID FK

name VARCHAR(150)

file_url TEXT

file_type VARCHAR(20)

file_size INTEGER

uploaded_at TIMESTAMP

---

# Table applications

Description

Historique des candidatures.

Colonnes

id UUID PK

company_id UUID FK

resume_id UUID FK

email_subject VARCHAR(255)

email_body TEXT

status CompanyStatus

sent_at TIMESTAMP

created_at TIMESTAMP

---

# Table notes

Colonnes

id UUID PK

company_id UUID FK

content TEXT

created_at TIMESTAMP

updated_at TIMESTAMP

---

# Table action_history

Colonnes

id UUID PK

company_id UUID FK

action_type VARCHAR(100)

description TEXT

created_at TIMESTAMP

---

# Relations

User

↓

Companies

1:N

---

User

↓

Categories

1:N

---

User

↓

Resumes

1:N

---

Category

↓

Companies

1:N

---

Company

↓

Applications

1:N

---

Company

↓

Notes

1:N

---

Company

↓

ActionHistory

1:N

---

Resume

↓

Applications

1:N

---

# Suppressions

Suppression d'un utilisateur :

↓

Suppression de :

- entreprises
- catégories
- CV
- notes
- candidatures
- historique

Cascade autorisée.

---

# Colonnes obligatoires

Toutes les tables possèdent :

id

created_at

Certaines possèdent :

updated_at

---

# Soft Delete

Le projet ne met pas en place de Soft Delete.

Les suppressions sont physiques.

Une évolution future pourra ajouter :

deleted_at

---

# Index

Créer les index suivants.

companies.user_id

companies.category_id

companies.status

companies.created_at

companies.name

applications.company_id

notes.company_id

categories.user_id

resumes.user_id

---

# Contraintes métier

Une entreprise appartient toujours à un utilisateur.

Une catégorie appartient toujours à un utilisateur.

Une candidature possède toujours :

- une entreprise
- un CV

Une note appartient toujours à une entreprise.

---

# Règles

Ne jamais :

renommer une colonne

changer un type

supprimer une relation

sans mettre à jour :

- Prisma
- API
- Types
- Documentation

---

# Évolution

Toute nouvelle table doit respecter :

UUID

snake_case

created_at

updated_at si nécessaire

Les nouvelles relations doivent être documentées ici avant développement.

---

# Source de vérité

Ce document est la référence officielle du modèle de données.

En cas de doute :

toujours suivre ce document.

Ne jamais inventer une colonne.