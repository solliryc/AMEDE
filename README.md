# AMEDE: Auchinleck Manuscript Enhanced Digital Edition
![homepage](screenshots/homepage.PNG)

## Demo
https://solliryc.github.io/AMEDE/

## Description
AMEDE, pour Auchinleck Manuscript Enhanced Digital Edition, est une édition numérique du *Auchinleck Manuscript* augmentée qui permet à la fois de consulter facilement les différents poèmes, mais aussi de s'informer sur les mots qui les composent, tout en restant fidèle à la retranscription d'origine.

Le *Auchinleck Manuscript* est un recueil de poèmes produit à Londres dans les années 1330, qui fait office d'oeuvre de référence de la période du *Middle English* (env. de 1050 à 1500). Composé de 43 poèmes, le *Auchinleck Manuscript* donne de nombreuses informations sur l'état de la langue anglaise et la formation des dialectes à une époque où la langue anglaise n'était pas uniformisé.

Le *Auchinleck Manuscript* a été numérisé et retranscrit par la *National Library of Scotland*, mais cette version, un peu datée, n'offre pas de confort adapté à toute taille d'écran et les annotations sur chaque poème est plutôt succinte. Il est donc intéressant de proposer une édition retravaillée de cet ouvrage, à la fois au niveau visuel et fonctionnel en ajoutant des outils qui permettent permet une lecture augmentée.

## Données
La récupération des données nécessaires s'est effectuée en deux temps. D'abord, il a fallu récupérer les données concernant le *Auchinleck Manuscript* en isolant les mots qui composent ses textes (son lexique). Ensuite, il a fallu trouver pour chacun des mots du lexique ses données etymologiques et temporelles, au moyen du *Middle English Dictionary* (MED), le dictionnaire de référence pour cette forme de la langue anglaise.

Il n'existe pas de fichier de données du *Auchinleck Manuscript* prêt à être analysé. Il a fallu donc utiliser la version numérisée en HTML du [Auchinleck Manuscript](https://auchinleck.nls.uk/), éditée par David Burnley et Alison Wiggins, a été mise en ligne en 2003. Cette version a été archivée [en format XML](https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/2493) par le Oxford Text Archive, un catalogue de contenu numérique littéraire et linguistique. A partir de ces fichiers XML, il a été possible d'extraire une liste de tous les mots uniques qui apparaissent dans le texte, soit un total de 17'042 mots.

Comme pour le *Auchinleck Manuscript*, il n'existe pas de fichier de données du MED prêt à être analysé. Il a fallu donc récupérer les données à partir de la version numérique du [MED](https://quod.lib.umich.edu/m/middle-english-dictionary). Cette version du MED comporte plus de 54'000 entrées, qui sont homogènes au niveau de la mise-en-forme, mais pas uniformes au niveau du contenu. Certaines entrées ont des données étymologiques et temporelles, d'autres pas. L'année d'apparition d'un mot dans la langue est récupérée dans les citations associées à ce mot. Les années qui figurent dans les citations sont données sous la forme d'un intervalle de 25 ou 50 ans. Si plusieurs intervalles sont donnés, le plus ancien est retenu comme l'intervalle durant lequel le mot est apparu. Au total, 54'507 entrées du MED ont été extraites.

Une fois ces deux jeux de données récupérés, il a fallu les mettre en commun. Il n'a été gardé que les mots du *Auchinleck Manuscript* pour lesquels une correspondance avec une entrée du MED pouvait être établie. Cette correspondance avec le MED a été réalisée grâce au moteur de recherche disponible sur le site du MED.

Un lexique de 14'848 mots, répartis dans 43 poèmes différents, comprenant 96 étymologies différentes et chacun associé à une entrée du MED, a ainsi été produit. 

## Fonctionnalités
### Sélection d'un poème
![alt text](screenshots/selection.jpg)

Ce menu permet de sélectionner l'un des 43 poèmes du *Auchinleck Manuscript* et d'afficher son contenu.

La recherche d'un mot du lexique affiche 6 champs en-dessous de la barre:
* le mot
* l'intervalle durant lequel le mot est apparu dans le *Middle English*
* le ou les étymologies du mot
* le nombre de fois que le mot apparaît dans le manuscript
* le nombre de poèmes dans lequel le mot apparaît
* le lien vers l'entrée du mot dans le MED

### Mise en valeur d'une étymologie
![alt text](screenshots/highlight.PNG)

