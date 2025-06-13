chrome.devtools.panels.create(
    /* title= */ 'Angular AITools',
    /* icon= */ '/public/favicon.ico',
    /* page= */ '/index.html',
    /* onCreated= */ () => {
        console.log('Created Angular AITools panel!');
    },
);
