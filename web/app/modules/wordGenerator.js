define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var WordGenerator = namespace.module();

  // WordGenerator extendings
  WordGenerator.Model = Backbone.Model.extend({ /* ... */ });
  WordGenerator.Collection = Backbone.Collection.extend({ /* ... */ });
  WordGenerator.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  WordGenerator.Views.Default = Backbone.View.extend({
    template: "app/templates/wordGenerator.html",

    events: {
      "change #first" : "generateWord",
      "change #middle" : "generateWord",
      "change #last" : "generateWord"
    },

    generateWord: function(){
      var view = this;
      var first = view.collection.get($("#first").val()).get("first");
      var middle = view.collection.get($("#middle").val()).get("middle");
      var last = view.collection.get($("#last").val()).get("last");
      $("#results").html(first + middle + last);
    },

    render: function(done) {
      var view = this;

      view.collection = new WordGenerator.Collection([
        { id:1, root:"Peppery", first: "Pep", middle: "epper", last: "eppery" },
        { id:2, root:"Tomatoey", first: "To", middle: "mato", last: "toey" },
        { id:3, root:"Zesty", first: "Zes", middle: "est", last: "esty" },
        { id:4, root:"Zingy", first: "Zin", middle: "ing", last: "ingy" },
        { id:5, root:"Silky", first: "Sil", middle: "ilk", last: "ilky" },
        { id:6, root:"Smooth", first: "Smoo", middle: "oo", last: "ooth" },
        { id:7, root:"Velvety", first: "Vel", middle: "vet", last: "vety" },
        { id:8, root:"Rich", first: "Ri", middle: "ich", last: "ich" },
        { id:9, root:"Bold", first: "Bol", middle: "ol", last: "old" },
        { id:10, root:"Crisp", first: "Bris", middle: "is", last: "isp" },
        { id:11, root:"Spicy", first: "Spi", middle: "spi", last: "icy" },
        { id:12, root:"Clean", first: "Clea", middle: "lean", last: "ean" },
        { id:13, root:"Fresh", first: "Fre", middle: "resh", last: "esh" },
        { id:14, root:"Creamy", first: "Crea", middle: "ream", last: "eamy" },
        { id:15, root:"Sweet", first: "Swee", middle: "wee", last: "weet" },
        { id:16, root:"Savory", first: "Sav", middle: "avor", last: "avory" },
        { id:17, root:"Thick", first: "Th", middle: "ick", last: "ick" },
        { id:18, root:"Heavy", first: "Hea", middle: "eav", last: "eavy" },
        { id:19, root:"Robust", first: "Rob", middle: "obus", last: "bust" },
        { id:20, root:"Hearty", first: "Hear", middle: "eart", last: "earty" },
        { id:21, root:"Full-bodied", first: "Full", middle: "bod", last: "ied" },
        { id:22, root:"Meaty", first: "Mea", middle: "eat", last: "eaty" },
        { id:23, root:"Filling", first: "Fill", middle: "ill", last: "ing" },
        { id:24, root:"Delicate", first: "Del", middle: "eli", last: "cate" },
        { id:25, root:"Piney", first: "Pine", middle: "ine", last: "iney" }
      ]);

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl({collection: view.collection});

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return WordGenerator;

});
