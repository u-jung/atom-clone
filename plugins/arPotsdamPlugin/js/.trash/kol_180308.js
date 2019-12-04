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

/********************* GLOBAL VARIABLES *******************************/

var MAPLOADED = false;
var HISTORICLAYER;
var MAP;
/*var WDARRAY=[]
var PWDARRAY=0;
var INHALT;*/
var CALLCOUNT;
var I18N=get_i18n();
var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
var BREADCRUMB=[];
var GRATICULE
var FONTS=[
    ["18th Century",
    "fhsßàáúùó bdkl$t gjpqxyz aäåceimnnoöœruüvw EGHJPQ ABCDFJKLMNORSÁÈTUVWÄÖÜ 1234567890",
    "f h s ß ch ck tz st ss | b d k l s t | g j p q x y z | a ä å c e i m n n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S Sp St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" ,
    "s",
    "$"
    ],
    ["Berthold Mainzer Fraktur",
    "fhſßﬅﬅ bdklst gjpqxyz aäåceëimnnoöœruüvw EGHJPQ ABCDFJKLMNORSTUVWÄÖÜ 1234567890",
    "f h s ß ch sch ck tz st ss ss sk ft st sl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" ,
    "s",
    "ſ"
    
    ],
    ["Deutsche Kurrent",
    "fhsß<>ôﬆì bdkl#t gjpqxyz aäceimµnoöruüvw EGHJPQ ABCDFJKLMNORSÒTUVWÄÖÜ 1234567890",
    "f h s ß ch ck tz ft fl | b d k l s t | g j p q x y z | a ä c e i m mm n o ö r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" ,
    "#",
    "s"
    
    
    ],
    ["Greifswalder",
    "fhsßàáù bdkl$t gjpqxyz aäceimnnoöruüvw EGHJPQ ABCDFJKLMNORSÙTUVWÄÖÜ 1234567890",
    "f h s ß ch ck st | b d k l s t | g j p q x y z | a ä c e i m n n o ö r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" ,
    "s",
    "$"
    ],
    [
    "Ottilie",
    "fhſßﬅ bdklst gjpqxyz aäåceëimnnoöœruüvw EGHJPQ ABCDFJKLMNORSTUVWÄÖÜ 1234567890",
    "f h s ß ch sch ck tz st ss ss sk ft sl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" ,
    "s",
    "ſ"
    
    ],
    [
    "WiegelKurrent",
    "fhsßàáúùóòíì bdkl$t gjpqxyz aäåceëimÈnÉnoöœruüvw EGHJPQ ABCDFJKLMNORSÙTUVWÄÖÜ 1234567890",
    "f h s ß ch ck tz st ss sl ft fl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" ,
    "s",
    "$"
    ]
];

    var FONTCURSOR={'hValue':"",'kValue':"",'proposal':'','proposal_suffix':""};
    var FONTNUMBER=6;



/************************* BEGIN JQUERY LOADED*********************************/ 

