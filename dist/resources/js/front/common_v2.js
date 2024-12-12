window.addEventListener("DOMContentLoaded", () => {
    commonInit();
    responForm();
});

window.addEventListener("load",()=>{
    layoutFunc();
});


function gnbRock(target){
    const targetDom = document.querySelectorAll(target);
    const header_gnb_li = document.querySelectorAll(".header_gnb_list > li");
    if(!!targetDom){
        targetDom.forEach((item)=>{
            const itemMenu = item;
            const parentList = itemMenu.closest(".header_gnb_list > li");
            const parentMbList = itemMenu.closest(".mbmenu_vlist > li");
            const parentTwoWrap = itemMenu.closest(".gnb_two_list_wrap");
            const parentMbTwoWrap = itemMenu.closest(".mbmenu_two_menu_list_wrap");
            if(!!parentList){
                parentList.classList.add("active","rock");
            }
            if(!!parentTwoWrap){
                parentTwoWrap.style.height = "auto";
            }
            if(!!parentMbList){
                parentMbList.classList.add("active");
            }
            if(!!parentMbTwoWrap){
                parentMbTwoWrap.classList.add("motion");
                parentMbTwoWrap.style.height = "auto";
            }
            itemMenu.classList.add("active");
        });
        /* targetDom.forEach((item)=>{
            const itemMenu = item;
            const itemMenuDepthWrap = itemMenu.querySelector(".gnb_two_list_wrap");
            const itemMenuDepthList = itemMenu.querySelector(".gnb_two_list");
            const itemNotMenu = header_gnb_li;
            itemNotMenu.forEach((item)=>{
                const thisItem = item;
                const thisItemDepthWrap = thisItem.querySelector(".gnb_two_list_wrap");
                if(thisItem === itemMenu){return;}
                thisItem.classList.remove("active");
                if(!!thisItemDepthWrap){
                    thisItemDepthWrap.style.height = "0px";
                }
            });
            itemMenu.classList.add("active");
            if(!!itemMenuDepthWrap){
                itemMenuDepthWrap.style.height = itemMenuDepthList.getBoundingClientRect().height + "px";
            }
        }) */
    }
    /* 
    
    function subActiveMenu(item){
        const itemMenu = item;
        const itemMenuDepthWrap = itemMenu.querySelector(".gnb_two_list_wrap");
        const itemMenuDepthList = itemMenu.querySelector(".gnb_two_list");
        const itemNotMenu = header_gnb_li;
        itemNotMenu.forEach((item)=>{
            const thisItem = item;
            const thisItemDepthWrap = thisItem.querySelector(".gnb_two_list_wrap");
            if(thisItem === itemMenu){return;}
            thisItem.classList.remove("active");
            if(!!thisItemDepthWrap){
                thisItemDepthWrap.style.height = "0px";
            }
        });
        itemMenu.classList.add("active");
        if(!!itemMenuDepthWrap){
            itemMenuDepthWrap.style.height = itemMenuDepthList.getBoundingClientRect().height + "px";
        }
    }
    
    */
}


/*
    resize
*/
function resizeAction(callback){
    let windowWid = 0;
    window.addEventListener("resize",()=>{
        if(window.innerWidth !== windowWid){
        if(callback){
            callback();
        }
        }
        windowWid = window.innerWidth;
    });
    }

/**
   * device check
   */
function commonInit() {
    let touchstart = "ontouchstart" in window;
    let userAgent = navigator.userAgent.toLowerCase();
    if (touchstart) {
        browserAdd("touchmode");
    }
    if (userAgent.indexOf("samsung") > -1) {
        browserAdd("samsung");
    }

    if (
        navigator.platform.indexOf("Win") > -1 ||
        navigator.platform.indexOf("win") > -1
    ) {
        browserAdd("window");
    }

    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        // iPad or iPhone
        browserAdd("ios");
    }

    function browserAdd(opt) {
        document.querySelector("html").classList.add(opt);
    }
}


