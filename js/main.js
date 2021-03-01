jQuery(document).ready(function($) {
	// Initialize global variables.
	var navbar = $('.cd-side-navigation'),
		dashboard = $('.cd-section'),
		timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	// Hide timeline blocks which are outside the viewport.
	hideBlocks(timelineBlocks, offset);

	// Select a new section and scroll to it.
	navbar.on('click', 'a', function(event) {
		var target = $(this);
		if (target.data('menu') !== 'link') {
			event.preventDefault();
			var scrollId = $('#' + target.data('menu'));
			newSection = target.data('menu');
			navbar.find('*[data-menu="' + newSection + '"]').addClass('selected').parent('li').siblings('li').children('.selected').removeClass('selected');
			scrollId.velocity('scroll', { container: dashboard }, 200);
		}
	});

  	// Scroll to content if user clicks the .cd-scroll icon.
	dashboard.on('click', '.cd-scroll', function(event) {
		event.preventDefault();
		navbar.find('*[data-menu="second"]').addClass('selected').parent('li').siblings('li').children('.selected').removeClass('selected');
		var scrollId = $(this.hash);
		scrollId.velocity('scroll', { container: dashboard }, 200);
	});

	// On scolling, show/animate timeline blocks when enter the viewport.
	dashboard.on('scroll', function(){
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
});