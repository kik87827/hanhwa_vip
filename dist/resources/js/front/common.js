/*
 */
if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/

$(function(){
	totalMenu();
	deviceCheck();
	maintab();
	subtab();
	comboBox();
	gnbPC();
	layerPopup();
	haschk();
	thumlowList();
	accodianUI(".tog-list",".tog-list > li.item",".txt-link",".ntail-low");
	accodianUI(".qa-list",".qa-list > li",".q-txt",".a-txt");
	thumItemResize();

	dimLayerControl();
});
var has_iscroll = null;
$(window).load(function() {
	//mainSlider();
	miscroll();
});

function miscroll(){
	if($(".has_iscroll").length===0){return;}
	var has_iscroll = new IScroll(".has_iscroll", { 
		eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false
	});
}

function maintab(){
	var $maintablist = $(".main-tab-list");
	if($maintablist.length){
		$maintablist.find("li a").on("click",function(e){
			var $this = $(this),
				$index = $(this).parent().index();
			
			e.preventDefault();
			$maintablist.find("li").removeClass("active");
			$this.parent().addClass("active");
			$(".main .mtab").addClass("hhide");
			$($this.attr("href")).removeClass("hhide");
			
			thumResizeCall();
			lengthCheck();
			if(has_iscroll != undefined){
				has_iscroll.refresh();
			}
		});
	}
	function lengthCheck(){
		$(".flew_w").each(function(){
			if($(this).find("ul li").length < 3){
				$(this).find(".nbs-flexisel-nav-left,.nbs-flexisel-nav-right").hide();
			}else{
				$(this).find(".nbs-flexisel-nav-left,.nbs-flexisel-nav-right").show();
			}
		});
	}
	lengthCheck();
}
function mainSlider(){
	if($(".flew_z").length===0){return;}
	$("#flex01").flexisel({
        visibleItems: 2,
        itemsToScroll: 1,
        animationSpeed: 300,
        infinite: false,
        navigationTargetSelector: ".flex01_w",
        responsiveBreakpoints: { 
             portrait: { 
				changePoint:480,
				visibleItems: 1,
				itemsToScroll: 1
			}, 
			landscape: { 
				changePoint:1000,
				visibleItems: 2,
				itemsToScroll: 2
			}
        }
    });
	$("#flex02").flexisel({
        visibleItems: 5,
        itemsToScroll: 1,
        animationSpeed: 300,
        infinite: false,
        navigationTargetSelector: ".flex02_w",
        responsiveBreakpoints: { 
             portrait: { 
				changePoint:480,
				visibleItems: 1,
				itemsToScroll: 1
			}, 
			landscape: { 
				changePoint:1000,
				visibleItems: 2,
				itemsToScroll: 2
			}
        }
    });
	$("#flex03").flexisel({
        visibleItems: 3,
        itemsToScroll: 1,
        animationSpeed: 300,
        infinite: false,
        navigationTargetSelector: ".flex03_w",
        responsiveBreakpoints: { 
             portrait: { 
				changePoint:480,
				visibleItems: 1,
				itemsToScroll: 1
			}, 
			landscape: { 
				changePoint:1000,
				visibleItems: 2,
				itemsToScroll: 2
			}
        }
    }); 
	setTimeout(function(){
	    $(".flew_w").addClass("show");
		 $(window).trigger("resize");
	},150);
}

function thumItemResize(){
	
	$(window).on("resize",function(){
		thumResizeCall();
			
	}).resize();
}

function thumResizeCall(){
	var $thumitemimg = $(".thum-item img");
	setTimeout(function(){
		$thumitemimg.css({height:""});
		$(".nbs-flexisel-nav-left,.nbs-flexisel-nav-right").css({"visibility":"hidden"});
		$thumitemimg.height($thumitemimg.width()/1.25);
		$(".nbs-flexisel-nav-left,.nbs-flexisel-nav-right").css({"visibility":"visible"});
	},100);
}

function haschk(){
	var $haschk = $(".haschk");
	if($haschk.length==0){return;}

	$haschk.each(function(){
		if($(this).find(".chk").prop("checked")){
			$(this).addClass("active");
		}else{
			$(this).removeClass("active");
		}
	});

	$(document).on("click",".haschk-w .haschk",function(e){
		var $this = $(this),
			$parents = $this.parents(".haschk-w"),
			$thisChk = $this.find(".chk");
		
		$parents.find(".haschk").not($this).removeClass("active");
		$parents.find(".haschk .chk").not($thisChk).prop("checked",false);
		
		if($thisChk.prop("checked")){
			$this.removeClass("active");
			$thisChk.prop("checked",false);
		}else{
			$this.addClass("active");
			$thisChk.prop("checked",true);
		}
	});
}

