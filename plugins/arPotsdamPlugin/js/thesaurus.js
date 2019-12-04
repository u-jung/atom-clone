 
 jQuery(document).ready(function() {
	 showWD()
 }


    /***********************************************  WIKIDATA****************************************************************** */

/* Starting the Wikidata thesaurus*/
function showWD() {
	saveContent();
	jQuery("#wrapper").html('<div class="multiline-header"><h1 aria-describedby="">Thesaurus<div class="loader"></div></h1><p>Der Thesaurus versucht, einen Überblick über die Organisationen und Personen in den Kolonien, sowie ihre Beziehungen zueinander darzustellen. Die Daten dazu werden in der freien Wissensdatenbank Wikidata gesammelt. Die Mitarbeit am Thesaurus ist offen für alle, die einen Beitrag zur Wissensvernetzung leisten möchten. <a href="wikidata">Auf dieser Seite</a> gibt es die Details dazu.  </p><p>Einige Daten können in <a href="data">Diagrammen</a> visualisiert werden.</p></div>\
	<div id="sparql-link"></div><section class="breadcrumb"></section><div id="content"></div>')
	wdInit();

}

/* Preparing the div*/
function wdInit() {
	BREADCRUMB = [
		[__("Kolonien"), "Q329618", "kolonien"]
	];
	var type = "kolonien";
	var wdId = "Q329618";
	data = [{
			"name": "Deutsch-Neuguinea",
			"item": "http://www.wikidata.org/entity/Q165008",
			"id": "Q165008",
			"von":"1884",
			"bis":"1919",
			"type": "kolonie"
		},
		{
			"name": "Deutsch-Ostafrika",
			"item": "http://www.wikidata.org/entity/Q153963",
			"id": "Q153963",
			"type": "kolonie",
			"von":"1884",
			"bis":"1919"
		},
		{
			"name": "Deutsch-Südwestafrika",
			"item": "http://www.wikidata.org/entity/Q153665",
			"id": "Q153665",
			"type": "kolonie",
			"von":"1884",
			"bis":"1919"
		},
		{
			"name": "Kapitaï und Koba",
			"item": "http://www.wikidata.org/entity/Q1721466",
			"id": "Q1721466",
			"type": "kolonie",
			"von":"1884",
			"bis":"1985"
		},
		{
			"name": "Kamerun",
			"item": "http://www.wikidata.org/entity/Q668294",
			"id": "Q668294",
			"type": "kolonie",
			"von":"1884",
			"bis":"1919"
		},
		{
			"name": "Kiautschou",
			"item": "http://www.wikidata.org/entity/Q675321",
			"id": "Q675321",
			"type": "kolonie",
			"von":"1898",
			"bis":"1919"
		},
		{
			"name": "Mahinland",
			"item": "http://www.wikidata.org/entity/Q15057620",
			"id": "Q15057620",
			"type": "kolonie",
			"von":"1885",
			"bis":"1885"
		},           
		{
			"name": "Samoa",
			"item": "http://www.wikidata.org/entity/Q26271738",
			"id": "Q26271738",
			"type": "kolonie",
			"von":"1900",
			"bis":"1919"
		},
		{
			"name": "Togo",
			"item": "http://www.wikidata.org/entity/Q161062",
			"id": "Q161062",
			"type": "kolonie",
			"von":"1884",
			"bis":"1919"
		},
		{
			"name": "Wituland",
			"item": "http://www.wikidata.org/entity/Q30607493",
			"id": "Q30607493",
			"type": "kolonie",
			"von":"1885",
			"bis":"1890"
		},
		{
			"name": "Deutsches Reich",
			"item": "http://www.wikidata.org/entity/Q1206012",
			"id": "Q1206012",
			"type": "deutschland",
			"von":"1871",
			"bis":"1945"
		}
	]

	var data = addSubData(data);
	var query_url='https://query.wikidata.org/#SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3FitemDescription%0A%09%09%09%09where%20%0A%09%09%09%09%7B%0A%09%09%09%09%7Boptional%7B%3Fitem%20wdt%3AP17%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7Boptional%7B%3Fitem%20wdt%3AP2541%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP131%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%20%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP17%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP361%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP2650%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP937%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22'+culture+'%2Cde%2Cen%22.%20%7D%0A%09%09%09%09%20%7D%20%0A%09%09%09%09order%20by%20%3Fitem'
	var query_url='https://query.wikidata.org/#SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3FitemDescription%0Awhere%20%0A%7B%0A%7Boptional%7B%3Fitem%20wdt%3AP17%2Fwdt%3AP279*%20wd%3AQ329618%20.%7D%7D%0A%20union%0A%7Boptional%7B%3Fitem%20wdt%3AP2541%2Fwdt%3AP279*%20wd%3AQ329618%20.%7D%7D%0A%20union%0A%7B%20optional%7B%3Fitem%20wdt%3AP131%2Fwdt%3AP279*%20wd%3AQ329618%20.%7D%7D%20%0A%20union%0A%7B%20optional%7B%3Fitem%20wdt%3AP17%2Fwdt%3AP279*%20wd%3AQ329618%20.%7D%7D%0A%20union%0A%7B%20optional%7B%3Fitem%20wdt%3AP1001%2Fwdt%3AP279*%20wd%3AQ329618%20.%7D%7D%0A%20union%0A%7B%20optional%7B%3Fitem%20wdt%3AP361%2Fwdt%3AP279*%20wd%3AQ329618%20.%7D%7D%0A%20union%0A%7B%20optional%7B%3Fitem%20wdt%3AP2650%2Fwdt%3AP279*%20wd%3AQ329618%20.%7D%7D%0A%20union%0A%7B%20optional%7B%3Fitem%20wdt%3AP937%2Fwdt%3AP279*%20wd%3AQ329618%20.%7D%7DSERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22'+culture+'%2Cde%2Cen%22.%20%7D%0A%09%09%09%09%20%7D%20%0A%09%09%09%09order%20by%20%3Fitem'
	jQuery('#sparql-link').html('<a href="'+query_url+'" target="_blank">'+__("Link zur Wikidata-Abfrage")+' (Corpus)</a><br />')

	
	
	showWdResults(data);
}

/* Handling the breadcrumb */
function showBreadcrumb() {

	var bc = "<ul>";
	for (var i = 0; i < BREADCRUMB.length; i++) {
		bc += '<li><a id="' + BREADCRUMB[i][0] + '#' + BREADCRUMB[i][1] + '#' + BREADCRUMB[i][2] + '">' + BREADCRUMB[i][0] + '</a></li>'
	}
	bc += "</ul>";
	jQuery('.breadcrumb').html(bc).css("cursor", "pointer");
	jQuery('.breadcrumb').on("click", "a", function() {
		history.pushState('', 'Archivführer deutsche Kolonialgeschichte', document.location.origin + "/index.php/thesaurus?" +jQuery(this).attr('id').replace(/#/g,"+") );
		changeWd(jQuery(this).attr('id'))
	});
}

function changeBreadcrumb(name, wdId, type, parent) {
	var newBreadcrumb = []
	for (var i = 0; i < BREADCRUMB.length; i++) {
		newBreadcrumb.push(BREADCRUMB[i])
		if (BREADCRUMB[i][1] == wdId) {
			if (BREADCRUMB[i][2] == type) {
				BREADCRUMB = newBreadcrumb;
				return;
			}
		}
	}
	if (parent.length > 0) {
		var name = parent + " (" + name + ")";
	}
	BREADCRUMB.push([name, wdId, type]);
	return;
}

/* Filling the div with data */
function showWdResults(data,letter) {
	console.log(data,letter);
	if (!letter) letter = "A";
	jQuery('#pag').remove();
	jQuery('.title').off("click","a");
	jQuery('.pagination').off('click','a');
	jQuery('#content').off;
	jQuery('.result-details').off;
	jQuery('#content h2').off("click","a");		
	//console.log(data);

	showBreadcrumb();
	jQuery('#content').html("");
	if (jQuery.isArray(data)){
		
		jQuery('.title').off("click","a");
		jQuery('#wrapper').off("click","button");
		jQuery('.result-details').off("click","li");
		jQuery('.result_details').off("mousedown",".to-top");
		/*jQuery('.title').off;

		jQuery('.result-details').off;
		jQuery('#content').off;*/
		jQuery('.breadcrumb').append('   <span>' + data.length + " " + __('Resultate')+'</span>');
		var lastLetterArray=[];
		var lastLetter="";
		var anchor="";
		var quelle=""
		data=addSubData(data);
		for (var i=0;i<data.length;i++){
			if(lastLetter != data[i]['name'].slice(0,1).toUpperCase()){
				lastLetterArray.push(data[i]['name'].slice(0,1).toUpperCase());
				lastLetter=data[i]['name'].slice(0,1);
				if (data.length > 20){
					anchor='<a href="#top" name="'+data[i]['name'].slice(0,1)+'" style="font-family:FontAwesome;color:#999" class="to-top" title="'+__("nach oben")+'">    </a>';
				}
				if (data.length > 500){
					anchor=""
				}
			}
			else{
				anchor=""
			}
			if(data.length>500){
				if(data[i]['name'].slice(0,1).toUpperCase() !=letter){
					continue;
				}
			}

			var h3="";
			if ("h3" in data[i]){
				h3="<br><small>"+data[i]["h3"]+"</small>";
			}
			var von="";
			var bis="";
			
			if ('von' in data[i]){
				von=data[i]['von'];
			}
			if ('bis' in data[i]){
				bis=data[i]['bis'];
			}
			
			if (von + bis !=""){
				var zeitraum= '<small style="color:#999">   ('+von + "-" + bis + ")</small> ";
			}
			else{
				var zeitraum="";
			}
			if ('itemQuelle' in data[i]){
				var quelleArray =  data[i]['itemQuelle'].split("|");
				var quelle="";
				for (j=0;j<quelleArray.length;j++){
					if(quelleArray[j].length>6){
						quelle +=' <a href="'+quelleArray[j]+'" title="'+quelleArray[j]+'" class="quelle" target="_blank"> '+ __('Q') + (j+1) + ' </a>';
					}
				}
			}
			
			var subDataStr="";
			if (data[i]["sub"] !=undefined){
				//console.log(data[i]);
				for (var j=0;j<data[i]['sub'].length;j++){
					subDataStr+='<li id="'+data[i]['sub'][j]['name']+"#"+data[i]['sub'][j]['id']+"#"+data[i]['sub'][j]['type']+"#"+data[i]['name']+'">'+data[i]['sub'][j]['name']+'</li>';
				}
			}
			//jQuery("#content").append('<article class="search-result"><div class="search-result-description" > <p class="title"><a href="#" id="'+data[i]['name']+'#'+data[i]['id']+'#'+data[i]['type']+'" title="'+data[i]['name']+'">'+data[i]['name']+'</a>'+anchor+h3+'</p><button class="search" id="'+data[i]['id']+'">&nbsp;</button><ul class="result-details"><li class="reference-code" id="'+data[i]['item']+'">'+data[i]['item']+'</li>'+subDataStr+'</ul></div></article>');
			if (subDataStr.length>0){
				jQuery("#content").append('<article class="search-result"><div class="search-result-description" > <p class="title"><a href="#" id="' + data[i]['name'] + '#' + data[i]['id'] + '#' + data[i]['type'] + '" title="' + data[i]['name'] + '">' + data[i]['name'] + '</a>'+zeitraum  + anchor + h3 + '</p><button class="search wd-search" id="' + data[i]['id'] + '">&nbsp;</button><ul class="result-details"><li class="reference-code" id="' + data[i]['item'] + '">' + data[i]['item'] + '</li>' + subDataStr + quelle + '</ul></div></article>');
			}
			else {
				if('itemDescription' in data[i]){
					jQuery("#content").append('<article class="search-result"><div class="search-result-description" > <p class="title"><a href="#" id="' + data[i]['name'] + '#' + data[i]['id'] + '#' + data[i]['type'] + '" title="' + data[i]['name'] + '">' + data[i]['name'] + '</a>' + anchor+ h3 + '</p><button class="search wd-search" id="' + data[i]['id'] + '">&nbsp;</button><ul class="result-details"><li class="reference-code" id="' + data[i]['item'] + '">' + data[i]['item'] + '</li><li>' + data[i]['itemDescription']+ '</li><li><big>'+zeitraum + "</big></li> " + quelle +  '</ul></div></article>');

				}
				else {
					jQuery("#content").append('<article class="search-result"><div class="search-result-description" > <p class="title"><a href="#" id="' + data[i]['name'] + '#' + data[i]['id'] + '#' + data[i]['type'] + '" title="' + data[i]['name'] + '">' + data[i]['name'] + '</a>'+ anchor + h3 + '</p><button class="search wd-search" id="' + data[i]['id'] + '">&nbsp;</button><ul class="result-details"><li class="reference-code" id="' + data[i]['item'] + '">' + data[i]['item'] + '</li>' + subDataStr + quelle +  '</ul></div></article>');

				}
			}
		}
		jQuery('.title').on("click","a",function(){
			history.pushState('', 'QueKo', document.location.origin + "/index.php/thesaurus?" +jQuery(this).attr('id').replace(/#/g,"+") );
			changeWd(jQuery(this).attr('id'));
			});
		
		jQuery('#wrapper').on("click","button",function(){
			history.pushState('', 'QueKo', document.location.origin + "/index.php/thesaurus?" +jQuery(this).attr('id').replace(/#/g,"+") );
			changeWd(jQuery(this).attr('id'))
			});
		//jQuery('#wrapper').on("mouseover","button",function(){alert()});
		jQuery('.result-details').on("click","li",function(){
			history.pushState('', 'QueKo', document.location.origin + "/index.php/thesaurus?" +jQuery(this).attr('id').replace(/#/g,"+") );
			changeWd(jQuery(this).attr('id'))
			});
		jQuery('.result-details li').css("cursor","pointer");
		jQuery('.result_details').on("mousedown",".to-top",function(){jQuery('html, body').animate({ scrollTop: 0 }, 'fast');});
			
		jQuery('.multiline-header').prepend('<div id="pag" class="pagination pagination-centered"></div>');
		var pagination="";
		var pagination2="";
		for (var i=0;i<lastLetterArray.length;i++){
				if(data.length>500){
					pagination+='<li><a id="pag_'+ lastLetterArray[i] +'" class="pagination" style="cursor:pointer;">'+ lastLetterArray[i] + '</a></li>';
					pagination2+='<li><a id="pag2_'+ lastLetterArray[i] +'" class="pagination" style="cursor:pointer;">'+ lastLetterArray[i] + '</a></li>';
				}
				else{
					pagination+='<li><a href="#'+ lastLetterArray[i] +'">'+ lastLetterArray[i] + '</a></li>';
				}
		}
		if (data.length> 20){
			jQuery('#pag').html('<ul>' +pagination +'</ul>');
			 
		}
		if (data.length> 500){
			jQuery('#content').append('<div class="pagination pagination-centered"><ul>' +pagination2+'</ul></div>');
			jQuery('.pagination').on('click','a',function(){console.log(data,"|"+jQuery(this).attr("id").slice(-1).toUpperCase()+"|");
			showWdResults(data,jQuery(this).attr("id").slice(-1).toUpperCase());});
			
		}
	}
	else{
		jQuery('#content').html(data);
		jQuery('#content h2').on("click","a",function(){
			history.pushState('', 'QueKo', document.location.origin + "/index.php/thesaurus?" +jQuery(this).attr('id').replace(/#/g,"+") );
			changeWd(jQuery(this).attr('id'))
			});
	}
}

/*Starts preparation for a new query*/
function changeWd(newItem) {
	if (newItem == undefined){
		return;
	}
	
	
	var newItemArray = newItem.split('#');
	if (newItemArray.length > 1) {
		console.log(newItem);
		var wdId = newItemArray[1];
		var name = newItemArray[0];
		var type = newItemArray[2];
	} else {
		if (newItem.substr(0, 4).toLowerCase() == "http") {
			var win = window.open(newItem, '_blank');
			win.focus();
		} else {
			searchFromWd(newItem);
		}
		return;
	}

	if (newItemArray.length > 3) {
		var parent = newItemArray[3];
	} else {
		var parent = ""
	}
	changeBreadcrumb(name, wdId, type, parent);
	if (type == "kolonien") {
		wdInit();
		return;
	}
	if (type == "kolonie") {
		
		var data = [{
				name: __("Details"),
				type: 'detailed_data',
				id: wdId,
				item: ""
			},
			{
				name: __("Chronologie"),
				type: 'chronologie',
				id: wdId,
				item: ""
			},
			{
				name: __("Personen"),
				type: 'personen',
				id: wdId,
				item: ""
			},
			{
				name: __("Verwaltung"),
				type: 'verwaltungen',
				id: wdId,
				item: ""
			},
			{
				name: __("Unternehmen"),
				type: 'firmen',
				id: wdId,
				item: ""
			},
			{
				name: __("Missionen"),
				type: 'missionen',
				id: wdId,
				item: ""
			},
			{
				name: __("Militär"),
				type: 'militaer',
				id: wdId,
				item: ""
			}
		]
		

		showWdResults(data);
		return;
	}

	if (type == "") {
		/*do nothing*/
	};
	var prop = "";
	var action = "";
	var query = buildWdQuery(type, wdId, prop, culture);
	var data = getFromWd(query[0], action, query[1]);
	return;
}


/* adding the sub-categories */
function addSubData(data) {
	var sub=[];
	var type;
	var wdId;
	for (var i = 0; i < data.length; i++) {
		type = data[i]['type'];
		wdId = data[i]['id'];
		console.log(type);
		if (type == "kolonie" || type=="deutschland") {
			
				sub = [{
						name: __("Details"),
						type: 'detailed_data',
						id: wdId,
						item: ""
					},
					{
						name: __("Chronologie"),
						type: 'chronologie',
						id: wdId,
						item: ""
					},
					{
						name: __("Personen"),
						type: 'personen',
						id: wdId,
						item: ""
					},
					{
						name: __("Verwaltung"),
						type: 'verwaltungen',
						id: wdId,
						item: ""
					},
					{
						name: __("Unternehmen"),
						type: 'firmen',
						id: wdId,
						item: ""
					},
					{
						name: __("Missionen"),
						type: 'missionen',
						id: wdId,
						item: ""
					},
					{
						name: __("Militär"),
						type: 'militaers',
						id: wdId,
						item: ""
					},
					{
						name: __("Vereine"),
						type: 'vereine',
						id: wdId,
						item: ""
					},
					{
						name: __("Lokale Gemeinschaften"),
						type: 'ethnien',
						id: wdId,
						item: ""
					},
					{
						name: __("Ereignisse"),
						type: 'ereignisse',
						id: wdId,
						item: ""
					}
				]
			

			
		}
		if (["verwaltung", "mission", "missionsstationen", "militaer", "firma"].indexOf(type) != -1) {
		   
				sub = [{
						name: __("Personen"),
						type: 'zugehoerig',
						id: wdId,
						item: ""
					},
					{
						name: __("Chronologie"),
						type: 'chronologie',
						id: wdId,
						item: ""
					}
				]
			
		}
		if(type=="mission"){
			 sub[2] ={  name: __("Orte"),
						type: 'missionsstationen',
						id: wdId,
						item: ""
						}
			sub[0]['type']="missionare"
				
		}
		
		if (type=="firma"){
			sub[0]['type']="angestellte"
		}
		data[i]['sub'] = sub;
	}
	console.log(data);
	return (data);
}

/*preparing the new query*/
function buildWdQuery(type, subj, prop, lang) {
	console.log("-------------------\n",type,subj,prop);
	var query;
	var kolonie;
	
	if (!lang) lang = 'de';
	if (type == "kolonien") {
		query = 'select  ?item ?itemLabel \
		Where { bind(wd:' + subj + ' as ?concept).\
		?item wdt:P361  ?concept .  \
		SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en" }} \
		Order BY ?itemLabel';
		type = 'kolonie';
	}

	if (["person","firma","ereignis","mission","verwaltung", "ethnie", "verein","militaer"].indexOf(type)>-1) {
		type = 'detailed_data'
	};


	if (type == 'detailed_data') {
		query = 'PREFIX entity: <http://www.wikidata.org/entity/> \
				SELECT ?propNumber ?propLabel ?val  \
				WHERE \
				{ \
					hint:Query hint:optimizer "None" . \
					{	BIND(entity:' + subj + ' AS ?valUrl) . \
						BIND("N/A" AS ?propUrl ) . \
						BIND("Name"@de AS ?propLabel ) . \
						entity:' + subj + ' rdfs:label ?val . \
						FILTER (LANG(?val) = "' + lang + '") \	 } \
					 UNION \
					{ \
					   optional{ \
						 BIND(entity:' + subj + ' AS ?valUrl) . \
						 BIND("Image"@de AS ?propLabel ) . \
						 BIND("4" AS ?propNumber ) . \
						 entity:' + subj + ' wdt:P18 ?val. \
					   } \
					}\
					UNION \
					{optional{ ?valUrl schema:about entity:' + subj + '. \
							 ?valUrl schema:inLanguage "de" . \
							BIND("Wikipedia@de"@de AS ?propLabel ) . \
							BIND(str(?valUrl) AS ?val)} \
							BIND("5" AS ?propNumber ) . \
					} \
					UNION{ \
							BIND(str(entity:' + subj + ') AS ?val) . \
							BIND("Wikidata"@de AS ?propLabel ) .  \
							BIND("0" AS ?propNumber ) . \
					} \
					UNION \
					{   BIND(entity:' + subj + ' AS ?valUrl) . \
						BIND("AltLabel"@de AS ?propLabel ) .  \
						BIND("4" AS ?propNumber ) . \
						optional{entity:' + subj + ' skos:altLabel ?val}.  \
						FILTER (LANG(?val) = "' + lang + '")  } \
					UNION \
						{BIND(entity:' + subj + ' AS ?valUrl) . \
						BIND("Description"@de AS ?propLabel ) .  \
						BIND("3" AS ?propNumber ) . \
						optional{entity:' + subj + ' schema:description ?val}. \
						FILTER (LANG(?val) = "' + lang + '")  \
					} \
					UNION \
					{	entity:' + subj + ' ?propUrl ?valUrl . \
						?property ?ref ?propUrl . \
						?property rdf:type wikibase:Property . \
						?property rdfs:label ?propLabel. \
						FILTER (lang(?propLabel) = "' + lang + '") \
						filter  isliteral(?valUrl)  \
						BIND(?valUrl AS ?val) \
					} \
					UNION \
					{	entity:' + subj + ' ?propUrl ?valUrl . \
						?property ?ref ?propUrl . \
						?property rdf:type wikibase:Property . \
						?property rdfs:label ?propLabel. \
						FILTER (lang(?propLabel) = "' + lang + '" )  \
						filter  isIRI(?valUrl)  \
						?valUrl rdfs:label ?valLabel  \
						FILTER (LANG(?valLabel) = "' + lang + '")  \
						 BIND(CONCAT(?valLabel) AS ?val) \
					} \
						BIND( SUBSTR(str(?propUrl),38, 250) AS ?propNumber) \
				} \
				ORDER BY xsd:integer(?propNumber)';

		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");
		console.log(query);

		type = 'detailed_data';
	}

	if (type == "zugehoerig") {
				
		query='SELECT DISTINCT ?item ?itemLabel  ?von ?bis ?position  ?bemerkung  ?itemDescription (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 	\
				{ \
				  bind (wd:' + subj + ' as ?body) \
				  ?item p:P1416|p:P108 ?position_statement .   \
				  ?item wdt:P31 wd:Q5 . \
				  ?position_statement ps:P1416|ps:P108 ?body . \
				  OPTIONAL { ?position_statement pq:P580 ?v} \
				  OPTIONAL { ?position_statement pq:P582 ?b} \
				  bind(YEAR(?v) as ?von).\
				  bind(YEAR(?b) as ?bis).\
				  OPTIONAL { ?position_statement pq:P106/rdfs:label ?position filter (lang(?position) = "' + lang + '") .  } \
				  OPTIONAL { ?position_statement pq:P2868/rdfs:label ?bemerkung filter (lang(?bemerkung) = "' + lang + '")  } \
				  optional {?item (p:P1416)  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle ;ps:P1416 ?body ].}					  \
				  optional {?item (p:P31)  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle  ].}	\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de" . } \
				} \
				group by ?item ?itemLabel  ?von ?bis ?position  ?bemerkung ?itemDescription \
				ORDER BY   ?von ?bis ?position';

		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");


	}
	if (type == "chronologie") {
		query = 'prefix var: <http://www.wikidata.org/entity/' + subj + '>  \
				SELECT ?item  (concat(?typ, ?iLabel) as ?itemLabel) ?von ?bis ?nr  \
				WHERE  \
				{  \
					{var: p:P31 ?statement.  \
					 ?statement ps:P31 ?item.  \
					 ?item rdfs:label ?iLabel.  \
					 bind("" as ?typ)  \
					 bind(1 as ?nr)  \
					 optional{?statement pq:P580 ?von.}  \
					 optional{?statement pq:P582 ?bis.}  \
					  filter (isLiteral((DATATYPE(?von) = xsd:dateTime )|| (DATATYPE(?bis) = xsd:dateTime )))  \
					 FILTER((LANG(?iLabel)) = "de")}  \
				  union  \
					 { var: p:P36 ?statement.  \
					 ?statement ps:P36 ?item.  \
					 ?item rdfs:label ?iLabel.  \
					 bind(3 as ?nr)  \
					 bind("Hauptort: " as ?typ)  \
					 optional{?statement pq:P580 ?von.}  \
					 optional{?statement pq:P582 ?bis.}  \
					 FILTER((LANG(?iLabel)) = "de")}  \
				  union  \
					 { var: p:P131 ?statement.  \
					 ?statement ps:P131 ?item.  \
					 ?item rdfs:label ?iLabel.  \
					 optional{?statement pq:P580 ?von.}  \
					 optional{?statement pq:P582 ?bis.}  \
					 filter (isLiteral((DATATYPE(?von) = xsd:dateTime )|| (DATATYPE(?bis) = xsd:dateTime )))  \
					 bind("Teil von: " as ?typ)  \
					 bind(2 as ?nr)  \
					 FILTER((LANG(?iLabel)) = "de")}  \
				  union  \
					{  \
					var: wdt:P571 ?von.  \
					bind("Gegründet: " as ?typ)  \
					bind("" as ?iLabel)  \
					bind(0 as ?nr)  \
					}  \
				  union  \
					{  \
					var: wdt:P576 ?bis.  \
					bind("Aufgelöst: " as ?typ)  \
					bind("" as ?iLabel)  \
					 bind(4 as ?nr)  \
				  }  \
				}  \
				ORDER BY ?nr ?von'

		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");

	}

	/*Reihenfolge beachten Personen -> Person*/
	if (type == 'personen') {
		query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
		where {  \
		?item wdt:P31 wd:Q5 .  \
		?item wdt:P937 wd:' + subj + ' . \
		optional {?item (p:P937|p:P1416|p:P31)  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
		optional {?item wdt:P569 ?v. bind(YEAR(?v) as ?von).}\
		optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).}\
		SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}\
		group by ?item ?itemLabel ?itemDescription ?von ?bis\
		order by ?itemLabel';
		type = 'person';
	}

	if (type == 'verwaltungen') {
		query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle)	(MAX(?p31) as ?itemP31)		\
				where {  		\
				?item wdt:P31/wdt:P279* wd:Q327333 .  	\
				  ?item (wdt:P17|wdt:P131|wdt:P2541|wdt:P361) wd:' + subj + ' . 						\
				  ?item wdt:P31 ?p31.\
				  optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 wd:' + subj + ' ].}	\
				  optional {?item p:P131  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:131 wd:' + subj + ' ].}\
				  optional {?item (wdt:P571|wdt:P580) ?v .}\
				  optional {?item (wdt:P576|wdt:P582) ?b. }\
				  BIND(YEAR(?v) AS ?von).\
				  BIND(YEAR(?b) AS ?bis).\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}		\
				group by ?item ?itemLabel ?itemDescription	?von ?bis				\
				order by ?itemLabel';

		query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle)	(MAX(?p31) as ?itemP31)		\
				(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
				where {  		\
				 {?item wdt:P31/wdt:P279/wdt:P279/wdt:P279 wd:Q327333 . }\
				  union\
				  {?item wdt:P31/wdt:P279/wdt:P279 wd:Q327333 . }\
				  union\
				  {?item wdt:P31/wdt:P279 wd:Q327333 . }\
				  union\
				  {?item wdt:P31 wd:Q327333 . }\
				  ?item (wdt:P17|wdt:P131|wdt:P2541|wdt:P361) wd:' + subj + ' . 						\
				  ?item wdt:P31 ?p31.\
				  optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 wd:' + subj + ' ].}	\
				  optional {?item p:P131  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:131 wd:' + subj + ' ].}\
				  optional {?item (wdt:P571|wdt:P580) ?v .}\
				  optional {?item (wdt:P576|wdt:P582) ?b. }\
				  BIND(YEAR(?v) AS ?von).\
				  BIND(YEAR(?b) AS ?bis).\
				  optional{\
					?item wdt:P485 ?arc.\
					?arc rdfs:label ?arcL.\
					FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
					?item p:P485 ?statement.\
					optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
					BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
					bind(concat(str(?arc),"#",?arcL,"#",?sig) as ?aL)\
					}\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}		\
				group by ?item ?itemLabel ?itemDescription	?von ?bis				\
				order by ?itemLabel'; 



		type = 'verwaltung';
	}

	if (type == "missionen") {
		query = 'SELECT DISTINCT  ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
				(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
				Where   \
				{\
				  bind (wd:' + subj + ' as ?kolonie).\
				  {select distinct ?item ?quelle \
						  WHERE\
						  {\
							?item wdt:P31/wdt:P279* wd:Q20746389. \
						   }\
				   }\
				  ?item wdt:P2541  ?kolonie.\
				  optional {?item p:P2541 [ pq:P580 ?v; ps:P2541 ?kolonie]. }\
				  optional {?item p:P2541 [pq:P582 ?b; ps:P2541 ?kolonie].}\
				  optional {?item wdt:P571 ?g .}\
				  optional {?item wdt:P576 ?a. }\
				  BIND(IF(BOUND(?v),CONCAT(STR(YEAR(?v)),"¹"),YEAR(?g)) AS ?von).\
				  BIND(IF(BOUND(?b),CONCAT(STR(YEAR(?b)),"¹"),YEAR(?a)) AS ?bis).\
				  optional{\
					?item wdt:P485 ?arc.\
					?arc rdfs:label ?arcL.\
					FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
					?item p:P485 ?statement.\
					optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
					BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
					bind(concat(str(?arc),"#",?arcL,"#",?sig) as ?aL)\
					}\
				  optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 ?kolonie ].}\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". } \
				 }  \
				Group By ?item ?itemLabel ?itemDescription ?von ?bis ?prop\
				Order BY ?itemLabel';

		type = "mission";
	}
	
	if(type=='missionare' || type=='angestellte'){
		kolonie=jQuery('.breadcrumb li:last-child a').attr('id').split('#')[1]
		query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 			\
				where {  			\
				  ?item wdt:P108 wd:' + subj + ' .\
				  ?item wdt:P937 wd:' + kolonie + ' . 					\
				  optional {?item (p:P937|p:P108|p:P31)  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				  optional {?item wdt:P569 ?v. bind(YEAR(?v) as ?von).}			\
				  optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).}			\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}			\
				group by ?item ?itemLabel ?itemDescription ?von ?bis			\
				order by ?itemLabel';
		type="person";
		
	}

		
	

	if(type=='missionsstationen'){
		kolonie=jQuery('.breadcrumb li:last-child a').attr('id').split('#')[1]
		query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 			\
		where {  			\
		  ?item wdt:P127 wd:' + subj + '  .\
		  ?item wdt:P2541 wd:' + kolonie + ' . 				\
		  optional {?item (p:P127|p:P2541|p:P31)  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
		  optional {?item wdt:P569 ?v. bind(YEAR(?v) as ?von).}			\
		  optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).}			\
		  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}			\
		group by ?item ?itemLabel ?itemDescription ?von ?bis		\
		order by ?itemLabel';
		type="missionsstation";
	}

	if (type == "firmen") {
		query = 'SELECT DISTINCT  ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
				Where   \
				{\
				  bind (wd:' + subj + ' as ?kolonie).\
				  {select distinct ?item ?quelle \
						  WHERE\
						  {\
							?item wdt:P31/wdt:P279* wd:Q4830453. \
						   }\
				   }\
				  ?item wdt:P2541  ?kolonie.\
				  optional {?item p:P2541 [ pq:P580 ?v; ps:P2541 ?kolonie]. }\
				  optional {?item p:P2541 [pq:P582 ?b; ps:P2541 ?kolonie].}\
				  optional {?item wdt:P571 ?g .}\
				  optional {?item wdt:P576 ?a. }\
				  BIND(IF(BOUND(?v),CONCAT(STR(YEAR(?v))," (p)"),YEAR(?g)) AS ?von).\
				  BIND(IF(BOUND(?b),CONCAT(STR(YEAR(?b))," (p)"),YEAR(?a)) AS ?bis).\
				  optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 ?kolonie ].}\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". } \
				 }  \
				Group By ?item ?itemLabel ?itemDescription ?von ?bis ?prop\
				Order BY ?itemLabel';
		type = "firma";
	}
	
	
	if (type == "militaers") {
		query = 'SELECT DISTINCT  ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
				Where   \
				{\
				  bind (wd:' + subj + ' as ?kolonie).\
				  {select distinct ?item ?quelle \
						  WHERE\
						  {\
							?item wdt:P31/wdt:P279* wd:Q176799. \
						   }\
				   }\
				  ?item wdt:P2541  ?kolonie.\
				  optional {?item p:P2541 [ pq:P580 ?v; ps:P2541 ?kolonie]. }\
				  optional {?item p:P2541 [pq:P582 ?b; ps:P2541 ?kolonie].}\
				  optional {?item wdt:P571 ?g .}\
				  optional {?item wdt:P576 ?a. }\
				  BIND(IF(BOUND(?v),CONCAT(STR(YEAR(?v))," (p)"),YEAR(?g)) AS ?von).\
				  BIND(IF(BOUND(?b),CONCAT(STR(YEAR(?b))," (p)"),YEAR(?a)) AS ?bis).\
				  optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 ?kolonie ].}\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". } \
				 }  \
				Group By ?item ?itemLabel ?itemDescription ?von ?bis ?prop\
				Order BY ?itemLabel';
		type = "militaer";
	}
	
	if (type == "ereignisse"){
		type="ereignis";
		query='select  ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 			\
				where { 			\
					bind (wd:' + subj + ' as ?kolonie).\
				  ?item wdt:P31/wdt:P279* wd:Q15815670.                              \
				  ?item wdt:P706 ?kolonie 				\
				  optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				  optional {?item p:P706  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 ?kolonie ].}\
					optional {?item (wdt:P571|wdt:P580) ?v .}\
				   optional {?item (wdt:P576|wdt:P582) ?b. }\
				  BIND(YEAR(?v) AS ?von).\
				BIND(YEAR(?b) AS ?bis).\
				 SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }\
				} \
				Group By ?item ?itemLabel ?itemDescription ?von ?bis \
				Order BY ?von '
				
		query='select  ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 			\
				where { 			\
				?item wdt:P31/wdt:P279* wd:Q15815670.                              \
				?item wdt:P131* wd:' + subj + ' \
				optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				optional {?item p:P131  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P131 wd:' + subj + ' ].}\
				optional {?item (wdt:P571|wdt:P580) ?v .}\
				optional {?item (wdt:P576|wdt:P582) ?b. }\
				BIND(YEAR(?v) AS ?von).\
				BIND(YEAR(?b) AS ?bis).\
				SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }\
				} \
				Group By ?item ?itemLabel ?itemDescription ?von ?bis \
				Order BY ?von';
		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");

	}

	if (type == "ethnien") {
		query = 'select ?item (max(?deLabel)  as ?itemLabel)  (group_concat(?iLabel;separator="|")  as ?Label)  (group_concat(?itemAltLabel;separator="|") as ?AltName)  \
			  where { \
			  ?item wdt:P31 wd:Q41710. \
			  ?item rdfs:label ?iLabel  FILTER (LANG (?iLabel) = "de" || LANG (?iLabel) = "en" || LANG (?iLabel) = "fr") .  \
			  optional{?item skos:altLabel ?itemAltLabel  FILTER (LANG (?itemAltLabel) = "de" || LANG (?itemAltLabel) = "en" || LANG (?itemAltLabel) = "fr") . } \
			  ?item rdfs:label ?deLabel  FILTER (LANG (?deLabel) = "de" ). \
			  ?item wdt:P17 wd:' + subj + ' . \
			  } \
			 group by ?item order by ?itemLabel'

		type = "ethnie";
		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");
		query = query.replace(/\ \ \ \ /g, " ");
	}
	
	if (type=="vereine"){
		query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle)			\
			where {  		\
			  {?item wdt:P31/wdt:P279* wd:Q48204 .  }					 \
			  UNION					\
			  {?item wdt:P31/wdt:P279* wd:Q15911314 .  }					 \
			  UNION					\
			  {?item wdt:P31/wdt:P279* wd:Q7278 .  }  					 \
			  UNION					\
			  {?item wdt:P31/wdt:P279* wd:Q847017 .  } 					 \
			  UNION					\
			  {?item wdt:P31/wdt:P279* wd:Q276548 .  } 					\
			  ?item (wdt:P17|wdt:P2541) wd:' + subj + ' . 						\
			  optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
			  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 wd:' + subj + ' ].}			\
				optional {?item (wdt:P571|wdt:P580) ?v .}\
				optional {?item (wdt:P576|wdt:P582) ?b. }\
				BIND(YEAR(?v) AS ?von).\
				BIND(YEAR(?b) AS ?bis).\
			  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}					\
			group by ?item ?itemLabel ?itemDescription	?von ?bis				\
			order by ?itemLabel';
		type="verein";
	}
	
	if (type=="militaers"){
		type="militaer";
		query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle)							\
				where {  						  \
				?item wdt:P31/wdt:P279* wd:Q45295908 .  					 				  \
				?item (wdt:P17|wdt:P2541) wd:' + subj + ' . 										  \
				optional {?item p:P31  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}				  \
				optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 wd:' + subj + ' ].}	\
				optional {?item wdt:P569 ?v. bind(YEAR(?v) as ?von).}	\
				optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).}	\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}									\
				group by ?item ?itemLabel ?itemDescription	?von ?bis								\
				order by ?itemLabel';
		
	}
	
	

	if (type == 'labels') {
		query = 'select ?item ?itemLabel ?itemAltLabel \
		Where { bind(wd:' + subj + ' as ?item). \
		Optional{?item skos:altLabel ?itemAltLabel . } ?item rdfs:label ?itemLabel   }';
	}


	if (type == "OneProp") {
		query = 'select ?item ?itemLabel \
		Where { ?item wdt:' + prop + ' wd:' + subj + ' SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en" }  } \
		Order by ?itemLabel';
	}

	query = query.replace(/\ \ \ \ /g, " ");
	query = query.replace(/\ \ \ \ /g, " ");
	query = query.replace(/\ \ \ \ /g, " ");

	console.log(query);
	return [encodeURI(query), type];


}

