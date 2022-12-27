$(function() {	
	setDatePicker();
	
	if(cUrl.indexOf("admin") > -1){
		$("#pagination_wrap").css("width", "750px");
	}
	
	//Form
	$("form").each(function(){
		$(this).on("submit", function(){
			var action = $(this).attr("action");
			if(action == undefined){
				$(this).attr("action", cUrl);
			}else{
				if(action.indexOf(".do") == -1){
					action = action + ".do";
					$(this).attr("action", action);
				}
				
				if(contextPath != "" && action.indexOf(contextPath) == -1){
					action = contextPath + action;
					$(this).attr("action", action);
				}
			}
		});
	});
	
	//A tag
	$("a").click(function(){
		if($(this).attr("onclick") == undefined){
			var href = $(this).attr("href");
			if(href.indexOf("#") == -1 && href.indexOf("@") == -1 && href.indexOf("http://") == -1){
				if(href.indexOf(".do") == -1){
					href = href + ".do";
					$(this).attr("href", href);
				}
				
				if(contextPath != "" && href.indexOf(contextPath) == -1){
					href = contextPath + href;
					$(this).attr("href", href);
				}
			}
		}
	});
	
	//Ajax
	$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
		var url = options.url;
		if(url.indexOf(".do") == -1){
			url = url + ".do";
			options.url = url;			
		}
		
		if(contextPath != "" && url.indexOf(contextPath) == -1){
			url = contextPath + url;
			options.url = url;
		}
	});
});

//달력설정
function setDatePicker(){
	$.datepicker.regional['ko'] = {
		defaultDate: "+0w",	
		dateFormat:"yy-mm-dd",	
		regional:"ko",
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)','7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: '주',
		changeYear: true,
		showMonthAfterYear: true,
		changeMonth: true
	};
	 
	$.datepicker.setDefaults($.datepicker.regional['ko']);
			 
	//기간 달력
	var dates = $(".scal, .ecal").datepicker({
		onSelect: function( selectedDate ) {
			var option = $(this).attr("class").indexOf("scal") >= 0 ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
			dates.not(this).datepicker( "option", option, date );
		}
	});
	
	$(".iscal").on("click", function(){ $(".scal").datepicker("show"); });
	$(".iecal").on("click", function(){ $(".ecal").datepicker("show"); });
	
	$(".ncal").datepicker();	//싱글 달력
	$(".mcal").datepicker({dateFormat:"yy-mm"});	//월별 달력
	
	//주간달력
	$(".wcal").datepicker({
		showWeek: true,
		calculateWeek: this.iso8601Week,
		firstDay: 1,
		onSelect: function(dateText){
			$("#week").val($.datepicker.iso8601Week(new Date(dateText)));
		}
	});
}

function thisDate(){
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var YY = year;

	var MM = month < 10 ? "0"+month : month;
	var DD = day < 10 ? "0"+day : day;
	var kyou = YY+"-"+MM+"-"+DD;
	
	return kyou;
}

//유효성체크(Null)
function fnNullCheck(obj, msg){
	if(obj.val() == ""){
		alert(msg);
		obj.focus();
		return true;
	}		
	return false;
}

//숫자만
function fnIsNumber(){	
	if (event.keyCode < 48 || event.keyCode > 57) {
		alert("숫자만 입력가능합니다");
		if(event.preventDefault)
			event.preventDefault();
		else
			event.returnValue=false;
	}
}

// 길이 체크(Length)
function fnLengthCheck(obj, msg, len){
	if(obj.val().length < len){
		alert(msg);
		obj.focus();
		return true;
	}		
	return false;
}

//파일 다운로드 (이미지)
function fnDownloadImage(file, real){
	var form = "";
	var inputFileName = "";
	var inputRealName = "";
	
	if($("#downForm").length == 0){
		form = $("<form method='post' id='downForm' name='downForm' />").clone();
		inputFileName = $("<input type='hidden' id='fileName' name='fileName' />").clone();
		inputRealName = $("<input type='hidden' id='realName' name='realName' />").clone();
		$("body").append(form);
	}else{
		form = $("#downForm");
		inputFileName = $("#fileName");
		inputRealName = $("#realName");
	}
	
	inputFileName.val(file);
	inputRealName.val(real);	
	form.append(inputFileName);
	form.append(inputRealName);

	form.attr("action", contextPath + "/downloadImage.do");
	form.attr("target", "_self");
	form.submit();
}

