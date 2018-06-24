FosterPals.Views.ScheduleManagerItem = Backbone.CompositeView.extend({
  template: JST['schedule_manager/schedule_manager_item/schedule_manager_item'],

  className: 'schedule-manager-item-view px-3 py-4 mb-3 item-view',

  initialize: function(options) {
    var _this = this;
    _this.org = options.org;
    _this.stay = options.stay;
    _this.user = options.user;

    $.ajax('/api/stays/' + _this.stay.id)
      .then(function(stay) {
        return stay.animals.forEach(function(animal) {
          _this.addAnimalView(new FosterPals.Models.Animal(animal));
        });
      })
      .then(function() {
        return _this.render();
      });
  },

  addAnimalView: function(animal) {
    var animalItemView = new FosterPals.Views.ScheduleAnimalItem({
      model: animal,
      user: this.user
    });
    this.addSubview('.animal-item-hook', animalItemView);
  },

  render: function() {
    var content = this.template({
      org: this.org,
      stay: this.stay
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