/*Sending the query*/
function getFromWd(query, action, type) {
	console.log(query);
	var base_url = 'https://query.wikidata.org/sparql';
	var query_url='https://query.wikidata.org/#'
	var url = base_url + "?format=json&query=" + query;
	var url2="";
	console.log(url);
	var query2=query.replace(/%09%09/g,"%09");
	for (var i =1; i< 30; i++){
		var query2=query2.replace(/%09%09/g,"%09");
	}
	query2=query2.replace(/%09/g,"%0D");
	jQuery('#sparql-link').html('<a href="'+query_url+query2+'" target="_blank">'+__("Link zur Wikidata-Abfrage")+'</a><br />')
	showLoader();
	jQuery.get(url,
		function(data, status) {
			WdResponse(data, action, type);
			showLoader();
		}).fail(function() {
		showLoader()
	});
	return (query);
}

/*dealing with the query response*/
function WdResponse(data, action, type) {
	var aliasses = [];
	var e;
	var person;
	var ar;
	var family_name;
	if (type == 'labels') {
		for (var i = 0; i < data.results.bindings.length; i++) {
			e = data.results.bindings[i];
			if ('itemLabel' in e){
				person=false
				jQuery(".breadcrumb a").each(function(e){
						ar=jQuery(this).attr('id').split("#");
						
						if (["personen","zugehoerig","person"].indexOf(ar[ar.length-1])>-1){
							person=true
						}
					
					})
				if (person==true){
					ar=e.itemLabel['value'].split(" ")
					family_name=ar[ar.length-1]
					if (aliasses.indexOf(family_name) == -1) {
						aliasses.push(family_name);
					}
				}
			}
			if('itemAltLabel' in e){
				if (aliasses.indexOf(e.itemAltLabel['value']) == -1) {
					aliasses.push(e.itemAltLabel['value']);
				};
			};
			if (aliasses.indexOf(e.itemLabel['value']) == -1) {
				aliasses.push(e.itemLabel['value']);
			}
		}
		console.log(aliasses);
		lookupPlaces(aliasses);
		return;
	}
	if (action == "show_authority") {

		var nodeData = prepareData(data['results']['bindings'], "show_authority", type);
		show_authority_data(nodeData);
		return;
	} else {
		var nodeData = prepareData(data['results']['bindings'], action, type);

	}
	
	showWdResults(nodeData);
}

