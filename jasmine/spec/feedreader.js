/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("urls defined", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toMatch('string');
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("names defined", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toMatch("string");
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* New test suite named "The menu" */

    describe("The menu", function() {
        var body = $('body');
        var menuIconLink = $('.menu-icon-link');

        // Test that ensures the menu element is hidden by default.
        it("has 'menu-hidden' by default", function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        // Test that ensures the menu changes visibility when the menu icon is clicked.
        it("toggles the class 'menu-hidden' onclick", function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();

            menuIconLink.click();
            expect(body.hasClass('menu-hidden')).toBeFalsy();

            menuIconLink.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /*
     * Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    describe("Initial Entries", function() {

        var feed = document.querySelector(".feed");

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Test there is at least a single .entry element within the .feed container.
        it('displays at a single entry in feed', function() {
            var entryItems = feed.getElementsByClassName("entry");
            expect(entryItems.length).toBeGreaterThan(0);
        });

        // Make sure each entry has valid link
        it("entry has a valid 'http(s)://' link", function(done) {
            var entryLinks = feed.getElementsByClassName("entry-link");
            for (var i = 0; i < entryLinks.length; i++) {
                expect(entryLinks[i].href).toMatch(/^(http|https):\/\//);
            }
            done();
        });
    });

    /*
     * Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */ 
       describe('New Feed Selection', function () {
        var initialFeed;

        beforeEach(function (done) {
            // load first feed
            loadFeed(0, function () {
                initialFeed = $('.feed').html();

                // Load second feed
                loadFeed(1, done);
            });

        });
        
        it('should load new feed', function (done) {
            var newFeed = $('.feed').html();
            expect(newFeed).not.toBe(initialFeed);
            done();
        });
    });

}());