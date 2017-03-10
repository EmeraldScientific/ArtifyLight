$(document).ready(function() {

    var itemTxt = $('.cartCount strong').text();
    var totalCost = $('.cartCost strong').text();
    if(totalCost.length != 0) {
        $('.CartLink span').html(itemTxt+' Items / '+totalCost);
    }

    var hash = window.location.hash;
    if (hash == '#ProductReviews' || hash == '#write_review') {
        $('#ProductReviews').find('.subtitle').trigger('click');
    }

    $('.wishTrigger').click(function() {
        $('#frmWishList').submit();
    });

    $('input[type=text],input[type=url],input[type=email],input[type=password]').focus(function () {
        if ($(this).val() == $(this).attr("title")) {
            $(this).val("");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val($(this).attr("title"));
        }
    });
    $(".SubTotal td strong:contains('Grand Total:')").closest('tr').addClass('gtotal');



    var onsale = $(".ProductDetailsGrid .DetailRow.PriceRow .Value em");
    if(onsale.children('strike').length > 0 ){
        onsale.addClass("on-sale");
    }



    var shopPath = config.ShopPath;
    var win = window.location.pathname;
    var Maddr = win.toLowerCase().replace(shopPath, ''); // remove the shop path because some links dont have it
    $('.Breadcrumb ul').last().addClass('last');
    //$('.Breadcrumb ul').not('.last').remove();
    var breadLink;
    if ($('.Breadcrumb li:nth-child(2)').children('a').size() != 0) {
        breadLink = $('.Breadcrumb ul.last li:nth-child(2)').children('a').attr('href').toLowerCase().replace(shopPath, '');
    }

    $('#Menu .category-list').addClass('page');
    //$('#Menu .category-list').prepend('<li class=""><a href="'+shopPath+'/">Home</a></li>')
    // add active class to category sidebar



    $("#SideCategoryList li a").each(function() {

        var ChrefX = $(this).attr('href').toLowerCase().replace(shopPath, ''); // remove shop path if any because some links dont have it

        if (Maddr==ChrefX) {
            $(this).closest('.parent').children('a').addClass("active"); //if the window location is equal side menu href

        }

    });

    // add active class to menu
    $(".category-list.page a").each(function() {

        var MhrefX = $(this).attr('href').toLowerCase().replace(shopPath, ''); // remove shop path if any because some links dont have it




        if (Maddr==MhrefX) {


            $(this).closest('.parent').addClass("ActivePage"); //if the window location is equal side menu href

        }
        if (breadLink == MhrefX) {
            $(this).closest('.parent').addClass("ActivePage");
        }


    });

    if($('input[type="checkbox"]').is(":visible")){
        $('input[type="checkbox"]').not('#category input[type="checkbox"]').uniform();
    }
    if($('input[type="radio"]').is(":visible")){
        $('input[type="radio"]').not('.productOptionPickListSwatch input[type="radio"], .productOptionViewRectangle input[type="radio"]').uniform();
    }

    $('select').not('select#FormField_12, .UniApplied').uniform({ selectAutoWidth: false });
    $('input[type="file"]').uniform();

    $("#wishlistsform a:contains('Share')").each(function() {
        $(this).attr('title', 'Share Wishlist');
    })


    $('#selectAllWishLists').click(function() {
        $.uniform.update();
    });


    // menu adjust
    $("#Menu ul > li").each(function() {
        $(this).addClass('parent');
    });
    $(".PageMenu .category-list  > li").each(function() {
        $(this).addClass('parent');

        tallest = 0;
        group =  $(this).find('ul');

        group.each(function() {
            thisHeight = $(this).height();
            if(thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        group.height(tallest);
    });

    $('.PageMenu li').each(function() {
        if ($(this).children('ul').size() != 0) {
            $(this).children('a').addClass('hasSub');
        }
    });
    $('.PageMenu li').hover(function() {
        $(this).addClass('over');
        return false;
    }, function() {
        $(this).removeClass('over');
    });
    var num = $('.PageMenu .parent').size();
    $('.category-list .parent').each(function(i) {
        $(this).css('z-index', num - i);
    });
    $('.PageMenu #Menu .parent').each(function(i) {
        $(this).css('z-index', num - i);
    });

    //Drawer Menu
    menuToggle = $("#ToggleMenu");
    drawer = $("#DrawerMenu");
    page = $(".page");
    menuToggle.click(function(){
        if (page.hasClass("off-screen")) {
            setTimeout(function(){drawer.toggleClass("on-screen")},100);
        } else {
            drawer.toggleClass("on-screen");
        }
        page.toggleClass("off-screen");
    });

    if ($(".CartLink a span").length > 0) {
        var e = $(".CartLink a span").html().replace(/[^\d.]/g, '');
        $("#cart-amount .total").html(e);
    }

    //Checking if device is touch enabled. There is no surefire solution for this, but this boolean caters for most cases.
    //http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
    //A CSS fallback has been written in /Styles/responsive.css for edge case devices.
    var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

    if (isTouch) {
        //Disable the swatch preview on touch devices - this is triggered on mouseover, which isn't ideal for touch devices.
        $.fn.productOptionPreviewDisplay = $.noop;
    }

    //Functions for mobile breakpoint
    if (matchMedia("screen and (max-width: 480px)").matches) {


        searchbar = $(".header-secondary").parents("#Header");
        var lastScroll = 0;

        $(window).scroll(function(){
            var thisScroll = $(this).scrollTop();
            if (thisScroll > lastScroll && thisScroll > 0) {
                searchbar.addClass("off-screen");
            } else {
                searchbar.removeClass("off-screen");
            }
            lastScroll = thisScroll;
        });

        /*!
         * FitText.js 1.1
         *
         * Copyright 2011, Dave Rupert http://daverupert.com
         * Released under the WTFPL license
         * http://sam.zoy.org/wtfpl/
         *
         * Date: Thu May 05 14:23:00 2011 -0600
         */
        // Modified and added by Miko Ademagic

        $.fn.fitText = function( k, o ) {

            // Setup options
            var compressor = k || 1,
                settings = $.extend({
                    'minFontSize' : Number.NEGATIVE_INFINITY,
                    'maxFontSize' : Number.POSITIVE_INFINITY
                }, o);

            return this.each(function(){

                // Store the object
                var $this = $(this);

                // Resizer() resizes items based on the object width divided by the compressor * 10
                var resizer = function () {
                    var sl = $this.text().length;
                    $this.css('font-size', Math.max(Math.min(($this.width() / sl) * compressor, parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
                };

                // Call once to set.
                resizer();

                // Call on resize. Opera debounces their resize by default.
                $(window).bind('resize.fittext orientationchange.fittext', resizer);

            });

        };

        $('#LogoContainer h1').fitText(1.6, { minFontSize: '14px', maxFontSize: '28px' });
        /*******************/
    }

    $('.FormFieldLabel').each(function() {
        $(this).text($(this).text().replace(/:/g,""));
    });
});



function ToggleShippingEstimation2(){
    var $container = $(".EstimateShipping");
    $('.EstimatedShippingMethods').hide();


    if ($container.is( ":hidden" )){
        // Show - slide down.
        $('.EstimateShippingLink').hide();
        $container.slideDown(300, function() {

        });
        $('.EstimateShipping select:eq(0)').focus();
        //$('#shippingZoneState:not(".UniApplied")').uniform();
        if ($('#shippingZoneState').is(':hidden')) {
            $('#uniform-shippingZoneState').hide();
        }

    } else {

        // hide - slide up.

        $container.slideUp(300, function() {
            $('.EstimateShippingLink').show();
        });


    }


};

/*
 * Sidr
 * https://github.com/artberri/sidr
 *
 * Copyright (c) 2013 Alberto Varela
 * Licensed under the MIT license.
 */

;(function( $ ){

  var sidrMoving = false,
      sidrOpened = false;

  // Private methods
  var privateMethods = {
    // Check for valids urls
    // From : http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
    isUrl: function (str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if(!pattern.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    // Loads the content into the menu bar
    loadContent: function($menu, content) {
      $menu.html(content);
    },
    // Add sidr prefixes
    addPrefix: function($element) {
      var elementId = $element.attr('id'),
          elementClass = $element.attr('class');

      if(typeof elementId === 'string' && '' !== elementId) {
        $element.attr('id', elementId.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-id-$1'));
      }
      if(typeof elementClass === 'string' && '' !== elementClass && 'sidr-inner' !== elementClass) {
        $element.attr('class', elementClass.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-class-$1'));
      }
      $element.removeAttr('style');
    },
    execute: function(action, name, callback) {
      // Check arguments
      if(typeof name === 'function') {
        callback = name;
        name = 'sidr';
      }
      else if(!name) {
        name = 'sidr';
      }

      // Declaring
      var $menu = $('#' + name),
          $body = $($menu.data('body')),
          $html = $('html'),
          menuWidth = $menu.outerWidth(true),
          speed = $menu.data('speed'),
          side = $menu.data('side'),
          displace = $menu.data('displace'),
          onOpen = $menu.data('onOpen'),
          onClose = $menu.data('onClose'),
          bodyAnimation,
          menuAnimation,
          scrollTop,
          bodyClass = (name === 'sidr' ? 'sidr-open' : 'sidr-open ' + name + '-open');

      // Open Sidr
      if('open' === action || ('toggle' === action && !$menu.is(':visible'))) {
        // Check if we can open it
        if( $menu.is(':visible') || sidrMoving ) {
          return;
        }

        // If another menu opened close first
        if(sidrOpened !== false) {
          methods.close(sidrOpened, function() {
            methods.open(name);
          });

          return;
        }

        // Lock sidr
        sidrMoving = true;

        // Left or right?
        if(side === 'left') {
          bodyAnimation = {left: menuWidth + 'px'};
          menuAnimation = {left: '0px'};
        }
        else {
          bodyAnimation = {right: menuWidth + 'px'};
          menuAnimation = {right: '0px'};
        }

        // Prepare page if container is body
        if($body.is('body')){
          scrollTop = $html.scrollTop();
          $html.css('overflow-x', 'hidden').scrollTop(scrollTop);
        }

        // Open menu
        if(displace){
          $body.addClass('sidr-animating').css({
            width: $body.width(),
            position: 'absolute'
          }).animate(bodyAnimation, speed, function() {
            $(this).addClass(bodyClass);
          });
        }
        else {
          setTimeout(function() {
            $(this).addClass(bodyClass);
          }, speed);
        }
        $menu.css('display', 'block').animate(menuAnimation, speed, function() {
          sidrMoving = false;
          sidrOpened = name;
          // Callback
          if(typeof callback === 'function') {
            callback(name);
          }
          $body.removeClass('sidr-animating');
        });

        // onOpen callback
        onOpen();
      }
      // Close Sidr
      else {
        // Check if we can close it
        if( !$menu.is(':visible') || sidrMoving ) {
          return;
        }

        // Lock sidr
        sidrMoving = true;

        // Right or left menu?
        if(side === 'left') {
          bodyAnimation = {left: 0};
          menuAnimation = {left: '-' + menuWidth + 'px'};
        }
        else {
          bodyAnimation = {right: 0};
          menuAnimation = {right: '-' + menuWidth + 'px'};
        }

        // Close menu
        if($body.is('body')){
          scrollTop = $html.scrollTop();
          $html.removeAttr('style').scrollTop(scrollTop);
        }
        $body.addClass('sidr-animating').animate(bodyAnimation, speed).removeClass(bodyClass);
        $menu.animate(menuAnimation, speed, function() {
          $menu.removeAttr('style').hide();
          $body.removeAttr('style');
          $('html').removeAttr('style');
          sidrMoving = false;
          sidrOpened = false;
          // Callback
          if(typeof callback === 'function') {
            callback(name);
          }
          $body.removeClass('sidr-animating');
        });

        // onClose callback
        onClose();
      }
    }
  };

  // Sidr public methods
  var methods = {
    open: function(name, callback) {
      privateMethods.execute('open', name, callback);
    },
    close: function(name, callback) {
      privateMethods.execute('close', name, callback);
    },
    toggle: function(name, callback) {
      privateMethods.execute('toggle', name, callback);
    },
    // I made a typo, so I mantain this method to keep backward compatibilty with 1.1.1v and previous
    toogle: function(name, callback) {
      privateMethods.execute('toggle', name, callback);
    }
  };

  $.sidr = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    else if ( typeof method === 'function' || typeof method === 'string' || ! method ) {
      return methods.toggle.apply( this, arguments );
    }
    else {
      $.error( 'Method ' + method + ' does not exist on jQuery.sidr' );
    }

  };

  $.fn.sidr = function( options ) {

    var settings = $.extend( {
      name          : 'sidr',         // Name for the 'sidr'
      speed         : 200,            // Accepts standard jQuery effects speeds (i.e. fast, normal or milliseconds)
      side          : 'left',         // Accepts 'left' or 'right'
      source        : null,           // Override the source of the content.
      renaming      : true,           // The ids and classes will be prepended with a prefix when loading existent content
      body          : 'body',         // Page container selector,
      displace: true, // Displace the body content or not
      onOpen        : function() {},  // Callback when sidr opened
      onClose       : function() {}   // Callback when sidr closed
    }, options);

    var name = settings.name,
        $sideMenu = $('#' + name);

    // If the side menu do not exist create it
    if( $sideMenu.length === 0 ) {
      $sideMenu = $('<div />')
        .attr('id', name)
        .appendTo($('body'));
    }

    // Adding styles and options
    $sideMenu
      .addClass('sidr')
      .addClass(settings.side)
      .data({
        speed          : settings.speed,
        side           : settings.side,
        body           : settings.body,
        displace      : settings.displace,
        onOpen         : settings.onOpen,
        onClose        : settings.onClose
      });

    // The menu content
    if(typeof settings.source === 'function') {
      var newContent = settings.source(name);
      privateMethods.loadContent($sideMenu, newContent);
    }
    else if(typeof settings.source === 'string' && privateMethods.isUrl(settings.source)) {
      $.get(settings.source, function(data) {
        privateMethods.loadContent($sideMenu, data);
      });
    }
    else if(typeof settings.source === 'string') {
      var htmlContent = '',
          selectors = settings.source.split(',');

      $.each(selectors, function(index, element) {
        htmlContent += '<div class="sidr-inner">' + $(element).html() + '</div>';
      });

      // Renaming ids and classes
      if(settings.renaming) {
        var $htmlContent = $('<div />').html(htmlContent);
        $htmlContent.find('*').each(function(index, element) {
          var $element = $(element);
          privateMethods.addPrefix($element);
        });
        htmlContent = $htmlContent.html();
      }
      privateMethods.loadContent($sideMenu, htmlContent);
    }
    else if(settings.source !== null) {
      $.error('Invalid Sidr Source');
    }

    return this.each(function(){
      var $this = $(this),
          data = $this.data('sidr');

      // If the plugin hasn't been initialized yet
      if ( ! data ) {

        $this.data('sidr', name);
        if('ontouchstart' in document.documentElement) {
          $this.bind('touchstart', function(e) {
            var theEvent = e.originalEvent.touches[0];
            this.touched = e.timeStamp;
          });
          $this.bind('touchend', function(e) {
            var delta = Math.abs(e.timeStamp - this.touched);
            if(delta < 200) {
              e.preventDefault();
              methods.toggle(name);
            }
          });
        }
        else {
          $this.click(function(e) {
            e.preventDefault();
            methods.toggle(name);
          });
        }
      }
    });
  };

})( jQuery );

// Generated by CoffeeScript 1.6.3
/*
jQuery Growl
Copyright 2013 Kevin Sylvestre
1.1.3
*/


(function() {
  "use strict";
  var $, Animation, Growl,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  Animation = (function() {
    function Animation() {}

    Animation.transitions = {
      "webkitTransition": "webkitTransitionEnd",
      "mozTransition": "mozTransitionEnd",
      "oTransition": "oTransitionEnd",
      "transition": "transitionend"
    };

    Animation.transition = function($el) {
      var el, result, type, _ref;
      el = $el[0];
      _ref = this.transitions;
      for (type in _ref) {
        result = _ref[type];
        if (el.style[type] != null) {
          return result;
        }
      }
    };

    return Animation;

  })();

  Growl = (function() {
    Growl.settings = {
      namespace: 'growl',
      duration: 3200,
      close: "&times;",
      location: "default",
      style: "default",
      size: "medium"
    };

    Growl.growl = function(settings) {
      if (settings == null) {
        settings = {};
      }
      this.initialize();
      return new Growl(settings);
    };

    Growl.initialize = function() {
      return $("body:not(:has(#growls))").append('<div id="growls" />');
    };

    function Growl(settings) {
      if (settings == null) {
        settings = {};
      }
      this.html = __bind(this.html, this);
      this.$growl = __bind(this.$growl, this);
      this.$growls = __bind(this.$growls, this);
      this.animate = __bind(this.animate, this);
      this.remove = __bind(this.remove, this);
      this.dismiss = __bind(this.dismiss, this);
      this.present = __bind(this.present, this);
      this.close = __bind(this.close, this);
      this.cycle = __bind(this.cycle, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.render = __bind(this.render, this);
      this.settings = $.extend({}, Growl.settings, settings);
      this.$growls().attr('class', this.settings.location);
      this.render();
    }

    Growl.prototype.render = function() {
      var $growl;
      $growl = this.$growl();
      this.$growls().append($growl);
      this.cycle($growl);
    };

    Growl.prototype.bind = function($growl) {
      if ($growl == null) {
        $growl = this.$growl();
      }
      return $growl.find("." + this.settings.namespace + "-close").on("click", this.close);
    };

    Growl.prototype.unbind = function($growl) {
      if ($growl == null) {
        $growl = this.$growl();
      }
      return $growl.find("." + (this.settings.namespace - close)).off("click", this.close);
    };

    Growl.prototype.cycle = function($growl) {
      if ($growl == null) {
        $growl = this.$growl();
      }
      return $growl.queue(this.present).delay(this.settings.duration).queue(this.dismiss).queue(this.remove);
    };

    Growl.prototype.close = function(event) {
      var $growl;
      event.preventDefault();
      event.stopPropagation();
      $growl = this.$growl();
      return $growl.stop().queue(this.dismiss).queue(this.remove);
    };

    Growl.prototype.present = function(callback) {
      var $growl;
      $growl = this.$growl();
      this.bind($growl);
      return this.animate($growl, "" + this.settings.namespace + "-incoming", 'out', callback);
    };

    Growl.prototype.dismiss = function(callback) {
      var $growl;
      $growl = this.$growl();
      this.unbind($growl);
      return this.animate($growl, "" + this.settings.namespace + "-outgoing", 'in', callback);
    };

    Growl.prototype.remove = function(callback) {
      this.$growl().remove();
      return callback();
    };

    Growl.prototype.animate = function($element, name, direction, callback) {
      var transition;
      if (direction == null) {
        direction = 'in';
      }
      transition = Animation.transition($element);
      $element[direction === 'in' ? 'removeClass' : 'addClass'](name);
      $element.offset().position;
      $element[direction === 'in' ? 'addClass' : 'removeClass'](name);
      if (callback == null) {
        return;
      }
      if (transition != null) {
        $element.one(transition, callback);
      } else {
        callback();
      }
    };

    Growl.prototype.$growls = function() {
      return this.$_growls != null ? this.$_growls : this.$_growls = $('#growls');
    };

    Growl.prototype.$growl = function() {
      return this.$_growl != null ? this.$_growl : this.$_growl = $(this.html());
    };

    Growl.prototype.html = function() {
      return "<div class='" + this.settings.namespace + " " + this.settings.namespace + "-" + this.settings.style + " " + this.settings.namespace + "-" + this.settings.size + "'>\n  <div class='" + this.settings.namespace + "-close'>" + this.settings.close + "</div>\n  <div class='" + this.settings.namespace + "-title'>" + this.settings.title + "</div>\n  <div class='" + this.settings.namespace + "-message'>" + this.settings.message + "</div>\n</div>";
    };

    return Growl;

  })();

  $.growl = function(options) {
    if (options == null) {
      options = {};
    }
    return Growl.growl(options);
  };

  $.growl.error = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Error!",
      style: "error"
    };
    return $.growl($.extend(settings, options));
  };

  $.growl.notice = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Notice!",
      style: "notice"
    };
    return $.growl($.extend(settings, options));
  };

  $.growl.warning = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Warning!",
      style: "warning"
    };
    return $.growl($.extend(settings, options));
  };

}).call(this);
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    function converted(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            return config.json ? JSON.parse(s) : s;
        } catch(er) {}
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                config.raw ? key : encodeURIComponent(key),
                '=',
                config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        var result = key ? undefined : {};
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = decode(parts.join('='));

            if (key && key === name) {
                result = converted(cookie);
                break;
            }

            if (!key) {
                result[name] = converted(cookie);
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== undefined) {
            // Must not alter options, thus extending a fresh object...
            $.cookie(key, '', $.extend({}, options, { expires: -1 }));
            return true;
        }
        return false;
    };

}));
/*
 * Treeview 1.4.1 - jQuery plugin to hide and show branches of a tree
 * 
 * http://bassistance.de/jquery-plugins/jquery-plugin-treeview/
 * http://docs.jquery.com/Plugins/Treeview
 *
 * Copyright (c) 2007 JÃƒÂ¶rn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.treeview.js 5759 2008-07-01 07:50:28Z joern.zaefferer $
 *
 */