/* Preparing the results (general approach) */
function prepareData(results, node, type) {
	console.log(type);
	var ar;
	var nodeData = [];
	for (var i = 0; i < results.length; i++) {
		nodeData.push({
			'name': ''
		});
		for (var key in results[i]) {

			if (key == "itemLabel") {
				nodeData[i]['name'] = results[i]['itemLabel']['value'];
			} else {

				nodeData[i][key] = results[i][key]['value'];
			}
			if (key == "item") {
				nodeData[i]['id'] = results[i]['item']['value'].match(/[^\/]*$/i)[0];
			}
		}
		nodeData[i]['type'] = type;

	}

	/*detailed_data*/
	if (type == 'detailed_data') {

		if (node == "show_authority") {
			jQuery("#content").append('<section id="wikidataArea"><span anchor="controlArea" title="Bearbeite Bereich \'Wikidata\'"><h2>' + __('Bereich "Wikidata"') + '</h2></span></section>');
			nodeData = show_authority_data(nodeData);
		} else {

			nodeData = prepareDetails(nodeData, type);
		}
	}
	/*if (type=='mission'){
		nodeData=prepareTable(nodeData, type,'Name', ['itemDescription','vonPrecision','bisPrecision'], 1);
	}*/

	 if (type == 'zugehoerig') {
		console.log("zugehoerig");
		nodeData = prepareTable(nodeData, type, 'Name', ['bodyLabel', 'vonPrecision', 'bisPrecision', 'itemQuelle'], 1, 'person');

	}

	if (type == 'chronologie') {

		nodeData = prepareTable(nodeData, type, '', ['nr'], 1, "");

	}

	if (type == "ethnie") {

		nodeData = concat(nodeData, "name", ["Label", "AltName"]);
		console.log(nodeData);
	}

	/* Changing the order inside the name field*/
	if (type == 'person') {

		var index, z, n, arStr;
		var ar = [];
		for (i = 0; i < nodeData.length; i++) {

			arStr = nodeData[i]['name'].toString();
			ar = arStr.split(" ");
			index = ar.indexOf('von') + 1;
			if (ar.indexOf('der')>-1){
				index = ar.indexOf('der') + 1;
				console.log(ar);
			}
			if (ar.indexOf('dem')>-1){
				index = ar.indexOf('dem') + 1;
				console.log(ar);
			}

			if (index == 0) {
				
				index = ar.length - 1;
			}
			n = "";
			console.log(index);
			for (var j = 0; j < index; j++) {
				console.log(ar);

				ar.push(ar[0]);
				console.log(ar);
				ar.shift();
				console.log(ar);
			}
			for (j = 0; j < ar.length; j++) {

				if (j == ar.length - index) {
					n += ", " + ar[j];
				} else {
					n += " " + ar[j];
				}
				nodeData[i]['name'] = n.trim();
				console.log(n);
			}

		}
		console.log(JSON.stringify(nodeData));
		nodeData.sort(function(a, b) {
			var nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase()
			if (nameA < nameB)
				return -1
			if (nameA > nameB)
				return 1
			return 0
		})

	}


	console.log(JSON.stringify(nodeData));

	

	return (nodeData);
}


