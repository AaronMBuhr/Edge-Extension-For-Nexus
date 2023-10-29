
document.getElementById('copyButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTabUrl = tabs[0].url;
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getSourceAndProcess', url: currentTabUrl }, function (derivedInfo) {
            // alert("returned: " + derivedInfo);
            copyToClipboard(derivedInfo);
            window.close();
        });
    });
});

// Function to copy the derived information to the clipboard
function copyToClipboard(text) {
    // console.log("copying to clipboard: " + text);
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}
