chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("ext-nexus-mods: adding listener");
    if (request.action === 'getSourceAndProcess') {
        getSourceAndProcess(request.url)
            .then(text => {
                sendResponse(text);
            });
        return true; // Keep the message channel open for async sendResponse
    }
});

function getSourceAndProcess(url) {
    return new Promise((resolve) => {
        console.log("in getSourceAndProcess");

        const ogTitleElement = document.querySelector('meta[property="og:title"]');
        console.log("title: " + ogTitleElement.content);
        const ogDescElement = document.querySelector('meta[property="og:description"]');
        console.log("desc: " + ogDescElement.content);

        if (ogTitleElement && ogTitleElement.content && ogDescElement && ogDescElement.content) {
            const text = formatResultText(url, ogTitleElement.content, ogDescElement.content);
            resolve(text);
        } else {
            resolve(null);
        }
    });
}

function formatResultText(current_url, title, desc) {
    // console.log("in formatResultText");
    return title + "\n\t" + desc + "\n\t" + current_url + "\n\n";
}