function prepareTable(data, type, itemTitle, excludeList, linked, itemType) {
	console.log(data, itemType);
	/*
	 data: the data array (list of dicts)
	 type: type of data
	 itemTitle: Literal to replace the 'itemLabel' column
	 excludeList: Array List with columns which should not be included
	 linked: boolean if itemLabel should be enriched with links of item
	 itemType: type of the item
	 * item should be placed before itemLabel
	 */

	var uStr = '';
	console.log(data);
	for (var i = 0; i < data.length; i++) {
		uStr += '<section><span anchor="" ><h2><a style="cursor:pointer" id="' + data[i]['name'] + '#' + data[i]['id'] + '#' + itemType + '" title="' + data[i]['name'] + '" class="wd-item">' + data[i]['name'] + "</a></h2></span>";
		for (var key in data[i]) {
			if (key == "name") {
				continue;
			}
			if ((["item", "type", "id"].indexOf(key) == -1) && (excludeList.indexOf(key) == -1)) {
				console.log(key, itemTitle);
				if (key.toLowerCase() == itemTitle.toLowerCase()) {
					if (linked == 1) {
						uStr += '<div class="field "><h3>' + key + '</h3><div>' + '<a href="#" id="' + data[i]['item'].match(/[^\/]*$/i)[0] + '|' + target_type + '" >' + data[i][key] + '</a>' + "</div></div>";
					} else {
						uStr += '<div class="field"><h3>' + key + '</h3><div>' + data[i][key] + "</div></div>";
					}

				} else {
					uStr += '<div class="field"><h3>' + key + '</h3><div>' + testDate(data[i][key], data[i][key + "Precision"]) + "</div></div>";

				}
			}
		}
		uStr += "</section>";
	}
	uStr += "";
	if (data.length == 0) {
		uStr += "<p>" + __("Keine Daten vorhanden") + "</p>"
	};
	console.log(uStr);
	return uStr;
};

