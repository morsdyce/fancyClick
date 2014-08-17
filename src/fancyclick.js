;window.fancyClick = (function(window, document, undefined) {

    "use strict";

    var defaults = {
        preload: false,
        preloadAction: 'hover',
        anchors: 'a',
        blacklist: '.no-fancyclick',
        whitelist: '',
        onLoadStart: function() {},
        onLoadEnd: function() {}
    };

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
    }

    return {
      init: init
    };


}(window, document, undefined));