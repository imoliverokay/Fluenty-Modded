export function createSidebar(sideBarDiv, sidebarInitialized) {
	if (!sideBarDiv) {
		return `
		<div class="section">
			<div title="Go back" class="button disabled" id="back">
				<div class="icon"></div>
			</div>
			<div title="Store" class="button" id="store">
				<div class="icon"></div>
				<div class="text">Store</div>
			</div>
			<div title="Library" class="button" id="library">
				<div class="icon"></div>
				<div class="text">Library</div>
			</div>
			<div title="Community" class="button" id="community">
				<div class="icon"></div>
				<div class="text">Community</div>
			</div>
			<div title="Collections" class="button" id="collections">
				<div class="icon"></div>
				<div class="text">Collections</div>
			</div>
			<div title="Activity" class="button" id="activity">
				<div class="icon"></div>
				<div class="text">Activity</div>
			</div>
		</div>
		<div class="section">
			<div title="Downloads" class="button" id="downloads">
				<div class="icon">	</div>
				<div class="text">Downloads</div>
			</div>
			<div title="Settings" class="button" id="settings">
				<div class="icon"></div>
				<div class="text">Settings</div>
			</div>
		</div>
		`;
	}

	const wrapper = document.querySelector('._1ENHEsrSLcTRtPQFl1F-wL');
	const libraryButton = sideBarDiv.querySelector('#library');
	const collectionsButton = sideBarDiv.querySelector('#collections');
	const activityButton = sideBarDiv.querySelector('#activity');
	const communityBtn = sideBarDiv.querySelector('#community');
	const storeBtn = sideBarDiv.querySelector('#store');
	const downloadBtn = sideBarDiv.querySelector('#downloads');
	const aI = wrapper.querySelector('.activeIndicator');

	const backBtn = sideBarDiv.querySelector('#back');

	function navigate(skipRedirect, targetElement, navigator, url) {
		const lastActive = document.querySelector('.button.active');

		if (!skipRedirect) {
			if (navigator === '/browser') {
				window.opener.SteamUIStore.Navigate('/browser', window.opener.MainWindowBrowserManager.LoadURL(url));
			} else {
				window.opener.SteamUIStore.Navigate(navigator);
			}
		}
		if (lastActive) {
			lastActive.classList.remove('active');
		}
		targetElement.classList.add('active');
		aI.style.top = `${targetElement.offsetTop}px`;
	}

	// window.opener.MainWindowBrowserManager.m_history.listen(async (e) => {
	// 	backBtn.classList.toggle('disabled', window.opener.MainWindowBrowserManager.m_browser.CanGoBackward());

	// 	const titleView = (await window.opener.Millennium.findElement(document, '._1Ky59qmywxOUtNcI1cgmkX._3s0lkohH8wU2do0K1il28Y'))[0];

	// 	console.log(titleView);
	// 	titleView.classList.toggle('backDisabled', window.opener.MainWindowBrowserManager.m_browser.CanGoBackward());
	// });

	if (!sidebarInitialized) {
		backBtn.addEventListener('click', () => window.opener.MainWindowBrowserManager.m_history.goBack());
		// backBtn.addEventListener("click", () => window.opener.MainWindowBrowserManager.m_history.goForward())
		libraryButton.addEventListener('click', () => navigate(false, libraryButton, '/library/home'));
		collectionsButton.addEventListener('click', () => navigate(false, collectionsButton, '/library/collections'));
		activityButton.addEventListener('click', () => navigate(false, activityButton, '/browser', window.opener.urlStore.m_steamUrls.SteamIDFriendsPage.url));
		communityBtn.addEventListener('click', () => navigate(false, communityBtn, '/browser', window.opener.urlStore.m_steamUrls.CommunityHome.url));
		storeBtn.addEventListener('click', () => navigate(false, storeBtn, '/browser', window.opener.urlStore.m_steamUrls.StoreFrontPage.url));
		downloadBtn.addEventListener('click', () => navigate(false, downloadBtn, '/library/Downloads'));
		sideBarDiv.querySelector('#settings').addEventListener('click', () => window.opener.open('steam://open/settings'));
	} else {
		switch (window.opener.settingsStore.m_ClientSettings.start_page) {
			case 'library': {
				navigate(true, libraryButton);
				window.opener.console.log('Indicator: Library');
				break;
			}
			case 'store': {
				navigate(true, storeBtn);
				window.opener.console.log('Indicator: Store');
				break;
			}
		}
	}
}
