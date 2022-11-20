import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { Property1 } from 'src/app/models/property.model';
import { AuthService, getUserId } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { PropertyService } from 'src/app/services/property.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userBookedId = getUserId();
  bookings: Booking[] = [];
  private bookingsSub!: Subscription;
  private ownerPropSub!: Subscription;
  properties: Property1[] = [];
  name_surname!: string;
  private nameSub!: Subscription;

  starRating!: number;
  rating: number = 0;

  constructor(
    private bookService: BookingService,
    private propService: PropertyService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo(this.userBookedId!).subscribe((res) => {
      this.name_surname =
        res.firstname.charAt(0).toUpperCase() +
        res.firstname.slice(1) +
        ' ' +
        res.lastname.charAt(0).toUpperCase() +
        res.lastname.slice(1);
    });

    this.bookService.getBookings(this.userBookedId!);
    this.bookingsSub = this.bookService
      .getBookingUpdateListener()
      .subscribe((bookings: Booking[]) => {
        this.bookings = bookings;
      });
    this.propService.getOwnerProperties(this.userBookedId!);
    this.ownerPropSub = this.propService
      .getOwnerPropertyUpdateListener()
      .subscribe((properties: Property1[]) => {
        this.properties = properties;
      });
  }
  onCancel(id: string) {
    this.bookService.deleteBooking(id).subscribe(() => {
      this.bookService.getBookings(this.userBookedId!);
    });
    this.snackBar.open('You have canceled your reservation!', 'Close', {
      duration: 2000,
    });
  }

  onDeleteProperty(propId: string) {
    this.propService.deleteProperty(propId).subscribe(() => {
      this.propService.getOwnerProperties(this.userBookedId!);
    });
    this.snackBar.open('You have successfully deleted property!', 'Close', {
      duration: 2000,
    });
  }

  onRateProperty(propId: string) {
    if (this.starRating > 0) {
      this.propService.rateProperty(propId, this.starRating);
    }
  }

  ngOnDestroy(): void {
    this.bookingsSub.unsubscribe();
    this.ownerPropSub.unsubscribe();
  }
}
