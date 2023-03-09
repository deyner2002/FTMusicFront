import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { UserLogged, UserRole } from '../../../../shared/models/Interfaces';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.css']
})
export class UserProfileCardComponent implements OnInit {

  userForm: FormGroup;
  user:UserLogged
  roles:string = ''
  isEdit:boolean = false;
  private userRoles:UserRole[] = []

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this._initProfile()
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      profession: ['', Validators.required],
      email: ['', Validators.required]  
    })
  }

  private _initProfile()
  {
      this.getUser()
  }

  private getUser()
  {
    this.userService.getUser()
      .pipe(finalize(()=> {     
          let role = new BehaviorSubject<UserRole>(JSON.parse(localStorage.getItem("Role")));
          this.roles = role.value.roleName;
      }))
      .subscribe(result => {
        this.user = result.obj;
      })
   
  }

  private getRoles()
  {
    this.userService.getUserRole()
      .pipe(finalize(()=>{
        this.roles = this.userRoles.map(m => m.roleName).join('-')
      }))    
      .subscribe(result => {
        this.userRoles = result.obj
      })
  }

  toggleEdit()
  {
    if (!this.isEdit) 
      this.isEdit = true
    else
      this.isEdit = false
  }

  get f() { return this.userForm.controls}

  onSubmit()
  {
    this.userService.editUser(this.user)    
      .pipe(finalize(()=>{
        this.toggleEdit()
      }))
      .subscribe(result => {    
        console.log(result)
      }, 
        (error) => {          
            console.error(error.message);      
        })
  }

}
