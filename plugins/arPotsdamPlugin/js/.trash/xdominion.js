(function (jQuery) {

  "use strict";

  /****
   ****
   ****  Tools
   ****
   ****/

  function clearFormFields(jQueryelement)
  {
    jQueryelement.find('input:text, input:password, input:file, select').val('');
    jQueryelement.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
    jQueryelement.find('select').prop('selectedIndex', 0);
    jQueryelement.find('input:text.form-autocomplete').each(function()
      {
        // Autocomplete fields add the value in a sibling hidden input
        // with the autocomplete id as the name
        var id = jQuery(this).attr('id');
        jQuery(this).siblings('input:hidden[name="' + id + '"]').val('');
      });
  }

  /****
   ****
   ****  Dropdown menus
   ****
   ****/

  jQuery(function ()
    {
      // Stop propagation of dropdown menus so they don't get closed
      jQuery('#user-menu .top-dropdown-container').click(
        function (e)
          {
            e.stopPropagation();
          });

      // TODO: focus() doesn't work
      jQuery('#user-menu').on('click.dropdown.data-api', function(e)
        {
          var jQuerymenu = jQuery(e.target).parent();
          if (!jQuerymenu.hasClass('open'))
          {
            jQuerymenu.find('#email').focus();
          }
        });

      jQuery('#top-bar [idjQuery=menu]').tooltip(
        {
          'placement': 'bottom'
        })
        .click(function ()
          {
            jQuery(this).tooltip('hide');
          });

      // Listen to class changes in the top div to change aria-expanded
      // attribute in the child button when the dropdown is opened/closed.
      // Bootstrap doesn't trigger any event in those cases until v3.
      jQuery('#top-bar [idjQuery=menu]').attrchange({
        trackValues: true,
        callback: function(evnt) {
          if(evnt.attributeName == 'class') {
            if(evnt.newValue.search(/open/i) == -1) {
              jQuery(this).find('button.top-item').attr('aria-expanded', 'false');
            }
            else {
              jQuery(this).find('button.top-item').attr('aria-expanded', 'true');
            }
          }
        }
      });
    });

  /****
   ****
   ****  Google Maps
   ****
   ****/

  jQuery(function ()
    {
      var jQuerycontainer = jQuery('.simple-map');

      if (!jQuerycontainer.length)
      {
        return;
      }

      window.initializeSimpleMap = function()
        {
          var location = new google.maps.LatLng(jQuerycontainer.data('latitude'), jQuerycontainer.data('longitude'));
          var map = new google.maps.Map(jQuerycontainer.get(0), {
              zoom: 16,
              center: location,
              panControl: false,
              mapTypeControl: true,
              zoomControl: true,
              scaleControl: false,
              streetViewControl: false,
              mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
            });
          var marker = new google.maps.Marker({ position: location, map: map});
        };

      jQuery.getScript('https://maps.google.com/maps/api/js?sensor=false&callback=initializeSimpleMap&key=' + jQuerycontainer.data('key'));
    });

  /****
   ****
   ****  jQuery Masonry
   ****
   ****/

  jQuery(document).ready(function()
    {
      var jQuerycontainer = jQuery('.masonry');
      jQuerycontainer.imagesLoaded(function() {
        jQuerycontainer.masonry({
          itemSelector: '.brick',
          isAnimated: false,
          gutterWidth: 15,
          isFitWidth: jQuerycontainer.hasClass('centered')
        });
      });
    });

  /****
   ****
   ****  Facets
   ****
   ****/

  jQuery(document).ready(function()
    {
      var jQueryfacets = jQuery('#facets');
      var jQueryfacet = jQueryfacets.find('.facet');

      jQueryfacets.on('click', '.facets-header a', function (e)
        {
          jQuery(e.target).toggleClass('open');
          jQueryfacets.find('.content').toggle();
        });

      jQueryfacet.on('click', '.facet-header a', function (e)
        {
          e.preventDefault();

          jQuery(e.target).parents('.facet').toggleClass('open');
          jQuery(e.target).attr('aria-expanded', function (index, attr) {
            return attr == 'false' ? 'true' : 'false';
          });
        });

      // Open first three facets
      jQueryfacet.slice(0, 3).filter(function(index, element)
        {
          return 0 < jQuery(element).find('li').length;
        }).addClass('open').find('.facet-header a').attr('aria-expanded', 'true');
    });

  /****
   ****
   ****  Date facets
   ****
   ****/

  jQuery(document).ready(function()
    {
      var jQueryform = jQuery('.facet-date').find('form');

      jQueryform.submit(function (e)
        {
          var jQueryfrom = jQuery(e.target.from);
          var jQueryto = jQuery(e.target.to);

          // Don't submit if empty
          if (!jQueryfrom.get(0).value && !jQueryto.get(0).value)
          {
            e.preventDefault();

            return;
          }

          // Parse document location and add current parameters to the form
          var uri = new URI();
          var uriParameters = uri.search(true);
          console.log(uriParameters);
          for (var key in uriParameters)
          {
            if (key == 'from' || key == 'to')
            {
              continue;
            }

            jQuery('<input />')
              .attr('type', 'hidden')
              .attr('name', key)
              .attr('value', uriParameters[key])
              .appendTo(jQueryform);
          }
        });

      jQueryform.find('.facet-dates-clear').click(function (event)
        {
          event.preventDefault();

          jQueryform.find('input').attr('value', '');
          jQueryform.get(0).submit();
        });
    });

  /****
   ****
   ****  Autocomplete plugin
   ****
   ****/

  var Autocomplete = function (element)
    {
      this.jQueryelement = element;
      this.jQueryrealm = this.jQueryelement.parents('#search-form-wrapper').find('#search-realm');
      this.jQueryform = this.jQueryelement.parents('form');
      this.jQuerymenu = jQuery('<div id="search-suggestions" class="search-popover"></div>').appendTo(this.jQueryform);

      this.source = this.jQueryelement.closest('form').data('autocomplete');
      this.shown = false;
      this.timeout = 150;
      this.minLength = 3;

      this.listen();
      this.showRealm();
    };

  Autocomplete.prototype = {

    constructor: Autocomplete,

    listen: function()
      {
        jQuery(window)
          .on('resize', jQuery.proxy(this.resize, this));

        this.jQueryelement
          .on('focus', jQuery.proxy(this.focus, this))
          .on('blur', jQuery.proxy(this.blur, this))
          .on('keypress', jQuery.proxy(this.keypress, this))
          .on('keyup', jQuery.proxy(this.keyup, this));

        if (jQuery.browser.webkit || jQuery.browser.msie)
        {
          this.jQueryelement.on('keydown', jQuery.proxy(this.keypress, this));
        }

        this.jQuerymenu.on('mouseenter', 'li', jQuery.proxy(this.mouseenter, this));
        this.jQuerymenu.on('mouseleave', 'li', jQuery.proxy(this.mouseleave, this));
        this.jQuerymenu.on('click', 'li', jQuery.proxy(this.click, this));

        this.jQueryrealm.on('mouseenter', 'div', jQuery.proxy(this.mouseenter, this));
        this.jQueryrealm.on('mouseleave', 'div', jQuery.proxy(this.mouseleave, this));
        this.jQueryrealm.on('change', 'input[type=radio]', jQuery.proxy(this.changeRealm, this));

        // Validate form
        this.jQueryform.submit(function (e)
          {
            // Forbid empty
            if (1 > e.target.query.value.length)
            {
              e.preventDefault();
              e.target.focus();
            }
          });
      },

    resize: function()
      {
        this.hide();
        this.hideRealm();
      },

    show: function()
      {
        this.hideRealm();
        this.jQuerymenu.show();

        this.shown = true;

        // Remove radius when the realm is shown
        this.jQueryelement.css('border-bottom-left-radius', 0);

        return this;
      },

    hide: function()
      {
        this.jQuerymenu.hide();
        this.shown = false;

        // Use radius again
        this.jQueryelement.css('border-bottom-left-radius', '4px');

        return this;
      },

    changeRealm: function (e)
      {
        var jQueryradio = jQuery(e.target);
        if (undefined !== jQueryradio.data('placeholder'))
        {
          this.jQueryelement.attr('placeholder', jQueryradio.data('placeholder'));
        }
        else
        {
          var label = jQuery(e.target).parent().text().trim();
          this.jQueryelement.attr('placeholder', label);
        }

        this.jQueryelement.focus();
      },

    showRealm: function (e)
      {
        this.hide();
        this.jQueryrealm.css('display', 'block');

        // Remove radius when the realm is shown
        this.jQueryelement.css('border-bottom-left-radius', 0);

        return this;
      },

    hideRealm: function (e)
      {
        this.jQueryrealm.css('display', 'none');

        // Use radius again
        this.jQueryelement.css('border-bottom-left-radius', '4px');

        return this;
      },

    lookup: function (e)
      {
        var query = this.jQueryelement.val();

        if (!query || query.length < this.minLength)
        {
          this.hide();
          this.showRealm();

          return this;
        }

        this.jQueryelement.addClass('loading');

        var radio = this.jQueryform.find('[type=radio]:checked');
        var realm = radio.length ? radio.get(0).value : '';

        jQuery.ajax(this.source,
          {
            context: this,
            data: { query: query, repos: realm },
            dataType: 'html'
          })
          .done(function(html)
            {
              if (html)
              {
                this.render(html).show();
              }
              else
              {
                this.hide();
              }
            })
          .error(function()
            {
              this.jQuerymenu.slideUp('fast');
            })
          .always(function()
            {
              this.jQueryelement.removeClass('loading');
            });
      },

    render: function (html)
      {
        this.jQuerymenu.html(html);

        return this;
      },

    move: function (direction)
      {
        // Determine what dropdown is being displayed
        // and move through the items
        if (this.jQuerymenu.css('display') == 'block')
        {
          var jQueryitems = this.jQuerymenu.find('li');
          var jQueryactive = this.jQuerymenu.find('li.active:first');
        }
        else
        {
          var jQueryitems = this.jQueryrealm.find('div');
          var jQueryactive = this.jQueryrealm.find('div.active:first');
        }

        if (jQueryactive.length)
        {
          jQueryactive.removeClass('active');

          var pos = jQueryitems.index(jQueryactive) + direction;
          if (pos >= 0)
          {
            jQueryitems.eq(pos).addClass('active');
          }
        }
        else
        {
          if (direction < 0)
          {
            jQueryitems.last().addClass('active');
          }
          else
          {
            jQueryitems.first().addClass('active');
          }
        }
      },

    select: function (e)
      {
        // Determine what dropdown is being displayed
        // and interact with the active element or submit the form
        if (this.jQuerymenu.css('display') == 'block')
        {
          var jQueryactive = this.jQuerymenu.find('li.active:first');
        }
        else
        {
          var jQueryactive = this.jQueryrealm.find('div.active:first');
        }

        if (jQueryactive.length)
        {
          var jQueryradio = jQueryactive.find('input[type=radio]');
          if (jQueryradio.length)
          {
            jQueryradio.click();
          }
          else
          {
            jQuery(location).attr('href', jQueryactive.find('a').attr('href'));
          }
        }
        else
        {
          this.jQueryform.submit();
        }
      },

    keyup: function (e)
      {
        switch (e.keyCode)
        {
          case 40: // Down arrow
          case 38: // Up arrow
            break;

          case 27: // Escape
            this.jQueryelement.val('');
            this.hide();
            this.hideRealm();
            break;

          default:
            if (this.timer)
            {
              clearTimeout(this.timer);
            }
            var self = this;
            this.timer = setTimeout(function()
              {
                self.lookup();
              }, this.timeout);
        }

        e.stopPropagation();
        e.preventDefault();
      },

    keypress: function (e)
      {
        switch (e.keyCode)
        {
          case 27: // Escape
            e.preventDefault();
            break;

          case 13: // Enter
            e.preventDefault();
            this.select();
            break;

          case 38: // Up arrow
            e.preventDefault();
            this.move(-1);
            break;

          case 40: // Down arrow
            // If charCode is 40 then, in Chrome/IE, it's an open parenthesis
            if (e.charCode == 0)
            {
              e.preventDefault();
              this.move(1);
            }
            break;
        }

        e.stopPropagation();
      },

    blur: function (e)
      {
        var self = this;
        setTimeout(function ()
          {
            self.hide();
            self.hideRealm();
          }, 150);

        // Add placeholder as value in browsers without support
        if (!Modernizr.input.placeholder)
        {
          self.jQueryelement.val(self.jQueryelement.attr('placeholder'));
        }

        this.jQueryform.removeClass('active');
      },

    focus: function (e)
      {
        if (!Modernizr.input.placeholder)
        {
          this.jQueryelement.val('');
        }

        this.showRealm();

        this.jQueryform.addClass('active');

        return this;
      },

    mouseenter: function (e)
      {
        jQuery(e.currentTarget).addClass('active');
      },

    mouseleave: function (e)
      {
        jQuery(e.currentTarget).removeClass('active');
      },

    click: function (e)
      {
        e.preventDefault();
        jQuery(location).attr('href', jQuery(e.currentTarget).find('a').attr('href'));
      }
  };

  jQuery.fn.autocomplete = function()
    {
      var jQuerythis = this;
      var data = jQuerythis.data('autocomplete');
      if (!data)
      {
        jQuerythis.data('autocomplete', new Autocomplete(this));
      }
    };

  jQuery.fn.autocomplete.Constructor = Autocomplete;

  jQuery(function ()
    {
      jQuery('body').on('focus.qubit', '#search-form-wrapper input[name="query"]', function(e)
        {
          var jQuerythis = jQuery(this);

          if (jQuerythis.data('autocomplete'))
          {
            return;
          }

          e.preventDefault();
          jQuerythis.autocomplete();
        });
    });

  // Add placeholder as value in search box for browsers without support
  jQuery(document).ready(function()
    {
      if (!Modernizr.input.placeholder)
      {
        jQuery('#search-form-wrapper input[name="query"]').each(function()
          {
            var jQuerythis = jQuery(this);

            // Ignore if it's already focus
            if (jQuerythis.is(':focus'))
            {
              return;
            }

            jQuerythis.val(jQuerythis.attr('placeholder'));
          });
      }
    });

  /****
   ****
   ****  Advanced search
   ****
   ****/

  var AdvancedSearch = function (element)
    {
      this.jQueryelement = jQuery(element);
      this.jQueryform = this.jQueryelement.find('form[name="advanced-search-form"]');
      this.jQuerytoggle = this.jQueryelement.find('a.advanced-search-toggle');
      this.jQueryreposFacet = this.jQueryelement.find("#\\#facet-repository").closest('section.facet');
      this.jQueryreposFilter = this.jQueryelement.find('select[name="repos"]');
      this.jQuerycollectionFilter = this.jQueryelement.find('input[name="collection"]');
      this.jQuerydateRangeHelpIcon = this.jQueryelement.find('a.date-range-help-icon');

      this.init();
      this.listen();
    };

  AdvancedSearch.prototype = {

    constructor: AdvancedSearch,

    init: function()
    {
      // Hide last criteria if more than once
      if (1 < this.jQueryform.find('.criterion').length)
      {
        this.jQueryform.find('.criterion:last').remove();
      }

      this.checkReposFilter();

      // Initialize datepickers
      var opts = {
        changeYear: true,
        changeMonth: true,
        yearRange: '-100:+100',
        dateFormat: 'yy-mm-dd',
        defaultDate: new Date(),
        constrainInput: false,
        beforeShow: function (input, instance) {
          var top  = jQuery(this).offset().top + jQuery(this).outerHeight();
          setTimeout(function() {
            instance.dpDiv.css({
              'top' : top,
            });
          }, 1);
        }
      };

      // Don't change user input value when enter is pressed with datepicker
      // It must be added before the datepicker is initialized
      jQuery('#startDate, #endDate').bind('keydown', function (event) {
        if (event.which == 13) {
          var e = jQuery.Event('keydown');
          e.which = 9;
          e.keyCode = 9;
          jQuery(this).trigger(e);

          return false;
        }
      }).datepicker(opts);
    },

    listen: function()
    {
      this.jQueryform
        .on('click', '.add-new-criteria .dropdown-menu a', jQuery.proxy(this.addCriterion, this))
        .on('click', 'input.reset', jQuery.proxy(this.reset, this))
        .on('click', 'a.delete-criterion', jQuery.proxy(this.deleteCriterion, this))
        .on('submit', jQuery.proxy(this.submit, this));

      this.jQuerytoggle.on('click', jQuery.proxy(this.toggle, this));
      this.jQuerycollectionFilter.on('change', jQuery.proxy(this.checkReposFilter, this));
      this.jQuerydateRangeHelpIcon.on('click', jQuery.proxy(this.toggleDateRangeHelp, this));
    },

    checkReposFilter: function (event)
    {
      // Disable repository filter and facet if top-level description selected
      if (this.jQueryreposFilter.length && this.jQuerycollectionFilter.val() != '')
      {
        this.jQueryreposFilter.attr("disabled", "disabled");
        this.jQueryreposFilter.val('');
        if (this.jQueryreposFacet.length)
        {
          this.jQueryreposFacet.hide();
        }
      }
      else if (this.jQueryreposFilter.length && this.jQuerycollectionFilter.val() == '')
      {
        this.jQueryreposFilter.removeAttr('disabled');
        if (this.jQueryreposFacet.length)
        {
          this.jQueryreposFacet.show();
        }
      }
    },

    submit: function (event)
    {
      // Disable empty fields and first operator in criteria
      this.jQueryform.find(':input[value=""]').attr("disabled", "disabled");
      this.jQueryform.find('select[name="so0"]').attr("disabled", "disabled");

      // Fix only year dates on form submit
      var sd = this.jQueryform.find('#startDate');
      if (/^\d{4}jQuery/.test(sd.val()))
      {
        sd.val(sd.val() + '-01-01');
      }
      var ed = this.jQueryform.find('#endDate');
      if (/^\d{4}jQuery/.test(ed.val()))
      {
        ed.val(ed.val() + '-12-31');
      }
    },

    reset: function (event)
    {
      window.location.replace(this.jQueryform.attr('action') + '?showAdvanced=1&topLod=0');
    },

    addCriterion: function (event)
    {
      event.preventDefault();

      this
        .cloneLastCriterion()
        .insertAfter(this.jQueryform.find('.criterion:last')).show()
        .find('select.boolean').val(event.target.id.replace('add-criterion-', '')).end()
        .find('input').first().focus();
    },

    cloneLastCriterion: function()
    {
      var jQueryclone = this.jQueryform.find('.criterion:last').clone();

      var nextNumber = parseInt(jQueryclone.find('input:first').attr('name').match(/\d+/).shift()) + 1;

      jQueryclone.find('input, select').each(function (index, element)
      {
        var name = this.getAttribute('name').replace(/[\d+]/, nextNumber);
        this.setAttribute('name', name);
      });

      clearFormFields(jQueryclone);

      return jQueryclone;
    },

    deleteCriterion: function (event)
    {
      event.preventDefault();

      var jQuerycriterion = jQuery(event.target.closest('.criterion'));
      var targetNumber = parseInt(jQuerycriterion.find('input:first').attr('name').match(/\d+/).shift());

      // First criterion without siblings, just clear that criterion
      if (targetNumber == 0 && this.jQueryform.find('.criterion').length == 1)
      {
        clearFormFields(jQuerycriterion);
        return;
      }

      // Otherwise update next siblings input and select names
      jQuerycriterion.nextAll('.criterion').each(function ()
        {
          var jQuerythis = jQuery(this);
          var number = parseInt(jQuerythis.find('input:first').attr('name').match(/\d+/).shift());
          jQuerythis.find('input, select').each(function (index, element)
          {
            var name = this.getAttribute('name').replace(/[\d+]/, number - 1);
            this.setAttribute('name', name);
          });
        });

      // Then delete criterion
      jQuerycriterion.remove();
    },

    toggle: function (e)
    {
      e.preventDefault();

      if(this.jQuerytoggle.toggleClass('open').hasClass('open'))
      {
        this.jQuerytoggle.attr('aria-expanded', true);
      }
      else
      {
        this.jQuerytoggle.attr('aria-expanded', false);
      }

      jQuery('.advanced-search').toggle(400);
    },

    toggleDateRangeHelp: function (e)
    {
      e.preventDefault();

      if(this.jQuerydateRangeHelpIcon.toggleClass('open').hasClass('open'))
      {
        this.jQuerydateRangeHelpIcon.attr('aria-expanded', true);
      }
      else
      {
        this.jQuerydateRangeHelpIcon.attr('aria-expanded', false);
      }

      jQuery('.date-range-help').toggle(400);
    }
  };

  jQuery(function ()
    {
      // Find search for if on an appropriate page
      var jQueryadvancedSearch = jQuery('body.informationobject.browse,body.search.descriptionUpdates');
      if (0 < jQueryadvancedSearch.length)
      {
        new AdvancedSearch(jQueryadvancedSearch.get(0));
      }
    });

  /****
   ****
   ****  Inline search
   ****
   ****/

  jQuery(function ()
    {
      var jQueryinlineSearch = jQuery('.inline-search');

      jQueryinlineSearch
        .on('click', '.dropdown-menu li a', function(e)
          {
            var jQuerythis = jQuery(e.target);

            // Change button label
            jQueryinlineSearch.find('.dropdown-toggle')
              .html(jQuerythis.text() + '<span class="caret"></span>');

            // Modify subqueryField value
            jQueryinlineSearch.find('#subqueryField')
              .val(jQuerythis.data('subquery-field-value'));
          })
        .on('keypress', 'input', function(e)
          {
            if (e.which == 13)
            {
              e.preventDefault();

              jQueryinlineSearch.find('form').submit();
            }
          });
    });

  /****
   ****
   ****  Hide/show elements on click
   ****
   ****/

  jQuery(function ()
    {
      jQuery("#treeview-search-settings")
        .on('click', function(e)
          {
            e.preventDefault();

            jQuery("#field-options").toggle(200);
          });

      jQuery("#alternative-identifiers")
        .on('click', function(e)
          {
            e.preventDefault();

            jQuery("#alternative-identifiers-table").toggle(200);
          });
    });

  /****
   ****
   ****  Disable/enable converseTerm field
   ****
   ****/

  jQuery(function ()
    {
      var jQueryselfReciprocal = jQuery('input[id=selfReciprocal]');
      var jQueryconverseTerm = jQuery('input[id=converseTerm]');

      if (jQueryselfReciprocal.prop('checked'))
      {
        jQueryconverseTerm.prop('disabled', 'disabled').val('');
      }

      jQueryselfReciprocal
        .on('change', function ()
          {
            if (jQueryconverseTerm.prop('disabled'))
            {
              jQueryconverseTerm.prop('disabled', false).focus();
            }
            else
            {
              jQueryconverseTerm.prop('disabled', 'disabled').val('');
            }
          });
    });

  /****
   ****
   ****  Settings menu sticker
   ****
   ****/

  jQuery(function ()
    {
      var s = jQuery("#sidebar > .settings-menu");
      if (!s.length)
      {
        return;
      }

      var pos = s.position();
      jQuery(window).scroll(function()
        {
          var windowpos = jQuery(window).scrollTop();
          if (windowpos >= pos.top)
          {
            s.addClass("stick");
          }
          else
          {
            s.removeClass("stick");
          }
        });
    });

})(window.jQuery);
