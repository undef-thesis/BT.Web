import { ModalComponent } from './../../../shared/modal/modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { TranslateModule } from '@ngx-translate/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, ModalComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('register form should be invalid', () => {
    component.registerForm.controls.email.setValue('');
    component.registerForm.controls.firstname.setValue('');
    component.registerForm.controls.lastname.setValue('');
    component.registerForm.controls.password.setValue('');
    component.registerForm.controls.confirmPassword.setValue('');

    expect(component.registerForm.valid).toBeFalsy();
  });

  // it('register form password should be equal', () => {
  //   component.registerForm.controls.email.setValue('mail1@gmail.com');
  //   component.registerForm.controls.firstname.setValue('Name123');
  //   component.registerForm.controls.lastname.setValue('Name');
  //   component.registerForm.controls.password.setValue('Zaq1@wsx123');
  //   component.registerForm.controls.confirmPassword.setValue('Zaq1@wsx123');

  //   expect(component.registerForm.invalid).toBeTruthy();
  // });
});
