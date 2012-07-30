define([
  "namespace",

  // Libs
  "use!backbone",
  "instagramFeed",
  "twitterFeed",
  "facebookFeed"
  // Modules

  // Plugins
],

function(namespace, Backbone, InstagramFeed,TwitterFeed,FacebookFeed) {

  // Create a new module
  var SocialFeed = namespace.module();

  // Example extendings
  SocialFeed.Model = Backbone.Model.extend({ /* ... */ });
  SocialFeed.Collection = Backbone.Collection.extend({ /* ... */ });
  SocialFeed.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  SocialFeed.Views.Default = Backbone.View.extend({
    template: "app/templates/socialFeed.html",
    initPlugins: function(){


    },
    render: function(done) {
      var doneCallback = done;
      var view = this;
      var instagramFeed = new InstagramFeed();
      var twitterFeed = new TwitterFeed();
      var facebookFeed = new FacebookFeed();

      var renderCollection = function(collectionItems){
         
        view.collection = _.union(view.collection,collectionItems);

        // Fetch the template, render it to the View element and call done.
        namespace.fetchTemplate(view.template, function(tmpl) {
         // view.el.innerHTML = tmpl({collection: view.collection});
         console.log(collectionItems);
         $(tmpl({collection: collectionItems})).appendTo(view.$el);
        // /  appendTo
          // If a done function is passed, call it with the element

        });

      };

                if (_.isFunction(done)) {
            done(view.el);
          }
      var searchTerm = "chunkysoup";
      instagramFeed.search(searchTerm).done(function(results){renderCollection(results)});
      twitterFeed.search(searchTerm).done(function(results){renderCollection(results)});
      facebookFeed.search(searchTerm).done(function(results){renderCollection(results)});
/*
      $.when(
        instagramFeed.search("olympics"),
        twitterFeed.search("olympics"),
        facebookFeed.search("olympics")
      ).then(function(
          instagramFeedResults,
          twitterFeedResults,
          facebookFeedResults
          ){
          var fullResults = _.union(instagramFeedResults,twitterFeedResults,facebookFeedResults);
          renderCollection(fullResults, doneCallback);
      });
*/

    }
  });

  // Required, return the module for AMD compliance
  return SocialFeed;

});
