import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BancoModel } from 'src/app/shared/models/BancoModel';
import { BeneficiaryModel } from 'src/app/shared/models/beneficiaryModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  endpintBeneficiarios:string;

  constructor(private http:HttpClient) {
    this.endpintBeneficiarios = environment.Beneficiary
   }


  getBeneficiarios( role: string, id:string)
  {   
    return this.http.get<any>(this.endpintBeneficiarios + "?Role="+role+"&Id="+id)     
  }

  registerBeneficiario(data: BeneficiaryModel )
  {   
    return this.http.post<any>(this.endpintBeneficiarios , data, { })     
  }

  DeleteBeneficiario(id:number  )
  {   
    return this.http.delete<any>(this.endpintBeneficiarios + "?ID="+id)     
  }

  UpdateBeneficiario(data: BeneficiaryModel )
  {   
    return this.http.put<any>(this.endpintBeneficiarios, data, { })     
  }

}
