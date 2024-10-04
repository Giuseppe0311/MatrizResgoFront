import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {authInterceptor} from "./interceptor/auth.interceptor";
import { routes } from './app.routes';
import {provideHttpClient,withInterceptors } from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        preventDuplicates: true
      })
    ),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
