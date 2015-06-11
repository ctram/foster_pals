FosterPals.Views.AboutForm = Backbone.CompositeView.extend({
  template: JST['users/info/about_form'],

  render: function () {
    var content = this.template({user: this.user})
    
  }
});
