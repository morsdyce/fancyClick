[![Build Status](https://travis-ci.org/morsdyce/fancyClick.svg?branch=master)](https://travis-ci.org/morsdyce/fancyClick)

## FancyClick (WIP) ##

FancyClick is a lightweight pjax library focusing on animation transitions.

FancyClick uses pjax (pushstate ajax) and falls back to location hashes when unsupported.
If the browser lacks javascript support FancyClick degrades gracefully to full page loads without any change in the code.

## How it works ##

FancyClick processes all your internal links and replaces them with pjax requests which update the title and content dynamically without refreshing the page.

## Basic Usage ##

Include FancyClick and jQuery in your page. FancyClick is dependent on jQuery.

    <script src="//cdn.jquery.com/jquery/2/jquery.min.js"></script>
    <script src="fancyClick.js"></script>

    $(function() {
	    fancyClick();
    });

FancyClick defaults to `#main` selector for content placeholder

## Options ##

###container###
specify a selector for your content main container.

| Parameter | Default |
| -------------- | ---------- |
| container | #main |

###animationMethod###
| Option | Description |
| -------------- | ---------- | 
| replace | Replaces the content of the container |
| transition| adds another container to the DOM for animation duration and adds `fancy-enter` to the entering container and `fancy-leave` to the leaving container

###animationDelay###
| Option | Description |
| -------------- | ---------- | 
| number | An integer representing the minimum delay before showing the new content |
| auto | Automatic calculation of CSS animations duration only, please specify a number while using JS animations.


###loadStart### 
| Option | Description |
| -------------- | ---------- | 
| function ( href, options ) | Runs when loading starts |

###loadEnd###
| Option | Description |
| -------------- | ---------- | 
| function ( href, options ) | Runs when loading has ended |

###blacklist###
Specify selectors which shouldn't trigger FancyClick.

###whitelist###
Specify selectors that are only allowed to trigger fancyClick.

###preFetch###
Prefetch links before clicking. defaults to false.