//파일 다운로드
function fnDownload(){
	if(arguments[0] != undefined){
		var board = arguments[0];
	
		if($("#frmProc").find("[name=board]").length > 0){
			$("#frmProc").find("[name=board]").val(board);
		}else{
			var tInput = $("<input type='hidden' />").clone();
			tInput.attr({"name":"board", "id":"board", "value":board});
			$("#frmProc").append(tInput);
		}
	}
	
	var frm = $("#frmProc");
	frm.attr("action", contextPath + "/download.do");
	frm.attr("target", "_self");
	frm.submit();
}

//천단위 콤마
function set_comma(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';
    while (reg.test(n))
     n = n.replace(reg, '$1' + ',' + '$2');

    return n;
}

//textarea글자수 제한
function IsObj(oObj) { return ((typeof(oObj) != 'undefined') && (oObj != null)); }
function ta_cls(oObj) {alert(oObj.dirty); if (oObj.dirty == 'n') { alert("asdfasdf");oObj.dirty = 'y'; oObj.value = ''; } }
function is_empty(pVal) { return !(/\S+/.test(pVal)); }

function onkeyup_ps(texta,wlen) {
	if (!IsObj(texta)) return false;
	ta_textarea_check_len(texta, 'tacnt', true,wlen);
}

function ta_textarea_check_len(otxt, id, is_alert,wlen) {
	if(otxt.dirty == 'n') return;
	
	var maxbyte = wlen;
	var textbyte = len_byte(otxt.value);
	var sp = document.getElementById(id);
	if (IsObj(sp)) sp.innerHTML = textbyte;
	
	if (is_alert && (textbyte > maxbyte)) {
		alert('내용을 한글' + (maxbyte / 2) + '자(' + maxbyte + 'byte) 이내로 작성 해주세요\n\n초과된 내용은 자동으로 삭제 됩니다');
		otxt.value = left_byte(otxt.value, maxbyte);
		
		textbyte = len_byte(otxt.value);
		if (IsObj(sp)) sp.innerHTML = textbyte;
	}
}

function left_byte(pVal, pLen) {
	var i, nLen = pVal.length, nByte;
	var ret = '';
	var ret_len = 0;
	for (i = 0; i < nLen; i++) {
		nByte = 1;
		if (pVal.charCodeAt(i) > 127) nByte++;
		if (pLen < (ret_len + nByte)) break;
		ret += pVal.charAt(i);
		ret_len += nByte;
	}
	return ret;
}

function len_byte(pVal) {
	var i, nLen = pVal.length, nDByte = 0;
	for (i = 0; i < nLen; i++) {
		if (pVal.charCodeAt(i) > 127) nDByte++; 
	}
	return (nLen + nDByte);
}

//로그인 여부 체크
function fnLoginSession(){
	if(sLogin == "" || sLogin == null){
		$("#frmProc").attr("action", contextPath + "/login/login");
		$("#frmProc").submit();
		return true;
	}
	
	return false;
}

//이메일형식 체크
function fnEmailCheck(email){
	var bol = false;
	var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if (exptext.test(email.val())!=true){
		alert('이메일 형식이 올바르지 않습니다');
		email.focus();
		bol = true;
	}
	return bol;     // bol 값을 반환 . 이메일 형식이 아니면 true
}

//관리자 메뉴클릭
function fnMenu(url, menuid, leftid){
	$("#frmProc").find("input").val("");
	leftid = leftid == undefined ? "null" : leftid;
	
	if($("#frmProc").find("[name=topMenuId]").length > 0){
		$("#frmProc").find("[name=topMenuId]").val(menuid);
		$("#frmProc").find("[name=leftMenuId]").val(leftid);
	}else{
		var tInput = $("<input type='hidden' />").clone();
		tInput.attr({"name":"topMenuId", "id":"topMenuId", "value":menuid});
		$("#frmProc").append(tInput);
		
		var lInput = $("<input type='hidden' />").clone();
		lInput.attr({"name":"leftMenuId", "id":"leftMenuId", "value":leftid});
		$("#frmProc").append(lInput);
	}
	
	$("#frmProc").attr("action", url);
	$("#frmProc").attr("target", "_self");
	$("#frmProc").submit();
}

