import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import {TransactionService} from "../../../services/transaction.service";

export interface UserData {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  estado: boolean;
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})


export class TransactionListComponent implements OnInit {
  public id_account : any = '';
  public displayedColumns: string[] = ['type', 'total','created'];
  public dataSource!: MatTableDataSource<UserData>;
  durationInSeconds = 3000;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private transactionService: TransactionService,
    private router:Router,
    private matDialog:MatDialog,
  ){}

  ngOnInit(): void {
    this.id_account = localStorage.getItem('ID_ACCOUNT');
    let transaction: any = {
      id:this.id_account,
    }
    this.transactionService.getTransactionIdAccount(transaction).subscribe(res => {
        this.dataSource = new MatTableDataSource(res.result);
        console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      err => console.log(err))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected readonly parseFloat = parseFloat;
  protected readonly Math = Math;
  protected readonly String = String;
}
