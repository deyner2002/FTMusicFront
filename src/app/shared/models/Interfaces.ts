
export interface RoleResult {
    iserror:boolean
    mesage:string
    obj: UserRole[]
}

export interface UserResult {
    iserror:boolean
    mesage:string
    obj: UserLogged
}
export interface UserRegister 
{
    firstName: string;
    lastName: string;
    rutNumber: string;
    birthdate: string;
    gender: string;
    adress: string;
    phoneNumber: string;
    profession: string;
    email: string;
    password: string;
    ConfirmPassword:string;
    token:string;
    country:number;
    declaracion:string,
    fondos:string;
    relacionpolitica:string;

}

export interface RegisterResponse {
    message?: string;
}

export interface UserRole {
    idRole:     string;
    roleName:   string;
    isSelected: boolean;
}
export interface Role {
    id:     string;
    roleName:   string;
    normalizedName: string;
}

export interface RoleChange {
    id:string;
    Roles:   string;
}

export interface UserLogged {
    firstName:            string;
    lastName:             string;
    rutNumber:            string;
    birthdate:            Date;
    gender:               string;
    adress:               string;
    phoneNumber:          string;
    profession:           string;    
    email:                string;
}

export interface Response
{
    obj: object
    message: string;
    iserror: boolean
}
