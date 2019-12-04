/*
   Copyright 2018 FH Potsdam FB Informationswissenschaften PR Kolonialismus <jung@fh-potsdam.de>
   
   This program is free software; you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation; either version 2 of the License, or
   (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program; if not, write to the Free Software
   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
   MA 02110-1301, USA.
*/
/* The 118n arrays */
var DE = {
	1: "Gehe zur Wikidata-Seite",
	2: '<h3>Thesaurus</h3>Rechts sehen Sie eine Liste von Entitäten.<br /> Klicken Sie auf ein Element um sich weitere Details anzeigen zu lassen.<br />Mit der Lupe können sie nach dem Begriff in der Datenbank suchen.<br />Alle Daten werden direkt aus Wikidata abgefragt. (Siehe auch: <a href="http://wikidata.org" target="blank">www.wikidata.org</a>',
	3: "Keine Daten vorhanden",
	4: "Kartensuche",
	5: 'Hier können Sie in historischen Karten stöbern, einzelne Orte suchen und archivische Informationen abrufen, die sich auf bestimmte Orte beziehen. ',
	6: 'Für die Ortssuche benutzen Sie das Eingabefeld. Grundlage hierfür bildet der Index des Großen deutschen Kolonialatlasses<a target="_blank" href="http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617" target="_blank"> <sup>SPK</sup></a> , \
	    der Kriegskarte von Deutsch-Südestafrika<a href="http://d-nb.info/362379556" target="_blank"><sup>DNB</sup></a> sowie ein Teil der Geonames-Datenbank\
	    <a target="_blank" href="https://www.geonames.org" target="_blank"><sup>LINK</sup></a> mit Bezug auf Siedlungen und natürlichen Merkmalen in den heutigen Nachfolgestaaten. \
		<br />Sie können statt eines Ortes auch die geografischen Koordinaten eines Ortes eingeben. Benutzen Sie dafür bitte die DDD-Schreibweise und trennen sie die Angaben zu Latitude und Longitude durch ein Komma (Beispiel: 13.38278,52.51234).\
		<br />Da der Index des Großen deutschen Kolonialatlasses nur ungenaue Angaben macht, werden die gefundenen Orte nicht als Punkte sondern als Flächen angezeigt. \
		<br />Durch das Klicken auf die Schaltfläche oben rechts in der Karte, können Sie sich diese als Vollbild anzeigen lassen.\
		<br />Mit Hilfe eines Schiebereglers, können Sie die historischen Karten mit aktuellen Karten überlagern. Hierzu stehen zwei verschiedene Kartenformate zur Verfügung.\
		<br />Die Maßstabsanzeige kann mit der Maus auf eine beliebige Stelle innerhalb der Karte gezogen werden. Der beste Näherungswert wird dabei für Orte in der Mitte der Karte angezeigt.\
		<br />Durch das Klicken auf den Button „GeoHack“ werden Sie zum gleichnamigen Werkzeug weitergeleitet. Dort  haben Sie die Möglichkeit, weitere Karten und Satellitenbilder zum ausgewählten Bereich einzusehen. \
		<br />In der Seitenleiste bzw. rechts oben werden Ihnen außerdem die aktuellen geografischen Koordinaten sowie die Zoomstufe angezeigt. Durch einfaches Klicken auf die Koordinaten kann zwischen den Anzeigeformaten Dezimalgrad (DDD) und Nautisch (DMM) gewechselt werden. \
		<br />Es können sogenannte Points of Interest (POI) eingeblendet werden. Diese stammen aus dem Wikidata-Korpus. Dargestellt sind diejenigen Objekte, bei denen die Eigenschaft "geografische Koordinaten (P625)" <sup><a href="https://www.wikidata.org/wiki/Property:P625" target="_blank">Wikidata</a></sup> mit einem Wert belegt ist.',
	7: 'Über die Genauigkeit der Kartendarstellung',
	8: 'Viele der hier wiedergegebenen Gebiete wurden erst im 19. Jahrhundert kartographisch aufgenommen. Ihre Größe sowie die Beschränktheit der damals zur Verfügung stehenden Ressourcen bedingen größere Fehler im Vergleich zur Kartenblättern aus europäischen Staaten aus jener Zeit.<br />\
		Unterschiede von durchschnittlich ± 3km gegenüber der heutigen Lage müssen daher bei der Wiedergabe der Karten in Kauf genommen werden.<br />\
		Generell gilt, dass die Größe der Fehler abnimmt, je kleiner der Maßstab der Karte ist.',
	9: 'Hinweise zur Benutzung',
	10: "Wechsel zwischen verschiedenen Darstellungsarten der Hintergundkarte",
	11: "Verwendete Karten",
	12: "Suche",
	13: "Suche nach Ort (oder: lon,lat)",
	14: "Suche nach archivischen Beschreibungen, die den zuvor gesuchten geografischen Begriff enthalten",
	15: "Stufenloses Ausblenden der historischen Karte",
	16: "Link zum GeoHack-Projekt mit weiteren Ansichtsoptionen für die ausgewählte Region",
	17: "Kartensuche",
	18: "Hinweise zur Benutzung",
	19: "Eingabefeld für die Suche nach historischen bzw. aktuellen geografischen Begriffen aus den Gebieten der ehemaligen deutschen Kolonien",
	20: "Einblenden von geolokalisierten Objekten aus dem Wikidata-Korpus",
	21: "Ausschalten der historischen Karte",
	22: "Anzeige der geografischen Länge",
	23: "Anzeige der geografischen Breite",
	24: "Anzeige der aktuellen Vergrößerungsstufe",
	25: "Nr.",
	26: "Titel",
	27: "Jahr",
	28: "Maßstab",
	29: "Quelle",
	30: "xPersonen",
	31: "xChronologie",
	32: "Details",
	33: "Chronologie",
	34: "Personen",
	35: "Verwaltung",
	36: "Unternehmen",
	37: "Missionen",
	38: "Militär",
	39: "Vereine",
	40: "Lokale Gemeinschaften",
	41: "Ereignisse",
	42: "Objekt beim Datengeber",
	43: "Hinweise:<ul class='notes'><li>Die Seite des Datengebers hält möglicherweise Digitalisate bereit.</li><li>Die Angaben beim Datengeber sind vollständiger und mitunter auch aktueller.</li>",
	44: "Ein Werkzeug zur Unterstützung beim Lesen alter Texte",
	45: "Sie haben ein Wort in Kurrent- oder Frakturschrift, das schwer zu entziffern ist? Klicken Sie hier auf die Buchstaben, bei denen Sie sich sicher sind! \
		Nachdem Sie mindestens zwei Zeichen ausgewählt haben, werden Ihnen Vorschläge für mögliche Wörter eingeblendet. \
		Diese stammen aus dem Korpus des Deutschen Koloniallexikons<a href='http://d-nb.info/560898940' target='_blank'><sup>DNB</sup></a> <a href='http://www.ub.bildarchiv-dkg.uni-frankfurt.de/Bildprojekt/Lexikon/lexikon.htm' target='_blank'><sup>, Volltext</sup></a>. \
		Sie können den Punkt als Platzhalter für einen beliebigen Buchstaben einsetzen. Anschließend können Sie in der Datenbank nach relevanten Dokumenten suchen.\
		<br /><strong>Hinweis: </strong>Da der Korpus nur in Antiqua-Schrift vorliegt, muss die korrekte Wiedergabe der beiden verschiedenen s-Laute nachträglich berechnet werden. \
		Hierbei sind Fehler möglich.<br />\
		Hier gibt es <a href='schrift'>weitere Tipps</a> zum Lesen der Kurrentschrift",
	46: "Eingabe löschen",
	47: "Letztes Zeichen löschen",
	48: "Relevante Dokumente",
	49: 'Der Thesaurus vermittelt einen Überblick über Personen, Organisationen, Objekte und Ereignisse zum Thema, \
		sowie ihre Beziehungen zueinander. Die Daten dazu werden in der freien Wissensdatenbank \
		Wikidata gesammelt. Die Mitarbeit am Thesaurus ist offen für alle, die einen Beitrag zur Wissensvernetzung \
		leisten möchten. <br /><br />\
		<strong>Hinweis</strong>: Markierungen wie z.B.<span class="fonds-link-top" style="margin-left:8px">Bundesarchiv</span>&nbsp;<span class="fonds-link-sig">BArch, R 1001</span> verweisen auf Archivbestände, die von diesen\
		Personen oder Organisationen angelegt wurden. Die dahinter liegenden Links aktivieren eine Suche in der Archivdatenbank. Unter bestimmten Bedingungen kann sie erfolglos bleiben, \
		obwohl sich entsprechende Beschreibungen in der Datenbank befinden. Die blau markierten Links suchen konkret nach den angegeben Signaturen.',
	50: "Gesetze/Verordnungen",
	51: "Veröffentlichungen",
	52: "Kunstwerke",
	53: 'Wikidata ist eine offene Datenbank. Jede/r kann daran mitarbeiten. \
		Hier sind alle Änderungen auf gelistet, die in den vergangenen Tagen an Datenobjekten aus dem Themen-Korpus \
		<a href="http://tinyurl.com/ydadva9b" target="_blank">Deutsche Kolonien und Schutzgebiete (Q329618)</a> vorgenommen wurden. \
		Ein Teil dieser Änderungen erfolgt automatisch durch sogenante Bots, die wesentlich zur Qualitätssicherung beitragen. <br />\
		Auf der Wikidata-Seite der Datenobjekte lassen sich unter dem Menüpunkt <strong>Versionsgeschichte</strong> alle an einem Objekt durchgeführten Änderungen nachschlagen.',
	54: "Aktuelle Änderungen am Datenkorpus (< 90 Tage)",
	55: 'Tage',
	56: "Änderungen durch Bots ausblenden",
	57: "Visualisierungen",
	58: "Am Thesaurus mitarbeiten",
	59: "Link zur Wikidata-Abfrage",
	60: "Ein Projekt der",
	61: "Gefördert vom",
	62: "Link zu diesem Kartenauschnitt",
	63: "Kurrent-Schreibmaschine",
	64:	"Bildungs- und Forschungseinrichtungen",
	65: "Dokumente in Archiven",
	66: "Orte",
	67: "<p><strong>Erläuterungen</strong><br />Die Tabelle gibt pro Zeile je eine einzelne Änderung an einem Datenobjekt aus.<br />\
		Sie können die Ergebnisse sortieren und filtern. Zu Beginn sind nur durch menschlische Nutzer (<i>human</i>) durchgeführten Änderungen eingeblendet.<p>\
		<strong>Bedeutung der angezeigten Aktionen</strong>\
		<dl>\
		<dt>clientsitelink</dt><dd>Es wurde ein Link zu einer Wikipediaseite geändert.</dd>\
		<dt>edits</dt><dd>Es wurde eine Aussage geändert.</dd>\
		<dt>undo</dt><dd>Es wurde eine Aussage zurückgenommen.</dd>\
		<dt>wbcreateclaim</dt><dd>Es wurde eine neue Aussage hinzugefügt.</dd>\
		<dt>wbmergeitems</dt><dd>Es wurden zwei Objekte zusammenlegt, da sie identische Sachverhalte beschrieben.</dd>\
		<dt>wbremoveclaims</dt><dd>Es wurde eine Aussage gelöscht.</dd>\
		<dt>wbremovequalifiers</dt><dd>Es wurde ein Qualifikator zu einer Aussage gelöscht.</dd>\
		<dt>wbremovereferences</dt><dd>Es wurde eine Fundstellenangabe gelöscht.</dd>\
		<dt>wbsetqualifier</dt><dd>Es wurde ein Qualifikator zu einer Aussage hinzugefügt.</dd>\
		<dt>wbsetreference</dt><dd>Es wurde eine Fundstelle zu einer Aussage hinzugefügt.</dd>\
		<dt>wbeditentity</dt><dd>Es wurde eine Objektbezeichnung für eine weitere Sprache hinhzugefügt.</dd>\
		<dt>wbsetclaimvalue</dt><dd>Es wurde eine Aussage korrigiert.</dd>\
		<dt>wbsetsitelink</dt><dd>Es wurde zu einer Wikipedia-Seite verlinkt.</dd>\
		<dt>wbsetaliases</dt><dd>Es wurde ein neuer Alias hinzugefügt.</dd>\
		<dt>wbsetclaim</dt><dd>Es wurde eine neue Aussage hinzugefügt.</dd>\
		<dt>wbsetdescription</dt><dd>Es wurde eine neue Beschreibung für das Objekt hinzugefügt.</dd>\
		<dt>wbsetlabel</dt><dd>Es wurde eine Objektbezeichnung für eine weitere Sprache hinhzugefügt.</dd>\
		<dt>wbsetlabeldescriptionaliases</dt><dd>Es wurden Bezeichnung, Beschreibung und Aliasse für eine Sprache geändert.</dd>\
		</dl></p>",
	68:"über",
	69:'<strong>Hinweis:</strong><br />Die Links in dieser Zusammenstellung verweisen auf digitalisierte Artikel aus dem Pressearchiv des <a href="https://pm20.zbw.eu/home" target="_blank"> Hamburgisches Welt-Wirtschafts-Archiv</a> (ca. 1900 - ca. 1949). Sie werden bereitgestellt vom  <a href="https://www.zbw.eu" target="_blank">Leibniz-Informationszentrum Wirtschaft</a>.',
	70:"Presseartikel",
	71:'<a href="about#terms" target="_blank">Hinweis zu den verwendeten historischen Begriffen</a> ',
	999: ""
}
var FR = {
	1: "Montre la page sur Wikidata",
	2: '<h3>Thesaurus</h3>À côté droit vous voyez une liste des entités.<br />Cliquez sur un element pour voir plus de datails<br/>Clique sur la loupe pour chercher des dossiers relatives dans la base de données<br />Toutes les informations viennent directement du site Wikidata. (Voir aussi: : <a href="http://wikidata.org" target="_blank">www.wikidata.org</a>)',
	3: "données non disponibles",
	4: "Recherche cartographique",
	5: 'Ici, vous pouvez parcourir des cartes historiques, rechercher des lieux individuels et récupérer des informations d’archives relatives à des lieux spécifiques. ',
	6: 'Utilisez le champ de saisie pour rechercher un lieu. La base de données est l’index du Grand Atlas colonial allemand (Großer deutscher Kolonialatlas<a target="_blank" href="http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617" target="_blank"><sup>SPK</sup></a>), \
		la carte de guerre du Sud-Ouest africain allemand (Kriegskarte von Deutsch-Südestafrika<a href="http://d-nb.info/362379556" target="_blank"><sup>DNB</sup></a>) \
		et une partie de la base de données des noms géographiques Geonames<a target="_blank" href="https://www.geonames.org" target="_blank"> <sup>LINK</sup></a> avec référence aux établissements humains et aux caractéristiques naturelles dans les États successeurs d’aujourd’hui. \
		<br />Vous pouvez également saisir les coordonnées géographiques au lieu d’un lieu. Veuillez utiliser la notation DDD et séparer les spécifications pour la latitude et la longitude par une virgule (exemple : 13.38278,52.51234).\
		<br />Comme l’index du Grand Atlas Colonial Allemand ne fournit que des informations inexactes, les lieux trouvés ne sont pas affichés en points mais en zones. \
		<br />En cliquant sur le bouton dans le coin supérieur droit de la carte, vous pouvez l’afficher en plein écran.\
		<br />A l’aide d’un slider, vous pouvez superposer les cartes historiques avec les cartes actuelles. Deux formats de cartes différents sont disponibles à cet effet.\
		<br />En cliquant sur le bouton " GeoHack ", vous serez redirigé vers l’outil du même nom. Sur cette page vous avez la possibilité de visualiser d’autres cartes et images satellites de la zone sélectionnée. \
		<br />Les coordonnées géographiques actuelles et le niveau de zoom sont également affichés en haut à droite. En cliquant simplement sur les coordonnées, vous pouvez passer d’un format d’affichage à l’autre. \
		<br />Les points d’intérêt (POI) peuvent être affichés. Elles proviennent du corpus Wikidata. Ce sont les objets pour lesquels la propriété "Coordonnées géographiques (P625)" <sup><a href="https://www.wikidata.org/wiki/Property:P625" target="_blank">Wikidata</a></sup> est associée à une valeur sont affichés.',
	7: 'A propos de l’exactitude des cartes',
	8: 'Bon nombre des zones illustrées ici n’ont été cartographiées qu’au XIXe siècle. Leur taille et les ressources limitées disponibles à l’époque provoquent des erreurs majeures par rapport aux cartes des pays européens de l’époque.<br />\
		Des différences de ± 3 km par rapport à la situation actuelle doivent donc être prises en compte lors de la lecture des cartes.<br />\
		En général, plus l’échelle de la carte est petite, plus la  l’erreur est petite.',
	9: 'Mode d’emploi',
	10: "Commutation entre les différents modes d’affichage de la carte d’arrière-plan",
	11: "Cartes utilisées",
	12: "Rechercher",
	13: "Recherche par lieu (où: lon,lat)",
	14: "Rechercher des descriptions archivistiques contenant le terme géographique précédemment recherché",
	15: "Changer l’opacité de la carte historique",
	16: "Lien vers le projet GeoHack avec d’autres options d’affichage pour la région sélectionnée",
	17: "Recherche cartographique",
	18: "Mode d’emploi",
	19: "Champ de saisie pour la recherche de termes géographiques historiques ou actuels à partir des territoires des anciennes colonies allemandes",
	20: "Affichage des objets géolocalisés du corps de Wikidata",
	21: "Eteindre la carte historique",
	22: "Affichage de la longitude",
	23: "Affichage de la latitude",
	24: "Affichage du niveau d’agrandissement actuel",
	25: "N°",
	26: "Titre",
	27: "Année",
	28: "Échelle",
	29: "Source",
	30: "xPersones",
	31: "xChronologie",
	32: "Détails",
	33: "Chronologie",
	34: "Persones",
	35: "Administration",
	36: "Entreprises",
	37: "Missions",
	38: "Militaire",
	39: "Associations",
	40: "Communautés locales",
	41: "Évènements",
	42: "Objet chez le fournisseur",
	43: "Notes:<ul class='notes'><li>Le site du fournisseur peut contenir des copies numériques.</li>\
	     <li>Les informations fournies par le fournisseur de données sont plus complètes et parfois aussi plus à jour.</li>",
	44: "Un assistent à la lecture de anciens textes",
	45: "Vous avez un mot dans dans l'ancienne écriture allemande qui est difficile à déchiffrer ? Cliquez ici sur les caractères dont vous êtes sûr ! \
		Après avoir sélectionné au moins deux caractères, des suggestions de mots possibles s'affichent. \
		Ceux-ci proviennent du corpus du Deutsches Koloniallexikon.<a href='http://d-nb.info/560898940' target='_blank'><sup>DNB</sup></a> <a href='http://www.ub.bildarchiv-dkg.uni-frankfurt.de/Bildprojekt/Lexikon/lexikon.htm' target='_blank'><sup>, Volltext</sup></a>. \
		Vous pouvez utiliser le point comme caractère de remplacement pour n'importe quelle lettre. Vous pouvez ensuite rechercher les documents pertinents dans la base de données.\
		<br /><strong>Note</strong> : Comme le corpus n'est disponible qu'en script Antiqua, la reproduction correcte des deux différents caractères «s» doit être calculée. \
		Donc des erreurs sont possibles.<br />\
		Voici <a href='schrift'>quelques asctuces</a> concernant la lecture de l'ancienne écriture allemande.",
	46: "Supprimer tous",
	47: "Supprimer dernier caratère",
	48: "Documents pertinants",
	49: 'Le thésaurus donne un aperçu des personnes, des organisations, des objets et des événements, ainsi que de leurs relations les uns avec les autres. \
		Les données sont collectées dans la base de données libre Wikidata.\
		<br /><br /><strong>Note</strong>: Les marques telles que \
		<span class="fonds-link-top" style="margin-left:8px">Archives Fédérales</span>&nbsp;<span class="fonds-link-sig">BArch, R 1001</span> désignent les fonds d’archives \
		créés par ces personnes ou organisations. Les liens qu’il contient activent une recherche dans la base de données de ce site. Sous certaines conditions, \
		elle peut rester infructueuse, bien qu’il y ait des descriptions correspondantes dans la base de données. Les liens marqués en bleu recherchent concrètement \
		les signatures indiquées.',
	50: "Lois et réglementations",
	51: "Publications",
	52: "Objets d'art",
	53: 'Wikidata est une base de données ouverte. \
		N’importe qui peut y travailler. Sur cette page sont listés tous les changements qui ont été effectués ces derniers jours sur des données faisant partie du corpus \
		<a href="http://tinyurl.com/ydadva9b" target="_blank">Empire colonial allemand (Q329618)</a>. \
		Certains de ces changements sont effectués automatiquement par des robots, qui apportent une contribution significative à l’assurance qualité. \
		Sur la page Wikidata de chaque object, vous pouvez rechercher toutes les modifications apportées à un objet sous l’option de menu <strong>Voir l’historique</strong>.',
	54: 'Changements récents sur le corpus de données (< 90 jours)',
	55: 'jours',
	56: 'Masquer les changements faites par des robots',
	57: "Visualisations",
	58: "Collaborer sur le Thésaurus",
	59: "Lien vers la même requête sur Wikidata",
	60: "Un project de la",
	61: "Avec l'appui de",
	62: "Lien vers cette section de la carte",
	63: "Machine à écrire germanique",
	64 : "Etablissements d'enseignement et de recherche",
	65 : "Documents dans les archives",
	66: "Places",
	67: "<p><strong>Notes explicatives</strong><br />La table affiche une seule modification d'un objet de données pour chaque ligne.<br />\
		Vous pouvez trier et filtrer les résultats. Initialement, seules les modifications effectuées par des utilisateurs humains (<i>human</i>) sont affichées.<p>\
		<strong>Signification des actions affichées</strong>\
		<dl>\
		<dt>clientsitelink</dt><dd>Un lien vers une page Wikipedia a été modifié.</dd>\
		<dt>edits</dt><dd>Une déclaration a été modifiée.</dd>\
		<dt>undo</dt><dd>Une déclaration a été retirée.</dd>\
		<dt>wbcreateclaim</dt><dd>Une nouelle déclaration a été ajoutée.</dd>\
		<dt>wbmergeitems</dt><dd>Deux objets ont été fusionnés car ils décrivaient des faits identiques.</dd>\
		<dt>wbremoveclaims</dt><dd>Une déclaration a été supprimée.</dd>\
		<dt>wbremovequalifiers</dt><dd>Un qualificatif pour une déclaration a été supprimé.</dd>\
		<dt>wbremovereferences</dt><dd>Une référence a été supprimée.</dd>\
		<dt>wbsetqualifier</dt><dd>Un qualificatif a été ajouté à une déclaration.</dd>\
		<dt>wbsetreference</dt><dd>Une référence a été ajoutée à une déclaration.</dd>\
		<dt>wbeditentity</dt><dd>Un libellé a été ajouté pour une autre langue.</dd>\
		<dt>wbsetclaimvalue</dt><dd>Une déclaration a été modifiée.</dd>\
		<dt>wbsetsitelink</dt><dd>L'objet a été lié à une page Wikipedia.</dd>\
		<dt>wbsetaliases</dt><dd>Un nouvel alias a été ajouté.</dd>\
		<dt>wbsetclaim</dt><dd>Une nouelle déclaration a été ajoutée.</dd>\
		<dt>wbsetdescription</dt><dd>Une nouvelle description de l'objet a été ajoutée.</dd>\
		<dt>wbsetlabel</dt><dd>Un libellé a été ajouté pour une autre langue.</dd>\
		<dt>wbsetlabeldescriptionaliases</dt><dd>Le libellé, la description et les alias de l'objet dans une langue ont été modifiés.</dd>\
		</dl></p>",
	68:"sur",
	69:'<strong>Note:</strong><br />Les liens dans cette compilation renvoient à des articles numérisés des archives de presse de <a href="https://pm20.zbw.eu/home" target="_blank"> Hamburgisches Welt-Wirtschafts-Archiv</a> (ca. 1900 - ca. 1949). Ils sont fournis par <a href="https://www.zbw.eu" target="_blank">Leibniz Information Centre for Economics </a>',
	70:"Articles de presse",
	71:'<a href="about#terms" target="_blank">Note sur les termes historiques utilisés</a> ',
	999: ""
}
var EN = {
	1: "Go to the the Wikidata entry",
	2: '<h3>Thesaurus</h3>On the right you will see a list of entities.<br />Click on any node of the tree to show detailled information or child nodes. <br/>Click on the magnifying glass to search related records.<br />All information within this tool are results of on Wikidata queries. (see also : <a href="http://wikidata.org" target="_blank">www.wikidata.org</a>)',
	3: "No data available",
	4: "Map search",
	5: 'Here you can browse historical maps, search for individual locations and retrieve archive information relating to specific locations.',
	6: 'Use the input field to search for a place. The basis for this is the index of the Great German Colonial Atlas  (Großer deutscher Kolonialatlas<a target="_blank" href="http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617" target="_blank"><sup>SPK</sup></a>)\
	the war map of South West Africa (Kriegskarte von Deutsch-Südestafrika<a href="http://d-nb.info/362379556" target="_blank"><sup>DNB</sup></a>) \
	 and parts of the Geonames database<a target="_blank" href="https://www.geonames.org" target="_blank"> <sup>LINK</sup></a> with reference to settlements and natural features in today’s successor states. \
		<br />You can also enter the geographical coordinates of a location instead of a location. Please use the DDD notation and separate the specifications for latitude and longitude by a comma (example: 13.38278,52.51234).\
		<br />Since the index of the Great German Colonial Atlas only provides inaccurate information, the places found are not displayed as points but as areas. \
		<br />By clicking on the button in the upper right corner of the map, you can toggle to see it as a full screen.\
		<br />With the help of a slider, you can overlay the historical maps with current maps. Two different card formats are available for this purpose.\
		<br />By clicking on the button "GeoHack" you will be forwarded to the tool of the same name. There you have the possibility to view further maps and satellite images of the selected area.\
		<br />The current geographical coordinates and the zoom level are also displayed at the top right. By simply clicking on the coordinates, you can switch between the display formats. \
		<br />So-called Points of Interest (POI) can be displayed. They are from the Wikidata corpus. The objects displayed are those for which the property "geographical coordinates (P625)" <sup><a href="https://www.wikidata.org/wiki/Property:P625" target="_blank">Wikidata</a></sup> is assigned .',
	7: 'About the accuracy of map display',
	8: 'Many of the areas shown here were not mapped until the 19th century. Their size and the limited resources available at that time cause major errors compared to map sheets from European countries of that time.<br />\
		Differences of ± 3km compared to the current situation must therefore be taken into account when working the maps.<br />\
		In general, the smaller the scale of the map, the smaller the error.',
	9: 'Instructions for use',
	10: "Switching between different display modes of the background map",
	11: "Maps used",
	12: "Search",
	13: "Search by place (or <i>or: lon,lat</i>",
	14: "Search for archival descriptions containing the previously searched geographical term",
	15: "Stepless fading out of the historical map",
	16: "Link to the GeoHack project with further view options for the selected region",
	17: "Map search",
	18: "Instructions for use",
	19: "Input field for the search for historical or current geographical terms from the territories of the former German colonies",
	20: "Display of geolocalized objects from the Wikidata corpus",
	21: "Turning off the historical map",
	22: "Longitude display",
	23: "Latitude display",
	24: "Display of the current magnification level",
	25: "#",
	26: "Title",
	27: "Year",
	28: "Scale",
	29: "Source",
	30: "xPeople",
	31: "xChronology",
	32: "Details",
	33: "Chronology",
	34: "People",
	35: "Administration",
	36: "Companies",
	37: "Missionary Societies",
	38: "Military",
	39: "Associations",
	40: "Local communities",
	41: "Events",
	42: "Data provider's object view",
	43: "Notes:<ul class='notes'><li>The website of the data provider may contain digital copies.</li>\
	    <li>The information provided by the data provider is more complete and sometimes also more up-to-date.</li>",
	44: "A helper tool for old German texts",
	45: "You have a word in old German writing that is difficult to be deciphered? Click here on the characters you are sure of! \
		After you have selected at least two characters, suggestions for possible words will be displayed. \
		These are taken from the body of the German Colonial Encyclopaedia<a href='http://d-nb.info/560898940' target='_blank'><sup>DNB</sup></a> <a href='http://www.ub.bildarchiv-dkg.uni-frankfurt.de/Bildprojekt/Lexikon/lexikon.htm' target='_blank'><sup>, Volltext</sup></a>. \
		You can use the dot as a placeholder for any letter. You can then search the database for relevant documents.\
		<br / ><strong>Note</strong>: Since the corpus is only available in Antiqua script, the correct reproduction of the two different 's' characters must be calculated. \
		Errors are possible.<br />\
		More <a href='schrift'>hints</a> for reading the old german script.",
	46: "Undo all",
	47: "Undo last caracter",
	48: "Relevant documents",
	49: 'The thesaurus provides an overview of people, organisations, objects and events, as well as their relationships to each other. \
		The data is collected in the free knowledge database Wikidata.<br /> <br />\
		<strong>Note</strong>: Markers such as \
		<span class="fonds-link-top" style="margin-left:8px">Federal Archive</span>&nbsp;<span class="fonds-link-sig">BArch, R 1001</span> \
		refer to archive holdings created by these persons or organisations. The links behind it activate a search in the archive database. \
		Under certain conditions, it can remain unsuccessful, although there are corresponding descriptions in the database. \
		The blue marked links search concretely for the indicated signatures.',
	50: "Laws et regulations",
	51: "Publications",
	52: "Artworks",
	53: 'Wikidata is an open database. Anyone can contribute to it. \
		On this page all changes are listed, which were made in the past days at data objects from the topic corpus \
		<a href="http://tinyurl.com/ydadva9b" target="_blank">German colonial empire (Q329618)</a>. \
		Some of these changes are made automatically by so-called bots, which contribute significantly to quality assurance. <br /> \
		On the Wikidata page of the data objects you can look up all changes made to an object under the menu item <strong>Version history</strong>.',
	54: "Recent changes to the data corpus (< 90 days)",
	55: 'days',
	56: 'Hide changes made by bots',
	57: "Visualisations",
	58: "Collaborating on the Thesaurus",
	59: "Link to the same query on Wikidata",
	60: "A project hosted on",
	61: "Sponsored by",
	62: "Link to the current map section",
	63: "Old German typewriter",
	64: "Educational and research institutions",
	65: "Documents in archives",
	66: "Places",
	67: "<p><strong>Explanations</strong><br />The table displays one individual change to a data object per line.<br />\
		You can sort and filter the results. Initially, only changes made by human users (<i>human</i>) are displayed.<p>\
		<strong>Meaning of the displayed actions</strong>\
		<dl>\
		<dt>clientsitelink</dt><dd>A link to a Wikipedia page has been changed.</dd>\
		<dt>edits</dt><dd>A statement was changed.</dd>\
		<dt>undo</dt><dd>A statement was withdrawn.</dd>\
		<dt>wbcreateclaim</dt><dd>A new statement was added.</dd>\
		<dt>wbmergeitems</dt><dd> Two objects were merged because they described identical facts.</dd>\
		<dt>wbremoveclaims</dt><dd>A statement was deleted.</dd>\
		<dt>wbremovequalifiers</dt><dd>A qualifier for a statement was deleted.</dd>\
		<dt>wbremovereferences</dt><dd> A reference was deleted.</dd>\
		<dt>wbsetqualifier</dt><dd>A qualifier was added to a statement.</dd>\
		<dt>wbsetreference</dt><dd>A reference was added to a statement.</dd>\
		<dt>wbeditentity</dt><dd>A label was added for another language.</dd>\
		<dt>wbsetclaimvalue</dt><dd>A statement was corrected.</dd>\
		<dt>wbsetsitelink</dt><dd>The object has been linked to a Wikipedia page.</dd>\
		<dt>wbsetaliases</dt><dd>A new alias has been added.</dd>\
		<dt>wbsetclaim</dt><dd>A new statement was added.</dd>\
		<dt>wbsetdescription</dt><dd>A new description for the object has been added.</dd>\
		<dt>wbsetlabel</dt><dd>A label was added for another language.</dd>\
		<dt>wbsetlabeldescriptionaliases</dt><dd>The label, description, and aliases for an object in a given language were changed.</dd>\
		</dl></p>",	
	68:"about",	
	69:'<strong>Note:</strong><br />The links in this compilation refer to digitized articles from the press archive of <a href="https://pm20.zbw.eu/home" target="_blank"> Hamburgisches Welt-Wirtschafts-Archiv</a> (ca. 1900 - ca. 1949). They are provided by <a href="https://www.zbw.eu" target="_blank">Leibniz Information Centre for Economics </a>.',
	70:"Press articles",
	71:'<a href="about#terms" target="_blank">Note on the historical terms used</a> ',
	999: ""
}


