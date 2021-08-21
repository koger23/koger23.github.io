import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  routeSub: Subscription;
  project: Project;
  faCalendarAlt = faCalendarAlt;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
  ) {}
  private reponame: string;

  ngOnInit(): void {
    if (this.projectService.selectedProject) {
      this.project = this.projectService.selectedProject;
    } else {
      this.routeSub = this.route.params.subscribe((params) => {
        this.reponame = params['id'];
        this.project = this.projectService.getProjectWithDetails(this.reponame);
        this.projectService.selectedProject = this.project;
      });
    }
    console.log(this.project);
  }
}
