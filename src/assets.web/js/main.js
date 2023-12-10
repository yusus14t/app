(function($) {
  'use strict';

  /*-------------------------------------------------------------------------------
  Cookies
  -------------------------------------------------------------------------------*/
  function setCookie(cname, cvalue, days) {

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = cname + "=" + cvalue + expires + "; path=/";
  }

  //Return a particular cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //Checks if a cookie exists
  function checkCookie(cookieToCheck) {
    var cookie = getCookie(cookieToCheck);
    if (cookie != "") {
      return true;
    }
    return false;
  }

  //Delet an existing cookie
  function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  /*-------------------------------------------------------------------------------
  Newsletter popup close and set cookie
  -------------------------------------------------------------------------------*/
  $(".newsletter-popup-trigger").on('click', function(){
    setCookie('newsletter_popup_viewed', 'true');
    $(".sigma_popup").removeClass('show');
  });

  $('#sigma_popup-newsletter').on('hidden.bs.modal', function () {
    setCookie('newsletter_popup_viewed', 'true');
  });

  /*-------------------------------------------------------------------------------
 	Mobile Nav and Toggles
  -------------------------------------------------------------------------------*/
  $(".aside-trigger").on('click', function() {
    $("body").toggleClass('aside-open');
  });

  $(".aside-trigger-right").on('click', function() {
    $("body").toggleClass('aside-right-open');
  });

  $(".sigma_aside .menu-item-has-children > a").on('click', function(e) {
    var submenu = $(this).next(".sub-menu");
    e.preventDefault();

    submenu.slideToggle(200);
  });

  /*-------------------------------------------------------------------------------
  Search Trigger
  -------------------------------------------------------------------------------*/
  $(".search-trigger").on('click', function(e) {
    $(".search-form-wrapper").toggleClass('open');
  });

  /*-------------------------------------------------------------------------------
  Tooltips
  -------------------------------------------------------------------------------*/
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /*-------------------------------------------------------------------------------
  Custom Select
  -------------------------------------------------------------------------------*/

  $('.custom-select').niceSelect();

  /*-------------------------------------------------------------------------------
  Sticky Header
  -------------------------------------------------------------------------------*/
  var header = $(".can-sticky");
  var headerHeight = header.innerHeight();

  function doSticky() {

    if (window.pageYOffset > headerHeight) {
      header.addClass("sticky");
    } else {
      header.removeClass("sticky");
    }

  }
  doSticky();

  /*-------------------------------------------------------------------------------
  Team Socials Trigger
  -------------------------------------------------------------------------------*/
  $("a.trigger-team-socials").on('click', function(e) {
    e.preventDefault();
    $(this).closest('.sigma_social-icons').toggleClass('visible');
  });

  /*-------------------------------------------------------------------------------
  Back to top
  -------------------------------------------------------------------------------*/
  function stickBackToTop() {
    if (window.pageYOffset > 400) {
      $('.sigma_top').addClass('active');
    } else {
      $('.sigma_top').removeClass('active');
    }
  }
  stickBackToTop();

  $('body').on('click', '.sigma_top', function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  /*-------------------------------------------------------------------------------
  Progress bar on view
  -------------------------------------------------------------------------------*/
  $(".sigma_progress").each(function() {
    var progressBar = $(this).find(".progress-bar");
    var progressCount = $(this).find(".sigma_progress-count");
    $(progressBar).one('inview', function(event, isInView) {
      if (isInView) {
        $(progressBar).animate({
          width: $(progressBar).attr("aria-valuenow") + "%"
        }, function() {
          $(progressCount).animate({
            left: $(progressBar).attr("aria-valuenow") + "%",
            opacity: 1
          });
        });
      }
    });
  });

  $(".sigma_progress-round").each(function() {
    var animateTo = $(this).data('to'),
      $this = $(this);
    $this.one('inview', function(event, isInView) {
      if (isInView) {
        $this.css({'stroke-dashoffset': animateTo});
      }
    });
  });

  /*-------------------------------------------------------------------------------
  Magnific Popup
  -------------------------------------------------------------------------------*/
  $('.popup-video').magnificPopup({type: 'iframe'});
  $('.gallery-thumb').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  /*-------------------------------------------------------------------------------
  ion Range Sliders (Price filter)
  -------------------------------------------------------------------------------*/
  $(".js-range-slider").ionRangeSlider();

  /*-------------------------------------------------------------------------------
  Masonry
  -------------------------------------------------------------------------------*/
  $('.masonry').imagesLoaded(function() {
    var isotopeContainer = $('.masonry');
    isotopeContainer.isotope({itemSelector: '.masonry-item'});
  });

  /*------------------------------------------------------------------------------
  Isotope
  ------------------------------------------------------------------------------*/
  var $isotopeGrid;
  $('.sigma_isotope-filter').imagesLoaded(function() {
    $isotopeGrid = $('.sigma_isotope-filter').isotope({
      itemSelector: '.col-lg-4',
      percentPosition: true,
      masonry: {
        columnWidth: '.col-lg-4'
      }
    });
  });

  $('.sigma_isotope-filter-items').on('click', '.sigma_isotope-trigger', function() {
    var filterValue = $(this).attr('data-filter');
    $isotopeGrid.isotope({filter: filterValue});
  });

  $('.sigma_isotope-trigger').on('click', function(e) {
    $(this).closest('.sigma_isotope-filter-items').find('.active').removeClass('active');
    $(this).addClass('active');
    event.preventDefault();
  });

  /*-------------------------------------------------------------------------------
  Counter Js
-------------------------------------------------------------------------------*/

  $(".counter").each(function() {
    var $this = $(this);
    $this.one('inview', function(event, isInView) {
      if (isInView) {
        $this.countTo({speed: 2000});
      }
    });
  });

  /*-------------------------------------------------------------------------------
  Password Toggle Js
  -------------------------------------------------------------------------------*/
  $(".password-toggle").on('click', function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $(this).next(),
      inputType = input.attr("type") == "password"
        ? 'text'
        : 'password';

    input.attr("type", inputType);
  });

  /*-------------------------------------------------------------------------------
  smooth scroll
  -------------------------------------------------------------------------------*/

  $('.detail-menu-list .nav-item .nav-link').on( 'click', function(event) {
      var target = $(this.hash);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 20
        }, 1500);
        return false;
      }
  });

  /*-------------------------------------------------------------------------------
  Parallax scroll
  -------------------------------------------------------------------------------*/

  $(window).on("scroll", function() {
    var parallaxElement = $(".parallax_scroll_up"),
    parallaxQuantity = parallaxElement.length;
    window.requestAnimationFrame(function() {
      for (var i = 0; i < parallaxQuantity; i++) {
        var currentElement = parallaxElement.eq(i),
        windowTop = $(window).scrollTop(),
        elementTop = currentElement.offset().top,
        elementHeight = currentElement.height(),
        viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
        scrolled = windowTop - elementTop + viewPortHeight;
        currentElement.css({
          transform: "translate3d(0," + scrolled * -0.25 + "px, 0)"
        });
      }
    });

    var parallaxElement2 = $(".parallax_scroll_down"),
    parallaxQuantity2 = parallaxElement2.length;
    window.requestAnimationFrame(function() {
      for (var i = 0; i < parallaxQuantity2; i++) {
        var currentElement2 = parallaxElement2.eq(i),
        windowTop = $(window).scrollTop(),
        elementTop = currentElement2.offset().top,
        elementHeight = currentElement2.height(),
        viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
        scrolled = windowTop - elementTop;
        currentElement2.css({
          transform: "translate3d(0," + scrolled * 0.05 + "px, 0)"
        });
      }
    });

  });


  /*-------------------------------------------------------------------------------
   Banner Slider
  -------------------------------------------------------------------------------*/
  $(".sigma_banner-slider").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });

  $(".sigma_banner-slider-2").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          arrows: false
        }
      }
    ]
  });

  $(".sigma_banner-slider-3").slick({

    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: false,
    centerMode: false,
    centerPadding: 0,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: false
        }
      }
    ]
  });

  $(".sigma_banner-slider-4").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    asNavFor: '.banner-image-slider'
  });

  $(".banner-image-slider").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    asNavFor: '.sigma_banner-slider-4'
  });

  $(".sigma_banner-slider-5").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    asNavFor: '.sigma_banner-thumbnails'
  });

  $(".sigma_banner-thumbnails").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    centerMode: false,
    centerPadding: 0,
    focusOnSelect: true,
    asNavFor: '.sigma_banner-slider-5',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Gallery Format Slider
  -------------------------------------------------------------------------------*/
  $(".post-format-gallery .sigma_post-thumb").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Service Slider
  -------------------------------------------------------------------------------*/

  $(".sigma_service-slider").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Portfolio Slider
  -------------------------------------------------------------------------------*/
  $(".sigma_portfolio-slider").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    vertical: true,
    verticalScrolling: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          arrows: false
        }
      }
    ]
  });

  $(".sigma_portfolio-slider-2").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".sigma_portfolio-slider-3").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.sigma_custom-arrows .slick-prev'),
    nextArrow: $('.sigma_custom-arrows .slick-next'),
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".sigma_portfolio-slider-4").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.sigma_custom-arrows .slick-prev'),
    nextArrow: $('.sigma_custom-arrows .slick-next'),
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".sigma_portfolio-slider-5").slick({

    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.sigma_custom-arrows .slick-prev'),
    nextArrow: $('.sigma_custom-arrows .slick-next'),
    autoplay: true,
    centerMode: false,
    centerPadding: 0,
    infinite: false,
    responsive: [
       {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".sigma_portfolio-slider-6").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    centerMode: false,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".sigma_portfolio-slider-7").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.sigma_custom-arrows .slick-prev'),
    nextArrow: $('.sigma_custom-arrows .slick-next'),
    autoplay: true,
    centerMode: false,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          arrows: false,
        }
      }
    ]
  });

  $(".sigma_portfolio-slider-8").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.sigma_custom-arrows .slick-prev'),
    nextArrow: $('.sigma_custom-arrows .slick-next'),
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });


  /*-------------------------------------------------------------------------------
  Testimonial Sliders
  -------------------------------------------------------------------------------*/

  $(".sigma_testimonial-slider").slick({

    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  });

  $(".sigma_testimonial-slider-2").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    asNavFor: '.slider-nav-thumbnails'
  });

  $(".slider-nav-thumbnails").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true,
    asNavFor: '.sigma_testimonial-slider-2'
  });

  $(".sigma_testimonial-slider-3").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  });

  $(".sigma_testimonial-slider-4").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".sigma_testimonial-slider-5").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Info Box Sliders
  -------------------------------------------------------------------------------*/
  $(".sigma_info-slider").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    asNavFor: '.sigma_info-image-slider'
  });

  $(".sigma_info-image-slider").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true,
    asNavFor: '.sigma_info-slider'
  });

  $(".sigma_info-image-slider-2").slick({

    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true
  });

  /*-------------------------------------------------------------------------------
  Team Slider
  -------------------------------------------------------------------------------*/

  $(".sigma_team-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.sigma_custom-arrows .slick-prev'),
    nextArrow: $('.sigma_custom-arrows .slick-next'),
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".sigma_team-slider-2").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    centerMode: true,
    centerPadding: 0,
    responsive: [
    {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4
        }
      },
    {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
   Instagram Slider
  -------------------------------------------------------------------------------*/

  $(".sigma_instagram-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    centerMode: true,
    centerPadding: 0,
    responsive: [
    {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Product slider
  -------------------------------------------------------------------------------*/

  $(".sigma_product-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    centerMode: true,
    centerPadding: 0,
    responsive: [
    {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $(".sigma_product-slider-2").slick({

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    centerMode: false,
    centerPadding: 0,
    infinite: true,
    responsive: [
       {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  /*-------------------------------------------------------------------------------
  Product details slider
  -------------------------------------------------------------------------------*/
  $('.sigma_product-single-thumb .slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.sigma_product-single-thumb .slider-nav'
  });

  $('.sigma_product-single-thumb .slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.sigma_product-single-thumb .slider',
    dots: false,
    centerMode: false,
    arrows: false,
    focusOnSelect: false
  });

  /*-------------------------------------------------------------------------------
  on scroll functions
  -------------------------------------------------------------------------------*/
  $(window).on('scroll', function() {

    // Sticky header
    doSticky();

    // Back to top
    stickBackToTop();

  });

  /*-------------------------------------------------------------------------------
  on load functions
  -------------------------------------------------------------------------------*/
  $(window).on('load', function() {

    // Preloader
    $('.sigma_preloader').addClass('hidden');

    // Newsletter popup
    if(!checkCookie('newsletter_popup_viewed')){
      setTimeout(function(){
        $("#sigma_popup-newsletter").modal('show');
        $(".sigma_popup").addClass('show');
      }, 3000);
    }

  });

  /*-------------------------------------------------------------------------------
  Checkout Notices
  -------------------------------------------------------------------------------*/
  $(".sigma_notice a").on('click', function(e) {
    e.preventDefault();

    $(this).closest('.sigma_notice').next().slideToggle();
  });

  /*-------------------------------------------------------------------------------
  Color Switch
  -------------------------------------------------------------------------------*/

  $(".theme-switch").on('click', function() {
    $(".color-theme").toggleClass('slide-it');
  });

  $( ".each-color.co1" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });

     $( ".each-color.co2" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });

     $( ".each-color.co3" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });

     $( ".each-color.co4" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });

     $( ".each-color.co5" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });

     $( ".each-color.co6" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });

     $( ".each-color.co7" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });

     $( ".each-color.co8" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });

     $( ".each-color.co9" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });
     $( ".each-color.co10" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });
     $( ".each-color.co11" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });
     $( ".each-color.co12" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });
     $( ".each-color.co13" ).on('click', function(e) {
         var data1 = $(this).data('color');
         $(".color-changing").attr('href', data1);
     });



})(jQuery);
