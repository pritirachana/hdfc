var targetDate = new Date("March 25, 2021 09:00:00").getTime();

setInterval(function () {
  var presentTime = new Date().getTime();
  var gap = targetDate - presentTime;
  var seconds = 1000;
  var minutes = seconds * 60;
  var hours = minutes * 60;
  var days = hours * 24;

  var d = Math.floor(gap / days);
  var h = Math.floor((gap % days) / hours);
  var m = Math.floor((gap % hours) / minutes);
  var s = Math.floor((gap % minutes) / seconds);

  $(".clockBox:nth-child(1)").text(d);
  $(".clockBox:nth-child(2)").text(h);
  $(".clockBox:nth-child(3)").text(m);
  $(".clockBox:nth-child(4)").text(s);
}, 1000);
