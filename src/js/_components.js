// Mobile OS definition.
import { mobileCheck } from './components/mobile-check.js';
console.log(mobileCheck());

// Checking the browser for Webp support.
// Required for the Gulp plugin that converts images to webp format.
import { isWebp } from './components/is-webp.js';
isWebp(function (support) {
	if (support == true) {
		document.body.classList.add('webp');
	} else {
		document.body.classList.add('no-webp');
	}
});

// Determining the Header height (you need to call the function).
// import { getHeaderHeight } from './components/header-height.js';

// Connecting Swiper to project
// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper(el, {
//   slidesPerView: 'auto',
// });
