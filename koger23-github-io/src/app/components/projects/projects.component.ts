import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];

  constructor(
    private projectService: ProjectService,
    private githubService: GithubService,
  ) {}

  ngOnInit(): void {
    if (!this.projects) {
      this.githubService.getConfig().subscribe({
        next: (resp) => {
          this.githubService.readConfig(resp);

          this.createProjects();
        },
      });
    }
  }

  private createProjects() {
    if (this.githubService.projectNames && this.githubService.projectNames.length > 0) {
      this.githubService.projectNames.forEach((projectName) => {
        let newProject = this.projectService.getProjectWithDetails(projectName);
        
        if (!this.projects) {
          this.projects = [];
        }
        this.projects.push(newProject);
      });
    }
  }
}
