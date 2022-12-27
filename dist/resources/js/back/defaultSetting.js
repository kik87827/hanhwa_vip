

	Ext.application({
		name:'HanWhaVIP',
		index:0
	});
	
	Ext.Loader.setConfig({enabled: true});
	Ext.Loader.setPath('Ext.ux', '/resources/extjs/ux/');

	Ext.require([
	    'Ext.tab.*',
	    'Ext.ux.TabCloseMenu'
	]);

    var tabIdx = 1;

    Ext.onReady(function() {
    	
    	Ext.QuickTips.init();
    	
    	//메뉴 생성
    	var store = Ext.create('Ext.data.TreeStore', {
    		
    		proxy: {
    			type: 'ajax',
    			url: '/hwvipadmin/common/menu.do'
    		},
            root: {
            	text: 'HanWhaVIP MG',
            	id: '/',
            	expanded: true
            },
            folderSort: true
    	});
    	
    	var tree = Ext.create('Ext.tree.Panel', {
    		id: 'menuTree',
    		store: store,
    		region:'center',
    		split: true,
    		viewConfig: {
    			plugins: {
    				ptype: 'treeviewdragdrop',
    				enableDrop: false,
    				enableDrag: false
    			}
    		},
    		renderTo: 'menu',
    		height: 600,
    		width:250,
    		minSize: 150,
    		useArrows: true,
    		listeners:{
    			itemclick: function(view, record, item, index, event) {
    				if (record.get('leaf')) {
    					if(event.shiftKey) {
    						updateNewWindow(record.get('id'));
    					} else {
    						updateTab( record.get('id'),record.get('text'));
    					}
    				} else {
    					var isExpanded = record.isExpanded();
    					(record.isExpandable() && isExpanded) ? this.collapseNode(record) : this.expandNode(record);
    				}
    			}
    		}
    	});
    	
    	
    	var top1 = {
	        id: 'details-top',
	        //title: 'Details',
	        split: true,
	        region: 'north',
	        height: 100,
	        //bodyStyle: 'padding-bottom:15px;background:#eee;',
	        autoScroll: true,
	        //margins: '0, 0, 5, 0',
	        border: true,
	        autoLoad: {url: '/hwvipadmin/common/headerInfo.do', callback: this.initSearch, scope: this}
	    };
    	
           
           // Assign the changeLayout function to be called on tree node click.
           /*tree.getSelectionModel().on('select', function(selModel, record) {        	   
               if (record.get('leaf')) {            	   
            	   updateTab( record.get('id'),record.get('text'));
               }
           });*/
           
  
    	//tab 생성
    	var currentItem;
    	// tab generation code
    	
    	window.tabMenu = new Ext.TabPanel({
    		region:'center',
    		autoScroll: true,
    		enableTabScroll:true,     // <- 탭 이 화면에 다 표시 안될경우 좌우 스크롤 할 수 있게 해준다.
    		margins:'0 4 4 0',
    		activeTab:0,
    		items:[{
    			id:'main',
    			contentEl:'tabs',
    			title: '메인',
    			html:'<iframe  width="100%" height="100%" frameborder=0 src="/hwvipadmin/notice/notice/list.do"></iframe>',
    			closable:false,
    			autoScroll:true
    		}],
    		plugins: Ext.create('Ext.ux.TabCloseMenu', {
    			extraItemsTail:null
    		}),
    		getItem : function(item) {
    			return this.getComponent(item);
    		}
    	}); 

          /* var userPanel = {
        	        id: 'details-top',
        	        //title: 'Details',
        	        region: 'north',
        	        height: 100,
        	        //bodyStyle: 'padding-bottom:15px;background:#eee;',
        	        autoScroll: true,
        	        margins: '0, 0, 5, 0',
        	        border: false,
        	        autoLoad: {url: '/common/headerInfo.do', callback: this.initSearch, scope: this}
        	    };*/
           
    	Ext.create('Ext.Viewport', {
    		layout: 'border',
    		title: 'Ext Layout Browser',
    		items: [{
	    			layout: 'border',
	    			id: 'left-layout',
    				region: 'west',
    				border: false,
    				split:true,
    				margins: '5, 0, 5, 5',
    				width: 190,
	    			minSize: 100,
	                maxSize: 500,
	                //collapsible: true,
	                items: [top1, tree]
    				//title: top,
    				//height: 50,
    				//autoScroll: true,
    				//autoLoad: {url: '/common/headerInfo.do', callback: this.initSearch, scope: this}
    			},
    			/*{
    				xtype: 'box',
	    			id: 'footer',
	    			//layout: 'border',
	    			region: 'south',
	    			//border: false,
	    			html: '<h1><a href="/logout.do" >footer</a></right></h1>',
	    			height: 30
	    			//items: [tabMenu]
    			},*/
    			tabMenu
    		],
    		renderTo: Ext.getBody()
    	});
    	
    });
    
    
    function updateNewWindow(tabId) {
    	var realId = tabId;
    	
    	if (realId == "statistics.site.openpagecount") {
    		window.open("http://www.google.co.kr/intl/ko/analytics/index.html");
    	}
    	else {
    		tabId = replaceAll(tabId,".","");
    		var tab = tabMenu.getItem(tabId);
    		
    		window.open('/common/goNewWindowPage.do?tabId=' + realId);
    	}
    }
    
    
    // Update the contents of a tab if it exists, otherwise create a new one
    function updateTab(tabId,title,url) {
    	var realId = tabId;
    	
    	if (realId == "statistics.site.openpagecount") {
    		window.open("http://www.google.co.kr/intl/ko/analytics/index.html");
    	}
    	else {
    		tabId = replaceAll(tabId,".","");
    		
    		var tab = tabMenu.getItem(tabId);
            if(tab) {
            	if(url != null && url != "")
            		tab.loader.url = '/hwvipadmin/common/goMenuPage.do?tabId=' + realId + "&" + url;
            	else
            		tab.loader.url = '/hwvipadmin/common/goMenuPage.do?tabId=' + realId;
            	
            	tab.loader.load();
            }
            else {
            	if(url == null || url == "")
            		tab = addTab(realId, title);
            	else
            		tab = addTabUrl(realId, title, url);
            }
            
            tabMenu.setActiveTab(tab);
    	}
    }
    
    
    // Adds tab to center panel
    function addTab( tabId,tabTitle ) {
    	
    	var realId = tabId;
    	tabId = replaceAll(tabId,".","");
    	
    	if(tabIdx>8) {
    		alert("최대 8개까지 탭을 사용할수 있습니다. 열린 탭을 닫고 다시 시도해 주세요.");
    		return;
    	}
    	
    	tabMenu.add ({
    		id:tabId,
    		title: tabTitle,
    		iconCls: 'tabs',
    		// html: '<iframe width="100%" height="100%" frameborder=0 src="/common/goMenuPage.do?tabId=' + realId + '"></iframe>',
    		autoLoad: {url: '/hwvipadmin/common/goMenuPage.do?tabId=' + realId , callback: this.initSearch, scope: this},
    		closable:true,
    		/*loader: {
				url: '/common/goMenuPage.do?tabId=' + realId,
				loadMask: true
			},*/
    		listeners: {
    			destroy: function(tab) {
    				tabIdx--;
    			}
    		}
    	}).show();
    	
    	tabIdx++;
    
    }
    
    
    function addTabUrl( tabId, tabTitle, param ) {
    	
    	var realId = tabId;
    	tabId = replaceAll(tabId,".","");
    	
    	if(tabIdx>8) {
    		alert("최대 8개까지 탭을 사용할수 있습니다. 열린 탭을 닫고 다시 시도해 주세요.");
    		return;
    	}
    	
    	tabMenu.add ({
    		id:tabId,
    		title: tabTitle,
    		iconCls: 'tabs',
    		closable: true,
    		loader: {
    			url: '/hwvipadmin/common/goMenuPage.do?tabId=' + realId + "&" + param,
    			loadMask: true
    		},
    		listeners: {
    			activate: function(tab) {
    				tab.loader.load();
    			},
    			destroy: function(tab) {
    				tabIdx--;
    			}
    		}
    	}).show();
    	
    	tabIdx++;
    }
    
    
    function fnCloseTab() {
    	tabMenu.items.each(function(item) {
    		if(item.closable) tabMenu.remove(item);
    	});
    }
    
    function fnCloseTabById(id){
    	var tab = tabMenu.getItem(replaceAll(id,".",""));
    	
    	if(tab){
	    	tabMenu.remove(tab);
    	}
    }

