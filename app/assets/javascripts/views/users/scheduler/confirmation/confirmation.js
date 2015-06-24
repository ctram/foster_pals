FosterPals.Views.Confirmation = Backbone.CompositeView.extend({
  template: JST['users/scheduler/confirmation/confirmation'],

  className: 'confirmation-view well col-md-8',

  events: {
    'click button.to-map': 'toMap'
  },

  initialize: function (options) {
    this.listenTo(this.collection, 'add sync', this.render);
  },

  render: function () {
    var content = this.template({
      stays: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  toMap: function (event) {
    Backbone.history.navigate('', {trigger: true});
  }

});
