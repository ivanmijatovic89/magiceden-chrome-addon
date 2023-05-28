chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "insertCSS") {
        console.log('insertCSS');
        chrome.tabs.insertCSS(sender.tab.id, {file: "homepage.css"});
    }
});
