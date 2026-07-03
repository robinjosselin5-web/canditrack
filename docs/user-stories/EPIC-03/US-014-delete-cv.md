# US-014 - Supprimer un CV

## User Story

**En tant qu'utilisateur**, je souhaite supprimer un CV afin de retirer les versions dont je n'ai plus besoin.

---

## Objectif

Permettre à l'utilisateur connecté de supprimer un CV importé depuis la page **Mes CV**.

Cette US couvre :

- la suppression du CV en base de données ;
- la suppression du fichier physique ;
- la mise à jour de la liste des CV ;
- la gestion du cas où le CV supprimé est le CV principal.

---

## Fonctionnalités attendues

Depuis la page **Mes CV**, chaque carte CV affiche une action :

```txt
Supprimer