//즐겨찾기
function fnBookmark(){
	var title = "BBQ"
	
	if(window.sidebar && window.sidebar.addPanel){
		/* Mozilla Firefox Bookmark - Works With Opening In A Side Panel Only */
	    window.sidebar.addPanel(title, host, "");
	}else if(window.opera && window.print) {
	    /* Opera Hotlist */
	    alert("Please Press Ctrl+D To Bookmark This Page!");
	    return true;
	}else if(window.external){
		/* IE Favorite */
	    try{
			window.external.AddFavorite(host, title);
		}catch(e){
			alert("Please Press Ctrl+D To Bookmark This Page!");
		}            
	}else{
		/* Other - Google Chrome, Safari */
		alert("Please Press Ctrl+D To Bookmark This Page!");
	}
}

//확장자 체크
function fnFileExtCheck(obj, ext){
	var chk = true;
	var extList = ""; 
	
	if(arguments[2] == undefined){
		for(var i=0;i<ext.length;i++){
			if(i > 0) extList += ", ";
			extList += ext[i];
		}
	}else{
		extList = arguments[2];
	}	
	
	obj.each(function(){		
		var data = $(this).val();
		if(data != ""){
			var fileExt = data.substring(data.lastIndexOf(".") + 1).toLowerCase();
			chk = true;
			for(var i=0;i<ext.length;i++){
				if(ext[i] == fileExt) {
					chk = false;
					break;
				}
			}
			
			if(chk){
				alert("지원하지 않는 확장자 입니다\n(" + extList + ")");
				return false;
			}
		}else{
			chk = false;
		}
	});
	
	return chk;
}

//페이징 번호 클릭
function searchPage(cPage) {
	var oPage = arguments[1] == undefined ? "cPage" : arguments[1];
	
	$("#" + oPage).val(cPage);
	$("#frm").attr("action", cUrl);
	$("#frm").attr("target", "_self");
	$("#frm").submit();
}

//제목 짜르기(제목...)
function fnCutTitle(title, len){
	if(title.length > len){
		title = title.substring(0, len);
		title += "...";
	}
	
	return title;
}


//숫자에 ,붙이기
function commaNum(num) {  
    var len, point, str;  

    num = num + "";  
    point = num.length % 3  
    len = num.length;  

    str = num.substring(0, point);  
    while (point < len) {  
        if (str != "") str += ",";  
        str += num.substring(point, point + 3);  
        point += 3;  
    }  
    return str;  
}  

function onRelativeSite()
{
	var siteurl = $("#relativesite option:selected").val();
	if(siteurl != "")
	{
		window.open(siteurl, "_blank");  
	}
	
/*	if(relative_site.selectedIndex > 0)
	{
		var sel_relative_site = relative_site.options[relative_site.selectedIndex].value;
		window.open(sel_relative_site);
	}*/
}

//확장자 체크
function fnFileExtCheck(obj, ext){
	var chk = true;
	var extList = ""; 
	
	if(arguments[2] == undefined){
		for(var i=0;i<ext.length;i++){
			if(i > 0) extList += ", ";
			extList += ext[i];
		}
	}else{
		extList = arguments[2];
	}	
	
	obj.each(function(){		
		var data = $(this).val();
		
		if(data != ""){
			var fileExt = data.substring(data.lastIndexOf(".") + 1).toLowerCase();
			chk = true;
			for(var i=0;i<ext.length;i++){
				if(ext[i] == fileExt) {
					chk = false;
					break;
				}
			}
			
			if(chk){
				alert("지원하지 않는 확장자 입니다\n(" + extList + ")");
				return false;
			}
		}else{
			chk = false;
		}
	});
	
	return chk;
}
