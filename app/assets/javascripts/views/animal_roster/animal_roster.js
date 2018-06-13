FosterPals.Views.AnimalRoster = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.user = options.model;

    var addAnimalFormView = new FosterPals.Views.AddAnimalForm({
      model: this.user,
      animals: this.collection
    });
    this.addSubview('.add-animal', addAnimalFormView);

    var animalsIndexView = new FosterPals.Views.AnimalsIndex({
      model: this.user,
      collection: this.collection
    });
    this.addSubview('.animals-roster', animalsIndexView);

    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST['animal_roster/animal_roster'],

  className: 'animal-roster-view pt-5',

  render: function() {
    var content = this.template({
      org: this.model
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
