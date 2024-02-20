import { Component, inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {AccountService} from "../../../services/account.service";
export interface UserIt {
  card_id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  created: any;
}

export interface AccountIt {
  id_user: string;
  total: any;
  description: string;
  id_rateType: any;
  created: any;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  hide = true;
  durationInSeconds = 3000;

  cardIdFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  nameLastFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private usersService:UserService,
    private accountService:AccountService,
    private router:Router,
    private snackBar: MatSnackBar
  ){}

  onAddUser(): void {
    const card_id = this.cardIdFormControl.value;
    const name = this.nameFormControl.value;
    const lastname = this.nameLastFormControl.value;
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    const created = new Date();


    let user: UserIt = {
      card_id:card_id!,
      name:name!,
      lastname:lastname!,
      email: email!,
      password: password!,
      created:created!
    }

    console.log(user);

    this.usersService.saveUser(user).subscribe( res => {
      this.usersService.getUsersLastId().subscribe(res => {
        console.log(res);
        let account: AccountIt = {
          id_user:res[0].id_user,
          total:0,
          description:'Cuenta de Ahorros',
          id_rateType: 1,
          created:new Date()
        }
          this.accountService.saveAccount(account).subscribe(res =>{
            this.snackBar.open("User Added","",{duration:this.durationInSeconds});
            this.snackBar.open("Account Added","",{duration:this.durationInSeconds});
              this.router.navigateByUrl('/dashboard/users/users');

          },err => console.log(err)
          )


          },err => console.log(err))
      },
      err => console.log(err))
  }
}
