# US-011 - Importer un ou plusieurs CV

## Objectif

Implémenter l'import sécurisé de plusieurs CV PDF pour un utilisateur authentifié.

Cette User Story couvre uniquement :

- la mise à jour de la base de données ;
- le stockage du fichier ;
- l'upload sécurisé ;
- l'association du CV au profil candidat.

Ne pas implémenter l'analyse IA.

---

# Fonctionnalités attendues

## Profil candidat

Un utilisateur possède un seul `CandidateProfile`.

Si le profil n'existe pas lors du premier import :

- le créer automatiquement.

---

## Import d'un CV

L'utilisateur peut :

- sélectionner un fichier PDF ;
- saisir un nom personnalisé (label) optionnel ;
- envoyer son CV.

Si aucun label n'est renseigné :

- utiliser automatiquement le nom du fichier sans son extension.

---

## Validation

Refuser :

- les fichiers non PDF ;
- les fichiers vides ;
- les fichiers supérieurs à 10 Mo.

Retourner un message d'erreur explicite.

---

## Stockage

Le fichier doit être stocké dans un dossier dédié.

Contraintes :

- générer un nom physique unique ;
- conserver le nom original ;
- calculer l'empreinte SHA-256 du fichier ;
- enregistrer uniquement une `storageKey` en base ;
- ne jamais exposer le chemin réel.

Exemple :

```txt
users/{userId}/cvs/{uuid}.pdf
```

---

## Détection des doublons

Lors de l'import :

- calculer le hash SHA-256 du fichier ;
- enregistrer cette empreinte dans la base de données (`fileHash`) ;
- permettre de détecter si un utilisateur importe exactement le même fichier ultérieurement.

⚠️ Pour cette User Story :

- enregistrer le hash uniquement ;
- ne pas empêcher encore l'import d'un doublon ;
- la gestion des doublons sera développée dans une future User Story.

Cette empreinte servira notamment à :

- éviter de réanalyser plusieurs fois un même CV ;
- détecter les doublons ;
- préparer un système de cache pour les futures analyses IA.

---

## Gestion de plusieurs CV

Un utilisateur peut importer plusieurs CV.

Chaque CV :

- possède son propre identifiant ;
- est indépendant des autres.

Le premier CV importé :

- devient automatiquement le CV principal (`isDefault = true`).

Les imports suivants :

- conservent le CV principal existant.

---

# Base de données

Mettre à jour Prisma.

Créer les modèles :

- CandidateProfile
- CandidateCv

Créer les relations avec User.

Ajouter les migrations.

Ne pas modifier les autres tables.

---

## CandidateProfile

- id
- userId
- createdAt
- updatedAt

---

## CandidateCv

- id
- candidateProfileId
- label
- originalFilename
- storageFilename
- storageKey
- fileHash
- mimeType
- fileSize
- isDefault
- uploadedAt
- createdAt
- updatedAt

---

## Exemple Prisma

```prisma
model CandidateCv {
  id                 String   @id @default(cuid())
  candidateProfileId String

  label              String
  originalFilename   String
  storageFilename    String
  storageKey         String

  /// Empreinte SHA-256 du fichier importé
  fileHash           String?  @unique

  mimeType           String
  fileSize           Int

  isDefault          Boolean  @default(false)

  uploadedAt         DateTime @default(now())
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  candidateProfile CandidateProfile
    @relation(fields: [candidateProfileId], references: [id], onDelete: Cascade)
}
```

---

# Backend

Créer les éléments nécessaires :

- route d'import ;
- contrôleur ;
- service ;
- repository si le projet en possède.

Respecter l'architecture actuelle.

---

## API

Créer :

```http
POST /api/profile/cv
```

Comportement :

- vérifier l'utilisateur connecté ;
- créer le `CandidateProfile` si nécessaire ;
- valider le fichier ;
- calculer le hash SHA-256 ;
- générer un nom physique unique ;
- stocker le fichier ;
- créer le `CandidateCv` ;
- définir automatiquement le premier CV comme principal.

Retour :

- 201
- 400
- 401
- 413
- 500

---

## Dépendances techniques

Installer :

- `multer` pour gérer l'upload multipart/form-data ;
- `@types/multer` en dépendance de développement si le projet utilise TypeScript.

Ne pas ajouter de dépendance pour :

- le hash SHA-256 : utiliser le module natif `node:crypto` ;
- la gestion des fichiers : utiliser `node:fs/promises` ;
- la gestion des chemins : utiliser `node:path`.

# Front-end

Brancher le bouton **Importer un CV** créé dans l'US-012.

Au clic sur le bouton **Importer un CV** :

- ouvrir une modal d'import ;
- ne pas rediriger vers une autre page.

---

## Modal d'import CV

La modal doit contenir :

- un titre **Importer un CV** ;
- un champ fichier pour sélectionner un CV au format PDF ;
- un champ texte optionnel pour renseigner le label du CV ;
- un bouton **Annuler** ;
- un bouton **Importer**.

---

## Validations front-end

Avant l'envoi :

- vérifier qu'un fichier est sélectionné ;
- vérifier que le fichier est au format PDF ;
- vérifier que le fichier ne dépasse pas 10 Mo ;
- vérifier que le label ne dépasse pas 50 caractères.

Afficher un message d'erreur explicite dans la modal.

---

## Envoi

Au clic sur **Importer** :

- envoyer le fichier et le label au backend ;
- afficher un état de chargement pendant l'envoi ;
- désactiver le bouton **Importer** pendant l'envoi.

---

## Après succès

Après un import réussi :

- fermer la modal ;
- réinitialiser le formulaire ;
- afficher un message de succès ;
- rafraîchir la liste des CV ;
- afficher le nouveau CV dans la liste.

---

## Après erreur

En cas d'erreur :

- garder la modal ouverte ;
- afficher le message d'erreur dans la modal ;
- permettre à l'utilisateur de corriger puis réessayer.

# Contraintes

Ne pas développer :

- analyse IA ;
- extraction du texte ;
- détection fonctionnelle des doublons ;
- suppression d'un CV ;
- changement du CV principal ;
- aperçu du PDF ;
- téléchargement ;
- modification du label.

---

# Tests

Vérifier :

- import d'un PDF valide ;
- import sans label ;
- import avec label ;
- calcul correct du hash SHA-256 ;
- enregistrement du `fileHash` ;
- refus des fichiers invalides ;
- création automatique du `CandidateProfile` ;
- création du premier CV principal ;
- ajout d'un second CV ;
- stockage sécurisé du fichier.

---

# Definition of Done

- Migration Prisma créée.
- Modèles Prisma fonctionnels.
- Le champ `fileHash` est ajouté et renseigné.
- Le hash SHA-256 est calculé à chaque import.
- Upload sécurisé fonctionnel.
- Plusieurs CV possibles.
- Premier CV principal.
- Formulaire relié au backend.
- Messages d'erreur gérés.
- Tests backend ajoutés.
- Aucune régression sur l'authentification.