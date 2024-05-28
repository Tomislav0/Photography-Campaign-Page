import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public isLoggedIn = false;
  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn();
    this.authService.authorizedSubject.subscribe(r => {
      console.log(r)
      this.isLoggedIn = r
      }
    )
  }

  public logout() {
    this.authService.logout()
  }
}
