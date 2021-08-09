import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  public onSelectProject() {
    this.projectService.selectedProject = this.project;
  }
}
