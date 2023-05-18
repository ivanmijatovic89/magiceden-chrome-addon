chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "insertCSS") {
        chrome.tabs.insertCSS(sender.tab.id, {file: "customStyles.css"});
    }
});