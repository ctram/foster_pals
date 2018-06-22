FosterPals.Views.AnimalProfile = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['animals/animal_profile/animal_profile'],

  className: 'animal-profile-view',

  render: function () {
    var content = this.template({
      animal: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

});
