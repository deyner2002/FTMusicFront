import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RolesUserService } from '../services/auth/roles-user.service';
import { EnumRoles } from '../shared/Enumeradores/enumRoles.enum';

@Directive({
  selector: '[appPerfil]'
})
export class PerfilDirective {
  @Input() set appPerfil(component: EnumRoles) {
    if (this.obtenerPermisologia(component)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

  }
  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private serviceRolesUser:RolesUserService) {

  }
  private obtenerPermisologia(elemento: EnumRoles) 
  {
    return this.serviceRolesUser.onValidarMenu(elemento);
  }

}
