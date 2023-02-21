# Shy

"un langage de programmation" que j'ai codé en javascript, il partage des similaritées avec l'assembly mais n'est pas très efficace car il est codé en javascript et pas un langage de niveau plus bas.

## Syntaxe

- **OUT**: imprime le message qui suit dans la console
- **EQU**: vérifie si les 2 valeurs suivante sont égales
- **VAR**: crée une variable avec le premier argument comme nom et lui donne les 2ème argument comme valeur
- **CDN**: verifie une condition (un if statement), l'argument suivant doit forcement être un mot clé
- **NXT**: définie ce qui arrive si le CDN renvoie true
- **ELSE**: définie ce qui arrive si le CDN renvoie false
- **EXS**: vérifie si la variable suivante existe
- **RDM**: renvoie une valeur aléatoire entre 0 et le premier argument
- **EVL**: calcule l'expression mathématique qui suit
- **LST**: crée une liste et affecte tout les argument suivant comme valeur

## Quelque précision

Les mots clés NXT et ELSE ne doivent pas forcement être directement après le CDN. ie:

```
VAR A 5
CDN EQU A 6
OUT is a equal to 6?
NXT OUT it is
ELSE OUT it isn't
```

Il n'y a pas de syntaxe pour les commentaires, tout ce qui ne commence pas par un mot clés sera ignoré. Si le premier mot de votre commentaire doit être un mot clés rajouté un # ou un espace avant afin qu'il soit ignoré.

Les scripts sont sauvegardé dans le local storage et la première ligne du script est utilisé comme nom.

## Future MAJ

Je pense pas que je vais continuer de développer ce projet car c'etait juste un test. Mais je ne suis pas contre essayé de faire un vrai langage de programmation dans un langage de plus bas niveau comme **C** ou **C++**.