function gnbPC(){
	var $gmw = $(".gm-w");
	if($gmw.length === 0){return;}
	$gmw.each(function(){
		if($(this).find(".twod-w").length==0){
			$(this).addClass("one");
		}
	});
}

/*
 * accodian 타입
 */
function accodianUI(item1,item2,item3,item4){
	var $aclist = $(item1),
		$acli = $aclist.children(item2),
		$windowWidth = $(window).width();
	if($aclist.length==0){return;}
	$acli.on("click",item3,function(e){
		var $this = $(this),
			$parents = $this.parents(item2),
			$ntaillow = $parents.find(item4);
		$ntaillow.slideToggle();
	});
}

function thumlowList(){
	$(window).on("resize",function(){
		setTimeout(function(){
			thumAction();
		},100);
	}).resize();
	
	function thumAction(){
		var $thumlowlist = $(".thumlow-list");
		var $bthumlist = $(".bthum-list");
		if($thumlowlist.length){
			if($(window).width()>1000){
				$thumlowlist.find(".thum").css({"height":""});
			}else{
				$thumlowlist.find(".thum").css({
					"height" : $thumlowlist.find("li").width()*0.85
				});
			}
		}
		if($bthumlist.length){
			if($(window).width()>1000){
				$bthumlist.find(".th-w img").css({"height":""});
			}else{
				$bthumlist.find(".th-w img").css({
					"height" : $bthumlist.find("li").width()*0.80
				});
			}
		}
	}
};

function subtab(){
	var $subtablist = $(".tabbox-w");
	if($subtablist.length){
		
		
		$subtablist.each(function(){
			if($(this).find("li:last-child").hasClass("active")){
				$(this).addClass("last-case");
			}
		});
		
		$subtablist.find("li a").on("click",function(e){
			var $this = $(this),
				$index = $(this).parent().index();
				
			$subtablist.find("li").removeClass("active");
			$this.parent().addClass("active");
				
			if($index == $this.parents(".tabbox-list").children("li").length-1){
				$this.parents(".tabbox-w").addClass("last-case");
			}else{
				$this.parents(".tabbox-w").removeClass("last-case");
			}
		});
	}
}


/* 모바일 BROWSER 체크 */
function deviceCheck(){
	var useragent = navigator.userAgent.toLocaleLowerCase();
	if("ontouchstart" in window){
		if(useragent.search("iphone")>-1 || useragent.search("ipad")>-1){
			$("body").addClass("ios");
		}else{
			$("body").addClass("android");
		}
	}
}

function comboBox(){
	var $comboitem = $(".combo-item");
	if($comboitem.length == 0){return;}
	function init(){
		$comboitem.each(function(){
			var $this = $(this),
				$tcurrent = $this.find(".current"),
				$option = $this.find(".option-w"),
				$optionli = $option.find(".option-list > li.active");
		
			$tcurrent.text($optionli.text());
		});
	}
	function bindEvent(){
		$comboitem.on("click",".current",function(e){
			var $this = $(this),
				$parents = $this.parents(".combo-item"),
				$t_option = $parents.find(".option-w");

			$comboitem.not($parents).removeClass("active");
			$parents.toggleClass("active");
			setTimeout(function(){
				$comboitem.find(".option-w").not($t_option).slideUp();
			},100);
			$t_option.slideToggle();
		});
		$comboitem.on("click",".option-list a",function(e){
			var $this = $(this),
				$parents = $this.parents(".combo-item"),
				$t_current = $parents.find(".current"),
				$t_option = $parents.find(".option-w"),
				$text = $this.text();
			$parents.attr("data-current",$text).removeClass("active");
			$t_current.text($text);
			setTimeout(function(){
				$t_option.slideUp();
			},100);
		});
		$(document).on("click",function(e){
			if($(e.target).parents(".combo-item").length==0){
				$comboitem.removeClass("active");
				$(".option-w").slideUp();
			}
		});
	}
	
	init();
	bindEvent();
}

