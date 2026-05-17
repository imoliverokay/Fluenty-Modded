/*jshint esversion: 8 */

const STEAMVR_APPID = 250820;
const BUTTON_MARKER_CLASS = 'fluenty-vr-button';

const VR_SVG = `
<svg class="fluenty-vr-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="currentColor" d="M3 6h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4.5a2 2 0 0 1-1.6-.8L13 14.5a1.25 1.25 0 0 0-2 0l-1.9 2.7a2 2 0 0 1-1.6.8H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm3 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
</svg>`;

function injectStyles() {
    if (document.getElementById('fluenty-vr-button-style')) return;
    const style = document.createElement('style');
    style.id = 'fluenty-vr-button-style';
    style.textContent = `
        .${BUTTON_MARKER_CLASS} {
            -webkit-app-region: no-drag;
            cursor: pointer;
            min-width: 30px !important;
            min-height: 30px !important;
            width: 30px;
            height: 30px;
            display: grid !important;
            place-items: center;
            border-radius: 4px !important;
            background: transparent !important;
            transition: background 0.15s ease-out;
        }
        .${BUTTON_MARKER_CLASS}:hover {
            background: var(--fill-color-subtle-secondary) !important;
        }
        .${BUTTON_MARKER_CLASS}:active {
            background: var(--fill-color-subtle-tertiary, rgba(255, 255, 255, 0.04)) !important;
        }
        .${BUTTON_MARKER_CLASS} .fluenty-vr-icon {
            width: 18px;
            height: 18px;
            display: block;
            color: var(--fill-color-text-primary);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

function buildButton() {
    const btn = document.createElement('div');
    btn.className = `_2Szzh5sKyGgnLUR870zbDE ${BUTTON_MARKER_CLASS}`;
    btn.setAttribute('title', 'Launch SteamVR');
    btn.setAttribute('role', 'button');
    btn.innerHTML = VR_SVG;
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            window.opener.open(`steam://run/${STEAMVR_APPID}`);
        } catch (err) {
            console.error('Fluenty VR button: failed to launch SteamVR', err);
        }
    });
    return btn;
}

function ensureVRButton() {
    const container = document.querySelector('._1ENHEsrSLcTRtPQFl1F-wL ._3cykd-VfN_xBxf3Qxriccm');
    if (!container) return;
    if (container.querySelector(`.${BUTTON_MARKER_CLASS}`)) return;
    injectStyles();
    container.appendChild(buildButton());
}

export function vrButton() {
    if (document.title !== 'Steam') return;

    ensureVRButton();

    const observer = new MutationObserver(() => {
        ensureVRButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
