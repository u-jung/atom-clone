var MAP;
var featureBarch = [];
var c = 0;
var truncated_requery = 0;
var I18N = get_i18n();

jQuery(document).ready(function() {
	console.log("referrer", document.referrer);
	culture = getLang()
	loaders();
	add_listeners();
	console.log(jQuery('body').length);
	more_less();
	clean_logo();
	retarget_links();
	create_special_fields();
	var pageType = get_page_type();
	show_query_term();
	facets_to_sidebar();
	shorten_facet_lists();
	show_things(pageType);
	move_things();
	add_arrows();
	add_level_tags();
	load_institutions();
	truncate_query();
	/*getFeatures();*/
	add_donors_to_sidebar();
	gallery_events();
	change_placeholders();
	resize_once();
	resize();
	//show_beta_version();
	/// End load
});
window.onpopstate = function(event) {
	console.log(event.state);
	popstateListener(event)
}

function getLang() {
	culture=jQuery('#culture').text();
	if (culture != "") {
		console.log("culture", culture);
		var lang = culture;
	}
	else{
		var lang = navigator.language.slice(0, 2);
		console.log("browser", lang);
	}
	
	
	ref = document.referrer
	
	ref = ref.substring(ref.lastIndexOf("/")).slice(1, 4)
	if (jQuery.inArray(ref, ["map", "the", "fon", "rev"]) && ref!="" && culture=="" ) {
		console.log("comes from map,the or fon", lang);
		tmp = get_cookie("lang");
		if (tmp != "") {
			console.log("cookie value", tmp);
			lang = tmp;
		} else {
			lang =  navigator.language.slice(0, 2);
		}
	}
	var params = get_search();
	if (params.hasOwnProperty("sf_culture")) {
		lang = params['sf_culture'];
		document.cookie = "lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = " lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "lang=" + lang;
		console.log("was in sf_culture", lang);
	};
	if (lang != "fr" && lang != "de") {
		console.log(lang, "is other than fr or de");
		lang = "en";
	}
	console.log("|" + lang + "|" + culture + "|" + document.cookie + "|" + document.referrer);
	jQuery('#lang-menu button').css('background-image', 'url("../../plugins/arPotsdamPlugin/images/SVG/ic_language_' + lang + '.svg")');
	//document.cookie = "lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	//document.cookie = " lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	var now = new Date();
	var minutes = 1;
	now.setTime(now.getTime() + (minutes * 60 * 1000));
	document.cookie = "lang=" + lang;
	document.cookie = "expires=" + now.toUTCString() + ";"
	document.cookie = "lang=" + lang;
	console.log(lang);
	return lang;
}
jQuery(document).ajaxComplete(function() {
	indentify_treeview();
});


function show_beta_version(){
		jQuery('#logo-and-name h1').append('<div id="beta">Beta</div>');
	}

function get_cookie(key) {
	tmp = document.cookie
	tmp = tmp.replace(" ", "");
	tmp = tmp.split(/;|=/);
	console.log(tmp);
	pos = tmp.indexOf(" lang") + 1;
	if (pos > 0) {
		return tmp[tmp.indexOf("lang") + 1];
	} else {
		return "";
	}
}

function add_listeners() {
	jQuery('#simple-search').on("click", function() {
		jQuery('#search-form-wrapper form').submit();
	});
	jQuery("img").on("error", function() {
		//jQuery(this).hide();
	});
}

