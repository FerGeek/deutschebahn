$( document ).ready(function() {

/** CLOCK COUNTDOWN **/
    // Set the date we're counting down to
    var dateOrigin = moment.utc('2018-10-31 21:59:00').format('YYYY-MM-DD HH:mm:ss');

    var stillUtc = moment.utc(dateOrigin).toDate();
    var countDownDate = moment(stillUtc).local().toDate(); 


    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        var clock = document.getElementById("clockdiv");
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            $("#countdown-info").text("EXPIRED");
        }
        else
        {
            daysSpan.innerHTML = days;
            hoursSpan.innerHTML = ('0' + hours).slice(-2);
            minutesSpan.innerHTML = ('0' + minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + seconds).slice(-2);
        }
    }, 1000);
/** END CLOCK COUNTDOWN **/


/** MODAL POPUP **/
    (function(w,d) {
      var b = d.querySelector('[data-trigger="jobprofiler_l"]');
      if (b) b.addEventListener('click', function() {
        var tpl = '<div class="jobprofiler_l"><div><button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z"/></svg></button><iframe src="http://ausbildung-deutschebahn.com/jobprofiler" frameborder="0"></iframe></div></div>'
        disableScroll()
        d.body.insertAdjacentHTML('beforeend', tpl);
        var l=d.querySelector('.jobprofiler_l');
        l.querySelector('button').addEventListener('click', function() {
            l.parentNode.removeChild(l);
            enableScroll()
        }, false);
      }, false);
    })(window,document);

/** END MODAL POPUP **/




});

/**LOCK SCROLLING**/
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
  $("section").hide();
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
  $("section").show();
}

/**END LOCK SCROLLING**/

/**CAROUSEL FIX SWAPPING**/
var touchStartX = null;

    $('#carouselTop10, #carouselTop5, #carouselVorteile, #carouselHome, #carouselDichInner').each(function () {
        var $carousel = $(this);
        $(this).on('touchstart', function (event) {
            var e = event.originalEvent;
            if (e.touches.length == 1) {
                var touch = e.touches[0];
                touchStartX = touch.pageX;
            }
        }).on('touchmove', function (event) {
            var e = event.originalEvent;
            if (touchStartX != null) {
                var touchCurrentX = e.changedTouches[0].pageX;
                if ((touchCurrentX - touchStartX) > 60) {
                    touchStartX = null;
                    $carousel.carousel('prev');
                } else if ((touchStartX - touchCurrentX) > 60) {
                    touchStartX = null;
                    $carousel.carousel('next');
                }
            }
        }).on('touchend', function () {
            touchStartX = null;
        });
    });

/**END CAROUSEL FIX SWAPPING**/

/* START top_viewer carousel*/
    function cprefix(pref){"use strict";
    var res = 0, i=1;
    while(true){
        if($('#'+pref+i).length){res+=1;}
        else{break;}
        i+=1;
    }
    return res;
   }
   function idExist(id){"use strict";
       return $('#'+id).length;
   }
   function clearact(pref){
    var n = cprefix(pref);
    for(var i=0;i<=n;i++){
        $('#'+pref+i).removeClass('active');
    }
   }
   function ___clearact(pref){
    var n = cprefix(pref+'_content_');
    for(var i=0;i<=n;i++){
        $('#'+pref+'_m'+i).removeClass('active');
    }
   }
    function cleardisplay(pref){
    var n = cprefix(pref);
    for(var i=0;i<=n;i++){
        $("#"+pref+i).css("display","none");
    }
   }
   function toID(id){
    return document.getElementById(id);
   }
   function str_replace(haystack, needle,str){"use strict";
      var op = '\\'+haystack;
      var a =str.replace(new RegExp(op,'g'),needle);
      return a;
   }
   function get_tmp(array,tmp){"use strict";
   var array_k = Object.keys(array);var res = tmp;
   for(var i=0;i<array_k.length;i++){
      res = str_replace('{{'+array_k[i]+'}}',array[array_k[i]],res);
   }
   return str_replace("´","'",res);
 }
   //function clears(id,class){"use strict";
   //$('#'+id).removeClass(class);
   //}
   function getActiveN(id){"use strict";
    var n = cprefix(id);
    var n_act; var res = false;
    for(var i = 1; i <= n + 1; i++){
      if(document.getElementById(id+i).style.display === 'block') {res = true;n_act = i;break;}
    }
    return res?n_act:null;
}
   function navar_mob_fix(idm,start,length,step){"use strict";
    // fix-zero-bug
    if (start==0) {start=1;}
    // fix-act-bug
    clearact(idm+"_m");
    //buscar el elemento activo
    var id_=idm+"_content_";
    var nA = getActiveN(id_);
    //contar los id serializados
    var n = cprefix(id_);
    //Calcular elementos a derecha e izquierda
    var izq = parseInt(start)-parseInt(1);
    var der = parseInt(n)-parseInt(length)-parseInt(start)+parseInt(1);
    //Armar ol
    var res = '', result='';
    for(var i = start; i < parseInt(start)+parseInt(length); i++){res='';
      if(idExist(id_+i)){
        res=get_tmp({idm:idm,id:i},temp1)+SL;
        if(i===nA){res=str_replace('""','"active"',res);}
      }
      else{break;}
      result+=res+SL;
    }
    //Configurar arrows
    var arrw_l='', arrw_r='';
    //arrw_l
    if(!((izq==0) && (start==1 || start==0))){
      if((parseInt(start)-parseInt(step)-parseInt(1))>=0){
        arrw_l=get_tmp({start:(parseInt(start)-parseInt(step)),idm:idm,step:step,length:length},li_prev)+SL;
      }
      else{
        arrw_l=get_tmp({start:1,idm:idm,step:step,length:length},li_prev)+SL;
      }
    }
    //arrw_r
    if(!(der==0 || ((parseInt(start)+parseInt(step))>=n))){
      if(der>0){
        arrw_r=get_tmp({start:(parseInt(start)+parseInt(step)),idm:idm,step:step,length:length},li_next)+SL;
      }
    }
	document.getElementById('mobile-controller-'+idm).innerHTML='<ul>'+SL+arrw_l+result+arrw_r+SL+"</ul>";
    return(arrw_l+result+arrw_r); 
   //Accion
   
   }
   function svr(idm,id){"use strict";
    clearact(idm+"_"); $("#"+idm+"_"+id).addClass('active');
      ___clearact(idm); $("#"+idm+"_m"+id).addClass('active');
    cleardisplay(idm+"_content_");$("#"+idm+"_content_"+id).css("display","block");
    }
    function viewport_(){"use strict";
        var w = $(window).width();
        var h = $(window).height();
        $('.viewerport').text(h+'x'+w);
} 
//Templants
 var temp1   = '<li id="{{idm}}_m{{id}}" onclick="svr(´{{idm}}´,{{id}});" class="">{{id}}</li>';
 var li_next = '<li onclick="navar_mob_fix(´{{idm}}´,{{start}},{{length}},{{step}})">></li>';
 var li_prev = '<li onclick="navar_mob_fix(´{{idm}}´,{{start}},{{length}},{{step}})"><</li>';
 //Util
 var SL = '\n';

 /* END top-viewer */