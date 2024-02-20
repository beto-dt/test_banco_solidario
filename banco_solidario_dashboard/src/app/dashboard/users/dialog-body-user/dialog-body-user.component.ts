import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-dialog-body-user',
  templateUrl: './dialog-body-user.component.html',
  styleUrls: ['./dialog-body-user.component.scss']
})
export class DialogBodyUserComponent implements OnInit {
  durationInSeconds = 3000;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService:UserService,
    private snackBar: MatSnackBar
  ){}
  ngOnInit(){}

  deleteUser() {
    const id = this.data.id_usuario;

    let user: any = {
      id:id!
    }
    console.log(user)
    this.userService.deleteUser(user).
    subscribe(
      res => {
        this.snackBar.open("User Deleted","",{duration:this.durationInSeconds});
        location.reload();
      },
      err => {
        this.snackBar.open("User Not Deleted","",{duration:this.durationInSeconds});
      }
    )
  }
}
