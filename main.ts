import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import * as debug from 'debug';

if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  (<any>window).debug = debug;
  debug.enable("app:*,-app:gateway");
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