function truncate_query() {
	if (truncated_requery == 1) {
		return
	}
	get_search("query");
	console.log("truncate");
	if (jQuery('.messages.error').length > 0 && jQuery('.messages.error strong').text().indexOf("SearchPhaseExecutionException") > -1) {
		var search = window.location.search;
		var shorted = unescape(get_search("query"));
		shorted = '"' + shorted.replace(/[^\w\s]/gi, ' ') + '"';
		search = search.replace("query=" + get_search("query"), "query=" + shorted);
		window.open(window.location.pathname + "" + search, "_self");
		return
	}
	if (get_search("query") != "" && get_search("query").slice(-1) != "*" && jQuery('.search-result').length == 0) {
		truncated_requery = 1
		console.log("truncate true");
		var search = window.location.search;
		search = search.replace("query=" + get_search("query"), "query=" + get_search("query") + "*");
		window.location.replace(window.location.pathname + "" + search);
	}
}
/* Send an advanced query to AtoM which contains the list of selected places*/
function lookupPlaces(ar) {
	var uStr;
	var qs = document.location.origin + "/index.php/informationobject/browse?showAdvanced=0";
	for (var i = 0; i < ar.length; i++) {
		if (i > MAXPLACES) {
			break
		}
		uStr = encodeURIComponent(ar[i]);
		if (i == 0) {
			console.log(uStr, ar[i], ar);
			qs += "&sq" + i + "=" + uStr;
		} else {
			qs += "&so" + i + "=or&sq" + i + "=" + uStr;
		}
	}
	qs += "&topLod=0&rangeType=inclusive"
	if (ar.length == 1) {
		qs = document.location.origin + "/index.php/informationobject/browse?topLod=0&query=" + ar[0] + "&repos=";
	}
	if (ar.length > 0) {
		window.location.replace(qs);
		//window.open(qs,"_blank");
	} else {
		console.log("Es wurde nichts ausgewählt");
	}
}

function show_things(pageType) {
	/* Extend listed authority data by Wikidata query*/
	if (jQuery("#controlArea").length != 0) {
		jQuery.getScript('/plugins/arPotsdamPlugin/js/wikidata.js', function() {
			showEntityFromWd();
		});
	}
	if (jQuery('.digital-object-reference').length > 0) {
		jQuery('.digital-object-reference').remove()
	}
	if (jQuery('#content').length > 0 && pageType[0] == 'show') {
		console.log("is information object");
		var text = '<section id="service"><span anchor="serviceArea" title="Service"><h2>Service</h2></span></section>';
		jQuery('#content').append(text);
		if (window.location.pathname.search("index.php") > -1) {
			var path = window.location.pathname.slice(10, 1000);
		} else {
			var path = window.location.pathname
		}
		var loc = window.location.protocol + "//" + window.location.hostname + "" + path;
		if (jQuery('#action-icons ul li').length > 8) {
			jQuery('<li class="export-json"><a href=' + document.location.origin + '/api.php?q=informationobjects/' + get_slug() + '?sf_culture=' + culture + '"><i class="fa fa-upload"></i> JSON</a></li>').insertAfter("#action-icons ul li:nth-child(9)");
		}
		text = '<div class="field"><h3>' + __("Permanent Link") + '</h3><div class="permanentlink"><a href="' + loc + '">' + loc + '</a></div></div>';
		jQuery('#service').append(text);
		text = '<div class="field"><h3>' + __("Export") + '</h3><div class="exportlinks"><ul></ul></div></div>';
		jQuery('#service').append(text);
		text = '<div class="field" style="min-height:40px"><h3>' + __("Translations") + '</h3><div id="translationlink"></div></div>';
		jQuery('#service').append(text);
		jQuery(".export-dc").detach().appendTo('.exportlinks ul');
		jQuery(".export-xml").detach().appendTo('.exportlinks ul');
		jQuery(".export-json").detach().appendTo('.exportlinks ul');
		text = '<div class="field"><h3>' + __("Disclaimer") + '</h3><div class="permanentlink">'+__(71)+'</div></div>';
		jQuery('#service').append(text);


		if (jQuery(".exportlinks ul li").length == 0) {
			jQuery(".exportlinks").parent().remove();
		}
		jQuery(".btn-group.translation-links").detach().appendTo('#translationlink');
		console.log(jQuery(".clipboard"));
		jQuery(".clipboard:not(body)").detach().prependTo('#content');
		jQuery('.clipboard ').css('list-style-type', 'none');
		jQuery('.clipboard button').css('color', 'var(--blau)');
		if (pageType[1] == "information_object") {
			jQuery('#main-column > h1').remove();
		} else {
			text = '<div class="field"><h3>' + __("Name") + '</h3><div id="namefield"></div>';
			jQuery('#content .field:eq(0)').after(text);
			text = jQuery('#main-column > h1').text();
			jQuery('#namefield').text(text);
			jQuery('#main-column > h1').remove();
		}
	}
}

