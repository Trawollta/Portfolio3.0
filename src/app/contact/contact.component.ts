import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as confetti from 'canvas-confetti';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'] // corrected property name
})
export class ContactComponent {
  public contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(5)]),
    checked: new FormControl(false, [Validators.requiredTrue])
  });

  success: boolean = false;
  sending: boolean = false;
  private https: HttpClient;

  constructor(http: HttpClient, public translateService: TranslateService) {
    this.https = http;
  }

  submitted() {
    this.sending = true;
    let postVars = {
      email: this.contactForm.controls.email.value,
      name: this.contactForm.controls.name.value,
      message: this.contactForm.controls.message.value
    };
    let endpoint = 'https://jan-woll.de/sendMail.php';

    this.https.post(endpoint, postVars).subscribe(
      (res) => {
        console.log(res);
        this.handleSuccess();
      },
      (err) => {
        console.log(err.statusText);
        setTimeout(() => {
          if (err.statusText == 'OK') {
            this.sending = false;
            this.success = true;
            this.contactForm.reset();

            setTimeout(() => {
              this.success = false;
            }, 3000);
          }
        }, 1000);
      }
    );
  }

  handleSuccess() {
    confetti.default({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    this.sending = false;
    this.success = true;
    this.contactForm.reset();
    setTimeout(() => {
      this.success = false;
    }, 3000);
  }
}
