import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
  if(window){
    window.console.log=function(){};
    window.console.error=function(){};
    window.console.warn=function(){};
    window.console.time=function(){};
    window.console.timeEnd=function(){};

  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