var globalWidth = $(window).width();
function totalMenu(){
	var togis = false,
		$slide_menu = $(".side-menu"),
		$btn_total = $(".btn-total"),
		$btn_close = $(".btn-close"),
		$dimd = null,
		$slide_top = 0,
		$slide_width = 0,
		$slide_height = 0,
		$mobileNav2 = null,
		$showType = null;
	function init(){
		if($slide_menu.length==0){return;}
		$showType = $slide_menu.attr("class").split(" ")[1];
		slideInit();
		$("body").append("<div class='dimd' />");
		$dimd = $(".dimd").css("opacity",.7);
		$(".gnb-m .gnb > li").each(function(){
			if($(this).find(".mtwod-w").length){
				$(this).addClass("has-mtwod");
			}
		});
		$mobileNav2 = new IScroll(".gnb-m", { 
			mouseWheel: true, 
			click: true,
			preventDefault : true
		});
	};
	function slideInit(){
		$slide_width = $slide_menu.width();
		var $slide_css = $slide_css || {}; 
		setTimeout(function(){
			$slide_height = $slide_menu.height();
		},10);
		if($slide_menu.hasClass("slideLeft")){
			$slide_css = {
				left : - $slide_width,
				"visibility" : "",
				"display" : "block"
			};
		}else if($slide_menu.hasClass("slideTop")){
			$slide_top = $(".head").outerHeight();
			$slide_css = {
				top : $slide_top,
				"visibility" : "hidden",
				height : "",
				"display" : "block"
			};
		}else if($slide_menu.hasClass("slideRight")){
			$slide_css = {
				right : - $slide_width,
				"visibility" : "",
				"display" : "block"
			};
		}
		$slide_menu.css($slide_css).css("transition-duration","");
		if($dimd != null){
			$dimd.hide();
		}
	}
		
	// Event
	function bindEvent(){
		if($slide_menu.length==0){return;}
		var eTarget = ["."+$btn_total[0].className,"."+$dimd[0].className,"."+$btn_close[0].className].join(",");
		$(eTarget).on("click",function(e){
			if($showType === undefined){return;}
			$slide_menu.trigger($showType);
		});
		$(".gnb-m .gm").on("click",function(e){
			var $mtwod = $(this).nextAll(".mtwod-w:eq(0)");
			
			if($mtwod.length){
				e.preventDefault();
				$mtwod.slideToggle(function(){
					if($mobileNav2 !== null){
						$mobileNav2.refresh();
					}
				});
				$(this).parents(".has-mtwod").toggleClass("active");
			}
		});
		$(".gnb-m .tm").on("click",function(e){
			var $mthreed = $(this).nextAll(".threed-list-w:eq(0)");
			if($mthreed.length){
				e.preventDefault();
				$mthreed.slideToggle(function(){
					if($mobileNav2 !== null){
						$mobileNav2.refresh();
					}
				});
			}
		});
		$(window).on("resize",function(){
			var $thisWidth = $(window).width();
			if(globalWidth != $thisWidth){
				globalWidth = $thisWidth;
			}
			slideInit();
			if(togis){
				togis = !togis;
			}
			if($mobileNav2 !== null){
				$mobileNav2.refresh();
			}
		});
		$slide_menu.on("slideLeft slideRight",function(e){
			var tfObj = tfObj || {};
			if(togis){
				if(e.type == "slideLeft"){
					tfObj = {left : - $slide_width};
				}else{
					tfObj = {right : - $slide_width -35};
				}
				$slide_menu.css({"display":"block"}).transitionSlide(tfObj,300);
				$dimd.hide();
				$slide_menu.removeClass("active");
				$("html,body").removeClass("disable-body").off("touchmove");
			}else{
				if(e.type == "slideLeft"){
					tfObj = {left : 0};
				}else{
					tfObj = {right : 0};
				}
				$slide_menu.css({"display":"block","visibility":"visible"}).transitionSlide(tfObj,300,function(){
					$slide_menu.show();
				});
				$dimd.show();
				if($mobileNav2 !== null){
					$mobileNav2.refresh();
				}
				$slide_menu.addClass("active");
				$("html,body").addClass("disable-body").on("touchmove",function(e){e.preventDefault();})
			}
			$slide_menu.attr({
				"aria-expanded" : togis
			});
			togis = !togis;
		});
		$slide_menu.on("slideTop",function(e){
			if(togis){
				$slide_menu.transitionSlide({height : 0},300);
				$dimd.hide();
			}else{
				$slide_menu.css({"visibility":"visible","height":0}).transitionSlide({height : $slide_height},300);
				$dimd.show();
			}
			$slide_menu.attr({
				"aria-expanded" : togis
			});
			togis = !togis;
		});
	}
	init();
	bindEvent();
	
}


