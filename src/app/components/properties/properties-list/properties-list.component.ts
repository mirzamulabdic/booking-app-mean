import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Property, Property1 } from 'src/app/models/property.model';
import { AuthService } from 'src/app/services/auth.service';
import { PropertyService } from 'src/app/services/property.service';

interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss'],
})
export class PropertiesListComponent implements OnInit, OnDestroy {
  properties: Property1[] = [];

  hideComponent: boolean = false;

  private propertiesSub!: Subscription;

  userIsAuthenticated = false;
  private authListenerSub!: Subscription;

  propertyType!: any | null[];
  feautures: any | null[];

  propertyTypeList: string[] = ['Apartment', 'House', 'Cottage'];
  feautureList: string[] = [
    'Parking',
    'Wifi',
    'Pets allowed',
    'Pool',
    'Terrace',
  ];

  propType = new FormControl('');
  feauture = new FormControl(false);

  searchCity = '';
  public Sort: string = '';
  sortByParam = '';
  sortDirection = '';

  isLoading = false;
  totalPosts = 0;
  postsPerPage = 20;
  pageSizeOptions = [5, 10, 15, 20, 30];
  currentPage = 1;
  city = '';

  appartment = false;
  house = false;
  cottage = false;
  pets = false;
  wifi = false;
  pool = false;
  parking = false;
  terrace = false;

  testovi = [
    { name: 'WiFi', value: false },
    { name: 'Terrace', value: false },
  ];

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService
  ) {}
  shareCheckedList(item: any[]) {
    console.log(item);
  }
  shareIndividualCheckedList(item: {}) {
    console.log(item);
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.userIsAuthenticated = isAuth;
      });
    this.isLoading = true;
    this.propertyService.getProperties(this.postsPerPage, this.currentPage);
    this.propertiesSub = this.propertyService
      .getPropertyUpdateListener()
      .subscribe(
        (propertiesData: { properties: Property1[]; maxProps: number }) => {
          this.properties = propertiesData.properties;
          this.totalPosts = propertiesData.maxProps;
        }
      );

    this.isLoading = false;
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.propertyService.getProperties(this.postsPerPage, this.currentPage);
  }

  onLogout() {
    this.authService.logout();
  }

  onCityFilter() {
    const firstLetterCity =
      this.searchCity.charAt(0).toUpperCase() + this.searchCity.slice(1);
    this.city = firstLetterCity;
    console.log(this.wifi);
  }

  onPropertyType() {
    this.propertyType = [this.propType.value];
    if (this.propType.value == null) {
      this.propertyType = null;
    }
    console.log(this.propType.value);
  }

  onFeauture() {
    this.feautures = this.feauture.value;
    console.log(this.feautures);
    for (let i = 0; i < this.feautures.length; i++) {
      if (this.feautures[i] === 'Parking') {
        this.parking = true;
      }
      if (this.feautures[i] === 'Wifi') {
        this.wifi = true;
      }
      if (this.feautures[i] === 'Terrace') {
        this.terrace = true;
      }
      if (this.feautures[i] === 'Pool') {
        this.pool = true;
      }
      if (this.feautures[i] === 'Pets allowed') {
        this.pets = true;
      }
    }

    console.log(this.feautures);
  }

  onSort() {
    this.sortByParam = this.Sort.split('|')[0];
    this.sortDirection = this.Sort.split('|')[1];
  }

  onClearFilters() {
    this.city = '';
    this.searchCity = '';
    this.propertyType = null;
    this.Sort = '';
    this.sortByParam = '';
    this.sortDirection = '';
    this.feauture.reset();
    this.wifi = false;
    this.pets = false;
    this.pool = false;
    this.parking = false;
    this.terrace = false;
  }

  ngOnDestroy() {
    this.propertiesSub.unsubscribe();
  }
}
