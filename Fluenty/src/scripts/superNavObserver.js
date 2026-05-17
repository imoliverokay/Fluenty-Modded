import { waitForElement } from "./waitForElement.js";
/**
 * This function updates the selected node in the sidebar
 * @param {string} matchCase a string that represents the current page
 */
const UpdateSelectedNode = (matchCase) => {
    waitForElement('#downloads', 3000).then((_) => {
        const sideBarElements = {     
            "community":   document.querySelector('#community'),
            "store":       document.querySelector('#store'),
            "library":     document.querySelector('#library'),
            "collections": document.querySelector('#collections'),
            "activity":    document.querySelector('#activity'),
            "downloads":   document.querySelector('#downloads'),
        };
    
        document.querySelector(".button.active")?.classList.remove("active");
        const selectedElement = sideBarElements[matchCase.toLowerCase()];
    
        if (selectedElement) {
            document.querySelector(".activeIndicator").style.top = selectedElement.offsetTop + "px";
            selectedElement.classList.add("active");
        }
    });
}
/**
 * @param {string} url the url of the current page
 */
const HandleBrowserChange = (url) => {
    const activityPattern = /^https:\/\/steamcommunity\.com\/id\/[^\/]+\/home\/$/;
    const storePattern = /^https:\/\/store\.steampowered\.com\/.*$/;
    const communityPattern = /^https:\/\/steamcommunity\.com\/.*$/;

    if (activityPattern.test(url))       UpdateSelectedNode("activity");
    else if (storePattern.test(url))     UpdateSelectedNode("store");
    else if (communityPattern.test(url)) UpdateSelectedNode("community"); 
}

const WaitForBrowserHistory = () => {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (window.opener && window.opener.MainWindowBrowserManager && window.opener.MainWindowBrowserManager.m_history) {
                clearInterval(interval);
                resolve(window.opener.MainWindowBrowserManager.m_history);
            }
        }, 1);
    });
}

export const handleSuperNavChanges = async () => {
    WaitForBrowserHistory().then((navRouter) => {
        navRouter.listen((event) => {
            if      (event.pathname.startsWith('/browser'))     event?.state?.strURL && HandleBrowserChange(event.state.strURL);    
            else if (event.pathname === '/library/collections') UpdateSelectedNode("collections");      
            else if (event.pathname === '/library/Downloads')   UpdateSelectedNode("downloads");      
            else if (event.pathname.startsWith('/library'))     UpdateSelectedNode("library");   
        })
    })
}