
import { BreakpointObserver } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sliderbar',
  templateUrl: './sliderbar.component.html',
  styleUrls: ['./sliderbar.component.scss']
})
export class SliderbarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private authService:AuthService, private observer: BreakpointObserver, private cd: ChangeDetectorRef){}
  public username : any = "";
  public lastname : any = "";
  public total : any = "";
  public total_decimal : any = "";
  public id_account : any = "";
  public id_rate_type : any = "";
  public rate: any = "";
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((resp: any) => {
      if(resp.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
    this.cd.detectChanges();
  }

  ngOnInit(){
    this.username = localStorage.getItem('NAME');
    this.lastname = localStorage.getItem('LASTNAME');
    this.total =  localStorage.getItem('TOTAL');
    this.total_decimal =  parseFloat(String(Math.round(this.total * 100) / 100)).toFixed(2);
    this.id_rate_type = localStorage.getItem('ID_RATETYPE');
    if(this.id_rate_type == 1) {
      this.rate =  "3%";
    }

    this.id_account = localStorage.getItem('ID_ACCOUNT');
  }

  onLogout() {
    this.authService.logout();
  }
}
