 var request;
 
 
 jQuery(document).ready(function() {

	 if (get_slug()=="thesaurus"){
		showWD()
	}
 });


    /***********************************************  WIKIDATA****************************************************************** */

    /* Starting the Wikidata thesaurus*/
    function showWD() {
        saveContent();
        console.log(culture);
        console.log("init")
        jQuery("#wrapper").html('<div class="row">\
									<div class="span3">\
										<div id="sidebar">\
											<ul id="wd-sidebar">\
											<li >\
											<div id="sparql-link-image"></div><div id="sparql-link"></div>\
											</li>\
											<li>\
											 <div id="wd-contribute"></div><div><a href="wikidata">'+__('Am Thesaurus mitarbeiten')+'</a></div>\
											</li>\
											<li>\
											 <div id="wd-visualisation"></div><div><a href="data">'+__('Visualisierungen')+'</a></div>\
											</li>\
											<li>\
											 <div id="wd-revision"></div><div><a href="revision?d=7">'+__("Aktuelle Änderungen am Datenkorpus")+'</a></div>\
											</li>\
											<li>\
											</li>\
											</ul>\
										</div>\
									</div>\
									<div class="span9">\
										<div id="main-column">\
											<div class="multiline-header">\
												<img alt="" src="/plugins/arPotsdamPlugin/images/SVG/ic_thesaurus.svg" />\
												<h1 aria-describedby="">'+__('Thesaurus')+'\
												</h1>\
												<div class="wd-result-count">\
												</div>\
												<p>'+__(49)+'\
												</p>\
											</div>\
											<section id="wd-breadcrumb" class="breadcrumb">\
											</section>\
											<div id="content">\
											</div>\
										</div>\
									</div>\
								</div>')
							
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
                "name": __("Deutsch-Neuguinea"),
                "item": "http://www.wikidata.org/entity/Q165008",
                "id": "Q165008",
                "von":"1884",
                "bis":"1919",
                "type": "kolonie"
            },
            {
                "name": __("Deutsch-Ostafrika"),
                "item": "http://www.wikidata.org/entity/Q153963",
                "id": "Q153963",
                "type": "kolonie",
                "von":"1884",
                "bis":"1919"
            },
            {
                "name": __("Deutsch-Südwestafrika"),
                "item": "http://www.wikidata.org/entity/Q153665",
                "id": "Q153665",
                "type": "kolonie",
                "von":"1884",
                "bis":"1919"
            },
            {
                "name": __("Kapitaï und Koba"),
                "item": "http://www.wikidata.org/entity/Q1721466",
                "id": "Q1721466",
                "type": "kolonie",
                "von":"1884",
                "bis":"1985"
            },
            {
                "name": __("Kamerun"),
                "item": "http://www.wikidata.org/entity/Q668294",
                "id": "Q668294",
                "type": "kolonie",
                "von":"1884",
                "bis":"1919"
            },
            {
                "name": __("Kiautschou"),
                "item": "http://www.wikidata.org/entity/Q675321",
                "id": "Q675321",
                "type": "kolonie",
                "von":"1898",
                "bis":"1919"
            },
            {
                "name": __("Mahinland"),
                "item": "http://www.wikidata.org/entity/Q15057620",
                "id": "Q15057620",
                "type": "kolonie",
                "von":"1885",
                "bis":"1885"
            },           
            {
                "name": __("Samoa"),
                "item": "http://www.wikidata.org/entity/Q701025",
                "id": "Q701025",
                "type": "kolonie",
                "von":"1900",
                "bis":"1919"
            },
            {
                "name": __("Togo"),
                "item": "http://www.wikidata.org/entity/Q161062",
                "id": "Q161062",
                "type": "kolonie",
                "von":"1884",
                "bis":"1919"
            },
            {
                "name": __("Wituland"),
                "item": "http://www.wikidata.org/entity/Q30607493",
                "id": "Q30607493",
                "type": "kolonie",
                "von":"1885",
                "bis":"1890"
            },
            {
                "name": __("Deutsches Reich"),
                "item": "http://www.wikidata.org/entity/Q1206012",
                "id": "Q1206012",
                "type": "deutschland",
                "von":"1871",
                "bis":"1945"
            },
            {
                "name": __("Allgemein"),
                "item": "https://www.wikidata.org/entity/Q329618",
                "id": "Q329618",
                "type": "general",
                "von":"",
                "bis":""
            }
        ]

        var data = addSubData(data);
		var query_url='https://query.wikidata.org/#' //SELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3FitemDescription%0A%09%09%09%09where%20%0A%09%09%09%09%7B%0A%09%09%09%09%7Boptional%7B%3Fitem%20wdt%3AP17%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7Boptional%7B%3Fitem%20wdt%3AP2541%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP131%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%20%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP17%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP361%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP2650%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%09%09%09%09%20union%0A%09%09%09%09%7B%20optional%7B%3Fitem%20wdt%3AP937%2Fwdt%3AP279%2a%20wd%3AQ329618%20.%7D%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22'+culture+'%2Cde%2Cen%22.%20%7D%0A%09%09%09%09%20%7D%20%0A%09%09%09%09order%20by%20%3Fitem'
		var sparql='SELECT DISTINCT ?item ?itemLabel ?itemDescription where \n\
		{ ?item (wdt:P17|wdt:P19|wdt:P20|wdt:P27|wdt:P36|wdt:P119|wdt:P131|wdt:P159|wdt:P180|wdt:P189|wdt:P276|wdt:P279|wdt:P291|wdt:P361|\n\
		wdt:P551|wdt:P740|wdt:P915|wdt:P840|wdt:P921|wdt:P937|\n\
		wdt:P1001|wdt:P1071|wdt:P1269|wdt:P1376|wdt:P1416|\n\
		wdt:P2341|wdt:P2541|wdt:P2647|wdt:P2650)/(wdt:P31*|wdt:P361*|wdt:P131*|wdt:P279*) wd:Q329618 . \n\
		SERVICE wikibase:label { bd:serviceParam wikibase:language "'+culture+',de,en". } } order by ?item'
		query_url=query_url+encodeURI(sparql)
       
        jQuery('#sparql-link').html('<a href="'+query_url+'" target="_blank">'+__("Link zur Wikidata-Abfrage")+' (Corpus)</a>')

        
        
        showWdResults(data);
    }

    /* Handling the breadcrumb */
    function showBreadcrumb() {

        var bc = "<ul>";
        for (var i = 0; i < BREADCRUMB.length; i++) {
            bc += '<li style="margin-left:'+i*20+'px"><a id="' + BREADCRUMB[i][0] + '#' + BREADCRUMB[i][1] + '#' + BREADCRUMB[i][2] + '">' + decodeURI(BREADCRUMB[i][0]) + '</a></li>'
        }
        bc += "</ul>";
        jQuery('.breadcrumb').html(bc).css("cursor", "pointer");
        jQuery('.breadcrumb').on("click", "a", function() {
			history.pushState(BREADCRUMB, 'Archivführer deutsche Kolonialgeschichte', document.location.origin + "/index.php/thesaurus?id=" +jQuery(this).attr('id').replace(/#/g,"+") );
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

		if (!letter) letter = "A";
		jQuery('#pag').remove();
 		jQuery('.title').off("click","a");
 		jQuery('.pagination').off('click','a');
		jQuery('#content').off;
		jQuery('.result-details').off;
		jQuery('#content h2').off("click","a");		


		showBreadcrumb();
		jQuery('#content').html("");
		if (jQuery.isArray(data)){
			
			jQuery('.title').off("click","a");
			jQuery('.atom-search').off('click');
			jQuery('#wrapper').off("click","button");
			jQuery('.result-details').off("click","li");
			jQuery('.result_details').off("mousedown",".to-top");

			jQuery('.wd-result-count').html('   <span>' + data.length + " " + __('Resultate')+'</span>');
			var lastLetterArray=[];
			var lastLetter="";
			var anchor="";
			var quelle="";
			var archives="";
			data=addSubData(data);
			console.log(data);
			for (var i=0;i<data.length;i++){
				if(lastLetter != data[i]['name'].slice(0,1).toUpperCase()){
					lastLetterArray.push(data[i]['name'].slice(0,1).toUpperCase());
					lastLetter=data[i]['name'].slice(0,1);
					if (data.length > 20){
						anchor='<a href="#top" name="'+data[i]['name'].slice(0,1)+'"  class="to-top" title="'+__("nach oben")+'">    </a>';
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

				'von' in data[i]?von=data[i]['von']:von="";
				'bis' in data[i]?bis=data[i]['bis']:bis="";
				'ort' in data[i]?ort=data[i]['ort']: ort="";			
				
				von+bis!=""?zeitraum='('+von + "-" + bis + ')':zeitraum="";
				'itemDescription' in data[i]?itemDescription='<li>' + data[i]['itemDescription']+ '</li>': itemDescription="";
				'itemDescription' in data[i]?iDescription='<span style="color:#666">' + data[i]['itemDescription']+ ' ·  </span>': iDescription="";
				if (zeitraum+ort !=""){
					var zeitraum= '<li><span style="color:#999"> '+iDescription + ' '+ort +" "+ zeitraum + "</span></li> ";
				}
				else{
					var zeitraum="";
				}
				if (zeitraum+ort=="" && iDescription!=""){
					var zeitraum= '<span style="color:#999"> '+iDescription +"</span>";
				}
				
				archives=get_archives(data[i]['archiv']);
				
				if('PresseMappe20Link' in data[i]){
					pre='<small style="color:#666">'+__(68)+' </small>';
					
					var a_title='<p class="title">'+pre+'<a href="'+data[i]['PresseMappe20Link']+'" id="' + data[i]['name'] + '#' + data[i]['id'] + '#' + data[i]['type'] + '" title="' + data[i]['name'] + '" target="_blank">' + data[i]['name'] + '</a></p>';	

				}
				else {
					var a_title='<p class="title"><a href="#" id="' + data[i]['name'] + '#' + data[i]['id'] + '#' + data[i]['type'] + '" title="' + data[i]['name'] + '">' + data[i]['name'] + '</a>'+archives+'</p>';	
				}
				/*var search_btn_free='<button class="search wd-search" id="' + data[i]['id'] + '">&nbsp;</button>';*/
				var ref_code='<li class="reference-code" id="' + data[i]['item'] + '">' + data[i]['id'] + '</li>';
				
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
					for (var j=0;j<data[i]['sub'].length;j++){
						subDataStr+='<li class="sub-link" id="'+data[i]['sub'][j]['name']+"#"+data[i]['sub'][j]['id']+"#"+data[i]['sub'][j]['type']+"#"+data[i]['name']+'">'+data[i]['sub'][j]['name']+'</li>';
					}
					subDataStr+='<li class="sub-link atom" id="'+data[i]['id'] +'">'+__('Relevante Dokumente')+'</li>'
				}
				var qcode=data[i]['item'].slice(31);
				if (subDataStr.length>0){
					jQuery("#content").append('<article class="search-result"><div class="search-result-description" > '+anchor+a_title+zeitraum  +  h3  +'<ul class="result-details thesaurus">'+ref_code + subDataStr + quelle + '</ul></div></article>');
				}
				else {
					jQuery("#content").append('<article class="search-result"><div class="search-result-description" > '+anchor+a_title +  h3  +'<ul class="result-details">'+ref_code+itemDescription+zeitraum + quelle +  '</ul></div></article>');
				}
			}
			jQuery('.title').on("click","a",function(){
				history.pushState('', 'QueKo', document.location.origin + "/index.php/thesaurus?id=" +jQuery(this).attr('id').replace(/#/g,"+") );
				changeWd(jQuery(this).attr('id'));
				});
			
			jQuery('#wrapper').on("click","button",function(){
				history.pushState('', 'QueKo', document.location.origin + "/index.php/thesaurus?id=" +jQuery(this).attr('id').replace(/#/g,"+") );
				changeWd(jQuery(this).attr('id'))
				});
			
			jQuery('.result-details').on("click","li",function(){
					call_wd_search(this);
				});

			
			jQuery('.result-details li').css("cursor","pointer");
			jQuery('.result_details').on("mousedown",".to-top",function(){jQuery('html, body').animate({ scrollTop: 0 }, 'fast');});
			
			if('PresseMappe20Link' in data[0]){
				jQuery('#content').prepend('<div id="pm20intro" class="pm20intro">'+__(69)+'</div><br /><h4>'+__(70)+'</h4>');
			}
				
			jQuery('#content').prepend('<div id="pag" class="pagination pagination-centered"></div>');
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
				search_field='<article class="search-result"><input id="search-in-results" name="search-wd-corpus" type="text"  title="'+__(19)+'"></article>';
				jQuery('#pag').html('<ul>' +pagination +'</ul>');
				jQuery(search_field).insertAfter('#pag');
				fill_eac(data);
				//jQuery('#search-in-results').focus();
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
				history.pushState('', 'QueKo', document.location.origin + "/index.php/thesaurus?id=" +jQuery(this).attr('id').replace(/#/g,"+") );
				changeWd(jQuery(this).attr('id'))
				});
		}
		
		jQuery('.atom-search').on('click',function(){
			call_wd_search(this);
		});
		jQuery("img").off("error");
		jQuery("img").on("error", function() {
		  jQuery(this).hide();
		});
		
	}
	
	
	function get_archives(s){
		
		var ret="";
		if (s===undefined || s==""){
			return "";
		}
		
		var entries=s.split("|");
		var e_splitted=[]
		var r=[]
		var tmp=""
		for (var i=0; i<entries.length;i++){
			line=entries[i].split("~");
			e_splitted.push(line);
			if (tmp.indexOf(line[0]) <0) {
				r.push(line);
				tmp+=line[0];
			}
		}
		//console.log(tmp);
		//console.log( r);

		for (var i=0;i<r.length;i++){
			if (r[i][3]!=culture){
				for (var j=0; j<e_splitted.length;j++){
					if (e_splitted[j][0]==r[i][0] && e_splitted[j][3]==culture){
						r[i][1]=e_splitted[j][1];
						break;
					}
				}
			}
			if (r[i][2]==""){
				for (var j=0; j<e_splitted.length;j++){
					if (e_splitted[j][0]==r[i][0] && e_splitted[j][2]!=""){
						r[i][2]=e_splitted[j][2];
						//break;
					}
				}
			}
			else{
				for (var j=0; j<e_splitted.length;j++){
					console.log(e_splitted[j][0], r[i][0], e_splitted[j][2],r[i][2]);
					if (e_splitted[j][0]==r[i][0] && e_splitted[j][2]!=r[i][2]){
						console.log("found more", e_splitted[j][2]);
						if (e_splitted[j][2]!=""){
							if (r[i].length==4){
								r[i].push([e_splitted[j][2]]);
							}
							else{
								if (r[i][4].indexOf(e_splitted[j][2])<0){
									r[i][4].push(e_splitted[j][2])
								}
							}
						}
					}			
				}
			}
		}
		
		//console.log("r",r, e_splitted);
		var q0="";
		for (var i=0;i<r.length;i++){
			q0=encodeURI(r[i][1].replace("–"," "));
			ret+='<a class="fonds-link-top" href="/index.php/informationobject/browse?sort=reference&topLod=1&query='+q0+'&sq0='+q0+'" target="_blank" title="'+r[i][1]+'">'+ r[i][1].slice(0,15)+'...</a>  '
			if (r[i].length==5){
				for (var j=0; j<r[i][4].length;j++){
				q0=encodeURI(r[i][1].replace("–"," ")+' "'+ r[i][4][j]+'"');
				ret+='<a class="fonds-link-sig-mid" href="/index.php/informationobject/browse?sort=reference&topLod=0&query='+q0+'&sq0='+q0+'" target="_blank" title="'+r[i][1]+' '+ r[i][2]+'">'+ r[i][4][j].slice(0,30)+'</a>  '
				}
				
			}
			if (r[i][2]!=""){
				q0=encodeURI(r[i][1].replace("–"," ")+' "'+ r[i][2]+'"');
				ret+='<a class="fonds-link-sig" href="/index.php/informationobject/browse?sort=reference&topLod=0&query='+q0+'&sq0='+q0+'" target="_blank" title="'+r[i][1]+' '+ r[i][2]+'">'+ r[i][2].slice(0,30)+'</a>  '
			}
		}
		//console.log(ret)
		return ret
		
	}
	
	
	function fill_eac(data){
		
		var options = {
			data: data,
			placeholder: __("Suche in der Ergebnisliste"),
			getValue: "name",
			list: {
				
				match: {
					enabled: true
				},
				onChooseEvent: function() {
					var value = jQuery("#search-in-results").getSelectedItemData().name;
					value += "#"+jQuery("#search-in-results").getSelectedItemData().id;
					value += "#"+jQuery("#search-in-results").getSelectedItemData().type;
					history.pushState('', 'QueKo', document.location.origin + "/index.php/thesaurus?id=" +value.replace(/#/g,"+") );
					changeWd(value);
					
					
				}
			},

			template: {
				type: "description",
				fields: {
						description: "itemDescription"
					}
			}
			
		};
		jQuery('#search-in-results').easyAutocomplete(options);
	}
	
	
	function call_wd_search(object){
			history.pushState('', 'Archivführer Kolonialgeschichte', document.location.origin + "/index.php/thesaurus?id=" +jQuery(object).attr('id').replace(/#/g,"+") );
			changeWd(jQuery(object).attr('id'))
		}

    /*Starts preparation for a new query*/
    function changeWd(newItem) {
		console.log(newItem);
		if (newItem == ""){
			return;
		}

        var newItemArray = newItem.replace(/\+/g,"#").split('#');
        if (newItemArray.length > 1) {
            console.log(newItem,newItemArray);
            var wdId = newItemArray[1];
            var name = newItemArray[0];
            var type = newItemArray[2];
            console.log(wdId,name,type);
        } else {
			console.log(newItem);
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

            if (type == "kolonie" ) {
          
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
                        },
                        {
                            name: __("Gesetze/Verordnungen"),
                            type: 'gesetze',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Veröffentlichungen"),
                            type: 'veroeffentlichungen',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Kunstwerke"),
                            type: 'kunstwerke',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Dokumente in Archiven"),
                            type: 'bestaende',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __(70),
                            type: 'articles',
                            id: wdId,
                            item: ""
                        }
                        
                    ]
                

                
            }
            if (["verwaltung", "mission", "missionsstationen", "militaer", "firma", "missionsstation"].indexOf(type) != -1) {
               
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
			
			if (type=="deutschland"){
                    sub = [
                        {
                            name: __("Personen"),
                            type: 'personen_de',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Unternehmen"),
                            type: 'firmen_de',
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
			

			if (type=="general"){
                    sub = [
                        {
                            name: __("Personen"),
                            type: 'personen_all',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Unternehmen"),
                            type: 'firmen_all',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Bildungs- und Forschungseinrichtungen"),
                            type: 'bildungen',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Vereine"),
                            type: 'vereine_all',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Ereignisse"),
                            type: 'ereignisse_all',
                            id: wdId,
                            item: ""
                        },

                        {
                            name: __("Gesetze/Verordnungen"),
                            type: 'gesetze',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Veröffentlichungen"),
                            type: 'veroeffentlichungen',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Kunstwerke"),
                            type: 'kunstwerke',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __("Dokumente in Archiven"),
                            type: 'bestaende',
                            id: wdId,
                            item: ""
                        },
                        {
                            name: __(70),
                            type: 'articles',
                            id: wdId,
                            item: ""
                        }
                        
                    ]
				
			}
			
            data[i]['sub'] = sub;
        }

        return (data);
    }

    /*preparing the new query*/
    function buildWdQuery(type, subj, prop, lang) {
		console.log("-------------------\n",type,subj,prop);
		var query;
		var kolonie='Q329618'
		if (jQuery('.breadcrumb li:last-child a').length>0){
			kolonie=jQuery('.breadcrumb li:last-child a').attr('id').split('#')[1]
		}

		
		if (!lang) lang = 'de';
        if (type == "kolonien") {
            query = 'select  ?item ?itemLabel \
            Where { bind(wd:' + subj + ' as ?concept).\
            ?item wdt:P361  ?concept .  \
            SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en" }} \
            Order BY ?itemLabel';
            type = 'kolonie';
        }

        if (["person","firma","ereignis","mission","verwaltung", "ethnie", "verein","militaer", "kunstwerk", "gesetz", "veroeffentlichung","bestand"].indexOf(type)>-1) {
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


            type = 'detailed_data';
        }

        if (type == "zugehoerig") {
                    
            query='SELECT DISTINCT ?item ?itemLabel  ?von ?bis ?position  ?bemerkung  ?itemDescription (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 	\
            		(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
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
					  optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle ;?p1 ?body ].}					  \
					  optional {?item ?p  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle  ].}	\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
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
					
			query='PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
					select *\
					where {\
					bind(if(bound(?wdLabel),?wdLabel,?propLabel) as ?prop) {\
					SELECT ?year ?wd1Label ?pqvalLabel ?wdLabel ?propLabel WHERE {\
					  BIND(wd:' + subj + ' AS ?item)\
					  ?item ?propUrl ?valUrl.\
					  ?property ?ref ?propUrl.\
					  ?property rdf:type wikibase:Property.\
					  ?property rdfs:label ?propLabel.\
					  OPTIONAL {\
						?valUrl (pq:P569|pq:P570|pq:P571|pq:P574|pq:P575|pq:P576|pq:P577|pq:P580|pq:P582|pq:P585|pq:P606|pq:P619|pq:P620|pq:P621|pq:P622|pq:P729|pq:P730|pq:P746|pq:P813|pq:P1191|pq:P1249|pq:P1317|pq:P1619|pq:P1734|pq:P2031|pq:P2032|pq:P2285|pq:P2669|pq:P2913|pq:P3893|pq:P3999|pq:P4602) ?date.\
						?valUrl ?pq1 ?date.\
						BIND(SUBSTR(STR(?pq1), 40, 250) AS ?pq1Number)\
						BIND(IRI(CONCAT("http://www.wikidata.org/entity/", ?pq1Number, "")) AS ?wd1)\
						?valUrl ?pq ?pqval.\
						?pqval rdfs:label ?pqvalL.\
						BIND(SUBSTR(STR(?pq), 40, 250) AS ?pqNumber)\
						BIND(IRI(CONCAT("http://www.wikidata.org/entity/", ?pqNumber, "")) AS ?wd)\
						FILTER((LANG(?pqvalL)) = "de")\
					  }\
					  BIND(?valUrl AS ?val)\
					  BIND(YEAR(?val) AS ?year)\
					  BIND(YEAR(?date) AS ?year)\
					  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',en". }\
					  FILTER((LANG(?propLabel)) = "' + lang + '")\
					  FILTER(?year > 0)\
					}}}\
					 ORDER BY ?year ?wd1Label ?propLabel'
			
			
			



        }




        /*Reihenfolge beachten Personen -> Person*/
        if (type == 'personen') {
			query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis \
			(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort)\
			(GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
			(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
			where {  \
			?item wdt:P31 wd:Q5 .  \
			?item wdt:P937 wd:' + subj + ' . \
			optional {?item ?p  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
			optional {?item wdt:P569 ?v. bind(YEAR(?v) as ?von).}\
			optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).}\
			optional {?item wdt:P937 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). }\
			  optional{\
				?item wdt:P485 ?arc.\
				?arc rdfs:label ?arcL.\
				FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
				?item p:P485 ?statement.\
				optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
				BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
				bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
			SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}\
			group by ?item ?itemLabel ?itemDescription ?von ?bis\
			order by ?itemLabel';
            type = 'person';
        }

        if (type == 'verwaltungen') {

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
					  union\
					  {?item wdt:P31/wdt:P279* wd:Q41487}\
					  ?item (wdt:P17|wdt:P131|wdt:P2541|wdt:P361) wd:' + subj + ' . 						\
					  ?item wdt:P31 ?p31.\
					  optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
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
					bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}		\
					group by ?item ?itemLabel ?itemDescription	?von ?bis				\
					order by ?itemLabel'; 

 
 
            type = 'verwaltung';
        }

        if (type == "missionen") {
            query = 'SELECT DISTINCT  ?item ?itemLabel ?itemDescription ?von ?bis \
					(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort)\
					(GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
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
					  optional {?item wdt:P17|wdt:P131|wdt:P159|wdt:P2541 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). }\
					  optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
					  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 ?kolonie ].}\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". } \
					 }  \
					Group By ?item ?itemLabel ?itemDescription ?von ?bis ?prop\
					Order BY ?itemLabel';

            type = "mission";
        }
        
        if(type=='missionare' || type=='angestellte'){
			//kolonie=jQuery('.breadcrumb li:last-child a').attr('id').split('#')[1]
			query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 			\
					(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
					where {  			\
					  ?item wdt:P108 wd:' + subj + ' .\
					  ?item wdt:P937 wd:' + kolonie + ' . 					\
					  optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
					  optional {?item wdt:P569 ?v. bind(YEAR(?v) as ?von).}			\
					  optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).}			\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}			\
					group by ?item ?itemLabel ?itemDescription ?von ?bis			\
					order by ?itemLabel';
			type="person";
			
		}

			
		

		if(type=='missionsstationen'){
			//kolonie=jQuery('.breadcrumb li:last-child a').attr('id').split('#')[1]
			query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis \
			(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort)\
			(GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 			\
			(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
			where {  			\
			  ?item wdt:P127 wd:' + subj + '  .\
			  ?item wdt:P2541/(wdt:P131*|wdt:P361*) wd:' + kolonie + ' . 				\
			  optional {?item wdt:P131|wdt:P159|wdt:P2541 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). }\
			  optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
			  optional {?item wdt:P580 ?v. bind(YEAR(?v) as ?von).}			\
			  optional {?item wdt:P582 ?b. bind(YEAR(?b) as ?bis).}			\
			  optional{\
				?item wdt:P485 ?arc.\
				?arc rdfs:label ?arcL.\
				FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
				?item p:P485 ?statement.\
				optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
				BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
				bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
			  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}			\
			group by ?item ?itemLabel ?itemDescription ?von ?bis		\
			order by ?itemLabel';
			type="missionsstation";
		}

        if (type == "firmen") {
            query = 'SELECT DISTINCT  ?item ?itemLabel ?itemDescription ?von ?bis \
					(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort)\
					(GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
					(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
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
					  optional {?item wdt:P17|wdt:P159|wdt:P2541 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). }\
					  optional {?item p:P2541 [ pq:P580 ?v; ps:P2541 ?kolonie]. }\
					  optional {?item p:P2541 [pq:P582 ?b; ps:P2541 ?kolonie].}\
					  optional {?item wdt:P571 ?g .}\
					  optional {?item wdt:P576 ?a. }\
					  BIND(IF(BOUND(?v),CONCAT(STR(YEAR(?v))," (p)"),YEAR(?g)) AS ?von).\
					  BIND(IF(BOUND(?b),CONCAT(STR(YEAR(?b))," (p)"),YEAR(?a)) AS ?bis).\
					  optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
					  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 ?kolonie ].}\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". } \
					 }  \
					Group By ?item ?itemLabel ?itemDescription ?von ?bis ?prop\
					Order BY ?itemLabel';
            type = "firma";
        }
        
        
        if (type == "militaers") {
            query = 'SELECT DISTINCT  ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
					(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
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
					  optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
					  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 ?kolonie ].}\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
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
					?item wdt:P31/wdt:P279* wd:Q13418847.\
					?item  (wdt:P131|wdt:P361|wdt:P17)/(wdt:P279*|wdt:P1365*) wd:' + subj + '.\
					optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
					optional {?item p:P131  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P131 wd:' + subj + ' ].}\
					optional {?item (wdt:P571|wdt:P580) ?v .}\
					optional {?item (wdt:P576|wdt:P582) ?b. }\
					BIND(YEAR(?v) AS ?von).\
					BIND(YEAR(?b) AS ?bis).\
					SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }\
					} \
					Group By ?item ?itemLabel ?itemDescription ?von ?bis \
					Order BY ?von';


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

        }
        
		if (type=="vereine"){
			query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis \
			(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort)\
			(GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle)			\
			(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
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
				  optional {?item wdt:P17|wdt:P159|wdt:P2541 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). }\
				  optional {?item ?p21  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
				  optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 wd:' + subj + ' ].}			\
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
					bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}					\
				group by ?item ?itemLabel ?itemDescription	?von ?bis				\
				order by ?itemLabel';
			type="verein";
		}
		
		if (type=="bestaende"){
			type="bestand";
			query='SELECT DISTINCT ?item ?itemLabel ?itemDescription  (GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
				WHERE { ?item (wdt:P189|wdt:P291|wdt:P483|wdt:P840|wdt:P921|wdt:P915|wdt:P937|wdt:P1071|wdt:P2650|wdt:P4647)/(wdt:P279*|wdt:P361*|wdt:P131*) wd:' + subj + '.     \
				?item wdt:P485 ?arc.\
				?arc rdfs:label ?arcL.\
				FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
				?item p:P485 ?statement.\
				optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
				BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
				bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL) \
				SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}\
				GROUP BY ?item ?itemLabel ?itemDescription ?von ?bis  ORDER BY ?itemLabel'
		}
		
		if (type=="militaers"){
			type="militaer";
			query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle)							\
					(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
					where {  						  \
					?item wdt:P31/wdt:P279* wd:Q45295908 .  					 				  \
					?item (wdt:P17|wdt:P2541) wd:' + subj + ' . 										  \
					optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}				  \
					optional {?item p:P2541  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P2541 wd:' + subj + ' ].}	\
					optional {?item wdt:P569 ?v. bind(YEAR(?v) as ?von).}	\
					optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).}	\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}									\
					group by ?item ?itemLabel ?itemDescription	?von ?bis								\
					order by ?itemLabel';
			
		}
		
		if (type=="bildungen"){
			type="bildung";
			query='SELECT DISTINCT ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?oLabel; SEPARATOR = ", ") AS ?ort) \
			(GROUP_CONCAT(DISTINCT ?quelle; SEPARATOR = "|") AS ?itemQuelle) (GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
			WHERE {\
			  { ?item (wdt:P31/(wdt:P279*)) wd:Q2385804. }\
			  UNION\
			  { ?item (wdt:P31/(wdt:P279*)) wd:Q31855. }\
			  UNION\
			  { ?item (wdt:P31/(wdt:P279*)) wd:Q3914. }\
			  OPTIONAL {\
				?item (wdt:P17|wdt:P159|wdt:P2541|wdt:P131) _:b46.\
				_:b46 rdfs:label ?oLabel.\
				FILTER((LANG(?oLabel)) = "de")\
			  }\
			  ?item (wdt:P2650|wdt:P361)/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q329618.\
			  OPTIONAL {\
				?item ?p _:b47.\
				_:b47 ((prov:wasDerivedFrom/pr:P248)|(prov:wasDerivedFrom/pr:P854)) ?quelle.\
			  }\
			  OPTIONAL { ?item (wdt:P571|wdt:P580) ?v. }\
			  OPTIONAL { ?item (wdt:P576|wdt:P582) ?b. }\
			  BIND(YEAR(?v) AS ?von)\
			  BIND(YEAR(?b) AS ?bis)\
			  OPTIONAL {\
				?item wdt:P485 ?arc.\
				?arc rdfs:label ?arcL.\
				FILTER((((LANG(?arcL)) = "de") || ((LANG(?arcL)) = "en")) || ((LANG(?arcL)) = "fr"))\
				?item p:P485 ?statement.\
				OPTIONAL {\
				  ?statement ps:P485 ?arc;\
					pq:P217 ?signatur.\
				}\
				BIND(IF(BOUND(?signatur), ?signatur, "") AS ?sig)\
				BIND(CONCAT(STR(?arc), "~", ?arcL, "~", ?sig, "~", LANG(?arcL)) AS ?aL)\
			  }\
			  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }\
			}\
			GROUP BY ?item ?itemLabel ?itemDescription ?von ?bis\
			ORDER BY (?itemLabel)'
			
		}
		
        if (type == 'personen_de') {
			query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis \
					(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort) \
					(GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
					(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
					where {  \
					  ?item wdt:P31 wd:Q5 .  \
					  {?item wdt:P2650/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q329618 . } \
					  union \
					  {?item (wdt:P108|wdt:P169|wdt:P463|wdt:P3320) [wdt:P2650/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q329618 ].}  \
					  minus{?item wdt:P937/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q329618 .} \
					  optional {?item ?p  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].} \
					  ?item wdt:P569 ?v. bind(YEAR(?v) as ?von). \
					  filter (?von < 1901) \
					  optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).} \
					  optional {?item wdt:P937 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). } \
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }} \
					group by ?item ?itemLabel ?itemDescription ?von ?bis \
					order by ?itemLabel';
            type = 'person';
        }
        
        if (type == 'firmen_de') {
			query='PREFIX pr: <http://www.wikidata.org/prop/reference/> \
					PREFIX prov: <http://www.w3.org/ns/prov#> \
					SELECT DISTINCT ?item ?itemLabel ?itemDescription ?von ?bis \
					(GROUP_CONCAT(DISTINCT ?oLabel; SEPARATOR = ", ") AS ?ort) \
					(GROUP_CONCAT(DISTINCT ?quelle; SEPARATOR = "|") AS ?itemQuelle) \
					(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
					WHERE {\
					  ?item (wdt:P31/wdt:P279*) wd:Q4830453.\
					  { ?item (wdt:P2650|(wdt:P123/(wdt:P279*|wdt:P361*|wdt:P131*))) wd:Q329618. }\
					  UNION\
					  {\
						?item (wdt:P169|wdt:P3320) _:b120.\
						_:b120 (wdt:P937/(wdt:P279*|wdt:P361*|wdt:P131*)) wd:Q329618.\
					  }\
					  MINUS { ?item (wdt:P159/(wdt:P279*|wdt:P361*|wdt:P131*)) wd:Q329618. }\
					  OPTIONAL {\
						?item ?p [((prov:wasDerivedFrom/pr:P248)|(prov:wasDerivedFrom/pr:P854)) ?quelle].\
					  }\
					  OPTIONAL {\
						?item (wdt:P580|wdt:P571) ?v.\
						BIND(YEAR(?v) AS ?von)\
					  }\
					  OPTIONAL {\
						?item (wdt:P582|wdt:P576) ?b.\
						BIND(YEAR(?b) AS ?bis)\
					  } \
					  OPTIONAL {\
						?item wdt:P159 [ rdfs:label ?oLabel].\
						FILTER((LANG(?oLabel)) = "' + lang + '")\
					  }\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }\
					}\
					GROUP BY ?item ?itemLabel ?itemDescription ?von ?bis\
					ORDER BY ?itemLabel';
            type = 'firma';
        }		
		
		if (type == 'ereignisse_de'){
			query='select  ?item ?itemLabel ?itemDescription ?von ?bis (GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) 			\
					where { 			\
					?item wdt:P31/wdt:P279* wd:Q13418847.\
					?item  (wdt:P131|wdt:P361|wdt:P17)/(wdt:P279*) wd:' + subj + '.\
					union {?item wdt:P131/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q7318.} \
					?item (wdt:P921|wdt:P2650)/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q329618. \
					optional {?item ?p1  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
					optional {?item p:P131  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle;ps:P131 wd:' + subj + ' ].}\
					optional {?item (wdt:P571|wdt:P580) ?v .}\
					optional {?item (wdt:P576|wdt:P582) ?b. }\
					BIND(YEAR(?v) AS ?von).\
					BIND(YEAR(?b) AS ?bis).\
					SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }\
					} \
					Group By ?item ?itemLabel ?itemDescription ?von ?bis \
					Order BY ?von';
			type = "ereignis";
		}
		
        if (type == 'personen_all') {
			query='select distinct ?item ?itemLabel ?itemDescription ?von ?bis \
			(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort)\
			(GROUP_CONCAT(DISTINCT ?quelle; separator="|") as ?itemQuelle) \
			(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
			where {  \
			?item wdt:P31 wd:Q5 .  \
			?item wdt:P937/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q329618 . \
			optional {?item ?p  [prov:wasDerivedFrom/pr:P248|prov:wasDerivedFrom/pr:P854 ?quelle].}\
			optional {?item wdt:P569 ?v. bind(YEAR(?v) as ?von).}\
			optional {?item wdt:P570 ?b. bind(YEAR(?b) as ?bis).}\
			optional {?item wdt:P937 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). }\
			  optional{\
				?item wdt:P485 ?arc.\
				?arc rdfs:label ?arcL.\
				FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
				?item p:P485 ?statement.\
				optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
				BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
				bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
			SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}\
			group by ?item ?itemLabel ?itemDescription ?von ?bis\
			order by ?itemLabel';
            type = 'person';
        }		
		
		if (type=="vereine_all"){
			type="verein";
			query='	PREFIX pr: <http://www.wikidata.org/prop/reference/> \
					PREFIX prov: <http://www.w3.org/ns/prov#>\
					SELECT DISTINCT ?item ?itemLabel ?itemDescription ?von ?bis \
					(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort)\
					(GROUP_CONCAT(DISTINCT ?quelle; SEPARATOR = "|") AS ?itemQuelle) \
					(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
					WHERE {\
					{ ?item (wdt:P31/wdt:P279*) wd:Q48204. }\
					UNION\
					{ ?item (wdt:P31/wdt:P279*) wd:Q15911314. }\
					UNION\
					{ ?item (wdt:P31/wdt:P279*) wd:Q7278. }\
					UNION\
					{ ?item (wdt:P31/wdt:P279*) wd:Q847017. }\
					UNION\
					{ ?item (wdt:P31/wdt:P279*) wd:Q276548. }\
					optional {?item wdt:P17|wdt:P159|wdt:P2541 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). }\
					?item wdt:P2650/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q329618.\
					OPTIONAL {?item  ?p [((prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P248>)|(prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P854>)) ?quelle].}\
					OPTIONAL { ?item (wdt:P571|wdt:P580) ?v. }\
					OPTIONAL { ?item (wdt:P576|wdt:P582) ?b. }\
					BIND(YEAR(?v) AS ?von)\
					BIND(YEAR(?b) AS ?bis)\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}\
					GROUP BY ?item ?itemLabel ?itemDescription ?von ?bis\
					ORDER BY ?itemLabel'
		}


		if (type=="firmen_all"){
			type="firma";
			query='	PREFIX pr: <http://www.wikidata.org/prop/reference/> \
					PREFIX prov: <http://www.w3.org/ns/prov#>\
					SELECT DISTINCT ?item ?itemLabel ?itemDescription ?von ?bis \
					(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort)\
					(GROUP_CONCAT(DISTINCT ?quelle; SEPARATOR = "|") AS ?itemQuelle) \
					(GROUP_CONCAT(DISTINCT ?aL; SEPARATOR = "|") AS ?archiv) \
					WHERE {\
					?item (wdt:P31/wdt:P279*) wd:Q4830453.\
					optional {?item wdt:P17|wdt:P159|wdt:P2541 [rdfs:label ?oLabel] filter (lang(?oLabel)="' + lang + '"). }\
					?item wdt:P2650/(wdt:P279*|wdt:P361*|wdt:P131*) wd:Q329618.\
					OPTIONAL {?item  ?p [((prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P248>)|(prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P854>)) ?quelle].}\
					OPTIONAL { ?item (wdt:P571|wdt:P580) ?v. }\
					OPTIONAL { ?item (wdt:P576|wdt:P582) ?b. }\
					BIND(YEAR(?v) AS ?von)\
					BIND(YEAR(?b) AS ?bis)\
					  optional{\
						?item wdt:P485 ?arc.\
						?arc rdfs:label ?arcL.\
						FILTER(LANG(?arcL) = "de"|| LANG(?arcL) = "en" || LANG(?arcL) ="fr").\
						?item p:P485 ?statement.\
						optional{?statement ps:P485 ?arc . ?statement pq:P217 ?signatur. }\
						BIND(IF(BOUND(?signatur),?signatur,"") AS ?sig).\
						bind(concat(str(?arc),"~",?arcL,"~",?sig,"~",LANG(?arcL)) as ?aL)}\
					SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }}\
					GROUP BY ?item ?itemLabel ?itemDescription ?von ?bis\
					ORDER BY ?itemLabel'
		}
		
		if (type=="kunstwerke"){
			type="kunstwerk";

			query='PREFIX pr: <http://www.wikidata.org/prop/reference/> \
				PREFIX prov: <http://www.w3.org/ns/prov#> \
				SELECT DISTINCT ?item ?itemLabel ?itemDescription ?von ?bis \
				(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort) \
				(GROUP_CONCAT(DISTINCT ?quelle; SEPARATOR = "|") AS ?itemQuelle) WHERE { \
				 {?item wdt:P31/wdt:P279*  wd:Q838948.} \
				  union \
				  {?item wdt:P31/wdt:P279*   wd:Q7725634} \
				  union \
				  {?item wdt:P31/wdt:P279*   wd:Q838948} \
				optional {?item (wdt:P180|wdt:P189|wdt:P291|wdt:P840|wdt:P921|wdt:P915|wdt:P937|wdt:P1071|wdt:P2650|wdt:P4647) [rdfs:label ?oLabel] filter (lang(?oLabel)="de"). }\
				?item (wdt:P189|wdt:P291|wdt:P483|wdt:P840|wdt:P921|wdt:P915|wdt:P937|wdt:P1071|wdt:P2650|wdt:P4647)/ \
				(wdt:P279*|wdt:P361*|wdt:P131*) wd:' + subj + '. \
				OPTIONAL {?item  ?p [((prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P248>)|(prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P854>)) ?quelle].}\
				OPTIONAL { ?item (wdt:P569|wdt:P571|wdt:P574|wdt:P575|wdt:P576|wdt:P577|wdt:P580|wdt:P585|wdt:P729|wdt:P730|wdt:P746|wdt:P813|wdt:P921|wdt:P1191|wdt:P1249|wdt:P1317|wdt:P1619|wdt:P1734|wdt:P2031|wdt:P2032|wdt:P2285|wdt:P2669|wdt:P2913|wdt:P3893|wdt:P3999|wdt:P4602) ?v. }\
				OPTIONAL { ?item (wdt:P570|wdt:P576|wdt:P582) ?b. } \
				BIND(YEAR(?v) AS ?von) \
				BIND(YEAR(?b) AS ?bis) \
				SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de,en". }} \
				GROUP BY ?item ?itemLabel ?itemDescription ?von ?bis \
				ORDER BY ?itemLabel'
		}
		
		
		if (type=="veroeffentlichungen"){
			type="veroeffentlichung";

			query='PREFIX pr: <http://www.wikidata.org/prop/reference/> \
				PREFIX prov: <http://www.w3.org/ns/prov#> \
				SELECT DISTINCT ?item ?itemLabel ?itemDescription ?von ?bis \
				(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort) \
				(GROUP_CONCAT(DISTINCT ?quelle; SEPARATOR = "|") AS ?itemQuelle) WHERE { \
				{?item wdt:P31/wdt:P279*  wd:Q571. }\
				UNION {?item wdt:P31/wdt:P279*  wd:Q41298.} \
				optional {?item (wdt:P180|wdt:P189|wdt:P291|wdt:P840|wdt:P921|wdt:P915|wdt:P937|wdt:P1071|wdt:P2650|wdt:P4647) [rdfs:label ?oLabel] filter (lang(?oLabel)="de"). }\
				?item (wdt:P189|wdt:P291|wdt:P483|wdt:P840|wdt:P921|wdt:P915|wdt:P937|wdt:P1071|wdt:P2650|wdt:P4647)/ \
				(wdt:P279*|wdt:P361*|wdt:P131*) wd:' + subj + '. \
				OPTIONAL {?item  ?p [((prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P248>)|(prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P854>)) ?quelle].}\
				OPTIONAL { ?item (wdt:P571|wdt:P574|wdt:P577|wdt:P580|wdt:P585|wdt:P1249) ?v. } \
				OPTIONAL { ?item (wdt:P570|wdt:P576|wdt:P582|wdt:P2669|wdt:P3999) ?b. } \
				BIND(YEAR(?v) AS ?von) \
				BIND(YEAR(?b) AS ?bis) \
				filter(?von < 1946)\
				SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de,en". }} \
				GROUP BY ?item ?itemLabel ?itemDescription ?von ?bis \
				ORDER BY ?itemLabel'
		}

		
		if (type=="gesetze"){
			type="gesetz";

			query='PREFIX pr: <http://www.wikidata.org/prop/reference/> \
				PREFIX prov: <http://www.w3.org/ns/prov#> \
				SELECT DISTINCT ?item ?itemLabel ?itemDescription ?von \
				(GROUP_CONCAT(DISTINCT ?oLabel;Separator =", ") as ?ort) \
				(GROUP_CONCAT(DISTINCT ?quelle; SEPARATOR = "|") AS ?itemQuelle) WHERE { \
				{?item wdt:P31/wdt:P279*  wd:Q820655.} \
				UNION {?item wdt:P31/wdt:P279*  wd:Q321839.} \
				optional {?item (wdt:P180|wdt:P189|wdt:P291|wdt:P840|wdt:P921|wdt:P915|wdt:P937|wdt:P1071|wdt:P2650|wdt:P4647) [rdfs:label ?oLabel] filter (lang(?oLabel)="de"). }\
				?item wdt:P921/ (wdt:P279*|wdt:P361*|wdt:P131*) wd:' + subj + '. \
				OPTIONAL {?item  ?p [((prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P248>)|(prov:wasDerivedFrom/<http://www.wikidata.org/prop/reference/P854>)) ?quelle].} \
				OPTIONAL { ?item p:P1433 [pq:P577 ?v] } \
				BIND( YEAR(?v) AS ?von) \
				SERVICE wikibase:label { bd:serviceParam wikibase:language "de,de,en". }} \
				GROUP BY ?item ?itemLabel ?itemDescription ?von \
				ORDER BY ?v'
		}
		
		if (type=="articles"){
			type="article";
			query='SELECT DISTINCT ?item ?itemLabel ?itemDescription (GROUP_CONCAT(DISTINCT ?instanceL; SEPARATOR = "; ") AS ?p31) ?PresseMappe20Link  WHERE {\
			?item ((wdt:P17|wdt:P19|wdt:P20|wdt:P27|wdt:P36|wdt:P119|wdt:P131|wdt:P159|wdt:P180|wdt:P189|wdt:P276|wdt:P279|wdt:P291|wdt:P361|wdt:P551|wdt:P740|wdt:P915|\
			wdt:P840|wdt:P921|wdt:P937|wdt:P1001|wdt:P1071|wdt:P1269|wdt:P1376|wdt:P1416|wdt:P2341|wdt:P2541|wdt:P2647|wdt:P2650)/((wdt:P31*)|(wdt:P361*)|(wdt:P131*)|\
			(wdt:P279*))) wd:' + subj + ';\
			wdt:P4293 ?pm.\
			  OPTIONAL {\
				?item wdt:P31 ?instance.\
				?instance rdfs:label ?instanceL.\
				FILTER(LANG(?instanceL) = "' + lang + '") \
			  }\
			  BIND(IRI(CONCAT("http://purl.org/pressemappe20/folder/", ?pm)) AS ?PresseMappe20Link)\
			  SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en". }\
			}\
			GROUP BY ?PresseMappe20Link ?item ?itemLabel ?itemDescription\
			ORDER BY (?itemLabel)'
		}

        if (type == 'labels') {

            
            query='select ?item ?itemLabel ?itemAltLabel ?lang \
			Where { bind(wd:' + subj + ' as ?item). \
				   Optional{?item skos:altLabel ?itemAltLabel . filter(lang(?itemAltLabel)="de" ||  lang(?itemAltLabel)="en"  ||  lang(?itemAltLabel)="fr")} \
				   ?item rdfs:label ?itemLabel  . \
				   filter(lang(?itemLabel)="de" ||  lang(?itemLabel)="en"  ||  lang(?itemLabel)="fr") \
			}';
            
            
        }


        if (type == "OneProp") {
            query = 'select ?item ?itemLabel \
            Where { ?item wdt:' + prop + ' wd:' + subj + ' SERVICE wikibase:label { bd:serviceParam wikibase:language "' + lang + ',de,en" }  } \
            Order by ?itemLabel';
        }
		
		if (query !=undefined){
			query = query.replace(/\t/g, " ");
			query = query.replace(/\t/g, " ");
			query = query.replace(/\t/g, " ");
			query = encodeURI(query)
			query = query.replace("#", "%23");
		}
		else{
			query="";
		}
        return [query, type];


    }

    /*Sending the query*/
    function getFromWd(query, action, type) {

        var base_url = 'https://query.wikidata.org/sparql';
        var base_url = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql';
		var query_url='https://query.wikidata.org/#'
        var url = base_url + "?format=json&query=" + query;
        var url2="";

		var query2=query.replace(/%09%09/g,"%09");
		for (var i =1; i< 30; i++){
			var query2=query2.replace(/%09%09/g,"%09");
		}
        query2=query2.replace(/%09/g,"%0D");

        jQuery('#sparql-link').html('<a href="'+query_url+query2+'" target="_blank">'+__("Die aktuelle Ergebnisliste als Wikidata-Abfrage")+'</a>')
        showLoader();
        
        if(request && request.readyState != 4){
            request.abort();
        }
        //console.log(url)
        request = jQuery.get(url,
            function(data, status) {
                WdResponse(data, action, type);
                showLoader();
            }).fail(function() {
            showLoader()
        });
        console.log(request);
        return (query);
    }

    /*dealing with the query response*/
    function WdResponse(data, action, type) {
		console.log(data, action, type);
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
        
		console.log(nodeData);

        showWdResults(nodeData);
    }




    /* Preparing the results (general approach) */
    function prepareData(results, node, type) {
        console.log(type,node);
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


         if (type == 'zugehoerig') {
            console.log("zugehoerig");
            nodeData = prepareTable(nodeData, type, 'Name', ['bodyLabel', 'vonPrecision', 'bisPrecision', 'itemQuelle'], 1, 'person');

        }

        if (type == 'chronologie') {


			nodeData= prepareChronology(nodeData);
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
					//console.log(ar);
				}
				if (ar.indexOf('dem')>-1){
					index = ar.indexOf('dem') + 1;
					//console.log(ar);
				}

                if (index == 0) {
                    
                    index = ar.length - 1;
                }
                n = "";

                for (var j = 0; j < index; j++) {


                    ar.push(ar[0]);

                    ar.shift();

                }
                for (j = 0; j < ar.length; j++) {

                    if (j == ar.length - index) {
                        n += ", " + ar[j];
                    } else {
                        n += " " + ar[j];
                    }
                    nodeData[i]['name'] = n.trim();

                }

            }

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




        return (nodeData);
    }


	function prepareChronology(data){
		console.log(data);
		var uStr = '';
		var lastYear ="";
		for (var i = 0; i < data.length; i++) {
			'pqvalLabel' in data[i] ? pqvalLabel= data[i]['pqvalLabel'] : pqvalLabel ="";
			'wd1Label' in data[i] ? wd1Label= data[i]['wd1Label'] : wd1Label ="";
			wd1Label!="" ? wd1Label=' <span class="date-qualifier"> ('+wd1Label+')</span>' : wd1Label="";
			
			uStr+='<div class="field"><h3>'+data[i]['year']+'</h3><div>'+data[i]['prop']+pqvalLabel +wd1Label+'</div></div>'
		}
		return uStr;
	}


    function prepareTable(data, type, itemTitle, excludeList, linked, itemType) {
        console.log(data, itemType);


        var uStr = '';
        console.log(data);
        for (var i = 0; i < data.length; i++) {
			
            uStr += '<section><span anchor="" ><h2><a style="cursor:pointer" id="' + data[i]['name'] + '#' + data[i]['id'] + '#' + itemType + '" title="' + data[i]['name'] + '" class="wd-item">' + data[i]['name'] + "</a></h2></span>";
            for (var key in data[i]) {
                if (key == "name" || key=="archiv") {
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
        console.log(data);
        var label;
        var prop;
        var content;
        var link;
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
				var entity_link='<div class="field"><h3>'+__('Wikidata-Objekt')+'</h3><div><a href="' + data[i].val + '" target="_blank">' + data[i].val + '</a></div></div>';
				var button='<div class="field"><h3>'+__('Suche')+'</h3><div><li class="atom-search" id="' +  data[i].val.slice(data[i].val.search("Q"),100) + '">'+__("Relevante Dokumente")+'</li></div></div>';
               
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
       /* uStr += "" + logo;*/
        console.log(uStr);
        return entity_link+button+uStr;
    }

    /*Preparing the AtoM search, getting all labels and altLabels in de, en, fr from Wikidata */
    function searchFromWd(id) {
        var labels;
        labels = getLabels(id);
    }


    function getLabels(id) {

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


    function getAuthorityURI() {
        return [4389,
				 'https://collection.sciencemuseum.org.uk/people/$1',
				 4394,
				 'http://braininfo.rprc.washington.edu/centraldirectory.aspx?ID=$1',
				 4395,
				 'http://braininfo.rprc.washington.edu/centraldirectory.aspx?type=h&ID=$1',
				 4427,
				 'http://id.agrisemantics.org/gacs/C$1',
				 4440,
				 'http://catalogo.iib.unam.mx/F/-/?func=find-b&find_code=SYS&local_base=BNM10&format=999&request=$1',
				 4460,
				 'http://formats.kaitai.io/$1/',
				 4466,
				 'http://astrothesaurus.org/uat/$1',
				 4515,
				 'https://www.prisma.de/$1',
				 4520,
				 'https://suncat.ac.uk/serials/SCID$1',
				 4531,
				 'https://chineseposters.net/artists/$1.php',
				 4549,
				 'https://arlima.net/no/$1',
				 4553,
				 'http://www.racollection.org.uk/ixbin/indexplus?_IXACTION_=file&_IXFILE_=templates/full/person.html&_IXTRAIL_=Names%C2%A0A-Z&person=$1',
				 4558,
				 'http://sig.mapama.es/93/ClienteWS/snczi/default.aspx?nombre=PRESA&claves=DGAGUA.PRESAS.CODPRESA&valores=$1',
				 4574,
				 'http://histreg.no/index.php/person/$1',
				 4589,
				 'http://www.dreadnoughtproject.org/tfs/index.php/$1',
				 4591,
				 'http://www.veterans.gc.ca/eng/remembrance/memorials/national-inventory-canadian-memorials/details/$1',
				 4613,
				 'http://esu.com.ua/search_articles.php?id=$1',
				 4636,
				 'https://v2.sherpa.ac.uk/id/funder/$1',
				 4662,
				 'http://www.san.beniculturali.it/web/san/dettaglio-soggetto-conservatore?codiSan=san.cat.sogC.$1',
				 4694,
				 'http://www.arquivo.arq.br/$1',
				 4696,
				 'https://ciqual.anses.fr/#/aliments/$1',
				 4726,
				 'http://signal.sciencespo-lyon.fr/revue/$1',
				 4729,
				 'http://nut.entecra.it/646/tabelle_di_composizione_degli_alimenti.html?idalimento=$1&quant=100',
				 4750,
				 'http://www.nationalhistoricships.org.uk/register/$1/',
				 213,
				 'http://isni.org/isni/$1',
				 214,
				 'https://viaf.org/viaf/$1',
				 227,
				 'https://d-nb.info/gnd/$1',
				 244,
				 'https://id.loc.gov/authorities/$1',
				 268,
				 'http://catalogue.bnf.fr/ark:/12148/cb$1',
				 269,
				 'https://www.idref.fr/$1',
				 270,
				 'http://opac.calis.edu.cn/aopac/ajsp/detail.jsp?actionfrom=1&actl=CAL++$1',
				 349,
				 'https://id.ndl.go.jp/auth/ndlna/$1',
				 377,
				 'http://www.n2yo.com/satellite/?s=$1',
				 409,
				 'https://nla.gov.au/anbd.aut-an$1',
				 428,
				 'http://www.ipni.org/ipni/advAuthorSearch.do?find_abbreviation=$1',
				 458,
				 'https://www.marinetraffic.com/ais/details/ships/$1',
				 486,
				 'https://id.nlm.nih.gov/mesh/$1.html',
				 486,
				 'https://meshb.nlm.nih.gov/#/record/ui?ui=$1',
				 493,
				 'http://www.icd9data.com/getICD9Code.ashx?icd9=$1',
				 494,
				 'http://apps.who.int/classifications/icd10/browse/2016/en#/$1',
				 502,
				 'http://tools.wmflabs.org/wikidata-externalid-url/?p=502&url_prefix="http://www.nhc.noaa.gov/archive/&id=$1"',
				 508,
				 'http://thes.bncf.firenze.sbn.it/termine.php?id=$1',
				 563,
				 'http://codes.iarc.fr/search.php?cx=009987501641899931167%3A2_7lsevqpdm&cof=FORID%3A9&ie=UTF-8&ie=ISO-8859-1&oe=ISO-8859-1&sa=&q=$1',
				 586,
				 'http://www.ipni.org/ipni/idAuthorSearch.do?id=$1',
				 587,
				 'https://www.marinetraffic.com/ais/details/ships/$1',
				 646,
				 'https://g.co/kg$1',
				 648,
				 'https://openlibrary.org/works/$1',
				 650,
				 'https://rkd.nl/en/explore/artists/$1',
				 672,
				 'http://id.nlm.nih.gov/mesh/$1',
				 686,
				 'http://amigo.geneontology.org/amigo/term/$1',
				 691,
				 'http://aut.nkp.cz/$1',
				 691,
				 'https://aleph.nkp.cz/F/?func=find-c&local_base=aut&ccl_term=ica=$1&CON_LNG=ENG',
				 724,
				 'https://archive.org/details/$1',
				 731,
				 'https://litholex.bgr.de/gesamt_ausgabe_neu.php?id=$1',
				 863,
				 'https://inpho.cogs.indiana.edu/$1.html',
				 906,
				 'https://libris.kb.se/auth/$1',
				 918,
				 'http://www5.hrsdc.gc.ca/noc/english/noc/2011/Profile.aspx?val=7&val1=$1',
				 919,
				 'http://tools.wmflabs.org/wikidata-externalid-url/?p=919&url_prefix="http://www.bls.gov/soc/2010/soc&url_suffix=.htm&id=$1"',
				 920,
				 'http://id.sgcb.mcu.es/Autoridades/$1/concept.html',
				 949,
				 'http://aleph.nli.org.il/F/?func=find-b&local_base=NNL10&find_code=SYS&con_lng=eng&request=$1',
				 950,
				 'http://datos.bne.es/resource/$1',
				 951,
				 'http://viaf.org/processed/NSZL%7C$1',
				 1005,
				 'http://urn.bn.pt/nca/unimarc-authorities/txt?id=$1',
				 1006,
				 'http://opc4.kb.nl/PPN?PPN=$1',
				 1014,
				 'http://vocab.getty.edu/page/aat/$1',
				 1015,
				 'https://authority.bibsys.no/authority/rest/authorities/html/$1',
				 1017,
				 'https://viaf.org/viaf/sourceID/BAV|$1',
				 1036,
				 'http://dewey.info/class/$1/',
				 1047,
				 'http://www.catholic-hierarchy.org/bishop/b$1.html',
				 1051,
				 'http://psh.techlib.cz/skos/PSH$1',
				 1149,
				 'http://id.loc.gov/authorities/classification/$1.html',
				 1150,
				 'http://rvk.uni-regensburg.de/regensburger-verbundklassifikation-online#notation/$1',
				 1207,
				 'https://viaf.org/processed/NUKAT|$1',
				 1256,
				 'http://iconclass.org/$1',
				 1273,
				 'http://cantic.bnc.cat/registres/CUCId/$1',
				 1284,
				 'https://www.munzinger.de/search/go/document.jsp?id=$1',
				 1294,
				 'http://www.worldwildlife.org/ecoregions/$1',
				 1296,
				 'https://www.enciclopedia.cat/EC-GEC-$1.xml',
				 1315,
				 'http://trove.nla.gov.au/people/$1',
				 1362,
				 'http://tls.theaterwissenschaft.ch/wiki/$1',
				 1375,
				 'http://katalog.nsk.hr/F/?func=direct&doc_number=$1&local_base=nsk10',
				 1385,
				 'http://www.culturacores.azores.gov.pt/ea/pesquisa/Default.aspx?id=$1',
				 1394,
				 'http://glottolog.org/resource/languoid/id/$1',
				 1402,
				 'http://xiphoid.biostr.washington.edu/fma/fmabrowser-hierarchy.html?fmaid=$1',
				 1417,
				 'https://www.britannica.com/$1',
				 1453,
				 'http://www.catholic.ru/modules.php?name=Encyclopedia&op=content&tid=$1',
				 1550,
				 'http://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=EN&Expert=$1',
				 1645,
				 'http://physics.nist.gov/cgi-bin/cuu/Value?$1',
				 1670,
				 'https://www.collectionscanada.gc.ca/canadiana-authorities/index/view?index_name=cdnAutNbr&search_text=$1&page=1&cdnAutNbr=$1',
				 1695,
				 'http://mak.bn.org.pl/cgi-bin/KHW/makwww.exe?BM=01&IM=04&NU=01&WI=$1',
				 1711,
				 'https://collection.britishmuseum.org/id/person-institution/$1',
				 1755,
				 'http://aviation-safety.net/database/record.php?id=$1',
				 1760,
				 'http://aviation-safety.net/wikibase/wiki.php?id=$1',
				 1769,
				 'http://denkxweb.denkmalpflege-hessen.de/cgi-bin/mapwalk.pl?event=Query.Details&obj=$1',
				 1807,
				 'http://www.enciclopedia-aragonesa.com/voz.asp?voz_id=$1',
				 1819,
				 'http://www.genealogics.org/getperson.php?personID=$1&tree=LEO',
				 1900,
				 'http://www.eagle-network.eu/voc/$1',
				 1928,
				 'http://www.ontobee.org/browser/rdf.php?o=VO&iri="http://purl.obolibrary.org/obo/$1"',
				 1938,
				 'https://www.gutenberg.org/ebooks/author/$1',
				 1946,
				 'http://catalogue.nli.ie/Record/$1',
				 2004,
				 'http://lod.nal.usda.gov/nalt/$1',
				 2026,
				 'https://avibase.bsc-eoc.org/species.jsp?avibaseid=$1',
				 2106,
				 'http://www.rsc.org/publishing/journals/prospect/ontology.asp?id=$1',
				 2158,
				 'http://purl.obolibrary.org/obo/$1',
				 2163,
				 'http://id.worldcat.org/fast/$1',
				 2179,
				 'https://dl.acm.org/buildccscode.cfm?id=$1&lid=f',
				 2263,
				 'http://www.isocat.org/rest/dc/$1',
				 2347,
				 'http://www.yso.fi/onto/yso/p$1',
				 2355,
				 'http://www.unesco.org/languages-atlas/en/atlasmap/language-id-$1.html',
				 2357,
				 'https://nces.ed.gov/ipeds/cipcode/cipdetail.aspx?y=55&cip=$1',
				 2367,
				 'http://dbforms.ga.gov.au/pls/www/geodx.strat_units.sch_full?wher=stratno=$1',
				 2372,
				 'http://www.odis.be/lnk/$1',
				 2397,
				 'https://www.youtube.com/channel/$1',
				 2452,
				 'http://www.geonames.org/ontology#$1',
				 2457,
				 'https://dmzapp17p.ris.environment.gov.au/shipwreck/public/wreck/wreck.do?key=$1',
				 2464,
				 'http://bugguide.net/node/view/$1',
				 2477,
				 'https://www.tbrc.org/#!rid=$1',
				 2479,
				 'https://spdx.org/licenses/$1.html',
				 2581,
				 'http://babelnet.org/synset?word=bn:$1',
				 2612,
				 'https://www.ted.com/topics/$1',
				 2671,
				 'https://g.co/kg$1',
				 2689,
				 'http://bartoc.org/en/node/$1',
				 2742,
				 'http://www.ga.gov.au/provexplorer/provinceDetails.do?eno=$1',
				 2748,
				 'https://www.nationalarchives.gov.uk/pronom/$1',
				 2751,
				 'http://rcdb.com/$1.htm',
				 2752,
				 'http://www.nzor.org.nz/names/$1',
				 2760,
				 'http://archive.foodstandards.gov.au/consumerinformation/nuttab2010/nuttab2010onlinesearchabledatabase/onlineversion_code.cfm?&action=getFood&foodID=$1',
				 2812,
				 'http://mathworld.wolfram.com/$1.html',
				 2863,
				 'http://www.molendatabase.nl/nederland/molen.php?nummer=$1',
				 2866,
				 'http://www.molens.nl/nl/molen/zoek-een-molen/zoekresultaten-molenbestand/molendetail/?molenid=$1',
				 2867,
				 'http://www.molenechos.org/molen.php?AdvSearch=$1',
				 2874,
				 'https://pubchem.ncbi.nlm.nih.gov/bioassay/$1',
				 2924,
				 'https://bigenc.ru/text/$1',
				 2950,
				 'http://nomisma.org/id/$1',
				 3021,
				 'http://www.iranicaonline.org/articles/$1',
				 3040,
				 'https://soundcloud.com/$1',
				 3064,
				 'http://www.nhm.ac.uk/jdsml/research-curation/research/projects/lepindex/detail.dsml?TaxonNo=$1',
				 3065,
				 'http://data.rero.ch/$1',
				 3074,
				 'http://www.gracesguide.co.uk/$1',
				 3088,
				 'http://taibnet.sinica.edu.tw/chi/taibnet_species_detail.php?name_code=$1',
				 3088,
				 'http://taibnet.sinica.edu.tw/eng/taibnet_species_detail.php?name_code=$1',
				 3102,
				 'http://www.plantarium.ru/page/view/item/$1.html',
				 3105,
				 'http://www.tela-botanica.org/bdtfx-nn-$1',
				 3106,
				 'https://www.theguardian.com/$1',
				 3123,
				 'http://plato.stanford.edu/entries/$1',
				 3130,
				 'http://plantnet.rbgsyd.nsw.gov.au/cgi-bin/NSWfl.pl?page=nswfl&lvl=sp&name=$1',
				 3133,
				 'http://nektar.oszk.hu/auth/$1',
				 3180,
				 'https://vndb.org/$1',
				 3183,
				 'http://topics.wsj.com/$1',
				 3201,
				 'http://purl.bioontology.org/ontology/MEDDRA/$1',
				 3221,
				 'https://www.nytimes.com/topic/$1',
				 3222,
				 'https://www.ne.se/uppslagsverk/encyklopedi/lång/$1',
				 3235,
				 'http://philpapers.org/browse/$1',
				 3240,
				 'https://data.nbn.org.uk/Taxa/$1',
				 3241,
				 'http://www.newadvent.org/cathen/$1.htm',
				 3265,
				 'https://myspace.com/$1',
				 3267,
				 'https://www.flickr.com/photos/$1',
				 3285,
				 'http://www.ams.org/mathscinet/msc/msc2010.html?t=$1',
				 3289,
				 'https://web.expasy.org/cellosaurus/$1',
				 3308,
				 'https://lib.reviews/thing/$1',
				 3322,
				 'https://www.vlinderstichting.nl/vlinders/overzicht-vlinders/details-vlinder/?vlinder=$1',
				 3328,
				 'http://www.wurvoc.org/vocabularies/om-1.8/$1',
				 3347,
				 'https://permid.org/1-$1',
				 3348,
				 'http://nlg.okfn.gr/resource/authority/record$1',
				 3365,
				 'http://www.treccani.it/enciclopedia/$1',
				 3370,
				 'http://www.geopatronyme.com/nomcarte/$1',
				 3381,
				 'http://fileformats.archiveteam.org/wiki/$1',
				 3390,
				 'http://unicat.nlb.by/opac/pls/dict.prn_ref?tu=r&tq=v0&name_view=va_all&a001=BY-NLB-ar$1&strq=l_siz=20',
				 3398,
				 'http://www.butterfliesandmoths.org/$1',
				 3400,
				 'http://cordis.europa.eu/projects/$1',
				 3420,
				 'http://www.calflora.org/cgi-bin/species_query.cgi?where-calrecnum=$1',
				 3430,
				 'http://snaccooperative.org/ark:/99166/$1',
				 3479,
				 'http://www.aftonbladet.se/tagg/$1',
				 3545,
				 'http://www.theoi.com/$1.html',
				 3552,
				 'https://connectonline.asic.gov.au/RegistrySearch/faces/landing/panelSearch.jspx?searchType=OrgAndBusNm&searchText=$1',
				 3553,
				 'https://www.zhihu.com/topic/$1',
				 3579,
				 'http://weibo.com/$1',
				 3583,
				 'http://www.surfline.com/surfaz/surfaz.cfm?id=$1',
				 3591,
				 'http://wcsp.science.kew.org/namedetail.do?name_id=$1',
				 3710,
				 'http://www.daat.ac.il/encyclopedia/value.asp?id1=$1',
				 3720,
				 'https://www.gpnotebook.co.uk/simplepage.cfm?ID=$1',
				 3724,
				 'https://www.ushmm.org/wlc/en/article.php?ModuleId=$1',
				 3762,
				 'https://openmlol.it/autore/$1',
				 3763,
				 'http://www.mimo-db.eu/InstrumentsKeywords/$1',
				 3790,
				 'http://animecons.com/guests/bio.shtml/$1',
				 3794,
				 'http://dictionaryofsydney.org/$1',
				 3795,
				 'http://flora.org.il/plants/$1',
				 3798,
				 'http://www.starwars.com/databank/$1/',
				 3827,
				 'https://www.jstor.org/topic/$1',
				 3832,
				 "http://www.europeanafashion.eu/portal/browse.html#objectType%3D'http%3A%2F%2Fthesaurus.europeanafashion.eu%2Fthesaurus%2F$1",
				 3847,
				 'https://openlibrary.org/subjects/$1',
				 3854,
				 'http://www.soundtrackcollector.com/title/$1/',
				 3859,
				 "https://www.ebi.ac.uk/ols/ontologies/envo/terms?iri=http://purl.obolibrary.org/obo/ENVO_$1",
				 3885,
				 'http://www.histmodbiomed.org/taxonomy/term/$1',
				 3895,
				 'http://www.inao.gouv.fr/produit/$1',
				 3905,
				 'http://data.culture.fr/thesaurus/page/ark:/67717/$1',
				 3911,
				 'http://zbw.eu/stw/descriptor/$1',
				 3916,
				 'http://vocabularies.unesco.org/thesaurus/$1',
				 3941,
				 'http://www.iaa-archives.org.il/search.aspx?loc_id=$1',
				 3943,
				 'https://$1.tumblr.com/',
				 3964,
				 'http://bibliotecadigital.jcyl.es/en/consulta_aut/registro.cmd?id=$1',
				 3964,
				 'http://bibliotecadigital.jcyl.es/es/consulta_aut/registro.cmd?id=$1',
				 3964,
				 'http://bibliotecadigital.jcyl.es/fr/consulta_aut/registro.cmd?id=$1',
				 3973,
				 'https://resolver.pim.hu/auth/$1',
				 3984,
				 'https://www.reddit.com/r/$1/',
				 3986,
				 'http://www.sequenceontology.org/browser/current_svn/term/$1',
				 3998,
				 'http://censoarchivos.mcu.es/CensoGuia/archivodetail.htm?id=$1',
				 4003,
				 'https://www.facebook.com/pages/$1',
				 4051,
				 'http://zakon5.rada.gov.ua/laws/show/$1',
				 4073,
				 'http://$1.wikia.com/',
				 4104,
				 'http://data.carnegiehall.org/names/$1',
				 4106,
				 'http://www.kyppi.fi/to.aspx?id=112.$1',
				 4125,
				 'http://titan.gbif.fr/sel_genann1.php?numero=$1',
				 4160,
				 'https://restaurant.michelin.fr/$1',
				 4167,
				 'https://www.dn.no/topic/$1',
				 4180,
				 'http://gujlit.com/profile.php?pId=$1',
				 4201,
				 'https://www.pagesjaunes.fr/pros/$1',
				 4204,
				 'http://timesofindia.indiatimes.com/topic/$1',
				 4223,
				 'http://www.treccani.it/enciclopedia/$1_(Enciclopedia-Italiana)/',
				 4228,
				 'http://www.eoas.info/biogs/$1.htm',
				 4255,
				 'http://en.banglapedia.org/index.php?title=$1',
				 4272,
				 'https://dp.la/search?subject%5B%5D=$1',
				 4293,
				 'http://purl.org/pressemappe20/folder/$1',
				 4294,
				 'http://www.crd.york.ac.uk/PROSPERO/display_record.asp?ID=$1',
				 4297,
				 'https://spatialillusions.com/unitgenerator.html#$1',
				 4304,
				 'https://id.erfgoed.net/thesauri/materialen/$1',
				 4305,
				 'https://id.erfgoed.net/thesauri/stijlen_en_culturen/$1',
				 4306,
				 'https://id.erfgoed.net/thesauri/datering/$1',
				 4307,
				 'https://id.erfgoed.net/thesauri/erfgoedtypes/$1',
				 4308,
				 'https://id.erfgoed.net/thesauri/waardetypes/$1',
				 4309,
				 'https://id.erfgoed.net/thesauri/gebeurtenistypes/$1',
				 4310,
				 'https://id.erfgoed.net/thesauri/besluittypes/$1',
				 4311,
				 'https://id.erfgoed.net/thesauri/soorten/$1'];

    }



