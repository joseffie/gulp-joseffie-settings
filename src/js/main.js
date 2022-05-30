import vars from './_vars.js';
import './_components.js';

const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');

if (burger) {
	burger.addEventListener('click', function () {
		document.body.classList.toggle('_no-scroll');
		nav.classList.toggle('_active');
		burger.classList.toggle('_active');
	});
}
