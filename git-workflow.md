# Git Workflow

## Branches

- main : version stable
- develop : intégration du Sprint courant
- feature/US-XXX-name : développement d'une User Story

## Convention de branche

feature/US-006-create-company
fix/US-006-validation-error
refactor/company-service
docs/sprint-02-user-stories

## Convention de commit

type(scope): description

Types :
- feat
- fix
- docs
- style
- refactor
- test
- chore

Exemples :
feat(company): add create company form
fix(company): handle empty company name
test(company): add create company tests
feat(US-006): complete create company user story

## Workflow

1. Créer une branche depuis develop
2. Développer une seule User Story
3. Tester
4. Committer
5. Push
6. Pull Request vers develop
7. Review
8. Merge
9. Supprimer la branche

## Fin de Sprint

À la fin du Sprint :
- merge develop dans main
- créer un tag de version
- documenter la release