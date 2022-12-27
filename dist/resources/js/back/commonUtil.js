
function replaceAll(str, searchStr, replaceStr) {

    while (str.indexOf(searchStr) != -1) {
        str = str.replace(searchStr, replaceStr);
    }
    return str;
}

//-------------------------------------------------------------------------

// 프로토타입에 정의하여 사용하기
// 사용법 : 트림할문자변수.trim()
//-------------------------------------------------------------------------
//String.prototype.trim = function() {	
//	return this.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
//};

function trim(value){
	return value.replace(/^\s*|\s*$/g, '');
}

function jsSubmit(){	
	this.submit = function(form_id, url, method, target){	
		$("#" + form_id).submit(function(event){
			this.action = url;
			this.method = method;
			this.target = target;
		});
		
		$("#" + form_id).trigger('submit');	
	};
	this.popup = function(form_id, url, pop_name, width, height){
		var left = (screen.width/2) - (width/2);
		var top = (screen.height/2) - (height/2);		
		
		window.open('', pop_name ,'toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + width +',height=' + height + ',top='+top+', left=' + left);

		this.submit(form_id, url, "post", pop_name);
	};
}

//bytes수 조회
String.prototype.getByte = function(){    
	return(this.length+(escape(this)+"%u").match(/%u/g).length-1);
};


//json Ajax
function jsAjax(){
	var data = null;
	var callback = null;
	var url = null;
	var type = "POST";
	var dataType = "json";
	
	this.progress = function(url, type, data, callback, dataType){
		this.url = url;
		this.data = data;
		this.callback = callback;
		if(type != "") this.type = type;
		if(dataType != "") this.dataType = dataType;
		
		$.ajax({
			type: this.type,
			url: this.url,
			dataType: this.dataType,
			data: this.data,
			success: this.callback,
			error:function(request, option, error){
				alert("Error[" + xhr.status + "]" + error);
			}
		});		
	};
	this.multiProgress = function(frm, url, type, data, callback, dataType){
		this.url = url;
		this.data = data;
		this.callback = callback;
		if(type != "") this.type = type;
		if(dataType != "") this.dataType = dataType;
		
		frm.ajaxSubmit({
			type: this.type,
			url: this.url,
			dataType: this.dataType,
			data: this.data,
			success: this.callback,
			error:function(request, option, error){
				alert("Error[" + xhr.status + "]" + error);
			}
		});		
	};
}

var commonWin = null;
function openCommonPopup(sId, sTitle, popWidth, popHeight, modalFlag, loadPage){
	var winH = $(window).height();
	var winW = $(window).width();
	
	var yValue = winH/2 - (popHeight/2);
	var xValue = winW/2 - (popWidth/2);
	
	commonWin = Ext.create('Ext.Window', {
		id: sId,  
		cls: 'white',
        title: sTitle,
        width: popWidth,
        height: popHeight,
        x: xValue,
        y: yValue,
        plain: true,
        modal:modalFlag,
        autoLoad: {url: '/hwvipadmin/common/goPopupPage.do?goUrl=' + loadPage, callback: this.initSearch, scope: this},		                    
        headerPosition: 'top',
        layout: 'fit'
    });
	commonWin.show();		
}

function closeCommonPopup(){
	commonWin.close();
}

/*
document.onkeydown = function() {
	if (event.keyCode == 8){
		try{
			//alert("1");
			//alert(document.referrer);
			var reffer = document.referrer;
			//alert(reffer.indexOf("index.do"));
			//top.document.getElementById("ifrm_jobmgt.message").src = "http://naver.com";
			if(reffer != "" && reffer != "undefined" && reffer.indexOf("index.do") < 0)
				top.document.getElementById(window.name).src = document.referrer;
			//else
				//alert("3333");
		}catch(e){
			//top.document.getElementById(window.name).src = document.URL;
		}		
		
		event.keyCode = 505; 
		//alert("3444444");
		
		return false;
	}
}*/

function fn_winopen() {
	//var sTitle = "관리자 메시지함";
	//(new jsSubmit()).popup("searchFrm", "/common/goMenuPage.do?tabId=jobmgt.message", "mainPage", "800", "600");
	
	window.open(
		"/jobmgnt/getMessageMgnt.do",
		"",
		"width=800,height=800"
	);
	
}

// maxlength 설정
function isMaxlength(obj) {
	var mlength = obj.getAttribute? parseInt(obj.getAttribute("maxlength")) : "";

	if (obj.getAttribute && obj.value.length > mlength) {
		alert(mlength + "자 내외로 입력하세요.");
		obj.value = obj.value.substring(0,mlength);
	}
}

function jsSubmit(){	
	this.submit = function(form_id, url, method, target){	
		$("#" + form_id).submit(function(event){
			this.action = url;
			this.method = method;
			this.target = target;
		});
		
		$("#" + form_id).trigger('submit');	
	};
	this.popup = function(form_id, url, pop_name, width, height){
		var left = (screen.width/2) - (width/2);
		var top = (screen.height/2) - (height/2);		
		
		window.open('', pop_name ,'toolbar=no,location=no,directory=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=' + width +',height=' + height + ',top='+top+', left=' + left);

		this.submit(form_id, url, "post", pop_name);
	};
}

//////////////StringBuilder 만들기. //////////////
function StringBuilder (value) {
this.strings = new Array("");
this.append(value);
}
StringBuilder.prototype.append = function (value) {
if (value) {
this.strings.push(value);
}
};
StringBuilder.prototype.clear = function () {
this.strings.lengh = 1;
};
StringBuilder.prototype.toString = function () {
return this.strings.join("");
};
