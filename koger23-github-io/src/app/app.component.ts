import { Component } from '@angular/core';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'koger23-github-io';

  constructor(private githubService: GithubService) {
    this.githubService.getConfig().subscribe({
      next: (resp) => {
        this.githubService.readConfig(resp);
      },
    });
  }
}
