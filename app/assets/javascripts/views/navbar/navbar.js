FosterPals.Views.Navbar = Backbone.CompositeView.extend({
  template: JST['navbar/navbar'],

  className: '.container',

  events: {
    'click button#sign-out-btn': 'signOut'
  },

  signOut: function (event) {
    debugger;
    $.ajax(
      {
        url: '/session',
        type: 'DELETE',
        success: function () {
          window.location = '/session/new';
        }
      }
    );
  },



  initialize: function (options) {
    this.router = options.router;

    this.listenTo(this.router, '', this.render);
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    return this;
  }
});