Cette option permet de mettre en valeur dans le texte du poème les mots d'une certaine étymologie. Les mots appartenant à cette étymologie deviennent orangé dans le texte.

Il est possible de choisir l'une des 5 catégories d'étymologie:
* etymologies apparentées à l'anglais
* etymologies apparentées au français
* etymologies apparentées au latin
* etymologies apparentées aux langues scandinaves
* etymologies apparentées à d'autres langues

### Aller à un numéro de ligne
![alt text](screenshots/linenbr.PNG)

Cet outil permet de se rendre directement à un numéro de ligne du poème sélectionné. Utilisation de la touche "Entrée" possible.

Si le numéro de ligne est supérieur au nombre de lignes total du poème, le lecteur est redirigé à la fin du poème. Si le numéro de ligne entré est dans les limites du poème, mais qu'il n'en fait pas partie (par exemple si des vers ont été perdus et n'ont pas pu être retranscrit), le lecteur est redirigé vers le numéro de ligne existant le plus proche.

### Dictionnaire
![alt text](screenshots/infobox.PNG)

Pour chaque mot du poème, il est possible d'obtenir de multiples informations en cliquant dessus. Ces informations proviennent du [MED](https://quod.lib.umich.edu/m/middle-english-dictionary).

Les informations disponibles sont les suivantes:
* MED entry: la forme du mot retenue dans le MED.
* Definition(s): la ou les définitions du mot. S'il y a plus de 3 définitions, seules les 3 premières sont affichées et un lien invite le lecteur à se rendre sur la page correspondante du MED.
* Etymology: la ou les étymologies du mot. S'il y a plus de 3 étymologies, seules les 3 premières sont affichées et un lien invite le lecteur à se rendre sur la page correspondante du MED.
* Appearance: l'intervalle d'années approximatif durant lequel le mot est apparu dans la langue anglaise. 
* Full entry: lien redirigeant vers l'entrée du mot dans le MED.

## Discussion
Cette édition numérique du *Auchinleck Manuscript* permet une lecture confortable et approfondie des poèmes.

Par rapport aux textes présents sur le site original du [Auchinleck Manuscript](https://auchinleck.nls.uk/), le AMEDE offre un confort de lecture adapté à la fois aux lecteurs sur un ordinateur ou sur un appareil mobile. La simplicité du design et des outils permet au lecteur de se concentrer sur le texte. Les numéros de ligne et les notes présents sur le site original ont été conservés. Avec AMEDE, il est possible de sélectionner une partie ou la totalité du texte, sans sélectionner en même temps les numéros de ligne, ce qui n'est pas le cas avec le site original.

La fonction de dictionnaire offre au lecteur une meilleure compréhension du texte, d'une manière simple et efficace.Ainsi, même un lecteur avec peu de notions en Middle English a les moyens de comprendre grossièrement de quoi parle chaque poème. Si le lecteur possède de bonnes bases en Middle English, il a la possibilité d'obtenir des informations supplémentaires sur chaque poème grâce à la mise en valeur des étymologies. Cela permet notamment de voir à quel point le vocabulaire du Middle English a été influencé par de nombreuses langues, même dans un recueil de textes central du Middle English comme le Auchinleck Manuscript.

## A propos
### Librairies utilisées
* Bootstrap 4.5.0
* D3 5.16.0
* JQuery 3.5.1
* Popper 1.16

### Sources
* [The Auchinleck Manuscript](https://auchinleck.nls.uk/) (eds: David Burnley and Alison Wiggins, National Library of Scotland, 2003)
* <a href="https://ota.bodleian.ox.ac.uk/repository/xmlui/handle/20.500.12024/2493" target='_blank'>The Auchinleck Manuscript on the Oxford Text Archive</a> (eds David Burnley and Alison Wiggins, National Library of Scotland, Oxford Text Archive, 2003)
* <a href="https://quod.lib.umich.edu/m/middle-english-dictionary" target="_blank">Middle English Dictionary</a> (eds: Frances McSparran, Ann Arbor, et al., University of Michigan Library, 2000-2018)

### Auteur
Ce projet a été réalisé par Cyrille Gay-Crosier dans le cadre du cours de Master <i>Publication numérique</i>, donné par Isaac Pante, en automne 2019, à l'UNIL.

### Remerciements
Rory Critten (MER en Anglais à l'UNIL) et Davide Picca (MER en Informatique pour les sciences humaines à l'UNIL) pour leur aide et leurs conseils dans la récupération et le traitement des données.
