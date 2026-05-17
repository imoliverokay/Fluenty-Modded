const notification = {
    width: 400, 
    height: 250
};

(async () => {
    console.log('attempting to get dimensions')
    const dim = await SteamClient.Window.GetDefaultMonitorDimensions((_, __, width, height) => {
        console.log(width, height)

        // SteamClient.Window.ResizeTo(notification.width, notification.height, true)
        // SteamClient.Window.MoveTo(width - notification.width, height - notification.height)
    })
})()

function pause() {
    debugger
    setTimeout(() => { 
        pause()
    }, 100);
}

(() => pause())()