/*Preparing the extension of AtoM's authority data details page*/
function show_authority_data(data) {
	var logo, content, filename, imgLink;
	var content, label;
	var arUri = getAuthorityURI();
	var prop = 0;
	var re = new RegExp("%20", 'g');
	if (typeof data === "undefined") {
		return;
	};
	for (var i = 0; i < data.length; i++) {
		content = data[i].val;
		label = data[i].propLabel;
		prop = data[i].propNumber;
		if (label == null || label == undefined) {
			label = " ";
			content = ".";
			continue;
		}
		var index;
		if (label == "Name") {
			content = "<b>" + content + "</b>";
		}
		if (content.substr(0, 4).toLowerCase() == "http") {
			content = '<a href="' + content + '" target="_blank">' + content + "</a>";
		}
		if (label == "Description") {
			content = "" + content + "";
		}
		if (label == "Wikidata") {
			logo = '<a target="_blank" href="' + data[i].val + '" title="' + __("Gehe zur Wikidata-Seite") + '"><img src="/plugins/arPotsdamPlugin/images/wd.png"/></a>';
			continue;
		}
		if (label == "Image") {
			content = jQuery(content).attr("href");
			filename = content.substring(content.lastIndexOf('/') + 1);
			filename = filename.replace(re, "_");

			imgLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/" + MD5(filename).substring(0, 1) + "/" + MD5(filename).substring(0, 2) + "/" + filename + "/200px-" + filename;
			content = '<img src="' + imgLink + '" />';

		}
		index = arUri.indexOf(parseInt(prop))
		if (index > -1) {
			content = '<a href="' + arUri[index + 1].replace("$1", content) + '" target="_blank">' + content + '</a>';
		}
		if (label == "Image") {
			jQuery('#wikidataArea').prepend('<div class="field"><h3>' + label + "</h3><div>" + testDate(content) + "</div>");
		} else {
			jQuery('#wikidataArea').append('<div class="field"><h3>' + label + "</h3><div>" + testDate(content) + "</div>");
		}

	}
	jQuery('#wikidataArea').append('<div class="field"><h3>' + __("Gehe zur Wikidata-Seite") + '</h3><div>' + logo + "</div>");
	return;
}


