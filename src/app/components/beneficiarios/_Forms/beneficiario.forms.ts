import { FormControl as fc, FormGroup, Validators } from '@angular/forms';

export const beneficiarioForm: FormGroup = new FormGroup({
  
    Id: new fc(),
    Name: new fc(),
    LastName: new fc(),
    IdType: new fc(),
    IdNumber: new fc(),
    BankName: new fc(),
    AccountType: new fc(),
    AccountNumber: new fc(),
    Relationship: new fc(),
    ReasonTransfer: new fc(),
    Email: new fc(),
   
});