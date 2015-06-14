FosterPals.Views.AnimalRoster = Backbone.CompositeView.extend({

  template: JST['animal_roster/animal_roster'],

  className: 'animal-roster',

  initialize: function (options) {
    this.user = options.model;
    this.animals = options.collection;

    var addAnimalFormView = new FosterPals.Views.AddAnimalForm({
      model: this.user
    });
    this.addSubview('.add-animal', addAnimalFormView);

    // FIXME: when page is first loaded, AnimalsIndex does not show any animals - but if you refresh the page, it does.
    var animalsIndexView = new FosterPals.Views.AnimalsIndex({
      model: this.user,
      collection: this.animals
    });
    this.addSubview('.animals-roster', animalsIndexView);

    // this.listenTo(this.animals, 'sync remove change reset', this.render);
  },

  render: function () {
    var content = this.template({
      org: this.model
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