/* Preparing the detail page*/
function prepareDetails(data, type) {
	var uStr = "",
		logo;
	var content, label;
	var arUri = getAuthorityURI();
	var prop = 0;
	var re = new RegExp("%20", 'g');
	console.log(arUri);
	var label;
	var prop;
	var content;
	var link;
	for (var i = 0; i < data.length; i++) {
		content = data[i].val;
		label = data[i].propLabel;
		prop = data[i].propNumber;
		console.log(label);
		if (label == null || label == undefined) {
			label = " ";
			content = ".";
			continue;
		}
		var index;
		if (label == "Name") {
			content = "<b>" + content + "</b>";
		}
		if (content.substr(0, 4).toLowerCase() == "http") {
			content = '<a href="' + content + '" target="_blank">' + content + "</a>";
		}
		if (label == "Description") {
			content = "" + content + "";
		}
		if (label == "Wikidata") {
			logo = '<a target="_blank" href="' + data[i].val + '" title="' + __("Gehe zur Wikidata-Seite") + '"><img src="/plugins/arPotsdamPlugin/images/wd.png"/></a>';
			continue;
		}
		if (label == "Image") {
			content = jQuery(content).attr("href");
			var filename = content.substring(content.lastIndexOf('/') + 1);
			filename = filename.replace(re, "_");
			console.log(content, filename)
			var imgLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/" + MD5(filename).substring(0, 1) + "/" + MD5(filename).substring(0, 2) + "/" + filename + "/200px-" + filename;
			content = '<img src="' + imgLink + '" />';
			label = "";
			var trenner = "";
		}
		var index = arUri.indexOf(parseInt(prop))
		console.log(index, prop);
		if (index > -1) {
			link = arUri[index + 1].replace("$1", content)
			if (prop == 213) {
				link = link.replace(new RegExp('\ ', 'g'), "");
			}
			content = '<a href="' + link + '" target="_blank">' + content + '</a>';
		}
		uStr += '<div class="field"><h3>' + label + "</h3><div>" + testDate(content) + "</div></div>";
	}
	uStr += "" + logo;
	return uStr;
}

