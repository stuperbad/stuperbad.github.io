
/* Portfolio filter — CSS Grid, no Isotope
-----------------------------------------------*/
jQuery(document).ready(function($){

  $('.filter-wrapper li a').click(function(){
    var $this       = $(this);
    var filterValue = $this.attr('data-filter');

    if (filterValue === '*') {
      $('.iso-box').removeClass('hidden');
    } else {
      var cls = filterValue.replace('.', '');
      $('.iso-box').each(function(){
        $(this).toggleClass('hidden', !$(this).hasClass(cls));
      });
    }

    if ($this.hasClass('selected')) { return false; }
    $this.closest('.filter-wrapper').find('.selected').removeClass('selected');
    $this.addClass('selected');

    return false;
  });

});


/* Navigation sticky + menu modal
-----------------------------------------------*/
$(document).ready(function() {
  "use strict";

  (function() {
    var docElem   = document.documentElement,
        didScroll = false,
        stickynav = 50;

    function init() {
      window.addEventListener('scroll', function() {
        if (!didScroll) { didScroll = true; setTimeout(scrollPage, 50); }
      }, false);
    }

    function scrollPage() {
      var sy = window.pageYOffset || docElem.scrollTop;
      if (sy >= stickynav) { $('.nav-container').addClass('sticky'); }
      else                 { $('.nav-container').removeClass('sticky'); }
      didScroll = false;
    }

    init();
  })();

  $('.menu-container').each(function(index) {
    $(this).find('.circle').attr('menu-link', index);
    $(this).find('.list-menu').clone().appendTo('body').attr('menu-link', index);
  });

  $('.menu-container .circle').click(function() {
    var linkedMenu = $('body').find('.list-menu[menu-link="' + $(this).attr('menu-link') + '"]');
    linkedMenu.toggleClass('reveal-modal');
  });

  $('body').find('.close-iframe').click(function() {
    $(this).closest('.list-menu').toggleClass('reveal-modal');
  });

});
