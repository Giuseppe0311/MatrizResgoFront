export interface KeycloakUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  attributes?: {
    idEmpresa?: string[];
  };
  realmRoles: string[];
  enabled: boolean;
  nombreEmpresa?: string;
}
