import { ToastrService } from 'ngx-toastr';
import { ModalService } from './../../../core/services/modal.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import User from 'src/app/core/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private modalSubscription: Subscription;

  public loginForm: FormGroup;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public apiError: string;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.modalSubscription = this.modalService
      .getModalState()
      .subscribe((response) => {
        if (!response.isOpen) {
          this.onCloseModal();
        }
      });
    // a.szatko71@gmail.com ZAQ!2wsx
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .login(new User(this.f.email.value, this.f.password.value))
      .subscribe(
        () => {
          this.modalService.close('login-modal');
          // this.modalService.remove('login-modal');
          // this.modalService.remove('register-modal');
          this.toastr.success('Zalogowano do apliakcji');
        },
        ({ error }) => {
          this.apiError = error.error.Message;
          this.toastr.error('Wystpi problem podczas logowania do aplikacji');
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  onCloseModal(): void {
    this.loginForm.reset();
    this.apiError = '';
    this.submitted = false;
  }

  openRegisterModal(): void {
    this.onCloseModal();
    this.modalService.close('login-modal');
    this.modalService.open('register-modal');
  }
}
