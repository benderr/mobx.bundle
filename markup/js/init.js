var root = document.getElementsByTagName('script')[0].parentElement;
var arrayOfJS = [

'rad-select',
'include',
'jquery.datetimepicker',
'jquery.textarea_autosize',
'jquery.multiple.select',
'owl.carousel',
'tether',
'drop',
'bootstrap.tooltip',
'equalize',
'stream_layers',
'shepherd',
'hopscotch',
'nouislider',
'jquery.scrollTo.min',
'jquery.easing.1.3'
];

loadJs();

function loadJs(){

	if (!arrayOfJS.length){
		return init();
	}

	var sc = document.createElement('script');
	sc.src = '/js/' + arrayOfJS.shift()  + '.js';
	sc.onload = function(){
		if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
			loadJs();
		}
	};
	root.appendChild(sc);
}

function init(){


	$('.open_schet').click(function(){
		$('.page').removeClass('hide');
		$('.page').addClass('open');
	});

	$('.page_close').click(function(){
		$('.page').removeClass('open');
		$('.page').addClass('hide');
	});

	$('.page_expand').click(function(){
		if($('.page_expand').hasClass('rotate'))
		{
			$('.page').removeClass('fullsize');
			$('.page').addClass('normalsize');
			$('.page_expand').removeClass('rotate');
		}
		else{
			$('.page_expand').addClass('rotate');
			$('.page').removeClass('normalsize');
			$('.page').addClass('fullsize');
		}
	});




    // $("select, .select, .select_inline").filter(function(){
    // 	return !$(this).hasClass('select_multi');
    // }).multipleSelect({
    // 	selectAll: false,
    // 	noMatchesFound: 'Ничего не найдено',
    // 	single: true,
    // 	isOpen: false,
    //     keepOpen: false,
    //     textTemplate: function(el){
    // 		return el.html();
    // 	}
    // });

    // $(".select_multi").multipleSelect({
    // 	selectAll: false,
    // 	selectAllText: 'Выбрать все',
    // 	allSelected: 'Выбраны все',
    // 	noMatchesFound: 'Ничего не найдено',
    // 	countSelected: '# из % выбрано',
    // 	textTemplate: function(el){
    // 		return el.html();
    // 	}
    // });




	// высота чата в слое
	// var messenger_chat_height = $('.page_messenger_main').innerHeight() - $('.add_message').outerHeight();
	// $('.page_messenger_main .messenger_chat').css('height', messenger_chat_height);

	// высота чата в слое
	var messenger_chat_height_client = $('.fullsize .add_message').outerHeight();
	$('.fullsize .messenger_chat').css('max-height',  'calc(100vh - 65px - 42px - ' + messenger_chat_height_client + ')');

	// авторесайз textarea
	$('textarea.js_autosize').textareaAutoSize();





	$('.datetimepicker').datetimepicker({
		timepicker: false,
		lang:'ru',
		closeOnDateSelect: true,
		format: 'd.m.Y',
		validateOnBlur: false
	});

	Array.prototype.forEach.call(document.querySelectorAll('.drop-target'), function(target){
		new Drop({
			target:target,
			content: $(target).next('.drop-content').html(),
			classes: $(target).data('theme') + ' drop-theme-basic',
			position: $(target).data('position') || 'bottom left',
			openOnfor: 'click'
		})});

	$('[b365-tooltip]').tooltip({
		html: true,
		container: 'body',
		// trigger: 'click'
		// viewport: '.main'
	});

	// $('.equalize_height').equalize('innerHeight');


	$('.tabs_scroll ul').owlCarousel({
		margin: 0,
		nav: true,
		dots: false,
		margin: 0,
		rewindNav:false,
		navText: '',
		autoWidth:true
	});


	$('section.main').scroll(function() {
		var scroll = $('section.main').scrollTop();
		if (scroll >= 30) {
			$("header").addClass("shadow");
		}
		else {
			$("header").removeClass("shadow");
		}
	});

	$('.page_content').scroll(function() {
		var scroll = $('.page_content').scrollTop();
		if (scroll >= 30) {
			$(".page_header").addClass("shadow");
		}
		else {
			$(".page_header").removeClass("shadow");
		}
	});


	$( ".message" ).click(function() {
		$( ".action_for_message" ).addClass('show');
	});

	$( ".header_search .drop-target" ).click(function() {
		$( ".header_search" ).addClass('active');
	});


	 //var init, setupShepherd;

  // init = function() {
  //   return setupShepherd();
  // };

 //  function setupShepherd() {
 //  	var shepherd;
 //  	shepherd = new Shepherd.Tour({
 //  		defaults: {
 //  			classes: 'shepherd-theme-arrows',
 //  			showCancelLink: true,
 //  			scrollTo: true
 //  		}
 //  	});
 //  	shepherd.addStep('welcome', {
 //  		text: ['Shepherd is a javascript library for guiding users through your app. It uses <a href="http://github.hubspot.com/tether/">Tether</a>, another open source library, to position all of its steps.', 'Tether makes sure your steps never end up off screen or cropped by an overflow. Try resizing your browser to see what we mean.'],
 //  		attachTo: 'header bottom',
 //  		classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
 //  		buttons: [
 //  		{
 //  			text: 'Exit',
 //  			classes: 'shepherd-button-secondary',
 //  			action: shepherd.cancel
 //  		}, {
 //  			text: 'Next',
 //  			action: shepherd.next,
 //  			classes: 'shepherd-button-example-primary'
 //  		}
 //  		]
 //  	});

 //  	// return shepherd.start();

 //  }

	// setupShepherd();



	// Define the tour!
	var tour = {
		id: "my",
		i18n: {
			nextBtn: "Далее",
			prevBtn: "Назад",
			doneBtn: "Готово",
			skipBtn: "Пропустить",
			closeTooltip: "Закрыть",
			stepNums : ["1", "2", "3"]
		},
		steps: [
		{
			title: "Подсказка 1",
			content: "Введите ОГРН для продолжения регистрации компании",
			target: document.querySelector("header"),
			placement: "bottom"
		}
		]
	};

    // Start the tour!
    $('.start').click(function() {
    	hopscotch.startTour(tour);
    });


    $('.show_all').click(function(){
    	$(this).parents('.table_list_row').next('.table_list_subrow').toggleClass('hidden');
    	$(this).toggleClass('active');
    });


    // показ графика
    $('.graph_hide').click(function(){
    	$(this).removeClass('visible');
    	$('.cashflow_graph').addClass('graph_hidden')
    	$('.graph_show').addClass('visible')
    });
    $('.graph_show').click(function(){
    	$(this).removeClass('visible');
    	$('.cashflow_graph').removeClass('graph_hidden')
    	$('.graph_hide').addClass('visible')
    });

    // показать фильтры
    $('.show_filter_panel').mousedown(function(){
    	$('.filter_panel').addClass('visible');
    });
    $('.filter_panel').mouseleave(function(){
    	$('.filter_panel').removeClass('visible');
    });

    $('.section_content').scroll(function() {
    	var scroll = $('.section_content').scrollTop();
    	if (scroll >= 150) {
    		$(".show_filter_panel.float").addClass("fixed");
    	}
    	else {
    		$(".show_filter_panel.float").removeClass("fixed");
    	}
    });

	// показать панель действий
	$('label[for="a2"]').mousedown(function(){
		$('.section_action_panel').toggleClass('visible')
	});

	$('.link_show').click(function(){
		$('article.page').removeClass('hide').addClass('open')
	});


	$(".task_side_time_but").on("click",function(){
		console.log('test')
		setTimeout(function(){
			initRangeSlider('.drop')
		},500);
	});

	// initRangeSlider('.t2');

	// function initRangeSlider(context){
	// 	var rangeSlider = $('#slider-range',context)[0];
	// 	noUiSlider.create(rangeSlider, {
	// 		start: [ 0 ],
	// 		step: 0.5,
	// 		range: {
	// 			'min': [  0 ],
	// 			'max': [ 72 ]
	// 		}
	// 	});

	// 	var rangeSliderValueElement = $('#slider-range-value',context)[0];
	// 	rangeSlider.noUiSlider.on('update', function( values, handle ) {
	// 	rangeSliderValueElement.innerHTML = values[handle];
	// });
	// }


	$('.test_123_click').click(function(){
		$('.test_1234').fadeOut(0),
		$('.test_123').fadeIn(0)
	});
	$('.test_123_click2').click(function(){
		$('.test_123').fadeOut(0),
		$('.test_1234').fadeIn(0)
	});

	// фикс блоков при скролле в услугах
	$('.page_service_container').bind('scroll', function () {
		if ($('.page_service_container').scrollTop() > 264) {
			$('.page_serivce_header.fixed').addClass('show'),
			$('.page_service_menu.fixed').addClass('show');
		} else {
			$('.page_serivce_header.fixed').removeClass('show'),
			$('.page_service_menu.fixed').removeClass('show');
		}
	});

	$("a.scrollTo").click(function(e){
		e.preventDefault();
		var el = $(e.currentTarget);
		var target = el.attr("href");
		$('a.scrollTo').each(function(){
			if ($(this).attr("href") != target){
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}

		});

		$(".page_service_container").scrollTo(target, 1300, {offset: -130, easing: 'easeInOutExpo'});
	});

	$('.js-click-edit').click(function(){
		$(this).parent().find('.js-click-edit').addClass('hidden');
		$(this).parent().find('.js-click-save').removeClass('hidden');
		$(this).parent().find('.js-name-editable textarea').removeAttr('disabled');
		$(this).parent().find('.js-name-editable textarea').select();
	});
	$('.js-click-save').click(function(){
		$(this).parent().find('.js-click-edit').removeClass('hidden');
		$(this).parent().find('.js-click-save').addClass('hidden');
		$(this).parent().find('.js-name-editable textarea').attr('disabled', 'disabled');
	});

	$('.js-click-favorite-delete').click(function(){
		$(this).parent().addClass('deleted');
		$(this).parent().find('.js-click-favorite-add').removeClass('hidden');
		$(this).addClass('hidden');
	});
	$('.js-click-favorite-add').click(function(){
		$(this).parent().removeClass('deleted');
		$(this).parent().find('.js-click-favorite-delete').removeClass('hidden');
		$(this).addClass('hidden');
	});


	// фикс правого меню с фильтрами в гарантиях
	// $(function() {

	//     var $sidebar   = $(".garant_right_menu"),
	//     	$window		= $("section.main"),
	//     	offset = $sidebar.offset();

	//     $window.scroll(function() {
	//         if ($window.scrollTop() > 0) {
	//             $sidebar.stop().css({
	//             	position: 'fixed',
	//                 top: offset.top,
	//                 left: offset.left
	//             });
	//         };
	//     });


	// });

	// форма входа
	$('.js_enter_sms').click(function(){
		$(this).addClass('disabled')
		setTimeout(function(){
		$('.login_content').addClass('anim_enter_sms');
		},400);

		setTimeout(function(){
			$('.sms_field input').focus()
		},700);

		$(".sms_field input").keypress(function(e){
     	   if(e.keyCode==13){
     	   	$(this).addClass('loader')
     	   }
     	 });
	});

	// распознавание текста
	$('.popup_payment_scan a[data-load]').click(function(){
		setTimeout(function(){
			$('.popup_payment_scan').addClass('load')
		}, 1500);

		setTimeout(function(){
			$('.popup_payment_scan').addClass('success')
		}, 6000);

		setTimeout(function(){
			$('.popup_overlay').fadeOut('slow')
		}, 7500);

	});



}

