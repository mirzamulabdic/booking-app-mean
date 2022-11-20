import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Booking } from '../models/booking.model';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  bookings: Booking[] = [];
  private bookingsUpdated = new Subject<Booking[]>();

  addBooking(bookData: Booking) {
    this.http
      .post('http://localhost:3000/api/booking/', bookData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getBookingUpdateListener() {
    return this.bookingsUpdated.asObservable();
  }

  getBookings(userId: string) {
    return this.http
      .get<{ message: string; bookings: Booking[] }>(
        'http://localhost:3000/api/booking/' + userId
      )
      .pipe(
        map((bookingData) => {
          return bookingData.bookings.map((booking: any) => {
            return {
              id: booking._id,
              propertyType: booking.propertyType,
              address: booking.address,
              city: booking.city,
              startingDate: booking.startingDate,
              endingDate: booking.endingDate,
              imagePath: booking.imagePath,
              days: booking.days,
              price: booking.price,
              userBookedId: booking.userBookedId,
              propertyId: booking.propertyId,
            };
          });
        })
      )
      .subscribe((transformedBookings) => {
        this.bookings = transformedBookings;
        this.bookingsUpdated.next(this.bookings.slice());
      });
  }

  deleteBooking(bookingId: string) {
    return this.http.delete('http://localhost:3000/api/booking/' + bookingId);
  }
}
