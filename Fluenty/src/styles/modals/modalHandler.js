import { waitForElement } from '../../scripts/waitForElement.js';

/* When the persona status changes, update it on the settings header */
async function RegisterForPersonaMessages() {
	function updateState(status, col) {
		const accountStatus = document.getElementById('accountStatus');
		accountStatus.textContent = status;
		accountStatus.style.color = col;
	}
	window.opener.SteamClient.Messaging.RegisterForMessages('PersonaState', (e, type, n) => {
		if (type == 'PersonaUpdate') {
			let event = JSON.parse(n);

			switch (event) {
				case 0: {
					updateState('Offline', '#6B6B6B');
					break;
				}
				case 1: {
					updateState('Online', '#5ABCE9');
					break;
				}
				case 7: {
					updateState('Invisible', '#6B6B6B');
					break;
				}
				case 3: {
					updateState('Away', '#4C91AC');
					break;
				}
			}
		}
	});
}

async function RemoveDeveloperTab() {
	document.querySelectorAll('._1-vlriAtKYDViAEunue4VO ._2PPbMrzl8PKBwpkjYs9b0i').forEach(function (element) {
		if (element.textContent.trim() === 'Developer') {
			const parentDiv = element.parentElement;
			parentDiv.parentNode.removeChild(parentDiv);
		}
	});
}

async function ShowAccountInformation() {
	waitForElement('._2kwFFHckg8jvnwJfg9-la8').then(async (_, element) => {
		RegisterForPersonaMessages();
		RemoveDeveloperTab();
		//ping steam and ask for current persona
		window.opener.SteamClient.Messaging.PostMessage('PersonaState', 'RequestPersonaState', '{}');

		const container = document.querySelector('._2rjVTGz8aLvqOdz5v2gq5C');
		container.textContent = ''; // remove Steam Settings Header

		const account_info_container = document.createElement('div');
		account_info_container.id = 'accountContainer';
		account_info_container.style.display = 'flex';
		account_info_container.style.alignItems = 'center';
		account_info_container.style.padding = '11px';
		account_info_container.style.borderRadius = '6px';
		account_info_container.style.marginLeft = '-18px';
		account_info_container.style.marginRight = '-9px';

		account_info_container.addEventListener('mouseenter', function () {
			account_info_container.style.background = 'rgb(var(--dark-2d))';
		});

		account_info_container.addEventListener('mouseleave', function () {
			account_info_container.style.background = 'initial';
		});

		const img = document.createElement('img');
		img.style.width = '60px';
		img.style.borderRadius = '50px';
		img.style.marginRight = '10px';

		const accountDetails = document.createElement('div');
		accountDetails.id = 'accountDetails';
		accountDetails.style.textTransform = 'none';
		accountDetails.style.color = 'white';
		accountDetails.style.fontWeight = 'normal';

		const accountPersona = document.createElement('div');
		accountPersona.id = 'accountPersona';
		accountPersona.textContent = '...';
		accountPersona.style.fontSize = '14px';

		const accountStatus = document.createElement('div');
		accountStatus.id = 'accountStatus';
		accountStatus.textContent = 'Offline';
		accountStatus.style.fontSize = '12px';

		accountDetails.appendChild(accountPersona);
		accountDetails.appendChild(accountStatus);

		account_info_container.appendChild(img);
		account_info_container.appendChild(accountDetails);

		container.appendChild(account_info_container);

		window.opener.SteamClient.User.GetLoginUsers().then((user) => {
			document.getElementById('accountPersona').textContent = user[0].personaName;

			const accountContainerImg = document.querySelector('#accountContainer img');
			accountContainerImg.setAttribute('src', user[0].avatarUrl);
			accountContainerImg.setAttribute('alt', user[0].personaName);
		});
	});
}

const ModalProps = {
	InitializeSettings: () => {
		SteamClient.Window.SetMinSize(1050, 820);
		ShowAccountInformation();

		const sidebar = document.querySelector('._18QCu-7MTzd51UpVbYysDy');

		const div = document.createElement('div');
		div.classList.add('activeIndicator');
		div.style.top = '153px';
		div.style.left = '12px';
		div.style.opacity = '0';
		sidebar.appendChild(div);
	},
	InitializeProperties: () => {
		const sidebar = document.querySelector('._18QCu-7MTzd51UpVbYysDy');

		const div = document.createElement('div');
		div.classList.add('activeIndicator');
		div.style.top = '153px';
		div.style.left = '12px';

		sidebar.appendChild(div);
	},
};

async function InitializeUI() {
	function ImportModuleAsync(relativePath) {
		const scriptUrl = new URL(import.meta.url);
		const basePath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/'));

		document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: [basePath, relativePath].join('/') }));
	}

	waitForElement('._3few7361SOf4k_YuKCmM62').then(async ({ matchedElements }) => {
		const matches = (await waitForElement('.ModalPosition_Content .Panel')).matchedElements[0];

		if (document.querySelector('.MillenniumSettings')) {
			return ModalProps.InitializeProperties();
		}

		if (matches.classList.contains('millennium-settings')) {
			SteamClient.Window.SetMinSize(842, 601);
			SteamClient.Window.ResizeTo(842, 601, false);
			ImportModuleAsync('./settings/Millennium.css');
			ModalProps.InitializeProperties();
			return;
		}

		ImportModuleAsync('./settings/Settings.css');
		ModalProps.InitializeSettings();
	});
	waitForElement('._1FyBL6obxHQ2Z2CsaV2Gbz').then(({ matchedElements }) => {
		ImportModuleAsync('./properties/Properties.css');
		ModalProps.InitializeProperties();
	});
}

//init settings renderer
InitializeUI();
