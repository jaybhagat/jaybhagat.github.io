var expanded = false;
var once = false;
var hoveredOutside = true;
var hoveredIn = true;
var projectsFadeTime = 1000;
var curPage = '#index';

function fader(oldPage, newPage) {
	if (newPage == '#projects-main') {
		$('#arrow-back-image').fadeOut(projectsFadeTime, function() { 
			$(this).show();
			$(this).css('visibility','hidden');
		});
	}
	$(oldPage).fadeOut(projectsFadeTime, function() {
		if (newPage != '#projects-main') {
			$('#arrow-back-image').css('visibility','visible').hide().fadeIn(projectsFadeTime);
		}
		$(newPage).fadeIn(projectsFadeTime);
	});
}

function returnToProjectsMain() {
	var projects = ['#skip-the-wait', '#transit-check', '#whiteboard', '#bubblescape'];
	var oldPage = '#projects-main';
	for (var i = 0; i < projects.length; i++) {
		if ($(projects[i]).is(':visible')) {
			oldPage = projects[i];
			break;
		}
	}
	fader(oldPage, '#projects-main');
}

function transition(nextPage) {
	var indexPage = $('#index').is(':visible');
	var aboutPage = $('#about').is(':visible');
	var projectsPage = $('#projects').is(':visible');

	if (indexPage) {
		if (nextPage == "#about") {
			moveDown(nextPage);
		} else if (nextPage == "#projects") {
			moveUp(nextPage);
		}
	} else if (aboutPage) {
		if (nextPage == "#index") {
			moveUp(nextPage);
		} else if (nextPage == "#projects") {
			moveDown(nextPage);
		}
	} else if (projectsPage) {
		if (nextPage == "#index") {
			moveDown(nextPage);
		} else if (nextPage == "#about") {
			moveUp(nextPage);
		}
	}
}

function moveUp(nextPage) {
	$(curPage).css('transform', 'translate3d(0px,-100vh,0)');
	$(curPage).css('-webkit-transform', 'translate3d(0px,-100vh,0)');
	$(curPage).css('-moz-transform', 'translate3d(0px,-100vh,0)');
	$(curPage).css('-o-transform', 'translate3d(0px,-100vh,0)');
	loadNewPage(nextPage);
}

function moveDown(nextPage) {
	$(curPage).css('transform', 'translate3d(0px,100vh,0)');
	$(curPage).css('-webkit-transform', 'translate3d(0px,100vh,0)');
	$(curPage).css('-moz-transform', 'translate3d(0px,100vh,0)');
	$(curPage).css('-o-transform', 'translate3d(0px,100vh,0)');
	loadNewPage(nextPage);
}

function loadNewPage(nextPage) {
	$('a').addClass('disableLink');
	setTimeout(function() {
		$(curPage).hide();
		$(curPage).css('transform', 'translate3d(0px,0px,0)');
		$(curPage).css('-webkit-transform', 'translate3d(0px,0px,0)');
		$(curPage).css('-moz-transform', 'translate3d(0px,0px,0)');
		$(curPage).css('-o-transform', 'translate3d(0px,0px,0)');
		$(curPage).removeClass('transition');
		$(nextPage).fadeIn(1200, function() {
			$(this).addClass('transition');
			$('a').removeClass('disableLink');
		});
		curPage = nextPage;
	}, 1000);
}

function addWhiteLines() {
	$('#sidebar-thin .inner-wrapper div').removeClass('line-black');
	$('#sidebar-thin .inner-wrapper div').addClass('line-white');
	$('#line-1').animate({'top': '+=5px'}, 'fast');
	$('#line-3').animate({'top': '-=5px'}, 'fast');
}

function addBlackLines() {
	$('#sidebar-thin .inner-wrapper div').removeClass('line-white');
	$('#sidebar-thin .inner-wrapper div').addClass('line-black');
	$('#line-1').animate({'top': '-=5px'}, 'fast');
	$('#line-3').animate({'top': '+=5px'}, 'fast');
}

$(document).ready(function() {
	$(curPage).addClass('transition');

	// Sidebar
	$('#sidebar-nav > li > a').mouseenter(function() {
		$(this).css('color', 'black');
	}).mouseleave(function() {
		$(this).css('color', 'white');
	});

	$('#sidebar-wrapper').hover(function() {
		if (!expanded) {
			addBlackLines();
		} else {
			addWhiteLines();
		}
	}, function() {
		if (!expanded) {
			hoveredIn = true;
			if (!once) {
				addWhiteLines();
			} else {
				once = false;
			}
		} else {
			hoveredOutside = true;
			if (!once) {
				addBlackLines();
			} else {
				once = false;
			}
		}
	});

	$('#sidebar-thin').click(function() {
		if (!expanded) {
			expanded = true;
			once = true;
			hoveredOutside = false;
			if (!hoveredIn) {
				addBlackLines();
			} else {
				if (!once) {
					addWhiteLines();
				}
			}
			$('#sidebar-nav').hide();
			$('#page-wrapper').css('opacity','0.6');
			$('#sidebar-wrapper').animate({
				'left': '+=150px'
			}, {
				duration: 'fast', complete: function() {
					setTimeout(function() {
						$('#sidebar-nav').fadeIn('slow');
					}, 50);
				}
			});
		} else {
			expanded = false;
			once = true;
			hoveredIn = false;
			if (!hoveredOutside) {
				addWhiteLines();
			} else {
				if (!once) {
					addBlackLines();
				}
			}
			$('#sidebar-wrapper').animate({'left': '-=150px'}, 'fast');
			$('#page-wrapper').css('opacity','1');
		}
	});

	// Images
	$('#about-image').hover(function() {
		$('#about-image img').attr('src', 'res/img/question-black.png');
	}, function() {
		$('#about-image img').attr('src', 'res/img/question.png');
	});

	$('#projects-image').hover(function() {
		$('#projects-image img').attr('src', 'res/img/directory-black.png');
	}, function() {
		$('#projects-image img').attr('src', 'res/img/directory.png');
	});

	$('#resume-image').hover(function() {
		$('#resume-image img').attr('src', 'res/img/document-black.png');
	}, function() {
		$('#resume-image img').attr('src', 'res/img/document.png');
	});

	$('#contact-image').hover(function() {
		$('#contact-image img').attr('src', 'res/img/message-black.png');
	}, function() {
		$('#contact-image img').attr('src', 'res/img/message.png');
	});

	// Arrows
	$('.arrow-up img').hover(function() {
		$(this).attr('src', 'res/img/arrow-up-black.png');
	}, function() {
		$(this).attr('src', 'res/img/arrow-up.png');
	});

	$('.arrow-down img').hover(function() {
		$(this).attr('src', 'res/img/arrow-down-black.png');
	}, function() {
		$(this).attr('src', 'res/img/arrow-down.png');
	});

	// Projects
	$('.switch-color').hover(function() {
		$(this).find('.project').css('color', 'white');
		$(this).find('.line').css('border-top', '1px solid #969696');
	}, function() {
		$(this).find('.project').css('color', 'black');
		$(this).find('.line').css('border-top', '1px solid black');
	});
	$('#arrow-back-image').hover(function() {
		$(this).attr('src', 'res/img/arrow-back-black.png');
	}, function() {
		$(this).attr('src', 'res/img/arrow-back.png');
	});
	$('.project-title img').hover(function() {
		$(this).attr('src', 'res/img/external-link-black.png');
	}, function() {
		$(this).attr('src', 'res/img/external-link.png');
	});
});