// activate link
$(document).ready(function () {
    // $('#sidebar').toggleClass('active');
//   $('#navbar li a').click(function(e) {

//       $('#navbar li.active').removeClass('active');

//       var $parent = $(this).parent();
//       $parent.addClass('active');
//       e.preventDefault();
//   });
// });
});

// $(window).on('resize', function() {
//     if (window.innerWidth < 991) {
//         document.documentElement.style.setProperty('overflow', 'hidden');
//         const metaViewport = document.querySelector('meta[name=viewport]');
//         metaViewport.setAttribute('content', 'height=' + initialHeight + 'px, width=device-width, initial-scale=1.0');
//         metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
//     }
// });
// $(window).on('resize', function() {
//     if (window.innerHeight < initialHeight) {
//         document.documentElement.style.setProperty('overflow', 'hidden')
//         viewport.setAttribute('content', 'height=' + Security.initialHeight + 'px, width=device-width, initial-scale=1.0')
//     }
// });

    var user_data = JSON.parse(localStorage.getItem("ngStorage-currentUser"));
    var img = user_data.country + ".svg";
    console.log(img);
    $('#username-box, #username-box-side, #username-box-side-newhover')
    .css("background", "url('images/flags/"+img+"')");


//scroll

$('#container1').scroll(function() {
    if ($('#container1').scrollTop() > 450) {
        $('#header-31').css('display', 'inline-block');
        $('#header-31').show();
    } else {
        $('#header-31').css('display', 'none');
    }
});

// right click disabled

// document.addEventListener("contextmenu", function(e){
//   e.preventDefault();
// }, false);

// navbar show/hide  

function view() {
    document.getElementById('container1').setAttribute('style', 'display:block');
    document.getElementById('container2').setAttribute('style', 'display:none');
    document.getElementById('container3').setAttribute('style', 'display:none');
    document.getElementById('container4').setAttribute('style', 'display:none');

}

function view1() {
    document.getElementById('container1').setAttribute('style', 'display:none');
    document.getElementById('container2').setAttribute('style', 'display:block');
    document.getElementById('container3').setAttribute('style', 'display:none');
    document.getElementById('container4').setAttribute('style', 'display:none');

}

function view2() {
    document.getElementById('container1').setAttribute('style', 'display:none');
    document.getElementById('container2').setAttribute('style', 'display:none');
    document.getElementById('container3').setAttribute('style', 'display:block');
    document.getElementById('container4').setAttribute('style', 'display:none');

}

function view3() {
    document.getElementById('container1').setAttribute('style', 'display:none');
    document.getElementById('container2').setAttribute('style', 'display:none');
    document.getElementById('container3').setAttribute('style', 'display:none');
    document.getElementById('container4').setAttribute('style', 'display:block');

}

(function($) {

    "use strict";
    var fullHeight = function() {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function() {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    });

})(jQuery);

$(document).ready(function() {
    $('[data-toggle="popover"]').popover();
});

