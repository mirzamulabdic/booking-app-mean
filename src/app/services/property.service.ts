import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { map, Subject } from 'rxjs';
import { Properti, Property, Property1 } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  properties: Property1[] = [];
  ownerProperties: Property1[] = [];
  private propertiesUpdated = new Subject<{
    properties: Property1[];
    maxProps: number;
  }>();
  private ownerPropertiesUpdated = new Subject<Property1[]>();
  constructor(private http: HttpClient, private router: Router) {}

  addProperty(propertyDetails: FormData) {
    this.http
      .post<{ message: string; propertyID: string }>(
        'http://localhost:3000/api/properties',
        propertyDetails
      )
      .subscribe((resData) => {
        const id = resData.propertyID;
        this.router.navigate(['/']);
      });
  }

  rateProperty(propId: string, rating: number) {
    console.log(propId);
    const body = { rating: rating };
    this.http
      .put('http://localhost:3000/api/properties/' + propId, body)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getPropertyUpdateListener() {
    return this.propertiesUpdated.asObservable();
  }

  getProperties(postsPerPage: number, currentPage: number) {
    const queryParms = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; properties: Property1[]; maxProperties: number }>(
        'http://localhost:3000/api/properties' + queryParms
      )
      .pipe(
        map((propertyData) => {
          return {
            properties: propertyData.properties.map((property: any) => {
              return {
                id: property._id,
                propertyType: property.propertyType,
                rooms: property.rooms,
                beds: property.beds,
                wifi: property.wifi,
                parking: property.parking,
                pets: property.pets,
                terrace: property.terrace,
                pool: property.pool,
                address: property.address,
                state: property.state,
                zip: property.zip,
                city: property.city,
                imagePaths: property.imagePaths,
                startDate: property.startingDate,
                endDate: property.endingDate,
                price: property.price,
                ownerId: property.ownerId,
                owner: property.owner,
                ratings: property.ratings,
              };
            }),
            maxProperties: propertyData.maxProperties,
          };
        })
      )
      .subscribe((newPropsData: any) => {
        this.properties = newPropsData.properties;
        this.propertiesUpdated.next({
          properties: [...this.properties],
          maxProps: newPropsData.maxProperties,
        });
      });
  }

  getProperty(id: string) {
    return this.http.get<{
      [x: string]: any;
      property: Property1;
    }>('http://localhost:3000/api/properties/' + id);
  }

  getOwnerPropertyUpdateListener() {
    return this.ownerPropertiesUpdated.asObservable();
  }

  getOwnerProperties(ownerId: string) {
    return this.http
      .get<{ properties: Property1[] }>(
        'http://localhost:3000/api/properties/owner/' + ownerId
      )
      .pipe(
        map((propertyData) => {
          return propertyData.properties.map((property: any) => {
            return {
              id: property._id,
              propertyType: property.propertyType,
              rooms: property.rooms,
              beds: property.beds,
              wifi: property.wifi,
              parking: property.parking,
              pets: property.pets,
              terrace: property.terrace,
              pool: property.pool,
              address: property.address,
              state: property.state,
              zip: property.zip,
              city: property.city,
              imagePaths: property.imagePaths,
              startDate: property.startingDate,
              endDate: property.endingDate,
              price: property.price,
              ownerId: property.ownerId,
              owner: property.owner,
              ratings: property.ratings,
            };
          });
        })
      )
      .subscribe((transformedProperties) => {
        this.ownerProperties = transformedProperties;
        this.ownerPropertiesUpdated.next(this.ownerProperties.slice());
      });
  }



  deleteProperty(propertyId: string) {
    return this.http.delete(
      'http://localhost:3000/api/properties/' + propertyId
    );
  }
}
