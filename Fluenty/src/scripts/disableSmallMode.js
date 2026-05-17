import { waitForElement } from "./waitForElement.js";

(async () => {
    if (document.title !== 'View Root Menu') 
        return;

    try {
        const { matchedElements } = await waitForElement('._2jXHP0742MyApMUVUM8IFn', 3000);

        matchedElements.forEach((element) => { 
            if(element.innerText == 'Small Mode') { 
                window.opener.console.log('Small mode button temporarily removed from the View menu to avoid unnecessary "known bug" reports.');
                element.remove() 
            } 
        })
    }
    catch(error) {
        console.error(error, 'took too long to find the requested element');
    }
})()