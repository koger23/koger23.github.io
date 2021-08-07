import { Component } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'koger23-github-io';
  public name: string = '**The Big Bang Theory**';
  public text: string;
  private decoder: TextDecoder = new TextDecoder('utf-8');

  constructor(private http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    this.http
      .get<string>(
        'https://raw.githubusercontent.com/koger23/csipesz-jelzo/main/README.md',
        httpOptions
      )
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.text = this.replaceAll(
              '(./',
              '(https://raw.githubusercontent.com/koger23/csipesz-jelzo/main/',
              resp
            );
          }
        },
      });
  }

  replaceAll(find: string, replace: string, str: string) {
    while (str.indexOf(find) > -1) {
      str = str.replace(find, replace);
    }
    return str;
  }
}
