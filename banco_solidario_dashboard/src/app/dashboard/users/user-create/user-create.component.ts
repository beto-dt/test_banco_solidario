import { Component, inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
export interface UserIt {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
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

  nameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private usersService:UserService,
    private router:Router,
    private snackBar: MatSnackBar
  ){}

  onAddUser(): void {
    const nombre = this.nameFormControl.value;
    const apellido = this.lastnameFormControl.value;
    const correo = this.emailFormControl.value;
    const contrasena = this.passwordFormControl.value;

    let user: UserIt = {
      nombre:nombre!,
      apellido:apellido!,
      correo:correo!,
      password: contrasena!
    }

    console.log(user);

    this.usersService.saveUser(user).subscribe( res => {
        this.snackBar.open("Usuario Guardado","",{duration:this.durationInSeconds});

        this.router.navigateByUrl('/dashboard/users/users');
      },
      err => console.log(err))
  }
}
