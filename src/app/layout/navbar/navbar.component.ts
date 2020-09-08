import { ModalService } from './../../core/services/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    var navbar = document.querySelector('nav');

    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
  }

  openLoginModal(): void {
    this.modalService.open('login-modal');
  }

  openRegisterModal(): void {
    this.modalService.open('register-modal');
  }
}
