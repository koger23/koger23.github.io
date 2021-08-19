import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { Utils } from 'src/app/helpers/utils';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content: string;

  constructor(
    private githubService: GithubService,
    private overlayService: OverlayService
  ) {}

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
      complete: () => {
        this.overlayService.hide();
      },
    });
  }
}
