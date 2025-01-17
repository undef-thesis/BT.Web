import { ModalService } from './../../core/services/modal.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;

  private ngUnsubscribe = new Subject();

  public profile = null;
  public isLoggedIn: boolean = false;
  public isMenuOpen: boolean = false;

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    var navbar = document.querySelector('nav');

    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    this.authService.isLoggedIn.pipe().subscribe((response) => {
      this.isLoggedIn = response;

      this.getUserProfile();
    });
  }

  public openMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  public getUserProfile(): void {
    if (this.isLoggedIn) {
      this.userProfileService
        .getUserProfile()
        .pipe()
        .subscribe((userProfile) => {
          localStorage.setItem('me', JSON.stringify(userProfile));

          this.profile = userProfile;
        });
    }
  }

  public toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');

    document.getElementById('burger').classList.add('burger-text');
  }

  public openLoginModal(): void {
    this.modalService.open('login-modal');
  }

  public openRegisterModal(): void {
    this.modalService.open('register-modal');
  }

  public openUserPanel(): void {
    this.router.navigate(['/userpanel']);
  }

  public openHome(): void {
    this.router.navigate(['/']);
  }

  public createNewMeeting(): void {
    this.router.navigate(['/meetings/add']);
  }

  public get getUserSignature(): string {
    return (
      JSON.parse(localStorage.getItem('me')).firstname[0] +
      JSON.parse(localStorage.getItem('me')).lastname[0]
    );
  }
}
