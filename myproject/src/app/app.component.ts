import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myproject';
  messageFromBackend: string = "No message yet";

  ngOnInit() {
    console.log("init");
  }

  getMessage() {
    console.log("button pressed")
    fetch('http://localhost:3000/hello')
      .then(response => response.text())
      .then(data => {
        this.messageFromBackend = data;
      });
  }


}
