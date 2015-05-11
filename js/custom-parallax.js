// JavaScript Document
$(document).ready(function(){
	documentHeight = $(document).height();	
	visibleArea=$(window.top).height();	
	documentHeight=documentHeight-visibleArea;
	innerHeightHeader=innerHeightObject($('.main-header'));	
	innerHeightBanner=innerHeightObject($('.banner-main'));	
	
	$('body').css('padding-top',innerHeightHeader);
	mainContent=$('.main-content');
	//bulbContent=$('.bulb');
	mainLeftSide=$('.left-align');
	$parasuit_container=$('.parasuit-container');
	$parasuit=$('.parasuit');
	$iphone = $('.iPhone6');
	window_width=($(window).width());
	windowHeight=($(window).height());
	pushToLeft(mainLeftSide);
	object_offset=measurePosLeftOffset(mainLeftSide);	
	
	var lastScroll = 0;	 
	var scrolliPhone=80;
	$(window).scroll(function(){		
		/*********** GENERAL CODE ************/		
		scroll_pixel = $(window).scrollTop();
		scroll_percentage = (scroll_pixel*100)/documentHeight;	
		main_content_per=contentScrollPercentage(mainContent);
		iPhonePercent=contentScrollPercentage($iphone);				
		var st = $(this).scrollTop();
		$body=$('body, html');
		
		/*********** GENERAL CODE ENDED ************/
		
		/*********** MENU CODE ************/		
		(($(window).scrollTop()<innerHeightHeader)?$('.main-header').removeClass('fixed-header'):$('.main-header').addClass('fixed-header'));
		
		/*********** BANNER BACKGROUND PARALLAX CODE ************/
		$('.banner').css('background-position','center ' + scroll_percentage*1.2 + '%');
		
		
		/*********** IPHONE ANIMATION ON/OFF SCROLLING ***********/		
		((iPhonePercent>0)?$iphone.addClass('inview'):$iphone.removeClass('inview'));
		if ((st > lastScroll)){ /******* UPDOWN SCRLLL CONDING **********/
			$body.animate({scroll:$iphone.position().top},500);
			scrolliPhone=200;			
			if(scroll_percentage>10)
			{
				$('.main-header').addClass('scroll-down');
			}
		}
		else
		{
			$('.main-header').removeClass('scroll-down');
		}
		/*********** IPHONE ANIMATION ENDED ***********/
		
		/*********** PURSUIT ***********/
		parasuit_per=contentScrollPercentage($parasuit_container);
		/*if(parasuit_per>0 && parasuit_per<10)
		{
			$('.debug').html(parasuit_per);
			$parasuit.animate({
				'top':((parasuit_per)+'%')
			}, 500);
		}
		else
		{*/
		if(parasuit_per>0)
		{
			objTopOffset=topOffset($parasuit);			
			total_amt_to_be_scroll=(objTopOffset*1)+windowHeight;			
			
			amt_to_be_scroll=(total_amt_to_be_scroll*parasuit_per)/100;
			console.log(amt_to_be_scroll);
			//amt_to_be_scroll=amt_to_be_scroll+objTopOffset;
			
			$parasuit.css({
				'top':((parasuit_per*1.1)+'%')
			});
		}
		/*********** PURSUIT ENDED ***********/
				
		/*********** PLANE FLY ***********/
		if(main_content_per>0)
		{
			total_amt_to_be_scroll=(object_offset*-1)+window_width;
			amt_to_be_scroll=(total_amt_to_be_scroll*main_content_per)/100;
			amt_to_be_scroll=amt_to_be_scroll+object_offset;			
			mainLeftSide.css('left',(amt_to_be_scroll)+'px');
			mainLeftSide.css('top',(main_content_per*0.90)+'%');			
			mainContent.css('background-position',-(main_content_per*10)+'px');
			mainLeftSide.css({ 
				'transform':'rotate('+(-1*main_content_per)/4+'deg)'
			});
		}
		else { 
			pushToLeft(mainLeftSide); 
		}
		
		lastScroll = st;
	});
	function contentScrollPercentage(obj)
	{
		innerHeightMain=innerHeightObject($(obj));
		scroll_pixel_main=scroll_pixel - (($(obj).offset().top));
		scroll_percentage_main = (scroll_pixel_main*100)/innerHeightMain;
		if(scroll_percentage_main>0 && scroll_percentage_main<100)
		{
			return scroll_percentage_main;
		}
	}
	
	function innerWidthObject(obj)
	{
		return obj.innerWidth();		
	}
	
	function innerHeightObject(obj)
	{
		return obj.innerHeight();		
	}
	
	function measurePosLeftOffset(obj)
	{
		return $(obj).offset().left;
	}
	function topOffset(obj)
	{
		return $(obj).offset().top;
	}
	function pushToLeft(obj){
		innerWidthMainLeft=innerWidthObject(obj);	
		$(obj).css('left','-' + innerWidthMainLeft + 'px');	
	}
	
	
});