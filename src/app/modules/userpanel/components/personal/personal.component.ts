import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from 'src/app/core/models/Profile';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {
  public profileForm: FormGroup;
  public isLoading: boolean = false;
  public apiError: string;

  constructor(
    private userProfileService: UserProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
    });
  }

  public onSubmit(): void {
    this.isLoading = true;

    const profile = new Profile(this.f.firstname.value, this.f.lastname.value);

    this.userProfileService
      .updateProfileData(profile)
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

  get f() {
    return this.profileForm.controls;
  }
}
