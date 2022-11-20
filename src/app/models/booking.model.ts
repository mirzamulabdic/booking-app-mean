export class Booking {
  constructor(
    public id: null,
    public propertyType: string,
    public imagePath: string,
    public address: string,
    public city: string,
    public startingDate: Date,
    public endingDate: Date,
    public days: number,
    public price: number,
    public userBookedId: string,
    public propertyId: string
  ) {}
}
