import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Favorite } from 'src/app/models/favorite.model';
import { getUserId } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PropertyService } from 'src/app/services/property.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  userId = getUserId();

  favorites: Favorite[] = [];
  private favoriteSub!: Subscription;

  constructor(
    private userService: UserService,
    private propertyService: PropertyService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.favoriteService.getFavorites(this.userId!);
    this.favoriteSub = this.favoriteService
      .getFavoriteUpdateListener()
      .subscribe((favorites: Favorite[]) => {
        this.favorites = favorites;
        console.log(this.favorites);
      });
  }

  onDeleteAllFavorites() {
    this.favoriteService.deleteAllfavorites(this.userId!).subscribe(() => {
      this.favoriteService.getFavorites(this.userId!);
    });
  }

  ngOnDestroy(): void {
    this.favoriteSub.unsubscribe();
  }
}