$('body').on('click', function(e) {
    $('[data-toggle=popover]').each(function() {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

$('#link-style3').on('click', function view8() {
$('#sidebar').toggleClass('active');
$('#chat-container2').removeClass('active');
$('#chat-container1').addClass('active');
$('#chat-container3').removeClass('active');
document.getElementById('buttons-sidebar').setAttribute('style','display:flex');
document.getElementById('people').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:none');
document.getElementById('chat').setAttribute('style', 'display:block');
document.getElementById('chat-container1').setAttribute('style', 'display:flex');
document.getElementById('chat-container2').setAttribute('style', 'display:none');
document.getElementById('chat-container3').setAttribute('style', 'display:none');
document.getElementById('top-menu-1').setAttribute('style', 'display:block');
document.getElementById('top-menu-2').setAttribute('style', 'display:none');
document.getElementById('top-menu-3').setAttribute('style', 'display:none');
$('.list-style2').removeClass('active');
});


$('#link-style4').on('click', function view9() {
$('#sidebar').toggleClass('active');
$('#chat-container2').addClass('active');
$('#chat-container1').removeClass('active');
$('#chat-container3').removeClass('active');
document.getElementById('buttons-sidebar').setAttribute('style','display:flex');
document.getElementById('people').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:flex');
document.getElementById('chat').setAttribute('style', 'display:none');
document.getElementById('chat-container1').setAttribute('style', 'display:none');
document.getElementById('chat-container2').setAttribute('style', 'display:flex');
document.getElementById('chat-container3').setAttribute('style', 'display:none');
document.getElementById('top-menu-1').setAttribute('style', 'display:none');
document.getElementById('top-menu-2').setAttribute('style', 'display:block');
document.getElementById('top-menu-3').setAttribute('style', 'display:none');
$('.list-style2').removeClass('active');
});


$('#link-style5').on('click', function view10() {
$('#sidebar').toggleClass('active');
$('#chat-container2').removeClass('active');
$('#chat-container1').removeClass('active');
$('#chat-container3').addClass('active');
document.getElementById('buttons-sidebar').setAttribute('style','display:flex');
document.getElementById('people').setAttribute('style', 'display:block');
// document.getElementById('polls').setAttribute('style', 'display:none');
document.getElementById('chat').setAttribute('style', 'display:none');
document.getElementById('chat-container1').setAttribute('style', 'display:none');
// document.getElementById('chat-container2').setAttribute('style', 'display:none');
document.getElementById('chat-container3').setAttribute('style', 'display:flex');
document.getElementById('top-menu-1').setAttribute('style', 'display:none');
// document.getElementById('top-menu-2').setAttribute('style', 'display:none');
document.getElementById('top-menu-3').setAttribute('style', 'display:block');
$('.list-style2').removeClass('active');
});

function view5() {
    document.getElementById('people').setAttribute('style', 'display:none');
    document.getElementById('polls').setAttribute('style', 'display:none');
    document.getElementById('chat').setAttribute('style', 'display:block');
    document.getElementById('chat-msg').setAttribute('style', 'display:flex');
    document.getElementById('people-chat-msg').setAttribute('style', 'display:none');
    $('#chat-container2').removeClass('active');
    $('#chat-container3').removeClass('active');
}

function view6() {
    document.getElementById('people').setAttribute('style', 'display:none');
    document.getElementById('chat').setAttribute('style', 'display:none');
    document.getElementById('polls').setAttribute('style', 'display:flex');
    document.getElementById('people-chat-msg').setAttribute('style', 'display:none');
    $('#chat-container1').removeClass('active');
    $('#chat-container3').removeClass('active');
}

function view7() {
    console.log('sadasd');
    document.getElementById('chat').setAttribute('style', 'display:none');
    document.getElementById('polls').setAttribute('style', 'display:none');
    document.getElementById('people').setAttribute('style', 'display:block');
    document.getElementById('chat-msg').setAttribute('style', 'display:none');
    document.getElementById('people-text').setAttribute('style', 'display:block');
    document.getElementById('people-text3').setAttribute('style', 'display:none');
    document.getElementById('people-chat-msg').setAttribute('style', 'display:none');
    document.getElementById('people-chat-box').setAttribute('style', 'display:none');
    document.getElementById('search-bar-2').setAttribute('style', 'display:block');
    $('#chat-container2').removeClass('active');
    $('#chat-container1').removeClass('active');
}

// top bar icons

function top_chat(){
$('#chat-container2').removeClass('active');
$('#chat-container1').addClass('active');
$('#chat-container3').removeClass('active');
document.getElementById('buttons-sidebar').setAttribute('style','display:flex');
document.getElementById('people').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:none');
document.getElementById('chat').setAttribute('style', 'display:block');
document.getElementById('chat-container1').setAttribute('style', 'display:flex');
document.getElementById('chat-container2').setAttribute('style', 'display:none');
document.getElementById('chat-container3').setAttribute('style', 'display:none');
document.getElementById('top-menu-1').setAttribute('style', 'display:block');
document.getElementById('top-menu-2').setAttribute('style', 'display:none');
document.getElementById('top-menu-3').setAttribute('style', 'display:none');
$('.list-style2').removeClass('active');
}

function top_polls(){
$('#chat-container2').addClass('active');
$('#chat-container1').removeClass('active');
$('#chat-container3').removeClass('active');
document.getElementById('buttons-sidebar').setAttribute('style','display:flex');
document.getElementById('people').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:flex');
document.getElementById('chat').setAttribute('style', 'display:none');
document.getElementById('chat-container1').setAttribute('style', 'display:none');
document.getElementById('chat-container2').setAttribute('style', 'display:flex');
document.getElementById('chat-container3').setAttribute('style', 'display:none');
document.getElementById('top-menu-1').setAttribute('style', 'display:none');
document.getElementById('top-menu-2').setAttribute('style', 'display:block');
document.getElementById('top-menu-3').setAttribute('style', 'display:none');
$('.list-style2').removeClass('active');
}

function top_people(){
$('#chat-container2').removeClass('active');
$('#chat-container1').removeClass('active');
$('#chat-container3').addClass('active');
document.getElementById('buttons-sidebar').setAttribute('style','display:flex');
document.getElementById('people').setAttribute('style', 'display:block');
document.getElementById('polls').setAttribute('style', 'display:none');
document.getElementById('chat').setAttribute('style', 'display:none');
document.getElementById('chat-container1').setAttribute('style', 'display:none');
document.getElementById('chat-container2').setAttribute('style', 'display:none');
document.getElementById('chat-container3').setAttribute('style', 'display:flex');
document.getElementById('top-menu-1').setAttribute('style', 'display:none');
document.getElementById('top-menu-2').setAttribute('style', 'display:none');
document.getElementById('top-menu-3').setAttribute('style', 'display:block');
$('.list-style2').removeClass('active');
}

function view14() {
    document.getElementById('polls-text').setAttribute('style', 'display:block');
    document.getElementById('polls-text2').setAttribute('style', 'display:none');
}

function view15() {
    document.getElementById('polls-text').setAttribute('style', 'display:none');
    document.getElementById('polls-text2').setAttribute('style', 'display:block');
}


function view20(name, socket_id, country) {
    document.getElementById('people-text').setAttribute('style', 'display:none');
    document.getElementById('people-text3').setAttribute('style', 'display:block');
    document.getElementById('search-bar-2').setAttribute('style', 'display:none');
    document.getElementById('people-chat-box').setAttribute('style', 'display:flex');
    document.getElementById('people-chat-msg').setAttribute('style', 'display:flex');
    var res = name.split(" ");
    // var first_val = res[0].charAt(0).toLowerCase() + res[1].charAt(0).toLowerCase();;
    // var svg = "images/flags/" + country + ".svg";
    // $('#unique-people-name').attr('src', svg);
     $('#chat_name').text(name.charAt(0));
    $('.people-name3').text(name);
    $('#user_socket_id').text(socket_id);
    $('#new_message_'+socket_id).hide();
    var socket = io('https://avayaapis.virtex.in/IndividualExhibitionChat');
    var user = JSON.parse(localStorage.getItem("ngStorage-currentUser"));
    socket.emit("new_msgs_exhibitor_online_history", {"user_id" : user.id, "exhibitor_id" : socket_id});
}

function view21() {
    document.getElementById('people-text3').setAttribute('style', 'display:none');
    document.getElementById('people-text').setAttribute('style', 'display:flex');
    document.getElementById('people-chat-box').setAttribute('style', 'display:none');
    document.getElementById('people-chat-msg').setAttribute('style', 'display:none');
    document.getElementById('search-bar-2').setAttribute('style', 'display:block');
}

$(document).ready(function() {
    $('#buttons-sidebar ul li a').click(function(e) {
        $('#buttons-sidebar ul li.active').removeClass('active');
        var $parent = $(this).parent();
        $parent.addClass('active');
        e.preventDefault();
    });
});

// $(window).on('resize', function() {
//     if (window.innerWidth > 991) {
//         document.getElementById('sidebar-down').setAttribute('style', 'display:none');
//         document.getElementById('sidebar-up').setAttribute('style', 'display:none');
//         document.getElementById('sidebar').setAttribute('style', 'top:0vh');
//         document.getElementById('chat-msg').setAttribute('style', 'display:flex');
//         document.getElementById('people-chat-msg').setAttribute('style', 'display:flex');
//     }
// });


$('.chat-input').focus(function() {
    $('#chat-msg').css('border-top', '2px solid blue');
    $('#chat-msg').css('position', 'fixed');
    $('#chat-msg').css('bottom', '0');
    $('.chat-input').css('outline-color', 'none');
});

$('.chat-input').focusout(function() {
    $('#chat-msg').css('border-top', '0.1px solid #d6d6d6');
    $('#chat-msg').css('position', 'relative');
    $('.chat-input').css('outline-color', 'none');
});

$('.chat-input').focus(function() {
    $('#people-chat-msg').css('border-top', '2px solid blue');
    $('#people-chat-msg').css('position', 'fixed');
    $('#people-chat-msg').css('bottom', '0');
    $('.chat-input').css('outline-color', 'none');
});

$('.chat-input').focusout(function() {
    $('#people-chat-msg').css('border-top', '0.1px solid #d6d6d6');
    $('#people-chat-msg').css('position', 'relative');
    $('.chat-input').css('outline-color', 'none');
});



"use strict";

var switchButton = document.querySelector(".switch-button");
var switchBtnRight = document.querySelector(".switch-button-case.right");
var switchBtnLeft = document.querySelector(".switch-button-case.left");
var activeSwitch = document.querySelector(".active");

function switchLeft() {
    switchBtnRight.classList.remove("active-case");
    switchBtnLeft.classList.add("active-case");
    activeSwitch.style.left = "0%";
}

function switchRight() {
    switchBtnRight.classList.add("active-case");
    switchBtnLeft.classList.remove("active-case");
    activeSwitch.style.left = "50%";
}


function card(){
    $('.main-container-card').css('display','flex');
}
function close_card(){
    $('.main-container-card').css('display','none');

}

 function bgchange(){
     $('#container-pmo').css('background', 'url(images/pmo2.png)');
     $('#container-pmo').css('background-size', '100%');
 }
 function bgchange2(){
    $('#container-isa').css('background', 'url(images/lady.jpg)');
    $('#container-isa').css('background-size', '100%');
}

// speaker1
 function speaker1(){
     $('.speaker-pop-up1').css('top','0vh');
     $('.speaker-pop-up1').css('transition','ease-in 0.5s');

 }
 function close_speaker(){
    $('.speaker-pop-up1').css('top','100vh');
    $('.speaker-pop-up1').css('transition','ease-in 0.5s');

 }

 // speaker2
 function speaker2(){
    $('.speaker-pop-up2').css('top','0vh');
    $('.speaker-pop-up2').css('transition','ease-in 0.5s');

}
function close_speaker2(){
   $('.speaker-pop-up2').css('top','100vh');
   $('.speaker-pop-up2').css('transition','ease-in 0.5s');

}
 // speaker3
 function speaker3(){
    $('.speaker-pop-up3').css('top','0vh');
    $('.speaker-pop-up3').css('transition','ease-in 0.5s');

}
function close_speaker3(){
   $('.speaker-pop-up3').css('top','100vh');
   $('.speaker-pop-up3').css('transition','ease-in 0.5s');

}
 // speaker4
 function speaker4(){
    $('.speaker-pop-up4').css('top','0vh');
    $('.speaker-pop-up4').css('transition','ease-in 0.5s');

}
function close_speaker4(){
   $('.speaker-pop-up4').css('top','100vh');
   $('.speaker-pop-up4').css('transition','ease-in 0.5s');

}
 // speaker5
 function speaker5(){
    $('.speaker-pop-up5').css('top','0vh');
    $('.speaker-pop-up5').css('transition','ease-in 0.5s');

}
function close_speaker5(){
   $('.speaker-pop-up5').css('top','100vh');
   $('.speaker-pop-up5').css('transition','ease-in 0.5s');

}
 // speaker6
 function speaker6(){
    $('.speaker-pop-up6').css('top','0vh');
    $('.speaker-pop-up6').css('transition','ease-in 0.5s');

}
function close_speaker6(){
   $('.speaker-pop-up6').css('top','100vh');
   $('.speaker-pop-up6').css('transition','ease-in 0.5s');

}
 // speaker7
 function speaker7(){
    $('.speaker-pop-up7').css('top','0vh');
    $('.speaker-pop-up7').css('transition','ease-in 0.5s');

}
function close_speaker7(){
   $('.speaker-pop-up7').css('top','100vh');
   $('.speaker-pop-up7').css('transition','ease-in 0.5s');

}
 // speaker8
 function speaker8(){
    $('.speaker-pop-up8').css('top','0vh');
    $('.speaker-pop-up8').css('transition','ease-in 0.5s');

}
function close_speaker8(){
   $('.speaker-pop-up8').css('top','100vh');
   $('.speaker-pop-up8').css('transition','ease-in 0.5s');

}
//  pmo

function close_pmo(){
    $('#video-pmo-pop').css('display','none');
}


function pmo_video(){
    $('#video-pmo-pop').css('display','flex');

}
$(function () {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
  });

  function open_languages(){
    $('.languages-pop').css('display','flex'); 
  }
  function close_language(){
      $('.languages-pop').css('display','none');
  }


// hide network
setTimeout(function() {
    $('.network-slide').fadeOut('fast');
  }, 4000);

  function form_cafe(){
    $('.form-pop-up').css('display','flex');
  }
  function close_form(){
    $('.form-pop-up').css('display','none');
  }

  function lefttoggle_jury(){
    $('.left-jury').addClass('active3');
    $('.right-jury').removeClass('active3');
    $('#left-jury-image').css('display','block');
    $('#right-jury-image').css('display','none');
    }
    
function righttoggle_jury(){
    $('.left-jury').removeClass('active3');
    $('.right-jury').addClass('active3');
    $('#left-jury-image').css('display','none');
    $('#right-jury-image').css('display','block');

}
function tab1(){
    $('#tab-content1').css('display','block');
    $('#tab-content2').css('display','none');
    $('#tab-content3').css('display','none');
    $('#day1').addClass('active');
    $('#day2').removeClass('active');
    $('#day3').removeClass('active');
}
function tab2(){
    $('#tab-content2').css('display','block');
    $('#tab-content3').css('display','none');
    $('#tab-content1').css('display','none');
    $('#day2').addClass('active');
    $('#day1').removeClass('active');
    $('#day3').removeClass('active');

}
function tab3(){
    $('#tab-content3').css('display','block');
    $('#tab-content2').css('display','none');
    $('#tab-content1').css('display','none');
    $('#day3').addClass('active');
    $('#day1').removeClass('active');
    $('#day2').removeClass('active');

}

function lefttoggle(){
    $('.left').addClass('active3');
    $('.right1').removeClass('active3');
    $('.right2').removeClass('active3');
    $('.right3').removeClass('active3');
    $('.right4').removeClass('active3');
    $('.right5').removeClass('active3');
    $('.right6').removeClass('active3');
    $('.right7').removeClass('active3');
    $('.right8').removeClass('active3');
    $('.right9').removeClass('active3');
    $('.right10').removeClass('active3');
    $('.right11').removeClass('active3');
    $('#left-image').css('display','block');
    $('#right-image1').css('display','none');
    $('#right-image2').css('display','none');
    $('#right-image3').css('display','none');
    $('#right-image4').css('display','none');
    $('#right-image5').css('display','none');
    $('#right-image6').css('display','none');
    $('#right-image7').css('display','none');
    $('#right-image8').css('display','none');
    $('#right-image9').css('display','none');
    $('#right-image10').css('display','none');
    $('#right-image11').css('display','none');
    }
    
    function righttoggle1(){
        $('.right1').addClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','block');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    
    }
    function righttoggle2(){
        $('.right1').removeClass('active3');
        $('.right2').addClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','block');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    }
    function righttoggle3(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').addClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','block');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    }
    function righttoggle4(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').addClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','block');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    }
    function righttoggle5(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').addClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','block');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    }
    function righttoggle6(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').addClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','block');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    }
    function righttoggle7(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').addClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','block');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    }
    function righttoggle8(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').addClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','block');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    }
    function righttoggle9(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').addClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','block');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','none');
    }
    function righttoggle10(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').addClass('active3');
        $('.right11').removeClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','block');
        $('#right-image11').css('display','none');
    }
    function righttoggle11(){
        $('.right1').removeClass('active3');
        $('.right2').removeClass('active3');
        $('.right3').removeClass('active3');
        $('.right4').removeClass('active3');
        $('.left').removeClass('active3');
        $('.right5').removeClass('active3');
        $('.right6').removeClass('active3');
        $('.right7').removeClass('active3');
        $('.right8').removeClass('active3');
        $('.right9').removeClass('active3');
        $('.right10').removeClass('active3');
        $('.right11').addClass('active3');
        $('#left-image').css('display','none');
        $('#right-image1').css('display','none');
        $('#right-image2').css('display','none');
        $('#right-image3').css('display','none');
        $('#right-image4').css('display','none');
        $('#right-image5').css('display','none');
        $('#right-image6').css('display','none');
        $('#right-image7').css('display','none');
        $('#right-image8').css('display','none');
        $('#right-image9').css('display','none');
        $('#right-image10').css('display','none');
        $('#right-image11').css('display','block');
    }




    function resources(){
        $('.resource-main').css('display','flex');
    }
    function close_data(){
        $('.resource-main').css('display','none');
        $('.video-main').css('display','none');
        $('.brochure-main').css('display','none');
    }
    function boothvideo(){
        $('.video-main').css('display','flex');
    }
    function boothbrochure(){
        $('.brochure-main').css('display','flex');
    }

