$(function () {

  $('.button-collapse').sideNav({
    closeOnClick: true
  });
  $('.parallax').parallax();

  // var navOffset = $('#navbar').offset().top


  $('.nav-placeholder').height($('nav').outerHeight())

  // $(window).scroll(function() {
  //   var scrollPos = $(window).scrollTop()
  //
  //   if (scrollPos >= navOffset) {
  //     $('#navbar').addClass('fixed z-depth-3')
  //   } else {
  //     $('#navbar').removeClass('fixed z-depth-3')
  //   }
  // })

  $('nav').pushpin({
    top: $('nav').offset().top,

  });

  try {
    "repeat" in String.prototype && window.console.log("\n%cHi!\n\n%cI am for hire – I do more than copy & paste from stackoverflow.\n\n%chttp://www.github.com/zee-german%c \n\n", "font-family: Georgia, serif; font-size: 32px; color: #0074d9", "font-family: Georgia, serif; font-size: 16px; color: #111111", "font-family: Helvetica Neue, sans-serif; font-size: 16px; text-decoration: none; line-height: 1.2rem; color: #0074d9", "")
  } catch (E) {}


});
