if( window.console == undefined ){ console = { log : function(){} }; }
(function(){
    var images = null;
    var currentIndex = 0;
    var $dotItems =null;
    var timerId =0;
    var imgSize = 0;
    $(document).ready(function(){
        init();
        initEvent();
        //showImageAt(0);
        startImageAt(0);
        autoStart();
    });
    
    function init(){
        images = [];
        // 모든 이미지를 배열에 넣기, 넣음과 동시에 화면에서 보이지 않게
        $(".slider-body a").each(function(index){
            var $img = $(this);
            
            imgSize = $(this).width();
            
            $img.css({
                left:imgSize
            });
            images.push($img);
        });
        // 0번째 이미지 보이기
        ;
        $dotItems = $(".slider-dot-nav li a");
    }
    
    function startImageAt(index){
        images[0].css({
            left:0
        });
        currentIndex= index;
        showDotAt(0);
    }
    
    function initEvent(){
        $(".slider-btn-prev").click(function(){
            showImageAt(currentIndex-1,"prev");
        });
        $(".slider-btn-next").click(function(){
            showImageAt(currentIndex+1,"next");
        });
       $dotItems.hoverIntent({ 
            over:function(){
               var index = $dotItems.index(this);
                if(index == currentIndex){return;}
                if(index>currentIndex){
                    showImageAt(index,"next");
                }else{
                    showImageAt(index,"prev");
                } 
                autoStop();
            },  interval: 100,sensitivity: 7, timeout: 2000,
            out:function(){
                autoStart();
            },  interval: 100,sensitivity: 7, timeout: 2000
        });
         $(".slider-body").mouseenter(function(){
             autoStop();
        });
         $(".slider-body").mouseleave(function(){
             autoStart();
        });
    };
    
    function showImageAt(index,direction){
        
        // index 구하기
        if(index>=images.length){
             index = 0;
        }
        
        if(index<0){
            index = images.length-1;
        }
        
        // image 구하기
        var $currentImage = images[currentIndex];
        var $nextImages = images[index];
        currentIndex = index;
        
        var nextStartLeft = -imgSize;
        var currentEndLeft = imgSize;
        if(direction == "next"){
            nextStartLeft = imgSize;
            currentEndLeft = -imgSize;
        }
        
        // 모션 주기
        $nextImages.css({
            left:nextStartLeft
        });
        $currentImage.stop().animate({
            left:currentEndLeft
        });
        $nextImages.stop().animate({
            left:0
        });
        showDotAt(currentIndex);
    };
    
    function showDotAt(index){
        $dotItems.removeClass("select");
        $dotItems.eq(index).addClass("select");
    }
    
    function autoStart(){
        if(timerId == 0){
            timerId = setInterval(function(){
                 showImageAt(currentIndex+1,"next");
            },5000);
        }
    }
    function autoStop(){
       clearInterval(timerId);
       timerId = 0;
    }
})();