function meeting_pop_up(){
    $('.meeting-popup').css('display','flex');
}
function close_meeting(){
    $('.meeting-popup').css('display','none');
}
function quiz_pop_up(){
    $('.quiz-popup').css('display','flex');

}
function close_quiz(){
    $('.quiz-popup').css('display','none');

}
function open_video_modal(src){
    $('#myModal').modal({
        backdrop: 'static',
        keyboard:false
    });
    $('.video_body').empty().append('<iframe src='+src+' autoplay></iframe>');
}

function closeModal(){
    console.log('video closed');
    $('#myModal').modal('hide');
    $('.video_body').empty().append('<iframe src="" autoplay></iframe>');
}
    
// Stalls Games
    
function open_gameOrg(){
    $('#gameModal').modal('show');
    $('#gameModal2').modal('hide');
    $('#myFrame').attr({src: 'https://gogames.run/h5games/barrier/index.html', frameborder:0, scrolling: 'no'});   
}

function open_gameFresh(){
    $('#gameModal').modal('show');
    $('#gameModal2').modal('hide');
    $('#myFrame').attr({src: 'https://gogames.run/h5games/GoBowling2/index.html', frameborder:0, scrolling: 'no'});   
}

function open_gameMe(){
    $('#gameModal').modal('show');
    $('#gameModal2').modal('hide');
    $('#myFrame').attr({src: 'https://gogames.run/h5games/FastDriver/index.html', frameborder:0, scrolling: 'no'});   
}