function move_things() {
	//moving things if is information object	
	if (jQuery('body').length == 0) {
		return
	}
	if (jQuery('body').attr('class').search("sfIsadPlugin") > -1) {
		jQuery("#treeview i").each(function() {
			jQuery(this).text("➕");
		});
		indentify_treeview();
		jQuery("#treeview-search-tab").remove();
		//FindingAids
		var fa_links = jQuery(".findingAids").text().match(/\bhttps?:\/\/\S+/gi);
		var newText = "";
		var link = ""
		if (fa_links != null) {
			for (i = 0; i < fa_links.length; i++) {
				link = fa_links[i];
				if (",;|".indexOf(link.slice(-1)) > -1) {
					link = link.slice(0, -1);
				}
				newText += '<a href="' + link + '" target="_blank" class>' + link.slice(0, 65).trim("/") + '…</a><br />';
			}
			if (fa_links.length > 0) {
				newText += __(43);
				jQuery(".findingAids").html(newText);
			}
		}
		// Change label
		jQuery(".findingAids").closest('div').siblings('h3').text(__('Objekt beim Datengeber'));
	}
	if (jQuery('#collections').length > 0) {
		jQuery('#collections ul').remove();
		jQuery(".sidebar-paginated-list.list-menu ul").detach().appendTo('#collections div div');
		jQuery("#repo-holdings .sidebar-search").detach().appendTo('#collections div div');
		jQuery("#repo-holdings").hide();
	}
	if ("about impressum help data aktenkunde schrift community-2 links history data-privacy-statement special_fonds press".indexOf(get_slug()) > -1) {
		jQuery('#content').css('border-color', 'white');
	};
	
}

function indentify_treeview() {
	jQuery("#treeview i").each(function() {
		console.log("+");
		jQuery(this).text("➕");
		jQuery(this).on("click",function(){window.scrollTo(0, document.body.scrollHeight+100);});
	});
	jQuery("#treeview .ancestor i").text("➖");
	jQuery("#treeview .ancestor.root i").text("");
	var marginLeft = 0;
	var lastClass = jQuery("#treeview li:first").attr("class");
	jQuery("#treeview li").each(function() {
		if (jQuery(this).attr("class") == "ancestor" || jQuery(this).attr("class") == "ancestor active" || lastClass == "ancestor" || lastClass == "ancestor active") {
			marginLeft += 20;
			lastClass = jQuery(this).attr("class");
		}
		jQuery(this).css("margin-left", marginLeft + "px");
	});
}

