import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubService } from '../services/github.service';
import { Project } from '../models/project.model';
import { OverlayService } from './overlay.service';
import { Utils } from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public selectedProject: Project;

  constructor(private http: HttpClient, private githubService: GithubService, private overlay: OverlayService) {}

  /**
   * Getting README.md from a PUBLIC repository.
   * @param reponame name of the public repository
   * @returns content of README.md as text
   */
  public getProjectReadme(reponame: string): Observable<string> {
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        Accept: 'text/html',
        'Content-Type': 'text/plain; charset=utf-8',
      }),
      responseType: 'text' as 'json',
    };

    this.overlay.show();

    return this.http.get<string>(
      `${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${reponame}/main/README.md`,
      HTTP_OPTIONS
    );
  }

  public getProjectWithDetails(projectName: string): Project {
    let newProject = new Project();
    newProject.name = projectName;

    this.getProjectReadme(projectName).subscribe({
      next: (resp) => {
        this.overlay.show();

        if (resp) {
          newProject.content = Utils.replaceAll(
            '(./',
            `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${projectName}/main/`,
            resp
          );
        }

        newProject.details =
          this.githubService.getDetailsFromConfig(projectName);
      },
      complete: () => {
        this.overlay.hide();
      },
    });
    return newProject;
  }
}
