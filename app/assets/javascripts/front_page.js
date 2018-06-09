jQuery(function() {
  jQuery.noConflict();
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
