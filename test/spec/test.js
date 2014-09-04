describe('Basic usage test', function () {

    var async = new AsyncSpec(this);

    beforeEach(function () {
        loadFixtures('fixture.html');
    });


    it('should initialize with options', function () {

        fancyClick.init({
            container: 'test'
        });

        expect(fancyClick.getOption('container')).toBe('test');

    });

    it('should attach event handlers', function () {

        fancyClick.init({
            'container': 'test'
        });

        var links = $('a');

        links.each(function (key, element) {
            var events = $._data(element, 'events');
            expect(events.click).not.toBe(undefined);
        });

    });

    it('should fire an ajax request to the page when a link is clicked', function () {

        fancyClick.init({
            'container': 'test'
        });

        spyOn($, 'ajax').andCallThrough();

        $('a:first').trigger('click');

        expect($.ajax).toHaveBeenCalledWith({url: 'http://localhost:9876/page.html', dataType: 'html'});
    });

    async.it('should change the title after loading a page', function (done) {

        fancyClick.init({
            'container': 'test'
        });

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


});
