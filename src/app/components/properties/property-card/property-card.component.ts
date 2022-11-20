import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Property1 } from 'src/app/models/property.model';
import { Subscription } from 'rxjs';
import { AuthService, getUserId } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Favorite } from 'src/app/models/favorite.model';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent implements OnInit, OnDestroy {
  @Input() property!: Property1;
  userIsAuthenticated = false;
  private authListenerSub!: Subscription;
  userId = getUserId();

  constructor(
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.userIsAuthenticated = isAuth;
      });
  }

  onFavorite(propId: string) {
    this.snackBar.open('Added to favorites!', 'Close', {
      duration: 2000,
    });

    const favoriteData: Favorite = {
      id: null,
      propertyType: this.property.propertyType,
      city: this.property.city,
      imagePath: this.property.imagePaths[0],
      propertyId: propId,
      userBookedId: this.userId!,
      price: this.property.price,
      existPropUser: propId + this.userId,
    };

    this.favoriteService.addFavorite(favoriteData);
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
