import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Meeting from 'src/app/core/models/Meeting';
import { MeetingsService } from 'src/app/core/services/meetings.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Input() localization;
  @Input() styleBasic: boolean = false;

  public meetings: Array<Meeting> = [];
  public city: string = '';
  public country: string = '';
  public selectedCity = '';
  public keyword = 'name';
  public citySuggest = [];

  public searchTerm: string = '';

  constructor(
    private meetingsService: MeetingsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.localization) {
      this.selectedCity = this.localization.city;

      this.city = this.localization.city;
      this.country = this.localization.country;
    }
  }

  public selectEvent(item) {
    this.city = item.name;
    this.country = item.country;
  }

  public onChangeSearch(val: string) {
    if (val.length > 3) {
      setTimeout(() => {
        this.meetingsService.citySuggest(val).subscribe((citySuggest) => {
          this.citySuggest = citySuggest;
        });
      }, 2000);
    }
  }

  public search(): void {
    this.router.navigate(['/meetings'], {
      relativeTo: this.route,
      queryParams: {
        city: this.city,
        country: this.country,
        term: this.searchTerm,
      },
    });
  }
}
