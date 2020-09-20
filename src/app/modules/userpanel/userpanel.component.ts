import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/core/models/Profile';
import { MeetingsService } from 'src/app/core/services/meetings.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss'],
})
export class UserpanelComponent implements OnInit {
  public organizedMeetings;
  public enrolledMeetings;
  public profile = null;

  public profileForm: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public apiError;

  constructor(
    private meetingsServie: MeetingsService,
    private userProfileService: UserProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      avatar: ['', Validators.required],
    });

    this.getOrganizedMeetings();
    this.getEnrolledMeetings();
    this.getUserProfile();
  }

  public onSubmit(avatar): void {
    this.submitted = true;
    this.isLoading = true;

    const profile = new Profile(
      this.f.firstname.value,
      this.f.lastname.value,
      avatar.files[0]
    );
    console.log(avatar.files[0]);

    this.userProfileService
      .addProfile(profile)
      .subscribe(
        () => {
        },
        (error) => {
          this.apiError = error.error;
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  private getUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe((userProfile) => {
      this.profile = userProfile;
    });
  }

  private getOrganizedMeetings(): void {
    this.meetingsServie.getOrganizedMeetings().subscribe((meeting) => {
      this.organizedMeetings = meeting;
    });
  }

  private getEnrolledMeetings(): void {
    this.meetingsServie.getEnrolledMeetings().subscribe((meeting) => {
      this.enrolledMeetings = meeting;
    });
  }

  get f() {
    return this.profileForm.controls;
  }
}
