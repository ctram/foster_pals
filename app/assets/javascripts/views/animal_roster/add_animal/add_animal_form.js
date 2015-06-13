FosterPals.Views.AddAnimalForm = Backbone.CompositeView.extend({

  template: JST['animal_roster/add_animal/add_animal_form'],

  className: 'add-animal',

  initialize: function (options) {
  },

  events: {
    'click button.add-animal-btn': 'addAnimal'
  },

  addAnimal: function (event) {
    // TODO add images of animals - user cloudinary
    // TODO add images of users
    // FIXME: why list of animals aren't showing.
    var $button = $(event.target);
    var $form = $button.closest('form');
    var animal = $form.serializeJSON();
    var attrs = animal.animal;
    $.ajax(
      '/api/animals',
      {
        data: animal,
        method: 'POST',
        success: function () {
          var animal = new FosterPals.Models.Animal(attrs);
          this.animals.add(animal, {merge: true});
        }.bind(this)
      }
    );

  },

  render: function () {
    var content = this.template({});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },



});
