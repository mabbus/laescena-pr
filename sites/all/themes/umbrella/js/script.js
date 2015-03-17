/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";
	/* global google: false */
	/*-------------------------------------------------*/
	/* =  Top section
	/*-------------------------------------------------*/

	var windowHeight = $(window).height(),
		topSection = $('#home-section');
	topSection.css('height', windowHeight);

	$(window).resize(function(){
		var windowHeight = $(window).height();
		topSection.css('height', windowHeight);
	});

	/*-------------------------------------------------*/
	/* =  flexslider
	/*-------------------------------------------------*/
	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			animation: "fade"
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
		// Needed variables
		var $container=$('.portfolio-container');
		var $filter=$('.filter');
	


	var filterItemA	= $('.filter li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});

		try {

			$('.blog-box .view-content').imagesLoaded( function(){
				$('.blog-box .view-content').isotope({
					masonry: {
						columnWidth: 1,
						isAnimated: true,
						itemSelector: '.blog-post'
					}
				});
			});

			winDow.bind('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

				$('.blog-box .view-content').imagesLoaded( function(){
					$('.blog-box .view-content').isotope({
						masonry: {
							columnWidth: 1,
							isAnimated: true,
							itemSelector: '.blog-post'
						}
					});
				});
			});
		} catch(err) {

		}
	/*-------------------------------------------------*/
	/* =  preloader function
	/*-------------------------------------------------*/
	winDow.load( function(){
		var mainDiv = $('#container'),
			preloader = $('.preloader');

			preloader.fadeOut(400, function(){
				mainDiv.delay(400).addClass('active');
			});
	});

	/*-------------------------------------------------*/
	/* =  smooth scroll in chrome
	/*-------------------------------------------------*/
	try {
		$.browserSelector();
		// Adds window smooth scroll on chrome.
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  parallax
	/*-------------------------------------------------*/
	
	try{
		$('#testimonial-section, #tweet-section').appear(function() {	
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0
			});
		});
	} catch(err) {
	}

	/*-------------------------------------------------*/
	/* =  Testimonial
	/*-------------------------------------------------*/
	try{
		var testimUl = $('.testimonial > ul');

		testimUl.quovolver({
			transitionSpeed:300,
			autoPlay:true
		});
	}catch(err){
	}

	/*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/
	try {
		$('.statistic-post').appear(function() {
			$('.timer').countTo({
				speed: 4000,
				refreshInterval: 60
			});
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  navbar collapse menu
	/*-------------------------------------------------*/
	try {
		$(".navbar-nav li a").click(function(event) {
			$(".navbar-collapse").collapse('hide');
		});
	} catch(err) {

	}
	
	/*-------------------------------------------------*/
	/* =  Animated content
	/*-------------------------------------------------*/

	try {
		/* ================ ANIMATED CONTENT ================ */
		if ($(".animated")[0]) {
			$('.animated').css('opacity', '0');
		}

		$('.triggerAnimation').waypoint(function() {
			var animation = $(this).attr('data-animate');
			$(this).css('opacity', '');
			$(this).addClass("animated " + animation);

		},
			{
				offset: '80%',
				triggerOnce: true
			}
		);
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"51.51152", "lon":"-0.125198"}; //Change a map coordinate here!

	try {
		var mapContainer = $('.map');
		mapContainer.gmap3({
			action: 'addMarker',
			marker:{
				options:{
					icon : new google.maps.MarkerImage(Drupal.settings.basePath + Drupal.settings.pathToTheme +'/images/marker.png')
				}
			},
			latLng: [contact.lat, contact.lon],
			map:{
				center: [contact.lat, contact.lon],
				zoom: 17
				},
			},
			{action: 'setOptions', args:[{scrollwheel:false}]}
		);
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	try {
		// Example with multiple objects
		$('.zoom').magnificPopup({
			type: 'image'
		});
	} catch(err) {

	}

	try {
		var magnLink = $('.page');
		magnLink.magnificPopup({
			closeBtnInside:true
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* = slider Testimonial
	/*-------------------------------------------------*/

	var slidertestimonial = $('.bxslider');
	try{		
		slidertestimonial.bxSlider({
			mode: 'horizontal'
		});
	} catch(err) {
	}

	/*-------------------------------------------------*/
	/* = video background
	/*-------------------------------------------------*/

	try{
		jQuery(".player").mb_YTPlayer();
	} catch(err) {
	}

	/*-------------------------------------------------*/
	/* =  Carosells
	/*-------------------------------------------------*/
	try {
		$('.carousel').carousel({
			interval: false
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

});

$(document).ready(function($) {
    var isFront = $('.front').length > 0;
    var isMes = $('.page-calendario-mes').length > 0;
    var isMobile = $('.mobile').length > 0 ;

    function cleanupTitle () {
	var heading = $('.date-heading').find('h3').text().split(',');
	var newHeading = heading[1].replace(/[0-9]/g,'') + heading[2];
	$('.date-heading').find('h3').text(newHeading);	    
    }

    function onResize() {
	if(isFront) {
	    var homeHeight = $('#home-section').height();
	    var calHeight = $('.view-calendar').height();
	    var overflow = Math.abs(homeHeight - calHeight);
	    var padding = overflow / 2;

	    $('#block-views-calendar-home-page-week').css({'top': padding});
	    console.log(overflow);
	    if(calHeight > homeHeight) {
		$('.calendar-calendar table').height($('.view-calendar').height() - $('.view-header').height() - (overflow*3));
	    }
	}
    }

    $(window).resize(function () {
	onResize();
    });

    if(!isFront || !isMes) {
	if(!isMobile) {
	    $('.views-field-field-date').remove();	    
	} else {
	    $('.front .calendar-calendar tr td:first-child, .front .calendar-calendar tr th:first-child').show();
	    $('.date-heading h3').css({
		'margin-top': '20px;',
		'margin-left': '5px;',
		'width': '400px',
		'text-align': 'left',
	    });
	}
	cleanupTitle();
	$('.views-field-title').css({'padding-top': 10});
    }

    if(isMes) {
	Drupal.behaviors.monthTitle = {
	    attach: function (context, settings) {
		cleanupTitle();
	    }
	}

	cleanupTitle();
    }

    var isEvent = $('.node-type-portfolio').length > 0;

    if(isEvent) {
	var text = $('.node-teaser').find('h2').find('a').text();
	$('.node-teaser').find('h2').find('a').remove();
	$('.node-teaser').find('h2').text(text);
    }
});
