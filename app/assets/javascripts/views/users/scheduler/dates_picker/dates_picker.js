FosterPals.Views.DatesPicker = Backbone.CompositeView.extend({
  initialize: function (options) {
    datesPickerGeneratedCounter++;
    console.log('dates picker generated');
    console.log(datesPickerGeneratedCounter);
    this.currentUser = options.currentUser;
    this.checkOutInputToggled = false;

    var animalRosterSelectorView = new FosterPals.Views.AnimalRosterSelector({
      currentUser: this.currentUser
    });
    this.addSubview('.animal-roster-hook', animalRosterSelectorView);
  },

  template: JST['users/scheduler/dates_picker/dates_picker'],

  className: 'dates-picker well col-md-8 asdasdasd',

  events: {
    'click input#indefinite-stay-checkbox' : 'lockCheckOutInput',
    'mouseenter .selector-toggler': 'toggleAnimalRoster',
    'mouseleave #selector': 'toggleAnimalRoster',
    'mouseenter div.animal-selector-item': 'toggleAnimalItemHighlight',
    'mouseleave div.animal-selector-item': 'toggleAnimalItemHighlight',
    'mouseleave #selector': 'populateChosenAnimals',
  },

  lockCheckOutInput: function () {
    var $checkOutGroup = $('.check-out-group');
    $checkOutGroup.toggleClass('lock-check-out');
    this.toggleCheckOutInput();
  },

  render: function () {
    var content = this.template({
      user: this.model,
      currentUser: this.currentUser
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  populateChosenAnimals: function (event) {
    // Clear previously chosen animals
    var chosenAnimalViews = this.subviews('.chosen-animals-hook')._wrapped;
    if (chosenAnimalViews.length > 0) {
      for (var i = 0; i < chosenAnimalViews.length; i++) {
        var chosenAnimalView = chosenAnimalViews[i];

        this.removeSubview('.chosen-animals-hook', chosenAnimalView);
      }

    }



    $chosenAnimals = $('.ui-selected');

    if ($chosenAnimals.length > 0) {
      successCallback = function (collection, response, options) {
        $chosenAnimals = options.$chosenAnimals;
        animals = collection;
        for (var i = 0; i < $chosenAnimals.length; i++) {
          $animal = $($chosenAnimals[i]);
          var animalId = parseInt($animal.attr('animal_id'));
          var animal = animals.where({id: animalId})[0];
          var chosenAnimalView = new FosterPals.Views.ChosenAnimal({
            model: animal
          });
          this.addSubview('.chosen-animals-hook', chosenAnimalView);
        }
      }.bind(this);
      var animals = this.currentUser.animals_as_org();
      animals.fetch({
        success: successCallback,
        $chosenAnimals: $chosenAnimals
      });
    }


  },

  showConfirmation: function (stays) {
    animalRosterSelectorView = this.subviews('.animal-roster-hook');
    animalRosterSelectorView.remove();
    var confirmationView = new FosterPals.Views.Confirmation({
      collection: stays
    });
    this.addSubview('.animal-roster-hook', confirmationView);
  },

  toggleAnimalItemHighlight: function (event) {
    $div = $(event.currentTarget);
    $div.toggleClass('active-item');
  },

  toggleAnimalRoster: function (event) {
    $('.selector-toggler').toggleClass('display-none');
    $('.animal-roster-hook').toggleClass('display-none');
  },

  toggleCheckOutInput: function () {
    var $checkOut = $('#check-out');
    var checkOutInput = $checkOut.data("DateTimePicker");
    if (!this.checkOutInputToggled) {

      checkOutInput.disable();
    } else {
      checkOutInput.enable();
    }
    this.checkOutInputToggled = !this.checkOutInputToggled;
  },
  // toggleSelectedColoring: function (event) {
  //
  //   console.log('from toggle selected coloring');
  //   this.toggleChosenAnimal(event);
  //   $div = $(event.currentTarget);
  //   $div.toggleClass('selected-item');
  // },
});

datesPickerGeneratedCounter = 0;
