# Frontend

Architecture :

pages/
components/
hooks/
services/
contexts/

Regles :

- Composants petits et reutilisables.
- Hooks personnalises pour la logique partagee.
- Pas de logique metier dans les composants de presentation.
- Props fortement typees.
- Mobile First.
- Les sous-dossiers de `src/features/<feature>/` sont optionnels et ne doivent exister que s'ils sont utiles.
- `components/`, `hooks/`, `services/`, `types/`, `utils/`, `validation/` et `config/` ne sont pas obligatoires pour toutes les features.
- `index.ts` n'est requis que si la feature expose une API publique consommee depuis `@/features/<feature>`.
- Ne pas creer de dossiers vides uniquement pour obtenir une structure symetrique.