---
key: edicio
lang: ca
title: Sobre esta pàgina
resum: "Què és esta portada, com es compten les xifres i amb quina llicència es publica tot."
---

Esta pàgina és la porta d'entrada als projectes de recuperació de l'obra de **Francisca Julián
Querol**. No hi afig obra nova: només presenta l'autora, conta el que hi ha i porta a cada lloc.

Els sis projectes són una iniciativa **familiar i sense ànim de lucre**, sense publicitat i sense
galetes. Els ha preparat **Juan Tadeo Padilla Julián**, fill de l'autora, que és també el contacte
per a qualsevol correcció a través del repositori de cada projecte.

Tots seguixen el mateix criteri: el material es guarda en **formats oberts i duradors** —text pla i
JPEG— versionats en git, i eixos fitxers, no els llocs web, són l'original. Els llocs són només una
manera de llegir-los, i es construïxen sencers com a pàgines estàtiques: sense base de dades, sense
servidor i sense res que calga mantindre en marxa.

## D'on ixen les xifres

Les xifres d'esta pàgina **no estan escrites a mà**: les compta el guió `tools/metriques.py` d'este
repositori, que llig els sis repositoris dels projectes i deixa el resultat a
`content/metriques.json`. Les definicions són estes:

- **Textos**: els fitxers de contingut de l'autora —capítols dels dos llibres, capítols de la guia,
  entrades del blog i escrits inèdits—. No hi compten les traduccions.
- **Paraules**: les del cos d'eixos textos, sense el frontmatter, sense els peus de foto i sense les
  etiquetes HTML. De la guia de la rambla només es compta el castellà, la llengua en què la va
  escriure; comptar també el valencià, l'anglés i el xinés quadruplicaria la mateixa obra.
- **Fotografies**: les imatges originals dels cinc projectes de text, a grandària completa. No es
  compten les variants que generen els llocs en construir-se, ni les icones que els documents dels
  inèdits arrossegaven de la web.
- **Peces ceràmiques**: les peces distintes del paviment de Santjoans que es van digitalitzar. Cada
  una es guarda en tres grandàries; es compta la peça, no el fitxer. Les vint-i-nou fitxes del
  catàleg del llibre de Santjoans són la seua xifra pròpia i no se sumen a les peces.

## Les novetats

La llista de [novetats](/ca/novetats/) tampoc l'escriu ningú: cada vegada que es recalculen les
xifres, el guió compara el recompte nou amb l'anterior i anota el que ha canviat, amb data. Un
projecte que no hi era és una novetat; i també ho és un que ja hi era i que ha crescut en textos,
fotografies o peces, o en cent paraules o més. Les correccions xicotetes no compten. La fitxa d'un
projecte porta l'etiqueta «Nou» o «Ampliat» durant els dos mesos següents.

## Llicències

- **Textos i fotografies:** © Francisca Julián Querol, Tadeo Julián Querol i arxiu familiar, cadascú
  del que és seu. **CC BY-NC-ND 4.0**: es poden copiar i compartir citant els autors, sense ús
  comercial i sense modificar-los. Les imatges del paviment de Santjoans van amb **CC BY-NC 3.0**, la
  llicència amb què es van publicar el 2010.
- **Codi:** **MIT**.
