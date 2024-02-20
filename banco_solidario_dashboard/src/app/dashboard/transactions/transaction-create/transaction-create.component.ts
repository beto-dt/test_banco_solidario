import { Component, inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {AccountService} from "../../../services/account.service";
import {TransactionService} from "../../../services/transaction.service";


export interface TransactionIt {
  id_account: any;
  type: any;
  total: any;
  created: any;
}

export interface AccountIt {
  id: any;
  total: any;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})
export class TransactionCreateComponent {
  public total_account_actually : any = 0;
  public total : any = 0;

  public total_final : any = 0;


  hide = true;
  durationInSeconds = 3000;

  typeFormControl = new FormControl('', [Validators.required]);
  totalFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private transactionService:TransactionService,
    private accountService:AccountService,
    private router:Router,
    private snackBar: MatSnackBar
  ){}

  onAddUser(): void {
    this.total_account_actually = localStorage.getItem('TOTAL');
    const id_account = localStorage.getItem('ID_ACCOUNT');
    const type = this.typeFormControl.value;
    console.log(type?.toUpperCase())
    this.total = this.totalFormControl.value;
    const created = new Date();

    if(type?.toUpperCase() === "DEPOSIT"){
      if(parseInt(this.total) < 100){
        this.snackBar.open("Minimum transaction amount is 100","",{duration:this.durationInSeconds});
      } else {
        this.total_final = (parseInt(this.total_account_actually ) +  parseInt(this.total ) );
        let transaction: TransactionIt = {
          id_account:id_account,
          type:type!,
          total:this.total!,
          created:created!
        }

        console.log(transaction);

        this.transactionService.saveTransaction(transaction).subscribe( res => {
            let account: AccountIt = {
              id:id_account,
              total:this.total_final
            }
            this.accountService.updateAccount(account).subscribe(res => {
              localStorage.removeItem('TOTAL');
              localStorage.setItem('TOTAL', this.total_final);
              console.log(res);

              this.snackBar.open("Transaction Added","",{duration:this.durationInSeconds});
              this.snackBar.open("update Total Acount","",{duration:this.durationInSeconds});
              this.router.navigateByUrl('/dashboard/transactions/transactions');


            },err => console.log(err))
          },
          err => console.log(err))
      }

    } else if(type?.toUpperCase() === "RETREAT"){
       if(parseInt(this.total_account_actually) < parseInt(this.total)){
         this.snackBar.open("INSUFFICIENT FUNDS","",{duration:this.durationInSeconds});
       }else {
         this.total_final = (parseInt(this.total_account_actually ) -  parseInt(this.total ) );
         let transaction: TransactionIt = {
           id_account:id_account,
           type:type!,
           total:this.total!,
           created:created!
         }

         console.log(transaction);

         this.transactionService.saveTransaction(transaction).subscribe( res => {
             let account: AccountIt = {
               id:id_account,
               total:this.total_final
             }
             this.accountService.updateAccount(account).subscribe(res => {
               localStorage.removeItem('TOTAL');
               localStorage.setItem('TOTAL', this.total_final);
               console.log(res);

               this.snackBar.open("Transaction Added","",{duration:this.durationInSeconds});
               this.snackBar.open("update Total Acount","",{duration:this.durationInSeconds});
               this.router.navigateByUrl('/dashboard/transactions/transactions');


             },err => console.log(err))
           },
           err => console.log(err))
       }
    }
  }
}
