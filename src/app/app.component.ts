import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BT.Web';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pl');
    translate.use('pl');
  }

  ngOnInit(): void {}
}