;(function($) {

  // TODO rewrite as a widget, removing all the extra plugins
  $.extend($.fn, {
    swapClass: function(c1, c2) {
      var c1Elements = this.filter('.' + c1);
      this.filter('.' + c2).removeClass(c2).addClass(c1);
      c1Elements.removeClass(c1).addClass(c2);
      return this;
    },
    replaceClass: function(c1, c2) {
      return this.filter('.' + c1).removeClass(c1).addClass(c2).end();
    },
    hoverClass: function(className) {
      className = className || "hover";
      return this.hover(function() {
        $(this).addClass(className);
      }, function() {
        $(this).removeClass(className);
      });
    },
    heightToggle: function(animated, callback) {
      animated ?
        this.animate({ height: "toggle" }, animated, callback) :
        this.each(function(){
          jQuery(this)[ jQuery(this).is(":hidden") ? "show" : "hide" ]();
          if(callback)
            callback.apply(this, arguments);
        });
    },
    heightHide: function(animated, callback) {
      if (animated) {
        this.animate({ height: "hide" }, animated, callback);
      } else {
        this.hide();
        if (callback)
          this.each(callback);        
      }
    },
    prepareBranches: function(settings) {
      if (!settings.prerendered) {
        // mark last tree items
        this.filter(":last-child:not(ul)").addClass(CLASSES.last);
        // collapse whole tree, or only those marked as closed, anyway except those marked as open
        this.filter((settings.collapsed ? "" : "." + CLASSES.closed) + ":not(." + CLASSES.open + ")").find(">ul").hide();
      }
      // return all items with sublists
      return this.filter(":has(>ul)");
    },
    applyClasses: function(settings, toggler) {
      // TODO use event delegation
      this.filter(":has(>ul):not(:has(>a))").find(">span").unbind("click.treeview").bind("click.treeview", function(event) {
        // don't handle click events on children, eg. checkboxes
        if ( this == event.target )
          toggler.apply($(this).next());
      }).add( $("a", this) ).hoverClass();
      
      if (!settings.prerendered) {
        // handle closed ones first
        this.filter(":has(>ul:hidden)")
            .addClass(CLASSES.expandable)
            .replaceClass(CLASSES.last, CLASSES.lastExpandable);
            
        // handle open ones
        this.not(":has(>ul:hidden)")
            .addClass(CLASSES.collapsable)
            .replaceClass(CLASSES.last, CLASSES.lastCollapsable);
            
              // create hitarea if not present
        var hitarea = this.find("div." + CLASSES.hitarea);
        if (!hitarea.length)
          hitarea = this.prepend("<div class=\"" + CLASSES.hitarea + "\"/>").find("div." + CLASSES.hitarea);
        hitarea.removeClass().addClass(CLASSES.hitarea).each(function() {
          var classes = "";
          $.each($(this).parent().attr("class").split(" "), function() {
            classes += this + "-hitarea ";
          });
          $(this).addClass( classes );
        })
      }
      
      // apply event to hitarea
      this.find("div." + CLASSES.hitarea).click( toggler );
    },
    treeview: function(settings) {
      
      settings = $.extend({
        cookieId: "treeview"
      }, settings);
      
      if ( settings.toggle ) {
        var callback = settings.toggle;
        settings.toggle = function() {
          return callback.apply($(this).parent()[0], arguments);
        };
      }
    
      // factory for treecontroller
      function treeController(tree, control) {
        // factory for click handlers
        function handler(filter) {
          return function() {
            // reuse toggle event handler, applying the elements to toggle
            // start searching for all hitareas
            toggler.apply( $("div." + CLASSES.hitarea, tree).filter(function() {
              // for plain toggle, no filter is provided, otherwise we need to check the parent element
              return filter ? $(this).parent("." + filter).length : true;
            }) );
            return false;
          };
        }
        // click on first element to collapse tree
        $("a:eq(0)", control).click( handler(CLASSES.collapsable) );
        // click on second to expand tree
        $("a:eq(1)", control).click( handler(CLASSES.expandable) );
        // click on third to toggle tree
        $("a:eq(2)", control).click( handler() ); 
      }
    
      // handle toggle event
      function toggler() {
        $(this)
          .parent()
          // swap classes for hitarea
          .find(">.hitarea")
            .swapClass( CLASSES.collapsableHitarea, CLASSES.expandableHitarea )
            .swapClass( CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea )
          .end()
          // swap classes for parent li
          .swapClass( CLASSES.collapsable, CLASSES.expandable )
          .swapClass( CLASSES.lastCollapsable, CLASSES.lastExpandable )
          // find child lists
          .find( ">ul" )
          // toggle them
          .heightToggle( settings.animated, settings.toggle );
        if ( settings.unique ) {
          $(this).parent()
            .siblings()
            // swap classes for hitarea
            .find(">.hitarea")
              .replaceClass( CLASSES.collapsableHitarea, CLASSES.expandableHitarea )
              .replaceClass( CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea )
            .end()
            .replaceClass( CLASSES.collapsable, CLASSES.expandable )
            .replaceClass( CLASSES.lastCollapsable, CLASSES.lastExpandable )
            .find( ">ul" )
            .heightHide( settings.animated, settings.toggle );
        }
      }
      this.data("toggler", toggler);
      
      function serialize() {
        function binary(arg) {
          return arg ? 1 : 0;
        }
        var data = [];
        branches.each(function(i, e) {
          data[i] = $(e).is(":has(>ul:visible)") ? 1 : 0;
        });
        $.cookie(settings.cookieId, data.join(""), settings.cookieOptions );
      }
      
      function deserialize() {
        var stored = $.cookie(settings.cookieId);
        if ( stored ) {
          var data = stored.split("");
          branches.each(function(i, e) {
            $(e).find(">ul")[ parseInt(data[i]) ? "show" : "hide" ]();
          });
        }
      }
      
      // add treeview class to activate styles
      this.addClass("treeview");
      
      // prepare branches and find all tree items with child lists
      var branches = this.find("li").prepareBranches(settings);
      
      switch(settings.persist) {
      case "cookie":
        var toggleCallback = settings.toggle;
        settings.toggle = function() {
          serialize();
          if (toggleCallback) {
            toggleCallback.apply(this, arguments);
          }
        };
        deserialize();
        break;
      case "location":
        var current = this.find("a").filter(function() {
          return this.href.toLowerCase() == location.href.toLowerCase();
        });

        /*custom code for selected*/
         if ( !current.length ) {
        var loc = location.href.split("?");
        var current = this.find("a").filter(function() {
          return this.href.toLowerCase() == loc[0].toLowerCase();
        });
        
        }
        /*custom code for selected*/
       
        if ( current.length ) {
          // TODO update the open/closed classes
          var items = current.addClass("selected").parents("ul, li").add( current.next() ).show();
          if (settings.prerendered) {
            // if prerendered is on, replicate the basic class swapping
            items.filter("li")
              .swapClass( CLASSES.collapsable, CLASSES.expandable )
              .swapClass( CLASSES.lastCollapsable, CLASSES.lastExpandable )
              .find(">.hitarea")
                .swapClass( CLASSES.collapsableHitarea, CLASSES.expandableHitarea )
                .swapClass( CLASSES.lastCollapsableHitarea, CLASSES.lastExpandableHitarea );
          }
        }
        break;
      }
      
      branches.applyClasses(settings, toggler);
        
      // if control option is set, create the treecontroller and show it
      if ( settings.control ) {
        treeController(this, settings.control);
        $(settings.control).show();
      }
      
      return this;
    }
  });
  
  // classes used by the plugin
  // need to be styled via external stylesheet, see first example
  $.treeview = {};
  var CLASSES = ($.treeview.classes = {
    open: "open",
    closed: "closed",
    expandable: "expandable",
    expandableHitarea: "expandable-hitarea",
    lastExpandableHitarea: "lastExpandable-hitarea",
    collapsable: "collapsable",
    collapsableHitarea: "collapsable-hitarea",
    lastCollapsableHitarea: "lastCollapsable-hitarea",
    lastCollapsable: "lastCollapsable",
    lastExpandable: "lastExpandable",
    last: "last",
    hitarea: "hitarea"
  });
  
})(jQuery);


