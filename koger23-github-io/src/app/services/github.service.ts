import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OverlayService } from './overlay.service';

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

  constructor(
    private http: HttpClient,
    private overlayService: OverlayService
  ) {}

  /**
   * Fetching the README.md content of the repository, which has the name as your username.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getAboutMe() {
    this.overlayService.showOverlay();

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

  /**
   * Fetching the list of projects.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getProjectList(): Observable<string> {
    this.overlayService.showOverlay();
    
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/${this.USERNAME}.github.io.json`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }

  /**
   * Fetching the home post, which is the content of 'welcome.md'.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getHomePost() {
    this.overlayService.showOverlay();

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/posts/welcome.md`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }

  /**
   * Fetching the content of 'yourusername.github.io.md'.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getAboutPage() {
    this.overlayService.showOverlay();

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/${this.USERNAME}.github.io.md`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }

  public getConfig() {
    this.overlayService.showOverlay();

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };
    const URL: string = `${this.GITHUB_RAW_URL}/${this.USERNAME}/${this.USERNAME}/main/${this.USERNAME}.github.io.cfg`;

    return this.http.get<string>(URL, HTTP_OPTIONS);
  }
}
