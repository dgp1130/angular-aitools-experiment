import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child1 } from './child1';
import { Child2 } from './child2';

class MyService {}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Child1, Child2],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [
    {
      provide: MyService,
      useClass: MyService,
    },
  ],
})
export class App {
  protected title = 'angular-aitools-demo';
}
