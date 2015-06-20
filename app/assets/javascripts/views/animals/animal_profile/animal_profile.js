FosterPals.Views.AnimalProfile = Backbone.CompositeView.extend({
  initialize: function (options) {
  },

  template: JST['animals/animal_profile/animal_profile'],

  className: 'animal-profile-view',

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
