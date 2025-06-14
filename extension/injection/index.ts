import { analyze } from './analyzer.js';
import { collectLogs } from './collector.js';

(async () => {
    const extensionId = 'amdlmjdhfiimanlibngmldibbgbdacja';

    console.log('Collecting logs...');
    collectLogs((...args) => {
        chrome.runtime.sendMessage(extensionId, {
            type: 'logs',
            args: args.map((arg) => stringifyArg(arg)),
        });
    });

    const root = await waitForApp();
    const analysis = await analyze(root);
    chrome.runtime.sendMessage(extensionId, {
        type: 'analysis',
        analysis,
    });
})();

function waitForApp(): Promise<Element> {
    return new Promise((resolve) => {
        const handle = setInterval(() => {
            const app = document.querySelector('[ng-version]');
            if (!app) return;

            clearInterval(handle);
            resolve(app);
        });
    });
}

function stringifyArg(arg: unknown): string {
    if (arg instanceof Error) {
        return arg.stack!;
    } else {
        return String(arg);
    }
}
