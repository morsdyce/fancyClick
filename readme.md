
## FancyClick (WIP) ##

FancyClick is a lightweight pjax library focusing on animation transitions.

FancyClick uses pjax (pushstate ajax) and falls back to location hashes when unsupported.
If the browser lacks javascript support FancyClick degrades gracefully to full page loads without any change in the code.

## How it works ##

FancyClick processes all your internal links and replaces them with pjax requests which update the title and content dynamically without switching the page.

## Basic Usage ##

Include FancyClick and jQuery in your page. FancyClick is dependent on jQuery.

    <script src="//cdn.jquery.com/jquery/2/jquery.min.js"></script>
    <script src="fancyClick.js"></script>

    $(function() {
	    fancyClick();
    });

FancyClick defaults to `#main` selector for content placeholder

## Options ##

 - container - specify a selector for your content main container. Defaults to `#main`

 - animationMethod - `(replace|transition)` sets the animation mode.
 `replace` replaces the content of the container.
 `transition` adds another container to the DOM for the animation duration and adds `fancy-enter` class to the entering container and `fancy-leave` to the leaving container.

 - loadStart - (callback) parameters: href, options - runs when loading a link starts

 - preDOMInsert - (callback) parameters: element, parent - runs just before the new Dom is inserted to the page

 - postDOMInsert - (callback) parameters: element, parent - runs just after the new DOM is inserted to the page

 - loadEnd - (callback) parameters: href, options - runs when loading has ended

 - blacklist - selectors which shouldn't trigger fancyClick.

 - whitelist - specify selectors that are only allowed to trigger fancyClick.

 - preFetch - Prefetch links before clicking. defaults to false.

 - preFetchMode - `(hover|mousedown)` Set the strategy for prefetching links