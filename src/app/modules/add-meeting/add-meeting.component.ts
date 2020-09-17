import { Router } from '@angular/router';
import { MeetingsService } from './../../core/services/meetings.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Meeting from 'src/app/core/models/Meeting';
import { CategoriesService } from 'src/app/core/services/categories.service';
import Address from 'src/app/core/models/Address';

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
  
  public categories: Array<object>;
  public addresses: Address[];
  public selectedAddress: number = null;

  constructor(
    private meetingServie: MeetingsService,
    private categoriesServie: CategoriesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.addMeetingForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      maxParticipants: [0, Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
      images: ['', Validators.required],
    });

    this.categoriesServie.getCategories().subscribe(
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
    this.isLoading = true;

    this.meetingServie
      .addMeeting(
        new Meeting(
          this.f.name.value,
          this.f.description.value,
          this.f.maxParticipants.value,
          this.f.date.value,
          this.addresses[this.selectedAddress].latitude,
          this.addresses[this.selectedAddress].longitude,
          this.addresses[this.selectedAddress].country,
          this.addresses[this.selectedAddress].province,
          this.addresses[this.selectedAddress].city,
          this.addresses[this.selectedAddress].street,
          this.addresses[this.selectedAddress].postalCode,
          this.f.category.value,
          imagesInput.files
        )
      )
      .subscribe(
        () => {},
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
    console.log(event.target.files);
    if (event.target.files.length <= 3) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files && event.target.files[i]) {
          var reader = new FileReader();

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
    this.addresses = addresses;
    this.cdr.detectChanges();
  }

  public selectAddress(key: number): void {
    this.selectedAddress = key;
    this.cdr.detectChanges();
  }

  get f() {
    return this.addMeetingForm.controls;
  }
}
