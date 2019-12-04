var fonts=[
	["18th Century",
	"fhsßàáúùó bdkl$t gjpqxyz aäåceimnnoöœruüvw EGHJPQ ABCDFJKLMNORSÁÈTUVWÄÖÜ 1234567890",
	"f h s ß ch ck tz st ss | b d k l s t | g j p q x y z | a ä å c e i m n n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S Sp St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" 
	
	],
	["Berthold Mainzer Fraktur",
	"fhſßﬅﬅ bdklst gjpqxyz aäåceëimnnoöœruüvw EGHJPQ ABCDFJKLMNORSTUVWÄÖÜ 1234567890",
	"f h s ß ch sch ck tz st ss ss sk ft st sl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" 
	
	],
	["Deutsche Kurrent",
	"fhsß<>ôﬆì bdkl#t gjpqxyz aäceimµnoöruüvw EGHJPQ ABCDFJKLMNORSÒTUVWÄÖÜ 1234567890",
	"f h s ß ch ck tz ft fl | b d k l s t | g j p q x y z | a ä c e i m mm n o ö r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" 
	
	],
	["Greifswalder",
	"fhsßàáù bdkl$t gjpqxyz aäceimnnoöruüvw EGHJPQ ABCDFJKLMNORSÙTUVWÄÖÜ 1234567890",
	"f h s ß ch ck st | b d k l s t | g j p q x y z | a ä c e i m n n o ö r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" 
	
	],
	[
	"Ottilie",
	"fhſßﬅ bdklst gjpqxyz aäåceëimnnoöœruüvw EGHJPQ ABCDFJKLMNORSTUVWÄÖÜ 1234567890",
	"f h s ß ch sch ck tz st ss ss sk ft sl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" 
	],
	[
	"WiegelKurrent",
	"fhsßàáúùóòíì bdkl$t gjpqxyz aäåceëimÈnÉnoöœruüvw EGHJPQ ABCDFJKLMNORSÙTUVWÄÖÜ 1234567890",
	"f h s ß ch ck tz st ss sl ft fl | b d k l s t | g j p q x y z | a ä å c e ë i m mm n nn n o ö œ r u ü v w | E G H J P Q | A B C D F J K L M N O R S St T U V W Ä Ö Ü | 1 2 3 4 5 6 7 8 9 0" 
	]
];

var fontnumber=6;