/* custom scripts */

$(document).ready(function() {
     /* On Sale */
      jQuery(".ProductList").each(function(){
        jQuery(this).find("li").each(function(){
          if(jQuery(this).find("strike").length > 0)
          {
            jQuery(this).append("<div class='saleLabel'>On Sale!</div>").addClass("onSale");
          }
        });
       });
      /* On Sale */
    
if ($('.WishListButton:visible').size() != 0) {
    
    $('html').click(function() {
      $('#SideProductAddToWishList .BlockContent').slideUp(300);
     });
    
    
    $('.WishListButton').click(function(event){
      event.stopPropagation();
      x = $('.WishListButton').position().left;
      y = $('.WishListButton').position().top;
      $('#SideProductAddToWishList').css('top', y).css('left', x).css('position', 'absolute').show();
      $('.AddToWishlist').css('width', "300px");
     $('#SideProductAddToWishList .BlockContent').slideToggle(200);
    });
    $('#SideProductAddToWishList .BlockContent').click(function(event){
      event.stopPropagation();
    }); 
  }
  $('.prodAccordion > div > h2').click(function(){
 //   $('#SideProductAddToWishList .BlockContent').slideUp(300);
  });   


/* based on device it removes useless form code */
jQuery("#cartForm").submit(function(){
  if(jQuery("#cartForm .mobileView").is(":visible")){
    jQuery("#cartForm .desktopView").detach();
  }else{
    jQuery("#cartForm .mobileView").detach();
  }
});

     jQuery('.mobileMenuIcon').sidr({
      name: 'sidr-left',
      side: 'left',

      onOpen: function(name) {


$('html, body').css({
'overflow': 'hidden',
'height': '100%'
})

},
onClose: function(name) {

$('html, body').css({
'overflow': 'auto',
'height': 'auto'
})

},
      source: function(name) {
        
          var QuickCartPanel = jQuery(".mobileSideMenu").html();
        
        if(jQuery("#SideShopByBrand").html()!="" && jQuery("#SideShopByBrand").html()!=null)
        QuickCartPanel += jQuery("#SideShopByBrand").html();

        if(jQuery("#SideAccountStoreCredit").html()!="" && jQuery("#SideCategoryShopByPrice").html()!=null)
        QuickCartPanel += jQuery("#SideCategoryShopByPrice").html();

    if(jQuery("#SideAccountStoreCredit").html()!="" && jQuery("#SideAccountStoreCredit").html()!=null)
    QuickCartPanel += jQuery("#SideAccountStoreCredit").html();
  
      if(jQuery("#SideAccountMenu").html()!="" && jQuery("#SideAccountMenu").html()!=null)
        QuickCartPanel += jQuery("#SideAccountMenu").html();

      if(jQuery("#BlogRecentPosts").html()!="" && jQuery("#BlogRecentPosts").html()!=null)
        QuickCartPanel += jQuery("#BlogRecentPosts").html();

      if(jQuery("#GiftCertificatesMenu").html()!="" && jQuery("#GiftCertificatesMenu").html()!=null)
        QuickCartPanel += jQuery("#GiftCertificatesMenu").html();
        
      if(jQuery("#SideVendorPageList").html()!="" && jQuery("#SideVendorPageList").html()!=null)
        QuickCartPanel += jQuery("#SideVendorPageList").html();
        
      if(jQuery("#VendorLogo").html()!="" && jQuery("#VendorLogo").html()!=null)
        QuickCartPanel += jQuery("#VendorLogo").html();
        
      if(jQuery("#VendorPhoto").html()!="" && jQuery("#VendorPhoto").html()!=null)
        QuickCartPanel += jQuery("#VendorPhoto").html();

      if(jQuery("#SideVendorPageList").html()!="" && jQuery("#SideVendorPageList").html()!=null)
        QuickCartPanel += jQuery("#SideVendorPageList").html();
                

                QuickCartPanel+='<br/><br/><br/>';
    
        return QuickCartPanel;
      }
});
    
    jQuery(".Left .SideCategoryListFlyout > ul").attr("class","");
    jQuery("#sidr-left ul, .Left .SideCategoryListFlyout > ul").treeview({
            collapsed: true,
        animated: "medium",
        control:"#sidetreecontrol",
        persist: "location"
    });
    
    var itemTxt = $('.cartCount strong').text();
    var totalCost = $('.cartCost strong').text();
        if(totalCost.length != 0) {
            if(itemTxt==1 || itemTxt==0) $('.CartLink span').html(itemTxt+' Item / '+totalCost);
    else $('.CartLink span').html(itemTxt+' Items / '+totalCost);
        }
        else{
            $('.CartLink span').html("0 Item / 0.00");
            }
        
    var hash = window.location.hash;
    if (hash == '#ProductReviews' || hash == '#write_review') {
        $('#ProductReviews').find('.subtitle').trigger('click');
    }
    
    $('.wishTrigger').click(function() {
        $('#frmWishList').submit();
    });

    $('input[type=text],input[type=url],input[type=email],input[type=password]').focus(function () {
        if ($(this).val() == $(this).attr("title")) {
            $(this).val("");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val($(this).attr("title"));
        }
    });
    $(".SubTotal td strong:contains('Grand Total:')").closest('tr').addClass('gtotal');
    
    
    
    var onsale = $(".ProductDetailsGrid .DetailRow.PriceRow .Value em");
    if(onsale.children('strike').length > 0 ){
        onsale.addClass("on-sale");
    }
    
    
    
    var shopPath = config.ShopPath;
    var win = window.location.pathname;
      var Maddr = win.toLowerCase().replace(shopPath, ''); // remove the shop path because some links dont have it
    $('.Breadcrumb ul').last().addClass('last');
    //$('.Breadcrumb ul').not('.last').remove();
    var breadLink;
    if ($('.Breadcrumb li:nth-child(2)').children('a').size() != 0) {
        breadLink = $('.Breadcrumb ul.last li:nth-child(2)').children('a').attr('href').toLowerCase().replace(shopPath, '');    
    }
    
    $('#Menu .category-list').addClass('page');
    //$('#Menu .category-list').prepend('<li class=""><a href="'+shopPath+'/">Home</a></li>')
    // add active class to category sidebar
    
    
    
    $("#SideCategoryList li a").each(function() {
            
        var ChrefX = $(this).attr('href').toLowerCase().replace(shopPath, ''); // remove shop path if any because some links dont have it
        
        if (Maddr==ChrefX) {
            $(this).closest('.parent').children('a').addClass("active"); //if the window location is equal side menu href
            
        } 
        
    });

    // add active class to menu    
    $(".category-list.page a").each(function() {
            
        var MhrefX = $(this).attr('href').toLowerCase().replace(shopPath, ''); // remove shop path if any because some links dont have it
        
    
        
    
        if (Maddr==MhrefX) {
            
            
            $(this).closest('.parent').addClass("ActivePage"); //if the window location is equal side menu href
            
        } 
        if (breadLink == MhrefX) {
            $(this).closest('.parent').addClass("ActivePage");
        }
        
        
    });
    
    if($('input[type="checkbox"]').is(":visible")){
        $('input[type="checkbox"]').not('#category input[type="checkbox"]').uniform();
    }
    if($('input[type="radio"]').is(":visible")){
        $('input[type="radio"]').not('.productOptionPickListSwatch input[type="radio"], .productOptionViewRectangle input[type="radio"]').uniform();
    }
    
    $('select').not('select#FormField_12, .UniApplied').uniform({ selectAutoWidth: false });
    $('input[type="file"]').uniform();  
    
    //currency display
   var currentCurrency = $('#currencyPrices').html();
   if(currentCurrency != null) {
    currentCurrency = currentCurrency.substring(0,currentCurrency.length - 1);
   $('.currency-converter p').html(currentCurrency); 
   }
   
   
   var currentCurrencyF = $('.CurrencyList').find('.Sel').html();
   $('.selected-currency').html(currentCurrencyF);    
   
    $('.currency-converter').hover(function() {
        $(this).children(".CurrencyChooser").stop(true,true).show();
        $('.selected-currency').click(function() {
            var curDisplay = $(this).siblings("div").children(".CurrencyList");
            if(curDisplay.is(":visible")){
                curDisplay.hide();
            } else {
                curDisplay.slideDown();
            }
        });
    },function() {
        $(this).children(".CurrencyChooser").hide();
        $(this).children("div").children("div").children('.CurrencyList').stop(true,true).hide();
    });
    
    
    
    $("#wishlistsform a:contains('Share')").each(function() {
        $(this).attr('title', 'Share Wishlist');
    })
    
    
    $('#selectAllWishLists').click(function() {
        $.uniform.update(); 
    });
    
    
    // menu adjust
    $("#Menu ul > li").each(function() {
        $(this).addClass('parent');
    });    
    $(".PageMenu .category-list  > li").each(function() {
        $(this).addClass('parent');
    
        tallest = 0;
            group =  $(this).find('ul');
    
        group.each(function() {
            thisHeight = $(this).height();
            if(thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        group.height(tallest);
    });
    
    $('.PageMenu li').each(function() {
        if ($(this).children('ul').size() != 0) {
            $(this).children('a').addClass('hasSub');    
        }
    });
    $('.PageMenu li').hover(function() {
        $(this).addClass('over');
        return false;
    }, function() {
        $(this).removeClass('over');
    });
    var num = $('.PageMenu .parent').size(); 
    $('.category-list .parent').each(function(i) {
        $(this).css('z-index', num - i);
      });
      $('.PageMenu #Menu .parent').each(function(i) {
        $(this).css('z-index', num - i);
      });
    
    
    
    
    
    $('.FormFieldLabel').each(function() {
        $(this).text($(this).text().replace(/:/g,"")); 
    });

    




});


function addToWishList(url,id){


      url = url.replace("http:","");
      url = url.replace("https:","");

      var wishlistUrl = "/wishlist.php?action=add&product_id="+id+"&variation_id="; ;


      jQuery.get(url,{},function(data){


          var SideListForm = jQuery(data).find("#SideProductAddToWishList");


          if(jQuery(SideListForm).find("input[type='radio']").length){


$.iModal({data:SideListForm.html(),title:"Add to wishlist",width: "300px"});

          

            return false;
          }else{
            window.location = wishlistUrl;
          }

      });

      return false;

}

jQuery(document).ready(function(){

    // set active menu
    var path = window.location.pathname;
    jQuery(".PageMenu li a").each(function(){
    if(path==jQuery(this)[0].pathname || path=="/"+jQuery(this)[0].pathname)
    jQuery(this).parent().addClass("ActivePage");
    })

  // add to cart functionality
    $(".addToCartButton[data-href*='cart.php?action=add']").click(function(event) {
        if(parseInt(jQuery(window).width())>767){
    fastCartAction($(this).attr('data-href'));
    }
    else
    window.location = $(this).attr('data-href');
    return false;
  });

    $(".icon-Choose").click(function(event) { window.location = $(this).attr('data-href'); });

    


    jQuery(".slide-content").each(function(){

        var tempHeading = jQuery(this).find(".slide-heading");
        
        if(jQuery.trim(tempHeading.text())=="")
            tempHeading.remove();

        var tempText = jQuery(this).find(".slide-text");
        if(jQuery.trim(tempText.text())=="")
            tempText.remove();

    });


jQuery(".quickview button").click(function(){

jQuery(this).parent().parent().parent().parent().parent().find('.QuickViewBtn').click();


})



})

function ToggleShippingEstimation2(){
        var $container = $(".EstimateShipping");
        $('.EstimatedShippingMethods').hide();
        
        
        if ($container.is( ":hidden" )){
            // Show - slide down.
            $('.EstimateShippingLink').hide();    
            $container.slideDown(300, function() {
                
            });    
            $('.EstimateShipping select:eq(0)').focus();
            //$('#shippingZoneState:not(".UniApplied")').uniform();
            if ($('#shippingZoneState').is(':hidden')) {
                $('#uniform-shippingZoneState').hide();
            }
         
        } else {
         
            // hide - slide up.
            
            $container.slideUp(300, function() {
                $('.EstimateShippingLink').show();    
            });    
        
         
        }

}

 //$.cookie('compare_list', null, { expires: 7, path: '/' });

    
var compareListItems = new Array();
var compareList = $.cookie('compare_list');

function addToCompare(product_id){
  if(findInList(product_id)==true){

    var temppath = jQuery("#img_"+product_id).find("img").attr("src");
    var tempLink = jQuery("#link_"+product_id);


    var compareList = $.cookie('compare_list');
  var newCompareList = new Array();

  if(compareList!=null || compareList!=""){
    try{
  var Clist = compareList.split(",");
  for(var i = 0; i< (Clist.length/4); i++ ){


newCompareList.push(Array(Clist[(i*4)],Clist[(i*4)+1],Clist[(i*4)+2].replace(",","%72:"),Clist[(i*4)+3])); 
 }
}
    catch(ex){}
  
}
    newCompareList.push(Array(product_id,temppath,tempLink.text().replace(",","%72:"),tempLink.attr("href"))); 


var item = '<li id="compare_item_'+product_id+'" date-id="'+product_id+'"><a href="'+tempLink.attr("href")+'"><img  src="'+temppath+'"></a><a href="'+tempLink.attr("href")+'">'+tempLink.text()+'</a>-- <a href="javascript:void(0)" onclick="removeCompareItem('+product_id+')">Remove</a></li></li>';

      jQuery("#ComparePanel ul").append(item);

jQuery("#sidr-right-compare").html(jQuery("#ComparePanel").html());

    $.cookie('compare_list', newCompareList, { expires: 7, path: '/' });

    $.growl.notice({ message: "Item added to comparison list" });

  compareCountUpdate();
    

  } else  {

      $.growl.warning({ message: "Item already added for comparison" });
    

  }

}

function compareCountUpdate(){
  var compareList = $.cookie('compare_list');

  if(compareList!=null || compareList!=""){
    try{
  var Clist = compareList.split(",");
  var totalItemsToCompare = parseInt(Clist.length/4);
  if(parseInt(totalItemsToCompare)<=1){
  jQuery(".CompareItem span").html("("+totalItemsToCompare+" Item)");
  }
else{

totalItemsToCompare   = Math.floor(totalItemsToCompare);
jQuery(".CompareItem span").html("("+totalItemsToCompare+" Items)");

}

}
    catch(ex){

      jQuery(".CompareItem span").html("(0 Item)");
    }
  
}
  

}

function findInList(product_id){
  var compareList = $.cookie('compare_list');
  if(compareList!=null || compareList!=""){
    try {
  var Clist = compareList.split(",");
  var totalItems = Clist.length/4;
  if(totalItems>=4){
    $.growl.warning({ message: "You can't compare more then 4 items at a time. Please remove some items from your list" });
    return false;
  }
  for(var i = 0; i< totalItems; i++ ){
    var j = i*4;
    if(product_id == Clist[j])
      return false;

  }
}catch(ex) {}
   }
  return true;


}
function removeCompareItem(item){


  jQuery("#compare_item_"+item).remove();
  jQuery("#compare_item_"+item).remove();

  var compareList = $.cookie('compare_list');
  var newCompareList = new Array();

  if(compareList!=null || compareList!=""){
    try{
  var Clist = compareList.split(",");
  for(var i = 0; i< (Clist.length/4); i++ ){

  if(parseInt(Clist[(i*4)])!=parseInt(item)){
      newCompareList.push(Array(Clist[(i*4)],Clist[(i*4)+1],Clist[(i*4)+2].replace(",","%72:"),Clist[(i*4)+3])); 
  }

  }
  $.cookie('compare_list', newCompareList, { expires: 7, path: '/' });
  compareCountUpdate();




  }
    catch(ex){}
  }

}

/* generates compare list */
function generateCompareList(){

  var compareList = $.cookie('compare_list');
  if(compareList!=null || compareList!=""){
    try{
     var Clist = compareList.split(",");
     for(var i = 0; i< (Clist.length/4); i++ ){
        var item = '<li id="compare_item_'+Clist[(i*4)]+'" date-id="'+Clist[(i*4)]+'"><a href="'+Clist[(i*4)+3]+'"><img  src="'+Clist[(i*4)+1]+'"></a><a href="'+Clist[(i*4)+3]+'">'+Clist[(i*4)+2].replace("%72:",",")+'</a> -- <a href="javascript:void(0)" onclick="removeCompareItem('+Clist[(i*4)]+')">Remove</a></li>';
         jQuery("#ComparePanel ul").append(item);
    }

   }
    catch(ex){}
  }
}

/* logic to send items to compare page */
function compareNow(){
var compareList = $.cookie('compare_list');
  if(compareList!=null || compareList!=""){
    try{
    var Clist = compareList.split(",");
    var cItems = "";
    for(var i = 0; i< (Clist.length/4); i++ ){
        cItems += "/"+Clist[(i*4)];
    }
    window.location = "/compare"+cItems;
  }
    catch(ex){}
  } else{

    alert("No items available for comparison !!!!");
  }

}

jQuery(window).load(compareCountUpdate);

 function _showFastCart(modalOptions) {
    modalOptions = $.extend({
    width: 820,
    closeTxt: true,
    onShow: function() {
    $("#fastCartSuggestive a[href*='cart.php?action=add']").unbind('click');
    
    var itemTxt = jQuery.trim($('#fastCartNumItemsTxt').html().replace('items', '').replace('item', ''));
    var itemTotal = $('.fastCartSummaryBox .ProductPrice').html();
    
    if (itemTxt) {
    // update the view cart item count on top menu
    if(itemTxt==1 || itemTxt==0) itemTxt = itemTxt+" Item";
    else itemTxt = itemTxt+" Items";

    itemTxt = itemTxt+" / ";

    $('.CartLink span.item').html(itemTxt+itemTotal);
    
    }
    setProductListHeights(null, '.fastCartContent');
    $('.fastCartContent .ProductList:not(.List) li').width(ThumbImageWidth);
    $('body').addClass('customfastCart');
    },
    onClose: function() {
    $('body').removeClass('customfastCart');
    if (window.location.href.match(config.ShopPath + '/cart.php')) {
    // reload if we are on the cart page
    $('#ModalContainer').remove();
    window.location = window.location.href
    } else {
    $('#ModalContainer').remove();
    }
    }
    }, modalOptions);
    
    $.iModal.close();
    $.iModal(modalOptions);
    }
