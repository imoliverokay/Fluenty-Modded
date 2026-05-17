import './src/scripts/reloadButton.js'
import './src/scripts/restartButton.js'

import { renderer } from './src/scripts/renderer.js';
import { RegisterForUpdates } from './src/scripts/downloadMonitor.js';
import { handleSuperNavChanges } from './src/scripts/superNavObserver.js';
import { handleLibraryContainerResize } from './src/scripts/libraryContainerObserver.js';
import { customSearch } from './src/scripts/customSearch.js';
import { vrButton } from './src/scripts/vrButton.js';

console.log('Loading components...');
renderer();

console.log('Adding SteamVR launch button...');
vrButton();

console.log('Registering for download overview...');
RegisterForUpdates();

console.log('Watching SuperNavigator changes...');
handleSuperNavChanges();

console.log('Observing library container')
handleLibraryContainerResize()

console.log('Initializing custom search function');
customSearch();


// help skin element that dissappear
document.addEventListener('keyup', (e) => { if (e.ctrlKey && e.code === 'ArrowDown') { debugger; } }, false);