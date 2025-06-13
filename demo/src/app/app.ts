import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

class MyService {}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
