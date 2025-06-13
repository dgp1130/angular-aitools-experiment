chrome.runtime.onMessageExternal.addListener((msg) => {
    console.log('SW proxy', msg);

    chrome.runtime.sendMessage(msg);
});
