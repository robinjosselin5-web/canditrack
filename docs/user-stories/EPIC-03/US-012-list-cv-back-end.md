# US-012-BACK - Consulter la liste de mes CV

## Objectif

Implémenter uniquement le backend permettant de récupérer la liste des CV de l'utilisateur connecté.

Le front-end est déjà développé.

Ne modifier aucun composant front-end sauf si une adaptation mineure est nécessaire au branchement de l'API.

---

# Fonctionnalités attendues

Créer une route permettant de retourner tous les CV appartenant à l'utilisateur authentifié.

Le backend doit :

- récupérer l'utilisateur connecté ;
- récupérer son `CandidateProfile` ;
- récupérer tous les `CandidateCv` associés ;
- trier les CV du plus récent au plus ancien (`uploadedAt DESC`) ;
- retourner uniquement les informations utiles au front-end.

---

# Architecture

Respecter l'architecture actuelle du projet.

Créer uniquement les éléments nécessaires :

- route ;
- controller ;
- service ;
- repository.

Ne pas refactoriser les autres couches.

---

# Candidate Repository

Créer le dossier :

src/server/repositories/candidate/

Pour cette User Story, créer uniquement :

- candidateCvRepository.ts

Les autres repositories seront créés uniquement lorsqu'ils deviendront nécessaires dans les futures User Stories.

Ne pas créer de fichiers vides.

---

# API

Créer la route :

```http
GET /api/profile/cv
```

---

## Réponse

Retourner uniquement les informations utiles au front.

Ne jamais retourner :

- storageKey
- storageFilename
- fileHash
- chemin physique
- autres informations techniques

Structure attendue :

```json
{
  "cvs": [
    {
      "id": "...",
      "label": "...",
      "originalFilename": "...",
      "mimeType": "application/pdf",
      "fileSize": 123456,
      "uploadedAt": "...",
      "isDefault": true,
      "analysisStatus": "NOT_ANALYZED",
      "lastAnalyzedAt": null
    }
  ]
}
```

Si aucun CV :

```json
{
  "cvs": []
}
```

---

# Sécurité

- utilisateur authentifié obligatoire ;
- un utilisateur ne peut consulter que ses propres CV.

Retour :

- 401 si non authentifié.

---

# Prisma

Utiliser les modèles existants.

Ne modifier aucun modèle Prisma.

Ne créer aucune migration.

---

# Front-end

Ne modifier aucun composant.

Le seul objectif est que le front existant puisse consommer l'API.

Adapter uniquement :

- le service API si nécessaire.

---

# Contraintes

Ne pas développer :

- upload de fichier ;
- suppression d'un CV ;
- changement du CV principal ;
- analyse IA ;
- données extraites ;
- téléchargement du PDF.

---

# Tests

Vérifier :

- récupération d'un CV ;
- récupération de plusieurs CV ;
- récupération d'une liste vide ;
- tri par date d'import décroissante ;
- protection de la route ;
- impossibilité d'accéder aux CV d'un autre utilisateur ;
- les champs sensibles ne sont jamais exposés ;
- le `CandidateCvRepository` est utilisé par le service.

---

# Definition of Done

- Route GET `/api/profile/cv` fonctionnelle.
- Les CV proviennent du `CandidateCvRepository`.
- Le service ne contient pas de requête Prisma directe.
- Les CV sont triés du plus récent au plus ancien.
- Les champs sensibles ne sont jamais exposés.
- Aucun modèle Prisma n'a été modifié.
- Aucun frontend n'a été modifié inutilement.
- Les tests backend passent.
- Aucune régression n'est introduite.
