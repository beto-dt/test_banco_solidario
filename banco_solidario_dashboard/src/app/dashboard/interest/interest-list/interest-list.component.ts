import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';


export interface TaxElement {
  position: any;
  month: any;
  total_account: any;
  annual_interest: any;
  total_account_with_interest: any;
}

const total_account: any = localStorage.getItem('TOTAL');
const total_account_int = parseInt(total_account);
const interest_annual = (total_account_int * 0.3) / 100;
const total_account_with_interest = (total_account_int + interest_annual);


const ELEMENT_DATA: TaxElement[] = [
  {position: 1, month: 'January', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 2, month: 'February', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 3, month: 'March', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 4, month: 'April', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 5, month: 'May', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 6, month: 'June', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 7, month: 'July', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 8, month: 'August', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 9, month: 'September', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest:total_account_with_interest},
  {position: 10, month: 'October', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 11, month: 'November', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
  {position: 12, month: 'December', total_account: total_account_int, annual_interest: interest_annual, total_account_with_interest: total_account_with_interest},
];
@Component({
  selector: 'app-interest-list',
  templateUrl: './interest-list.component.html',
  styleUrls: ['./interest-list.component.scss'],
})


export class InterestListComponent {
  displayedColumns: string[] = ['position', 'month', 'total_account', 'annual_interest','total_account_with_interest'];
  dataSource = ELEMENT_DATA;
}
