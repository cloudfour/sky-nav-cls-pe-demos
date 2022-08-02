import { initSkyNav } from './sky-nav';

const menuToggle = document.querySelector<HTMLButtonElement>(
	'.js-sky-nav-menu-toggle'
);

if (menuToggle) {
	initSkyNav(menuToggle);
}
