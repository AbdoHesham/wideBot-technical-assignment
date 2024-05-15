import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './features/home/home.component';
import { UsersModule } from './features/users/users.module';

@NgModule({
  declarations: [MainLayoutComponent, HomeComponent],
  imports: [
    LayoutRoutingModule,
    SharedModule,
    UsersModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
})
export class LayoutModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
