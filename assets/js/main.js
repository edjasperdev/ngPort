var $ = jQuery.noConflict();

(function($) {
  'use strict';
    
    var $html = $('html');
    var $body = $('body');
    
    
/*=================================================
Switch Animation
=================================================*/

function fn_switchAnimation() {
  $('a[data-link-to]').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $activeSection = $('section.active');
    var $linkToSection = $($this.data('link-to'));
    var id = $linkToSection.attr('id');
    var $linkTomenuListItem = $('.mainNav').find('a[data-link-to="#' + id + '"]');
    var $preloader = $('#preloader');
    var $sectionWrap = $('.section-wrap');
    var $menuListItem = $('#menu').find('li');
    var $activeMenuListItem = $('#menu').find('.active');

    if (!$linkToSection.hasClass('active')) {
      $body.removeClass('menu-in');
      $menuListItem.velocity('transition.slideUpOut', {stagger: 80});
      $menuWrap.velocity('stop', true)
      .velocity('fadeOut', {
        duration: 500
      });

      $activeSection
      .velocity('stop', true)
      .velocity('transition.slideUpOut', {
        duration: 1200,
        complete: function() {
          $preloader.velocity('fadeIn', {
            duration: 800,
            complete: function() {
              $preloader.velocity('fadeOut', {
                duration: 800,
                delay: 100,
                complete: function() {
                  $linkToSection.velocity('transition.slideDownIn', {duration: 1000});
                  $activeSection.add($activeMenuListItem).removeClass('active');
                  $linkToSection.add($linkTomenuListItem).addClass('active');
                }
              });
            }
          });
        }
      });
    }
  });
}


/*=================================================
preloader
=================================================*/
var _preloaderDuration = 800; // duration
var _preloaderDelay = 500; // delay

  function fn_preloader() {
    var $preloader = $('#preloader');
    $preloader.velocity('fadeOut', {
      delay: _preloaderDelay,
      duration: _preloaderDuration,
      complete: function() {
        $('section.active')
        .velocity('stop', true)
        .velocity('transition.slideDownIn', {duration: 1000});
      }
    });
  }
/*=================================================
window on load
=================================================*/
  $(window).on('load', function() {
    $('section').hide(); // hide all section
        fn_preloader();

  });

/*=================================================
document on ready
=================================================*/
    $(document).on('ready', function() {
        alert('hey');
        fn_switchAnimation();
    });
    
})(jQuery);

