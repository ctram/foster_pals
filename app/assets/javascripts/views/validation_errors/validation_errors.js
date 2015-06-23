FosterPals.Views.ValidationErrors = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.errors = options.model.responseJSON;
  },

  template: JST['validation_errors/validation_errors'],

  className: 'validation-errors-view animated faeInRight',

  events: {
  },

  render: function () {
    var content = this.template({
      errors: this.errors
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
