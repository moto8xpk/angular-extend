import { MissingTranslationStrategy } from '@angular/core';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

  // use the require method provided by webpack
declare const require;
// we use the webpack raw-loader to return the content as a string
const translations = require(`raw-loader!./locale/messages.fr-fr.xlf`);
 
platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error,
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
});