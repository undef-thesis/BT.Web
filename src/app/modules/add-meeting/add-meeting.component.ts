import { MapService } from './../../core/services/map.service';
import { Router } from '@angular/router';
import { MeetingsService } from './../../core/services/meetings.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Meeting from 'src/app/core/models/Meeting';
import { CategoriesService } from 'src/app/core/services/categories.service';
import Address from 'src/app/core/models/Address';
import Localization from 'src/app/core/models/Localization';
import { GoogleAddressParser } from 'src/app/shared/map/GoogleAddressParser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss'],
})
export class AddMeetingComponent implements OnInit {
  public addMeetingForm: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public apiError;

  public selectedFiles = [];

  public ranges: Array<number> = [
    0,
    5,
    10,
    20,
    50,
    100,
    200,
    500,
    750,
    1000,
    2500,
    5000,
    10000,
  ];
  public categories: Array<object>;
  public addresses: Address[] = [];
  public selectedAddress: number = -1;

  public myLocalization: Localization;

  constructor(
    private meetingService: MeetingsService,
    private categoriesService: CategoriesService,
    private mapService: MapService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addMeetingForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      maxParticipants: [0, Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
      range: [0],
      images: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.categoriesService.getCategories().subscribe(
      (reponse) => {
        this.categories = reponse;
      },
      (error) => {
        this.apiError = error.error;
      }
    );
  }

  public onSubmit(imagesInput): void {
    this.submitted = true;

    if (this.addMeetingForm.invalid) {
      return;
    }

    this.isLoading = true;

    const meeting: Meeting = new Meeting(
      this.f.name.value,
      this.f.description.value,
      this.f.maxParticipants.value,
      this.f.date.value
    );

    const address: Address = new Address(
      this.addresses[this.selectedAddress].latitude,
      this.addresses[this.selectedAddress].longitude,
      this.f.range.value,
      this.addresses[this.selectedAddress].country,
      this.addresses[this.selectedAddress].province,
      this.addresses[this.selectedAddress].city,
      this.addresses[this.selectedAddress].street,
      this.addresses[this.selectedAddress].postalCode
    );

    this.meetingService
      .addMeeting(meeting, address, this.f.category.value, imagesInput.files)
      .subscribe(
        () => {
          this.toastr.success('Utworzono nowe spotkanie');
        },
        (error) => {
          this.apiError = error.error;
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  public onCancel(): void {
    this.router.navigate(['/']);
  }

  public onFileChange(event) {
    this.selectedFiles = [];
    if (event.target.files.length <= 3) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files && event.target.files[i]) {
          let reader = new FileReader();

          reader.onload = (event: ProgressEvent) => {
            this.selectedFiles.push((<FileReader>event.target).result);
          };

          reader.readAsDataURL(event.target.files[i]);
        }
      }
    } else {
      console.log('too much images');
    }
  }

  public emittAddress(addresses: Array<Address>) {
    this.addresses = [];
    this.addresses = addresses;
    this.selectedAddress = 0;
    this.cdr.detectChanges();
  }

  public selectAddress(key: number): void {
    this.f.address.setValue(key);
    this.selectedAddress = key;
    this.cdr.detectChanges();
  }

  public async localizeMe() {
    const getCoords = async () => {
      const pos: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
        });
      });

      return {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
    };

    const coords = await getCoords();
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
    let NUMBER_OF_ADDRESS_SUGGESTIONS: number = 4;

    geocoder.geocode({ location: latlng }, (results) => {
      if (results) {
        this.addresses = [];
        console.log(results);
        const numberofAddresses = results.length;

        if (NUMBER_OF_ADDRESS_SUGGESTIONS > numberofAddresses) {
          NUMBER_OF_ADDRESS_SUGGESTIONS = numberofAddresses;
        }

        for (let i = 0; i < NUMBER_OF_ADDRESS_SUGGESTIONS; i++) {
          const parsedAddress: Address = new GoogleAddressParser(
            results[i].address_components,
            coords
          ).result();

          this.addresses.push(parsedAddress);
          this.selectedAddress = 0;
          this.f.address.setValue(0);

          this.cdr.detectChanges();
        }
        console.log(this.addresses);
      } else {
        console.log('No results found');
        return null;
      }
    });
  }

  get f() {
    return this.addMeetingForm.controls;
  }
}
