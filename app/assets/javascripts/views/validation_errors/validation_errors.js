FosterPals.Views.ValidationErrors = Backbone.CompositeView.extend({
  initialize: function (options) {
    if (options.manualErrors) {
      this.errors = options.manualErrors;
    } else {
      errorsStr = options.response.responseText;
      errorsChars = errorsStr.split('');
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
  },

  template: JST['validation_errors/validation_errors'],

  className: 'validation-errors-view animated fadeInRight',

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
