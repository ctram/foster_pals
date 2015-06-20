FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    for (var i = 0; i < this.collection.models.length; i++) {
      var model = this.collection.models[i];
      this.addAnimalItemView(model);
    }
    this.listenTo(this.collection, 'add', this.addAnimalItemView);
    this.listenTo(this.collection, 'sync', this.render);
  },

  events: {
    'mouseenter .animal-item-view': 'hightlightAnimalItem',
    'mouseleave .animal-item-view': 'toggleHighlightAnimalItem',
    'click .animal-item-view': 'toAnimalShow'
  },

  template: JST['animal_roster/animals_index/animals_index'],

  className: 'animals-index-view well',

  addAnimalItemView: function (model) {
    var animalItemView = new FosterPals.Views.AnimalItem({
      model: model
    });
    this.addSubview('div.animals-list', animalItemView);
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
    
  },

  toggleHighlightAnimalItem: function (event, $div) {
    if (event !== null) {
      $div = $(event.currentTarget);
    }
    $div.toggleClass('active-highlight');
  }

});
