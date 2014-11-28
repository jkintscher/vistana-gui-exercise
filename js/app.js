App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function () {
  this.resource('posts', function () {
    this.route('new');

    this.resource('post', {path: '/post/:post_id'}, function () {
      this.route('edit');
    });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('posts');
  }
});

App.PostsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('post');
  },
  afterModel: function(posts, transition) {
    if (posts.get('length') >= 1) {
      this.transitionTo('post', posts.get('firstObject'));
    }
  }
});

App.PostRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('post', params.post_id);
  }
});

App.PostsNewController = Ember.Controller.extend({
  actions: {
    addNewPost: function (title, excerpt, body) {
      var newPost = {
        title: title,
        author: "Amadeus",
        date: new Date(),
        excerpt: excerpt,
        body: body,
        comments: []
      };

      var record = this.store.createRecord('post', newPost);
      record.save();
    }
  }
});

Ember.Handlebars.registerBoundHelper('format-date', function(format, date) {
  return moment(date).format(format);
});

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  date: DS.attr('date'),
  excerpt: DS.attr('string'),
  body: DS.attr('string'),
  comments: DS.attr()
});

App.Post.FIXTURES = [
  {
    id: 1,
    title: "Happy birthday Yaohua",
    author: "Amadeus",
    date: new Date('2014-10-13'),
    excerpt: "Say happy birthday to Yaohua !",
    body: "Today is the birthday of our dear collegue Yaohua, let's celebrate it !",
    comments: [
      {visiter: "Muriel", comment: "Salut Yaohua"}, {visiter: "Santi", comment: "Ola Yaohua"}
    ]
  }, {
    id: 2,
    title: "Happy birthday Ali",
    author: "Amadeus",
    date: new Date('2015-01-12'),
    excerpt: "Say happy birthday to Ali !",
    body: "Today is the birthday of our dear collegue Ali, let's celebrate it !",
    comments: [
      {visiter: "Muriel", comment: "Salut Ali"}, {visiter: "Santi", comment: "Ola Ali"}
    ]
  }, {
    id: 3,
    title: "Happy birthday Joschka",
    author: "Amadeus",
    date: new Date('2014-12-24'),
    excerpt: "Say happy birthday to Joschka !",
    body: "Today is the birthday of our dear collegue Joschka, let's celebrate it !",
    comments: [
      {visiter: "Muriel", comment: "Salut Joschka"}, {visiter: "Santi", comment: "Ola Joschka"}
    ]
  }];