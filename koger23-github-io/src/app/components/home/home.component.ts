import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { Utils } from 'src/app/helpers/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content =
    'Hi, \n\nthe site is under development, content can be missing or being ugly, or the site can be unusable at all.';

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.loadContent();
  }

  private loadContent() {
    this.githubService.getHomePost().subscribe({
      next: (resp) => {
        if (resp) {
          this.content = Utils.replaceAll(
            '(./',
            `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${this.githubService.USERNAME}/main/`,
            resp
          );
        }
      },
    });
  }
}
