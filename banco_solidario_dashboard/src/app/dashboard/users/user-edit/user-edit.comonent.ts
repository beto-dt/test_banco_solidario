import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export interface UserIt {
  id: string;
}
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  durationInSeconds = 3000;

  nameFormControl = new FormControl('', [Validators.required]);
  public user: any = [];

  constructor(
    private usersService:UserService,
    private router:Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    let user: any = {
      id:params['id'],
    }
    if (params['id']) {
      this.usersService.getUser(user).subscribe(
        (res) => {
          this.user = res.result[0];
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
    const name = this.nameFormControl.value;

    let user: any = {
      id:params['id'],
      name:name!,
    }


    this.usersService.updateUser(user).subscribe( res => {
        this.snackBar.open("Updated User","",{duration:this.durationInSeconds});

        this.router.navigateByUrl('/dashboard/users/users');
      },
      err => console.log(err))
  }
}
