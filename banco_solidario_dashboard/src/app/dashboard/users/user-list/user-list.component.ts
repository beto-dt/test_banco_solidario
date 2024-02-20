import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogBodyUserComponent } from '../dialog-body-user/dialog-body-user.component';
import { MatDialog } from '@angular/material/dialog';

export interface UserData {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  estado: boolean;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})


export class UserListComponent implements OnInit {
  public displayedColumns: string[] = ['id_user', 'card_id', 'name', 'lastname','email','update','delete'];
  public dataSource!: MatTableDataSource<UserData>;
  durationInSeconds = 3000;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private router:Router,
    private matDialog:MatDialog,
  ){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
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

  goToEditUser(id_usuario: string){
    console.log(id_usuario)
    this.router.navigateByUrl(`/dashboard/users/userEdit/${id_usuario}`);
  }

  openDialog(id_usuario: any){
    this.matDialog.open(DialogBodyUserComponent,{
      width:'350px',
      data:{
        id_usuario:id_usuario
      }
    });
  }
}