function toggle_bots() {
	var elem = [];
	jQuery('dt').each(function() {
		elem = jQuery(this).next('dd');
		if (elem.find("a").text().slice(-3).toLowerCase() == "bot") {
			jQuery(this).css("display", "none");
			jQuery(this).next('dd').css('display', 'none');
		};
	});
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

function shorten_facet_lists() {
	jQuery('.facet-c').off("click");
	jQuery('.facet-body ul').each(function() {
		jQuery(this).children().filter("li:gt(10)").toggle()
	});
	jQuery('.facet-body').each(function() {
		console.log(jQuery(this).children().filter('.facet-c').length);
		if (jQuery(this).children().filter('.facet-c').length == 0) {
			jQuery(this).append('<span class="facet-c">more</span>');
		}
	});
	jQuery('.facet-c').each(function() {
		var count = jQuery(this).parent().children().filter('ul').children().size() - jQuery(this).parent().children().filter("ul").children().filter('li:visible').size()
		if (count == 0) {
			jQuery(this).hide();
		} else {
			jQuery(this).text("show " + count + " more");
		}
	});
	jQuery('.facet-c').on("click", function() {
		show_more_less_facets_links(this)
	});
}

function show_more_less_facets_links(elem) {
	c += 1
	console.log(c);
	console.log(jQuery(elem).parent().children().filter('ul').children());
	if (jQuery(elem).text() != "less") {
		jQuery(elem).parent().children().filter('ul').children().each(function() {
			jQuery(this).show()
		});
		jQuery(elem).text("less");
	} else {
		jQuery(elem).text("more");
	}
	jQuery(this).show();
}

function popstateListener(event) {
	console.log(event.state);
	console.log(get_slug());
	console.log(get_search());
	if (get_slug() == "thesaurus") {
		if (get_search().hasOwnProperty("id")) {
			console.log(get_search()['id']);
			changeWd(get_search()['id']);
		} else {
			console.log("wd change");
			showWD();
		}
	}
	if (get_slug() == "font-tool") {
		console.log("font-tool:" + get_search());
	}
	if (get_slug() == "map") {
		if (get_search() != "") {
			console.log(get_search());
		} else {
			showMap();
		}
	}
};
/* Looking for the current AtoM slug*/
function get_slug() {
	var path = window.location.pathname;
	return path.substring(path.lastIndexOf('/') + 1);
}

function loaders() {
	/* Check if special function should be called, depending on static page slug*/
	if (get_slug() == "thesaurus") {
		console.log(get_search());
		if (get_search().hasOwnProperty("id")) {
			console.log("wd init");
			changeWd(get_search()['id']);
		} else {
			console.log("wd change");
			showWD();
		}
	};
	if (get_slug() == "map") {
		jQuery('#main-column').html("");
		showMap();
		if(get_search().hasOwnProperty("coord")){
			coord=get_search()['coord'].split("+");
			go_to_colony(coord[0],coord[1],coord[2]);
		}
	};
	if (get_slug() == "font-tool") {
		jQuery('#main-column').html("");
		showFontTool();
	};
	if (get_slug() == "revision") {
		jQuery('#main-column').html("&nbsp;");
		showRevisions(1)
		/*
		var queries = {};
		jQuery.each(document.location.search.substr(1).split('&'), function(c, q) {
			var i = q.split('=');
			if (i[0].toString() == "d") {
				showRevisions(i[1].toString());
			}
			queries[i[0].toString()] = i[1].toString();
		});*/
	}
}

function add_arrows() {
	jQuery('th.sortable').each(function() {
		if (jQuery(this).children('img').length == 0) {
			jQuery(this).append('<img src="/images/up.gif"/><img src="/images/down.gif"/>')
		}
	});
}

function retarget_links() {
	//blank target for external links
	var href = "";
	jQuery("#content .field div a").each(function() {
		var href = jQuery(this).attr("href");
		if (href.slice(0, 4).toLowerCase() == "http") {
			jQuery(this).attr("target", "_blank");
		}
	});
}

function get_page_type() {
	// check page type
	var pageType = [];
	if (jQuery('body').attr('class').search("sfIsadPlugin") > -1) {
		pageType = ['show', 'information_object'];
	}
	if (jQuery('.browse-content').length > 0) {
		pageType = ['browse', ''];
	}
	if (jQuery('#content>div>div>a').attr("href") == "/index.php/places") {
		pageType = ['show', 'place'];
	}
	if (jQuery('#content>div>div>a').attr("href") == "/index.php/subjects") {
		pageType = ['show', 'subject'];
	}
	if (jQuery('#content>div>div>a').attr("href") == "/index.php/genre") {
		pageType = ['show', 'genre'];
	}
	console.log("pageType", pageType);
	return pageType;
}

function more_less() {
	jQuery(".read-more a").text(__("more"));
	jQuery(".read-less a").text(__("less"));
}

function clean_logo() {
	if (jQuery('.repository-logo.repository-logo-text').length > 0) {
		jQuery('.repository-logo.repository-logo-text').remove();
	}
}

function get_search(p) {
	var search = window.location.search;
	var items = search.slice(1).split("&")
	var params = {}
	var tmp = ""
	for (var i = 0; i < items.length; i++) {
		tmp = items[i].split("=")
		if (tmp.length == 2) {
			params[tmp[0]] = tmp[1];
		} else {
			params[tmp[0]] = tmp[0]
		}
	}
	if (p) {
		if (p.slice(0, 2) == "sq") {
			return params["sq0"];
		}
		if (params.hasOwnProperty(p)) {
			return params[p]
		} else {
			return "";
		};
	}
	//console.log(params);
	return params;
}

function facets_to_sidebar() {
	// facets to sidebar
	if (jQuery('.sidebar-lowering-sort').length > 0) {
		jQuery(".sidebar-lowering-sort").detach().appendTo('#sidebar');
	}
	jQuery('.facet-body').show();
}

function create_special_fields() {
	//create new 'field' view if {{}}
	var match = "";
	var field_name = "";
	var field_content = "";
	jQuery("#content .field div").each(function() {
		match = jQuery(this).text().match(/\{{[^\}]*}}/gi);
		if (match != null) {
			field_name = match[0];
			console.log(field_name);
			field_content = jQuery(this).html().trim().slice(field_name.length + 1);
			field_name = field_name.slice(2, -2);
			console.log("r", field_name, "|", field_content);
			var text = '<div class="field"><h3>' + __(field_name) + '</h3><div class="' + field_name + '">' + field_content + '</div>';
			jQuery(this).parent().parent().append(text)
			jQuery(this).parent().remove();
		};
	});
}

