define(['jquery','use!underscore'], function ($,_) {

  // Constructor
  function TwitterFeed() {
    console.log("constructed");

  };

  TwitterFeed.prototype = {
    search: function(searchTerm){
      var defer = new $.Deferred();
      $.ajax({
        url: "http://search.twitter.com/search.json?q=" + searchTerm + "&rpp=100&include_entities=true&callback=?",
        dataType: 'json',
        success: function(json) {
          console.log('success twitter');

          var results = _.map(json.results,function(item){

            var findMedia = function(mediaCollection){
              var result = _.find(mediaCollection,function(mediaItem){
                return !(_.isEmpty(mediaItem.media_url));
              });
              return result.media_url;
            };
            var mediaUrl = !_.isEmpty(item) && !_.isEmpty(item.entities) && _.isArray(item.entities.media)  ? findMedia(item.entities.media) : "";
            return {
              description : item.text,
              image : mediaUrl,
              username: item.from_user_name,
              source: "twitter"
            };
          });
          defer.resolve(results);
        }
      }).error(
        function(xhr, errorType, exception) {
            console.log('error?');
            defer.reject();
        }
      ).complete(
        function() {
            console.log('complete twitter');
        }
      );

      console.log("searched");
      return defer.promise();
    }

  };

  return (TwitterFeed);
});