import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myproject';
  messageFromBackend: string = "No message yet";
  imageUrl: string = ""
  selectedFile: File | undefined;

  //constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("init");
  }

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(event: any) {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post<{ imageUrl: string }>('http://localhost:3000/upload', formData)
        .subscribe(
          response => {
            this.imageUrl = response.imageUrl;
          },
          error => {
            console.error('manual Error uploading image', error);
          }
        );
    }
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
