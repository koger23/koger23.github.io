import { Component, OnInit } from '@angular/core';
import {
  faEnvelope,
  faGlobe,
  faGraduationCap,
  faLayerGroup,
  faMapMarkedAlt,
  faTools,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Utils } from 'src/app/helpers/utils';
import { GithubService } from 'src/app/services/github.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/models/config.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  contentAboutMe: string;
  contentAboutSite: string;
  certs: string[];
  faEnvelope = faEnvelope;
  faLinkedin = faLinkedin;
  faLayerGroup = faLayerGroup;
  faGlobe = faGlobe;
  faMapMarkedAlt = faMapMarkedAlt;
  faGithub = faGithub;
  faGraduationCap = faGraduationCap;
  faTools = faTools;
  configSubscription = new Subscription();
  config: Config;

  constructor(
    private githubService: GithubService,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.githubService.isParserLoaded.subscribe({
      next: () => {
        this.certs = this.githubService.getCertifications();
      },
    });
    this.configSubscription = this.githubService.config.subscribe({
      next: () => {
        this.config = this.githubService.config.value;
      },
    });

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
        this.overlayService.hide();
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
