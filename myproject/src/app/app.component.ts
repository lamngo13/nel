import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myproject';
  messageFromBackend: string = "No message yet";
  imageUrl: string = ""
  selectedFile: File | undefined;
  imageList: File[] = [];

  //constructor(private http: HttpClient) { }

  //maybe take async out of onnit lol
  async ngOnInit() {
    console.log("init");
    this.getImages();
    console.log("donzo w init")
  }

  getImages() {
    console.log("button pressed")
    const yeet = this.http.get('http://localhost:3000/images').subscribe((response) => {
      console.log("response", response)
      return response;
    });
    console.log("yeet", yeet)
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

      this.http.post<{ inImageUrl: string }>('http://localhost:3000/upload', formData)
        .subscribe(
          response => {
            this.imageUrl = response.inImageUrl;
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
