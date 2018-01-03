import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  displayName: string;

  constructor(public authService: AuthService) {
    this.displayName = this.authService.getCurrentUser().displayName;
    console.log(this.displayName);
  }

  logout() {
    this.authService.logout();
  }
}
