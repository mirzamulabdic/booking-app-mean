import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';

import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss'],
})
export class NewPropertyComponent implements OnInit {
  basicInfoForm!: FormGroup;
  addressForm!: FormGroup;
  formMediaGroup!: FormGroup;
  detailsForm!: FormGroup;
  isLinear = false;

  states = ['FBiH', 'RS', 'Brčko distrikt'];
  types = ['Apartment', 'House', 'Cottage'];
  //new: boolean = true;
  urls: any[] = [];
  uploads: File[] = [];
  newImageUrls: string[] = [];

  newUploads: File[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.basicInfoForm = new FormGroup({
      propertyType: new FormControl('Apartment', Validators.required),
      rooms: new FormControl(1, Validators.required),
      beds: new FormControl(1, Validators.required),
      parking: new FormControl(false),
      wifi: new FormControl(false),
      pets: new FormControl(false),
      terrace: new FormControl(false),
      pool: new FormControl(false),
    });
    this.addressForm = new FormGroup({
      address: new FormControl(null, Validators.required),
      zip: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{5}'),
      ]),
      state: new FormControl('FBiH', Validators.required),
      city: new FormControl(null, Validators.required),
    });
    this.formMediaGroup = new FormGroup({
      images: new FormControl(null, Validators.required),
    });
    this.detailsForm = new FormGroup({
      dateDaysGr: new FormGroup(
        {
          startDate: new FormControl(null, [
            Validators.required,
            this.validateStartDate.bind(this),
          ]),
          endDate: new FormControl(null, Validators.required),
        }
        // [this.validateDate.bind(this)]
      ),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesLength = event.target.files.length;
      for (let i = 0; i < filesLength; i++) {
        this.uploads.push(event.target.files[i]);
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  deleteImg(i: any) {
    this.urls.splice(i, 1);
    console.log(this.urls);
  }

  onSubmit() {
    let propertyDetails = new FormData();
    const address = this.addressForm.value.address;
    const city = this.addressForm.value.city;
    const price = this.detailsForm.value.price;
    const propertyType = String(this.basicInfoForm.value.propertyType);
    const state = String(this.addressForm.value.state);
    propertyDetails.append('price', price);
    propertyDetails.append('propertyType', propertyType);
    propertyDetails.append('rooms', this.basicInfoForm.value.rooms);
    propertyDetails.append('beds', this.basicInfoForm.value.beds);
    propertyDetails.append('wifi', this.basicInfoForm.value.wifi);
    propertyDetails.append('parking', this.basicInfoForm.value.parking);
    propertyDetails.append('pets', this.basicInfoForm.value.pets);
    propertyDetails.append('terrace', this.basicInfoForm.value.terrace);
    propertyDetails.append('pool', this.basicInfoForm.value.pool);
    propertyDetails.append('address', address);
    propertyDetails.append('state', state);
    propertyDetails.append('zip', this.addressForm.value.zip);
    propertyDetails.append('city', city);
    //propertyDetails.append('owner');
    for (let i = 0; i < this.uploads.length; i++) {
      let el = this.uploads[i];
      propertyDetails.append('files', el);
    }
    propertyDetails.append(
      'startingDate',
      this.detailsForm.controls['dateDaysGr'].value.startDate
    );
    propertyDetails.append(
      'endingDate',
      this.detailsForm.controls['dateDaysGr'].value.endDate
    );

    this.propertyService.addProperty(propertyDetails);
    this.basicInfoForm.reset();
    this.addressForm.reset();
    this.detailsForm.reset();
    this.formMediaGroup.reset();
  }

  validateDate(group: FormGroup) {
    const invalid = group.get('startDate')!.value > group.get('endDate')!.value;

    return invalid ? { invalidDate: true } : null;
  }
  validateStartDate(control: FormControl) {
    let today: object = new Date();
    const invalid = control.value >= today;
    return !invalid ? { invalidDate: true } : null;
  }
}
