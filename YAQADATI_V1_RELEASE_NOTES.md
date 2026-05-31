# Yaqadati V1 - Release Notes

## Inclus dans la V1

- Application web React / Vite / Tailwind CSS.
- Interface bilingue arabe / francais.
- Gestion RTL pour l'arabe et LTR pour le francais.
- Theme clair par defaut pour la projection en classe.
- Theme sombre conserve comme option.
- Cinq stations visibles :
  - Debut de seance
  - Apres la recreation
  - Avant la lecture
  - Avant les mathematiques
  - Avant l'ecriture
- Mode enseignant avec objectif pedagogique, duree, consignes, controle du son et bouton de lancement.
- Mode projection eleves avec phrase courte, timer lisible et controles enseignant.
- Station Debut de seance enrichie avec video optionnelle et fallback CSS.
- Station Apres la recreation enrichie avec deux variantes :
  - On ecoute / نستمع
  - On ralentit / نخفّف الحركة
- Fallback propre si une video ou un son est absent.
- Prompts Google Flow documentes dans `GOOGLE_FLOW_PROMPTS.md`.

## Reporte volontairement a la V2

- Transformation en PWA.
- Installation sur tablette ou ordinateur.
- Mode hors-ligne.
- Persistance des observations enseignant.
- Tableau de bord ou historique de classe.
- Voix guidee.
- Ajout de sons definitifs si les fichiers ne sont pas fournis.
- Enrichissement visuel de toutes les stations.
- Gestion avancee du volume par station.
- Parametrage fin des durees par l'enseignant.

## Fichiers video attendus

Les videos doivent etre placees dans `public/assets/visuals`.

- `start-session-breathing.mp4`
- `recess-return-listen.mp4`
- `recess-return-slow-down.mp4`

Si une video est absente, l'application utilise un fallback visuel CSS.

## Sons attendus

Les sons doivent etre places dans `public/assets/audio`.

- `soft-start-chime.mp3`
- `soft-end-bell.mp3`
- `calm-background-loop.mp3`

Si un son est absent, l'application continue de fonctionner sans erreur et peut utiliser un fallback sonore leger.

## Precautions d'usage en classe

- L'enseignant garde le role central : il choisit, explique, modele, accompagne et ajuste.
- Les activites doivent rester courtes.
- Le son doit rester optionnel et peu envahissant.
- Les videos servent de support visuel, pas de sequence autonome.
- Les eleves ne doivent pas lire de longs textes pedagogiques pendant la projection.
- Le theme clair est recommande pour une projection en classe.
- L'activite doit preparer l'entree dans le travail scolaire, pas remplacer la conduite de classe.
- En cas d'agitation forte, l'enseignant adapte ou interrompt l'activite.
