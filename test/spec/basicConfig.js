describe('basic config test', function () {

    var async = new AsyncSpec(this);

    beforeEach(function () {
        loadFixtures('fixture.html');
    });

    it('should attach event handlers to links', function () {
        fancyClick.init();

        var links = $('a');

        links.each(function (key, element) {
            var events = $._data(element, 'events');
            expect(events.click).not.toBe(undefined);
        });
    });

    it('should load a page when a link is clicked', function () {

        fancyClick.init();

        spyOn($, 'ajax').andCallThrough();

        $('a:first').trigger('click');

        expect($.ajax).toHaveBeenCalled();

    });

    async.it('should fire loadStart when a link is clicked', function (done) {
        var mock = {
            loadStart: function () {}
        };

        spyOn(mock, 'loadStart');

        fancyClick.init({
            onLoadStart: mock.loadStart
        });

        $('a:first').trigger('click');

        setTimeout(function() {
            expect(mock.loadStart).toHaveBeenCalled();
            done();
        }, 0);


    });

    async.it('should change the page title', function (done) {
        fancyClick.init();

        spyOn($, 'ajax').andCallFake(function () {
            return {
                then: function (callback) {
                    callback('<!doctype html>\n<html>\n<head>\n<title>New page title</title>\n</head>\n<body>\n</body>\n</html>');
                    expect($('title').text()).toBe('New page title');
                    done();
                }
            };
        });

        $('a:first').trigger('click');
    });

    async.it('should change the content in the main container', function (done) {

        fancyClick.init();

        spyOn($, 'ajax').andCallFake(function () {
            return {
                then: function (callback) {
                    callback('<!doctype html>\n<html>\n<head>\n<title>test</title>\n</head>\n<body><div class="main">Main content</div>\n</body>\n</html>');

                    expect($('.main').text()).toBe('Main content');
                    done();
                }
            };
        });

        $('a:first').trigger('click');

    });

    async.it('should wait at least 1 second before firing loadEnd', function (done) {

        jasmine.Clock.useMock();

        var loadEnd = jasmine.createSpy('loadEnd');
        spyOn($, 'ajax').andCallFake(function () {
            return {
                then: function (callback) {
                    callback('<!doctype html>\n<html>\n<head>\n<title>test</title>\n</head>\n<body><div class="main">Main content</div>\n</body>\n</html>');

                    setTimeout(function () {
                        expect(loadEnd).not.toHaveBeenCalled();
                    }, 100);

                    jasmine.Clock.tick(101);

                    setTimeout(function () {
                        expect(loadEnd).toHaveBeenCalled();
                        done();
                    }, 1000);

                    jasmine.Clock.tick(1001);

                }
            };
        });

        fancyClick.init({
            onLoadEnd: loadEnd
        });

        $('a:first').trigger('click');
    });
});