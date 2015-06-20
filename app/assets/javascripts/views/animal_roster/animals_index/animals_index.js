FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    for (var i = 0; i < this.collection.models.length; i++) {
      var model = this.collection.models[i];
      model.fetch({
        success: function () {
          this.addAnimalItemView(model);
        }.bind(this)
      });

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
    debugger

    var fosterer = model.fosterer();
    fosterer.fetch({
      animal: model,
      success: function (model, response, options) {
        debugger
        var animalItemView = new FosterPals.Views.AnimalItem({
          model: options.animal,
          fosterer: model[0]
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
