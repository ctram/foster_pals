FosterPals.Views.ValidationErrors = Backbone.CompositeView.extend({
  template: JST['validation_errors/validation_errors'],

  className: 'validation-errors-view',

  events: {},

  initialize: function(options) {
    if (options.manualErrors) {
      this.errors = options.manualErrors;
    } else {
      var errorsStr = options.response.responseText;
      var errorsChars = errorsStr.split('');
      errorsChars.pop();
      errorsChars.shift();
      this.errors = errorsChars.join('').split(',');
      for (var i = 0; i < this.errors.length; i++) {
        var error = this.errors[i].split('');
        error.pop();
        error.shift();
        this.errors[i] = error.join('');
      }
    }

    if (options.view === 'dates-picker') {
      // Add custom css class to this view for styling
      this.$el.addClass('dates-picker-errors');
    }
  },

  render: function() {
    var content = this.template({
      errors: this.errors
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
