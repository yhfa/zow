import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocaleService } from './shared/services/locale.service';
import { MainComponent } from './layout/components/main/main.component';

@Component({
  selector: 'app-root',
  template: `
    <app-main [dir]="localeService.direction">
      <router-outlet></router-outlet>
    </app-main>
  `,
  standalone: true,
  imports: [RouterModule, TranslateModule, MainComponent],
})
export class AppComponent {
  // NOTE: don't remove LocaleService dependency injection, we initiate locale in its constructor
  constructor(
    public translate: TranslateService,
    public localeService: LocaleService
  ) {}
}