// transition CrossBrowse Motion
(function($){
	$.fn.transitionSlide = function(obj,duration,callback){
		return this.each(function(){
			var $target = $(this),
				transitionIs = "TransitionEvent" in window,
				time = 0;
			if(transitionIs){
				obj["transition-duration"] = duration+"ms";
				$target.css(obj);
			}else{
				$target.stop().animate(obj,duration,callback);
			}
			/*$target.on("webkitTransitionEnd transitionend",function(){
				if(callback){
					callback();
				}
			});*/
			setTimeout(function(){
				if(callback){
					callback();
				}
			},duration);
		});
	};
})(jQuery);

function tab(){
	$('#tab li').on("click", function(){
		$('#tab li').removeClass("on");
		$(this).addClass("on");
		
		$(".tab-cont").hide();
		$(".tab-cont").eq($(this).index()).show();
	});
}

function lock(target){
	$(".gnb > li").removeClass("on");
	$(target).addClass("on");
}

var filter = "win16|win32|win64|mac|macintel";
var isMobile = true;
if ( navigator.platform  ) {
    if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
        isMobile = true; //모바일
    } else {
        isMobile = false; //PC
    }
}
/* 레이어팝업 */
function layerPopup(){
	var $globalLayer = null,
		$pos = 0,
		target = null,
		el_firstFocus = null,
		$dimd_lay = null,
		$windowWidth = 0,
		$wst = 0,
		touchstartIs = "ontouchstart" in window,
		el_lastFocus = null;
		if($(".layer-wrap").length==0){return;}
	$("body").append("<div class='dimd-lay' />");
	$dimd_lay = $(".dimd-lay");
	$windowWidth = $(window).width();
	
	var pcIs = $("html").hasClass("win"),
		ctevent = "";
	if(pcIs){
		ctevent = "click";
	}else{
		if($("body").hasClass("android")){
			ctevent = "mousedown";
		}else{
			ctevent = "touchend";
		}
	}
	if($(".preshowitem").length){
		layerPos($(".preshowitem"));
		$(".page-wrap").css("z-index","0");
	}
	

	$('.bvcont-w iframe').each(function(){
		var $src = $(this).attr("src");
		$(this).attr("src",$src+"?wmode=transparent&rel=0");
	});
	
	$(document).on("click touchstart","[data-toggle='layer']",function(e){
		//e.preventDefault();
		var $this = $(this),
			target = $this.attr("data-target");
		if(closeTimeout !=0){clearTimeout(closeTimeout);}
		layerPos($(target));
		$(".page-wrap").css("z-index","0");
		$("html,body").css({"height": "100%"});
	});
	
	var closeTimeout  = 0;
	/*$(document).on("click touchstart",".layer-wrap .close , .dimd-lay",function(e){
		if($("body").hasClass("android")){
			e.preventDefault();
		}
		layerClose($(".layer-wrap"));
		$("html,body").css({"height": ""});
	});*/
	
	$(document).on("click touchstart",".layer-wrap .close",function(e){
		if($("body").hasClass("android")){
			e.preventDefault();
		}
		layerClose($(".layer-wrap"));
		$("html,body").css({"height": ""});
	});
	
	$(window).on("resize",function(){
		$windowWidth = $(window).width();
		resizePos($globalLayer);
	});
	$(window).on("scroll",function(){
		$wst = $(window).scrollTop();
	});
	
	var $mtopValue = 0;
	function layerPos(element){
		var $wh = $(window).height();
		
		setTimeout(function(){
			if($globalLayer){
				$globalLayer.hide();
			}
			$globalLayer = $(element);
			/*if($windowWidth<=1180){
				$mtopValue = $(element).height()+40;
			}else{
				$mtopValue = $(element).height();
			}*/
			$mtopValue = $(element).outerHeight();
			
			$(".page-wrap").css({"z-index" : ""});
			if($(element).hasClass("type3")){
				$(element).css({
					"display" : "block",
					"opacity" : 1
				});
				$dimd_lay.addClass('dimd-tlay');
			}else{
				if($wh>$(element).height()){
					$(element).css({
						"position" : "fixed",
						"top" : "50%",
						"margin-left" : -$(element).width()/2,
						"margin-top" : -($mtopValue)/2,
						"display" : "block",
						"opacity" : 1
					});
				}else{
					$(element).css({
						"position" : "fixed",
						"top" : 0,
						"display" : "block",
						"opacity" : 1
					});
					$(element).find(".layer-cont").css({
						"max-height" : $wh-($(".layer-top").height()+60),
						"overflow-y" : "auto"
					});
				}
			}
			
			$(element).css("opacity",1);
			$("html,body").css({"overflow":"hidden","height":"100%"});
			$dimd_lay.css({
				"height" : $("body").height()
			}).show();
			//$(window).on("scroll",function(e){e.preventDefault();});
		},50);
		
	}
	function resizePos(element){
		var $wh = $(window).height();
		$(element).css({
			"margin-top" : "",
			"margin-left" : "",
			"top" : "50%"
		});
		$(element).find(".layer-cont").css({
			"max-height" : "",
		});
		/*if(touchstartIs){
			setTimeout(function(){
				resizeAgain(element);
			},50);
		}else{
			resizeAgain(element);
		}*/
		resizeAgain(element);
		if($(element).is(":visible")){
			$dimd_lay.css({
				"height" : $(document).height()
			}).show();
		}else{
			$dimd_lay.hide();
		}
	}
	function resizeAgain(element){
		var $wh = $(window).height();
		if(!$(element).is(":visible")){return;}
		if($wh>$(element).height()){
			/*if($windowWidth<=1180){
				$mtopValue = $(element).height()+40;
			}else{
				$mtopValue = $(element).height();
			}*/
			$mtopValue = $(element).outerHeight();
			$(element).css({
				"position" : "fixed",
				"top" : "50%",
				"margin-top" : -($mtopValue)/2,
				"margin-left" : -$(element).width()/2,
				"display" : "block"
			});
			
		}else{
			$(element).css({
				"position" : "fixed",
				"top" : 0,
				"display" : "block"
			});
			$(element).find(".layer-cont").css({
				"max-height" : $wh-($(".layer-top").height()+60),
				"overflow-y" : "auto"
			});
		}
		$("html,body").css({"overflow":"hidden","height":"100%"});
		
		$("html,body").css({"overflow":"","height":""});
		//$(window).off("scroll");
		/*if($wh<$(element).height()){
			$(element).find(".layer-cont").css({
				"height" : $wh-115,
			});
		}*/
	}

	function layerClose(element){
		element.removeClass("show").hide();
		//$("[data-target='#"+element.attr("id")+"']").focus();
		element.css({
			"position" : "",
			"top" : "",
			"margin-top" : "",
			"margin-left" : "",
			"opacity" : 0
		});
		$dimd_lay.removeClass('dimd-tlay').hide();
		$("html,body").css({"overflow":"","height":""});
		//$(window).off("scroll");
	}
}


