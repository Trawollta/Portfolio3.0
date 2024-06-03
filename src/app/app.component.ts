import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HeroComponent } from './hero/hero.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,
        NavbarComponent,
        HeroComponent,
        FooterComponent,
        ContactComponent,
        SkillsComponent, 
        ProjectsComponent,
      AboutMeComponent]
})
export class AppComponent {
  title = 'new_portfolio';
}
