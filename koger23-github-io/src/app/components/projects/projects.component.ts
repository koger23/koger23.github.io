import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Utils } from 'src/app/helpers/utils';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public projectNames: string[] = [];

  constructor(
    private projectService: ProjectService,
    private githubService: GithubService,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.githubService.getProjectList().subscribe({
      next: (resp) => {
        this.projectNames = resp.replace(' ', '').replace('\n', '').split(',');
        this.createProjects();
      },
    });
  }

  private createProjects() {
    if (this.projectNames.length > 0) {
      this.projectNames.forEach((projectName) => {
        let newProject = new Project();
        newProject.name = projectName;

        this.projectService.getProjectReadme(projectName).subscribe({
          next: (resp) => {
            this.overlayService.showOverlay();
            if (resp) {
              newProject.content = Utils.replaceAll(
                '(./',
                `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${projectName}/main/`,
                resp
              );
            }
          },
          complete: () => {
            this.overlayService.hideOverlay();
          },
        });
        this.projects.push(newProject);
      });
    }
  }
}
