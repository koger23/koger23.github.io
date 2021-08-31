import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  fullname: string;
  hasFullname: boolean = false;

  constructor(private githubService: GithubService, public translateService: TranslateService) {}

  ngOnInit(): void {
    this.username = this.githubService.USERNAME;
    this.githubService.hasFullName.subscribe({
      next: () => {
        this.fullname = this.githubService.FULLNAME;
        this.hasFullname = true;
      }
    });
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
  }
}
