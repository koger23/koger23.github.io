import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverlayService } from './overlay.service';
import { ConfigIniParser } from 'config-ini-parser';
import { ProjectDetails } from '../models/project-details.model';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private _GITHUB_RAW_URL: string = 'https://raw.githubusercontent.com';
  parser: ConfigIniParser;
  devUserName: string = 'koger23';
  projectNames: string[] = [];
  postNames: string[] = [];

  public get GITHUB_RAW_URL(): string {
    return this._GITHUB_RAW_URL;
  }

  public get USERNAME(): string {
    if (window.location.hostname === 'localhost') {
      return this.devUserName;
    }
    return window.location.hostname.split('.')[0];
  }

  constructor(private http: HttpClient, private overlay: OverlayService) {}

  /**
   * Fetching the README.md content of the repository, which has the name as your username.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getAboutMe() {
    this.overlay.show();

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
   * Fetching the home post, which is the content of 'welcome.md'.
   * Repo must be the same as your github username.
   *
   * @returns file content as string.
   */
  public getHomePost() {
    this.overlay.show();

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
    this.overlay.show();

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
    this.overlay.show();

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

  public readConfig(configContent: string): void {
    this.overlay.show();
    this.parser = new ConfigIniParser();
    this.parser.parse(configContent);
    let sections = this.parser.sections();

    this.projectNames = this.parser.get(sections[0], 'projects').split(',');
    this.postNames = this.parser.get(sections[0], 'posts').split(',');

    this.overlay.hide();
  }

  public getProjectDetails(projectName: string): ProjectDetails {
    this.overlay.show();
    let details = new ProjectDetails();

    if (this.parser.isHaveSection(projectName)) {
      let hasTags = this.parser.isHaveOption(projectName, 'tags');
      let hasPublishDate = this.parser.isHaveOption(projectName, 'date');
      let hasTitle = this.parser.isHaveOption(projectName, 'title');

      if (hasTags) {
        details.tags = this.parser.get(projectName, 'tags').split(',');
      }
      if (hasPublishDate) {
        details.publishedOn = this.parser.get(projectName, 'date');
      }
      if (hasTitle) {
        details.title = this.parser.get(projectName, 'title');
      }
    }
    this.overlay.hide();
    
    return details;
  }

  public getProjectNames() {
    if (this.projectNames && this.projectNames.length > 0) {
      return this.projectNames;
    }
    this.getConfig().subscribe({
      next: (resp) => {
        this.overlay.show();
        this.readConfig(resp);
      },
      complete: () => {
        this.overlay.hide();
      },
    });
    return this.projectNames;
  }
}
