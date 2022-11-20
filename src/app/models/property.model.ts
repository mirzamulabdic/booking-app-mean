export class Property {
  constructor(
    public id: number,
    public title: string,
    public city: string,
    public street: string,
    public category: string,
    public image: string,
    public numOfRooms: number,
    public description: string,
    public dailyPrice: number,
    public shared: boolean,
    public createdAt: string
  ) {}
}

export interface Properti {
  id: string | null;
  address: string;
  city: string;
  price: number;
}

export class Property1 {
  constructor(
    public id: null,
    public propertyType: string,
    public rooms: number,
    public beds: number,
    public wifi: boolean,
    public parking: boolean,
    public pets: boolean,
    public terrace: boolean,
    public pool: boolean,
    public address: string,
    public state: string,
    public zip: string,
    public city: string,
    public imagePaths: string[],
    public startDate: Date,
    public endDate: Date,
    public price: number,
    public ownerId: string,
    public owner: string,
    public ratings: number[]
  ) {}
}