/* popup */
class DesignPopup {
    constructor (option){
        // variable
        this.option = option;
        this.selector = document.querySelector(this.option.selector);
        this.touchstart = "ontouchstart" in window;
        if (!this.selector) {
            return;
        }

        this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
        this.domHtml = document.querySelector("html");
        this.domBody = document.querySelector("body");
        this.pagewrap = document.querySelector(".page_wrap");
        this.layer_wrap_parent = null;
        this.btn_closeTrigger = null;
        this.scrollValue = 0;
        
        // init
        const popupGroupCreate = document.createElement("div");
        popupGroupCreate.classList.add("layer_wrap_parent");
        if (!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")) {
            this.pagewrap.append(popupGroupCreate);
        }
        this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");


        // event
        this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
        this.bg_design_popup = this.selector.querySelector(".bg_dim");
        let closeItemArray = [...this.btn_close];
        if (!!this.selector.querySelectorAll(".close_trigger")) {
            this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
            closeItemArray.push(...this.btn_closeTrigger);
        }
        if (closeItemArray.length) {
            closeItemArray.forEach((element) => {
                element.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.popupHide(this.selector);
                },false);
            });
        }
    }
    dimCheck(){
        const popupActive = document.querySelectorAll(".popup_wrap.active");
        if (!!popupActive[0]) {
            popupActive[0].classList.add("active_first");
        }
        if (popupActive.length > 1) {
            this.layer_wrap_parent.classList.add("has_active_multi");
        } else {
            this.layer_wrap_parent.classList.remove("has_active_multi");
        }
    }
    popupShow(){
        this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
        if (this.selector == null) { return; }
        if(this.touchstart){
            this.domHtml.classList.add("touchDis");
        }
        this.selector.classList.add("active");
        setTimeout(() => {
            this.selector.classList.add("motion_end");
        }, 30);
        if ("beforeCallback" in this.option) {
            this.option.beforeCallback();
        }
        if ("callback" in this.option) {
            this.option.callback();
        }
        if (!!this.design_popup_wrap_active) {
            this.design_popup_wrap_active.forEach((element, index) => {
                if (this.design_popup_wrap_active !== this.selector) {
                    element.classList.remove("active");
                }
            });
        }
        this.layer_wrap_parent.append(this.selector);
        this.dimCheck();
    }
    popupHide(){
        let target = this.option.selector;
        if (!!target) {
            this.selector.classList.remove("motion");
            if ("beforeClose" in this.option) {
                this.option.beforeClose();
            }
            //remove
            this.selector.classList.remove("motion_end");
            setTimeout(() => {
                this.selector.classList.remove("active");
            }, 400);
            this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
            this.dimCheck();
            if ("closeCallback" in this.option) {
                this.option.closeCallback();
            }
            if (this.design_popup_wrap_active.length == 1) {
                this.domHtml.classList.remove("touchDis");
            }
        }
    }
}



function responForm(){
    const pcwidItem = document.querySelectorAll("[data-pcwid]");

    action();
    window.addEventListener("resize",()=>{
        action();
    });

    function action(){
        if(!!pcwidItem){
            pcwidItem.forEach((item)=>{
                if(window.innerWidth < 1023){
                    item.style.removeProperty("width");
                }else{
                    item.style.width = item.dataset.pcwid + "px";
                }
            });
        }
    }
}


