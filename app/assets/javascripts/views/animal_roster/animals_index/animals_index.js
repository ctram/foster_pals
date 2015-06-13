FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({

  template: JST['animal_roster/animals_index/animals_index'],

  className: 'animals-index well',

  initialize: function (options) {

    this.listenTo(this.collection, 'add', this.addAnimalItemView);
    this.listenTo(this.collection, 'sync remove reset change', this.render);
  },

  addAnimalItemView: function (model) {

    var animalItemView = new FosterPals.Views.AnimalItem({
      model: model
    });
    this.addSubview('ul', animalItemView);
  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});


// FIXME: List is broken!!!!
