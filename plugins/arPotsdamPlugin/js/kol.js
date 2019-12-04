
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


	'use strict'

/************************* BEGIN JQUERY LOADED*********************************/
//console.log(culture);

jQuery(document).ready(function() {
	return;


var cultureFromQs=getParameterByName('sf_culture');
if (cultureFromQs!=null){
	cultureFromQs=cultureFromQs.slice(-2);
	//console.log(cultureFromQs);
	culture=cultureFromQs;
	//console.log(culture);
	}
;

console.log("Culture",culture);
    /************************* INITS ********************************/

    /* Workaround because of the elastica error (first browse on session culture=de)*/
   /* if (culture=="de"){
		if (jQuery('.messages strong').length > 0) {
			if (jQuery('.messages strong').text().indexOf('Exception') > 0) {
				console.log(jQuery('#header-nav li:nth-child(3) a').attr('href'));
				window.location = jQuery('#header-nav li:nth-child(3) a').attr('href');
			}
		}
	}*/
	
	jQuery(".link2"+culture).css("display","none");

    jQuery("#header-nav a").each(function() {
		
        var languages = ["de", "Deutsch", "fr", "français", "en", "English"];
        var lang = languages[languages.indexOf(culture) + 1];
        console.log(lang);
        if (jQuery(this).attr("title") == lang) {
            jQuery(this).css("text-decoration", "underline");
        }
        if (jQuery(this).attr("href").search("thesaurus")>-1){
			if (cultureFromQs!=null){
				jQuery(this).attr("href", "/index.php/thesaurus?sf_culture="+cultureFromQs)
			}
		}
        if (jQuery(this).attr("href").search("map")>-1){
			if (cultureFromQs!=null){
				jQuery(this).attr("href", "/index.php/map?sf_culture="+cultureFromQs)
			}
		}
    });
    
    /* add a JSON export link to information objects */
    if (jQuery('#action-icons ul li').length>8){
		jQuery('<li class="export-json"><a href='+ document.location.origin + '/api.php?q=informationobjects/'+get_slug()+'?sf_culture='+culture+'"><i class="fa fa-upload"></i> JSON</a></li>').insertAfter("#action-icons ul li:nth-child(9)");
	}
    /* Extend listed authority data by Wikidata query*/
    if (jQuery("#controlArea").length != 0) {
        showEntityFromWd();
    }


    if (jQuery("#content").length != 0) {
        jQuery("#lookup").css("display", "block");
    };

    /* route all http anchors in div: content to target=_blank */
    jQuery('a').each(function(index) {
        var href = jQuery(this).attr("href");
        if (jQuery("#content").attr('href') !== undefined) {
            if (href.substring(0, 4).toLowerCase() == "http") {
                jQuery(this).attr("target", "_blank");
                console.log("Done");
            }
        };
    });


    /* Check if special function should be called, depending on static page slug*/
    if (get_slug() == "thesaurus") {
		console.log(get_search());
		if (get_search() == ""){
			
			showWD();
		}
		else{
			changeWd(get_search())
		}
    };

    if (get_slug() == "institutions") {
        jQuery('#main-column').html("");
        load_institutions();
    };	

    if (get_slug() == "map") {
        jQuery('#main-column').html("");
        load_ol();
    };
    if (get_slug() == "font-tool") {
        jQuery('#main-column').html("");
        showFontTool();
    };

	if (get_slug() == "revision"){
		jQuery('#main-column').html("&nsbp;");
		  var queries = {};
		  jQuery.each(document.location.search.substr(1).split('&'),function(c,q){
			var i = q.split('=');
			if(i[0].toString()=="d"){
				showRevisions(i[1].toString());
			}
			queries[i[0].toString()] = i[1].toString();
		  });
		
	}



    /* Looking for the current AtoM slug*/
    function get_slug() {
        var path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1);
    }
    


    /***********************************************  ES ****************************************************************** */
    /* Query the search index*/
    function queryES(index, query, todo, name) {
		if (!name) name = "";
        console.log(todo);
        var url = document.location.origin + "/esq.php?index=" + index + "&todo=" + todo + "&term=" + query['term'];
        console.log(url);
        jQuery.get(url,
            function(data, status) {
                AjaxResponse(JSON.parse(data), todo, name);
            }).fail(function(e) {
            console.log(e.message);
        });
    };


    /* Handling query results */
    function AjaxResponse(data, todo, name) {
        console.log(data);
        console.log(typeof(data));
        console.log(data, data.hits.hits.length, todo);
        if (todo == "placesHere") {
            printPlaces(data.hits.hits);
        }
        /* Word corpus */
        if (todo == "corpus") {
            wordLookupCB(data.hits.hits, name);
            return;
        }

        return data;
    }


	/**********************************************INSTITUTIONS ************************************************************/
	
	function load_institutionsXXXX(){

					var features= new ol.layer.Vector({
						source: new ol.source.Vector({
						   
							url: '/get.php',
							format: new ol.format.GeoJSON()
						})
					});

						
						
						
					  var map = new ol.Map({
						target: 'map',
						layers: [
						  new ol.layer.Tile({
							source: new ol.source.OSM()
						  }),
						  features
						],
						view: new ol.View({
						  center: ol.proj.fromLonLat([10, 50]),
						  zoom: 6
						})
					  });
						
					}
					
			function load_institutionsyyyy(){
						

				
					var getText = function(feature) {
						var text = feature.get('name');
						return text;
					};

					var createTextStyle = function(feature) {
					  return new ol.style.Text({
						textAlign: 'center',
						textBaseline: 'middle',
						font: '12px Verdana',
						text: getText(feature),
						fill: new ol.style.Fill({color: 'black'}),
						stroke: new ol.style.Stroke({color: 'white', width: 0.5})
					  });
					};

					var features= new ol.layer.Vector({
						source: new ol.source.Vector({
							url: '/get.php',
							format: new ol.format.GeoJSON(),
							
						})

					});

					var map = new ol.Map({
						target: 'map',
						layers: [
							new ol.layer.Tile({
							source: new ol.source.OSM()
						}),
						features
						],
						view: new ol.View({
							center: ol.proj.transform([10, 50], 'EPSG:4326', 'EPSG:3857'),
							zoom: 7
						})
					});
				
	}

	function load_institutions(){
		
		   // Points
		  function pointStyleFunction(feature, resolution) {
			return new Style({
			  image: new CircleStyle({
				radius: 10,
				fill: new Fill({color: 'rgba(255, 0, 0, 0.1)'}),
				stroke: new Stroke({color: 'red', width: 1})
			  }),
			  text: createTextStyle(feature, resolution, myDom.points)
			});
		  }
		
		var createTextStyle=function(){};
		
		// Create background layer
		var baseLayer = new ol.layer.Tile({
			source: new ol.source.OSM()
		  
		});

		// Create vectorlayer and load GeoJSON file from mapz.com
		var vectorLayer = new ol.layer.Vector({
		  source: new ol.source.Vector({
			url: "/get.php",
			format: new ol.format.GeoJSON()
		  }),
			//style:  pointStyleFunction
			style: function(feature) {
				
				var featureStyle = new ol.style.Style({
					stroke: new ol.style.Stroke({
						color: 'red',
						width: 3
					}),
					fill: new ol.style.Fill({
						color: 'green',
						width: 2
					  }),
					  image: new ol.style.Icon({
							scale: 0.5,
							src: '/plugins/arPotsdamPlugin/images/marker_blue.png'
						  }),
					
					      text: new ol.style.Text({
							text: feature.get('name'),
							scale: 0.9,
							offsetY: -15,
							textAlign:'left',
							padding:[5,5,5,5],
							fill: new ol.style.Fill({
							  color: '#000000'
							}),
							stroke: new ol.style.Stroke({
							  color: '#FFFF99',
							  width: 3.5
							})
						  })
					
					
					
					
				})
				;
				//console.log(feature);
				return [featureStyle];
		  }
		});

		var map = new ol.Map({
		
		            controls: ol.control.defaults().extend([

				new ol.control.FullScreen(), 


				new ol.control.Zoom({
					minWidth: 120
				})
				]),
		
		  target: document.getElementById('map'),
		  logo: false,
		  layers: [
			baseLayer,
			vectorLayer 
		  ],
		  view: new ol.View({
			center: ol.proj.transform([13.35320296,52.51372], 'EPSG:4326', 'EPSG:3857'),
			zoom: 6
		  })
		});

  

		map.on("singleclick", function (evt) {
		  this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
			  var info;
			  info=feature.get("name")+"<br/>"+ feature.get("note").replace(new RegExp('\r?\n','g'), '<br />') +"<br />" + feature.get("url") + "<br />" + feature.get("address");
			  jQuery("#archiv-info").html(info);
			//console.log(feature.get("name")+"\n"+ feature.get("note") +"\n" + feature.get("url") + "\n" + feature.get("address"));
		  });
		});
  
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
					  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}		\
					group by ?item ?itemLabel ?itemDescription	?von ?bis				\
					order by ?itemLabel'; 

 
 
            type = 'verwaltung';
        }

        if (type == "missionen") {
            query = 'SELECT DISTINCT  ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
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


	function showRevisions(timedelta){
		showLoader();
		jQuery.getJSON('/plugins/arPotsdamPlugin/tmp/revision'+timedelta+'.json', function(data) {
			REVISIONS = data;
			console.log(REVISIONS);
			listRevisions(REVISIONS,timedelta);
		});

	}

	function listRevisions(REVISIONS, timedelta){
		var last_item="";
		var item_title="";
		var item_text="";
		var content=""
		for (var i=0; i<REVISIONS.length;i++){
			item_title="";
			item_text="";
			if (REVISIONS[i][0]!=last_item){
				last_item=REVISIONS[i][0];
				if (i==0){
					item_title='<dl style="margin-left:10px">';
				};
				item_title+='<dt><b><a href="'+REVISIONS[i][0]+'" target="_blank" title="'+REVISIONS[i][2]+'">'+REVISIONS[i][1]+' <small>('+REVISIONS[i][0].slice(31)+')</small></a></b></dt>';
				content+=item_title;
			}
			
			if (REVISIONS[i][6]!="" || REVISIONS[i][9]!=""){
				var prop_text="";
				var dl;
				var comment;
				var color;
				if (REVISIONS[i][6]!=""){
					prop_text +=REVISIONS[i][7]+' <a href="https://www.wikidata.org/wiki/Property:'+REVISIONS[i][6]+'" target="_blank">'+'('+REVISIONS[i][6]+')'+'</a> ';
				}	
				if (REVISIONS[i][9]!=""){
					var obj_text="";
					if (REVISIONS[i][8]!=""){
						obj_text= ' → '+ REVISIONS[i][9]+' <a href="https://www.wikidata.org/wiki/'+REVISIONS[i][8]+'" target="_blank"> ('+REVISIONS[i][8]+')'+'</a>';
					}
					else{
						obj_text += ' → <i>' +REVISIONS[i][9] +'</i>;'
					}
					item_text+= prop_text + obj_text ;
				}
				item_text+='<br />' + REVISIONS[i][3] + ' (<small><a href="https://www.wikidata.org/wiki/User:'+REVISIONS[i][4]+'" target="_blank">' + REVISIONS[i][4] +'</a></small>)';
			}
			if (i==REVISIONS.length-1){
				dl='</dl>';
			}
			else{
				dl="";
			}
			comment=REVISIONS[i][5];
			if (comment.match(/add|update|create|set/i) != null){
				color="green"
			}
			if (comment.match(/remove|merge/i) != null){
				color="red"
			}
			item_text+='<small style="color:'+color+'">  → '+comment+'</small>';
			content+='<dd style="margin-bottom:10px">'+item_text+'</dd>' + dl;
		}
		content+='</dl>';
		jQuery("#content").append(content);
		jQuery('#content').prepend('<h1>Wikidata-Revisionen der vergangenen '+timedelta+' Tage</h1>')
		showLoader();
		
	}

	

    /*************************************** Getting a publication list from authorities (Yet to create) *******************************************************/
    function get_literature(url) {
        console.log("dnb start" + url); {
            showLoader()
        };
        jQuery.put(url, data,
            function(html, status) {
                analyze_literature(html);
                showLoader();
            }).fail(function() {
            console.log("Fails"), showLoader()
        });
        return;
    }

    function analyze_literature(html) {
        console.log(html);
    }





    /*************************CALLER*********************************/


    jQuery('#popup-search').click(function() {
        var ar = [];
        jQuery('#ortsliste option:selected').each(function() {
            ar.push(jQuery(this).val());
        });
        lookupPlaces(ar);
    });

    jQuery('#popup-select').click(function() {
        jQuery('#ortsliste option').prop('selected', true);
    });

    jQuery('#lookup').click(function() {
        switchTranslationMode(this);
    })
	
	window.addEventListener("popstate", function(){
		console.log(get_slug());
		console.log(get_search());
		if (get_slug()=="thesaurus" ){
			if (get_search()!=""){
				changeWd(get_search());
			}
			else{
				showWD();
			}
		}
		if (get_slug()=="map" ){
			if (get_search()!=""){
				console.log(get_search());
			}
			else{
				showMap()();
			}
		}
	});
	

    /*****************************************************  Loading Scripts ***********************************************/

    function load_ol() {
        //jQuery.getScript('https://openlayers.org/en/v5.0.0/build/ol.js', function() {
            //jQuery.getScript('https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL', function() {
                showMap();
            //});
       //});
    }

    function load_wd() {
        showWD();
    }


  

    function getAuthorityURI() {
        return [4389, 'https://collection.sciencemuseum.org.uk/people/$1', 4394, 'http://braininfo.rprc.washington.edu/centraldirectory.aspx?ID=$1', 4395, 'http://braininfo.rprc.washington.edu/centraldirectory.aspx?type=h&ID=$1', 4427, 'http://id.agrisemantics.org/gacs/C$1', 4440, 'http://catalogo.iib.unam.mx/F/-/?func=find-b&find_code=SYS&local_base=BNM10&format=999&request=$1', 4460, 'http://formats.kaitai.io/$1/', 4466, 'http://astrothesaurus.org/uat/$1', 4515, 'https://www.prisma.de/$1', 4520, 'https://suncat.ac.uk/serials/SCID$1', 4531, 'https://chineseposters.net/artists/$1.php', 4549, 'https://arlima.net/no/$1', 4553, 'http://www.racollection.org.uk/ixbin/indexplus?_IXACTION_=file&_IXFILE_=templates/full/person.html&_IXTRAIL_=Names%C2%A0A-Z&person=$1', 4558, 'http://sig.mapama.es/93/ClienteWS/snczi/default.aspx?nombre=PRESA&claves=DGAGUA.PRESAS.CODPRESA&valores=$1', 4574, 'http://histreg.no/index.php/person/$1', 4589, 'http://www.dreadnoughtproject.org/tfs/index.php/$1', 4591, 'http://www.veterans.gc.ca/eng/remembrance/memorials/national-inventory-canadian-memorials/details/$1', 4613, 'http://esu.com.ua/search_articles.php?id=$1', 4636, 'https://v2.sherpa.ac.uk/id/funder/$1', 4662, 'http://www.san.beniculturali.it/web/san/dettaglio-soggetto-conservatore?codiSan=san.cat.sogC.$1', 4694, 'http://www.arquivo.arq.br/$1', 4696, 'https://ciqual.anses.fr/#/aliments/$1', 4726, 'http://signal.sciencespo-lyon.fr/revue/$1', 4729, 'http://nut.entecra.it/646/tabelle_di_composizione_degli_alimenti.html?idalimento=$1&quant=100', 4750, 'http://www.nationalhistoricships.org.uk/register/$1/', 213, 'http://isni.org/isni/$1', 214, 'https://viaf.org/viaf/$1', 227, 'https://d-nb.info/gnd/$1', 244, 'https://id.loc.gov/authorities/$1', 268, 'http://catalogue.bnf.fr/ark:/12148/cb$1', 269, 'https://www.idref.fr/$1', 270, 'http://opac.calis.edu.cn/aopac/ajsp/detail.jsp?actionfrom=1&actl=CAL++$1', 349, 'https://id.ndl.go.jp/auth/ndlna/$1', 377, 'http://www.n2yo.com/satellite/?s=$1', 409, 'https://nla.gov.au/anbd.aut-an$1', 428, 'http://www.ipni.org/ipni/advAuthorSearch.do?find_abbreviation=$1', 458, 'https://www.marinetraffic.com/ais/details/ships/$1', 486, 'https://id.nlm.nih.gov/mesh/$1.html', 486, 'https://meshb.nlm.nih.gov/#/record/ui?ui=$1', 493, 'http://www.icd9data.com/getICD9Code.ashx?icd9=$1', 494, 'http://apps.who.int/classifications/icd10/browse/2016/en#/$1', 502, 'http://tools.wmflabs.org/wikidata-externalid-url/?p=502&url_prefix="http://www.nhc.noaa.gov/archive/&id=$1"', 508, 'http://thes.bncf.firenze.sbn.it/termine.php?id=$1', 563, 'http://codes.iarc.fr/search.php?cx=009987501641899931167%3A2_7lsevqpdm&cof=FORID%3A9&ie=UTF-8&ie=ISO-8859-1&oe=ISO-8859-1&sa=&q=$1', 586, 'http://www.ipni.org/ipni/idAuthorSearch.do?id=$1', 587, 'https://www.marinetraffic.com/ais/details/ships/$1', 646, 'https://g.co/kg$1', 648, 'https://openlibrary.org/works/$1', 650, 'https://rkd.nl/en/explore/artists/$1', 672, 'http://id.nlm.nih.gov/mesh/$1', 686, 'http://amigo.geneontology.org/amigo/term/$1', 691, 'http://aut.nkp.cz/$1', 691, 'https://aleph.nkp.cz/F/?func=find-c&local_base=aut&ccl_term=ica=$1&CON_LNG=ENG', 731, 'https://litholex.bgr.de/gesamt_ausgabe_neu.php?id=$1', 863, 'https://inpho.cogs.indiana.edu/$1.html', 906, 'https://libris.kb.se/auth/$1', 918, 'http://www5.hrsdc.gc.ca/noc/english/noc/2011/Profile.aspx?val=7&val1=$1', 919, 'http://tools.wmflabs.org/wikidata-externalid-url/?p=919&url_prefix="http://www.bls.gov/soc/2010/soc&url_suffix=.htm&id=$1"', 920, 'http://id.sgcb.mcu.es/Autoridades/$1/concept.html', 949, 'http://aleph.nli.org.il/F/?func=find-b&local_base=NNL10&find_code=SYS&con_lng=eng&request=$1', 950, 'http://datos.bne.es/resource/$1', 951, 'http://viaf.org/processed/NSZL%7C$1', 1005, 'http://urn.bn.pt/nca/unimarc-authorities/txt?id=$1', 1006, 'http://opc4.kb.nl/PPN?PPN=$1', 1014, 'http://vocab.getty.edu/page/aat/$1', 1015, 'https://authority.bibsys.no/authority/rest/authorities/html/$1', 1017, 'https://viaf.org/viaf/sourceID/BAV|$1', 1036, 'http://dewey.info/class/$1/', 1047, 'http://www.catholic-hierarchy.org/bishop/b$1.html', 1051, 'http://psh.techlib.cz/skos/PSH$1', 1149, 'http://id.loc.gov/authorities/classification/$1.html', 1150, 'http://rvk.uni-regensburg.de/regensburger-verbundklassifikation-online#notation/$1', 1207, 'https://viaf.org/processed/NUKAT|$1', 1256, 'http://iconclass.org/$1', 1273, 'http://cantic.bnc.cat/registres/CUCId/$1', 1284, 'https://www.munzinger.de/search/go/document.jsp?id=$1', 1294, 'http://www.worldwildlife.org/ecoregions/$1', 1296, 'https://www.enciclopedia.cat/EC-GEC-$1.xml', 1315, 'http://trove.nla.gov.au/people/$1', 1362, 'http://tls.theaterwissenschaft.ch/wiki/$1', 1375, 'http://katalog.nsk.hr/F/?func=direct&doc_number=$1&local_base=nsk10', 1385, 'http://www.culturacores.azores.gov.pt/ea/pesquisa/Default.aspx?id=$1', 1394, 'http://glottolog.org/resource/languoid/id/$1', 1402, 'http://xiphoid.biostr.washington.edu/fma/fmabrowser-hierarchy.html?fmaid=$1', 1417, 'https://www.britannica.com/$1', 1453, 'http://www.catholic.ru/modules.php?name=Encyclopedia&op=content&tid=$1', 1550, 'http://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=EN&Expert=$1', 1645, 'http://physics.nist.gov/cgi-bin/cuu/Value?$1', 1670, 'https://www.collectionscanada.gc.ca/canadiana-authorities/index/view?index_name=cdnAutNbr&search_text=$1&page=1&cdnAutNbr=$1', 1695, 'http://mak.bn.org.pl/cgi-bin/KHW/makwww.exe?BM=01&IM=04&NU=01&WI=$1', 1711, 'https://collection.britishmuseum.org/id/person-institution/$1', 1755, 'http://aviation-safety.net/database/record.php?id=$1', 1760, 'http://aviation-safety.net/wikibase/wiki.php?id=$1', 1769, 'http://denkxweb.denkmalpflege-hessen.de/cgi-bin/mapwalk.pl?event=Query.Details&obj=$1', 1807, 'http://www.enciclopedia-aragonesa.com/voz.asp?voz_id=$1', 1819, 'http://www.genealogics.org/getperson.php?personID=$1&tree=LEO', 1900, 'http://www.eagle-network.eu/voc/$1', 1928, 'http://www.ontobee.org/browser/rdf.php?o=VO&iri="http://purl.obolibrary.org/obo/$1"', 1938, 'https://www.gutenberg.org/ebooks/author/$1', 1946, 'http://catalogue.nli.ie/Record/$1', 2004, 'http://lod.nal.usda.gov/nalt/$1', 2026, 'https://avibase.bsc-eoc.org/species.jsp?avibaseid=$1', 2106, 'http://www.rsc.org/publishing/journals/prospect/ontology.asp?id=$1', 2158, 'http://purl.obolibrary.org/obo/$1', 2163, 'http://id.worldcat.org/fast/$1', 2179, 'https://dl.acm.org/buildccscode.cfm?id=$1&lid=f', 2263, 'http://www.isocat.org/rest/dc/$1', 2347, 'http://www.yso.fi/onto/yso/p$1', 2355, 'http://www.unesco.org/languages-atlas/en/atlasmap/language-id-$1.html', 2357, 'https://nces.ed.gov/ipeds/cipcode/cipdetail.aspx?y=55&cip=$1', 2367, 'http://dbforms.ga.gov.au/pls/www/geodx.strat_units.sch_full?wher=stratno=$1', 2372, 'http://www.odis.be/lnk/$1', 2397, 'https://www.youtube.com/channel/$1', 2452, 'http://www.geonames.org/ontology#$1', 2457, 'https://dmzapp17p.ris.environment.gov.au/shipwreck/public/wreck/wreck.do?key=$1', 2464, 'http://bugguide.net/node/view/$1', 2477, 'https://www.tbrc.org/#!rid=$1', 2479, 'https://spdx.org/licenses/$1.html', 2581, 'http://babelnet.org/synset?word=bn:$1', 2612, 'https://www.ted.com/topics/$1', 2671, 'https://g.co/kg$1', 2689, 'http://bartoc.org/en/node/$1', 2742, 'http://www.ga.gov.au/provexplorer/provinceDetails.do?eno=$1', 2748, 'https://www.nationalarchives.gov.uk/pronom/$1', 2751, 'http://rcdb.com/$1.htm', 2752, 'http://www.nzor.org.nz/names/$1', 2760, 'http://archive.foodstandards.gov.au/consumerinformation/nuttab2010/nuttab2010onlinesearchabledatabase/onlineversion_code.cfm?&action=getFood&foodID=$1', 2812, 'http://mathworld.wolfram.com/$1.html', 2863, 'http://www.molendatabase.nl/nederland/molen.php?nummer=$1', 2866, 'http://www.molens.nl/nl/molen/zoek-een-molen/zoekresultaten-molenbestand/molendetail/?molenid=$1', 2867, 'http://www.molenechos.org/molen.php?AdvSearch=$1', 2874, 'https://pubchem.ncbi.nlm.nih.gov/bioassay/$1', 2924, 'https://bigenc.ru/text/$1', 2950, 'http://nomisma.org/id/$1', 3021, 'http://www.iranicaonline.org/articles/$1', 3040, 'https://soundcloud.com/$1', 3064, 'http://www.nhm.ac.uk/jdsml/research-curation/research/projects/lepindex/detail.dsml?TaxonNo=$1', 3065, 'http://data.rero.ch/$1', 3074, 'http://www.gracesguide.co.uk/$1', 3088, 'http://taibnet.sinica.edu.tw/chi/taibnet_species_detail.php?name_code=$1', 3088, 'http://taibnet.sinica.edu.tw/eng/taibnet_species_detail.php?name_code=$1', 3102, 'http://www.plantarium.ru/page/view/item/$1.html', 3105, 'http://www.tela-botanica.org/bdtfx-nn-$1', 3106, 'https://www.theguardian.com/$1', 3123, 'http://plato.stanford.edu/entries/$1', 3130, 'http://plantnet.rbgsyd.nsw.gov.au/cgi-bin/NSWfl.pl?page=nswfl&lvl=sp&name=$1', 3133, 'http://nektar.oszk.hu/auth/$1', 3180, 'https://vndb.org/$1', 3183, 'http://topics.wsj.com/$1', 3201, 'http://purl.bioontology.org/ontology/MEDDRA/$1', 3221, 'https://www.nytimes.com/topic/$1', 3222, 'https://www.ne.se/uppslagsverk/encyklopedi/lång/$1', 3235, 'http://philpapers.org/browse/$1', 3240, 'https://data.nbn.org.uk/Taxa/$1', 3241, 'http://www.newadvent.org/cathen/$1.htm', 3265, 'https://myspace.com/$1', 3267, 'https://www.flickr.com/photos/$1', 3285, 'http://www.ams.org/mathscinet/msc/msc2010.html?t=$1', 3289, 'https://web.expasy.org/cellosaurus/$1', 3308, 'https://lib.reviews/thing/$1', 3322, 'https://www.vlinderstichting.nl/vlinders/overzicht-vlinders/details-vlinder/?vlinder=$1', 3328, 'http://www.wurvoc.org/vocabularies/om-1.8/$1', 3347, 'https://permid.org/1-$1', 3348, 'http://nlg.okfn.gr/resource/authority/record$1', 3365, 'http://www.treccani.it/enciclopedia/$1', 3370, 'http://www.geopatronyme.com/nomcarte/$1', 3381, 'http://fileformats.archiveteam.org/wiki/$1', 3390, 'http://unicat.nlb.by/opac/pls/dict.prn_ref?tu=r&tq=v0&name_view=va_all&a001=BY-NLB-ar$1&strq=l_siz=20', 3398, 'http://www.butterfliesandmoths.org/$1', 3400, 'http://cordis.europa.eu/projects/$1', 3420, 'http://www.calflora.org/cgi-bin/species_query.cgi?where-calrecnum=$1', 3430, 'http://snaccooperative.org/ark:/99166/$1', 3479, 'http://www.aftonbladet.se/tagg/$1', 3545, 'http://www.theoi.com/$1.html', 3552, 'https://connectonline.asic.gov.au/RegistrySearch/faces/landing/panelSearch.jspx?searchType=OrgAndBusNm&searchText=$1', 3553, 'https://www.zhihu.com/topic/$1', 3579, 'http://weibo.com/$1', 3583, 'http://www.surfline.com/surfaz/surfaz.cfm?id=$1', 3591, 'http://wcsp.science.kew.org/namedetail.do?name_id=$1', 3710, 'http://www.daat.ac.il/encyclopedia/value.asp?id1=$1', 3720, 'https://www.gpnotebook.co.uk/simplepage.cfm?ID=$1', 3724, 'https://www.ushmm.org/wlc/en/article.php?ModuleId=$1', 3762, 'https://openmlol.it/autore/$1', 3763, 'http://www.mimo-db.eu/InstrumentsKeywords/$1', 3790, 'http://animecons.com/guests/bio.shtml/$1', 3794, 'http://dictionaryofsydney.org/$1', 3795, 'http://flora.org.il/plants/$1', 3798, 'http://www.starwars.com/databank/$1/', 3827, 'https://www.jstor.org/topic/$1', 3832, "http://www.europeanafashion.eu/portal/browse.html#objectType%3D'http%3A%2F%2Fthesaurus.europeanafashion.eu%2Fthesaurus%2F$1", 3847, 'https://openlibrary.org/subjects/$1', 3854, 'http://www.soundtrackcollector.com/title/$1/', 3859, "https://www.ebi.ac.uk/ols/ontologies/envo/terms?iri=http://purl.obolibrary.org/obo/ENVO_$1", 3885, 'http://www.histmodbiomed.org/taxonomy/term/$1', 3895, 'http://www.inao.gouv.fr/produit/$1', 3905, 'http://data.culture.fr/thesaurus/page/ark:/67717/$1', 3911, 'http://zbw.eu/stw/descriptor/$1', 3916, 'http://vocabularies.unesco.org/thesaurus/$1', 3941, 'http://www.iaa-archives.org.il/search.aspx?loc_id=$1', 3943, 'https://$1.tumblr.com/', 3964, 'http://bibliotecadigital.jcyl.es/en/consulta_aut/registro.cmd?id=$1', 3964, 'http://bibliotecadigital.jcyl.es/es/consulta_aut/registro.cmd?id=$1', 3964, 'http://bibliotecadigital.jcyl.es/fr/consulta_aut/registro.cmd?id=$1', 3973, 'https://resolver.pim.hu/auth/$1', 3984, 'https://www.reddit.com/r/$1/', 3986, 'http://www.sequenceontology.org/browser/current_svn/term/$1', 3998, 'http://censoarchivos.mcu.es/CensoGuia/archivodetail.htm?id=$1', 4003, 'https://www.facebook.com/pages/$1', 4051, 'http://zakon5.rada.gov.ua/laws/show/$1', 4073, 'http://$1.wikia.com/', 4104, 'http://data.carnegiehall.org/names/$1', 4106, 'http://www.kyppi.fi/to.aspx?id=112.$1', 4125, 'http://titan.gbif.fr/sel_genann1.php?numero=$1', 4160, 'https://restaurant.michelin.fr/$1', 4167, 'https://www.dn.no/topic/$1', 4180, 'http://gujlit.com/profile.php?pId=$1', 4201, 'https://www.pagesjaunes.fr/pros/$1', 4204, 'http://timesofindia.indiatimes.com/topic/$1', 4223, 'http://www.treccani.it/enciclopedia/$1_(Enciclopedia-Italiana)/', 4228, 'http://www.eoas.info/biogs/$1.htm', 4255, 'http://en.banglapedia.org/index.php?title=$1', 4272, 'https://dp.la/search?subject%5B%5D=$1', 4293, 'http://purl.org/pressemappe20/folder/$1', 4294, 'http://www.crd.york.ac.uk/PROSPERO/display_record.asp?ID=$1', 4297, 'https://spatialillusions.com/unitgenerator.html#$1', 4304, 'https://id.erfgoed.net/thesauri/materialen/$1', 4305, 'https://id.erfgoed.net/thesauri/stijlen_en_culturen/$1', 4306, 'https://id.erfgoed.net/thesauri/datering/$1', 4307, 'https://id.erfgoed.net/thesauri/erfgoedtypes/$1', 4308, 'https://id.erfgoed.net/thesauri/waardetypes/$1', 4309, 'https://id.erfgoed.net/thesauri/gebeurtenistypes/$1', 4310, 'https://id.erfgoed.net/thesauri/besluittypes/$1', 4311, 'https://id.erfgoed.net/thesauri/soorten/$1'];

    }


    /******************************   end of jQuery.document(ready) ***************************************************/

});



/****************************  THE END ***********************************/


    /* Looking for the Query String in current URL*/
    function get_search(){
		var search=window.location.search
		search=search.replace(/sf_culture=[defr][defr]/g,"");
		search=search.replace(/\+/g,"#");
		console.log(search)
		if (search.length>1){
		return search.slice(1)
		}
		else {
			return "";
		}
	}


    /***********************I18N***********************************/

    function __(term) {
		//console.log(culture);
        if (culture == "de") {
			if (jQuery.isNumeric(term)){
				return I18N[0][term];
			}
            return term;
        }
        else{
			if (jQuery.isNumeric(term)){
				return I18N[1][term];
			}
			for (var i in I18N[0]){
				if(I18N[0][i]==term){
					if (i in I18N[1]){
						return I18N[1][i];
					}
				}
			}
		}
		return term;
    }
