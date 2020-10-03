import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public http: HttpClient) { }

  /*makeHttpCall() {
    this.http.get('https://jsonplaceholder.typicode.com/comments')
      .subscribe((r) => {
        console.log(r);
      });
  }*/
}
