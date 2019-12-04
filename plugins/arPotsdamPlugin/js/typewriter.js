console.log("loading typewriter")
jQuery(document).ready(function() {
	showFontTool();
});
/************************************************************* FONT TOOL******************************************************/
function showFontTool() {
	saveContent();
	fontToolInit();
}

function fontToolInit() {
	jQuery('#wrapper').html('<div class="row"><div class="span3"><div id="sidebar"><div class="sticky-box"><div id="hits"> </div></div></div></div><div class=span9><div id="main-column"></div></div></div>');
	jQuery('#main-column').html('<div class="multiline-header">\
									<img alt="" src="/plugins/arPotsdamPlugin/images/SVG/ic_palaeographie.svg" />\
									<h1>' + __("Kurrent-Schreibmaschine") + '</h1>\
                                    <h3>' + __(44) + '</h3><p>' + __(45) + '</p></div>\
                                   <div class="sticky-box"> <div  class="input-append" id="font-kurrent" value="" type="text"></div>\
                                   <div class="tw-controls" style="display:flex">\
                                   <select id="font-change"></select>\
                                    <button class="btn" id="font-clear">' + __("Eingabe löschen") + '</button>\
                                    <button class="btn" id="font-back">' + __("Letztes Zeichen löschen") + '</button>\
                                    <button class="btn" id="font-confirm" style="">' + __("Relevante Dokumente") + '</button></div>\
                                    <div  class="input-append" id="font-humanistic" value="" type="text" ></div></div>\
                                 <div id="content" class="letter-box" style="padding:20px">   \
                                </div> ');
	for (var i = 0; i < FONTS.length; i++) {
		jQuery('#font-change').append(jQuery("<option/>").html(FONTS[i][0]).attr("value", i));
	}
	jQuery("#font-change").val(4);
	jQuery("#font-change").on("change", function(event) {
		create_letters(jQuery("#font-change option:selected").val());
		rewrite_hits();
	});
	create_letters(4);
	jQuery('#font-clear').on('click', function(event) {
		updateFontCursor('clear');
		jQuery('#hits').html("");
	});
	jQuery('#font-back').on('click', function(event) {
		updateFontCursor('remove'), wordLookup()
		if (FONTCURSOR['hValue'].length == 0) {
			jQuery('#hits').html("");
		}
	});
	jQuery('#font-confirm').on('click', function(event) {
		window.location.replace(document.location.origin + "/index.php/informationobject/browse?topLod=0&query=" + FONTCURSOR['hValue'] + FONTCURSOR['proposal_suffix'] + "&repos=")
	});
}

function rewrite_hits() {
	jQuery("#hits div").each(function() {
		jQuery(this).text(s(jQuery(this).attr("title")))
	})
}

function create_letters(fnumber) {
	jQuery('#main-column').off('click', '.letter');
	console.log();
	console.log(fnumber);
	FONTNUMBER = fnumber;
	var fontname = FONTS[FONTNUMBER][0];
	console.log(fontname);
	jQuery('#hits').css('font-family', "'" + String(fontname) + "'");
	jQuery(".letter").remove();
	var letters = FONTS[FONTNUMBER][1];
	for (var i = 0; i < letters.length; i++) {
		if (letters[i] == " ") {
			jQuery("#content").append('<div class="letter c-btn" >&nbsp;</div>');
		} else {
			jQuery("#content").append('<div class="letter" id="letter-' + letters[i].charCodeAt(0) + '"  title="' + get_letter(letters[i]) + '">' + letters[i] + '</div>');
		}
	}
	jQuery('.letter').css('font-family', '"' + fontname + '"');
	jQuery('#font-kurrent').css('font-family', '"' + fontname + '"');
	jQuery('#main-column').on('click', '.letter', function() {
		var code = jQuery(this).attr("id");
		code = code.slice(7, 15);
		updateFontCursor("add", code);
		wordLookup()
	});
	updateFontCursor("update");
}

function get_letter(c) {
	var transcripts = FONTS[FONTNUMBER][2].split(" ");
	return transcripts[FONTS[FONTNUMBER][1].indexOf(c)];
}

function wordLookup() {
	var word = FONTCURSOR['hValue'];
	if (word.length < 2) {
		return
	};
	console.log(word);
	var query = {
		"term": word
	};
	var index = "words";
	var x = queryES(index, query, "corpus", word);
}

