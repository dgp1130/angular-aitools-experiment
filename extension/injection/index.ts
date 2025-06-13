import { analyze } from './analyzer.js';

(async () => {
    const analysis = await analyze();
    console.log('Emitting', analysis);

    const extensionId = 'amdlmjdhfiimanlibngmldibbgbdacja';
    chrome.runtime.sendMessage(extensionId, {
        type: 'analysis',
        analysis,
    });
})();
