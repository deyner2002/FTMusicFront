// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let Host="http://167.86.106.173:7676/back/api"/*"http://167.86.106.173:7676/back/api"*/
export const environment = {
  production: false,
  ApiVersion: "v1",
  HostApi: `${Host}/api`,
  Login:`${Host}/Account/login`,
  RegisterUser:`${Host}/Account/register`, 
  Bancos:`${Host}/Banco`, 
  Motivos:`${Host}/MotivoTranferencia`, 
  Pais:`${Host}/Pais`, 
  TipoIdent:`${Host}/TipoIdentificacion`, 
  Parentesco:`${Host}/Parentesco`, 
  GetUser: `${Host}/User`,
  GetRolesById: `${Host}/User/ManageUserRoles`,
  Account:`${Host}/Account`,
  User:`${Host}/User`,
  Rol:`${Host}/Role`,
  EditUser:`${Host}/User/UpdateUser`,
  Beneficiary: `${Host}/Beneficiario`,  
  Tarifa: `${Host}/Tarifas`,
  Transferencia:`${Host}/Transferencia`,
};

let Host2="https://localhost:7280/api"
export const environment2 = {
  production: false,
  ApiVersion: "v1",
  HostApi: `${Host}/api`,
  RegisterUser:`${Host2}/User/Save`, 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
