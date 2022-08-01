/**
 * This is a simplified version of the Sky Nav Menu for demo purposes
 *
 * Create Sky Nav Menu
 *
 * Adds an event listener to the toggle button of a Sky Nav component for click
 * events, which runs the toggle command to show or hide the menu with animation.
 * Responds to breakpoint changes to show or hide the nav for large and small
 * screens. Returns an object containing a `destroy()` method to remove the
 * event listener.
 *
 * @param navButton - the toggle button for the navigation
 */
export const initSkyNav = (navButton: HTMLButtonElement) => {
	const DISABLE_ANIMATION = false;
	console.log('initSkyNav in action');

	const menu = navButton.nextElementSibling as HTMLElement;
	const navWrapper = navButton.closest('.js-sky-nav') as HTMLElement;
	const largeScreenMediaQuery = window.matchMedia('(min-width: 40em)');
	// @todo Is this needed for the demo?
	const reducedMotionMediaQuery = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	);

	if (
		document.body.dataset.demo === 'synchronous-inline-script' ||
		document.body.dataset.demo === 'target-pseudo-class'
	) {
		// The Sky Nav component has inline synchronous JS logic to add an `is-loading`
		// state to remove the layout shift at smaller viewports. That state no longer
		// applies at this point since the Sky Nav JS has loaded & is ready to take over.
		navWrapper.dataset.state = 'is-ready';
	}

	/**
	 * Update Menu Layout
	 * Sets visibility of menu & navButton for small vs large screen layouts.
	 */
	const update = () => {
		const isLargeScreen = largeScreenMediaQuery.matches;
		if (isLargeScreen) {
			navButton.removeAttribute('aria-expanded');
			menu.hidden = false;
		} else {
			navButton.setAttribute('aria-expanded', 'false');
			menu.hidden = true;
		}
	};

	let timeoutId = -1;

	/**
	 * Toggle Menu State (expanded/closed)
	 * Sets aria-expanded & hidden attributes to show or hide the menu.
	 */
	const toggle = (event: Event) => {
		if (document.body.dataset.demo === 'target-pseudo-class') {
			event?.preventDefault();
		}
		const isExpanded = navButton.getAttribute('aria-expanded') === 'true';

		navButton.setAttribute('aria-expanded', String(!isExpanded));

		// If no animation, then I shouldn't need this
		// @todo Do I need this for the demo?
		if (reducedMotionMediaQuery.matches || DISABLE_ANIMATION) {
			menu.hidden = isExpanded;
			return;
		}

		const duration = 0.4;
		const transition = `transform ${duration}s cubic-bezier(0.455, 0.03, 0.515, 0.955)`;
		clearTimeout(timeoutId);

		menu.hidden = false;
		const heightDiff = menu.getBoundingClientRect().height;
		if (isExpanded) {
			// Closing menu: slide the elements up before hiding the menu
			document.body.style.setProperty('transition', transition);
			document.body.style.setProperty(
				'transform',
				`translateY(${-heightDiff}px)`
			);

			timeoutId = setTimeout(() => {
				menu.hidden = true;
				document.body.style.removeProperty('transition');
				document.body.style.removeProperty('transform');
			}, duration * 1000) as any as number;
		} else {
			// Opening menu: start the elements higher than their "resting position" and then slide them down
			document.body.style.setProperty(
				'transform',
				`translateY(${-heightDiff}px)`
			);
			// Flush changes to the DOM
			// eslint-disable-next-line @cloudfour/typescript-eslint/no-unused-expressions, mdx/no-unused-expressions
			navWrapper.offsetWidth;
			document.body.style.setProperty('transition', transition);
			document.body.style.removeProperty('transform');
			timeoutId = setTimeout(() => {
				document.body.style.removeProperty('transition');
			}, duration * 1000) as any as number;
		}
	};

	navButton.addEventListener('click', toggle);
	// Run the update method when the media query status changes
	largeScreenMediaQuery.addEventListener('change', update);

	// Run the update method once to set the initial layout correctly
	update();

	/** Clean up event listeners */
	const destroy = () => {
		navButton.removeEventListener('click', toggle);
		largeScreenMediaQuery.removeEventListener('change', update);
	};

	// Return a public API for consumers of this component
	return { destroy };
};
