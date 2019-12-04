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
	const WD_HUMAN = "Q5";
	const WD_MISSION = "Q20746389";
	const WD_ENTERPRISE = "Q4830453";
	const WD_AUTHORITY = "Q327333";
	const WD_MILITARY = "Q45295908";
	const WD_SETTLEMENT = "Q486972";
	const WD_EVENT = "Q15815670";
	const WD_COLONY = "Q133156";
	const WD_GEOGRAFICAL = "Q618123";
	const WD_SUBJECT = "Q82550";
	const WD_EDUCATION = "Q2385804";
	/********************* GLOBAL VARIABLES *******************************/
	var tags
	var debug = 0;
	var MAPLOADED = false;
	var MAXPLACES = 10;
	var HISTORICLAYER;
	var BASE_LAYER;
	var OSM_source;
	var open_topo_source;
	var stamen_source;
	var vectorPoints;
	var MAP;
	var MARKER;
	var vectorMarker;
	var REVISIONS;
	var CALLCOUNT;
	var CURRENTWORD;
	//var I18N = get_i18n();
	var MD5 = function(s) {
		function L(k, d) {
			return (k << d) | (k >>> (32 - d))
		}

		function K(G, k) {
			var I, d, F, H, x;
			F = (G & 2147483648);
			H = (k & 2147483648);
			I = (G & 1073741824);
			d = (k & 1073741824);
			x = (G & 1073741823) + (k & 1073741823);
			if (I & d) {
				return (x ^ 2147483648 ^ F ^ H)
			}
			if (I | d) {
				if (x & 1073741824) {
					return (x ^ 3221225472 ^ F ^ H)
				} else {
					return (x ^ 1073741824 ^ F ^ H)
				}
			} else {
				return (x ^ F ^ H)
			}
		}

		function r(d, F, k) {
			return (d & F) | ((~d) & k)
		}

		function q(d, F, k) {
			return (d & k) | (F & (~k))
		}

		function p(d, F, k) {
			return (d ^ F ^ k)
		}

		function n(d, F, k) {
			return (F ^ (d | (~k)))
		}

		function u(G, F, aa, Z, k, H, I) {
			G = K(G, K(K(r(F, aa, Z), k), I));
			return K(L(G, H), F)
		}

		function f(G, F, aa, Z, k, H, I) {
			G = K(G, K(K(q(F, aa, Z), k), I));
			return K(L(G, H), F)
		}

		function D(G, F, aa, Z, k, H, I) {
			G = K(G, K(K(p(F, aa, Z), k), I));
			return K(L(G, H), F)
		}

		function t(G, F, aa, Z, k, H, I) {
			G = K(G, K(K(n(F, aa, Z), k), I));
			return K(L(G, H), F)
		}

		function e(G) {
			var Z;
			var F = G.length;
			var x = F + 8;
			var k = (x - (x % 64)) / 64;
			var I = (k + 1) * 16;
			var aa = Array(I - 1);
			var d = 0;
			var H = 0;
			while (H < F) {
				Z = (H - (H % 4)) / 4;
				d = (H % 4) * 8;
				aa[Z] = (aa[Z] | (G.charCodeAt(H) << d));
				H++
			}
			Z = (H - (H % 4)) / 4;
			d = (H % 4) * 8;
			aa[Z] = aa[Z] | (128 << d);
			aa[I - 2] = F << 3;
			aa[I - 1] = F >>> 29;
			return aa
		}

		function B(x) {
			var k = "",
				F = "",
				G, d;
			for (d = 0; d <= 3; d++) {
				G = (x >>> (d * 8)) & 255;
				F = "0" + G.toString(16);
				k = k + F.substr(F.length - 2, 2)
			}
			return k
		}

		function J(k) {
			k = k.replace(/rn/g, "n");
			var d = "";
			for (var F = 0; F < k.length; F++) {
				var x = k.charCodeAt(F);
				if (x < 128) {
					d += String.fromCharCode(x)
				} else {
					if ((x > 127) && (x < 2048)) {
						d += String.fromCharCode((x >> 6) | 192);
						d += String.fromCharCode((x & 63) | 128)
					} else {
						d += String.fromCharCode((x >> 12) | 224);
						d += String.fromCharCode(((x >> 6) & 63) | 128);
						d += String.fromCharCode((x & 63) | 128)
					}
				}
			}
			return d
		}
		var C = Array();
		var P, h, E, v, g, Y, X, W, V;
		var S = 7,
			Q = 12,
			N = 17,
			M = 22;
		var A = 5,
			z = 9,
			y = 14,
			w = 20;
		var o = 4,
			m = 11,
			l = 16,
			j = 23;
		var U = 6,
			T = 10,
			R = 15,
			O = 21;
		s = J(s);
		C = e(s);
		Y = 1732584193;
		X = 4023233417;
		W = 2562383102;
		V = 271733878;
		for (P = 0; P < C.length; P += 16) {
			h = Y;
			E = X;
			v = W;
			g = V;
			Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
			V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
			W = u(W, V, Y, X, C[P + 2], N, 606105819);
			X = u(X, W, V, Y, C[P + 3], M, 3250441966);
			Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
			V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
			W = u(W, V, Y, X, C[P + 6], N, 2821735955);
			X = u(X, W, V, Y, C[P + 7], M, 4249261313);
			Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
			V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
			W = u(W, V, Y, X, C[P + 10], N, 4294925233);
			X = u(X, W, V, Y, C[P + 11], M, 2304563134);
			Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
			V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
			W = u(W, V, Y, X, C[P + 14], N, 2792965006);
			X = u(X, W, V, Y, C[P + 15], M, 1236535329);
			Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
			V = f(V, Y, X, W, C[P + 6], z, 3225465664);
			W = f(W, V, Y, X, C[P + 11], y, 643717713);
			X = f(X, W, V, Y, C[P + 0], w, 3921069994);
			Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
			V = f(V, Y, X, W, C[P + 10], z, 38016083);
			W = f(W, V, Y, X, C[P + 15], y, 3634488961);
			X = f(X, W, V, Y, C[P + 4], w, 3889429448);
			Y = f(Y, X, W, V, C[P + 9], A, 568446438);
			V = f(V, Y, X, W, C[P + 14], z, 3275163606);
			W = f(W, V, Y, X, C[P + 3], y, 4107603335);
			X = f(X, W, V, Y, C[P + 8], w, 1163531501);
			Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
			V = f(V, Y, X, W, C[P + 2], z, 4243563512);
			W = f(W, V, Y, X, C[P + 7], y, 1735328473);
			X = f(X, W, V, Y, C[P + 12], w, 2368359562);
			Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
			V = D(V, Y, X, W, C[P + 8], m, 2272392833);
			W = D(W, V, Y, X, C[P + 11], l, 1839030562);
			X = D(X, W, V, Y, C[P + 14], j, 4259657740);
			Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
			V = D(V, Y, X, W, C[P + 4], m, 1272893353);
			W = D(W, V, Y, X, C[P + 7], l, 4139469664);
			X = D(X, W, V, Y, C[P + 10], j, 3200236656);
			Y = D(Y, X, W, V, C[P + 13], o, 681279174);
			V = D(V, Y, X, W, C[P + 0], m, 3936430074);
			W = D(W, V, Y, X, C[P + 3], l, 3572445317);
			X = D(X, W, V, Y, C[P + 6], j, 76029189);
			Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
			V = D(V, Y, X, W, C[P + 12], m, 3873151461);
			W = D(W, V, Y, X, C[P + 15], l, 530742520);
			X = D(X, W, V, Y, C[P + 2], j, 3299628645);
			Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
			V = t(V, Y, X, W, C[P + 7], T, 1126891415);
			W = t(W, V, Y, X, C[P + 14], R, 2878612391);
			X = t(X, W, V, Y, C[P + 5], O, 4237533241);
			Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
			V = t(V, Y, X, W, C[P + 3], T, 2399980690);
			W = t(W, V, Y, X, C[P + 10], R, 4293915773);
			X = t(X, W, V, Y, C[P + 1], O, 2240044497);
			Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
			V = t(V, Y, X, W, C[P + 15], T, 4264355552);
			W = t(W, V, Y, X, C[P + 6], R, 2734768916);
			X = t(X, W, V, Y, C[P + 13], O, 1309151649);
			Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
			V = t(V, Y, X, W, C[P + 11], T, 3174756917);
			W = t(W, V, Y, X, C[P + 2], R, 718787259);
			X = t(X, W, V, Y, C[P + 9], O, 3951481745);
			Y = K(Y, h);
			X = K(X, E);
			W = K(W, v);
			V = K(V, g)
		}
		var i = B(Y) + B(X) + B(W) + B(V);
		return i.toLowerCase()
	};
	var BREADCRUMB = [];
	var GRATICULE
	var FONTS = [
		["18th Century",
			".fhsßàáúùó bdkl$t gjpqxyz aäåceimnnoöœruüvw EGHJPQ ABCDFJKLMNORSÁÈTUVWÄÖÜ 1234567890",
			". f h s ß ch ck tz st ss | b d k l s t | g j p q x y z | a ä å c e i m n n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S Sp St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0",
			"$",
			"s"
		],
		["Berthold Mainzer Fraktur",
			".fhſßﬅﬅ bdklst gjpqxyz aäåceëimnnoöœruüvw EGHJPQ ABCDFJKLMNORSTUVWÄÖÜ 1234567890",
			". f h s ß ch sch ck tz st ss ss sk ft st sl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0",
			"s",
			"ſ"
		],
		["Deutsche Kurrent",
			".fhsß<>ôﬆì bdkl#t gjpqxyz aäceimµnoöruüvw EGHJPQ ABCDFJKLMNORSÒTUVWÄÖÜ 1234567890",
			". f h s ß ch ck tz ft fl | b d k l s t | g j p q x y z | a ä c e i m mm n o ö r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0",
			"#",
			"s"
		],
		["Greifswalder",
			".fhsßàáù bdkl$t gjpqxyz aäceimnnoöruüvw EGHJPQ ABCDFJKLMNORSÙTUVWÄÖÜ 1234567890",
			". f h s ß ch ck st | b d k l s t | g j p q x y z | a ä c e i m n n o ö r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0",
			"$",
			"s"
		],
		[
			"Ottilie",
			".fhſßﬅ bdklst gjpqxyz aäåceëimnnoöœruüvw EGHJPQ ABCDFJKLMNORSTUVWÄÖÜ 1234567890",
			". f h s ß ch sch ck tz st ss ss sk ft sl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0",
			"s",
			"ſ"
		],
		[
			"WiegelKurrent",
			".fhsßàáúùóòíì bdkl$t gjpqxyz aäåceëimÈnÉnoöœruüvw EGHJPQ ABCDFJKLMNORSÙTUVWÄÖÜ 1234567890",
			". f h s ß ch ck tz st ss sl ft fl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0",
			"$",
			"s"
		]
	];
	var KARTEN = {
		"Deutsches Reich": 8,
		"GKA Togo 1": 11,
		"GKA Togo 2": 11,
		"KK DSWA Rehoboth": 10,
		"KK DSWA Otavi": 10,
		"KK DSWA Keetmanshoop": 10,
		"KK DSWA Andara": 10,
		"KK DSWA Windhuk": 10,
		"KK DSWA Warmbad": 10,
		"KK DSWA Owambo": 10,
		"KK DSWA Linjanti": 10,
		"KK DSWA Zesfontein": 10
	}
	var COUNTRIES = {
		"BI": "Burundi",
		"CF": "Central African Republic",
		"CG": "Republic of the Congo",
		"CM": "Cameroon",
		"CN": "China",
		"FM": "Micronesia",
		"GA": "Gabon",
		"GH": "Ghana",
		"GQ": "Equatorial Guinea",
		"KE": "Kenia",
		"MH": "Marshall Islands",
		"MP": "Northern Mariana Islands",
		"MZ": "Mozambique",
		"NA": "Namibia",
		"NG": "Nigeria",
		"NR": "Nauru",
		"PG": "Papua New Guinea",
		"PW": "Palau",
		"RW": "Rwanda",
		"TD": "Chad",
		"TG": "Togo",
		"TZ": "Tanzania",
		"WS": "Samoa"
	}
	var FONTCURSOR = {
		'hValue': "",
		'kValue': "",
		'proposal': '',
		'proposal_suffix': ""
	};
	var FONTNUMBER = 6;

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
	function saveContent() {
		content = jQuery('#wrapper').html();
	}

	function restoreContent() {
		jQuery('#wrapper').html(content);
	}
	/* The turning symbol */
	function showLoader() {
		if (jQuery('.loader').css("display") == "none") {
			jQuery('.loader').css("display", "inline-block");
			jQuery('#content').attr('class', 'bg');
		} else {
			jQuery('.loader').css("display", "none")
			jQuery('#content').attr('class', '');
		}
	}
	/*Dealing with the Wikidata date precision*/
	function testDate(wdDate, precision) {
		if (!precision) precision = 9;
		if (wdDate.match(/[0-9-]{10}T[0-9:]{8}Z/i) == null) {
			return wdDate
		};
		var year = wdDate.slice(0, 4);
		var month = wdDate.slice(5, 7);
		var day = wdDate.slice(8, 10);
		if (precision == "9") {
			return year
		};
		if (precision == "10") {
			return month + '/' + year
		};
		return day + "." + month + '.' + year;
	}
	/*inserts spans in all text node descendants*/
	function insertSpan(e) {
		e.find("*").each(function(el) {
			if (jQuery(this).find("*").length == 0) {
				if (jQuery(this).html().length > 0) {
					arr = jQuery(this).html().split(/\ |-|,|;|:/);
					arr2 = []
					console.log(arr);
					for (i = 0; i < arr.length; i++) {
						if (arr[i].length > 0) {
							arr2.push(arr[i].replace(/\n/g, ""));
						}
					}
					text = "<q>" + arr2.join("</q> <q>") + "</q>";
					console.log(text);
					jQuery(this).html(text);
				};
			};
		});
		str = e.html();
		console.log(str);
		str = str.replace(/&lt;span&gt;/g, "<span>");
		str = str.replace(/&lt;\/span&gt;/g, "</span>");
		str = str.replace(/<span><\/span>/g, "");
		console.log(str);
		e.html(str);
		jQuery('q').css('cursor', "help");
		jQuery("q").click(function(event) {
			event.stopPropagation();
		});
		return;
	}

	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
