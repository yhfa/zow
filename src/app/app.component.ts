import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocaleService } from './shared/services/locale.service';

@Component({
  selector: 'app-root',
  template: `
    <div [dir]="localeService.direction">
      <h1>{{ 'test' | translate }}</h1>
    </div>
  `,
  standalone: true,
  imports: [RouterModule, TranslateModule],
})
export class AppComponent {
  // NOTE: don't remove LocaleService dependency injection, we initiate locale in its constructor
  constructor(
    public translate: TranslateService,
    public localeService: LocaleService
  ) {}
}