function DeliverySearch(company,query)
{
	 var dtd_companys = new Array();
	 dtd_companys["우체국택배"] = new Array(13, "http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1=","1234567890123 (13자리)","1588-1300","http://parcel.epost.go.kr");
	 dtd_companys["CJ대한통운"] = new Array(0, "https://www.doortodoor.co.kr/parcel/doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=","1234567890 (10자리)", "1588-1255", "http://www.doortodoor.co.kr");
	 dtd_companys["KG로지스"] = new Array(12, "https://www.idreamlogis.com/delivery/popup_tracking.jsp?item_no=", "1234567890 (10,12자리)", "1588-0123", "http://www.kglogis.co.kr");
	 dtd_companys["한진택배"] = new Array(12, "https://www.hanjin.co.kr/kor/CMS/DeliveryMgr/WaybillSch.do?mCode=MN038&wbl_num=", "1234567890 (10,12자리)", "1588-0011", "http://hanex.hanjin.co.kr");
	 dtd_companys["로젠택배"] = new Array(11, "https://www.ilogen.com/web/personal/trace/", "12345678901 (11자리)","1588-9988", "http://www.ilogen.com");
	 dtd_companys["현대택배"] = new Array(12, "http://www.hlc.co.kr/hydex/jsp/tracking/trackingViewCus.jsp?InvNo=", "1234567890 (10,12자리)", "1588-2121", "http://www.hlc.co.kr");
	 dtd_companys["KG옐로우캡택배"] = new Array(11, "http://www.yellowcap.co.kr/custom/inquiry_result.asp?invoice_no=", "12345678901 (11자리)", "1588-0123", "http://www.yellowcap.co.kr");
	 dtd_companys["KGB택배"] = new Array(10, "http://www.kgbls.co.kr/sub5/trace.asp?f_slipno=", "1234567890 (10자리)", "1577-4577", "http://www.kgbls.co.kr");
	 dtd_companys["EMS"] = new Array(13, "http://service.epost.go.kr/trace.RetrieveEmsTrace.postal?ems_gubun=E&POST_CODE=", "EE123456789KR (13자리)", "1588-1300", "http://service.epost.go.kr");
	 dtd_companys["DHL"] = new Array(0, "http://www.dhl.co.kr/publish/kr/ko/eshipping/track.high.html?pageToInclude=RESULTS&type=fasttrack&AWB=", "1234567890 (10자리)", "1588-0001", "http://www.dhl.co.kr");
	 dtd_companys["한덱스"] = new Array(10, "http://btob.sedex.co.kr/work/app/tm/tmtr01/tmtr01_s4.jsp?IC_INV_NO=", "1234567890 (10자리)", "1588-9040", "http://www.e-handex.co.kr");
	 dtd_companys["FedEx"] = new Array(12, "http://www.fedex.com/Tracking?ascend_header=1&clienttype=dotcomreg&cntry_code=kr&language=korean&tracknumbers=", "123456789012 (12자리)", "080-023-8000", "http://www.fedex.com/kr");
	 dtd_companys["동부익스프레스"] = new Array(12, "http://www.dongbuexpress.co.kr/Html/Delivery/DeliveryCheckView.jsp?item_no=", "123456789012 (12자리)", "1588-8848", "http://www.dongbuexpress.co.kr");
	 dtd_companys["CJ GLS"] = new Array(12, "http://nexs.cjgls.com/web/service02_01.jsp?slipno=", "123456789012 (12자리)", "1588-5353", "http://www.cjgls.co.kr");
	 dtd_companys["UPS"] = new Array(25, "http://www.ups.com/WebTracking/track?loc=ko_KR&InquiryNumber1=", "M1234567890 (최대 25자리)", "1588-6886", "http://www.ups.com/content/kr/ko/index.jsx" );
	 dtd_companys["하나로택배"] = new Array(10, "http://www.hanarologis.com/branch/chase/listbody.html?a_gb=center&a_cd=4&a_item=0&fr_slipno=", "1234567890 (최대 10자리)", "1577-2828", "http://www.hanarologis.com");
	 dtd_companys["대신택배"] = new Array(13, "http://home.daesinlogistics.co.kr/daesin/jsp/d_freight_chase/d_general_process2.jsp?", "1234567890123 (13자리)", "043-222-4582", "http://apps.ds3211.co.kr");
	 dtd_companys["경동택배"] = new Array(11, "http://www.kdexp.com/sub4_1.asp?stype=1&p_item=", "12345678901 (최대11자리)", "031-460-2400", "http://www.kdexp.com/");
	 dtd_companys["이노지스택배"] = new Array(13, "http://www.innogis.net/trace02.asp?invoice=", "1234567890123 (최대13자리)", "1566-4082", "http://www.innogis.net/");
	 dtd_companys["일양로지스택배"] = new Array(9, "http://www.ilyanglogis.com/functionality/tracking_result.asp?hawb_no=", "123456789 (9자리)", "1588-0002", "http://www.ilyanglogis.com/");
	 dtd_companys["CVSnet 편의점택배"] = new Array(10, "http://was.cvsnet.co.kr/src/ctod_status.jsp?invoice_no=", "1234567890 (10자리)", "1566-1025", "http://www.cvsnet.co.kr/");
	 dtd_companys["TNT Express"] = new Array(13, "http://www.tnt.com/webtracker/tracking.do?respCountry=kr&respLang=ko&searchType=CON&cons=", "GE123456789WW (9,13자리)", "1588-0588", "http://www.tnt.com/express/ko_kr/site/home.html");
	 dtd_companys["HB한방택배"] = new Array(12, "http://www.hbtb.co.kr/search/s_search.asp?f_slipno=", "123456789012 (12자리)", "1588-1059", "http://www.hbtb.co.kr/");
	 dtd_companys["GTX"] = new Array(12, "http://www.gtx2010.co.kr/del_inquiry_result.html?s_gbn=1&awblno=", "123456789012 (12자리)", "1588-1756", "http://www.gtx2010.co.kr");
	 dtd_companys["롯데택배"] = new Array(12, "https://www.lotteglogis.com/mobile/reservation/tracking/invoiceView?InvNo=", "1234567890 (10,12,13자리)", "1588-1756", "https://www.lotteglogis.com/mobile/reservation/tracking/index");
	// https://www.lotteglogis.com/mobile/goodstrack
	//var query_obj = document.getElementById('dtd_number_query');
	//var query = query_obj.value;
	query = query.replace(' ', '');
	var url = "";
 
	 /* 운송장 번호 값 확인 */
	if (company == "UPS") {
		var pattern1 = /^[0-9a-zA-Z]{9,12}$/i;
		var pattern2 = /^[0-9a-zA-Z]{18}$/i;
		var pattern3 = /^[0-9a-zA-Z]{25}$/i;
		if (query.search(pattern1) == -1 && query.search(pattern2) == -1 && query.search(pattern3) == -1) {
			alert(company+"의 운송장 번호 패턴에 맞지 않습니다.");
			return false;
		}
	} else if (company == "EMS") {
		var pattern = /^[a-zA-Z]{2}[0-9]{9}[a-zA-Z]{2}$/;
		if (query.search(pattern) == -1) {
			alert(company+"의 운송장 번호 패턴에 맞지 않습니다.");
			return false;
		}
	} else if (company == "한진택배" || company == "현대택배") {
		if (!isNumeric(query)) {
			alert("운송장 번호는 숫자만 입력해주세요.");
			return false;
		} else if ( query.length != 10 && query.length != 12 ) {
			alert(company+"의 운송장 번호는 10자리 또는 12자리의 숫자로 입력해주세요.");
			return false;
		}
	} else if (company == "경동택배") {
		if (!isNumeric(query)) {
			alert("운송장 번호는 숫자만 입력해주세요.");
			return false;
		} else if (query.length != 9 && query.length != 10 && query.length != 11) {
			alert(company+"의 운송장 번호는 9자리 또는 10자리 또는 11자리의 숫자로 입력해주세요.");
			return false;
		}
	} else if (company == "이노지스택배") {
		if (!isNumeric(query)) {
			alert("운송장 번호는 숫자만 입력해주세요.");
			return false;
		} else if (query.length > 13) {
			alert(company+"의 운송장 번호는 최대 13자리의 숫자로 입력해주세요.");
			return false;
		}
	} else if (company == "TNT Express") {
		var pattern1 = /^[a-zA-Z]{2}[0-9]{9}[a-zA-Z]{2}$/;
		var pattern2 = /^[0-9]{9}$/;
		if (query.search(pattern1) == -1 && query.search(pattern2) == -1) {
			alert(company+"의 운송장 번호 패턴에 맞지 않습니다.");
			return false;
		}
	} else {
		if (!isNumeric(query)) {
			alert("운송장 번호는 숫자만 입력해 주세요.");
	 		return false;
	 	}/* else if (dtd_companys[company][0] > 0 && dtd_companys[company][0] != query.length) {
	 		alert(company+"의 운송장 번호는 "+dtd_companys[company][0]+"자리의 숫자로 입력해 주세요.");
	 		return false;
	 	}*/
	}
	 /* 링크만들기 */
	if (company == "대신택배") {
		url = dtd_companys[company][1];
		url+= "billno1="+query.substring(0,4);
		url+= "&billno2="+query.substring(4,7);
		url+= "&billno3="+query.substring(7,13);
	} 
	/*else if(company == "롯데택배"){
		url = dtd_companys[company][1];
	}*/
	else if (dtd_companys[company][1]) {
		 url = dtd_companys[company][1]+query;
	}
	window.open(url,"_blank");
}


