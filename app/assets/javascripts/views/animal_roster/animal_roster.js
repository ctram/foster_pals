FosterPals.Views.AnimalRoster = Backbone.CompositeView.extend({

  template: JST['animal_roster/animal_roster'],

  className: 'animal-roster',

  initialize: function (options) {
    this.user = options.model;

    var animalAddFormView = new FosterPals.Views.AnimalAddForm({
      model: this.user
    });
    this.addSubview('.add-animal', animalAddFormView);

    var animalsIndexView = new FosterPals.Views.AnimalsIndex({
      model: this.user,
      collection: this.animals
    });

  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
