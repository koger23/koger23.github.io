import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GithubService } from 'src/app/services/github.service';
import { ProjectService } from 'src/app/services/project.service';
import { Utils } from 'src/app/helpers/utils';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  content: string;
  routeSub: Subscription;

  constructor(
    private projectService: ProjectService,
    private githubService: GithubService,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {}
  private reponame: string;

  ngOnInit(): void {
    if (this.projectService.selectedProject) {
      this.content = this.projectService.selectedProject.content;
    } else {
      this.routeSub = this.route.params.subscribe((params) => {
        this.reponame = params['id'];
        this.getProjectReadme();
      });
    }
  }

  private getProjectReadme() {
    this.projectService.getProjectReadme(this.reponame).subscribe({
      next: (resp) => {
        if (resp) {
          // replace ./ for image paths in markdown files
          this.content = Utils.replaceAll(
            '(./',
            `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${this.reponame}/main/`,
            resp
          );
        }
      },
      complete: () => {
        this.overlayService.hideOverlay();
      },
    });
  }
}