function open_gameSedo(){
    $('#gameModal').modal('show');
    $('#gameModal2').modal('hide');
    $('#myFrame').attr({src: 'https://gogames.run/h5games/master%20games/Mobile_game/miniracer/index.html', frameborder:0, scrolling: 'no'});   
}

function open_gameRc(){
    $('#gameModal').modal('show');
    $('#gameModal2').modal('hide');
    $('#myFrame').attr({src: 'https://gogames.run/h5games/Penalty/index.html', frameborder:0, scrolling: 'no'});   
}

function open_gameHg(){
    $('#gameModal').modal('show');
    $('#gameModal2').modal('hide');
    $('#myFrame').attr({src: 'https://gogames.run/h5games/con3/Rock%20Paper%20Scissors/', frameborder:0, scrolling: 'no'});   
}

function open_gameGoogle(){
    $('#gameModal').modal('show');
    $('#gameModal2').modal('hide');
    $('#myFrame').attr({src: 'https://gogames.run/h5games/VolleyBall/index.html', frameborder:0, scrolling: 'no'});   
}

function open_gameBlue(){
    $('#gameModal').modal('show');
    $('#gameModal2').modal('hide');
    $('#myFrame').attr({src: 'https://gogames.run/h5games/master%20games/Mobile_game/ninjarun/index.html', frameborder:0, scrolling: 'no'});   
}

