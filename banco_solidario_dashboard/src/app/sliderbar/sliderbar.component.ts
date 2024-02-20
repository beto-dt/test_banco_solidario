
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sliderbar',
  templateUrl: './sliderbar.component.html',
  styleUrls: ['./sliderbar.component.scss']
})
export class SliderbarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private authService:AuthService, private observer: BreakpointObserver, private cd: ChangeDetectorRef){}

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

  onLogout() {
    this.authService.logout();
  }
}
