(function ($, window, document, undefined) {

    'use strict';

    var settings = {
        container: '.main',
        animationMethod: 'replace',
        duration: 1000,
        preload: false,
        anchors: 'a',
        blacklist: '.no-fancyclick',
        whitelist: '',
        onLoadStart: function () {
            //$('body').addClass('fancy-in-transition');
        },
        onLoadEnd: function () {
            //$('body').addClass('fancy-in-transition');
        }
    };

    /**
     * Initilize plugin with specified options
     * @param opts
     */
    function init(opts) {
        // initialize config
        for (var key in opts) {
            if (settings.hasOwnProperty(key)) {
                settings[key] = opts[key];
            }
        }

        attachLoader();
        history.pushState({}, '', window.location.href);
        $(window).on('popstate', stateChange);
    }

    /**
     * Manage state changes, if a user navigates back or forward
     * load the page from history
     * @param e
     */
    function stateChange(e) {
        if (e.originalEvent.state !== null) {
            loadPage(e, true);
        } else {
            loadPage(e);
        }
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
            var $element = $(element);
            if (!isExternal($element.attr('href'))) {
                $element.click(loadPage);
            }
        });
    }

    function loadPage(e, changeBack) {
        e.preventDefault();
        var durationFn = getComputedAnimationDuration();
        var duration = durationFn() || settings.duration;
        var href = e.currentTarget.href || window.location.href;
        var element = $(settings.container);

        // fire loading start callback
        settings.onLoadStart();

        $.ajax({
            url: href,
            dataType: 'html'
        }).then(function (responseText) {
            if (responseText) {
                var dom = $('<div>').append($.parseHTML(responseText));
                updateTitle(dom.find('title').text());
                if (settings.animationMethod === 'replace') {
                    var html = dom.find(settings.container).html();
                    element.html(html);
                    setTimeout(function () {
                        settings.onLoadEnd();
                    }, duration);

                } else {
                    element.addClass('fancy-leave');
                    var afterElement = dom.find(settings.container).addClass('fancy-enter');
                    element.after(afterElement);
                    setTimeout(function () {
                        element.remove();
                        afterElement.removeClass('fancy-enter');
                        settings.onLoadEnd();
                    }, duration);
                }

                // if this is the initial page loaded add it to the history
                if (!changeBack) {
                    history.pushState({}, '', href);
                }
            }

        }, function (error) {
            // fire the load end callback
            settings.onLoadEnd();
            // log the error
            console.error(error);
        });
    }

    /**
     * Update the title of the page
     * @param title
     */
    function updateTitle(title) {
        $('title').text(title);
    }

    /**
     * Get the computed animation duration for an element
     */
    function getComputedAnimationDuration() {
        var element = $('<div>')
            .css('visibility', 'hidden')
            .addClass('fancy-enter')
            .appendTo('body');

        var time = 0;
        setTimeout(function() {
            time += (parseFloat(getComputedStyle(element[0]).animationDuration));
            time += (parseFloat(getComputedStyle(element[0], ':after')));//.animationDuration));
            time += (parseFloat(getComputedStyle(element[0], ':before').animationDuration));

            element.remove();
        },0);

        return function() {
            return time;
        };
    }

    window.fancyClick = {
        init: init
    };


}(jQuery, window, document, undefined));