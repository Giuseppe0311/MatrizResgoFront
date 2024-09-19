import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environment.dev';

export function initializeKeycloak(keycloak: KeycloakService) {
  return (): Promise<boolean> =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      enableBearerInterceptor:true,
      bearerPrefix:'bearer',
      bearerExcludedUrls:["/assets"],
      initOptions: {
        onLoad: 'check-sso',
       silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
      }
    });
}
