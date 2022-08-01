import { initSkyNav } from './sky-nav';
import './synchronous-inline-script.scss';

console.log('Main in action');

const menuToggle = document.querySelector<HTMLButtonElement>(
	'.js-sky-nav-menu-toggle'
);
menuToggle && initSkyNav(menuToggle);
