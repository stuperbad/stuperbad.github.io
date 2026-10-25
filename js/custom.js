
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


  /* Resume / CV / Contact overlay: the page dims and the document opens in a sheet. */
  var docPages = { resume: 'Resume', cv: 'Curriculum Vitae', contact: 'Contact' };
  var $overlay = null, lastFocus = null;

  function buildOverlay() {
    $overlay = $(
      '<div class="doc-overlay" role="dialog" aria-modal="true" aria-hidden="true">' +
        '<div class="doc-sheet">' +
          '<button type="button" class="doc-close" aria-label="Close">&times;</button>' +
          '<iframe class="doc-frame" title=""></iframe>' +
        '</div>' +
      '</div>').appendTo('body');
    $overlay.on('click', function(e) {
      if (!$(e.target).closest('.doc-sheet').length || $(e.target).hasClass('doc-close')) { closeDoc(); }
    });
  }

  function openDoc(name) {
    if (!docPages[name]) { return; }
    if (!$overlay) { buildOverlay(); }
    lastFocus = document.activeElement;
    $('.list-menu').removeClass('reveal-modal');
    $overlay.find('iframe').attr('title', docPages[name]).attr('src', name + '.html?embed=1');
    $overlay.attr('aria-hidden', 'false').addClass('open');
    $('body').addClass('doc-open');
    $overlay.find('.doc-close').focus();
    if (history.replaceState) { history.replaceState(null, '', '#' + name); }
  }

  function closeDoc() {
    if (!$overlay) { return; }
    $overlay.removeClass('open').attr('aria-hidden', 'true');
    $('body').removeClass('doc-open');
    if (history.replaceState) { history.replaceState(null, '', location.pathname + location.search); }
    if (lastFocus) { lastFocus.focus(); }
    setTimeout(function() { if (!$overlay.hasClass('open')) { $overlay.find('iframe').attr('src', 'about:blank'); } }, 400);
  }

  window.openDoc = openDoc;

  $(document).on('click', 'a[data-doc]', function(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.which === 2) { return; }
    var name = $(this).attr('data-doc');
    if (window.self !== window.top) {
      // inside the overlay: ask the parent page to switch documents
      try { if (window.parent.openDoc) { e.preventDefault(); window.parent.openDoc(name); } } catch (err) {}
      return;
    }
    e.preventDefault();
    openDoc(name);
  });

  $(document).on('keydown', function(e) {
    if (e.which === 27) { closeDoc(); }
  });

  if (window.self === window.top && docPages[location.hash.replace('#', '')]) {
    openDoc(location.hash.replace('#', ''));
  }

});
