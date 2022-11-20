import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { Favorite } from 'src/app/models/favorite.model';
import { Property } from 'src/app/models/property.model';
import { AuthService, getUserId } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PropertyService } from 'src/app/services/property.service';
import { UserService } from 'src/app/services/user.service';

import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from 'swiper';

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PropertyDetailComponent implements OnInit, OnDestroy {
  property!: any;
  propId!: string;
  isLoading = false;
  userIsAuthenticated = false;
  starRating!: number;
  datesForm!: FormGroup;
  userBookingId = getUserId();
  rating: number = 0;
  bookings: Booking[] = [];

  private bookingsSub!: Subscription;

  private authListenerSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private bookingService: BookingService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.propId = String(params['id']);
      this.propertyService
        .getProperty(this.propId)
        .subscribe((propertyData) => {
          this.property = propertyData;
          this.calculateRating(this.property.ratings);
        });
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.userIsAuthenticated = isAuth;
      });

    this.isLoading = false;
    this.datesForm = new FormGroup({
      startingDate: new FormControl(null, [
        Validators.required,
        this.validateStartDate.bind(this),
      ]),
      endingDate: new FormControl(null, Validators.required),
    });
  }

  getStringR(stringNumb: number) {
    if (stringNumb === 1) {
      return stringNumb + ' room';
    } else {
      return stringNumb + ' rooms';
    }
  }
  getStringB(stringNumb: number) {
    if (stringNumb === 1) {
      return stringNumb + ' bed';
    } else {
      return stringNumb + ' beds';
    }
  }

  onBook() {
    const dateTime =
      this.datesForm.value.endingDate.getTime() -
      this.datesForm.value.startingDate.getTime();

    const dateDays = dateTime / (1000 * 3600 * 24);
    const priceForBooking = dateDays * this.property.price;

    const bookData: Booking = {
      id: null,
      propertyType: this.property.propertyType,
      address: this.property.address,
      city: this.property.city,
      imagePath: this.property.imagePaths[0],
      price: priceForBooking,
      days: dateDays,
      propertyId: this.propId,
      userBookedId: this.userBookingId!,
      startingDate: this.datesForm.value.startingDate,
      endingDate: this.datesForm.value.endingDate,
    };

    this.bookingService.addBooking(bookData);
  }

  calculateRating(ratings: number[]) {
    const sum = ratings.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    const rate = sum / ratings.length;
    this.rating = +(Math.round(rate * 100) / 100).toFixed(2);
  }

  validateStartDate(control: FormControl) {
    let today: object = new Date();
    const invalid = control.value >= today;
    return !invalid ? { invalidDate: true } : null;
  }

  onFavorite() {
    this.snackBar.open('Added to favorites!', 'Close', {
      duration: 2000,
    });

    const favoriteData: Favorite = {
      id: null,
      propertyType: this.property.propertyType,
      city: this.property.city,
      imagePath: this.property.imagePaths[0],
      propertyId: this.propId,
      userBookedId: this.userBookingId!,
      price: this.property.price,
      existPropUser: this.propId + this.userBookingId,
    };

    this.favoriteService.addFavorite(favoriteData);
  }

  onRedirect() {
    this.snackBar.open('You need to be logged in!', 'Close', {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }
}
