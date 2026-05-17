export async function handleLibraryContainerResize() {

    function prepareResizeListener(matchingElement) {

        document.getElementById('LIBRARY_ICONS_DYN')?.remove();

        if (matchingElement?.children?.length === 4) {
            const style = document.createElement('style');
            style.id = 'LIBRARY_ICONS_DYN';
            style.textContent = `
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-:nth-child(1)::before {
                    content: "";
                }
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-:nth-child(2)::before {
                    content: "";
                }
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-:nth-child(3)::before {
                    content: "";
                }
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-:not(._2WaHZuAetbqENmqDthu3nl):nth-child(4)::before {
                    content: "";
                }
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-._2WaHZuAetbqENmqDthu3nl:nth-child(4)::before {
                    content: "";
                    color: #67b3ff;
                }
            `;
            document.head.appendChild(style);
        }
        else {
            const style = document.createElement('style');
            style.id = 'LIBRARY_ICONS_DYN';
            style.textContent = `
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-:nth-child(1)::before {
                    content: "";
                }
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-:nth-child(2)::before {
                    content: "";
                }
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-:not(._2WaHZuAetbqENmqDthu3nl):nth-child(3)::before {
                    content: "";
                }
                .lO1IF132jJ1gc9yz2HYvV ._3qDWQGB0rtwM3qpXTb11Q-._2WaHZuAetbqENmqDthu3nl:nth-child(3)::before {
                    content: "";
                    color: #67b3ff;
                }
            `;
            document.head.appendChild(style);
        }          
    }


    const targetNode = document.body;
    const config = { childList: true, subtree: true };
  

    window.gameNodes = []

    const observer = new MutationObserver(mutationsList => {
        const matchingElements = document.querySelector('.lO1IF132jJ1gc9yz2HYvV');

        if (matchingElements != null) {
            prepareResizeListener(matchingElements);

            // Absolutely insane dirty fix to the pesky "private" icon on private games
            // As long as it works, I don't really care -clawdius
            const p = document.querySelectorAll("._3oddBTkj_FjknCgBnPqcmQ")
            for(let s of p) {
                if(s.childNodes[0]?.classList[0] == "HeHYcNrMxDY4kBR7nF9EH") {
                    s.insertBefore(s.childNodes[1], s.childNodes[0]);
                }
        }    
        }

        // if (document.querySelector('.ReactVirtualized__Grid__innerScrollContainer')) { 
        //     console.log("Setting new panel height!");

        //     document.querySelectorAll(".ReactVirtualized__Grid__innerScrollContainer .Panel").forEach(panel => {

        //         // iterate over gameNodes and remove elements that are not in the DOM
        //         window.gameNodes.forEach((node, index) => {
        //             if (!document.body.contains(node)) {
        //                 window.gameNodes.splice(index, 1);
        //             }
        //         })


        //         const ORIGINAL_HEIGHT = 26;
        //         const NEW_HEIGHT = 50;

        //         if (!window.gameNodes.includes(panel)) 
        //             window.gameNodes.push(panel);

        //         panel.style.height = 50 + 'px';

        //         const actualTop = window.gameNodes.indexOf(panel) * NEW_HEIGHT;
        //         panel.style.top = (parseInt(actualTop) + (NEW_HEIGHT - ORIGINAL_HEIGHT)) + 'px';
        //     })


        // }
    });
  
    observer.observe(targetNode, config);
}