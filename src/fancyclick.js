;
(function ($, window, document, undefined) {

    'use strict';

    var defaults = {
        container: 'main',
        method: 'replace',
        duration: 1000,
        preload: false,
        preloadAction: 'hover',
        anchors: 'a',
        blacklist: '.no-fancyclick',
        whitelist: '',
        onLoadStart: function () {
            //$('body').addClass('fancy-enter');
        },
        onLoadEnd: function () {
            //$('body').addClass('fancy-leave');
        }
    };

    /**
     * Get an option value
     * @param optionName
     */
    function getOption(optionName) {
        return defaults[optionName] || null;
    }

    /**
     * Initilize plugin with specified options
     * @param opts
     */
    function init(opts) {
        // initialize config
        for (var key in opts) {
            if (defaults.hasOwnProperty(key)) {
                defaults[key] = opts[key];
            }
        }
        console.log('intialized with options', defaults);

        attachLoader();

        history.pushState({}, '', window.location.href);

        $(window).on('popstate', function (e) {
            if (e.originalEvent.state !== null) {
                console.log(e);
                loadPage(e, true);
            } else {
                loadPage(e);
            }
        });
    }

    /**
     * Determine if the url is local or external
     * As seen in Fastest way to detect external URLs
     * (http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls)
     * @param url
     * @returns {boolean}
     */
    function isExternal(url) {
        var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
        if (typeof match[1] === 'string' && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
            return true;
        }
        if (typeof match[2] === 'string' && match[2].length > 0 && match[2].replace(new RegExp(':(' + {'http:': 80, 'https:': 443}[location.protocol] + ')?$'), '') !== location.host) {
            return true;
        }
        return false;
    }

    function attachLoader() {
        var links = $('a');

        $.each(links, function (key, element) {
            var element = $(element);
            if (!isExternal(element.attr('href'))) {
                element.click(loadPage);
            }
        });


    }

    function loadPage(e, changeBack) {
        e.preventDefault();
        var href = e.currentTarget.href || window.location.href;
        var element = $('.' + defaults.container);
        var parentElement = element.parent();
        //var loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 400, easingIn : mina.easeinout } );

        defaults.onLoadStart();

        $.ajax({
            url: href,
            dataType: 'html'
        }).then(function (responseText) {
            if (responseText) {
                var dom = $('<div>').append($.parseHTML(responseText));
                updateTitle(dom.find('title').text());

                if (defaults.method === 'replace') {
                    setTimeout(function () {
                        element.html(dom.find('.' + defaults.container).html());
                        defaults.onLoadEnd();
                    }, 2000);

                } else {
                    element.addClass('fancy-leave');
                    var afterElement = dom.find('.' + defaults.container);
                    parentElement.append(afterElement).addClass('fancy-enter');
                    setTimeout(function () {
                        element.remove();
                        afterElement.removeClass('fancy-enter');
                        defaults.onLoadEnd();
                    }, 2000);
                }

                console.log('changeback', changeBack, href);
                if (!changeBack) {
                    history.pushState({}, '', href);
                }
            }

        }, function (error) {
            defaults.onLoadEnd();
            console.error(error);
        });
    }

    function updateTitle(title) {
        $('title').text(title);
    }

    window.fancyClick = {
        init: init,
        getOption: getOption
    };


}(jQuery, window, document, undefined));