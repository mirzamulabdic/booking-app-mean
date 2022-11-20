import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Subject } from 'rxjs';
import { Favorite } from '../models/favorite.model';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  favorites: Favorite[] = [];
  private favoritesUpdated = new Subject<Favorite[]>();

  constructor(private http: HttpClient) {}

  addFavorite(favoriteData: Favorite) {
    this.http
      .post('http://localhost:3000/api/favorite/', favoriteData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getFavoriteUpdateListener() {
    return this.favoritesUpdated.asObservable();
  }

  getFavorites(userId: string) {
    return this.http
      .get<{ message: string; favorites: Favorite[] }>(
        'http://localhost:3000/api/favorite/' + userId
      )
      .pipe(
        map((favoriteData) => {
          return favoriteData.favorites.map((favorite: any) => {
            return {
              id: favorite._id,
              propertyType: favorite.propertyType,
              city: favorite.city,
              imagePath: favorite.imagePath,
              price: favorite.price,
              userBookedId: favorite.userBookedId,
              propertyId: favorite.propertyId,
              existPropUser: favorite.existPropUser,
            };
          });
        })
      )
      .subscribe((transformedFavorites) => {
        this.favorites = transformedFavorites;
        this.favoritesUpdated.next(this.favorites.slice());
      });
  }

  deleteAllfavorites(userId: string) {
    return this.http.delete('http://localhost:3000/api/favorite/' + userId);
  }
}
