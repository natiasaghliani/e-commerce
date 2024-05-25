import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from "./footer/footer/footer.component";
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HomeComponent, HeaderComponent, HttpClientModule, FooterComponent]
})
export class AppComponent {
  title = 'e-commerce';

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.viewportScroller.scrollToPosition([0,0]);
    })
  }
}
