import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  durationInSeconds = 3000;

  nameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  public user: any = [];

  constructor(
    private usersService:UserService,
    private router:Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;

    if (params['id']) {
      this.usersService.getUser(params['id']).subscribe(
        (res) => {
          this.user = res.data[0];
          console.log(this.user);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onEditUser(): void {
    const params = this.activatedRoute.snapshot.params;
    const nombre = this.nameFormControl.value;
    const apellido = this.lastnameFormControl.value;

    let user: any = {
      nombre:nombre!,
      apellido:apellido!
    }


    this.usersService.updateUser(user,params['id']).subscribe( res => {
        this.snackBar.open("Usuario Actualizado","",{duration:this.durationInSeconds});

        this.router.navigateByUrl('/dashboard/users/users');
      },
      err => console.log(err))
  }
}