function getFeatures() {
	if (jQuery('#archives-map').length == 0) {
		return;
	}
	jQuery.getJSON("/get.php", function(data) {
		load_institutions(data);
	});
}

function load_institutions( /*data*/ ) {
	if (jQuery('#archives-map').length == 0) {
		return;
	}
	if (jQuery(window).width() < 500) {
		console.log("after");
		jQuery('#archives-map').hide();
		return;
	}
	// Points
	function pointStyleFunction(feature, resolution) {
		return new Style({
			image: new CircleStyle({
				radius: 10,
				fill: new Fill({
					color: 'rgba(255, 0, 0, 0.1)'
				}),
				stroke: new Stroke({
					color: 'red',
					width: 1
				})
			}),
			text: createTextStyle(feature, resolution, myDom.points)
		});
	}
	var createTextStyle = function() {};
	// Create background layer
	var stamenLayer = new ol.layer.Tile({
		source: new ol.source.Stamen({
			layer: 'toner'
		})
	});
	var baseLayer = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
	var vectorSource = new ol.source.Vector({
		url: "/get.php",
		format: new ol.format.GeoJSON()
	});
	// Create vectorlayer and load GeoJSON file
	var vectorLayer = new ol.layer.Vector({
		source: vectorSource,
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
					src: '/plugins/arPotsdamPlugin/images/SVG/ic_places_blau.svg'
				}),
				text: new ol.style.Text({
					text: feature.get('name'),
					scale: 0.9,
					offsetY: -15,
					textAlign: 'left',
					padding: [5, 5, 5, 5],
					fill: new ol.style.Fill({
						color: '#02427f'
					}),
					stroke: new ol.style.Stroke({
						color: '#FFFFFF',
						width: 3.5
					})
				})
			});
			return [featureStyle];
		}
	});
	map = new ol.Map({
		controls: ol.control.defaults().extend([
			new ol.control.FullScreen(),
			new ol.control.Zoom({
				minWidth: 120
			})
		]),
		target: document.getElementById('map'),
		logo: false,
		layers: [
			stamenLayer,
			vectorLayer
		],
		view: new ol.View({
			center: ol.proj.transform([13.35320296, 52.51372], 'EPSG:4326', 'EPSG:3857'),
			minZoom: 3,
			maxZoom: 19,
			zoom: 5
		})
	});
	vectorLayer.set('visible', true);
	console.log(vectorLayer.getSource().getFeatures());
	map.on('postrender', function(evt) {
		o = jQuery('#archives-list .facet-body a').contents().filter(function() {
			return this.nodeType == 3;
		});
		var archives = []
		for (i = 1; i < o.length; i++) {
			archives.push(o[i].data.replace(/[^\w]*/g, ''));
		}
		var best_coord = [999999, []];
		var index = 0;
		var features = vectorLayer.getSource().getFeatures();
		features.forEach(function(feature) {
			index = archives.indexOf(feature.get('name').replace(/[^\w]*/g, ''))
			feature.set('name', feature.get('name').replace(/[^\wäöüéèßâôûíìàÄÖÜ|^\ |^\(|^\)|^-]*/g, ''));
			if (index < 0) {
				vectorLayer.getSource().removeFeature(feature);
			} else {
				if (index < best_coord[0]) {
					best_coord = [index, feature.getGeometry().getCoordinates()];
				}
			}
		});
	});
	map.on("click", function(e) {
		map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
			window.open(window.location.protocol + "//" + window.location.host + "/" + feature.get("slug"), "_blank");
		})
	});
	map.once('change', function(evt) {
		if (vectorSource.getState() === 'ready') {
			// now the source is fully loaded
			if (vectorLayer.getSource().getFeatures().length > 0) {
				map.getView().fit(vectorSource.getExtent(), map.getSize());
				console.info(map.getView().getCenter());
				console.info(map.getView().getZoom());
			}
		}
	});
	MAP = map
}