function open_demoBlue(){
    $('#demosModal').modal('show');
    $('#demosModal2').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/BluehostDemoroom', frameborder:0, scrolling: 'no'});   
}

function open_demoOrg(){
    $('#demosModal').modal('show');
    $('#demosModal2').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/OrgDemoroom', frameborder:0, scrolling: 'no'});   
}

function open_demoRc(){
    $('#demosModal').modal('show');
    $('#demosModal2').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/ResellerClubDemoroom', frameborder:0, scrolling: 'no'});   
}

function open_demoFresh(){
    $('#demosModal').modal('show');
    $('#demosModal2').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/FreshworksDemoroom', frameborder:0, scrolling: 'no'});   
}

function open_demoGoogle(){
    $('#demosModal').modal('show');
    $('#demosModal2').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/GoogleCloudDemoroom', frameborder:0, scrolling: 'no'});   
}

// Scale

function open_demoScale1(){
    $('#demosModal').modal('show');
    $('#demosModal3').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/ScaleTable1', frameborder:0, scrolling: 'no'});   
}
function open_demoScale2(){
    $('#demosModal').modal('show');
    $('#demosModal4').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/ScaleTable2', frameborder:0, scrolling: 'no'});   
}
function open_demoScale3(){
    $('#demosModal').modal('show');
    $('#demosModal5').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/ScaleTable3', frameborder:0, scrolling: 'no'});   
}
function open_demoScale4(){
    $('#demosModal').modal('show');
    $('#demosModal6').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/ScaleTable4', frameborder:0, scrolling: 'no'});   
}
function open_demoScale5(){
    $('#demosModal').modal('show');
    $('#demosModal7').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/ScaleTable5', frameborder:0, scrolling: 'no'});   
}

