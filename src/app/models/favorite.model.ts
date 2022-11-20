export class Favorite {
  constructor(
    public id: null,
    public propertyType: string,
    public imagePath: string,
    public city: string,
    public price: number,
    public userBookedId: string,
    public propertyId: string
    ,
    public existPropUser: string
  ) {}
}
