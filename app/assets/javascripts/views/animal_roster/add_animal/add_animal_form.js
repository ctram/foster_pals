FosterPals.Views.AddAnimalForm = Backbone.CompositeView.extend({

  template: JST['animal_roster/add_animal/add_animal_form'],

  className: 'add-animal',

  initialize: function (options) {
  },

  events: {
    'click button.add-animal-btn': 'addAnimal'
  },

  addAnimal: function (event) {
    var $button = $(event.target);
    var $form = $button.closest('form');
    var attrs = $form.serializeJSON();
    var animal = new FosterPals.Models.Animal(attrs);

  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
