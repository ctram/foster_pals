window.FosterPals = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  SearchResults: {},
  UserId: null,
  Events: {},
  map: {},
  initialize: function() {
    var currentUser = FosterPals.Collections.users.getOrFetch(CURRENT_USER_ID);
    var currentUserId = CURRENT_USER_ID;
    var router = new FosterPals.Routers.Router({
      $rootEl: $('#content'),
      users: FosterPals.Collections.users,
      currentUser: currentUser,
      //  TODO: remove currentUserId -- not needed because you already have currentUser -- make sure it doesn't break after the remove.
      currentUserId: currentUserId
    });
    var navbarView = new FosterPals.Views.Navbar({
      router: router
    });
    $('.navbar-wrapper').html(navbarView.render().$el);
    _.extend(FosterPals.Events, Backbone.Events);
    Backbone.history.start();
  }
};

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}

function capitalize (str) {
  if (str === '') {
    return ''
  }
  var splitStr = str.split('');
  var firstChar = splitStr.shift();
  firstChar = firstChar.toUpperCase();
  splitStr.unshift(firstChar);
  return splitStr.join('');
}