function show_query_term() {
	if (jQuery('#results-label').length > 0) {
		var query = get_search("query")
		if (query == "") {
			query = get_search("sq");
		}
		if (query != "" && (typeof query != 'undefined')) {
			jQuery('#results-label').parent().children().eq(1).prepend('<span id="query">' + decodeURI(query) + ' </span>');
		}
	}
}

function gallery_events() {
	if (jQuery('.gallery').length == 0) {
		return;
	};
	jQuery('.gallery div').each(function() {
		jQuery(this).on("click", function() {
			var url = jQuery(this).children('img').attr('src').slice(0, -6) + ".png";
			console.log(url, jQuery(this).parent());
			jQuery(this).parent().append('<div class="gallery-item"></div>');
			jQuery('.gallery-item').css('background', 'url("' + url + '") no-repeat');
			jQuery('.gallery-item').append('<img src="' + url + '" style="visibility:hidden">');
			//jQuery('.gallery-item').css('width','100%');
			console.log(jQuery('.gallery-item img').width());
			jQuery('.gallery-item').on('click', function() {
				jQuery(this).remove();
			});
		});
	});
};

function add_donors_to_sidebar() {
	var target = '#sidebar';
	if (jQuery(window).width() < 888) {
		target = '#main-column';
	}
	if (jQuery('#sidebar').children().length == 0) {
		console.log("sidebar insert");
		img_str = '<div id="fhp-logo">' + __("Ein Projekt der") + '</div><div id="aa-logo">' + __("Gefördert vom") + '</div>';
		jQuery(target).append(img_str);
	};
	console.log("sidebar insert2");
	jQuery('#fhp-logo').on("click", function() {
		window.open("https://www.fh-potsdam.de", "_blank");
	});
	jQuery('#aa-logo').on("click", function() {
		window.open('https://www.auswaertiges-amt.de/' + culture, "_blank");
	});
}
jQuery.fn.scrollTo = function(elem) {
	jQuery(this).scrollTop(jQuery(this).scrollTop() - jQuery(this).offset().top + jQuery(elem).offset().top);
	return this;
};

function showLoader() {
	if (jQuery('#loader').length == 0) {
		jQuery('body').append('<div id="loader"><h2>Gleich geht es weiter ...</h2></div>');
	} else {
		jQuery('#loader').remove()
	}
}

function change_placeholders() {
	if (jQuery('.input-prepend.input-append input').length == 1 && jQuery('.input-prepend.input-append input').attr('placeholder') != undefined) {
		jQuery('.input-prepend.input-append input').attr('placeholder', capitalize_Words(jQuery('.input-prepend.input-append input').attr('placeholder')));
	}
};


function add_level_tags(){
	jQuery(".level-description").each(function(){
			if ("  Akt Obj Fil Ite Par Tei Piè Dos Par".search(jQuery(this).text().slice(0,3))>-1){
				jQuery(this).attr("class","level-description tagged");
			}
		});
	/*jQuery(".levelOfDescription").each(function(){
		if ("  Akt Obj Fil Ite Par Tei Piè Dos Par".search(jQuery(this).text().slice(0,3))>-1){
			jQuery(this).attr("class","levelOfDescription tagged");
		}
	});*/
}


function capitalize_Words(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
jQuery(window).resize(function() {
	resize()
});

function resize_once() {
	if (window.innerWidth < 990) {
		jQuery('.facet.open').attr("class", "facet");
	}
}

function resize() {
	if (window.innerWidth < 990) {
		jQuery('#simple-search').parent().css('order', '-2');
		jQuery('#burger-menu').css('order', '-1');
		jQuery('#burger-menu').css('flex-basis', window.innerWidth - 635 + 'px');
	} else {
		jQuery('#burger-menu').css('order', '11');
		jQuery('#burger-menu').css('flex-basis', '0%');
	};
	jQuery('#sidebar-space').css('margin-top', (window.innerWidth % 12) + 'px');
};

/***********************I18N***********************************/



function __(term) {

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



function get_i18n() {
	culture=jQuery('#culture').text();
	if (culture == "fr") {
		return [DE, FR];
	} else {
		if (culture = "en") {
			return [DE, EN]
		};
	}
}
