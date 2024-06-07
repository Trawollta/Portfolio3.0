import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
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
export class HeroComponent implements OnInit {

  showGreet = false;
  showCursorGreet = false;
  showName = false;
  showCursorName = false;
  showJob = false;
  showCursorJob = false;
  showWelcome = false;
  showCursorWelcome = false;

  ngOnInit() {
    this.animateTyping();
  }

  animateTyping() {
    setTimeout(() => {
      this.showGreet = true;
      this.showCursorGreet = true;
      const greetElement = document.querySelector('.greet');
      if (greetElement) {
        greetElement.classList.add('typing-effect-active');
      }
      setTimeout(() => {
        this.showCursorGreet = false;
        this.removeCursor('.greet .cursor'); // Remove cursor after typing
        this.showName = true;
        this.showCursorName = true;
        const nameElement = document.querySelector('.name');
        if (nameElement) {
          nameElement.classList.add('typing-effect-active');
        }
        setTimeout(() => {
          this.showCursorName = false;
          this.removeCursor('.name .cursor'); // Remove cursor after typing
          this.showJob = true;
          this.showCursorJob = true;
          const jobElement = document.querySelector('.job');
          if (jobElement) {
            jobElement.classList.add('typing-effect-active');
          }
          setTimeout(() => {
            this.showCursorJob = false;
            this.removeCursor('.job .cursor'); // Remove cursor after typing
            this.showWelcome = true;
            this.showCursorWelcome = true;
            const welcomeElement = document.querySelector('.welcome');
            if (welcomeElement) {
              welcomeElement.classList.add('typing-effect-active');
            }
            setTimeout(() => {
              this.showCursorWelcome = false;
              this.removeCursor('.welcome .cursor'); // Remove cursor after typing
            }, 2000); // Adjusted duration of the last typing effect
          }, 3000); // Adjusted duration of each typing effect plus a small delay
        }, 3000);
      }, 3000);
    }, 0);
  }

  removeCursor(selector: string) {
    const cursorElement = document.querySelector(selector) as HTMLElement;
    if (cursorElement && cursorElement.parentElement) {
      cursorElement.parentElement.removeChild(cursorElement);
    }
  }
}