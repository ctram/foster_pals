FosterPals.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',

  model: FosterPals.Models.User,

  getOrFetch: function(id) {
    var _this = this;
    var user = _this.get(id);

    if (user) {
      return Promise.resolve(user);
    }

    return new FosterPals.Models.User({ id: id }).fetch().then(function(user) {
      _this.add(user);
      return _this.get(user.id);
    });
  }
});

FosterPals.Collections.users = new FosterPals.Collections.Users();
