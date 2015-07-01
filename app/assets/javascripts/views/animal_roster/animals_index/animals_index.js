FosterPals.Views.AnimalsIndex = Backbone.CompositeView.extend({
  initialize: function (options) {


    // HACK: Quick and dirty: have the newest animal at top of the list.
    // TODO: use collection comparators to flip the list.

    for (var i = this.collection.models.length - 1; i >= 0; i--) {

      var animal = this.collection.models[i];
      var org_id = animal.attributes.org_id;
      this.addAnimalItemView(animal);
    }
    // this.listenTo(this.collection, 'sync', this.render);
  },
// TODO: have mouse cursor change when hovering over an animal item -- also have a message that tells user to click on an animal to see images
  events: {
    'mouseenter .animal-item-view': 'hightlightAnimalItem',
    'mouseleave .animal-item-view': 'toggleHighlightAnimalItem',
    'click .animal-item-view': 'toAnimalShow'
  },

  template: JST['animal_roster/animals_index/animals_index'],

  className: 'animals-index-view well',

  addAnimalItemView: function (animal) {


    // NOTE: fetch not needed?
    // animal.fetch({
    //   success: function (model, response, options) {
    //
    //     animal = model;
    //     var fosterer = animal.fosterer();
    //     var stay = animal.stay();
    //     var org = animal.org();
    //
    //     var animalItemView = new FosterPals.Views.AnimalItem({
    //       animal: animal,
    //       fosterer: fosterer,
    //       stay: stay,
    //       org: org
    //     });
    //     this.addSubview('div.animals-list', animalItemView);
    //   }.bind(this)
    // });
    //


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
  },

  hightlightAnimalItem: function (event) {
    $('.gallery-help-msg').addClass('fadeInLeft').removeClass('display-none');
    setTimeout(function () {
      $('.gallery-help-msg').addClass('fadeOutRightBig');
    }, 3000);
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
