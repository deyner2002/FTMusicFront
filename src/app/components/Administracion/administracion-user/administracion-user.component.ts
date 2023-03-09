import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AccountService, AlertService } from 'src/app/services/auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { RolesService } from 'src/app/services/user/roles.service';
import { UserService } from 'src/app/services/user/user.service';
import { Role, RoleChange, UserRegister } from 'src/app/shared/models/Interfaces';

@Component({
  selector: 'app-administracion-user',
  templateUrl: './administracion-user.component.html',
  styleUrls: ['./administracion-user.component.css']
})
export class AdministracionUserComponent implements OnInit {
  idEdit: string;
  Form1: FormGroup;
  value = ''
  loading = false;
  submitted = false;
  paso_1: boolean = false
  Users = [];
  RolesBd = [];

  selectedUsers: UserRegister[];
  constructor(private alertService: AlertService, private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private roleservice: RolesService,
    private Userservice: UserService,
    private menu: MenuService) {
    menu.tilteMenu = "Usuarios";
  }

  displaySave: boolean = false;

  ngOnInit(): void {

    this.Get();
    this.GetRoles();

    this.Form1 = this.formBuilder.group({
      RolText: ['', Validators.required],
      Roles: ['', Validators.required],
      Name: ['', Validators.required],

    })

    this.Form1.controls["RolText"].disable();
    this.Form1.controls["Name"].disable();
  }


  Get() {
    this.alertService.clear();


    this.loading = true;
    this.Userservice.getUsers().subscribe(data => {
      if (!data['iserror']) {
        this.Users = data['obj'];
      } else {
        this.alertService.error(data.message);
      }

    },
      (error) => {
        this.alertService.error("Ha ocurrido un error ");
        this.loading = false;
      }
    )
  }

  GetRoles() {
    this.alertService.clear();


    this.loading = true;
    this.roleservice.GetRole(true).subscribe(data => {
      this.RolesBd = data;


    },
      (error) => {
        this.alertService.error("Ha ocurrido un error ");
        this.loading = false;
      }
    )
  }

  showSve(id) {
    this.loading = true;
    this.paso_1 = true;
    let UserEdit = this.Users.find(w => w.id == id);
    this.idEdit = id;

    setTimeout(() => {
      this.editRow(UserEdit);
    }, 500);
  }


  editRow(UserEdit) {

    this.Form1.controls["RolText"].setValue(UserEdit.roles);
    this.Form1.controls["Name"].setValue(UserEdit.firstName +' ' +UserEdit.lastName);
  }

  cancelarEdit() {

    this.paso_1 = false;
    this.Form1.reset();
    this.idEdit = '';
  }


  ChangeRole() {
    this.alertService.clear();
    const reportDto: RoleChange = this.Form1.value;
    reportDto.id = this.idEdit;
    console.log(reportDto);
    this.confirmationService.confirm({
      message: 'Esta seguro de cambiar este usuario a rol ' + reportDto.Roles,
      header: 'Atencion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.Userservice.ChangeRole(reportDto.Roles, reportDto.id).subscribe(data => {
          if (!data.iserror) {
            this.Get();
          } else {
            this.alertService.error(data.message);
          }

        },
          (error) => {
            this.Form1.reset();
            this.alertService.error("Ha ocurrido un error en el registro. Verifique que la información este correcta");
            this.loading = false;
          }
        )
      }
    });

    this.Form1.reset();
    this.paso_1 = false;
  }


}
