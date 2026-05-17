if (window.location.href === 'https://steamcommunity.com/') {
	let el = (await Millennium.findElement(document, '.community_home_tabs .apphub_sectionTabs.responsive_hidden'))[0];

	let a = document.createElement('a');
	a.href = 'https://steamcommunity.com/market/';
	a.className = 'apphub_sectionTab';
	a.innerHTML = '<span>Market</span>';

	el.insertBefore(a, el.lastElementChild);
}
