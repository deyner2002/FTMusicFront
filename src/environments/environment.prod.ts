let Host="http://167.86.106.173:7676/back/api";
export const environment = {
  production: true,
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

/*let Host="https://localhost:7280/api"
export const environment = {
  production: false,
  ApiVersion: "v1",
  HostApi: `${Host}/api`,
  Login:`${Host}/User/login`,
  RegisterUser:`${Host}/User/Save`, 
};*/