function isNumeric(s) {
	var count = 0;
	for (i = 0; i < s.length; i++) 
	{

		if(s.charAt(i)<'0' || s.charAt(i)>'9') {
			count++;
		}
	}
	if(count > 0) {
		return 0;
	} else {
		return 1;
	}
}


/* 2022 */

/* layer popup event */
function dimLayerControl(){
	var touchIs = "ontouchstart" in window,
		$modal = $(".dimlayer_z");
	if($modal.length===0){return;}
	
	var readywidth = $(window).width();
	
	var objThis = this;
	$modal.on("click",".btn_layerclose,.closetrigger,.fullpop_dim",function(e){
		var $this = $(this),
			$t_p = $this.parents(".dimlayer_z");
		e.preventDefault();
		objThis.dimLayerHide({ 
			target : $t_p,
			closeCallback : function(){
				
			}
		});
	});
};
/* layer popup show */
function dimLayerShow(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_td = null,
		$page_wrap = null,
		$fullpop_item = null,
		$fullpop_titlow = null,
		$fullpop_contlow = null,
		$page_wrap = null,
		$t_tpt = 0,
		$t_tpb = 0,
		$res_value = 0;
	
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$page_wrap = $(".page_wrap,.page-wrap");
		
		
		if($modal.length===0){return;}
		$modal.removeClass("active");
		$target.addClass("active");
		setTimeout(function(){
			$target.addClass("motion");
		},30);

		
		$page_wrap.css({"z-index":0});
		$page_wrap.append($target);
		heightcheck();

		
		if ($target.hasClass("fulltype")) {
			$fullpop_titlow = $target.find(".fullpop_titlow");
			$fullpop_contlow = $target.find(".fullpop_contlow");
			$fullpop_item = $target.find(".fullpop_item");
		}

		if("openCallback" in option){
			option.openCallback();
		}
		function fullContHeight(){
			if ($target.hasClass("fulltype")) {
				$fullpop_titlow = $target.find(".fullpop_titlow");
				$fullpop_contlow = $target.find(".fullpop_contlow");
				$fullpop_item = $target.find(".fullpop_item");
				if ($fullpop_titlow.length) {
					$fullpop_contlow.css({height : ""});
					if ($(window).width() > 1023) {
						$res_value = 60;
					} else {
						$res_value = 40;
					}
					$fullpop_contlow.css({
						height: $fullpop_item.outerHeight() - $fullpop_titlow.outerHeight() - $res_value
					});
				}
			}
		}
		function heightcheck(){
			if(touchIs){
				$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
				$("html").addClass("touchDis");
			}
		}
		// var $windowWid = 0;
		// $(window).on("resize", function () {
		// 	if ($windowWid == $(window).width() && touchIs) {
		// 		return;
		// 	}
		// 	$windowWid = $(window).width();
		// });
	});
};
/* layer popup hide */
function dimLayerHide(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_box_duration = 0;
		
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		
		if($modal.length===0){return;}
		$target.removeClass("motion");
		setTimeout(function(){
			$target.removeClass("active");
			$(".page_wrap,.page-wrap").css({"z-index":""});
			$("html,body").removeClass("touchDis touchDis2");
			scrollEnd();
			if("closeCallback" in option){
				option.closeCallback();
			}
		},530);
		
		
		function scrollEnd(){
			if(touchIs){
				$("body").css({"margin-top":0});
				window.scrollTo(0,Number($("body").data("data-scr")));
			}
		}
	});
}

function maxHeight(item){
	const itemObj = document.querySelectorAll(item);
	let maxArray = [];

	window.addEventListener("resize",()=>{
		heightFunc();
	});
	heightFunc();

	function heightFunc(){
		if(itemObj.length){
			itemObj.forEach((element,index)=>{
				element.style.removeProperty("height");
				maxArray.push(element.getBoundingClientRect().height);
			});
			itemObj.forEach((element,index)=>{
				element.setAttribute("style",`height:${Math.max.apply(null,maxArray)}px`);
			});
		}
	}
}

var tailSwiperObj = null;
function detailSwiper(){
	const tail_thum = document.querySelectorAll(".tail_thum");
	tailSwiperObj = new Swiper(".tail_swiper",{
		speed : 800,
		navigation : {
			nextEl : '.tail_swiper_wrap .next_navi', // 다음 버튼 클래스명
			prevEl : '.tail_swiper_wrap .prev_navi', // 이번 버튼 클래스명
		}
	});

	tail_thum.forEach((element,index)=>{
		element.addEventListener("click",(e)=>{
			e.preventDefault();
			tailSwiperObj.slideTo(index);
		});
	})
}
/* // 2022 */