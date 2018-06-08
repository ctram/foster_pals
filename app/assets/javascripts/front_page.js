$(function() {
  // for smooth scroll when clicking on the 'learn more' button
  // $('a[href*=#]:not([href=#])').click(function () {
  //   if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
  //     var target = $(this.hash);
  //     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  //     if (target.length) {
  //       $('html,body').animate({
  //         scrollTop: target.offset().top
  //       }, 1000);
  //       return false;
  //     }
  //   }
  // });

  jQuery.noConflict();
  // $('#myModal').modal()

  jQuery('.carousel').carousel();

  jQuery('a.modal-off').on('click', function(event) {
    event.preventDefault();
    jQuery('.modal').modal('hide');
  });

  jQuery('a.sign-in').on('click', function(event) {
    event.preventDefault();
    window.location = '/sign-in-as-guest';
  });
});
