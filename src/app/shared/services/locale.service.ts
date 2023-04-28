import { Injectable } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  direction: Direction | null = null;
  currentLang: string;

  constructor(private _translate: TranslateService) {
    this._setInitLocale();
    this.currentLang = this._translate.currentLang;
  }

  private _setInitLocale() {
    // Get the default language and direction or set it to english and ltr
    const savedLanguage = localStorage.getItem('defaultLanguage');

    this.direction = (localStorage.getItem('dir') as Direction) || 'ltr';
    if (savedLanguage) {
      this._translate.setDefaultLang(savedLanguage);
      this._translate.use(savedLanguage);
    } else {
      this._translate.setDefaultLang(Language.en);
      this._translate.use(Language.en);
    }
  }

  useLanguage(language: Language) {
    if (language === Language.ar) this.direction = 'rtl';
    else this.direction = 'ltr';
    // Set the default language and direction
    localStorage.setItem('dir', this.direction);
    localStorage.setItem('defaultLanguage', language);
    this._translate.use(language);
    this.currentLang = language;
  }
}
