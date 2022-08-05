/**
 * This is a copy of the Sky Nav JavaScript with a few additions specifically
 * for the demos.
 *
 * Create Sky Nav Menu
 *
 * Adds an event listener to the toggle button of a Sky Nav component for click
 * events, which runs the toggle command to show or hide the menu with animation.
 * Responds to breakpoint changes to show or hide the nav for large and small
 * screens. Returns an object containing a `destroy()` method to remove the
 * event listener.
 *
 * @param toggleEl - the toggle button for the navigation
 */
export const initSkyNav = (toggleEl: HTMLButtonElement) => {
	let navButton = toggleEl;

	// For the `:target` pseudo-class solution, the toggle is a link by default.
	// Once this Sky Nav JS logic kicks in, we change the link to a button since
	// using a button for this functionality is more semantic.
	if (document.body.dataset.demo === 'target-pseudo-class') {
		// Create a  new button
		const button = document.createElement('button');
		// Copy all of the link classes over to the new button
		toggleEl.classList.forEach((toggleElCssClass) =>
			button.classList.add(toggleElCssClass)
		);
		// Copy over the contents of the link to the button
		button.innerHTML = toggleEl.innerHTML;
		// Swap the link for the button
		toggleEl.replaceWith(button);
		// Update the code to reference the new button as the nav button
		navButton = button;
	}

	const menu = navButton.nextElementSibling as HTMLElement;
	const navWrapper = navButton.closest('.js-sky-nav') as HTMLElement;
	const largeScreenMediaQuery = window.matchMedia('(min-width: 40em)');
	const reducedMotionMediaQuery = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	);

	// By default, the Sky Nav begins with a 'default' state set in the
	// server-rendered HTML. This below will update the Sky Nav state providing a
	// CSS hook to manage changes in the UI once this Sky Nav JS has initialized.
	navWrapper.dataset.state = 'ready';

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
	const toggle = () => {
		const isExpanded = navButton.getAttribute('aria-expanded') === 'true';

		navButton.setAttribute('aria-expanded', String(!isExpanded));

		if (reducedMotionMediaQuery.matches) {
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
