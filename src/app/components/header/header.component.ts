import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSub!: Subscription;

  constructor(private authService: AuthService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.userIsAuthenticated = isAuth;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  onRedirect() {
    this.snackBar.open('You need to sign in first!', 'Close', {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }
}
