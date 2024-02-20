import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm = this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })
  constructor(private authService:AuthService,private fb:FormBuilder ,private router: Router) {}

  onLogin(){
    const formValue = this.loginForm.value;
    console.log(formValue)
    this.authService.login(formValue).subscribe(res=>{
      if(res.status == false){
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['/dashboard/users/users']);
      }
    })
  }
}
