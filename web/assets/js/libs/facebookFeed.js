define(['jquery','use!underscore'], function ($,_) {

  // Constructor
  function FacebookFeed() {
  };

  FacebookFeed.prototype = {
    search: function(searchTerm){
      var defer = new $.Deferred();
      $.ajax({
        url: "https://graph.facebook.com/search?q=" + searchTerm + "&type=post&callback=?",
        dataType: 'json',
        success: function(json) {
          var results = _.map(json.data,function(item){
            return {
              description : item.message,
              image : item.picture,
              username: item.from.name,
              source: "facebook"
            };
          });
          defer.resolve(results);
        }
      }).error(
        function(xhr, errorType, exception) {
          defer.reject();
        }
      ).complete(
        function() {
        }
      );
      return defer.promise();
    }

  };

  return (FacebookFeed);
});