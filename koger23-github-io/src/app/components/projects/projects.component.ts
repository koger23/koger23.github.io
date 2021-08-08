import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  public projects: string[];

  constructor(private projectService: ProjectService, private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getProjectList().subscribe({
      next: (resp) => {
        this.projects = resp.replace(' ', '').replace('\n', '').split(',');
      },
    });
  }
}
