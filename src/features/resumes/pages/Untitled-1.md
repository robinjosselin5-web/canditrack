**ExperiencesPage**
1. Données actuellement utilisées  
   - `title`, `company`, `description`, `period`, `id`  
   - Données statiques en dur dans `experienceItems`
2. Données manquantes  
   - Identité du CV sélectionné
   - Données extraites réelles par expérience: `jobTitle`, `companyName`, `startDate`, `endDate`, `location`, `summary`, éventuellement `isCurrent`
   - Gestion d’un vrai flux de données côté API
3. Format TypeScript recommandé  
   - `IExperience = { id: string; jobTitle: string; companyName: string; startDate: string | null; endDate: string | null; isCurrent: boolean; location?: string; description?: string }`
   - `IExperiencePageData = { cvId: string; experiences: IExperience[] }`
4. Source probable des données  
   - Aujourd’hui: aucune source réelle, seulement mock local
   - Pour du réel: `route param` (`cvId`) + `service API existant` seulement si une réponse d’analyse expose déjà les expériences
   - Sinon: `nouvel endpoint nécessaire`
5. États nécessaires  
   - `loading`: oui
   - `error`: oui
   - `empty`: oui
6. Incohérences éventuelles  
   - Données de démo codées en dur, donc la page n’est pas liée à un vrai CV
   - `period` est une chaîne affichée, alors qu’un vrai modèle devrait plutôt séparer dates de début/fin
   - Le bouton `Modifier` n’a pas d’action
   - Le menu “options” est visuel seulement

**SkillsPage / CompetencesPage**
1. Données actuellement utilisées  
   - `title`, `skills[]`, `id`
   - Données statiques en dur dans `skillCategories`
2. Données manquantes  
   - CV sélectionné
   - Catégorisation réelle des compétences extraites
   - Type de score, source ou niveau éventuel des compétences si l’extraction le permet
   - Données normalisées pour éviter les doublons et les variantes d’écriture
3. Format TypeScript recommandé  
   - `ISkillCategory = { id: string; name: string; skills: string[] }`
   - Si extraction enrichie: `ISkill = { name: string; category: SkillCategoryKey; confidence?: number; source?: string }`
   - `ISkillsPageData = { cvId: string; categories: ISkillCategory[] }`
4. Source probable des données  
   - Aujourd’hui: aucune source réelle, mock local
   - Pour du réel: `route param` (`cvId`) + soit `state/contexte` si la page précédente transporte l’extraction, soit `service API existant`
   - Vu l’existant actuel, un `nouvel endpoint nécessaire` est probable si l’API ne renvoie que la liste des CV et l’état d’analyse
5. États nécessaires  
   - `loading`: oui
   - `error`: oui
   - `empty`: oui
6. Incohérences éventuelles  
   - Nom de fichier `SkillsPage` alors que l’US parle de `CompetencesPage`
   - Les catégories affichées sont fixes, donc elles ne reflètent pas forcément un CV réel
   - Le bouton “Ajouter une compétence” est singulier dans le code mais l’UI demandée mentionne “une compéténces” et surtout une action plus métier
   - Le breadcrumb est correct, mais il dépend toujours d’un retour fixe vers `/profile/cv/extracted-data`

**TrainingPage**
1. Données actuellement utilisées  
   - `title`, `organization`, `period`, `id`
   - Données statiques en dur dans `trainingItems`
2. Données manquantes  
   - CV sélectionné
   - Distinction entre formation initiale, certification, diplôme, titre, etc.
   - Données extraites réelles: `schoolName`, `degree`, `fieldOfStudy`, `startDate`, `endDate`, `description`, `location`, `certificationType`
3. Format TypeScript recommandé  
   - `ITraining = { id: string; label: string; organizationName: string; startDate: string | null; endDate: string | null; isCertification: boolean; description?: string; location?: string }`
   - `ITrainingPageData = { cvId: string; trainings: ITraining[] }`
4. Source probable des données  
   - Aujourd’hui: mock local
   - Pour du réel: `route param` (`cvId`) + `service API existant` seulement si l’analyse renvoie déjà les formations
   - Sinon: `nouvel endpoint nécessaire`
5. États nécessaires  
   - `loading`: oui
   - `error`: oui
   - `empty`: oui
6. Incohérences éventuelles  
   - Le titre de page est “Formation”, ce qui colle au contenu, mais il ne reflète pas forcément le nom métier attendu par l’US si la page doit représenter les études + certifications
   - Les certifications sont mélangées aux diplômes sans séparation visuelle ni typage métier
   - Le bouton “Ajouter un élément” est générique, alors que l’UI métier devrait probablement préciser le type d’ajout

**Synthèse à mutualiser**
- Un même `cvId` devrait piloter les 3 pages.
- Un même contrat de chargement est à mutualiser: `loading`, `error`, `empty`, `success`.
- Le socle de données devrait probablement venir d’un même objet d’analyse CV, avec 3 sous-sections: `experiences`, `skills`, `training`.
- Les trois pages utilisent actuellement des mocks locaux, donc il manque très probablement un endpoint d’extraction structuré, ou au minimum un état de navigation/contexte qui transporte les données analysées du CV sélectionné.