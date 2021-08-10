import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/helpers/utils';
import { GithubService } from 'src/app/services/github.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  contentAboutMe: string;
  contentAboutSite: string;

  constructor(
    private githubService: GithubService,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }

  private loadContent() {
    this.loadAboutMe();
    this.loadAboutSite();
  }

  private loadAboutMe() {
    this.githubService.getAboutMe().subscribe({
      next: (resp) => {
        if (resp) {
          this.contentAboutMe = Utils.replaceAll(
            '(./',
            `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${this.githubService.USERNAME}/main/`,
            resp
          );
        }
      },
      complete: () => {
        this.overlayService.hideOverlay();
      },
    });
  }

  private loadAboutSite() {
    this.githubService.getAboutPage().subscribe({
      next: (resp) => {
        if (resp) {
          this.contentAboutSite = Utils.replaceAll(
            '(./',
            `(${this.githubService.GITHUB_RAW_URL}/${this.githubService.USERNAME}/${this.githubService.USERNAME}/main/`,
            resp
          );
        }
      },
    });
  }
}
