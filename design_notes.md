Life Cycle

1. Library is initialized with a config object
2. The library attaches event handlers to each of the nodes
that match the current config.

The config can contain 3 matchers
1. Selector
2. Whitelist
3. Blacklist

The library can attach 3 types of event handlers based on the configuration
1. Hover
This handler will preload the template when hovering over links but will
not load the page directly.

2. MouseDown
This handler will start loading the page as soon as mousedown is clicked, this is
done in order to save about 100ms from the click event firing.
if this option is set a click handler will not be attached to the elements in
order to prevent executing the same code twice.

3. Click
This handler will load the page when clicked on, this is done the same as the mouseDown
event however this will only execute on the onclick event.

Once a mousedown or a click has been fired the handler will do the following:
1. Check for special data properties on the element the event originated from
2. Evaluate if there is a need to calculate the animation duration.
If there is no animation duration default or data attribute specified the
library will try to calculate the animation duration using the specified animation class
and get the computed style for this element.
3. Fire handlers which handle loading start

Once the animation duration has been decided the library will fire an ajax call
to the desired template from the url in the href attribute of the element
and will check using requestAnimationFrame or a polyfill for the end of the duration
of both the ajax call and the animation every 1000/60 (60 fps, 16ms).

Once the ajax request completes a handler will fire that will do the following actions:
1. Update the page title
2. Push the new state in history API
3. parse the content and attach to the DOM in 1 of 2 ways:

a. Replace
The entire DOM in the specified container in the settings will be replaced.

b. Transition
Another container will be attached to the DOM with a class of fancy-enter
while the existing container will be added the class of fancy-leave
This is done in order to enable an enter and exit animation to the containers

Once both the ajax call and the animation duration have been completed
the library will start a cleanup process.

1. Fire handlers specified to the end of loading
2. If transition mode was used the library will remove the old container from the DOM
and remove the fancy-enter class from the new container.