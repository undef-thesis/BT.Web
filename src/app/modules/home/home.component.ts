import { GoogleAddressParser } from './../../shared/map/GoogleAddressParser';
import { CategoriesService } from './../../core/services/categories.service';
import Localization from 'src/app/core/models/Localization';
import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/core/services/meetings.service';
import Category from 'src/app/core/models/Category';
import Meeting from 'src/app/core/models/Meeting';
import Address from 'src/app/core/models/Address';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public imageUrlArray: Array<string> = [
    '../../../assets/slide_1.jpg',
    '../../../assets/slide_2.jpg',
    '../../../assets/slide_3.jpg',
    '../../../assets/slide_4.jpg',
  ];

  public meetingsCity: Array<Meeting> = [];
  public meetingsCountry: Array<Meeting> = [];
  public meetingsCategory: Array<Meeting> = [];
  public categories: Array<Category>;
  public city: string = '';
  public country: string = '';
  public currentLocation: Localization;

  public randomCategory: number = 0;

  public searchLocalization = { city: '', country: '' };

  constructor(
    private meetingsService: MeetingsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getCategories();

    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation = new Localization(
        position.coords.latitude,
        position.coords.longitude
      );

      this.geocode(
        this.currentLocation.latitude,
        this.currentLocation.longitude
      );
    });
  }

  private getFilteredMeetings(): void {
    this.meetingsService
      .getFilteredMeetings('city', this.city)
      .subscribe((meeting) => {
        this.meetingsCity = meeting;
      });

    this.meetingsService
      .getFilteredMeetings('country', this.country)
      .subscribe((meeting) => {
        this.meetingsCountry = meeting;
      });
  }

  private getCategories(): void {
    this.categoriesService
      .getCategories()
      .subscribe((reponse) => {
        this.categories = reponse;
      })
      .add(() => {
        this.randomCategory =
          Math.floor(Math.random() * this.categories.length) + 0;
        console.log(this.categories);
        this.meetingsService
          .getFilteredMeetings(
            'categoryId',
            this.categories[this.randomCategory.toString()].id
          )
          .subscribe((meeting) => {
            this.meetingsCategory = meeting;
          });
      });
  }

  public get foo() {
    return (
      this.categories &&
      'Spotkania wylosowanej kategorii: ' +
        this.categories[this.randomCategory.toString()].name
    );
  }

  private geocode(latitude: number, longitude: number): void {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({ location: latlng }, (results) => {
      if (results) {
        const parsedAddress: Address = new GoogleAddressParser(
          results[0].address_components,
          { latitude, longitude }
        ).parseAddressShort();

        console.log(parsedAddress);

        this.searchLocalization = {
          city: parsedAddress.city,
          country: parsedAddress.country,
        };

        this.city = parsedAddress.city;
        this.country = parsedAddress.country;

        this.getFilteredMeetings();
      } else {
        console.log('No results found');
      }
    });
  }
}