// Presence

function open_demoPresence1(){
    $('#demosModal').modal('show');
    $('#demosModal3').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/PresenceTable1', frameborder:0, scrolling: 'no'});   
}
function open_demoPresence2(){
    $('#demosModal').modal('show');
    $('#demosModal4').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/PresenceTable2', frameborder:0, scrolling: 'no'});   
}
function open_demoPresence3(){
    $('#demosModal').modal('show');
    $('#demosModal5').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/PresenceTable3', frameborder:0, scrolling: 'no'});   
}
function open_demoPresence4(){
    $('#demosModal').modal('show');
    $('#demosModal6').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/PresenceTable4', frameborder:0, scrolling: 'no'});   
}
function open_demoPresence5(){
    $('#demosModal').modal('show');
    $('#demosModal7').modal('hide');
    $('#demo-iframe').attr({src: 'https://meetings.virtex.in/PresenceTable5', frameborder:0, scrolling: 'no'});   
}

function show_pfield(sel){
    if(sel.value == 1){
      $("#pfield").css('display','block');
    }
    else{
      $("#pfield").css('display','none');
    }
  } 


function updateCalender(obj) {
	console.log($(obj).attr("data-google"));
	$('#calender_google').attr("href", $(obj).attr("data-google"));
	$('#calender_apple').attr("href", $(obj).attr("data-apple"));
	$('#calender_outlookcom').attr("href", $(obj).attr("data-outlookcom"));
	$('#calender_outlook').attr("href", $(obj).attr("data-outlook"));
	
}