function layoutFunc(){
    const page_wrap = document.querySelector(".page_wrap");
    const gnb_two_list_wrap = document.querySelectorAll(".gnb_two_list_wrap");
    const gnb_two_list = document.querySelectorAll(".gnb_two_list");
    const header_section = document.querySelector(".header_section");
    const header_gnb_list = document.querySelectorAll(".header_gnb_list");
    const header_gnb_li = document.querySelectorAll(".header_gnb_list > li");
    const bg_header_gnb = document.querySelector(".bg_header_gnb");
   

    // event
    header_gnb_li.forEach((item)=>{
        item.addEventListener("mouseenter",(e)=>{
            if(page_wrap.classList.contains("sub_wrap")){
                subActiveMenu(e.currentTarget);
            }else{
                activeMenu();
            }
        });
    })
    header_section.addEventListener("mouseleave",()=>{
        if(page_wrap.classList.contains("sub_wrap")){
            subInActiveMenu();
        }else{
            inActiveMenu();
        }
    });

    function activeMenu(){
        let arrayHeight = [];
        const domGroup = [...gnb_two_list_wrap,bg_header_gnb];
        if(!!gnb_two_list){
            gnb_two_list.forEach((item)=>{
                arrayHeight.push(item.getBoundingClientRect().height);
            });
            domGroup.forEach((item)=>{
                item.style.height = Math.max.apply(null,arrayHeight) + "px";
            });
        }
    }

    function inActiveMenu(){
        const domGroup = [...gnb_two_list_wrap,bg_header_gnb];
        if(!!domGroup){
            domGroup.forEach((item)=>{
                item.style.height = "0px";
            });
        }
    }

    function subActiveMenu(item){
        const itemMenu = item;
        const itemMenuDepthWrap = itemMenu.querySelector(".gnb_two_list_wrap");
        const itemMenuDepthList = itemMenu.querySelector(".gnb_two_list");
        const itemNotMenu = header_gnb_li;
        itemNotMenu.forEach((item)=>{
            const thisItem = item;
            const thisItemDepthWrap = thisItem.querySelector(".gnb_two_list_wrap");
            if(thisItem === itemMenu){return;}
            thisItem.classList.remove("active");
            if(!!thisItemDepthWrap){
                thisItemDepthWrap.style.height = "0px";
            }
        });
        itemMenu.classList.add("active");
        if(!!itemMenuDepthWrap){
            itemMenuDepthWrap.style.height = itemMenuDepthList.getBoundingClientRect().height + "px";
        }
    }

    function subInActiveMenu(){
        const rockItem = document.querySelector(".header_gnb_list > li.rock");
        header_gnb_li.forEach((item)=>{
            const thisItem = item;
            const thisItemDepthWrap = thisItem.querySelector(".gnb_two_list_wrap");
            thisItem.classList.remove("active");
            if(!!thisItemDepthWrap){
                thisItemDepthWrap.style.height = "0px";
            }
            if(!!rockItem){
                subActiveMenu(rockItem);
            }
        });
    }

    function mbTotal() {
        var touchstart = "ontouchstart" in window;
        var btn_panel_menu = document.querySelector(".btn_panel_menu"),
          mobile_panel_zone = document.querySelector(".mobile_panel_zone"),
          mobile_panel_dim = document.querySelector(".mobile_panel_dim"),
          btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
          mobile_mainmenu_wrap = document.querySelector(".mobile_mainmenu_wrap");
          domHtml = document.querySelector("html"),
          domBody = document.querySelector("body");
        const mbmenu_one = document.querySelectorAll(".mbmenu_one");
    
        // init 
        if (mobile_panel_zone === null) {
          return;
        }
        btn_panel_menu.addEventListener("click", function(e) {
          e.preventDefault();
          totalOpen();
        }, false);
        btn_mbmenuclose.addEventListener("click", function(e) {
          e.preventDefault();
          totalClose();
        }, false);
        mobile_panel_dim.addEventListener("click", function(e) {
          e.preventDefault();
          totalClose();
        }, false);
        resizeAction(()=>{
          if(window.innerWidth > 1023){
            totalClose();
          }
        });
        if(!!mbmenu_one){
            mbmenu_one.forEach((item)=>{
                item.addEventListener("click",(e)=>{
                    const thisEventTarget = e.currentTarget;
                    const thisEventParent = thisEventTarget.closest("li");
                    const thisEventParentGlobal = thisEventTarget.closest(".mbmenu_vlist");
                    const thisEventParentGlobalLi = thisEventParentGlobal.querySelectorAll(":scope > li");
                    const thisEventDepth = thisEventParent.querySelector(".mbmenu_two_menu_list_wrap");
                    const thisEventDepthInner = thisEventParent.querySelector(".mbmenu_two_menu_list");
                    if(!!thisEventParentGlobalLi){
                        thisEventParentGlobalLi.forEach((item)=>{
                        const thisItem = item;
                        const thisItemDepth = thisItem.querySelector(".mbmenu_two_menu_list_wrap");
                        if(!thisItemDepth){return;}
                        if(thisEventParent !== item){
                            item.classList.remove("active");
                            
                                thisItemDepth.classList.remove("motion");
                                thisItemDepth.style.height = "0px";
                            }
                        })
                    }
                    if(!!thisEventDepth){
                        e.preventDefault();
                        thisEventParent.classList.toggle("active");
                        if(thisEventParent.classList.contains("active")){
                            thisEventDepth.classList.add("motion");
                            thisEventDepth.style.height = thisEventDepthInner.getBoundingClientRect().height + "px";
                        }else{
                            thisEventDepth.classList.remove("motion");
                            thisEventDepth.style.height = "0px";
                        } 
                    }
                });
            });
        }
    
        function totalOpen() {
          mobile_panel_zone.classList.add("active")
          setTimeout(function() {
            mobile_panel_zone.classList.add("motion");
            setTimeout(function() {
              if(!!mobile_mainmenu_wrap){
                setTabControl(".mobile_mainmenu_wrap");
              }
            },500);
            if (touchstart) {
              domHtml.classList.add("touchDis");
            }
          }, 30);
        }
    
        function totalClose() {
          mobile_panel_zone.classList.remove("motion");
          setTimeout(function() {
            mobile_panel_zone.classList.remove("active");
            domHtml.classList.remove("touchDis");
          }, 500);
        }
    }

    
    mbTotal();
}



function siblings(t) {
    var children = t.parentElement.children;
    var tempArr = [];
  
    for (var i = 0; i < children.length; i++) {
      tempArr.push(children[i]);
    }
  
    return tempArr.filter(function(e) {
      return e != t;
    });
  }


  
function scrollDrag(target){
    let targetDom = [...target];
    let touchstart = "ontouchstart" in window;
    targetDom.forEach((item)=>{
      scrollAction(item);
    });
    function scrollAction(targetItem){
      if(touchstart){return;}
      const slider = document.querySelector(targetItem);
      let isDown = false;
      let startX;
      let scrollLeft;
  
      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        e.preventDefault();
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });
      slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }


  function toggleTable(){
    const event_tr = document.querySelectorAll("tr.event_tr");
    if(!!event_tr){
        event_tr.forEach((item)=>{
            item.addEventListener("click",(e)=>{
                e.preventDefault();
                let thisItem = e.currentTarget;
                let targetItem = thisItem.nextElementSibling;
                if(!!targetItem){
                    targetItem.classList.toggle("active");
                }
            });
        });
    }
  }
  