FosterPals.Views.Navbar = Backbone.CompositeView.extend({
  template: JST['navbar/navbar'],

  className: 'navbar-view',

  events: {
    'click nav a': 'clickLink'
    // 'submit form#location-search-form': 'invokeSearch' // using global listener in initialize to fix quirky
    // wherein this listener is disabled after navigation to different route.
  },

  initialize: function(options) {
    this.router = options.router;
    document.addEventListener(
      'submit',
      function(e) {
        this.invokeSearch(e);
      }.bind(this)
    );
  },

  clickLink: function(event) {
    $('li').removeClass('active');
    var $destLi = $(event.currentTarget.parentElement);
    $destLi.addClass('active');
  },

  invokeSearch: function(event) {
    event.preventDefault();
    
    $('li').removeClass('active');
    var search_location = $('form')
      .find('input')
      .val();

    if ($('.map-hook').length === 0) {
      this.router.search(search_location);
    } else {
      FosterPals.Events.trigger('pan', search_location);
    }
  },

  render: function() {
    var content = this.template({});
    this.$el.html(content);
    return this;
  }
});
