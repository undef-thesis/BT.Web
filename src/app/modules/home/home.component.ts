import { GoogleAddressParser } from './../../shared/map/GoogleAddressParser';
import { CategoriesService } from './../../core/services/categories.service';
import Localization from 'src/app/core/models/Localization';
import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/core/services/meetings.service';
import Category from 'src/app/core/models/Category';
import Meeting from 'src/app/core/models/Meeting';
import Address from 'src/app/core/models/Address';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

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

  public mergedMeetings: Array<Meeting> = [];

  constructor(
    private meetingsService: MeetingsService,
    private categoriesService: CategoriesService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.currentLocation = new Localization(
          position.coords.latitude,
          position.coords.longitude
        );

        if (this.currentLocation) {
          this.geocode(
            this.currentLocation.latitude,
            this.currentLocation.longitude
          );
        }
      },
      (error) => error,
      { enableHighAccuracy: true }
    );
  }

  private getFilteredMeetings(): void {
    this.spinner.show();

    this.meetingsService
      .getFilteredMeetings('city', this.city)
      .subscribe((meeting) => {
        this.meetingsCity = meeting;

        const ids = new Set(this.meetingsCountry.map((item) => item.id));
        this.mergedMeetings = [
          ...this.meetingsCountry,
          ...this.meetingsCity.filter((item) => !ids.has(item.id)),
        ];
      });

    this.meetingsService
      .getFilteredMeetings('country', this.country)
      .subscribe((meeting) => {
        this.meetingsCountry = meeting;

        const ids = new Set(this.meetingsCity.map((item) => item.id));
        this.mergedMeetings = [
          ...this.meetingsCity,
          ...this.meetingsCountry.filter((item) => !ids.has(item.id)),
        ];

        this.spinner.hide();
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

  public searchByCity(): void {
    this.router.navigate(['/meetings'], {
      relativeTo: this.route,
      queryParams: {
        city: this.city,
      },
    });
  }

  public searchByCountry(): void {
    this.router.navigate(['/meetings'], {
      relativeTo: this.route,
      queryParams: {
        country: this.country,
      },
    });
  }

  public get category() {
    return (
      this.categories && this.categories[this.randomCategory.toString()].name
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
