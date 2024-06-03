import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('typingGreet', { static: true }) typingGreet!: ElementRef;
  @ViewChild('typingName', { static: true }) typingName!: ElementRef;
  @ViewChild('typingJob', { static: true }) typingJob!: ElementRef;
  @ViewChild('typingWelcome', { static: true }) typingWelcome!: ElementRef;
  @ViewChild('cursorGreet', { static: true }) cursorGreet!: ElementRef;
  @ViewChild('cursorName', { static: true }) cursorName!: ElementRef;
  @ViewChild('cursorJob', { static: true }) cursorJob!: ElementRef;
  @ViewChild('cursorWelcome', { static: true }) cursorWelcome!: ElementRef;

  private initialLoad = true; // Zustand für die Initialisierung

  constructor(private translateService: TranslateService, private renderer: Renderer2) {
    this.translateService.onLangChange.subscribe(() => {
      if (!this.initialLoad) {
        this.updateTexts();
      }
    });
  }

  ngAfterViewInit() {
    if (this.initialLoad) {
      this.clearTexts();
      this.applyTypingAnimations();
      this.initialLoad = false;
    }
  }

  clearTexts() {
    this.typingGreet.nativeElement.querySelector('.text').innerHTML = '';
    this.typingName.nativeElement.querySelector('.text').innerHTML = '';
    this.typingJob.nativeElement.querySelector('.text').innerHTML = '';
    this.typingWelcome.nativeElement.querySelector('.text').innerHTML = '';
  }

  applyTypingAnimations() {
    this.renderer.removeClass(this.typingGreet.nativeElement, 'hidden-text');
    this.renderer.removeClass(this.typingName.nativeElement, 'hidden-text');
    this.renderer.removeClass(this.typingJob.nativeElement, 'hidden-text');
    this.renderer.removeClass(this.typingWelcome.nativeElement, 'hidden-text');

    // Verstecken Sie alle Cursor am Anfang
    this.renderer.setStyle(this.cursorGreet.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.cursorName.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.cursorJob.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.cursorWelcome.nativeElement, 'display', 'none');

    // Reihenfolge der Typing-Animationen
    this.translateService.get('greet').subscribe((res: string) => {
      this.typeHtml(this.typingGreet.nativeElement.querySelector('.text'), res, this.cursorGreet.nativeElement, () => {
        this.renderer.addClass(this.typingGreet.nativeElement, 'fade-in');

        this.translateService.get('name').subscribe((res: string) => {
          this.typeHtml(this.typingName.nativeElement.querySelector('.text'), res, this.cursorName.nativeElement, () => {
            this.renderer.addClass(this.typingName.nativeElement, 'fade-in');

            this.translateService.get('job').subscribe((res: string) => {
              this.typeHtml(this.typingJob.nativeElement.querySelector('.text'), res, this.cursorJob.nativeElement, () => {
                this.renderer.addClass(this.typingJob.nativeElement, 'fade-in');

                this.translateService.get('welcome').subscribe((res: string) => {
                  this.typeHtml(this.typingWelcome.nativeElement.querySelector('.text'), res, this.cursorWelcome.nativeElement, () => {
                    this.renderer.addClass(this.typingWelcome.nativeElement, 'fade-in');
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  updateTexts() {
    this.translateService.get('name').subscribe((res: string) => {
      this.typingName.nativeElement.querySelector('.text').innerHTML = res;
    });

    this.translateService.get('job').subscribe((res: string) => {
      this.typingJob.nativeElement.querySelector('.text').innerHTML = res;
    });

    this.translateService.get('welcome').subscribe((res: string) => {
      this.typingWelcome.nativeElement.querySelector('.text').innerHTML = res;
    });
  }

  typeHtml(element: HTMLElement, html: string, cursor: HTMLElement, callback: () => void) {
    element.innerHTML = ''; 
    cursor.style.display = 'inline-block'; 

    let index = 0;
    let isTag = false;
    let tagBuffer = '';

    const interval = setInterval(() => {
      if (index < html.length) {
        const char = html[index];
        if (char === '<') {
          isTag = true;
          tagBuffer += char;
        } else if (char === '>') {
          isTag = false;
          tagBuffer += char;
          element.innerHTML += tagBuffer;
          tagBuffer = '';
        } else if (isTag) {
          tagBuffer += char;
        } else {
          element.innerHTML += char;
        }
        index++;
        cursor.style.left = `${element.offsetWidth}px`; 
      } else {
        clearInterval(interval);
        cursor.style.display = 'none';
        callback();
      }
    }, 50); 
  }
}