jQuery(document).ready(function(){


/************************* INITS ********************************/ 
    
    /* Workaround because of the elastica error (first browse on session culture=de)*/
    if(jQuery('.messages strong').length>0){
        if(jQuery('.messages strong').text().indexOf('Exception')>0){
            console.log(jQuery('#header-nav li:nth-child(3) a').attr('href'));
            window.location=jQuery('#header-nav li:nth-child(3) a').attr('href');
        }
    }

    jQuery("#header-nav a").each(function(){
		languages=["de","Deutsch","fr","français","en","English"];
    	lang=languages[languages.indexOf(culture) + 1];
		console.log(lang);
		if (jQuery(this).attr("title")==lang){
			jQuery(this).css("text-decoration","underline");		
		}
    });


    /* Extend listed authority data by Wikidata query*/ 
    if (jQuery("#controlArea").length!=0){
        showEntityFromWd();
    }


    if(jQuery("#content").length!=0){
        jQuery("#lookup").css("display","block");
        };
    
	/* route all http anchors in div: content to target=_blank */
    jQuery('a').each(function(index){
        href=jQuery(this).attr("href");
         if(jQuery("#content").attr('href') !== undefined ){
            if(href.substring(0,4).toLowerCase()=="http"){
                jQuery(this).attr("target","_blank");
                console.log ("Done");
            }
        };
    });


	/* Check if special function should be called, depending on static page*/
    if (get_slug()=="thesaurus"){
        showWD();
    };

    if (get_slug()=="map"){
        jQuery('#main-column').html("");
        load_ol();
    };
    if (get_slug()=="font-tool"){
        jQuery('#main-column').html("");
        showFontTool();
    };



	/* Looking for the current AtoM slug*/
    function get_slug(){
        path=window.location.pathname
        return  path.substring(path.lastIndexOf('/')+1);
    }

/***********************************************  ES ****************************************************************** */ 
	/* Query the search index*/
    function queryES(index,query,todo,name=""){    
        console.log(todo);
        if (todo=="placesHere"){
            url=document.location.origin+"/esq.php?index="+index+"&todo="+todo+"&precision="+encodeURI(query['precision'])+"&lon="+encodeURI(query['lon'])+"&lat="+encodeURI(query['lat']);
        }
        else{
            url=document.location.origin+"/esq.php?index="+index+"&todo="+todo+"&term="+query['term'];
        }
        console.log(url);
        jQuery.get(url,
            function(data, status){
                AjaxResponse(JSON.parse(data),todo,name);
                
            }).fail(function(e){console.log(e.message);});
    };
    
    
    /* Handling query results */
    function AjaxResponse(data,todo,name){
        console.log(data);
        console.log(typeof(data));
        console.log(data, data.hits.hits.length, todo);

		/* Places around coordinates*/
        if(todo=="placesHere"){
            printPlaces(data.hits.hits);        
        }

        /* Word corpus */
        if (todo=="corpus"){
            wordLookupCB(data.hits.hits,name);
            return;
        }
        
        /* Places by name */
        if(todo=="placesNames"){
            if (data.hits.hits.length>0){
                for (i=0;i<data.hits.hits.length;i++){
                    term=data.hits.hits[i]["_source"]["loc"].toLowerCase();
                    if(term.indexOf(name)==0){
                        if (jQuery("#search-place").val().toLowerCase()==name){
                            jQuery("#search-place").val(data.hits.hits[i]["_source"]["loc"]);
                            jQuery("#search-place-start").attr("title",data.hits.hits[i]["_source"]["lon"]+"#"+data.hits.hits[i]["_source"]["lat"]);
                            jQuery("#search-place").setCursorPosition(name.length);        
                        }
                        return                
                    }    
                }
            }
        }
        return data;
    } 


/***********************************************  MAP ****************************************************************** */        
    

	/* Lookup for places in inindex for givenm coordinates*/
    function getPlaces(coord, overlay){
        var array=coord.split(",");
        var arXY=coord.split(",");
        /*array[0]=Math.floor(ar[0]*2)/2
        array[1]=Math.floor(ar[1]*2)/2   */
        var query={"precision":0.5, "lon":parseFloat(arXY[0]) , "lat":parseFloat(arXY[1])}    ;
        var index="geo";
        var x = queryES(index,query,"placesHere");        
    }
    
    
   
    
    /* Create a Select input with a list of places nearby*/
    function printPlaces(hits){
    
        var str
        var line,i,hitsLen,result;
        hitsLen = hits.length;
        if (hitsLen>0){
            jQuery('#popup').css("display","block");

            if (jQuery('#ortsliste').length==0){
                jQuery('#popup-form').prepend(jQuery("<select/>").attr("id","ortsliste").attr("size","10"));
                jQuery('#ortsliste').prop('multiple',true);
            }
            else{
                console.log(jQuery('#ortsliste').length);
                jQuery('#ortsliste option').remove();
            }

            for (i = 0; i < hitsLen; i++){
                jQuery('#ortsliste').append(jQuery("<option/>").html(hits[i]["_source"]["loc"]).attr("value",jQuery.trim(hits[i]["_source"]["loc"].match(/^[^\(]+/i))).prop("selected",true));
            }        
        }
        else
        {
            jQuery('#popup').css("display","none");
            jQuery('#ortsliste option').remove();
        }
                    
    }
    
    /* Send an advanced query to AtoM which contains the list of selected places*/
    function lookupPlaces(ar){
        var uStr;
        var qs=document.location.origin+"/index.php/informationobject/browse?showAdvanced=0";
        for (i = 0; i < ar.length; i++){
            uStr=encodeURIComponent(ar[i]);
            if(i==0){
                console.log(uStr, ar[i], ar);
                qs+="&sq"+i+"="+uStr;
            }
            else{
                qs+="&so"+i+"=or&sq"+i+"="+uStr;
            }
        }
        qs+="&topLod=0&rangeType=inclusive"
        if (ar.length>0){
            
            window.location.replace(qs);    
        }
        else{
            console.log("Es wurde nichts ausgewählt");
        }    
	    }
    
    
    /* Preparing the query for autocmpleting the place input form */
    function getPlaceName(name){
                var index="geo";
                var query={"term":name};
                var x = queryES(index,query,"placesNames",name);        
    }

    
  	/* Preparing the page for the open layer element */
    function mapInit(){
        
        jQuery('#wrapper').html('<h1>'+__("Kartensuche")+'</h1>\
                                    <p>Hier können Sie in historischen Karten stöbern, einzelne Orte suchen und archivarische Informationen abrufen, die sich auf Orte in einem bestimmten Gebiet beziehen. Für die Ortssuche benutzen Sie das Eingabefeld, für die Suche nach archivarischen Informationen klicken Sie auf einen Punkt in der Karte. Es werden alle Orte aufgelistet, die sich im Umkreis eines halben Längen- bzw. Breitengrades um die gewählten Koordinaten herum befinden. Grundlage hierfür bildet der Index des <a target="_blank" href="http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617" target="_blank">Großen deutschen Kolonialatlasses</a>. Über die verschiedenen Schaltflächen können zusätzliche Funktionen aufgerufen werden.</p>\
                                    <div id="close-map">\
                                    <li class="c-btn" id="map-toogle" title="'+__("Zwischen den Ansichten wechseln")+'">Toogle</li>\
                                    <li class="c-btn" id="map-merge" title="'+__("Die Ansichten überlagern")+'">Merge</li>\
                                    <li class="c-btn" id="map-graticule" title="off">Graticule</li>\
									<input  class="input-append" id="search-place" value="" type="text" /><li class="c-btn" id="search-place-start">Search</li>\
                                    \
                                 </div><div id="content"><div id="map">\
                                  </div>\
                                <div id="info">&nbsp;</div>\
                                </div></div>'
                                );
       jQuery("#search-place").css("display","inline-block").css("margin","10px").css("width","30%");
       jQuery('#wrapper').on('click','#map-toogle',function(){
                                                    if(HISTORICLAYER.getOpacity()==1){
                                                        HISTORICLAYER.setOpacity(0);
                                                        }
                                                    else{
                                                        HISTORICLAYER.setOpacity(1);
                                                    }            
                                                   });                     
        jQuery('#wrapper').on('click','#map-merge',function(){
                                                    HISTORICLAYER.setOpacity(0.5);
                                                    });
        jQuery('#wrapper').on('keyup','#search-place',function(e){
													console.log(e.keyCode);
                                                    if(e.keyCode==13){
                                                        getView(jQuery('#search-place-start').attr("title"));
                                                        return;
                                                    }
                                                    if(jQuery(this).val().length >= 2)
                                                    {
                                                        jQuery(this).val(jQuery(this).val().slice(0,jQuery(this).getCursorPosition()));
                                                        console.log(jQuery(this).getCursorPosition());
                                                        getPlaceName(this.value.slice(0,jQuery(this).getCursorPosition()).toLowerCase());
                                                    }
                                                   });  
        jQuery('#wrapper').on('click','#search-place-start',function(){
                                                            
                                                            getView(jQuery(this).attr("title"));
                                        
                                                    });  
    
        jQuery('#wrapper').on('click','#map-graticule',function(){
                                                   if(jQuery('#map-graticule').attr("title")=="off"){
                                                        GRATICULE.setMap(MAP);
                                                        jQuery('#map-graticule').attr("title","on");
                                                    }
                                                    else
                                                        jQuery('#map-graticule').attr("title","off");
                                                        GRATICULE.setMap(null)
                                                        
                                                    }); 
    }
    
	/*Re-center the map*/
    function getView(coord){
        coordArray=coord.split("#");
        MAP.getView().setCenter(ol.proj.fromLonLat([parseFloat(coordArray[0]), parseFloat(coordArray[1])]));
    }
    
	/*Starting the map*/
    function showMap(){
            mapInit();
            if (MAPLOADED==true){
                jQuery('#map').css('display','block');
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
           /**
           * Add a click handler to hide the popup.
           * @return {boolean} Don't follow the href.
           */
          closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
          };
          var vectorSource = new ol.source.Vector({
            url: 'https://openlayers.org/en/v4.6.4/examples/data/geojson/countries.geojson',
            format: new ol.format.GeoJSON()
          });
          HISTORICLAYER=new ol.layer.Tile({
              source: new ol.source.OSM({url: '/plugins/arPotsdamPlugin/images/tiles/{z}/{x}/{-y}.png',
                  attributions: '<h3>Historical maps:</h3><a href="http://stabikat.de/DB=1/XMLPRS=N/PPN?PPN=039485617" target="_blank"> Großer deutscher Kolonialatlas</a> (Exemplar der SBPK Berlin)<br / > \
                   <a href="http://d-nb.info/994793081" target="_blank"> Max Moisel: Karte von Kamerun</a> (Exemplar der DNB)<br / >'
                  })
              });
          var osm_layer=new ol.layer.Tile({source: new ol.source.OSM()})
          MAP = new ol.Map({

                controls: ol.control.defaults().extend(  [new ol.control.FullScreen(),new ol.control.OverviewMap({collapsed:true}), new ol.control.ScaleLine({className: 'ol-scale-line', minWidth:64, target:document.getElementById('scale') }), new ol.control.Zoom({minWidth:120})]),
                overlays: [overlay],
                target: 'map',
                layers: [
                    osm_layer,        
                    HISTORICLAYER,
                ],
                view: new ol.View({
                  center: ol.proj.fromLonLat([11.41, 3.82]),
                  zoom: 4,
                  minZoom: 3,
                  maxZoom: 13
                })
            });
            var closebutton = document.createElement('close-button');
            closebutton.innerHTML = 'x';
            var handleClose = function(e) {
              
            };
            closebutton.addEventListener('click', handleClose, false);
            var element = document.createElement('div');
            element.className = 'closeMap ol-unselectable ol-control';
            element.appendChild(closebutton);
            var CloseControl = new ol.control.Control({
                element: element
            });
            MAP.addControl(CloseControl);    
            MAP.on('singleclick', function(evt) {
                var coordinate = evt.coordinate;
                var coord = ol.coordinate.toStringXY(ol.proj.transform(
                    coordinate, 'EPSG:3857', 'EPSG:4326'),1);
                overlay.setPosition(coordinate);
                getPlaces(coord);
            });    
            MAP.once('postrender', function(event) {
                MAPLOADED=true;
            });
             
                /*Create the GRATICULE component , but the setmap method is not working in Firefox*/
               GRATICULE = new ol.Graticule({
                // the style to use for the lines, optional.
                strokeStyle: new ol.style.Stroke({
                  color: 'rgba(255,120,0,0.9)',
                  width: 2,
                  lineDash: [0.5, 4]
                }),
                targetSize: 200,
                showLabels: true
              });
    }

/***********************************************  WIKIDATA****************************************************************** */        

    /* Starting the Wikidata thesaurus*/
	function showWD(){
        saveContent();
        jQuery("#wrapper").html('<div class="multiline-header"><h1 aria-describedby="">Thesaurus<div class="loader"></div></h1><p>Der Thesaurus versucht, einen Überblick über die Organisationen und Personen in den Kolonien, sowie ihre Beziehungen zueinander darzustellen. Die Daten dazu werden in der freien Wissensdatenbank Wikidata gesammelt. Die Mitarbeit am Thesaurus ist offen für alle, die einen Beitrag zur Wissensvernetzung leisten möchten. <a href="http://vm.atom/index.php/wikidata">Auf dieser Seite</a> gibt es die Details dazu.  </p></div><section class="breadcrumb"></section><div id="content"></div>')
        wdInit();
    
    }
	
	/* Preparing the div*/
    function wdInit(){
        BREADCRUMB=[[__("Kolonien"),"Q329618","kolonien"]];
        var type="kolonien";
        var wdId="Q329618";
        data=[
                    {"name":"Deutsch-Neuguinea","item":"http://www.wikidata.org/entity/Q165008","id":"Q165008","type":"kolonie"},
                    {"name":"Deutsch-Ostafrika","item":"http://www.wikidata.org/entity/Q153963","id":"Q153963","type":"kolonie"},
                    {"name":"Deutsch-Südwestafrika","item":"http://www.wikidata.org/entity/Q153665","id":"Q153665","type":"kolonie"},
                    {"name":"Kamerun","item":"http://www.wikidata.org/entity/Q668294","id":"Q668294","type":"kolonie"},
                    {"name":"Kiautschou","item":"http://www.wikidata.org/entity/Q675321","id":"Q675321","type":"kolonie"},
                    {"name":"Samoa","item":"http://www.wikidata.org/entity/Q26271738","id":"Q26271738","type":"kolonie"},
                    {"name":"Togo","item":"http://www.wikidata.org/entity/Q161062","id":"Q161062","type":"kolonie"},
                    {"name":"Wituland","item":"http://www.wikidata.org/entity/Q30607493","id":"Q30607493","type":"kolonie"},
                    {"name":"Deutsches Reich","item":"http://www.wikidata.org/entity/Q1206012","id":"Q1206012","type":"deutschland"}
             ]
        
        data=addSubData(data);
        
        showWdResults(data);
    }

	/* Handling the breadcrumb */
    function showBreadcrumb(){
        
            bc="<ul>";
            for (i=0;i<BREADCRUMB.length;i++){
                bc+='<li><a id="' + BREADCRUMB[i][0]+'#'+ BREADCRUMB[i][1]+'#'+ BREADCRUMB[i][2] +'">'+BREADCRUMB[i][0]+'</a></li>'
            }
            bc+="</ul>";
            jQuery('.breadcrumb').html(bc).css("cursor", "pointer");
            jQuery('.breadcrumb').on("click","a",function(){changeWd(jQuery(this).attr('id'))});
    }
    
    function changeBreadcrumb(name,wdId,type,parent){
        newBreadcrumb=[]
        for(i=0;i<BREADCRUMB.length;i++){
            newBreadcrumb.push(BREADCRUMB[i])
            if(BREADCRUMB[i][1]==wdId){
                if(BREADCRUMB[i][2]==type){
                    BREADCRUMB=newBreadcrumb;
                    return;
                }
            }
        }
        if (parent.length>0){
            name=parent + " ("+name+")";
        }
        BREADCRUMB.push([name,wdId,type]);
        return;
    }
    
	/* Filling the div with data */
    function showWdResults(data){
        jQuery('.title').off;
        jQuery('#content').off;
        jQuery('.result-details').off;
        jQuery('.search').off;
        showBreadcrumb();
        jQuery('#content').html("");
        if (jQuery.isArray(data)){
            data=addSubData(data);
            for (i=0;i<data.length;i++){
                h3="";
                if ("h3" in data[i]){
                    h3="<br><small>"+data[i]["h3"]+"</small>";
                }
                subDataStr="";
                for (j=0;j<data[i]['sub'].length;j++){
                    subDataStr+='<li id="'+data[i]['sub'][j]['name']+"#"+data[i]['sub'][j]['id']+"#"+data[i]['sub'][j]['type']+"#"+data[i]['name']+'">'+data[i]['sub'][j]['name']+'</li>';
                }
                jQuery("#content").append('<article class="search-result"><div class="search-result-description" > <p class="title"><a href="#" id="'+data[i]['name']+'#'+data[i]['id']+'#'+data[i]['type']+'" title="'+data[i]['name']+'">'+data[i]['name']+'</a>'+h3+'</p><button class="search wd-search" id="'+data[i]['id']+'">&nbsp;</button><ul class="result-details"><li class="reference-code" id="'+data[i]['item']+'">'+data[i]['item']+'</li>'+subDataStr+'</ul></div></article>');
                
            }
            jQuery('.title').on("click","a",function(){changeWd(jQuery(this).attr('id'))});
            jQuery('#content').on("click","a ",function(){changeWd(jQuery(this).attr('id'))});
            jQuery('.search').on("click","a ",function(){changeWd(jQuery(this).attr('id'),'AtoM')});
            jQuery('.search-result-description').on('click',".wd-search",function(){changeWd(jQuery(this).attr('id'))});
            jQuery('.result-details').on("click","li",function(){changeWd(jQuery(this).attr('id'))});
            jQuery('.result-details li').css("cursor","pointer");
        }
        else{
            jQuery('#content').html(data);
        }
    }
        
	/*Starts preparation for a new query*/
    function changeWd(newItem){
        newItemArray=newItem.split('#');
        if (newItemArray.length>1){
            console.log(newItem);
            wdId=newItemArray[1];
            name=newItemArray[0];
            type=newItemArray[2];
        }
        else{
            if (newItem.substr(0,4).toLowerCase()=="http"){
                var win = window.open(newItem, '_blank');
                win.focus();                
            }
            else{
                searchFromWd(newItem);
            }
            return;
        }
        
        if (newItemArray.length>3){
            parent=newItemArray[3];
        }
        else{
            parent=""
        }
        changeBreadcrumb(name,wdId,type,parent);
        if (type =="kolonien"){
            wdInit();
            return;
        }
        if (type  == "kolonie"){
            if(culture=="de"){
                data=[    {name:"Details",type:'detailed_data',id:wdId,item:""},
                        {name:"Chronologie",type:'chronologie',id:wdId,item:""},
                        {name:"Personen",type:'personen',id:wdId,item:""},
                        {name:"Verwaltung", type:'verwaltungen', id:wdId,item:""},
                        {name:"Unternehmen",type:'firmen', id:wdId,item:""},
                        {name:"Missionen",type:'missionen', id:wdId,item:""},
                        {name:"Militär",type:'militaer',id:wdId,item:""}                    
                ]
            }
            if(culture=="en"){
                data=[    {name:"Details",type:'detailed_data',id:wdId,item:""},
                        {name:"Chronology",type:'chronologie',id:wdId,item:""},
                        {name:"People",type:'personen',id:wdId,item:""},
                        {name:"Administration", type:'verwaltungen', id:wdId,item:""},
                        {name:"Companies",type:'firmen', id:wdId,item:""},
                        {name:"Missionary Societies",type:'missionen', id:wdId,item:""},
                        {name:"Military",type:'militaer',id:wdId,item:""}                    
                ]
            }                        
            if(culture=="fr"){
                data=[    {name:"Détails",type:'detailed_data',id:wdId,item:""},
                        {name:"Chronologie",type:'chronologie',id:wdId,item:""},
                        {name:"Persones",type:'personen',id:wdId,item:""},
                        {name:"Administration", type:'verwaltungen', id:wdId,item:""},
                        {name:"Entreprises",type:'firmen', id:wdId,item:""},
                        {name:"Missions",type:'missionen', id:wdId,item:""},
                        {name:"Militaire",type:'militaer',id:wdId,item:""}                    
                ]
                
            }
            showWdResults(data);
            return;
        }

        if (type==""){
			/*do nothing*/
        };
        prop="";
        action="";
        query=buildWdQuery(type, wdId,prop,culture);
        data=getFromWd(query[0],action,query[1]);
        return;        
    }
        
        
    /* adding the sub-categories */  
    function addSubData(data){
            sub=[];
            for (i=0;i<data.length;i++){
                type=data[i]['type'];
                wdId=data[i]['id'];                
                if (type  == "kolonie"){
                    if(culture=="de"){
                        sub=[    {name:"Details",type:'detailed_data',id:wdId,item:""},
                                {name:"Chronologie",type:'chronologie',id:wdId,item:""},
                                {name:"Personen",type:'personen',id:wdId,item:""},
                                {name:"Verwaltung", type:'verwaltungen', id:wdId,item:""},
                                {name:"Unternehmen",type:'firmen', id:wdId,item:""},
                                {name:"Missionen",type:'missionen', id:wdId,item:""},
                                {name:"Militär",type:'militaer',id:wdId,item:""},    
                                {name:"Vereine",type:'vereine',id:wdId,item:""}    ,
                                {name:"Lokale Gemeinschaften",type:'ethnien',id:wdId,item:""} ,        
                                {name:"Ereignisse",type:'ereignisse',id:wdId,item:""}            
                        ]
                    }
                    if(culture=="en"){
                        sub=[    {name:"Details",type:'detailed_data',id:wdId,item:""},
                                {name:"Chronology",type:'chronologie',id:wdId,item:""},
                                {name:"People",type:'personen',id:wdId,item:""},
                                {name:"Administration", type:'verwaltungen', id:wdId,item:""},
                                {name:"Companies",type:'firmen', id:wdId,item:""},
                                {name:"Missionary Societies",type:'missionen', id:wdId,item:""},
                                {name:"Military",type:'militaer',id:wdId,item:""}    ,
                                {name:"Associations",type:'vereine',id:wdId,item:""},    
                                {name:"Local communities",type:'ethnien',id:wdId,item:""}  ,        
                                {name:"Events",type:'ereignisse',id:wdId,item:""}                           
                        ]
                    }                        
                    if(culture=="fr"){
                        sub=[    {name:"Détails",type:'detailed_data',id:wdId,item:""},
                                {name:"Chronologie",type:'chronologie',id:wdId,item:""},
                                {name:"Persones",type:'personen',id:wdId,item:""},
                                {name:"Administration", type:'verwaltungen', id:wdId,item:""},
                                {name:"Entreprises",type:'firmen', id:wdId,item:""},
                                {name:"Missions",type:'missionen', id:wdId,item:""},
                                {name:"Militaire",type:'militaer',id:wdId,item:""},    
                                {name:"Associations",type:'vereine',id:wdId,item:""}    ,
                                {name:"Communautés locales",type:'ethnien',id:wdId,item:""}   ,        
                                {name:"Évènements",type:'ereignisse',id:wdId,item:""}                          
                        ]
                        
                    }
                }
                if (["verwaltung", "mission","militaer","firma"].indexOf(type)!=-1){
                    if(culture=="de"){
                        sub=[    {name:"Personen",type:'zugehoerig',id:wdId,item:""},
								 {name:"Orte",type:'orte',id:wdId,item:""},
                                {name:"Chronologie",type:'chronologie',id:wdId,item:""}
                        ]
                    }
                    if(culture=="en"){
                        sub=[    {name:"People",type:'zugehoerig',id:wdId,item:""},
								 {name:"Places",type:'orte',id:wdId,item:""},
                                {name:"Chronology",type:'chronologie',id:wdId,item:""}
                        ]
                    }
                    if(culture=="fr"){
                        sub=[    {name:"Persones",type:'zugehoerig',id:wdId,item:""},
 								{name:"Lieux",type:'orte',id:wdId,item:""},
                                {name:"Chronologie",type:'chronologie',id:wdId,item:""}
                        ]
                    }
                }
            data[i]['sub']=sub;
        }
        console.log(data);
        return(data);
    }    
        
	/*preparing the new query*/
    function buildWdQuery(type,subj,prop, lang='de'){
         if(type=="kolonien"){
            query='select  ?item ?itemLabel Where { bind(wd:'+subj+' as ?concept).?item wdt:P361  ?concept .  SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de,en" }} Order BY ?itemLabel';
            type='kolonie';
        }

        if(type=='person'){type='detailed_data'};
        if(type=='verwaltung'){type='detailed_data'};
                
        if(type == 'detailed_data'){
            query=    'PREFIX entity: <http://www.wikidata.org/entity/> \
                    SELECT ?propNumber ?propLabel ?val  \
                    WHERE \
                    { \
                        hint:Query hint:optimizer "None" . \
                        {    BIND(entity:'+subj+' AS ?valUrl) . \
                            BIND("N/A" AS ?propUrl ) . \
                            BIND("Name"@de AS ?propLabel ) . \
                            entity:'+subj+' rdfs:label ?val . \
                            FILTER (LANG(?val) = "'+lang+'") \     } \
                         UNION \
                        { \
                           optional{ \
                             BIND(entity:'+subj+' AS ?valUrl) . \
                             BIND("Image"@de AS ?propLabel ) . \
                             BIND("4" AS ?propNumber ) . \
                             entity:'+subj+' wdt:P18 ?val. \
                           } \
                        }\
                        UNION \
                        {optional{ ?valUrl schema:about entity:'+subj+'. \
                                 ?valUrl schema:inLanguage "de" . \
                                BIND("Wikipedia@de"@de AS ?propLabel ) . \
                                BIND(str(?valUrl) AS ?val)} \
                                BIND("5" AS ?propNumber ) . \
                        } \
                        UNION{ \
                                BIND(str(entity:'+subj+') AS ?val) . \
                                BIND("Wikidata"@de AS ?propLabel ) .  \
                                BIND("0" AS ?propNumber ) . \
                        } \
                        UNION \
                        {   BIND(entity:'+subj+' AS ?valUrl) . \
                            BIND("AltLabel"@de AS ?propLabel ) .  \
                            BIND("4" AS ?propNumber ) . \
                            optional{entity:'+subj+' skos:altLabel ?val}.  \
                            FILTER (LANG(?val) = "'+lang+'")  } \
                        UNION \
                            {BIND(entity:'+subj+' AS ?valUrl) . \
                            BIND("Description"@de AS ?propLabel ) .  \
                            BIND("3" AS ?propNumber ) . \
                            optional{entity:'+subj+' schema:description ?val}. \
                            FILTER (LANG(?val) = "'+lang+'")  \
                        } \
                        UNION \
                        {    entity:'+subj+' ?propUrl ?valUrl . \
                            ?property ?ref ?propUrl . \
                            ?property rdf:type wikibase:Property . \
                            ?property rdfs:label ?propLabel. \
                            FILTER (lang(?propLabel) = "'+lang+'") \
                            filter  isliteral(?valUrl)  \
                            BIND(?valUrl AS ?val) \
                        } \
                        UNION \
                        {    entity:'+subj+' ?propUrl ?valUrl . \
                            ?property ?ref ?propUrl . \
                            ?property rdf:type wikibase:Property . \
                            ?property rdfs:label ?propLabel. \
                            FILTER (lang(?propLabel) = "'+lang+'" )  \
                            filter  isIRI(?valUrl)  \
                            ?valUrl rdfs:label ?valLabel  \
                            FILTER (LANG(?valLabel) = "'+lang+'")  \
                             BIND(CONCAT(?valLabel) AS ?val) \
                        } \
                            BIND( SUBSTR(str(?propUrl),38, 250) AS ?propNumber) \
                    } \
                    ORDER BY xsd:integer(?propNumber)';
            
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
            console.log(query);
            
            type='detailed_data';
        }
        
        if(type=="zugehoerig"){
            query='SELECT DISTINCT ?item ?itemLabel ?bodyLabel   ?von ?bis ?position  ?bemerkung ?vonPrecision ?bisPrecision \
                    { \
                      bind (wd:'+subj+' as ?body) \
                      ?item wdt:P31 wd:Q5 . \
                      ?item p:P1416 ?position_statement .   \
                      ?position_statement ps:P1416 ?body . \
                      OPTIONAL { ?position_statement pq:P580 ?von} \
                      OPTIONAL { ?position_statement pq:P582 ?bis} \
                      OPTIONAL { ?position_statement pqv:P580 ?vonnode.\
                                ?vonnode  wikibase:timePrecision     ?vonPrecision. \
                                ?vonnode  wikibase:timeValue    ?von.   \
                                } \
                      OPTIONAL { ?position_statement pqv:P582 ?bisnode.\
                                  ?bisnode wikibase:timePrecision     ?bisPrecision.    \
                                  ?bisnode wikibase:timeValue     ?bis.  \
                        } \
                      OPTIONAL { ?position_statement pq:P106/rdfs:label ?position filter (lang(?position) = "'+lang+'") .  } \
                      OPTIONAL { ?position_statement pq:P2868/rdfs:label ?bemerkung filter (lang(?bemerkung) = "'+lang+'")  } \
                      SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de" . } \
                    } \
                    ORDER BY ?von ?position' 

            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");


        }
        if (type=="chronologie"){
            query=    'prefix var: <http://www.wikidata.org/entity/'+subj+'>  \
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

            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");

        }
        
        /*Reihenfolge beachten Personen -> Person*/
        if(type=='personen'){
            query='select distinct ?item ?itemLabel ?itemDescription where {  ?item wdt:P31 wd:Q5 .  ?item wdt:P937 wd:'+subj+' . SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de,en". }}order by ?itemLabel';
            type='person';        
        }

        if(type=='verwaltungen'){
            /* match Behörde:Q327333  bzw. Bezirksverwaltungsbehörde:Q854399 bzw. Verwaltungssitz Q1306755*/
            query='select distinct  ?item ?itemLabel ?itemDescription Where  {  bind(wd:'+subj+' as ?concept).  ?item wdt:P361  ?concept .  {{?item wdt:P31/wdt:P279* wd:Q327333 }    UNION {?item wdt:P31/wdt:P279*  wd:Q854399} UNION {?item wdt:P31/wdt:P279*  wd:Q1306755}}    SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de,en". }  }Order BY ?itemLabel';
            type='verwaltung';    
        }    
        
        if (type=="missionen"){
            query='select distinct  ?item ?itemLabel ?itemDescription ?von ?bis ?vonPrecision ?bisPrecision \
                    Where  {  bind(wd:'+subj+' as ?concept).   \
                            ?item wdt:P2541  ?concept .   \
                            {?item wdt:P31/wdt:P279* wd:Q20746389 . \
                            optional {?item p:P2541 ?position_statement .} \
                           OPTIONAL { ?position_statement pq:P580 ?von}  \
                            OPTIONAL { ?position_statement pq:P582 ?bis} } \
                            OPTIONAL { ?position_statement pqv:P580 ?vonnode. \
                            ?vonnode  wikibase:timePrecision     ?vonPrecision. \
                            ?vonnode  wikibase:timeValue    ?von.    \
                            }  \
                            OPTIONAL { ?position_statement pqv:P582 ?bisnode. \
                            ?bisnode wikibase:timePrecision     ?bisPrecision.  \
                            ?bisnode wikibase:timeValue     ?bis.  } \
                            SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de,en". } \
                            } \
                            Order BY ?itemLabel'
            
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
            type="mission";
        }
        
        if(type=="firmen"){
            query='select distinct  ?item ?itemLabel ?itemDescription ?von ?bis ?vonPrecision ?bisPrecision \
                    Where  {  bind(wd:'+subj+' as ?concept).   \
                            ?item wdt:P2541  ?concept .   \
                            {?item wdt:P31/wdt:P279* wd:Q4830453 . \
                            optional {?item p:P2541 ?position_statement .} \
                           OPTIONAL { ?position_statement pq:P580 ?von}  \
                            OPTIONAL { ?position_statement pq:P582 ?bis} } \
                            OPTIONAL { ?position_statement pqv:P580 ?vonnode. \
                            ?vonnode  wikibase:timePrecision     ?vonPrecision.  \
                            ?vonnode  wikibase:timeValue    ?von.    \
                            }  \
                            OPTIONAL { ?position_statement pqv:P582 ?bisnode. \
                            ?bisnode wikibase:timePrecision     ?bisPrecision.     \
                            ?bisnode wikibase:timeValue     ?bis.  } \
                            SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de,en". }   \
                            } \
                            Order BY ?itemLabel' 
            type="firma";
			query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
        }
        
        
        if(type=="ethnien"){
            query='select ?item (max(?deLabel)  as ?itemLabel)  (group_concat(?iLabel;separator="|")  as ?Label)  (group_concat(?itemAltLabel;separator="|") as ?AltName)  \
                  where { \
                  ?item wdt:P31 wd:Q41710. \
                  ?item rdfs:label ?iLabel  FILTER (LANG (?iLabel) = "de" || LANG (?iLabel) = "en" || LANG (?iLabel) = "fr") .  \
                  optional{?item skos:altLabel ?itemAltLabel  FILTER (LANG (?itemAltLabel) = "de" || LANG (?itemAltLabel) = "en" || LANG (?itemAltLabel) = "fr") . } \
                  ?item rdfs:label ?deLabel  FILTER (LANG (?deLabel) = "de" ). \
                  ?item wdt:P17 wd:'+subj+' . \
                  } \
                 group by ?item order by ?itemLabel'
            
            type="ethnie"; 
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
            query=query.replace(/\ \ \ \ /g," ");
        }
        
        
        if(type=='labels'){
            query='select ?item ?itemLabel ?itemAltLabel Where { bind(wd:'+subj+' as ?item). Optional{?item skos:altLabel ?itemAltLabel . } ?item rdfs:label ?itemLabel   }';
        }
        
        
        if(type=="OneProp"){
            query='select ?item ?itemLabel Where { ?item wdt:'+prop+' wd:'+subj+' SERVICE wikibase:label { bd:serviceParam wikibase:language "'+lang+',de,en" }  } Order by ?itemLabel';            
        }

        console.log(query);
            return [encodeURI(query), type];
    
    
    }
    
	/*Sending the query*/
    function getFromWd(query,action, type){
            console.log(query);
            base_url='https://query.wikidata.org/sparql';
        
            url=base_url+"?format=json&query="+query;
            console.log(url);
            showLoader();
            jQuery.get(url,
            function(data, status){
                WdResponse(data,action, type);
                showLoader();
            }).fail(function(){showLoader()});
            return (query);
    }
    
	/*dealing with the query response*/
    function WdResponse(data,action, type){
		aliasses=[];
        if(type =='labels'){
			for (i=0;i<data.results.bindings.length;i++){
				e=data.results.bindings[i];
                if(aliasses.indexOf(e.itemAltLabel['value'])==-1){
                   aliasses.push(e.itemAltLabel['value']);
                };
                if(aliasses.indexOf(e.itemLabel['value'])==-1){
                   aliasses.push(e.itemLabel['value']);
                }
			}
			console.log(aliasses);
            lookupPlaces(aliasses);
            return;
        }
        if (action=="show_authority"){
            console.log("ist authority");
            nodeData=prepareData(data['results']['bindings'],"show_authority", type);
            show_authority_data(nodeData);
            return;
        }
        else{
            nodeData=prepareData(data['results']['bindings'],action, type);
            
        }
        showWdResults(nodeData);
    }
    
    /* Preparing the results (general approach) */
    function prepareData(results,node,type){
        console.log(type);
        var ar;
        var nodeData=[];
        for (i=0; i< results.length;i++){
            nodeData.push({'name':''});
            for(var key in results[i]){
    
                if (key=="itemLabel"){
                    nodeData[i]['name']=results[i]['itemLabel']['value'];
                }
                else{
                    
                    nodeData[i][key]=results[i][key]['value'];
                }
                if(key=="item"){
                    nodeData[i]['id']=results[i]['item']['value'].match(/[^\/]*$/i)[0];
                }
            }
            nodeData[i]['type']=type;
            
        }

        /*detailed_data*/
        if (type=='detailed_data'){

            if (node=="show_authority"){
                jQuery("#content").append('<section id="wikidataArea"><span anchor="controlArea" title="Bearbeite Bereich \'Wikidata\'"><h2>'+__('Bereich "Wikidata"')+'</h2></span></section>');
                nodeData=show_authority_data(nodeData);
            }
            else{
                
                nodeData=prepareDetails(nodeData,type);
            }
        }
        /*if (type=='mission'){
            nodeData=prepareTable(nodeData, type,'Name', ['itemDescription','vonPrecision','bisPrecision'], 1);
        }*/

        if (type=='zugehoerig'){
        console.log("zugehoerig");
            nodeData=prepareTable(nodeData, type,'Name', ['bodyLabel','vonPrecision','bisPrecision'], 1, 'person');
            
        }
        
        if (type=='chronologie'){

            nodeData=prepareTable(nodeData, type,'', ['nr'], 1, "");
            
        }
 
        if (type=="ethnie"){
            
            nodeData=concat(nodeData,"name", ["Label","AltName"]);
            console.log(nodeData);
        }
        
    /* Changing the order inside the name field*/
        if(type=='person'){
   
            var index, z, n, arStr;
            var ar=[];
                for(i=0; i< nodeData.length;i++){

                    arStr=nodeData[i]['name'].toString();
                    ar=arStr.split(" ");
                    index=ar.indexOf('von')+1;

                    if(index==0){
                        console.log("len null" + ar.length);
                        index=ar.length - 1;
                    }
                    n="";
                            console.log(index);                            
                    for (j=0;j<index;j++){
                                    console.log(ar);
                        
                        ar.push(ar[0]);
                        console.log(ar);
                        ar.shift();
                                    console.log(ar);
                    }
                    for(j=0;j<ar.length;j++){

                        if(j==ar.length-index){
                            n += ", " + ar[j];
                        }
                        else{
                            n+= " " + ar[j];
                        }
                    nodeData[i]['name']=n.trim();
                        console.log(n);
                    }
                    
                }
        console.log(JSON.stringify(nodeData));            
            nodeData.sort(function(a, b){
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
                if (nameA < nameB) 
                    return -1 
                if (nameA > nameB)
                    return 1
                return 0 
                })
            
        }
        
        
            console.log(JSON.stringify(nodeData));        
        
        
        
        return(nodeData);
    }
    
    
    function prepareTable(data, type,itemTitle,excludeList, linked, itemType){
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
        
        var uStr='';
        for(i=0; i< data.length;i++){
            uStr+='<section><span anchor="" ><h2><a href="#" id="'+data[i]['name']+'#'+data[i]['id']+'#'+ itemType +'" title="'+data[i]['name']+'" class="wd-item">'+data[i]['name']+"</a></h2></span>";
            for (var key in data[i]){
                if (key=="name"){
                    continue;
                }
                if((["item","type","id"].indexOf(key)==-1 ) && (excludeList.indexOf(key)==-1)){
                    console.log(key,itemTitle);
                    if(key.toLowerCase()==itemTitle.toLowerCase()){
                        if (linked==1){
                            uStr+='<div class="field "><h3>'+key+'</h3><div>'+'<a href="#" id="'+data[i]['item'].match(/[^\/]*$/i)[0]+'|'+target_type+'" >'+data[i][key]+'</a>'+"</div></div>";
                        }
                        else{
                            uStr+='<div class="field"><h3>'+key+'</h3><div>'+data[i][key]+"</div></div>";
                        }
             
                    }
                    else{
                            uStr+='<div class="field"><h3>'+key+'</h3><div>'+testDate(data[i][key], data[i][key+"Precision"])+"</div></div>";

                    }
                }
            }
            uStr+="</section>";
        }
        uStr+="";
        if (data.length ==0){uStr+="<p>"+__("Keine Daten vorhanden")+"</p>"};
        console.log(uStr);
        return uStr;
    };
    
    /*Preparing tghe extension of AtoM's authority data details page*/
    function show_authority_data(data){
        var logo;
        var content, label;
        var arUri=getAuthorityURI();
        var prop=0;
        var re = new RegExp("%20", 'g');
        if(typeof data === "undefined"){
                return;
            };
        for(i=0; i< data.length;i++){
            content=data[i].val;
            label=data[i].propLabel;
            prop=data[i].propNumber;
            if (label==null || label==undefined){
                label=" ";
                content=".";
                continue;
            }
            var index;
            if (label=="Name"){
                content="<b>"+content+"</b>";
            }
            if (content.substr(0,4).toLowerCase()=="http"){
                content='<a href="'+content+'" target="_blank">'+content+"</a>";
            }
            if (label=="Description"){
                content=""+content+"";
            }
            if (label=="Wikidata"){
                logo='<a target="_blank" href="'+data[i].val+'" title="'+__("Gehe zur Wikidata-Seite")+'"><img src="/plugins/arPotsdamPlugin/images/wd.png"/></a>';
                continue;
            }
            if (label=="Image"){
                content=jQuery(content).attr("href");
                filename=content.substring(content.lastIndexOf('/')+1);
                filename=filename.replace(re,"_");
                
                imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/" + MD5(filename).substring(0,1) +"/"+MD5(filename).substring(0,2) +"/"+filename +"/200px-"+filename;
                content='<img src="'+imgLink+'" />';
            
            }
            index=arUri.indexOf(parseInt(prop))
            if(index>-1){
                content='<a href="'+arUri[index+1].replace("$1",content)+'" target="_blank">'+content+'</a>';
            }
            if(label=="Image"){
                jQuery('#wikidataArea').prepend('<div class="field"><h3>'+label+"</h3><div>"+testDate(content)+"</div>");
            }
            else{
                jQuery('#wikidataArea').append('<div class="field"><h3>'+label+"</h3><div>"+testDate(content)+"</div>");
            }
        
        }
        jQuery('#wikidataArea').append('<div class="field"><h3>'+__("Gehe zur Wikidata-Seite")+'</h3><div>'+logo+"</div>");
        return ;
        }


    /* Preparing the detail page*/
    function prepareDetails(data,type){
        var uStr = "", logo;
        var content, label;
        var arUri=getAuthorityURI();
        var prop=0;
        var re = new RegExp("%20", 'g');
        console.log(arUri);
        for(i=0; i< data.length;i++){
            content=data[i].val;
            label=data[i].propLabel;
            prop=data[i].propNumber;
            console.log(label);
            if (label==null || label==undefined){
                label=" ";
                content=".";
                continue;
            }
            var index;
            if (label=="Name"){
                content="<b>"+content+"</b>";
            }
            if (content.substr(0,4).toLowerCase()=="http"){
                content='<a href="'+content+'" target="_blank">'+content+"</a>";
            }
            if (label=="Description"){
                content=""+content+"";
            }
            if (label=="Wikidata"){
                logo='<a target="_blank" href="'+data[i].val+'" title="'+__("Gehe zur Wikidata-Seite")+'"><img src="/plugins/arPotsdamPlugin/images/wd.png"/></a>';
                continue;
            }
            if (label=="Image"){
                content=jQuery(content).attr("href");
                filename=content.substring(content.lastIndexOf('/')+1);
                filename=filename.replace(re,"_");
                console.log(content,filename)
                imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/" + MD5(filename).substring(0,1) +"/"+MD5(filename).substring(0,2) +"/"+filename +"/200px-"+filename;
                content='<img src="'+imgLink+'" />';
                label="";
                trenner="";
            }
            index=arUri.indexOf(parseInt(prop))
            console.log(index, prop);
            if(index>-1){
                link=arUri[index+1].replace("$1",content)
                if (prop==213){
                    link=link.replace(new RegExp('\ ','g'),"");
                }
                content='<a href="'+link+'" target="_blank">'+content+'</a>';
            }
            uStr+='<div class="field"><h3>'+label+"</h3><div>"+testDate(content)+"</div></div>";
        }
        uStr+="" + logo;
        return uStr;
    }
    
    /*Preparing the AtoM search, getting all labels and altLabels in de, en, fr from Wikidata */
    function searchFromWd(id){
        var labels;
        labels=getLabels(id);
    }
    
    
    function getLabels(id){
        return getFromWd(buildWdQuery('labels',id,"", culture)[0],"", 'labels');
    };
    
    /*Writes the content of fromFields in toFields inside () ; check also for duplicates
	(Just for better presentation of data in some cases */
    function concat(nodeData,toField, fromFields){
        var tmp="";
        var tmp_to=[]
        for (i=0;i<nodeData.length;i++){
            for (j=0;j<fromFields.length;j++){
                tmp+=nodeData[i][fromFields[j]] + "|";
                                    console.log(j,nodeData[i][fromFields[j]], nodeData[i]);
            }
            tmpArray=tmp.split("|");
            console.log(tmpArray);
            for (k=0;k<tmpArray.length;k++){
                console.log(tmpArray[k] ,nodeData[i][toField], tmp_to);
                if(tmp_to.indexOf( tmpArray[k] ) ==-1){
                    if(tmpArray[k] != nodeData[i][toField]){
                        tmp_to.push(tmpArray[k]);
                    }
                }
            }
            altNames=tmp_to.join(", ")
            if (altNames.length>0){
                altNames=altNames.slice(0,altNames.length-2) ;
            }
            nodeData[i]["h3"] =  altNames;
            tmp="";
            tmp_to=[];
        }
        return nodeData;
    }
    

	/*Writing WD entity data into AtoM autority data details*/
    function showEntityFromWd(){
        link=(jQuery("#controlArea a").attr("href"))
        if(typeof link === "undefined"){
                return;
            };
        if (link.indexOf("wikidata.org/entity")>-1){
            wdId=link.substring(link.lastIndexOf('/')+1);
            console.log(wdId);
            type="detailed_data";
            prop="";
            query=buildWdQuery(type, wdId,prop,culture);
            sub=getFromWd(query[0],"show_authority",query[1]);
        }
    }

    /*Starting a search inside AtoM unsing a term from the thesaurus*/
    function searchAtoM(name,wdId){
               window.location.replace(document.location.origin+"/index.php/informationobject/browse?topLod=0&query="+name+"&repos=");
            }
    
/*************************************** Getting a publication list from authorities (Yet to create) *******************************************************/    
    function get_literature(url){
            console.log("dnb start" + url);
            {showLoader()};
            jQuery.put(url,data,
            function(html, status){
                analyze_literature(html);
                showLoader();
            }).fail(function(){console.log("Fails"),showLoader()});
            return ;
    }
    function analyze_literature(html){
        console.log(html);
    }

/***********************************************  TRANSLATION ****************************************************************** */    
    
     /* Preparing the div for the translation tool */
     function showTranslation(clickedWord){
            CALLCOUNT+=1;
            clickedWord=clickedWord.match(/[a-zäöüßéàáêèôûâëïîæńṅṁçõãœ]*/i)[0];    
            clickedWord=encodeURI(clickedWord);
            showLoader();
            var page = clickedWord;
            var baseURL = 'http://de.wiktionary.org';
            jQuery('#wikiInfo').html('...please wait...');
            jQuery.getJSON(baseURL+'/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page='+page,
            function(json) {
                showLoader();
                console.log(json['error']==undefined);
                if(json['error']==undefined) {
                  txt3=prepTranslation(json.parse.text['*'], [])
                } else {
                if (clickedWord!=clickedWord.toLowerCase()){
                    CALLCOUNT-=1;
                    showTranslation(clickedWord.toLowerCase());
                }
                jQuery('#popup-content').html("");
                jQuery('#popup-content').html("<h2>"+__('Word nicht gefunden')+"</h2>");
              }
            })
        
        };
    
	/* Analyzing Wictionary's feedback */
    function prepTranslation(txt, t){
        var out;
        var item;
        var h=jQuery.parseHTML(txt);
        h[0]['childNodes'].forEach(function(item,index){
            if(["H2","H3", "P", "H4", "DIV", "DL"].indexOf(item.nodeName)>-1){
                t.push([item.nodeName,item.innerText.trim()]);
                };        
            });
            for (i=0;i<t.length-1;i++){
                if(t[i][0] =="H2"){
                    out+="<h2>"+t[i][1].replace("[Bearbeiten]","")+"</h2>"
                }
                if(t[i][0] =="H3"){
                    out+="<h3>"+t[i][1].replace("[Bearbeiten]","")+"</h3>"
                }
                if (t[i][1]=="Bedeutungen:"){
                    item=t[i+1][1]
                
                    item=item.replace(new RegExp('\r?\n','g'), '<br />');

                    item=item.replace("<br /><br />","<br />");
                    out+="<p>"+item+"</p>"
                }
                if (t[i][1]=="Grammatische Merkmale:"){
                    
                    item=t[i+1][1]
                    item=item.replace(new RegExp('\r?\n','g'), '<br />');

                    item=item.replace("<br /><br />","<br />");
                    if(CALLCOUNT<2){
                        if (item.indexOf("flektierte")>-1){
                            return showTranslation(item.match(/([a-zäöüßéàáêèôûâëïîæńṅṁçõãœ]*)\./i)[1].trim(":").trim(")").trim("("));
                            }
                    }
                    out+="<p>"+item+"</p>"
                }
                if (t[i][0]=="H4"){
                    
                    item=t[i+1][1]
                    console.log(encodeURI(item));
                    item=item.replace(/([a-zäöüßéàáêèôûâëïîæńṅṁçõãœå\)\(\u00a0]*)\u00a0→\u00a0([\w\)\(\ ]*)/img,'<a href="http://$2.wiktionary.org/wiki/\$1" target="blank">\$1</a>');
                    /*item=item.replace(/\u00a0([\w])h/mg,"$1");*/
                    item=item.replace(new RegExp('\n\n','g'), '\n');
                    item=item.replace(new RegExp('\n\n','g'), '\n');
                    item=item.replace(new RegExp('\r?\n','g'), '<br />');
                    
                    item=item.replace("<br /><br />","<br />");
                    out+="<p>"+item+"</p>"
                }
            }
            ;
            console.log(out);
            
            out=out.replace("undefined","");
            /*jQuery('#popup-translation-content').html("");
            
            jQuery('#popup-translation-content').html(out);*/
            jQuery('#popup-content').html("");
            jQuery('#popup-content').html(out);
            return out;
    }    
    
	/*Handling the popup*/
    function switchTranslationMode(element){
        console.log(jQuery("#lookup img").attr("alt"));    
        v=jQuery("#lookup img").attr("alt");
        if (jQuery("#lookup img").attr("alt")=="aus"){
            jQuery("#lookup img").attr("alt", "ein");
            jQuery("#lookup img").attr("src", "/plugins/arPotsdamPlugin/images/book_green.png");
            jQuery('#content').css('cursor', 'help');
            saveContent();
            jQuery('#content p, \
                    #content a, \
                    #content li, \
                    .title, \
                    .scopenAnContent,\
                    .immediateSourceOfAcquisitionOrTransfer,\
                    .extentAndMedium,\
                    .systemOfArrangement,\
                    .conditionsGoverningReproduction, \
                    .physicalCharacteristics,\
                    .relatedUnitsOfDescription,\
                    .relatedMaterialDescriptions\
                    .read-more\
                    ').html(function () {
                            var cont = [];
                            return "<span>" + jQuery(this).text().split(" ").join("</span> <span>") + "</span>";
                            }).on("click", "span", function(event) {
                                            CALLCOUNT=0;
                                            links=event.pageX+"px";
                                            oben=(event.pageY+20)+"px";
                                            console.log(links + "|"+oben);
                                            jQuery('#popup-form').remove();
                                            jQuery('#popup').css('position',"absolute");
                                            jQuery('#popup').css('z-index',"20");
                                            jQuery('#popup').css('top',oben);
                                            jQuery('#popup').css('left',links);    
                                            jQuery('#popup').css('display',"block");
                                            jQuery('#popup').css('overflow-y',"auto");
                                            jQuery('#popup').css('min-height',"300px");
                                            jQuery('#popup-content').html("");
                                            console.log(jQuery('#popup').css('top'));
                                            jQuery('#popup-closer').attr('class','ol-popup-closer translation-closer');
                                            jQuery('#popup').on('click','.translation-closer',function(){jQuery('#popup').css('display',"none");});

                                            var clickedWord = jQuery(this).text();
                                            console.log(clickedWord);
                                            showTranslation(clickedWord);
                                            });
                    jQuery('#popup-translation').css('left',0);      // <<< use pageX and pageY
                    jQuery('#popup-translation').css('top',jQuery('#content').css("top"));
                    console.log(jQuery('#content'));
                    jQuery('#popup-translation').css('width',(jQuery('#content').position().left-25) +"px");
                    console.log(jQuery('#content').position().left);
        }
        else{
            
            jQuery("#lookup img").attr("alt", "aus");
            jQuery("#lookup img").attr("src", "/plugins/arPotsdamPlugin/images/book_red.png");
            jQuery('#content').css('cursor', 'default');
            restoreContent();
            jQuery('#content').off("mouseover", "span");
        }
 
    }    


/***********************I18N***********************************/

    function __(term){
        var count=1;
        if (culture=="de"){
            return term
        }
        if(culture=="fr"){
            count=2;
        }
        var pos = I18N.indexOf(term);
        if (pos==-1){
            return term;
        }
        return(I18N[pos+count]);
    }

/*************************CALLER*********************************/    
    
    
    jQuery('#popup-search').click(function () {
        var ar=[];
        jQuery('#ortsliste option:selected').each(function(){
            ar.push(jQuery(this).val());
        });
        lookupPlaces(ar);
    });
    
    jQuery('#popup-select').click(function () {
        jQuery('#ortsliste option').prop('selected', true);
    });

    jQuery('#lookup').click(function(){
        switchTranslationMode(this);
    })


/*****************************************************  Loading Scripts ***********************************************/
 
 function load_ol(){
         jQuery.getScript('https://openlayers.org/en/v4.6.4/build/ol.js', function(){
            jQuery.getScript('https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL', function(){
                showMap();
            });
        });
    }

 function load_wd(){
                 showWD();
    }


/************************************************************* FONT TOOL******************************************************/

    function showFontTool(){
        saveContent();
        fontToolInit();
    }
    
    function fontToolInit(){
    
          jQuery('#wrapper').html('<h1>'+__("Lesehilfe")+'</h1>\
                                    <h3>'+__("Klicke auf die einzelnen Buchstaben, um ein Wort zu bilden")+'</h3>\
                                    <div id="close-map">\
                                    <div  class="input-append" id="font-kurrent" value="" type="text"></div>\
                                    <div  class="input-append" id="font-humanistic" value="" type="text" ></div>\
                                    <li class="c-btn" id="font-clear">'+__("Eingabe löschen")+'</li>\
                                    <li class="c-btn" id="font-back">'+__("Letztes Zeichen löschen")+'</li>\
                                    <li class="c-btn" id="font-confirm">'+__("Bestätigen und Suchen")+'</li>\
                                    <select id="font-change"></select>\
                                    \
                                 </div><div id="content">\
                                </div>'
                                );
            for (i=0;i<FONTS.length;i++){
                jQuery('#font-change').append(jQuery("<option/>").html(FONTS[i][0]).attr("value",i));
            }        
                    
            jQuery("#font-change").val(4);
            jQuery('#wrapper').on("change","#font-change",function(event){create_letters(jQuery("#font-change option:selected").val())});
            create_letters(4);    
            jQuery('#wrapper').on('click','#font-clear',function(event){
                                            updateFontCursor('clear')}
                                            );
            jQuery('#wrapper').on('click','#font-back',function(event){updateFontCursor('remove'), wordLookup()});    
            jQuery('#wrapper').on('click','#font-confirm',function(event){window.location.replace(document.location.origin+"/index.php/informationobject/browse?topLod=0&query="+FONTCURSOR['hValue']+FONTCURSOR['proposal_suffix']+"&repos=")});                                
    }


    function create_letters(fnumber){
        console.log(jQuery("#wrapper").data("events")) ;
        jQuery('#wrapper').off('click','.letter');
        console.log(jQuery("#wrapper").data("events") );
        console.log();
        console.log(fnumber);
        FONTNUMBER=fnumber;
        fontname=FONTS[FONTNUMBER][0];
        jQuery( ".letter" ).remove();
        letters=FONTS[FONTNUMBER][1];
        for (i=0;i<letters.length;i++){
            if (letters[i]==" "){
                jQuery("#content").append('<div class="letter c-btn" style="display:block; margin:0px">&nbsp;</div>');
            }
            else{
            jQuery("#content").append('<div class="letter" id="letter-'+letters[i].charCodeAt(0)+'"  title="'+get_letter(letters[i])+'">'+letters[i]+'</div>');
            }    
        }
        jQuery('.letter').css('font-family','"'+fontname+'"');
        jQuery('#font-kurrent').css('font-family','"'+fontname+'"');
        jQuery('#wrapper').on('click','.letter',function(){
                code=jQuery(this).attr("id");
                code=code.slice(7,15);
                updateFontCursor("add",code);
                wordLookup()
            });
        updateFontCursor("update");
    }

    function get_letter(c){
        var transcripts=FONTS[FONTNUMBER][2].split(" ");
        
        return transcripts[FONTS[FONTNUMBER][1].indexOf(c)];
    }
    
    
    function wordLookup(){
        word=FONTCURSOR['hValue'];
        if (word.length<2){return};
        console.log(word);
        var query={"term":word};
        var index="words";
        var x = queryES(index,query,"corpus",word);        
    }
    
    function wordLookupCB(data,word){
        if (data.length>0){
            for (i=0;i<data.length;i++){
                if(data[i]['_source']['word'].indexOf(word)==0){
                    updateFontCursor("answer","",data[i]['_source']['word']);
                    return;
                }
            }
        }
    }


    function updateFontCursor(action,code="", answer=""){
        FONTCURSOR['proposal']="";
        FONTCURSOR['proposal_suffix']="";
        if(action=="remove"){
                v=get_letter(FONTCURSOR['kValue'].slice(-2,-1));
                FONTCURSOR['hValue'] = FONTCURSOR['hValue'].slice(0,v.length * -1);
                FONTCURSOR['kValue'] = FONTCURSOR['kValue'].slice(0,-1);
            }
        if(action=="clear"){
                FONTCURSOR['hValue'] = "";
                FONTCURSOR['kValue'] = "";
            }
        if(action=="add"){
                FONTCURSOR['kValue'] +=String.fromCharCode(code) ;
                FONTCURSOR['hValue'] +=get_letter(String.fromCharCode(code));
            }
        if(action=="confirm"){};
        if(action=="answer"){
                FONTCURSOR['proposal']=answer;
                FONTCURSOR['proposal_suffix']=FONTCURSOR['proposal'].replace(FONTCURSOR["hValue"],"");
            }
        if(action=="update"){
            FONTCURSOR['kValue']=s(FONTCURSOR['hValue'])
        }
            
        jQuery('#font-humanistic').html(FONTCURSOR['hValue']);    
        jQuery('#font-kurrent').html(FONTCURSOR['kValue']+"<span>"+FONTCURSOR['proposal_suffix']+"</span>");    
        jQuery('#font-humanistic').html(FONTCURSOR['hValue']+"<span>"+FONTCURSOR['proposal_suffix']+"</span>");    
        console.log(FONTCURSOR);
    }
    
    
	/*Just a first try - Determine whis s should be presented, stil lots of errors in the middle of a word*/
    function s(word){
        ks=jQuery("#font-change").val()[3];
        ls=jQuery("#font-change").val()[4];
        vokal=["a","e","i","o","u"];
        fugen_s=["tum", "ling", "ion", "tät", "heit", "keit", "schaft", "sicht", "ung"];
        k_fugen_s=["er","el","sch","ß", "st", "tz", "z"];
        lastChar="";
        newWord=""
        if (word.indexOf(word)==-1){
            return word;
        }
        else{
            for (i=0;i<word.length;i++){
                if(word[i]=="s"){
                    if (i==0){
                        newWord+=ls;
                    }
                    if (i==word.length-1){
                        newWord+=ks;
                    }
                    else{
                        if(word[i+1]=="s"){
                            newWord+=ls+ls;
                            i+=1
                        }
                        else{
                            check=0;
                            for(j=0;j<fugen_s.length;j++){
                                if (i>fugen_s[j].length){
                                    if(fugen_s[j]==word.slice(i-fugen_s[j].length,i-1)){
                                        check=1;
                                    }    
                                }
                            }
                            for(j=0;j<k_fugen_s.length;j++){
                                if (i>k_fugen_s[j].length){
                                    if(k_fugen_s[j]==word.slice(i-k_fugen_s[j].length,i-1)){
                                        check=-1;
                                    }    
                                }
                            }
                            if(check==1){
                                newWord+=ks;
                            }
                            else{
                                newWord+=ls;
                            }
                            if(vokal.indeOf(word[i+1])>-1){
                                newWord+=ls;
                            }
                        }
                    }
                }
                else{
                    newWord+=word[i];
                }
            }
            return word;
        }
    }
/***********************************************************************************************************************/


    function getAuthorityURI(){
        return     [4389,'https://collection.sciencemuseum.org.uk/people/$1'
                ,4394,'http://braininfo.rprc.washington.edu/centraldirectory.aspx?ID=$1'
                ,4395,'http://braininfo.rprc.washington.edu/centraldirectory.aspx?type=h&ID=$1'
                ,4427,'http://id.agrisemantics.org/gacs/C$1'
                ,4440,'http://catalogo.iib.unam.mx/F/-/?func=find-b&find_code=SYS&local_base=BNM10&format=999&request=$1'
                ,4460,'http://formats.kaitai.io/$1/'
                ,4466,'http://astrothesaurus.org/uat/$1'
                ,4515,'https://www.prisma.de/$1'
                ,4520,'https://suncat.ac.uk/serials/SCID$1'
                ,4531,'https://chineseposters.net/artists/$1.php'
                ,4549,'https://arlima.net/no/$1'
                ,4553,'http://www.racollection.org.uk/ixbin/indexplus?_IXACTION_=file&_IXFILE_=templates/full/person.html&_IXTRAIL_=Names%C2%A0A-Z&person=$1'
                ,4558,'http://sig.mapama.es/93/ClienteWS/snczi/default.aspx?nombre=PRESA&claves=DGAGUA.PRESAS.CODPRESA&valores=$1'
                ,4574,'http://histreg.no/index.php/person/$1'
                ,4589,'http://www.dreadnoughtproject.org/tfs/index.php/$1'
                ,4591,'http://www.veterans.gc.ca/eng/remembrance/memorials/national-inventory-canadian-memorials/details/$1'
                ,4613,'http://esu.com.ua/search_articles.php?id=$1'
                ,4636,'https://v2.sherpa.ac.uk/id/funder/$1'
                ,4662,'http://www.san.beniculturali.it/web/san/dettaglio-soggetto-conservatore?codiSan=san.cat.sogC.$1'
                ,4694,'http://www.arquivo.arq.br/$1'
                ,4696,'https://ciqual.anses.fr/#/aliments/$1'
                ,4726,'http://signal.sciencespo-lyon.fr/revue/$1'
                ,4729,'http://nut.entecra.it/646/tabelle_di_composizione_degli_alimenti.html?idalimento=$1&quant=100'
                ,4750,'http://www.nationalhistoricships.org.uk/register/$1/'
                ,213, 'http://isni.org/isni/$1'
                ,214,'https://viaf.org/viaf/$1'
                ,227,'https://d-nb.info/gnd/$1'
                ,244,'https://id.loc.gov/authorities/$1'
                ,268,'http://catalogue.bnf.fr/ark:/12148/cb$1'
                ,269,'https://www.idref.fr/$1'
                ,270,'http://opac.calis.edu.cn/aopac/ajsp/detail.jsp?actionfrom=1&actl=CAL++$1'
                ,349,'https://id.ndl.go.jp/auth/ndlna/$1'
                ,377,'http://www.n2yo.com/satellite/?s=$1'
                ,409,'https://nla.gov.au/anbd.aut-an$1'
                ,428,'http://www.ipni.org/ipni/advAuthorSearch.do?find_abbreviation=$1'
                ,458,'https://www.marinetraffic.com/ais/details/ships/$1'
                ,486,'https://id.nlm.nih.gov/mesh/$1.html'
                ,486,'https://meshb.nlm.nih.gov/#/record/ui?ui=$1'
                ,493,'http://www.icd9data.com/getICD9Code.ashx?icd9=$1'
                ,494,'http://apps.who.int/classifications/icd10/browse/2016/en#/$1'
                ,502,'http://tools.wmflabs.org/wikidata-externalid-url/?p=502&url_prefix="http://www.nhc.noaa.gov/archive/&id=$1"'
                ,508,'http://thes.bncf.firenze.sbn.it/termine.php?id=$1'
                ,563,'http://codes.iarc.fr/search.php?cx=009987501641899931167%3A2_7lsevqpdm&cof=FORID%3A9&ie=UTF-8&ie=ISO-8859-1&oe=ISO-8859-1&sa=&q=$1'
                ,586,'http://www.ipni.org/ipni/idAuthorSearch.do?id=$1'
                ,587,'https://www.marinetraffic.com/ais/details/ships/$1'
                ,646,'https://g.co/kg$1'
                ,648,'https://openlibrary.org/works/$1'
                ,650,'https://rkd.nl/en/explore/artists/$1'
                ,672,'http://id.nlm.nih.gov/mesh/$1'
                ,686,'http://amigo.geneontology.org/amigo/term/$1'
                ,691,'http://aut.nkp.cz/$1'
                ,691,'https://aleph.nkp.cz/F/?func=find-c&local_base=aut&ccl_term=ica=$1&CON_LNG=ENG'
                ,731,'https://litholex.bgr.de/gesamt_ausgabe_neu.php?id=$1'
                ,863,'https://inpho.cogs.indiana.edu/$1.html'
                ,906,'https://libris.kb.se/auth/$1'
                ,918,'http://www5.hrsdc.gc.ca/noc/english/noc/2011/Profile.aspx?val=7&val1=$1'
                ,919,'http://tools.wmflabs.org/wikidata-externalid-url/?p=919&url_prefix="http://www.bls.gov/soc/2010/soc&url_suffix=.htm&id=$1"'
                ,920,'http://id.sgcb.mcu.es/Autoridades/$1/concept.html'
                ,949,'http://aleph.nli.org.il/F/?func=find-b&local_base=NNL10&find_code=SYS&con_lng=eng&request=$1'
                ,950,'http://datos.bne.es/resource/$1'
                ,951,'http://viaf.org/processed/NSZL%7C$1'
                ,1005,'http://urn.bn.pt/nca/unimarc-authorities/txt?id=$1'
                ,1006, 'http://opc4.kb.nl/PPN?PPN=$1'
                ,1014,'http://vocab.getty.edu/page/aat/$1'
                ,1015,'https://authority.bibsys.no/authority/rest/authorities/html/$1'
                ,1017,'https://viaf.org/viaf/sourceID/BAV|$1'
                ,1036,'http://dewey.info/class/$1/'
                ,1047,'http://www.catholic-hierarchy.org/bishop/b$1.html'
                ,1051,'http://psh.techlib.cz/skos/PSH$1'
                ,1149,'http://id.loc.gov/authorities/classification/$1.html'
                ,1150,'http://rvk.uni-regensburg.de/regensburger-verbundklassifikation-online#notation/$1'
                ,1207,'https://viaf.org/processed/NUKAT|$1'
                ,1256,'http://iconclass.org/$1'
                ,1273,'http://cantic.bnc.cat/registres/CUCId/$1'
                ,1284,'https://www.munzinger.de/search/go/document.jsp?id=$1'
                ,1294,'http://www.worldwildlife.org/ecoregions/$1'
                ,1296,'https://www.enciclopedia.cat/EC-GEC-$1.xml'
                ,1315,'http://trove.nla.gov.au/people/$1'
                ,1362,'http://tls.theaterwissenschaft.ch/wiki/$1'
                ,1375,'http://katalog.nsk.hr/F/?func=direct&doc_number=$1&local_base=nsk10'
                ,1385,'http://www.culturacores.azores.gov.pt/ea/pesquisa/Default.aspx?id=$1'
                ,1394,'http://glottolog.org/resource/languoid/id/$1'
                ,1402,'http://xiphoid.biostr.washington.edu/fma/fmabrowser-hierarchy.html?fmaid=$1'
                ,1417,'https://www.britannica.com/$1'
                ,1453,'http://www.catholic.ru/modules.php?name=Encyclopedia&op=content&tid=$1'
                ,1550,'http://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=EN&Expert=$1'
                ,1645,'http://physics.nist.gov/cgi-bin/cuu/Value?$1'
                ,1670,'https://www.collectionscanada.gc.ca/canadiana-authorities/index/view?index_name=cdnAutNbr&search_text=$1&page=1&cdnAutNbr=$1'
                ,1695,'http://mak.bn.org.pl/cgi-bin/KHW/makwww.exe?BM=01&IM=04&NU=01&WI=$1'
                ,1711,'https://collection.britishmuseum.org/id/person-institution/$1'
                ,1755,'http://aviation-safety.net/database/record.php?id=$1'
                ,1760,'http://aviation-safety.net/wikibase/wiki.php?id=$1'
                ,1769,'http://denkxweb.denkmalpflege-hessen.de/cgi-bin/mapwalk.pl?event=Query.Details&obj=$1'
                ,1807,'http://www.enciclopedia-aragonesa.com/voz.asp?voz_id=$1'
                ,1819,'http://www.genealogics.org/getperson.php?personID=$1&tree=LEO'
                ,1900,'http://www.eagle-network.eu/voc/$1'
                ,1928,'http://www.ontobee.org/browser/rdf.php?o=VO&iri="http://purl.obolibrary.org/obo/$1"'
                ,1938,'https://www.gutenberg.org/ebooks/author/$1'
                ,1946,'http://catalogue.nli.ie/Record/$1'
                ,2004,'http://lod.nal.usda.gov/nalt/$1'
                ,2026,'https://avibase.bsc-eoc.org/species.jsp?avibaseid=$1'
                ,2106,'http://www.rsc.org/publishing/journals/prospect/ontology.asp?id=$1'
                ,2158,'http://purl.obolibrary.org/obo/$1'
                ,2163,'http://id.worldcat.org/fast/$1'
                ,2179,'https://dl.acm.org/buildccscode.cfm?id=$1&lid=f'
                ,2263,'http://www.isocat.org/rest/dc/$1'
                ,2347,'http://www.yso.fi/onto/yso/p$1'
                ,2355,'http://www.unesco.org/languages-atlas/en/atlasmap/language-id-$1.html'
                ,2357,'https://nces.ed.gov/ipeds/cipcode/cipdetail.aspx?y=55&cip=$1'
                ,2367,'http://dbforms.ga.gov.au/pls/www/geodx.strat_units.sch_full?wher=stratno=$1'
                ,2372,'http://www.odis.be/lnk/$1'
                ,2397,'https://www.youtube.com/channel/$1'
                ,2452,'http://www.geonames.org/ontology#$1'
                ,2457,'https://dmzapp17p.ris.environment.gov.au/shipwreck/public/wreck/wreck.do?key=$1'
                ,2464,'http://bugguide.net/node/view/$1'
                ,2477,'https://www.tbrc.org/#!rid=$1'
                ,2479,'https://spdx.org/licenses/$1.html'
                ,2581,'http://babelnet.org/synset?word=bn:$1'
                ,2612,'https://www.ted.com/topics/$1'
                ,2671,'https://g.co/kg$1'
                ,2689,'http://bartoc.org/en/node/$1'
                ,2742,'http://www.ga.gov.au/provexplorer/provinceDetails.do?eno=$1'
                ,2748,'https://www.nationalarchives.gov.uk/pronom/$1'
                ,2751,'http://rcdb.com/$1.htm'
                ,2752,'http://www.nzor.org.nz/names/$1'
                ,2760,'http://archive.foodstandards.gov.au/consumerinformation/nuttab2010/nuttab2010onlinesearchabledatabase/onlineversion_code.cfm?&action=getFood&foodID=$1'
                ,2812,'http://mathworld.wolfram.com/$1.html'
                ,2863,'http://www.molendatabase.nl/nederland/molen.php?nummer=$1'
                ,2866,'http://www.molens.nl/nl/molen/zoek-een-molen/zoekresultaten-molenbestand/molendetail/?molenid=$1'
                ,2867,'http://www.molenechos.org/molen.php?AdvSearch=$1'
                ,2874,'https://pubchem.ncbi.nlm.nih.gov/bioassay/$1'
                ,2924,'https://bigenc.ru/text/$1'
                ,2950,'http://nomisma.org/id/$1'
                ,3021,'http://www.iranicaonline.org/articles/$1'
                ,3040,'https://soundcloud.com/$1'
                ,3064,'http://www.nhm.ac.uk/jdsml/research-curation/research/projects/lepindex/detail.dsml?TaxonNo=$1'
                ,3065,'http://data.rero.ch/$1'
                ,3074,'http://www.gracesguide.co.uk/$1'
                ,3088,'http://taibnet.sinica.edu.tw/chi/taibnet_species_detail.php?name_code=$1'
                ,3088,'http://taibnet.sinica.edu.tw/eng/taibnet_species_detail.php?name_code=$1'
                ,3102,'http://www.plantarium.ru/page/view/item/$1.html'
                ,3105,'http://www.tela-botanica.org/bdtfx-nn-$1'
                ,3106,'https://www.theguardian.com/$1'
                ,3123,'http://plato.stanford.edu/entries/$1'
                ,3130,'http://plantnet.rbgsyd.nsw.gov.au/cgi-bin/NSWfl.pl?page=nswfl&lvl=sp&name=$1'
                ,3133,'http://nektar.oszk.hu/auth/$1'
                ,3180,'https://vndb.org/$1'
                ,3183,'http://topics.wsj.com/$1'
                ,3201,'http://purl.bioontology.org/ontology/MEDDRA/$1'
                ,3221,'https://www.nytimes.com/topic/$1'
                ,3222,'https://www.ne.se/uppslagsverk/encyklopedi/lång/$1'
                ,3235,'http://philpapers.org/browse/$1'
                ,3240,'https://data.nbn.org.uk/Taxa/$1'
                ,3241,'http://www.newadvent.org/cathen/$1.htm'
                ,3265,'https://myspace.com/$1'
                ,3267,'https://www.flickr.com/photos/$1'
                ,3285,'http://www.ams.org/mathscinet/msc/msc2010.html?t=$1'
                ,3289,'https://web.expasy.org/cellosaurus/$1'
                ,3308,'https://lib.reviews/thing/$1'
                ,3322,'https://www.vlinderstichting.nl/vlinders/overzicht-vlinders/details-vlinder/?vlinder=$1'
                ,3328,'http://www.wurvoc.org/vocabularies/om-1.8/$1'
                ,3347,'https://permid.org/1-$1'
                ,3348,'http://nlg.okfn.gr/resource/authority/record$1'
                ,3365,'http://www.treccani.it/enciclopedia/$1'
                ,3370,'http://www.geopatronyme.com/nomcarte/$1'
                ,3381,'http://fileformats.archiveteam.org/wiki/$1'
                ,3390,'http://unicat.nlb.by/opac/pls/dict.prn_ref?tu=r&tq=v0&name_view=va_all&a001=BY-NLB-ar$1&strq=l_siz=20'
                ,3398,'http://www.butterfliesandmoths.org/$1'
                ,3400,'http://cordis.europa.eu/projects/$1'
                ,3420,'http://www.calflora.org/cgi-bin/species_query.cgi?where-calrecnum=$1'
                ,3430,'http://snaccooperative.org/ark:/99166/$1'
                ,3479,'http://www.aftonbladet.se/tagg/$1'
                ,3545,'http://www.theoi.com/$1.html'
                ,3552,'https://connectonline.asic.gov.au/RegistrySearch/faces/landing/panelSearch.jspx?searchType=OrgAndBusNm&searchText=$1'
                ,3553,'https://www.zhihu.com/topic/$1'
                ,3579,'http://weibo.com/$1'
                ,3583,'http://www.surfline.com/surfaz/surfaz.cfm?id=$1'
                ,3591,'http://wcsp.science.kew.org/namedetail.do?name_id=$1'
                ,3710,'http://www.daat.ac.il/encyclopedia/value.asp?id1=$1'
                ,3720,'https://www.gpnotebook.co.uk/simplepage.cfm?ID=$1'
                ,3724,'https://www.ushmm.org/wlc/en/article.php?ModuleId=$1'
                ,3762,'https://openmlol.it/autore/$1'
                ,3763,'http://www.mimo-db.eu/InstrumentsKeywords/$1'
                ,3790,'http://animecons.com/guests/bio.shtml/$1'
                ,3794,'http://dictionaryofsydney.org/$1'
                ,3795,'http://flora.org.il/plants/$1'
                ,3798,'http://www.starwars.com/databank/$1/'
                ,3827,'https://www.jstor.org/topic/$1'
                ,3832,"http://www.europeanafashion.eu/portal/browse.html#objectType%3D'http%3A%2F%2Fthesaurus.europeanafashion.eu%2Fthesaurus%2F$1"
                ,3847,'https://openlibrary.org/subjects/$1'
                ,3854,'http://www.soundtrackcollector.com/title/$1/'
                ,3859,"https://www.ebi.ac.uk/ols/ontologies/envo/terms?iri=http://purl.obolibrary.org/obo/ENVO_$1"
                ,3885,'http://www.histmodbiomed.org/taxonomy/term/$1'
                ,3895,'http://www.inao.gouv.fr/produit/$1'
                ,3905,'http://data.culture.fr/thesaurus/page/ark:/67717/$1'
                ,3911,'http://zbw.eu/stw/descriptor/$1'
                ,3916,'http://vocabularies.unesco.org/thesaurus/$1'
                ,3941,'http://www.iaa-archives.org.il/search.aspx?loc_id=$1'
                ,3943,'https://$1.tumblr.com/'
                ,3964,'http://bibliotecadigital.jcyl.es/en/consulta_aut/registro.cmd?id=$1'
                ,3964,'http://bibliotecadigital.jcyl.es/es/consulta_aut/registro.cmd?id=$1'
                ,3964,'http://bibliotecadigital.jcyl.es/fr/consulta_aut/registro.cmd?id=$1'
                ,3973,'https://resolver.pim.hu/auth/$1'
                ,3984,'https://www.reddit.com/r/$1/'
                ,3986,'http://www.sequenceontology.org/browser/current_svn/term/$1'
                ,3998,'http://censoarchivos.mcu.es/CensoGuia/archivodetail.htm?id=$1'
                ,4003,'https://www.facebook.com/pages/$1'
                ,4051,'http://zakon5.rada.gov.ua/laws/show/$1'
                ,4073,'http://$1.wikia.com/'
                ,4104,'http://data.carnegiehall.org/names/$1'
                ,4106,'http://www.kyppi.fi/to.aspx?id=112.$1'
                ,4125,'http://titan.gbif.fr/sel_genann1.php?numero=$1'
                ,4160,'https://restaurant.michelin.fr/$1'
                ,4167,'https://www.dn.no/topic/$1'
                ,4180,'http://gujlit.com/profile.php?pId=$1'
                ,4201,'https://www.pagesjaunes.fr/pros/$1'
                ,4204,'http://timesofindia.indiatimes.com/topic/$1'
                ,4223,'http://www.treccani.it/enciclopedia/$1_(Enciclopedia-Italiana)/'
                ,4228,'http://www.eoas.info/biogs/$1.htm'
                ,4255,'http://en.banglapedia.org/index.php?title=$1'
                ,4272,'https://dp.la/search?subject%5B%5D=$1'
                ,4293,'http://purl.org/pressemappe20/folder/$1'
                ,4294,'http://www.crd.york.ac.uk/PROSPERO/display_record.asp?ID=$1'
                ,4297,'https://spatialillusions.com/unitgenerator.html#$1'
                ,4304,'https://id.erfgoed.net/thesauri/materialen/$1'
                ,4305,'https://id.erfgoed.net/thesauri/stijlen_en_culturen/$1'
                ,4306,'https://id.erfgoed.net/thesauri/datering/$1'
                ,4307,'https://id.erfgoed.net/thesauri/erfgoedtypes/$1'
                ,4308,'https://id.erfgoed.net/thesauri/waardetypes/$1'
                ,4309,'https://id.erfgoed.net/thesauri/gebeurtenistypes/$1'
                ,4310,'https://id.erfgoed.net/thesauri/besluittypes/$1'
                ,4311,'https://id.erfgoed.net/thesauri/soorten/$1'];
      
    }


/******************************   end of jQuery.document(ready) ***************************************************/

});

    /* The 118n array */
    function get_i18n(){
        return [
            "Gehe zur Wikidata-Seite","Go to the the Wikidata entry", "Montre la page sur Wikidata",
            '<h3>Thesaurus</h3>Rechts sehen Sie eine Liste von Entitäten.<br /> Klicken Sie auf ein Element um sich weitere Details anzeigen zu lassen.<br />Mit der Lupe können sie nach dem begriff in der Datenbank suchen.<br />Alle Daten werden direkt aus Wikidata abgefragt. (Siehe auch: <a href="http://wikidata.org" target="blank">www.wikidata.org</a>',
                    '<h3>Thesaurus</h3>On the right you will see a list of entities.<br />Click on any node of the tree to show detailled information or child nodes. <br/>Click on the magnifying glass to search related records.<br />All information within this tool are results of on Wikidata queries. (see also : <a href="http://wikidata.org" target="_blank">www.wikidata.org</a>)',
                    '<h3>Thesaurus</h3>À côté droit vous voyez une liste des entités.<br />Cliquez sur un element pour voir plus de datails<br/>Clique sur la loupe pour chercher des dossiers relatives dans la base de données<br />Toutes les informations viennent directement du site Wikidata. (Voir aussi: : <a href="http://wikidata.org" target="_blank">www.wikidata.org</a>)',
            "Keine Daten vorhanden","No data available", "données non disponibles"
        ]
        
    }

    function setCookie(key, value) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }
    
    /*Save and restore the #content div into a global variable*/
    function saveContent(){
        content=jQuery('#main-column').html();
        }
    
    function restoreContent(){
        jQuery('#main-column').html(content);
        }

	/* The turning symbol */
    function showLoader(){
        if (jQuery('.loader').css("display")=="none"){
            jQuery('.loader').css("display", "inline-block")
        }
        else{
            jQuery('.loader').css("display", "none")
        }
    }

	/*Dealing with the Wikidata date precision*/
    function testDate(wdDate,precision="9"){
        if (wdDate.match(/[0-9-]{10}T[0-9:]{8}Z/i) == null){return wdDate};
        var year = wdDate.slice(0,4);
        var month=wdDate.slice(5,7);
        var day= wdDate.slice(8,10);
        if (precision=="9"){return year};
        if (precision=="10"){return month +'/'+year};
        return day + "." +month +'.'+year;
    }


    /* Set and get cursor postion in an input*/
    jQuery.fn.setCursorPosition = function(pos) {
      this.each(function(index, elem) {
        if (elem.setSelectionRange) {
          elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
      });
      return this;
    };


    jQuery.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if (document.selection) {
            // IE
           input.focus();
        }
        return 'selectionStart' in input ? input.selectionStart:'' || Math.abs(document.selection.createRange().moveStart('character', -input.value.length));
     }

/****************************  THE END ***********************************/
