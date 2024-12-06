$(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $("header").addClass("sticky");
      } else {
        $("header").removeClass("sticky");
      }
    });
    function newDate() {
      return new Date().getFullYear();
    }
    window.onload = function() {
      document.getElementById("autodate").innerHTML = newDate();
    };
  });
  