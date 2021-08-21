import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubService } from '../services/github.service';
import { Project } from '../models/project.model';
import { OverlayService } from './overlay.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public selectedPost: Project;

  constructor(private http: HttpClient, private githubService: GithubService, private overlay: OverlayService) {}

  /**
   * Getting markdown of post from the repository.
   * @param reponame name of the public repository
   * @returns content of [post name].md as text
   */
  public getPostContent(postName: string): Observable<string> {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };

    this.overlay.show();

    return this.http.get<string>(
      `${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${this.githubService.USERNAME}/main/posts/${postName}.md`,
      HTTP_OPTIONS
    );
  }
}