function wordLookupCB(data, word) {
	re1= new RegExp(word);
	var uStr = ""
	console.log(data);
	jQuery('#hits').html("");
	jQuery('#hits').off('click', 'div');
	if (data.length > 0) {
		for (var i = 0; i < data.length; i++) {
			if(re1.test(s(data[i]['_source']['word']))==true || re1.test(data[i]['_source']['word'])==true  ){
				uStr += '<div title="' + data[i]['_source']['word'] + '">' + s(data[i]['_source']['word']) + "</div>";
				//console.log(uStr);
			}
		}
		for (var i = 0; i < data.length; i++) {
			if (data[i]['_source']['word'].indexOf(word) == 0) {
				updateFontCursor("answer", "", data[i]['_source']['word']);
				break
			}
		}
	}
	jQuery('#hits').html(uStr);
	jQuery('#hits').on('click', 'div', function() {
		history.pushState(null, null, "font-tool?c=" + jQuery('#font-kurrent').text() + "&font=" + jQuery('#font-kurrent').css("font-family"));
		window.open(document.location.origin + "/index.php/informationobject/browse?topLod=0&query=" + jQuery(this).attr('title') + "&repos=", "_blank");
	});
	return
}

function updateFontCursor(action, code, answer) {
	if (!code) code = "";
	if (!answer) answer = "";
	FONTCURSOR['proposal'] = "";
	FONTCURSOR['proposal_suffix'] = "";
	if (action == "remove") {
		v = get_letter(FONTCURSOR['kValue'].slice(-1));
		FONTCURSOR['hValue'] = FONTCURSOR['hValue'].slice(0, v.length * -1);
		FONTCURSOR['kValue'] = FONTCURSOR['kValue'].slice(0, -1);
	}
	if (action == "clear") {
		FONTCURSOR['hValue'] = "";
		FONTCURSOR['kValue'] = "";
	}
	if (action == "add") {
		FONTCURSOR['kValue'] += String.fromCharCode(code);
		FONTCURSOR['hValue'] += get_letter(String.fromCharCode(code));
	}
	if (action == "confirm") {};
	if (action == "answer") {
		FONTCURSOR['proposal'] = answer;
		FONTCURSOR['proposal_suffix'] = FONTCURSOR['proposal'].replace(FONTCURSOR["hValue"], "");
	}
	if (action == "update") {
		FONTCURSOR['kValue'] = s(FONTCURSOR['hValue'])
	}
	jQuery('#font-humanistic').html(FONTCURSOR['hValue']);
	jQuery('#font-kurrent').html(FONTCURSOR['kValue'] + "<span>" + FONTCURSOR['proposal_suffix'] + "</span>");
	jQuery('#font-humanistic').html(FONTCURSOR['hValue'] + "<span>" + FONTCURSOR['proposal_suffix'] + "</span>");
	console.log(FONTCURSOR);
}
/*Just a first try - Determinate which s should be presented, stil lots of errors in the middle of a word*/
function s(word) {
	debug = debug + 1;
	var ks = FONTS[jQuery("#font-change").val()][3];
	var ls = FONTS[jQuery("#font-change").val()][4];
	var vokal = ["a", "e", "i", "o", "u"];
	var fugen_s = ["tum", "ling", "ion", "tät", "heit", "keit", "schaft", "sicht", "ung"];
	var k_fugen_s = ["er", "el", "sch", "ß", "st", "tz", "z"];
	var lastChar = "";
	var newWord = "";
	var check = 0;
	var skip = false;
	if (word.indexOf(word) == -1) {
		return word;
	} else {
		for (var p = 0; p < word.length; p++) {
			if (word[p] == "s") {
				if (p == 0) {
					newWord += ls;
					continue;
				}
				if (p == word.length - 1) {
					newWord += ks;
				} else {
					if (word[p + 1] == "s" || word[p - 1] == "s") {
						newWord += ls;
					} else {
						check = 0;
						for (var j = 0; j < fugen_s.length; j++) {
							if (p > fugen_s[j].length) {
								if (fugen_s[j] == word.slice(p - fugen_s[j].length, p)) {
									check = 1;
								}
							}
						}
						for (var j = 0; j < k_fugen_s.length; j++) {
							if (p > k_fugen_s[j].length) {
								if (k_fugen_s[j] == word.slice(p - k_fugen_s[j].length, p - 1)) {
									check = -1;
								}
							}
						}
						if (check == 1) {
							newWord += ks;
							continue;
						} else {
							newWord += ls;
							continue;
						}
						if (vokal.indexOf(word[p + 1]) > -1) {
							newWord += ls;
							continue;
						}
					}
				}
			} else {
				newWord += word[p];
			}
		}
		return newWord;
	}
}
/***********************************************************************************************************************/
