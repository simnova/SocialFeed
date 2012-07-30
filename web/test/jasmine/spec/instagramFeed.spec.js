define(["instagramFeed"], function (InstagramFeed) {
 describe("Instragram Feed Spec", function () {


      describe("when searching Instragram", function () {
      it("something returned", function () {
        var instagramFeed = new InstagramFeed();

        semaphore = 1;

        instagramFeed.search("soup",function(data){
            expect(data.length).toBeGreaterThan(0);
            semaphore--;
        });

        waitsFor(function() { return semaphore === 0 });        
      });
    });

  });
});