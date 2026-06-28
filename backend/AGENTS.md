# Backend

Architecture :

Controller
→ Service
→ Repository
→ Prisma

Règles :

- Prisma uniquement dans les repositories.
- Toute logique métier dans les services.
- Les controllers ne contiennent que la validation et la réponse HTTP.
- Utiliser les types TypeScript.
- Gérer les erreurs proprement.