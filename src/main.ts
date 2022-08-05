import { initSkyNav } from './sky-nav';

// Artificially delay the Sky Nav from initializing for demo purposes
// The `/layout-shift` demo should show a layout shift. For all other demos,
// they should not show a layout shift if with this artificial delay.
setTimeout(() => {
	initSkyNav(
		document.querySelector<HTMLButtonElement>('.js-sky-nav-menu-toggle')!
	);
}, 1000);
