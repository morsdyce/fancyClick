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

        expect($.ajax).toHaveBeenCalledWith({url: 'http://localhost:9877/page.html', dataType: 'html'});

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

    it('should wait at least 1 second before firing loadEnd', function () {

        var mock = {
            loadEnd: function () {}
        };

        spyOn(mock, 'loadEnd');

        fancyClick.init({
            onLoadEnd: mock.loadEnd
        });

        $('a:first').trigger('click');

        setTimeout(function() {
            expect(mock.loadEnd).not.toHaveBeenCalled();
        }, 500);

        setTimeout(function() {
            expect(mock.loadEnd).toHaveBeenCalled();
        }, 1001);

    });
})
;