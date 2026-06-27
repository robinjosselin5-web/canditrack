# Design System

Version : 1.0

Projet : CandiTrack

---

# Objectif

Ce document définit l'identité visuelle de l'application.

Tous les composants doivent respecter ce Design System afin de garantir une interface cohérente, moderne et facilement maintenable.

Les composants développés doivent être réutilisables.

---

# ADN graphique

L'application doit inspirer :

- la confiance
- l'organisation
- la simplicité
- le professionnalisme
- la sérénité

Le design est inspiré des applications SaaS modernes.

Références :

- Linear
- Notion
- Attio CRM
- Stripe Dashboard
- Trello
- Figma

L'interface privilégie les espaces blancs, les cartes légères et les animations discrètes.

---

# Palette de couleurs

## Primary

Nom

Blue Pastel

Hex

```css
#7AA2F7
```

Utilisation

- Boutons principaux
- Liens
- Focus
- Icônes principales

---

## Secondary

Sage

```css
#A8D5BA
```

Utilisation

- Boutons secondaires
- Éléments positifs

---

## Accent

Lavender

```css
#C8B6FF
```

Utilisation

- Éléments mis en avant
- IA
- Badges

---

## Success

```css
#AEE6C4
```

---

## Warning

```css
#FFD6A5
```

---

## Error

```css
#F7A8A8
```

---

# Couleurs neutres

## Background

```css
#FAFAFC
```

---

## Surface

```css
#FFFFFF
```

---

## Border

```css
#E6E8EF
```

---

## Divider

```css
#F2F4F8
```

---

## Texte principal

```css
#2E3440
```

---

## Texte secondaire

```css
#6B7280
```

---

## Placeholder

```css
#9CA3AF
```

---

# Couleurs des statuts

Draft

```css
#CBD5E1
```

Pending

```css
#7AA2F7
```

No Response

```css
#FFD6A5
```

Follow Up

```css
#C8B6FF
```

Interview

```css
#AEE6C4
```

Rejected

```css
#F7A8A8
```

Accepted

```css
#7ED6A5
```

Les cartes ne changent jamais complètement de couleur.

Seule une barre verticale colorée indique le statut.

---

# Typographie

Police principale

Inter

Google Fonts

https://fonts.google.com/specimen/Inter

Utilisations

H1

32px

700

---

H2

26px

700

---

H3

22px

600

---

H4

18px

600

---

Texte

16px

400

---

Petit texte

14px

400

---

Caption

12px

400

---

Line Height

150%

---

# Icônes

Librairie

Lucide React

Toujours utiliser :

- 20 px
- 24 px

Jamais plus.

Les icônes doivent toujours être accompagnées d'un texte lorsqu'elles représentent une action.

---

# Espacements

Grille

4px

Les espacements autorisés sont :

4

8

12

16

20

24

32

40

48

64

96

Aucune valeur arbitraire.

---

# Radius

Input

12px

Button

14px

Card

16px

Modal

20px

Avatar

999px

---

# Ombres

Shadow Small

```css
0 2px 8px rgba(15,23,42,.04)
```

---

Shadow Medium

```css
0 8px 30px rgba(15,23,42,.06)
```

---

Shadow Large

```css
0 16px 40px rgba(15,23,42,.08)
```

Les ombres restent discrètes.

---

# Boutons

## Primary Button

Background

Primary

Texte

Blanc

Hover

Plus foncé de 10%

---

## Secondary Button

Fond blanc

Bordure grise

Texte foncé

---

## Ghost Button

Transparent

Hover

Fond gris clair

---

## Danger Button

Fond rouge pastel

Texte blanc

---

# Inputs

Hauteur

48px

Radius

12px

Padding

16px

Border

1px

Couleur

Border

Focus

Primary

Erreur

Error

Succès

Success

---

# Cards

Fond

Blanc

Radius

16px

Padding

24px

Border

1px Border

Shadow Medium

Les cartes sont toujours utilisées pour afficher :

- une entreprise
- un CV
- une statistique
- une catégorie

---

# Dashboard

Le Dashboard utilise :

Sidebar fixe

Header fixe

Contenu scrollable

Cartes organisées en grille

Maximum

4 colonnes desktop

1 colonne mobile

---

# Sidebar

Largeur

280px

Fond blanc

Border droite

Navigation verticale

Logo en haut

Utilisateur en bas

---

# Header

Hauteur

72px

Contient

- recherche
- notifications
- avatar

Fond blanc

Border inférieure

---

# Modales

Largeur maximale

600px

Radius

20px

Fond blanc

Padding

32px

Fermeture via

- bouton
- Escape
- clic extérieur

---

# Animations

Durée

200 ms

Timing

ease-in-out

Animations autorisées

Fade

Slide

Scale

Aucune animation excessive.

---

# Responsive

Approche

Mobile First

Breakpoints

sm

640

md

768

lg

1024

xl

1280

2xl

1536

Tous les composants doivent être responsive.

---

# Accessibilité

Respect des recommandations WCAG.

Tous les boutons :

- focus visible
- clavier
- aria-label lorsque nécessaire

Les contrastes doivent rester conformes.

---

# Illustrations

Style

Flat Design

Pastel

Coins arrondis

Fond transparent

Jamais de style réaliste.

---

# Logo

Le logo est composé :

- d'un document
- d'une enveloppe
- d'une fusée

Style

Minimaliste

Monochrome

Pastel

Fond transparent

---

# Philosophie UI

Avant de créer un nouveau composant, toujours se demander :

- Existe-t-il déjà ?
- Peut-il être réutilisé ?
- Est-il suffisamment simple ?
- Respecte-t-il les espacements ?
- Respecte-t-il les couleurs ?
- Respecte-t-il la hiérarchie typographique ?

L'objectif est de produire une interface élégante, cohérente et intuitive, où chaque composant semble appartenir au même écosystème visuel.