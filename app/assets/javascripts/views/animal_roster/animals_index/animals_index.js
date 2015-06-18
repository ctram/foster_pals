FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({

  template: JST['animal_roster/animals_index/animals_index'],

  className: 'animals-index-view well',

  initialize: function (options) {
    for (var i = 0; i < this.collection.models.length; i++) {
      var model = this.collection.models[i];
      this.addAnimalItemView(model);
    }
    this.listenTo(this.collection, 'add', this.addAnimalItemView);
    this.listenTo(this.collection, 'sync', this.render);
  },

  addAnimalItemView: function (model) {
    var animalItemView = new FosterPals.Views.AnimalItem({
      model: model
    });
    this.addSubview('div.animals-list', animalItemView);
  },

  render: function () {
    var content = this.template({animals: this.collection});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
