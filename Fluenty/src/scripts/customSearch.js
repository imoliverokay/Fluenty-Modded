import { waitForElement } from './waitForElement.js';

export async function customSearch() {
	await waitForElement('._12vo5L1hsNGdao6_ssuirS', 10000).then(async () => {
		let searched = '';
		let viewListAltHook = false;
		let viewListHook = false;

		const mainViewObs = new MutationObserver((e) => {
			applySearch(searched);
		});

		// Base search function
		function applySearch(s) {
			const mainViewList = document.querySelectorAll('._3vHkmRShhzwd67_MtEq8-n._3DJLGrqzoQ5vMDI_4VG502 img._24_AuLm54JVe1Zc0AApCDR');

			if (mainViewList.length > 0) {
				if (!viewListHook) {
					// This will reapply the search filter because if the main view is long enough, the filter will stop filtering.
					// It reapply the filter whenever the main view list is getting updated (user scrolled)
					viewListHook = true;
					viewListAltHook = false;

					mainViewObs.disconnect();
					mainViewObs.observe(document.querySelector('.DGRkX_HYUzbFaqRysWQVi'), { childList: true, subtree: true });
				}

				mainViewList.forEach((e) => {
					e.classList.add('not-matched');
					if (e.getAttribute('alt').toLowerCase().includes(s)) {
						e.classList.remove('not-matched');
						e.classList.add('matching');
					}
				});
			} else {
				const mainViewListAlt = document.querySelectorAll('._3vHkmRShhzwd67_MtEq8-n ._1pwP4eeP1zQD7PEgmsep0W');

				if (mainViewListAlt.length > 0) {
					if (!viewListAltHook) {
						// Reapply for collections page
						viewListAltHook = true;
						viewListHook = false;

						mainViewObs.disconnect();
						mainViewObs.observe(document.querySelector('.rz1mrOnj9WN6UErES7qsq.Panel'), { childList: true, subtree: true });
					}

					mainViewListAlt.forEach((e) => {
						e.classList.add('not-matched');
						if (e.children[1].innerText.toLowerCase().includes(s)) {
							e.classList.remove('not-matched');
							e.classList.add('matching');
						}
					});
				}
			}
		}

		// Append the base search function to the searchbox
		function appendSearchFunction() {
			const searchBox = document.querySelector('._12vo5L1hsNGdao6_ssuirS input');

			searchBox.addEventListener('keyup', () => {
				const clearSearchBox = document.querySelector('.DialogInput_ClearAction');

				clearSearchBox.addEventListener('click', () => {
					searched = '';
					applySearch(searched);
				});

				searched = searchBox.value.toLowerCase();
				applySearch(searched);
			});
		}

		// Append for the first time
		appendSearchFunction();

		// This will reapply the addEventListener if the user change the text input to the type input.
		// It will reapply if the input is changed to text again
		const searchBoxObs = new MutationObserver((e) => {
			if (e[0].removedNodes[0].classList[0] == '_172OFJhtx4Jt2ydY6-9IUm') {
				appendSearchFunction();
			}
		});

		searchBoxObs.observe(document.querySelector('._12vo5L1hsNGdao6_ssuirS'), { childList: true });
	});
}
