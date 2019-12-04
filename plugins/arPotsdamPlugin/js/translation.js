    /***********************************************  TRANSLATION ****************************************************************** */

    /* Preparing the div for the translation tool */
    function showTranslation(clickedWord) {
        CALLCOUNT += 1;
        clickedWord = clickedWord.match(/[a-zäöüßéàáêèôûâëïîæńṅṁçõãœ]*/i)[0];
        clickedWord = encodeURI(clickedWord);
        CURRENTWORD=clickedWord;
        showLoader();
        var page = clickedWord;
        var baseURL = 'http://de.wiktionary.org';
        jQuery('#wikiInfo').html('...please wait...');
        jQuery.getJSON(baseURL + '/w/api.php?action=parse&format=json&prop=text|revid|displaytitle&callback=?&page=' + page,
            function(json) {
                showLoader();
                console.log(json['error'] == undefined);
                if (json['error'] == undefined) {
                    txt3 = prepTranslation(json.parse.text['*'], [], clickedWord)
                } else {
                    if (clickedWord != clickedWord.toLowerCase()) {
                        CALLCOUNT -= 1;
                        showTranslation(clickedWord.toLowerCase());
                    }
                    jQuery('#popup-content').html("");
                    jQuery('#popup-content').html("<h2>"+ clickedWord.toUpperCase() + "<br />" + __(': Wort nicht gefunden') + "</h2>");
                }
            })

    };

    /* Analyzing Wictionary's feedback */
    function prepTranslation(txt, t, clickedWord) {
        var out;
        var item;
        var h = jQuery.parseHTML(txt);
        h[0]['childNodes'].forEach(function(item, index) {
            if (["H2", "H3", "P", "H4", "DIV", "DL"].indexOf(item.nodeName) > -1) {
                t.push([item.nodeName, item.innerText.trim()]);
            };
        });
        for (i = 0; i < t.length - 1; i++) {
            if (t[i][0] == "H2") {
                out += "<h2>" + t[i][1].replace("[Bearbeiten]", "") + "</h2>"
            }
            if (t[i][0] == "H3") {
                out += "<h3>" + t[i][1].replace("[Bearbeiten]", "") + "</h3>"
            }
            if (t[i][1] == "Bedeutungen:") {
                item = t[i + 1][1]

                item = item.replace(new RegExp('\r?\n', 'g'), '<br />');

                item = item.replace("<br /><br />", "<br />");
                out += "<p>" + item + "</p>"
            }
            if (t[i][1] == "Grammatische Merkmale:") {

                item = t[i + 1][1]
                item = item.replace(new RegExp('\r?\n', 'g'), '<br />');

                item = item.replace("<br /><br />", "<br />");
                if (CALLCOUNT < 2) {
                    if (item.indexOf("flektierte") > -1) {
                        return showTranslation(item.match(/([a-zäöüßéàáêèôûâëïîæńṅṁçõãœ]*)\./i)[1].trim(":").trim(")").trim("("));
                    }
                }
                out += "<p>" + item + "</p>"
            }
            if (t[i][0] == "H4") {

                item = t[i + 1][1]
                console.log(encodeURI(item));
                item = item.replace(/([a-zäöüßéàáêèôûâëïîæńṅṁçõãœå\)\(\u00a0]*)\u00a0→\u00a0([\w\)\(\ ]*)/img, '<a href="http://$2.wiktionary.org/wiki/\$1" target="blank">\$1</a>');
                /*item=item.replace(/\u00a0([\w])h/mg,"$1");*/
                item = item.replace(new RegExp('\n\n', 'g'), '\n');
                item = item.replace(new RegExp('\n\n', 'g'), '\n');
                item = item.replace(new RegExp('\r?\n', 'g'), '<br />');

                item = item.replace("<br /><br />", "<br />");
                out += "<p>" + item + "</p>"
            }
        };
        out = out.replace("undefined", "");
        /*jQuery('#popup-translation-content').html("");
            
        jQuery('#popup-translation-content').html(out);*/
        if(CURRENTWORD==clickedWord){
			jQuery('#popup-content').html("");
			jQuery('#popup-content').html(out);
		}
		else{
			console.log(CURRENTWORD, clickedWord);
		}
        return out;
    }

    /*Handling the popup*/
    function switchTranslationMode(element) {
        console.log(jQuery("#lookup img").attr("alt"));
        v = jQuery("#lookup img").attr("alt");
        if (jQuery("#lookup img").attr("alt") == "aus") {
            jQuery("#lookup img").attr("alt", "ein");
            jQuery("#lookup img").attr("src", "/plugins/arPotsdamPlugin/images/book_green.png");
            jQuery('#wrapper').css('cursor', 'help');
            saveContent();
            insertSpan(jQuery('#wrapper'));
            jQuery('#wrapper').on("mouseover", "q", function(event) {
                CALLCOUNT = 0;
                links = event.pageX + "px";
                oben = (event.pageY + 20) + "px";
                console.log(links + "|" + oben);
                jQuery('#popup-form').remove();
                jQuery('#popup').css('position', "absolute");
                jQuery('#popup').css('z-index', "20");
                jQuery('#popup').css('top', oben);
                jQuery('#popup').css('left', links);
                jQuery('#popup').css('display', "block");
                jQuery('#popup').css('overflow-y', "auto");
                jQuery('#popup').css('background-color','#f4ff86');
                jQuery('#popup').css('min-height', "300px");
                jQuery('#popup-content').html("");
                console.log(jQuery('#popup').css('top'));
                jQuery('#popup-closer').attr('class', 'ol-popup-closer translation-closer');
                jQuery('#popup').on('click', '.translation-closer', function() {
                    jQuery('#popup').css('display', "none");
                });
                var clickedWord = jQuery(this).text();
                console.log(clickedWord);
                showTranslation(clickedWord);
            });
            jQuery('#popup-translation').css('left', 0); // <<< use pageX and pageY
            jQuery('#popup-translation').css('top', jQuery('#content').css("top"));
            console.log(jQuery('#content'));
            jQuery('#popup-translation').css('width', (jQuery('#content').position().left - 25) + "px");
            console.log(jQuery('#content').position().left);
        } else {

            jQuery("#lookup img").attr("alt", "aus");
            jQuery("#lookup img").attr("src", "/plugins/arPotsdamPlugin/images/book_red.png");
            jQuery('#content').css('cursor', 'default');
            restoreContent();
            jQuery('#wrapper').off("mouseover", "q");
        }

    }