/*Preparing the AtoM search, getting all labels and altLabels in de, en, fr from Wikidata */
function searchFromWd(id) {
	var labels;
	labels = getLabels(id);
}


function getLabels(id) {
	//console.log(culture, id);
	return getFromWd(buildWdQuery('labels', id, "", culture)[0], "", 'labels');
};

/*Writes the content of fromFields in toFields inside () ; check also for duplicates
(Just for better presentation of data in some cases */
function concat(nodeData, toField, fromFields) {
	var tmp = "";
	var tmp_to = []
	for (var i = 0; i < nodeData.length; i++) {
		for ( var j = 0; j < fromFields.length; j++) {
			tmp += nodeData[i][fromFields[j]] + "|";
			console.log(j, nodeData[i][fromFields[j]], nodeData[i]);
		}
		var tmpArray = tmp.split("|");
		console.log(tmpArray);
		for (var k = 0; k < tmpArray.length; k++) {
			console.log(tmpArray[k], nodeData[i][toField], tmp_to);
			if (tmp_to.indexOf(tmpArray[k]) == -1) {
				if (tmpArray[k] != nodeData[i][toField]) {
					tmp_to.push(tmpArray[k]);
				}
			}
		}
		var altNames = tmp_to.join(", ")
		if (altNames.length > 0) {
			altNames = altNames.slice(0, altNames.length - 2);
		}
		nodeData[i]["h3"] = altNames;
		tmp = "";
		tmp_to = [];
	}
	return nodeData;
}


/*Writing WD entity data into AtoM autority data details*/
function showEntityFromWd() {
	var wdId, type, prop, query,sub;
	var link = (jQuery("#controlArea a").attr("href"))
	if (typeof link === "undefined") {
		return;
	};
	if (link.indexOf("wikidata.org") > -1) {
		wdId = link.substring(link.lastIndexOf('/') + 1);
		console.log(wdId);
		type = "detailed_data";
		prop = "";
		query = buildWdQuery(type, wdId, prop, culture);
		sub = getFromWd(query[0], "show_authority", query[1]);
	}
}

/*Starting a search inside AtoM unsing a term from the thesaurus*/
function searchAtoM(name, wdId) {
	window.location.replace(document.location.origin + "/index.php/informationobject/browse?topLod=0&query=" + name + "&repos=");
}

