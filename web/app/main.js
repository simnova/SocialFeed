require([
  "namespace",

  // Libs
  "jquery",
  
  "use!backbone",

  // Modules
  "modules/wordGenerator",
  "modules/example",
  "modules/socialFeed",

  //Plugins
  "use!jqueryMasonry"
],

function(namespace, $, Backbone, WordGenerator, Example, SocialFeed) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      ":hash": "index"
    },

    index: function(hash) {
      var route = this;
/*
      var socialFeed = new SocialFeed.Views.Default();
      socialFeed.render(function(el) {
        $("#socialFeed").html(el);
      });
*/
      var tutorial = new SocialFeed.Views.Default();

      // Attach the tutorial to the DOM
      tutorial.render(function(el) {
        $("#socialFeed").html(el);

        // Fix for hashes in pushState and hash fragment
        if (hash && !route._alreadyTriggered) {
          // Reset to home, pushState support automatically converts hashes
          Backbone.history.navigate("", false);

          // Trigger the default browser behavior
          location.hash = hash;

          // Set an internal flag to stop recursive looping
          route._alreadyTriggered = true;

        }
      });

      var wordGenerator = new WordGenerator.Views.Default();
        wordGenerator.render(function(el) {
        $("#wordGenerator").html(el);
      });


      $("#socialFeed").masonry({
          // options
          itemSelector : '.socialFeedItem',
          columnWidth : 240
      });

    }

  });

  // Shorthand the application namespace
  var app = namespace.app;

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support
    // Backbone.history.start({ pushState: true });
    Backbone.history.start({pushState: true, root: "/SocialFeed/"});
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
