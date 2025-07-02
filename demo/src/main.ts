import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { analyze } from './analyzer';

declare global {
  interface ImportMeta {
    hot: {
      send(name: string, msg: {}): void;
      on(name: string, cb: (msg: {}) => void): void;
    }
  }
}

setTimeout(async () => {
  const appRef = await bootstrapApplication(App, appConfig);

  const analysis = await analyze(appRef.components[0].location.nativeElement);
  import.meta.hot.send('angular:di-graph', {analysis});
}, 1_000);