jQuery(document).ready(function(){


	
	function switchSchriftMode(element){

		/*if (jQuery("#schrift-start img").attr("alt")=="aus"){*/
		if(1==1){
			if(jQuery("#schrift").length==0){
				var e = jQuery('<div style="display:block" id="schrift"></div>');
				jQuery("body").append(e);
				jQuery("#schrift").css("position","absolute");
				jQuery("#schrift").css("top","90px");
				jQuery('#schrift').css('height',(screen.height - 300)+"px");
				jQuery("#schrift").append(jQuery('<div style="display:block" id="schrift-target"></div>'));
				jQuery("#schrift").prepend(jQuery('<div id="schrift-controls">Verwendete Schriftart<a  href="#" id="schrift-change"></a><a href="#" id="schrift-clear">Box leeren</a><br /><a id="schrift-close">Tool schließen</a><br / ><a id="schrift-help">Hilfe</a><br /><input id="schrift-result" type=text /></div>'));
				jQuery("#schrift-change").append(jQuery("<select/>").attr("id","font-change").attr("size","1"));

				for (i=0;i<fonts.length;i++){
					
					jQuery('#font-change').append(jQuery("<option/>").html(fonts[i][0]).attr("value",i));
				}
				jQuery("#font-change").val(4);
				jQuery('#schrift').on("change","#font-change",function(event){create_letters(jQuery("#font-change option:selected").val())});
				
				create_letters(4);
				jQuery('#schrift').on("click", "div",function(event){console.log(jQuery(this).attr("id"));});	
				jQuery('#schrift').on("dblclick", "div",function(event){
					var origin= jQuery(this).attr("id").match(/\-(.*$)/i)[1];
					var d = new Date();
					console.log(origin);
					if (["schrift-target","schrift-controls","schrift-transcript","transcript"].indexOf(origin)==-1 ){
					
						jQuery("#schrift").append('<div class="letter" id="letter-'+d.getTime()+"-"+origin+'" style="display:block; position:absolute; top:50px;margin:10px">'+String.fromCharCode(origin)+'</div>');
						jQuery('.letter').css('font-family',fonts[fontnumber][0]);
					};
					});	
				/*jQuery('#schrift').on("click", "#schrift-transcript",function(event){show_word()});	*/
				jQuery('#schrift').on("click", "#schrift-close",function(event){jQuery('#schrift').css('display','none');});
				jQuery('#schrift').on("click", "#schrift-help",function(event){alert()});	
				jQuery('#schrift').on("click", "#schrift-clear",function(event){show_word(1)});		
					var $dragging = null;
				   /* jQuery(document.body).on("mousemove", function(e) {*/
				   jQuery("#schrift").on("mousemove", function(e) {
						if ($dragging) {
							$dragging.offset({
								top: e.pageY,
								left: e.pageX
							});
						}
					});


					jQuery("#schrift").on("mousedown", ".letter", function (e) {
						
						$dragging = jQuery(e.target);
					});

					jQuery("#schrift").on("mouseup", function (e) {
						$dragging = null;
						show_word();
					});				
				
				
				
							
			}
			jQuery("#schrift-start img").attr("alt","ein");
			jQuery("#schrift").css("display","block");
			
		}
		else{
			jQuery("#schrift-start img").attr("alt","aus");
			jQuery("#schrift").css("display","none");
		
		}
		
		}
	
	
	function create_letters(fnumber){
			fontnumber=fnumber;
			fontname=fonts[fontnumber][0];
			jQuery( ".letter" ).remove();
			letters=fonts[fontnumber][1];
			
			for (i=0;i<letters.length;i++){
				
				if (letters[i]==" "){
					jQuery("#schrift").append('<div class="letter" style="display:block; margin:0px">&nbsp;</div>');
				}
				else{
				jQuery("#schrift").append('<div class="letter" id="letter-'+letters[i].charCodeAt(0)+'" style="display:inline-block; margin:20px" title="'+get_letter(letters[i])+'">'+letters[i]+'</div>');
				/*jQuery('"#letter-'+letters[i]+'"').on("click", "div",function(event){move_letter(this)});		*/	
				}	
			}
			jQuery('.letter').css('font-family','"'+fontname+'"');

		}
	
	function move_letter(e){
		console.log(jQuery(e));
	}
	
	function get_letter(c){
		var transcripts=fonts[fontnumber][2].split(" ");
		
		return transcripts[fonts[fontnumber][1].indexOf(c)];
	}
	

	
	function show_word(clear=0){
		
		var word=[];
		var firsttop="";
		var e;
		var top= jQuery("#schrift-target").offset()['top'];
		var bottom=jQuery("#schrift-target").offset()['top']+jQuery("#schrift-target").height();
		var left= jQuery("#schrift-target").offset()['left'];
		var right=jQuery("#schrift-target").offset()['left']+jQuery("#schrift-target").width();
		console.log(top,bottom,left,right);
		
		for (i=0;i<jQuery(".letter").length;i++){
			e=jQuery(jQuery(".letter")[i]);

			/*console.log(String.fromCharCode(jQuery(jQuery(".letter")[i]).attr("id").match(/\-(.*$)/i)[1]));*/
			
			if((e.offset()['top']>top)&& (e.offset()['top']<bottom)&&  (e.offset()['left']>left)&& (e.offset()['left']<right)){
				
				if (clear==1){
					jQuery(jQuery(".letter")[i]).offset( {top: 300});
					/*jQuery(jQuery(".letter")[i]).css("top","100px");*/
				}
				else{
					if (firsttop==""){
						firsttop=jQuery(jQuery(".letter")[i]).offset().top;
						console.log(firsttop);
							
					}
					else{
						jQuery(jQuery(".letter")[i]).offset( {top: firsttop})
					}
					
				}

				/*word.push([jQuery(jQuery(".letter")[i]).attr("id").match(/\-(.*$)/i)[1],e.offset()['left']]);*/
				word.push([String.fromCharCode(jQuery(jQuery(".letter")[i]).attr("id").match(/([^-]*)$/i)[1]),e.offset()['left']]);
				}
		}
		console.log(word);
		word.sort(function(a, b) {
			return parseInt(a[1]) - parseInt(b[1]);
		});
		console.log(word);
		var word_str=""

		for (i=0;i<word.length;i++){
			
			word_str+=get_letter(word[i][0]);	
			}
		console.log(word_str)
		if(clear==1){
			jQuery('#schrift-result').attr("value","");
		}
		else{
			jQuery('#schrift-result').attr("value",word_str);
		}
	}
/**********************************************************/	



	jQuery('#fonttool-start').click(function(){
		
		switchSchriftMode(this);
		
	})






/*end of jQuery.document(ready)*/

});

