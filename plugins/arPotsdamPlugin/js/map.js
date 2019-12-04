    /***********************************************  MAP ****************************************************************** */
    jQuery(document).ready(function() {});

    function getMapZoom(karte) {
    	//console.log(karte, KARTEN);
    	var zoom = 0;
    	for (var i = 1; i < MAPS.length; i++) {
    		if ("code" in MAPS[i]) {
    			if (MAPS[i]['code'] == karte) {
    				zoom = MAPS[i]['zoomLevel'];
    				return zoom;
    			}
    		}
    	}
    	return zoom;
    }

    function mapInit() {
    	jQuery('#wrapper').html('<div class="row"><div class="span3"><div id="sidebar"></div></div><div class=span9><div id="main-column"></div></div></div>');
    	shortcuts = '';
    	for (i = 0; i < SHORTCUTS.length; i++) {
    		shortcuts += '<div name="' + i + '">' + SHORTCUTS[i][0] + '</div>'
    	}
    	jQuery('#main-column').html('<div class="multiline-header">\
								<img alt="" src="/plugins/arPotsdamPlugin/images/SVG/ic_map_finder.svg" />\
								<h1>' + __("Kartensuche") + '</h1>\
								<p>' + __(5) + '</p></div>\
								<div id="content"><div id="map"></div>\
								</div></div>\
								<br /><div class="shortcuts">' + shortcuts + '</div>\
								<br /><div ><h2>' + __("Hinweise zur Benutzung") + '</h2>\
								<div><p>' + __(6) + '</p></div>\
								<h2>' + __(7) + '</h2><div><p>' + __(8) + '</p></div> <h2 id="maps_used">' + __("Verwendete Karten") + '</h2><p>' + showMapsUsed() + '</p></div>');
    }

    function add_controls() {
    	var apControlHtml = '<div id="map-controls" class="ol-control ol-unselectable">\
								<label><input id="search-p" name="search-p" type="text" value="' + __("Suche nach Ort") + '" title="' + __(19) + '">\
								<button  id="search-place-start">' + __(12) + '</button></label>\
								<button id="search-place-atom" title="' + __(14) + '">' + __("Relevante Dokumente") + '</button>\
								<button id="geohack" title="' + __("Link zum GeoHack-Projekt mit weiteren Ansichtsoptionen für die ausgewählte Region") + '">GeoHack</button>\
								<input type="range" class="ol-zoomslider ol-unselectable ol-control" name="overlay" id="overlay" min="0" max="10" value="10" title="' + __("Stufenloses Ausblenden der historischen Karte") + '">\
								<div id="base"><select id="base-layer" title="' + __("Wechsel zwischen verschiedenen Darstellungsarten der Hintergundkarte") + '"><option value="osm" selected>OSM</option><option value="opentopo" >Open Topo</option><option value="stamen">Stamen</option><select></div>\
								<label><span>On/Off</span><input type="checkbox" id="opacity-switch" checked title="' + __("Ausschalten der historischen Karte") + '"></label>\
								<label><span>Lon</span><div id="show-coord-lat" title="' + __("Anzeige der geografischen Breite") + '"></div></label>&nbsp;<label><span>Lat</span><div id="show-coord-lon" title="' + __("Anzeige der geografischen Länge") + '"></div></label><label><span>Zoom</span><div id="zoom" title="' + __("Anzeige der aktuellen Vergrößerungsstufe") + '"></div></label>\
								<label><span id="vector-switch-label">POI</span><input type="checkbox" id="vector-layer-switch" title="' + __("Einblenden von geolokalisierten Objekten aus dem Wikidata-Korpus") + '" ></label>\
								<button id="toggle-map-controls">x</button></div>';
    	var sidebar_controls = '<ul class="map-sidebar">\
								<li>\
								<input id="search-p-sb" name="search-p" type="text" value="' + __("Suche nach Ort") + '" title="' + __(19) + '" style="width:100%">\
								<button  id="search-place-start-sb" style="">' + __(12) + '</button>\
								</li><li>\
								<button id="search-place-atom-sb" title="' + __(14) + '">' + __("Relevante Dokumente") + '</button>\
								</li><li>\
								<button id="geohack-sb" title="' + __("Link zum GeoHack-Projekt mit weiteren Ansichtsoptionen für die ausgewählte Region") + '">GeoHack</button>\
								</li><li>\
								<input type="range" class="ol-zoomslider ol-unselectable ol-control" name="overlay" style="margin-left:0px; padding:0px" id="overlay-sb" min="0" max="10" value="10" title="' + __("Stufenloses Ausblenden der historischen Karte") + '">\
								<span><strong>On/Off</strong><input type="checkbox" id="opacity-switch-sb" checked title="' + __("Ausschalten der historischen Karte") + '"></span>\
								</li><li>\
								<div id="base"><select id="base-layer-sb" title="' + __("Wechsel zwischen verschiedenen Darstellungsarten der Hintergundkarte") + '"><option value="osm" selected>Open Street Map</option><option value="opentopo" >Open Topo Map</option><option value="stamen">Stamen Map</option><select></div>\
								</li><li>\
								<span><strong>Lon</strong><span id="show-coord-lat-sb" title="' + __("Anzeige der geografischen Breite") + '"></span></span>\
								</li><li>\
								<span><strong>Lat</strong><span id="show-coord-lon-sb" title="' + __("Anzeige der geografischen Länge") + '"></span></span>\
								</li><li>\
								<span><strong>Zoom</strong><span id="zoom-sb" title="' + __("Anzeige der aktuellen Vergrößerungsstufe") + '"></span></span>\
								</li><li>\
								<label><strong id="vector-switch-label-sb">Points of interest (POI)</strong><input type="checkbox" id="vector-layer-switch-sb" title="' + __("Einblenden von geolokalisierten Objekten aus dem Wikidata-Korpus") + '" ></label>\
								<br /><br /></li><li id="permanent-link"><a href="">'+__("Link zu diesem Kartenauschnitt")+'</a><br /><br /></li><li id="sidebar-map-attribution">\
								</li>\
								</ul>'
    	var slider = '<div class="ol-zoomslider ol-unselectable ol-control"><button type="button" name="overlay" id="overlay" class="ol-zoomslider-thumb ol-unselectable" style="top: 188px;"></button></div>';
    	jQuery(".ol-overlaycontainer").append(apControlHtml);
    	jQuery("#sidebar").append(sidebar_controls);
    	jQuery("#search-place").css("display", "inline-block").css("margin", "10px").css("width", "30%");
    	jQuery('#opacity-switch-sb').on('change', function() {
    		jQuery('#opacity-switch').prop('checked', jQuery('#opacity-switch-sb').prop('checked'));
    		opacity_switch();
    	});
    	jQuery('#opacity-switch').on('change', function() {
    		jQuery('#opacity-switch-sb').prop('checked', jQuery('#opacity-switch').prop('checked'));
    		opacity_switch();
    	});
    	jQuery('#base-layer-sb').on('change', function() {
    		jQuery('#base-layer').val(jQuery('#base-layer-sb'));
    		base_layer_change(jQuery(this));
    	});
    	jQuery('#base-layer').on('change', function() {
    		jQuery('#base-layer-sb').val(jQuery('#base-layer'));
    		base_layer_change(jQuery(this));
    	});
    	jQuery('#vector-layer-switch-sb').on('change', function() {
    			jQuery('#vector-layer-switch').prop('checked', jQuery('#vector-layer-switch-switch-sb').prop('checked'));
    			vector_layer_switch()
    		}),
    		jQuery('#vector-layer-switch').on('change', function() {
    			jQuery('#vector-layer-switch-sb').prop('checked', jQuery('#vector-layer-switch-switch').prop('checked'));
    			vector_layer_switch()
    		}),
    		jQuery('#geohack').on('click', function() {
    			geohack_click();
    		});
    	jQuery('#geohack-sb').on('click', function() {
    		geohack_click();
    	});
    	jQuery('.shortcuts div').on('click', function() {
    		i = parseInt(jQuery(this).attr("name"));
    		go_to_colony(SHORTCUTS[i][1], SHORTCUTS[i][2], SHORTCUTS[i][3]);
    	});
    	jQuery('#search-p-sb').on('keypress', function(e) {
    		if (e.keyCode == 13) {
    			goToPlace();
    		}
    	});
    	jQuery('#search-p').on('keypress', function(e) {
    		if (e.keyCode == 13) {
    			goToPlace();
    		}
    	});
    	var eac_options = {
    		url: function(phrase) {
    			return document.location.origin + "/search_places_simple.php?term=" + phrase
    		},
    		getValue: "name",
    		template: {
    			type: "description",
    			fields: {
    				description: "type"
    			}
    		},
    		cssClasses: "ea",
    		list: {
    			maxNumberOfElements: 100,
    			onKeyEnterEvent: function() {
    				goToPlace();
    			},
    			onKeyEnterEvent: function() {
    				goToPlace();
    				jQuery('#search-place-atom').css('color', 'white');
    				jQuery('#search-place-atom-sb').css('color', 'white');
    			},
    			onClickEvent: function() {
    				goToPlace();
    				jQuery('#search-place-atom').css('color', 'white');
    				jQuery('#search-place-atom-sb').css('color', 'white');
    			}
    		}
    	}
    	jQuery('#search-p-sb').easyAutocomplete(eac_options);
    	jQuery('#search-p').easyAutocomplete(eac_options);
    	jQuery('#toggle-map-controls').on('click', function() {
    		if (jQuery('#toggle-map-controls').text() == "x") {
    			jQuery('#map-controls').children().hide();
    			jQuery('#toggle-map-controls').show();
    			jQuery('#map-controls').css('width', '10px');
    			jQuery('#toggle-map-controls').text("_");
    		} else {
    			jQuery('#map-controls').children().show();
    			jQuery('#map-controls').css('width', '40%');
    			jQuery('#toggle-map-controls').text("x");
    		}
    	});
    	jQuery('#show-coord-lon').on('click', function() {
    		coord_change()
    	});
    	jQuery('#show-coord-lat').on('click', function() {
    		coord_change()
    	});
    	jQuery('#show-coord-lon-sb').on('click', function() {
    		coord_change()
    	});
    	jQuery('#show-coord-lat-sb').on('click', function() {
    		coord_change()
    	});
    	jQuery('#search-p-sb').on('focus', function(e) {
    		jQuery(this).val("");
    		jQuery('#search-p').val("");
    		jQuery('#search-place-atom').css('color', 'grey');
    		jQuery('#search-place-atom-sb').css('color', 'grey');
    	});
    	jQuery('#search-p').on('focus', function(e) {
    		jQuery(this).val("");
    		jQuery('#search-p-sb').val("");
    		jQuery('#search-place-atom').css('color', 'grey');
    		jQuery('#search-place-atom-sb').css('color', 'grey');
    	});
    	jQuery('#search-place-start').on('click', function() {
    		goToPlace();
    		jQuery('#search-place-atom-sb').css('color', 'white');
    		jQuery('#search-place-atom').css('color', 'white');
    	});
    	jQuery('#search-place-start-sb').on('click', function() {
    		goToPlace();
    		jQuery('#search-place-atom-sb').css('color', 'white');
    		jQuery('#search-place-atom').css('color', 'white');
    	});
    	jQuery('wrapper').on('pointermove', '#overlay', function(event) {
    		event.stopPropagation();
    	});
    	jQuery('#overlay').on('change', function(event) {
    		jQuery('#overlay-sb').val(jQuery('#overlay').val())
    		overlay_change(event, jQuery(this));
    	});
    	jQuery('#overlay-sb').on('change', function(event) {
    		jQuery('#overlay').val(jQuery('#overlay-sb').val())
    		overlay_change(event, jQuery(this));
    	});
    	jQuery('#search-place-atom').on('click', function() {
    		if (jQuery('#search-p').val() != "") {
    			var zoom = MAP.getView().getZoom();
    			var coord = ol.proj.transform(MAP.getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
    			var state = {
    				"lat": coord[0],
    				"lon": coord[1],
    				"zoom": zomm,
    				"overlay": jQuery('#overlay').val(),
    				"type": "map",
    				"current_search": jQuery('#search-p-sb').val()
    			}
    			history.pushState(state, 'Archivführer Deutsche Kolonialgeschichte', document.location.origin + '/index.php/map?pos=' + coord[0] + '+' + coord[1] + '+' + zoom + '+' + jQuery('#overlay').val());
    			lookupPlaces([jQuery('#search-p').val().replace(/\(.*\)/g, "")]);
    		}
    	});
    	jQuery('#search-place-atom-sb').on('click', function() {
    		if (jQuery('#search-p-sb').val() != "") {
    			var zoom = MAP.getView().getZoom();
    			var coord = ol.proj.transform(MAP.getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
    			history.pushState('', 'Archivführer Deutsche Kolonialgeschichte', document.location.origin + '/index.php/map?pos=' + coord[0] + '+' + coord[1] + '+' + zoom + '+' + jQuery('#overlay').val());
    			lookupPlaces([jQuery('#search-p-sb').val().replace(/\(.*\)/g, "")]);
    		}
    	});
    	jQuery('#wrapper').on('click', '#map-graticule', function() {
    		if (jQuery('#map-graticule').attr("title") == "off") {
    			GRATICULE.setMap(MAP);
    			jQuery('#map-graticule').attr("title", "on");
    		} else
    			jQuery('#map-graticule').attr("title", "off");
    		GRATICULE.setMap(null)
    	});
    	jQuery(".ol-scale-line.ol-unselectable").draggable();
    	jQuery("#map-controls").draggable();
    	jQuery('#toggle-map-controls').click();
    	jQuery('.ol-full-screen-false').on('click', function() {
    		jQuery('#map-sidebar').css("display", "none");
    		jQuery('#toggle-map-controls').click();
    	});
    }
    jQuery(window).resize(function() {
    	if (jQuery(window).width() < 500) {
    		//jQuery('#map').css("height", "500px");
    		console.log("height")
    	} else {}
    });
    //creates a table with details of map used in map browser
    function showMapsUsed() {
    	var out;
    	out = '<table id="maps-used"><thead><tr>\
		<td>' + __("Nr.") + '</td>\
		<td style="width:25%">' + __("Titel") + '</td>\
		<td>' + __("Jahr") + '</td>\
		<td>' + __("Maßstab") + '</td>\
		<td>' + __("Quelle") + '</td>\
		</tr></thead><tbody>';
    	var count = 1;
    	for (var i = 0; i < MAPS.length; i++) {
    		if (i > 0 && (MAPS[i]['title'] != MAPS[i - 1]['title'])) {
    			out += "<tr>";
    			var lon = (MAPS[i]['xMaximum'] + MAPS[i]['xMinimum']) / 2;
    			var lat = (MAPS[i]['yMaximum'] + MAPS[i]['yMinimum']) / 2;
    			out += '<td>' + count + '</td>'
    			count += 1;
    			//out += '<td><a href="map?' + lon + '+' + lat + '+' + MAPS[i]['zoomLevel'] + '+1' + '">' + MAPS[i]['title'] + '</td>';
    			out += '<td ><a href="#" onclick="javascript:go_to_colony(' + lon + ',' + lat + ',' + MAPS[i]['zoomLevel'] + ')">' + MAPS[i]['title'] + '</td>';
    			out += "<td>" + MAPS[i]['year'] + "</td>";
    			out += "<td>" + MAPS[i]['scale'] + "</td>";
    			out += '<td><a href="' + MAPS[i]['url'] + '" target="_blank">' + MAPS[i]['library'] + '</a></td>';
    			out += "</tr>";
    		}
    	}
    	out += "</tbody></table";
    	return out;
    }

    function goToPlace() {
    	var loc_name = jQuery('#search-p').val() + jQuery('#search-p-sb').val();
    	var loc_type = jQuery('#eac-container-search-p .selected span').text() + jQuery('#eac-container-search-p-sb .selected span').text();
    	console.log(loc_type);
    	if (loc_name == "") {
    		jQuery('#search-p').focus();
    		return;
    	}
    	re = new RegExp("^[0-9\.-]+,[0-9\.-]+$");
    	if (re.test(loc_name)) {
    		var coordArray = loc_name.split(",");
    		var zoom = 8;
    	} else {
    		var re = new RegExp("{(.*)}");
    		var coordArray = re.exec(loc_type.replace(/,/g, "."))[1].split("|");
    		loc_type = loc_type.slice(0, loc_type.indexOf("{") - 2);
    		var zoom = getMapZoom(loc_type);
    		if (zoom == 0) {
    			zoom = 8;
    			var historicMap = false;
    		} else {
    			var historicMap = true;
    		}
    	}
    	MAP.getView().setZoom(zoom);
    	console.log(coordArray);
    	MAP.getView().setCenter(ol.proj.fromLonLat([parseFloat(coordArray[0]), parseFloat(coordArray[1])]));
    	setRectangle(coordArray[0], coordArray[1], coordArray[2], zoom)
    	jQuery('#search-place-atom').css('color', 'white');
    	jQuery('#search-place-atom-sb').css('color', 'white');
    }

    function go_to_colony(lon, lat, zoom) {
		console.log(lat, lon, zoom);
    	MAP.getView().setZoom(parseInt(zoom));
    	MAP.getView().setCenter(ol.proj.fromLonLat([parseFloat(lon), parseFloat(lat)]));
    }

    function setRectangle(lon, lat, error, zoom) {
    	console.log(lon, lat, error, zoom);
    	MAP.removeLayer(vectorMarker);
    	var iconFeatures = [];
    	var markerStyle = new ol.style.Style({
    			stroke: new ol.style.Stroke({
    				color: '#ff0000',
    				width: 1
    			}),
    			fill: new ol.style.Fill({
    				color: 'rgba(255,255,255,0.01)'
    			})
    		}),
    		lon = parseFloat(lon);
    	lat = parseFloat(lat);
    	error = parseFloat(error);
    	if (error == 0) {
    		error = 0.1;
    	}
    	console.log(error);
    	//Holds the Polygon feature  
    	var polyFeature = new ol.Feature({
    		geometry: new ol.geom.Polygon([
    			[
    				[lon + error, lat - error],
    				[lon + error, lat + error],
    				[lon - error, lat + error],
    				[lon - error, lat - error],
    				[lon + error, lat - error]
    			]
    		])
    	});
    	polyFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    	//Holds the Point feature
    	var pointFeature = new ol.Feature({
    		geometry: new ol.geom.Point(
    			[lon, lat])
    	});
    	pointFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    	//A vector layer to hold the features
    	vectorMarker = new ol.layer.Vector({
    		source: new ol.source.Vector({
    			features: [
    				polyFeature,
    				pointFeature
    			]
    		}),
    		style: markerStyle
    	});
    	MAP.addLayer(vectorMarker);
    }
    /*Starting the map*/
    function showMap() {
    	mapInit();
    	if (MAPLOADED == true) {
    		jQuery('#map').css('display', 'block');
    		return;
    	}
    	/**
    	 * Elements that make up the popup.
    	 */
    	var container = document.getElementById('popup');
    	var content = document.getElementById('popup-content');
    	var closer = document.getElementById('popup-closer');
    	/**
    	 * Create an overlay to anchor the popup to the map.
    	 */
    	var overlay = new ol.Overlay({
    		element: container,
    		autoPan: true,
    		autoPanAnimation: {
    			duration: 250
    		}
    	});
    	stamen_source = new ol.source.Stamen({
    		layer: 'toner'
    	});
    	OSM_source = new ol.source.OSM({});
    	open_topo_source = new ol.source.XYZ({
    		url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
    		attributions: " © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)"
    	});
    	var VectorSource = new ol.source.Vector({
    		format: new ol.format.GeoJSON(),
    		projection: "EPSG:3857",
    		url: '/plugins/arPotsdamPlugin/tmp/features.geojson'
    	});
    	vectorPoints = new ol.layer.Vector({
    		visible: false,
    		source: VectorSource,
    		style: StyleFunction,
    		zIndex: 100
    	});
    	vectorMarker = new ol.layer.Vector({
    			visible: true,
    			zIndex: 101
    		}),
    		/**
    		 * Add a click handler to hide the popup.
    		 * @return {boolean} Don't follow the href.
    		 */
    		/**
    		var vectorSource = new ol.source.Vector({
    		    url: 'https://openlayers.org/en/v5.0.0/examples/data/geojson/countries.geojson',
    		    format: new ol.format.GeoJSON()
    		});
    		*/
    		HISTORICLAYER = new ol.layer.Tile({
    			source: new ol.source.OSM({
    				url: '/plugins/arPotsdamPlugin/images/tiles/{z}/{x}/{-y}.png',
    				attributions: '<p id="map-attribution"></p>'
    			})
    		});
    	BASE_LAYER = new ol.layer.Tile({
    		source: OSM_source
    	})
    	MAP = new ol.Map({
    		controls: ol.control.defaults().extend([
				new ol.control.Rotate(),
    			new ol.control.FullScreen(),
    			new ol.control.OverviewMap({
    				collapsed: true
    			}),
    			new ol.control.ScaleLine({
    				className: 'ol-scale-line',
    				minWidth: 64,
    				target: document.getElementById('scale')
    			}),
    			new ol.control.Zoom({
    				minWidth: 120
    			})
    		]),
    		overlays: [overlay],
    		target: 'map',
    		layers: [
    			BASE_LAYER,
    			HISTORICLAYER,
    			vectorPoints,
    			vectorMarker
    		],
    		view: new ol.View({
    			center: ol.proj.fromLonLat([11.41, 3.82]),
    			zoom: 2,
    			minZoom: 3,
    			maxZoom: 19
    		})
    	});
    	var closebutton = document.createElement('close-button');
    	closebutton.innerHTML = 'x';
    	var handleClose = function(e) {};
    	closebutton.addEventListener('click', handleClose, false);
    	var element = document.createElement('div');
    	element.className = 'closeMap ol-unselectable ol-control';
    	element.appendChild(closebutton);
    	var CloseControl = new ol.control.Control({
    		element: element
    	});
    	MAP.addControl(CloseControl);
    	MAP.on('movestart', function(evt) {
    		jQuery('.ol-full-screen-false').animate({
    			opacity: 1
    		});
    	});
    	MAP.on('moveend', function(evt) {
    		var zoom = MAP.getView().getZoom();
    		jQuery('#zoom').text(zoom);
    		jQuery('#zoom-sb').text(zoom);
    		var coord = ol.proj.transform(MAP.getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
    		var currentHistMap = getCurrentHistMap(coord, zoom);
    		currentHistMap['title'] = currentHistMap['title'].replace(/\/|in/g, "<br>")
    		jQuery('#map-attribution').html("");
    		jQuery('#map-attribution').html(currentHistMap['title'] + "<br /><strong>" + currentHistMap['year'] + "; </strong><i>" + __('Maßstab') + ": " + currentHistMap['scale'] + '</i><br /><a target="_blank" href="' + currentHistMap['url'] + '">' + currentHistMap['library'] + '</a>');
    		jQuery('#sidebar-map-attribution').html("<div><strong>Source</strong><br />" + jQuery('#map-attribution').html() + "</div>");
    		jQuery('.ol-full-screen-false').animate({
    			height: "1.375em"
    		});
    		jQuery('.ol-full-screen-false').animate({
    			width: "1.375em"
    		});
    		jQuery('#permanent-link a').attr("href",document.location.origin + "/map?coord=" + coord[0] + '+'+coord[1]+'+'+zoom);
    	});
    	MAP.on('postrender', function(evt) {
    		if (parseInt(jQuery('.ol-viewport').css('width').slice(0, -2)) < 350) {
    			jQuery('.ol-attribution').attr('class', "ol-attribution ol-unselectable ol-control ol-collapsed");
    			jQuery('.ol-scale-line').css('visibility', 'hidden');
    		} else {
    			jQuery('.ol-scale-line').css('visibility', 'visible');
    		}
    	});
    	MAP.on('singleclick', function(evt) {
    			var coordinate = evt.coordinate;
    			var i = 0;
    			this.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
    				i += 1
    				console.log(feature);
    				var coords = feature.getGeometry().getCoordinates();
    				console.log(coords);
    				if (feature.get('id')) {
    					window.open("https://www.wikidata.org/wiki/" + feature.get("id"), "_blank");
    				}
    			})
    		}),
    		MAP.on('pointermove', function(evt) {
    			var coordinate = evt.coordinate;
    			if (jQuery('#show-coord-lon').attr("name") == "xy") {
    				var coord = ol.coordinate.toStringXY(ol.proj.transform(
    					coordinate, 'EPSG:3857', 'EPSG:4326'), 4);
    				var lon = coord.split(",")[0];
    				var lat = coord.split(",")[1]
    			} else {
    				var coord = ol.coordinate.toStringHDMS(ol.proj.transform(
    					coordinate, 'EPSG:3857', 'EPSG:4326'), 4);
    				var lon = coord.slice(0, coord.search(/[S|N]/) + 1);
    				var lat = coord.slice(coord.search(/[S|N]/) + 1);
    			}
    			jQuery('#show-coord-lon').text(lon);
    			jQuery('#show-coord-lat').text(lat);
    			jQuery('#show-coord-lon-sb').text(lon);
    			jQuery('#show-coord-lat-sb').text(lat);
    		});
    	MAP.once('postrender', function(event) {
    		MAPLOADED = true;
    	});
    	/*Create the GRATICULE component , but the setmap method is not working in Firefox*/
    	GRATICULE = new ol.Graticule({
    		strokeStyle: new ol.style.Stroke({
    			color: 'rgba(255,120,0,0.9)',
    			width: 2,
    			lineDash: [0.5, 4]
    		}),
    		targetSize: 200,
    		showLabels: true
    	});
    	vectorPoints.getSource().on('change', function(evt) {
    		var source = evt.target;
    		if (source.getState() === 'ready') {
    			var numFeatures = source.getFeatures()[source.getFeatures().length - 1].getGeometry().getCoordinates();
    		}
    	});
    	var source = MAP.getLayers().item(1).getSource()
    	var tileUrlFunction = source.getTileUrlFunction()
    	source.on('tileloadend', function(evt) {});
    	var controls = MAP.getControls();
    	var attributionControl;
    	controls.forEach(function(el) {
    		///console.log(el instanceof ol.control.Attribution);
    		if (el instanceof ol.control.Attribution) {
    			attributionControl = el;
    		}
    	});
    	attributionControl.setCollapsed(true);
    	var params = get_search();
    	if (params.hasOwnProperty('pos')) {
    		var search = params['pos'];
    		var coordArray = search.split('+');
    		console.log(coordArray);
    		MAP.getView().setZoom(parseInt(coordArray[2]));
    		MAP.getView().setCenter(ol.proj.fromLonLat([parseFloat(coordArray[0]), parseFloat(coordArray[1])]));
    		HISTORICLAYER.setOpacity(parseInt(coordArray[3]));
    	}
    	add_controls()
    }

    function getCurrentHistMap(coord, zoom) {
    	var best = 0;
    	var lat = coord[1];
    	var lon = coord[0];
    	for (var i = 1; i < MAPS.length; i++) {
    		if (MAPS[i]["zoomLevel"] != "") {
    			if (MAPS[i]["xMaximum"] > lon && MAPS[i]["xMinimum"] < lon && MAPS[i]["yMaximum"] > lat && MAPS[i]["yMinimum"] < lat && MAPS[i]["zoomLevel"] > MAPS[best]['zoomLevel'] && MAPS[i]['zoomLevel'] <= zoom) {
    				best = i;
    			}
    		}
    	}
    	return MAPS[best];
    }

    function StyleFunction(feature, resolution) {
    	console.log(resolution);
    	var scale = 3 / (Math.sqrt(Math.sqrt(resolution)));
    	var color_value = 'rgba(255, 0, 0, 0.9)';
    	var image_src = "";
    	if (feature.get('instance') == WD_COLONY) {
    		image_src = "/plugins/arPotsdamPlugin/images/map_icons/colony.svg";
    		color_value = 'rgba(0,255, 0, 0.9)';
    	};
    	if (feature.get('instance') == WD_MISSION) {
    		image_src = "/plugins/arPotsdamPlugin/images/map_icons/mission.svg";
    		color_value = 'rgba(0,0, 255, 0.9)';
    	};
    	if (feature.get('instance') == WD_ENTERPRISE) {
    		image_src = "/plugins/arPotsdamPlugin/images/map_icons/business.svg";
    		color_value = 'rgba(255,255,0, 0.9)';
    	};
    	if (feature.get('instance') == WD_EDUCATION) {
    		image_src = "/plugins/arPotsdamPlugin/images/map_icons/education.svg";
    		color_value = 'rgba(255,255,0, 0.9)';
    	};
    	if (feature.get('instance') == WD_AUTHORITY) {
    		image_src = "/plugins/arPotsdamPlugin/images/map_icons/authority.svg";
    		color_value = 'rgba(255,255,0, 0.9)';
    	};
    	if (feature.get('instance') == WD_MILITARY) {
    		image_src = "/plugins/arPotsdamPlugin/images/map_icons/flag.svg";
    		color_value = 'rgba(255,255,0, 0.9)';
    	};
    	if (feature.get('instance') == WD_EVENT) {
    		image_src = "/plugins/arPotsdamPlugin/images/map_icons/event.svg";
    		color_value = 'rgba(255,255,0, 0.9)';
    	};
    	if (image_src == "") {
    		image_src = "/plugins/arPotsdamPlugin/images/map_icons/general.svg";
    		color_value = 'rgba(255,255,0, 0.9)';
    	};
    	if (image_src != "") {
    		image = new ol.style.Icon({
    			scale: scale,
    			src: image_src
    		})
    	}
    	return new ol.style.Style({
    		image: image,
    		text: new ol.style.Text({
    			font: '12px helvetica,sans-serif',
    			text: feature.get('name'),
    			offsetX: 15,
    			textAlign: 'left',
    			textBaseline: 'top',
    			fill: new ol.style.Fill({
    				color: '#000'
    			}),
    			stroke: new ol.style.Stroke({
    				color: '#fff',
    				width: 2
    			})
    		})
    	});
    }

    function base_layer_change(element) {
    	console.log(element);
    	var optionSelected = jQuery("option:selected", element);
    	var valueSelected = element.val();
    	console.log(valueSelected);
    	if (valueSelected == "osm") {
    		BASE_LAYER.setSource(OSM_source);
    	}
    	if (valueSelected == "opentopo") {
    		BASE_LAYER.setSource(open_topo_source);
    	}
    	if (valueSelected == "stamen") {
    		BASE_LAYER.setSource(stamen_source);
    	}
    	console.log(BASE_LAYER.getSource());
    }

    function vector_layer_switch() {
    	var newVisibility = !(vectorPoints.get('visible'));
    	vectorPoints.set('visible', newVisibility);
    }

    function overlay_change(event, elem) {
    	event.stopPropagation();
    	HISTORICLAYER.setOpacity((elem.val() / 10))
    	if (jQuery(elem).val() == 10) {
    		jQuery('#opacity-switch').prop('checked', true);
    		jQuery('#opacity-switch-sb').prop('checked', true);
    	} else {
    		jQuery('#opacity-switch').prop('checked', false);
    		jQuery('#opacity-switch-sb').prop('checked', false);
    	}
    }

    function coord_change() {
    	if (jQuery('#show-coord-lon').attr("name") == "xy") {
    		jQuery('#show-coord-lon').attr("name", "")
    	} else {
    		jQuery('#show-coord-lon').attr("name", "xy");
    	}
    }

    function geohack_click() {
    	var coord = ol.proj.transform(MAP.getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
    	var lon = coord[0];
    	var lat = coord[1];
    	if (lon <= 0) {
    		lon = (lon * -1) + "_W";
    	} else {
    		lon = lon + "_E";
    	}
    	if (lat >= 0) {
    		lat = (lat * -1) + "_S_";
    	} else {
    		lat = (lat) + "_N_";
    	}
    	window.open('https://tools.wmflabs.org/geohack/geohack.php?language=' + culture + '&params=' + lat + lon, "_blank");
    }

    function opacity_switch() {
    	if (HISTORICLAYER.getOpacity() == 1) {
    		HISTORICLAYER.setOpacity(0);
    	} else {
    		HISTORICLAYER.setOpacity(1);
    	}
    	var newVisibility = !(vectorPoints.get('visible'));
    	vectorPoints.set('visible', newVisibility);
    	if (jQuery('#opacity-switch').is(':checked')) {
    		HISTORICLAYER.setOpacity(1);
    		jQuery('#overlay').val(10);
    		jQuery('#overlay-sb').val(10);
    	} else {
    		HISTORICLAYER.setOpacity(0);
    		jQuery('#overlay').val(0);
    		jQuery('#overlay-sb').val(0);
    	}
    	if (jQuery('#vector-layer-switch').is(':checked') || jQuery('#vector-layer-switch-sb').is(':checked')) {
    		vectorPoints.set('visible', true);
    	} else {
    		vectorPoints.set('visible', false);
    	}
    }
    MAPS = [{
    		"year": 1907,
    		"title": "Grosser deutscher Kolonialatlas / No 1. Erdkarte zur Übersicht des deutschen Kolonialbesitzes",
    		"scale": "1:50.000.000",
    		"xMaximum": 181.01885816947785,
    		"yMinimum": -77.13516774150901,
    		"yMaximum": 100.9293770046126,
    		"xMinimum": -85.78957827506356,
    		"zoomLevel": 3,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1913,
    		"title": "Afrika, Staatenkarte in: Diercke-Schulatlas für höhere Lehranstalten",
    		"scale": "1:30.000.000",
    		"xMaximum": 80.36184044526638,
    		"yMinimum": -37.74633392578312,
    		"yMaximum": 51.97971564534052,
    		"xMinimum": -43.077878387870115,
    		"zoomLevel": 5,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9434280",
    		"code": ""
    	},
    	{
    		"year": 1893,
    		"title": "Politische Karte von Europa in: Andree-Putzgers Gymnasial- und Realschulatlas",
    		"scale": "1:20.000.000",
    		"xMaximum": 87.80474372853176,
    		"yMinimum": 22.43678855635565,
    		"yMaximum": 109.65063778278282,
    		"xMinimum": -37.416176337921044,
    		"zoomLevel": 5,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9953372",
    		"code": ""
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / Übersichtskarte über die deutschen Besitzungen im Stillen Ocean und von Kiautschou",
    		"scale": "1:15.000.000",
    		"xMaximum": -160.71654663278412,
    		"yMinimum": -20.254725079152692,
    		"yMaximum": 43.958334151262896,
    		"xMinimum": -85.66520041428655,
    		"zoomLevel": 5,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Stiller Ocean"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / Übersichtskarte über die deutschen Besitzungen im Stillen Ocean und von Kiautschou",
    		"scale": "1:15.000.000",
    		"xMaximum": 179.9145342721137,
    		"yMinimum": -20.68457353753051,
    		"yMaximum": 45.47293906044742,
    		"xMinimum": 71.52685116411413,
    		"zoomLevel": 5,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Stiller Ocean 2"
    	},
    	{
    		"year": 1912,
    		"title": "Die deutschen Kolonien / Deutsch-Ostafrika",
    		"scale": "1:12.000.000",
    		"xMaximum": 39.77289350800684,
    		"yMinimum": -11.658570872362986,
    		"yMaximum": -0.38761259596746006,
    		"xMinimum": 20.7917158717395,
    		"zoomLevel": 7,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9165951",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Die deutschen Kolonien / Deutsch-Südwestafrika",
    		"scale": "1:12.000.000",
    		"xMaximum": 25.884099626339967,
    		"yMinimum": -29.452667192726892,
    		"yMaximum": -17.105282553668317,
    		"xMinimum": 10.994114765761054,
    		"zoomLevel": 7,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9165951",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Die deutschen Kolonien / Kamerun",
    		"scale": "1:12.000.000",
    		"xMaximum": 19.215032430135754,
    		"yMinimum": -1.5279910153946474,
    		"yMaximum": 13.852665190640815,
    		"xMinimum": 4.860457031178115,
    		"zoomLevel": 7,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9165951",
    		"code": ""
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K3 West-Karolinen, Fortsetzung",
    		"scale": "1:9.000.000",
    		"xMaximum": 135.59437866598745,
    		"yMinimum": 0.6041509588921912,
    		"yMaximum": 7.040253633554335,
    		"xMinimum": 78.39116068640996,
    		"zoomLevel": 7,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Karolinen Fortsetzung"
    	},
    	{
    		"year": 1912,
    		"title": "Die deutschen Kolonien / Kiautschou",
    		"scale": "1:6.000.000",
    		"xMaximum": 123.29585008330544,
    		"yMinimum": 34.687869762987276,
    		"yMaximum": 42.868463416112895,
    		"xMinimum": 74.61068517311932,
    		"zoomLevel": 7,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9165951",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Die deutschen Kolonien / Togo",
    		"scale": "1:6.000.000",
    		"xMaximum": 4.018159191849212,
    		"yMinimum": 5.474815497830207,
    		"yMaximum": 11.515762746379593,
    		"xMinimum": -3.179025984137539,
    		"zoomLevel": 7,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9165951",
    		"code": ""
    	},
    	{
    		"year": 1910,
    		"title": "Grosser deutscher Kolonialatlas / No 30. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 6. Kiautschou und Samoa / K1 Samoa-Inseln",
    		"scale": "1:5.000.000",
    		"xMaximum": -167.78214599993905,
    		"yMinimum": -14.8352295606538,
    		"yMaximum": -13.268911588060698,
    		"xMinimum": -84.42812078627249,
    		"zoomLevel": 8,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": ""
    	},
    	{
    		"year": 1914,
    		"title": "Kamerun in: Kolonial-Missions-Atlas",
    		"scale": "1:5.000.000",
    		"xMaximum": 19.258178803351473,
    		"yMinimum": -1.555347347154381,
    		"yMaximum": 13.049658688556159,
    		"xMinimum": 7.116666791711822,
    		"zoomLevel": 8,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "https://digital.staatsbibliothek-berlin.de/werkansicht?PPN=PPN755666496&DMDID=DMDLOG_0001&PHYSID=PHYS_0001",
    		"code": ""
    	},
    	{
    		"year": 1913,
    		"title": "Deutsches Reich in: Schul-Atlas für höhere Lehranstalten",
    		"scale": "1:3.000.000",
    		"xMaximum": 23.352825806505603,
    		"yMinimum": 45.802962879976576,
    		"yMaximum": 67.88083761770858,
    		"xMinimum": 3.3363048618004854,
    		"zoomLevel": 8,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9385390",
    		"code": "Deutsches Reich"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 28. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / Die Marianen",
    		"scale": "1:3.000.000",
    		"xMaximum": 147.9739775270531,
    		"yMinimum": 9.12363756860853,
    		"yMaximum": 21.350911443553702,
    		"xMinimum": 80.41645289740975,
    		"zoomLevel": 7,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Marianen"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 28. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / Die Marshall Inseln",
    		"scale": "1:3.000.000",
    		"xMaximum": 172.11848019594615,
    		"yMinimum": 2.859850222912442,
    		"yMaximum": 13.867323570383139,
    		"xMinimum": 81.70763476568533,
    		"zoomLevel": 8,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Marshall"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 28. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / K2 Eniwetok und Ujelang Inseln",
    		"scale": "1:3.000.000",
    		"xMaximum": 162.7555370863581,
    		"yMinimum": 9.384082998921528,
    		"yMaximum": 12.056317779462907,
    		"xMinimum": 83.0598131338813,
    		"zoomLevel": 7,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Eniwetok"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / [1]. West-Karolinen",
    		"scale": "1:3.000.000",
    		"xMaximum": 147.66456849495805,
    		"yMinimum": 4.628060046550445,
    		"yMaximum": 10.281094484030106,
    		"xMinimum": 77.33926680807687,
    		"zoomLevel": 8,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA West-Karolinen"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / [2]. Ost-Karolinen",
    		"scale": "1:3.000.000",
    		"xMaximum": 163.08327636521443,
    		"yMinimum": 3.440019297130817,
    		"yMaximum": 10.165493042462971,
    		"xMinimum": 80.41274568887553,
    		"zoomLevel": 8,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Ost-Karolinen"
    	},
    	{
    		"year": 1912,
    		"title": "Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer",
    		"scale": "1:2.000.000",
    		"xMaximum": 21.391525368620194,
    		"yMinimum": -28.9838755036764,
    		"yMaximum": -22.94591258688222,
    		"xMinimum": 10.817690799871558,
    		"zoomLevel": 10,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB107881209",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer",
    		"scale": "1:2.000.000",
    		"xMaximum": 21.161904221313296,
    		"yMinimum": -23.085242657211936,
    		"yMaximum": -16.919583348729308,
    		"xMinimum": 10.859487076444767,
    		"zoomLevel": 10,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB107881209",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer",
    		"scale": "1:2.000.000",
    		"xMaximum": 25.25036041923887,
    		"yMinimum": -18.41332398519549,
    		"yMaximum": -17.397946326955857,
    		"xMinimum": 20.969634206446873,
    		"zoomLevel": 10,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB107881209",
    		"code": ""
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 26. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 2. Deutsch-Neuguinea / Westliches Blatt",
    		"scale": "1:2.000.000",
    		"xMaximum": 148.73400744667347,
    		"yMinimum": -983293.7005036087,
    		"yMaximum": 22006.9655057583,
    		"xMinimum": 14977475.500040106,
    		"zoomLevel": 9,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": "GKA DNG West"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 27. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 3. Deutsch-Neuguinea / Östliches Blatt",
    		"scale": "1:2.000.000",
    		"xMaximum": 156.57045494916667,
    		"yMinimum": -8.773780491192781,
    		"yMaximum": 0.18041639989377467,
    		"xMinimum": 81.44028995441815,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DNG Ost"
    	},
    	{
    		"year": 1910,
    		"title": "Grosser deutscher Kolonialatlas / No 30. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 6. Kiautschou und Samoa / Kiautschou und Umgebung",
    		"scale": "1:2.000.000",
    		"xMaximum": 122.7721752933535,
    		"yMinimum": 32.896755753491504,
    		"yMaximum": 41.4105838698452,
    		"xMinimum": 72.395420128074,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kiautschou Umgebung"
    	},
    	{
    		"year": 1904,
    		"title": "Karte des Kriegsschauplatzes in Deutsch-Südwest-Afrika zur Veranschaulichung des Aufstandes der Herrero, Bondelzwarts und Ovambo",
    		"scale": "1:2.000.000",
    		"xMaximum": 20.153728204397066,
    		"yMinimum": -29.279475422487835,
    		"yMaximum": -16.850453142778054,
    		"xMinimum": 10.49036929671523,
    		"zoomLevel": 9,
    		"library": "Staats- und Universitätsbibliothek Hamburg",
    		"url": "http://resolver.sub.uni-hamburg.de/goobi/PPN865588775",
    		"code": ""
    	},
    	{
    		"year": 1906,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 1. Usumbura",
    		"scale": "1:1.000.000",
    		"xMaximum": 32.881408102168145,
    		"yMinimum": -4.570607656414067,
    		"yMaximum": -0.8481792822748708,
    		"xMinimum": 28.613023566488533,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 1"
    	},
    	{
    		"year": 1911,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 2. Muansa",
    		"scale": "1:1.000.000",
    		"xMaximum": 37.12684311608528,
    		"yMinimum": -4.570057366528592,
    		"yMaximum": -0.8481790864790263,
    		"xMinimum": 32.87318634022139,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 2"
    	},
    	{
    		"year": 1910,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 3. Kilimandscharo",
    		"scale": "1:1.000.000",
    		"xMaximum": 41.36797637124903,
    		"yMinimum": -4.569830554878231,
    		"yMaximum": -0.846877644318407,
    		"xMinimum": 37.12026221084777,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 3"
    	},
    	{
    		"year": 1906,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 4. Udjidji",
    		"scale": "1:1.000.000",
    		"xMaximum": 32.849560259060695,
    		"yMinimum": -8.285319188989803,
    		"yMaximum": -4.566823358296665,
    		"xMinimum": 28.608890247635546,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 4"
    	},
    	{
    		"year": 1904,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 5. Kilimatinde",
    		"scale": "1:1.000.000",
    		"xMaximum": 37.12355039112416,
    		"yMinimum": -8.289191966166381,
    		"yMaximum": -4.558748355489379,
    		"xMinimum": 32.87005667369986,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 5"
    	},
    	{
    		"year": 1903,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 6. Daressalam",
    		"scale": "1:1.000.000",
    		"xMaximum": 41.43561700743382,
    		"yMinimum": -8.290815396201925,
    		"yMaximum": -4.568169145995617,
    		"xMinimum": 37.126490901403415,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 6"
    	},
    	{
    		"year": 1910,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 7. Bismarckburg",
    		"scale": "1:1.000.000",
    		"xMaximum": 32.86757567887704,
    		"yMinimum": -12.000836215929022,
    		"yMaximum": -8.281493857044495,
    		"xMinimum": 28.504819662579088,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 7"
    	},
    	{
    		"year": 1904,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 8. Neu-Langenburg",
    		"scale": "1:1.000.000",
    		"xMaximum": 37.18417130172894,
    		"yMinimum": -11.974998529296286,
    		"yMaximum": -8.286232510064382,
    		"xMinimum": 30.281651994555887,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 8"
    	},
    	{
    		"year": 1903,
    		"title": "Grosser deutscher Kolonialatlas / No 16-24. Deutsch-Ostafrika in 9 Bl. / 9. Lindi",
    		"scale": "1:1.000.000",
    		"xMaximum": 40.48798003476795,
    		"yMinimum": -11.886628208094578,
    		"yMaximum": -7.21851320141835,
    		"xMinimum": 32.91961015931565,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA DOA 9"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 28. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / K3 Jaluit Inseln",
    		"scale": "1:1.000.000",
    		"xMaximum": 169.86461184983165,
    		"yMinimum": 5.634183152845239,
    		"yMaximum": 6.47505224576064,
    		"xMinimum": 84.03458859498755,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Jaluit"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 28. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / K4 Majuro und Arno Inseln",
    		"scale": "1:1.000.000",
    		"xMaximum": 172.0762143807362,
    		"yMinimum": 6.810346092322547,
    		"yMaximum": 7.580519390098861,
    		"xMinimum": 84.19676973045534,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Majuro"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 28. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / K8 Hall Inseln",
    		"scale": "1:1.000.000",
    		"xMaximum": 152.38813062268576,
    		"yMinimum": 8.295393612027581,
    		"yMaximum": 8.897660893273695,
    		"xMinimum": 81.8904909450458,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Hall"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K1 Ululssi Inseln",
    		"scale": "1:1.000.000",
    		"xMaximum": 140.03233428656134,
    		"yMinimum": 9.581654373971162,
    		"yMaximum": 10.206890737471587,
    		"xMinimum": 79.97843846623971,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Ululssi"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K12 Truk-, Nomituk-,Länomituk-Inseln",
    		"scale": "1:1.000.000",
    		"xMaximum": 152.1573450073262,
    		"yMinimum": 6.949669235831976,
    		"yMaximum": 7.827175147620108,
    		"xMinimum": 81.85087272891121,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Truk"
    	},
    	{
    		"year": 1912,
    		"title": "Grosser deutscher Kolonialatlas / No 3-6, 8-8 d. Kamerun in 10 Bl. / 10. Bonga",
    		"scale": "1:1.000.000",
    		"xMaximum": 18.853888313501706,
    		"yMinimum": -2.2367268365689346,
    		"yMaximum": 1.5597205622641632,
    		"xMinimum": 16.877023103872162,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 10"
    	},
    	{
    		"year": 1911,
    		"title": "Grosser deutscher Kolonialatlas / No 3-6, 8-8 d. Kamerun in 10 Bl. / 6. Lomiē",
    		"scale": "1:1.000.000",
    		"xMaximum": 16.878053519501215,
    		"yMinimum": 1.5932736062235797,
    		"yMaximum": 5.42082119130749,
    		"xMinimum": 12.666551317731773,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 6"
    	},
    	{
    		"year": 1912,
    		"title": "Grosser deutscher Kolonialatlas / No 3-6, 8-8 d. Kamerun in 10 Bl. / 7. Mbaiki",
    		"scale": "1:1.000.000",
    		"xMaximum": 18.8578360090631,
    		"yMinimum": 1.5938226327241485,
    		"yMaximum": 5.4229378670277155,
    		"xMinimum": 16.878006143239624,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 7"
    	},
    	{
    		"year": 1914,
    		"title": "Grosser deutscher Kolonialatlas / No 3-6, 8-8 d. Kamerun in 10 Bl. / 8. Ukoko",
    		"scale": "1:1.000.000",
    		"xMaximum": 12.666203013069463,
    		"yMinimum": -2.2407977874524017,
    		"yMaximum": 1.5788651475345388,
    		"xMinimum": 8.454175845175907,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 8"
    	},
    	{
    		"year": 1914,
    		"title": "Grosser deutscher Kolonialatlas / No 3-6, 8-8 d. Kamerun in 10 Bl. / 9. Ikelemba",
    		"scale": "1:1.000.000",
    		"xMaximum": 16.879971649688404,
    		"yMinimum": -2.2430459117496278,
    		"yMaximum": 1.576596200173252,
    		"xMinimum": 12.666025385866048,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 9"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 3-6, 8-8d. Kamerun in 10 Bl. / 2. Tschad",
    		"scale": "1:1.000.000",
    		"xMaximum": 16.932273941315906,
    		"yMinimum": 9.243338790516177,
    		"yMaximum": 13.083070891652238,
    		"xMinimum": 12.660774009204232,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 2"
    	},
    	{
    		"year": 1911,
    		"title": "Grosser deutscher Kolonialatlas / No 3-6, 8-8d. Kamerun in 10 Bl. / 3. Fumbán",
    		"scale": "1:1.000.000",
    		"xMaximum": 12.670026695036196,
    		"yMinimum": 5.418479432717682,
    		"yMaximum": 9.246443586202224,
    		"xMinimum": 8.408838893579206,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 3"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 3-6, 8-8d. Kamerun in 10 Bl. / 4. Ngaundere",
    		"scale": "1:1.000.000",
    		"xMaximum": 16.89082925187855,
    		"yMinimum": 5.416043135437853,
    		"yMaximum": 9.243692275847074,
    		"xMinimum": 12.666106765722025,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 4"
    	},
    	{
    		"year": 1901,
    		"title": "Grosser deutscher Kolonialatlas / No. 7 = 14-07, No. 12-1. Kamerun in 6 Blättern / Bl. 5. Buea",
    		"scale": "1:1.000.000",
    		"xMaximum": 13.15509203064947,
    		"yMinimum": 1.5871403833228213,
    		"yMaximum": 5.417256976233956,
    		"xMinimum": 8.285140515268212,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kamerun 5"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Andara",
    		"scale": "1:800.000",
    		"xMaximum": 22.574211717337608,
    		"yMinimum": -22.024816845576243,
    		"yMaximum": -17.39700319811933,
    		"xMinimum": 19.930460724351963,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Andara"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Keetmanshoop",
    		"scale": "1:800.000",
    		"xMaximum": 20.101040476611615,
    		"yMinimum": -27.005291952868088,
    		"yMaximum": -24.992558908320788,
    		"xMinimum": 13.961848244512504,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Keetmanshoop"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Linjanti",
    		"scale": "1:800.000",
    		"xMaximum": 25.463908821816325,
    		"yMinimum": -18.613048005710066,
    		"yMaximum": -17.39283788765773,
    		"xMinimum": 22.433250090665105,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Lintjani"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Otawi",
    		"scale": "1:800.000",
    		"xMaximum": 20.06189944228028,
    		"yMinimum": -21.09242417089694,
    		"yMaximum": -18.996588614631076,
    		"xMinimum": 13.947706666689776,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Otawi"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Owambo",
    		"scale": "1:800.000",
    		"xMaximum": 20.033445885541177,
    		"yMinimum": -19.001952967574322,
    		"yMaximum": -16.987912150226613,
    		"xMinimum": 13.950139965804384,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Owambo"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Rehoboth",
    		"scale": "1:800.000",
    		"xMaximum": 20.061472994494128,
    		"yMinimum": -25.009415684086616,
    		"yMaximum": -22.99727703907638,
    		"xMinimum": 13.93775110194842,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Rehoboth"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Warmbad",
    		"scale": "1:800.000",
    		"xMaximum": 20.130361238951345,
    		"yMinimum": -29.374406089311314,
    		"yMaximum": -26.979248498737526,
    		"xMinimum": 13.91354049456577,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Warmbad"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Windhuk",
    		"scale": "1:800.000",
    		"xMaximum": 20.0402389863975,
    		"yMinimum": -23.00761484433641,
    		"yMaximum": -20.98783614883291,
    		"xMinimum": 13.965254686177213,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Windhuk"
    	},
    	{
    		"year": 1904,
    		"title": "Kriegskarte von Deutsch-Südwestafrika von Paul Sprigade und Max Moisel, Verlag Dietrich Reimer / Blatt Zesfontein",
    		"scale": "1:800.000",
    		"xMaximum": 14.053096618365956,
    		"yMinimum": -22.022833358999513,
    		"yMaximum": -16.988750923359433,
    		"xMinimum": 11.391821672855237,
    		"zoomLevel": 11,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB090458966",
    		"code": "KK DSWA Zesfontein"
    	},
    	{
    		"year": 1914,
    		"title": "Deutsch-Südwestafrika / Beilage zum Deutsch-Südwestafrikanischen Adressbuch",
    		"scale": "1:500.000",
    		"xMaximum": 25.275645074153495,
    		"yMinimum": -29.239324730878835,
    		"yMaximum": -16.88943527117954,
    		"xMinimum": 10.249658325410664,
    		"zoomLevel": 8,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "http://sammlungen.ub.uni-frankfurt.de/kolonialbibliothek/periodical/pageview/7754427",
    		"code": ""
    	},
    	{
    		"year": 1907,
    		"title": "Grosser deutscher Kolonialatlas / No 2 a, b. Togo in 2 Bl. / 1. Nördliches Blatt",
    		"scale": "1:500.000",
    		"xMaximum": 1.7852189098415678,
    		"yMinimum": 8.62186282508365,
    		"yMaximum": 11.176003780326702,
    		"xMinimum": -0.516629099720653,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Togo 1"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 2 a, b. Togo in 2 Bl. / 2. Südliches Blatt",
    		"scale": "1:500.000",
    		"xMaximum": 1.8895956061179646,
    		"yMinimum": 6.0783515818158165,
    		"yMaximum": 8.633850425813144,
    		"xMinimum": -0.5037624213946964,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Togo 2"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 28. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / K1 Saipan und Tinian",
    		"scale": "1:500.000",
    		"xMaximum": 145.9412263221482,
    		"yMinimum": 14.823848561123754,
    		"yMaximum": 15.601756360487597,
    		"xMinimum": 80.97092307218773,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Saipan"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen   / K11 Pulap-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 149.49460192807047,
    		"yMinimum": 7.511996701209483,
    		"yMaximum": 7.758460373681936,
    		"xMinimum": 81.55909199630526,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Pulap"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen  / K13 Lossop-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 152.7824425503999,
    		"yMinimum": 6.8043415317365685,
    		"yMaximum": 7.1170581259325125,
    		"xMinimum": 82.01466842290083,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Lossop"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen  / K15 Nukuoro-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 155.01775887801645,
    		"yMinimum": 3.797203455526329,
    		"yMaximum": 3.953797629318066,
    		"xMinimum": 82.33466824323389,
    		"zoomLevel": "",
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Nukuro"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen  / K16 Ngatik-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 157.41983665456013,
    		"yMinimum": 5.738646811595828,
    		"yMaximum": 5.959576305269947,
    		"xMinimum": 82.62863765470567,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Ngatik"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen  / K14 Namuluk-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 153.20511450218464,
    		"yMinimum": 5.875533907533352,
    		"yMaximum": 6.0330123182227195,
    		"xMinimum": 82.08532491167264,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Namuluk"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen  / K9 Nomoi-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 153.89001354795465,
    		"yMinimum": 5.22566019748804,
    		"yMaximum": 5.684584846354015,
    		"xMinimum": 82.13863450447889,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Nomoi"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K17 Mokil-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 159.8473912997866,
    		"yMinimum": 6.64206823602143,
    		"yMaximum": 6.789386686400079,
    		"xMinimum": 82.94798050925036,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Mokil"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K18 Pingelap-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 160.7865737470116,
    		"yMinimum": 6.167717509798607,
    		"yMaximum": 6.335174605865978,
    		"xMinimum": 83.05821549388057,
    		"zoomLevel": "",
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Pingelap"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K19 Kusaie-Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 163.10981348709956,
    		"yMinimum": 5.233425161770043,
    		"yMaximum": 5.477362445905489,
    		"xMinimum": 83.32486607741433,
    		"zoomLevel": 11,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kusaie"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K4 Palau Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 135.81798688344583,
    		"yMinimum": 6.427012568572621,
    		"yMaximum": 7.807906527796664,
    		"xMinimum": 76.29981591734102,
    		"zoomLevel": 11,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Palau"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K7 Elato und Lamnutrik Inseln",
    		"scale": "1:500.000",
    		"xMaximum": 146.50687921892407,
    		"yMinimum": 7.308813923783887,
    		"yMaximum": 7.564835928383627,
    		"xMinimum": 81.07156428629932,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Elato"
    	},
    	{
    		"year": 1910,
    		"title": "Grosser deutscher Kolonialatlas / No 30. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 6. Kiautschou und Samoa / Sawaii",
    		"scale": "1:500.000",
    		"xMaximum": -154.51133884014288,
    		"yMinimum": -13.852596214879114,
    		"yMaximum": -12.242870295643902,
    		"xMinimum": -84.60191230697612,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": ""
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 26. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 2. Deutsch-Neuguinea / K1 Astrolabe-Bai und Umgebung",
    		"scale": "1:300.000",
    		"xMaximum": 145.89307412618373,
    		"yMinimum": -5.541874489491931,
    		"yMaximum": -5.057154514414126,
    		"xMinimum": 80.96781679760832,
    		"zoomLevel": 12,
    		"library": "Georg-Eckert-Institut - Leibniz-Institut für internationale Schulbuchforschung",
    		"url": "http://gei-digital.gei.de/viewer/resolver?urn=urn:nbn:de:0220-gd-9165951",
    		"code": "GKA Astrolabe"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 26. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 2. Deutsch-Neuguinea / K3 Berlinhafen und Reede",
    		"scale": "1:300.000",
    		"xMaximum": 142.5244382114025,
    		"yMinimum": -3.2179162974188813,
    		"yMaximum": -3.093760777708437,
    		"xMinimum": 80.46736641288831,
    		"zoomLevel": 12,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Berlinhafen"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 27. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 3. Deutsch-Neuguinea / K4 Der nordöstliche Teil der Gazelle-Halbinsel",
    		"scale": "1:300.000",
    		"xMaximum": 152.5523355502391,
    		"yMinimum": -4.460830355298739,
    		"yMaximum": -4.049923676235164,
    		"xMinimum": 81.91958252203378,
    		"zoomLevel": 11,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Gazelle"
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  A4 Tchad",
    		"scale": "1:300.000",
    		"xMaximum": 15.233642424948552,
    		"yMinimum": 12.500114181031739,
    		"yMaximum": 13.251901391849117,
    		"xMinimum": 13.552318067833857,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  B3 Dikoa",
    		"scale": "1:300.000",
    		"xMaximum": 14.00011094917744,
    		"yMinimum": 11.000304265280601,
    		"yMaximum": 12.500902591399713,
    		"xMinimum": 12.99994057101034,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  B4 Kusseri",
    		"scale": "1:300.000",
    		"xMaximum": 14.999841346842848,
    		"yMinimum": 11.000451655429195,
    		"yMaximum": 12.500865765483127,
    		"xMinimum": 13.999944453182948,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  B4 Kusseri",
    		"scale": "1:300.000",
    		"xMaximum": 16.000192341057925,
    		"yMinimum": 11.0006259457777,
    		"yMaximum": 12.500812474406828,
    		"xMinimum": 14.999916362751236,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  C3 Mubi",
    		"scale": "1:300.000",
    		"xMaximum": 13.000667329662418,
    		"yMinimum": 9.500232608269553,
    		"yMaximum": 11.000475129881629,
    		"xMinimum": 12.000277613548697,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  C3 Mubi",
    		"scale": "1:300.000",
    		"xMaximum": 14.00109610918453,
    		"yMinimum": 9.500931100104319,
    		"yMaximum": 11.001548388203352,
    		"xMinimum": 13.00015462459963,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  C4 Marua",
    		"scale": "1:300.000",
    		"xMaximum": 14.999467532136743,
    		"yMinimum": 9.501006070799738,
    		"yMaximum": 11.001144695662827,
    		"xMinimum": 13.999754570871934,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  C4 Marua",
    		"scale": "1:300.000",
    		"xMaximum": 15.999572880497169,
    		"yMinimum": 9.500915219528837,
    		"yMaximum": 11.000900069377222,
    		"xMinimum": 14.999810457827522,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  D2 Schebschi",
    		"scale": "1:300.000",
    		"xMaximum": 12.000148828760206,
    		"yMinimum": 7.999989084519387,
    		"yMaximum": 9.000145100115246,
    		"xMinimum": 10.999992813164347,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  D3 Garua",
    		"scale": "1:300.000",
    		"xMaximum": 13.000055239480607,
    		"yMinimum": 8.000076381356632,
    		"yMaximum": 9.500290156350676,
    		"xMinimum": 11.999836793382999,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  D3 Garua",
    		"scale": "1:300.000",
    		"xMaximum": 14.000241304523005,
    		"yMinimum": 7.999500555470261,
    		"yMaximum": 9.500058592069152,
    		"xMinimum": 12.999944939783735,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  D4 Rei-Buba",
    		"scale": "1:300.000",
    		"xMaximum": 14.999920479990385,
    		"yMinimum": 7.999755656633958,
    		"yMaximum": 9.500008371995674,
    		"xMinimum": 13.999979210823806,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  D4 Rei-Buba",
    		"scale": "1:300.000",
    		"xMaximum": 16.000096824371873,
    		"yMinimum": 7.999972891102864,
    		"yMaximum": 9.500129744882619,
    		"xMinimum": 14.999992255185369,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  D5 Kagopal",
    		"scale": "1:300.000",
    		"xMaximum": 17.000263206536495,
    		"yMinimum": 7.999677560428114,
    		"yMaximum": 9.500110944379225,
    		"xMinimum": 15.999974283902421,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  D5 Kagopal",
    		"scale": "1:300.000",
    		"xMaximum": 18.000159411113753,
    		"yMinimum": 7.9996742002439625,
    		"yMaximum": 9.500121401326275,
    		"xMinimum": 16.99993706870413,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E1 Gajama",
    		"scale": "1:300.000",
    		"xMaximum": 9.999920223874998,
    		"yMinimum": 6.499673725634661,
    		"yMaximum": 7.000001396265828,
    		"xMinimum": 9.416394040090262,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E2 Banjo",
    		"scale": "1:300.000",
    		"xMaximum": 12.000744629502975,
    		"yMinimum": 6.501611430767453,
    		"yMaximum": 8.000052259224525,
    		"xMinimum": 10.999660565547446,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E2 Banjo",
    		"scale": "1:300.000",
    		"xMaximum": 10.999919585229994,
    		"yMinimum": 6.498106235365314,
    		"yMaximum": 8.000393848747525,
    		"xMinimum": 9.99915647333296,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E3 Ngaundere",
    		"scale": "1:300.000",
    		"xMaximum": 13.000150275009606,
    		"yMinimum": 6.500114666730662,
    		"yMaximum": 8.000122418149749,
    		"xMinimum": 11.999917626694513,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E3 Ngaundere",
    		"scale": "1:300.000",
    		"xMaximum": 14.000094409121376,
    		"yMinimum": 6.4998065093602655,
    		"yMaximum": 8.000031393053494,
    		"xMinimum": 12.99964007335152,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E4 Mbere",
    		"scale": "1:300.000",
    		"xMaximum": 15.000182883389662,
    		"yMinimum": 6.4999054790620105,
    		"yMaximum": 8.000121913709215,
    		"xMinimum": 14.00003859362486,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E4 Mbere",
    		"scale": "1:300.000",
    		"xMaximum": 15.99990274370267,
    		"yMinimum": 6.4994190168439365,
    		"yMaximum": 8.000033494993163,
    		"xMinimum": 14.999720975350817,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E5 Kulungalu",
    		"scale": "1:300.000",
    		"xMaximum": 17.000243311229784,
    		"yMinimum": 6.499842489561874,
    		"yMaximum": 8.00005127616201,
    		"xMinimum": 16.000028432317478,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  E5 Kulungalu",
    		"scale": "1:300.000",
    		"xMaximum": 18.000231859387046,
    		"yMinimum": 6.499947427674768,
    		"yMaximum": 8.000047085045022,
    		"xMinimum": 16.999938133313336,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F1 Ossidinge",
    		"scale": "1:300.000",
    		"xMaximum": 8.999915102050686,
    		"yMinimum": 5.004962540227512,
    		"yMaximum": 6.500041718049389,
    		"xMinimum": 7.890356643298355,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F1 Ossidinge",
    		"scale": "1:300.000",
    		"xMaximum": 10.000281207339203,
    		"yMinimum": 5.002056919703347,
    		"yMaximum": 6.50006896746517,
    		"xMinimum": 8.99979977034465,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F2 Fumban",
    		"scale": "1:300.000",
    		"xMaximum": 11.000390301133486,
    		"yMinimum": 4.999546712608688,
    		"yMaximum": 6.500051289686642,
    		"xMinimum": 10.00028188733206,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F2 Fumban",
    		"scale": "1:300.000",
    		"xMaximum": 11.999764228715076,
    		"yMinimum": 4.999299480839321,
    		"yMaximum": 6.500058641828101,
    		"xMinimum": 10.999258121389222,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F3 Joko",
    		"scale": "1:300.000",
    		"xMaximum": 13.000246402948113,
    		"yMinimum": 5.002701944258295,
    		"yMaximum": 6.500014621440461,
    		"xMinimum": 12.000227142511104,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F3 Joko",
    		"scale": "1:300.000",
    		"xMaximum": 14.00021557672381,
    		"yMinimum": 4.999311727936628,
    		"yMaximum": 6.50028260526575,
    		"xMinimum": 13.000099534845026,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F4 Betare",
    		"scale": "1:300.000",
    		"xMaximum": 15.000377684567749,
    		"yMinimum": 4.99988487271985,
    		"yMaximum": 6.500000490466463,
    		"xMinimum": 14.000300606070006,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F4 Betare",
    		"scale": "1:300.000",
    		"xMaximum": 16.000091250552483,
    		"yMinimum": 4.999477874228232,
    		"yMaximum": 6.500095795179289,
    		"xMinimum": 14.999452143409066,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F5 Bosum",
    		"scale": "1:300.000",
    		"xMaximum": 17.000056882557523,
    		"yMinimum": 5.001405267902678,
    		"yMaximum": 6.50000836299959,
    		"xMinimum": 15.99985233083527,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  F5 Bosum",
    		"scale": "1:300.000",
    		"xMaximum": 17.999826369871638,
    		"yMinimum": 5.001778453028565,
    		"yMaximum": 6.500124091646037,
    		"xMinimum": 16.99972524299573,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G1 Buea",
    		"scale": "1:300.000",
    		"xMaximum": 9.00016313315318,
    		"yMinimum": 3.5011646456253107,
    		"yMaximum": 5.0000292755306885,
    		"xMinimum": 7.999936986149576,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G1 Buea",
    		"scale": "1:300.000",
    		"xMaximum": 9.999687804129326,
    		"yMinimum": 3.5001627721582054,
    		"yMaximum": 5.000244260685633,
    		"xMinimum": 8.99970942424675,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1911(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G2 Jaunde",
    		"scale": "1:300.000",
    		"xMaximum": 11.999616837055136,
    		"yMinimum": 3.501068381159132,
    		"yMaximum": 5.000025094977513,
    		"xMinimum": 10.99963070737275,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1911(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G2 Jaunde",
    		"scale": "1:300.000",
    		"xMaximum": 11.000033818464662,
    		"yMinimum": 3.5006082357099335,
    		"yMaximum": 5.000003137539536,
    		"xMinimum": 9.999905759231215,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G3 Dume-Station",
    		"scale": "1:300.000",
    		"xMaximum": 12.999890045217052,
    		"yMinimum": 3.498852781232503,
    		"yMaximum": 5.000004450269387,
    		"xMinimum": 11.9998826121434,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1913(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G3 Dume-Station",
    		"scale": "1:300.000",
    		"xMaximum": 13.99979942885163,
    		"yMinimum": 3.49807084409574,
    		"yMaximum": 5.000116945145143,
    		"xMinimum": 12.999501128320022,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1910,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G4 Baturi",
    		"scale": "1:300.000",
    		"xMaximum": 15.000362742634648,
    		"yMinimum": 3.4992358611333922,
    		"yMaximum": 5.000012561923085,
    		"xMinimum": 14.000298691677585,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1910,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G4 Baturi",
    		"scale": "1:300.000",
    		"xMaximum": 16.251561478325243,
    		"yMinimum": 3.5019236302697454,
    		"yMaximum": 5.000017766070885,
    		"xMinimum": 15.000291888392546,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G5 Makandschia",
    		"scale": "1:300.000",
    		"xMaximum": 17.500126316886483,
    		"yMinimum": 3.502073503948358,
    		"yMaximum": 5.000045976417514,
    		"xMinimum": 16.250261931173643,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  G5 Makandschia",
    		"scale": "1:300.000",
    		"xMaximum": 18.701917085818568,
    		"yMinimum": 3.5001288877895984,
    		"yMaximum": 5.000121372042285,
    		"xMinimum": 17.50042037370542,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  H1,2 Kribi",
    		"scale": "1:300.000",
    		"xMaximum": 12.000124529797212,
    		"yMinimum": 2.000164124530923,
    		"yMaximum": 3.500014646501822,
    		"xMinimum": 10.500047375834477,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1911,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  H1,2 Kribi",
    		"scale": "1:300.000",
    		"xMaximum": 10.500485220893129,
    		"yMinimum": 2.0001862664464607,
    		"yMaximum": 3.500009407373549,
    		"xMinimum": 9.499697026267562,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1910,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  H3 Lomie",
    		"scale": "1:300.000",
    		"xMaximum": 13.000235164225428,
    		"yMinimum": 2.0000693788816326,
    		"yMaximum": 3.500230956006447,
    		"xMinimum": 11.999825390050981,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1910,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  H3 Lomie",
    		"scale": "1:300.000",
    		"xMaximum": 14.000069126289258,
    		"yMinimum": 1.999724571218148,
    		"yMaximum": 3.5000115123322764,
    		"xMinimum": 12.99972701929187,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1910,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  H4 Molundu",
    		"scale": "1:300.000",
    		"xMaximum": 15.000010512781127,
    		"yMinimum": 1.836555200944315,
    		"yMaximum": 3.5000024656170137,
    		"xMinimum": 13.999275938584525,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1910,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  H4 Molundu",
    		"scale": "1:300.000",
    		"xMaximum": 16.308907605006862,
    		"yMinimum": 1.6127323618008458,
    		"yMaximum": 3.5000632896719517,
    		"xMinimum": 14.999908473814898,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  H5 Lopi",
    		"scale": "1:300.000",
    		"xMaximum": 17.500083999283753,
    		"yMinimum": 2.0000591480796084,
    		"yMaximum": 3.4996523209153376,
    		"xMinimum": 16.31176555956342,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  H5 Lopi",
    		"scale": "1:300.000",
    		"xMaximum": 18.69273623178476,
    		"yMinimum": 2.0001250513942797,
    		"yMaximum": 3.5005418673246194,
    		"xMinimum": 17.499963720750216,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1914,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I1 Ukoko",
    		"scale": "1:300.000",
    		"xMaximum": 10.000789687022056,
    		"yMinimum": 0.37905756344884045,
    		"yMaximum": 1.9999226916883095,
    		"xMinimum": 8.999996254311705,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I2 Ojem",
    		"scale": "1:300.000",
    		"xMaximum": 12.000159621517318,
    		"yMinimum": 0.5001321705698776,
    		"yMaximum": 2.0000167393608277,
    		"xMinimum": 10.999782271683099,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I2 Ojem",
    		"scale": "1:300.000",
    		"xMaximum": 11.00038074554095,
    		"yMinimum": 0.5031673299663701,
    		"yMaximum": 2.000010962870125,
    		"xMinimum": 9.999913873594062,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I3 Mwine",
    		"scale": "1:300.000",
    		"xMaximum": 13.000302502947942,
    		"yMinimum": 0.5001185113651934,
    		"yMaximum": 2.0000266803206292,
    		"xMinimum": 11.999605964642118,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I3 Mwine",
    		"scale": "1:300.000",
    		"xMaximum": 13.999889854793024,
    		"yMinimum": 0.500142828465193,
    		"yMaximum": 2.000133916823048,
    		"xMinimum": 12.999895795887786,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I4 Ssembe",
    		"scale": "1:300.000",
    		"xMaximum": 14.99978489876539,
    		"yMinimum": 0.5229084451979085,
    		"yMaximum": 1.99994653538645,
    		"xMinimum": 13.99921802422035,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I4 Ssembe",
    		"scale": "1:300.000",
    		"xMaximum": 16.096410979413044,
    		"yMinimum": 0.5025148885710875,
    		"yMaximum": 2.0001885438183877,
    		"xMinimum": 14.999956451983428,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I5 Ikelemba",
    		"scale": "1:300.000",
    		"xMaximum": 16.999888007984765,
    		"yMinimum": 0.5011600723264564,
    		"yMaximum": 2.0000543705387575,
    		"xMinimum": 15.999717958791809,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1912,
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  I5 Ikelemba",
    		"scale": "1:300.000",
    		"xMaximum": 18.150446452864788,
    		"yMinimum": 0.5000940513938974,
    		"yMaximum": 2.0000669575121646,
    		"xMinimum": 16.99959536795828,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1910-1914(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  K5 Bonga",
    		"scale": "1:300.000",
    		"xMaximum": 17.000060523454586,
    		"yMinimum": -1.2863544472267152,
    		"yMaximum": 0.5002037152515124,
    		"xMinimum": 15.999651571478033,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": "1910-1914(?)",
    		"title": "Karte von Kamerun : [31 Bl., 3 Ansatzstücke] / bearb. von M. Moisel. /  K5 Bonga",
    		"scale": "1:300.000",
    		"xMaximum": 18.00109469884648,
    		"yMinimum": -1.2878020416705298,
    		"yMaximum": 0.5009846462057915,
    		"xMinimum": 16.998472818187974,
    		"zoomLevel": 13,
    		"library": "Deutsche Nationalbibliothek",
    		"url": "http://d-nb.info/56073817X",
    		"code": ""
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen  / K10 Ponape",
    		"scale": "1:250.000",
    		"xMaximum": 158.4043333358165,
    		"yMinimum": 6.752020540739963,
    		"yMaximum": 7.101982230132803,
    		"xMinimum": 82.74404666459878,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Ponape"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K2 Ifaluk Inseln",
    		"scale": "1:250.000",
    		"xMaximum": 144.49221453841974,
    		"yMinimum": 7.222331383612811,
    		"yMaximum": 7.319415049158243,
    		"xMinimum": 80.8063024361795,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Ifaluk"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K5 Jap Inseln",
    		"scale": "1:250.000",
    		"xMaximum": 138.22405745236952,
    		"yMinimum": 9.408538520296688,
    		"yMaximum": 9.709775642392698,
    		"xMinimum": 79.72120812512554,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Jap"
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / K6 Nauru",
    		"scale": "1:250.000",
    		"xMaximum": 166.9902239927333,
    		"yMinimum": -0.5864430536366569,
    		"yMaximum": -0.4651670783115958,
    		"xMinimum": 83.77955934962282,
    		"zoomLevel": 9,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Nauru"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 29. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 5. Karolinen / K6 Oleaï",
    		"scale": "1:250.000",
    		"xMaximum": 143.93004593219925,
    		"yMinimum": 7.311747884539884,
    		"yMaximum": 7.442609997163451,
    		"xMinimum": 80.70417679976552,
    		"zoomLevel": 10,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Oleai"
    	},
    	{
    		"year": 1910,
    		"title": "Grosser deutscher Kolonialatlas / No 30. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 6. Kiautschou und Samoa / Kiautschou",
    		"scale": "1:250.000",
    		"xMaximum": 120.65470897683007,
    		"yMinimum": 35.849080029169144,
    		"yMaximum": 39.11574062659885,
    		"xMinimum": 75.95631398262279,
    		"zoomLevel": 11,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Kiautschou"
    	},
    	{
    		"year": 1910,
    		"title": "Grosser deutscher Kolonialatlas / No 30. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 6. Kiautschou und Samoa / Upólu",
    		"scale": "1:250.000",
    		"xMaximum": -171.39640064709943,
    		"yMinimum": -14.10127965596918,
    		"yMaximum": -13.812275376060779,
    		"xMinimum": -84.33722640292622,
    		"zoomLevel": 12,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Upolu"
    	},
    	{
    		"year": 1904,
    		"title": "Karte des Kriegsschauplatzes in Deutsch-Südwest-Afrika zur Veranschaulichung des Aufstandes der Herrero, Bondelzwarts und Ovambo / Elisabeth-Bai",
    		"scale": "1:200.000",
    		"xMaximum": 15.253273624015705,
    		"yMinimum": -27.061533733572674,
    		"yMaximum": -28.04415907018886,
    		"xMinimum": 15.0024856648959,
    		"zoomLevel": "",
    		"library": "Staats- und Universitätsbibliothek Hamburg",
    		"url": "http://resolver.sub.uni-hamburg.de/goobi/PPN865588775",
    		"code": ""
    	},
    	{
    		"year": 1904,
    		"title": "Karte des Kriegsschauplatzes in Deutsch-Südwest-Afrika zur Veranschaulichung des Aufstandes der Herrero, Bondelzwarts und Ovambo / Itschabo",
    		"scale": "1:200.000",
    		"xMaximum": 14.982487663941164,
    		"yMinimum": -26.34056026891323,
    		"yMaximum": -27.234029432191708,
    		"xMinimum": 14.74579786307359,
    		"zoomLevel": "",
    		"library": "Staats- und Universitätsbibliothek Hamburg",
    		"url": "http://resolver.sub.uni-hamburg.de/goobi/PPN865588775",
    		"code": ""
    	},
    	{
    		"year": 1904,
    		"title": "Karte des Kriegsschauplatzes in Deutsch-Südwest-Afrika zur Veranschaulichung des Aufstandes der Herrero, Bondelzwarts und Ovambo / Lüderitz-Bucht",
    		"scale": "1:200.000",
    		"xMaximum": 15.192330795817988,
    		"yMinimum": -26.691965273022028,
    		"yMaximum": -27.58362851297602,
    		"xMinimum": 14.882860072728704,
    		"zoomLevel": "",
    		"library": "Staats- und Universitätsbibliothek Hamburg",
    		"url": "http://resolver.sub.uni-hamburg.de/goobi/PPN865588775",
    		"code": ""
    	},
    	{
    		"year": 1904,
    		"title": "Karte des Kriegsschauplatzes in Deutsch-Südwest-Afrika zur Veranschaulichung des Aufstandes der Herrero, Bondelzwarts und Ovambo / Sandfisch-Hafen",
    		"scale": "1:200.000",
    		"xMaximum": 14.523798518263447,
    		"yMinimum": -23.499397714527873,
    		"yMaximum": -24.00412401016973,
    		"xMinimum": 14.27078671886612,
    		"zoomLevel": "",
    		"library": "Staats- und Universitätsbibliothek Hamburg",
    		"url": "http://resolver.sub.uni-hamburg.de/goobi/PPN865588775",
    		"code": ""
    	},
    	{
    		"year": 1904,
    		"title": "Karte des Kriegsschauplatzes in Deutsch-Südwest-Afrika zur Veranschaulichung des Aufstandes der Herrero, Bondelzwarts und Ovambo / Spencer-Bai",
    		"scale": "1:200.000",
    		"xMaximum": 14.858274552536036,
    		"yMinimum": -25.739454923783285,
    		"yMaximum": -26.584486374739082,
    		"xMinimum": 14.658366107700843,
    		"zoomLevel": "",
    		"library": "Staats- und Universitätsbibliothek Hamburg",
    		"url": "http://resolver.sub.uni-hamburg.de/goobi/PPN865588775",
    		"code": ""
    	},
    	{
    		"year": 1904,
    		"title": "Karte des Kriegsschauplatzes in Deutsch-Südwest-Afrika zur Veranschaulichung des Aufstandes der Herrero, Bondelzwarts und Ovambo /Walfisch-Bucht",
    		"scale": "1:200.000",
    		"xMaximum": 14.602941327754284,
    		"yMinimum": -23.02384940000114,
    		"yMaximum": -23.480702393031056,
    		"xMinimum": 14.241903122334165,
    		"zoomLevel": "",
    		"library": "Staats- und Universitätsbibliothek Hamburg",
    		"url": "http://resolver.sub.uni-hamburg.de/goobi/PPN865588775",
    		"code": ""
    	},
    	{
    		"year": 1909,
    		"title": "Grosser deutscher Kolonialatlas / No 26. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 2. Deutsch-Neuguinea / K2 Finschhafen",
    		"scale": "1:75.000",
    		"xMaximum": 147.85591610912613,
    		"yMinimum": -6.575664642334758,
    		"yMaximum": -6.556279815676884,
    		"xMinimum": 81.33430517161565,
    		"zoomLevel": 13,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Finschhafen"
    	},
    	{
    		"year": 1908,
    		"title": "Grosser deutscher Kolonialatlas / No 28. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 4. Marianen und Marshall Inseln / K10a Regierungsbesitz bei Ponape",
    		"scale": "1:50.000",
    		"xMaximum": 158.21965247882383,
    		"yMinimum": 6.953509165869164,
    		"yMaximum": 6.993364057336878,
    		"xMinimum": 82.76455395109909,
    		"zoomLevel": "",
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": ""
    	},
    	{
    		"year": 1910,
    		"title": "Grosser deutscher Kolonialatlas / No 30. Die deutschen Besitzungen im Stillen Ocean u. Kiautschou in 6 Bl. / 6. Kiautschou und Samoa / K2 Apia-Hafen",
    		"scale": "1:50.000",
    		"xMaximum": -171.7489284226284,
    		"yMinimum": -13.844211579173546,
    		"yMaximum": -13.945192240897047,
    		"xMinimum": -84.28924771411509,
    		"zoomLevel": 14,
    		"library": "Staatsbibliothek zu Berlin Preußischer Kulturbesitz",
    		"url": "http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617",
    		"code": "GKA Apia"
    	},
    	{
    		"year": 1914,
    		"title": "Plan von Duala. In: Deutsches Kolonial-Lexikon / hrsg. von Heinrich Schnee. - Leipzig : Quelle & Meyer 1920. - 3 Bde.",
    		"scale": "1:50.000",
    		"xMaximum": 9.710566037836807,
    		"yMinimum": 4.032599466257609,
    		"yMaximum": 4.0709051685252895,
    		"xMinimum": 9.650311228304286,
    		"zoomLevel": 14,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB179630571",
    		"code": ""
    	},
    	{
    		"year": 1914,
    		"title": "Plan von Tsingtau. In: Deutsches Kolonial-Lexikon / hrsg. von Heinrich Schnee. - Leipzig : Quelle & Meyer 1920. - 3 Bde.",
    		"scale": "1:50.000",
    		"xMaximum": 120.34925034828206,
    		"yMinimum": 36.04241730574397,
    		"yMaximum": 36.10411151163729,
    		"xMinimum": 120.28084814718444,
    		"zoomLevel": 13,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB179630571",
    		"code": ""
    	},
    	{
    		"year": 1914,
    		"title": "Plan von Daressalam. In: Deutsches Kolonial-Lexikon / hrsg. von Heinrich Schnee. - Leipzig : Quelle & Meyer 1920. - 3 Bde.",
    		"scale": "1:25.000",
    		"xMaximum": 39.30148891710772,
    		"yMinimum": -6.8272088030382845,
    		"yMaximum": -6.807258202765542,
    		"xMinimum": 39.27666767908511,
    		"zoomLevel": 14,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB179630571",
    		"code": ""
    	},
    	{
    		"year": 1914,
    		"title": "Plan von Lome. In: Deutsches Kolonial-Lexikon / hrsg. von Heinrich Schnee. - Leipzig : Quelle & Meyer 1920. - 3 Bde.",
    		"scale": "1:20.000",
    		"xMaximum": 1.23470973008198,
    		"yMinimum": 6.117380328093709,
    		"yMaximum": 6.140055831547379,
    		"xMinimum": 1.205800125605491,
    		"zoomLevel": 13,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB179630571",
    		"code": ""
    	},
    	{
    		"year": 1914,
    		"title": "Plan von Swakopmund. In: Deutsches Kolonial-Lexikon / hrsg. von Heinrich Schnee. - Leipzig : Quelle & Meyer 1920. - 3 Bde.",
    		"scale": "1:20.000",
    		"xMaximum": 14.529356250136958,
    		"yMinimum": -22.684288405919357,
    		"yMaximum": -22.6700088781949,
    		"xMinimum": 14.519204235535772,
    		"zoomLevel": 13,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB179630571",
    		"code": ""
    	},
    	{
    		"year": 1914,
    		"title": "Plan von Windhuk. In: Deutsches Kolonial-Lexikon / hrsg. von Heinrich Schnee. - Leipzig : Quelle & Meyer 1920. - 3 Bde.",
    		"scale": "1:20.000",
    		"xMaximum": 17.09325638799985,
    		"yMinimum": -22.584691336331307,
    		"yMaximum": -22.55501951606343,
    		"xMinimum": 17.08068240317953,
    		"zoomLevel": 13,
    		"library": "Universitätsbibliothek J. C. Senckenberg, Frankfurt/M.",
    		"url": "https://hds.hebis.de/ubffm/Record/HEB179630571",
    		"code": ""
    	}
    ]
    SHORTCUTS = [
    	["Deutsch-Ostafrika", 35.2589, -6.2043, 5],
    	["Deutsch-Neuguinea", 150.0487, 6.8808, 4],
    	["Deutsch-Südwestafrika", 16.9784, -23.0891, 5],
    	["Kamerun", 13.5379, 5.8262, 5],
    	["Kiautschou", 120.3932, 36.0761, 9],
    	["Samoa", 187.8960, -13.8115, 10],
    	["Togo", 0.3285, 8.0835, 6],
    	["Witu", 40.8111, -2.2223, 10]
    ]
