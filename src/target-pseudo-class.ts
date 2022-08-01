import { initSkyNav } from './sky-nav';

console.log('Main in action');

const menuToggle = document.querySelector<HTMLButtonElement>(
	'.js-sky-nav-menu-toggle'
);
menuToggle && initSkyNav(menuToggle);
