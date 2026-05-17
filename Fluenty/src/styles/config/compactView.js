import { waitForElement } from '../../scripts/waitForElement.js';

const backLeft = 'calc((100vw / 2) - (30vw / 2) - 76px)';
const forwardLeft = 'calc((100vw / 2) - (30vw / 2) - 46px)';

const ShiftSearchAndNavigationButtons = (searchBarGone) => {
	console.log('Navigation buttons removed, reloading navigation...', searchBarGone);

	const parent = document.querySelector('._1Ky59qmywxOUtNcI1cgmkX._3s0lkohH8wU2do0K1il28Y');
	let navbar = document.querySelector('._2Lu3d-5qLmW4i19ysTt2jT._7AlhCx3XGzBeIrQaCneUD:nth-child(10)');

	if (!searchBarGone) {
		parent.querySelector('#back').style.left = backLeft;
		parent.querySelector('#forward').style.left = forwardLeft;

		navbar.style.marginLeft = '';
	} else {
		parent.querySelector('#back').style.left = '41px';
		parent.querySelector('#forward').style.left = '78px';

		navbar.style.marginLeft = '72px';
	}

	AddNavigationButtons();
};

const AddNavigationButtons = () => {
	const parent = document.querySelector('._1Ky59qmywxOUtNcI1cgmkX._3s0lkohH8wU2do0K1il28Y');

	if (parent.querySelector('#back') || parent.querySelector('#forward')) {
		console.log('Navigation buttons already exist, skipping creation...');
		return;
	}

	parent.append(...document.querySelector('._2D64jIEK7wpUR_NlObDW76').children);

	parent.insertAdjacentHTML(
		'afterbegin',
		`
            <div title="Go back" style="position: absolute; left: ${backLeft};" class="button" id="back"><div class="icon"></div></div>
            <div title="Go forward" style="position: absolute; left: ${forwardLeft};" class="button" id="forward"><div class="icon"></div></div>   
        `,
	);

	document.querySelector('#back').addEventListener('click', () => window.opener.MainWindowBrowserManager.m_history.goBack());
	document.querySelector('#forward').addEventListener('click', () => window.opener.MainWindowBrowserManager.m_history.goForward());
	document.querySelector('._19axKcqYRuaJ8vdYKYmtTQ, ._19axKcqYRuaJ8vdYKYmtTQ span').style.fontFamily = 'var(--text-font-family) !important';

	// const target = document.querySelector('.RGNMWtyj73_-WdhflrmuY');

	// if (target) {
	// 	const observer = new MutationObserver((mutations) => {
	// 		for (const mutation of mutations) {
	// 			if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
	// 				console.log('Style changed:', target.style.cssText);
	// 				// Call your callback here if needed
	// 				if (document?.querySelector('._1bGewp3tfzqAF6fVTFFUOz')?.style.display === 'none') {
	// 					ShiftSearchAndNavigationButtons(target.style.display === 'none');
	// 				}
	// 			}
	// 		}
	// 	});

	// 	observer.observe(target, { attributes: true, attributeFilter: ['style'] });
	// } else {
	// 	console.warn('Element not found');
	// }

	// watchElementPresence('._3x1HklzyDs4TEjACrRO2tB ._20QAC4WMXm8qFE8waUT5oo', (isPresent) => {
	// 	ShiftSearchAndNavigationButtons(!isPresent);
	// });
	let eventEmitter;

	function handleSearchBarChange() {
		eventEmitter = window?.opener?.MainWindowBrowserManager?.m_browser;

		if (!eventEmitter) {
			console.warn('MainWindowBrowserManager or m_browser not found, retrying...');
			setTimeout(handleSearchBarChange, 100);
			return;
		} else {
			console.log('MainWindowBrowserManager and m_browser found, setting up event listener...');
		}

		window.opener.MainWindowBrowserManager.m_browser.on('start-request', async (currentURL) => {
			console.log('Start request detected:', currentURL);
			if (currentURL.includes('/library/Downloads') || currentURL.includes('/millennium') || currentURL.includes('/console')) {
				ShiftSearchAndNavigationButtons(true);
			} else {
				ShiftSearchAndNavigationButtons(false);
			}
		});
	}
	handleSearchBarChange();
};

const AddCompactViewButtons = () => {
	if (document.querySelector('#downloads') || document.querySelector('#friends')) {
		console.log('Compact view buttons already exist, skipping creation...');
		return;
	}

	document.querySelector('._1ENHEsrSLcTRtPQFl1F-wL ._3cykd-VfN_xBxf3Qxriccm').insertAdjacentHTML(
		'afterbegin',
		`
            <div class="_2Szzh5sKyGgnLUR870zbDE downloadsButton" id="downloads">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="_34bQcTHo5QKzuujoEyU1tm"></svg>
            </div>
            <div class="_2Szzh5sKyGgnLUR870zbDE friendsButton" id="friends">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="_34bQcTHo5QKzuujoEyU1tm"></svg>
            </div>
        `,
	);

	console.log('Setting up event listeners for compact view buttons...');

	document.querySelector('#downloads').addEventListener('click', () => window.opener.SteamUIStore.Navigate('/library/Downloads'));
	document.querySelector('#friends').addEventListener('click', () => window.opener.window.open('steam://open/friends/'));
};

const LoadCompactView = () => {
	waitForElement('._1Ky59qmywxOUtNcI1cgmkX._3s0lkohH8wU2do0K1il28Y').then(async (_, __) => {
		AddNavigationButtons();
		AddCompactViewButtons();
	});

	waitForElement('div#sidebar').then(async (element) => element.matchedElements[0].remove());
	waitForElement('.activeIndicator').then(async (element) => element.matchedElements[0].remove());

	listenElementDie('#downloads', () => {
		console.log('Downloads removed, reloading compact view...');
		LoadCompactView();
	});
};

console.log('Loading compact view components...');
LoadCompactView();

function watchElementPresence(selector, callback) {
	let wasPresent = !!document.querySelector(selector);

	const observer = new MutationObserver(() => {
		const isPresent = !!document.querySelector(selector);
		if (isPresent !== wasPresent) {
			wasPresent = isPresent;
			callback(isPresent);
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
}

function listenElementDie(query, callback) {
	const target = document.body;

	const observer = new MutationObserver(() => {
		if (!document.querySelector(query)) {
			observer.disconnect();
			callback();
		}
	});

	observer.observe(target, { childList: true, subtree: true });
}
