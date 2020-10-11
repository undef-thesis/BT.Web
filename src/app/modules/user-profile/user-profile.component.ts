import { UserProfileService } from './../../core/services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/core/models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public id;
  public user: User;

  constructor(
    private userProfile: UserProfileService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
