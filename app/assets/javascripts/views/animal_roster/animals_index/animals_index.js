FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({

  template: JST['animal_roster/animals_index/animals_index'],

  className: 'animals-index well',

  initialize: function (options) {
    // FIXME: the listener to the collection of animals is never triggered!!!!!!!
    this.listenTo(this.collection, 'add', this.addAnimalItemView);
    this.listenTo(this.collection, 'sync remove reset change', this.render);

    // TEST
    // var testView = new FosterPals.Views.Test();
    // var testView2 = new FosterPals.Views.Test();
    // this.addSubview('ul', testView);
    // this.addSubview('ul', testView2);
    // END TEST ////////////////////
  },

  addAnimalItemView: function (model) {
    // FIXME: NEVER GETTING TRIGGERED!
    var animalItemView = new FosterPals.Views.AnimalItem({
      model: model
    });
    this.addSubview('ul', animalItemView);
  },

  render: function () {
    var content = this.template({animals: this.collection});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

});
