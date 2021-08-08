import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GithubService } from 'src/app/services/github.service';
import { ProjectService } from 'src/app/services/project.service';

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
    private route: ActivatedRoute
  ) {}
  private reponame: string;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.reponame = params['id'];
      this.getProjectReadme();
    });
  }

  private getProjectReadme() {
    this.projectService.getProjectReadme(this.reponame).subscribe({
      next: (resp) => {
        if (resp) {
          this.content = this.replaceAll(
            '(./',
            `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${this.reponame}/main/`,
            resp
          );
        }
      },
    });
  }

  private replaceAll(find: string, replace: string, str: string): string {
    while (str.indexOf(find) > -1) {
      str = str.replace(find, replace);
    }
    return str;
  }
}
