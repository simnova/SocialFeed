define(['jquery','use!underscore'], function ($,_) {

  // Constructor
  function InstagramFeed() {
    console.log("constructed");

  };

  InstagramFeed.prototype = {
    search: function(searchTerm){
      var defer = new $.Deferred();
      $.ajax({
        url: "https://api.instagram.com/v1/tags/" + searchTerm + "/media/recent?client_id=8ab776ab8b334bc0b2468c1245e1c24a&callback=?",
        dataType: 'json',
        success: function(json) {
          console.log('success instagram');
          var results = _.map(json.data,function(item){
            return {
              description : !_.isEmpty(item.caption) && !_.isEmpty(item.caption.text) ? item.caption.text : "",
              image : item.images["thumbnail"].url,
              username: item.user.full_name,
              source: "instagram"
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
          console.log('complete instagram');
        }
      );

      console.log("searched");
      return defer.promise();
    }

  };

	return (InstagramFeed);
});