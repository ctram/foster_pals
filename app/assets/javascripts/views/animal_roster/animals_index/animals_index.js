FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    // FIXME: collection of animals do not have a fosterer, even though they do in the animal rosterer view.
    console.log(this.collection.models.length);


    for (var i = 0; i < this.collection.models.length; i++) {
      var animal = this.collection.models[i];
      var org_id = animal.attributes.org_id;
      this.addAnimalItemView(animal);
    }
    this.listenTo(this.collection, 'sync', this.render);
  },

  events: {
    'mouseenter .animal-item-view': 'hightlightAnimalItem',
    'mouseleave .animal-item-view': 'toggleHighlightAnimalItem',
    'click .animal-item-view': 'toAnimalShow'
  },

  template: JST['animal_roster/animals_index/animals_index'],

  className: 'animals-index-view well',

  addAnimalItemView: function (animal) {
    // FIXME: all animals are listed on the org's animal roster, not just his own animals
    animal.fetch({
      success: function (model, response, options) {
        animal = model;
        var fosterer = animal.fosterer();
        var stay = animal.stay();
        var org = animal.org();

        var animalItemView = new FosterPals.Views.AnimalItem({
          animal: animal,
          fosterer: fosterer,
          stay: stay,
          org: org
        });
        this.addSubview('div.animals-list', animalItemView);
      }.bind(this)
    });




  },

  hightlightAnimalItem: function (event) {
    var $div = $(event.currentTarget);
    this.toggleHighlightAnimalItem(null, $div);
  },

  render: function () {
    var content = this.template({animals: this.collection});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  toAnimalShow: function (event) {
    var animalId = $(event.currentTarget).find('.animal-name').data('animal-id');
    Backbone.history.navigate('animals/' + animalId, {trigger: true});
  },

  toggleHighlightAnimalItem: function (event, $div) {
    if (event !== null) {
      $div = $(event.currentTarget);
    }
    $div.toggleClass('active-highlight');
  }

});
