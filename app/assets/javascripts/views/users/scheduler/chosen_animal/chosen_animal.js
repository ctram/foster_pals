FosterPals.Views.ChosenAnimal = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.animals = options.animals;
  },

  template: JST['users/scheduler/dates_picker/chosen_animal/chosen_animal'],

  className: 'chosen-animals-view',

  events: {
    // 'click .chosen-animal': 'removeAnimalView'
  },

  render: function () {
    var content = this.template({
      animal: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  removeAnimalView: function (event) {
    var $div = $(event.currentTarget);
    var animalId = parseInt($div.data('animal-id'));
    var animal = this.animals.getOrFetch(animalId);
    // TODO: left off here - code the removal of the chosen animal  - place it back into the other list.





    if (numSelected > 0 ) {
      for (var i = 0; i < numSelected; i++) {
        var $animal = $($selected[i]);
        var animalId = parseInt($animal.attr('animal_id'));
        var animal = this.animals.get(animalId);
        var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
          model: animal
        });
        this.addSubview('.chosen-animals-hook', chosenAnimalView);
        FosterPals.Events.trigger('removeAnimal', event);
      }
    }


  }
});
