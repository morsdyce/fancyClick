describe('Transition config test', function() {

    var async = new AsyncSpec(this);

    beforeEach(function() {
        loadFixtures('fixture.html');
    });

    async.it('should add a class of fancy-leave to the existing container', function(done) {

        fancyClick.init({
            animationMethod: 'transition'
        });

        spyOn($, 'ajax').andCallFake(function () {
            return {
                then: function (callback) {
                    callback('<!doctype html>\n<html>\n<head>\n<title>New page title</title>\n</head>\n<body>\n<div class="main">\n    New page\n</div>\n</body>\n</html>');

                    setTimeout(function() {
                        var element = $('.fancy-leave');
                        expect(element.length).toEqual(1);
                        
                        done();
                    }, 100);

                }
            };
        });

        $('a:first').trigger('click');

    });

    async.it('should add a container with a class of fancy-enter', function(done) {

        fancyClick.init({
            container: '.main',
            animationMethod: 'transition'
        });

        spyOn($, 'ajax').andCallFake(function () {
            return {
                then: function (callback) {
                    callback('<!doctype html>\n<html>\n<head>\n<title>New page title</title>\n</head>\n<body>\n<div class="main">\n    New page\n</div>\n</body>\n</html>');

                    setTimeout(function() {
                        var element = $('.fancy-enter');
                        expect(element.length).toEqual(1);
                        expect(element.hasClass('main')).toBeTruthy();

                        done();
                    }, 100);

                }
            };
        });

        $('a:first').trigger('click');

    });

});