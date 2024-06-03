import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public translateService: TranslateService) { }

  isMenuActive = false;
  isDesktopSize = true;
  currentSection: string | null = null; // Aktuelle Sektion

  ngOnInit() {
    this.checkWindowSize();
    this.setDefaultLanguage();
  }

  setDefaultLanguage() {
    const defaultLang = 'de';
    this.translateService.use(defaultLang);
    document.documentElement.lang = defaultLang; // Setzt das Sprachattribut des HTML-Dokuments
  }

  switchLanguage(lang: string) {
    this.translateService.use(lang);
    document.documentElement.lang = lang; // Aktualisiert das Sprachattribut des HTML-Dokuments
  }

  toggleMenu(anchorId?: string) {
    this.isMenuActive = !this.isMenuActive;

    if (this.isMenuActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      if (anchorId) {
        setTimeout(() => {
          const element = document.getElementById(anchorId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    }
  }

  setCurrentSection(section: string) {
    this.currentSection = section;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktopSize = event.target.innerWidth >= 750;
  }

  private checkWindowSize() {
    this.isDesktopSize = window.innerWidth >= 750;
  }
}
