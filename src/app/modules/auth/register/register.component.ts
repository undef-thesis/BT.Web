import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import UserRegister from 'src/app/core/models/UserRegister';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private modalSubscription: Subscription;

  public registerForm: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public apiError;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {
    this.modalSubscription = this.modalService
      .getModalState()
      .subscribe((response) => {
        if (!response.isOpen) {
          this.onCloseModal();
        }
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', Validators.required, Validators.email],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordConfirm }
    );
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordConfirm(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService
      .register(
        new UserRegister(
          this.f.email.value,
          this.f.password.value,
          this.f.confirmPassword.value,
          this.f.firstname.value,
          this.f.lastname.value
        )
      )
      .subscribe(
        () => {
          this.modalService.close('register-modal');
        },
        (error) => {
          this.apiError = error.error;
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  onCloseModal(): void {
    this.registerForm.reset();
    this.apiError = {};
    this.submitted = false;
  }

  openLoginModal(): void {
    this.onCloseModal();
    this.modalService.close('register-modal');
    this.modalService.open('login-modal');
  }
}
