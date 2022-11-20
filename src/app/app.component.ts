import { Component, Input, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showHead: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    router.events.forEach((event: any) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/properties' || event['url'] == '/') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
