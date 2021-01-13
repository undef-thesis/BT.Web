import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public apiError: string;

  constructor(
    private userProfileService: UserProfileService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required],
      },
      { validators: this.passwordConfirm }
    );
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.userProfileService
      .changePassword(
        this.f.password.value,
        this.f.newPassword.value,
        this.f.confirmNewPassword.value
      )
      .subscribe(
        () => {
          this.toastr.success(
            this.translate.instant('notification.change-password')
          );
        },
        (error) => {
          this.toastr.error(
            this.translate.instant('notification.change-password-error')
          );
          this.apiError = error.error;
        }
      )
      .add(() => {
        this.submitted = false;
        this.isLoading = false;
      });
  }

  private passwordConfirm(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmNewPassword').value) {
      return { invalid: true };
    }
  }

  get f() {
    return this.changePasswordForm.controls;
  }
}
