FosterPals.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',

  model: FosterPals.Models.User,

  getOrFetch: function (id) {
    var users = this;
    var user = users.get(id);
    if (!user) {
      user = new FosterPals.Models.User({id: id});
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }
    return user;
  }
});

FosterPals.Collections.users = new FosterPals.Collections.Users();
