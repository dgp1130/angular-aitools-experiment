# Angular AITools

Testing out potential AI integrations for Angular DevTools.

This is just an experiment with AI and Angular, not a commitment to anything in particular.

## How to run

Add a Gemini API key to `extension/src/.api_key.ts`:

```typescript
export const API_KEY = '...';
```

Build the extension:

```shell
(cd extension/ && npm run -s build)
```

Install the extension from `chrome://extensions`. Load the unpacked extension from
`${projectRoot}/extension/dist/angular-aitools/browser/`.

Start the demo devserver:

```shell
(cd demo/ && npm start)
```

Open http://localhost:4200/ and inspect the page. Switch to the Angular AITools tab.
Ask a question about DI on the page.
