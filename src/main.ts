import { initSkyNav } from './sky-nav';
import './style.scss';

console.log('Main in action');

const menuToggle = document.querySelector<HTMLButtonElement>(
	'.js-sky-nav-menu-toggle'
);
menuToggle && initSkyNav(menuToggle);
