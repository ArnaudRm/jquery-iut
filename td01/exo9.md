##Exercice 9

  console.log($(’ul’).text());
affiche le contenu textuel des éléments ul et enfants

  console.log($(’ul’).html());
affiche le contenu html des éléments ul

  $(’p’).text(’<a href=‘‘#’’>lien</a>’);
Remplace le texte de toutes les balises p par le texte <a href="#">lien</a>

  $('p').html('<a href="#">lien</a>');
Ajoute une balise <a href="#">lien</a> dans toutes les balises p

  console.log($(’input:text[name=nom]’).text());
Cherche le contenu textuel de l'input type text et de name nom. Renvoie undefined

  console.log($(’input:text[name=nom]’).val());
Affiche la valeur contenue dans l'input type text et de name nom. Affiche 'dupont'

##Exercice 10
  $('p').append('Javascript<br />');
Ajoute a la fin de toutes les balises p le texte 'Javascript' suivi d'un saut de ligne '<br/>'

  $('p').prepend('Javascript<br />');
Ajoute au début de toutes les balises p le texte 'Javascript' suivi d'un saut de ligne '<br/>'

  $('p').remove();
Supprime tous les balises p

  $(’ul’).before(’Before’);
Ecrit le mot 'Before' dans l'élément parent de tous les ul, avant le ul

  $(’ul’).after('After');
Ecrit le mot 'Before' dans l'élément parent de tous les ul, apres le ul

##Exercice 11
  $(’<strong>SUPER!</strong>’).appendTo(’li’);
Ajoute une balise <strong> contenant le texte SUPER! a la fin de toutes les balises li (dans le li)

  $(’<strong>SUPER!</strong>’).prependTo(’li’);
Ajoute une balise <strong> contenant le texte SUPER! avant chaque balise li (dans le li)

  $(’<strong>HEY!</strong>’).insertBefore(’li’);
Ajoute une balise <strong> contenant le texte HEY! avant chaque balise li (dans l'élément parent)

 $(’<strong>OH!</strong>’).insertAfter(’li’);
Ajoute une balise <strong> contenant le texte OH! apres chaque balise li (dans l'élément parent)
