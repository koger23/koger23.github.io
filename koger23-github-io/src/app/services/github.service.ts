import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private _GITHUB_RAW_URL: string = 'https://raw.githubusercontent.com';

  public get GITHUB_RAW_URL(): string {
    return this._GITHUB_RAW_URL;
  }

  public get USERNAME(): string {
    if (window.location.hostname === 'localhost') {
      return 'koger23';
    }
    return window.location.hostname.split('.')[0];
  }

  constructor(private http: HttpClient) { }

  public getAboutMe() {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/README.md`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }

  public getProjectList(): Observable<string> {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/koger23.github.io.json`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }
}

interface Config {
  projects: string[];
  devuser: string;
}