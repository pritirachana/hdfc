// activate link
$(document).ready(function () {
  $('#navbar li a').click(function(e) {

      $('#navbar li.active').removeClass('active');

      var $parent = $(this).parent();
      $parent.addClass('active');
      e.preventDefault();
  });
});

//scroll

$('#container1').scroll(function() {
if ($('#container1').scrollTop() > 450) {
    $('#header-31').css('display','inline-block');
    $('#header-31').show();
}
else {
  $('#header-31').css('display','none');
}
});

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
    $(window).resize(function(){
      $('.js-fullheight').css('height', $(window).height());
    });

  };
  fullHeight();

  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);  

$(document).ready(function(){
  $('[data-toggle="popover"]').popover();   
});

$('body').on('click', function (e) {
$('[data-toggle=popover]').each(function () {
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
document.getElementById('people').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:none');
document.getElementById('chat').setAttribute('style', 'display:block');
});


$('#link-style4').on('click', function view9() {
$('#sidebar').toggleClass('active');
$('#chat-container2').addClass('active');
$('#chat-container1').removeClass('active');
$('#chat-container3').removeClass('active');
document.getElementById('people').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:block');
document.getElementById('chat').setAttribute('style', 'display:none');
});
$('#link-style5').on('click', function view10() {
$('#sidebar').toggleClass('active');
$('#chat-container2').removeClass('active');
$('#chat-container1').removeClass('active');
$('#chat-container3').addClass('active');
document.getElementById('people').setAttribute('style', 'display:block');
document.getElementById('polls').setAttribute('style', 'display:none');
document.getElementById('chat').setAttribute('style', 'display:none');
});

function view5() {
document.getElementById('people').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:none');
document.getElementById('chat').setAttribute('style', 'display:block');
}
function view6() {
document.getElementById('people').setAttribute('style', 'display:none');
document.getElementById('chat').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:block');
}
function view7() {
document.getElementById('chat').setAttribute('style', 'display:none');
document.getElementById('polls').setAttribute('style', 'display:none');
document.getElementById('people').setAttribute('style', 'display:block');
}
function view12(){
document.getElementById('people-text').setAttribute('style', 'display:block');
document.getElementById('people-text2').setAttribute('style', 'display:none');

}
function view13(){
document.getElementById('people-text').setAttribute('style', 'display:none');
document.getElementById('people-text2').setAttribute('style', 'display:block');

}
function view14(){
document.getElementById('polls-text').setAttribute('style', 'display:block');
document.getElementById('polls-text2').setAttribute('style', 'display:none');
}
function view15(){
document.getElementById('polls-text').setAttribute('style', 'display:none');
document.getElementById('polls-text2').setAttribute('style', 'display:block');
}
function down(){
document.getElementById('sidebar').setAttribute('style', 'top:94vh');
document.getElementById('sidebar-up').setAttribute('style', 'display:block');
document.getElementById('sidebar-down').setAttribute('style', 'display:none');
}
function up(){
document.getElementById('sidebar').setAttribute('style', 'top:40vh');
document.getElementById('sidebar-up').setAttribute('style', 'display:none');
document.getElementById('sidebar-down').setAttribute('style', 'display:block');
}

$(document).ready(function () {
$('#buttons-sidebar ul li a').click(function(e) {
    $('#buttons-sidebar ul li.active').removeClass('active');
    var $parent = $(this).parent();
    $parent.addClass('active');
    e.preventDefault();
});
});


$(window).on('resize', function() {
if (window.innerWidth < 769) {
  document.getElementById('sidebar-down').setAttribute('style', 'display:block');
  document.getElementById('sidebar-up').setAttribute('style', 'display:none');
}
});

$(window).on('resize', function() {
if (window.innerWidth > 769) {
  document.getElementById('sidebar-down').setAttribute('style', 'display:none');
  document.getElementById('sidebar-up').setAttribute('style', 'display:none');
}
});

$('.chat-input').focus(function() {
$('#chat-msg').css('border-top','2px solid blue');
$('.chat-input').css('outline-color','none');
});

$('.chat-input').focusout(function() {
$('#chat-msg').css('border-top','0.1px solid #d6d6d6');
$('.chat-input').css('outline-color','none');
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

switchBtnLeft.addEventListener(
"click",
function () {
  switchLeft();
},
false
);

switchBtnRight.addEventListener(
"click",
function () {
  switchRight();
},
false
);


var switchButton2 = document.querySelector(".switch-button2");
var switchBtnRight2 = document.querySelector(".switch-button-case2.right");
var switchBtnLeft2 = document.querySelector(".switch-button-case2.left");
var activeSwitch2 = document.querySelector(".active2");

function switchLeft2() {
switchBtnRight2.classList.remove("active-case2");
switchBtnLeft2.classList.add("active-case2");
activeSwitch2.style.left = "0%";
}

function switchRight2() {
switchBtnRight2.classList.add("active-case2");
switchBtnLeft2.classList.remove("active-case2");
activeSwitch2.style.left = "50%";
}

switchBtnLeft2.addEventListener(
"click",
function () {
  switchLeft2();
},
false
);

switchBtnRight2.addEventListener(
"click",
function () {
  switchRight2();
},
false
);