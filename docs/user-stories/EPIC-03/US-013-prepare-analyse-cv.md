# US-013 - Préparer l'analyse d'un CV

## User Story

**En tant qu'utilisateur**, je souhaite lancer l'analyse d'un CV afin que l'application prépare son contenu pour une future extraction des données.

---

# Objectif

Préparer toute l'infrastructure nécessaire à l'analyse d'un CV sans encore utiliser d'intelligence artificielle.

Cette User Story couvre uniquement :

- la récupération du CV ;
- la vérification des droits ;
- l'extraction du texte du PDF ;
- le stockage temporaire du texte ;
- la mise à jour du statut d'analyse.

L'analyse IA sera développée dans la prochaine User Story.

---

# Fonctionnalités attendues

Depuis la page **Mes CV** :

L'utilisateur peut lancer l'analyse d'un CV.

Le système doit :

1. Vérifier que l'utilisateur est connecté.
2. Vérifier que le CV lui appartient.
3. Vérifier qu'aucune analyse n'est déjà en cours.
4. Récupérer le fichier PDF.
5. Extraire le texte du PDF.
6. Vérifier que le texte est exploitable.
7. Stocker le texte extrait.
8. Passer le statut du CV à **COMPLETED**.

---

# Base de données

## Mise à jour CandidateCv

Ajouter le champ suivant :

| Champ | Type | Description |
|--------|------|-------------|
| extractedText | String? | Texte brut extrait du PDF |

Le texte servira de source pour la future analyse IA.

---

# Dépendances

Installer uniquement :

```bash
npm install pdf-parse
```

Utiliser :

- pdf-parse

Ne pas installer OpenAI.

---

# API

Créer :

```http
POST /api/profile/cv/:cvId/analyze
```

---

# Comportement

Le serveur doit :

1. vérifier l'utilisateur connecté ;
2. vérifier que le CV lui appartient ;
3. vérifier `analysisStatus != PROCESSING` ;
4. passer `analysisStatus = PROCESSING` ;
5. récupérer le PDF ;
6. extraire son texte ;
7. vérifier que le texte n'est pas vide ;
8. enregistrer `extractedText` ;
9. mettre à jour :

```text
analysisStatus = COMPLETED
lastAnalyzedAt = now()
```

En cas d'erreur :

```text
analysisStatus = FAILED
```

---

# Validation

Refuser :

- CV inexistant ;
- utilisateur non autorisé ;
- analyse déjà en cours ;
- PDF vide ;
- texte non exploitable.

---

# Front-end

Depuis la liste des CV.

Le bouton :

```
Analyser
```

doit :

- appeler l'API ;
- afficher un état de chargement ;
- rafraîchir la liste des CV ;
- afficher le nouveau statut.

---

# Hors périmètre

Ne pas développer :

- OpenAI ;
- prompts ;
- JSON Schema ;
- extraction des formations ;
- extraction des compétences ;
- extraction des expériences ;
- sauvegarde des données extraites.

---

# Tests

Tester :

- analyse d'un CV valide ;
- extraction correcte du texte ;
- stockage du texte ;
- changement de statut ;
- gestion des erreurs.

---

# Definition of Done

- Le texte du PDF est extrait.
- Le texte est enregistré.
- Les statuts sont correctement mis à jour.
- La date de dernière analyse est renseignée.
- Le bouton Analyser fonctionne.
- Aucun appel OpenAI n'est présent.