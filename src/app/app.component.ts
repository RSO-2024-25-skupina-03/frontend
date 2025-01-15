import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FrameworkComponent } from './components/framework/framework.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FrameworkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MacjeStoritve';
}
