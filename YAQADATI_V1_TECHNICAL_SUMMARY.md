# Yaqadati V1 - Technical Summary

## Description generale

Yaqadati est une application web pedagogique destinee aux enseignants du primaire.
Elle propose de courtes activites de pleine attention pour soutenir l'entree dans les apprentissages : s'installer, ecouter, respirer, ralentir, se concentrer et revenir vers le travail scolaire.

L'application ne remplace pas l'enseignant. Elle structure son geste pedagogique : choix de la station, modelage, lancement de l'activite, accompagnement des eleves et ajustement selon l'etat de la classe.

## Technologies utilisees

- React
- Vite
- Tailwind CSS
- JavaScript / JSX
- HTML
- CSS
- lucide-react pour les icones

## Structure de l'application

- `src/App.jsx` : logique principale, stations, activites, mode enseignant, mode projection, timer, controles et integration des assets.
- `src/i18n.js` : textes arabes et francais, traduction des stations et activites.
- `src/index.css` : theme clair/sombre, styles responsive, animations CSS, styles de projection.
- `public/assets/visuals` : videos optionnelles pour les stations enrichies.
- `public/assets/audio` : sons optionnels.
- `GOOGLE_FLOW_PROMPTS.md` : prompts et noms de fichiers attendus pour les assets generes.

## Gestion arabe / francais

L'application propose un choix de langue entre arabe et francais.
Les textes d'interface, les stations, les activites, les objectifs, les consignes et les controles sont localises via `src/i18n.js`.

La langue arabe est la langue par defaut. Le francais reste disponible depuis l'interface enseignant.

## Gestion RTL / LTR

La direction de lecture depend de la langue active :

- arabe : `dir="rtl"`
- francais : `dir="ltr"`

Les alignements de texte et certains placements d'interface s'adaptent a cette direction.

## Theme clair / sombre

Le theme clair est le theme par defaut pour favoriser la projection en classe.
Le theme sombre reste disponible comme option.
Le choix est memorise dans `localStorage`.

## Stations disponibles en V1

Cinq stations sont visibles dans l'interface V1 :

1. Debut de seance
2. Apres la recreation
3. Avant la lecture
4. Avant les mathematiques
5. Avant l'ecriture

Les donnees des stations supplementaires restent dans le code, mais ne sont pas affichees dans la V1.

## Stations enrichies

Deux stations disposent d'un enrichissement visuel et sonore optionnel :

- Debut de seance
- Apres la recreation

Les autres stations visibles restent volontairement simples, sans animation lourde ni son specifique.

## Assets video / audio

Les videos sont optionnelles. Si elles sont presentes, elles sont affichees dans le mode enseignant et le mode projection. Si elles sont absentes, l'application garde un fallback CSS sans erreur.

Videos attendues :

- `public/assets/visuals/start-session-breathing.mp4`
- `public/assets/visuals/recess-return-listen.mp4`
- `public/assets/visuals/recess-return-slow-down.mp4`

Sons attendus :

- `public/assets/audio/soft-start-chime.mp3`
- `public/assets/audio/soft-end-bell.mp3`
- `public/assets/audio/calm-background-loop.mp3`

Si les sons sont absents, les sons synthetiques Web Audio restent disponibles en fallback.

## Mode enseignant

Le mode enseignant affiche :

- le choix de langue ;
- le choix de theme ;
- le controle du son ;
- les cinq stations V1 ;
- les activites de la station selectionnee ;
- le titre de l'activite ;
- l'objectif pedagogique ;
- une indication breve pour l'enseignant ;
- la duree ;
- les consignes ;
- le bouton de lancement ;
- une zone d'observation rapide apres activite.

## Mode projection

Le mode projection est simplifie pour les eleves.
Il affiche :

- le titre de la station ;
- le titre court de l'activite ;
- une phrase courte ;
- une video ou un fallback visuel doux pour les stations enrichies ;
- un timer lisible ;
- les controles essentiels pour l'enseignant.

Les longs textes pedagogiques restent dans le mode enseignant.

## Controles disponibles

Pendant l'activite, l'enseignant peut :

- mettre en pause ;
- reprendre ;
- reinitialiser ;
- couper ou reactiver le son ;
- arreter l'activite ;
- revenir a l'ecran enseignant.

## Tests realises

Tests realises pendant la stabilisation V1 :

- verification des fichiers et dossiers attendus ;
- verification de la presence des assets video fournis ;
- audit visuel local via serveur Vite et Chrome headless ;
- controle du theme clair par defaut ;
- controle du theme sombre ;
- controle arabe / francais ;
- controle RTL / LTR ;
- controle des cinq stations visibles ;
- controle des deux variantes de la station Apres la recreation ;
- controle des videos par activite ;
- controle des boutons de projection ;
- build de production avec `npm run build`.

## Limites actuelles

- L'application est encore une application web classique, pas une PWA.
- Les assets audio restent optionnels et ne sont pas encore fournis dans `public/assets/audio`.
- Les observations enseignant ne sont pas persistees dans une base de donnees.
- Il n'existe pas encore de mode hors-ligne.
- Il n'existe pas encore d'installation sur appareil mobile.
- Les donnees des stations sont encore majoritairement centralisees dans `src/App.jsx`.

## Pistes pour la version PWA

- Ajouter un manifest web app.
- Ajouter une icone d'application.
- Ajouter un service worker.
- Mettre en cache les assets principaux.
- Prevoir un mode hors-ligne pour les stations V1.
- Optimiser le chargement des videos.
- Ajouter une strategie de cache pour les sons.
- Tester l'installation sur tablette, ordinateur de classe et navigateur mobile.
- Eventuellement separer les donnees pedagogiques dans un fichier dedie.
