FosterPals.Views.Confirmation = Backbone.CompositeView.extend({
  template: JST['users/scheduler/confirmation/confirmation'],

  className: 'confirmation-view',

  events: {
    'click button.to-map': 'toMap'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      reservations: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  toMap: function() {
    Backbone.history.navigate('search', { trigger: true });
  }
});