function gamification (slug) {
	var user_data = JSON.parse(localStorage.getItem("ngStorage-currentUser"));
	console.log(user_data);
	$.ajax({
		url: "",
		method : "POST",
		data : {user_id:user_data.id,event_type:"user_activity",activity_type:slug},
		success : function (response) {
			console.log(response);
		}
	});
}


function tobottom(){

    var objDiv = document.getElementById("sidebar-icons");
    objDiv.scrollTop = objDiv.scrollHeight;										 
}
function tobottom2(){

    var objDiv = document.getElementById("nav-menu");
    objDiv.scrollTop = objDiv.scrollHeight;										 
}


function closeModal(obj) {
    console.log(obj);
    $('#myFrame').attr("src", "about:blank");
    $('#demo-iframe').attr("src", "about:blank");
    $('#game-iframe').empty();
    $('#demo-iframe').empty();
}

$('#linksModal').modal({backdrop: 'static', keyboard: false});
$('#videosModal').modal({backdrop: 'static', keyboard: false});
$('#demosModal').modal({backdrop: 'static', keyboard: false});
$('#demosModal2').modal({backdrop: 'static', keyboard: false});
$('#formModal').modal({backdrop: 'static', keyboard: false});
$('#gameModal2').modal({backdrop: 'static', keyboard: false});
$('#gameModal').modal({backdrop: 'static', keyboard: false});