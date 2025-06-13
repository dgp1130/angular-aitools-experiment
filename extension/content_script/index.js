const extensionId = 'amdlmjdhfiimanlibngmldibbgbdacja';

const script = document.createElement('script');
script.src = `chrome-extension://${extensionId}/injection/index.js`;
script.type = 'module';
document.head.appendChild(script);
